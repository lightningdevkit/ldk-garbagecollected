from bindingstypes import *

class Consts:
    def __init__(self, DEBUG: bool, **kwargs):
        self.c_array_class_caches = set()
        self.c_type_map = dict(
            uint8_t = ['byte'],
            uint16_t = ['short'],
            uint32_t = ['int'],
            uint64_t = ['long'],
        )

        self.to_hu_conv_templates = dict(
            ptr = '{human_type} {var_name}_hu_conv = new {human_type}(null, {var_name});',
            default = '{human_type} {var_name}_hu_conv = new {human_type}(null, {var_name});'
        )

        self.bindings_header = """package org.ldk.impl;
import org.ldk.enums.*;

public class bindings {
	public static class VecOrSliceDef {
		public long dataptr;
		public long datalen;
		public long stride;
		public VecOrSliceDef(long dataptr, long datalen, long stride) {
			this.dataptr = dataptr; this.datalen = datalen; this.stride = stride;
		}
	}
	static {
		System.loadLibrary(\"lightningjni\");
		init(java.lang.Enum.class, VecOrSliceDef.class);
		init_class_cache();
	}
	static native void init(java.lang.Class c, java.lang.Class slicedef);
	static native void init_class_cache();

	public static native boolean deref_bool(long ptr);
	public static native long deref_long(long ptr);
	public static native void free_heap_ptr(long ptr);
	public static native byte[] read_bytes(long ptr, long len);
	public static native byte[] get_u8_slice_bytes(long slice_ptr);
	public static native long bytes_to_u8_vec(byte[] bytes);
	public static native long new_txpointer_copy_data(byte[] txdata);
	public static native void txpointer_free(long ptr);
	public static native byte[] txpointer_get_buffer(long ptr);
	public static native long vec_slice_len(long vec);
	public static native long new_empty_slice_vec();

"""

        self.bindings_footer = "}\n"

        self.util_fn_pfx = """package org.ldk.structs;
import org.ldk.impl.bindings;
import java.util.Arrays;

public class UtilMethods {
"""
        self.util_fn_sfx = "}"
        self.common_base = """package org.ldk.structs;
import java.util.LinkedList;
class CommonBase {
	final long ptr;
	LinkedList<Object> ptrs_to = new LinkedList();
	protected CommonBase(long ptr) { this.ptr = ptr; }
	public long _test_only_get_ptr() { return this.ptr; }
}
"""

        self.c_file_pfx = """#include \"org_ldk_impl_bindings.h\"
#include <rust_types.h>
#include <lightning.h>
#include <string.h>
#include <stdatomic.h>
#include <stdlib.h>

"""

        if not DEBUG:
            self.c_file_pfx = self.c_file_pfx + """#define MALLOC(a, _) malloc(a)
#define FREE(p) if ((long)(p) > 1024) { free(p); }
#define DO_ASSERT(a) (void)(a)
#define CHECK(a)
"""
        else:
            self.c_file_pfx = self.c_file_pfx + """#include <assert.h>
// Always run a, then assert it is true:
#define DO_ASSERT(a) do { bool _assert_val = (a); assert(_assert_val); } while(0)
// Assert a is true or do nothing
#define CHECK(a) DO_ASSERT(a)

// Running a leak check across all the allocations and frees of the JDK is a mess,
// so instead we implement our own naive leak checker here, relying on the -wrap
// linker option to wrap malloc/calloc/realloc/free, tracking everyhing allocated
// and free'd in Rust or C across the generated bindings shared library.
#include <threads.h>
#include <execinfo.h>
#include <unistd.h>
static mtx_t allocation_mtx;

void __attribute__((constructor)) init_mtx() {
	DO_ASSERT(mtx_init(&allocation_mtx, mtx_plain) == thrd_success);
}

#define BT_MAX 128
typedef struct allocation {
	struct allocation* next;
	void* ptr;
	const char* struct_name;
	void* bt[BT_MAX];
	int bt_len;
	size_t alloc_len;
} allocation;
static allocation* allocation_ll = NULL;

void* __real_malloc(size_t len);
void* __real_calloc(size_t nmemb, size_t len);
static void new_allocation(void* res, const char* struct_name, size_t len) {
	allocation* new_alloc = __real_malloc(sizeof(allocation));
	new_alloc->ptr = res;
	new_alloc->struct_name = struct_name;
	new_alloc->bt_len = backtrace(new_alloc->bt, BT_MAX);
	new_alloc->alloc_len = len;
	DO_ASSERT(mtx_lock(&allocation_mtx) == thrd_success);
	new_alloc->next = allocation_ll;
	allocation_ll = new_alloc;
	DO_ASSERT(mtx_unlock(&allocation_mtx) == thrd_success);
}
static void* MALLOC(size_t len, const char* struct_name) {
	void* res = __real_malloc(len);
	new_allocation(res, struct_name, len);
	return res;
}
void __real_free(void* ptr);
static void alloc_freed(void* ptr) {
	allocation* p = NULL;
	DO_ASSERT(mtx_lock(&allocation_mtx) == thrd_success);
	allocation* it = allocation_ll;
	while (it->ptr != ptr) {
		p = it; it = it->next;
		if (it == NULL) {
			fprintf(stderr, "Tried to free unknown pointer %p at:\\n", ptr);
			void* bt[BT_MAX];
			int bt_len = backtrace(bt, BT_MAX);
			backtrace_symbols_fd(bt, bt_len, STDERR_FILENO);
			fprintf(stderr, "\\n\\n");
			DO_ASSERT(mtx_unlock(&allocation_mtx) == thrd_success);
			return; // addrsan should catch malloc-unknown and print more info than we have
		}
	}
	if (p) { p->next = it->next; } else { allocation_ll = it->next; }
	DO_ASSERT(mtx_unlock(&allocation_mtx) == thrd_success);
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
	new_allocation(res, "malloc call", len);
	return res;
}
void* __wrap_calloc(size_t nmemb, size_t len) {
	void* res = __real_calloc(nmemb, len);
	new_allocation(res, "calloc call", len);
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
	new_allocation(res, "realloc call", len);
	return res;
}
void __wrap_reallocarray(void* ptr, size_t new_sz) {
	// Rust doesn't seem to use reallocarray currently
	DO_ASSERT(false);
}

void __attribute__((destructor)) check_leaks() {
	size_t alloc_count = 0;
	size_t alloc_size = 0;
	for (allocation* a = allocation_ll; a != NULL; a = a->next) {
		fprintf(stderr, "%s %p remains:\\n", a->struct_name, a->ptr);
		backtrace_symbols_fd(a->bt, a->bt_len, STDERR_FILENO);
		fprintf(stderr, "\\n\\n");
		alloc_count++;
		alloc_size += a->alloc_len;
	}
	fprintf(stderr, "%lu allocations remained for %lu bytes.\\n", alloc_count, alloc_size);
	DO_ASSERT(allocation_ll == NULL);
}
"""
        self.c_file_pfx = self.c_file_pfx + """
static jmethodID ordinal_meth = NULL;
static jmethodID slicedef_meth = NULL;
static jclass slicedef_cls = NULL;
JNIEXPORT void Java_org_ldk_impl_bindings_init(JNIEnv * env, jclass _b, jclass enum_class, jclass slicedef_class) {
	ordinal_meth = (*env)->GetMethodID(env, enum_class, "ordinal", "()I");
	CHECK(ordinal_meth != NULL);
	slicedef_meth = (*env)->GetMethodID(env, slicedef_class, "<init>", "(JJJ)V");
	CHECK(slicedef_meth != NULL);
	slicedef_cls = (*env)->NewGlobalRef(env, slicedef_class);
	CHECK(slicedef_cls != NULL);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_deref_1bool (JNIEnv * env, jclass _a, jlong ptr) {
	return *((bool*)ptr);
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_deref_1long (JNIEnv * env, jclass _a, jlong ptr) {
	return *((long*)ptr);
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_free_1heap_1ptr (JNIEnv * env, jclass _a, jlong ptr) {
	FREE((void*)ptr);
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_read_1bytes (JNIEnv * env, jclass _b, jlong ptr, jlong len) {
	jbyteArray ret_arr = (*env)->NewByteArray(env, len);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, len, (unsigned char*)ptr);
	return ret_arr;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_get_1u8_1slice_1bytes (JNIEnv * env, jclass _b, jlong slice_ptr) {
	LDKu8slice *slice = (LDKu8slice*)slice_ptr;
	jbyteArray ret_arr = (*env)->NewByteArray(env, slice->datalen);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, slice->datalen, slice->data);
	return ret_arr;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_bytes_1to_1u8_1vec (JNIEnv * env, jclass _b, jbyteArray bytes) {
	LDKCVec_u8Z *vec = (LDKCVec_u8Z*)MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8");
	vec->datalen = (*env)->GetArrayLength(env, bytes);
	vec->data = (uint8_t*)MALLOC(vec->datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion (env, bytes, 0, vec->datalen, vec->data);
	return (long)vec;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_txpointer_1get_1buffer (JNIEnv * env, jclass _b, jlong ptr) {
	LDKTransaction *txdata = (LDKTransaction*)ptr;
	LDKu8slice slice;
	slice.data = txdata->data;
	slice.datalen = txdata->datalen;
	return Java_org_ldk_impl_bindings_get_1u8_1slice_1bytes(env, _b, (long)&slice);
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_new_1txpointer_1copy_1data (JNIEnv * env, jclass _b, jbyteArray bytes) {
	LDKTransaction *txdata = (LDKTransaction*)MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	txdata->datalen = (*env)->GetArrayLength(env, bytes);
	txdata->data = (uint8_t*)MALLOC(txdata->datalen, "Tx Data Bytes");
	txdata->data_is_owned = false;
	(*env)->GetByteArrayRegion (env, bytes, 0, txdata->datalen, txdata->data);
	return (long)txdata;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_txpointer_1free (JNIEnv * env, jclass _b, jlong ptr) {
	LDKTransaction *tx = (LDKTransaction*)ptr;
	tx->data_is_owned = true;
	Transaction_free(*tx);
	FREE((void*)ptr);
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_vec_1slice_1len (JNIEnv * env, jclass _a, jlong ptr) {
	// Check offsets of a few Vec types are all consistent as we're meant to be generic across types
	_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKCVec_SignatureZ, datalen), "Vec<*> needs to be mapped identically");
	_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKCVec_MessageSendEventZ, datalen), "Vec<*> needs to be mapped identically");
	_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKCVec_EventZ, datalen), "Vec<*> needs to be mapped identically");
	_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKCVec_C2Tuple_usizeTransactionZZ, datalen), "Vec<*> needs to be mapped identically");
	LDKCVec_u8Z *vec = (LDKCVec_u8Z*)ptr;
	return (long)vec->datalen;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_new_1empty_1slice_1vec (JNIEnv * env, jclass _b) {
	// Check sizes of a few Vec types are all consistent as we're meant to be generic across types
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_SignatureZ), "Vec<*> needs to be mapped identically");
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_MessageSendEventZ), "Vec<*> needs to be mapped identically");
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_EventZ), "Vec<*> needs to be mapped identically");
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_C2Tuple_usizeTransactionZZ), "Vec<*> needs to be mapped identically");
	LDKCVec_u8Z *vec = (LDKCVec_u8Z*)MALLOC(sizeof(LDKCVec_u8Z), "Empty LDKCVec");
	vec->data = NULL;
	vec->datalen = 0;
	return (long)vec;
}

// We assume that CVec_u8Z and u8slice are the same size and layout (and thus pointers to the two can be mixed)
_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKu8slice), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, data) == offsetof(LDKu8slice, data), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKu8slice, datalen), "Vec<u8> and [u8] need to have been mapped identically");

_Static_assert(sizeof(jlong) == sizeof(int64_t), "We assume that j-types are the same as C types");
_Static_assert(sizeof(jbyte) == sizeof(char), "We assume that j-types are the same as C types");
_Static_assert(sizeof(void*) <= 8, "Pointers must fit into 64 bits");

typedef jlongArray int64_tArray;
typedef jbyteArray int8_tArray;

static inline jstring str_ref_to_java(JNIEnv *env, const char* chars, size_t len) {
	// Sadly we need to create a temporary because Java can't accept a char* without a 0-terminator
	char* err_buf = MALLOC(len + 1, "str conv buf");
	memcpy(err_buf, chars, len);
	err_buf[len] = 0;
	jstring err_conv = (*env)->NewStringUTF(env, chars);
	FREE(err_buf);
	return err_conv;
}
"""

        self.hu_struct_file_prefix = """package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
"""
        self.c_fn_ty_pfx = "JNIEXPORT "
        self.c_fn_args_pfx = "JNIEnv *env, jclass clz"
        self.file_ext = ".java"
        self.ptr_c_ty = "int64_t"
        self.ptr_native_ty = "long"
        self.result_c_ty = "jclass"
        self.ptr_arr = "jobjectArray"
        self.get_native_arr_len_call = ("(*env)->GetArrayLength(env, ", ")")

    def release_native_arr_ptr_call(self, ty_info, arr_var, arr_ptr_var):
        if ty_info.subty is None or not ty_info.subty.c_ty.endswith("Array"):
            return "(*env)->ReleasePrimitiveArrayCritical(env, " + arr_var + ", " + arr_ptr_var + ", 0)"
        return None
    def create_native_arr_call(self, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return "(*env)->NewByteArray(env, " + arr_len + ")"
        elif ty_info.subty.c_ty.endswith("Array"):
            clz_var = ty_info.java_fn_ty_arg[1:].replace("[", "arr_of_")
            self.c_array_class_caches.add(clz_var)
            return "(*env)->NewObjectArray(env, " + arr_len + ", " + clz_var + "_clz, NULL);\n"
        else:
            return "(*env)->New" + ty_info.java_ty.strip("[]").title() + "Array(env, " + arr_len + ")"
    def set_native_arr_contents(self, arr_name, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return ("(*env)->SetByteArrayRegion(env, " + arr_name + ", 0, " + arr_len + ", ", ")")
        else:
            assert False
    def get_native_arr_contents(self, arr_name, dest_name, arr_len, ty_info, copy):
        if ty_info.c_ty == "int8_tArray":
            if copy:
                return "(*env)->GetByteArrayRegion(env, " + arr_name + ", 0, " + arr_len + ", " + dest_name + ")"
            else:
                return "(*env)->GetByteArrayElements (env, " + arr_name + ", NULL)"
        elif not ty_info.java_ty[:len(ty_info.java_ty) - 2].endswith("[]"):
            return "(*env)->Get" + ty_info.subty.java_ty.title() + "ArrayElements (env, " + arr_name + ", NULL)"
        else:
            return None
    def get_native_arr_elem(self, arr_name, idxc, ty_info):
        if self.get_native_arr_contents(arr_name, "", "", ty_info, False) is None:
            return "(*env)->GetObjectArrayElement(env, " + arr_name + ", " + idxc + ")"
        else:
            assert False # Only called if above is None
    def get_native_arr_ptr_call(self, ty_info):
        if ty_info.subty is not None and ty_info.subty.c_ty.endswith("Array"):
            return None
        return ("(*env)->GetPrimitiveArrayCritical(env, ", ", NULL)")
    def get_native_arr_entry_call(self, ty_info, arr_name, idxc, entry_access):
        if ty_info.subty is None or not ty_info.subty.c_ty.endswith("Array"):
            return None
        return "(*env)->SetObjectArrayElement(env, " + arr_name + ", " + idxc + ", " + entry_access + ")"
    def cleanup_native_arr_ref_contents(self, arr_name, dest_name, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return "(*env)->ReleaseByteArrayElements(env, " + arr_name + ", (int8_t*)" + dest_name + ", 0);"
        else:
            return "(*env)->Release" + ty_info.java_ty.strip("[]").title() + "ArrayElements(env, " + arr_name + ", " + dest_name + ", 0)"

    def str_ref_to_c_call(self, var_name, str_len):
        return "str_ref_to_java(env, " + var_name + ", " + str_len + ")"

    def c_fn_name_define_pfx(self, fn_name, has_args):
        if has_args:
            return "JNICALL Java_org_ldk_impl_bindings_" + fn_name.replace("_", "_1") + "(JNIEnv *env, jclass clz, "
        return "JNICALL Java_org_ldk_impl_bindings_" + fn_name.replace("_", "_1") + "(JNIEnv *env, jclass clz"

    def init_str(self):
        res = ""
        for ty in self.c_array_class_caches:
            res = res + "static jclass " + ty + "_clz = NULL;\n"
        res = res + "JNIEXPORT void Java_org_ldk_impl_bindings_init_1class_1cache(JNIEnv * env, jclass clz) {\n"
        for ty in self.c_array_class_caches:
            res = res + "\t" + ty + "_clz = (*env)->FindClass(env, \"" + ty.replace("arr_of_", "[") + "\");\n"
            res = res + "\tCHECK(" + ty + "_clz != NULL);\n"
            res = res + "\t" + ty + "_clz = (*env)->NewGlobalRef(env, " + ty + "_clz);\n"
        res = res + "}\n"
        return res

    def native_c_unitary_enum_map(self, struct_name, variants):
        out_java_enum = "package org.ldk.enums;\n\n"
        out_java = ""
        out_c = ""
        out_c = out_c + "static inline " + struct_name + " " + struct_name + "_from_java(" + self.c_fn_args_pfx + ") {\n"
        out_c = out_c + "\tswitch ((*env)->CallIntMethod(env, clz, ordinal_meth)) {\n"

        out_java_enum = out_java_enum + "public enum " + struct_name + " {\n"
        ord_v = 0
        for var in variants:
            out_java_enum = out_java_enum + "\t" + var + ",\n"
            out_c = out_c + "\t\tcase %d: return %s;\n" % (ord_v, var)
            ord_v = ord_v + 1
        out_java_enum = out_java_enum + "\t; static native void init();\n"
        out_java_enum = out_java_enum + "\tstatic { init(); }\n"
        out_java_enum = out_java_enum + "}"
        out_java = out_java + "\tstatic { " + struct_name + ".values(); /* Force enum statics to run */ }\n"
        out_c = out_c + "\t}\n"
        out_c = out_c + "\tabort();\n"
        out_c = out_c + "}\n"

        out_c = out_c + "static jclass " + struct_name + "_class = NULL;\n"
        for var in variants:
            out_c = out_c + "static jfieldID " + struct_name + "_" + var + " = NULL;\n"
        out_c = out_c + self.c_fn_ty_pfx + "void JNICALL Java_org_ldk_enums_" + struct_name.replace("_", "_1") + "_init (" + self.c_fn_args_pfx + ") {\n"
        out_c = out_c + "\t" + struct_name + "_class = (*env)->NewGlobalRef(env, clz);\n"
        out_c = out_c + "\tCHECK(" + struct_name + "_class != NULL);\n"
        for var in variants:
            out_c = out_c + "\t" + struct_name + "_" + var + " = (*env)->GetStaticFieldID(env, " + struct_name + "_class, \"" + var + "\", \"Lorg/ldk/enums/" + struct_name + ";\");\n"
            out_c = out_c + "\tCHECK(" + struct_name + "_" + var + " != NULL);\n"
        out_c = out_c + "}\n"
        out_c = out_c + "static inline jclass " + struct_name + "_to_java(JNIEnv *env, " + struct_name + " val) {\n"
        out_c = out_c + "\tswitch (val) {\n"
        ord_v = 0
        for var in variants:
            out_c = out_c + "\t\tcase " + var + ":\n"
            out_c = out_c + "\t\t\treturn (*env)->GetStaticObjectField(env, " + struct_name + "_class, " + struct_name + "_" + var + ");\n"
            ord_v = ord_v + 1
        out_c = out_c + "\t\tdefault: abort();\n"
        out_c = out_c + "\t}\n"
        out_c = out_c + "}\n\n"

        return (out_c, out_java_enum, out_java)

    def c_unitary_enum_to_native_call(self, ty_info):
        return (ty_info.rust_obj + "_to_java(env, ", ")")
    def native_unitary_enum_to_c_call(self, ty_info):
        return (ty_info.rust_obj + "_from_java(env, ", ")")

    def c_complex_enum_pfx(self, struct_name, variants, init_meth_jty_strs):
        out_c = ""
        for var in variants:
            out_c = out_c + "static jclass " + struct_name + "_" + var + "_class = NULL;\n"
            out_c = out_c + "static jmethodID " + struct_name + "_" + var + "_meth = NULL;\n"
        out_c = out_c + self.c_fn_ty_pfx + "void JNICALL Java_org_ldk_impl_bindings_00024" + struct_name.replace("_", "_1") + "_init (" + self.c_fn_args_pfx + ") {\n"
        for var_name in variants:
            out_c = out_c + "\t" + struct_name + "_" + var_name + "_class =\n"
            out_c = out_c + "\t\t(*env)->NewGlobalRef(env, (*env)->FindClass(env, \"Lorg/ldk/impl/bindings$" + struct_name + "$" + var_name + ";\"));\n"
            out_c = out_c + "\tCHECK(" + struct_name + "_" + var_name + "_class != NULL);\n"
            out_c = out_c + "\t" + struct_name + "_" + var_name + "_meth = (*env)->GetMethodID(env, " + struct_name + "_" + var_name + "_class, \"<init>\", \"(" + init_meth_jty_strs[var_name] + ")V\");\n"
            out_c = out_c + "\tCHECK(" + struct_name + "_" + var_name + "_meth != NULL);\n"
        out_c = out_c + "}\n"
        return out_c

    def c_complex_enum_pass_ty(self, struct_name):
        return "jobject"

    def c_constr_native_complex_enum(self, struct_name, variant, c_params):
        ret = "(*env)->NewObject(env, " + struct_name + "_" + variant + "_class, " + struct_name + "_" + variant + "_meth"
        for param in c_params:
            ret = ret + ", " + param
        return ret + ")"

    def native_c_map_trait(self, struct_name, field_vars, field_fns):
        out_java_trait = ""
        out_java = ""

        # First generate most of the Java code, note that we need information about java method argument strings for C
        out_java_trait = out_java_trait + self.hu_struct_file_prefix
        out_java_trait = out_java_trait + "public class " + struct_name.replace("LDK","") + " extends CommonBase {\n"
        out_java_trait = out_java_trait + "\tfinal bindings." + struct_name + " bindings_instance;\n"
        out_java_trait = out_java_trait + "\t" + struct_name.replace("LDK", "") + "(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }\n"
        out_java_trait = out_java_trait + "\tprivate " + struct_name.replace("LDK", "") + "(bindings." + struct_name + " arg"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                out_java_trait = out_java_trait + ", " + var.java_hu_ty + " " + var.arg_name
            else:
                out_java_trait = out_java_trait + ", bindings." + var[0] + " " + var[1]
        out_java_trait = out_java_trait + ") {\n"
        out_java_trait = out_java_trait + "\t\tsuper(bindings." + struct_name + "_new(arg"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                if var.from_hu_conv is not None:
                    out_java_trait = out_java_trait + ", " + var.from_hu_conv[0]
                else:
                    out_java_trait = out_java_trait + ", " + var.arg_name
            else:
                out_java_trait = out_java_trait + ", " + var[1]
        out_java_trait = out_java_trait + "));\n"
        out_java_trait = out_java_trait + "\t\tthis.ptrs_to.add(arg);\n"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                if var.from_hu_conv is not None and var.from_hu_conv[1] != "":
                    out_java_trait = out_java_trait + "\t\t" + var.from_hu_conv[1] + ";\n"
            else:
                out_java_trait = out_java_trait + "\t\tthis.ptrs_to.add(" + var[1] + ");\n"
        out_java_trait = out_java_trait + "\t\tthis.bindings_instance = arg;\n"
        out_java_trait = out_java_trait + "\t}\n"
        out_java_trait = out_java_trait + "\t@Override @SuppressWarnings(\"deprecation\")\n"
        out_java_trait = out_java_trait + "\tprotected void finalize() throws Throwable {\n"
        out_java_trait = out_java_trait + "\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); } super.finalize();\n"
        out_java_trait = out_java_trait + "\t}\n\n"

        java_trait_constr = "\tprivate static class " + struct_name + "Holder { " + struct_name.replace("LDK", "") + " held; }\n"
        java_trait_constr = java_trait_constr + "\tpublic static " + struct_name.replace("LDK", "") + " new_impl(" + struct_name.replace("LDK", "") + "Interface arg"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                java_trait_constr = java_trait_constr + ", " + var.java_hu_ty + " " + var.arg_name
            else:
                # Ideally we'd be able to take any instance of the interface, but our C code can only represent
                # Java-implemented version, so we require users pass a Java implementation here :/
                java_trait_constr = java_trait_constr + ", " + var[0].replace("LDK", "") + "." + var[0].replace("LDK", "") + "Interface " + var[1] + "_impl"
        java_trait_constr = java_trait_constr + ") {\n\t\tfinal " + struct_name + "Holder impl_holder = new " + struct_name + "Holder();\n"
        java_trait_constr = java_trait_constr + "\t\timpl_holder.held = new " + struct_name.replace("LDK", "") + "(new bindings." + struct_name + "() {\n"
        out_java_trait = out_java_trait + "\tpublic static interface " + struct_name.replace("LDK", "") + "Interface {\n"
        out_java = out_java + "\tpublic interface " + struct_name + " {\n"
        java_meths = []
        for fn_line in field_fns:
            java_meth_descr = "("
            if fn_line.fn_name != "free" and fn_line.fn_name != "clone":
                out_java = out_java + "\t\t " + fn_line.ret_ty_info.java_ty + " " + fn_line.fn_name + "("
                java_trait_constr = java_trait_constr + "\t\t\t@Override public " + fn_line.ret_ty_info.java_ty + " " + fn_line.fn_name + "("
                out_java_trait = out_java_trait + "\t\t" + fn_line.ret_ty_info.java_hu_ty + " " + fn_line.fn_name + "("

                for idx, arg_conv_info in enumerate(fn_line.args_ty):
                    if idx >= 1:
                        out_java = out_java + ", "
                        java_trait_constr = java_trait_constr + ", "
                        out_java_trait = out_java_trait + ", "
                    out_java = out_java + arg_conv_info.java_ty + " " + arg_conv_info.arg_name
                    out_java_trait = out_java_trait + arg_conv_info.java_hu_ty + " " + arg_conv_info.arg_name
                    java_trait_constr = java_trait_constr + arg_conv_info.java_ty + " " + arg_conv_info.arg_name
                    java_meth_descr = java_meth_descr + arg_conv_info.java_fn_ty_arg
                java_meth_descr = java_meth_descr + ")" + fn_line.ret_ty_info.java_fn_ty_arg
                java_meths.append((fn_line.fn_name, java_meth_descr))

                out_java = out_java + ");\n"
                out_java_trait = out_java_trait + ");\n"
                java_trait_constr = java_trait_constr + ") {\n"

                for arg_info in fn_line.args_ty:
                    if arg_info.to_hu_conv is not None:
                        java_trait_constr = java_trait_constr + "\t\t\t\t" + arg_info.to_hu_conv.replace("\n", "\n\t\t\t\t") + "\n"

                if fn_line.ret_ty_info.java_ty != "void":
                    java_trait_constr = java_trait_constr + "\t\t\t\t" + fn_line.ret_ty_info.java_hu_ty + " ret = arg." + fn_line.fn_name + "("
                else:
                    java_trait_constr = java_trait_constr + "\t\t\t\targ." + fn_line.fn_name + "("

                for idx, arg_info in enumerate(fn_line.args_ty):
                    if idx != 0:
                        java_trait_constr = java_trait_constr + ", "
                    if arg_info.to_hu_conv_name is not None:
                        java_trait_constr = java_trait_constr + arg_info.to_hu_conv_name
                    else:
                        java_trait_constr = java_trait_constr + arg_info.arg_name

                java_trait_constr = java_trait_constr + ");\n"
                if fn_line.ret_ty_info.java_ty != "void":
                    if fn_line.ret_ty_info.from_hu_conv is not None:
                        java_trait_constr = java_trait_constr + "\t\t\t\t" + fn_line.ret_ty_info.java_ty + " result = " + fn_line.ret_ty_info.from_hu_conv[0] + ";\n"
                        if fn_line.ret_ty_info.from_hu_conv[1] != "":
                            java_trait_constr = java_trait_constr + "\t\t\t\t" + fn_line.ret_ty_info.from_hu_conv[1].replace("this", "impl_holder.held") + ";\n"
                        #if fn_line.ret_ty_info.rust_obj in result_types:
                        java_trait_constr = java_trait_constr + "\t\t\t\treturn result;\n"
                    else:
                        java_trait_constr = java_trait_constr + "\t\t\t\treturn ret;\n"
                java_trait_constr = java_trait_constr + "\t\t\t}\n"
        java_trait_constr = java_trait_constr + "\t\t}"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                java_trait_constr = java_trait_constr + ", " + var.arg_name
            else:
                java_trait_constr = java_trait_constr + ", " + var[1] + ".new_impl(" + var[1] + "_impl).bindings_instance"
        out_java_trait = out_java_trait + "\t}\n"
        out_java_trait = out_java_trait + java_trait_constr + ");\n\t\treturn impl_holder.held;\n\t}\n"

        out_java = out_java + "\t}\n"

        out_java = out_java + "\tpublic static native long " + struct_name + "_new(" + struct_name + " impl"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                out_java = out_java + ", " + var.java_ty + " " + var.arg_name
            else:
                out_java = out_java + ", " + var[0] + " " + var[1]
        out_java = out_java + ");\n"

        # Now that we've written out our java code (and created java_meths), generate C
        out_c = "typedef struct " + struct_name + "_JCalls {\n"
        out_c = out_c + "\tatomic_size_t refcnt;\n"
        out_c = out_c + "\tJavaVM *vm;\n"
        out_c = out_c + "\tjweak o;\n"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                # We're a regular ol' field
                pass
            else:
                # We're a supertrait
                out_c = out_c + "\t" + var[0] + "_JCalls* " + var[1] + ";\n"
        for fn in field_fns:
            if fn.fn_name != "free" and fn.fn_name != "clone":
                out_c = out_c + "\tjmethodID " + fn.fn_name + "_meth;\n"
        out_c = out_c + "} " + struct_name + "_JCalls;\n"

        for fn_line in field_fns:
            if fn_line.fn_name == "free":
                out_c = out_c + "static void " + struct_name + "_JCalls_free(void* this_arg) {\n"
                out_c = out_c + "\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n"
                out_c = out_c + "\tif (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {\n"
                out_c = out_c + "\t\tJNIEnv *env;\n"
                out_c = out_c + "\t\tDO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);\n"
                out_c = out_c + "\t\t(*env)->DeleteWeakGlobalRef(env, j_calls->o);\n"
                out_c = out_c + "\t\tFREE(j_calls);\n"
                out_c = out_c + "\t}\n}\n"

        for idx, fn_line in enumerate(field_fns):
            if fn_line.fn_name != "free" and fn_line.fn_name != "clone":
                assert fn_line.ret_ty_info.ty_info.get_full_rust_ty()[1] == ""
                out_c = out_c + fn_line.ret_ty_info.ty_info.get_full_rust_ty()[0] + " " + fn_line.fn_name + "_jcall("
                if fn_line.self_is_const:
                    out_c = out_c + "const void* this_arg"
                else:
                    out_c = out_c + "void* this_arg"

                for idx, arg in enumerate(fn_line.args_ty):
                    out_c = out_c + ", " + arg.ty_info.get_full_rust_ty()[0] + " " + arg.arg_name + arg.ty_info.get_full_rust_ty()[1]

                out_c = out_c + ") {\n"
                out_c = out_c + "\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n"
                out_c = out_c + "\tJNIEnv *env;\n"
                out_c = out_c + "\tDO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);\n"

                for arg_info in fn_line.args_ty:
                    if arg_info.ret_conv is not None:
                        out_c = out_c + "\t" + arg_info.ret_conv[0].replace('\n', '\n\t')
                        out_c = out_c + arg_info.arg_name
                        out_c = out_c + arg_info.ret_conv[1].replace('\n', '\n\t') + "\n"

                out_c = out_c + "\tjobject obj = (*env)->NewLocalRef(env, j_calls->o);\n\tCHECK(obj != NULL);\n"
                if fn_line.ret_ty_info.c_ty.endswith("Array"):
                    out_c = out_c + "\t" + fn_line.ret_ty_info.c_ty + " arg = (*env)->CallObjectMethod(env, obj, j_calls->" + fn_line.fn_name + "_meth"
                elif not fn_line.ret_ty_info.passed_as_ptr:
                    out_c = out_c + "\treturn (*env)->Call" + fn_line.ret_ty_info.java_ty.title() + "Method(env, obj, j_calls->" + fn_line.fn_name + "_meth"
                else:
                    out_c = out_c + "\t" + fn_line.ret_ty_info.rust_obj + "* ret = (" + fn_line.ret_ty_info.rust_obj + "*)(*env)->CallLongMethod(env, obj, j_calls->" + fn_line.fn_name + "_meth"

                for idx, arg_info in enumerate(fn_line.args_ty):
                    if arg_info.ret_conv is not None:
                        out_c = out_c + ", " + arg_info.ret_conv_name
                    else:
                        out_c = out_c + ", " + arg_info.arg_name
                out_c = out_c + ");\n"
                if fn_line.ret_ty_info.arg_conv is not None:
                    out_c = out_c + "\t" + fn_line.ret_ty_info.arg_conv.replace("\n", "\n\t") + "\n\treturn " + fn_line.ret_ty_info.arg_conv_name + ";\n"

                out_c = out_c + "}\n"

        # Write out a clone function whether we need one or not, as we use them in moving to rust
        out_c = out_c + "static void* " + struct_name + "_JCalls_clone(const void* this_arg) {\n"
        out_c = out_c + "\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n"
        out_c = out_c + "\tatomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);\n"
        for var in field_vars:
            if not isinstance(var, ConvInfo):
                out_c = out_c + "\tatomic_fetch_add_explicit(&j_calls->" + var[1] + "->refcnt, 1, memory_order_release);\n"
        out_c = out_c + "\treturn (void*) this_arg;\n"
        out_c = out_c + "}\n"

        out_c = out_c + "static inline " + struct_name + " " + struct_name + "_init (" + self.c_fn_args_pfx + ", jobject o"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                out_c = out_c + ", " + var.c_ty + " " + var.arg_name
            else:
                out_c = out_c + ", jobject " + var[1]
        out_c = out_c + ") {\n"

        out_c = out_c + "\tjclass c = (*env)->GetObjectClass(env, o);\n"
        out_c = out_c + "\tCHECK(c != NULL);\n"
        out_c = out_c + "\t" + struct_name + "_JCalls *calls = MALLOC(sizeof(" + struct_name + "_JCalls), \"" + struct_name + "_JCalls\");\n"
        out_c = out_c + "\tatomic_init(&calls->refcnt, 1);\n"
        out_c = out_c + "\tDO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);\n"
        out_c = out_c + "\tcalls->o = (*env)->NewWeakGlobalRef(env, o);\n"

        for (fn_name, java_meth_descr) in java_meths:
            if fn_name != "free" and fn_name != "clone":
                out_c = out_c + "\tcalls->" + fn_name + "_meth = (*env)->GetMethodID(env, c, \"" + fn_name + "\", \"" + java_meth_descr + "\");\n"
                out_c = out_c + "\tCHECK(calls->" + fn_name + "_meth != NULL);\n"

        for var in field_vars:
            if isinstance(var, ConvInfo) and var.arg_conv is not None:
                out_c = out_c + "\n\t" + var.arg_conv.replace("\n", "\n\t") +"\n"
        out_c = out_c + "\n\t" + struct_name + " ret = {\n"
        out_c = out_c + "\t\t.this_arg = (void*) calls,\n"
        for fn_line in field_fns:
            if fn_line.fn_name != "free" and fn_line.fn_name != "clone":
                out_c = out_c + "\t\t." + fn_line.fn_name + " = " + fn_line.fn_name + "_jcall,\n"
            elif fn_line.fn_name == "free":
                out_c = out_c + "\t\t.free = " + struct_name + "_JCalls_free,\n"
            else:
                out_c = out_c + "\t\t.clone = " + struct_name + "_JCalls_clone,\n"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                if var.arg_conv_name is not None:
                    out_c = out_c + "\t\t." + var.arg_name + " = " + var.arg_conv_name + ",\n"
                    out_c = out_c + "\t\t.set_" + var.arg_name + " = NULL,\n"
                else:
                    out_c = out_c + "\t\t." + var.var_name + " = " + var.var_name + ",\n"
                    out_c = out_c + "\t\t.set_" + var.var_name + " = NULL,\n"
            else:
                out_c = out_c + "\t\t." + var[1] + " = " + var[0] + "_init(env, clz, " + var[1] + "),\n"
        out_c = out_c + "\t};\n"
        for var in field_vars:
            if not isinstance(var, ConvInfo):
                out_c = out_c + "\tcalls->" + var[1] + " = ret." + var[1] + ".this_arg;\n"
        out_c = out_c + "\treturn ret;\n"
        out_c = out_c + "}\n"

        out_c = out_c + self.c_fn_ty_pfx + "long " + self.c_fn_name_define_pfx(struct_name + "_new", True) + "jobject o"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                out_c = out_c + ", " + var.c_ty + " " + var.arg_name
            else:
                out_c = out_c + ", jobject " + var[1]
        out_c = out_c + ") {\n"
        out_c = out_c + "\t" + struct_name + " *res_ptr = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n"
        out_c = out_c + "\t*res_ptr = " + struct_name + "_init(env, clz, o"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                out_c = out_c + ", " + var.arg_name
            else:
                out_c = out_c + ", " + var[1]
        out_c = out_c + ");\n"
        out_c = out_c + "\treturn (long)res_ptr;\n"
        out_c = out_c + "}\n"

        return (out_java, out_java_trait, out_c)

    def trait_struct_inc_refcnt(self, ty_info):
        base_conv = "\nif (" + ty_info.var_name + "_conv.free == " + ty_info.rust_obj + "_JCalls_free) {\n"
        base_conv = base_conv + "\t// If this_arg is a JCalls struct, then we need to increment the refcnt in it.\n"
        base_conv = base_conv + "\t" + ty_info.rust_obj + "_JCalls_clone(" + ty_info.var_name + "_conv.this_arg);\n}"
        return base_conv

    def map_complex_enum(self, struct_name, variant_list, camel_to_snake):
        java_hu_type = struct_name.replace("LDK", "")
        out_java_enum = ""
        out_java = ""
        out_c = ""

        out_java_enum += (self.hu_struct_file_prefix)
        out_java_enum += ("public class " + java_hu_type + " extends CommonBase {\n")
        out_java_enum += ("\tprivate " + java_hu_type + "(Object _dummy, long ptr) { super(ptr); }\n")
        out_java_enum += ("\t@Override @SuppressWarnings(\"deprecation\")\n")
        out_java_enum += ("\tprotected void finalize() throws Throwable {\n")
        out_java_enum += ("\t\tsuper.finalize();\n")
        out_java_enum += ("\t\tif (ptr != 0) { bindings." + java_hu_type + "_free(ptr); }\n")
        out_java_enum += ("\t}\n")
        out_java_enum += ("\tstatic " + java_hu_type + " constr_from_ptr(long ptr) {\n")
        out_java_enum += ("\t\tbindings." + struct_name + " raw_val = bindings." + struct_name + "_ref_from_ptr(ptr);\n")
        java_hu_subclasses = ""

        init_meth_jty_strs = {}

        out_java +=  ("\tpublic static class " + struct_name + " {\n")
        out_java +=  ("\t\tprivate " + struct_name + "() {}\n")
        for var in variant_list:
            out_java +=  ("\t\tpublic final static class " + var.var_name + " extends " + struct_name + " {\n")
            java_hu_subclasses = java_hu_subclasses + "\tpublic final static class " + var.var_name + " extends " + java_hu_type + " {\n"
            out_java_enum += ("\t\tif (raw_val.getClass() == bindings." + struct_name + "." + var.var_name + ".class) {\n")
            out_java_enum += ("\t\t\treturn new " + var.var_name + "(ptr, (bindings." + struct_name + "." + var.var_name + ")raw_val);\n")
            init_meth_jty_str = ""
            init_meth_params = ""
            init_meth_body = ""
            hu_conv_body = ""
            for idx, field_ty in enumerate(var.fields):
                out_java += ("\t\t\tpublic " + field_ty.java_ty + " " + field_ty.arg_name + ";\n")
                java_hu_subclasses = java_hu_subclasses + "\t\tpublic final " + field_ty.java_hu_ty + " " + field_ty.arg_name + ";\n"
                if field_ty.to_hu_conv is not None:
                    hu_conv_body = hu_conv_body + "\t\t\t" + field_ty.java_ty + " " + field_ty.arg_name + " = obj." + field_ty.arg_name + ";\n"
                    hu_conv_body = hu_conv_body + "\t\t\t" + field_ty.to_hu_conv.replace("\n", "\n\t\t\t") + "\n"
                    hu_conv_body = hu_conv_body + "\t\t\tthis." + field_ty.arg_name + " = " + field_ty.to_hu_conv_name + ";\n"
                else:
                    hu_conv_body = hu_conv_body + "\t\t\tthis." + field_ty.arg_name + " = obj." + field_ty.arg_name + ";\n"
                init_meth_jty_str = init_meth_jty_str + field_ty.java_fn_ty_arg
                if idx > 0:
                    init_meth_params = init_meth_params + ", "
                init_meth_params = init_meth_params + field_ty.java_ty + " " + field_ty.arg_name
                init_meth_body = init_meth_body + "this." + field_ty.arg_name + " = " + field_ty.arg_name + "; "
            out_java +=  ("\t\t\t" + var.var_name + "(" + init_meth_params + ") { ")
            out_java +=  (init_meth_body)
            out_java +=  ("}\n")
            out_java += ("\t\t}\n")
            out_java_enum += ("\t\t}\n")
            java_hu_subclasses = java_hu_subclasses + "\t\tprivate " + var.var_name + "(long ptr, bindings." + struct_name + "." + var.var_name + " obj) {\n\t\t\tsuper(null, ptr);\n"
            java_hu_subclasses = java_hu_subclasses + hu_conv_body
            java_hu_subclasses = java_hu_subclasses + "\t\t}\n\t}\n"
            init_meth_jty_strs[var.var_name] = init_meth_jty_str
        out_java += ("\t\tstatic native void init();\n")
        out_java += ("\t}\n")
        out_java_enum += ("\t\tassert false; return null; // Unreachable without extending the (internal) bindings interface\n\t}\n\n")
        out_java_enum += (java_hu_subclasses)
        out_java += ("\tstatic { " + struct_name + ".init(); }\n")
        out_java += ("\tpublic static native " + struct_name + " " + struct_name + "_ref_from_ptr(long ptr);\n");

        out_c += (self.c_complex_enum_pfx(struct_name, [x.var_name for x in variant_list], init_meth_jty_strs))

        out_c += (self.c_fn_ty_pfx + self.c_complex_enum_pass_ty(struct_name) + " " + self.c_fn_name_define_pfx(struct_name + "_ref_from_ptr", True) + self.ptr_c_ty + " ptr) {\n")
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
        return (out_java, out_java_enum, out_c)

    def map_opaque_struct(self, struct_name):
        out_opaque_struct_human = ""
        out_opaque_struct_human += self.hu_struct_file_prefix
        out_opaque_struct_human += ("public class " + struct_name.replace("LDK","") + " extends CommonBase")
        if struct_name.startswith("LDKLocked"):
            out_opaque_struct_human += (" implements AutoCloseable")
        out_opaque_struct_human += (" {\n")
        out_opaque_struct_human += ("\t" + struct_name.replace("LDK", "") + "(Object _dummy, long ptr) { super(ptr); }\n")
        if struct_name.startswith("LDKLocked"):
            out_opaque_struct_human += ("\t@Override public void close() {\n")
        else:
            out_opaque_struct_human += ("\t@Override @SuppressWarnings(\"deprecation\")\n")
            out_opaque_struct_human += ("\tprotected void finalize() throws Throwable {\n")
            out_opaque_struct_human += ("\t\tsuper.finalize();\n")
        out_opaque_struct_human += ("\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); }\n")
        out_opaque_struct_human += ("\t}\n\n")
        return out_opaque_struct_human


    def map_function(self, argument_types, c_call_string, method_name, return_type_info, struct_meth, default_constructor_args, takes_self, args_known, type_mapping_generator):
        out_java = ""
        out_c = ""
        out_java_struct = None

        out_java += ("\tpublic static native ")
        out_c += (self.c_fn_ty_pfx)
        out_c += (return_type_info.c_ty)
        out_java += (return_type_info.java_ty)
        if return_type_info.ret_conv is not None:
            ret_conv_pfx, ret_conv_sfx = return_type_info.ret_conv
        out_java += (" " + method_name + "(")
        have_args = len(argument_types) > 1 or (len(argument_types) > 0 and argument_types[0].c_ty != "void")
        out_c += (" " + self.c_fn_name_define_pfx(method_name, have_args))

        for idx, arg_conv_info in enumerate(argument_types):
            if idx != 0:
                out_java += (", ")
                out_c += (", ")
            if arg_conv_info.c_ty != "void":
                out_c += (arg_conv_info.c_ty + " " + arg_conv_info.arg_name)
                out_java += (arg_conv_info.java_ty + " " + arg_conv_info.arg_name)

        out_java_struct = ""
        if not args_known:
            out_java_struct += ("\t// Skipped " + method_name + "\n")
        else:
            meth_n = method_name[len(struct_meth) + 1:]
            if not takes_self:
                out_java_struct += (
                    "\tpublic static " + return_type_info.java_hu_ty + " constructor_" + meth_n + "(")
            else:
                out_java_struct += ("\tpublic " + return_type_info.java_hu_ty + " " + meth_n + "(")
            for idx, arg in enumerate(argument_types):
                if idx != 0:
                    if not takes_self or idx > 1:
                        out_java_struct += (", ")
                elif takes_self:
                    continue
                if arg.java_ty != "void":
                    if arg.arg_name in default_constructor_args:
                        for explode_idx, explode_arg in enumerate(default_constructor_args[arg.arg_name]):
                            if explode_idx != 0:
                                out_java_struct += (", ")
                            out_java_struct += (
                                explode_arg.java_hu_ty + " " + arg.arg_name + "_" + explode_arg.arg_name)
                    else:
                        out_java_struct += (arg.java_hu_ty + " " + arg.arg_name)
        out_java += (");\n")
        out_c += (") {\n")
        if out_java_struct is not None:
            out_java_struct += (") {\n")
        for info in argument_types:
            if info.arg_conv is not None:
                out_c += ("\t" + info.arg_conv.replace('\n', "\n\t") + "\n")
        if return_type_info.ret_conv is not None:
            out_c += ("\t" + ret_conv_pfx.replace('\n', '\n\t'))
        elif return_type_info.c_ty != "void":
            out_c += ("\t" + return_type_info.c_ty + " ret_val = ")
        else:
            out_c += ("\t")
        if c_call_string is None:
            out_c += (method_name + "(")
        else:
            out_c += (c_call_string)
        for idx, info in enumerate(argument_types):
            if info.arg_conv_name is not None:
                if idx != 0:
                    out_c += (", ")
                elif c_call_string is not None:
                    continue
                out_c += (info.arg_conv_name)
        out_c += (")")
        if return_type_info.ret_conv is not None:
            out_c += (ret_conv_sfx.replace('\n', '\n\t'))
        else:
            out_c += (";")
        for info in argument_types:
            if info.arg_conv_cleanup is not None:
                out_c += ("\n\t" + info.arg_conv_cleanup.replace("\n", "\n\t"))
        if return_type_info.ret_conv is not None:
            out_c += ("\n\treturn " + return_type_info.ret_conv_name + ";")
        elif return_type_info.c_ty != "void":
            out_c += ("\n\treturn ret_val;")
        out_c += ("\n}\n\n")

        if args_known:
            out_java_struct += ("\t\t")
            if return_type_info.java_ty != "void":
                out_java_struct += (return_type_info.java_ty + " ret = ")
            out_java_struct += ("bindings." + method_name + "(")
            for idx, info in enumerate(argument_types):
                if idx != 0:
                    out_java_struct += (", ")
                if idx == 0 and takes_self:
                    out_java_struct += ("this.ptr")
                elif info.arg_name in default_constructor_args:
                    out_java_struct += ("bindings." + info.java_hu_ty + "_new(")
                    for explode_idx, explode_arg in enumerate(default_constructor_args[info.arg_name]):
                        if explode_idx != 0:
                            out_java_struct += (", ")
                        expl_arg_name = info.arg_name + "_" + explode_arg.arg_name
                        if explode_arg.from_hu_conv is not None:
                            out_java_struct += (
                                explode_arg.from_hu_conv[0].replace(explode_arg.arg_name, expl_arg_name))
                        else:
                            out_java_struct += (expl_arg_name)
                    out_java_struct += (")")
                elif info.from_hu_conv is not None:
                    out_java_struct += (info.from_hu_conv[0])
                else:
                    out_java_struct += (info.arg_name)
            out_java_struct += (");\n")
            if return_type_info.to_hu_conv is not None:
                if not takes_self:
                    out_java_struct += ("\t\t" + return_type_info.to_hu_conv.replace("\n", "\n\t\t").replace("this",
                                                                                                               return_type_info.to_hu_conv_name) + "\n")
                else:
                    out_java_struct += ("\t\t" + return_type_info.to_hu_conv.replace("\n", "\n\t\t") + "\n")

            for idx, info in enumerate(argument_types):
                if idx == 0 and takes_self:
                    pass
                elif info.arg_name in default_constructor_args:
                    for explode_arg in default_constructor_args[info.arg_name]:
                        expl_arg_name = info.arg_name + "_" + explode_arg.arg_name
                        if explode_arg.from_hu_conv is not None and return_type_info.to_hu_conv_name:
                            out_java_struct += ("\t\t" + explode_arg.from_hu_conv[1].replace(explode_arg.arg_name,
                                                                                               expl_arg_name).replace(
                                "this", return_type_info.to_hu_conv_name) + ";\n")
                elif info.from_hu_conv is not None and info.from_hu_conv[1] != "":
                    if not takes_self and return_type_info.to_hu_conv_name is not None:
                        out_java_struct += (
                            "\t\t" + info.from_hu_conv[1].replace("this", return_type_info.to_hu_conv_name) + ";\n")
                    else:
                        out_java_struct += ("\t\t" + info.from_hu_conv[1] + ";\n")

            if return_type_info.to_hu_conv_name is not None:
                out_java_struct += ("\t\treturn " + return_type_info.to_hu_conv_name + ";\n")
            elif return_type_info.java_ty != "void" and return_type_info.rust_obj != "LDK" + struct_meth:
                out_java_struct += ("\t\treturn ret;\n")
            out_java_struct += ("\t}\n\n")

        return (out_java, out_c, out_java_struct)
