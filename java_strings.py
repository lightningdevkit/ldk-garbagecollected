from bindingstypes import *
from enum import Enum
import sys

class Target(Enum):
    JAVA = 1,
    ANDROID = 2

class Consts:
    def __init__(self, DEBUG: bool, target: Target, **kwargs):
        self.target = target
        self.c_array_class_caches = set()
        self.c_type_map = dict(
            uint8_t = ['byte'],
            uint16_t = ['short'],
            uint32_t = ['int'],
            uint64_t = ['long'],
        )
        self.java_type_map = dict(
            String = "String"
        )
        self.java_hu_type_map = dict(
            String = "String"
        )

        self.to_hu_conv_templates = dict(
            ptr = '{human_type} {var_name}_hu_conv = null; if ({var_name} < 0 || {var_name} > 4096) { {var_name}_hu_conv = new {human_type}(null, {var_name}); }',
            default = '{human_type} {var_name}_hu_conv = null; if ({var_name} < 0 || {var_name} > 4096) { {var_name}_hu_conv = new {human_type}(null, {var_name}); }'
        )

        self.bindings_header = """package org.ldk.impl;
import org.ldk.enums.*;
import org.ldk.impl.version;
import java.io.File;
import java.io.InputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

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
		try {
			// Try to load natively first, this works on Android and in testing.
			System.loadLibrary(\"lightningjni\");
		} catch (UnsatisfiedLinkError system_load_err) {
			// Otherwise try to load from the library jar.
			File tmpdir = new File(System.getProperty("java.io.tmpdir"), "ldk-java-nativelib");
			tmpdir.mkdir(); // If it fails to create, assume it was there already
			tmpdir.deleteOnExit();
			String libname = "liblightningjni_" + System.getProperty("os.name").replaceAll(" ", "") +
				"-" + System.getProperty("os.arch").replaceAll(" ", "") + ".nativelib";
			try (InputStream is = bindings.class.getResourceAsStream("/" + libname)) {
				Path libpath = new File(tmpdir.toPath().toString(), "liblightningjni.so").toPath();
				Files.copy(is, libpath, StandardCopyOption.REPLACE_EXISTING);
				Runtime.getRuntime().load(libpath.toString());
			} catch (Exception e) {
				System.err.println("Failed to load LDK native library.");
				System.err.println("System LDK native library load failed with: " + system_load_err);
				System.err.println("Resource-based LDK native library load failed with: " + e);
				throw new IllegalArgumentException(e);
			}
		}
		init(java.lang.Enum.class, VecOrSliceDef.class);
		init_class_cache();
		if (!get_lib_version_string().equals(version.get_ldk_java_bindings_version()))
			throw new IllegalArgumentException("Compiled LDK library and LDK class failes do not match");
		// Fetching the LDK versions from C also checks that the header and binaries match
		get_ldk_c_bindings_version();
		get_ldk_version();
	}
	static native void init(java.lang.Class c, java.lang.Class slicedef);
	static native void init_class_cache();
	static native String get_lib_version_string();

	public static native String get_ldk_c_bindings_version();
	public static native String get_ldk_version();

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
        self.bindings_version_file = """package org.ldk.impl;

public class version {
	public static String get_ldk_java_bindings_version() {
		return "<git_version_ldk_garbagecollected>";
	}
}"""

        self.bindings_footer = "}\n"

        self.util_fn_pfx = """package org.ldk.structs;
import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class UtilMethods {
"""
        self.util_fn_sfx = "}"
        self.common_base = """package org.ldk.structs;
import java.util.LinkedList;
class CommonBase {
	long ptr;
	LinkedList<Object> ptrs_to = new LinkedList();
	protected CommonBase(long ptr) { assert ptr < 0 || ptr > 4096; this.ptr = ptr; }
}
"""

        self.txout_defn = """public class TxOut extends CommonBase {
	/** The script_pubkey in this output */
	public final byte[] script_pubkey;
	/** The value, in satoshis, of this output */
	public final long value;

	TxOut(java.lang.Object _dummy, long ptr) {
		super(ptr);
		this.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);
		this.value = bindings.TxOut_get_value(ptr);
	}
	public TxOut(long value, byte[] script_pubkey) {
		super(bindings.TxOut_new(script_pubkey, value));
		this.script_pubkey = bindings.TxOut_get_script_pubkey(ptr);
		this.value = bindings.TxOut_get_value(ptr);
	}

	@Override @SuppressWarnings(\"deprecation\")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.TxOut_free(ptr); }
	}
}"""

        self.scalar_defn = """public class BigEndianScalar extends CommonBase {
	/** The bytes of the scalar value, in big endian */
	public final byte[] scalar_bytes;

	BigEndianScalar(java.lang.Object _dummy, long ptr) {
		super(ptr);
		this.scalar_bytes = bindings.BigEndianScalar_get_bytes(ptr);
	}
	public BigEndianScalar(byte[] scalar_bytes) {
		super(bindings.BigEndianScalar_new(scalar_bytes));
		this.scalar_bytes = bindings.BigEndianScalar_get_bytes(ptr);
	}

	@Override @SuppressWarnings(\"deprecation\")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.BigEndianScalar_free(ptr); }
	}
}"""


        self.c_file_pfx = """#include <jni.h>
// On OSX jlong (ie long long) is not equivalent to int64_t, so we override here
#define int64_t jlong
#include \"org_ldk_impl_bindings.h\"
#include <lightning.h>
#include <string.h>
#include <stdatomic.h>
#include <stdlib.h>

#define LIKELY(v) __builtin_expect(!!(v), 1)
#define UNLIKELY(v) __builtin_expect(!!(v), 0)

"""

        if self.target == Target.ANDROID:
            self.c_file_pfx = self.c_file_pfx + """
#include <android/log.h>
#define DEBUG_PRINT(...) __android_log_print(ANDROID_LOG_ERROR, "LDK", __VA_ARGS__)

#include <unistd.h>
#include <pthread.h>
static void* redirect_stderr(void* ignored) {
	int pipes[2];
	pipe(pipes);
	dup2(pipes[1], STDERR_FILENO);
	char buf[8192];
	memset(buf, 0, 8192);
	ssize_t len;
	while ((len = read(pipes[0], buf, 8191)) > 0) {
		DEBUG_PRINT("%s\\n", buf);
		memset(buf, 0, 8192);
	}
	DEBUG_PRINT("End of stderr???\\n");
	return 0;
}
void __attribute__((constructor)) spawn_stderr_redirection() {
	pthread_t thread;
	pthread_create(&thread, NULL, &redirect_stderr, NULL);
}
"""
        else:
            self.c_file_pfx = self.c_file_pfx + "#define DEBUG_PRINT(...) fprintf(stderr, __VA_ARGS__)\n"

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
	DEBUG_PRINT("Loaded LDK-Java Bindings with LDK %s and LDK-C-Bindings %s\\n", check_get_ldk_version(), check_get_ldk_bindings_version());
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

                if self.target == Target.ANDROID:
                    self.c_file_pfx = self.c_file_pfx + """
#include <unwind.h>
#include <dlfcn.h>

// Implement the execinfo functions using _Unwind_backtrace. This seems to miss many Rust
// symbols, so we only use it on Android, where execinfo.h is unavailable.

struct BacktraceState {
	void** current;
	void** end;
};
static _Unwind_Reason_Code unwind_callback(struct _Unwind_Context* context, void* arg) {
	struct BacktraceState* state = (struct BacktraceState*)arg;
	uintptr_t pc = _Unwind_GetIP(context);
	if (pc) {
		if (state->current == state->end) {
			return _URC_END_OF_STACK;
		} else {
			*state->current++ = (void*)(pc);
		}
	}
	return _URC_NO_REASON;
}

int backtrace(void** buffer, int max) {
	struct BacktraceState state = { buffer, buffer + max };
	_Unwind_Backtrace(unwind_callback, &state);
	return state.current - buffer;
}

void backtrace_symbols_fd(void ** buffer, int count, int _fd) {
	for (int idx = 0; idx < count; ++idx) {
		Dl_info info;
		if (dladdr(buffer[idx], &info) && info.dli_sname) {
			DEBUG_PRINT("%p: %s", buffer[idx], info.dli_sname);
		} else {
			DEBUG_PRINT("%p: ???", buffer[idx]);
		}
	}
}
"""
                else:
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
JNIEXPORT int64_t impl_bindings_bytes_1to_1u8_1vec (JNIEnv * env, jclass _b, jbyteArray bytes) {
	LDKCVec_u8Z *vec = (LDKCVec_u8Z*)MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8");
	vec->datalen = (*env)->GetArrayLength(env, bytes);
	vec->data = (uint8_t*)MALLOC(vec->datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion (env, bytes, 0, vec->datalen, vec->data);
	return (uint64_t)vec;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_txpointer_1get_1buffer (JNIEnv * env, jclass _b, jlong ptr) {
	LDKTransaction *txdata = (LDKTransaction*)ptr;
	LDKu8slice slice;
	slice.data = txdata->data;
	slice.datalen = txdata->datalen;
	return Java_org_ldk_impl_bindings_get_1u8_1slice_1bytes(env, _b, (uint64_t)&slice);
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_new_1txpointer_1copy_1data (JNIEnv * env, jclass _b, jbyteArray bytes) {
	LDKTransaction *txdata = (LDKTransaction*)MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	txdata->datalen = (*env)->GetArrayLength(env, bytes);
	txdata->data = (uint8_t*)MALLOC(txdata->datalen, "Tx Data Bytes");
	txdata->data_is_owned = false;
	(*env)->GetByteArrayRegion (env, bytes, 0, txdata->datalen, txdata->data);
	return (uint64_t)txdata;
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
	return (uint64_t)vec->datalen;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_new_1empty_1slice_1vec (JNIEnv * env, jclass _b) {
	// Check sizes of a few Vec types are all consistent as we're meant to be generic across types
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_SignatureZ), "Vec<*> needs to be mapped identically");
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_MessageSendEventZ), "Vec<*> needs to be mapped identically");
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_EventZ), "Vec<*> needs to be mapped identically");
	_Static_assert(sizeof(LDKCVec_u8Z) == sizeof(LDKCVec_C2Tuple_usizeTransactionZZ), "Vec<*> needs to be mapped identically");
	LDKCVec_u8Z *vec = (LDKCVec_u8Z*)MALLOC(sizeof(LDKCVec_u8Z), "Empty LDKCVec");
	vec->data = NULL;
	vec->datalen = 0;
	return (uint64_t)vec;
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

JNIEXPORT jstring JNICALL Java_org_ldk_impl_bindings_get_1ldk_1c_1bindings_1version(JNIEnv *env, jclass _c) {
	return str_ref_to_java(env, check_get_ldk_bindings_version(), strlen(check_get_ldk_bindings_version()));
}
JNIEXPORT jstring JNICALL Java_org_ldk_impl_bindings_get_1ldk_1version(JNIEnv *env, jclass _c) {
	return str_ref_to_java(env, check_get_ldk_version(), strlen(check_get_ldk_version()));
}
#include "version.c"
"""
        self.c_version_file = """JNIEXPORT jstring JNICALL Java_org_ldk_impl_bindings_get_1lib_1version_1string(JNIEnv *env, jclass _c) {
	return str_ref_to_java(env, "<git_version_ldk_garbagecollected>", strlen("<git_version_ldk_garbagecollected>"));
}"""

        self.hu_struct_file_prefix = """package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

"""
        self.c_fn_ty_pfx = "JNIEXPORT "
        self.c_fn_args_pfx = "JNIEnv *env, jclass clz"
        self.file_ext = ".java"
        self.ptr_c_ty = "int64_t"
        self.ptr_native_ty = "long"
        self.usize_c_ty = "int64_t"
        self.usize_native_ty = "long"
        self.native_zero_ptr = "0"
        self.result_c_ty = "jclass"
        self.ptr_arr = "jobjectArray"
        self.is_arr_some_check = ("", " != NULL")
        self.get_native_arr_len_call = ("(*env)->GetArrayLength(env, ", ")")

    def construct_jenv(self):
        res =  "JNIEnv *env;\n"
        res += "jint get_jenv_res = (*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_6);\n"
        res += "if (get_jenv_res == JNI_EDETACHED) {\n"
        if self.target == Target.ANDROID:
            res += "\tDO_ASSERT((*j_calls->vm)->AttachCurrentThread(j_calls->vm, &env, NULL) == JNI_OK);\n"
        else:
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
        if elem_ty.java_ty == "long" and elem_ty.java_hu_ty != "long":
            return arr_name + " != null ? Arrays.stream(" + arr_name + ").mapToLong(" + conv_name + " -> " + elem_ty.from_hu_conv[0] + ").toArray() : null"
        elif elem_ty.java_ty == "long":
            return arr_name + " != null ? Arrays.stream(" + arr_name + ").map(" + conv_name + " -> " + elem_ty.from_hu_conv[0] + ").toArray() : null"
        elif elem_ty.java_hu_ty == "UInt5":
            return arr_name + " != null ? InternalUtils.convUInt5Array(" + arr_name + ") : null"
        elif elem_ty.java_hu_ty == "WitnessVersion":
            return arr_name + " != null ? InternalUtils.convWitnessVersionArray(" + arr_name + ") : null"
        else:
            return arr_name + " != null ? Arrays.stream(" + arr_name + ").map(" + conv_name + " -> " + elem_ty.from_hu_conv[0] + ").toArray(" + arr_ty.java_ty + "::new) : null"

    def str_ref_to_native_call(self, var_name, str_len):
        return "str_ref_to_java(env, " + var_name + ", " + str_len + ")"
    def str_ref_to_c_call(self, var_name):
        return "java_to_owned_str(env, " + var_name + ")"
    def str_to_hu_conv(self, var_name):
        return None
    def str_from_hu_conv(self, var_name):
        return None

    def c_fn_name_define_pfx(self, fn_name, has_args):
        if has_args:
            return "JNICALL Java_org_ldk_impl_bindings_" + fn_name.replace("_", "_1") + "(JNIEnv *env, jclass clz, "
        return "JNICALL Java_org_ldk_impl_bindings_" + fn_name.replace("_", "_1") + "(JNIEnv *env, jclass clz"

    def init_str(self):
        res = ""
        for ty in sorted(self.c_array_class_caches):
            res = res + "static jclass " + ty + "_clz = NULL;\n"
        res = res + "JNIEXPORT void Java_org_ldk_impl_bindings_init_1class_1cache(JNIEnv * env, jclass clz) {\n"
        for ty in sorted(self.c_array_class_caches):
            res = res + "\t" + ty + "_clz = (*env)->FindClass(env, \"" + ty.replace("arr_of_", "[") + "\");\n"
            res = res + "\tCHECK(" + ty + "_clz != NULL);\n"
            res = res + "\t" + ty + "_clz = (*env)->NewGlobalRef(env, " + ty + "_clz);\n"
        res = res + "}\n"
        return res

    def var_decl_statement(self, ty_string, var_name, statement):
        return ty_string + " " + var_name + " = " + statement

    def get_java_arr_len(self, arr_name):
        return arr_name + ".length"
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

    def primitive_arr_from_hu(self, mapped_ty, fixed_len, arr_name):
        if fixed_len is not None:
            return ("InternalUtils.check_arr_len(" + arr_name + ", " + fixed_len + ")", "")
        return None
    def primitive_arr_to_hu(self, primitive_ty, fixed_len, arr_name, conv_name):
        return None

    def java_arr_ty_str(self, elem_ty_str):
        return elem_ty_str + "[]"

    def for_n_in_range(self, n, minimum, maximum):
        return "for (int " + n + " = " + minimum + "; " + n + " < " + maximum + "; " + n + "++) {"
    def for_n_in_arr(self, n, arr_name, arr_elem_ty):
        return ("for (" + arr_elem_ty.java_hu_ty + " " + n + ": " + arr_name + ") { ", " }")

    def get_ptr(self, var):
        return var + ".ptr"
    def set_null_skip_free(self, var):
        return var + ".ptr" + " = 0;"

    def add_ref(self, holder, referent):
        return "if (" + holder + " != null) { " + holder + ".ptrs_to.add(" + referent + "); }"

    def fully_qualified_hu_ty_path(self, ty):
        if ty.java_fn_ty_arg.startswith("L") and ty.java_fn_ty_arg.endswith(";"):
            return ty.java_fn_ty_arg.strip("L;").replace("/", ".")
        if ty.java_hu_ty == "UnqualifiedError" or ty.java_hu_ty == "UInt5" or ty.java_hu_ty == "WitnessVersion":
            return "org.ldk.util." + ty.java_hu_ty
        if not ty.is_native_primitive and ty.rust_obj is not None and not "[]" in ty.java_hu_ty:
            return "org.ldk.structs." + ty.java_hu_ty
        return ty.java_hu_ty

    def native_c_unitary_enum_map(self, struct_name, variants, enum_doc_comment):
        out_java_enum = "package org.ldk.enums;\n\n"
        out_java = ""
        out_c = ""
        out_c += "static inline LDK" + struct_name + " LDK" + struct_name + "_from_java(" + self.c_fn_args_pfx + ") {\n"
        out_c += "\tjint ord = (*env)->CallIntMethod(env, clz, ordinal_meth);\n"
        out_c += "\tif (UNLIKELY((*env)->ExceptionCheck(env))) {\n"
        out_c += "\t\t(*env)->ExceptionDescribe(env);\n"
        out_c += "\t\t(*env)->FatalError(env, \"A call to " + struct_name + ".ordinal() from rust threw an exception.\");\n"
        out_c += "\t}\n"
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
        out_java_enum = out_java_enum + "\t; static native void init();\n"
        out_java_enum = out_java_enum + "\tstatic { init(); }\n"
        out_java_enum = out_java_enum + "}"
        out_java = out_java + "\tstatic { " + struct_name + ".values(); /* Force enum statics to run */ }\n"
        out_c += "\t}\n"
        out_c += "\t(*env)->FatalError(env, \"A call to " + struct_name + ".ordinal() from rust returned an invalid value.\");\n"
        out_c += "\tabort(); // Unreachable, but will let the compiler know we don't return here\n"
        out_c += "}\n"

        out_c = out_c + "static jclass " + struct_name + "_class = NULL;\n"
        for var, _ in variants:
            out_c = out_c + "static jfieldID " + struct_name + "_" + var + " = NULL;\n"
        out_c = out_c + self.c_fn_ty_pfx + "void JNICALL Java_org_ldk_enums_" + struct_name.replace("_", "_1") + "_init (" + self.c_fn_args_pfx + ") {\n"
        out_c = out_c + "\t" + struct_name + "_class = (*env)->NewGlobalRef(env, clz);\n"
        out_c = out_c + "\tCHECK(" + struct_name + "_class != NULL);\n"
        for var, _ in variants:
            out_c = out_c + "\t" + struct_name + "_" + var + " = (*env)->GetStaticFieldID(env, " + struct_name + "_class, \"" + var + "\", \"Lorg/ldk/enums/" + struct_name + ";\");\n"
            out_c = out_c + "\tCHECK(" + struct_name + "_" + var + " != NULL);\n"
        out_c = out_c + "}\n"
        out_c = out_c + "static inline jclass LDK" + struct_name + "_to_java(JNIEnv *env, LDK" + struct_name + " val) {\n"
        out_c = out_c + "\tswitch (val) {\n"
        ord_v = 0
        for var, _ in variants:
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
        out_java_trait = out_java_trait + self.hu_struct_file_prefix
        if trait_doc_comment is not None:
            out_java_trait += "/**\n * " + trait_doc_comment.replace("\n", "\n * ") + "\n */\n"
        out_java_trait += "@SuppressWarnings(\"unchecked\") // We correctly assign various generic arrays\n"
        out_java_trait = out_java_trait + "public class " + struct_name.replace("LDK","") + " extends CommonBase {\n"
        out_java_trait = out_java_trait + "\tfinal bindings." + struct_name + " bindings_instance;\n"
        out_java_trait = out_java_trait + "\t" + struct_name.replace("LDK", "") + "(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }\n"
        out_java_trait = out_java_trait + "\tprivate " + struct_name.replace("LDK", "") + "(bindings." + struct_name + " arg"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                out_java_trait = out_java_trait + ", " + var.java_hu_ty + " " + var.arg_name
            else:
                out_java_trait = out_java_trait + ", bindings." + var[0] + " " + var[1]
        out_java_trait = out_java_trait + ") {\n"
        out_java_trait = out_java_trait + "\t\tsuper(bindings." + struct_name + "_new(arg"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                if var.from_hu_conv is not None:
                    out_java_trait = out_java_trait + ", " + var.from_hu_conv[0]
                else:
                    out_java_trait = out_java_trait + ", " + var.arg_name
            else:
                out_java_trait = out_java_trait + ", " + var[1]
        out_java_trait = out_java_trait + "));\n"
        out_java_trait = out_java_trait + "\t\tthis.ptrs_to.add(arg);\n"
        for var in flattened_field_vars:
            if isinstance(var, ConvInfo):
                if var.from_hu_conv is not None and var.from_hu_conv[1] != "":
                    out_java_trait = out_java_trait + "\t\t" + var.from_hu_conv[1].replace("\n", "\n\t\t") + ";\n"
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
        for var in flattened_field_vars:
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
            if fn_line.fn_name != "free" and fn_line.fn_name != "cloned":
                out_java = out_java + "\t\t " + fn_line.ret_ty_info.java_ty + " " + fn_line.fn_name + "("
                java_trait_constr = java_trait_constr + "\t\t\t@Override public " + fn_line.ret_ty_info.java_ty + " " + fn_line.fn_name + "("
                out_java_trait += "\t\t/**\n\t\t * " + fn_line.docs.replace("\n", "\n\t\t * ") + "\n\t\t */\n"
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

                java_trait_constr += ");\n"
                java_trait_constr += "\t\t\t\tReference.reachabilityFence(arg);\n"
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
                java_trait_constr += ", " + var[1] + ".new_impl(" + var[1] + "_impl"
                for suparg in var[2]:
                    if isinstance(suparg, ConvInfo):
                        java_trait_constr += ", " + suparg.arg_name
                    else:
                        java_trait_constr += ", " + suparg[1]
                java_trait_constr += ").bindings_instance"
                for suparg in var[2]:
                    if isinstance(suparg, ConvInfo):
                        java_trait_constr += ", " + suparg.arg_name
                    else:
                        java_trait_constr += ", " + suparg[1]
        out_java_trait = out_java_trait + "\t}\n"
        out_java_trait = out_java_trait + java_trait_constr + ");\n\t\treturn impl_holder.held;\n\t}\n"

        out_java = out_java + "\t}\n"

        out_java = out_java + "\tpublic static native long " + struct_name + "_new(" + struct_name + " impl"
        for var in flattened_field_vars:
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
                    out_c += "\t(*env)->Call" + fn_line.ret_ty_info.java_ty.title() + "Method(env, obj, j_calls->" + fn_line.fn_name + "_meth"
                elif fn_line.ret_ty_info.java_hu_ty == "String":
                    # Manually write out String methods as they're just an Object
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

        out_c = out_c + self.c_fn_ty_pfx + "int64_t " + self.c_fn_name_define_pfx(struct_name + "_new", True) + "jobject o"
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
                out_java_trait += "\t\tthis.ptrs_to.add(res);\n"
                out_java_trait += "\t\treturn res;\n"
                out_java_trait += "\t}\n"
                out_java_trait += "\n"

                out_java += "\tpublic static native long " + struct_name + "_get_" + var[1] + "(long arg);\n"

                out_c += "JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_" + struct_name + "_1get_1" + var[1] + "(JNIEnv *env, jclass clz, int64_t arg) {\n"
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
        java_hu_type = struct_name.replace("LDK", "").replace("COption", "Option")
        out_java_enum = ""
        out_java = ""
        out_c = ""

        out_java_enum += (self.hu_struct_file_prefix)
        out_java_enum += "\n/**\n * " + enum_doc_comment.replace("\n", "\n * ") + "\n */\n"
        out_java_enum += "@SuppressWarnings(\"unchecked\") // We correctly assign various generic arrays\n"
        out_java_enum += ("public class " + java_hu_type + " extends CommonBase {\n")
        out_java_enum += ("\tprivate " + java_hu_type + "(Object _dummy, long ptr) { super(ptr); }\n")
        out_java_enum += ("\t@Override @SuppressWarnings(\"deprecation\")\n")
        out_java_enum += ("\tprotected void finalize() throws Throwable {\n")
        out_java_enum += ("\t\tsuper.finalize();\n")
        out_java_enum += ("\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK", "") + "_free(ptr); }\n")
        out_java_enum += ("\t}\n")
        out_java_enum += ("\tstatic " + java_hu_type + " constr_from_ptr(long ptr) {\n")
        out_java_enum += ("\t\tbindings." + struct_name + " raw_val = bindings." + struct_name + "_ref_from_ptr(ptr);\n")
        java_hu_subclasses = ""

        init_meth_jty_strs = {}

        out_java +=  ("\tpublic static class " + struct_name + " {\n")
        out_java +=  ("\t\tprivate " + struct_name + "() {}\n")
        for var in variant_list:
            out_java +=  ("\t\tpublic final static class " + var.var_name + " extends " + struct_name + " {\n")
            if var.var_docs is not None:
                java_hu_subclasses += "\t/**\n\t * " + var.var_docs.replace("\n", "\n\t * ") + "\n\t */\n"
            java_hu_subclasses += "\tpublic final static class " + var.var_name + " extends " + java_hu_type + " {\n"
            out_java_enum += ("\t\tif (raw_val.getClass() == bindings." + struct_name + "." + var.var_name + ".class) {\n")
            out_java_enum += ("\t\t\treturn new " + var.var_name + "(ptr, (bindings." + struct_name + "." + var.var_name + ")raw_val);\n")
            init_meth_jty_str = ""
            init_meth_params = ""
            init_meth_body = ""
            hu_conv_body = ""
            for idx, (field_ty, field_docs) in enumerate(var.fields):
                if idx > 0:
                    init_meth_params = init_meth_params + ", "

                java_ty = field_ty.java_ty
                if field_ty.java_fn_ty_arg.startswith("L") and field_ty.java_fn_ty_arg.endswith(";"):
                    # If this is a simple enum, we have to reference it in the low-level bindings differently:
                    java_ty = field_ty.java_fn_ty_arg.strip("L;").replace("/", ".")
                out_java += "\t\t\tpublic " + java_ty + " " + field_ty.arg_name + ";\n"
                if field_docs is not None:
                    java_hu_subclasses += "\t\t/**\n\t\t * " + field_docs.replace("\n", "\n\t\t * ") + "\n\t\t*/\n"
                java_hu_subclasses += "\t\t"
                if field_ty.nullable:
                    java_hu_subclasses += "@Nullable "
                java_hu_subclasses += "public final " + self.fully_qualified_hu_ty_path(field_ty) + " " + field_ty.arg_name + ";\n"
                init_meth_params = init_meth_params + java_ty + " " + field_ty.arg_name

                init_meth_body = init_meth_body + "this." + field_ty.arg_name + " = " + field_ty.arg_name + "; "
                if field_ty.to_hu_conv is not None:
                    hu_conv_body = hu_conv_body + "\t\t\t" + field_ty.java_ty + " " + field_ty.arg_name + " = obj." + field_ty.arg_name + ";\n"
                    hu_conv_body = hu_conv_body + "\t\t\t" + field_ty.to_hu_conv.replace("\n", "\n\t\t\t") + "\n"
                    hu_conv_body = hu_conv_body + "\t\t\tthis." + field_ty.arg_name + " = " + field_ty.to_hu_conv_name + ";\n"
                else:
                    hu_conv_body = hu_conv_body + "\t\t\tthis." + field_ty.arg_name + " = obj." + field_ty.arg_name + ";\n"
                init_meth_jty_str = init_meth_jty_str + field_ty.java_fn_ty_arg
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
        out_c += ("\t" + struct_name + " *obj = (" + struct_name + "*)untag_ptr(ptr);\n")
        out_c += ("\tswitch(obj->tag) {\n")
        for var in variant_list:
            out_c += ("\t\tcase " + struct_name + "_" + var.var_name + ": {\n")
            c_params = []
            for idx, (field_map, field_docs) in enumerate(var.fields):
                if field_map.ret_conv is not None:
                    out_c += ("\t\t\t" + field_map.ret_conv[0].replace("\n", "\n\t\t\t"))
                    if var.tuple_variant:
                        out_c += "obj->" + camel_to_snake(var.var_name)
                    else:
                        out_c += "obj->" + camel_to_snake(var.var_name) + "." + field_map.arg_name
                    out_c += (field_map.ret_conv[1].replace("\n", "\n\t\t\t") + "\n")
                    c_params.append(field_map.ret_conv_name)
                else:
                    if var.tuple_variant:
                        c_params.append("obj->" + camel_to_snake(var.var_name))
                    else:
                        c_params.append("obj->" + camel_to_snake(var.var_name) + "." + field_map.arg_name)
            out_c += ("\t\t\treturn " + self.c_constr_native_complex_enum(struct_name, var.var_name, c_params) + ";\n")
            out_c += ("\t\t}\n")
        out_c += ("\t\tdefault: abort();\n")
        out_c += ("\t}\n}\n")
        return (out_java, out_java_enum, out_c)

    def map_opaque_struct(self, struct_name, struct_doc_comment):
        out_opaque_struct_human = ""
        out_opaque_struct_human += self.hu_struct_file_prefix
        out_opaque_struct_human += "\n/**\n * " + struct_doc_comment.replace("\n", "\n * ") + "\n */\n"
        out_opaque_struct_human += "@SuppressWarnings(\"unchecked\") // We correctly assign various generic arrays\n"
        hu_name = struct_name.replace("LDKC2Tuple", "TwoTuple").replace("LDKC3Tuple", "ThreeTuple").replace("LDK", "")
        out_opaque_struct_human += ("public class " + hu_name + " extends CommonBase")
        if struct_name.startswith("LDKLocked") or struct_name.startswith("LDKReadOnly"):
            out_opaque_struct_human += (" implements AutoCloseable")
        out_opaque_struct_human += (" {\n")
        out_opaque_struct_human += ("\t" + hu_name + "(Object _dummy, long ptr) { super(ptr); }\n")
        if struct_name.startswith("LDKLocked") or struct_name.startswith("LDKReadOnly"):
            out_opaque_struct_human += ("\t@Override public void close() {\n")
        else:
            out_opaque_struct_human += ("\t@Override @SuppressWarnings(\"deprecation\")\n")
            out_opaque_struct_human += ("\tprotected void finalize() throws Throwable {\n")
            out_opaque_struct_human += ("\t\tsuper.finalize();\n")
        out_opaque_struct_human += ("\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); }\n")
        out_opaque_struct_human += ("\t}\n\n")
        return out_opaque_struct_human

    def map_tuple(self, struct_name):
        return self.map_opaque_struct(struct_name, "A Tuple")

    def map_result(self, struct_name, res_map, err_map):
        human_ty = struct_name.replace("LDKCResult", "Result")
        java_hu_struct = ""
        java_hu_struct += self.hu_struct_file_prefix
        java_hu_struct += "public class " + human_ty + " extends CommonBase {\n"
        java_hu_struct += "\tprivate " + human_ty + "(Object _dummy, long ptr) { super(ptr); }\n"
        java_hu_struct += "\tprotected void finalize() throws Throwable {\n"
        java_hu_struct += "\t\tif (ptr != 0) { bindings." + struct_name.replace("LDK","") + "_free(ptr); } super.finalize();\n"
        java_hu_struct += "\t}\n\n"
        java_hu_struct += "\tstatic " + human_ty + " constr_from_ptr(long ptr) {\n"
        java_hu_struct += "\t\tif (bindings." + struct_name.replace("LDK", "") + "_is_ok(ptr)) {\n"
        java_hu_struct += "\t\t\treturn new " + human_ty + "_OK(null, ptr);\n"
        java_hu_struct += "\t\t} else {\n"
        java_hu_struct += "\t\t\treturn new " + human_ty + "_Err(null, ptr);\n"
        java_hu_struct += "\t\t}\n"
        java_hu_struct += "\t}\n"

        java_hu_struct += "\tpublic static final class " + human_ty + "_OK extends " + human_ty + " {\n"

        if res_map.java_hu_ty != "void":
            java_hu_struct += "\t\tpublic final " + res_map.java_hu_ty + " res;\n"
        java_hu_struct += "\t\tprivate " + human_ty + "_OK(Object _dummy, long ptr) {\n"
        java_hu_struct += "\t\t\tsuper(_dummy, ptr);\n"
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

        java_hu_struct += "\tpublic static final class " + human_ty + "_Err extends " + human_ty + " {\n"
        if err_map.java_hu_ty != "void":
            java_hu_struct += "\t\tpublic final " + err_map.java_hu_ty + " err;\n"
        java_hu_struct += "\t\tprivate " + human_ty + "_Err(Object _dummy, long ptr) {\n"
        java_hu_struct += "\t\t\tsuper(_dummy, ptr);\n"
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
        extra_java_struct_out = ""
        if not args_known:
            out_java_struct += ("\t// Skipped " + method_name + "\n")
        else:
            if doc_comment is not None:
                out_java_struct += "\t/**\n\t * " + doc_comment.replace("\n", "\n\t * ") + "\n\t */\n"
            if return_type_info.nullable:
                out_java_struct += "\t@Nullable\n"
            if not takes_self:
                if meth_n == "new":
                    out_java_struct += "\tpublic static " + return_type_info.java_hu_ty + " of("
                elif meth_n == "default":
                    out_java_struct += "\tpublic static " + return_type_info.java_hu_ty + " with_default("
                else:
                    out_java_struct += "\tpublic static " + return_type_info.java_hu_ty + " " + meth_n + "("
            elif meth_n == "clone_ptr" or (struct_meth.startswith("LDKCResult") and (meth_n == "get_ok" or meth_n == "get_err")):
                out_java_struct += ("\t" + return_type_info.java_hu_ty + " " + meth_n + "(")
            else:
                if meth_n == "hash" and return_type_info.java_hu_ty == "long":
                    extra_java_struct_out = "\t@Override public int hashCode() {\n"
                    extra_java_struct_out += "\t\treturn (int)this.hash();\n"
                    extra_java_struct_out += "\t}\n"
                elif meth_n == "eq" and return_type_info.java_hu_ty == "boolean":
                    extra_java_struct_out = "\t@Override public boolean equals(Object o) {\n"
                    extra_java_struct_out += "\t\tif (!(o instanceof " + struct_meth + ")) return false;\n"
                    extra_java_struct_out += "\t\treturn this.eq((" + struct_meth + ")o);\n"
                    extra_java_struct_out += "\t}\n"
                out_java_struct += ("\tpublic " + return_type_info.java_hu_ty + " " + meth_n + "(")
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
                        if arg.nullable:
                            out_java_struct += "@Nullable "
                        ty_string = arg.java_hu_ty
                        if arg.java_fn_ty_arg[0] == "L" and arg.java_fn_ty_arg[len(arg.java_fn_ty_arg) - 1] == ";":
                            ty_string = arg.java_fn_ty_arg.strip("L;").replace("/", ".")
                        out_java_struct += ty_string + " " + arg.arg_name
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

            # This is completely nuts. The OpenJDK JRE JIT will optimize out a object which is on
            # the stack, calling its finalizer immediately even if member methods are *actively
            # executing* on the same object, as long as said object is on the stack. There is no
            # concrete specification for when the optimizer is allowed to do this, and when it is
            # not, so there is absolutely no way to be certain that this fix suffices.
            #
            # Instead, the "Java Language Specification" says only that an object is reachable
            # (i.e. will not yet be finalized) if it "can be accessed in any potential continuing
            # computation from any live thread". To any sensible reader this would mean actively
            # executing a member function on an object would make it not eligible for finalization.
            # But, no, dear reader, this statement does not say that. Well, okay, it says that,
            # very explicitly in fact, but those are just, like, words, man.
            #
            # In the seemingly non-normative text further down, a few examples of things the
            # optimizer can do are given, including "if the values in an object's fields are
            # stored in registers[, t]he may then access the registers instead of the object, and
            # never access the object again[, implying] that the object is garbage". This appears
            # to fully contradict both the above statement, the API documentation in java.lang.ref
            # regarding when a reference is "strongly reachable", and basic common sense. There is
            # no concrete set of limitations stated, however, seemingly implying the JIT could
            # decide your code would run faster by simply garbage collecting everything
            # immediately, ensuring your code finishes soon, just by SEGFAULT. Thus, we're really
            # entirely flying blind here. We add some fences and hope that its sufficient, but
            # with no specification to rely on, we cannot be certain of anything.
            #
            # TL;DR: The Java Language "Specification" provides no real guarantees on when an
            # object will be considered available for garbage collection once the JIT kicks in, so
            # we put in some fences and hope to god the JIT doesn't get smarter/more broken.
            for idx, info in enumerate(argument_types):
                if idx == 0 and takes_self:
                    out_java_struct += ("\t\tReference.reachabilityFence(this);\n")
                elif info.arg_name in default_constructor_args:
                    for explode_idx, explode_arg in enumerate(default_constructor_args[info.arg_name]):
                        expl_arg_name = info.arg_name + "_" + explode_arg.arg_name
                        out_java_struct += ("\t\tReference.reachabilityFence(" + expl_arg_name + ");\n")
                elif info.c_ty != "void":
                    out_java_struct += ("\t\tReference.reachabilityFence(" + info.arg_name + ");\n")

            if return_type_info.java_ty == "long" and return_type_info.java_hu_ty != "long":
                out_java_struct += "\t\tif (ret >= 0 && ret <= 4096) { return null; }\n"

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
                            "\t\t" + info.from_hu_conv[1].replace("this", return_type_info.to_hu_conv_name).replace("\n", "\n\t\t") + ";\n")
                    else:
                        out_java_struct += ("\t\t" + info.from_hu_conv[1].replace("\n", "\n\t\t") + ";\n")

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
