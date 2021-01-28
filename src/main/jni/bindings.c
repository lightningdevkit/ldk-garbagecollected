#include "org_ldk_impl_bindings.h"
#include <rust_types.h>
#include <lightning.h>
#include <string.h>
#include <stdatomic.h>
#include <stdlib.h>

#include <assert.h>
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
			fprintf(stderr, "Tried to free unknown pointer %p at:\n", ptr);
			void* bt[BT_MAX];
			int bt_len = backtrace(bt, BT_MAX);
			backtrace_symbols_fd(bt, bt_len, STDERR_FILENO);
			fprintf(stderr, "\n\n");
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
		fprintf(stderr, "%s %p remains:\n", a->struct_name, a->ptr);
		backtrace_symbols_fd(a->bt, a->bt_len, STDERR_FILENO);
		fprintf(stderr, "\n\n");
	}
	DO_ASSERT(allocation_ll == NULL);
}

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
static jclass arr_of_J_clz = NULL;
static jclass arr_of_B_clz = NULL;
JNIEXPORT void Java_org_ldk_impl_bindings_init_1class_1cache(JNIEnv * env, jclass clz) {
	arr_of_J_clz = (*env)->FindClass(env, "[J");
	CHECK(arr_of_J_clz != NULL);
	arr_of_J_clz = (*env)->NewGlobalRef(env, arr_of_J_clz);
	arr_of_B_clz = (*env)->FindClass(env, "[B");
	CHECK(arr_of_B_clz != NULL);
	arr_of_B_clz = (*env)->NewGlobalRef(env, arr_of_B_clz);
}
static inline struct LDKThirtyTwoBytes ThirtyTwoBytes_clone(const struct LDKThirtyTwoBytes *orig) { struct LDKThirtyTwoBytes ret; memcpy(ret.data, orig->data, 32); return ret; }
static inline LDKAccessError LDKAccessError_from_java(JNIEnv *env, jclass clz) {
	switch ((*env)->CallIntMethod(env, clz, ordinal_meth)) {
		case 0: return LDKAccessError_UnknownChain;
		case 1: return LDKAccessError_UnknownTx;
	}
	abort();
}
static jclass LDKAccessError_class = NULL;
static jfieldID LDKAccessError_LDKAccessError_UnknownChain = NULL;
static jfieldID LDKAccessError_LDKAccessError_UnknownTx = NULL;
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKAccessError_init (JNIEnv *env, jclass clz) {
	LDKAccessError_class = (*env)->NewGlobalRef(env, clz);
	CHECK(LDKAccessError_class != NULL);
	LDKAccessError_LDKAccessError_UnknownChain = (*env)->GetStaticFieldID(env, LDKAccessError_class, "LDKAccessError_UnknownChain", "Lorg/ldk/enums/LDKAccessError;");
	CHECK(LDKAccessError_LDKAccessError_UnknownChain != NULL);
	LDKAccessError_LDKAccessError_UnknownTx = (*env)->GetStaticFieldID(env, LDKAccessError_class, "LDKAccessError_UnknownTx", "Lorg/ldk/enums/LDKAccessError;");
	CHECK(LDKAccessError_LDKAccessError_UnknownTx != NULL);
}
static inline jclass LDKAccessError_to_java(JNIEnv *env, LDKAccessError val) {
	switch (val) {
		case LDKAccessError_UnknownChain:
			return (*env)->GetStaticObjectField(env, LDKAccessError_class, LDKAccessError_LDKAccessError_UnknownChain);
		case LDKAccessError_UnknownTx:
			return (*env)->GetStaticObjectField(env, LDKAccessError_class, LDKAccessError_LDKAccessError_UnknownTx);
		default: abort();
	}
}

static inline LDKChannelMonitorUpdateErr LDKChannelMonitorUpdateErr_from_java(JNIEnv *env, jclass clz) {
	switch ((*env)->CallIntMethod(env, clz, ordinal_meth)) {
		case 0: return LDKChannelMonitorUpdateErr_TemporaryFailure;
		case 1: return LDKChannelMonitorUpdateErr_PermanentFailure;
	}
	abort();
}
static jclass LDKChannelMonitorUpdateErr_class = NULL;
static jfieldID LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_TemporaryFailure = NULL;
static jfieldID LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_PermanentFailure = NULL;
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKChannelMonitorUpdateErr_init (JNIEnv *env, jclass clz) {
	LDKChannelMonitorUpdateErr_class = (*env)->NewGlobalRef(env, clz);
	CHECK(LDKChannelMonitorUpdateErr_class != NULL);
	LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_TemporaryFailure = (*env)->GetStaticFieldID(env, LDKChannelMonitorUpdateErr_class, "LDKChannelMonitorUpdateErr_TemporaryFailure", "Lorg/ldk/enums/LDKChannelMonitorUpdateErr;");
	CHECK(LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_TemporaryFailure != NULL);
	LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_PermanentFailure = (*env)->GetStaticFieldID(env, LDKChannelMonitorUpdateErr_class, "LDKChannelMonitorUpdateErr_PermanentFailure", "Lorg/ldk/enums/LDKChannelMonitorUpdateErr;");
	CHECK(LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_PermanentFailure != NULL);
}
static inline jclass LDKChannelMonitorUpdateErr_to_java(JNIEnv *env, LDKChannelMonitorUpdateErr val) {
	switch (val) {
		case LDKChannelMonitorUpdateErr_TemporaryFailure:
			return (*env)->GetStaticObjectField(env, LDKChannelMonitorUpdateErr_class, LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_TemporaryFailure);
		case LDKChannelMonitorUpdateErr_PermanentFailure:
			return (*env)->GetStaticObjectField(env, LDKChannelMonitorUpdateErr_class, LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_PermanentFailure);
		default: abort();
	}
}

static inline LDKConfirmationTarget LDKConfirmationTarget_from_java(JNIEnv *env, jclass clz) {
	switch ((*env)->CallIntMethod(env, clz, ordinal_meth)) {
		case 0: return LDKConfirmationTarget_Background;
		case 1: return LDKConfirmationTarget_Normal;
		case 2: return LDKConfirmationTarget_HighPriority;
	}
	abort();
}
static jclass LDKConfirmationTarget_class = NULL;
static jfieldID LDKConfirmationTarget_LDKConfirmationTarget_Background = NULL;
static jfieldID LDKConfirmationTarget_LDKConfirmationTarget_Normal = NULL;
static jfieldID LDKConfirmationTarget_LDKConfirmationTarget_HighPriority = NULL;
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKConfirmationTarget_init (JNIEnv *env, jclass clz) {
	LDKConfirmationTarget_class = (*env)->NewGlobalRef(env, clz);
	CHECK(LDKConfirmationTarget_class != NULL);
	LDKConfirmationTarget_LDKConfirmationTarget_Background = (*env)->GetStaticFieldID(env, LDKConfirmationTarget_class, "LDKConfirmationTarget_Background", "Lorg/ldk/enums/LDKConfirmationTarget;");
	CHECK(LDKConfirmationTarget_LDKConfirmationTarget_Background != NULL);
	LDKConfirmationTarget_LDKConfirmationTarget_Normal = (*env)->GetStaticFieldID(env, LDKConfirmationTarget_class, "LDKConfirmationTarget_Normal", "Lorg/ldk/enums/LDKConfirmationTarget;");
	CHECK(LDKConfirmationTarget_LDKConfirmationTarget_Normal != NULL);
	LDKConfirmationTarget_LDKConfirmationTarget_HighPriority = (*env)->GetStaticFieldID(env, LDKConfirmationTarget_class, "LDKConfirmationTarget_HighPriority", "Lorg/ldk/enums/LDKConfirmationTarget;");
	CHECK(LDKConfirmationTarget_LDKConfirmationTarget_HighPriority != NULL);
}
static inline jclass LDKConfirmationTarget_to_java(JNIEnv *env, LDKConfirmationTarget val) {
	switch (val) {
		case LDKConfirmationTarget_Background:
			return (*env)->GetStaticObjectField(env, LDKConfirmationTarget_class, LDKConfirmationTarget_LDKConfirmationTarget_Background);
		case LDKConfirmationTarget_Normal:
			return (*env)->GetStaticObjectField(env, LDKConfirmationTarget_class, LDKConfirmationTarget_LDKConfirmationTarget_Normal);
		case LDKConfirmationTarget_HighPriority:
			return (*env)->GetStaticObjectField(env, LDKConfirmationTarget_class, LDKConfirmationTarget_LDKConfirmationTarget_HighPriority);
		default: abort();
	}
}

static inline LDKLevel LDKLevel_from_java(JNIEnv *env, jclass clz) {
	switch ((*env)->CallIntMethod(env, clz, ordinal_meth)) {
		case 0: return LDKLevel_Off;
		case 1: return LDKLevel_Error;
		case 2: return LDKLevel_Warn;
		case 3: return LDKLevel_Info;
		case 4: return LDKLevel_Debug;
		case 5: return LDKLevel_Trace;
	}
	abort();
}
static jclass LDKLevel_class = NULL;
static jfieldID LDKLevel_LDKLevel_Off = NULL;
static jfieldID LDKLevel_LDKLevel_Error = NULL;
static jfieldID LDKLevel_LDKLevel_Warn = NULL;
static jfieldID LDKLevel_LDKLevel_Info = NULL;
static jfieldID LDKLevel_LDKLevel_Debug = NULL;
static jfieldID LDKLevel_LDKLevel_Trace = NULL;
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKLevel_init (JNIEnv *env, jclass clz) {
	LDKLevel_class = (*env)->NewGlobalRef(env, clz);
	CHECK(LDKLevel_class != NULL);
	LDKLevel_LDKLevel_Off = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Off", "Lorg/ldk/enums/LDKLevel;");
	CHECK(LDKLevel_LDKLevel_Off != NULL);
	LDKLevel_LDKLevel_Error = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Error", "Lorg/ldk/enums/LDKLevel;");
	CHECK(LDKLevel_LDKLevel_Error != NULL);
	LDKLevel_LDKLevel_Warn = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Warn", "Lorg/ldk/enums/LDKLevel;");
	CHECK(LDKLevel_LDKLevel_Warn != NULL);
	LDKLevel_LDKLevel_Info = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Info", "Lorg/ldk/enums/LDKLevel;");
	CHECK(LDKLevel_LDKLevel_Info != NULL);
	LDKLevel_LDKLevel_Debug = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Debug", "Lorg/ldk/enums/LDKLevel;");
	CHECK(LDKLevel_LDKLevel_Debug != NULL);
	LDKLevel_LDKLevel_Trace = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Trace", "Lorg/ldk/enums/LDKLevel;");
	CHECK(LDKLevel_LDKLevel_Trace != NULL);
}
static inline jclass LDKLevel_to_java(JNIEnv *env, LDKLevel val) {
	switch (val) {
		case LDKLevel_Off:
			return (*env)->GetStaticObjectField(env, LDKLevel_class, LDKLevel_LDKLevel_Off);
		case LDKLevel_Error:
			return (*env)->GetStaticObjectField(env, LDKLevel_class, LDKLevel_LDKLevel_Error);
		case LDKLevel_Warn:
			return (*env)->GetStaticObjectField(env, LDKLevel_class, LDKLevel_LDKLevel_Warn);
		case LDKLevel_Info:
			return (*env)->GetStaticObjectField(env, LDKLevel_class, LDKLevel_LDKLevel_Info);
		case LDKLevel_Debug:
			return (*env)->GetStaticObjectField(env, LDKLevel_class, LDKLevel_LDKLevel_Debug);
		case LDKLevel_Trace:
			return (*env)->GetStaticObjectField(env, LDKLevel_class, LDKLevel_LDKLevel_Trace);
		default: abort();
	}
}

static inline LDKNetwork LDKNetwork_from_java(JNIEnv *env, jclass clz) {
	switch ((*env)->CallIntMethod(env, clz, ordinal_meth)) {
		case 0: return LDKNetwork_Bitcoin;
		case 1: return LDKNetwork_Testnet;
		case 2: return LDKNetwork_Regtest;
	}
	abort();
}
static jclass LDKNetwork_class = NULL;
static jfieldID LDKNetwork_LDKNetwork_Bitcoin = NULL;
static jfieldID LDKNetwork_LDKNetwork_Testnet = NULL;
static jfieldID LDKNetwork_LDKNetwork_Regtest = NULL;
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKNetwork_init (JNIEnv *env, jclass clz) {
	LDKNetwork_class = (*env)->NewGlobalRef(env, clz);
	CHECK(LDKNetwork_class != NULL);
	LDKNetwork_LDKNetwork_Bitcoin = (*env)->GetStaticFieldID(env, LDKNetwork_class, "LDKNetwork_Bitcoin", "Lorg/ldk/enums/LDKNetwork;");
	CHECK(LDKNetwork_LDKNetwork_Bitcoin != NULL);
	LDKNetwork_LDKNetwork_Testnet = (*env)->GetStaticFieldID(env, LDKNetwork_class, "LDKNetwork_Testnet", "Lorg/ldk/enums/LDKNetwork;");
	CHECK(LDKNetwork_LDKNetwork_Testnet != NULL);
	LDKNetwork_LDKNetwork_Regtest = (*env)->GetStaticFieldID(env, LDKNetwork_class, "LDKNetwork_Regtest", "Lorg/ldk/enums/LDKNetwork;");
	CHECK(LDKNetwork_LDKNetwork_Regtest != NULL);
}
static inline jclass LDKNetwork_to_java(JNIEnv *env, LDKNetwork val) {
	switch (val) {
		case LDKNetwork_Bitcoin:
			return (*env)->GetStaticObjectField(env, LDKNetwork_class, LDKNetwork_LDKNetwork_Bitcoin);
		case LDKNetwork_Testnet:
			return (*env)->GetStaticObjectField(env, LDKNetwork_class, LDKNetwork_LDKNetwork_Testnet);
		case LDKNetwork_Regtest:
			return (*env)->GetStaticObjectField(env, LDKNetwork_class, LDKNetwork_LDKNetwork_Regtest);
		default: abort();
	}
}

static inline LDKSecp256k1Error LDKSecp256k1Error_from_java(JNIEnv *env, jclass clz) {
	switch ((*env)->CallIntMethod(env, clz, ordinal_meth)) {
		case 0: return LDKSecp256k1Error_IncorrectSignature;
		case 1: return LDKSecp256k1Error_InvalidMessage;
		case 2: return LDKSecp256k1Error_InvalidPublicKey;
		case 3: return LDKSecp256k1Error_InvalidSignature;
		case 4: return LDKSecp256k1Error_InvalidSecretKey;
		case 5: return LDKSecp256k1Error_InvalidRecoveryId;
		case 6: return LDKSecp256k1Error_InvalidTweak;
		case 7: return LDKSecp256k1Error_NotEnoughMemory;
		case 8: return LDKSecp256k1Error_CallbackPanicked;
	}
	abort();
}
static jclass LDKSecp256k1Error_class = NULL;
static jfieldID LDKSecp256k1Error_LDKSecp256k1Error_IncorrectSignature = NULL;
static jfieldID LDKSecp256k1Error_LDKSecp256k1Error_InvalidMessage = NULL;
static jfieldID LDKSecp256k1Error_LDKSecp256k1Error_InvalidPublicKey = NULL;
static jfieldID LDKSecp256k1Error_LDKSecp256k1Error_InvalidSignature = NULL;
static jfieldID LDKSecp256k1Error_LDKSecp256k1Error_InvalidSecretKey = NULL;
static jfieldID LDKSecp256k1Error_LDKSecp256k1Error_InvalidRecoveryId = NULL;
static jfieldID LDKSecp256k1Error_LDKSecp256k1Error_InvalidTweak = NULL;
static jfieldID LDKSecp256k1Error_LDKSecp256k1Error_NotEnoughMemory = NULL;
static jfieldID LDKSecp256k1Error_LDKSecp256k1Error_CallbackPanicked = NULL;
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKSecp256k1Error_init (JNIEnv *env, jclass clz) {
	LDKSecp256k1Error_class = (*env)->NewGlobalRef(env, clz);
	CHECK(LDKSecp256k1Error_class != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_IncorrectSignature = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_IncorrectSignature", "Lorg/ldk/enums/LDKSecp256k1Error;");
	CHECK(LDKSecp256k1Error_LDKSecp256k1Error_IncorrectSignature != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidMessage = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidMessage", "Lorg/ldk/enums/LDKSecp256k1Error;");
	CHECK(LDKSecp256k1Error_LDKSecp256k1Error_InvalidMessage != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidPublicKey = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidPublicKey", "Lorg/ldk/enums/LDKSecp256k1Error;");
	CHECK(LDKSecp256k1Error_LDKSecp256k1Error_InvalidPublicKey != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidSignature = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidSignature", "Lorg/ldk/enums/LDKSecp256k1Error;");
	CHECK(LDKSecp256k1Error_LDKSecp256k1Error_InvalidSignature != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidSecretKey = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidSecretKey", "Lorg/ldk/enums/LDKSecp256k1Error;");
	CHECK(LDKSecp256k1Error_LDKSecp256k1Error_InvalidSecretKey != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidRecoveryId = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidRecoveryId", "Lorg/ldk/enums/LDKSecp256k1Error;");
	CHECK(LDKSecp256k1Error_LDKSecp256k1Error_InvalidRecoveryId != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidTweak = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidTweak", "Lorg/ldk/enums/LDKSecp256k1Error;");
	CHECK(LDKSecp256k1Error_LDKSecp256k1Error_InvalidTweak != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_NotEnoughMemory = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_NotEnoughMemory", "Lorg/ldk/enums/LDKSecp256k1Error;");
	CHECK(LDKSecp256k1Error_LDKSecp256k1Error_NotEnoughMemory != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_CallbackPanicked = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_CallbackPanicked", "Lorg/ldk/enums/LDKSecp256k1Error;");
	CHECK(LDKSecp256k1Error_LDKSecp256k1Error_CallbackPanicked != NULL);
}
static inline jclass LDKSecp256k1Error_to_java(JNIEnv *env, LDKSecp256k1Error val) {
	switch (val) {
		case LDKSecp256k1Error_IncorrectSignature:
			return (*env)->GetStaticObjectField(env, LDKSecp256k1Error_class, LDKSecp256k1Error_LDKSecp256k1Error_IncorrectSignature);
		case LDKSecp256k1Error_InvalidMessage:
			return (*env)->GetStaticObjectField(env, LDKSecp256k1Error_class, LDKSecp256k1Error_LDKSecp256k1Error_InvalidMessage);
		case LDKSecp256k1Error_InvalidPublicKey:
			return (*env)->GetStaticObjectField(env, LDKSecp256k1Error_class, LDKSecp256k1Error_LDKSecp256k1Error_InvalidPublicKey);
		case LDKSecp256k1Error_InvalidSignature:
			return (*env)->GetStaticObjectField(env, LDKSecp256k1Error_class, LDKSecp256k1Error_LDKSecp256k1Error_InvalidSignature);
		case LDKSecp256k1Error_InvalidSecretKey:
			return (*env)->GetStaticObjectField(env, LDKSecp256k1Error_class, LDKSecp256k1Error_LDKSecp256k1Error_InvalidSecretKey);
		case LDKSecp256k1Error_InvalidRecoveryId:
			return (*env)->GetStaticObjectField(env, LDKSecp256k1Error_class, LDKSecp256k1Error_LDKSecp256k1Error_InvalidRecoveryId);
		case LDKSecp256k1Error_InvalidTweak:
			return (*env)->GetStaticObjectField(env, LDKSecp256k1Error_class, LDKSecp256k1Error_LDKSecp256k1Error_InvalidTweak);
		case LDKSecp256k1Error_NotEnoughMemory:
			return (*env)->GetStaticObjectField(env, LDKSecp256k1Error_class, LDKSecp256k1Error_LDKSecp256k1Error_NotEnoughMemory);
		case LDKSecp256k1Error_CallbackPanicked:
			return (*env)->GetStaticObjectField(env, LDKSecp256k1Error_class, LDKSecp256k1Error_LDKSecp256k1Error_CallbackPanicked);
		default: abort();
	}
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1u8Z_1new(JNIEnv *env, jclass clz, int8_tArray elems) {
	LDKCVec_u8Z *ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(uint8_t) * ret->datalen, "LDKCVec_u8Z Data");
		int8_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			ret->data[i] = java_elems[i];
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_u8Z CVec_u8Z_clone(const LDKCVec_u8Z *orig) {
	LDKCVec_u8Z ret = { .data = MALLOC(sizeof(int8_t) * orig->datalen, "LDKCVec_u8Z clone bytes"), .datalen = orig->datalen };
	memcpy(ret.data, orig->data, sizeof(int8_t) * ret.datalen);
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1u64u64Z_1new(JNIEnv *env, jclass clz, int64_t a, int64_t b) {
	LDKC2Tuple_u64u64Z* ret = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	ret->a = a;
	ret->b = b;
	return (long)ret;
}
static inline LDKC2Tuple_u64u64Z C2Tuple_u64u64Z_clone(const LDKC2Tuple_u64u64Z *orig) {
	LDKC2Tuple_u64u64Z ret = {
		.a = orig->a,
		.b = orig->b,
	};
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1u64u64Z_1get_1a(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_u64u64Z *tuple = (LDKC2Tuple_u64u64Z*)ptr;
	return tuple->a;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1u64u64Z_1get_1b(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_u64u64Z *tuple = (LDKC2Tuple_u64u64Z*)ptr;
	return tuple->b;
}
static jclass LDKSpendableOutputDescriptor_StaticOutput_class = NULL;
static jmethodID LDKSpendableOutputDescriptor_StaticOutput_meth = NULL;
static jclass LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class = NULL;
static jmethodID LDKSpendableOutputDescriptor_DynamicOutputP2WSH_meth = NULL;
static jclass LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class = NULL;
static jmethodID LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKSpendableOutputDescriptor_init (JNIEnv *env, jclass clz) {
	LDKSpendableOutputDescriptor_StaticOutput_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKSpendableOutputDescriptor$StaticOutput;"));
	CHECK(LDKSpendableOutputDescriptor_StaticOutput_class != NULL);
	LDKSpendableOutputDescriptor_StaticOutput_meth = (*env)->GetMethodID(env, LDKSpendableOutputDescriptor_StaticOutput_class, "<init>", "(JJ)V");
	CHECK(LDKSpendableOutputDescriptor_StaticOutput_meth != NULL);
	LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKSpendableOutputDescriptor$DynamicOutputP2WSH;"));
	CHECK(LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class != NULL);
	LDKSpendableOutputDescriptor_DynamicOutputP2WSH_meth = (*env)->GetMethodID(env, LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class, "<init>", "(J[BSJJ[B)V");
	CHECK(LDKSpendableOutputDescriptor_DynamicOutputP2WSH_meth != NULL);
	LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKSpendableOutputDescriptor$StaticOutputCounterpartyPayment;"));
	CHECK(LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class != NULL);
	LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_meth = (*env)->GetMethodID(env, LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class, "<init>", "(JJJ)V");
	CHECK(LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKSpendableOutputDescriptor_1ref_1from_1ptr(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKSpendableOutputDescriptor *obj = (LDKSpendableOutputDescriptor*)ptr;
	switch(obj->tag) {
		case LDKSpendableOutputDescriptor_StaticOutput: {
			LDKOutPoint outpoint_var = obj->static_output.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			long output_ref = (long)&obj->static_output.output;
			return (*env)->NewObject(env, LDKSpendableOutputDescriptor_StaticOutput_class, LDKSpendableOutputDescriptor_StaticOutput_meth, outpoint_ref, (long)output_ref);
		}
		case LDKSpendableOutputDescriptor_DynamicOutputP2WSH: {
			LDKOutPoint outpoint_var = obj->dynamic_output_p2wsh.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			int8_tArray per_commitment_point_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, per_commitment_point_arr, 0, 33, obj->dynamic_output_p2wsh.per_commitment_point.compressed_form);
			long output_ref = (long)&obj->dynamic_output_p2wsh.output;
			long key_derivation_params_ref = (long)&obj->dynamic_output_p2wsh.key_derivation_params;
			int8_tArray revocation_pubkey_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, revocation_pubkey_arr, 0, 33, obj->dynamic_output_p2wsh.revocation_pubkey.compressed_form);
			return (*env)->NewObject(env, LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class, LDKSpendableOutputDescriptor_DynamicOutputP2WSH_meth, outpoint_ref, per_commitment_point_arr, obj->dynamic_output_p2wsh.to_self_delay, (long)output_ref, key_derivation_params_ref, revocation_pubkey_arr);
		}
		case LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment: {
			LDKOutPoint outpoint_var = obj->static_output_counterparty_payment.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			long output_ref = (long)&obj->static_output_counterparty_payment.output;
			long key_derivation_params_ref = (long)&obj->static_output_counterparty_payment.key_derivation_params;
			return (*env)->NewObject(env, LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class, LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_meth, outpoint_ref, (long)output_ref, key_derivation_params_ref);
		}
		default: abort();
	}
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1SpendableOutputDescriptorZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_SpendableOutputDescriptorZ *ret = MALLOC(sizeof(LDKCVec_SpendableOutputDescriptorZ), "LDKCVec_SpendableOutputDescriptorZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKSpendableOutputDescriptor) * ret->datalen, "LDKCVec_SpendableOutputDescriptorZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKSpendableOutputDescriptor arr_elem_conv = *(LDKSpendableOutputDescriptor*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_SpendableOutputDescriptorZ CVec_SpendableOutputDescriptorZ_clone(const LDKCVec_SpendableOutputDescriptorZ *orig) {
	LDKCVec_SpendableOutputDescriptorZ ret = { .data = MALLOC(sizeof(LDKSpendableOutputDescriptor) * orig->datalen, "LDKCVec_SpendableOutputDescriptorZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = SpendableOutputDescriptor_clone(&orig->data[i]);
	}
	return ret;
}
static jclass LDKErrorAction_DisconnectPeer_class = NULL;
static jmethodID LDKErrorAction_DisconnectPeer_meth = NULL;
static jclass LDKErrorAction_IgnoreError_class = NULL;
static jmethodID LDKErrorAction_IgnoreError_meth = NULL;
static jclass LDKErrorAction_SendErrorMessage_class = NULL;
static jmethodID LDKErrorAction_SendErrorMessage_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKErrorAction_init (JNIEnv *env, jclass clz) {
	LDKErrorAction_DisconnectPeer_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKErrorAction$DisconnectPeer;"));
	CHECK(LDKErrorAction_DisconnectPeer_class != NULL);
	LDKErrorAction_DisconnectPeer_meth = (*env)->GetMethodID(env, LDKErrorAction_DisconnectPeer_class, "<init>", "(J)V");
	CHECK(LDKErrorAction_DisconnectPeer_meth != NULL);
	LDKErrorAction_IgnoreError_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKErrorAction$IgnoreError;"));
	CHECK(LDKErrorAction_IgnoreError_class != NULL);
	LDKErrorAction_IgnoreError_meth = (*env)->GetMethodID(env, LDKErrorAction_IgnoreError_class, "<init>", "()V");
	CHECK(LDKErrorAction_IgnoreError_meth != NULL);
	LDKErrorAction_SendErrorMessage_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKErrorAction$SendErrorMessage;"));
	CHECK(LDKErrorAction_SendErrorMessage_class != NULL);
	LDKErrorAction_SendErrorMessage_meth = (*env)->GetMethodID(env, LDKErrorAction_SendErrorMessage_class, "<init>", "(J)V");
	CHECK(LDKErrorAction_SendErrorMessage_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKErrorAction_1ref_1from_1ptr(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKErrorAction *obj = (LDKErrorAction*)ptr;
	switch(obj->tag) {
		case LDKErrorAction_DisconnectPeer: {
			LDKErrorMessage msg_var = obj->disconnect_peer.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKErrorAction_DisconnectPeer_class, LDKErrorAction_DisconnectPeer_meth, msg_ref);
		}
		case LDKErrorAction_IgnoreError: {
			return (*env)->NewObject(env, LDKErrorAction_IgnoreError_class, LDKErrorAction_IgnoreError_meth);
		}
		case LDKErrorAction_SendErrorMessage: {
			LDKErrorMessage msg_var = obj->send_error_message.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKErrorAction_SendErrorMessage_class, LDKErrorAction_SendErrorMessage_meth, msg_ref);
		}
		default: abort();
	}
}
static jclass LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class = NULL;
static jmethodID LDKHTLCFailChannelUpdate_ChannelUpdateMessage_meth = NULL;
static jclass LDKHTLCFailChannelUpdate_ChannelClosed_class = NULL;
static jmethodID LDKHTLCFailChannelUpdate_ChannelClosed_meth = NULL;
static jclass LDKHTLCFailChannelUpdate_NodeFailure_class = NULL;
static jmethodID LDKHTLCFailChannelUpdate_NodeFailure_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKHTLCFailChannelUpdate_init (JNIEnv *env, jclass clz) {
	LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKHTLCFailChannelUpdate$ChannelUpdateMessage;"));
	CHECK(LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class != NULL);
	LDKHTLCFailChannelUpdate_ChannelUpdateMessage_meth = (*env)->GetMethodID(env, LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class, "<init>", "(J)V");
	CHECK(LDKHTLCFailChannelUpdate_ChannelUpdateMessage_meth != NULL);
	LDKHTLCFailChannelUpdate_ChannelClosed_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKHTLCFailChannelUpdate$ChannelClosed;"));
	CHECK(LDKHTLCFailChannelUpdate_ChannelClosed_class != NULL);
	LDKHTLCFailChannelUpdate_ChannelClosed_meth = (*env)->GetMethodID(env, LDKHTLCFailChannelUpdate_ChannelClosed_class, "<init>", "(JZ)V");
	CHECK(LDKHTLCFailChannelUpdate_ChannelClosed_meth != NULL);
	LDKHTLCFailChannelUpdate_NodeFailure_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKHTLCFailChannelUpdate$NodeFailure;"));
	CHECK(LDKHTLCFailChannelUpdate_NodeFailure_class != NULL);
	LDKHTLCFailChannelUpdate_NodeFailure_meth = (*env)->GetMethodID(env, LDKHTLCFailChannelUpdate_NodeFailure_class, "<init>", "([BZ)V");
	CHECK(LDKHTLCFailChannelUpdate_NodeFailure_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKHTLCFailChannelUpdate_1ref_1from_1ptr(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKHTLCFailChannelUpdate *obj = (LDKHTLCFailChannelUpdate*)ptr;
	switch(obj->tag) {
		case LDKHTLCFailChannelUpdate_ChannelUpdateMessage: {
			LDKChannelUpdate msg_var = obj->channel_update_message.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class, LDKHTLCFailChannelUpdate_ChannelUpdateMessage_meth, msg_ref);
		}
		case LDKHTLCFailChannelUpdate_ChannelClosed: {
			return (*env)->NewObject(env, LDKHTLCFailChannelUpdate_ChannelClosed_class, LDKHTLCFailChannelUpdate_ChannelClosed_meth, obj->channel_closed.short_channel_id, obj->channel_closed.is_permanent);
		}
		case LDKHTLCFailChannelUpdate_NodeFailure: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->node_failure.node_id.compressed_form);
			return (*env)->NewObject(env, LDKHTLCFailChannelUpdate_NodeFailure_class, LDKHTLCFailChannelUpdate_NodeFailure_meth, node_id_arr, obj->node_failure.is_permanent);
		}
		default: abort();
	}
}
static jclass LDKMessageSendEvent_SendAcceptChannel_class = NULL;
static jmethodID LDKMessageSendEvent_SendAcceptChannel_meth = NULL;
static jclass LDKMessageSendEvent_SendOpenChannel_class = NULL;
static jmethodID LDKMessageSendEvent_SendOpenChannel_meth = NULL;
static jclass LDKMessageSendEvent_SendFundingCreated_class = NULL;
static jmethodID LDKMessageSendEvent_SendFundingCreated_meth = NULL;
static jclass LDKMessageSendEvent_SendFundingSigned_class = NULL;
static jmethodID LDKMessageSendEvent_SendFundingSigned_meth = NULL;
static jclass LDKMessageSendEvent_SendFundingLocked_class = NULL;
static jmethodID LDKMessageSendEvent_SendFundingLocked_meth = NULL;
static jclass LDKMessageSendEvent_SendAnnouncementSignatures_class = NULL;
static jmethodID LDKMessageSendEvent_SendAnnouncementSignatures_meth = NULL;
static jclass LDKMessageSendEvent_UpdateHTLCs_class = NULL;
static jmethodID LDKMessageSendEvent_UpdateHTLCs_meth = NULL;
static jclass LDKMessageSendEvent_SendRevokeAndACK_class = NULL;
static jmethodID LDKMessageSendEvent_SendRevokeAndACK_meth = NULL;
static jclass LDKMessageSendEvent_SendClosingSigned_class = NULL;
static jmethodID LDKMessageSendEvent_SendClosingSigned_meth = NULL;
static jclass LDKMessageSendEvent_SendShutdown_class = NULL;
static jmethodID LDKMessageSendEvent_SendShutdown_meth = NULL;
static jclass LDKMessageSendEvent_SendChannelReestablish_class = NULL;
static jmethodID LDKMessageSendEvent_SendChannelReestablish_meth = NULL;
static jclass LDKMessageSendEvent_BroadcastChannelAnnouncement_class = NULL;
static jmethodID LDKMessageSendEvent_BroadcastChannelAnnouncement_meth = NULL;
static jclass LDKMessageSendEvent_BroadcastNodeAnnouncement_class = NULL;
static jmethodID LDKMessageSendEvent_BroadcastNodeAnnouncement_meth = NULL;
static jclass LDKMessageSendEvent_BroadcastChannelUpdate_class = NULL;
static jmethodID LDKMessageSendEvent_BroadcastChannelUpdate_meth = NULL;
static jclass LDKMessageSendEvent_HandleError_class = NULL;
static jmethodID LDKMessageSendEvent_HandleError_meth = NULL;
static jclass LDKMessageSendEvent_PaymentFailureNetworkUpdate_class = NULL;
static jmethodID LDKMessageSendEvent_PaymentFailureNetworkUpdate_meth = NULL;
static jclass LDKMessageSendEvent_SendChannelRangeQuery_class = NULL;
static jmethodID LDKMessageSendEvent_SendChannelRangeQuery_meth = NULL;
static jclass LDKMessageSendEvent_SendShortIdsQuery_class = NULL;
static jmethodID LDKMessageSendEvent_SendShortIdsQuery_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKMessageSendEvent_init (JNIEnv *env, jclass clz) {
	LDKMessageSendEvent_SendAcceptChannel_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendAcceptChannel;"));
	CHECK(LDKMessageSendEvent_SendAcceptChannel_class != NULL);
	LDKMessageSendEvent_SendAcceptChannel_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendAcceptChannel_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendAcceptChannel_meth != NULL);
	LDKMessageSendEvent_SendOpenChannel_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendOpenChannel;"));
	CHECK(LDKMessageSendEvent_SendOpenChannel_class != NULL);
	LDKMessageSendEvent_SendOpenChannel_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendOpenChannel_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendOpenChannel_meth != NULL);
	LDKMessageSendEvent_SendFundingCreated_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendFundingCreated;"));
	CHECK(LDKMessageSendEvent_SendFundingCreated_class != NULL);
	LDKMessageSendEvent_SendFundingCreated_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendFundingCreated_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendFundingCreated_meth != NULL);
	LDKMessageSendEvent_SendFundingSigned_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendFundingSigned;"));
	CHECK(LDKMessageSendEvent_SendFundingSigned_class != NULL);
	LDKMessageSendEvent_SendFundingSigned_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendFundingSigned_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendFundingSigned_meth != NULL);
	LDKMessageSendEvent_SendFundingLocked_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendFundingLocked;"));
	CHECK(LDKMessageSendEvent_SendFundingLocked_class != NULL);
	LDKMessageSendEvent_SendFundingLocked_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendFundingLocked_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendFundingLocked_meth != NULL);
	LDKMessageSendEvent_SendAnnouncementSignatures_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendAnnouncementSignatures;"));
	CHECK(LDKMessageSendEvent_SendAnnouncementSignatures_class != NULL);
	LDKMessageSendEvent_SendAnnouncementSignatures_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendAnnouncementSignatures_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendAnnouncementSignatures_meth != NULL);
	LDKMessageSendEvent_UpdateHTLCs_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$UpdateHTLCs;"));
	CHECK(LDKMessageSendEvent_UpdateHTLCs_class != NULL);
	LDKMessageSendEvent_UpdateHTLCs_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_UpdateHTLCs_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_UpdateHTLCs_meth != NULL);
	LDKMessageSendEvent_SendRevokeAndACK_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendRevokeAndACK;"));
	CHECK(LDKMessageSendEvent_SendRevokeAndACK_class != NULL);
	LDKMessageSendEvent_SendRevokeAndACK_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendRevokeAndACK_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendRevokeAndACK_meth != NULL);
	LDKMessageSendEvent_SendClosingSigned_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendClosingSigned;"));
	CHECK(LDKMessageSendEvent_SendClosingSigned_class != NULL);
	LDKMessageSendEvent_SendClosingSigned_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendClosingSigned_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendClosingSigned_meth != NULL);
	LDKMessageSendEvent_SendShutdown_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendShutdown;"));
	CHECK(LDKMessageSendEvent_SendShutdown_class != NULL);
	LDKMessageSendEvent_SendShutdown_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendShutdown_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendShutdown_meth != NULL);
	LDKMessageSendEvent_SendChannelReestablish_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendChannelReestablish;"));
	CHECK(LDKMessageSendEvent_SendChannelReestablish_class != NULL);
	LDKMessageSendEvent_SendChannelReestablish_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendChannelReestablish_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendChannelReestablish_meth != NULL);
	LDKMessageSendEvent_BroadcastChannelAnnouncement_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$BroadcastChannelAnnouncement;"));
	CHECK(LDKMessageSendEvent_BroadcastChannelAnnouncement_class != NULL);
	LDKMessageSendEvent_BroadcastChannelAnnouncement_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_BroadcastChannelAnnouncement_class, "<init>", "(JJ)V");
	CHECK(LDKMessageSendEvent_BroadcastChannelAnnouncement_meth != NULL);
	LDKMessageSendEvent_BroadcastNodeAnnouncement_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$BroadcastNodeAnnouncement;"));
	CHECK(LDKMessageSendEvent_BroadcastNodeAnnouncement_class != NULL);
	LDKMessageSendEvent_BroadcastNodeAnnouncement_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_BroadcastNodeAnnouncement_class, "<init>", "(J)V");
	CHECK(LDKMessageSendEvent_BroadcastNodeAnnouncement_meth != NULL);
	LDKMessageSendEvent_BroadcastChannelUpdate_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$BroadcastChannelUpdate;"));
	CHECK(LDKMessageSendEvent_BroadcastChannelUpdate_class != NULL);
	LDKMessageSendEvent_BroadcastChannelUpdate_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_BroadcastChannelUpdate_class, "<init>", "(J)V");
	CHECK(LDKMessageSendEvent_BroadcastChannelUpdate_meth != NULL);
	LDKMessageSendEvent_HandleError_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$HandleError;"));
	CHECK(LDKMessageSendEvent_HandleError_class != NULL);
	LDKMessageSendEvent_HandleError_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_HandleError_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_HandleError_meth != NULL);
	LDKMessageSendEvent_PaymentFailureNetworkUpdate_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$PaymentFailureNetworkUpdate;"));
	CHECK(LDKMessageSendEvent_PaymentFailureNetworkUpdate_class != NULL);
	LDKMessageSendEvent_PaymentFailureNetworkUpdate_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_PaymentFailureNetworkUpdate_class, "<init>", "(J)V");
	CHECK(LDKMessageSendEvent_PaymentFailureNetworkUpdate_meth != NULL);
	LDKMessageSendEvent_SendChannelRangeQuery_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendChannelRangeQuery;"));
	CHECK(LDKMessageSendEvent_SendChannelRangeQuery_class != NULL);
	LDKMessageSendEvent_SendChannelRangeQuery_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendChannelRangeQuery_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendChannelRangeQuery_meth != NULL);
	LDKMessageSendEvent_SendShortIdsQuery_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendShortIdsQuery;"));
	CHECK(LDKMessageSendEvent_SendShortIdsQuery_class != NULL);
	LDKMessageSendEvent_SendShortIdsQuery_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendShortIdsQuery_class, "<init>", "([BJ)V");
	CHECK(LDKMessageSendEvent_SendShortIdsQuery_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKMessageSendEvent_1ref_1from_1ptr(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKMessageSendEvent *obj = (LDKMessageSendEvent*)ptr;
	switch(obj->tag) {
		case LDKMessageSendEvent_SendAcceptChannel: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_accept_channel.node_id.compressed_form);
			LDKAcceptChannel msg_var = obj->send_accept_channel.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendAcceptChannel_class, LDKMessageSendEvent_SendAcceptChannel_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendOpenChannel: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_open_channel.node_id.compressed_form);
			LDKOpenChannel msg_var = obj->send_open_channel.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendOpenChannel_class, LDKMessageSendEvent_SendOpenChannel_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendFundingCreated: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_funding_created.node_id.compressed_form);
			LDKFundingCreated msg_var = obj->send_funding_created.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendFundingCreated_class, LDKMessageSendEvent_SendFundingCreated_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendFundingSigned: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_funding_signed.node_id.compressed_form);
			LDKFundingSigned msg_var = obj->send_funding_signed.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendFundingSigned_class, LDKMessageSendEvent_SendFundingSigned_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendFundingLocked: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_funding_locked.node_id.compressed_form);
			LDKFundingLocked msg_var = obj->send_funding_locked.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendFundingLocked_class, LDKMessageSendEvent_SendFundingLocked_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendAnnouncementSignatures: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_announcement_signatures.node_id.compressed_form);
			LDKAnnouncementSignatures msg_var = obj->send_announcement_signatures.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendAnnouncementSignatures_class, LDKMessageSendEvent_SendAnnouncementSignatures_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_UpdateHTLCs: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->update_htl_cs.node_id.compressed_form);
			LDKCommitmentUpdate updates_var = obj->update_htl_cs.updates;
			CHECK((((long)updates_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&updates_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long updates_ref = (long)updates_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_UpdateHTLCs_class, LDKMessageSendEvent_UpdateHTLCs_meth, node_id_arr, updates_ref);
		}
		case LDKMessageSendEvent_SendRevokeAndACK: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_revoke_and_ack.node_id.compressed_form);
			LDKRevokeAndACK msg_var = obj->send_revoke_and_ack.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendRevokeAndACK_class, LDKMessageSendEvent_SendRevokeAndACK_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendClosingSigned: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_closing_signed.node_id.compressed_form);
			LDKClosingSigned msg_var = obj->send_closing_signed.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendClosingSigned_class, LDKMessageSendEvent_SendClosingSigned_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendShutdown: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_shutdown.node_id.compressed_form);
			LDKShutdown msg_var = obj->send_shutdown.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendShutdown_class, LDKMessageSendEvent_SendShutdown_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendChannelReestablish: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_channel_reestablish.node_id.compressed_form);
			LDKChannelReestablish msg_var = obj->send_channel_reestablish.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendChannelReestablish_class, LDKMessageSendEvent_SendChannelReestablish_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_BroadcastChannelAnnouncement: {
			LDKChannelAnnouncement msg_var = obj->broadcast_channel_announcement.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			LDKChannelUpdate update_msg_var = obj->broadcast_channel_announcement.update_msg;
			CHECK((((long)update_msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&update_msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long update_msg_ref = (long)update_msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_BroadcastChannelAnnouncement_class, LDKMessageSendEvent_BroadcastChannelAnnouncement_meth, msg_ref, update_msg_ref);
		}
		case LDKMessageSendEvent_BroadcastNodeAnnouncement: {
			LDKNodeAnnouncement msg_var = obj->broadcast_node_announcement.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_BroadcastNodeAnnouncement_class, LDKMessageSendEvent_BroadcastNodeAnnouncement_meth, msg_ref);
		}
		case LDKMessageSendEvent_BroadcastChannelUpdate: {
			LDKChannelUpdate msg_var = obj->broadcast_channel_update.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_BroadcastChannelUpdate_class, LDKMessageSendEvent_BroadcastChannelUpdate_meth, msg_ref);
		}
		case LDKMessageSendEvent_HandleError: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->handle_error.node_id.compressed_form);
			long action_ref = (long)&obj->handle_error.action;
			return (*env)->NewObject(env, LDKMessageSendEvent_HandleError_class, LDKMessageSendEvent_HandleError_meth, node_id_arr, action_ref);
		}
		case LDKMessageSendEvent_PaymentFailureNetworkUpdate: {
			long update_ref = (long)&obj->payment_failure_network_update.update;
			return (*env)->NewObject(env, LDKMessageSendEvent_PaymentFailureNetworkUpdate_class, LDKMessageSendEvent_PaymentFailureNetworkUpdate_meth, update_ref);
		}
		case LDKMessageSendEvent_SendChannelRangeQuery: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_channel_range_query.node_id.compressed_form);
			LDKQueryChannelRange msg_var = obj->send_channel_range_query.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendChannelRangeQuery_class, LDKMessageSendEvent_SendChannelRangeQuery_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendShortIdsQuery: {
			int8_tArray node_id_arr = (*env)->NewByteArray(env, 33);
			(*env)->SetByteArrayRegion(env, node_id_arr, 0, 33, obj->send_short_ids_query.node_id.compressed_form);
			LDKQueryShortChannelIds msg_var = obj->send_short_ids_query.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendShortIdsQuery_class, LDKMessageSendEvent_SendShortIdsQuery_meth, node_id_arr, msg_ref);
		}
		default: abort();
	}
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1MessageSendEventZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_MessageSendEventZ *ret = MALLOC(sizeof(LDKCVec_MessageSendEventZ), "LDKCVec_MessageSendEventZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKMessageSendEvent) * ret->datalen, "LDKCVec_MessageSendEventZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKMessageSendEvent arr_elem_conv = *(LDKMessageSendEvent*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_MessageSendEventZ CVec_MessageSendEventZ_clone(const LDKCVec_MessageSendEventZ *orig) {
	LDKCVec_MessageSendEventZ ret = { .data = MALLOC(sizeof(LDKMessageSendEvent) * orig->datalen, "LDKCVec_MessageSendEventZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = MessageSendEvent_clone(&orig->data[i]);
	}
	return ret;
}
static jclass LDKEvent_FundingGenerationReady_class = NULL;
static jmethodID LDKEvent_FundingGenerationReady_meth = NULL;
static jclass LDKEvent_FundingBroadcastSafe_class = NULL;
static jmethodID LDKEvent_FundingBroadcastSafe_meth = NULL;
static jclass LDKEvent_PaymentReceived_class = NULL;
static jmethodID LDKEvent_PaymentReceived_meth = NULL;
static jclass LDKEvent_PaymentSent_class = NULL;
static jmethodID LDKEvent_PaymentSent_meth = NULL;
static jclass LDKEvent_PaymentFailed_class = NULL;
static jmethodID LDKEvent_PaymentFailed_meth = NULL;
static jclass LDKEvent_PendingHTLCsForwardable_class = NULL;
static jmethodID LDKEvent_PendingHTLCsForwardable_meth = NULL;
static jclass LDKEvent_SpendableOutputs_class = NULL;
static jmethodID LDKEvent_SpendableOutputs_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKEvent_init (JNIEnv *env, jclass clz) {
	LDKEvent_FundingGenerationReady_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$FundingGenerationReady;"));
	CHECK(LDKEvent_FundingGenerationReady_class != NULL);
	LDKEvent_FundingGenerationReady_meth = (*env)->GetMethodID(env, LDKEvent_FundingGenerationReady_class, "<init>", "([BJ[BJ)V");
	CHECK(LDKEvent_FundingGenerationReady_meth != NULL);
	LDKEvent_FundingBroadcastSafe_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$FundingBroadcastSafe;"));
	CHECK(LDKEvent_FundingBroadcastSafe_class != NULL);
	LDKEvent_FundingBroadcastSafe_meth = (*env)->GetMethodID(env, LDKEvent_FundingBroadcastSafe_class, "<init>", "(JJ)V");
	CHECK(LDKEvent_FundingBroadcastSafe_meth != NULL);
	LDKEvent_PaymentReceived_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$PaymentReceived;"));
	CHECK(LDKEvent_PaymentReceived_class != NULL);
	LDKEvent_PaymentReceived_meth = (*env)->GetMethodID(env, LDKEvent_PaymentReceived_class, "<init>", "([B[BJ)V");
	CHECK(LDKEvent_PaymentReceived_meth != NULL);
	LDKEvent_PaymentSent_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$PaymentSent;"));
	CHECK(LDKEvent_PaymentSent_class != NULL);
	LDKEvent_PaymentSent_meth = (*env)->GetMethodID(env, LDKEvent_PaymentSent_class, "<init>", "([B)V");
	CHECK(LDKEvent_PaymentSent_meth != NULL);
	LDKEvent_PaymentFailed_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$PaymentFailed;"));
	CHECK(LDKEvent_PaymentFailed_class != NULL);
	LDKEvent_PaymentFailed_meth = (*env)->GetMethodID(env, LDKEvent_PaymentFailed_class, "<init>", "([BZ)V");
	CHECK(LDKEvent_PaymentFailed_meth != NULL);
	LDKEvent_PendingHTLCsForwardable_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$PendingHTLCsForwardable;"));
	CHECK(LDKEvent_PendingHTLCsForwardable_class != NULL);
	LDKEvent_PendingHTLCsForwardable_meth = (*env)->GetMethodID(env, LDKEvent_PendingHTLCsForwardable_class, "<init>", "(J)V");
	CHECK(LDKEvent_PendingHTLCsForwardable_meth != NULL);
	LDKEvent_SpendableOutputs_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$SpendableOutputs;"));
	CHECK(LDKEvent_SpendableOutputs_class != NULL);
	LDKEvent_SpendableOutputs_meth = (*env)->GetMethodID(env, LDKEvent_SpendableOutputs_class, "<init>", "([J)V");
	CHECK(LDKEvent_SpendableOutputs_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKEvent_1ref_1from_1ptr(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKEvent *obj = (LDKEvent*)ptr;
	switch(obj->tag) {
		case LDKEvent_FundingGenerationReady: {
			int8_tArray temporary_channel_id_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, temporary_channel_id_arr, 0, 32, obj->funding_generation_ready.temporary_channel_id.data);
			LDKCVec_u8Z output_script_var = obj->funding_generation_ready.output_script;
			int8_tArray output_script_arr = (*env)->NewByteArray(env, output_script_var.datalen);
			(*env)->SetByteArrayRegion(env, output_script_arr, 0, output_script_var.datalen, output_script_var.data);
			return (*env)->NewObject(env, LDKEvent_FundingGenerationReady_class, LDKEvent_FundingGenerationReady_meth, temporary_channel_id_arr, obj->funding_generation_ready.channel_value_satoshis, output_script_arr, obj->funding_generation_ready.user_channel_id);
		}
		case LDKEvent_FundingBroadcastSafe: {
			LDKOutPoint funding_txo_var = obj->funding_broadcast_safe.funding_txo;
			CHECK((((long)funding_txo_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&funding_txo_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long funding_txo_ref = (long)funding_txo_var.inner & ~1;
			return (*env)->NewObject(env, LDKEvent_FundingBroadcastSafe_class, LDKEvent_FundingBroadcastSafe_meth, funding_txo_ref, obj->funding_broadcast_safe.user_channel_id);
		}
		case LDKEvent_PaymentReceived: {
			int8_tArray payment_hash_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, payment_hash_arr, 0, 32, obj->payment_received.payment_hash.data);
			int8_tArray payment_secret_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, payment_secret_arr, 0, 32, obj->payment_received.payment_secret.data);
			return (*env)->NewObject(env, LDKEvent_PaymentReceived_class, LDKEvent_PaymentReceived_meth, payment_hash_arr, payment_secret_arr, obj->payment_received.amt);
		}
		case LDKEvent_PaymentSent: {
			int8_tArray payment_preimage_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, payment_preimage_arr, 0, 32, obj->payment_sent.payment_preimage.data);
			return (*env)->NewObject(env, LDKEvent_PaymentSent_class, LDKEvent_PaymentSent_meth, payment_preimage_arr);
		}
		case LDKEvent_PaymentFailed: {
			int8_tArray payment_hash_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, payment_hash_arr, 0, 32, obj->payment_failed.payment_hash.data);
			return (*env)->NewObject(env, LDKEvent_PaymentFailed_class, LDKEvent_PaymentFailed_meth, payment_hash_arr, obj->payment_failed.rejected_by_dest);
		}
		case LDKEvent_PendingHTLCsForwardable: {
			return (*env)->NewObject(env, LDKEvent_PendingHTLCsForwardable_class, LDKEvent_PendingHTLCsForwardable_meth, obj->pending_htl_cs_forwardable.time_forwardable);
		}
		case LDKEvent_SpendableOutputs: {
			LDKCVec_SpendableOutputDescriptorZ outputs_var = obj->spendable_outputs.outputs;
			int64_tArray outputs_arr = (*env)->NewLongArray(env, outputs_var.datalen);
			int64_t *outputs_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, outputs_arr, NULL);
			for (size_t b = 0; b < outputs_var.datalen; b++) {
				long arr_conv_27_ref = (long)&outputs_var.data[b];
				outputs_arr_ptr[b] = arr_conv_27_ref;
			}
			(*env)->ReleasePrimitiveArrayCritical(env, outputs_arr, outputs_arr_ptr, 0);
			return (*env)->NewObject(env, LDKEvent_SpendableOutputs_class, LDKEvent_SpendableOutputs_meth, outputs_arr);
		}
		default: abort();
	}
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1EventZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_EventZ *ret = MALLOC(sizeof(LDKCVec_EventZ), "LDKCVec_EventZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKEvent) * ret->datalen, "LDKCVec_EventZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKEvent arr_elem_conv = *(LDKEvent*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_EventZ CVec_EventZ_clone(const LDKCVec_EventZ *orig) {
	LDKCVec_EventZ ret = { .data = MALLOC(sizeof(LDKEvent) * orig->datalen, "LDKCVec_EventZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = Event_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1usizeTransactionZ_1new(JNIEnv *env, jclass clz, intptr_t a, int8_tArray b) {
	LDKC2Tuple_usizeTransactionZ* ret = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ), "LDKC2Tuple_usizeTransactionZ");
	ret->a = a;
	LDKTransaction b_ref;
	b_ref.datalen = (*env)->GetArrayLength(env, b);
	b_ref.data = MALLOC(b_ref.datalen, "LDKTransaction Bytes");
	(*env)->GetByteArrayRegion(env, b, 0, b_ref.datalen, b_ref.data);
	b_ref.data_is_owned = false;
	ret->b = b_ref;
	return (long)ret;
}
JNIEXPORT intptr_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1usizeTransactionZ_1get_1a(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_usizeTransactionZ *tuple = (LDKC2Tuple_usizeTransactionZ*)ptr;
	return tuple->a;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1usizeTransactionZ_1get_1b(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_usizeTransactionZ *tuple = (LDKC2Tuple_usizeTransactionZ*)ptr;
	LDKTransaction b_var = tuple->b;
	int8_tArray b_arr = (*env)->NewByteArray(env, b_var.datalen);
	(*env)->SetByteArrayRegion(env, b_arr, 0, b_var.datalen, b_var.data);
	return b_arr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1C2Tuple_1usizeTransactionZZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_C2Tuple_usizeTransactionZZ *ret = MALLOC(sizeof(LDKCVec_C2Tuple_usizeTransactionZZ), "LDKCVec_C2Tuple_usizeTransactionZZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ) * ret->datalen, "LDKCVec_C2Tuple_usizeTransactionZZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKC2Tuple_usizeTransactionZ arr_elem_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneChannelMonitorUpdateErrZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NoneChannelMonitorUpdateErrZ*)arg)->result_ok;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneChannelMonitorUpdateErrZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ *val = (LDKCResult_NoneChannelMonitorUpdateErrZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneChannelMonitorUpdateErrZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ *val = (LDKCResult_NoneChannelMonitorUpdateErrZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKChannelMonitorUpdateErr_to_java(env, (*val->contents.err));
	return err_conv;
}
static inline LDKCResult_NoneChannelMonitorUpdateErrZ CResult_NoneChannelMonitorUpdateErrZ_clone(const LDKCResult_NoneChannelMonitorUpdateErrZ *orig) {
	LDKCResult_NoneChannelMonitorUpdateErrZ res = { .result_ok = orig->result_ok };
	if (orig->result_ok) {
		res.contents.result = NULL;
	} else {
		LDKChannelMonitorUpdateErr* contents = MALLOC(sizeof(LDKChannelMonitorUpdateErr), "LDKChannelMonitorUpdateErr result Err clone");
		*contents = ChannelMonitorUpdateErr_clone(orig->contents.err);
		res.contents.err = contents;
	}
	return res;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1MonitorEventZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_MonitorEventZ *ret = MALLOC(sizeof(LDKCVec_MonitorEventZ), "LDKCVec_MonitorEventZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKMonitorEvent) * ret->datalen, "LDKCVec_MonitorEventZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKMonitorEvent arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = MonitorEvent_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_MonitorEventZ CVec_MonitorEventZ_clone(const LDKCVec_MonitorEventZ *orig) {
	LDKCVec_MonitorEventZ ret = { .data = MALLOC(sizeof(LDKMonitorEvent) * orig->datalen, "LDKCVec_MonitorEventZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = MonitorEvent_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ChannelMonitorUpdateDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ChannelMonitorUpdateDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ *val = (LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKChannelMonitorUpdate res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ChannelMonitorUpdateDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ *val = (LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneMonitorUpdateErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NoneMonitorUpdateErrorZ*)arg)->result_ok;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneMonitorUpdateErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NoneMonitorUpdateErrorZ *val = (LDKCResult_NoneMonitorUpdateErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneMonitorUpdateErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NoneMonitorUpdateErrorZ *val = (LDKCResult_NoneMonitorUpdateErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKMonitorUpdateError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1OutPointScriptZ_1new(JNIEnv *env, jclass clz, int64_t a, int8_tArray b) {
	LDKC2Tuple_OutPointScriptZ* ret = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	LDKOutPoint a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = OutPoint_clone(&a_conv);
	ret->a = a_conv;
	LDKCVec_u8Z b_ref;
	b_ref.datalen = (*env)->GetArrayLength(env, b);
	b_ref.data = MALLOC(b_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, b, 0, b_ref.datalen, b_ref.data);
	ret->b = b_ref;
	return (long)ret;
}
static inline LDKC2Tuple_OutPointScriptZ C2Tuple_OutPointScriptZ_clone(const LDKC2Tuple_OutPointScriptZ *orig) {
	LDKC2Tuple_OutPointScriptZ ret = {
		.a = OutPoint_clone(&orig->a),
		.b = CVec_u8Z_clone(&orig->b),
	};
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1OutPointScriptZ_1get_1a(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_OutPointScriptZ *tuple = (LDKC2Tuple_OutPointScriptZ*)ptr;
	LDKOutPoint a_var = tuple->a;
	CHECK((((long)a_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&a_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long a_ref = (long)a_var.inner & ~1;
	return a_ref;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1OutPointScriptZ_1get_1b(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_OutPointScriptZ *tuple = (LDKC2Tuple_OutPointScriptZ*)ptr;
	LDKCVec_u8Z b_var = tuple->b;
	int8_tArray b_arr = (*env)->NewByteArray(env, b_var.datalen);
	(*env)->SetByteArrayRegion(env, b_arr, 0, b_var.datalen, b_var.data);
	return b_arr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1u32TxOutZ_1new(JNIEnv *env, jclass clz, int32_t a, int64_t b) {
	LDKC2Tuple_u32TxOutZ* ret = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ), "LDKC2Tuple_u32TxOutZ");
	ret->a = a;
	LDKTxOut b_conv = *(LDKTxOut*)b;
	FREE((void*)b);
	ret->b = b_conv;
	return (long)ret;
}
JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1u32TxOutZ_1get_1a(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_u32TxOutZ *tuple = (LDKC2Tuple_u32TxOutZ*)ptr;
	return tuple->a;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1u32TxOutZ_1get_1b(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_u32TxOutZ *tuple = (LDKC2Tuple_u32TxOutZ*)ptr;
	long b_ref = (long)&tuple->b;
	return (long)b_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1C2Tuple_1u32TxOutZZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_C2Tuple_u32TxOutZZ *ret = MALLOC(sizeof(LDKCVec_C2Tuple_u32TxOutZZ), "LDKCVec_C2Tuple_u32TxOutZZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ) * ret->datalen, "LDKCVec_C2Tuple_u32TxOutZZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKC2Tuple_u32TxOutZ arr_elem_conv = *(LDKC2Tuple_u32TxOutZ*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1new(JNIEnv *env, jclass clz, int8_tArray a, int64_tArray b) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ* ret = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ");
	LDKThirtyTwoBytes a_ref;
	CHECK((*env)->GetArrayLength(env, a) == 32);
	(*env)->GetByteArrayRegion(env, a, 0, 32, a_ref.data);
	ret->a = a_ref;
	LDKCVec_C2Tuple_u32TxOutZZ b_constr;
	b_constr.datalen = (*env)->GetArrayLength(env, b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKC2Tuple_u32TxOutZ), "LDKCVec_C2Tuple_u32TxOutZZ Elements");
	else
		b_constr.data = NULL;
	int64_t* b_vals = (*env)->GetLongArrayElements (env, b, NULL);
	for (size_t a = 0; a < b_constr.datalen; a++) {
		int64_t arr_conv_26 = b_vals[a];
		LDKC2Tuple_u32TxOutZ arr_conv_26_conv = *(LDKC2Tuple_u32TxOutZ*)arr_conv_26;
		FREE((void*)arr_conv_26);
		b_constr.data[a] = arr_conv_26_conv;
	}
	(*env)->ReleaseLongArrayElements(env, b, b_vals, 0);
	ret->b = b_constr;
	return (long)ret;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1get_1a(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ *tuple = (LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)ptr;
	int8_tArray a_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, a_arr, 0, 32, tuple->a.data);
	return a_arr;
}
JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1get_1b(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ *tuple = (LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)ptr;
	LDKCVec_C2Tuple_u32TxOutZZ b_var = tuple->b;
	int64_tArray b_arr = (*env)->NewLongArray(env, b_var.datalen);
	int64_t *b_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, b_arr, NULL);
	for (size_t a = 0; a < b_var.datalen; a++) {
		long arr_conv_26_ref = (long)&b_var.data[a];
		b_arr_ptr[a] = arr_conv_26_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, b_arr, b_arr_ptr, 0);
	return b_arr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1C2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ *ret = MALLOC(sizeof(LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ), "LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ) * ret->datalen, "LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ arr_elem_conv = *(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1SignatureCVec_1SignatureZZ_1new(JNIEnv *env, jclass clz, int8_tArray a, jobjectArray b) {
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret = MALLOC(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ), "LDKC2Tuple_SignatureCVec_SignatureZZ");
	LDKSignature a_ref;
	CHECK((*env)->GetArrayLength(env, a) == 64);
	(*env)->GetByteArrayRegion(env, a, 0, 64, a_ref.compact_form);
	ret->a = a_ref;
	LDKCVec_SignatureZ b_constr;
	b_constr.datalen = (*env)->GetArrayLength(env, b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		b_constr.data = NULL;
	for (size_t i = 0; i < b_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, b, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*env)->GetArrayLength(env, arr_conv_8) == 64);
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		b_constr.data[i] = arr_conv_8_ref;
	}
	ret->b = b_constr;
	return (long)ret;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1SignatureCVec_1SignatureZZ_1get_1a(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_SignatureCVec_SignatureZZ *tuple = (LDKC2Tuple_SignatureCVec_SignatureZZ*)ptr;
	int8_tArray a_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, a_arr, 0, 64, tuple->a.compact_form);
	return a_arr;
}
JNIEXPORT jobjectArray JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1SignatureCVec_1SignatureZZ_1get_1b(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_SignatureCVec_SignatureZZ *tuple = (LDKC2Tuple_SignatureCVec_SignatureZZ*)ptr;
	LDKCVec_SignatureZ b_var = tuple->b;
	jobjectArray b_arr = (*env)->NewObjectArray(env, b_var.datalen, arr_of_B_clz, NULL);
	;
	for (size_t i = 0; i < b_var.datalen; i++) {
		int8_tArray arr_conv_8_arr = (*env)->NewByteArray(env, 64);
		(*env)->SetByteArrayRegion(env, arr_conv_8_arr, 0, 64, b_var.data[i].compact_form);
		(*env)->SetObjectArrayElement(env, b_arr, i, arr_conv_8_arr);
	}
	return b_arr;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ *val = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ *val = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SignatureNoneZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_SignatureNoneZ*)arg)->result_ok;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SignatureNoneZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_SignatureNoneZ *val = (LDKCResult_SignatureNoneZ*)arg;
	CHECK(val->result_ok);
	int8_tArray res_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, res_arr, 0, 64, (*val->contents.result).compact_form);
	return res_arr;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SignatureNoneZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_SignatureNoneZ *val = (LDKCResult_SignatureNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1SignatureZNoneZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_CVec_SignatureZNoneZ*)arg)->result_ok;
}
JNIEXPORT jobjectArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1SignatureZNoneZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_CVec_SignatureZNoneZ *val = (LDKCResult_CVec_SignatureZNoneZ*)arg;
	CHECK(val->result_ok);
	LDKCVec_SignatureZ res_var = (*val->contents.result);
	jobjectArray res_arr = (*env)->NewObjectArray(env, res_var.datalen, arr_of_B_clz, NULL);
	;
	for (size_t i = 0; i < res_var.datalen; i++) {
		int8_tArray arr_conv_8_arr = (*env)->NewByteArray(env, 64);
		(*env)->SetByteArrayRegion(env, arr_conv_8_arr, 0, 64, res_var.data[i].compact_form);
		(*env)->SetObjectArrayElement(env, res_arr, i, arr_conv_8_arr);
	}
	return res_arr;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1SignatureZNoneZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_CVec_SignatureZNoneZ *val = (LDKCResult_CVec_SignatureZNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
typedef struct LDKChannelKeys_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_per_commitment_point_meth;
	jmethodID release_commitment_secret_meth;
	jmethodID key_derivation_params_meth;
	jmethodID sign_counterparty_commitment_meth;
	jmethodID sign_holder_commitment_meth;
	jmethodID sign_holder_commitment_htlc_transactions_meth;
	jmethodID sign_justice_transaction_meth;
	jmethodID sign_counterparty_htlc_transaction_meth;
	jmethodID sign_closing_transaction_meth;
	jmethodID sign_channel_announcement_meth;
	jmethodID ready_channel_meth;
	jmethodID write_meth;
} LDKChannelKeys_JCalls;
static void LDKChannelKeys_JCalls_free(void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
LDKPublicKey get_per_commitment_point_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int8_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->get_per_commitment_point_meth, idx);
	LDKPublicKey arg_ref;
	CHECK((*env)->GetArrayLength(env, arg) == 33);
	(*env)->GetByteArrayRegion(env, arg, 0, 33, arg_ref.compressed_form);
	return arg_ref;
}
LDKThirtyTwoBytes release_commitment_secret_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int8_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->release_commitment_secret_meth, idx);
	LDKThirtyTwoBytes arg_ref;
	CHECK((*env)->GetArrayLength(env, arg) == 32);
	(*env)->GetByteArrayRegion(env, arg, 0, 32, arg_ref.data);
	return arg_ref;
}
LDKC2Tuple_u64u64Z key_derivation_params_jcall(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKC2Tuple_u64u64Z* ret = (LDKC2Tuple_u64u64Z*)(*env)->CallLongMethod(env, obj, j_calls->key_derivation_params_meth);
	LDKC2Tuple_u64u64Z ret_conv = *(LDKC2Tuple_u64u64Z*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment_jcall(const void* this_arg, const LDKCommitmentTransaction * commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCommitmentTransaction commitment_tx_var = *commitment_tx;
	if (commitment_tx->inner != NULL)
		commitment_tx_var = CommitmentTransaction_clone(commitment_tx);
	CHECK((((long)commitment_tx_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&commitment_tx_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long commitment_tx_ref = (long)commitment_tx_var.inner;
	if (commitment_tx_var.is_owned) {
		commitment_tx_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(*env)->CallLongMethod(env, obj, j_calls->sign_counterparty_commitment_meth, commitment_tx_ref);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_holder_commitment_jcall(const void* this_arg, const LDKHolderCommitmentTransaction * commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKHolderCommitmentTransaction commitment_tx_var = *commitment_tx;
	if (commitment_tx->inner != NULL)
		commitment_tx_var = HolderCommitmentTransaction_clone(commitment_tx);
	CHECK((((long)commitment_tx_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&commitment_tx_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long commitment_tx_ref = (long)commitment_tx_var.inner;
	if (commitment_tx_var.is_owned) {
		commitment_tx_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, obj, j_calls->sign_holder_commitment_meth, commitment_tx_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_CVec_SignatureZNoneZ sign_holder_commitment_htlc_transactions_jcall(const void* this_arg, const LDKHolderCommitmentTransaction * commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKHolderCommitmentTransaction commitment_tx_var = *commitment_tx;
	if (commitment_tx->inner != NULL)
		commitment_tx_var = HolderCommitmentTransaction_clone(commitment_tx);
	CHECK((((long)commitment_tx_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&commitment_tx_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long commitment_tx_ref = (long)commitment_tx_var.inner;
	if (commitment_tx_var.is_owned) {
		commitment_tx_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_CVec_SignatureZNoneZ* ret = (LDKCResult_CVec_SignatureZNoneZ*)(*env)->CallLongMethod(env, obj, j_calls->sign_holder_commitment_htlc_transactions_meth, commitment_tx_ref);
	LDKCResult_CVec_SignatureZNoneZ ret_conv = *(LDKCResult_CVec_SignatureZNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_justice_transaction_jcall(const void* this_arg, LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (* per_commitment_key)[32], const LDKHTLCOutputInCommitment * htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKTransaction justice_tx_var = justice_tx;
	int8_tArray justice_tx_arr = (*env)->NewByteArray(env, justice_tx_var.datalen);
	(*env)->SetByteArrayRegion(env, justice_tx_arr, 0, justice_tx_var.datalen, justice_tx_var.data);
	Transaction_free(justice_tx_var);
	int8_tArray per_commitment_key_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, per_commitment_key_arr, 0, 32, *per_commitment_key);
	LDKHTLCOutputInCommitment htlc_var = *htlc;
	if (htlc->inner != NULL)
		htlc_var = HTLCOutputInCommitment_clone(htlc);
	CHECK((((long)htlc_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&htlc_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long htlc_ref = (long)htlc_var.inner;
	if (htlc_var.is_owned) {
		htlc_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, obj, j_calls->sign_justice_transaction_meth, justice_tx_arr, input, amount, per_commitment_key_arr, htlc_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_counterparty_htlc_transaction_jcall(const void* this_arg, LDKTransaction htlc_tx, uintptr_t input, uint64_t amount, LDKPublicKey per_commitment_point, const LDKHTLCOutputInCommitment * htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKTransaction htlc_tx_var = htlc_tx;
	int8_tArray htlc_tx_arr = (*env)->NewByteArray(env, htlc_tx_var.datalen);
	(*env)->SetByteArrayRegion(env, htlc_tx_arr, 0, htlc_tx_var.datalen, htlc_tx_var.data);
	Transaction_free(htlc_tx_var);
	int8_tArray per_commitment_point_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, per_commitment_point_arr, 0, 33, per_commitment_point.compressed_form);
	LDKHTLCOutputInCommitment htlc_var = *htlc;
	if (htlc->inner != NULL)
		htlc_var = HTLCOutputInCommitment_clone(htlc);
	CHECK((((long)htlc_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&htlc_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long htlc_ref = (long)htlc_var.inner;
	if (htlc_var.is_owned) {
		htlc_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, obj, j_calls->sign_counterparty_htlc_transaction_meth, htlc_tx_arr, input, amount, per_commitment_point_arr, htlc_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_closing_transaction_jcall(const void* this_arg, LDKTransaction closing_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKTransaction closing_tx_var = closing_tx;
	int8_tArray closing_tx_arr = (*env)->NewByteArray(env, closing_tx_var.datalen);
	(*env)->SetByteArrayRegion(env, closing_tx_arr, 0, closing_tx_var.datalen, closing_tx_var.data);
	Transaction_free(closing_tx_var);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, obj, j_calls->sign_closing_transaction_meth, closing_tx_arr);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_SignatureNoneZ sign_channel_announcement_jcall(const void* this_arg, const LDKUnsignedChannelAnnouncement * msg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKUnsignedChannelAnnouncement msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UnsignedChannelAnnouncement_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, obj, j_calls->sign_channel_announcement_meth, msg_ref);
	LDKCResult_SignatureNoneZ ret_conv = *(LDKCResult_SignatureNoneZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
void ready_channel_jcall(void* this_arg, const LDKChannelTransactionParameters * channel_parameters) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKChannelTransactionParameters channel_parameters_var = *channel_parameters;
	if (channel_parameters->inner != NULL)
		channel_parameters_var = ChannelTransactionParameters_clone(channel_parameters);
	CHECK((((long)channel_parameters_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&channel_parameters_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long channel_parameters_ref = (long)channel_parameters_var.inner;
	if (channel_parameters_var.is_owned) {
		channel_parameters_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->ready_channel_meth, channel_parameters_ref);
}
LDKCVec_u8Z write_jcall(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int8_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->write_meth);
	LDKCVec_u8Z arg_ref;
	arg_ref.datalen = (*env)->GetArrayLength(env, arg);
	arg_ref.data = MALLOC(arg_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, arg, 0, arg_ref.datalen, arg_ref.data);
	return arg_ref;
}
static void* LDKChannelKeys_JCalls_clone(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKChannelKeys LDKChannelKeys_init (JNIEnv *env, jclass clz, jobject o, int64_t pubkeys) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKChannelKeys_JCalls *calls = MALLOC(sizeof(LDKChannelKeys_JCalls), "LDKChannelKeys_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->get_per_commitment_point_meth = (*env)->GetMethodID(env, c, "get_per_commitment_point", "(J)[B");
	CHECK(calls->get_per_commitment_point_meth != NULL);
	calls->release_commitment_secret_meth = (*env)->GetMethodID(env, c, "release_commitment_secret", "(J)[B");
	CHECK(calls->release_commitment_secret_meth != NULL);
	calls->key_derivation_params_meth = (*env)->GetMethodID(env, c, "key_derivation_params", "()J");
	CHECK(calls->key_derivation_params_meth != NULL);
	calls->sign_counterparty_commitment_meth = (*env)->GetMethodID(env, c, "sign_counterparty_commitment", "(J)J");
	CHECK(calls->sign_counterparty_commitment_meth != NULL);
	calls->sign_holder_commitment_meth = (*env)->GetMethodID(env, c, "sign_holder_commitment", "(J)J");
	CHECK(calls->sign_holder_commitment_meth != NULL);
	calls->sign_holder_commitment_htlc_transactions_meth = (*env)->GetMethodID(env, c, "sign_holder_commitment_htlc_transactions", "(J)J");
	CHECK(calls->sign_holder_commitment_htlc_transactions_meth != NULL);
	calls->sign_justice_transaction_meth = (*env)->GetMethodID(env, c, "sign_justice_transaction", "([BJJ[BJ)J");
	CHECK(calls->sign_justice_transaction_meth != NULL);
	calls->sign_counterparty_htlc_transaction_meth = (*env)->GetMethodID(env, c, "sign_counterparty_htlc_transaction", "([BJJ[BJ)J");
	CHECK(calls->sign_counterparty_htlc_transaction_meth != NULL);
	calls->sign_closing_transaction_meth = (*env)->GetMethodID(env, c, "sign_closing_transaction", "([B)J");
	CHECK(calls->sign_closing_transaction_meth != NULL);
	calls->sign_channel_announcement_meth = (*env)->GetMethodID(env, c, "sign_channel_announcement", "(J)J");
	CHECK(calls->sign_channel_announcement_meth != NULL);
	calls->ready_channel_meth = (*env)->GetMethodID(env, c, "ready_channel", "(J)V");
	CHECK(calls->ready_channel_meth != NULL);
	calls->write_meth = (*env)->GetMethodID(env, c, "write", "()[B");
	CHECK(calls->write_meth != NULL);

	LDKChannelPublicKeys pubkeys_conv;
	pubkeys_conv.inner = (void*)(pubkeys & (~1));
	pubkeys_conv.is_owned = (pubkeys & 1) || (pubkeys == 0);
	if (pubkeys_conv.inner != NULL)
		pubkeys_conv = ChannelPublicKeys_clone(&pubkeys_conv);

	LDKChannelKeys ret = {
		.this_arg = (void*) calls,
		.get_per_commitment_point = get_per_commitment_point_jcall,
		.release_commitment_secret = release_commitment_secret_jcall,
		.key_derivation_params = key_derivation_params_jcall,
		.sign_counterparty_commitment = sign_counterparty_commitment_jcall,
		.sign_holder_commitment = sign_holder_commitment_jcall,
		.sign_holder_commitment_htlc_transactions = sign_holder_commitment_htlc_transactions_jcall,
		.sign_justice_transaction = sign_justice_transaction_jcall,
		.sign_counterparty_htlc_transaction = sign_counterparty_htlc_transaction_jcall,
		.sign_closing_transaction = sign_closing_transaction_jcall,
		.sign_channel_announcement = sign_channel_announcement_jcall,
		.ready_channel = ready_channel_jcall,
		.clone = LDKChannelKeys_JCalls_clone,
		.write = write_jcall,
		.free = LDKChannelKeys_JCalls_free,
		.pubkeys = pubkeys_conv,
		.set_pubkeys = NULL,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1new(JNIEnv *env, jclass clz, jobject o, int64_t pubkeys) {
	LDKChannelKeys *res_ptr = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*res_ptr = LDKChannelKeys_init(env, clz, o, pubkeys);
	return (long)res_ptr;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1get_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_arg, int64_t idx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, (this_arg_conv->get_per_commitment_point)(this_arg_conv->this_arg, idx).compressed_form);
	return arg_arr;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1release_1commitment_1secret(JNIEnv *env, jclass clz, int64_t this_arg, int64_t idx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 32, (this_arg_conv->release_commitment_secret)(this_arg_conv->this_arg, idx).data);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1key_1derivation_1params(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKC2Tuple_u64u64Z* ret_ref = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret_ref = (this_arg_conv->key_derivation_params)(this_arg_conv->this_arg);
	return (long)ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1counterparty_1commitment(JNIEnv *env, jclass clz, int64_t this_arg, int64_t commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = false;
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = (this_arg_conv->sign_counterparty_commitment)(this_arg_conv->this_arg, &commitment_tx_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1holder_1commitment(JNIEnv *env, jclass clz, int64_t this_arg, int64_t commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKHolderCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_holder_commitment)(this_arg_conv->this_arg, &commitment_tx_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1holder_1commitment_1htlc_1transactions(JNIEnv *env, jclass clz, int64_t this_arg, int64_t commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKHolderCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = false;
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = (this_arg_conv->sign_holder_commitment_htlc_transactions)(this_arg_conv->this_arg, &commitment_tx_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1justice_1transaction(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray justice_tx, intptr_t input, int64_t amount, int8_tArray per_commitment_key, int64_t htlc) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction justice_tx_ref;
	justice_tx_ref.datalen = (*env)->GetArrayLength(env, justice_tx);
	justice_tx_ref.data = MALLOC(justice_tx_ref.datalen, "LDKTransaction Bytes");
	(*env)->GetByteArrayRegion(env, justice_tx, 0, justice_tx_ref.datalen, justice_tx_ref.data);
	justice_tx_ref.data_is_owned = true;
	unsigned char per_commitment_key_arr[32];
	CHECK((*env)->GetArrayLength(env, per_commitment_key) == 32);
	(*env)->GetByteArrayRegion(env, per_commitment_key, 0, 32, per_commitment_key_arr);
	unsigned char (*per_commitment_key_ref)[32] = &per_commitment_key_arr;
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_justice_transaction)(this_arg_conv->this_arg, justice_tx_ref, input, amount, per_commitment_key_ref, &htlc_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1counterparty_1htlc_1transaction(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray htlc_tx, intptr_t input, int64_t amount, int8_tArray per_commitment_point, int64_t htlc) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction htlc_tx_ref;
	htlc_tx_ref.datalen = (*env)->GetArrayLength(env, htlc_tx);
	htlc_tx_ref.data = MALLOC(htlc_tx_ref.datalen, "LDKTransaction Bytes");
	(*env)->GetByteArrayRegion(env, htlc_tx, 0, htlc_tx_ref.datalen, htlc_tx_ref.data);
	htlc_tx_ref.data_is_owned = true;
	LDKPublicKey per_commitment_point_ref;
	CHECK((*env)->GetArrayLength(env, per_commitment_point) == 33);
	(*env)->GetByteArrayRegion(env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_counterparty_htlc_transaction)(this_arg_conv->this_arg, htlc_tx_ref, input, amount, per_commitment_point_ref, &htlc_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1closing_1transaction(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray closing_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction closing_tx_ref;
	closing_tx_ref.datalen = (*env)->GetArrayLength(env, closing_tx);
	closing_tx_ref.data = MALLOC(closing_tx_ref.datalen, "LDKTransaction Bytes");
	(*env)->GetByteArrayRegion(env, closing_tx, 0, closing_tx_ref.datalen, closing_tx_ref.data);
	closing_tx_ref.data_is_owned = true;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_closing_transaction)(this_arg_conv->this_arg, closing_tx_ref);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1channel_1announcement(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKUnsignedChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = (this_arg_conv->sign_channel_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1ready_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int64_t channel_parameters) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKChannelTransactionParameters channel_parameters_conv;
	channel_parameters_conv.inner = (void*)(channel_parameters & (~1));
	channel_parameters_conv.is_owned = false;
	(this_arg_conv->ready_channel)(this_arg_conv->this_arg, &channel_parameters_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1write(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKCVec_u8Z arg_var = (this_arg_conv->write)(this_arg_conv->this_arg);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

LDKChannelPublicKeys LDKChannelKeys_set_get_pubkeys(LDKChannelKeys* this_arg) {
	if (this_arg->set_pubkeys != NULL)
		this_arg->set_pubkeys(this_arg);
	return this_arg->pubkeys;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1get_1pubkeys(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKChannelPublicKeys ret_var = LDKChannelKeys_set_get_pubkeys(this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1BlockHashChannelMonitorZ_1new(JNIEnv *env, jclass clz, int8_tArray a, int64_t b) {
	LDKC2Tuple_BlockHashChannelMonitorZ* ret = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelMonitorZ), "LDKC2Tuple_BlockHashChannelMonitorZ");
	LDKThirtyTwoBytes a_ref;
	CHECK((*env)->GetArrayLength(env, a) == 32);
	(*env)->GetByteArrayRegion(env, a, 0, 32, a_ref.data);
	ret->a = a_ref;
	LDKChannelMonitor b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we may need a move here but can't clone!
	ret->b = b_conv;
	return (long)ret;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1BlockHashChannelMonitorZ_1get_1a(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_BlockHashChannelMonitorZ *tuple = (LDKC2Tuple_BlockHashChannelMonitorZ*)ptr;
	int8_tArray a_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, a_arr, 0, 32, tuple->a.data);
	return a_arr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1BlockHashChannelMonitorZ_1get_1b(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_BlockHashChannelMonitorZ *tuple = (LDKC2Tuple_BlockHashChannelMonitorZ*)ptr;
	LDKChannelMonitor b_var = tuple->b;
	CHECK((((long)b_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&b_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long b_ref = (long)b_var.inner & ~1;
	return b_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SpendableOutputDescriptorDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SpendableOutputDescriptorDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ *val = (LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SpendableOutputDescriptorDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ *val = (LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ChanKeySignerDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_ChanKeySignerDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ChanKeySignerDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ChanKeySignerDecodeErrorZ *val = (LDKCResult_ChanKeySignerDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = (*val->contents.result);
	return (long)ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ChanKeySignerDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ChanKeySignerDecodeErrorZ *val = (LDKCResult_ChanKeySignerDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1InMemoryChannelKeysDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_InMemoryChannelKeysDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1InMemoryChannelKeysDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_InMemoryChannelKeysDecodeErrorZ *val = (LDKCResult_InMemoryChannelKeysDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKInMemoryChannelKeys res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1InMemoryChannelKeysDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_InMemoryChannelKeysDecodeErrorZ *val = (LDKCResult_InMemoryChannelKeysDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxOutAccessErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_TxOutAccessErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxOutAccessErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_TxOutAccessErrorZ *val = (LDKCResult_TxOutAccessErrorZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return (long)res_ref;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxOutAccessErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_TxOutAccessErrorZ *val = (LDKCResult_TxOutAccessErrorZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKAccessError_to_java(env, (*val->contents.err));
	return err_conv;
}
static jclass LDKAPIError_APIMisuseError_class = NULL;
static jmethodID LDKAPIError_APIMisuseError_meth = NULL;
static jclass LDKAPIError_FeeRateTooHigh_class = NULL;
static jmethodID LDKAPIError_FeeRateTooHigh_meth = NULL;
static jclass LDKAPIError_RouteError_class = NULL;
static jmethodID LDKAPIError_RouteError_meth = NULL;
static jclass LDKAPIError_ChannelUnavailable_class = NULL;
static jmethodID LDKAPIError_ChannelUnavailable_meth = NULL;
static jclass LDKAPIError_MonitorUpdateFailed_class = NULL;
static jmethodID LDKAPIError_MonitorUpdateFailed_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKAPIError_init (JNIEnv *env, jclass clz) {
	LDKAPIError_APIMisuseError_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKAPIError$APIMisuseError;"));
	CHECK(LDKAPIError_APIMisuseError_class != NULL);
	LDKAPIError_APIMisuseError_meth = (*env)->GetMethodID(env, LDKAPIError_APIMisuseError_class, "<init>", "([B)V");
	CHECK(LDKAPIError_APIMisuseError_meth != NULL);
	LDKAPIError_FeeRateTooHigh_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKAPIError$FeeRateTooHigh;"));
	CHECK(LDKAPIError_FeeRateTooHigh_class != NULL);
	LDKAPIError_FeeRateTooHigh_meth = (*env)->GetMethodID(env, LDKAPIError_FeeRateTooHigh_class, "<init>", "([BI)V");
	CHECK(LDKAPIError_FeeRateTooHigh_meth != NULL);
	LDKAPIError_RouteError_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKAPIError$RouteError;"));
	CHECK(LDKAPIError_RouteError_class != NULL);
	LDKAPIError_RouteError_meth = (*env)->GetMethodID(env, LDKAPIError_RouteError_class, "<init>", "(Ljava/lang/String;)V");
	CHECK(LDKAPIError_RouteError_meth != NULL);
	LDKAPIError_ChannelUnavailable_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKAPIError$ChannelUnavailable;"));
	CHECK(LDKAPIError_ChannelUnavailable_class != NULL);
	LDKAPIError_ChannelUnavailable_meth = (*env)->GetMethodID(env, LDKAPIError_ChannelUnavailable_class, "<init>", "([B)V");
	CHECK(LDKAPIError_ChannelUnavailable_meth != NULL);
	LDKAPIError_MonitorUpdateFailed_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKAPIError$MonitorUpdateFailed;"));
	CHECK(LDKAPIError_MonitorUpdateFailed_class != NULL);
	LDKAPIError_MonitorUpdateFailed_meth = (*env)->GetMethodID(env, LDKAPIError_MonitorUpdateFailed_class, "<init>", "()V");
	CHECK(LDKAPIError_MonitorUpdateFailed_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKAPIError_1ref_1from_1ptr(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKAPIError *obj = (LDKAPIError*)ptr;
	switch(obj->tag) {
		case LDKAPIError_APIMisuseError: {
			LDKCVec_u8Z err_var = obj->api_misuse_error.err;
			int8_tArray err_arr = (*env)->NewByteArray(env, err_var.datalen);
			(*env)->SetByteArrayRegion(env, err_arr, 0, err_var.datalen, err_var.data);
			return (*env)->NewObject(env, LDKAPIError_APIMisuseError_class, LDKAPIError_APIMisuseError_meth, err_arr);
		}
		case LDKAPIError_FeeRateTooHigh: {
			LDKCVec_u8Z err_var = obj->fee_rate_too_high.err;
			int8_tArray err_arr = (*env)->NewByteArray(env, err_var.datalen);
			(*env)->SetByteArrayRegion(env, err_arr, 0, err_var.datalen, err_var.data);
			return (*env)->NewObject(env, LDKAPIError_FeeRateTooHigh_class, LDKAPIError_FeeRateTooHigh_meth, err_arr, obj->fee_rate_too_high.feerate);
		}
		case LDKAPIError_RouteError: {
			LDKStr err_str = obj->route_error.err;
			jstring err_conv = str_ref_to_java(env, err_str.chars, err_str.len);
			return (*env)->NewObject(env, LDKAPIError_RouteError_class, LDKAPIError_RouteError_meth, err_conv);
		}
		case LDKAPIError_ChannelUnavailable: {
			LDKCVec_u8Z err_var = obj->channel_unavailable.err;
			int8_tArray err_arr = (*env)->NewByteArray(env, err_var.datalen);
			(*env)->SetByteArrayRegion(env, err_arr, 0, err_var.datalen, err_var.data);
			return (*env)->NewObject(env, LDKAPIError_ChannelUnavailable_class, LDKAPIError_ChannelUnavailable_meth, err_arr);
		}
		case LDKAPIError_MonitorUpdateFailed: {
			return (*env)->NewObject(env, LDKAPIError_MonitorUpdateFailed_class, LDKAPIError_MonitorUpdateFailed_meth);
		}
		default: abort();
	}
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneAPIErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NoneAPIErrorZ*)arg)->result_ok;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneAPIErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NoneAPIErrorZ *val = (LDKCResult_NoneAPIErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneAPIErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NoneAPIErrorZ *val = (LDKCResult_NoneAPIErrorZ*)arg;
	CHECK(!val->result_ok);
	long err_ref = (long)&(*val->contents.err);
	return err_ref;
}
static inline LDKCResult_NoneAPIErrorZ CResult_NoneAPIErrorZ_clone(const LDKCResult_NoneAPIErrorZ *orig) {
	LDKCResult_NoneAPIErrorZ res = { .result_ok = orig->result_ok };
	if (orig->result_ok) {
		res.contents.result = NULL;
	} else {
		LDKAPIError* contents = MALLOC(sizeof(LDKAPIError), "LDKAPIError result Err clone");
		*contents = APIError_clone(orig->contents.err);
		res.contents.err = contents;
	}
	return res;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1ChannelDetailsZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_ChannelDetailsZ *ret = MALLOC(sizeof(LDKCVec_ChannelDetailsZ), "LDKCVec_ChannelDetailsZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKChannelDetails) * ret->datalen, "LDKCVec_ChannelDetailsZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKChannelDetails arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = ChannelDetails_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_ChannelDetailsZ CVec_ChannelDetailsZ_clone(const LDKCVec_ChannelDetailsZ *orig) {
	LDKCVec_ChannelDetailsZ ret = { .data = MALLOC(sizeof(LDKChannelDetails) * orig->datalen, "LDKCVec_ChannelDetailsZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = ChannelDetails_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePaymentSendFailureZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NonePaymentSendFailureZ*)arg)->result_ok;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePaymentSendFailureZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NonePaymentSendFailureZ *val = (LDKCResult_NonePaymentSendFailureZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePaymentSendFailureZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NonePaymentSendFailureZ *val = (LDKCResult_NonePaymentSendFailureZ*)arg;
	CHECK(!val->result_ok);
	LDKPaymentSendFailure err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
static jclass LDKNetAddress_IPv4_class = NULL;
static jmethodID LDKNetAddress_IPv4_meth = NULL;
static jclass LDKNetAddress_IPv6_class = NULL;
static jmethodID LDKNetAddress_IPv6_meth = NULL;
static jclass LDKNetAddress_OnionV2_class = NULL;
static jmethodID LDKNetAddress_OnionV2_meth = NULL;
static jclass LDKNetAddress_OnionV3_class = NULL;
static jmethodID LDKNetAddress_OnionV3_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKNetAddress_init (JNIEnv *env, jclass clz) {
	LDKNetAddress_IPv4_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKNetAddress$IPv4;"));
	CHECK(LDKNetAddress_IPv4_class != NULL);
	LDKNetAddress_IPv4_meth = (*env)->GetMethodID(env, LDKNetAddress_IPv4_class, "<init>", "([BS)V");
	CHECK(LDKNetAddress_IPv4_meth != NULL);
	LDKNetAddress_IPv6_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKNetAddress$IPv6;"));
	CHECK(LDKNetAddress_IPv6_class != NULL);
	LDKNetAddress_IPv6_meth = (*env)->GetMethodID(env, LDKNetAddress_IPv6_class, "<init>", "([BS)V");
	CHECK(LDKNetAddress_IPv6_meth != NULL);
	LDKNetAddress_OnionV2_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKNetAddress$OnionV2;"));
	CHECK(LDKNetAddress_OnionV2_class != NULL);
	LDKNetAddress_OnionV2_meth = (*env)->GetMethodID(env, LDKNetAddress_OnionV2_class, "<init>", "([BS)V");
	CHECK(LDKNetAddress_OnionV2_meth != NULL);
	LDKNetAddress_OnionV3_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKNetAddress$OnionV3;"));
	CHECK(LDKNetAddress_OnionV3_class != NULL);
	LDKNetAddress_OnionV3_meth = (*env)->GetMethodID(env, LDKNetAddress_OnionV3_class, "<init>", "([BSBS)V");
	CHECK(LDKNetAddress_OnionV3_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKNetAddress_1ref_1from_1ptr(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKNetAddress *obj = (LDKNetAddress*)ptr;
	switch(obj->tag) {
		case LDKNetAddress_IPv4: {
			int8_tArray addr_arr = (*env)->NewByteArray(env, 4);
			(*env)->SetByteArrayRegion(env, addr_arr, 0, 4, obj->i_pv4.addr.data);
			return (*env)->NewObject(env, LDKNetAddress_IPv4_class, LDKNetAddress_IPv4_meth, addr_arr, obj->i_pv4.port);
		}
		case LDKNetAddress_IPv6: {
			int8_tArray addr_arr = (*env)->NewByteArray(env, 16);
			(*env)->SetByteArrayRegion(env, addr_arr, 0, 16, obj->i_pv6.addr.data);
			return (*env)->NewObject(env, LDKNetAddress_IPv6_class, LDKNetAddress_IPv6_meth, addr_arr, obj->i_pv6.port);
		}
		case LDKNetAddress_OnionV2: {
			int8_tArray addr_arr = (*env)->NewByteArray(env, 10);
			(*env)->SetByteArrayRegion(env, addr_arr, 0, 10, obj->onion_v2.addr.data);
			return (*env)->NewObject(env, LDKNetAddress_OnionV2_class, LDKNetAddress_OnionV2_meth, addr_arr, obj->onion_v2.port);
		}
		case LDKNetAddress_OnionV3: {
			int8_tArray ed25519_pubkey_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, ed25519_pubkey_arr, 0, 32, obj->onion_v3.ed25519_pubkey.data);
			return (*env)->NewObject(env, LDKNetAddress_OnionV3_class, LDKNetAddress_OnionV3_meth, ed25519_pubkey_arr, obj->onion_v3.checksum, obj->onion_v3.version, obj->onion_v3.port);
		}
		default: abort();
	}
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1NetAddressZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_NetAddressZ *ret = MALLOC(sizeof(LDKCVec_NetAddressZ), "LDKCVec_NetAddressZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKNetAddress) * ret->datalen, "LDKCVec_NetAddressZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKNetAddress arr_elem_conv = *(LDKNetAddress*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_NetAddressZ CVec_NetAddressZ_clone(const LDKCVec_NetAddressZ *orig) {
	LDKCVec_NetAddressZ ret = { .data = MALLOC(sizeof(LDKNetAddress) * orig->datalen, "LDKCVec_NetAddressZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = NetAddress_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1ChannelMonitorZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_ChannelMonitorZ *ret = MALLOC(sizeof(LDKCVec_ChannelMonitorZ), "LDKCVec_ChannelMonitorZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKChannelMonitor) * ret->datalen, "LDKCVec_ChannelMonitorZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKChannelMonitor arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			// Warning: we may need a move here but can't clone!
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
typedef struct LDKWatch_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID watch_channel_meth;
	jmethodID update_channel_meth;
	jmethodID release_pending_monitor_events_meth;
} LDKWatch_JCalls;
static void LDKWatch_JCalls_free(void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
LDKCResult_NoneChannelMonitorUpdateErrZ watch_channel_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitor monitor) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKOutPoint funding_txo_var = funding_txo;
	CHECK((((long)funding_txo_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&funding_txo_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long funding_txo_ref = (long)funding_txo_var.inner;
	if (funding_txo_var.is_owned) {
		funding_txo_ref |= 1;
	}
	LDKChannelMonitor monitor_var = monitor;
	CHECK((((long)monitor_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&monitor_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long monitor_ref = (long)monitor_var.inner;
	if (monitor_var.is_owned) {
		monitor_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*env)->CallLongMethod(env, obj, j_calls->watch_channel_meth, funding_txo_ref, monitor_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneChannelMonitorUpdateErrZ update_channel_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitorUpdate update) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKOutPoint funding_txo_var = funding_txo;
	CHECK((((long)funding_txo_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&funding_txo_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long funding_txo_ref = (long)funding_txo_var.inner;
	if (funding_txo_var.is_owned) {
		funding_txo_ref |= 1;
	}
	LDKChannelMonitorUpdate update_var = update;
	CHECK((((long)update_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&update_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long update_ref = (long)update_var.inner;
	if (update_var.is_owned) {
		update_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*env)->CallLongMethod(env, obj, j_calls->update_channel_meth, funding_txo_ref, update_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCVec_MonitorEventZ release_pending_monitor_events_jcall(const void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int64_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->release_pending_monitor_events_meth);
	LDKCVec_MonitorEventZ arg_constr;
	arg_constr.datalen = (*env)->GetArrayLength(env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKMonitorEvent), "LDKCVec_MonitorEventZ Elements");
	else
		arg_constr.data = NULL;
	int64_t* arg_vals = (*env)->GetLongArrayElements (env, arg, NULL);
	for (size_t o = 0; o < arg_constr.datalen; o++) {
		int64_t arr_conv_14 = arg_vals[o];
		LDKMonitorEvent arr_conv_14_conv;
		arr_conv_14_conv.inner = (void*)(arr_conv_14 & (~1));
		arr_conv_14_conv.is_owned = (arr_conv_14 & 1) || (arr_conv_14 == 0);
		if (arr_conv_14_conv.inner != NULL)
			arr_conv_14_conv = MonitorEvent_clone(&arr_conv_14_conv);
		arg_constr.data[o] = arr_conv_14_conv;
	}
	(*env)->ReleaseLongArrayElements(env, arg, arg_vals, 0);
	return arg_constr;
}
static void* LDKWatch_JCalls_clone(const void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKWatch LDKWatch_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKWatch_JCalls *calls = MALLOC(sizeof(LDKWatch_JCalls), "LDKWatch_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->watch_channel_meth = (*env)->GetMethodID(env, c, "watch_channel", "(JJ)J");
	CHECK(calls->watch_channel_meth != NULL);
	calls->update_channel_meth = (*env)->GetMethodID(env, c, "update_channel", "(JJ)J");
	CHECK(calls->update_channel_meth != NULL);
	calls->release_pending_monitor_events_meth = (*env)->GetMethodID(env, c, "release_pending_monitor_events", "()[J");
	CHECK(calls->release_pending_monitor_events_meth != NULL);

	LDKWatch ret = {
		.this_arg = (void*) calls,
		.watch_channel = watch_channel_jcall,
		.update_channel = update_channel_jcall,
		.release_pending_monitor_events = release_pending_monitor_events_jcall,
		.free = LDKWatch_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKWatch_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKWatch *res_ptr = MALLOC(sizeof(LDKWatch), "LDKWatch");
	*res_ptr = LDKWatch_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Watch_1watch_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int64_t funding_txo, int64_t monitor) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	if (funding_txo_conv.inner != NULL)
		funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	LDKChannelMonitor monitor_conv;
	monitor_conv.inner = (void*)(monitor & (~1));
	monitor_conv.is_owned = (monitor & 1) || (monitor == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->watch_channel)(this_arg_conv->this_arg, funding_txo_conv, monitor_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Watch_1update_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int64_t funding_txo, int64_t update) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	if (funding_txo_conv.inner != NULL)
		funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	LDKChannelMonitorUpdate update_conv;
	update_conv.inner = (void*)(update & (~1));
	update_conv.is_owned = (update & 1) || (update == 0);
	if (update_conv.inner != NULL)
		update_conv = ChannelMonitorUpdate_clone(&update_conv);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->update_channel)(this_arg_conv->this_arg, funding_txo_conv, update_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_Watch_1release_1pending_1monitor_1events(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKCVec_MonitorEventZ ret_var = (this_arg_conv->release_pending_monitor_events)(this_arg_conv->this_arg);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t o = 0; o < ret_var.datalen; o++) {
		LDKMonitorEvent arr_conv_14_var = ret_var.data[o];
		CHECK((((long)arr_conv_14_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_14_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_14_ref = (long)arr_conv_14_var.inner;
		if (arr_conv_14_var.is_owned) {
			arr_conv_14_ref |= 1;
		}
		ret_arr_ptr[o] = arr_conv_14_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

typedef struct LDKBroadcasterInterface_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID broadcast_transaction_meth;
} LDKBroadcasterInterface_JCalls;
static void LDKBroadcasterInterface_JCalls_free(void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
void broadcast_transaction_jcall(const void* this_arg, LDKTransaction tx) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKTransaction tx_var = tx;
	int8_tArray tx_arr = (*env)->NewByteArray(env, tx_var.datalen);
	(*env)->SetByteArrayRegion(env, tx_arr, 0, tx_var.datalen, tx_var.data);
	Transaction_free(tx_var);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->broadcast_transaction_meth, tx_arr);
}
static void* LDKBroadcasterInterface_JCalls_clone(const void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKBroadcasterInterface LDKBroadcasterInterface_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKBroadcasterInterface_JCalls *calls = MALLOC(sizeof(LDKBroadcasterInterface_JCalls), "LDKBroadcasterInterface_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->broadcast_transaction_meth = (*env)->GetMethodID(env, c, "broadcast_transaction", "([B)V");
	CHECK(calls->broadcast_transaction_meth != NULL);

	LDKBroadcasterInterface ret = {
		.this_arg = (void*) calls,
		.broadcast_transaction = broadcast_transaction_jcall,
		.free = LDKBroadcasterInterface_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKBroadcasterInterface_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKBroadcasterInterface *res_ptr = MALLOC(sizeof(LDKBroadcasterInterface), "LDKBroadcasterInterface");
	*res_ptr = LDKBroadcasterInterface_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BroadcasterInterface_1broadcast_1transaction(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray tx) {
	LDKBroadcasterInterface* this_arg_conv = (LDKBroadcasterInterface*)this_arg;
	LDKTransaction tx_ref;
	tx_ref.datalen = (*env)->GetArrayLength(env, tx);
	tx_ref.data = MALLOC(tx_ref.datalen, "LDKTransaction Bytes");
	(*env)->GetByteArrayRegion(env, tx, 0, tx_ref.datalen, tx_ref.data);
	tx_ref.data_is_owned = true;
	(this_arg_conv->broadcast_transaction)(this_arg_conv->this_arg, tx_ref);
}

typedef struct LDKKeysInterface_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_node_secret_meth;
	jmethodID get_destination_script_meth;
	jmethodID get_shutdown_pubkey_meth;
	jmethodID get_channel_keys_meth;
	jmethodID get_secure_random_bytes_meth;
	jmethodID read_chan_signer_meth;
} LDKKeysInterface_JCalls;
static void LDKKeysInterface_JCalls_free(void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
LDKSecretKey get_node_secret_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int8_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->get_node_secret_meth);
	LDKSecretKey arg_ref;
	CHECK((*env)->GetArrayLength(env, arg) == 32);
	(*env)->GetByteArrayRegion(env, arg, 0, 32, arg_ref.bytes);
	return arg_ref;
}
LDKCVec_u8Z get_destination_script_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int8_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->get_destination_script_meth);
	LDKCVec_u8Z arg_ref;
	arg_ref.datalen = (*env)->GetArrayLength(env, arg);
	arg_ref.data = MALLOC(arg_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, arg, 0, arg_ref.datalen, arg_ref.data);
	return arg_ref;
}
LDKPublicKey get_shutdown_pubkey_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int8_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->get_shutdown_pubkey_meth);
	LDKPublicKey arg_ref;
	CHECK((*env)->GetArrayLength(env, arg) == 33);
	(*env)->GetByteArrayRegion(env, arg, 0, 33, arg_ref.compressed_form);
	return arg_ref;
}
LDKChannelKeys get_channel_keys_jcall(const void* this_arg, bool inbound, uint64_t channel_value_satoshis) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKChannelKeys* ret = (LDKChannelKeys*)(*env)->CallLongMethod(env, obj, j_calls->get_channel_keys_meth, inbound, channel_value_satoshis);
	LDKChannelKeys ret_conv = *(LDKChannelKeys*)ret;
	ret_conv = ChannelKeys_clone(ret);
	return ret_conv;
}
LDKThirtyTwoBytes get_secure_random_bytes_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int8_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->get_secure_random_bytes_meth);
	LDKThirtyTwoBytes arg_ref;
	CHECK((*env)->GetArrayLength(env, arg) == 32);
	(*env)->GetByteArrayRegion(env, arg, 0, 32, arg_ref.data);
	return arg_ref;
}
LDKCResult_ChanKeySignerDecodeErrorZ read_chan_signer_jcall(const void* this_arg, LDKu8slice reader) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKu8slice reader_var = reader;
	int8_tArray reader_arr = (*env)->NewByteArray(env, reader_var.datalen);
	(*env)->SetByteArrayRegion(env, reader_arr, 0, reader_var.datalen, reader_var.data);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_ChanKeySignerDecodeErrorZ* ret = (LDKCResult_ChanKeySignerDecodeErrorZ*)(*env)->CallLongMethod(env, obj, j_calls->read_chan_signer_meth, reader_arr);
	LDKCResult_ChanKeySignerDecodeErrorZ ret_conv = *(LDKCResult_ChanKeySignerDecodeErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
static void* LDKKeysInterface_JCalls_clone(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKKeysInterface LDKKeysInterface_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKKeysInterface_JCalls *calls = MALLOC(sizeof(LDKKeysInterface_JCalls), "LDKKeysInterface_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->get_node_secret_meth = (*env)->GetMethodID(env, c, "get_node_secret", "()[B");
	CHECK(calls->get_node_secret_meth != NULL);
	calls->get_destination_script_meth = (*env)->GetMethodID(env, c, "get_destination_script", "()[B");
	CHECK(calls->get_destination_script_meth != NULL);
	calls->get_shutdown_pubkey_meth = (*env)->GetMethodID(env, c, "get_shutdown_pubkey", "()[B");
	CHECK(calls->get_shutdown_pubkey_meth != NULL);
	calls->get_channel_keys_meth = (*env)->GetMethodID(env, c, "get_channel_keys", "(ZJ)J");
	CHECK(calls->get_channel_keys_meth != NULL);
	calls->get_secure_random_bytes_meth = (*env)->GetMethodID(env, c, "get_secure_random_bytes", "()[B");
	CHECK(calls->get_secure_random_bytes_meth != NULL);
	calls->read_chan_signer_meth = (*env)->GetMethodID(env, c, "read_chan_signer", "([B)J");
	CHECK(calls->read_chan_signer_meth != NULL);

	LDKKeysInterface ret = {
		.this_arg = (void*) calls,
		.get_node_secret = get_node_secret_jcall,
		.get_destination_script = get_destination_script_jcall,
		.get_shutdown_pubkey = get_shutdown_pubkey_jcall,
		.get_channel_keys = get_channel_keys_jcall,
		.get_secure_random_bytes = get_secure_random_bytes_jcall,
		.read_chan_signer = read_chan_signer_jcall,
		.free = LDKKeysInterface_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKKeysInterface_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKKeysInterface *res_ptr = MALLOC(sizeof(LDKKeysInterface), "LDKKeysInterface");
	*res_ptr = LDKKeysInterface_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1node_1secret(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 32, (this_arg_conv->get_node_secret)(this_arg_conv->this_arg).bytes);
	return arg_arr;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1destination_1script(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKCVec_u8Z arg_var = (this_arg_conv->get_destination_script)(this_arg_conv->this_arg);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1shutdown_1pubkey(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, (this_arg_conv->get_shutdown_pubkey)(this_arg_conv->this_arg).compressed_form);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1channel_1keys(JNIEnv *env, jclass clz, int64_t this_arg, jboolean inbound, int64_t channel_value_satoshis) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = (this_arg_conv->get_channel_keys)(this_arg_conv->this_arg, inbound, channel_value_satoshis);
	return (long)ret;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1secure_1random_1bytes(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 32, (this_arg_conv->get_secure_random_bytes)(this_arg_conv->this_arg).data);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_KeysInterface_1read_1chan_1signer(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray reader) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKu8slice reader_ref;
	reader_ref.datalen = (*env)->GetArrayLength(env, reader);
	reader_ref.data = (*env)->GetByteArrayElements (env, reader, NULL);
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = (this_arg_conv->read_chan_signer)(this_arg_conv->this_arg, reader_ref);
	(*env)->ReleaseByteArrayElements(env, reader, (int8_t*)reader_ref.data, 0);
	return (long)ret_conv;
}

typedef struct LDKFeeEstimator_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_est_sat_per_1000_weight_meth;
} LDKFeeEstimator_JCalls;
static void LDKFeeEstimator_JCalls_free(void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
uint32_t get_est_sat_per_1000_weight_jcall(const void* this_arg, LDKConfirmationTarget confirmation_target) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jclass confirmation_target_conv = LDKConfirmationTarget_to_java(env, confirmation_target);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallIntMethod(env, obj, j_calls->get_est_sat_per_1000_weight_meth, confirmation_target_conv);
}
static void* LDKFeeEstimator_JCalls_clone(const void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKFeeEstimator LDKFeeEstimator_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKFeeEstimator_JCalls *calls = MALLOC(sizeof(LDKFeeEstimator_JCalls), "LDKFeeEstimator_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->get_est_sat_per_1000_weight_meth = (*env)->GetMethodID(env, c, "get_est_sat_per_1000_weight", "(Lorg/ldk/enums/LDKConfirmationTarget;)I");
	CHECK(calls->get_est_sat_per_1000_weight_meth != NULL);

	LDKFeeEstimator ret = {
		.this_arg = (void*) calls,
		.get_est_sat_per_1000_weight = get_est_sat_per_1000_weight_jcall,
		.free = LDKFeeEstimator_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKFeeEstimator_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKFeeEstimator *res_ptr = MALLOC(sizeof(LDKFeeEstimator), "LDKFeeEstimator");
	*res_ptr = LDKFeeEstimator_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_FeeEstimator_1get_1est_1sat_1per_11000_1weight(JNIEnv *env, jclass clz, int64_t this_arg, jclass confirmation_target) {
	LDKFeeEstimator* this_arg_conv = (LDKFeeEstimator*)this_arg;
	LDKConfirmationTarget confirmation_target_conv = LDKConfirmationTarget_from_java(env, confirmation_target);
	int32_t ret_val = (this_arg_conv->get_est_sat_per_1000_weight)(this_arg_conv->this_arg, confirmation_target_conv);
	return ret_val;
}

typedef struct LDKLogger_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID log_meth;
} LDKLogger_JCalls;
static void LDKLogger_JCalls_free(void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
void log_jcall(const void* this_arg, const char* record) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	const char* record_str = record;
	jstring record_conv = str_ref_to_java(env, record_str, strlen(record_str));
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->log_meth, record_conv);
}
static void* LDKLogger_JCalls_clone(const void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKLogger LDKLogger_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKLogger_JCalls *calls = MALLOC(sizeof(LDKLogger_JCalls), "LDKLogger_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->log_meth = (*env)->GetMethodID(env, c, "log", "(Ljava/lang/String;)V");
	CHECK(calls->log_meth != NULL);

	LDKLogger ret = {
		.this_arg = (void*) calls,
		.log = log_jcall,
		.free = LDKLogger_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKLogger_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKLogger *res_ptr = MALLOC(sizeof(LDKLogger), "LDKLogger");
	*res_ptr = LDKLogger_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1BlockHashChannelManagerZ_1new(JNIEnv *env, jclass clz, int8_tArray a, int64_t b) {
	LDKC2Tuple_BlockHashChannelManagerZ* ret = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelManagerZ), "LDKC2Tuple_BlockHashChannelManagerZ");
	LDKThirtyTwoBytes a_ref;
	CHECK((*env)->GetArrayLength(env, a) == 32);
	(*env)->GetByteArrayRegion(env, a, 0, 32, a_ref.data);
	ret->a = a_ref;
	LDKChannelManager b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we may need a move here but can't clone!
	ret->b = b_conv;
	return (long)ret;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1BlockHashChannelManagerZ_1get_1a(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_BlockHashChannelManagerZ *tuple = (LDKC2Tuple_BlockHashChannelManagerZ*)ptr;
	int8_tArray a_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, a_arr, 0, 32, tuple->a.data);
	return a_arr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC2Tuple_1BlockHashChannelManagerZ_1get_1b(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC2Tuple_BlockHashChannelManagerZ *tuple = (LDKC2Tuple_BlockHashChannelManagerZ*)ptr;
	LDKChannelManager b_var = tuple->b;
	CHECK((((long)b_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&b_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long b_ref = (long)b_var.inner & ~1;
	return b_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ *val = (LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NetAddressu8Z_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NetAddressu8Z*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NetAddressu8Z_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NetAddressu8Z *val = (LDKCResult_NetAddressu8Z*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
JNIEXPORT int8_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NetAddressu8Z_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NetAddressu8Z *val = (LDKCResult_NetAddressu8Z*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
static inline LDKCResult_NetAddressu8Z CResult_NetAddressu8Z_clone(const LDKCResult_NetAddressu8Z *orig) {
	LDKCResult_NetAddressu8Z res = { .result_ok = orig->result_ok };
	if (orig->result_ok) {
		LDKNetAddress* contents = MALLOC(sizeof(LDKNetAddress), "LDKNetAddress result OK clone");
		*contents = NetAddress_clone(orig->contents.result);
		res.contents.result = contents;
	} else {
		int8_t* contents = MALLOC(sizeof(int8_t), "int8_t result Err clone");
		*contents = *orig->contents.err;
		res.contents.err = contents;
	}
	return res;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CResult_1NetAddressu8ZDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CResult_1NetAddressu8ZDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ *val = (LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKCResult_NetAddressu8Z* res_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*res_conv = (*val->contents.result);
	*res_conv = CResult_NetAddressu8Z_clone(res_conv);
	return (long)res_conv;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CResult_1NetAddressu8ZDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ *val = (LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1u64Z_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_u64Z *ret = MALLOC(sizeof(LDKCVec_u64Z), "LDKCVec_u64Z");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(uint64_t) * ret->datalen, "LDKCVec_u64Z Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			ret->data[i] = java_elems[i];
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_u64Z CVec_u64Z_clone(const LDKCVec_u64Z *orig) {
	LDKCVec_u64Z ret = { .data = MALLOC(sizeof(int64_t) * orig->datalen, "LDKCVec_u64Z clone bytes"), .datalen = orig->datalen };
	memcpy(ret.data, orig->data, sizeof(int64_t) * ret.datalen);
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1UpdateAddHTLCZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_UpdateAddHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateAddHTLCZ), "LDKCVec_UpdateAddHTLCZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateAddHTLC) * ret->datalen, "LDKCVec_UpdateAddHTLCZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKUpdateAddHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = UpdateAddHTLC_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_UpdateAddHTLCZ CVec_UpdateAddHTLCZ_clone(const LDKCVec_UpdateAddHTLCZ *orig) {
	LDKCVec_UpdateAddHTLCZ ret = { .data = MALLOC(sizeof(LDKUpdateAddHTLC) * orig->datalen, "LDKCVec_UpdateAddHTLCZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = UpdateAddHTLC_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1UpdateFulfillHTLCZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_UpdateFulfillHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateFulfillHTLCZ), "LDKCVec_UpdateFulfillHTLCZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFulfillHTLC) * ret->datalen, "LDKCVec_UpdateFulfillHTLCZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKUpdateFulfillHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = UpdateFulfillHTLC_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_UpdateFulfillHTLCZ CVec_UpdateFulfillHTLCZ_clone(const LDKCVec_UpdateFulfillHTLCZ *orig) {
	LDKCVec_UpdateFulfillHTLCZ ret = { .data = MALLOC(sizeof(LDKUpdateFulfillHTLC) * orig->datalen, "LDKCVec_UpdateFulfillHTLCZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = UpdateFulfillHTLC_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1UpdateFailHTLCZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_UpdateFailHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateFailHTLCZ), "LDKCVec_UpdateFailHTLCZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFailHTLC) * ret->datalen, "LDKCVec_UpdateFailHTLCZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKUpdateFailHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = UpdateFailHTLC_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_UpdateFailHTLCZ CVec_UpdateFailHTLCZ_clone(const LDKCVec_UpdateFailHTLCZ *orig) {
	LDKCVec_UpdateFailHTLCZ ret = { .data = MALLOC(sizeof(LDKUpdateFailHTLC) * orig->datalen, "LDKCVec_UpdateFailHTLCZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = UpdateFailHTLC_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1UpdateFailMalformedHTLCZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_UpdateFailMalformedHTLCZ *ret = MALLOC(sizeof(LDKCVec_UpdateFailMalformedHTLCZ), "LDKCVec_UpdateFailMalformedHTLCZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFailMalformedHTLC) * ret->datalen, "LDKCVec_UpdateFailMalformedHTLCZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKUpdateFailMalformedHTLC arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = UpdateFailMalformedHTLC_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_UpdateFailMalformedHTLCZ CVec_UpdateFailMalformedHTLCZ_clone(const LDKCVec_UpdateFailMalformedHTLCZ *orig) {
	LDKCVec_UpdateFailMalformedHTLCZ ret = { .data = MALLOC(sizeof(LDKUpdateFailMalformedHTLC) * orig->datalen, "LDKCVec_UpdateFailMalformedHTLCZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = UpdateFailMalformedHTLC_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolLightningErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_boolLightningErrorZ*)arg)->result_ok;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolLightningErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_boolLightningErrorZ *val = (LDKCResult_boolLightningErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolLightningErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_boolLightningErrorZ *val = (LDKCResult_boolLightningErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1new(JNIEnv *env, jclass clz, int64_t a, int64_t b, int64_t c) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
	LDKChannelAnnouncement a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = ChannelAnnouncement_clone(&a_conv);
	ret->a = a_conv;
	LDKChannelUpdate b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	if (b_conv.inner != NULL)
		b_conv = ChannelUpdate_clone(&b_conv);
	ret->b = b_conv;
	LDKChannelUpdate c_conv;
	c_conv.inner = (void*)(c & (~1));
	c_conv.is_owned = (c & 1) || (c == 0);
	if (c_conv.inner != NULL)
		c_conv = ChannelUpdate_clone(&c_conv);
	ret->c = c_conv;
	return (long)ret;
}
static inline LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(const LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *orig) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ ret = {
		.a = ChannelAnnouncement_clone(&orig->a),
		.b = ChannelUpdate_clone(&orig->b),
		.c = ChannelUpdate_clone(&orig->c),
	};
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1get_1a(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *tuple = (LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)ptr;
	LDKChannelAnnouncement a_var = tuple->a;
	CHECK((((long)a_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&a_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long a_ref = (long)a_var.inner & ~1;
	return a_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1get_1b(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *tuple = (LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)ptr;
	LDKChannelUpdate b_var = tuple->b;
	CHECK((((long)b_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&b_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long b_ref = (long)b_var.inner & ~1;
	return b_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKC3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1get_1c(JNIEnv *env, jclass clz, int64_t ptr) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ *tuple = (LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)ptr;
	LDKChannelUpdate c_var = tuple->c;
	CHECK((((long)c_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&c_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long c_ref = (long)c_var.inner & ~1;
	return c_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ *ret = MALLOC(sizeof(LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ) * ret->datalen, "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_elem_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_clone(const LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ *orig) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret = { .data = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ) * orig->datalen, "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1NodeAnnouncementZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_NodeAnnouncementZ *ret = MALLOC(sizeof(LDKCVec_NodeAnnouncementZ), "LDKCVec_NodeAnnouncementZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKNodeAnnouncement) * ret->datalen, "LDKCVec_NodeAnnouncementZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKNodeAnnouncement arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = NodeAnnouncement_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_NodeAnnouncementZ CVec_NodeAnnouncementZ_clone(const LDKCVec_NodeAnnouncementZ *orig) {
	LDKCVec_NodeAnnouncementZ ret = { .data = MALLOC(sizeof(LDKNodeAnnouncement) * orig->datalen, "LDKCVec_NodeAnnouncementZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = NodeAnnouncement_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneLightningErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NoneLightningErrorZ*)arg)->result_ok;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneLightningErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NoneLightningErrorZ *val = (LDKCResult_NoneLightningErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneLightningErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NoneLightningErrorZ *val = (LDKCResult_NoneLightningErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ChannelReestablishDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_ChannelReestablishDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ChannelReestablishDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ChannelReestablishDecodeErrorZ *val = (LDKCResult_ChannelReestablishDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKChannelReestablish res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ChannelReestablishDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ChannelReestablishDecodeErrorZ *val = (LDKCResult_ChannelReestablishDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1InitDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_InitDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1InitDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_InitDecodeErrorZ *val = (LDKCResult_InitDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKInit res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1InitDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_InitDecodeErrorZ *val = (LDKCResult_InitDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PingDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_PingDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PingDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_PingDecodeErrorZ *val = (LDKCResult_PingDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKPing res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PingDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_PingDecodeErrorZ *val = (LDKCResult_PingDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PongDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_PongDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PongDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_PongDecodeErrorZ *val = (LDKCResult_PongDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKPong res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PongDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_PongDecodeErrorZ *val = (LDKCResult_PongDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1UnsignedChannelAnnouncementDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1UnsignedChannelAnnouncementDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKUnsignedChannelAnnouncement res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1UnsignedChannelAnnouncementDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1UnsignedChannelUpdateDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1UnsignedChannelUpdateDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ *val = (LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKUnsignedChannelUpdate res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1UnsignedChannelUpdateDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ *val = (LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ErrorMessageDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_ErrorMessageDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ErrorMessageDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ErrorMessageDecodeErrorZ *val = (LDKCResult_ErrorMessageDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKErrorMessage res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ErrorMessageDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ErrorMessageDecodeErrorZ *val = (LDKCResult_ErrorMessageDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1UnsignedNodeAnnouncementDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1UnsignedNodeAnnouncementDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKUnsignedNodeAnnouncement res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1UnsignedNodeAnnouncementDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ *val = (LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1QueryShortChannelIdsDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_QueryShortChannelIdsDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1QueryShortChannelIdsDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_QueryShortChannelIdsDecodeErrorZ *val = (LDKCResult_QueryShortChannelIdsDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKQueryShortChannelIds res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1QueryShortChannelIdsDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_QueryShortChannelIdsDecodeErrorZ *val = (LDKCResult_QueryShortChannelIdsDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ReplyShortChannelIdsEndDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ReplyShortChannelIdsEndDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ *val = (LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKReplyShortChannelIdsEnd res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ReplyShortChannelIdsEndDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ *val = (LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1QueryChannelRangeDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_QueryChannelRangeDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1QueryChannelRangeDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_QueryChannelRangeDecodeErrorZ *val = (LDKCResult_QueryChannelRangeDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKQueryChannelRange res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1QueryChannelRangeDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_QueryChannelRangeDecodeErrorZ *val = (LDKCResult_QueryChannelRangeDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ReplyChannelRangeDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_ReplyChannelRangeDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ReplyChannelRangeDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ReplyChannelRangeDecodeErrorZ *val = (LDKCResult_ReplyChannelRangeDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKReplyChannelRange res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1ReplyChannelRangeDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_ReplyChannelRangeDecodeErrorZ *val = (LDKCResult_ReplyChannelRangeDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1GossipTimestampFilterDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_GossipTimestampFilterDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1GossipTimestampFilterDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_GossipTimestampFilterDecodeErrorZ *val = (LDKCResult_GossipTimestampFilterDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKGossipTimestampFilter res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1GossipTimestampFilterDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_GossipTimestampFilterDecodeErrorZ *val = (LDKCResult_GossipTimestampFilterDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg)->result_ok;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ *val = (LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg;
	CHECK(val->result_ok);
	LDKCVec_u8Z res_var = (*val->contents.result);
	int8_tArray res_arr = (*env)->NewByteArray(env, res_var.datalen);
	(*env)->SetByteArrayRegion(env, res_arr, 0, res_var.datalen, res_var.data);
	return res_arr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ *val = (LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePeerHandleErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NonePeerHandleErrorZ*)arg)->result_ok;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePeerHandleErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NonePeerHandleErrorZ *val = (LDKCResult_NonePeerHandleErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePeerHandleErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NonePeerHandleErrorZ *val = (LDKCResult_NonePeerHandleErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolPeerHandleErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_boolPeerHandleErrorZ*)arg)->result_ok;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolPeerHandleErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_boolPeerHandleErrorZ *val = (LDKCResult_boolPeerHandleErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolPeerHandleErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_boolPeerHandleErrorZ *val = (LDKCResult_boolPeerHandleErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SecretKeySecpErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_SecretKeySecpErrorZ*)arg)->result_ok;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SecretKeySecpErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_SecretKeySecpErrorZ *val = (LDKCResult_SecretKeySecpErrorZ*)arg;
	CHECK(val->result_ok);
	int8_tArray res_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, res_arr, 0, 32, (*val->contents.result).bytes);
	return res_arr;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SecretKeySecpErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_SecretKeySecpErrorZ *val = (LDKCResult_SecretKeySecpErrorZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKSecp256k1Error_to_java(env, (*val->contents.err));
	return err_conv;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PublicKeySecpErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_PublicKeySecpErrorZ*)arg)->result_ok;
}
JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PublicKeySecpErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_PublicKeySecpErrorZ *val = (LDKCResult_PublicKeySecpErrorZ*)arg;
	CHECK(val->result_ok);
	int8_tArray res_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, res_arr, 0, 33, (*val->contents.result).compressed_form);
	return res_arr;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PublicKeySecpErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_PublicKeySecpErrorZ *val = (LDKCResult_PublicKeySecpErrorZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKSecp256k1Error_to_java(env, (*val->contents.err));
	return err_conv;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxCreationKeysSecpErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_TxCreationKeysSecpErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxCreationKeysSecpErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_TxCreationKeysSecpErrorZ *val = (LDKCResult_TxCreationKeysSecpErrorZ*)arg;
	CHECK(val->result_ok);
	LDKTxCreationKeys res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxCreationKeysSecpErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_TxCreationKeysSecpErrorZ *val = (LDKCResult_TxCreationKeysSecpErrorZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKSecp256k1Error_to_java(env, (*val->contents.err));
	return err_conv;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TrustedCommitmentTransactionNoneZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_TrustedCommitmentTransactionNoneZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TrustedCommitmentTransactionNoneZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_TrustedCommitmentTransactionNoneZ *val = (LDKCResult_TrustedCommitmentTransactionNoneZ*)arg;
	CHECK(val->result_ok);
	LDKTrustedCommitmentTransaction res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TrustedCommitmentTransactionNoneZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_TrustedCommitmentTransactionNoneZ *val = (LDKCResult_TrustedCommitmentTransactionNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1RouteHopZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_RouteHopZ *ret = MALLOC(sizeof(LDKCVec_RouteHopZ), "LDKCVec_RouteHopZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKRouteHop) * ret->datalen, "LDKCVec_RouteHopZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKRouteHop arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = RouteHop_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_RouteHopZ CVec_RouteHopZ_clone(const LDKCVec_RouteHopZ *orig) {
	LDKCVec_RouteHopZ ret = { .data = MALLOC(sizeof(LDKRouteHop) * orig->datalen, "LDKCVec_RouteHopZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = RouteHop_clone(&orig->data[i]);
	}
	return ret;
}
static inline LDKCVec_CVec_RouteHopZZ CVec_CVec_RouteHopZZ_clone(const LDKCVec_CVec_RouteHopZZ *orig) {
	LDKCVec_CVec_RouteHopZZ ret = { .data = MALLOC(sizeof(LDKCVec_RouteHopZ) * orig->datalen, "LDKCVec_CVec_RouteHopZZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = CVec_RouteHopZ_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_RouteDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_RouteDecodeErrorZ *val = (LDKCResult_RouteDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKRoute res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_RouteDecodeErrorZ *val = (LDKCResult_RouteDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCVec_1RouteHintZ_1new(JNIEnv *env, jclass clz, int64_tArray elems) {
	LDKCVec_RouteHintZ *ret = MALLOC(sizeof(LDKCVec_RouteHintZ), "LDKCVec_RouteHintZ");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKRouteHint) * ret->datalen, "LDKCVec_RouteHintZ Data");
		int64_t *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			int64_t arr_elem = java_elems[i];
			LDKRouteHint arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = RouteHint_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
static inline LDKCVec_RouteHintZ CVec_RouteHintZ_clone(const LDKCVec_RouteHintZ *orig) {
	LDKCVec_RouteHintZ ret = { .data = MALLOC(sizeof(LDKRouteHint) * orig->datalen, "LDKCVec_RouteHintZ clone bytes"), .datalen = orig->datalen };
	for (size_t i = 0; i < ret.datalen; i++) {
		ret.data[i] = RouteHint_clone(&orig->data[i]);
	}
	return ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteLightningErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_RouteLightningErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteLightningErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_RouteLightningErrorZ *val = (LDKCResult_RouteLightningErrorZ*)arg;
	CHECK(val->result_ok);
	LDKRoute res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteLightningErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_RouteLightningErrorZ *val = (LDKCResult_RouteLightningErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RoutingFeesDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_RoutingFeesDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RoutingFeesDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_RoutingFeesDecodeErrorZ *val = (LDKCResult_RoutingFeesDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKRoutingFees res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RoutingFeesDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_RoutingFeesDecodeErrorZ *val = (LDKCResult_RoutingFeesDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NodeAnnouncementInfoDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NodeAnnouncementInfoDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ *val = (LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKNodeAnnouncementInfo res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NodeAnnouncementInfoDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ *val = (LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NodeInfoDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NodeInfoDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NodeInfoDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NodeInfoDecodeErrorZ *val = (LDKCResult_NodeInfoDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKNodeInfo res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NodeInfoDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NodeInfoDecodeErrorZ *val = (LDKCResult_NodeInfoDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NetworkGraphDecodeErrorZ_1result_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	return ((LDKCResult_NetworkGraphDecodeErrorZ*)arg)->result_ok;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NetworkGraphDecodeErrorZ_1get_1ok(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NetworkGraphDecodeErrorZ *val = (LDKCResult_NetworkGraphDecodeErrorZ*)arg;
	CHECK(val->result_ok);
	LDKNetworkGraph res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NetworkGraphDecodeErrorZ_1get_1err(JNIEnv *env, jclass clz, int64_t arg) {
	LDKCResult_NetworkGraphDecodeErrorZ *val = (LDKCResult_NetworkGraphDecodeErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKDecodeError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
typedef struct LDKMessageSendEventsProvider_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_and_clear_pending_msg_events_meth;
} LDKMessageSendEventsProvider_JCalls;
static void LDKMessageSendEventsProvider_JCalls_free(void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
LDKCVec_MessageSendEventZ get_and_clear_pending_msg_events_jcall(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int64_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->get_and_clear_pending_msg_events_meth);
	LDKCVec_MessageSendEventZ arg_constr;
	arg_constr.datalen = (*env)->GetArrayLength(env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKMessageSendEvent), "LDKCVec_MessageSendEventZ Elements");
	else
		arg_constr.data = NULL;
	int64_t* arg_vals = (*env)->GetLongArrayElements (env, arg, NULL);
	for (size_t s = 0; s < arg_constr.datalen; s++) {
		int64_t arr_conv_18 = arg_vals[s];
		LDKMessageSendEvent arr_conv_18_conv = *(LDKMessageSendEvent*)arr_conv_18;
		FREE((void*)arr_conv_18);
		arg_constr.data[s] = arr_conv_18_conv;
	}
	(*env)->ReleaseLongArrayElements(env, arg, arg_vals, 0);
	return arg_constr;
}
static void* LDKMessageSendEventsProvider_JCalls_clone(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKMessageSendEventsProvider LDKMessageSendEventsProvider_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKMessageSendEventsProvider_JCalls *calls = MALLOC(sizeof(LDKMessageSendEventsProvider_JCalls), "LDKMessageSendEventsProvider_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->get_and_clear_pending_msg_events_meth = (*env)->GetMethodID(env, c, "get_and_clear_pending_msg_events", "()[J");
	CHECK(calls->get_and_clear_pending_msg_events_meth != NULL);

	LDKMessageSendEventsProvider ret = {
		.this_arg = (void*) calls,
		.get_and_clear_pending_msg_events = get_and_clear_pending_msg_events_jcall,
		.free = LDKMessageSendEventsProvider_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKMessageSendEventsProvider_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKMessageSendEventsProvider *res_ptr = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*res_ptr = LDKMessageSendEventsProvider_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_MessageSendEventsProvider_1get_1and_1clear_1pending_1msg_1events(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKMessageSendEventsProvider* this_arg_conv = (LDKMessageSendEventsProvider*)this_arg;
	LDKCVec_MessageSendEventZ ret_var = (this_arg_conv->get_and_clear_pending_msg_events)(this_arg_conv->this_arg);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t s = 0; s < ret_var.datalen; s++) {
		LDKMessageSendEvent *arr_conv_18_copy = MALLOC(sizeof(LDKMessageSendEvent), "LDKMessageSendEvent");
		*arr_conv_18_copy = MessageSendEvent_clone(&ret_var.data[s]);
		long arr_conv_18_ref = (long)arr_conv_18_copy;
		ret_arr_ptr[s] = arr_conv_18_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

typedef struct LDKEventsProvider_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_and_clear_pending_events_meth;
} LDKEventsProvider_JCalls;
static void LDKEventsProvider_JCalls_free(void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
LDKCVec_EventZ get_and_clear_pending_events_jcall(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int64_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->get_and_clear_pending_events_meth);
	LDKCVec_EventZ arg_constr;
	arg_constr.datalen = (*env)->GetArrayLength(env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKEvent), "LDKCVec_EventZ Elements");
	else
		arg_constr.data = NULL;
	int64_t* arg_vals = (*env)->GetLongArrayElements (env, arg, NULL);
	for (size_t h = 0; h < arg_constr.datalen; h++) {
		int64_t arr_conv_7 = arg_vals[h];
		LDKEvent arr_conv_7_conv = *(LDKEvent*)arr_conv_7;
		FREE((void*)arr_conv_7);
		arg_constr.data[h] = arr_conv_7_conv;
	}
	(*env)->ReleaseLongArrayElements(env, arg, arg_vals, 0);
	return arg_constr;
}
static void* LDKEventsProvider_JCalls_clone(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKEventsProvider LDKEventsProvider_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKEventsProvider_JCalls *calls = MALLOC(sizeof(LDKEventsProvider_JCalls), "LDKEventsProvider_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->get_and_clear_pending_events_meth = (*env)->GetMethodID(env, c, "get_and_clear_pending_events", "()[J");
	CHECK(calls->get_and_clear_pending_events_meth != NULL);

	LDKEventsProvider ret = {
		.this_arg = (void*) calls,
		.get_and_clear_pending_events = get_and_clear_pending_events_jcall,
		.free = LDKEventsProvider_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKEventsProvider_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKEventsProvider *res_ptr = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*res_ptr = LDKEventsProvider_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_EventsProvider_1get_1and_1clear_1pending_1events(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKEventsProvider* this_arg_conv = (LDKEventsProvider*)this_arg;
	LDKCVec_EventZ ret_var = (this_arg_conv->get_and_clear_pending_events)(this_arg_conv->this_arg);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t h = 0; h < ret_var.datalen; h++) {
		LDKEvent *arr_conv_7_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
		*arr_conv_7_copy = Event_clone(&ret_var.data[h]);
		long arr_conv_7_ref = (long)arr_conv_7_copy;
		ret_arr_ptr[h] = arr_conv_7_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

typedef struct LDKAccess_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_utxo_meth;
} LDKAccess_JCalls;
static void LDKAccess_JCalls_free(void* this_arg) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
LDKCResult_TxOutAccessErrorZ get_utxo_jcall(const void* this_arg, const uint8_t (* genesis_hash)[32], uint64_t short_channel_id) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray genesis_hash_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, genesis_hash_arr, 0, 32, *genesis_hash);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_TxOutAccessErrorZ* ret = (LDKCResult_TxOutAccessErrorZ*)(*env)->CallLongMethod(env, obj, j_calls->get_utxo_meth, genesis_hash_arr, short_channel_id);
	LDKCResult_TxOutAccessErrorZ ret_conv = *(LDKCResult_TxOutAccessErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
static void* LDKAccess_JCalls_clone(const void* this_arg) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKAccess LDKAccess_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKAccess_JCalls *calls = MALLOC(sizeof(LDKAccess_JCalls), "LDKAccess_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->get_utxo_meth = (*env)->GetMethodID(env, c, "get_utxo", "([BJ)J");
	CHECK(calls->get_utxo_meth != NULL);

	LDKAccess ret = {
		.this_arg = (void*) calls,
		.get_utxo = get_utxo_jcall,
		.free = LDKAccess_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKAccess_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKAccess *res_ptr = MALLOC(sizeof(LDKAccess), "LDKAccess");
	*res_ptr = LDKAccess_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Access_1get_1utxo(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray genesis_hash, int64_t short_channel_id) {
	LDKAccess* this_arg_conv = (LDKAccess*)this_arg;
	unsigned char genesis_hash_arr[32];
	CHECK((*env)->GetArrayLength(env, genesis_hash) == 32);
	(*env)->GetByteArrayRegion(env, genesis_hash, 0, 32, genesis_hash_arr);
	unsigned char (*genesis_hash_ref)[32] = &genesis_hash_arr;
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = (this_arg_conv->get_utxo)(this_arg_conv->this_arg, genesis_hash_ref, short_channel_id);
	return (long)ret_conv;
}

typedef struct LDKFilter_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID register_tx_meth;
	jmethodID register_output_meth;
} LDKFilter_JCalls;
static void LDKFilter_JCalls_free(void* this_arg) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
void register_tx_jcall(const void* this_arg, const uint8_t (* txid)[32], LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray txid_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, txid_arr, 0, 32, *txid);
	LDKu8slice script_pubkey_var = script_pubkey;
	int8_tArray script_pubkey_arr = (*env)->NewByteArray(env, script_pubkey_var.datalen);
	(*env)->SetByteArrayRegion(env, script_pubkey_arr, 0, script_pubkey_var.datalen, script_pubkey_var.data);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->register_tx_meth, txid_arr, script_pubkey_arr);
}
void register_output_jcall(const void* this_arg, const LDKOutPoint * outpoint, LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKOutPoint outpoint_var = *outpoint;
	if (outpoint->inner != NULL)
		outpoint_var = OutPoint_clone(outpoint);
	CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long outpoint_ref = (long)outpoint_var.inner;
	if (outpoint_var.is_owned) {
		outpoint_ref |= 1;
	}
	LDKu8slice script_pubkey_var = script_pubkey;
	int8_tArray script_pubkey_arr = (*env)->NewByteArray(env, script_pubkey_var.datalen);
	(*env)->SetByteArrayRegion(env, script_pubkey_arr, 0, script_pubkey_var.datalen, script_pubkey_var.data);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->register_output_meth, outpoint_ref, script_pubkey_arr);
}
static void* LDKFilter_JCalls_clone(const void* this_arg) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKFilter LDKFilter_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKFilter_JCalls *calls = MALLOC(sizeof(LDKFilter_JCalls), "LDKFilter_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->register_tx_meth = (*env)->GetMethodID(env, c, "register_tx", "([B[B)V");
	CHECK(calls->register_tx_meth != NULL);
	calls->register_output_meth = (*env)->GetMethodID(env, c, "register_output", "(J[B)V");
	CHECK(calls->register_output_meth != NULL);

	LDKFilter ret = {
		.this_arg = (void*) calls,
		.register_tx = register_tx_jcall,
		.register_output = register_output_jcall,
		.free = LDKFilter_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKFilter_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKFilter *res_ptr = MALLOC(sizeof(LDKFilter), "LDKFilter");
	*res_ptr = LDKFilter_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Filter_1register_1tx(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray txid, int8_tArray script_pubkey) {
	LDKFilter* this_arg_conv = (LDKFilter*)this_arg;
	unsigned char txid_arr[32];
	CHECK((*env)->GetArrayLength(env, txid) == 32);
	(*env)->GetByteArrayRegion(env, txid, 0, 32, txid_arr);
	unsigned char (*txid_ref)[32] = &txid_arr;
	LDKu8slice script_pubkey_ref;
	script_pubkey_ref.datalen = (*env)->GetArrayLength(env, script_pubkey);
	script_pubkey_ref.data = (*env)->GetByteArrayElements (env, script_pubkey, NULL);
	(this_arg_conv->register_tx)(this_arg_conv->this_arg, txid_ref, script_pubkey_ref);
	(*env)->ReleaseByteArrayElements(env, script_pubkey, (int8_t*)script_pubkey_ref.data, 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Filter_1register_1output(JNIEnv *env, jclass clz, int64_t this_arg, int64_t outpoint, int8_tArray script_pubkey) {
	LDKFilter* this_arg_conv = (LDKFilter*)this_arg;
	LDKOutPoint outpoint_conv;
	outpoint_conv.inner = (void*)(outpoint & (~1));
	outpoint_conv.is_owned = false;
	LDKu8slice script_pubkey_ref;
	script_pubkey_ref.datalen = (*env)->GetArrayLength(env, script_pubkey);
	script_pubkey_ref.data = (*env)->GetByteArrayElements (env, script_pubkey, NULL);
	(this_arg_conv->register_output)(this_arg_conv->this_arg, &outpoint_conv, script_pubkey_ref);
	(*env)->ReleaseByteArrayElements(env, script_pubkey, (int8_t*)script_pubkey_ref.data, 0);
}

typedef struct LDKPersist_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID persist_new_channel_meth;
	jmethodID update_persisted_channel_meth;
} LDKPersist_JCalls;
static void LDKPersist_JCalls_free(void* this_arg) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
LDKCResult_NoneChannelMonitorUpdateErrZ persist_new_channel_jcall(const void* this_arg, LDKOutPoint id, const LDKChannelMonitor * data) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKOutPoint id_var = id;
	CHECK((((long)id_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&id_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long id_ref = (long)id_var.inner;
	if (id_var.is_owned) {
		id_ref |= 1;
	}
	LDKChannelMonitor data_var = *data;
	// Warning: we may need a move here but can't clone!
	CHECK((((long)data_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&data_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long data_ref = (long)data_var.inner;
	if (data_var.is_owned) {
		data_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*env)->CallLongMethod(env, obj, j_calls->persist_new_channel_meth, id_ref, data_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneChannelMonitorUpdateErrZ update_persisted_channel_jcall(const void* this_arg, LDKOutPoint id, const LDKChannelMonitorUpdate * update, const LDKChannelMonitor * data) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKOutPoint id_var = id;
	CHECK((((long)id_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&id_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long id_ref = (long)id_var.inner;
	if (id_var.is_owned) {
		id_ref |= 1;
	}
	LDKChannelMonitorUpdate update_var = *update;
	if (update->inner != NULL)
		update_var = ChannelMonitorUpdate_clone(update);
	CHECK((((long)update_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&update_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long update_ref = (long)update_var.inner;
	if (update_var.is_owned) {
		update_ref |= 1;
	}
	LDKChannelMonitor data_var = *data;
	// Warning: we may need a move here but can't clone!
	CHECK((((long)data_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&data_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long data_ref = (long)data_var.inner;
	if (data_var.is_owned) {
		data_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*env)->CallLongMethod(env, obj, j_calls->update_persisted_channel_meth, id_ref, update_ref, data_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ ret_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
static void* LDKPersist_JCalls_clone(const void* this_arg) {
	LDKPersist_JCalls *j_calls = (LDKPersist_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKPersist LDKPersist_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKPersist_JCalls *calls = MALLOC(sizeof(LDKPersist_JCalls), "LDKPersist_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->persist_new_channel_meth = (*env)->GetMethodID(env, c, "persist_new_channel", "(JJ)J");
	CHECK(calls->persist_new_channel_meth != NULL);
	calls->update_persisted_channel_meth = (*env)->GetMethodID(env, c, "update_persisted_channel", "(JJJ)J");
	CHECK(calls->update_persisted_channel_meth != NULL);

	LDKPersist ret = {
		.this_arg = (void*) calls,
		.persist_new_channel = persist_new_channel_jcall,
		.update_persisted_channel = update_persisted_channel_jcall,
		.free = LDKPersist_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKPersist_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKPersist *res_ptr = MALLOC(sizeof(LDKPersist), "LDKPersist");
	*res_ptr = LDKPersist_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Persist_1persist_1new_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int64_t id, int64_t data) {
	LDKPersist* this_arg_conv = (LDKPersist*)this_arg;
	LDKOutPoint id_conv;
	id_conv.inner = (void*)(id & (~1));
	id_conv.is_owned = (id & 1) || (id == 0);
	if (id_conv.inner != NULL)
		id_conv = OutPoint_clone(&id_conv);
	LDKChannelMonitor data_conv;
	data_conv.inner = (void*)(data & (~1));
	data_conv.is_owned = false;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->persist_new_channel)(this_arg_conv->this_arg, id_conv, &data_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Persist_1update_1persisted_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int64_t id, int64_t update, int64_t data) {
	LDKPersist* this_arg_conv = (LDKPersist*)this_arg;
	LDKOutPoint id_conv;
	id_conv.inner = (void*)(id & (~1));
	id_conv.is_owned = (id & 1) || (id == 0);
	if (id_conv.inner != NULL)
		id_conv = OutPoint_clone(&id_conv);
	LDKChannelMonitorUpdate update_conv;
	update_conv.inner = (void*)(update & (~1));
	update_conv.is_owned = false;
	LDKChannelMonitor data_conv;
	data_conv.inner = (void*)(data & (~1));
	data_conv.is_owned = false;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = (this_arg_conv->update_persisted_channel)(this_arg_conv->this_arg, id_conv, &update_conv, &data_conv);
	return (long)ret_conv;
}

typedef struct LDKChannelMessageHandler_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	LDKMessageSendEventsProvider_JCalls* MessageSendEventsProvider;
	jmethodID handle_open_channel_meth;
	jmethodID handle_accept_channel_meth;
	jmethodID handle_funding_created_meth;
	jmethodID handle_funding_signed_meth;
	jmethodID handle_funding_locked_meth;
	jmethodID handle_shutdown_meth;
	jmethodID handle_closing_signed_meth;
	jmethodID handle_update_add_htlc_meth;
	jmethodID handle_update_fulfill_htlc_meth;
	jmethodID handle_update_fail_htlc_meth;
	jmethodID handle_update_fail_malformed_htlc_meth;
	jmethodID handle_commitment_signed_meth;
	jmethodID handle_revoke_and_ack_meth;
	jmethodID handle_update_fee_meth;
	jmethodID handle_announcement_signatures_meth;
	jmethodID peer_disconnected_meth;
	jmethodID peer_connected_meth;
	jmethodID handle_channel_reestablish_meth;
	jmethodID handle_error_meth;
} LDKChannelMessageHandler_JCalls;
static void LDKChannelMessageHandler_JCalls_free(void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
void handle_open_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKOpenChannel * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKInitFeatures their_features_var = their_features;
	CHECK((((long)their_features_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&their_features_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long their_features_ref = (long)their_features_var.inner;
	if (their_features_var.is_owned) {
		their_features_ref |= 1;
	}
	LDKOpenChannel msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = OpenChannel_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_open_channel_meth, their_node_id_arr, their_features_ref, msg_ref);
}
void handle_accept_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKAcceptChannel * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKInitFeatures their_features_var = their_features;
	CHECK((((long)their_features_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&their_features_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long their_features_ref = (long)their_features_var.inner;
	if (their_features_var.is_owned) {
		their_features_ref |= 1;
	}
	LDKAcceptChannel msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = AcceptChannel_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_accept_channel_meth, their_node_id_arr, their_features_ref, msg_ref);
}
void handle_funding_created_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingCreated * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKFundingCreated msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = FundingCreated_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_funding_created_meth, their_node_id_arr, msg_ref);
}
void handle_funding_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingSigned * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKFundingSigned msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = FundingSigned_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_funding_signed_meth, their_node_id_arr, msg_ref);
}
void handle_funding_locked_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingLocked * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKFundingLocked msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = FundingLocked_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_funding_locked_meth, their_node_id_arr, msg_ref);
}
void handle_shutdown_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKShutdown * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKShutdown msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = Shutdown_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_shutdown_meth, their_node_id_arr, msg_ref);
}
void handle_closing_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKClosingSigned * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKClosingSigned msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ClosingSigned_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_closing_signed_meth, their_node_id_arr, msg_ref);
}
void handle_update_add_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateAddHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKUpdateAddHTLC msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateAddHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_update_add_htlc_meth, their_node_id_arr, msg_ref);
}
void handle_update_fulfill_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFulfillHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKUpdateFulfillHTLC msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateFulfillHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_update_fulfill_htlc_meth, their_node_id_arr, msg_ref);
}
void handle_update_fail_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKUpdateFailHTLC msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateFailHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_update_fail_htlc_meth, their_node_id_arr, msg_ref);
}
void handle_update_fail_malformed_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailMalformedHTLC * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKUpdateFailMalformedHTLC msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateFailMalformedHTLC_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_update_fail_malformed_htlc_meth, their_node_id_arr, msg_ref);
}
void handle_commitment_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKCommitmentSigned * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKCommitmentSigned msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = CommitmentSigned_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_commitment_signed_meth, their_node_id_arr, msg_ref);
}
void handle_revoke_and_ack_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKRevokeAndACK * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKRevokeAndACK msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = RevokeAndACK_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_revoke_and_ack_meth, their_node_id_arr, msg_ref);
}
void handle_update_fee_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFee * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKUpdateFee msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = UpdateFee_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_update_fee_meth, their_node_id_arr, msg_ref);
}
void handle_announcement_signatures_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKAnnouncementSignatures * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKAnnouncementSignatures msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = AnnouncementSignatures_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_announcement_signatures_meth, their_node_id_arr, msg_ref);
}
void peer_disconnected_jcall(const void* this_arg, LDKPublicKey their_node_id, bool no_connection_possible) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->peer_disconnected_meth, their_node_id_arr, no_connection_possible);
}
void peer_connected_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKInit * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKInit msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = Init_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->peer_connected_meth, their_node_id_arr, msg_ref);
}
void handle_channel_reestablish_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKChannelReestablish * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKChannelReestablish msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ChannelReestablish_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_channel_reestablish_meth, their_node_id_arr, msg_ref);
}
void handle_error_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKErrorMessage * msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKErrorMessage msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ErrorMessage_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_error_meth, their_node_id_arr, msg_ref);
}
static void* LDKChannelMessageHandler_JCalls_clone(const void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	atomic_fetch_add_explicit(&j_calls->MessageSendEventsProvider->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKChannelMessageHandler LDKChannelMessageHandler_init (JNIEnv *env, jclass clz, jobject o, jobject MessageSendEventsProvider) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKChannelMessageHandler_JCalls *calls = MALLOC(sizeof(LDKChannelMessageHandler_JCalls), "LDKChannelMessageHandler_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->handle_open_channel_meth = (*env)->GetMethodID(env, c, "handle_open_channel", "([BJJ)V");
	CHECK(calls->handle_open_channel_meth != NULL);
	calls->handle_accept_channel_meth = (*env)->GetMethodID(env, c, "handle_accept_channel", "([BJJ)V");
	CHECK(calls->handle_accept_channel_meth != NULL);
	calls->handle_funding_created_meth = (*env)->GetMethodID(env, c, "handle_funding_created", "([BJ)V");
	CHECK(calls->handle_funding_created_meth != NULL);
	calls->handle_funding_signed_meth = (*env)->GetMethodID(env, c, "handle_funding_signed", "([BJ)V");
	CHECK(calls->handle_funding_signed_meth != NULL);
	calls->handle_funding_locked_meth = (*env)->GetMethodID(env, c, "handle_funding_locked", "([BJ)V");
	CHECK(calls->handle_funding_locked_meth != NULL);
	calls->handle_shutdown_meth = (*env)->GetMethodID(env, c, "handle_shutdown", "([BJ)V");
	CHECK(calls->handle_shutdown_meth != NULL);
	calls->handle_closing_signed_meth = (*env)->GetMethodID(env, c, "handle_closing_signed", "([BJ)V");
	CHECK(calls->handle_closing_signed_meth != NULL);
	calls->handle_update_add_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_add_htlc", "([BJ)V");
	CHECK(calls->handle_update_add_htlc_meth != NULL);
	calls->handle_update_fulfill_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_fulfill_htlc", "([BJ)V");
	CHECK(calls->handle_update_fulfill_htlc_meth != NULL);
	calls->handle_update_fail_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_fail_htlc", "([BJ)V");
	CHECK(calls->handle_update_fail_htlc_meth != NULL);
	calls->handle_update_fail_malformed_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_fail_malformed_htlc", "([BJ)V");
	CHECK(calls->handle_update_fail_malformed_htlc_meth != NULL);
	calls->handle_commitment_signed_meth = (*env)->GetMethodID(env, c, "handle_commitment_signed", "([BJ)V");
	CHECK(calls->handle_commitment_signed_meth != NULL);
	calls->handle_revoke_and_ack_meth = (*env)->GetMethodID(env, c, "handle_revoke_and_ack", "([BJ)V");
	CHECK(calls->handle_revoke_and_ack_meth != NULL);
	calls->handle_update_fee_meth = (*env)->GetMethodID(env, c, "handle_update_fee", "([BJ)V");
	CHECK(calls->handle_update_fee_meth != NULL);
	calls->handle_announcement_signatures_meth = (*env)->GetMethodID(env, c, "handle_announcement_signatures", "([BJ)V");
	CHECK(calls->handle_announcement_signatures_meth != NULL);
	calls->peer_disconnected_meth = (*env)->GetMethodID(env, c, "peer_disconnected", "([BZ)V");
	CHECK(calls->peer_disconnected_meth != NULL);
	calls->peer_connected_meth = (*env)->GetMethodID(env, c, "peer_connected", "([BJ)V");
	CHECK(calls->peer_connected_meth != NULL);
	calls->handle_channel_reestablish_meth = (*env)->GetMethodID(env, c, "handle_channel_reestablish", "([BJ)V");
	CHECK(calls->handle_channel_reestablish_meth != NULL);
	calls->handle_error_meth = (*env)->GetMethodID(env, c, "handle_error", "([BJ)V");
	CHECK(calls->handle_error_meth != NULL);

	LDKChannelMessageHandler ret = {
		.this_arg = (void*) calls,
		.handle_open_channel = handle_open_channel_jcall,
		.handle_accept_channel = handle_accept_channel_jcall,
		.handle_funding_created = handle_funding_created_jcall,
		.handle_funding_signed = handle_funding_signed_jcall,
		.handle_funding_locked = handle_funding_locked_jcall,
		.handle_shutdown = handle_shutdown_jcall,
		.handle_closing_signed = handle_closing_signed_jcall,
		.handle_update_add_htlc = handle_update_add_htlc_jcall,
		.handle_update_fulfill_htlc = handle_update_fulfill_htlc_jcall,
		.handle_update_fail_htlc = handle_update_fail_htlc_jcall,
		.handle_update_fail_malformed_htlc = handle_update_fail_malformed_htlc_jcall,
		.handle_commitment_signed = handle_commitment_signed_jcall,
		.handle_revoke_and_ack = handle_revoke_and_ack_jcall,
		.handle_update_fee = handle_update_fee_jcall,
		.handle_announcement_signatures = handle_announcement_signatures_jcall,
		.peer_disconnected = peer_disconnected_jcall,
		.peer_connected = peer_connected_jcall,
		.handle_channel_reestablish = handle_channel_reestablish_jcall,
		.handle_error = handle_error_jcall,
		.free = LDKChannelMessageHandler_JCalls_free,
		.MessageSendEventsProvider = LDKMessageSendEventsProvider_init(env, clz, MessageSendEventsProvider),
	};
	calls->MessageSendEventsProvider = ret.MessageSendEventsProvider.this_arg;
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1new(JNIEnv *env, jclass clz, jobject o, jobject MessageSendEventsProvider) {
	LDKChannelMessageHandler *res_ptr = MALLOC(sizeof(LDKChannelMessageHandler), "LDKChannelMessageHandler");
	*res_ptr = LDKChannelMessageHandler_init(env, clz, o, MessageSendEventsProvider);
	return (long)res_ptr;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1open_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t their_features, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKInitFeatures their_features_conv;
	their_features_conv.inner = (void*)(their_features & (~1));
	their_features_conv.is_owned = (their_features & 1) || (their_features == 0);
	// Warning: we may need a move here but can't clone!
	LDKOpenChannel msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_open_channel)(this_arg_conv->this_arg, their_node_id_ref, their_features_conv, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1accept_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t their_features, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKInitFeatures their_features_conv;
	their_features_conv.inner = (void*)(their_features & (~1));
	their_features_conv.is_owned = (their_features & 1) || (their_features == 0);
	// Warning: we may need a move here but can't clone!
	LDKAcceptChannel msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_accept_channel)(this_arg_conv->this_arg, their_node_id_ref, their_features_conv, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1funding_1created(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKFundingCreated msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_funding_created)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1funding_1signed(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKFundingSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_funding_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1funding_1locked(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKFundingLocked msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_funding_locked)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1shutdown(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKShutdown msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_shutdown)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1closing_1signed(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKClosingSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_closing_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1add_1htlc(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateAddHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_add_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1fulfill_1htlc(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateFulfillHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fulfill_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1fail_1htlc(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateFailHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fail_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1fail_1malformed_1htlc(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateFailMalformedHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fail_malformed_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1commitment_1signed(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKCommitmentSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_commitment_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1revoke_1and_1ack(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKRevokeAndACK msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_revoke_and_ack)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1fee(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateFee msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_update_fee)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1announcement_1signatures(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKAnnouncementSignatures msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_announcement_signatures)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1peer_1disconnected(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, jboolean no_connection_possible) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	(this_arg_conv->peer_disconnected)(this_arg_conv->this_arg, their_node_id_ref, no_connection_possible);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1peer_1connected(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKInit msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->peer_connected)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1channel_1reestablish(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKChannelReestablish msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_channel_reestablish)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1error(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKErrorMessage msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	(this_arg_conv->handle_error)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

typedef struct LDKRoutingMessageHandler_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	LDKMessageSendEventsProvider_JCalls* MessageSendEventsProvider;
	jmethodID handle_node_announcement_meth;
	jmethodID handle_channel_announcement_meth;
	jmethodID handle_channel_update_meth;
	jmethodID handle_htlc_fail_channel_update_meth;
	jmethodID get_next_channel_announcements_meth;
	jmethodID get_next_node_announcements_meth;
	jmethodID sync_routing_table_meth;
	jmethodID handle_reply_channel_range_meth;
	jmethodID handle_reply_short_channel_ids_end_meth;
	jmethodID handle_query_channel_range_meth;
	jmethodID handle_query_short_channel_ids_meth;
} LDKRoutingMessageHandler_JCalls;
static void LDKRoutingMessageHandler_JCalls_free(void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
LDKCResult_boolLightningErrorZ handle_node_announcement_jcall(const void* this_arg, const LDKNodeAnnouncement * msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKNodeAnnouncement msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = NodeAnnouncement_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*env)->CallLongMethod(env, obj, j_calls->handle_node_announcement_meth, msg_ref);
	LDKCResult_boolLightningErrorZ ret_conv = *(LDKCResult_boolLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_boolLightningErrorZ handle_channel_announcement_jcall(const void* this_arg, const LDKChannelAnnouncement * msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKChannelAnnouncement msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ChannelAnnouncement_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*env)->CallLongMethod(env, obj, j_calls->handle_channel_announcement_meth, msg_ref);
	LDKCResult_boolLightningErrorZ ret_conv = *(LDKCResult_boolLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_boolLightningErrorZ handle_channel_update_jcall(const void* this_arg, const LDKChannelUpdate * msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKChannelUpdate msg_var = *msg;
	if (msg->inner != NULL)
		msg_var = ChannelUpdate_clone(msg);
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*env)->CallLongMethod(env, obj, j_calls->handle_channel_update_meth, msg_ref);
	LDKCResult_boolLightningErrorZ ret_conv = *(LDKCResult_boolLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
void handle_htlc_fail_channel_update_jcall(const void* this_arg, const LDKHTLCFailChannelUpdate * update) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long ret_update = (long)update;
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->handle_htlc_fail_channel_update_meth, ret_update);
}
LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ get_next_channel_announcements_jcall(const void* this_arg, uint64_t starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int64_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->get_next_channel_announcements_meth, starting_point, batch_amount);
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ arg_constr;
	arg_constr.datalen = (*env)->GetArrayLength(env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Elements");
	else
		arg_constr.data = NULL;
	int64_t* arg_vals = (*env)->GetLongArrayElements (env, arg, NULL);
	for (size_t l = 0; l < arg_constr.datalen; l++) {
		int64_t arr_conv_63 = arg_vals[l];
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_conv_63_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arr_conv_63;
		FREE((void*)arr_conv_63);
		arg_constr.data[l] = arr_conv_63_conv;
	}
	(*env)->ReleaseLongArrayElements(env, arg, arg_vals, 0);
	return arg_constr;
}
LDKCVec_NodeAnnouncementZ get_next_node_announcements_jcall(const void* this_arg, LDKPublicKey starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray starting_point_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, starting_point_arr, 0, 33, starting_point.compressed_form);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	int64_tArray arg = (*env)->CallObjectMethod(env, obj, j_calls->get_next_node_announcements_meth, starting_point_arr, batch_amount);
	LDKCVec_NodeAnnouncementZ arg_constr;
	arg_constr.datalen = (*env)->GetArrayLength(env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKNodeAnnouncement), "LDKCVec_NodeAnnouncementZ Elements");
	else
		arg_constr.data = NULL;
	int64_t* arg_vals = (*env)->GetLongArrayElements (env, arg, NULL);
	for (size_t s = 0; s < arg_constr.datalen; s++) {
		int64_t arr_conv_18 = arg_vals[s];
		LDKNodeAnnouncement arr_conv_18_conv;
		arr_conv_18_conv.inner = (void*)(arr_conv_18 & (~1));
		arr_conv_18_conv.is_owned = (arr_conv_18 & 1) || (arr_conv_18 == 0);
		if (arr_conv_18_conv.inner != NULL)
			arr_conv_18_conv = NodeAnnouncement_clone(&arr_conv_18_conv);
		arg_constr.data[s] = arr_conv_18_conv;
	}
	(*env)->ReleaseLongArrayElements(env, arg, arg_vals, 0);
	return arg_constr;
}
void sync_routing_table_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKInit * init) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKInit init_var = *init;
	if (init->inner != NULL)
		init_var = Init_clone(init);
	CHECK((((long)init_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&init_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long init_ref = (long)init_var.inner;
	if (init_var.is_owned) {
		init_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->sync_routing_table_meth, their_node_id_arr, init_ref);
}
LDKCResult_NoneLightningErrorZ handle_reply_channel_range_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKReplyChannelRange msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKReplyChannelRange msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneLightningErrorZ* ret = (LDKCResult_NoneLightningErrorZ*)(*env)->CallLongMethod(env, obj, j_calls->handle_reply_channel_range_meth, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneLightningErrorZ handle_reply_short_channel_ids_end_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKReplyShortChannelIdsEnd msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKReplyShortChannelIdsEnd msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneLightningErrorZ* ret = (LDKCResult_NoneLightningErrorZ*)(*env)->CallLongMethod(env, obj, j_calls->handle_reply_short_channel_ids_end_meth, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneLightningErrorZ handle_query_channel_range_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKQueryChannelRange msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKQueryChannelRange msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneLightningErrorZ* ret = (LDKCResult_NoneLightningErrorZ*)(*env)->CallLongMethod(env, obj, j_calls->handle_query_channel_range_meth, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
LDKCResult_NoneLightningErrorZ handle_query_short_channel_ids_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKQueryShortChannelIds msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	int8_tArray their_node_id_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKQueryShortChannelIds msg_var = msg;
	CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long msg_ref = (long)msg_var.inner;
	if (msg_var.is_owned) {
		msg_ref |= 1;
	}
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneLightningErrorZ* ret = (LDKCResult_NoneLightningErrorZ*)(*env)->CallLongMethod(env, obj, j_calls->handle_query_short_channel_ids_meth, their_node_id_arr, msg_ref);
	LDKCResult_NoneLightningErrorZ ret_conv = *(LDKCResult_NoneLightningErrorZ*)ret;
	FREE((void*)ret);
	return ret_conv;
}
static void* LDKRoutingMessageHandler_JCalls_clone(const void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	atomic_fetch_add_explicit(&j_calls->MessageSendEventsProvider->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKRoutingMessageHandler LDKRoutingMessageHandler_init (JNIEnv *env, jclass clz, jobject o, jobject MessageSendEventsProvider) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKRoutingMessageHandler_JCalls *calls = MALLOC(sizeof(LDKRoutingMessageHandler_JCalls), "LDKRoutingMessageHandler_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->handle_node_announcement_meth = (*env)->GetMethodID(env, c, "handle_node_announcement", "(J)J");
	CHECK(calls->handle_node_announcement_meth != NULL);
	calls->handle_channel_announcement_meth = (*env)->GetMethodID(env, c, "handle_channel_announcement", "(J)J");
	CHECK(calls->handle_channel_announcement_meth != NULL);
	calls->handle_channel_update_meth = (*env)->GetMethodID(env, c, "handle_channel_update", "(J)J");
	CHECK(calls->handle_channel_update_meth != NULL);
	calls->handle_htlc_fail_channel_update_meth = (*env)->GetMethodID(env, c, "handle_htlc_fail_channel_update", "(J)V");
	CHECK(calls->handle_htlc_fail_channel_update_meth != NULL);
	calls->get_next_channel_announcements_meth = (*env)->GetMethodID(env, c, "get_next_channel_announcements", "(JB)[J");
	CHECK(calls->get_next_channel_announcements_meth != NULL);
	calls->get_next_node_announcements_meth = (*env)->GetMethodID(env, c, "get_next_node_announcements", "([BB)[J");
	CHECK(calls->get_next_node_announcements_meth != NULL);
	calls->sync_routing_table_meth = (*env)->GetMethodID(env, c, "sync_routing_table", "([BJ)V");
	CHECK(calls->sync_routing_table_meth != NULL);
	calls->handle_reply_channel_range_meth = (*env)->GetMethodID(env, c, "handle_reply_channel_range", "([BJ)J");
	CHECK(calls->handle_reply_channel_range_meth != NULL);
	calls->handle_reply_short_channel_ids_end_meth = (*env)->GetMethodID(env, c, "handle_reply_short_channel_ids_end", "([BJ)J");
	CHECK(calls->handle_reply_short_channel_ids_end_meth != NULL);
	calls->handle_query_channel_range_meth = (*env)->GetMethodID(env, c, "handle_query_channel_range", "([BJ)J");
	CHECK(calls->handle_query_channel_range_meth != NULL);
	calls->handle_query_short_channel_ids_meth = (*env)->GetMethodID(env, c, "handle_query_short_channel_ids", "([BJ)J");
	CHECK(calls->handle_query_short_channel_ids_meth != NULL);

	LDKRoutingMessageHandler ret = {
		.this_arg = (void*) calls,
		.handle_node_announcement = handle_node_announcement_jcall,
		.handle_channel_announcement = handle_channel_announcement_jcall,
		.handle_channel_update = handle_channel_update_jcall,
		.handle_htlc_fail_channel_update = handle_htlc_fail_channel_update_jcall,
		.get_next_channel_announcements = get_next_channel_announcements_jcall,
		.get_next_node_announcements = get_next_node_announcements_jcall,
		.sync_routing_table = sync_routing_table_jcall,
		.handle_reply_channel_range = handle_reply_channel_range_jcall,
		.handle_reply_short_channel_ids_end = handle_reply_short_channel_ids_end_jcall,
		.handle_query_channel_range = handle_query_channel_range_jcall,
		.handle_query_short_channel_ids = handle_query_short_channel_ids_jcall,
		.free = LDKRoutingMessageHandler_JCalls_free,
		.MessageSendEventsProvider = LDKMessageSendEventsProvider_init(env, clz, MessageSendEventsProvider),
	};
	calls->MessageSendEventsProvider = ret.MessageSendEventsProvider.this_arg;
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1new(JNIEnv *env, jclass clz, jobject o, jobject MessageSendEventsProvider) {
	LDKRoutingMessageHandler *res_ptr = MALLOC(sizeof(LDKRoutingMessageHandler), "LDKRoutingMessageHandler");
	*res_ptr = LDKRoutingMessageHandler_init(env, clz, o, MessageSendEventsProvider);
	return (long)res_ptr;
}
JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1node_1announcement(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKNodeAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_node_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1channel_1announcement(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_channel_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1channel_1update(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKChannelUpdate msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_channel_update)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1htlc_1fail_1channel_1update(JNIEnv *env, jclass clz, int64_t this_arg, int64_t update) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKHTLCFailChannelUpdate* update_conv = (LDKHTLCFailChannelUpdate*)update;
	(this_arg_conv->handle_htlc_fail_channel_update)(this_arg_conv->this_arg, update_conv);
}

JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1get_1next_1channel_1announcements(JNIEnv *env, jclass clz, int64_t this_arg, int64_t starting_point, int8_t batch_amount) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_var = (this_arg_conv->get_next_channel_announcements)(this_arg_conv->this_arg, starting_point, batch_amount);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t l = 0; l < ret_var.datalen; l++) {
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* arr_conv_63_ref = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
		*arr_conv_63_ref = ret_var.data[l];
		arr_conv_63_ref->a = ChannelAnnouncement_clone(&arr_conv_63_ref->a);
		arr_conv_63_ref->b = ChannelUpdate_clone(&arr_conv_63_ref->b);
		arr_conv_63_ref->c = ChannelUpdate_clone(&arr_conv_63_ref->c);
		ret_arr_ptr[l] = (long)arr_conv_63_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1get_1next_1node_1announcements(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray starting_point, int8_t batch_amount) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey starting_point_ref;
	CHECK((*env)->GetArrayLength(env, starting_point) == 33);
	(*env)->GetByteArrayRegion(env, starting_point, 0, 33, starting_point_ref.compressed_form);
	LDKCVec_NodeAnnouncementZ ret_var = (this_arg_conv->get_next_node_announcements)(this_arg_conv->this_arg, starting_point_ref, batch_amount);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t s = 0; s < ret_var.datalen; s++) {
		LDKNodeAnnouncement arr_conv_18_var = ret_var.data[s];
		CHECK((((long)arr_conv_18_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_18_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_18_ref = (long)arr_conv_18_var.inner;
		if (arr_conv_18_var.is_owned) {
			arr_conv_18_ref |= 1;
		}
		ret_arr_ptr[s] = arr_conv_18_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1sync_1routing_1table(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t init) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKInit init_conv;
	init_conv.inner = (void*)(init & (~1));
	init_conv.is_owned = false;
	(this_arg_conv->sync_routing_table)(this_arg_conv->this_arg, their_node_id_ref, &init_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1reply_1channel_1range(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKReplyChannelRange msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	if (msg_conv.inner != NULL)
		msg_conv = ReplyChannelRange_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_reply_channel_range)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1reply_1short_1channel_1ids_1end(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKReplyShortChannelIdsEnd msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	if (msg_conv.inner != NULL)
		msg_conv = ReplyShortChannelIdsEnd_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_reply_short_channel_ids_end)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1query_1channel_1range(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKQueryChannelRange msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	if (msg_conv.inner != NULL)
		msg_conv = QueryChannelRange_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_query_channel_range)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1query_1short_1channel_1ids(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKQueryShortChannelIds msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	if (msg_conv.inner != NULL)
		msg_conv = QueryShortChannelIds_clone(&msg_conv);
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = (this_arg_conv->handle_query_short_channel_ids)(this_arg_conv->this_arg, their_node_id_ref, msg_conv);
	return (long)ret_conv;
}

typedef struct LDKSocketDescriptor_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID send_data_meth;
	jmethodID disconnect_socket_meth;
	jmethodID eq_meth;
	jmethodID hash_meth;
} LDKSocketDescriptor_JCalls;
static void LDKSocketDescriptor_JCalls_free(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
uintptr_t send_data_jcall(void* this_arg, LDKu8slice data, bool resume_read) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKu8slice data_var = data;
	int8_tArray data_arr = (*env)->NewByteArray(env, data_var.datalen);
	(*env)->SetByteArrayRegion(env, data_arr, 0, data_var.datalen, data_var.data);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallLongMethod(env, obj, j_calls->send_data_meth, data_arr, resume_read);
}
void disconnect_socket_jcall(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallVoidMethod(env, obj, j_calls->disconnect_socket_meth);
}
bool eq_jcall(const void* this_arg, const LDKSocketDescriptor * other_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKSocketDescriptor *other_arg_clone = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*other_arg_clone = SocketDescriptor_clone(other_arg);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallBooleanMethod(env, obj, j_calls->eq_meth, (long)other_arg_clone);
}
uint64_t hash_jcall(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*env)->NewLocalRef(env, j_calls->o);
	CHECK(obj != NULL);
	return (*env)->CallLongMethod(env, obj, j_calls->hash_meth);
}
static void* LDKSocketDescriptor_JCalls_clone(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKSocketDescriptor LDKSocketDescriptor_init (JNIEnv *env, jclass clz, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKSocketDescriptor_JCalls *calls = MALLOC(sizeof(LDKSocketDescriptor_JCalls), "LDKSocketDescriptor_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->send_data_meth = (*env)->GetMethodID(env, c, "send_data", "([BZ)J");
	CHECK(calls->send_data_meth != NULL);
	calls->disconnect_socket_meth = (*env)->GetMethodID(env, c, "disconnect_socket", "()V");
	CHECK(calls->disconnect_socket_meth != NULL);
	calls->eq_meth = (*env)->GetMethodID(env, c, "eq", "(J)Z");
	CHECK(calls->eq_meth != NULL);
	calls->hash_meth = (*env)->GetMethodID(env, c, "hash", "()J");
	CHECK(calls->hash_meth != NULL);

	LDKSocketDescriptor ret = {
		.this_arg = (void*) calls,
		.send_data = send_data_jcall,
		.disconnect_socket = disconnect_socket_jcall,
		.eq = eq_jcall,
		.hash = hash_jcall,
		.clone = LDKSocketDescriptor_JCalls_clone,
		.free = LDKSocketDescriptor_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKSocketDescriptor_1new(JNIEnv *env, jclass clz, jobject o) {
	LDKSocketDescriptor *res_ptr = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*res_ptr = LDKSocketDescriptor_init(env, clz, o);
	return (long)res_ptr;
}
JNIEXPORT intptr_t JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1send_1data(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray data, jboolean resume_read) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	LDKu8slice data_ref;
	data_ref.datalen = (*env)->GetArrayLength(env, data);
	data_ref.data = (*env)->GetByteArrayElements (env, data, NULL);
	intptr_t ret_val = (this_arg_conv->send_data)(this_arg_conv->this_arg, data_ref, resume_read);
	(*env)->ReleaseByteArrayElements(env, data, (int8_t*)data_ref.data, 0);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1disconnect_1socket(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	(this_arg_conv->disconnect_socket)(this_arg_conv->this_arg);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1hash(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	int64_t ret_val = (this_arg_conv->hash)(this_arg_conv->this_arg);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Transaction_1free(JNIEnv *env, jclass clz, int8_tArray _res) {
	LDKTransaction _res_ref;
	_res_ref.datalen = (*env)->GetArrayLength(env, _res);
	_res_ref.data = MALLOC(_res_ref.datalen, "LDKTransaction Bytes");
	(*env)->GetByteArrayRegion(env, _res, 0, _res_ref.datalen, _res_ref.data);
	_res_ref.data_is_owned = true;
	Transaction_free(_res_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxOut_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKTxOut _res_conv = *(LDKTxOut*)_res;
	FREE((void*)_res);
	TxOut_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1SpendableOutputDescriptorZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_SpendableOutputDescriptorZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKSpendableOutputDescriptor), "LDKCVec_SpendableOutputDescriptorZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t b = 0; b < _res_constr.datalen; b++) {
		int64_t arr_conv_27 = _res_vals[b];
		LDKSpendableOutputDescriptor arr_conv_27_conv = *(LDKSpendableOutputDescriptor*)arr_conv_27;
		FREE((void*)arr_conv_27);
		_res_constr.data[b] = arr_conv_27_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_SpendableOutputDescriptorZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1MessageSendEventZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_MessageSendEventZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKMessageSendEvent), "LDKCVec_MessageSendEventZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t s = 0; s < _res_constr.datalen; s++) {
		int64_t arr_conv_18 = _res_vals[s];
		LDKMessageSendEvent arr_conv_18_conv = *(LDKMessageSendEvent*)arr_conv_18;
		FREE((void*)arr_conv_18);
		_res_constr.data[s] = arr_conv_18_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_MessageSendEventZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1EventZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_EventZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKEvent), "LDKCVec_EventZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t h = 0; h < _res_constr.datalen; h++) {
		int64_t arr_conv_7 = _res_vals[h];
		LDKEvent arr_conv_7_conv = *(LDKEvent*)arr_conv_7;
		FREE((void*)arr_conv_7);
		_res_constr.data[h] = arr_conv_7_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_EventZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1usizeTransactionZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKC2Tuple_usizeTransactionZ _res_conv = *(LDKC2Tuple_usizeTransactionZ*)_res;
	FREE((void*)_res);
	C2Tuple_usizeTransactionZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1usizeTransactionZ_1new(JNIEnv *env, jclass clz, intptr_t a, int8_tArray b) {
	LDKTransaction b_ref;
	b_ref.datalen = (*env)->GetArrayLength(env, b);
	b_ref.data = MALLOC(b_ref.datalen, "LDKTransaction Bytes");
	(*env)->GetByteArrayRegion(env, b, 0, b_ref.datalen, b_ref.data);
	b_ref.data_is_owned = true;
	LDKC2Tuple_usizeTransactionZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ), "LDKC2Tuple_usizeTransactionZ");
	*ret_ref = C2Tuple_usizeTransactionZ_new(a, b_ref);
	// XXX: We likely need to clone here, but no _clone fn is available for byte[]
	return (long)ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1usizeTransactionZZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_C2Tuple_usizeTransactionZZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t y = 0; y < _res_constr.datalen; y++) {
		int64_t arr_conv_24 = _res_vals[y];
		LDKC2Tuple_usizeTransactionZ arr_conv_24_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_24;
		FREE((void*)arr_conv_24);
		_res_constr.data[y] = arr_conv_24_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_C2Tuple_usizeTransactionZZ_free(_res_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NoneChannelMonitorUpdateErrZ_1ok(JNIEnv *env, jclass clz) {
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = CResult_NoneChannelMonitorUpdateErrZ_ok();
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NoneChannelMonitorUpdateErrZ_1err(JNIEnv *env, jclass clz, jclass e) {
	LDKChannelMonitorUpdateErr e_conv = LDKChannelMonitorUpdateErr_from_java(env, e);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret_conv = CResult_NoneChannelMonitorUpdateErrZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneChannelMonitorUpdateErrZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NoneChannelMonitorUpdateErrZ _res_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)_res;
	FREE((void*)_res);
	CResult_NoneChannelMonitorUpdateErrZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1MonitorEventZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_MonitorEventZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKMonitorEvent), "LDKCVec_MonitorEventZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t o = 0; o < _res_constr.datalen; o++) {
		int64_t arr_conv_14 = _res_vals[o];
		LDKMonitorEvent arr_conv_14_conv;
		arr_conv_14_conv.inner = (void*)(arr_conv_14 & (~1));
		arr_conv_14_conv.is_owned = (arr_conv_14 & 1) || (arr_conv_14 == 0);
		_res_constr.data[o] = arr_conv_14_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_MonitorEventZ_free(_res_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ChannelMonitorUpdateDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKChannelMonitorUpdate o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ChannelMonitorUpdate_clone(&o_conv);
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelMonitorUpdateDecodeErrorZ), "LDKCResult_ChannelMonitorUpdateDecodeErrorZ");
	*ret_conv = CResult_ChannelMonitorUpdateDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ChannelMonitorUpdateDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelMonitorUpdateDecodeErrorZ), "LDKCResult_ChannelMonitorUpdateDecodeErrorZ");
	*ret_conv = CResult_ChannelMonitorUpdateDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1ChannelMonitorUpdateDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ _res_conv = *(LDKCResult_ChannelMonitorUpdateDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ChannelMonitorUpdateDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NoneMonitorUpdateErrorZ_1ok(JNIEnv *env, jclass clz) {
	LDKCResult_NoneMonitorUpdateErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret_conv = CResult_NoneMonitorUpdateErrorZ_ok();
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NoneMonitorUpdateErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKMonitorUpdateError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NoneMonitorUpdateErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret_conv = CResult_NoneMonitorUpdateErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneMonitorUpdateErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NoneMonitorUpdateErrorZ _res_conv = *(LDKCResult_NoneMonitorUpdateErrorZ*)_res;
	FREE((void*)_res);
	CResult_NoneMonitorUpdateErrorZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1OutPointScriptZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKC2Tuple_OutPointScriptZ _res_conv = *(LDKC2Tuple_OutPointScriptZ*)_res;
	FREE((void*)_res);
	C2Tuple_OutPointScriptZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1OutPointScriptZ_1new(JNIEnv *env, jclass clz, int64_t a, int8_tArray b) {
	LDKOutPoint a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = OutPoint_clone(&a_conv);
	LDKCVec_u8Z b_ref;
	b_ref.datalen = (*env)->GetArrayLength(env, b);
	b_ref.data = MALLOC(b_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, b, 0, b_ref.datalen, b_ref.data);
	LDKC2Tuple_OutPointScriptZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret_ref = C2Tuple_OutPointScriptZ_new(a_conv, b_ref);
	ret_ref->a = OutPoint_clone(&ret_ref->a);
	ret_ref->b = CVec_u8Z_clone(&ret_ref->b);
	return (long)ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1TransactionZ_1free(JNIEnv *env, jclass clz, jobjectArray _res) {
	LDKCVec_TransactionZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKTransaction), "LDKCVec_TransactionZ Elements");
	else
		_res_constr.data = NULL;
	for (size_t i = 0; i < _res_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, _res, i);
		LDKTransaction arr_conv_8_ref;
		arr_conv_8_ref.datalen = (*env)->GetArrayLength(env, arr_conv_8);
		arr_conv_8_ref.data = MALLOC(arr_conv_8_ref.datalen, "LDKTransaction Bytes");
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, arr_conv_8_ref.datalen, arr_conv_8_ref.data);
		arr_conv_8_ref.data_is_owned = true;
		_res_constr.data[i] = arr_conv_8_ref;
	}
	CVec_TransactionZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u32TxOutZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKC2Tuple_u32TxOutZ _res_conv = *(LDKC2Tuple_u32TxOutZ*)_res;
	FREE((void*)_res);
	C2Tuple_u32TxOutZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u32TxOutZ_1new(JNIEnv *env, jclass clz, int32_t a, int64_t b) {
	LDKTxOut b_conv = *(LDKTxOut*)b;
	FREE((void*)b);
	LDKC2Tuple_u32TxOutZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_u32TxOutZ), "LDKC2Tuple_u32TxOutZ");
	*ret_ref = C2Tuple_u32TxOutZ_new(a, b_conv);
	// XXX: We likely need to clone here, but no _clone fn is available for TxOut
	return (long)ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1u32TxOutZZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_C2Tuple_u32TxOutZZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC2Tuple_u32TxOutZ), "LDKCVec_C2Tuple_u32TxOutZZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t a = 0; a < _res_constr.datalen; a++) {
		int64_t arr_conv_26 = _res_vals[a];
		LDKC2Tuple_u32TxOutZ arr_conv_26_conv = *(LDKC2Tuple_u32TxOutZ*)arr_conv_26;
		FREE((void*)arr_conv_26);
		_res_constr.data[a] = arr_conv_26_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_C2Tuple_u32TxOutZZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ _res_conv = *(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)_res;
	FREE((void*)_res);
	C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZ_1new(JNIEnv *env, jclass clz, int8_tArray a, int64_tArray b) {
	LDKThirtyTwoBytes a_ref;
	CHECK((*env)->GetArrayLength(env, a) == 32);
	(*env)->GetByteArrayRegion(env, a, 0, 32, a_ref.data);
	LDKCVec_C2Tuple_u32TxOutZZ b_constr;
	b_constr.datalen = (*env)->GetArrayLength(env, b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKC2Tuple_u32TxOutZ), "LDKCVec_C2Tuple_u32TxOutZZ Elements");
	else
		b_constr.data = NULL;
	int64_t* b_vals = (*env)->GetLongArrayElements (env, b, NULL);
	for (size_t a = 0; a < b_constr.datalen; a++) {
		int64_t arr_conv_26 = b_vals[a];
		LDKC2Tuple_u32TxOutZ arr_conv_26_conv = *(LDKC2Tuple_u32TxOutZ*)arr_conv_26;
		FREE((void*)arr_conv_26);
		b_constr.data[a] = arr_conv_26_conv;
	}
	(*env)->ReleaseLongArrayElements(env, b, b_vals, 0);
	LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ");
	*ret_ref = C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ_new(a_ref, b_constr);
	ret_ref->a = ThirtyTwoBytes_clone(&ret_ref->a);
	// XXX: We likely need to clone here, but no _clone fn is available for TwoTuple<Integer, TxOut>[]
	return (long)ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1TxidCVec_1C2Tuple_1u32TxOutZZZZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t u = 0; u < _res_constr.datalen; u++) {
		int64_t arr_conv_46 = _res_vals[u];
		LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ arr_conv_46_conv = *(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ*)arr_conv_46;
		FREE((void*)arr_conv_46);
		_res_constr.data[u] = arr_conv_46_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1BlockHashChannelMonitorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKC2Tuple_BlockHashChannelMonitorZ _res_conv = *(LDKC2Tuple_BlockHashChannelMonitorZ*)_res;
	FREE((void*)_res);
	C2Tuple_BlockHashChannelMonitorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1BlockHashChannelMonitorZ_1new(JNIEnv *env, jclass clz, int8_tArray a, int64_t b) {
	LDKThirtyTwoBytes a_ref;
	CHECK((*env)->GetArrayLength(env, a) == 32);
	(*env)->GetByteArrayRegion(env, a, 0, 32, a_ref.data);
	LDKChannelMonitor b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we may need a move here but can't clone!
	LDKC2Tuple_BlockHashChannelMonitorZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelMonitorZ), "LDKC2Tuple_BlockHashChannelMonitorZ");
	*ret_ref = C2Tuple_BlockHashChannelMonitorZ_new(a_ref, b_conv);
	ret_ref->a = ThirtyTwoBytes_clone(&ret_ref->a);
	// XXX: We likely need to clone here, but no _clone fn is available for ChannelMonitor
	return (long)ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKC2Tuple_BlockHashChannelMonitorZ o_conv = *(LDKC2Tuple_BlockHashChannelMonitorZ*)o;
	FREE((void*)o);
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1BlockHashChannelMonitorZDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ _res_conv = *(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u64u64Z_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKC2Tuple_u64u64Z _res_conv = *(LDKC2Tuple_u64u64Z*)_res;
	FREE((void*)_res);
	C2Tuple_u64u64Z_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u64u64Z_1new(JNIEnv *env, jclass clz, int64_t a, int64_t b) {
	LDKC2Tuple_u64u64Z* ret_ref = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret_ref = C2Tuple_u64u64Z_new(a, b);
	return (long)ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1SpendableOutputDescriptorDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKSpendableOutputDescriptor o_conv = *(LDKSpendableOutputDescriptor*)o;
	FREE((void*)o);
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = CResult_SpendableOutputDescriptorDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1SpendableOutputDescriptorDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = CResult_SpendableOutputDescriptorDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1SpendableOutputDescriptorDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ _res_conv = *(LDKCResult_SpendableOutputDescriptorDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_SpendableOutputDescriptorDecodeErrorZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1SignatureZ_1free(JNIEnv *env, jclass clz, jobjectArray _res) {
	LDKCVec_SignatureZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		_res_constr.data = NULL;
	for (size_t i = 0; i < _res_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, _res, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*env)->GetArrayLength(env, arr_conv_8) == 64);
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		_res_constr.data[i] = arr_conv_8_ref;
	}
	CVec_SignatureZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1SignatureCVec_1SignatureZZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKC2Tuple_SignatureCVec_SignatureZZ _res_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)_res;
	FREE((void*)_res);
	C2Tuple_SignatureCVec_SignatureZZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1SignatureCVec_1SignatureZZ_1new(JNIEnv *env, jclass clz, int8_tArray a, jobjectArray b) {
	LDKSignature a_ref;
	CHECK((*env)->GetArrayLength(env, a) == 64);
	(*env)->GetByteArrayRegion(env, a, 0, 64, a_ref.compact_form);
	LDKCVec_SignatureZ b_constr;
	b_constr.datalen = (*env)->GetArrayLength(env, b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		b_constr.data = NULL;
	for (size_t i = 0; i < b_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, b, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*env)->GetArrayLength(env, arr_conv_8) == 64);
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		b_constr.data[i] = arr_conv_8_ref;
	}
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ), "LDKC2Tuple_SignatureCVec_SignatureZZ");
	*ret_ref = C2Tuple_SignatureCVec_SignatureZZ_new(a_ref, b_constr);
	// XXX: We likely need to clone here, but no _clone fn is available for byte[]
	// XXX: We likely need to clone here, but no _clone fn is available for byte[][]
	return (long)ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKC2Tuple_SignatureCVec_SignatureZZ o_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)o;
	FREE((void*)o);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1err(JNIEnv *env, jclass clz) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret_conv = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ _res_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)_res;
	FREE((void*)_res);
	CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1ok(JNIEnv *env, jclass clz, int8_tArray o) {
	LDKSignature o_ref;
	CHECK((*env)->GetArrayLength(env, o) == 64);
	(*env)->GetByteArrayRegion(env, o, 0, 64, o_ref.compact_form);
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = CResult_SignatureNoneZ_ok(o_ref);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1err(JNIEnv *env, jclass clz) {
	LDKCResult_SignatureNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret_conv = CResult_SignatureNoneZ_err();
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_SignatureNoneZ _res_conv = *(LDKCResult_SignatureNoneZ*)_res;
	FREE((void*)_res);
	CResult_SignatureNoneZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1ok(JNIEnv *env, jclass clz, jobjectArray o) {
	LDKCVec_SignatureZ o_constr;
	o_constr.datalen = (*env)->GetArrayLength(env, o);
	if (o_constr.datalen > 0)
		o_constr.data = MALLOC(o_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		o_constr.data = NULL;
	for (size_t i = 0; i < o_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, o, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*env)->GetArrayLength(env, arr_conv_8) == 64);
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		o_constr.data[i] = arr_conv_8_ref;
	}
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = CResult_CVec_SignatureZNoneZ_ok(o_constr);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1err(JNIEnv *env, jclass clz) {
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = CResult_CVec_SignatureZNoneZ_err();
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_CVec_SignatureZNoneZ _res_conv = *(LDKCResult_CVec_SignatureZNoneZ*)_res;
	FREE((void*)_res);
	CResult_CVec_SignatureZNoneZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ChanKeySignerDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKChannelKeys o_conv = *(LDKChannelKeys*)o;
	if (o_conv.free == LDKChannelKeys_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKChannelKeys_JCalls_clone(o_conv.this_arg);
	}
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = CResult_ChanKeySignerDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ChanKeySignerDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ChanKeySignerDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChanKeySignerDecodeErrorZ), "LDKCResult_ChanKeySignerDecodeErrorZ");
	*ret_conv = CResult_ChanKeySignerDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1ChanKeySignerDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_ChanKeySignerDecodeErrorZ _res_conv = *(LDKCResult_ChanKeySignerDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ChanKeySignerDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1InMemoryChannelKeysDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKInMemoryChannelKeys o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = InMemoryChannelKeys_clone(&o_conv);
	LDKCResult_InMemoryChannelKeysDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InMemoryChannelKeysDecodeErrorZ), "LDKCResult_InMemoryChannelKeysDecodeErrorZ");
	*ret_conv = CResult_InMemoryChannelKeysDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1InMemoryChannelKeysDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_InMemoryChannelKeysDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InMemoryChannelKeysDecodeErrorZ), "LDKCResult_InMemoryChannelKeysDecodeErrorZ");
	*ret_conv = CResult_InMemoryChannelKeysDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1InMemoryChannelKeysDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_InMemoryChannelKeysDecodeErrorZ _res_conv = *(LDKCResult_InMemoryChannelKeysDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_InMemoryChannelKeysDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1TxOutAccessErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKTxOut o_conv = *(LDKTxOut*)o;
	FREE((void*)o);
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = CResult_TxOutAccessErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1TxOutAccessErrorZ_1err(JNIEnv *env, jclass clz, jclass e) {
	LDKAccessError e_conv = LDKAccessError_from_java(env, e);
	LDKCResult_TxOutAccessErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret_conv = CResult_TxOutAccessErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1TxOutAccessErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_TxOutAccessErrorZ _res_conv = *(LDKCResult_TxOutAccessErrorZ*)_res;
	FREE((void*)_res);
	CResult_TxOutAccessErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NoneAPIErrorZ_1ok(JNIEnv *env, jclass clz) {
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = CResult_NoneAPIErrorZ_ok();
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NoneAPIErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKAPIError e_conv = *(LDKAPIError*)e;
	FREE((void*)e);
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = CResult_NoneAPIErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneAPIErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NoneAPIErrorZ _res_conv = *(LDKCResult_NoneAPIErrorZ*)_res;
	FREE((void*)_res);
	CResult_NoneAPIErrorZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1ChannelDetailsZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_ChannelDetailsZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKChannelDetails), "LDKCVec_ChannelDetailsZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t q = 0; q < _res_constr.datalen; q++) {
		int64_t arr_conv_16 = _res_vals[q];
		LDKChannelDetails arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		_res_constr.data[q] = arr_conv_16_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_ChannelDetailsZ_free(_res_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NonePaymentSendFailureZ_1ok(JNIEnv *env, jclass clz) {
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = CResult_NonePaymentSendFailureZ_ok();
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NonePaymentSendFailureZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKPaymentSendFailure e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = CResult_NonePaymentSendFailureZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NonePaymentSendFailureZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NonePaymentSendFailureZ _res_conv = *(LDKCResult_NonePaymentSendFailureZ*)_res;
	FREE((void*)_res);
	CResult_NonePaymentSendFailureZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1NetAddressZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_NetAddressZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		int64_t arr_conv_12 = _res_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		_res_constr.data[m] = arr_conv_12_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_NetAddressZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1ChannelMonitorZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_ChannelMonitorZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKChannelMonitor), "LDKCVec_ChannelMonitorZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t q = 0; q < _res_constr.datalen; q++) {
		int64_t arr_conv_16 = _res_vals[q];
		LDKChannelMonitor arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		_res_constr.data[q] = arr_conv_16_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_ChannelMonitorZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1BlockHashChannelManagerZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKC2Tuple_BlockHashChannelManagerZ _res_conv = *(LDKC2Tuple_BlockHashChannelManagerZ*)_res;
	FREE((void*)_res);
	C2Tuple_BlockHashChannelManagerZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1BlockHashChannelManagerZ_1new(JNIEnv *env, jclass clz, int8_tArray a, int64_t b) {
	LDKThirtyTwoBytes a_ref;
	CHECK((*env)->GetArrayLength(env, a) == 32);
	(*env)->GetByteArrayRegion(env, a, 0, 32, a_ref.data);
	LDKChannelManager b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	// Warning: we may need a move here but can't clone!
	LDKC2Tuple_BlockHashChannelManagerZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_BlockHashChannelManagerZ), "LDKC2Tuple_BlockHashChannelManagerZ");
	*ret_ref = C2Tuple_BlockHashChannelManagerZ_new(a_ref, b_conv);
	ret_ref->a = ThirtyTwoBytes_clone(&ret_ref->a);
	// XXX: We likely need to clone here, but no _clone fn is available for ChannelManager
	return (long)ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKC2Tuple_BlockHashChannelManagerZ o_conv = *(LDKC2Tuple_BlockHashChannelManagerZ*)o;
	FREE((void*)o);
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ");
	*ret_conv = CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1BlockHashChannelManagerZDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ _res_conv = *(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NetAddressu8Z_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKNetAddress o_conv = *(LDKNetAddress*)o;
	FREE((void*)o);
	LDKCResult_NetAddressu8Z* ret_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*ret_conv = CResult_NetAddressu8Z_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NetAddressu8Z_1err(JNIEnv *env, jclass clz, int8_t e) {
	LDKCResult_NetAddressu8Z* ret_conv = MALLOC(sizeof(LDKCResult_NetAddressu8Z), "LDKCResult_NetAddressu8Z");
	*ret_conv = CResult_NetAddressu8Z_err(e);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NetAddressu8Z_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NetAddressu8Z _res_conv = *(LDKCResult_NetAddressu8Z*)_res;
	FREE((void*)_res);
	CResult_NetAddressu8Z_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1CResult_1NetAddressu8ZDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKCResult_NetAddressu8Z o_conv = *(LDKCResult_NetAddressu8Z*)o;
	FREE((void*)o);
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ), "LDKCResult_CResult_NetAddressu8ZDecodeErrorZ");
	*ret_conv = CResult_CResult_NetAddressu8ZDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1CResult_1NetAddressu8ZDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ), "LDKCResult_CResult_NetAddressu8ZDecodeErrorZ");
	*ret_conv = CResult_CResult_NetAddressu8ZDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1CResult_1NetAddressu8ZDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ _res_conv = *(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_CResult_NetAddressu8ZDecodeErrorZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1u64Z_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_u64Z _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t g = 0; g < _res_constr.datalen; g++) {
		int64_t arr_conv_6 = _res_vals[g];
		_res_constr.data[g] = arr_conv_6;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_u64Z_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateAddHTLCZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_UpdateAddHTLCZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t p = 0; p < _res_constr.datalen; p++) {
		int64_t arr_conv_15 = _res_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		_res_constr.data[p] = arr_conv_15_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_UpdateAddHTLCZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFulfillHTLCZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_UpdateFulfillHTLCZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t t = 0; t < _res_constr.datalen; t++) {
		int64_t arr_conv_19 = _res_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		_res_constr.data[t] = arr_conv_19_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_UpdateFulfillHTLCZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFailHTLCZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_UpdateFailHTLCZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t q = 0; q < _res_constr.datalen; q++) {
		int64_t arr_conv_16 = _res_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		_res_constr.data[q] = arr_conv_16_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_UpdateFailHTLCZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFailMalformedHTLCZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_UpdateFailMalformedHTLCZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t z = 0; z < _res_constr.datalen; z++) {
		int64_t arr_conv_25 = _res_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		_res_constr.data[z] = arr_conv_25_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_UpdateFailMalformedHTLCZ_free(_res_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1boolLightningErrorZ_1ok(JNIEnv *env, jclass clz, jboolean o) {
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = CResult_boolLightningErrorZ_ok(o);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1boolLightningErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKLightningError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_boolLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret_conv = CResult_boolLightningErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1boolLightningErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_boolLightningErrorZ _res_conv = *(LDKCResult_boolLightningErrorZ*)_res;
	FREE((void*)_res);
	CResult_boolLightningErrorZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ _res_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)_res;
	FREE((void*)_res);
	C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1new(JNIEnv *env, jclass clz, int64_t a, int64_t b, int64_t c) {
	LDKChannelAnnouncement a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = ChannelAnnouncement_clone(&a_conv);
	LDKChannelUpdate b_conv;
	b_conv.inner = (void*)(b & (~1));
	b_conv.is_owned = (b & 1) || (b == 0);
	if (b_conv.inner != NULL)
		b_conv = ChannelUpdate_clone(&b_conv);
	LDKChannelUpdate c_conv;
	c_conv.inner = (void*)(c & (~1));
	c_conv.is_owned = (c & 1) || (c == 0);
	if (c_conv.inner != NULL)
		c_conv = ChannelUpdate_clone(&c_conv);
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret_ref = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
	*ret_ref = C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a_conv, b_conv, c_conv);
	ret_ref->a = ChannelAnnouncement_clone(&ret_ref->a);
	ret_ref->b = ChannelUpdate_clone(&ret_ref->b);
	ret_ref->c = ChannelUpdate_clone(&ret_ref->c);
	return (long)ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t l = 0; l < _res_constr.datalen; l++) {
		int64_t arr_conv_63 = _res_vals[l];
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_conv_63_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arr_conv_63;
		FREE((void*)arr_conv_63);
		_res_constr.data[l] = arr_conv_63_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1NodeAnnouncementZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_NodeAnnouncementZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKNodeAnnouncement), "LDKCVec_NodeAnnouncementZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t s = 0; s < _res_constr.datalen; s++) {
		int64_t arr_conv_18 = _res_vals[s];
		LDKNodeAnnouncement arr_conv_18_conv;
		arr_conv_18_conv.inner = (void*)(arr_conv_18 & (~1));
		arr_conv_18_conv.is_owned = (arr_conv_18 & 1) || (arr_conv_18 == 0);
		_res_constr.data[s] = arr_conv_18_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_NodeAnnouncementZ_free(_res_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NoneLightningErrorZ_1ok(JNIEnv *env, jclass clz) {
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = CResult_NoneLightningErrorZ_ok();
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NoneLightningErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKLightningError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = CResult_NoneLightningErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneLightningErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NoneLightningErrorZ _res_conv = *(LDKCResult_NoneLightningErrorZ*)_res;
	FREE((void*)_res);
	CResult_NoneLightningErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ChannelReestablishDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKChannelReestablish o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ChannelReestablish_clone(&o_conv);
	LDKCResult_ChannelReestablishDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelReestablishDecodeErrorZ), "LDKCResult_ChannelReestablishDecodeErrorZ");
	*ret_conv = CResult_ChannelReestablishDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ChannelReestablishDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ChannelReestablishDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelReestablishDecodeErrorZ), "LDKCResult_ChannelReestablishDecodeErrorZ");
	*ret_conv = CResult_ChannelReestablishDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1ChannelReestablishDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_ChannelReestablishDecodeErrorZ _res_conv = *(LDKCResult_ChannelReestablishDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ChannelReestablishDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1InitDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKInit o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Init_clone(&o_conv);
	LDKCResult_InitDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InitDecodeErrorZ), "LDKCResult_InitDecodeErrorZ");
	*ret_conv = CResult_InitDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1InitDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_InitDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InitDecodeErrorZ), "LDKCResult_InitDecodeErrorZ");
	*ret_conv = CResult_InitDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1InitDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_InitDecodeErrorZ _res_conv = *(LDKCResult_InitDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_InitDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1PingDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKPing o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Ping_clone(&o_conv);
	LDKCResult_PingDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PingDecodeErrorZ), "LDKCResult_PingDecodeErrorZ");
	*ret_conv = CResult_PingDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1PingDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_PingDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PingDecodeErrorZ), "LDKCResult_PingDecodeErrorZ");
	*ret_conv = CResult_PingDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1PingDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_PingDecodeErrorZ _res_conv = *(LDKCResult_PingDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_PingDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1PongDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKPong o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Pong_clone(&o_conv);
	LDKCResult_PongDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PongDecodeErrorZ), "LDKCResult_PongDecodeErrorZ");
	*ret_conv = CResult_PongDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1PongDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_PongDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PongDecodeErrorZ), "LDKCResult_PongDecodeErrorZ");
	*ret_conv = CResult_PongDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1PongDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_PongDecodeErrorZ _res_conv = *(LDKCResult_PongDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_PongDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1UnsignedChannelAnnouncementDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKUnsignedChannelAnnouncement o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = UnsignedChannelAnnouncement_clone(&o_conv);
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ), "LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1UnsignedChannelAnnouncementDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ), "LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1UnsignedChannelAnnouncementDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ _res_conv = *(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1UnsignedChannelUpdateDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKUnsignedChannelUpdate o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = UnsignedChannelUpdate_clone(&o_conv);
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelUpdateDecodeErrorZ), "LDKCResult_UnsignedChannelUpdateDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelUpdateDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1UnsignedChannelUpdateDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelUpdateDecodeErrorZ), "LDKCResult_UnsignedChannelUpdateDecodeErrorZ");
	*ret_conv = CResult_UnsignedChannelUpdateDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1UnsignedChannelUpdateDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ _res_conv = *(LDKCResult_UnsignedChannelUpdateDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_UnsignedChannelUpdateDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ErrorMessageDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKErrorMessage o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ErrorMessage_clone(&o_conv);
	LDKCResult_ErrorMessageDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ErrorMessageDecodeErrorZ), "LDKCResult_ErrorMessageDecodeErrorZ");
	*ret_conv = CResult_ErrorMessageDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ErrorMessageDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ErrorMessageDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ErrorMessageDecodeErrorZ), "LDKCResult_ErrorMessageDecodeErrorZ");
	*ret_conv = CResult_ErrorMessageDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1ErrorMessageDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_ErrorMessageDecodeErrorZ _res_conv = *(LDKCResult_ErrorMessageDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ErrorMessageDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1UnsignedNodeAnnouncementDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKUnsignedNodeAnnouncement o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = UnsignedNodeAnnouncement_clone(&o_conv);
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ), "LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1UnsignedNodeAnnouncementDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ), "LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ");
	*ret_conv = CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1UnsignedNodeAnnouncementDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ _res_conv = *(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1QueryShortChannelIdsDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKQueryShortChannelIds o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = QueryShortChannelIds_clone(&o_conv);
	LDKCResult_QueryShortChannelIdsDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryShortChannelIdsDecodeErrorZ), "LDKCResult_QueryShortChannelIdsDecodeErrorZ");
	*ret_conv = CResult_QueryShortChannelIdsDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1QueryShortChannelIdsDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_QueryShortChannelIdsDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryShortChannelIdsDecodeErrorZ), "LDKCResult_QueryShortChannelIdsDecodeErrorZ");
	*ret_conv = CResult_QueryShortChannelIdsDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1QueryShortChannelIdsDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_QueryShortChannelIdsDecodeErrorZ _res_conv = *(LDKCResult_QueryShortChannelIdsDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_QueryShortChannelIdsDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ReplyShortChannelIdsEndDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKReplyShortChannelIdsEnd o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ReplyShortChannelIdsEnd_clone(&o_conv);
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ), "LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ");
	*ret_conv = CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ReplyShortChannelIdsEndDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ), "LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ");
	*ret_conv = CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1ReplyShortChannelIdsEndDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ _res_conv = *(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1QueryChannelRangeDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKQueryChannelRange o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = QueryChannelRange_clone(&o_conv);
	LDKCResult_QueryChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryChannelRangeDecodeErrorZ), "LDKCResult_QueryChannelRangeDecodeErrorZ");
	*ret_conv = CResult_QueryChannelRangeDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1QueryChannelRangeDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_QueryChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryChannelRangeDecodeErrorZ), "LDKCResult_QueryChannelRangeDecodeErrorZ");
	*ret_conv = CResult_QueryChannelRangeDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1QueryChannelRangeDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_QueryChannelRangeDecodeErrorZ _res_conv = *(LDKCResult_QueryChannelRangeDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_QueryChannelRangeDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ReplyChannelRangeDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKReplyChannelRange o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = ReplyChannelRange_clone(&o_conv);
	LDKCResult_ReplyChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyChannelRangeDecodeErrorZ), "LDKCResult_ReplyChannelRangeDecodeErrorZ");
	*ret_conv = CResult_ReplyChannelRangeDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1ReplyChannelRangeDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_ReplyChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyChannelRangeDecodeErrorZ), "LDKCResult_ReplyChannelRangeDecodeErrorZ");
	*ret_conv = CResult_ReplyChannelRangeDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1ReplyChannelRangeDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_ReplyChannelRangeDecodeErrorZ _res_conv = *(LDKCResult_ReplyChannelRangeDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_ReplyChannelRangeDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1GossipTimestampFilterDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKGossipTimestampFilter o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = GossipTimestampFilter_clone(&o_conv);
	LDKCResult_GossipTimestampFilterDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_GossipTimestampFilterDecodeErrorZ), "LDKCResult_GossipTimestampFilterDecodeErrorZ");
	*ret_conv = CResult_GossipTimestampFilterDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1GossipTimestampFilterDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_GossipTimestampFilterDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_GossipTimestampFilterDecodeErrorZ), "LDKCResult_GossipTimestampFilterDecodeErrorZ");
	*ret_conv = CResult_GossipTimestampFilterDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1GossipTimestampFilterDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_GossipTimestampFilterDecodeErrorZ _res_conv = *(LDKCResult_GossipTimestampFilterDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_GossipTimestampFilterDecodeErrorZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1PublicKeyZ_1free(JNIEnv *env, jclass clz, jobjectArray _res) {
	LDKCVec_PublicKeyZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKPublicKey), "LDKCVec_PublicKeyZ Elements");
	else
		_res_constr.data = NULL;
	for (size_t i = 0; i < _res_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, _res, i);
		LDKPublicKey arr_conv_8_ref;
		CHECK((*env)->GetArrayLength(env, arr_conv_8) == 33);
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, 33, arr_conv_8_ref.compressed_form);
		_res_constr.data[i] = arr_conv_8_ref;
	}
	CVec_PublicKeyZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1u8Z_1free(JNIEnv *env, jclass clz, int8_tArray _res) {
	LDKCVec_u8Z _res_ref;
	_res_ref.datalen = (*env)->GetArrayLength(env, _res);
	_res_ref.data = MALLOC(_res_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, _res, 0, _res_ref.datalen, _res_ref.data);
	CVec_u8Z_free(_res_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1ok(JNIEnv *env, jclass clz, int8_tArray o) {
	LDKCVec_u8Z o_ref;
	o_ref.datalen = (*env)->GetArrayLength(env, o);
	o_ref.data = MALLOC(o_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, o, 0, o_ref.datalen, o_ref.data);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = CResult_CVec_u8ZPeerHandleErrorZ_ok(o_ref);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKPeerHandleError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = CResult_CVec_u8ZPeerHandleErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ _res_conv = *(LDKCResult_CVec_u8ZPeerHandleErrorZ*)_res;
	FREE((void*)_res);
	CResult_CVec_u8ZPeerHandleErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1ok(JNIEnv *env, jclass clz) {
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = CResult_NonePeerHandleErrorZ_ok();
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKPeerHandleError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = CResult_NonePeerHandleErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NonePeerHandleErrorZ _res_conv = *(LDKCResult_NonePeerHandleErrorZ*)_res;
	FREE((void*)_res);
	CResult_NonePeerHandleErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1ok(JNIEnv *env, jclass clz, jboolean o) {
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = CResult_boolPeerHandleErrorZ_ok(o);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKPeerHandleError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = CResult_boolPeerHandleErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_boolPeerHandleErrorZ _res_conv = *(LDKCResult_boolPeerHandleErrorZ*)_res;
	FREE((void*)_res);
	CResult_boolPeerHandleErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1SecretKeySecpErrorZ_1ok(JNIEnv *env, jclass clz, int8_tArray o) {
	LDKSecretKey o_ref;
	CHECK((*env)->GetArrayLength(env, o) == 32);
	(*env)->GetByteArrayRegion(env, o, 0, 32, o_ref.bytes);
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = CResult_SecretKeySecpErrorZ_ok(o_ref);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1SecretKeySecpErrorZ_1err(JNIEnv *env, jclass clz, jclass e) {
	LDKSecp256k1Error e_conv = LDKSecp256k1Error_from_java(env, e);
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = CResult_SecretKeySecpErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1SecretKeySecpErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_SecretKeySecpErrorZ _res_conv = *(LDKCResult_SecretKeySecpErrorZ*)_res;
	FREE((void*)_res);
	CResult_SecretKeySecpErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1PublicKeySecpErrorZ_1ok(JNIEnv *env, jclass clz, int8_tArray o) {
	LDKPublicKey o_ref;
	CHECK((*env)->GetArrayLength(env, o) == 33);
	(*env)->GetByteArrayRegion(env, o, 0, 33, o_ref.compressed_form);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = CResult_PublicKeySecpErrorZ_ok(o_ref);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1PublicKeySecpErrorZ_1err(JNIEnv *env, jclass clz, jclass e) {
	LDKSecp256k1Error e_conv = LDKSecp256k1Error_from_java(env, e);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = CResult_PublicKeySecpErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1PublicKeySecpErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_PublicKeySecpErrorZ _res_conv = *(LDKCResult_PublicKeySecpErrorZ*)_res;
	FREE((void*)_res);
	CResult_PublicKeySecpErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1TxCreationKeysSecpErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKTxCreationKeys o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = TxCreationKeys_clone(&o_conv);
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = CResult_TxCreationKeysSecpErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1TxCreationKeysSecpErrorZ_1err(JNIEnv *env, jclass clz, jclass e) {
	LDKSecp256k1Error e_conv = LDKSecp256k1Error_from_java(env, e);
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = CResult_TxCreationKeysSecpErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1TxCreationKeysSecpErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_TxCreationKeysSecpErrorZ _res_conv = *(LDKCResult_TxCreationKeysSecpErrorZ*)_res;
	FREE((void*)_res);
	CResult_TxCreationKeysSecpErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1TrustedCommitmentTransactionNoneZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKTrustedCommitmentTransaction o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_TrustedCommitmentTransactionNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_TrustedCommitmentTransactionNoneZ), "LDKCResult_TrustedCommitmentTransactionNoneZ");
	*ret_conv = CResult_TrustedCommitmentTransactionNoneZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1TrustedCommitmentTransactionNoneZ_1err(JNIEnv *env, jclass clz) {
	LDKCResult_TrustedCommitmentTransactionNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_TrustedCommitmentTransactionNoneZ), "LDKCResult_TrustedCommitmentTransactionNoneZ");
	*ret_conv = CResult_TrustedCommitmentTransactionNoneZ_err();
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1TrustedCommitmentTransactionNoneZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_TrustedCommitmentTransactionNoneZ _res_conv = *(LDKCResult_TrustedCommitmentTransactionNoneZ*)_res;
	FREE((void*)_res);
	CResult_TrustedCommitmentTransactionNoneZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1RouteHopZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_RouteHopZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t k = 0; k < _res_constr.datalen; k++) {
		int64_t arr_conv_10 = _res_vals[k];
		LDKRouteHop arr_conv_10_conv;
		arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
		arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
		_res_constr.data[k] = arr_conv_10_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_RouteHopZ_free(_res_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1CVec_1RouteHopZZ_1free(JNIEnv *env, jclass clz, jobjectArray _res) {
	LDKCVec_CVec_RouteHopZZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		_res_constr.data = NULL;
	for (size_t m = 0; m < _res_constr.datalen; m++) {
		int64_tArray arr_conv_12 = (*env)->GetObjectArrayElement(env, _res, m);
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = (*env)->GetArrayLength(env, arr_conv_12);
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		int64_t* arr_conv_12_vals = (*env)->GetLongArrayElements (env, arr_conv_12, NULL);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			int64_t arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		(*env)->ReleaseLongArrayElements(env, arr_conv_12, arr_conv_12_vals, 0);
		_res_constr.data[m] = arr_conv_12_constr;
	}
	CVec_CVec_RouteHopZZ_free(_res_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1RouteDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKRoute o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Route_clone(&o_conv);
	LDKCResult_RouteDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteDecodeErrorZ), "LDKCResult_RouteDecodeErrorZ");
	*ret_conv = CResult_RouteDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1RouteDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_RouteDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteDecodeErrorZ), "LDKCResult_RouteDecodeErrorZ");
	*ret_conv = CResult_RouteDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1RouteDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_RouteDecodeErrorZ _res_conv = *(LDKCResult_RouteDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_RouteDecodeErrorZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1RouteHintZ_1free(JNIEnv *env, jclass clz, int64_tArray _res) {
	LDKCVec_RouteHintZ _res_constr;
	_res_constr.datalen = (*env)->GetArrayLength(env, _res);
	if (_res_constr.datalen > 0)
		_res_constr.data = MALLOC(_res_constr.datalen * sizeof(LDKRouteHint), "LDKCVec_RouteHintZ Elements");
	else
		_res_constr.data = NULL;
	int64_t* _res_vals = (*env)->GetLongArrayElements (env, _res, NULL);
	for (size_t l = 0; l < _res_constr.datalen; l++) {
		int64_t arr_conv_11 = _res_vals[l];
		LDKRouteHint arr_conv_11_conv;
		arr_conv_11_conv.inner = (void*)(arr_conv_11 & (~1));
		arr_conv_11_conv.is_owned = (arr_conv_11 & 1) || (arr_conv_11 == 0);
		_res_constr.data[l] = arr_conv_11_conv;
	}
	(*env)->ReleaseLongArrayElements(env, _res, _res_vals, 0);
	CVec_RouteHintZ_free(_res_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1RouteLightningErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKRoute o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = Route_clone(&o_conv);
	LDKCResult_RouteLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret_conv = CResult_RouteLightningErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1RouteLightningErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKLightningError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_RouteLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret_conv = CResult_RouteLightningErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1RouteLightningErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_RouteLightningErrorZ _res_conv = *(LDKCResult_RouteLightningErrorZ*)_res;
	FREE((void*)_res);
	CResult_RouteLightningErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1RoutingFeesDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKRoutingFees o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	if (o_conv.inner != NULL)
		o_conv = RoutingFees_clone(&o_conv);
	LDKCResult_RoutingFeesDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RoutingFeesDecodeErrorZ), "LDKCResult_RoutingFeesDecodeErrorZ");
	*ret_conv = CResult_RoutingFeesDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1RoutingFeesDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_RoutingFeesDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RoutingFeesDecodeErrorZ), "LDKCResult_RoutingFeesDecodeErrorZ");
	*ret_conv = CResult_RoutingFeesDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1RoutingFeesDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_RoutingFeesDecodeErrorZ _res_conv = *(LDKCResult_RoutingFeesDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_RoutingFeesDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NodeAnnouncementInfoDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKNodeAnnouncementInfo o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = CResult_NodeAnnouncementInfoDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NodeAnnouncementInfoDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = CResult_NodeAnnouncementInfoDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NodeAnnouncementInfoDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ _res_conv = *(LDKCResult_NodeAnnouncementInfoDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_NodeAnnouncementInfoDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NodeInfoDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKNodeInfo o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = CResult_NodeInfoDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NodeInfoDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = CResult_NodeInfoDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NodeInfoDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NodeInfoDecodeErrorZ _res_conv = *(LDKCResult_NodeInfoDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_NodeInfoDecodeErrorZ_free(_res_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NetworkGraphDecodeErrorZ_1ok(JNIEnv *env, jclass clz, int64_t o) {
	LDKNetworkGraph o_conv;
	o_conv.inner = (void*)(o & (~1));
	o_conv.is_owned = (o & 1) || (o == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NetworkGraphDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NetworkGraphDecodeErrorZ), "LDKCResult_NetworkGraphDecodeErrorZ");
	*ret_conv = CResult_NetworkGraphDecodeErrorZ_ok(o_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CResult_1NetworkGraphDecodeErrorZ_1err(JNIEnv *env, jclass clz, int64_t e) {
	LDKDecodeError e_conv;
	e_conv.inner = (void*)(e & (~1));
	e_conv.is_owned = (e & 1) || (e == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_NetworkGraphDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NetworkGraphDecodeErrorZ), "LDKCResult_NetworkGraphDecodeErrorZ");
	*ret_conv = CResult_NetworkGraphDecodeErrorZ_err(e_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NetworkGraphDecodeErrorZ_1free(JNIEnv *env, jclass clz, int64_t _res) {
	LDKCResult_NetworkGraphDecodeErrorZ _res_conv = *(LDKCResult_NetworkGraphDecodeErrorZ*)_res;
	FREE((void*)_res);
	CResult_NetworkGraphDecodeErrorZ_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Event_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKEvent this_ptr_conv = *(LDKEvent*)this_ptr;
	FREE((void*)this_ptr);
	Event_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Event_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKEvent* orig_conv = (LDKEvent*)orig;
	LDKEvent *ret_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
	*ret_copy = Event_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_Event_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKEvent* obj_conv = (LDKEvent*)obj;
	LDKCVec_u8Z arg_var = Event_write(obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageSendEvent_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKMessageSendEvent this_ptr_conv = *(LDKMessageSendEvent*)this_ptr;
	FREE((void*)this_ptr);
	MessageSendEvent_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_MessageSendEvent_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKMessageSendEvent* orig_conv = (LDKMessageSendEvent*)orig;
	LDKMessageSendEvent *ret_copy = MALLOC(sizeof(LDKMessageSendEvent), "LDKMessageSendEvent");
	*ret_copy = MessageSendEvent_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageSendEventsProvider_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKMessageSendEventsProvider this_ptr_conv = *(LDKMessageSendEventsProvider*)this_ptr;
	FREE((void*)this_ptr);
	MessageSendEventsProvider_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_EventsProvider_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKEventsProvider this_ptr_conv = *(LDKEventsProvider*)this_ptr;
	FREE((void*)this_ptr);
	EventsProvider_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_APIError_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAPIError this_ptr_conv = *(LDKAPIError*)this_ptr;
	FREE((void*)this_ptr);
	APIError_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_APIError_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKAPIError* orig_conv = (LDKAPIError*)orig;
	LDKAPIError *ret_copy = MALLOC(sizeof(LDKAPIError), "LDKAPIError");
	*ret_copy = APIError_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_Level_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKLevel* orig_conv = (LDKLevel*)orig;
	jclass ret_conv = LDKLevel_to_java(env, Level_clone(orig_conv));
	return ret_conv;
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_Level_1max(JNIEnv *env, jclass clz) {
	jclass ret_conv = LDKLevel_to_java(env, Level_max());
	return ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Logger_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKLogger this_ptr_conv = *(LDKLogger*)this_ptr;
	FREE((void*)this_ptr);
	Logger_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeConfig_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelHandshakeConfig orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelHandshakeConfig ret_var = ChannelHandshakeConfig_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1get_1minimum_1depth(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ChannelHandshakeConfig_get_minimum_depth(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1set_1minimum_1depth(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeConfig_set_minimum_depth(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1get_1our_1to_1self_1delay(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelHandshakeConfig_get_our_to_self_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1set_1our_1to_1self_1delay(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeConfig_set_our_to_self_delay(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1get_1our_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeConfig_get_our_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1set_1our_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeConfig_set_our_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1new(JNIEnv *env, jclass clz, int32_t minimum_depth_arg, int16_t our_to_self_delay_arg, int64_t our_htlc_minimum_msat_arg) {
	LDKChannelHandshakeConfig ret_var = ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1default(JNIEnv *env, jclass clz) {
	LDKChannelHandshakeConfig ret_var = ChannelHandshakeConfig_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelHandshakeLimits orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelHandshakeLimits ret_var = ChannelHandshakeLimits_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1funding_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_min_funding_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1funding_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_funding_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_max_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1max_1htlc_1value_1in_1flight_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1max_1htlc_1value_1in_1flight_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1channel_1reserve_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_max_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1channel_1reserve_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_channel_reserve_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1max_1accepted_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelHandshakeLimits_get_min_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1max_1accepted_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_max_accepted_htlcs(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1dust_1limit_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_min_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1dust_1limit_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_min_dust_limit_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1dust_1limit_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelHandshakeLimits_get_max_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1dust_1limit_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_dust_limit_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1minimum_1depth(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ChannelHandshakeLimits_get_max_minimum_depth(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1minimum_1depth(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_max_minimum_depth(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1force_1announced_1channel_1preference(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelHandshakeLimits_get_force_announced_channel_preference(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1force_1announced_1channel_1preference(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_force_announced_channel_preference(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1their_1to_1self_1delay(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelHandshakeLimits_get_their_to_self_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1their_1to_1self_1delay(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelHandshakeLimits_set_their_to_self_delay(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1new(JNIEnv *env, jclass clz, int64_t min_funding_satoshis_arg, int64_t max_htlc_minimum_msat_arg, int64_t min_max_htlc_value_in_flight_msat_arg, int64_t max_channel_reserve_satoshis_arg, int16_t min_max_accepted_htlcs_arg, int64_t min_dust_limit_satoshis_arg, int64_t max_dust_limit_satoshis_arg, int32_t max_minimum_depth_arg, jboolean force_announced_channel_preference_arg, int16_t their_to_self_delay_arg) {
	LDKChannelHandshakeLimits ret_var = ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1default(JNIEnv *env, jclass clz) {
	LDKChannelHandshakeLimits ret_var = ChannelHandshakeLimits_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelConfig_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelConfig orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelConfig ret_var = ChannelConfig_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1get_1fee_1proportional_1millionths(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ChannelConfig_get_fee_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1set_1fee_1proportional_1millionths(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelConfig_set_fee_proportional_millionths(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1get_1announced_1channel(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelConfig_get_announced_channel(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1set_1announced_1channel(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelConfig_set_announced_channel(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1get_1commit_1upfront_1shutdown_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelConfig_get_commit_upfront_shutdown_pubkey(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1set_1commit_1upfront_1shutdown_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelConfig_set_commit_upfront_shutdown_pubkey(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1new(JNIEnv *env, jclass clz, int32_t fee_proportional_millionths_arg, jboolean announced_channel_arg, jboolean commit_upfront_shutdown_pubkey_arg) {
	LDKChannelConfig ret_var = ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1default(JNIEnv *env, jclass clz) {
	LDKChannelConfig ret_var = ChannelConfig_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelConfig obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelConfig_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKChannelConfig ret_var = ChannelConfig_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UserConfig_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UserConfig_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKUserConfig orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUserConfig ret_var = UserConfig_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1own_1channel_1config(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeConfig ret_var = UserConfig_get_own_channel_config(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1own_1channel_1config(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelHandshakeConfig_clone(&val_conv);
	UserConfig_set_own_channel_config(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1peer_1channel_1config_1limits(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeLimits ret_var = UserConfig_get_peer_channel_config_limits(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1peer_1channel_1config_1limits(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelHandshakeLimits val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelHandshakeLimits_clone(&val_conv);
	UserConfig_set_peer_channel_config_limits(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1channel_1options(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelConfig ret_var = UserConfig_get_channel_options(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1channel_1options(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelConfig_clone(&val_conv);
	UserConfig_set_channel_options(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UserConfig_1new(JNIEnv *env, jclass clz, int64_t own_channel_config_arg, int64_t peer_channel_config_limits_arg, int64_t channel_options_arg) {
	LDKChannelHandshakeConfig own_channel_config_arg_conv;
	own_channel_config_arg_conv.inner = (void*)(own_channel_config_arg & (~1));
	own_channel_config_arg_conv.is_owned = (own_channel_config_arg & 1) || (own_channel_config_arg == 0);
	if (own_channel_config_arg_conv.inner != NULL)
		own_channel_config_arg_conv = ChannelHandshakeConfig_clone(&own_channel_config_arg_conv);
	LDKChannelHandshakeLimits peer_channel_config_limits_arg_conv;
	peer_channel_config_limits_arg_conv.inner = (void*)(peer_channel_config_limits_arg & (~1));
	peer_channel_config_limits_arg_conv.is_owned = (peer_channel_config_limits_arg & 1) || (peer_channel_config_limits_arg == 0);
	if (peer_channel_config_limits_arg_conv.inner != NULL)
		peer_channel_config_limits_arg_conv = ChannelHandshakeLimits_clone(&peer_channel_config_limits_arg_conv);
	LDKChannelConfig channel_options_arg_conv;
	channel_options_arg_conv.inner = (void*)(channel_options_arg & (~1));
	channel_options_arg_conv.is_owned = (channel_options_arg & 1) || (channel_options_arg == 0);
	if (channel_options_arg_conv.inner != NULL)
		channel_options_arg_conv = ChannelConfig_clone(&channel_options_arg_conv);
	LDKUserConfig ret_var = UserConfig_new(own_channel_config_arg_conv, peer_channel_config_limits_arg_conv, channel_options_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UserConfig_1default(JNIEnv *env, jclass clz) {
	LDKUserConfig ret_var = UserConfig_default();
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_AccessError_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKAccessError* orig_conv = (LDKAccessError*)orig;
	jclass ret_conv = LDKAccessError_to_java(env, AccessError_clone(orig_conv));
	return ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Access_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAccess this_ptr_conv = *(LDKAccess*)this_ptr;
	FREE((void*)this_ptr);
	Access_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Watch_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKWatch this_ptr_conv = *(LDKWatch*)this_ptr;
	FREE((void*)this_ptr);
	Watch_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Filter_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFilter this_ptr_conv = *(LDKFilter*)this_ptr;
	FREE((void*)this_ptr);
	Filter_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BroadcasterInterface_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKBroadcasterInterface this_ptr_conv = *(LDKBroadcasterInterface*)this_ptr;
	FREE((void*)this_ptr);
	BroadcasterInterface_free(this_ptr_conv);
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_ConfirmationTarget_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKConfirmationTarget* orig_conv = (LDKConfirmationTarget*)orig;
	jclass ret_conv = LDKConfirmationTarget_to_java(env, ConfirmationTarget_clone(orig_conv));
	return ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FeeEstimator_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFeeEstimator this_ptr_conv = *(LDKFeeEstimator*)this_ptr;
	FREE((void*)this_ptr);
	FeeEstimator_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChainMonitor this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChainMonitor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1block_1connected(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray header, int64_tArray txdata, int32_t height) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK((*env)->GetArrayLength(env, header) == 80);
	(*env)->GetByteArrayRegion(env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = (*env)->GetArrayLength(env, txdata);
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	int64_t* txdata_vals = (*env)->GetLongArrayElements (env, txdata, NULL);
	for (size_t y = 0; y < txdata_constr.datalen; y++) {
		int64_t arr_conv_24 = txdata_vals[y];
		LDKC2Tuple_usizeTransactionZ arr_conv_24_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_24;
		FREE((void*)arr_conv_24);
		txdata_constr.data[y] = arr_conv_24_conv;
	}
	(*env)->ReleaseLongArrayElements(env, txdata, txdata_vals, 0);
	ChainMonitor_block_connected(&this_arg_conv, header_ref, txdata_constr, height);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1block_1disconnected(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray header, int32_t disconnected_height) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK((*env)->GetArrayLength(env, header) == 80);
	(*env)->GetByteArrayRegion(env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	ChainMonitor_block_disconnected(&this_arg_conv, header_ref, disconnected_height);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1new(JNIEnv *env, jclass clz, int64_t chain_source, int64_t broadcaster, int64_t logger, int64_t feeest, int64_t persister) {
	LDKFilter* chain_source_conv = (LDKFilter*)chain_source;
	LDKBroadcasterInterface broadcaster_conv = *(LDKBroadcasterInterface*)broadcaster;
	if (broadcaster_conv.free == LDKBroadcasterInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKBroadcasterInterface_JCalls_clone(broadcaster_conv.this_arg);
	}
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKFeeEstimator feeest_conv = *(LDKFeeEstimator*)feeest;
	if (feeest_conv.free == LDKFeeEstimator_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKFeeEstimator_JCalls_clone(feeest_conv.this_arg);
	}
	LDKPersist persister_conv = *(LDKPersist*)persister;
	if (persister_conv.free == LDKPersist_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKPersist_JCalls_clone(persister_conv.this_arg);
	}
	LDKChainMonitor ret_var = ChainMonitor_new(chain_source_conv, broadcaster_conv, logger_conv, feeest_conv, persister_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1as_1Watch(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKWatch* ret = MALLOC(sizeof(LDKWatch), "LDKWatch");
	*ret = ChainMonitor_as_Watch(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1as_1EventsProvider(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChainMonitor_as_EventsProvider(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelMonitorUpdate_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelMonitorUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelMonitorUpdate ret_var = ChannelMonitorUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1get_1update_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelMonitorUpdate_get_update_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1set_1update_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelMonitorUpdate_set_update_id(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelMonitorUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelMonitorUpdate_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_ChannelMonitorUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelMonitorUpdateDecodeErrorZ), "LDKCResult_ChannelMonitorUpdateDecodeErrorZ");
	*ret_conv = ChannelMonitorUpdate_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdateErr_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelMonitorUpdateErr* orig_conv = (LDKChannelMonitorUpdateErr*)orig;
	jclass ret_conv = LDKChannelMonitorUpdateErr_to_java(env, ChannelMonitorUpdateErr_clone(orig_conv));
	return ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MonitorUpdateError_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKMonitorUpdateError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MonitorUpdateError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MonitorEvent_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKMonitorEvent this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MonitorEvent_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_MonitorEvent_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKMonitorEvent orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKMonitorEvent ret_var = MonitorEvent_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKHTLCUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCUpdate_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKHTLCUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKHTLCUpdate ret_var = HTLCUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKHTLCUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = HTLCUpdate_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKHTLCUpdate ret_var = HTLCUpdate_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelMonitor this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelMonitor_free(this_ptr_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelMonitor obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelMonitor_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1update_1monitor(JNIEnv *env, jclass clz, int64_t this_arg, int64_t updates, int64_t broadcaster, int64_t fee_estimator, int64_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelMonitorUpdate updates_conv;
	updates_conv.inner = (void*)(updates & (~1));
	updates_conv.is_owned = false;
	LDKBroadcasterInterface* broadcaster_conv = (LDKBroadcasterInterface*)broadcaster;
	LDKFeeEstimator* fee_estimator_conv = (LDKFeeEstimator*)fee_estimator;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCResult_NoneMonitorUpdateErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret_conv = ChannelMonitor_update_monitor(&this_arg_conv, &updates_conv, broadcaster_conv, fee_estimator_conv, logger_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1latest_1update_1id(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = ChannelMonitor_get_latest_update_id(&this_arg_conv);
	return ret_val;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1funding_1txo(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKC2Tuple_OutPointScriptZ* ret_ref = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret_ref = ChannelMonitor_get_funding_txo(&this_arg_conv);
	ret_ref->a = OutPoint_clone(&ret_ref->a);
	ret_ref->b = CVec_u8Z_clone(&ret_ref->b);
	return (long)ret_ref;
}

JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1and_1clear_1pending_1monitor_1events(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_MonitorEventZ ret_var = ChannelMonitor_get_and_clear_pending_monitor_events(&this_arg_conv);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t o = 0; o < ret_var.datalen; o++) {
		LDKMonitorEvent arr_conv_14_var = ret_var.data[o];
		CHECK((((long)arr_conv_14_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_14_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_14_ref = (long)arr_conv_14_var.inner;
		if (arr_conv_14_var.is_owned) {
			arr_conv_14_ref |= 1;
		}
		ret_arr_ptr[o] = arr_conv_14_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1and_1clear_1pending_1events(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_EventZ ret_var = ChannelMonitor_get_and_clear_pending_events(&this_arg_conv);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t h = 0; h < ret_var.datalen; h++) {
		LDKEvent *arr_conv_7_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
		*arr_conv_7_copy = Event_clone(&ret_var.data[h]);
		long arr_conv_7_ref = (long)arr_conv_7_copy;
		ret_arr_ptr[h] = arr_conv_7_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT jobjectArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1latest_1holder_1commitment_1txn(JNIEnv *env, jclass clz, int64_t this_arg, int64_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCVec_TransactionZ ret_var = ChannelMonitor_get_latest_holder_commitment_txn(&this_arg_conv, logger_conv);
	jobjectArray ret_arr = (*env)->NewObjectArray(env, ret_var.datalen, arr_of_B_clz, NULL);
	;
	for (size_t i = 0; i < ret_var.datalen; i++) {
		LDKTransaction arr_conv_8_var = ret_var.data[i];
		int8_tArray arr_conv_8_arr = (*env)->NewByteArray(env, arr_conv_8_var.datalen);
		(*env)->SetByteArrayRegion(env, arr_conv_8_arr, 0, arr_conv_8_var.datalen, arr_conv_8_var.data);
		Transaction_free(arr_conv_8_var);
		(*env)->SetObjectArrayElement(env, ret_arr, i, arr_conv_8_arr);
	}
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1block_1connected(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray header, int64_tArray txdata, int32_t height, int64_t broadcaster, int64_t fee_estimator, int64_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK((*env)->GetArrayLength(env, header) == 80);
	(*env)->GetByteArrayRegion(env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = (*env)->GetArrayLength(env, txdata);
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	int64_t* txdata_vals = (*env)->GetLongArrayElements (env, txdata, NULL);
	for (size_t y = 0; y < txdata_constr.datalen; y++) {
		int64_t arr_conv_24 = txdata_vals[y];
		LDKC2Tuple_usizeTransactionZ arr_conv_24_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_24;
		FREE((void*)arr_conv_24);
		txdata_constr.data[y] = arr_conv_24_conv;
	}
	(*env)->ReleaseLongArrayElements(env, txdata, txdata_vals, 0);
	LDKBroadcasterInterface broadcaster_conv = *(LDKBroadcasterInterface*)broadcaster;
	if (broadcaster_conv.free == LDKBroadcasterInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKBroadcasterInterface_JCalls_clone(broadcaster_conv.this_arg);
	}
	LDKFeeEstimator fee_estimator_conv = *(LDKFeeEstimator*)fee_estimator;
	if (fee_estimator_conv.free == LDKFeeEstimator_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKFeeEstimator_JCalls_clone(fee_estimator_conv.this_arg);
	}
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKCVec_C2Tuple_TxidCVec_C2Tuple_u32TxOutZZZZ ret_var = ChannelMonitor_block_connected(&this_arg_conv, header_ref, txdata_constr, height, broadcaster_conv, fee_estimator_conv, logger_conv);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t u = 0; u < ret_var.datalen; u++) {
		LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ* arr_conv_46_ref = MALLOC(sizeof(LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ), "LDKC2Tuple_TxidCVec_C2Tuple_u32TxOutZZZ");
		*arr_conv_46_ref = ret_var.data[u];
		arr_conv_46_ref->a = ThirtyTwoBytes_clone(&arr_conv_46_ref->a);
		// XXX: We likely need to clone here, but no _clone fn is available for TwoTuple<Integer, TxOut>[]
		ret_arr_ptr[u] = (long)arr_conv_46_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1block_1disconnected(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray header, int32_t height, int64_t broadcaster, int64_t fee_estimator, int64_t logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK((*env)->GetArrayLength(env, header) == 80);
	(*env)->GetByteArrayRegion(env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKBroadcasterInterface broadcaster_conv = *(LDKBroadcasterInterface*)broadcaster;
	if (broadcaster_conv.free == LDKBroadcasterInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKBroadcasterInterface_JCalls_clone(broadcaster_conv.this_arg);
	}
	LDKFeeEstimator fee_estimator_conv = *(LDKFeeEstimator*)fee_estimator;
	if (fee_estimator_conv.free == LDKFeeEstimator_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKFeeEstimator_JCalls_clone(fee_estimator_conv.this_arg);
	}
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	ChannelMonitor_block_disconnected(&this_arg_conv, header_ref, height, broadcaster_conv, fee_estimator_conv, logger_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Persist_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPersist this_ptr_conv = *(LDKPersist*)this_ptr;
	FREE((void*)this_ptr);
	Persist_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1BlockHashChannelMonitorZ_1read(JNIEnv *env, jclass clz, int8_tArray ser, int64_t arg) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKKeysInterface* arg_conv = (LDKKeysInterface*)arg;
	LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ");
	*ret_conv = C2Tuple_BlockHashChannelMonitorZ_read(ser_ref, arg_conv);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OutPoint_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OutPoint_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKOutPoint orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKOutPoint ret_var = OutPoint_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OutPoint_1get_1txid(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *OutPoint_get_txid(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1set_1txid(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	OutPoint_set_txid(&this_ptr_conv, val_ref);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_OutPoint_1get_1index(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = OutPoint_get_index(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1set_1index(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OutPoint_set_index(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OutPoint_1new(JNIEnv *env, jclass clz, int8_tArray txid_arg, int16_t index_arg) {
	LDKThirtyTwoBytes txid_arg_ref;
	CHECK((*env)->GetArrayLength(env, txid_arg) == 32);
	(*env)->GetByteArrayRegion(env, txid_arg, 0, 32, txid_arg_ref.data);
	LDKOutPoint ret_var = OutPoint_new(txid_arg_ref, index_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OutPoint_1to_1channel_1id(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKOutPoint this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 32, OutPoint_to_channel_id(&this_arg_conv).data);
	return arg_arr;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OutPoint_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKOutPoint obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = OutPoint_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OutPoint_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKOutPoint ret_var = OutPoint_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SpendableOutputDescriptor_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKSpendableOutputDescriptor this_ptr_conv = *(LDKSpendableOutputDescriptor*)this_ptr;
	FREE((void*)this_ptr);
	SpendableOutputDescriptor_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_SpendableOutputDescriptor_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKSpendableOutputDescriptor* orig_conv = (LDKSpendableOutputDescriptor*)orig;
	LDKSpendableOutputDescriptor *ret_copy = MALLOC(sizeof(LDKSpendableOutputDescriptor), "LDKSpendableOutputDescriptor");
	*ret_copy = SpendableOutputDescriptor_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_SpendableOutputDescriptor_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKSpendableOutputDescriptor* obj_conv = (LDKSpendableOutputDescriptor*)obj;
	LDKCVec_u8Z arg_var = SpendableOutputDescriptor_write(obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_SpendableOutputDescriptor_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_SpendableOutputDescriptorDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SpendableOutputDescriptorDecodeErrorZ), "LDKCResult_SpendableOutputDescriptorDecodeErrorZ");
	*ret_conv = SpendableOutputDescriptor_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelKeys* orig_conv = (LDKChannelKeys*)orig;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = ChannelKeys_clone(orig_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelKeys this_ptr_conv = *(LDKChannelKeys*)this_ptr;
	FREE((void*)this_ptr);
	ChannelKeys_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_KeysInterface_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKKeysInterface this_ptr_conv = *(LDKKeysInterface*)this_ptr;
	FREE((void*)this_ptr);
	KeysInterface_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	InMemoryChannelKeys_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKInMemoryChannelKeys orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKInMemoryChannelKeys ret_var = InMemoryChannelKeys_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1funding_1key(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *InMemoryChannelKeys_get_funding_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1funding_1key(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_funding_key(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1revocation_1base_1key(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *InMemoryChannelKeys_get_revocation_base_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1revocation_1base_1key(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_revocation_base_key(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1payment_1key(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *InMemoryChannelKeys_get_payment_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1payment_1key(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_payment_key(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1delayed_1payment_1base_1key(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *InMemoryChannelKeys_get_delayed_payment_base_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1delayed_1payment_1base_1key(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_delayed_payment_base_key(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1htlc_1base_1key(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *InMemoryChannelKeys_get_htlc_base_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1htlc_1base_1key(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSecretKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_htlc_base_key(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1commitment_1seed(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *InMemoryChannelKeys_get_commitment_seed(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1commitment_1seed(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	InMemoryChannelKeys_set_commitment_seed(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1new(JNIEnv *env, jclass clz, int8_tArray funding_key, int8_tArray revocation_base_key, int8_tArray payment_key, int8_tArray delayed_payment_base_key, int8_tArray htlc_base_key, int8_tArray commitment_seed, int64_t channel_value_satoshis, int64_t key_derivation_params) {
	LDKSecretKey funding_key_ref;
	CHECK((*env)->GetArrayLength(env, funding_key) == 32);
	(*env)->GetByteArrayRegion(env, funding_key, 0, 32, funding_key_ref.bytes);
	LDKSecretKey revocation_base_key_ref;
	CHECK((*env)->GetArrayLength(env, revocation_base_key) == 32);
	(*env)->GetByteArrayRegion(env, revocation_base_key, 0, 32, revocation_base_key_ref.bytes);
	LDKSecretKey payment_key_ref;
	CHECK((*env)->GetArrayLength(env, payment_key) == 32);
	(*env)->GetByteArrayRegion(env, payment_key, 0, 32, payment_key_ref.bytes);
	LDKSecretKey delayed_payment_base_key_ref;
	CHECK((*env)->GetArrayLength(env, delayed_payment_base_key) == 32);
	(*env)->GetByteArrayRegion(env, delayed_payment_base_key, 0, 32, delayed_payment_base_key_ref.bytes);
	LDKSecretKey htlc_base_key_ref;
	CHECK((*env)->GetArrayLength(env, htlc_base_key) == 32);
	(*env)->GetByteArrayRegion(env, htlc_base_key, 0, 32, htlc_base_key_ref.bytes);
	LDKThirtyTwoBytes commitment_seed_ref;
	CHECK((*env)->GetArrayLength(env, commitment_seed) == 32);
	(*env)->GetByteArrayRegion(env, commitment_seed, 0, 32, commitment_seed_ref.data);
	LDKC2Tuple_u64u64Z key_derivation_params_conv = *(LDKC2Tuple_u64u64Z*)key_derivation_params;
	FREE((void*)key_derivation_params);
	LDKInMemoryChannelKeys ret_var = InMemoryChannelKeys_new(funding_key_ref, revocation_base_key_ref, payment_key_ref, delayed_payment_base_key_ref, htlc_base_key_ref, commitment_seed_ref, channel_value_satoshis, key_derivation_params_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1counterparty_1pubkeys(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = InMemoryChannelKeys_counterparty_pubkeys(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1counterparty_1selected_1contest_1delay(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int16_t ret_val = InMemoryChannelKeys_counterparty_selected_contest_delay(&this_arg_conv);
	return ret_val;
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1holder_1selected_1contest_1delay(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int16_t ret_val = InMemoryChannelKeys_holder_selected_contest_delay(&this_arg_conv);
	return ret_val;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1is_1outbound(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	jboolean ret_val = InMemoryChannelKeys_is_outbound(&this_arg_conv);
	return ret_val;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1funding_1outpoint(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKOutPoint ret_var = InMemoryChannelKeys_funding_outpoint(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1channel_1parameters(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelTransactionParameters ret_var = InMemoryChannelKeys_get_channel_parameters(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1as_1ChannelKeys(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = InMemoryChannelKeys_as_ChannelKeys(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKInMemoryChannelKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = InMemoryChannelKeys_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_InMemoryChannelKeysDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InMemoryChannelKeysDecodeErrorZ), "LDKCResult_InMemoryChannelKeysDecodeErrorZ");
	*ret_conv = InMemoryChannelKeys_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_KeysManager_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKKeysManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	KeysManager_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_KeysManager_1new(JNIEnv *env, jclass clz, int8_tArray seed, jclass network, int64_t starting_time_secs, int32_t starting_time_nanos) {
	unsigned char seed_arr[32];
	CHECK((*env)->GetArrayLength(env, seed) == 32);
	(*env)->GetByteArrayRegion(env, seed, 0, 32, seed_arr);
	unsigned char (*seed_ref)[32] = &seed_arr;
	LDKNetwork network_conv = LDKNetwork_from_java(env, network);
	LDKKeysManager ret_var = KeysManager_new(seed_ref, network_conv, starting_time_secs, starting_time_nanos);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_KeysManager_1derive_1channel_1keys(JNIEnv *env, jclass clz, int64_t this_arg, int64_t channel_value_satoshis, int64_t params_1, int64_t params_2) {
	LDKKeysManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKInMemoryChannelKeys ret_var = KeysManager_derive_channel_keys(&this_arg_conv, channel_value_satoshis, params_1, params_2);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_KeysManager_1as_1KeysInterface(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKKeysManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKKeysInterface* ret = MALLOC(sizeof(LDKKeysInterface), "LDKKeysInterface");
	*ret = KeysManager_as_KeysInterface(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelManager_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelDetails_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelDetails orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelDetails ret_var = ChannelDetails_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *ChannelDetails_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	ChannelDetails_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1remote_1network_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, ChannelDetails_get_remote_network_id(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1remote_1network_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	ChannelDetails_set_remote_network_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1counterparty_1features(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKInitFeatures ret_var = ChannelDetails_get_counterparty_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1counterparty_1features(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKInitFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelDetails_set_counterparty_features(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1channel_1value_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_channel_value_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1channel_1value_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_channel_value_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1user_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_user_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1user_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_user_id(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1outbound_1capacity_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_outbound_capacity_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1outbound_1capacity_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_outbound_capacity_msat(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1inbound_1capacity_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelDetails_get_inbound_capacity_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1inbound_1capacity_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_inbound_capacity_msat(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1is_1live(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelDetails_get_is_live(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1is_1live(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelDetails_set_is_live(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PaymentSendFailure_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPaymentSendFailure this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PaymentSendFailure_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManager_1new(JNIEnv *env, jclass clz, jclass network, int64_t fee_est, int64_t chain_monitor, int64_t tx_broadcaster, int64_t logger, int64_t keys_manager, int64_t config, intptr_t current_blockchain_height) {
	LDKNetwork network_conv = LDKNetwork_from_java(env, network);
	LDKFeeEstimator fee_est_conv = *(LDKFeeEstimator*)fee_est;
	if (fee_est_conv.free == LDKFeeEstimator_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKFeeEstimator_JCalls_clone(fee_est_conv.this_arg);
	}
	LDKWatch chain_monitor_conv = *(LDKWatch*)chain_monitor;
	if (chain_monitor_conv.free == LDKWatch_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKWatch_JCalls_clone(chain_monitor_conv.this_arg);
	}
	LDKBroadcasterInterface tx_broadcaster_conv = *(LDKBroadcasterInterface*)tx_broadcaster;
	if (tx_broadcaster_conv.free == LDKBroadcasterInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKBroadcasterInterface_JCalls_clone(tx_broadcaster_conv.this_arg);
	}
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKKeysInterface keys_manager_conv = *(LDKKeysInterface*)keys_manager;
	if (keys_manager_conv.free == LDKKeysInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKKeysInterface_JCalls_clone(keys_manager_conv.this_arg);
	}
	LDKUserConfig config_conv;
	config_conv.inner = (void*)(config & (~1));
	config_conv.is_owned = (config & 1) || (config == 0);
	if (config_conv.inner != NULL)
		config_conv = UserConfig_clone(&config_conv);
	LDKChannelManager ret_var = ChannelManager_new(network_conv, fee_est_conv, chain_monitor_conv, tx_broadcaster_conv, logger_conv, keys_manager_conv, config_conv, current_blockchain_height);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManager_1create_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_network_key, int64_t channel_value_satoshis, int64_t push_msat, int64_t user_id, int64_t override_config) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKPublicKey their_network_key_ref;
	CHECK((*env)->GetArrayLength(env, their_network_key) == 33);
	(*env)->GetByteArrayRegion(env, their_network_key, 0, 33, their_network_key_ref.compressed_form);
	LDKUserConfig override_config_conv;
	override_config_conv.inner = (void*)(override_config & (~1));
	override_config_conv.is_owned = (override_config & 1) || (override_config == 0);
	if (override_config_conv.inner != NULL)
		override_config_conv = UserConfig_clone(&override_config_conv);
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = ChannelManager_create_channel(&this_arg_conv, their_network_key_ref, channel_value_satoshis, push_msat, user_id, override_config_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_ChannelManager_1list_1channels(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_ChannelDetailsZ ret_var = ChannelManager_list_channels(&this_arg_conv);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t q = 0; q < ret_var.datalen; q++) {
		LDKChannelDetails arr_conv_16_var = ret_var.data[q];
		CHECK((((long)arr_conv_16_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_16_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_16_ref = (long)arr_conv_16_var.inner;
		if (arr_conv_16_var.is_owned) {
			arr_conv_16_ref |= 1;
		}
		ret_arr_ptr[q] = arr_conv_16_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT int64_tArray JNICALL Java_org_ldk_impl_bindings_ChannelManager_1list_1usable_1channels(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_ChannelDetailsZ ret_var = ChannelManager_list_usable_channels(&this_arg_conv);
	int64_tArray ret_arr = (*env)->NewLongArray(env, ret_var.datalen);
	int64_t *ret_arr_ptr = (*env)->GetPrimitiveArrayCritical(env, ret_arr, NULL);
	for (size_t q = 0; q < ret_var.datalen; q++) {
		LDKChannelDetails arr_conv_16_var = ret_var.data[q];
		CHECK((((long)arr_conv_16_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_16_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_16_ref = (long)arr_conv_16_var.inner;
		if (arr_conv_16_var.is_owned) {
			arr_conv_16_ref |= 1;
		}
		ret_arr_ptr[q] = arr_conv_16_ref;
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManager_1close_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray channel_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char channel_id_arr[32];
	CHECK((*env)->GetArrayLength(env, channel_id) == 32);
	(*env)->GetByteArrayRegion(env, channel_id, 0, 32, channel_id_arr);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	LDKCResult_NoneAPIErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret_conv = ChannelManager_close_channel(&this_arg_conv, channel_id_ref);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1force_1close_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray channel_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char channel_id_arr[32];
	CHECK((*env)->GetArrayLength(env, channel_id) == 32);
	(*env)->GetByteArrayRegion(env, channel_id, 0, 32, channel_id_arr);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	ChannelManager_force_close_channel(&this_arg_conv, channel_id_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1force_1close_1all_1channels(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	ChannelManager_force_close_all_channels(&this_arg_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManager_1send_1payment(JNIEnv *env, jclass clz, int64_t this_arg, int64_t route, int8_tArray payment_hash, int8_tArray payment_secret) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKRoute route_conv;
	route_conv.inner = (void*)(route & (~1));
	route_conv.is_owned = false;
	LDKThirtyTwoBytes payment_hash_ref;
	CHECK((*env)->GetArrayLength(env, payment_hash) == 32);
	(*env)->GetByteArrayRegion(env, payment_hash, 0, 32, payment_hash_ref.data);
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK((*env)->GetArrayLength(env, payment_secret) == 32);
	(*env)->GetByteArrayRegion(env, payment_secret, 0, 32, payment_secret_ref.data);
	LDKCResult_NonePaymentSendFailureZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret_conv = ChannelManager_send_payment(&this_arg_conv, &route_conv, payment_hash_ref, payment_secret_ref);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1funding_1transaction_1generated(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray temporary_channel_id, int64_t funding_txo) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char temporary_channel_id_arr[32];
	CHECK((*env)->GetArrayLength(env, temporary_channel_id) == 32);
	(*env)->GetByteArrayRegion(env, temporary_channel_id, 0, 32, temporary_channel_id_arr);
	unsigned char (*temporary_channel_id_ref)[32] = &temporary_channel_id_arr;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	if (funding_txo_conv.inner != NULL)
		funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	ChannelManager_funding_transaction_generated(&this_arg_conv, temporary_channel_id_ref, funding_txo_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1broadcast_1node_1announcement(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray rgb, int8_tArray alias, int64_tArray addresses) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKThreeBytes rgb_ref;
	CHECK((*env)->GetArrayLength(env, rgb) == 3);
	(*env)->GetByteArrayRegion(env, rgb, 0, 3, rgb_ref.data);
	LDKThirtyTwoBytes alias_ref;
	CHECK((*env)->GetArrayLength(env, alias) == 32);
	(*env)->GetByteArrayRegion(env, alias, 0, 32, alias_ref.data);
	LDKCVec_NetAddressZ addresses_constr;
	addresses_constr.datalen = (*env)->GetArrayLength(env, addresses);
	if (addresses_constr.datalen > 0)
		addresses_constr.data = MALLOC(addresses_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		addresses_constr.data = NULL;
	int64_t* addresses_vals = (*env)->GetLongArrayElements (env, addresses, NULL);
	for (size_t m = 0; m < addresses_constr.datalen; m++) {
		int64_t arr_conv_12 = addresses_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		addresses_constr.data[m] = arr_conv_12_conv;
	}
	(*env)->ReleaseLongArrayElements(env, addresses, addresses_vals, 0);
	ChannelManager_broadcast_node_announcement(&this_arg_conv, rgb_ref, alias_ref, addresses_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1process_1pending_1htlc_1forwards(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	ChannelManager_process_pending_htlc_forwards(&this_arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1timer_1chan_1freshness_1every_1min(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	ChannelManager_timer_chan_freshness_every_min(&this_arg_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelManager_1fail_1htlc_1backwards(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray payment_hash, int8_tArray payment_secret) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char payment_hash_arr[32];
	CHECK((*env)->GetArrayLength(env, payment_hash) == 32);
	(*env)->GetByteArrayRegion(env, payment_hash, 0, 32, payment_hash_arr);
	unsigned char (*payment_hash_ref)[32] = &payment_hash_arr;
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK((*env)->GetArrayLength(env, payment_secret) == 32);
	(*env)->GetByteArrayRegion(env, payment_secret, 0, 32, payment_secret_ref.data);
	jboolean ret_val = ChannelManager_fail_htlc_backwards(&this_arg_conv, payment_hash_ref, payment_secret_ref);
	return ret_val;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelManager_1claim_1funds(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray payment_preimage, int8_tArray payment_secret, int64_t expected_amount) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKThirtyTwoBytes payment_preimage_ref;
	CHECK((*env)->GetArrayLength(env, payment_preimage) == 32);
	(*env)->GetByteArrayRegion(env, payment_preimage, 0, 32, payment_preimage_ref.data);
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK((*env)->GetArrayLength(env, payment_secret) == 32);
	(*env)->GetByteArrayRegion(env, payment_secret, 0, 32, payment_secret_ref.data);
	jboolean ret_val = ChannelManager_claim_funds(&this_arg_conv, payment_preimage_ref, payment_secret_ref, expected_amount);
	return ret_val;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelManager_1get_1our_1node_1id(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, ChannelManager_get_our_node_id(&this_arg_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1channel_1monitor_1updated(JNIEnv *env, jclass clz, int64_t this_arg, int64_t funding_txo, int64_t highest_applied_update_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = false;
	ChannelManager_channel_monitor_updated(&this_arg_conv, &funding_txo_conv, highest_applied_update_id);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1MessageSendEventsProvider(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKMessageSendEventsProvider* ret = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*ret = ChannelManager_as_MessageSendEventsProvider(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1EventsProvider(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChannelManager_as_EventsProvider(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1block_1connected(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray header, int64_tArray txdata, int32_t height) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK((*env)->GetArrayLength(env, header) == 80);
	(*env)->GetByteArrayRegion(env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = (*env)->GetArrayLength(env, txdata);
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	int64_t* txdata_vals = (*env)->GetLongArrayElements (env, txdata, NULL);
	for (size_t y = 0; y < txdata_constr.datalen; y++) {
		int64_t arr_conv_24 = txdata_vals[y];
		LDKC2Tuple_usizeTransactionZ arr_conv_24_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_24;
		FREE((void*)arr_conv_24);
		txdata_constr.data[y] = arr_conv_24_conv;
	}
	(*env)->ReleaseLongArrayElements(env, txdata, txdata_vals, 0);
	ChannelManager_block_connected(&this_arg_conv, header_ref, txdata_constr, height);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1block_1disconnected(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray header) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char header_arr[80];
	CHECK((*env)->GetArrayLength(env, header) == 80);
	(*env)->GetByteArrayRegion(env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	ChannelManager_block_disconnected(&this_arg_conv, header_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1ChannelMessageHandler(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelMessageHandler* ret = MALLOC(sizeof(LDKChannelMessageHandler), "LDKChannelMessageHandler");
	*ret = ChannelManager_as_ChannelMessageHandler(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelManager_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelManager obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelManager_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelManagerReadArgs_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1keys_1manager(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_keys_manager(&this_ptr_conv);
	return ret_ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1keys_1manager(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKKeysInterface val_conv = *(LDKKeysInterface*)val;
	if (val_conv.free == LDKKeysInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKKeysInterface_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_keys_manager(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1fee_1estimator(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_fee_estimator(&this_ptr_conv);
	return ret_ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1fee_1estimator(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKFeeEstimator val_conv = *(LDKFeeEstimator*)val;
	if (val_conv.free == LDKFeeEstimator_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKFeeEstimator_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_fee_estimator(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1chain_1monitor(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_chain_monitor(&this_ptr_conv);
	return ret_ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1chain_1monitor(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKWatch val_conv = *(LDKWatch*)val;
	if (val_conv.free == LDKWatch_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKWatch_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_chain_monitor(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1tx_1broadcaster(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_tx_broadcaster(&this_ptr_conv);
	return ret_ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1tx_1broadcaster(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKBroadcasterInterface val_conv = *(LDKBroadcasterInterface*)val;
	if (val_conv.free == LDKBroadcasterInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKBroadcasterInterface_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_tx_broadcaster(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1logger(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)ChannelManagerReadArgs_get_logger(&this_ptr_conv);
	return ret_ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1logger(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKLogger val_conv = *(LDKLogger*)val;
	if (val_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_logger(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1default_1config(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUserConfig ret_var = ChannelManagerReadArgs_get_default_config(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1default_1config(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUserConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UserConfig_clone(&val_conv);
	ChannelManagerReadArgs_set_default_config(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1new(JNIEnv *env, jclass clz, int64_t keys_manager, int64_t fee_estimator, int64_t chain_monitor, int64_t tx_broadcaster, int64_t logger, int64_t default_config, int64_tArray channel_monitors) {
	LDKKeysInterface keys_manager_conv = *(LDKKeysInterface*)keys_manager;
	if (keys_manager_conv.free == LDKKeysInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKKeysInterface_JCalls_clone(keys_manager_conv.this_arg);
	}
	LDKFeeEstimator fee_estimator_conv = *(LDKFeeEstimator*)fee_estimator;
	if (fee_estimator_conv.free == LDKFeeEstimator_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKFeeEstimator_JCalls_clone(fee_estimator_conv.this_arg);
	}
	LDKWatch chain_monitor_conv = *(LDKWatch*)chain_monitor;
	if (chain_monitor_conv.free == LDKWatch_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKWatch_JCalls_clone(chain_monitor_conv.this_arg);
	}
	LDKBroadcasterInterface tx_broadcaster_conv = *(LDKBroadcasterInterface*)tx_broadcaster;
	if (tx_broadcaster_conv.free == LDKBroadcasterInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKBroadcasterInterface_JCalls_clone(tx_broadcaster_conv.this_arg);
	}
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKUserConfig default_config_conv;
	default_config_conv.inner = (void*)(default_config & (~1));
	default_config_conv.is_owned = (default_config & 1) || (default_config == 0);
	if (default_config_conv.inner != NULL)
		default_config_conv = UserConfig_clone(&default_config_conv);
	LDKCVec_ChannelMonitorZ channel_monitors_constr;
	channel_monitors_constr.datalen = (*env)->GetArrayLength(env, channel_monitors);
	if (channel_monitors_constr.datalen > 0)
		channel_monitors_constr.data = MALLOC(channel_monitors_constr.datalen * sizeof(LDKChannelMonitor), "LDKCVec_ChannelMonitorZ Elements");
	else
		channel_monitors_constr.data = NULL;
	int64_t* channel_monitors_vals = (*env)->GetLongArrayElements (env, channel_monitors, NULL);
	for (size_t q = 0; q < channel_monitors_constr.datalen; q++) {
		int64_t arr_conv_16 = channel_monitors_vals[q];
		LDKChannelMonitor arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		// Warning: we may need a move here but can't clone!
		channel_monitors_constr.data[q] = arr_conv_16_conv;
	}
	(*env)->ReleaseLongArrayElements(env, channel_monitors, channel_monitors_vals, 0);
	LDKChannelManagerReadArgs ret_var = ChannelManagerReadArgs_new(keys_manager_conv, fee_estimator_conv, chain_monitor_conv, tx_broadcaster_conv, logger_conv, default_config_conv, channel_monitors_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_C2Tuple_1BlockHashChannelManagerZ_1read(JNIEnv *env, jclass clz, int8_tArray ser, int64_t arg) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKChannelManagerReadArgs arg_conv;
	arg_conv.inner = (void*)(arg & (~1));
	arg_conv.is_owned = (arg & 1) || (arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ), "LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ");
	*ret_conv = C2Tuple_BlockHashChannelManagerZ_read(ser_ref, arg_conv);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DecodeError_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDecodeError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DecodeError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Init_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKInit this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Init_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Init_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKInit orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKInit ret_var = Init_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ErrorMessage_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKErrorMessage orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKErrorMessage ret_var = ErrorMessage_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *ErrorMessage_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	ErrorMessage_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jstring JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1get_1data(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKStr _str = ErrorMessage_get_data(&this_ptr_conv);
	jstring _conv = str_ref_to_java(env, _str.chars, _str.len);
	return _conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1set_1data(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u8Z val_ref;
	val_ref.datalen = (*env)->GetArrayLength(env, val);
	val_ref.data = MALLOC(val_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, val, 0, val_ref.datalen, val_ref.data);
	ErrorMessage_set_data(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int8_tArray data_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKCVec_u8Z data_arg_ref;
	data_arg_ref.datalen = (*env)->GetArrayLength(env, data_arg);
	data_arg_ref.data = MALLOC(data_arg_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, data_arg, 0, data_arg_ref.datalen, data_arg_ref.data);
	LDKErrorMessage ret_var = ErrorMessage_new(channel_id_arg_ref, data_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Ping_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Ping_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKPing orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKPing ret_var = Ping_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_Ping_1get_1ponglen(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = Ping_get_ponglen(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1set_1ponglen(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	Ping_set_ponglen(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_Ping_1get_1byteslen(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = Ping_get_byteslen(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1set_1byteslen(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	Ping_set_byteslen(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Ping_1new(JNIEnv *env, jclass clz, int16_t ponglen_arg, int16_t byteslen_arg) {
	LDKPing ret_var = Ping_new(ponglen_arg, byteslen_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Pong_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Pong_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Pong_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKPong orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKPong ret_var = Pong_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_Pong_1get_1byteslen(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = Pong_get_byteslen(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Pong_1set_1byteslen(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	Pong_set_byteslen(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Pong_1new(JNIEnv *env, jclass clz, int16_t byteslen_arg) {
	LDKPong ret_var = Pong_new(byteslen_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKOpenChannel orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKOpenChannel ret_var = OpenChannel_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *OpenChannel_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	OpenChannel_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1temporary_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *OpenChannel_get_temporary_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1temporary_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	OpenChannel_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1funding_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_funding_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1funding_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_funding_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1push_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_push_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1push_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_push_msat(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1dust_1limit_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1dust_1limit_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_dust_limit_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1max_1htlc_1value_1in_1flight_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1max_1htlc_1value_1in_1flight_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1channel_1reserve_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1channel_1reserve_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_channel_reserve_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = OpenChannel_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1feerate_1per_1kw(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = OpenChannel_get_feerate_per_kw(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1feerate_1per_1kw(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_feerate_per_kw(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1to_1self_1delay(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = OpenChannel_get_to_self_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1to_1self_1delay(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_to_self_delay(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1max_1accepted_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = OpenChannel_get_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1max_1accepted_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_max_accepted_htlcs(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1funding_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, OpenChannel_get_funding_pubkey(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1funding_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_funding_pubkey(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1revocation_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, OpenChannel_get_revocation_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1revocation_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1payment_1point(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, OpenChannel_get_payment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1payment_1point(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_payment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1delayed_1payment_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, OpenChannel_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1delayed_1payment_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1htlc_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, OpenChannel_get_htlc_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1htlc_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1first_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, OpenChannel_get_first_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1first_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_first_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1channel_1flags(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_t ret_val = OpenChannel_get_channel_flags(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1channel_1flags(JNIEnv *env, jclass clz, int64_t this_ptr, int8_t val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	OpenChannel_set_channel_flags(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKAcceptChannel orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKAcceptChannel ret_var = AcceptChannel_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1temporary_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *AcceptChannel_get_temporary_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1temporary_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	AcceptChannel_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1dust_1limit_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1dust_1limit_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_dust_limit_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1max_1htlc_1value_1in_1flight_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1max_1htlc_1value_1in_1flight_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1channel_1reserve_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1channel_1reserve_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_channel_reserve_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AcceptChannel_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1minimum_1depth(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = AcceptChannel_get_minimum_depth(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1minimum_1depth(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_minimum_depth(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1to_1self_1delay(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = AcceptChannel_get_to_self_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1to_1self_1delay(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_to_self_delay(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1max_1accepted_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = AcceptChannel_get_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1max_1accepted_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AcceptChannel_set_max_accepted_htlcs(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1funding_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, AcceptChannel_get_funding_pubkey(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1funding_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_funding_pubkey(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1revocation_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, AcceptChannel_get_revocation_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1revocation_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1payment_1point(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, AcceptChannel_get_payment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1payment_1point(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_payment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1delayed_1payment_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, AcceptChannel_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1delayed_1payment_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1htlc_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, AcceptChannel_get_htlc_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1htlc_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1first_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, AcceptChannel_get_first_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1first_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_first_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingCreated_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_FundingCreated_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKFundingCreated orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKFundingCreated ret_var = FundingCreated_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1temporary_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *FundingCreated_get_temporary_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1temporary_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	FundingCreated_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1funding_1txid(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *FundingCreated_get_funding_txid(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1funding_1txid(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	FundingCreated_set_funding_txid(&this_ptr_conv, val_ref);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1funding_1output_1index(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = FundingCreated_get_funding_output_index(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1funding_1output_1index(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	FundingCreated_set_funding_output_index(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1signature(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, FundingCreated_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1signature(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	FundingCreated_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_FundingCreated_1new(JNIEnv *env, jclass clz, int8_tArray temporary_channel_id_arg, int8_tArray funding_txid_arg, int16_t funding_output_index_arg, int8_tArray signature_arg) {
	LDKThirtyTwoBytes temporary_channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, temporary_channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, temporary_channel_id_arg, 0, 32, temporary_channel_id_arg_ref.data);
	LDKThirtyTwoBytes funding_txid_arg_ref;
	CHECK((*env)->GetArrayLength(env, funding_txid_arg) == 32);
	(*env)->GetByteArrayRegion(env, funding_txid_arg, 0, 32, funding_txid_arg_ref.data);
	LDKSignature signature_arg_ref;
	CHECK((*env)->GetArrayLength(env, signature_arg) == 64);
	(*env)->GetByteArrayRegion(env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKFundingCreated ret_var = FundingCreated_new(temporary_channel_id_arg_ref, funding_txid_arg_ref, funding_output_index_arg, signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingSigned_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_FundingSigned_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKFundingSigned orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKFundingSigned ret_var = FundingSigned_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingSigned_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *FundingSigned_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	FundingSigned_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingSigned_1get_1signature(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, FundingSigned_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1set_1signature(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	FundingSigned_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_FundingSigned_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int8_tArray signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature signature_arg_ref;
	CHECK((*env)->GetArrayLength(env, signature_arg) == 64);
	(*env)->GetByteArrayRegion(env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKFundingSigned ret_var = FundingSigned_new(channel_id_arg_ref, signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingLocked_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_FundingLocked_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKFundingLocked orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKFundingLocked ret_var = FundingLocked_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingLocked_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *FundingLocked_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	FundingLocked_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingLocked_1get_1next_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, FundingLocked_get_next_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1set_1next_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	FundingLocked_set_next_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_FundingLocked_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int8_tArray next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKPublicKey next_per_commitment_point_arg_ref;
	CHECK((*env)->GetArrayLength(env, next_per_commitment_point_arg) == 33);
	(*env)->GetByteArrayRegion(env, next_per_commitment_point_arg, 0, 33, next_per_commitment_point_arg_ref.compressed_form);
	LDKFundingLocked ret_var = FundingLocked_new(channel_id_arg_ref, next_per_commitment_point_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Shutdown_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Shutdown_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKShutdown orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKShutdown ret_var = Shutdown_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_Shutdown_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *Shutdown_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	Shutdown_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_Shutdown_1get_1scriptpubkey(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKu8slice arg_var = Shutdown_get_scriptpubkey(&this_ptr_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1set_1scriptpubkey(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u8Z val_ref;
	val_ref.datalen = (*env)->GetArrayLength(env, val);
	val_ref.data = MALLOC(val_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, val, 0, val_ref.datalen, val_ref.data);
	Shutdown_set_scriptpubkey(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Shutdown_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int8_tArray scriptpubkey_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKCVec_u8Z scriptpubkey_arg_ref;
	scriptpubkey_arg_ref.datalen = (*env)->GetArrayLength(env, scriptpubkey_arg);
	scriptpubkey_arg_ref.data = MALLOC(scriptpubkey_arg_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, scriptpubkey_arg, 0, scriptpubkey_arg_ref.datalen, scriptpubkey_arg_ref.data);
	LDKShutdown ret_var = Shutdown_new(channel_id_arg_ref, scriptpubkey_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ClosingSigned_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKClosingSigned orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKClosingSigned ret_var = ClosingSigned_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *ClosingSigned_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	ClosingSigned_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1fee_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ClosingSigned_get_fee_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1fee_1satoshis(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ClosingSigned_set_fee_satoshis(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1signature(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, ClosingSigned_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1signature(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	ClosingSigned_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int64_t fee_satoshis_arg, int8_tArray signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature signature_arg_ref;
	CHECK((*env)->GetArrayLength(env, signature_arg) == 64);
	(*env)->GetByteArrayRegion(env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKClosingSigned ret_var = ClosingSigned_new(channel_id_arg_ref, fee_satoshis_arg, signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateAddHTLC_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKUpdateAddHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateAddHTLC ret_var = UpdateAddHTLC_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UpdateAddHTLC_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UpdateAddHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1htlc_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateAddHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1htlc_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateAddHTLC_set_htlc_id(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1amount_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateAddHTLC_get_amount_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1amount_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateAddHTLC_set_amount_msat(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1payment_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UpdateAddHTLC_get_payment_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1payment_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UpdateAddHTLC_set_payment_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1cltv_1expiry(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UpdateAddHTLC_get_cltv_expiry(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1cltv_1expiry(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateAddHTLC_set_cltv_expiry(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFulfillHTLC_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKUpdateFulfillHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateFulfillHTLC ret_var = UpdateFulfillHTLC_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UpdateFulfillHTLC_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UpdateFulfillHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1htlc_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateFulfillHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1htlc_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFulfillHTLC_set_htlc_id(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1payment_1preimage(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UpdateFulfillHTLC_get_payment_preimage(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1payment_1preimage(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UpdateFulfillHTLC_set_payment_preimage(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int64_t htlc_id_arg, int8_tArray payment_preimage_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKThirtyTwoBytes payment_preimage_arg_ref;
	CHECK((*env)->GetArrayLength(env, payment_preimage_arg) == 32);
	(*env)->GetByteArrayRegion(env, payment_preimage_arg, 0, 32, payment_preimage_arg_ref.data);
	LDKUpdateFulfillHTLC ret_var = UpdateFulfillHTLC_new(channel_id_arg_ref, htlc_id_arg, payment_preimage_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailHTLC_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKUpdateFailHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateFailHTLC ret_var = UpdateFailHTLC_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UpdateFailHTLC_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UpdateFailHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1get_1htlc_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateFailHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1set_1htlc_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFailHTLC_set_htlc_id(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailMalformedHTLC_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKUpdateFailMalformedHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateFailMalformedHTLC ret_var = UpdateFailMalformedHTLC_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UpdateFailMalformedHTLC_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UpdateFailMalformedHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1htlc_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UpdateFailMalformedHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1htlc_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFailMalformedHTLC_set_htlc_id(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1failure_1code(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = UpdateFailMalformedHTLC_get_failure_code(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1failure_1code(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFailMalformedHTLC_set_failure_code(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentSigned_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKCommitmentSigned orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKCommitmentSigned ret_var = CommitmentSigned_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *CommitmentSigned_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	CommitmentSigned_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1get_1signature(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, CommitmentSigned_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1signature(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	CommitmentSigned_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1htlc_1signatures(JNIEnv *env, jclass clz, int64_t this_ptr, jobjectArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_SignatureZ val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		val_constr.data = NULL;
	for (size_t i = 0; i < val_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, val, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*env)->GetArrayLength(env, arr_conv_8) == 64);
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		val_constr.data[i] = arr_conv_8_ref;
	}
	CommitmentSigned_set_htlc_signatures(&this_ptr_conv, val_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int8_tArray signature_arg, jobjectArray htlc_signatures_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature signature_arg_ref;
	CHECK((*env)->GetArrayLength(env, signature_arg) == 64);
	(*env)->GetByteArrayRegion(env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKCVec_SignatureZ htlc_signatures_arg_constr;
	htlc_signatures_arg_constr.datalen = (*env)->GetArrayLength(env, htlc_signatures_arg);
	if (htlc_signatures_arg_constr.datalen > 0)
		htlc_signatures_arg_constr.data = MALLOC(htlc_signatures_arg_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		htlc_signatures_arg_constr.data = NULL;
	for (size_t i = 0; i < htlc_signatures_arg_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, htlc_signatures_arg, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*env)->GetArrayLength(env, arr_conv_8) == 64);
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		htlc_signatures_arg_constr.data[i] = arr_conv_8_ref;
	}
	LDKCommitmentSigned ret_var = CommitmentSigned_new(channel_id_arg_ref, signature_arg_ref, htlc_signatures_arg_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RevokeAndACK_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKRevokeAndACK orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRevokeAndACK ret_var = RevokeAndACK_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *RevokeAndACK_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	RevokeAndACK_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1per_1commitment_1secret(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *RevokeAndACK_get_per_commitment_secret(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1per_1commitment_1secret(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	RevokeAndACK_set_per_commitment_secret(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1next_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, RevokeAndACK_get_next_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1next_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	RevokeAndACK_set_next_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int8_tArray per_commitment_secret_arg, int8_tArray next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKThirtyTwoBytes per_commitment_secret_arg_ref;
	CHECK((*env)->GetArrayLength(env, per_commitment_secret_arg) == 32);
	(*env)->GetByteArrayRegion(env, per_commitment_secret_arg, 0, 32, per_commitment_secret_arg_ref.data);
	LDKPublicKey next_per_commitment_point_arg_ref;
	CHECK((*env)->GetArrayLength(env, next_per_commitment_point_arg) == 33);
	(*env)->GetByteArrayRegion(env, next_per_commitment_point_arg, 0, 33, next_per_commitment_point_arg_ref.compressed_form);
	LDKRevokeAndACK ret_var = RevokeAndACK_new(channel_id_arg_ref, per_commitment_secret_arg_ref, next_per_commitment_point_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFee_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFee_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKUpdateFee orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUpdateFee ret_var = UpdateFee_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateFee_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UpdateFee_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UpdateFee_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_UpdateFee_1get_1feerate_1per_1kw(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UpdateFee_get_feerate_per_kw(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1set_1feerate_1per_1kw(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UpdateFee_set_feerate_per_kw(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFee_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int32_t feerate_per_kw_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKUpdateFee ret_var = UpdateFee_new(channel_id_arg_ref, feerate_per_kw_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DataLossProtect_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKDataLossProtect orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKDataLossProtect ret_var = DataLossProtect_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1get_1your_1last_1per_1commitment_1secret(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *DataLossProtect_get_your_last_per_commitment_secret(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1set_1your_1last_1per_1commitment_1secret(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	DataLossProtect_set_your_last_per_commitment_secret(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1get_1my_1current_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, DataLossProtect_get_my_current_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1set_1my_1current_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	DataLossProtect_set_my_current_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1new(JNIEnv *env, jclass clz, int8_tArray your_last_per_commitment_secret_arg, int8_tArray my_current_per_commitment_point_arg) {
	LDKThirtyTwoBytes your_last_per_commitment_secret_arg_ref;
	CHECK((*env)->GetArrayLength(env, your_last_per_commitment_secret_arg) == 32);
	(*env)->GetByteArrayRegion(env, your_last_per_commitment_secret_arg, 0, 32, your_last_per_commitment_secret_arg_ref.data);
	LDKPublicKey my_current_per_commitment_point_arg_ref;
	CHECK((*env)->GetArrayLength(env, my_current_per_commitment_point_arg) == 33);
	(*env)->GetByteArrayRegion(env, my_current_per_commitment_point_arg, 0, 33, my_current_per_commitment_point_arg_ref.compressed_form);
	LDKDataLossProtect ret_var = DataLossProtect_new(your_last_per_commitment_secret_arg_ref, my_current_per_commitment_point_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelReestablish_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelReestablish orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelReestablish ret_var = ChannelReestablish_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *ChannelReestablish_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	ChannelReestablish_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1next_1local_1commitment_1number(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelReestablish_get_next_local_commitment_number(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1next_1local_1commitment_1number(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelReestablish_set_next_local_commitment_number(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1next_1remote_1commitment_1number(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = ChannelReestablish_get_next_remote_commitment_number(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1next_1remote_1commitment_1number(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelReestablish_set_next_remote_commitment_number(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AnnouncementSignatures_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKAnnouncementSignatures orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKAnnouncementSignatures ret_var = AnnouncementSignatures_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *AnnouncementSignatures_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	AnnouncementSignatures_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = AnnouncementSignatures_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	AnnouncementSignatures_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1node_1signature(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, AnnouncementSignatures_get_node_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1node_1signature(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	AnnouncementSignatures_set_node_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1bitcoin_1signature(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, AnnouncementSignatures_get_bitcoin_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1bitcoin_1signature(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	AnnouncementSignatures_set_bitcoin_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1new(JNIEnv *env, jclass clz, int8_tArray channel_id_arg, int64_t short_channel_id_arg, int8_tArray node_signature_arg, int8_tArray bitcoin_signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, channel_id_arg) == 32);
	(*env)->GetByteArrayRegion(env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature node_signature_arg_ref;
	CHECK((*env)->GetArrayLength(env, node_signature_arg) == 64);
	(*env)->GetByteArrayRegion(env, node_signature_arg, 0, 64, node_signature_arg_ref.compact_form);
	LDKSignature bitcoin_signature_arg_ref;
	CHECK((*env)->GetArrayLength(env, bitcoin_signature_arg) == 64);
	(*env)->GetByteArrayRegion(env, bitcoin_signature_arg, 0, 64, bitcoin_signature_arg_ref.compact_form);
	LDKAnnouncementSignatures ret_var = AnnouncementSignatures_new(channel_id_arg_ref, short_channel_id_arg, node_signature_arg_ref, bitcoin_signature_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetAddress_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNetAddress this_ptr_conv = *(LDKNetAddress*)this_ptr;
	FREE((void*)this_ptr);
	NetAddress_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetAddress_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKNetAddress* orig_conv = (LDKNetAddress*)orig;
	LDKNetAddress *ret_copy = MALLOC(sizeof(LDKNetAddress), "LDKNetAddress");
	*ret_copy = NetAddress_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_NetAddress_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKNetAddress* obj_conv = (LDKNetAddress*)obj;
	LDKCVec_u8Z arg_var = NetAddress_write(obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Result_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_CResult_NetAddressu8ZDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CResult_NetAddressu8ZDecodeErrorZ), "LDKCResult_CResult_NetAddressu8ZDecodeErrorZ");
	*ret_conv = Result_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedNodeAnnouncement_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKUnsignedNodeAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUnsignedNodeAnnouncement ret_var = UnsignedNodeAnnouncement_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1features(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures ret_var = UnsignedNodeAnnouncement_get_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1features(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	UnsignedNodeAnnouncement_set_features(&this_ptr_conv, val_conv);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1timestamp(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedNodeAnnouncement_get_timestamp(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1timestamp(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedNodeAnnouncement_set_timestamp(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1node_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, UnsignedNodeAnnouncement_get_node_id(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1node_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	UnsignedNodeAnnouncement_set_node_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1rgb(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 3);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 3, *UnsignedNodeAnnouncement_get_rgb(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1rgb(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThreeBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 3);
	(*env)->GetByteArrayRegion(env, val, 0, 3, val_ref.data);
	UnsignedNodeAnnouncement_set_rgb(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1alias(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UnsignedNodeAnnouncement_get_alias(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1alias(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UnsignedNodeAnnouncement_set_alias(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1addresses(JNIEnv *env, jclass clz, int64_t this_ptr, int64_tArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_NetAddressZ val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (*env)->GetLongArrayElements (env, val, NULL);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		int64_t arr_conv_12 = val_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		val_constr.data[m] = arr_conv_12_conv;
	}
	(*env)->ReleaseLongArrayElements(env, val, val_vals, 0);
	UnsignedNodeAnnouncement_set_addresses(&this_ptr_conv, val_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeAnnouncement_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKNodeAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKNodeAnnouncement ret_var = NodeAnnouncement_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1get_1signature(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, NodeAnnouncement_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1set_1signature(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	NodeAnnouncement_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1get_1contents(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedNodeAnnouncement ret_var = NodeAnnouncement_get_contents(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1set_1contents(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedNodeAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UnsignedNodeAnnouncement_clone(&val_conv);
	NodeAnnouncement_set_contents(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1new(JNIEnv *env, jclass clz, int8_tArray signature_arg, int64_t contents_arg) {
	LDKSignature signature_arg_ref;
	CHECK((*env)->GetArrayLength(env, signature_arg) == 64);
	(*env)->GetByteArrayRegion(env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKUnsignedNodeAnnouncement contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
	if (contents_arg_conv.inner != NULL)
		contents_arg_conv = UnsignedNodeAnnouncement_clone(&contents_arg_conv);
	LDKNodeAnnouncement ret_var = NodeAnnouncement_new(signature_arg_ref, contents_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKUnsignedChannelAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUnsignedChannelAnnouncement ret_var = UnsignedChannelAnnouncement_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1features(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures ret_var = UnsignedChannelAnnouncement_get_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1features(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	UnsignedChannelAnnouncement_set_features(&this_ptr_conv, val_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UnsignedChannelAnnouncement_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UnsignedChannelAnnouncement_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UnsignedChannelAnnouncement_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelAnnouncement_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1node_1id_11(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, UnsignedChannelAnnouncement_get_node_id_1(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1node_1id_11(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	UnsignedChannelAnnouncement_set_node_id_1(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1node_1id_12(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, UnsignedChannelAnnouncement_get_node_id_2(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1node_1id_12(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	UnsignedChannelAnnouncement_set_node_id_2(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1bitcoin_1key_11(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, UnsignedChannelAnnouncement_get_bitcoin_key_1(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1bitcoin_1key_11(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	UnsignedChannelAnnouncement_set_bitcoin_key_1(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1bitcoin_1key_12(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, UnsignedChannelAnnouncement_get_bitcoin_key_2(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1bitcoin_1key_12(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	UnsignedChannelAnnouncement_set_bitcoin_key_2(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelAnnouncement ret_var = ChannelAnnouncement_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1node_1signature_11(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, ChannelAnnouncement_get_node_signature_1(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1node_1signature_11(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	ChannelAnnouncement_set_node_signature_1(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1node_1signature_12(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, ChannelAnnouncement_get_node_signature_2(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1node_1signature_12(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	ChannelAnnouncement_set_node_signature_2(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1bitcoin_1signature_11(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, ChannelAnnouncement_get_bitcoin_signature_1(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1bitcoin_1signature_11(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	ChannelAnnouncement_set_bitcoin_signature_1(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1bitcoin_1signature_12(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, ChannelAnnouncement_get_bitcoin_signature_2(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1bitcoin_1signature_12(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	ChannelAnnouncement_set_bitcoin_signature_2(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1contents(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelAnnouncement ret_var = ChannelAnnouncement_get_contents(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1contents(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UnsignedChannelAnnouncement_clone(&val_conv);
	ChannelAnnouncement_set_contents(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1new(JNIEnv *env, jclass clz, int8_tArray node_signature_1_arg, int8_tArray node_signature_2_arg, int8_tArray bitcoin_signature_1_arg, int8_tArray bitcoin_signature_2_arg, int64_t contents_arg) {
	LDKSignature node_signature_1_arg_ref;
	CHECK((*env)->GetArrayLength(env, node_signature_1_arg) == 64);
	(*env)->GetByteArrayRegion(env, node_signature_1_arg, 0, 64, node_signature_1_arg_ref.compact_form);
	LDKSignature node_signature_2_arg_ref;
	CHECK((*env)->GetArrayLength(env, node_signature_2_arg) == 64);
	(*env)->GetByteArrayRegion(env, node_signature_2_arg, 0, 64, node_signature_2_arg_ref.compact_form);
	LDKSignature bitcoin_signature_1_arg_ref;
	CHECK((*env)->GetArrayLength(env, bitcoin_signature_1_arg) == 64);
	(*env)->GetByteArrayRegion(env, bitcoin_signature_1_arg, 0, 64, bitcoin_signature_1_arg_ref.compact_form);
	LDKSignature bitcoin_signature_2_arg_ref;
	CHECK((*env)->GetArrayLength(env, bitcoin_signature_2_arg) == 64);
	(*env)->GetByteArrayRegion(env, bitcoin_signature_2_arg, 0, 64, bitcoin_signature_2_arg_ref.compact_form);
	LDKUnsignedChannelAnnouncement contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
	if (contents_arg_conv.inner != NULL)
		contents_arg_conv = UnsignedChannelAnnouncement_clone(&contents_arg_conv);
	LDKChannelAnnouncement ret_var = ChannelAnnouncement_new(node_signature_1_arg_ref, node_signature_2_arg_ref, bitcoin_signature_1_arg_ref, bitcoin_signature_2_arg_ref, contents_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKUnsignedChannelUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKUnsignedChannelUpdate ret_var = UnsignedChannelUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *UnsignedChannelUpdate_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	UnsignedChannelUpdate_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UnsignedChannelUpdate_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1timestamp(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedChannelUpdate_get_timestamp(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1timestamp(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_timestamp(&this_ptr_conv, val);
}

JNIEXPORT int8_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1flags(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_t ret_val = UnsignedChannelUpdate_get_flags(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1flags(JNIEnv *env, jclass clz, int64_t this_ptr, int8_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_flags(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1cltv_1expiry_1delta(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = UnsignedChannelUpdate_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1cltv_1expiry_1delta(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_cltv_expiry_delta(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = UnsignedChannelUpdate_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1fee_1base_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedChannelUpdate_get_fee_base_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1fee_1base_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_fee_base_msat(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1fee_1proportional_1millionths(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = UnsignedChannelUpdate_get_fee_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1fee_1proportional_1millionths(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	UnsignedChannelUpdate_set_fee_proportional_millionths(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelUpdate ret_var = ChannelUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1get_1signature(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, ChannelUpdate_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1set_1signature(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	ChannelUpdate_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1get_1contents(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelUpdate ret_var = ChannelUpdate_get_contents(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1set_1contents(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUnsignedChannelUpdate val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UnsignedChannelUpdate_clone(&val_conv);
	ChannelUpdate_set_contents(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1new(JNIEnv *env, jclass clz, int8_tArray signature_arg, int64_t contents_arg) {
	LDKSignature signature_arg_ref;
	CHECK((*env)->GetArrayLength(env, signature_arg) == 64);
	(*env)->GetByteArrayRegion(env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKUnsignedChannelUpdate contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
	if (contents_arg_conv.inner != NULL)
		contents_arg_conv = UnsignedChannelUpdate_clone(&contents_arg_conv);
	LDKChannelUpdate ret_var = ChannelUpdate_new(signature_arg_ref, contents_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryChannelRange_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKQueryChannelRange orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKQueryChannelRange ret_var = QueryChannelRange_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1get_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *QueryChannelRange_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1set_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	QueryChannelRange_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1get_1first_1blocknum(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = QueryChannelRange_get_first_blocknum(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1set_1first_1blocknum(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	QueryChannelRange_set_first_blocknum(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1get_1number_1of_1blocks(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = QueryChannelRange_get_number_of_blocks(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1set_1number_1of_1blocks(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	QueryChannelRange_set_number_of_blocks(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1new(JNIEnv *env, jclass clz, int8_tArray chain_hash_arg, int32_t first_blocknum_arg, int32_t number_of_blocks_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*env)->GetArrayLength(env, chain_hash_arg) == 32);
	(*env)->GetByteArrayRegion(env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKQueryChannelRange ret_var = QueryChannelRange_new(chain_hash_arg_ref, first_blocknum_arg, number_of_blocks_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyChannelRange_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKReplyChannelRange orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKReplyChannelRange ret_var = ReplyChannelRange_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *ReplyChannelRange_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	ReplyChannelRange_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1first_1blocknum(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ReplyChannelRange_get_first_blocknum(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1first_1blocknum(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyChannelRange_set_first_blocknum(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1number_1of_1blocks(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = ReplyChannelRange_get_number_of_blocks(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1number_1of_1blocks(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyChannelRange_set_number_of_blocks(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1full_1information(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ReplyChannelRange_get_full_information(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1full_1information(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyChannelRange_set_full_information(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1short_1channel_1ids(JNIEnv *env, jclass clz, int64_t this_ptr, int64_tArray val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u64Z val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (*env)->GetLongArrayElements (env, val, NULL);
	for (size_t g = 0; g < val_constr.datalen; g++) {
		int64_t arr_conv_6 = val_vals[g];
		val_constr.data[g] = arr_conv_6;
	}
	(*env)->ReleaseLongArrayElements(env, val, val_vals, 0);
	ReplyChannelRange_set_short_channel_ids(&this_ptr_conv, val_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1new(JNIEnv *env, jclass clz, int8_tArray chain_hash_arg, int32_t first_blocknum_arg, int32_t number_of_blocks_arg, jboolean full_information_arg, int64_tArray short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*env)->GetArrayLength(env, chain_hash_arg) == 32);
	(*env)->GetByteArrayRegion(env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKCVec_u64Z short_channel_ids_arg_constr;
	short_channel_ids_arg_constr.datalen = (*env)->GetArrayLength(env, short_channel_ids_arg);
	if (short_channel_ids_arg_constr.datalen > 0)
		short_channel_ids_arg_constr.data = MALLOC(short_channel_ids_arg_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		short_channel_ids_arg_constr.data = NULL;
	int64_t* short_channel_ids_arg_vals = (*env)->GetLongArrayElements (env, short_channel_ids_arg, NULL);
	for (size_t g = 0; g < short_channel_ids_arg_constr.datalen; g++) {
		int64_t arr_conv_6 = short_channel_ids_arg_vals[g];
		short_channel_ids_arg_constr.data[g] = arr_conv_6;
	}
	(*env)->ReleaseLongArrayElements(env, short_channel_ids_arg, short_channel_ids_arg_vals, 0);
	LDKReplyChannelRange ret_var = ReplyChannelRange_new(chain_hash_arg_ref, first_blocknum_arg, number_of_blocks_arg, full_information_arg, short_channel_ids_arg_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryShortChannelIds_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKQueryShortChannelIds orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKQueryShortChannelIds ret_var = QueryShortChannelIds_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1get_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *QueryShortChannelIds_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1set_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	QueryShortChannelIds_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1set_1short_1channel_1ids(JNIEnv *env, jclass clz, int64_t this_ptr, int64_tArray val) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u64Z val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (*env)->GetLongArrayElements (env, val, NULL);
	for (size_t g = 0; g < val_constr.datalen; g++) {
		int64_t arr_conv_6 = val_vals[g];
		val_constr.data[g] = arr_conv_6;
	}
	(*env)->ReleaseLongArrayElements(env, val, val_vals, 0);
	QueryShortChannelIds_set_short_channel_ids(&this_ptr_conv, val_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1new(JNIEnv *env, jclass clz, int8_tArray chain_hash_arg, int64_tArray short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*env)->GetArrayLength(env, chain_hash_arg) == 32);
	(*env)->GetByteArrayRegion(env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKCVec_u64Z short_channel_ids_arg_constr;
	short_channel_ids_arg_constr.datalen = (*env)->GetArrayLength(env, short_channel_ids_arg);
	if (short_channel_ids_arg_constr.datalen > 0)
		short_channel_ids_arg_constr.data = MALLOC(short_channel_ids_arg_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		short_channel_ids_arg_constr.data = NULL;
	int64_t* short_channel_ids_arg_vals = (*env)->GetLongArrayElements (env, short_channel_ids_arg, NULL);
	for (size_t g = 0; g < short_channel_ids_arg_constr.datalen; g++) {
		int64_t arr_conv_6 = short_channel_ids_arg_vals[g];
		short_channel_ids_arg_constr.data[g] = arr_conv_6;
	}
	(*env)->ReleaseLongArrayElements(env, short_channel_ids_arg, short_channel_ids_arg_vals, 0);
	LDKQueryShortChannelIds ret_var = QueryShortChannelIds_new(chain_hash_arg_ref, short_channel_ids_arg_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyShortChannelIdsEnd_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKReplyShortChannelIdsEnd orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKReplyShortChannelIdsEnd ret_var = ReplyShortChannelIdsEnd_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1get_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *ReplyShortChannelIdsEnd_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1set_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	ReplyShortChannelIdsEnd_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1get_1full_1information(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ReplyShortChannelIdsEnd_get_full_information(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1set_1full_1information(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ReplyShortChannelIdsEnd_set_full_information(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1new(JNIEnv *env, jclass clz, int8_tArray chain_hash_arg, jboolean full_information_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*env)->GetArrayLength(env, chain_hash_arg) == 32);
	(*env)->GetByteArrayRegion(env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKReplyShortChannelIdsEnd ret_var = ReplyShortChannelIdsEnd_new(chain_hash_arg_ref, full_information_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	GossipTimestampFilter_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKGossipTimestampFilter orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKGossipTimestampFilter ret_var = GossipTimestampFilter_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1get_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *GossipTimestampFilter_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1set_1chain_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	GossipTimestampFilter_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1get_1first_1timestamp(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = GossipTimestampFilter_get_first_timestamp(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1set_1first_1timestamp(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	GossipTimestampFilter_set_first_timestamp(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1get_1timestamp_1range(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = GossipTimestampFilter_get_timestamp_range(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1set_1timestamp_1range(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	GossipTimestampFilter_set_timestamp_range(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1new(JNIEnv *env, jclass clz, int8_tArray chain_hash_arg, int32_t first_timestamp_arg, int32_t timestamp_range_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*env)->GetArrayLength(env, chain_hash_arg) == 32);
	(*env)->GetByteArrayRegion(env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKGossipTimestampFilter ret_var = GossipTimestampFilter_new(chain_hash_arg_ref, first_timestamp_arg, timestamp_range_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorAction_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKErrorAction this_ptr_conv = *(LDKErrorAction*)this_ptr;
	FREE((void*)this_ptr);
	ErrorAction_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ErrorAction_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKErrorAction* orig_conv = (LDKErrorAction*)orig;
	LDKErrorAction *ret_copy = MALLOC(sizeof(LDKErrorAction), "LDKErrorAction");
	*ret_copy = ErrorAction_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LightningError_free(this_ptr_conv);
}

JNIEXPORT jstring JNICALL Java_org_ldk_impl_bindings_LightningError_1get_1err(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKStr _str = LightningError_get_err(&this_ptr_conv);
	jstring _conv = str_ref_to_java(env, _str.chars, _str.len);
	return _conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1set_1err(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u8Z val_ref;
	val_ref.datalen = (*env)->GetArrayLength(env, val);
	val_ref.data = MALLOC(val_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, val, 0, val_ref.datalen, val_ref.data);
	LightningError_set_err(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LightningError_1get_1action(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKErrorAction *ret_copy = MALLOC(sizeof(LDKErrorAction), "LDKErrorAction");
	*ret_copy = LightningError_get_action(&this_ptr_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1set_1action(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKErrorAction val_conv = *(LDKErrorAction*)val;
	FREE((void*)val);
	LightningError_set_action(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LightningError_1new(JNIEnv *env, jclass clz, int8_tArray err_arg, int64_t action_arg) {
	LDKCVec_u8Z err_arg_ref;
	err_arg_ref.datalen = (*env)->GetArrayLength(env, err_arg);
	err_arg_ref.data = MALLOC(err_arg_ref.datalen, "LDKCVec_u8Z Bytes");
	(*env)->GetByteArrayRegion(env, err_arg, 0, err_arg_ref.datalen, err_arg_ref.data);
	LDKErrorAction action_arg_conv = *(LDKErrorAction*)action_arg;
	FREE((void*)action_arg);
	LDKLightningError ret_var = LightningError_new(err_arg_ref, action_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentUpdate_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKCommitmentUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKCommitmentUpdate ret_var = CommitmentUpdate_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1add_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr, int64_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateAddHTLCZ val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (*env)->GetLongArrayElements (env, val, NULL);
	for (size_t p = 0; p < val_constr.datalen; p++) {
		int64_t arr_conv_15 = val_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		if (arr_conv_15_conv.inner != NULL)
			arr_conv_15_conv = UpdateAddHTLC_clone(&arr_conv_15_conv);
		val_constr.data[p] = arr_conv_15_conv;
	}
	(*env)->ReleaseLongArrayElements(env, val, val_vals, 0);
	CommitmentUpdate_set_update_add_htlcs(&this_ptr_conv, val_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fulfill_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr, int64_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateFulfillHTLCZ val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (*env)->GetLongArrayElements (env, val, NULL);
	for (size_t t = 0; t < val_constr.datalen; t++) {
		int64_t arr_conv_19 = val_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		if (arr_conv_19_conv.inner != NULL)
			arr_conv_19_conv = UpdateFulfillHTLC_clone(&arr_conv_19_conv);
		val_constr.data[t] = arr_conv_19_conv;
	}
	(*env)->ReleaseLongArrayElements(env, val, val_vals, 0);
	CommitmentUpdate_set_update_fulfill_htlcs(&this_ptr_conv, val_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fail_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr, int64_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateFailHTLCZ val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (*env)->GetLongArrayElements (env, val, NULL);
	for (size_t q = 0; q < val_constr.datalen; q++) {
		int64_t arr_conv_16 = val_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		if (arr_conv_16_conv.inner != NULL)
			arr_conv_16_conv = UpdateFailHTLC_clone(&arr_conv_16_conv);
		val_constr.data[q] = arr_conv_16_conv;
	}
	(*env)->ReleaseLongArrayElements(env, val, val_vals, 0);
	CommitmentUpdate_set_update_fail_htlcs(&this_ptr_conv, val_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fail_1malformed_1htlcs(JNIEnv *env, jclass clz, int64_t this_ptr, int64_tArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_UpdateFailMalformedHTLCZ val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (*env)->GetLongArrayElements (env, val, NULL);
	for (size_t z = 0; z < val_constr.datalen; z++) {
		int64_t arr_conv_25 = val_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		if (arr_conv_25_conv.inner != NULL)
			arr_conv_25_conv = UpdateFailMalformedHTLC_clone(&arr_conv_25_conv);
		val_constr.data[z] = arr_conv_25_conv;
	}
	(*env)->ReleaseLongArrayElements(env, val, val_vals, 0);
	CommitmentUpdate_set_update_fail_malformed_htlcs(&this_ptr_conv, val_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1get_1update_1fee(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUpdateFee ret_var = CommitmentUpdate_get_update_fee(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fee(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKUpdateFee val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UpdateFee_clone(&val_conv);
	CommitmentUpdate_set_update_fee(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1get_1commitment_1signed(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCommitmentSigned ret_var = CommitmentUpdate_get_commitment_signed(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1commitment_1signed(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCommitmentSigned val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = CommitmentSigned_clone(&val_conv);
	CommitmentUpdate_set_commitment_signed(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1new(JNIEnv *env, jclass clz, int64_tArray update_add_htlcs_arg, int64_tArray update_fulfill_htlcs_arg, int64_tArray update_fail_htlcs_arg, int64_tArray update_fail_malformed_htlcs_arg, int64_t update_fee_arg, int64_t commitment_signed_arg) {
	LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg_constr;
	update_add_htlcs_arg_constr.datalen = (*env)->GetArrayLength(env, update_add_htlcs_arg);
	if (update_add_htlcs_arg_constr.datalen > 0)
		update_add_htlcs_arg_constr.data = MALLOC(update_add_htlcs_arg_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		update_add_htlcs_arg_constr.data = NULL;
	int64_t* update_add_htlcs_arg_vals = (*env)->GetLongArrayElements (env, update_add_htlcs_arg, NULL);
	for (size_t p = 0; p < update_add_htlcs_arg_constr.datalen; p++) {
		int64_t arr_conv_15 = update_add_htlcs_arg_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		if (arr_conv_15_conv.inner != NULL)
			arr_conv_15_conv = UpdateAddHTLC_clone(&arr_conv_15_conv);
		update_add_htlcs_arg_constr.data[p] = arr_conv_15_conv;
	}
	(*env)->ReleaseLongArrayElements(env, update_add_htlcs_arg, update_add_htlcs_arg_vals, 0);
	LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg_constr;
	update_fulfill_htlcs_arg_constr.datalen = (*env)->GetArrayLength(env, update_fulfill_htlcs_arg);
	if (update_fulfill_htlcs_arg_constr.datalen > 0)
		update_fulfill_htlcs_arg_constr.data = MALLOC(update_fulfill_htlcs_arg_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		update_fulfill_htlcs_arg_constr.data = NULL;
	int64_t* update_fulfill_htlcs_arg_vals = (*env)->GetLongArrayElements (env, update_fulfill_htlcs_arg, NULL);
	for (size_t t = 0; t < update_fulfill_htlcs_arg_constr.datalen; t++) {
		int64_t arr_conv_19 = update_fulfill_htlcs_arg_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		if (arr_conv_19_conv.inner != NULL)
			arr_conv_19_conv = UpdateFulfillHTLC_clone(&arr_conv_19_conv);
		update_fulfill_htlcs_arg_constr.data[t] = arr_conv_19_conv;
	}
	(*env)->ReleaseLongArrayElements(env, update_fulfill_htlcs_arg, update_fulfill_htlcs_arg_vals, 0);
	LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg_constr;
	update_fail_htlcs_arg_constr.datalen = (*env)->GetArrayLength(env, update_fail_htlcs_arg);
	if (update_fail_htlcs_arg_constr.datalen > 0)
		update_fail_htlcs_arg_constr.data = MALLOC(update_fail_htlcs_arg_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		update_fail_htlcs_arg_constr.data = NULL;
	int64_t* update_fail_htlcs_arg_vals = (*env)->GetLongArrayElements (env, update_fail_htlcs_arg, NULL);
	for (size_t q = 0; q < update_fail_htlcs_arg_constr.datalen; q++) {
		int64_t arr_conv_16 = update_fail_htlcs_arg_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		if (arr_conv_16_conv.inner != NULL)
			arr_conv_16_conv = UpdateFailHTLC_clone(&arr_conv_16_conv);
		update_fail_htlcs_arg_constr.data[q] = arr_conv_16_conv;
	}
	(*env)->ReleaseLongArrayElements(env, update_fail_htlcs_arg, update_fail_htlcs_arg_vals, 0);
	LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg_constr;
	update_fail_malformed_htlcs_arg_constr.datalen = (*env)->GetArrayLength(env, update_fail_malformed_htlcs_arg);
	if (update_fail_malformed_htlcs_arg_constr.datalen > 0)
		update_fail_malformed_htlcs_arg_constr.data = MALLOC(update_fail_malformed_htlcs_arg_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		update_fail_malformed_htlcs_arg_constr.data = NULL;
	int64_t* update_fail_malformed_htlcs_arg_vals = (*env)->GetLongArrayElements (env, update_fail_malformed_htlcs_arg, NULL);
	for (size_t z = 0; z < update_fail_malformed_htlcs_arg_constr.datalen; z++) {
		int64_t arr_conv_25 = update_fail_malformed_htlcs_arg_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		if (arr_conv_25_conv.inner != NULL)
			arr_conv_25_conv = UpdateFailMalformedHTLC_clone(&arr_conv_25_conv);
		update_fail_malformed_htlcs_arg_constr.data[z] = arr_conv_25_conv;
	}
	(*env)->ReleaseLongArrayElements(env, update_fail_malformed_htlcs_arg, update_fail_malformed_htlcs_arg_vals, 0);
	LDKUpdateFee update_fee_arg_conv;
	update_fee_arg_conv.inner = (void*)(update_fee_arg & (~1));
	update_fee_arg_conv.is_owned = (update_fee_arg & 1) || (update_fee_arg == 0);
	if (update_fee_arg_conv.inner != NULL)
		update_fee_arg_conv = UpdateFee_clone(&update_fee_arg_conv);
	LDKCommitmentSigned commitment_signed_arg_conv;
	commitment_signed_arg_conv.inner = (void*)(commitment_signed_arg & (~1));
	commitment_signed_arg_conv.is_owned = (commitment_signed_arg & 1) || (commitment_signed_arg == 0);
	if (commitment_signed_arg_conv.inner != NULL)
		commitment_signed_arg_conv = CommitmentSigned_clone(&commitment_signed_arg_conv);
	LDKCommitmentUpdate ret_var = CommitmentUpdate_new(update_add_htlcs_arg_constr, update_fulfill_htlcs_arg_constr, update_fail_htlcs_arg_constr, update_fail_malformed_htlcs_arg_constr, update_fee_arg_conv, commitment_signed_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCFailChannelUpdate_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKHTLCFailChannelUpdate this_ptr_conv = *(LDKHTLCFailChannelUpdate*)this_ptr;
	FREE((void*)this_ptr);
	HTLCFailChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_HTLCFailChannelUpdate_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKHTLCFailChannelUpdate* orig_conv = (LDKHTLCFailChannelUpdate*)orig;
	LDKHTLCFailChannelUpdate *ret_copy = MALLOC(sizeof(LDKHTLCFailChannelUpdate), "LDKHTLCFailChannelUpdate");
	*ret_copy = HTLCFailChannelUpdate_clone(orig_conv);
	long ret_ref = (long)ret_copy;
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelMessageHandler this_ptr_conv = *(LDKChannelMessageHandler*)this_ptr;
	FREE((void*)this_ptr);
	ChannelMessageHandler_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRoutingMessageHandler this_ptr_conv = *(LDKRoutingMessageHandler*)this_ptr;
	FREE((void*)this_ptr);
	RoutingMessageHandler_free(this_ptr_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKAcceptChannel obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = AcceptChannel_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKAcceptChannel ret_var = AcceptChannel_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKAnnouncementSignatures obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = AnnouncementSignatures_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKAnnouncementSignatures ret_var = AnnouncementSignatures_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelReestablish obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelReestablish_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_ChannelReestablishDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ChannelReestablishDecodeErrorZ), "LDKCResult_ChannelReestablishDecodeErrorZ");
	*ret_conv = ChannelReestablish_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKClosingSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ClosingSigned_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKClosingSigned ret_var = ClosingSigned_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKCommitmentSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = CommitmentSigned_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCommitmentSigned ret_var = CommitmentSigned_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKFundingCreated obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = FundingCreated_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_FundingCreated_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKFundingCreated ret_var = FundingCreated_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingSigned_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKFundingSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = FundingSigned_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_FundingSigned_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKFundingSigned ret_var = FundingSigned_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_FundingLocked_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKFundingLocked obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = FundingLocked_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_FundingLocked_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKFundingLocked ret_var = FundingLocked_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_Init_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKInit obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Init_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Init_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_InitDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_InitDecodeErrorZ), "LDKCResult_InitDecodeErrorZ");
	*ret_conv = Init_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKOpenChannel obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = OpenChannel_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_OpenChannel_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKOpenChannel ret_var = OpenChannel_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKRevokeAndACK obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = RevokeAndACK_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKRevokeAndACK ret_var = RevokeAndACK_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_Shutdown_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKShutdown obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Shutdown_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Shutdown_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKShutdown ret_var = Shutdown_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKUpdateFailHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFailHTLC_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKUpdateFailHTLC ret_var = UpdateFailHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKUpdateFailMalformedHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFailMalformedHTLC_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKUpdateFailMalformedHTLC ret_var = UpdateFailMalformedHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateFee_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKUpdateFee obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFee_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFee_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKUpdateFee ret_var = UpdateFee_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKUpdateFulfillHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateFulfillHTLC_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKUpdateFulfillHTLC ret_var = UpdateFulfillHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKUpdateAddHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UpdateAddHTLC_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKUpdateAddHTLC ret_var = UpdateAddHTLC_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_Ping_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKPing obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Ping_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Ping_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_PingDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PingDecodeErrorZ), "LDKCResult_PingDecodeErrorZ");
	*ret_conv = Ping_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_Pong_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKPong obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Pong_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Pong_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_PongDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PongDecodeErrorZ), "LDKCResult_PongDecodeErrorZ");
	*ret_conv = Pong_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKUnsignedChannelAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UnsignedChannelAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ), "LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ");
	*ret_conv = UnsignedChannelAnnouncement_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKChannelAnnouncement ret_var = ChannelAnnouncement_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKUnsignedChannelUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UnsignedChannelUpdate_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_UnsignedChannelUpdateDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedChannelUpdateDecodeErrorZ), "LDKCResult_UnsignedChannelUpdateDecodeErrorZ");
	*ret_conv = UnsignedChannelUpdate_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelUpdate_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKChannelUpdate ret_var = ChannelUpdate_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKErrorMessage obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ErrorMessage_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_ErrorMessageDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ErrorMessageDecodeErrorZ), "LDKCResult_ErrorMessageDecodeErrorZ");
	*ret_conv = ErrorMessage_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKUnsignedNodeAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = UnsignedNodeAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ), "LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ");
	*ret_conv = UnsignedNodeAnnouncement_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKNodeAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NodeAnnouncement_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKNodeAnnouncement ret_var = NodeAnnouncement_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_QueryShortChannelIdsDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryShortChannelIdsDecodeErrorZ), "LDKCResult_QueryShortChannelIdsDecodeErrorZ");
	*ret_conv = QueryShortChannelIds_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKQueryShortChannelIds obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = QueryShortChannelIds_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ), "LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ");
	*ret_conv = ReplyShortChannelIdsEnd_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKReplyShortChannelIdsEnd obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ReplyShortChannelIdsEnd_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_QueryChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_QueryChannelRangeDecodeErrorZ), "LDKCResult_QueryChannelRangeDecodeErrorZ");
	*ret_conv = QueryChannelRange_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKQueryChannelRange obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = QueryChannelRange_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_ReplyChannelRangeDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_ReplyChannelRangeDecodeErrorZ), "LDKCResult_ReplyChannelRangeDecodeErrorZ");
	*ret_conv = ReplyChannelRange_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKReplyChannelRange obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ReplyChannelRange_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_GossipTimestampFilterDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_GossipTimestampFilterDecodeErrorZ), "LDKCResult_GossipTimestampFilterDecodeErrorZ");
	*ret_conv = GossipTimestampFilter_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKGossipTimestampFilter obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = GossipTimestampFilter_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MessageHandler_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_MessageHandler_1get_1chan_1handler(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)MessageHandler_get_chan_handler(&this_ptr_conv);
	return ret_ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1set_1chan_1handler(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelMessageHandler val_conv = *(LDKChannelMessageHandler*)val;
	if (val_conv.free == LDKChannelMessageHandler_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKChannelMessageHandler_JCalls_clone(val_conv.this_arg);
	}
	MessageHandler_set_chan_handler(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_MessageHandler_1get_1route_1handler(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	long ret_ret = (long)MessageHandler_get_route_handler(&this_ptr_conv);
	return ret_ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1set_1route_1handler(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingMessageHandler val_conv = *(LDKRoutingMessageHandler*)val;
	if (val_conv.free == LDKRoutingMessageHandler_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKRoutingMessageHandler_JCalls_clone(val_conv.this_arg);
	}
	MessageHandler_set_route_handler(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_MessageHandler_1new(JNIEnv *env, jclass clz, int64_t chan_handler_arg, int64_t route_handler_arg) {
	LDKChannelMessageHandler chan_handler_arg_conv = *(LDKChannelMessageHandler*)chan_handler_arg;
	if (chan_handler_arg_conv.free == LDKChannelMessageHandler_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKChannelMessageHandler_JCalls_clone(chan_handler_arg_conv.this_arg);
	}
	LDKRoutingMessageHandler route_handler_arg_conv = *(LDKRoutingMessageHandler*)route_handler_arg;
	if (route_handler_arg_conv.free == LDKRoutingMessageHandler_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKRoutingMessageHandler_JCalls_clone(route_handler_arg_conv.this_arg);
	}
	LDKMessageHandler ret_var = MessageHandler_new(chan_handler_arg_conv, route_handler_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKSocketDescriptor* orig_conv = (LDKSocketDescriptor*)orig;
	LDKSocketDescriptor* ret = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*ret = SocketDescriptor_clone(orig_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKSocketDescriptor this_ptr_conv = *(LDKSocketDescriptor*)this_ptr;
	FREE((void*)this_ptr);
	SocketDescriptor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PeerHandleError_free(this_ptr_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1get_1no_1connection_1possible(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = PeerHandleError_get_no_connection_possible(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1set_1no_1connection_1possible(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	PeerHandleError_set_no_connection_possible(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1new(JNIEnv *env, jclass clz, jboolean no_connection_possible_arg) {
	LDKPeerHandleError ret_var = PeerHandleError_new(no_connection_possible_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKPeerManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PeerManager_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_PeerManager_1new(JNIEnv *env, jclass clz, int64_t message_handler, int8_tArray our_node_secret, int8_tArray ephemeral_random_data, int64_t logger) {
	LDKMessageHandler message_handler_conv;
	message_handler_conv.inner = (void*)(message_handler & (~1));
	message_handler_conv.is_owned = (message_handler & 1) || (message_handler == 0);
	// Warning: we may need a move here but can't clone!
	LDKSecretKey our_node_secret_ref;
	CHECK((*env)->GetArrayLength(env, our_node_secret) == 32);
	(*env)->GetByteArrayRegion(env, our_node_secret, 0, 32, our_node_secret_ref.bytes);
	unsigned char ephemeral_random_data_arr[32];
	CHECK((*env)->GetArrayLength(env, ephemeral_random_data) == 32);
	(*env)->GetByteArrayRegion(env, ephemeral_random_data, 0, 32, ephemeral_random_data_arr);
	unsigned char (*ephemeral_random_data_ref)[32] = &ephemeral_random_data_arr;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKPeerManager ret_var = PeerManager_new(message_handler_conv, our_node_secret_ref, ephemeral_random_data_ref, logger_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT jobjectArray JNICALL Java_org_ldk_impl_bindings_PeerManager_1get_1peer_1node_1ids(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKCVec_PublicKeyZ ret_var = PeerManager_get_peer_node_ids(&this_arg_conv);
	jobjectArray ret_arr = (*env)->NewObjectArray(env, ret_var.datalen, arr_of_B_clz, NULL);
	;
	for (size_t i = 0; i < ret_var.datalen; i++) {
		int8_tArray arr_conv_8_arr = (*env)->NewByteArray(env, 33);
		(*env)->SetByteArrayRegion(env, arr_conv_8_arr, 0, 33, ret_var.data[i].compressed_form);
		(*env)->SetObjectArrayElement(env, ret_arr, i, arr_conv_8_arr);
	}
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_PeerManager_1new_1outbound_1connection(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray their_node_id, int64_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKPublicKey their_node_id_ref;
	CHECK((*env)->GetArrayLength(env, their_node_id) == 33);
	(*env)->GetByteArrayRegion(env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	if (descriptor_conv.free == LDKSocketDescriptor_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKSocketDescriptor_JCalls_clone(descriptor_conv.this_arg);
	}
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret_conv = PeerManager_new_outbound_connection(&this_arg_conv, their_node_id_ref, descriptor_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_PeerManager_1new_1inbound_1connection(JNIEnv *env, jclass clz, int64_t this_arg, int64_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	if (descriptor_conv.free == LDKSocketDescriptor_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKSocketDescriptor_JCalls_clone(descriptor_conv.this_arg);
	}
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = PeerManager_new_inbound_connection(&this_arg_conv, descriptor_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_PeerManager_1write_1buffer_1space_1avail(JNIEnv *env, jclass clz, int64_t this_arg, int64_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	LDKCResult_NonePeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret_conv = PeerManager_write_buffer_space_avail(&this_arg_conv, descriptor_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_PeerManager_1read_1event(JNIEnv *env, jclass clz, int64_t this_arg, int64_t peer_descriptor, int8_tArray data) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor* peer_descriptor_conv = (LDKSocketDescriptor*)peer_descriptor;
	LDKu8slice data_ref;
	data_ref.datalen = (*env)->GetArrayLength(env, data);
	data_ref.data = (*env)->GetByteArrayElements (env, data, NULL);
	LDKCResult_boolPeerHandleErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret_conv = PeerManager_read_event(&this_arg_conv, peer_descriptor_conv, data_ref);
	(*env)->ReleaseByteArrayElements(env, data, (int8_t*)data_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1process_1events(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	PeerManager_process_events(&this_arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1socket_1disconnected(JNIEnv *env, jclass clz, int64_t this_arg, int64_t descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	PeerManager_socket_disconnected(&this_arg_conv, descriptor_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1timer_1tick_1occured(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	PeerManager_timer_tick_occured(&this_arg_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_build_1commitment_1secret(JNIEnv *env, jclass clz, int8_tArray commitment_seed, int64_t idx) {
	unsigned char commitment_seed_arr[32];
	CHECK((*env)->GetArrayLength(env, commitment_seed) == 32);
	(*env)->GetByteArrayRegion(env, commitment_seed, 0, 32, commitment_seed_arr);
	unsigned char (*commitment_seed_ref)[32] = &commitment_seed_arr;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 32, build_commitment_secret(commitment_seed_ref, idx).data);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_derive_1private_1key(JNIEnv *env, jclass clz, int8_tArray per_commitment_point, int8_tArray base_secret) {
	LDKPublicKey per_commitment_point_ref;
	CHECK((*env)->GetArrayLength(env, per_commitment_point) == 33);
	(*env)->GetByteArrayRegion(env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	unsigned char base_secret_arr[32];
	CHECK((*env)->GetArrayLength(env, base_secret) == 32);
	(*env)->GetByteArrayRegion(env, base_secret, 0, 32, base_secret_arr);
	unsigned char (*base_secret_ref)[32] = &base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = derive_private_key(per_commitment_point_ref, base_secret_ref);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_derive_1public_1key(JNIEnv *env, jclass clz, int8_tArray per_commitment_point, int8_tArray base_point) {
	LDKPublicKey per_commitment_point_ref;
	CHECK((*env)->GetArrayLength(env, per_commitment_point) == 33);
	(*env)->GetByteArrayRegion(env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	LDKPublicKey base_point_ref;
	CHECK((*env)->GetArrayLength(env, base_point) == 33);
	(*env)->GetByteArrayRegion(env, base_point, 0, 33, base_point_ref.compressed_form);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = derive_public_key(per_commitment_point_ref, base_point_ref);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_derive_1private_1revocation_1key(JNIEnv *env, jclass clz, int8_tArray per_commitment_secret, int8_tArray countersignatory_revocation_base_secret) {
	unsigned char per_commitment_secret_arr[32];
	CHECK((*env)->GetArrayLength(env, per_commitment_secret) == 32);
	(*env)->GetByteArrayRegion(env, per_commitment_secret, 0, 32, per_commitment_secret_arr);
	unsigned char (*per_commitment_secret_ref)[32] = &per_commitment_secret_arr;
	unsigned char countersignatory_revocation_base_secret_arr[32];
	CHECK((*env)->GetArrayLength(env, countersignatory_revocation_base_secret) == 32);
	(*env)->GetByteArrayRegion(env, countersignatory_revocation_base_secret, 0, 32, countersignatory_revocation_base_secret_arr);
	unsigned char (*countersignatory_revocation_base_secret_ref)[32] = &countersignatory_revocation_base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret_conv = derive_private_revocation_key(per_commitment_secret_ref, countersignatory_revocation_base_secret_ref);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_derive_1public_1revocation_1key(JNIEnv *env, jclass clz, int8_tArray per_commitment_point, int8_tArray countersignatory_revocation_base_point) {
	LDKPublicKey per_commitment_point_ref;
	CHECK((*env)->GetArrayLength(env, per_commitment_point) == 33);
	(*env)->GetByteArrayRegion(env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	LDKPublicKey countersignatory_revocation_base_point_ref;
	CHECK((*env)->GetArrayLength(env, countersignatory_revocation_base_point) == 33);
	(*env)->GetByteArrayRegion(env, countersignatory_revocation_base_point, 0, 33, countersignatory_revocation_base_point_ref.compressed_form);
	LDKCResult_PublicKeySecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret_conv = derive_public_revocation_key(per_commitment_point_ref, countersignatory_revocation_base_point_ref);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	TxCreationKeys_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKTxCreationKeys orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKTxCreationKeys ret_var = TxCreationKeys_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, TxCreationKeys_get_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1per_1commitment_1point(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1revocation_1key(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, TxCreationKeys_get_revocation_key(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1revocation_1key(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_revocation_key(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1broadcaster_1htlc_1key(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, TxCreationKeys_get_broadcaster_htlc_key(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1broadcaster_1htlc_1key(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_broadcaster_htlc_key(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1countersignatory_1htlc_1key(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, TxCreationKeys_get_countersignatory_htlc_key(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1countersignatory_1htlc_1key(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_countersignatory_htlc_key(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1broadcaster_1delayed_1payment_1key(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, TxCreationKeys_get_broadcaster_delayed_payment_key(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1broadcaster_1delayed_1payment_1key(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_broadcaster_delayed_payment_key(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1new(JNIEnv *env, jclass clz, int8_tArray per_commitment_point_arg, int8_tArray revocation_key_arg, int8_tArray broadcaster_htlc_key_arg, int8_tArray countersignatory_htlc_key_arg, int8_tArray broadcaster_delayed_payment_key_arg) {
	LDKPublicKey per_commitment_point_arg_ref;
	CHECK((*env)->GetArrayLength(env, per_commitment_point_arg) == 33);
	(*env)->GetByteArrayRegion(env, per_commitment_point_arg, 0, 33, per_commitment_point_arg_ref.compressed_form);
	LDKPublicKey revocation_key_arg_ref;
	CHECK((*env)->GetArrayLength(env, revocation_key_arg) == 33);
	(*env)->GetByteArrayRegion(env, revocation_key_arg, 0, 33, revocation_key_arg_ref.compressed_form);
	LDKPublicKey broadcaster_htlc_key_arg_ref;
	CHECK((*env)->GetArrayLength(env, broadcaster_htlc_key_arg) == 33);
	(*env)->GetByteArrayRegion(env, broadcaster_htlc_key_arg, 0, 33, broadcaster_htlc_key_arg_ref.compressed_form);
	LDKPublicKey countersignatory_htlc_key_arg_ref;
	CHECK((*env)->GetArrayLength(env, countersignatory_htlc_key_arg) == 33);
	(*env)->GetByteArrayRegion(env, countersignatory_htlc_key_arg, 0, 33, countersignatory_htlc_key_arg_ref.compressed_form);
	LDKPublicKey broadcaster_delayed_payment_key_arg_ref;
	CHECK((*env)->GetArrayLength(env, broadcaster_delayed_payment_key_arg) == 33);
	(*env)->GetByteArrayRegion(env, broadcaster_delayed_payment_key_arg, 0, 33, broadcaster_delayed_payment_key_arg_ref.compressed_form);
	LDKTxCreationKeys ret_var = TxCreationKeys_new(per_commitment_point_arg_ref, revocation_key_arg_ref, broadcaster_htlc_key_arg_ref, countersignatory_htlc_key_arg_ref, broadcaster_delayed_payment_key_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKTxCreationKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = TxCreationKeys_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKTxCreationKeys ret_var = TxCreationKeys_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelPublicKeys_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelPublicKeys orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = ChannelPublicKeys_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1funding_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, ChannelPublicKeys_get_funding_pubkey(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1funding_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_funding_pubkey(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1revocation_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, ChannelPublicKeys_get_revocation_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1revocation_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1payment_1point(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, ChannelPublicKeys_get_payment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1payment_1point(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_payment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1delayed_1payment_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, ChannelPublicKeys_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1delayed_1payment_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1htlc_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, ChannelPublicKeys_get_htlc_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1htlc_1basepoint(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1new(JNIEnv *env, jclass clz, int8_tArray funding_pubkey_arg, int8_tArray revocation_basepoint_arg, int8_tArray payment_point_arg, int8_tArray delayed_payment_basepoint_arg, int8_tArray htlc_basepoint_arg) {
	LDKPublicKey funding_pubkey_arg_ref;
	CHECK((*env)->GetArrayLength(env, funding_pubkey_arg) == 33);
	(*env)->GetByteArrayRegion(env, funding_pubkey_arg, 0, 33, funding_pubkey_arg_ref.compressed_form);
	LDKPublicKey revocation_basepoint_arg_ref;
	CHECK((*env)->GetArrayLength(env, revocation_basepoint_arg) == 33);
	(*env)->GetByteArrayRegion(env, revocation_basepoint_arg, 0, 33, revocation_basepoint_arg_ref.compressed_form);
	LDKPublicKey payment_point_arg_ref;
	CHECK((*env)->GetArrayLength(env, payment_point_arg) == 33);
	(*env)->GetByteArrayRegion(env, payment_point_arg, 0, 33, payment_point_arg_ref.compressed_form);
	LDKPublicKey delayed_payment_basepoint_arg_ref;
	CHECK((*env)->GetArrayLength(env, delayed_payment_basepoint_arg) == 33);
	(*env)->GetByteArrayRegion(env, delayed_payment_basepoint_arg, 0, 33, delayed_payment_basepoint_arg_ref.compressed_form);
	LDKPublicKey htlc_basepoint_arg_ref;
	CHECK((*env)->GetArrayLength(env, htlc_basepoint_arg) == 33);
	(*env)->GetByteArrayRegion(env, htlc_basepoint_arg, 0, 33, htlc_basepoint_arg_ref.compressed_form);
	LDKChannelPublicKeys ret_var = ChannelPublicKeys_new(funding_pubkey_arg_ref, revocation_basepoint_arg_ref, payment_point_arg_ref, delayed_payment_basepoint_arg_ref, htlc_basepoint_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelPublicKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelPublicKeys_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKChannelPublicKeys ret_var = ChannelPublicKeys_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1derive_1new(JNIEnv *env, jclass clz, int8_tArray per_commitment_point, int8_tArray broadcaster_delayed_payment_base, int8_tArray broadcaster_htlc_base, int8_tArray countersignatory_revocation_base, int8_tArray countersignatory_htlc_base) {
	LDKPublicKey per_commitment_point_ref;
	CHECK((*env)->GetArrayLength(env, per_commitment_point) == 33);
	(*env)->GetByteArrayRegion(env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	LDKPublicKey broadcaster_delayed_payment_base_ref;
	CHECK((*env)->GetArrayLength(env, broadcaster_delayed_payment_base) == 33);
	(*env)->GetByteArrayRegion(env, broadcaster_delayed_payment_base, 0, 33, broadcaster_delayed_payment_base_ref.compressed_form);
	LDKPublicKey broadcaster_htlc_base_ref;
	CHECK((*env)->GetArrayLength(env, broadcaster_htlc_base) == 33);
	(*env)->GetByteArrayRegion(env, broadcaster_htlc_base, 0, 33, broadcaster_htlc_base_ref.compressed_form);
	LDKPublicKey countersignatory_revocation_base_ref;
	CHECK((*env)->GetArrayLength(env, countersignatory_revocation_base) == 33);
	(*env)->GetByteArrayRegion(env, countersignatory_revocation_base, 0, 33, countersignatory_revocation_base_ref.compressed_form);
	LDKPublicKey countersignatory_htlc_base_ref;
	CHECK((*env)->GetArrayLength(env, countersignatory_htlc_base) == 33);
	(*env)->GetByteArrayRegion(env, countersignatory_htlc_base, 0, 33, countersignatory_htlc_base_ref.compressed_form);
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = TxCreationKeys_derive_new(per_commitment_point_ref, broadcaster_delayed_payment_base_ref, broadcaster_htlc_base_ref, countersignatory_revocation_base_ref, countersignatory_htlc_base_ref);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1from_1channel_1static_1keys(JNIEnv *env, jclass clz, int8_tArray per_commitment_point, int64_t broadcaster_keys, int64_t countersignatory_keys) {
	LDKPublicKey per_commitment_point_ref;
	CHECK((*env)->GetArrayLength(env, per_commitment_point) == 33);
	(*env)->GetByteArrayRegion(env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	LDKChannelPublicKeys broadcaster_keys_conv;
	broadcaster_keys_conv.inner = (void*)(broadcaster_keys & (~1));
	broadcaster_keys_conv.is_owned = false;
	LDKChannelPublicKeys countersignatory_keys_conv;
	countersignatory_keys_conv.inner = (void*)(countersignatory_keys & (~1));
	countersignatory_keys_conv.is_owned = false;
	LDKCResult_TxCreationKeysSecpErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret_conv = TxCreationKeys_from_channel_static_keys(per_commitment_point_ref, &broadcaster_keys_conv, &countersignatory_keys_conv);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_get_1revokeable_1redeemscript(JNIEnv *env, jclass clz, int8_tArray revocation_key, int16_t contest_delay, int8_tArray broadcaster_delayed_payment_key) {
	LDKPublicKey revocation_key_ref;
	CHECK((*env)->GetArrayLength(env, revocation_key) == 33);
	(*env)->GetByteArrayRegion(env, revocation_key, 0, 33, revocation_key_ref.compressed_form);
	LDKPublicKey broadcaster_delayed_payment_key_ref;
	CHECK((*env)->GetArrayLength(env, broadcaster_delayed_payment_key) == 33);
	(*env)->GetByteArrayRegion(env, broadcaster_delayed_payment_key, 0, 33, broadcaster_delayed_payment_key_ref.compressed_form);
	LDKCVec_u8Z arg_var = get_revokeable_redeemscript(revocation_key_ref, contest_delay, broadcaster_delayed_payment_key_ref);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCOutputInCommitment_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKHTLCOutputInCommitment orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKHTLCOutputInCommitment ret_var = HTLCOutputInCommitment_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1offered(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = HTLCOutputInCommitment_get_offered(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1offered(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	HTLCOutputInCommitment_set_offered(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1amount_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = HTLCOutputInCommitment_get_amount_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1amount_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	HTLCOutputInCommitment_set_amount_msat(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1cltv_1expiry(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = HTLCOutputInCommitment_get_cltv_expiry(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1cltv_1expiry(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	HTLCOutputInCommitment_set_cltv_expiry(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1payment_1hash(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *HTLCOutputInCommitment_get_payment_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1payment_1hash(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	HTLCOutputInCommitment_set_payment_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKHTLCOutputInCommitment obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = HTLCOutputInCommitment_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKHTLCOutputInCommitment ret_var = HTLCOutputInCommitment_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_get_1htlc_1redeemscript(JNIEnv *env, jclass clz, int64_t htlc, int64_t keys) {
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKTxCreationKeys keys_conv;
	keys_conv.inner = (void*)(keys & (~1));
	keys_conv.is_owned = false;
	LDKCVec_u8Z arg_var = get_htlc_redeemscript(&htlc_conv, &keys_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_make_1funding_1redeemscript(JNIEnv *env, jclass clz, int8_tArray broadcaster, int8_tArray countersignatory) {
	LDKPublicKey broadcaster_ref;
	CHECK((*env)->GetArrayLength(env, broadcaster) == 33);
	(*env)->GetByteArrayRegion(env, broadcaster, 0, 33, broadcaster_ref.compressed_form);
	LDKPublicKey countersignatory_ref;
	CHECK((*env)->GetArrayLength(env, countersignatory) == 33);
	(*env)->GetByteArrayRegion(env, countersignatory, 0, 33, countersignatory_ref.compressed_form);
	LDKCVec_u8Z arg_var = make_funding_redeemscript(broadcaster_ref, countersignatory_ref);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_build_1htlc_1transaction(JNIEnv *env, jclass clz, int8_tArray prev_hash, int32_t feerate_per_kw, int16_t contest_delay, int64_t htlc, int8_tArray broadcaster_delayed_payment_key, int8_tArray revocation_key) {
	unsigned char prev_hash_arr[32];
	CHECK((*env)->GetArrayLength(env, prev_hash) == 32);
	(*env)->GetByteArrayRegion(env, prev_hash, 0, 32, prev_hash_arr);
	unsigned char (*prev_hash_ref)[32] = &prev_hash_arr;
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = false;
	LDKPublicKey broadcaster_delayed_payment_key_ref;
	CHECK((*env)->GetArrayLength(env, broadcaster_delayed_payment_key) == 33);
	(*env)->GetByteArrayRegion(env, broadcaster_delayed_payment_key, 0, 33, broadcaster_delayed_payment_key_ref.compressed_form);
	LDKPublicKey revocation_key_ref;
	CHECK((*env)->GetArrayLength(env, revocation_key) == 33);
	(*env)->GetByteArrayRegion(env, revocation_key, 0, 33, revocation_key_ref.compressed_form);
	LDKTransaction arg_var = build_htlc_transaction(prev_hash_ref, feerate_per_kw, contest_delay, &htlc_conv, broadcaster_delayed_payment_key_ref, revocation_key_ref);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	Transaction_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelTransactionParameters_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKChannelTransactionParameters orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKChannelTransactionParameters ret_var = ChannelTransactionParameters_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1get_1holder_1pubkeys(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = ChannelTransactionParameters_get_holder_pubkeys(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1set_1holder_1pubkeys(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelPublicKeys_clone(&val_conv);
	ChannelTransactionParameters_set_holder_pubkeys(&this_ptr_conv, val_conv);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1get_1holder_1selected_1contest_1delay(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = ChannelTransactionParameters_get_holder_selected_contest_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1set_1holder_1selected_1contest_1delay(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelTransactionParameters_set_holder_selected_contest_delay(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1get_1is_1outbound_1from_1holder(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = ChannelTransactionParameters_get_is_outbound_from_holder(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1set_1is_1outbound_1from_1holder(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	ChannelTransactionParameters_set_is_outbound_from_holder(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1get_1counterparty_1parameters(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCounterpartyChannelTransactionParameters ret_var = ChannelTransactionParameters_get_counterparty_parameters(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1set_1counterparty_1parameters(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCounterpartyChannelTransactionParameters val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = CounterpartyChannelTransactionParameters_clone(&val_conv);
	ChannelTransactionParameters_set_counterparty_parameters(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1get_1funding_1outpoint(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKOutPoint ret_var = ChannelTransactionParameters_get_funding_outpoint(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1set_1funding_1outpoint(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKOutPoint val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = OutPoint_clone(&val_conv);
	ChannelTransactionParameters_set_funding_outpoint(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1new(JNIEnv *env, jclass clz, int64_t holder_pubkeys_arg, int16_t holder_selected_contest_delay_arg, jboolean is_outbound_from_holder_arg, int64_t counterparty_parameters_arg, int64_t funding_outpoint_arg) {
	LDKChannelPublicKeys holder_pubkeys_arg_conv;
	holder_pubkeys_arg_conv.inner = (void*)(holder_pubkeys_arg & (~1));
	holder_pubkeys_arg_conv.is_owned = (holder_pubkeys_arg & 1) || (holder_pubkeys_arg == 0);
	if (holder_pubkeys_arg_conv.inner != NULL)
		holder_pubkeys_arg_conv = ChannelPublicKeys_clone(&holder_pubkeys_arg_conv);
	LDKCounterpartyChannelTransactionParameters counterparty_parameters_arg_conv;
	counterparty_parameters_arg_conv.inner = (void*)(counterparty_parameters_arg & (~1));
	counterparty_parameters_arg_conv.is_owned = (counterparty_parameters_arg & 1) || (counterparty_parameters_arg == 0);
	if (counterparty_parameters_arg_conv.inner != NULL)
		counterparty_parameters_arg_conv = CounterpartyChannelTransactionParameters_clone(&counterparty_parameters_arg_conv);
	LDKOutPoint funding_outpoint_arg_conv;
	funding_outpoint_arg_conv.inner = (void*)(funding_outpoint_arg & (~1));
	funding_outpoint_arg_conv.is_owned = (funding_outpoint_arg & 1) || (funding_outpoint_arg == 0);
	if (funding_outpoint_arg_conv.inner != NULL)
		funding_outpoint_arg_conv = OutPoint_clone(&funding_outpoint_arg_conv);
	LDKChannelTransactionParameters ret_var = ChannelTransactionParameters_new(holder_pubkeys_arg_conv, holder_selected_contest_delay_arg, is_outbound_from_holder_arg, counterparty_parameters_arg_conv, funding_outpoint_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CounterpartyChannelTransactionParameters_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CounterpartyChannelTransactionParameters_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CounterpartyChannelTransactionParameters_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKCounterpartyChannelTransactionParameters orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKCounterpartyChannelTransactionParameters ret_var = CounterpartyChannelTransactionParameters_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CounterpartyChannelTransactionParameters_1get_1pubkeys(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = CounterpartyChannelTransactionParameters_get_pubkeys(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CounterpartyChannelTransactionParameters_1set_1pubkeys(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelPublicKeys val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelPublicKeys_clone(&val_conv);
	CounterpartyChannelTransactionParameters_set_pubkeys(&this_ptr_conv, val_conv);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_CounterpartyChannelTransactionParameters_1get_1selected_1contest_1delay(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = CounterpartyChannelTransactionParameters_get_selected_contest_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CounterpartyChannelTransactionParameters_1set_1selected_1contest_1delay(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKCounterpartyChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	CounterpartyChannelTransactionParameters_set_selected_contest_delay(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CounterpartyChannelTransactionParameters_1new(JNIEnv *env, jclass clz, int64_t pubkeys_arg, int16_t selected_contest_delay_arg) {
	LDKChannelPublicKeys pubkeys_arg_conv;
	pubkeys_arg_conv.inner = (void*)(pubkeys_arg & (~1));
	pubkeys_arg_conv.is_owned = (pubkeys_arg & 1) || (pubkeys_arg == 0);
	if (pubkeys_arg_conv.inner != NULL)
		pubkeys_arg_conv = ChannelPublicKeys_clone(&pubkeys_arg_conv);
	LDKCounterpartyChannelTransactionParameters ret_var = CounterpartyChannelTransactionParameters_new(pubkeys_arg_conv, selected_contest_delay_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1is_1populated(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	jboolean ret_val = ChannelTransactionParameters_is_populated(&this_arg_conv);
	return ret_val;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1as_1holder_1broadcastable(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKDirectedChannelTransactionParameters ret_var = ChannelTransactionParameters_as_holder_broadcastable(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1as_1counterparty_1broadcastable(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKDirectedChannelTransactionParameters ret_var = ChannelTransactionParameters_as_counterparty_broadcastable(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_CounterpartyChannelTransactionParameters_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKCounterpartyChannelTransactionParameters obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = CounterpartyChannelTransactionParameters_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CounterpartyChannelTransactionParameters_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCounterpartyChannelTransactionParameters ret_var = CounterpartyChannelTransactionParameters_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelTransactionParameters obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelTransactionParameters_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelTransactionParameters_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKChannelTransactionParameters ret_var = ChannelTransactionParameters_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectedChannelTransactionParameters_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDirectedChannelTransactionParameters this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectedChannelTransactionParameters_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_DirectedChannelTransactionParameters_1broadcaster_1pubkeys(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = DirectedChannelTransactionParameters_broadcaster_pubkeys(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_DirectedChannelTransactionParameters_1countersignatory_1pubkeys(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelPublicKeys ret_var = DirectedChannelTransactionParameters_countersignatory_pubkeys(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_DirectedChannelTransactionParameters_1contest_1delay(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int16_t ret_val = DirectedChannelTransactionParameters_contest_delay(&this_arg_conv);
	return ret_val;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_DirectedChannelTransactionParameters_1is_1outbound(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	jboolean ret_val = DirectedChannelTransactionParameters_is_outbound(&this_arg_conv);
	return ret_val;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_DirectedChannelTransactionParameters_1funding_1outpoint(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKDirectedChannelTransactionParameters this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKOutPoint ret_var = DirectedChannelTransactionParameters_funding_outpoint(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HolderCommitmentTransaction_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKHolderCommitmentTransaction orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKHolderCommitmentTransaction ret_var = HolderCommitmentTransaction_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1counterparty_1sig(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, HolderCommitmentTransaction_get_counterparty_sig(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1counterparty_1sig(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKSignature val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 64);
	(*env)->GetByteArrayRegion(env, val, 0, 64, val_ref.compact_form);
	HolderCommitmentTransaction_set_counterparty_sig(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1counterparty_1htlc_1sigs(JNIEnv *env, jclass clz, int64_t this_ptr, jobjectArray val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_SignatureZ val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		val_constr.data = NULL;
	for (size_t i = 0; i < val_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, val, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*env)->GetArrayLength(env, arr_conv_8) == 64);
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		val_constr.data[i] = arr_conv_8_ref;
	}
	HolderCommitmentTransaction_set_counterparty_htlc_sigs(&this_ptr_conv, val_constr);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKHolderCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = HolderCommitmentTransaction_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKHolderCommitmentTransaction ret_var = HolderCommitmentTransaction_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1new(JNIEnv *env, jclass clz, int64_t commitment_tx, int8_tArray counterparty_sig, jobjectArray counterparty_htlc_sigs, int8_tArray holder_funding_key, int8_tArray counterparty_funding_key) {
	LDKCommitmentTransaction commitment_tx_conv;
	commitment_tx_conv.inner = (void*)(commitment_tx & (~1));
	commitment_tx_conv.is_owned = (commitment_tx & 1) || (commitment_tx == 0);
	if (commitment_tx_conv.inner != NULL)
		commitment_tx_conv = CommitmentTransaction_clone(&commitment_tx_conv);
	LDKSignature counterparty_sig_ref;
	CHECK((*env)->GetArrayLength(env, counterparty_sig) == 64);
	(*env)->GetByteArrayRegion(env, counterparty_sig, 0, 64, counterparty_sig_ref.compact_form);
	LDKCVec_SignatureZ counterparty_htlc_sigs_constr;
	counterparty_htlc_sigs_constr.datalen = (*env)->GetArrayLength(env, counterparty_htlc_sigs);
	if (counterparty_htlc_sigs_constr.datalen > 0)
		counterparty_htlc_sigs_constr.data = MALLOC(counterparty_htlc_sigs_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		counterparty_htlc_sigs_constr.data = NULL;
	for (size_t i = 0; i < counterparty_htlc_sigs_constr.datalen; i++) {
		int8_tArray arr_conv_8 = (*env)->GetObjectArrayElement(env, counterparty_htlc_sigs, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*env)->GetArrayLength(env, arr_conv_8) == 64);
		(*env)->GetByteArrayRegion(env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		counterparty_htlc_sigs_constr.data[i] = arr_conv_8_ref;
	}
	LDKPublicKey holder_funding_key_ref;
	CHECK((*env)->GetArrayLength(env, holder_funding_key) == 33);
	(*env)->GetByteArrayRegion(env, holder_funding_key, 0, 33, holder_funding_key_ref.compressed_form);
	LDKPublicKey counterparty_funding_key_ref;
	CHECK((*env)->GetArrayLength(env, counterparty_funding_key) == 33);
	(*env)->GetByteArrayRegion(env, counterparty_funding_key, 0, 33, counterparty_funding_key_ref.compressed_form);
	LDKHolderCommitmentTransaction ret_var = HolderCommitmentTransaction_new(commitment_tx_conv, counterparty_sig_ref, counterparty_htlc_sigs_constr, holder_funding_key_ref, counterparty_funding_key_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	BuiltCommitmentTransaction_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKBuiltCommitmentTransaction orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKBuiltCommitmentTransaction ret_var = BuiltCommitmentTransaction_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1get_1transaction(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKTransaction arg_var = BuiltCommitmentTransaction_get_transaction(&this_ptr_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	Transaction_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1set_1transaction(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKTransaction val_ref;
	val_ref.datalen = (*env)->GetArrayLength(env, val);
	val_ref.data = MALLOC(val_ref.datalen, "LDKTransaction Bytes");
	(*env)->GetByteArrayRegion(env, val, 0, val_ref.datalen, val_ref.data);
	val_ref.data_is_owned = true;
	BuiltCommitmentTransaction_set_transaction(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1get_1txid(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *BuiltCommitmentTransaction_get_txid(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1set_1txid(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKBuiltCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	BuiltCommitmentTransaction_set_txid(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1new(JNIEnv *env, jclass clz, int8_tArray transaction_arg, int8_tArray txid_arg) {
	LDKTransaction transaction_arg_ref;
	transaction_arg_ref.datalen = (*env)->GetArrayLength(env, transaction_arg);
	transaction_arg_ref.data = MALLOC(transaction_arg_ref.datalen, "LDKTransaction Bytes");
	(*env)->GetByteArrayRegion(env, transaction_arg, 0, transaction_arg_ref.datalen, transaction_arg_ref.data);
	transaction_arg_ref.data_is_owned = true;
	LDKThirtyTwoBytes txid_arg_ref;
	CHECK((*env)->GetArrayLength(env, txid_arg) == 32);
	(*env)->GetByteArrayRegion(env, txid_arg, 0, 32, txid_arg_ref.data);
	LDKBuiltCommitmentTransaction ret_var = BuiltCommitmentTransaction_new(transaction_arg_ref, txid_arg_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKBuiltCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = BuiltCommitmentTransaction_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKBuiltCommitmentTransaction ret_var = BuiltCommitmentTransaction_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1get_1sighash_1all(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray funding_redeemscript, int64_t channel_value_satoshis) {
	LDKBuiltCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKu8slice funding_redeemscript_ref;
	funding_redeemscript_ref.datalen = (*env)->GetArrayLength(env, funding_redeemscript);
	funding_redeemscript_ref.data = (*env)->GetByteArrayElements (env, funding_redeemscript, NULL);
	int8_tArray arg_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 32, BuiltCommitmentTransaction_get_sighash_all(&this_arg_conv, funding_redeemscript_ref, channel_value_satoshis).data);
	(*env)->ReleaseByteArrayElements(env, funding_redeemscript, (int8_t*)funding_redeemscript_ref.data, 0);
	return arg_arr;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_BuiltCommitmentTransaction_1sign(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray funding_key, int8_tArray funding_redeemscript, int64_t channel_value_satoshis) {
	LDKBuiltCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char funding_key_arr[32];
	CHECK((*env)->GetArrayLength(env, funding_key) == 32);
	(*env)->GetByteArrayRegion(env, funding_key, 0, 32, funding_key_arr);
	unsigned char (*funding_key_ref)[32] = &funding_key_arr;
	LDKu8slice funding_redeemscript_ref;
	funding_redeemscript_ref.datalen = (*env)->GetArrayLength(env, funding_redeemscript);
	funding_redeemscript_ref.data = (*env)->GetByteArrayElements (env, funding_redeemscript, NULL);
	int8_tArray arg_arr = (*env)->NewByteArray(env, 64);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 64, BuiltCommitmentTransaction_sign(&this_arg_conv, funding_key_ref, funding_redeemscript_ref, channel_value_satoshis).compact_form);
	(*env)->ReleaseByteArrayElements(env, funding_redeemscript, (int8_t*)funding_redeemscript_ref.data, 0);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentTransaction_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKCommitmentTransaction orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKCommitmentTransaction ret_var = CommitmentTransaction_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = CommitmentTransaction_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCommitmentTransaction ret_var = CommitmentTransaction_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1commitment_1number(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = CommitmentTransaction_commitment_number(&this_arg_conv);
	return ret_val;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1to_1broadcaster_1value_1sat(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = CommitmentTransaction_to_broadcaster_value_sat(&this_arg_conv);
	return ret_val;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1to_1countersignatory_1value_1sat(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int64_t ret_val = CommitmentTransaction_to_countersignatory_value_sat(&this_arg_conv);
	return ret_val;
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1feerate_1per_1kw(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int32_t ret_val = CommitmentTransaction_feerate_per_kw(&this_arg_conv);
	return ret_val;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1trust(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKTrustedCommitmentTransaction ret_var = CommitmentTransaction_trust(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_CommitmentTransaction_1verify(JNIEnv *env, jclass clz, int64_t this_arg, int64_t channel_parameters, int64_t broadcaster_keys, int64_t countersignatory_keys) {
	LDKCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKDirectedChannelTransactionParameters channel_parameters_conv;
	channel_parameters_conv.inner = (void*)(channel_parameters & (~1));
	channel_parameters_conv.is_owned = false;
	LDKChannelPublicKeys broadcaster_keys_conv;
	broadcaster_keys_conv.inner = (void*)(broadcaster_keys & (~1));
	broadcaster_keys_conv.is_owned = false;
	LDKChannelPublicKeys countersignatory_keys_conv;
	countersignatory_keys_conv.inner = (void*)(countersignatory_keys & (~1));
	countersignatory_keys_conv.is_owned = false;
	LDKCResult_TrustedCommitmentTransactionNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_TrustedCommitmentTransactionNoneZ), "LDKCResult_TrustedCommitmentTransactionNoneZ");
	*ret_conv = CommitmentTransaction_verify(&this_arg_conv, &channel_parameters_conv, &broadcaster_keys_conv, &countersignatory_keys_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TrustedCommitmentTransaction_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKTrustedCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	TrustedCommitmentTransaction_free(this_ptr_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_TrustedCommitmentTransaction_1txid(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 32, TrustedCommitmentTransaction_txid(&this_arg_conv).data);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_TrustedCommitmentTransaction_1built_1transaction(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKBuiltCommitmentTransaction ret_var = TrustedCommitmentTransaction_built_transaction(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_TrustedCommitmentTransaction_1keys(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKTxCreationKeys ret_var = TrustedCommitmentTransaction_keys(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_TrustedCommitmentTransaction_1get_1htlc_1sigs(JNIEnv *env, jclass clz, int64_t this_arg, int8_tArray htlc_base_key, int64_t channel_parameters) {
	LDKTrustedCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	unsigned char htlc_base_key_arr[32];
	CHECK((*env)->GetArrayLength(env, htlc_base_key) == 32);
	(*env)->GetByteArrayRegion(env, htlc_base_key, 0, 32, htlc_base_key_arr);
	unsigned char (*htlc_base_key_ref)[32] = &htlc_base_key_arr;
	LDKDirectedChannelTransactionParameters channel_parameters_conv;
	channel_parameters_conv.inner = (void*)(channel_parameters & (~1));
	channel_parameters_conv.is_owned = false;
	LDKCResult_CVec_SignatureZNoneZ* ret_conv = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret_conv = TrustedCommitmentTransaction_get_htlc_sigs(&this_arg_conv, htlc_base_key_ref, &channel_parameters_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_get_1commitment_1transaction_1number_1obscure_1factor(JNIEnv *env, jclass clz, int8_tArray broadcaster_payment_basepoint, int8_tArray countersignatory_payment_basepoint, jboolean outbound_from_broadcaster) {
	LDKPublicKey broadcaster_payment_basepoint_ref;
	CHECK((*env)->GetArrayLength(env, broadcaster_payment_basepoint) == 33);
	(*env)->GetByteArrayRegion(env, broadcaster_payment_basepoint, 0, 33, broadcaster_payment_basepoint_ref.compressed_form);
	LDKPublicKey countersignatory_payment_basepoint_ref;
	CHECK((*env)->GetArrayLength(env, countersignatory_payment_basepoint) == 33);
	(*env)->GetByteArrayRegion(env, countersignatory_payment_basepoint, 0, 33, countersignatory_payment_basepoint_ref.compressed_form);
	int64_t ret_val = get_commitment_transaction_number_obscure_factor(broadcaster_payment_basepoint_ref, countersignatory_payment_basepoint_ref, outbound_from_broadcaster);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InitFeatures_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKInitFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	InitFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeFeatures_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelFeatures_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHop_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHop_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKRouteHop orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRouteHop ret_var = RouteHop_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, RouteHop_get_pubkey(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1pubkey(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	RouteHop_set_pubkey(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1node_1features(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures ret_var = RouteHop_get_node_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1node_1features(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	RouteHop_set_node_features(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHop_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHop_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1channel_1features(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures ret_var = RouteHop_get_channel_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1channel_1features(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	RouteHop_set_channel_features(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1fee_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHop_get_fee_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1fee_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHop_set_fee_msat(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1cltv_1expiry_1delta(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = RouteHop_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1cltv_1expiry_1delta(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHop_set_cltv_expiry_delta(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHop_1new(JNIEnv *env, jclass clz, int8_tArray pubkey_arg, int64_t node_features_arg, int64_t short_channel_id_arg, int64_t channel_features_arg, int64_t fee_msat_arg, int32_t cltv_expiry_delta_arg) {
	LDKPublicKey pubkey_arg_ref;
	CHECK((*env)->GetArrayLength(env, pubkey_arg) == 33);
	(*env)->GetByteArrayRegion(env, pubkey_arg, 0, 33, pubkey_arg_ref.compressed_form);
	LDKNodeFeatures node_features_arg_conv;
	node_features_arg_conv.inner = (void*)(node_features_arg & (~1));
	node_features_arg_conv.is_owned = (node_features_arg & 1) || (node_features_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKChannelFeatures channel_features_arg_conv;
	channel_features_arg_conv.inner = (void*)(channel_features_arg & (~1));
	channel_features_arg_conv.is_owned = (channel_features_arg & 1) || (channel_features_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKRouteHop ret_var = RouteHop_new(pubkey_arg_ref, node_features_arg_conv, short_channel_id_arg, channel_features_arg_conv, fee_msat_arg, cltv_expiry_delta_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Route_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRoute this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Route_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Route_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKRoute orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRoute ret_var = Route_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Route_1set_1paths(JNIEnv *env, jclass clz, int64_t this_ptr, jobjectArray val) {
	LDKRoute this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_CVec_RouteHopZZ val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		val_constr.data = NULL;
	for (size_t m = 0; m < val_constr.datalen; m++) {
		int64_tArray arr_conv_12 = (*env)->GetObjectArrayElement(env, val, m);
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = (*env)->GetArrayLength(env, arr_conv_12);
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		int64_t* arr_conv_12_vals = (*env)->GetLongArrayElements (env, arr_conv_12, NULL);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			int64_t arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			if (arr_conv_10_conv.inner != NULL)
				arr_conv_10_conv = RouteHop_clone(&arr_conv_10_conv);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		(*env)->ReleaseLongArrayElements(env, arr_conv_12, arr_conv_12_vals, 0);
		val_constr.data[m] = arr_conv_12_constr;
	}
	Route_set_paths(&this_ptr_conv, val_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Route_1new(JNIEnv *env, jclass clz, jobjectArray paths_arg) {
	LDKCVec_CVec_RouteHopZZ paths_arg_constr;
	paths_arg_constr.datalen = (*env)->GetArrayLength(env, paths_arg);
	if (paths_arg_constr.datalen > 0)
		paths_arg_constr.data = MALLOC(paths_arg_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		paths_arg_constr.data = NULL;
	for (size_t m = 0; m < paths_arg_constr.datalen; m++) {
		int64_tArray arr_conv_12 = (*env)->GetObjectArrayElement(env, paths_arg, m);
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = (*env)->GetArrayLength(env, arr_conv_12);
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		int64_t* arr_conv_12_vals = (*env)->GetLongArrayElements (env, arr_conv_12, NULL);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			int64_t arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			if (arr_conv_10_conv.inner != NULL)
				arr_conv_10_conv = RouteHop_clone(&arr_conv_10_conv);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		(*env)->ReleaseLongArrayElements(env, arr_conv_12, arr_conv_12_vals, 0);
		paths_arg_constr.data[m] = arr_conv_12_constr;
	}
	LDKRoute ret_var = Route_new(paths_arg_constr);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_Route_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKRoute obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = Route_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_Route_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_RouteDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteDecodeErrorZ), "LDKCResult_RouteDecodeErrorZ");
	*ret_conv = Route_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHint_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHint_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKRouteHint orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRouteHint ret_var = RouteHint_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1src_1node_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, RouteHint_get_src_node_id(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1src_1node_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	RouteHint_set_src_node_id(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHint_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1short_1channel_1id(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHint_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1fees(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees ret_var = RouteHint_get_fees(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1fees(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = RoutingFees_clone(&val_conv);
	RouteHint_set_fees(&this_ptr_conv, val_conv);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1cltv_1expiry_1delta(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = RouteHint_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1cltv_1expiry_1delta(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHint_set_cltv_expiry_delta(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = RouteHint_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RouteHint_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RouteHint_1new(JNIEnv *env, jclass clz, int8_tArray src_node_id_arg, int64_t short_channel_id_arg, int64_t fees_arg, int16_t cltv_expiry_delta_arg, int64_t htlc_minimum_msat_arg) {
	LDKPublicKey src_node_id_arg_ref;
	CHECK((*env)->GetArrayLength(env, src_node_id_arg) == 33);
	(*env)->GetByteArrayRegion(env, src_node_id_arg, 0, 33, src_node_id_arg_ref.compressed_form);
	LDKRoutingFees fees_arg_conv;
	fees_arg_conv.inner = (void*)(fees_arg & (~1));
	fees_arg_conv.is_owned = (fees_arg & 1) || (fees_arg == 0);
	if (fees_arg_conv.inner != NULL)
		fees_arg_conv = RoutingFees_clone(&fees_arg_conv);
	LDKRouteHint ret_var = RouteHint_new(src_node_id_arg_ref, short_channel_id_arg, fees_arg_conv, cltv_expiry_delta_arg, htlc_minimum_msat_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_get_1route(JNIEnv *env, jclass clz, int8_tArray our_node_id, int64_t network, int8_tArray target, int64_tArray first_hops, int64_tArray last_hops, int64_t final_value_msat, int32_t final_cltv, int64_t logger) {
	LDKPublicKey our_node_id_ref;
	CHECK((*env)->GetArrayLength(env, our_node_id) == 33);
	(*env)->GetByteArrayRegion(env, our_node_id, 0, 33, our_node_id_ref.compressed_form);
	LDKNetworkGraph network_conv;
	network_conv.inner = (void*)(network & (~1));
	network_conv.is_owned = false;
	LDKPublicKey target_ref;
	CHECK((*env)->GetArrayLength(env, target) == 33);
	(*env)->GetByteArrayRegion(env, target, 0, 33, target_ref.compressed_form);
	LDKCVec_ChannelDetailsZ first_hops_constr;
	first_hops_constr.datalen = (*env)->GetArrayLength(env, first_hops);
	if (first_hops_constr.datalen > 0)
		first_hops_constr.data = MALLOC(first_hops_constr.datalen * sizeof(LDKChannelDetails), "LDKCVec_ChannelDetailsZ Elements");
	else
		first_hops_constr.data = NULL;
	int64_t* first_hops_vals = (*env)->GetLongArrayElements (env, first_hops, NULL);
	for (size_t q = 0; q < first_hops_constr.datalen; q++) {
		int64_t arr_conv_16 = first_hops_vals[q];
		LDKChannelDetails arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		first_hops_constr.data[q] = arr_conv_16_conv;
	}
	(*env)->ReleaseLongArrayElements(env, first_hops, first_hops_vals, 0);
	LDKCVec_RouteHintZ last_hops_constr;
	last_hops_constr.datalen = (*env)->GetArrayLength(env, last_hops);
	if (last_hops_constr.datalen > 0)
		last_hops_constr.data = MALLOC(last_hops_constr.datalen * sizeof(LDKRouteHint), "LDKCVec_RouteHintZ Elements");
	else
		last_hops_constr.data = NULL;
	int64_t* last_hops_vals = (*env)->GetLongArrayElements (env, last_hops, NULL);
	for (size_t l = 0; l < last_hops_constr.datalen; l++) {
		int64_t arr_conv_11 = last_hops_vals[l];
		LDKRouteHint arr_conv_11_conv;
		arr_conv_11_conv.inner = (void*)(arr_conv_11 & (~1));
		arr_conv_11_conv.is_owned = (arr_conv_11 & 1) || (arr_conv_11 == 0);
		if (arr_conv_11_conv.inner != NULL)
			arr_conv_11_conv = RouteHint_clone(&arr_conv_11_conv);
		last_hops_constr.data[l] = arr_conv_11_conv;
	}
	(*env)->ReleaseLongArrayElements(env, last_hops, last_hops_vals, 0);
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKCResult_RouteLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret_conv = get_route(our_node_id_ref, &network_conv, target_ref, &first_hops_constr, last_hops_constr, final_value_msat, final_cltv, logger_conv);
	FREE(first_hops_constr.data);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNetworkGraph this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NetworkGraph_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LockedNetworkGraph_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKLockedNetworkGraph this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LockedNetworkGraph_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNetGraphMsgHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NetGraphMsgHandler_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1new(JNIEnv *env, jclass clz, int8_tArray genesis_hash, int64_t chain_access, int64_t logger) {
	LDKThirtyTwoBytes genesis_hash_ref;
	CHECK((*env)->GetArrayLength(env, genesis_hash) == 32);
	(*env)->GetByteArrayRegion(env, genesis_hash, 0, 32, genesis_hash_ref.data);
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKNetGraphMsgHandler ret_var = NetGraphMsgHandler_new(genesis_hash_ref, chain_access_conv, logger_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1from_1net_1graph(JNIEnv *env, jclass clz, int64_t chain_access, int64_t logger, int64_t network_graph) {
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKNetworkGraph network_graph_conv;
	network_graph_conv.inner = (void*)(network_graph & (~1));
	network_graph_conv.is_owned = (network_graph & 1) || (network_graph == 0);
	// Warning: we may need a move here but can't clone!
	LDKNetGraphMsgHandler ret_var = NetGraphMsgHandler_from_net_graph(chain_access_conv, logger_conv, network_graph_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1read_1locked_1graph(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKLockedNetworkGraph ret_var = NetGraphMsgHandler_read_locked_graph(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_LockedNetworkGraph_1graph(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKLockedNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKNetworkGraph ret_var = LockedNetworkGraph_graph(&this_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1as_1RoutingMessageHandler(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKRoutingMessageHandler* ret = MALLOC(sizeof(LDKRoutingMessageHandler), "LDKRoutingMessageHandler");
	*ret = NetGraphMsgHandler_as_RoutingMessageHandler(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1as_1MessageSendEventsProvider(JNIEnv *env, jclass clz, int64_t this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKMessageSendEventsProvider* ret = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*ret = NetGraphMsgHandler_as_MessageSendEventsProvider(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectionalChannelInfo_free(this_ptr_conv);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1last_1update(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = DirectionalChannelInfo_get_last_update(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1last_1update(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_last_update(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1enabled(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	jboolean ret_val = DirectionalChannelInfo_get_enabled(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1enabled(JNIEnv *env, jclass clz, int64_t this_ptr, jboolean val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_enabled(&this_ptr_conv, val);
}

JNIEXPORT int16_t JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1cltv_1expiry_1delta(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int16_t ret_val = DirectionalChannelInfo_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1cltv_1expiry_1delta(JNIEnv *env, jclass clz, int64_t this_ptr, int16_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_cltv_expiry_delta(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int64_t ret_val = DirectionalChannelInfo_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1htlc_1minimum_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	DirectionalChannelInfo_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1fees(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees ret_var = DirectionalChannelInfo_get_fees(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1fees(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = RoutingFees_clone(&val_conv);
	DirectionalChannelInfo_set_fees(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1last_1update_1message(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelUpdate ret_var = DirectionalChannelInfo_get_last_update_message(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1last_1update_1message(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelUpdate val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelUpdate_clone(&val_conv);
	DirectionalChannelInfo_set_last_update_message(&this_ptr_conv, val_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKDirectionalChannelInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = DirectionalChannelInfo_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKDirectionalChannelInfo ret_var = DirectionalChannelInfo_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelInfo_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1features(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures ret_var = ChannelInfo_get_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1features(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelInfo_set_features(&this_ptr_conv, val_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1node_1one(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, ChannelInfo_get_node_one(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1node_1one(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	ChannelInfo_set_node_one(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1one_1to_1two(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo ret_var = ChannelInfo_get_one_to_two(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1one_1to_1two(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelInfo_set_one_to_two(&this_ptr_conv, val_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1node_1two(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray arg_arr = (*env)->NewByteArray(env, 33);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, 33, ChannelInfo_get_node_two(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1node_1two(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKPublicKey val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 33);
	(*env)->GetByteArrayRegion(env, val, 0, 33, val_ref.compressed_form);
	ChannelInfo_set_node_two(&this_ptr_conv, val_ref);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1two_1to_1one(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo ret_var = ChannelInfo_get_two_to_one(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1two_1to_1one(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKDirectionalChannelInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelInfo_set_two_to_one(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1announcement_1message(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelAnnouncement ret_var = ChannelInfo_get_announcement_message(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1announcement_1message(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKChannelAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelAnnouncement_clone(&val_conv);
	ChannelInfo_set_announcement_message(&this_ptr_conv, val_conv);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKChannelInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = ChannelInfo_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKChannelInfo ret_var = ChannelInfo_read(ser_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RoutingFees_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingFees_1clone(JNIEnv *env, jclass clz, int64_t orig) {
	LDKRoutingFees orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = false;
	LDKRoutingFees ret_var = RoutingFees_clone(&orig_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_RoutingFees_1get_1base_1msat(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = RoutingFees_get_base_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1set_1base_1msat(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RoutingFees_set_base_msat(&this_ptr_conv, val);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_RoutingFees_1get_1proportional_1millionths(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = RoutingFees_get_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1set_1proportional_1millionths(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	RoutingFees_set_proportional_millionths(&this_ptr_conv, val);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingFees_1new(JNIEnv *env, jclass clz, int32_t base_msat_arg, int32_t proportional_millionths_arg) {
	LDKRoutingFees ret_var = RoutingFees_new(base_msat_arg, proportional_millionths_arg);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_RoutingFees_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_RoutingFeesDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_RoutingFeesDecodeErrorZ), "LDKCResult_RoutingFeesDecodeErrorZ");
	*ret_conv = RoutingFees_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_RoutingFees_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKRoutingFees obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = RoutingFees_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeAnnouncementInfo_free(this_ptr_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1features(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures ret_var = NodeAnnouncementInfo_get_features(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1features(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	NodeAnnouncementInfo_set_features(&this_ptr_conv, val_conv);
}

JNIEXPORT int32_t JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1last_1update(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int32_t ret_val = NodeAnnouncementInfo_get_last_update(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1last_1update(JNIEnv *env, jclass clz, int64_t this_ptr, int32_t val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	NodeAnnouncementInfo_set_last_update(&this_ptr_conv, val);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1rgb(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 3);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 3, *NodeAnnouncementInfo_get_rgb(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1rgb(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThreeBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 3);
	(*env)->GetByteArrayRegion(env, val, 0, 3, val_ref.data);
	NodeAnnouncementInfo_set_rgb(&this_ptr_conv, val_ref);
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1alias(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	int8_tArray ret_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, ret_arr, 0, 32, *NodeAnnouncementInfo_get_alias(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1alias(JNIEnv *env, jclass clz, int64_t this_ptr, int8_tArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKThirtyTwoBytes val_ref;
	CHECK((*env)->GetArrayLength(env, val) == 32);
	(*env)->GetByteArrayRegion(env, val, 0, 32, val_ref.data);
	NodeAnnouncementInfo_set_alias(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1addresses(JNIEnv *env, jclass clz, int64_t this_ptr, int64_tArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_NetAddressZ val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (*env)->GetLongArrayElements (env, val, NULL);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		int64_t arr_conv_12 = val_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		val_constr.data[m] = arr_conv_12_conv;
	}
	(*env)->ReleaseLongArrayElements(env, val, val_vals, 0);
	NodeAnnouncementInfo_set_addresses(&this_ptr_conv, val_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1announcement_1message(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncement ret_var = NodeAnnouncementInfo_get_announcement_message(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1announcement_1message(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = NodeAnnouncement_clone(&val_conv);
	NodeAnnouncementInfo_set_announcement_message(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1new(JNIEnv *env, jclass clz, int64_t features_arg, int32_t last_update_arg, int8_tArray rgb_arg, int8_tArray alias_arg, int64_tArray addresses_arg, int64_t announcement_message_arg) {
	LDKNodeFeatures features_arg_conv;
	features_arg_conv.inner = (void*)(features_arg & (~1));
	features_arg_conv.is_owned = (features_arg & 1) || (features_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKThreeBytes rgb_arg_ref;
	CHECK((*env)->GetArrayLength(env, rgb_arg) == 3);
	(*env)->GetByteArrayRegion(env, rgb_arg, 0, 3, rgb_arg_ref.data);
	LDKThirtyTwoBytes alias_arg_ref;
	CHECK((*env)->GetArrayLength(env, alias_arg) == 32);
	(*env)->GetByteArrayRegion(env, alias_arg, 0, 32, alias_arg_ref.data);
	LDKCVec_NetAddressZ addresses_arg_constr;
	addresses_arg_constr.datalen = (*env)->GetArrayLength(env, addresses_arg);
	if (addresses_arg_constr.datalen > 0)
		addresses_arg_constr.data = MALLOC(addresses_arg_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		addresses_arg_constr.data = NULL;
	int64_t* addresses_arg_vals = (*env)->GetLongArrayElements (env, addresses_arg, NULL);
	for (size_t m = 0; m < addresses_arg_constr.datalen; m++) {
		int64_t arr_conv_12 = addresses_arg_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		addresses_arg_constr.data[m] = arr_conv_12_conv;
	}
	(*env)->ReleaseLongArrayElements(env, addresses_arg, addresses_arg_vals, 0);
	LDKNodeAnnouncement announcement_message_arg_conv;
	announcement_message_arg_conv.inner = (void*)(announcement_message_arg & (~1));
	announcement_message_arg_conv.is_owned = (announcement_message_arg & 1) || (announcement_message_arg == 0);
	if (announcement_message_arg_conv.inner != NULL)
		announcement_message_arg_conv = NodeAnnouncement_clone(&announcement_message_arg_conv);
	LDKNodeAnnouncementInfo ret_var = NodeAnnouncementInfo_new(features_arg_conv, last_update_arg, rgb_arg_ref, alias_arg_ref, addresses_arg_constr, announcement_message_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKNodeAnnouncementInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NodeAnnouncementInfo_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_NodeAnnouncementInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeAnnouncementInfoDecodeErrorZ), "LDKCResult_NodeAnnouncementInfoDecodeErrorZ");
	*ret_conv = NodeAnnouncementInfo_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1free(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeInfo_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1channels(JNIEnv *env, jclass clz, int64_t this_ptr, int64_tArray val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKCVec_u64Z val_constr;
	val_constr.datalen = (*env)->GetArrayLength(env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	int64_t* val_vals = (*env)->GetLongArrayElements (env, val, NULL);
	for (size_t g = 0; g < val_constr.datalen; g++) {
		int64_t arr_conv_6 = val_vals[g];
		val_constr.data[g] = arr_conv_6;
	}
	(*env)->ReleaseLongArrayElements(env, val, val_vals, 0);
	NodeInfo_set_channels(&this_ptr_conv, val_constr);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeInfo_1get_1lowest_1inbound_1channel_1fees(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees ret_var = NodeInfo_get_lowest_inbound_channel_fees(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1lowest_1inbound_1channel_1fees(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = RoutingFees_clone(&val_conv);
	NodeInfo_set_lowest_inbound_channel_fees(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeInfo_1get_1announcement_1info(JNIEnv *env, jclass clz, int64_t this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncementInfo ret_var = NodeInfo_get_announcement_info(&this_ptr_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1announcement_1info(JNIEnv *env, jclass clz, int64_t this_ptr, int64_t val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = false;
	LDKNodeAnnouncementInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	NodeInfo_set_announcement_info(&this_ptr_conv, val_conv);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeInfo_1new(JNIEnv *env, jclass clz, int64_tArray channels_arg, int64_t lowest_inbound_channel_fees_arg, int64_t announcement_info_arg) {
	LDKCVec_u64Z channels_arg_constr;
	channels_arg_constr.datalen = (*env)->GetArrayLength(env, channels_arg);
	if (channels_arg_constr.datalen > 0)
		channels_arg_constr.data = MALLOC(channels_arg_constr.datalen * sizeof(int64_t), "LDKCVec_u64Z Elements");
	else
		channels_arg_constr.data = NULL;
	int64_t* channels_arg_vals = (*env)->GetLongArrayElements (env, channels_arg, NULL);
	for (size_t g = 0; g < channels_arg_constr.datalen; g++) {
		int64_t arr_conv_6 = channels_arg_vals[g];
		channels_arg_constr.data[g] = arr_conv_6;
	}
	(*env)->ReleaseLongArrayElements(env, channels_arg, channels_arg_vals, 0);
	LDKRoutingFees lowest_inbound_channel_fees_arg_conv;
	lowest_inbound_channel_fees_arg_conv.inner = (void*)(lowest_inbound_channel_fees_arg & (~1));
	lowest_inbound_channel_fees_arg_conv.is_owned = (lowest_inbound_channel_fees_arg & 1) || (lowest_inbound_channel_fees_arg == 0);
	if (lowest_inbound_channel_fees_arg_conv.inner != NULL)
		lowest_inbound_channel_fees_arg_conv = RoutingFees_clone(&lowest_inbound_channel_fees_arg_conv);
	LDKNodeAnnouncementInfo announcement_info_arg_conv;
	announcement_info_arg_conv.inner = (void*)(announcement_info_arg & (~1));
	announcement_info_arg_conv.is_owned = (announcement_info_arg & 1) || (announcement_info_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKNodeInfo ret_var = NodeInfo_new(channels_arg_constr, lowest_inbound_channel_fees_arg_conv, announcement_info_arg_conv);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_NodeInfo_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKNodeInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NodeInfo_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NodeInfo_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_NodeInfoDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NodeInfoDecodeErrorZ), "LDKCResult_NodeInfoDecodeErrorZ");
	*ret_conv = NodeInfo_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int8_tArray JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1write(JNIEnv *env, jclass clz, int64_t obj) {
	LDKNetworkGraph obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = false;
	LDKCVec_u8Z arg_var = NetworkGraph_write(&obj_conv);
	int8_tArray arg_arr = (*env)->NewByteArray(env, arg_var.datalen);
	(*env)->SetByteArrayRegion(env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1read(JNIEnv *env, jclass clz, int8_tArray ser) {
	LDKu8slice ser_ref;
	ser_ref.datalen = (*env)->GetArrayLength(env, ser);
	ser_ref.data = (*env)->GetByteArrayElements (env, ser, NULL);
	LDKCResult_NetworkGraphDecodeErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NetworkGraphDecodeErrorZ), "LDKCResult_NetworkGraphDecodeErrorZ");
	*ret_conv = NetworkGraph_read(ser_ref);
	(*env)->ReleaseByteArrayElements(env, ser, (int8_t*)ser_ref.data, 0);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1new(JNIEnv *env, jclass clz, int8_tArray genesis_hash) {
	LDKThirtyTwoBytes genesis_hash_ref;
	CHECK((*env)->GetArrayLength(env, genesis_hash) == 32);
	(*env)->GetByteArrayRegion(env, genesis_hash, 0, 32, genesis_hash_ref.data);
	LDKNetworkGraph ret_var = NetworkGraph_new(genesis_hash_ref);
	CHECK((((long)ret_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&ret_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long ret_ref = (long)ret_var.inner;
	if (ret_var.is_owned) {
		ret_ref |= 1;
	}
	return ret_ref;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1update_1node_1from_1announcement(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKNodeAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_node_from_announcement(&this_arg_conv, &msg_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1update_1node_1from_1unsigned_1announcement(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKUnsignedNodeAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_node_from_unsigned_announcement(&this_arg_conv, &msg_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1update_1channel_1from_1announcement(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg, int64_t chain_access) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_channel_from_announcement(&this_arg_conv, &msg_conv, chain_access_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1update_1channel_1from_1unsigned_1announcement(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg, int64_t chain_access) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKUnsignedChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_channel_from_unsigned_announcement(&this_arg_conv, &msg_conv, chain_access_conv);
	return (long)ret_conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1close_1channel_1from_1update(JNIEnv *env, jclass clz, int64_t this_arg, int64_t short_channel_id, jboolean is_permanent) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	NetworkGraph_close_channel_from_update(&this_arg_conv, short_channel_id, is_permanent);
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1update_1channel(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKChannelUpdate msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_channel(&this_arg_conv, &msg_conv);
	return (long)ret_conv;
}

JNIEXPORT int64_t JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1update_1channel_1unsigned(JNIEnv *env, jclass clz, int64_t this_arg, int64_t msg) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = false;
	LDKUnsignedChannelUpdate msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = false;
	LDKCResult_NoneLightningErrorZ* ret_conv = MALLOC(sizeof(LDKCResult_NoneLightningErrorZ), "LDKCResult_NoneLightningErrorZ");
	*ret_conv = NetworkGraph_update_channel_unsigned(&this_arg_conv, &msg_conv);
	return (long)ret_conv;
}

