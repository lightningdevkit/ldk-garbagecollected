from bindingstypes import *
from enum import Enum
import sys

class Target(Enum):
    CSHARP = 1,

class Consts:
    def __init__(self, DEBUG: bool, target: Target, **kwargs):
        self.target = target
        self.c_array_class_caches = set()
        self.c_type_map = dict(
            bool = ['bool'],
            uint8_t = ['byte'],
            uint16_t = ['short'],
            uint32_t = ['int'],
            uint64_t = ['long'],
        )
        self.java_type_map = dict(
            String = "string"
        )
        self.java_hu_type_map = dict(
            String = "string"
        )

        self.to_hu_conv_templates = dict(
            ptr = '{human_type} {var_name}_hu_conv = null; if ({var_name} < 0 || {var_name} > 4096) { {var_name}_hu_conv = new {human_type}(null, {var_name}); }',
            default = '{human_type} {var_name}_hu_conv = null; if ({var_name} < 0 || {var_name} > 4096) { {var_name}_hu_conv = new {human_type}(null, {var_name}); }'
        )

        self.bindings_header = """
using org.ldk.enums;
using org.ldk.impl;
using System.Runtime.InteropServices;

namespace org { namespace ldk { namespace impl {

internal class bindings {
	/*static {
		init(java.lang.Enum.class, VecOrSliceDef.class);
		init_class_cache();
		if (!get_lib_version_string().equals(version.get_ldk_java_bindings_version()))
			throw new ArgumentException("Compiled LDK library and LDK class failes do not match");
		// Fetching the LDK versions from C also checks that the header and binaries match
		Console.Error.WriteLine("Loaded LDK-Java Bindings " + version.get_ldk_java_bindings_version() + " with LDK " + get_ldk_version() + " and LDK-C-Bindings " + get_ldk_c_bindings_version());
	}*/
	//static extern void init(java.lang.Class c);
	//static native void init_class_cache();
"""
        self.bindings_header += self.native_meth_decl("get_lib_version_string", "string") + "();\n"
        self.bindings_header += self.native_meth_decl("get_ldk_c_bindings_version", "string") + "();\n"
        self.bindings_header += self.native_meth_decl("get_ldk_version", "string") + "();\n\n"

        self.bindings_version_file = """

public class version {
	public static string get_ldk_java_bindings_version() {
		return "<git_version_ldk_garbagecollected>";
	}
}"""

        self.util_fn_pfx = """using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using org.ldk.structs;
using System;

namespace org { namespace ldk { namespace util {
public class UtilMethods {
"""
        self.util_fn_sfx = "} } } }"
        self.common_base = """using System.Collections.Generic;
using System.Diagnostics;

public class CommonBase {
	protected internal long ptr;
	protected internal LinkedList<object> ptrs_to = new LinkedList<object>();
	protected CommonBase(long ptr) { Trace.Assert(ptr < 0 || ptr > 4096); this.ptr = ptr; }
}
"""

        self.txout_defn = """public class TxOut : CommonBase {
	/** The script_pubkey in this output */
	public readonly byte[] script_pubkey;
	/** The value, in satoshis, of this output */
	public readonly long value;

    internal TxOut(object _dummy, long ptr) : base(ptr) {
		this.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);
		this.value = bindings.TxOut_get_value(ptr);
	}
    public TxOut(long value, byte[] script_pubkey) : base(bindings.TxOut_new(script_pubkey, value)) {
		this.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);
		this.value = bindings.TxOut_get_value(ptr);
	}

	~TxOut() {
		if (ptr != 0) { bindings.TxOut_free(ptr); }
	}
}"""

        self.scalar_defn = """public class BigEndianScalar : CommonBase {
	/** The bytes of the scalar value, in big endian */
	public readonly byte[] scalar_bytes;

    internal BigEndianScalar(object _dummy, long ptr) : base(ptr) {
		this.scalar_bytes = bindings.BigEndianScalar_get_bytes(ptr);
	}
    public BigEndianScalar(byte[] scalar_bytes) : base(bindings.BigEndianScalar_new(scalar_bytes)) {
		this.scalar_bytes = bindings.BigEndianScalar_get_bytes(ptr);
	}

	~BigEndianScalar() {
		if (ptr != 0) { bindings.BigEndianScalar_free(ptr); }
	}
}"""


        self.c_file_pfx = """
// On OSX jlong (ie long long) is not equivalent to int64_t, so we override here
#define int64_t jlong
#include <lightning.h>
#include <string.h>
#include <stdatomic.h>
#include <stdlib.h>

#define LIKELY(v) __builtin_expect(!!(v), 1)
#define UNLIKELY(v) __builtin_expect(!!(v), 0)

"""

        self.c_file_pfx = self.c_file_pfx + "#include <stdio.h>\n#define DEBUG_PRINT(...) fprintf(stderr, __VA_ARGS__)\n"

        if not DEBUG or sys.platform == "darwin":
            self.c_file_pfx = self.c_file_pfx + """#define MALLOC(a, _) malloc(a)
#define FREE(p) if ((uint64_t)(p) > 4096) { free(p); }
#define CHECK_ACCESS(p)
#define CHECK_INNER_FIELD_ACCESS_OR_NULL(v)
"""
        if not DEBUG:
            self.c_file_pfx += """#define DO_ASSERT(a) (void)(a)
#define CHECK(a)
"""
        if DEBUG:
            self.c_file_pfx = self.c_file_pfx + """#include <assert.h>
// Always run a, then assert it is true:
#define DO_ASSERT(a) do { bool _assert_val = (a); assert(_assert_val); } while(0)
// Assert a is true or do nothing
#define CHECK(a) DO_ASSERT(a)

void __attribute__((constructor)) debug_log_version() {
	if (check_get_ldk_version() == NULL)
		DEBUG_PRINT("LDK version did not match the header we built against\\n");
	if (check_get_ldk_bindings_version() == NULL)
		DEBUG_PRINT("LDK C Bindings version did not match the header we built against\\n");
}
"""

            if sys.platform != "darwin":
                self.c_file_pfx += """
// Running a leak check across all the allocations and frees of the JDK is a mess,
// so instead we implement our own naive leak checker here, relying on the -wrap
// linker option to wrap malloc/calloc/realloc/free, tracking everyhing allocated
// and free'd in Rust or C across the generated bindings shared library.
#include <threads.h>
"""

                self.c_file_pfx = self.c_file_pfx + "#include <execinfo.h>\n"
                self.c_file_pfx = self.c_file_pfx + """
#include <unistd.h>
#include <pthread.h>
static pthread_mutex_t allocation_mtx;

void __attribute__((constructor)) init_mtx() {
	DO_ASSERT(!pthread_mutex_init(&allocation_mtx, NULL));
}

#define BT_MAX 128
typedef struct allocation {
	struct allocation* next;
	void* ptr;
	const char* struct_name;
	void* bt[BT_MAX];
	int bt_len;
	unsigned long alloc_len;
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
	DO_ASSERT(!pthread_mutex_lock(&allocation_mtx));
	new_alloc->next = allocation_ll;
	allocation_ll = new_alloc;
	DO_ASSERT(!pthread_mutex_unlock(&allocation_mtx));
}
static void* MALLOC(size_t len, const char* struct_name) {
	void* res = __real_malloc(len);
	new_allocation(res, struct_name, len);
	return res;
}
void __real_free(void* ptr);
static void alloc_freed(void* ptr) {
	allocation* p = NULL;
	DO_ASSERT(!pthread_mutex_lock(&allocation_mtx));
	allocation* it = allocation_ll;
	while (it->ptr != ptr) {
		p = it; it = it->next;
		if (it == NULL) {
			DEBUG_PRINT("ERROR: Tried to free unknown pointer %p at:\\n", ptr);
			void* bt[BT_MAX];
			int bt_len = backtrace(bt, BT_MAX);
			backtrace_symbols_fd(bt, bt_len, STDERR_FILENO);
			DEBUG_PRINT("\\n\\n");
			DO_ASSERT(!pthread_mutex_unlock(&allocation_mtx));
			return; // addrsan should catch malloc-unknown and print more info than we have
		}
	}
	if (p) { p->next = it->next; } else { allocation_ll = it->next; }
	DO_ASSERT(!pthread_mutex_unlock(&allocation_mtx));
	DO_ASSERT(it->ptr == ptr);
	__real_free(it);
}
static void FREE(void* ptr) {
	if ((uint64_t)ptr <= 4096) return; // Rust loves to create pointers to the NULL page for dummys
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

static void CHECK_ACCESS(const void* ptr) {
	DO_ASSERT(!pthread_mutex_lock(&allocation_mtx));
	allocation* it = allocation_ll;
	while (it->ptr != ptr) {
		it = it->next;
		if (it == NULL) {
			DEBUG_PRINT("ERROR: Tried to access unknown pointer %p at:\\n", ptr);
			void* bt[BT_MAX];
			int bt_len = backtrace(bt, BT_MAX);
			backtrace_symbols_fd(bt, bt_len, STDERR_FILENO);
			DEBUG_PRINT("\\n\\n");
			DO_ASSERT(!pthread_mutex_unlock(&allocation_mtx));
			return; // addrsan should catch and print more info than we have
		}
	}
	DO_ASSERT(!pthread_mutex_unlock(&allocation_mtx));
}
#define CHECK_INNER_FIELD_ACCESS_OR_NULL(v) \\
	if (v.is_owned && v.inner != NULL) { \\
		const void *p = __unmangle_inner_ptr(v.inner); \\
		if (p != NULL) { \\
			CHECK_ACCESS(p); \\
		} \\
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
	unsigned long alloc_count = 0;
	unsigned long alloc_size = 0;
	DEBUG_PRINT("The following LDK-allocated blocks still remain.\\n");
	DEBUG_PRINT("Note that this is only accurate if System.gc(); System.runFinalization()\\n");
	DEBUG_PRINT("was called prior to exit after all LDK objects were out of scope.\\n");
	for (allocation* a = allocation_ll; a != NULL; a = a->next) {
		DEBUG_PRINT("%s %p (%lu bytes) remains:\\n", a->struct_name, a->ptr, a->alloc_len);
		backtrace_symbols_fd(a->bt, a->bt_len, STDERR_FILENO);
		DEBUG_PRINT("\\n\\n");
		alloc_count++;
		alloc_size += a->alloc_len;
	}
	DEBUG_PRINT("%lu allocations remained for %lu bytes.\\n", alloc_count, alloc_size);
	DEBUG_PRINT("Note that this is only accurate if System.gc(); System.runFinalization()\\n");
	DEBUG_PRINT("was called prior to exit after all LDK objects were out of scope.\\n");
}
"""
        self.c_file_pfx = self.c_file_pfx + """

// We assume that CVec_u8Z and u8slice are the same size and layout (and thus pointers to the two can be mixed)
_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKu8slice), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, data) == offsetof(LDKu8slice, data), "Vec<u8> and [u8] need to have been mapped identically");
_Static_assert(offsetof(LDKCVec_u8Z, datalen) == offsetof(LDKu8slice, datalen), "Vec<u8> and [u8] need to have been mapped identically");

_Static_assert(sizeof(void*) <= 8, "Pointers must fit into 64 bits");

typedef jlongArray int64_tArray;
typedef jbyteArray int8_tArray;

static inline jstring str_ref_to_java(JNIEnv *env, const char* chars, size_t len) {
	// Sadly we need to create a temporary because Java can't accept a char* without a 0-terminator
	char* conv_buf = MALLOC(len + 1, "str conv buf");
	memcpy(conv_buf, chars, len);
	conv_buf[len] = 0;
	jstring ret = (*env)->NewStringUTF(env, conv_buf);
	FREE(conv_buf);
	return ret;
}
static inline LDKStr java_to_owned_str(JNIEnv *env, jstring str) {
	uint64_t str_len = (*env)->GetStringUTFLength(env, str);
	char* newchars = MALLOC(str_len + 1, "String chars");
	const char* jchars = (*env)->GetStringUTFChars(env, str, NULL);
	memcpy(newchars, jchars, str_len);
	newchars[str_len] = 0;
	(*env)->ReleaseStringUTFChars(env, str, jchars);
	LDKStr res = {
		.chars = newchars,
		.len = str_len,
		.chars_is_owned = true
	};
	return res;
}

const char* CS_LDK_get_ldk_c_bindings_version() {
	return str_ref_to_java(check_get_ldk_bindings_version(), strlen(check_get_ldk_bindings_version()));
}
const char* CS_LDK_get_ldk_version() {
	return str_ref_to_java(check_get_ldk_version(), strlen(check_get_ldk_version()));
}
#include "version.c"
"""
        self.c_version_file = """const char* CS_LDK_get_lib_version_string() {
	return "<git_version_ldk_garbagecollected>";
}"""

        self.hu_struct_file_prefix = """using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

"""
        self.hu_struct_file_suffix = "} } }\n"
        self.c_fn_args_pfx = ""
        self.c_fn_ty_pfx = ""
        self.file_ext = ".cs"
        self.ptr_c_ty = "int64_t"
        self.ptr_native_ty = "long"
        self.u128_native_ty = "UInt128"
        self.usize_c_ty = "int64_t"
        self.usize_native_ty = "long"
        self.native_zero_ptr = "0"
        self.result_c_ty = "jclass"
        self.ptr_arr = "jobjectArray"
        self.is_arr_some_check = ("", " != NULL")
        self.get_native_arr_len_call = ("(*env)->GetArrayLength(env, ", ")")

        self.bindings_footer_wip = "\tstatic bindings() {\n"
    def bindings_footer(self):
        return self.bindings_footer_wip + "\t}\n}\n} } }\n"

    def native_meth_decl(self, meth_name, ret_ty_str):
        return "\t[DllImport (\"ldkcsharp\", EntryPoint=\"CS_LDK_" + meth_name + "\")] public static extern " + ret_ty_str + " " + meth_name

    def c_fn_name_define_pfx(self, fn_name, have_args):
        return " CS_LDK_" + fn_name + "("

    def construct_jenv(self):
        res =  "JNIEnv *env;\n"
        res += "jint get_jenv_res = (*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_6);\n"
        res += "if (get_jenv_res == JNI_EDETACHED) {\n"
        res += "\tDO_ASSERT((*j_calls->vm)->AttachCurrentThread(j_calls->vm, (void**)&env, NULL) == JNI_OK);\n"
        res += "} else {\n"
        res += "\tDO_ASSERT(get_jenv_res == JNI_OK);\n"
        res += "}\n"
        return res
    def deconstruct_jenv(self):
        res = "if (get_jenv_res == JNI_EDETACHED) {\n"
        res += "\tDO_ASSERT((*j_calls->vm)->DetachCurrentThread(j_calls->vm) == JNI_OK);\n"
        res += "}\n"
        return res

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

    def map_hu_array_elems(self, arr_name, conv_name, arr_ty, elem_ty):
        if elem_ty.java_hu_ty == "UInt5":
            return arr_name + " != null ? InternalUtils.convUInt5Array(" + arr_name + ") : null"
        elif elem_ty.java_hu_ty == "WitnessVersion":
            return arr_name + " != null ? InternalUtils.convWitnessVersionArray(" + arr_name + ") : null"
        else:
            return arr_name + " != null ? InternalUtils.mapArray(" + arr_name + ", " + conv_name + " => " + elem_ty.from_hu_conv[0] + ") : null"

    def str_ref_to_native_call(self, var_name, str_len):
        return "str_ref_to_java(env, " + var_name + ", " + str_len + ")"
    def str_ref_to_c_call(self, var_name):
        return "java_to_owned_str(env, " + var_name + ")"
    def str_to_hu_conv(self, var_name):
        return None
    def str_from_hu_conv(self, var_name):
        return None

    def init_str(self):
        return ""

    def var_decl_statement(self, ty_string, var_name, statement):
        return ty_string + " " + var_name + " = " + statement

    def get_java_arr_len(self, arr_name):
        return arr_name + ".Length"
    def get_java_arr_elem(self, elem_ty, arr_name, idx):
        return arr_name + "[" + idx + "]"
    def constr_hu_array(self, ty_info, arr_len):
        base_ty = ty_info.subty.java_hu_ty.split("[")[0].split("<")[0]
        conv = "new " + base_ty + "[" + arr_len + "]"
        if "[" in ty_info.subty.java_hu_ty.split("<")[0]:
            # Do a bit of a dance to move any excess [] to the end
            conv += "[" + ty_info.subty.java_hu_ty.split("<")[0].split("[")[1]
        return conv
    def cleanup_converted_native_array(self, ty_info, arr_name):
        return None

    def primitive_arr_from_hu(self, arr_ty, fixed_len, arr_name):
        mapped_ty = arr_ty.subty
        if arr_ty.rust_obj == "LDKU128":
            return ("" + arr_name + ".getLEBytes()", "")
        if fixed_len is not None:
            return ("InternalUtils.check_arr_len(" + arr_name + ", " + fixed_len + ")", "")
        return None
    def primitive_arr_to_hu(self, arr_ty, fixed_len, arr_name, conv_name):
        if arr_ty.rust_obj == "LDKU128":
            return "org.ldk.util.UInt128 " + conv_name + " = new org.ldk.util.UInt128(" + arr_name + ");"
        return None

    def java_arr_ty_str(self, elem_ty_str):
        return elem_ty_str + "[]"

    def for_n_in_range(self, n, minimum, maximum):
        return "for (int " + n + " = " + minimum + "; " + n + " < " + maximum + "; " + n + "++) {"
    def for_n_in_arr(self, n, arr_name, arr_elem_ty):
        return ("foreach (" + arr_elem_ty.java_hu_ty + " " + n + " in " + arr_name + ") { ", " }")

    def get_ptr(self, var):
        return var + ".ptr"
    def set_null_skip_free(self, var):
        return var + ".ptr" + " = 0;"

    def add_ref(self, holder, referent):
        return "if (" + holder + " != null) { " + holder + ".ptrs_to.AddLast(" + referent + "); }"

    def fully_qualified_hu_ty_path(self, ty):
        if ty.java_fn_ty_arg.startswith("L") and ty.java_fn_ty_arg.endswith(";"):
            return ty.java_hu_ty
        if ty.java_hu_ty == "UnqualifiedError" or ty.java_hu_ty == "UInt128" or ty.java_hu_ty == "UInt5" or ty.java_hu_ty == "WitnessVersion":
            return "org.ldk.util." + ty.java_hu_ty
        if not ty.is_native_primitive and ty.rust_obj is not None and not "[]" in ty.java_hu_ty:
            return "org.ldk.structs." + ty.java_hu_ty
        return ty.java_hu_ty

    def native_c_unitary_enum_map(self, struct_name, variants, enum_doc_comment):
        out_java_enum = "namespace org { namespace ldk { namespace enums {"
        out_java = ""
        out_c = ""

        out_c = "static inline LDK" + struct_name + " LDK" + struct_name + "_from_cs(int32_t ord) {\n"
        out_c += "\tswitch (ord) {\n"

        if enum_doc_comment is not None:
            out_java_enum += "/**\n * " + enum_doc_comment.replace("\n", "\n * ") + "\n */\n"
        out_java_enum += "public enum " + struct_name + " {\n"
        ord_v = 0
        for var, var_docs in variants:
            if var_docs is not None:
                out_java_enum += "\t/**\n\t * " + var_docs.replace("\n", "\n\t * ") + "\n\t */\n"
            out_java_enum += "\t" + var + ",\n"
            out_c = out_c + "\t\tcase %d: return %s;\n" % (ord_v, var)
            ord_v = ord_v + 1
        out_java_enum += "}"
        out_c += "\t\tdefault: abort();\n"
        out_c += "\t}\n"
        out_c += "}\n"

        out_c = out_c + "static inline int32_t LDK" + struct_name + "_to_cs(LDK" + struct_name + " val) {\n"
        out_c = out_c + "\tswitch (val) {\n"
        ord_v = 0
        for var, _ in variants:
            out_c = out_c + "\t\tcase " + var + ": return %d;\n" % ord_v
            ord_v = ord_v + 1
        out_c = out_c + "\t\tdefault: abort();\n"
        out_c = out_c + "\t}\n"
        out_c = out_c + "}\n"

        return (out_c, out_java_enum + "} } }\n", out_java)

    def c_unitary_enum_to_native_call(self, ty_info):
        return (ty_info.rust_obj + "_to_cs(", ")")
    def native_unitary_enum_to_c_call(self, ty_info):
        return (ty_info.rust_obj + "_from_cs(", ")")

    def c_complex_enum_pfx(self, struct_name, variants, init_meth_jty_strs):
        out_c = ""
        for var in variants:
            out_c = out_c + "static jclass " + struct_name + "_" + var + "_class = NULL;\n"
            out_c = out_c + "static jmethodID " + struct_name + "_" + var + "_meth = NULL;\n"
        out_c += "void" + self.c_fn_name_define_pfx(struct_name.replace("_", "_1") + "_init", True) + self.c_fn_args_pfx + ") {\n"
        for var_name in variants:
            out_c += "\t" + struct_name + "_" + var_name + "_class =\n"
            out_c += "\t\t(*env)->NewGlobalRef(env, (*env)->FindClass(env, \"org/ldk/impl/bindings$" + struct_name + "$" + var_name + "\"));\n"
            out_c += "\tCHECK(" + struct_name + "_" + var_name + "_class != NULL);\n"
            out_c += "\t" + struct_name + "_" + var_name + "_meth = (*env)->GetMethodID(env, " + struct_name + "_" + var_name + "_class, \"<init>\", \"(" + init_meth_jty_strs[var_name] + ")V\");\n"
            out_c += "\tCHECK(" + struct_name + "_" + var_name + "_meth != NULL);\n"
        out_c = out_c + "}\n"
        return out_c

    def c_complex_enum_pass_ty(self, struct_name):
        return "jobject"

    def c_constr_native_complex_enum(self, struct_name, variant, c_params):
        ret = "(*env)->NewObject(env, " + struct_name + "_" + variant + "_class, " + struct_name + "_" + variant + "_meth"
        for param in c_params:
            ret = ret + ", " + param
        return ret + ")"

    def native_c_map_trait(self, struct_name, field_vars, flattened_field_vars, field_fns, trait_doc_comment):
        out_java_trait = ""
        out_java = ""

        # First generate most of the Java code, note that we need information about java method argument strings for C
        out_java_trait += self.hu_struct_file_prefix
        if trait_doc_comment is not None:
            out_java_trait += "/**\n * " + trait_doc_comment.replace("\n", "\n * ") + "\n */\n"
        out_java_trait = out_java_trait + "public class " + struct_name.replace("LDK","") + " : CommonBase {\n"
        out_java_trait = out_java_trait + "\tinternal readonly bindings." + struct_name + " bindings_instance;\n"
        out_java_trait = out_java_trait + "\tinternal " + struct_name.replace("LDK", "") + "(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }\n"
        out_java_trait = out_java_trait + "\tprivate " + struct_name.replace("LDK", "") + "(bindings." + struct_name + " arg"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                out_java_trait += ", " + var.java_hu_ty + " " + var.arg_name
            else:
                out_java_trait += ", bindings." + var[0] + " " + var[1]
        out_java_trait += ") : base(bindings." + struct_name + "_new(arg"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                if var.from_hu_conv is not None:
                    out_java_trait = out_java_trait + ", " + var.from_hu_conv[0]
                else:
                    out_java_trait = out_java_trait + ", " + var.arg_name
            else:
                out_java_trait = out_java_trait + ", " + var[1]
        out_java_trait = out_java_trait + ")) {\n"
        out_java_trait = out_java_trait + "\t\tthis.ptrs_to.AddLast(arg);\n"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                if var.from_hu_conv is not None and var.from_hu_conv[1] != "":
                    out_java_trait = out_java_trait + "\t\t" + var.from_hu_conv[1].replace("\n", "\n\t\t") + ";\n"
            else:
                out_java_trait = out_java_trait + "\t\tthis.ptrs_to.AddLast(" + var[1] + ");\n"
        out_java_trait = out_java_trait + "\t\tthis.bindings_instance = arg;\n"
        out_java_trait = out_java_trait + "\t}\n"
        out_java_trait = out_java_trait + "\t~" + struct_name.replace("LDK","") + "() {\n"
        out_java_trait = out_java_trait + "\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); }\n"
        out_java_trait = out_java_trait + "\t}\n\n"

        java_trait_wrapper = "\tprivate class " + struct_name + "Holder { internal " + struct_name.replace("LDK", "") + " held; }\n"
        java_trait_wrapper += "\tprivate class " + struct_name + "Impl : bindings." + struct_name + " {\n"
        java_trait_wrapper += "\t\tinternal " + struct_name + "Impl(" + struct_name.replace("LDK", "") + "Interface arg, " + struct_name + "Holder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }\n"
        java_trait_wrapper += "\t\tprivate " + struct_name.replace("LDK", "") + "Interface arg;\n"
        java_trait_wrapper += "\t\tprivate " + struct_name + "Holder impl_holder;\n"
        java_trait_constr = "\tpublic static " + struct_name.replace("LDK", "") + " new_impl(" + struct_name.replace("LDK", "") + "Interface arg"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                java_trait_constr += ", " + var.java_hu_ty + " " + var.arg_name
            else:
                # Ideally we'd be able to take any instance of the interface, but our C code can only represent
                # Java-implemented version, so we require users pass a Java implementation here :/
                java_trait_constr += ", " + var[0].replace("LDK", "") + "." + var[0].replace("LDK", "") + "Interface " + var[1] + "_impl"
        java_trait_constr = java_trait_constr + ") {\n\t\t" + struct_name + "Holder impl_holder = new " + struct_name + "Holder();\n"
        java_trait_constr = java_trait_constr + "\t\timpl_holder.held = new " + struct_name.replace("LDK", "") + "(new " + struct_name + "Impl(arg, impl_holder)"
        out_java_trait += "\tpublic interface " + struct_name.replace("LDK", "") + "Interface {\n"
        out_java += "\tpublic interface " + struct_name + " {\n"
        java_meths = []
        for fn_line in field_fns:
            java_meth_descr = "("
            if fn_line.fn_name != "free" and fn_line.fn_name != "cloned":
                fn_name = fn_line.fn_name
                if fn_name == "lock": # reserved symbol
                    fn_name = "do_lock"
                out_java += "\t\t" + fn_line.ret_ty_info.java_ty + " " + fn_name + "("
                java_trait_wrapper += "\t\tpublic " + fn_line.ret_ty_info.java_ty + " " + fn_name + "("
                out_java_trait += "\t\t/**\n\t\t * " + fn_line.docs.replace("\n", "\n\t\t * ") + "\n\t\t */\n"
                out_java_trait += "\t\t" + fn_line.ret_ty_info.java_hu_ty + " " + fn_name + "("

                for idx, arg_conv_info in enumerate(fn_line.args_ty):
                    if idx >= 1:
                        out_java += ", "
                        java_trait_wrapper += ", "
                        out_java_trait += ", "
                    out_java += arg_conv_info.java_ty + " _" + arg_conv_info.arg_name
                    out_java_trait += arg_conv_info.java_hu_ty + " _" + arg_conv_info.arg_name
                    java_trait_wrapper += arg_conv_info.java_ty + " _" + arg_conv_info.arg_name
                    java_meth_descr = java_meth_descr + arg_conv_info.java_fn_ty_arg
                java_meth_descr = java_meth_descr + ")" + fn_line.ret_ty_info.java_fn_ty_arg
                java_meths.append((fn_line.fn_name, java_meth_descr))

                out_java += ");\n"
                out_java_trait += ");\n"
                java_trait_wrapper += ") {\n"

                for arg_info in fn_line.args_ty:
                    if arg_info.to_hu_conv is not None:
                        java_trait_wrapper += "\t\t\t" + arg_info.to_hu_conv.replace("\n", "\n\t\t\t").replace(arg_info.arg_name, "_" + arg_info.arg_name) + "\n"

                if fn_line.ret_ty_info.java_ty != "void":
                    java_trait_wrapper += "\t\t\t" + fn_line.ret_ty_info.java_hu_ty + " ret = arg." + fn_name + "("
                else:
                    java_trait_wrapper += "\t\t\targ." + fn_name + "("

                for idx, arg_info in enumerate(fn_line.args_ty):
                    if idx != 0:
                        java_trait_wrapper += ", "
                    if arg_info.to_hu_conv_name is not None:
                        java_trait_wrapper += arg_info.to_hu_conv_name.replace(arg_info.arg_name, "_" + arg_info.arg_name)
                    else:
                        java_trait_wrapper += "_" + arg_info.arg_name

                java_trait_wrapper += ");\n"
                java_trait_wrapper += "\t\t\t\tGC.KeepAlive(arg);\n"
                if fn_line.ret_ty_info.java_ty != "void":
                    if fn_line.ret_ty_info.from_hu_conv is not None:
                        java_trait_wrapper += "\t\t\t" + fn_line.ret_ty_info.java_ty + " result = " + fn_line.ret_ty_info.from_hu_conv[0] + ";\n"
                        if fn_line.ret_ty_info.from_hu_conv[1] != "":
                            java_trait_wrapper += "\t\t\t" + fn_line.ret_ty_info.from_hu_conv[1].replace("this", "impl_holder.held") + ";\n"
                        java_trait_wrapper += "\t\t\treturn result;\n"
                    else:
                        java_trait_wrapper += "\t\t\treturn ret;\n"
                java_trait_wrapper += "\t\t}\n"
        java_trait_wrapper += "\t}"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                java_trait_constr = java_trait_constr + ", " + var.arg_name
            else:
                java_trait_constr += ", " + var[1] + ".new_impl(" + var[1] + "_impl"
                suptrait_constr = ""
                for suparg in var[2]:
                    if isinstance(suparg, ConvInfo):
                        suptrait_constr += ", " + suparg.arg_name
                    else:
                        suptrait_constr += ", " + suparg[1] + "_impl"
                java_trait_constr += suptrait_constr + ").bindings_instance"
                for suparg in var[2]:
                    if isinstance(suparg, ConvInfo):
                        java_trait_constr += ", " + suparg.arg_name
                    else:
                        java_trait_constr += ", " + suparg[1] + ".new_impl("
                        # Blindly assume that we can just strip the first arg to build the args for the supertrait
                        java_trait_constr += suptrait_constr.split(", ", 1)[1]
                        java_trait_constr += ").bindings_instance"
        out_java_trait += "\t}\n" + java_trait_wrapper + "\n"
        out_java_trait += java_trait_constr + ");\n\t\treturn impl_holder.held;\n\t}\n"

        out_java += "\t}\n"

        out_java += self.native_meth_decl(struct_name + "_new", "long") + "(" + struct_name + " impl"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                out_java += ", " + var.java_ty + " " + var.arg_name
            else:
                out_java += ", " + var[0] + " " + var[1]
        out_java += ");\n"

        # Now that we've written out our java code (and created java_meths), generate C
        out_c = "typedef struct " + struct_name + "_JCalls {\n"
        out_c = out_c + "\tatomic_size_t refcnt;\n"
        out_c = out_c + "\tJavaVM *vm;\n"
        out_c = out_c + "\tjweak o;\n"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                # We're a regular ol' field
                pass
            else:
                # We're a supertrait
                out_c = out_c + "\t" + var[0] + "_JCalls* " + var[1] + ";\n"
        for fn in field_fns:
            if fn.fn_name != "free" and fn.fn_name != "cloned":
                out_c = out_c + "\tjmethodID " + fn.fn_name + "_meth;\n"
        out_c = out_c + "} " + struct_name + "_JCalls;\n"

        for fn_line in field_fns:
            if fn_line.fn_name == "free":
                out_c = out_c + "static void " + struct_name + "_JCalls_free(void* this_arg) {\n"
                out_c = out_c + "\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n"
                out_c = out_c + "\tif (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {\n"
                out_c += "\t\t" + self.construct_jenv().replace("\n", "\n\t\t").strip() + "\n"
                out_c = out_c + "\t\t(*env)->DeleteWeakGlobalRef(env, j_calls->o);\n"
                out_c += "\t\t" + self.deconstruct_jenv().replace("\n", "\n\t\t").strip() + "\n"
                out_c = out_c + "\t\tFREE(j_calls);\n"
                out_c = out_c + "\t}\n}\n"

        for idx, fn_line in enumerate(field_fns):
            if fn_line.fn_name != "free" and fn_line.fn_name != "cloned":
                assert fn_line.ret_ty_info.ty_info.get_full_rust_ty()[1] == ""
                out_c = out_c + fn_line.ret_ty_info.ty_info.get_full_rust_ty()[0] + " " + fn_line.fn_name + "_" + struct_name + "_jcall("
                if fn_line.self_is_const:
                    out_c = out_c + "const void* this_arg"
                else:
                    out_c = out_c + "void* this_arg"

                for idx, arg in enumerate(fn_line.args_ty):
                    out_c = out_c + ", " + arg.ty_info.get_full_rust_ty()[0] + " " + arg.arg_name + arg.ty_info.get_full_rust_ty()[1]

                out_c = out_c + ") {\n"
                out_c = out_c + "\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) this_arg;\n"
                out_c += "\t" + self.construct_jenv().replace("\n", "\n\t").strip() + "\n"

                for arg_info in fn_line.args_ty:
                    if arg_info.ret_conv is not None:
                        out_c = out_c + "\t" + arg_info.ret_conv[0].replace('\n', '\n\t')
                        out_c = out_c + arg_info.arg_name
                        out_c = out_c + arg_info.ret_conv[1].replace('\n', '\n\t') + "\n"

                out_c = out_c + "\tjobject obj = (*env)->NewLocalRef(env, j_calls->o);\n\tCHECK(obj != NULL);\n"
                if fn_line.ret_ty_info.c_ty.endswith("Array"):
                    out_c = out_c + "\t" + fn_line.ret_ty_info.c_ty + " ret = (*env)->CallObjectMethod(env, obj, j_calls->" + fn_line.fn_name + "_meth"
                elif fn_line.ret_ty_info.c_ty == "void":
                    out_c += "\t(*env)->CallVoidMethod(env, obj, j_calls->" + fn_line.fn_name + "_meth"
                elif fn_line.ret_ty_info.java_hu_ty == "string" or "org/ldk/enums" in fn_line.ret_ty_info.java_fn_ty_arg:
                    # Manually write out string methods as they're just an Object
                    out_c += "\t" + fn_line.ret_ty_info.c_ty + " ret = (*env)->CallObjectMethod(env, obj, j_calls->" + fn_line.fn_name + "_meth"
                elif not fn_line.ret_ty_info.passed_as_ptr:
                    out_c += "\t" + fn_line.ret_ty_info.c_ty + " ret = (*env)->Call" + fn_line.ret_ty_info.java_ty.title() + "Method(env, obj, j_calls->" + fn_line.fn_name + "_meth"
                else:
                    out_c = out_c + "\tuint64_t ret = (*env)->CallLongMethod(env, obj, j_calls->" + fn_line.fn_name + "_meth"

                for idx, arg_info in enumerate(fn_line.args_ty):
                    if arg_info.ret_conv is not None:
                        out_c = out_c + ", " + arg_info.ret_conv_name
                    else:
                        out_c = out_c + ", " + arg_info.arg_name
                out_c = out_c + ");\n"

                out_c += "\tif (UNLIKELY((*env)->ExceptionCheck(env))) {\n"
                out_c += "\t\t(*env)->ExceptionDescribe(env);\n"
                out_c += "\t\t(*env)->FatalError(env, \"A call to " + fn_line.fn_name + " in " + struct_name + " from rust threw an exception.\");\n"
                out_c += "\t}\n"

                if fn_line.ret_ty_info.arg_conv is not None:
                    out_c += "\t" + fn_line.ret_ty_info.arg_conv.replace("\n", "\n\t") + "\n"
                    out_c += "\t" + self.deconstruct_jenv().replace("\n", "\n\t").strip() + "\n"
                    out_c += "\treturn " + fn_line.ret_ty_info.arg_conv_name + ";\n"
                else:
                    out_c += "\t" + self.deconstruct_jenv().replace("\n", "\n\t").strip() + "\n"
                    if not fn_line.ret_ty_info.passed_as_ptr and fn_line.ret_ty_info.c_ty != "void":
                        out_c += "\treturn ret;\n"

                out_c = out_c + "}\n"

        # If we can, write out a clone function whether we need one or not, as we use them in moving to rust
        can_clone_with_ptr = True
        for var in field_vars:
            if isinstance(var, ConvInfo):
                can_clone_with_ptr = False
        if can_clone_with_ptr:
            out_c = out_c + "static void " + struct_name + "_JCalls_cloned(" + struct_name + "* new_obj) {\n"
            out_c = out_c + "\t" + struct_name + "_JCalls *j_calls = (" + struct_name + "_JCalls*) new_obj->this_arg;\n"
            out_c = out_c + "\tatomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);\n"
            for var in field_vars:
                if not isinstance(var, ConvInfo):
                    out_c = out_c + "\tatomic_fetch_add_explicit(&j_calls->" + var[1] + "->refcnt, 1, memory_order_release);\n"
            out_c = out_c + "}\n"

        out_c = out_c + "static inline " + struct_name + " " + struct_name + "_init (" + self.c_fn_args_pfx + ", jobject o"
        for var in flattened_field_vars:
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
            if fn_name != "free" and fn_name != "cloned":
                out_c = out_c + "\tcalls->" + fn_name + "_meth = (*env)->GetMethodID(env, c, \"" + fn_name + "\", \"" + java_meth_descr + "\");\n"
                out_c = out_c + "\tCHECK(calls->" + fn_name + "_meth != NULL);\n"

        for var in flattened_field_vars:
            if isinstance(var, ConvInfo) and var.arg_conv is not None:
                out_c = out_c + "\n\t" + var.arg_conv.replace("\n", "\n\t") +"\n"
        out_c = out_c + "\n\t" + struct_name + " ret = {\n"
        out_c = out_c + "\t\t.this_arg = (void*) calls,\n"
        for fn_line in field_fns:
            if fn_line.fn_name != "free" and fn_line.fn_name != "cloned":
                out_c = out_c + "\t\t." + fn_line.fn_name + " = " + fn_line.fn_name + "_" + struct_name + "_jcall,\n"
            elif fn_line.fn_name == "free":
                out_c = out_c + "\t\t.free = " + struct_name + "_JCalls_free,\n"
            else:
                out_c = out_c + "\t\t.cloned = " + struct_name + "_JCalls_cloned,\n"
        for var in field_vars:
            if isinstance(var, ConvInfo):
                if var.arg_conv_name is not None:
                    out_c = out_c + "\t\t." + var.arg_name + " = " + var.arg_conv_name + ",\n"
                    out_c = out_c + "\t\t.set_" + var.arg_name + " = NULL,\n"
                else:
                    out_c = out_c + "\t\t." + var.var_name + " = " + var.var_name + ",\n"
                    out_c = out_c + "\t\t.set_" + var.var_name + " = NULL,\n"
            else:
                out_c += "\t\t." + var[1] + " = " + var[0] + "_init(env, clz, " + var[1]
                for suparg in var[2]:
                    if isinstance(suparg, ConvInfo):
                        out_c = out_c + ", " + suparg.arg_name
                    else:
                        out_c = out_c + ", " + suparg[1]
                out_c += "),\n"
        out_c = out_c + "\t};\n"
        for var in flattened_field_vars:
            if not isinstance(var, ConvInfo):
                out_c = out_c + "\tcalls->" + var[1] + " = ret." + var[1] + ".this_arg;\n"
        out_c = out_c + "\treturn ret;\n"
        out_c = out_c + "}\n"

        out_c += "int64_t " + self.c_fn_name_define_pfx(struct_name + "_new", True) + "jobject o"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                out_c = out_c + ", " + var.c_ty + " " + var.arg_name
            else:
                out_c = out_c + ", jobject " + var[1]
        out_c = out_c + ") {\n"
        out_c = out_c + "\t" + struct_name + " *res_ptr = MALLOC(sizeof(" + struct_name + "), \"" + struct_name + "\");\n"
        out_c = out_c + "\t*res_ptr = " + struct_name + "_init(env, clz, o"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                out_c = out_c + ", " + var.arg_name
            else:
                out_c = out_c + ", " + var[1]
        out_c = out_c + ");\n"
        out_c = out_c + "\treturn tag_ptr(res_ptr, true);\n"
        out_c = out_c + "}\n"

        for var in flattened_field_vars:
            if not isinstance(var, ConvInfo):
                out_java_trait += "\n\t/**\n"
                out_java_trait += "\t * Gets the underlying " + var[1] + ".\n"
                out_java_trait += "\t */\n"
                underscore_name = ''.join('_' + c.lower() if c.isupper() else c for c in var[1]).strip('_')
                out_java_trait += "\tpublic " + var[1] + " get_" + underscore_name + "() {\n"
                out_java_trait += "\t\t" + var[1] + " res = new " + var[1] + "(null, bindings." + struct_name + "_get_" + var[1] + "(this.ptr));\n"
                out_java_trait += "\t\tthis.ptrs_to.AddLast(res);\n"
                out_java_trait += "\t\treturn res;\n"
                out_java_trait += "\t}\n"
                out_java_trait += "\n"

                out_java += self.native_meth_decl(struct_name + "_get_" + var[1], "long") + "(long arg);\n"

                out_c += "int64_t " + self.c_fn_name_define_pfx(struct_name + "_get_" + var[1], True) + "int64_t arg) {\n"
                out_c += "\t" + struct_name + " *inp = (" + struct_name + " *)untag_ptr(arg);\n"
                out_c += "\treturn tag_ptr(&inp->" + var[1] + ", false);\n"
                out_c += "}\n"

        return (out_java, out_java_trait, out_c)

    def trait_struct_inc_refcnt(self, ty_info):
        base_conv = "\nif (" + ty_info.var_name + "_conv.free == " + ty_info.rust_obj + "_JCalls_free) {\n"
        base_conv = base_conv + "\t// If this_arg is a JCalls struct, then we need to increment the refcnt in it.\n"
        base_conv = base_conv + "\t" + ty_info.rust_obj + "_JCalls_cloned(&" + ty_info.var_name + "_conv);\n}"
        return base_conv

    def map_complex_enum(self, struct_name, variant_list, camel_to_snake, enum_doc_comment):
        bindings_type = struct_name.replace("LDK", "")
        java_hu_type = struct_name.replace("LDK", "").replace("COption", "Option")

        out_java_enum = ""
        out_java = ""
        out_c = ""

        out_java_enum += (self.hu_struct_file_prefix)

        java_hu_class = "/**\n * " + enum_doc_comment.replace("\n", "\n * ") + "\n */\n"
        java_hu_class += "public class " + java_hu_type + " : CommonBase {\n"
        java_hu_class += f"\tprotected {java_hu_type}(object _dummy, long ptr) : base(ptr)" + " { }\n"
        java_hu_class += "\t~" + java_hu_type + "() {\n"
        java_hu_class += "\t\tif (ptr != 0) { bindings." + bindings_type + "_free(ptr); }\n"
        java_hu_class += "\t}\n\n"
        java_hu_class += f"\tinternal static {java_hu_type} constr_from_ptr(long ptr) {{\n"
        java_hu_class += f"\t\tlong raw_ty = bindings." + struct_name + "_ty_from_ptr(ptr);\n"
        out_c += self.c_fn_ty_pfx + "uint32_t" + self.c_fn_name_define_pfx(struct_name + "_ty_from_ptr", True) + self.ptr_c_ty + " ptr) {\n"
        out_c += "\t" + struct_name + " *obj = (" + struct_name + "*)untag_ptr(ptr);\n"
        out_c += "\tswitch(obj->tag) {\n"
        java_hu_class += "\t\tswitch (raw_ty) {\n"
        java_hu_subclasses = ""

        var_idx = 0
        for var in variant_list:
            java_hu_subclasses += "\t/** A " + java_hu_type + " of type " + var.var_name + " */\n"
            java_hu_subclasses += "\tpublic class " + java_hu_type + "_" + var.var_name + " : " + java_hu_type + " {\n"
            java_hu_class += f"\t\t\tcase {var_idx}: "
            java_hu_class += "return new " + java_hu_type + "_" + var.var_name + "(ptr);\n"
            out_c += f"\t\tcase {struct_name}_{var.var_name}: return {var_idx};\n"
            hu_conv_body = ""
            for idx, (field_ty, field_docs) in enumerate(var.fields):
                if field_docs is not None:
                    java_hu_subclasses += "\t\t/**\n\t\t * " + field_docs.replace("\n", "\n\t\t * ") + "\n\t\t */\n"
                java_hu_subclasses += f"\t\tpublic {field_ty.java_hu_ty} {field_ty.arg_name};\n"
                if field_ty.to_hu_conv is not None:
                    hu_conv_body += f"\t\t\t{field_ty.java_ty} {field_ty.arg_name} = bindings.{struct_name}_{var.var_name}_get_{field_ty.arg_name}(ptr);\n"
                    hu_conv_body += f"\t\t\t" + field_ty.to_hu_conv.replace("\n", "\n\t\t\t") + "\n"
                    hu_conv_body += f"\t\t\tthis." + field_ty.arg_name + " = " + field_ty.to_hu_conv_name + ";\n"
                else:
                    hu_conv_body += f"\t\t\tthis.{field_ty.arg_name} = bindings.{struct_name}_{var.var_name}_get_{field_ty.arg_name}(ptr);\n"
            java_hu_subclasses += "\t\tinternal " + java_hu_type + "_" + var.var_name + "(long ptr) : base(null, ptr) {\n"
            java_hu_subclasses += hu_conv_body
            java_hu_subclasses += "\t\t}\n\t}\n"
            var_idx += 1
        java_hu_class += "\t\t\tdefault:\n\t\t\t\tthrow new ArgumentException(\"Impossible enum variant\");\n\t\t}\n\t}\n\n"
        out_java += self.native_meth_decl(struct_name + "_ty_from_ptr", "long") + "(long ptr);\n"
        out_c += ("\t\tdefault: abort();\n")
        out_c += ("\t}\n}\n")

        for var in variant_list:
            for idx, (field_map, _) in enumerate(var.fields):
                fn_name = f"{struct_name}_{var.var_name}_get_{field_map.arg_name}"
                out_c += self.c_fn_ty_pfx + field_map.c_ty + self.c_fn_name_define_pfx(fn_name, True) + self.ptr_c_ty + " ptr) {\n"
                out_c += "\t" + struct_name + " *obj = (" + struct_name + "*)untag_ptr(ptr);\n"
                out_c += f"\tassert(obj->tag == {struct_name}_{var.var_name});\n"
                if field_map.ret_conv is not None:
                    out_c += ("\t\t\t" + field_map.ret_conv[0].replace("\n", "\n\t\t\t"))
                    if var.tuple_variant:
                        out_c += "obj->" + camel_to_snake(var.var_name)
                    else:
                        out_c += "obj->" + camel_to_snake(var.var_name) + "." + field_map.arg_name
                    out_c += (field_map.ret_conv[1].replace("\n", "\n\t\t\t") + "\n")
                    out_c += "\treturn " + field_map.ret_conv_name + ";\n"
                else:
                    if var.tuple_variant:
                        out_c += "\treturn " + "obj->" + camel_to_snake(var.var_name) + ";\n"
                    else:
                        out_c += "\treturn " + "obj->" + camel_to_snake(var.var_name) + "." + field_map.arg_name + ";\n"
                out_c += "}\n"
                out_java += self.native_meth_decl(fn_name, field_map.java_ty) + "(long ptr);\n"
        out_java_enum += java_hu_class
        out_java_enum += java_hu_subclasses
        return (out_java, out_java_enum, out_c)

    def map_opaque_struct(self, struct_name, struct_doc_comment):
        out_opaque_struct_human = ""
        out_opaque_struct_human += self.hu_struct_file_prefix
        out_opaque_struct_human += "\n/**\n * " + struct_doc_comment.replace("\n", "\n * ") + "\n */\n"
        hu_name = struct_name.replace("LDKC2Tuple", "TwoTuple").replace("LDKC3Tuple", "ThreeTuple").replace("LDK", "")
        out_opaque_struct_human += ("public class " + hu_name + " : CommonBase")
        if struct_name.startswith("LDKLocked") or struct_name.startswith("LDKReadOnly"):
            out_opaque_struct_human += (", IDisposable")
        out_opaque_struct_human += (" {\n")
        out_opaque_struct_human += ("\tinternal " + hu_name + "(object _dummy, long ptr) : base(ptr) { }\n")
        if struct_name.startswith("LDKLocked") or struct_name.startswith("LDKReadOnly"):
            out_opaque_struct_human += ("\tpublic void Dispose() {\n")
        else:
            out_opaque_struct_human += ("\t~" + hu_name + "() {\n")
        out_opaque_struct_human += ("\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); }\n")
        out_opaque_struct_human += ("\t}\n\n")
        return out_opaque_struct_human

    def map_tuple(self, struct_name):
        return self.map_opaque_struct(struct_name, "A Tuple")

    def map_result(self, struct_name, res_map, err_map):
        human_ty = struct_name.replace("LDKCResult", "Result")
        java_hu_struct = ""
        java_hu_struct += self.hu_struct_file_prefix
        java_hu_struct += "public class " + human_ty + " : CommonBase {\n"
        java_hu_struct += "\t" + human_ty + "(object _dummy, long ptr) : base(ptr) { }\n"
        java_hu_struct += "\t~" + human_ty + "() {\n"
        java_hu_struct += "\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); }\n"
        java_hu_struct += "\t}\n\n"
        java_hu_struct += "\tinternal static " + human_ty + " constr_from_ptr(long ptr) {\n"
        java_hu_struct += "\t\tif (bindings." + struct_name.replace("LDK", "") + "_is_ok(ptr)) {\n"
        java_hu_struct += "\t\t\treturn new " + human_ty + "_OK(null, ptr);\n"
        java_hu_struct += "\t\t} else {\n"
        java_hu_struct += "\t\t\treturn new " + human_ty + "_Err(null, ptr);\n"
        java_hu_struct += "\t\t}\n"
        java_hu_struct += "\t}\n"

        java_hu_struct += "\tpublic class " + human_ty + "_OK : " + human_ty + " {\n"

        if res_map.java_hu_ty != "void":
            java_hu_struct += "\t\tpublic readonly " + res_map.java_hu_ty + " res;\n"
        java_hu_struct += "\t\tinternal " + human_ty + "_OK(object _dummy, long ptr) : base(_dummy, ptr) {\n"
        if res_map.java_hu_ty == "void":
            pass
        elif res_map.to_hu_conv is not None:
            java_hu_struct += "\t\t\t" + res_map.java_ty + " res = bindings." + struct_name.replace("LDK", "") + "_get_ok(ptr);\n"
            java_hu_struct += "\t\t\t" + res_map.to_hu_conv.replace("\n", "\n\t\t\t")
            java_hu_struct += "\n\t\t\tthis.res = " + res_map.to_hu_conv_name + ";\n"
        else:
            java_hu_struct += "\t\t\tthis.res = bindings." + struct_name.replace("LDK", "") + "_get_ok(ptr);\n"
        java_hu_struct += "\t\t}\n"
        java_hu_struct += "\t}\n\n"

        java_hu_struct += "\tpublic class " + human_ty + "_Err : " + human_ty + " {\n"
        if err_map.java_hu_ty != "void":
            java_hu_struct += "\t\tpublic readonly " + err_map.java_hu_ty + " err;\n"
        java_hu_struct += "\t\tinternal " + human_ty + "_Err(object _dummy, long ptr) : base(_dummy, ptr) {\n"
        if err_map.java_hu_ty == "void":
            pass
        elif err_map.to_hu_conv is not None:
            java_hu_struct += "\t\t\t" + err_map.java_ty + " err = bindings." + struct_name.replace("LDK", "") + "_get_err(ptr);\n"
            java_hu_struct += "\t\t\t" + err_map.to_hu_conv.replace("\n", "\n\t\t\t")
            java_hu_struct += "\n\t\t\tthis.err = " + err_map.to_hu_conv_name + ";\n"
        else:
            java_hu_struct += "\t\t\tthis.err = bindings." + struct_name.replace("LDK", "") + "_get_err(ptr);\n"
        java_hu_struct += "\t\t}\n"

        java_hu_struct += "\t}\n\n"
        return java_hu_struct

    def map_function(self, argument_types, c_call_string, method_name, meth_n, return_type_info, struct_meth, default_constructor_args, takes_self, takes_self_as_ref, args_known, type_mapping_generator, doc_comment):
        arg_name_repl = lambda s, arg_name: s.replace(arg_name, "_" + arg_name) if arg_name == "lock" or arg_name == "event" or arg_name == "params" else s
        out_java = ""
        out_c = ""
        out_java_struct = None

        out_java += self.native_meth_decl(method_name, return_type_info.java_ty) + "("
        out_c += (return_type_info.c_ty)
        if return_type_info.ret_conv is not None:
            ret_conv_pfx, ret_conv_sfx = return_type_info.ret_conv
        have_args = len(argument_types) > 1 or (len(argument_types) > 0 and argument_types[0].c_ty != "void")
        out_c += (" " + self.c_fn_name_define_pfx(method_name, have_args))

        for idx, arg_conv_info in enumerate(argument_types):
            if idx != 0:
                out_java += (", ")
                out_c += (", ")
            if arg_conv_info.c_ty != "void":
                out_c += (arg_conv_info.c_ty + " " + arg_conv_info.arg_name)
                out_java += (arg_conv_info.java_ty + " _" + arg_conv_info.arg_name) # Add a _ to avoid using reserved words

        out_java_struct = ""
        extra_java_struct_out = ""
        if not args_known:
            out_java_struct += ("\t// Skipped " + method_name + "\n")
        else:
            if doc_comment is not None:
                out_java_struct += "\t/**\n\t * " + doc_comment.replace("\n", "\n\t * ") + "\n\t */\n"
            hu_ret_ty = return_type_info.java_hu_ty
            if return_type_info.nullable:
                #hu_ret_ty += "?" - apparently mono doesn't support the nullable stuff
                pass
            if not takes_self:
                if meth_n == "new":
                    out_java_struct += "\tpublic static " + hu_ret_ty + " of("
                elif meth_n == "default":
                    out_java_struct += "\tpublic static " + hu_ret_ty + " with_default("
                else:
                    out_java_struct += "\tpublic static " + hu_ret_ty + " " + meth_n + "("
            elif meth_n == "clone_ptr" or (struct_meth.startswith("LDKCResult") and (meth_n == "get_ok" or meth_n == "get_err")):
                out_java_struct += "\tinternal " + hu_ret_ty + " " + meth_n + "("
            else:
                if meth_n == "hash" and return_type_info.java_hu_ty == "long":
                    extra_java_struct_out = "\tpublic override int GetHashCode() {\n"
                    extra_java_struct_out += "\t\treturn (int)this.hash();\n"
                    extra_java_struct_out += "\t}\n"
                elif meth_n == "eq" and return_type_info.java_hu_ty == "bool":
                    extra_java_struct_out = "\tpublic override bool Equals(object o) {\n"
                    extra_java_struct_out += "\t\tif (!(o is " + struct_meth + ")) return false;\n"
                    extra_java_struct_out += "\t\treturn this.eq((" + struct_meth + ")o);\n"
                    extra_java_struct_out += "\t}\n"
                if meth_n == "lock":
                    out_java_struct += "\tpublic " + hu_ret_ty + " do_lock("
                else:
                    out_java_struct += "\tpublic " + hu_ret_ty + " " + meth_n + "("
            for idx, arg in enumerate(argument_types):
                if idx != 0:
                    if not takes_self or idx > 1:
                        out_java_struct += ", "
                elif takes_self:
                    continue
                if arg.java_ty != "void":
                    if arg.arg_name in default_constructor_args:
                        assert not arg.nullable
                        for explode_idx, explode_arg in enumerate(default_constructor_args[arg.arg_name]):
                            if explode_idx != 0:
                                out_java_struct += (", ")
                            out_java_struct += (
                                explode_arg.java_hu_ty + " " + arg.arg_name + "_" + explode_arg.arg_name)
                    else:
                        ty_string = arg.java_hu_ty
                        if arg.nullable:
                            #ty_string += "?" - apparently mono doesn't support the nullable stuff
                            pass
                        ty_string = self.fully_qualified_hu_ty_path(arg)
                        out_java_struct += ty_string + " " + arg_name_repl(arg.arg_name, arg.arg_name)
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
                    out_java_struct += arg_name_repl(info.from_hu_conv[0], info.arg_name)
                else:
                    out_java_struct += arg_name_repl(info.arg_name, info.arg_name)
            out_java_struct += (");\n")

            # Like Java, the C# GC is quite aggressive and can finalize an object while a method
            # on it is operating. Unlike Java, this behavior appears to be better documented,
            # which is nice.
            for idx, info in enumerate(argument_types):
                if idx == 0 and takes_self:
                    out_java_struct += ("\t\tGC.KeepAlive(this);\n")
                elif info.arg_name in default_constructor_args:
                    for explode_idx, explode_arg in enumerate(default_constructor_args[info.arg_name]):
                        expl_arg_name = info.arg_name + "_" + explode_arg.arg_name
                        out_java_struct += ("\t\tGC.KeepAlive(" + expl_arg_name + ");\n")
                elif info.c_ty != "void":
                    out_java_struct += ("\t\tGC.KeepAlive(" + arg_name_repl(info.arg_name, info.arg_name) + ");\n")

            if return_type_info.java_ty == "long" and return_type_info.java_hu_ty != "long":
                out_java_struct += "\t\tif (ret >= 0 && ret <= 4096) { return null; }\n"

            if return_type_info.to_hu_conv is not None:
                if not takes_self:
                    out_java_struct += ("\t\t" + return_type_info.to_hu_conv.replace("\n", "\n\t\t")
                        .replace("this", return_type_info.to_hu_conv_name) + "\n")
                else:
                    out_java_struct += ("\t\t" + return_type_info.to_hu_conv.replace("\n", "\n\t\t") + "\n")

            for idx, info in enumerate(argument_types):
                if idx == 0 and takes_self:
                    pass
                elif info.arg_name in default_constructor_args:
                    for explode_arg in default_constructor_args[info.arg_name]:
                        expl_arg_name = info.arg_name + "_" + explode_arg.arg_name
                        if explode_arg.from_hu_conv is not None and return_type_info.to_hu_conv_name:
                            out_java_struct += ("\t\t" +
                                arg_name_repl(explode_arg.from_hu_conv[1], info.arg_name)
                                .replace(explode_arg.arg_name, expl_arg_name)
                                .replace("this", return_type_info.to_hu_conv_name) + ";\n")
                elif info.from_hu_conv is not None and info.from_hu_conv[1] != "":
                    if not takes_self and return_type_info.to_hu_conv_name is not None:
                        out_java_struct += ("\t\t" + arg_name_repl(info.from_hu_conv[1], info.arg_name)
                            .replace("this", return_type_info.to_hu_conv_name)
                            .replace("\n", "\n\t\t") + ";\n")
                    else:
                        out_java_struct += ("\t\t" + arg_name_repl(info.from_hu_conv[1], info.arg_name)
                            .replace("\n", "\n\t\t") + ";\n")

            if takes_self and not takes_self_as_ref:
                out_java_struct += "\t\t" + argument_types[0].from_hu_conv[1].replace("\n", "\n\t\t").replace("this_arg", "this") + ";\n"
            if return_type_info.to_hu_conv_name is not None:
                out_java_struct += ("\t\treturn " + return_type_info.to_hu_conv_name + ";\n")
            elif return_type_info.java_ty != "void" and return_type_info.rust_obj != "LDK" + struct_meth:
                out_java_struct += ("\t\treturn ret;\n")
            out_java_struct += ("\t}\n\n")

        return (out_java, out_c, out_java_struct + extra_java_struct_out)

    def cleanup(self):
        pass
