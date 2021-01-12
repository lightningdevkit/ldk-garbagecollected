class Consts:
    def __init__(self, DEBUG):
        self.common_base = """
            export default class CommonBase {
                ptr: number;
                ptrs_to: object[] = new Array(); // new LinkedList(); TODO: build linked list implementation
                protected constructor(ptr: number) { this.ptr = ptr; }
                public _test_only_get_ptr(): number { return this.ptr; }
            }
        """

        self.c_file_pfx = """#include <rust_types.h>
#include <stdatomic.h>
#include <lightning.h>

// These should be provided...somehow...
void *memset(void *s, int c, size_t n);
void *memcpy(void *dest, const void *src, size_t n);
int memcmp(const void *s1, const void *s2, size_t n);

void __attribute__((noreturn)) abort(void);
void assert(scalar expression);
"""

        if not DEBUG:
            self.c_file_pfx = self.c_file_pfx + """
void *malloc(size_t size);
void free(void *ptr);

#define MALLOC(a, _) malloc(a)
#define FREE(p) if ((long)(p) > 1024) { free(p); }
#define DO_ASSERT(a) (void)(a)
#define CHECK(a)
"""
        else:
            self.c_file_pfx = self.c_file_pfx + """
// Always run a, then assert it is true:
#define DO_ASSERT(a) do { bool _assert_val = (a); assert(_assert_val); } while(0)
// Assert a is true or do nothing
#define CHECK(a) DO_ASSERT(a)

// Running a leak check across all the allocations and frees of the JDK is a mess,
// so instead we implement our own naive leak checker here, relying on the -wrap
// linker option to wrap malloc/calloc/realloc/free, tracking everyhing allocated
// and free'd in Rust or C across the generated bindings shared library.

#define BT_MAX 128
typedef struct allocation {
	struct allocation* next;
	void* ptr;
	const char* struct_name;
} allocation;
static allocation* allocation_ll = NULL;

void* __real_malloc(size_t len);
void* __real_calloc(size_t nmemb, size_t len);
static void new_allocation(void* res, const char* struct_name) {
	allocation* new_alloc = __real_malloc(sizeof(allocation));
	new_alloc->ptr = res;
	new_alloc->struct_name = struct_name;
	new_alloc->next = allocation_ll;
	allocation_ll = new_alloc;
}
static void* MALLOC(size_t len, const char* struct_name) {
	void* res = __real_malloc(len);
	new_allocation(res, struct_name);
	return res;
}
void __real_free(void* ptr);
static void alloc_freed(void* ptr) {
	allocation* p = NULL;
	allocation* it = allocation_ll;
	while (it->ptr != ptr) {
		p = it; it = it->next;
		if (it == NULL) {
			//XXX: fprintf(stderr, "Tried to free unknown pointer %p\\n", ptr);
			return; // addrsan should catch malloc-unknown and print more info than we have
		}
	}
	if (p) { p->next = it->next; } else { allocation_ll = it->next; }
	DO_ASSERT(it->ptr == ptr);
	__real_free(it);
}
static void FREE(void* ptr) {
	if ((long)ptr < 1024) return; // Rust loves to create pointers to the NULL page for dummys
	alloc_freed(ptr);
	__real_free(ptr);
}

void* __wrap_malloc(size_t len) {
	void* res = __real_malloc(len);
	new_allocation(res, "malloc call");
	return res;
}
void* __wrap_calloc(size_t nmemb, size_t len) {
	void* res = __real_calloc(nmemb, len);
	new_allocation(res, "calloc call");
	return res;
}
void __wrap_free(void* ptr) {
	if (ptr == NULL) return;
	alloc_freed(ptr);
	__real_free(ptr);
}

void* __real_realloc(void* ptr, size_t newlen);
void* __wrap_realloc(void* ptr, size_t len) {
	if (ptr != NULL) alloc_freed(ptr);
	void* res = __real_realloc(ptr, len);
	new_allocation(res, "realloc call");
	return res;
}
void __wrap_reallocarray(void* ptr, size_t new_sz) {
	// Rust doesn't seem to use reallocarray currently
	DO_ASSERT(false);
}

void __attribute__((destructor)) check_leaks() {
	for (allocation* a = allocation_ll; a != NULL; a = a->next) {
		//XXX: fprintf(stderr, "%s %p remains\\n", a->struct_name, a->ptr);
	}
	DO_ASSERT(allocation_ll == NULL);
}
"""
        self.c_file_pfx = self.c_file_pfx + """
// We assume that CVec_u8Z and u8slice are the same size and layout (and thus pointers to the two can be mixed)
_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKu8slice), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, data) == offsetof(LDKu8slice, data), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKu8slice, datalen), "Vec<u8> and [u8] need to have been mapped identically");

_Static_assert(sizeof(void*) == 4, "Pointers mut be 32 bits");

typedef struct int64_tArray {uint32_t len;int64_t *ptr;} int64_tArray;
typedef struct uint32_tArray {uint32_t len;int32_t *ptr;} uint32_tArray;
typedef struct int8_tArray {uint32_t len;int8_t *ptr;} int8_tArray;

typedef bool jboolean;

"""

        self.hu_struct_file_prefix = f"""
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

"""
        self.c_fn_ty_pfx = ""
        self.c_fn_name_pfx = ""
        self.c_fn_args_pfx = "void* ctx_TODO"
        self.file_ext = ""
        self.ptr_c_ty = "uint32_t"
        self.ptr_native_ty = "uint32_t"
        self.result_c_ty = "uint32_t"
        self.ptr_arr = "uint32_tArray"
        self.get_native_arr_len_call = ("", ".len")
        self.get_native_arr_ptr_call = ("", ".ptr")

    def release_native_arr_ptr_call(self, arr_var, arr_ptr_var):
        return None
    def create_native_arr_call(self, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return "{ .len = " + arr_len + ", .ptr = MALLOC(" + arr_len + ", \"Native " + ty_info.c_ty + " Bytes\") }"
        elif ty_info.c_ty == "int64_tArray":
            return "{ .len = " + arr_len + ", .ptr = MALLOC(" + arr_len + " * sizeof(int64_t), \"Native " + ty_info.c_ty + " Bytes\") }"
        elif ty_info.c_ty == "uint32_tArray":
            return "{ .len = " + arr_len + ", .ptr = MALLOC(" + arr_len + " * sizeof(int32_t), \"Native " + ty_info.c_ty + " Bytes\") }"
        else:
            print("Need to create arr!", ty_info.c_ty)
            return ty_info.c_ty
    def set_native_arr_contents(self, arr_name, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return ("memcpy(" + arr_name + ".ptr, ", ", " + arr_len + ")")
        else:
            assert False
    def get_native_arr_contents(self, arr_name, dest_name, arr_len, ty_info, copy):
        if ty_info.c_ty == "int8_tArray":
            if copy:
                return "memcpy(" + dest_name + ", " + arr_name + ".ptr, " + arr_len + ")"
            else:
                return arr_name + ".ptr"
        else:
            return "(" + ty_info.subty.c_ty + "*) " + arr_name + ".ptr"
    def get_native_arr_elem(self, arr_name, idxc, ty_info):
        assert False # Only called if above is None
    def cleanup_native_arr_ref_contents(self, arr_name, dest_name, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return None
        else:
            return None

    def init_str(self, c_array_class_caches):
        return ""

    def native_c_unitary_enum_map(self, struct_name, variants):
        out_c = "static inline " + struct_name + " " + struct_name + "_from_js(int32_t ord) {\n"
        out_c = out_c + "\tswitch (ord) {\n"
        ord_v = 0
        for var in variants:
            out_c = out_c + "\t\tcase %d: return %s;\n" % (ord_v, var)
            ord_v = ord_v + 1
        out_c = out_c + "\t}\n"
        out_c = out_c + "\tabort();\n"
        out_c = out_c + "}\n"

        out_c = out_c + "static inline int32_t " + struct_name + "_to_js(" + struct_name + " val) {\n"
        out_c = out_c + "\tswitch (val) {\n"
        ord_v = 0
        for var in variants:
            out_c = out_c + "\t\tcase " + var + ": return %d;\n" % ord_v
            ord_v = ord_v + 1
        out_c = out_c + "\t\tdefault: abort();\n"
        out_c = out_c + "\t}\n"
        out_c = out_c + "}\n"
        return (out_c, "", "")

    def c_unitary_enum_to_native_call(self, ty_info):
        return (ty_info.rust_obj + "_to_js(", ")")
    def native_unitary_enum_to_c_call(self, ty_info):
        return (ty_info.rust_obj + "_from_js(", ")")

    def c_complex_enum_pfx(self, struct_name, variants, init_meth_jty_strs):
        return ""

    def c_complex_enum_pass_ty(self, struct_name):
        return "uint32_t"

    def c_constr_native_complex_enum(self, struct_name, variant, c_params):
        ret = "0 /* " + struct_name + " - " + variant + " */"
        for param in c_params:
            ret = ret + "; (void) " + param
        return ret

    def native_c_map_trait(self, struct_name, field_var_convs, field_fn_lines):
        return ("", "")
