from bindingstypes import *

class Consts:
    def __init__(self, DEBUG):
        self.common_base = """package org.ldk.structs;
import java.util.LinkedList;
class CommonBase {
	long ptr;
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
} allocation;
static allocation* allocation_ll = NULL;

void* __real_malloc(size_t len);
void* __real_calloc(size_t nmemb, size_t len);
static void new_allocation(void* res, const char* struct_name) {
	allocation* new_alloc = __real_malloc(sizeof(allocation));
	new_alloc->ptr = res;
	new_alloc->struct_name = struct_name;
	new_alloc->bt_len = backtrace(new_alloc->bt, BT_MAX);
	DO_ASSERT(mtx_lock(&allocation_mtx) == thrd_success);
	new_alloc->next = allocation_ll;
	allocation_ll = new_alloc;
	DO_ASSERT(mtx_unlock(&allocation_mtx) == thrd_success);
}
static void* MALLOC(size_t len, const char* struct_name) {
	void* res = __real_malloc(len);
	new_allocation(res, struct_name);
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
		fprintf(stderr, "%s %p remains:\\n", a->struct_name, a->ptr);
		backtrace_symbols_fd(a->bt, a->bt_len, STDERR_FILENO);
		fprintf(stderr, "\\n\\n");
	}
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

"""

        self.hu_struct_file_prefix = """package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
"""
        self.c_fn_ty_pfx = "JNIEXPORT "
        self.c_fn_name_pfx = "JNICALL Java_org_ldk_impl_bindings_"
        self.c_fn_args_pfx = "JNIEnv *env, jclass clz"
        self.file_ext = ".java"
        self.ptr_c_ty = "int64_t"
        self.ptr_native_ty = "long"
        self.result_c_ty = "jclass"
        self.ptr_arr = "jobjectArray"
        self.get_native_arr_len_call = ("(*env)->GetArrayLength(env, ", ")")
        self.get_native_arr_ptr_call = ("(*env)->GetPrimitiveArrayCritical(env, ", ", NULL)")

    def release_native_arr_ptr_call(self, arr_var, arr_ptr_var):
        return "(*env)->ReleasePrimitiveArrayCritical(env, " + arr_var + ", " + arr_ptr_var + ", 0)"
    def create_native_arr_call(self, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return "(*env)->NewByteArray(env, " + arr_len + ")"
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
    def cleanup_native_arr_ref_contents(self, arr_name, dest_name, arr_len, ty_info):
        if ty_info.c_ty == "int8_tArray":
            return "(*env)->ReleaseByteArrayElements(env, " + arr_name + ", (int8_t*)" + dest_name + ", 0);"
        else:
            return "(*env)->Release" + ty_info.java_ty.strip("[]").title() + "ArrayElements(env, " + arr_name + ", " + dest_name + ", 0)"

    def init_str(self, c_array_class_caches):
        res = ""
        for ty in c_array_class_caches:
            res = res + "static jclass " + ty + "_clz = NULL;\n"
        res = res + "JNIEXPORT void Java_org_ldk_impl_bindings_init_1class_1cache(JNIEnv * env, jclass clz) {\n"
        for ty in c_array_class_caches:
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

        for fn_line in field_fns:
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

        return ("", out_c)
