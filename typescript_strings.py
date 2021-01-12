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
        self.file_ext = ".ts"
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

        out_typescript_enum_fields = ""

        for var in variants:
            out_c = out_c + "\t\tcase %d: return %s;\n" % (ord_v, var)
            ord_v = ord_v + 1
            out_typescript_enum_fields += f"{var},\n\t\t\t\t"
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

        out_typescript_enum = f"""
            export enum {struct_name} {{
                {out_typescript_enum_fields}
            }}
        """

        return (out_c, out_typescript_enum, "")

    def c_unitary_enum_to_native_call(self, ty_info):
        return (ty_info.rust_obj + "_to_js(", ")")
    def native_unitary_enum_to_c_call(self, ty_info):
        return (ty_info.rust_obj + "_from_js(", ")")

    def c_complex_enum_pass_ty(self, struct_name):
        return "uint32_t"

    def c_constr_native_complex_enum(self, struct_name, variant, c_params):
        ret = "0 /* " + struct_name + " - " + variant + " */"
        for param in c_params:
            ret = ret + "; (void) " + param
        return ret

    def native_c_map_trait(self, struct_name, field_var_convs, field_fn_lines):
        return ("", "")

    def map_complex_enum(self, struct_name, variant_list, camel_to_snake):
        java_hu_type = struct_name.replace("LDK", "")

        out_java_enum = ""
        out_java = ""
        out_c = ""

        out_java_enum += (self.hu_struct_file_prefix)
        out_java_enum += ("export default class " + java_hu_type + " extends CommonBase {\n")
        out_java_enum += ("\tprotected constructor(_dummy: object, ptr: number) { super(ptr); }\n")
        out_java_enum += ("\tprotected finalize() {\n")
        out_java_enum += ("\t\tsuper.finalize();\n")
        out_java_enum += ("\t\tif (this.ptr != 0) { bindings." + java_hu_type + "_free(this.ptr); }\n")
        out_java_enum += ("\t}\n")
        out_java_enum += f"\tstatic constr_from_ptr(ptr: number): {java_hu_type} {{\n"
        out_java_enum += (f"\t\tconst raw_val: bindings.{struct_name} = bindings." + struct_name + "_ref_from_ptr(ptr);\n")
        java_hu_subclasses = ""

        out_java +=  ("\tpublic static class " + struct_name + " {\n")
        out_java +=  ("\t\tprivate " + struct_name + "() {}\n")
        for var in variant_list:
            out_java +=  ("\t\texport class " + var.var_name + " extends " + struct_name + " {\n")
            java_hu_subclasses = java_hu_subclasses + "export class " + var.var_name + " extends " + java_hu_type + " {\n"
            out_java_enum += ("\t\tif (raw_val instanceof bindings." + struct_name + "." + var.var_name + ") {\n")
            out_java_enum += ("\t\t\treturn new " + var.var_name + "(this.ptr, raw_val);\n")
            init_meth_params = ""
            init_meth_body = ""
            hu_conv_body = ""
            for idx, field_ty in enumerate(var.fields):
                out_java += ("\t\t\tpublic " + field_ty.java_ty + " " + field_ty.arg_name + ";\n")
                java_hu_subclasses = java_hu_subclasses + "\tpublic " + field_ty.arg_name + f": {field_ty.java_hu_ty};\n"
                if field_ty.to_hu_conv is not None:
                    hu_conv_body = hu_conv_body + "\t\tconst " + field_ty.arg_name + f": {field_ty.java_ty} = obj." + field_ty.arg_name + ";\n"
                    hu_conv_body = hu_conv_body + "\t\t" + field_ty.to_hu_conv.replace("\n", "\n\t\t\t") + "\n"
                    hu_conv_body = hu_conv_body + "\t\tthis." + field_ty.arg_name + " = " + field_ty.to_hu_conv_name + ";\n"
                else:
                    hu_conv_body = hu_conv_body + "\t\tthis." + field_ty.arg_name + " = obj." + field_ty.arg_name + ";\n"
                if idx > 0:
                    init_meth_params = init_meth_params + ", "
                init_meth_params = init_meth_params + field_ty.java_ty + " " + field_ty.arg_name
                init_meth_body = init_meth_body + "this." + field_ty.arg_name + " = " + field_ty.arg_name + "; "
            out_java +=  ("\t\t\t" + var.var_name + "(" + init_meth_params + ") { ")
            out_java +=  (init_meth_body)
            out_java +=  ("}\n")
            out_java += ("\t\t}\n")
            out_java_enum += ("\t\t}\n")
            java_hu_subclasses = java_hu_subclasses + "\tprivate constructor(ptr: number, obj: bindings." + struct_name + "." + var.var_name + ") {\n\t\tsuper(null, ptr);\n"
            java_hu_subclasses = java_hu_subclasses + hu_conv_body
            java_hu_subclasses = java_hu_subclasses + "\t}\n}\n"
        out_java += ("\t\tstatic native void init();\n")
        out_java += ("\t}\n")
        out_java_enum += ("\t\tthrow new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface\n\t}\n\n")
        out_java += ("\tstatic { " + struct_name + ".init(); }\n")
        out_java += ("\tpublic static native " + struct_name + " " + struct_name + "_ref_from_ptr(long ptr);\n");

        out_c += (self.c_fn_ty_pfx + self.c_complex_enum_pass_ty(struct_name) + " " + self.c_fn_name_pfx + struct_name.replace("_", "_1") + "_1ref_1from_1ptr (" + self.c_fn_args_pfx + ", " + self.ptr_c_ty + " ptr) {\n")
        out_c += ("\t" + struct_name + " *obj = (" + struct_name + "*)ptr;\n")
        out_c += ("\tswitch(obj->tag) {\n")
        for var in variant_list:
            out_c += ("\t\tcase " + struct_name + "_" + var.var_name + ": {\n")
            c_params = []
            for idx, field_map in enumerate(var.fields):
                if field_map.ret_conv is not None:
                    out_c += ("\t\t\t" + field_map.ret_conv[0].replace("\n", "\n\t\t\t"))
                    out_c += ("obj->" + camel_to_snake(var.var_name) + "." + field_map.arg_name)
                    out_c += (field_map.ret_conv[1].replace("\n", "\n\t\t\t") + "\n")
                    c_params.append(field_map.ret_conv_name)
                else:
                    c_params.append("obj->" + camel_to_snake(var.var_name) + "." + field_map.arg_name)
            out_c += ("\t\t\treturn " + self.c_constr_native_complex_enum(struct_name, var.var_name, c_params) + ";\n")
            out_c += ("\t\t}\n")
        out_c += ("\t\tdefault: abort();\n")
        out_c += ("\t}\n}\n")
        out_java_enum += ("}\n")
        out_java_enum += (java_hu_subclasses)
        return (out_java, out_java_enum, out_c)
