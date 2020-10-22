#include "org_ldk_impl_bindings.h"
#include <rust_types.h>
#include <lightning.h>
#include <string.h>
#include <stdatomic.h>
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
	alloc_freed(ptr);
	__real_free(ptr);
}

void* __real_realloc(void* ptr, size_t newlen);
void* __wrap_realloc(void* ptr, size_t len) {
	alloc_freed(ptr);
	void* res = __real_realloc(ptr, len);
	new_allocation(res, "realloc call");
	return res;
}
void __wrap_reallocarray(void* ptr, size_t new_sz) {
	// Rust doesn't seem to use reallocarray currently
	assert(false);
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
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_read_1bytes (JNIEnv * _env, jclass _b, jlong ptr, jlong len) {
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, len);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, len, (unsigned char*)ptr);
	return ret_arr;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_get_1u8_1slice_1bytes (JNIEnv * _env, jclass _b, jlong slice_ptr) {
	LDKu8slice *slice = (LDKu8slice*)slice_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, slice->datalen);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, slice->datalen, slice->data);
	return ret_arr;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_bytes_1to_1u8_1vec (JNIEnv * _env, jclass _b, jbyteArray bytes) {
	LDKCVec_u8Z *vec = (LDKCVec_u8Z*)MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8");
	vec->datalen = (*_env)->GetArrayLength(_env, bytes);
	vec->data = (uint8_t*)MALLOC(vec->datalen, "LDKCVec_u8Z Bytes");
	(*_env)->GetByteArrayRegion (_env, bytes, 0, vec->datalen, vec->data);
	return (long)vec;
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
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_new_1empty_1slice_1vec (JNIEnv * _env, jclass _b) {
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

static inline LDKAccessError LDKAccessError_from_java(JNIEnv *env, jclass val) {
	switch ((*env)->CallIntMethod(env, val, ordinal_meth)) {
		case 0: return LDKAccessError_UnknownChain;
		case 1: return LDKAccessError_UnknownTx;
	}
	abort();
}
static jclass LDKAccessError_class = NULL;
static jfieldID LDKAccessError_LDKAccessError_UnknownChain = NULL;
static jfieldID LDKAccessError_LDKAccessError_UnknownTx = NULL;
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKAccessError_init (JNIEnv * env, jclass clz) {
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

static inline LDKChannelMonitorUpdateErr LDKChannelMonitorUpdateErr_from_java(JNIEnv *env, jclass val) {
	switch ((*env)->CallIntMethod(env, val, ordinal_meth)) {
		case 0: return LDKChannelMonitorUpdateErr_TemporaryFailure;
		case 1: return LDKChannelMonitorUpdateErr_PermanentFailure;
	}
	abort();
}
static jclass LDKChannelMonitorUpdateErr_class = NULL;
static jfieldID LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_TemporaryFailure = NULL;
static jfieldID LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_PermanentFailure = NULL;
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKChannelMonitorUpdateErr_init (JNIEnv * env, jclass clz) {
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

static inline LDKConfirmationTarget LDKConfirmationTarget_from_java(JNIEnv *env, jclass val) {
	switch ((*env)->CallIntMethod(env, val, ordinal_meth)) {
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
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKConfirmationTarget_init (JNIEnv * env, jclass clz) {
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

static inline LDKLevel LDKLevel_from_java(JNIEnv *env, jclass val) {
	switch ((*env)->CallIntMethod(env, val, ordinal_meth)) {
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
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKLevel_init (JNIEnv * env, jclass clz) {
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

static inline LDKNetwork LDKNetwork_from_java(JNIEnv *env, jclass val) {
	switch ((*env)->CallIntMethod(env, val, ordinal_meth)) {
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
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKNetwork_init (JNIEnv * env, jclass clz) {
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

static inline LDKSecp256k1Error LDKSecp256k1Error_from_java(JNIEnv *env, jclass val) {
	switch ((*env)->CallIntMethod(env, val, ordinal_meth)) {
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
JNIEXPORT void JNICALL Java_org_ldk_enums_LDKSecp256k1Error_init (JNIEnv * env, jclass clz) {
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

JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1u8_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_u8 *vec = (LDKCVecTempl_u8*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(uint8_t));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1u8_1new(JNIEnv *env, jclass _b, jbyteArray elems){
	LDKCVecTempl_u8 *ret = MALLOC(sizeof(LDKCVecTempl_u8), "LDKCVecTempl_u8");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(uint8_t) * ret->datalen, "LDKCVecTempl_u8 Data");
		jbyte *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			ret->data[i] = java_elems[i];
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1usize_1_1Transaction_1new(JNIEnv *_env, jclass _b, jlong a, jlong b) {
	LDKC2TupleTempl_usize__Transaction* ret = MALLOC(sizeof(LDKC2TupleTempl_usize__Transaction), "LDKC2TupleTempl_usize__Transaction");
	ret->a = a;
	LDKTransaction b_conv = *(LDKTransaction*)b;
	ret->b = b_conv;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneChannelMonitorUpdateErrZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NoneChannelMonitorUpdateErrZ*)arg)->result_ok;
}
JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneChannelMonitorUpdateErrZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ *val = (LDKCResult_NoneChannelMonitorUpdateErrZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneChannelMonitorUpdateErrZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ *val = (LDKCResult_NoneChannelMonitorUpdateErrZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKChannelMonitorUpdateErr_to_java(_env, (*val->contents.err));
	return err_conv;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneMonitorUpdateErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NoneMonitorUpdateErrorZ*)arg)->result_ok;
}
JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneMonitorUpdateErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NoneMonitorUpdateErrorZ *val = (LDKCResult_NoneMonitorUpdateErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneMonitorUpdateErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NoneMonitorUpdateErrorZ *val = (LDKCResult_NoneMonitorUpdateErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKMonitorUpdateError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1OutPoint_1_1CVec_1u8Z_1new(JNIEnv *_env, jclass _b, jlong a, jbyteArray b) {
	LDKC2TupleTempl_OutPoint__CVec_u8Z* ret = MALLOC(sizeof(LDKC2TupleTempl_OutPoint__CVec_u8Z), "LDKC2TupleTempl_OutPoint__CVec_u8Z");
	LDKOutPoint a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = OutPoint_clone(&a_conv);
	ret->a = a_conv;
	LDKCVec_u8Z b_ref;
	b_ref.data = (*_env)->GetByteArrayElements (_env, b, NULL);
	b_ref.datalen = (*_env)->GetArrayLength (_env, b);
	ret->b = b_ref;
	//TODO: Really need to call (*_env)->ReleaseByteArrayElements(_env, b, (int8_t*)b_ref.data, 0); here
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1TxOut_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_TxOut *vec = (LDKCVecTempl_TxOut*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKTxOut));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1TxOut_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_TxOut *ret = MALLOC(sizeof(LDKCVecTempl_TxOut), "LDKCVecTempl_TxOut");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKTxOut) * ret->datalen, "LDKCVecTempl_TxOut Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKTxOut arr_elem_conv = *(LDKTxOut*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1ThirtyTwoBytes_1_1CVecTempl_1TxOut_1new(JNIEnv *_env, jclass _b, jbyteArray a, jlongArray b) {
	LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut* ret = MALLOC(sizeof(LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut), "LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut");
	LDKThirtyTwoBytes a_ref;
	CHECK((*_env)->GetArrayLength (_env, a) == 32);
	(*_env)->GetByteArrayRegion (_env, a, 0, 32, a_ref.data);
	ret->a = a_ref;
	LDKCVecTempl_TxOut b_constr;
	b_constr.datalen = (*_env)->GetArrayLength (_env, b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKTxOut), "LDKCVecTempl_TxOut Elements");
	else
		b_constr.data = NULL;
	long* b_vals = (*_env)->GetLongArrayElements (_env, b, NULL);
	for (size_t h = 0; h < b_constr.datalen; h++) {
		long arr_conv_7 = b_vals[h];
		LDKTxOut arr_conv_7_conv = *(LDKTxOut*)arr_conv_7;
		FREE((void*)arr_conv_7);
		b_constr.data[h] = arr_conv_7_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, b, b_vals, 0);
	ret->b = b_constr;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1u64_1_1u64_1new(JNIEnv *_env, jclass _b, jlong a, jlong b) {
	LDKC2TupleTempl_u64__u64* ret = MALLOC(sizeof(LDKC2TupleTempl_u64__u64), "LDKC2TupleTempl_u64__u64");
	ret->a = a;
	ret->b = b;
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1Signature_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_Signature *vec = (LDKCVecTempl_Signature*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKSignature));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1Signature_1_1CVecTempl_1Signature_1new(JNIEnv *_env, jclass _b, jbyteArray a, jobjectArray b) {
	LDKC2TupleTempl_Signature__CVecTempl_Signature* ret = MALLOC(sizeof(LDKC2TupleTempl_Signature__CVecTempl_Signature), "LDKC2TupleTempl_Signature__CVecTempl_Signature");
	LDKSignature a_ref;
	CHECK((*_env)->GetArrayLength (_env, a) == 64);
	(*_env)->GetByteArrayRegion (_env, a, 0, 64, a_ref.compact_form);
	ret->a = a_ref;
	LDKCVecTempl_Signature b_constr;
	b_constr.datalen = (*_env)->GetArrayLength (_env, b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKSignature), "LDKCVecTempl_Signature Elements");
	else
		b_constr.data = NULL;
	for (size_t i = 0; i < b_constr.datalen; i++) {
		jobject arr_conv_8 = (*_env)->GetObjectArrayElement(_env, b, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*_env)->GetArrayLength (_env, arr_conv_8) == 64);
		(*_env)->GetByteArrayRegion (_env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		b_constr.data[i] = arr_conv_8_ref;
	}
	ret->b = b_constr;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ *val = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ *val = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SignatureNoneZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_SignatureNoneZ*)arg)->result_ok;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SignatureNoneZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_SignatureNoneZ *val = (LDKCResult_SignatureNoneZ*)arg;
	CHECK(val->result_ok);
	jbyteArray res_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, res_arr, 0, 64, (*val->contents.result).compact_form);
	return res_arr;
}
JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SignatureNoneZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_SignatureNoneZ *val = (LDKCResult_SignatureNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1SignatureZNoneZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_CVec_SignatureZNoneZ*)arg)->result_ok;
}
JNIEXPORT jobjectArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1SignatureZNoneZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_CVec_SignatureZNoneZ *val = (LDKCResult_CVec_SignatureZNoneZ*)arg;
	CHECK(val->result_ok);
	LDKCVecTempl_Signature res_var = (*val->contents.result);
	jobjectArray res_arr = (*_env)->NewObjectArray(_env, res_var.datalen, NULL, NULL);
	for (size_t i = 0; i < res_var.datalen; i++) {
		jbyteArray arr_conv_8_arr = (*_env)->NewByteArray(_env, 64);
		(*_env)->SetByteArrayRegion(_env, arr_conv_8_arr, 0, 64, res_var.data[i].compact_form);
		(*_env)->SetObjectArrayElement(_env, res_arr, i, arr_conv_8_arr);
	}
	return res_arr;
}
JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1SignatureZNoneZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_CVec_SignatureZNoneZ *val = (LDKCResult_CVec_SignatureZNoneZ*)arg;
	CHECK(!val->result_ok);
	return *val->contents.err;
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
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKAPIError_init (JNIEnv * env, jclass _a) {
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
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKAPIError_1ref_1from_1ptr (JNIEnv * _env, jclass _c, jlong ptr) {
	LDKAPIError *obj = (LDKAPIError*)ptr;
	switch(obj->tag) {
		case LDKAPIError_APIMisuseError: {
			LDKCVec_u8Z err_var = obj->api_misuse_error.err;
			jbyteArray err_arr = (*_env)->NewByteArray(_env, err_var.datalen);
			(*_env)->SetByteArrayRegion(_env, err_arr, 0, err_var.datalen, err_var.data);
			return (*_env)->NewObject(_env, LDKAPIError_APIMisuseError_class, LDKAPIError_APIMisuseError_meth, err_arr);
		}
		case LDKAPIError_FeeRateTooHigh: {
			LDKCVec_u8Z err_var = obj->fee_rate_too_high.err;
			jbyteArray err_arr = (*_env)->NewByteArray(_env, err_var.datalen);
			(*_env)->SetByteArrayRegion(_env, err_arr, 0, err_var.datalen, err_var.data);
			return (*_env)->NewObject(_env, LDKAPIError_FeeRateTooHigh_class, LDKAPIError_FeeRateTooHigh_meth, err_arr, obj->fee_rate_too_high.feerate);
		}
		case LDKAPIError_RouteError: {
			LDKStr err_str = obj->route_error.err;
			char* err_buf = MALLOC(err_str.len + 1, "str conv buf");
			memcpy(err_buf, err_str.chars, err_str.len);
			err_buf[err_str.len] = 0;
			jstring err_conv = (*_env)->NewStringUTF(_env, err_str.chars);
			FREE(err_buf);
			return (*_env)->NewObject(_env, LDKAPIError_RouteError_class, LDKAPIError_RouteError_meth, err_conv);
		}
		case LDKAPIError_ChannelUnavailable: {
			LDKCVec_u8Z err_var = obj->channel_unavailable.err;
			jbyteArray err_arr = (*_env)->NewByteArray(_env, err_var.datalen);
			(*_env)->SetByteArrayRegion(_env, err_arr, 0, err_var.datalen, err_var.data);
			return (*_env)->NewObject(_env, LDKAPIError_ChannelUnavailable_class, LDKAPIError_ChannelUnavailable_meth, err_arr);
		}
		case LDKAPIError_MonitorUpdateFailed: {
			return (*_env)->NewObject(_env, LDKAPIError_MonitorUpdateFailed_class, LDKAPIError_MonitorUpdateFailed_meth);
		}
		default: abort();
	}
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneAPIErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NoneAPIErrorZ*)arg)->result_ok;
}
JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneAPIErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NoneAPIErrorZ *val = (LDKCResult_NoneAPIErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneAPIErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NoneAPIErrorZ *val = (LDKCResult_NoneAPIErrorZ*)arg;
	CHECK(!val->result_ok);
	long err_ref = (long)&(*val->contents.err);
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePaymentSendFailureZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NonePaymentSendFailureZ*)arg)->result_ok;
}
JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePaymentSendFailureZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NonePaymentSendFailureZ *val = (LDKCResult_NonePaymentSendFailureZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePaymentSendFailureZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NonePaymentSendFailureZ *val = (LDKCResult_NonePaymentSendFailureZ*)arg;
	CHECK(!val->result_ok);
	LDKPaymentSendFailure err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC3TupleTempl_1ChannelAnnouncement_1_1ChannelUpdate_1_1ChannelUpdate_1new(JNIEnv *_env, jclass _b, jlong a, jlong b, jlong c) {
	LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate* ret = MALLOC(sizeof(LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate), "LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate");
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
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePeerHandleErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NonePeerHandleErrorZ*)arg)->result_ok;
}
JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePeerHandleErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NonePeerHandleErrorZ *val = (LDKCResult_NonePeerHandleErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePeerHandleErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_NonePeerHandleErrorZ *val = (LDKCResult_NonePeerHandleErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1HTLCOutputInCommitment_1_1Signature_1new(JNIEnv *_env, jclass _b, jlong a, jbyteArray b) {
	LDKC2TupleTempl_HTLCOutputInCommitment__Signature* ret = MALLOC(sizeof(LDKC2TupleTempl_HTLCOutputInCommitment__Signature), "LDKC2TupleTempl_HTLCOutputInCommitment__Signature");
	LDKHTLCOutputInCommitment a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = HTLCOutputInCommitment_clone(&a_conv);
	ret->a = a_conv;
	LDKSignature b_ref;
	CHECK((*_env)->GetArrayLength (_env, b) == 64);
	(*_env)->GetByteArrayRegion (_env, b, 0, 64, b_ref.compact_form);
	ret->b = b_ref;
	return (long)ret;
}
static jclass LDKSpendableOutputDescriptor_StaticOutput_class = NULL;
static jmethodID LDKSpendableOutputDescriptor_StaticOutput_meth = NULL;
static jclass LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class = NULL;
static jmethodID LDKSpendableOutputDescriptor_DynamicOutputP2WSH_meth = NULL;
static jclass LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class = NULL;
static jmethodID LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKSpendableOutputDescriptor_init (JNIEnv * env, jclass _a) {
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
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKSpendableOutputDescriptor_1ref_1from_1ptr (JNIEnv * _env, jclass _c, jlong ptr) {
	LDKSpendableOutputDescriptor *obj = (LDKSpendableOutputDescriptor*)ptr;
	switch(obj->tag) {
		case LDKSpendableOutputDescriptor_StaticOutput: {
			LDKOutPoint outpoint_var = obj->static_output.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			long output_ref = (long)&obj->static_output.output;
			return (*_env)->NewObject(_env, LDKSpendableOutputDescriptor_StaticOutput_class, LDKSpendableOutputDescriptor_StaticOutput_meth, outpoint_ref, output_ref);
		}
		case LDKSpendableOutputDescriptor_DynamicOutputP2WSH: {
			LDKOutPoint outpoint_var = obj->dynamic_output_p2wsh.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			jbyteArray per_commitment_point_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, per_commitment_point_arr, 0, 33, obj->dynamic_output_p2wsh.per_commitment_point.compressed_form);
			long output_ref = (long)&obj->dynamic_output_p2wsh.output;
			long key_derivation_params_ref = (long)&obj->dynamic_output_p2wsh.key_derivation_params;
			jbyteArray revocation_pubkey_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, revocation_pubkey_arr, 0, 33, obj->dynamic_output_p2wsh.revocation_pubkey.compressed_form);
			return (*_env)->NewObject(_env, LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class, LDKSpendableOutputDescriptor_DynamicOutputP2WSH_meth, outpoint_ref, per_commitment_point_arr, obj->dynamic_output_p2wsh.to_self_delay, output_ref, key_derivation_params_ref, revocation_pubkey_arr);
		}
		case LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment: {
			LDKOutPoint outpoint_var = obj->static_output_counterparty_payment.outpoint;
			CHECK((((long)outpoint_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&outpoint_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long outpoint_ref = (long)outpoint_var.inner & ~1;
			long output_ref = (long)&obj->static_output_counterparty_payment.output;
			long key_derivation_params_ref = (long)&obj->static_output_counterparty_payment.key_derivation_params;
			return (*_env)->NewObject(_env, LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class, LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_meth, outpoint_ref, output_ref, key_derivation_params_ref);
		}
		default: abort();
	}
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1SpendableOutputDescriptor_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_SpendableOutputDescriptor *vec = (LDKCVecTempl_SpendableOutputDescriptor*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKSpendableOutputDescriptor));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1SpendableOutputDescriptor_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_SpendableOutputDescriptor *ret = MALLOC(sizeof(LDKCVecTempl_SpendableOutputDescriptor), "LDKCVecTempl_SpendableOutputDescriptor");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKSpendableOutputDescriptor) * ret->datalen, "LDKCVecTempl_SpendableOutputDescriptor Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKSpendableOutputDescriptor arr_elem_conv = *(LDKSpendableOutputDescriptor*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
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
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKEvent_init (JNIEnv * env, jclass _a) {
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
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKEvent_1ref_1from_1ptr (JNIEnv * _env, jclass _c, jlong ptr) {
	LDKEvent *obj = (LDKEvent*)ptr;
	switch(obj->tag) {
		case LDKEvent_FundingGenerationReady: {
			jbyteArray temporary_channel_id_arr = (*_env)->NewByteArray(_env, 32);
			(*_env)->SetByteArrayRegion(_env, temporary_channel_id_arr, 0, 32, obj->funding_generation_ready.temporary_channel_id.data);
			LDKCVec_u8Z output_script_var = obj->funding_generation_ready.output_script;
			jbyteArray output_script_arr = (*_env)->NewByteArray(_env, output_script_var.datalen);
			(*_env)->SetByteArrayRegion(_env, output_script_arr, 0, output_script_var.datalen, output_script_var.data);
			return (*_env)->NewObject(_env, LDKEvent_FundingGenerationReady_class, LDKEvent_FundingGenerationReady_meth, temporary_channel_id_arr, obj->funding_generation_ready.channel_value_satoshis, output_script_arr, obj->funding_generation_ready.user_channel_id);
		}
		case LDKEvent_FundingBroadcastSafe: {
			LDKOutPoint funding_txo_var = obj->funding_broadcast_safe.funding_txo;
			CHECK((((long)funding_txo_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&funding_txo_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long funding_txo_ref = (long)funding_txo_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKEvent_FundingBroadcastSafe_class, LDKEvent_FundingBroadcastSafe_meth, funding_txo_ref, obj->funding_broadcast_safe.user_channel_id);
		}
		case LDKEvent_PaymentReceived: {
			jbyteArray payment_hash_arr = (*_env)->NewByteArray(_env, 32);
			(*_env)->SetByteArrayRegion(_env, payment_hash_arr, 0, 32, obj->payment_received.payment_hash.data);
			jbyteArray payment_secret_arr = (*_env)->NewByteArray(_env, 32);
			(*_env)->SetByteArrayRegion(_env, payment_secret_arr, 0, 32, obj->payment_received.payment_secret.data);
			return (*_env)->NewObject(_env, LDKEvent_PaymentReceived_class, LDKEvent_PaymentReceived_meth, payment_hash_arr, payment_secret_arr, obj->payment_received.amt);
		}
		case LDKEvent_PaymentSent: {
			jbyteArray payment_preimage_arr = (*_env)->NewByteArray(_env, 32);
			(*_env)->SetByteArrayRegion(_env, payment_preimage_arr, 0, 32, obj->payment_sent.payment_preimage.data);
			return (*_env)->NewObject(_env, LDKEvent_PaymentSent_class, LDKEvent_PaymentSent_meth, payment_preimage_arr);
		}
		case LDKEvent_PaymentFailed: {
			jbyteArray payment_hash_arr = (*_env)->NewByteArray(_env, 32);
			(*_env)->SetByteArrayRegion(_env, payment_hash_arr, 0, 32, obj->payment_failed.payment_hash.data);
			return (*_env)->NewObject(_env, LDKEvent_PaymentFailed_class, LDKEvent_PaymentFailed_meth, payment_hash_arr, obj->payment_failed.rejected_by_dest);
		}
		case LDKEvent_PendingHTLCsForwardable: {
			return (*_env)->NewObject(_env, LDKEvent_PendingHTLCsForwardable_class, LDKEvent_PendingHTLCsForwardable_meth, obj->pending_htl_cs_forwardable.time_forwardable);
		}
		case LDKEvent_SpendableOutputs: {
			LDKCVec_SpendableOutputDescriptorZ outputs_var = obj->spendable_outputs.outputs;
			jlongArray outputs_arr = (*_env)->NewLongArray(_env, outputs_var.datalen);
			jlong *outputs_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, outputs_arr, NULL);
			for (size_t b = 0; b < outputs_var.datalen; b++) {
				long arr_conv_27_ref = (long)&outputs_var.data[b];
				outputs_arr_ptr[b] = arr_conv_27_ref;
			}
			(*_env)->ReleasePrimitiveArrayCritical(_env, outputs_arr, outputs_arr_ptr, 0);
			return (*_env)->NewObject(_env, LDKEvent_SpendableOutputs_class, LDKEvent_SpendableOutputs_meth, outputs_arr);
		}
		default: abort();
	}
}
static jclass LDKErrorAction_DisconnectPeer_class = NULL;
static jmethodID LDKErrorAction_DisconnectPeer_meth = NULL;
static jclass LDKErrorAction_IgnoreError_class = NULL;
static jmethodID LDKErrorAction_IgnoreError_meth = NULL;
static jclass LDKErrorAction_SendErrorMessage_class = NULL;
static jmethodID LDKErrorAction_SendErrorMessage_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKErrorAction_init (JNIEnv * env, jclass _a) {
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
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKErrorAction_1ref_1from_1ptr (JNIEnv * _env, jclass _c, jlong ptr) {
	LDKErrorAction *obj = (LDKErrorAction*)ptr;
	switch(obj->tag) {
		case LDKErrorAction_DisconnectPeer: {
			LDKErrorMessage msg_var = obj->disconnect_peer.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKErrorAction_DisconnectPeer_class, LDKErrorAction_DisconnectPeer_meth, msg_ref);
		}
		case LDKErrorAction_IgnoreError: {
			return (*_env)->NewObject(_env, LDKErrorAction_IgnoreError_class, LDKErrorAction_IgnoreError_meth);
		}
		case LDKErrorAction_SendErrorMessage: {
			LDKErrorMessage msg_var = obj->send_error_message.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKErrorAction_SendErrorMessage_class, LDKErrorAction_SendErrorMessage_meth, msg_ref);
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
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKHTLCFailChannelUpdate_init (JNIEnv * env, jclass _a) {
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
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKHTLCFailChannelUpdate_1ref_1from_1ptr (JNIEnv * _env, jclass _c, jlong ptr) {
	LDKHTLCFailChannelUpdate *obj = (LDKHTLCFailChannelUpdate*)ptr;
	switch(obj->tag) {
		case LDKHTLCFailChannelUpdate_ChannelUpdateMessage: {
			LDKChannelUpdate msg_var = obj->channel_update_message.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class, LDKHTLCFailChannelUpdate_ChannelUpdateMessage_meth, msg_ref);
		}
		case LDKHTLCFailChannelUpdate_ChannelClosed: {
			return (*_env)->NewObject(_env, LDKHTLCFailChannelUpdate_ChannelClosed_class, LDKHTLCFailChannelUpdate_ChannelClosed_meth, obj->channel_closed.short_channel_id, obj->channel_closed.is_permanent);
		}
		case LDKHTLCFailChannelUpdate_NodeFailure: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->node_failure.node_id.compressed_form);
			return (*_env)->NewObject(_env, LDKHTLCFailChannelUpdate_NodeFailure_class, LDKHTLCFailChannelUpdate_NodeFailure_meth, node_id_arr, obj->node_failure.is_permanent);
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
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKMessageSendEvent_init (JNIEnv * env, jclass _a) {
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
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKMessageSendEvent_1ref_1from_1ptr (JNIEnv * _env, jclass _c, jlong ptr) {
	LDKMessageSendEvent *obj = (LDKMessageSendEvent*)ptr;
	switch(obj->tag) {
		case LDKMessageSendEvent_SendAcceptChannel: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_accept_channel.node_id.compressed_form);
			LDKAcceptChannel msg_var = obj->send_accept_channel.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendAcceptChannel_class, LDKMessageSendEvent_SendAcceptChannel_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendOpenChannel: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_open_channel.node_id.compressed_form);
			LDKOpenChannel msg_var = obj->send_open_channel.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendOpenChannel_class, LDKMessageSendEvent_SendOpenChannel_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendFundingCreated: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_funding_created.node_id.compressed_form);
			LDKFundingCreated msg_var = obj->send_funding_created.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendFundingCreated_class, LDKMessageSendEvent_SendFundingCreated_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendFundingSigned: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_funding_signed.node_id.compressed_form);
			LDKFundingSigned msg_var = obj->send_funding_signed.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendFundingSigned_class, LDKMessageSendEvent_SendFundingSigned_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendFundingLocked: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_funding_locked.node_id.compressed_form);
			LDKFundingLocked msg_var = obj->send_funding_locked.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendFundingLocked_class, LDKMessageSendEvent_SendFundingLocked_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendAnnouncementSignatures: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_announcement_signatures.node_id.compressed_form);
			LDKAnnouncementSignatures msg_var = obj->send_announcement_signatures.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendAnnouncementSignatures_class, LDKMessageSendEvent_SendAnnouncementSignatures_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_UpdateHTLCs: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->update_htl_cs.node_id.compressed_form);
			LDKCommitmentUpdate updates_var = obj->update_htl_cs.updates;
			CHECK((((long)updates_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&updates_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long updates_ref = (long)updates_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_UpdateHTLCs_class, LDKMessageSendEvent_UpdateHTLCs_meth, node_id_arr, updates_ref);
		}
		case LDKMessageSendEvent_SendRevokeAndACK: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_revoke_and_ack.node_id.compressed_form);
			LDKRevokeAndACK msg_var = obj->send_revoke_and_ack.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendRevokeAndACK_class, LDKMessageSendEvent_SendRevokeAndACK_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendClosingSigned: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_closing_signed.node_id.compressed_form);
			LDKClosingSigned msg_var = obj->send_closing_signed.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendClosingSigned_class, LDKMessageSendEvent_SendClosingSigned_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendShutdown: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_shutdown.node_id.compressed_form);
			LDKShutdown msg_var = obj->send_shutdown.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendShutdown_class, LDKMessageSendEvent_SendShutdown_meth, node_id_arr, msg_ref);
		}
		case LDKMessageSendEvent_SendChannelReestablish: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->send_channel_reestablish.node_id.compressed_form);
			LDKChannelReestablish msg_var = obj->send_channel_reestablish.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_SendChannelReestablish_class, LDKMessageSendEvent_SendChannelReestablish_meth, node_id_arr, msg_ref);
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
			return (*_env)->NewObject(_env, LDKMessageSendEvent_BroadcastChannelAnnouncement_class, LDKMessageSendEvent_BroadcastChannelAnnouncement_meth, msg_ref, update_msg_ref);
		}
		case LDKMessageSendEvent_BroadcastNodeAnnouncement: {
			LDKNodeAnnouncement msg_var = obj->broadcast_node_announcement.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_BroadcastNodeAnnouncement_class, LDKMessageSendEvent_BroadcastNodeAnnouncement_meth, msg_ref);
		}
		case LDKMessageSendEvent_BroadcastChannelUpdate: {
			LDKChannelUpdate msg_var = obj->broadcast_channel_update.msg;
			CHECK((((long)msg_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
			CHECK((((long)&msg_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
			long msg_ref = (long)msg_var.inner & ~1;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_BroadcastChannelUpdate_class, LDKMessageSendEvent_BroadcastChannelUpdate_meth, msg_ref);
		}
		case LDKMessageSendEvent_HandleError: {
			jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
			(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, obj->handle_error.node_id.compressed_form);
			long action_ref = (long)&obj->handle_error.action;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_HandleError_class, LDKMessageSendEvent_HandleError_meth, node_id_arr, action_ref);
		}
		case LDKMessageSendEvent_PaymentFailureNetworkUpdate: {
			long update_ref = (long)&obj->payment_failure_network_update.update;
			return (*_env)->NewObject(_env, LDKMessageSendEvent_PaymentFailureNetworkUpdate_class, LDKMessageSendEvent_PaymentFailureNetworkUpdate_meth, update_ref);
		}
		default: abort();
	}
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1MessageSendEvent_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_MessageSendEvent *vec = (LDKCVecTempl_MessageSendEvent*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKMessageSendEvent));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1MessageSendEvent_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_MessageSendEvent *ret = MALLOC(sizeof(LDKCVecTempl_MessageSendEvent), "LDKCVecTempl_MessageSendEvent");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKMessageSendEvent) * ret->datalen, "LDKCVecTempl_MessageSendEvent Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKMessageSendEvent arr_elem_conv = *(LDKMessageSendEvent*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
typedef struct LDKMessageSendEventsProvider_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_and_clear_pending_msg_events_meth;
} LDKMessageSendEventsProvider_JCalls;
LDKCVec_MessageSendEventZ get_and_clear_pending_msg_events_jcall(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jlongArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->get_and_clear_pending_msg_events_meth);
	LDKCVec_MessageSendEventZ ret_constr;
	ret_constr.datalen = (*_env)->GetArrayLength (_env, ret);
	if (ret_constr.datalen > 0)
		ret_constr.data = MALLOC(ret_constr.datalen * sizeof(LDKMessageSendEvent), "LDKCVec_MessageSendEventZ Elements");
	else
		ret_constr.data = NULL;
	long* ret_vals = (*_env)->GetLongArrayElements (_env, ret, NULL);
	for (size_t s = 0; s < ret_constr.datalen; s++) {
		long arr_conv_18 = ret_vals[s];
		LDKMessageSendEvent arr_conv_18_conv = *(LDKMessageSendEvent*)arr_conv_18;
		FREE((void*)arr_conv_18);
		ret_constr.data[s] = arr_conv_18_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, ret, ret_vals, 0);
	return ret_constr;
}
static void LDKMessageSendEventsProvider_JCalls_free(void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKMessageSendEventsProvider_JCalls_clone(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKMessageSendEventsProvider LDKMessageSendEventsProvider_init (JNIEnv * env, jclass _a, jobject o) {
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
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKMessageSendEventsProvider_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKMessageSendEventsProvider *res_ptr = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*res_ptr = LDKMessageSendEventsProvider_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKMessageSendEventsProvider_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKMessageSendEventsProvider_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_MessageSendEventsProvider_1get_1and_1clear_1pending_1msg_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKMessageSendEventsProvider* this_arg_conv = (LDKMessageSendEventsProvider*)this_arg;
	LDKCVec_MessageSendEventZ ret_var = (this_arg_conv->get_and_clear_pending_msg_events)(this_arg_conv->this_arg);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t s = 0; s < ret_var.datalen; s++) {
		LDKMessageSendEvent *arr_conv_18_copy = MALLOC(sizeof(LDKMessageSendEvent), "LDKMessageSendEvent");
		*arr_conv_18_copy = MessageSendEvent_clone(&ret_var.data[s]);
		long arr_conv_18_ref = (long)arr_conv_18_copy;
		ret_arr_ptr[s] = arr_conv_18_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	CVec_MessageSendEventZ_free(ret_var);
	return ret_arr;
}

JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1Event_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_Event *vec = (LDKCVecTempl_Event*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKEvent));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1Event_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_Event *ret = MALLOC(sizeof(LDKCVecTempl_Event), "LDKCVecTempl_Event");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKEvent) * ret->datalen, "LDKCVecTempl_Event Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKEvent arr_elem_conv = *(LDKEvent*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
typedef struct LDKEventsProvider_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_and_clear_pending_events_meth;
} LDKEventsProvider_JCalls;
LDKCVec_EventZ get_and_clear_pending_events_jcall(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jlongArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->get_and_clear_pending_events_meth);
	LDKCVec_EventZ ret_constr;
	ret_constr.datalen = (*_env)->GetArrayLength (_env, ret);
	if (ret_constr.datalen > 0)
		ret_constr.data = MALLOC(ret_constr.datalen * sizeof(LDKEvent), "LDKCVec_EventZ Elements");
	else
		ret_constr.data = NULL;
	long* ret_vals = (*_env)->GetLongArrayElements (_env, ret, NULL);
	for (size_t h = 0; h < ret_constr.datalen; h++) {
		long arr_conv_7 = ret_vals[h];
		LDKEvent arr_conv_7_conv = *(LDKEvent*)arr_conv_7;
		FREE((void*)arr_conv_7);
		ret_constr.data[h] = arr_conv_7_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, ret, ret_vals, 0);
	return ret_constr;
}
static void LDKEventsProvider_JCalls_free(void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKEventsProvider_JCalls_clone(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKEventsProvider LDKEventsProvider_init (JNIEnv * env, jclass _a, jobject o) {
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
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKEventsProvider_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKEventsProvider *res_ptr = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*res_ptr = LDKEventsProvider_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKEventsProvider_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKEventsProvider_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_EventsProvider_1get_1and_1clear_1pending_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKEventsProvider* this_arg_conv = (LDKEventsProvider*)this_arg;
	LDKCVec_EventZ ret_var = (this_arg_conv->get_and_clear_pending_events)(this_arg_conv->this_arg);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t h = 0; h < ret_var.datalen; h++) {
		LDKEvent *arr_conv_7_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
		*arr_conv_7_copy = Event_clone(&ret_var.data[h]);
		long arr_conv_7_ref = (long)arr_conv_7_copy;
		ret_arr_ptr[h] = arr_conv_7_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	CVec_EventZ_free(ret_var);
	return ret_arr;
}

typedef struct LDKLogger_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID log_meth;
} LDKLogger_JCalls;
void log_jcall(const void* this_arg, const char *record) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jstring record_conv = (*_env)->NewStringUTF(_env, record);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->log_meth, record_conv);
}
static void LDKLogger_JCalls_free(void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKLogger_JCalls_clone(const void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKLogger LDKLogger_init (JNIEnv * env, jclass _a, jobject o) {
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
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKLogger_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKLogger *res_ptr = MALLOC(sizeof(LDKLogger), "LDKLogger");
	*res_ptr = LDKLogger_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKLogger_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKLogger_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxOutAccessErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_TxOutAccessErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxOutAccessErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_TxOutAccessErrorZ *val = (LDKCResult_TxOutAccessErrorZ*)arg;
	CHECK(val->result_ok);
	long res_ref = (long)&(*val->contents.result);
	return res_ref;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxOutAccessErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_TxOutAccessErrorZ *val = (LDKCResult_TxOutAccessErrorZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKAccessError_to_java(_env, (*val->contents.err));
	return err_conv;
}
typedef struct LDKAccess_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_utxo_meth;
} LDKAccess_JCalls;
LDKCResult_TxOutAccessErrorZ get_utxo_jcall(const void* this_arg, const uint8_t (*genesis_hash)[32], uint64_t short_channel_id) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray genesis_hash_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, genesis_hash_arr, 0, 32, *genesis_hash);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_TxOutAccessErrorZ* ret = (LDKCResult_TxOutAccessErrorZ*)(*_env)->CallLongMethod(_env, obj, j_calls->get_utxo_meth, genesis_hash_arr, short_channel_id);
	LDKCResult_TxOutAccessErrorZ res = *ret;
	FREE(ret);
	return res;
}
static void LDKAccess_JCalls_free(void* this_arg) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKAccess_JCalls_clone(const void* this_arg) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKAccess LDKAccess_init (JNIEnv * env, jclass _a, jobject o) {
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
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKAccess_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKAccess *res_ptr = MALLOC(sizeof(LDKAccess), "LDKAccess");
	*res_ptr = LDKAccess_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKAccess_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKAccess_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Access_1get_1utxo(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray genesis_hash, jlong short_channel_id) {
	LDKAccess* this_arg_conv = (LDKAccess*)this_arg;
	unsigned char genesis_hash_arr[32];
	CHECK((*_env)->GetArrayLength (_env, genesis_hash) == 32);
	(*_env)->GetByteArrayRegion (_env, genesis_hash, 0, 32, genesis_hash_arr);
	unsigned char (*genesis_hash_ref)[32] = &genesis_hash_arr;
	LDKCResult_TxOutAccessErrorZ* ret = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret = (this_arg_conv->get_utxo)(this_arg_conv->this_arg, genesis_hash_ref, short_channel_id);
	return (long)ret;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1HTLCOutputInCommitment_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_HTLCOutputInCommitment *vec = (LDKCVecTempl_HTLCOutputInCommitment*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1HTLCOutputInCommitment_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_HTLCOutputInCommitment *ret = MALLOC(sizeof(LDKCVecTempl_HTLCOutputInCommitment), "LDKCVecTempl_HTLCOutputInCommitment");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKHTLCOutputInCommitment) * ret->datalen, "LDKCVecTempl_HTLCOutputInCommitment Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKHTLCOutputInCommitment arr_elem_conv;
			arr_elem_conv.inner = (void*)(arr_elem & (~1));
			arr_elem_conv.is_owned = (arr_elem & 1) || (arr_elem == 0);
			if (arr_elem_conv.inner != NULL)
				arr_elem_conv = HTLCOutputInCommitment_clone(&arr_elem_conv);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
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
	jmethodID on_accept_meth;
} LDKChannelKeys_JCalls;
LDKPublicKey get_per_commitment_point_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jbyteArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->get_per_commitment_point_meth, idx);
	LDKPublicKey ret_ref;
	CHECK((*_env)->GetArrayLength (_env, ret) == 33);
	(*_env)->GetByteArrayRegion (_env, ret, 0, 33, ret_ref.compressed_form);
	return ret_ref;
}
LDKThirtyTwoBytes release_commitment_secret_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jbyteArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->release_commitment_secret_meth, idx);
	LDKThirtyTwoBytes ret_ref;
	CHECK((*_env)->GetArrayLength (_env, ret) == 32);
	(*_env)->GetByteArrayRegion (_env, ret, 0, 32, ret_ref.data);
	return ret_ref;
}
LDKC2Tuple_u64u64Z key_derivation_params_jcall(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKC2Tuple_u64u64Z* ret = (LDKC2Tuple_u64u64Z*)(*_env)->CallLongMethod(_env, obj, j_calls->key_derivation_params_meth);
	LDKC2Tuple_u64u64Z res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment_jcall(const void* this_arg, uint32_t feerate_per_kw, LDKTransaction commitment_tx, const LDKPreCalculatedTxCreationKeys *keys, LDKCVec_HTLCOutputInCommitmentZ htlcs) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	LDKTransaction *commitment_tx_copy = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	*commitment_tx_copy = commitment_tx;
	long commitment_tx_ref = (long)commitment_tx_copy;
	long ret_keys = (long)keys;
	LDKCVec_HTLCOutputInCommitmentZ htlcs_var = htlcs;
	jlongArray htlcs_arr = (*_env)->NewLongArray(_env, htlcs_var.datalen);
	jlong *htlcs_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, htlcs_arr, NULL);
	for (size_t y = 0; y < htlcs_var.datalen; y++) {
		LDKHTLCOutputInCommitment arr_conv_24_var = htlcs_var.data[y];
		CHECK((((long)arr_conv_24_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_24_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_24_ref;
		if (arr_conv_24_var.is_owned) {
			arr_conv_24_ref = (long)arr_conv_24_var.inner | 1;
		} else {
			arr_conv_24_ref = (long)arr_conv_24_var.inner & ~1;
		}
		htlcs_arr_ptr[y] = arr_conv_24_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, htlcs_arr, htlcs_arr_ptr, 0);
	FREE(htlcs_var.data);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(*_env)->CallLongMethod(_env, obj, j_calls->sign_counterparty_commitment_meth, feerate_per_kw, commitment_tx_ref, ret_keys, htlcs_arr);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_holder_commitment_jcall(const void* this_arg, const LDKHolderCommitmentTransaction *holder_commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	long ret_holder_commitment_tx = (long)holder_commitment_tx;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*_env)->CallLongMethod(_env, obj, j_calls->sign_holder_commitment_meth, ret_holder_commitment_tx);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_CVec_SignatureZNoneZ sign_holder_commitment_htlc_transactions_jcall(const void* this_arg, const LDKHolderCommitmentTransaction *holder_commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	long ret_holder_commitment_tx = (long)holder_commitment_tx;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_CVec_SignatureZNoneZ* ret = (LDKCResult_CVec_SignatureZNoneZ*)(*_env)->CallLongMethod(_env, obj, j_calls->sign_holder_commitment_htlc_transactions_meth, ret_holder_commitment_tx);
	LDKCResult_CVec_SignatureZNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_justice_transaction_jcall(const void* this_arg, LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (*per_commitment_key)[32], const LDKHTLCOutputInCommitment *htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	LDKTransaction *justice_tx_copy = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	*justice_tx_copy = justice_tx;
	long justice_tx_ref = (long)justice_tx_copy;
	jbyteArray per_commitment_key_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, per_commitment_key_arr, 0, 32, *per_commitment_key);
	long ret_htlc = (long)htlc;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*_env)->CallLongMethod(_env, obj, j_calls->sign_justice_transaction_meth, justice_tx_ref, input, amount, per_commitment_key_arr, ret_htlc);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_counterparty_htlc_transaction_jcall(const void* this_arg, LDKTransaction htlc_tx, uintptr_t input, uint64_t amount, LDKPublicKey per_commitment_point, const LDKHTLCOutputInCommitment *htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	LDKTransaction *htlc_tx_copy = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	*htlc_tx_copy = htlc_tx;
	long htlc_tx_ref = (long)htlc_tx_copy;
	jbyteArray per_commitment_point_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, per_commitment_point_arr, 0, 33, per_commitment_point.compressed_form);
	long ret_htlc = (long)htlc;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*_env)->CallLongMethod(_env, obj, j_calls->sign_counterparty_htlc_transaction_meth, htlc_tx_ref, input, amount, per_commitment_point_arr, ret_htlc);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_closing_transaction_jcall(const void* this_arg, LDKTransaction closing_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	LDKTransaction *closing_tx_copy = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	*closing_tx_copy = closing_tx;
	long closing_tx_ref = (long)closing_tx_copy;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*_env)->CallLongMethod(_env, obj, j_calls->sign_closing_transaction_meth, closing_tx_ref);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_channel_announcement_jcall(const void* this_arg, const LDKUnsignedChannelAnnouncement *msg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*_env)->CallLongMethod(_env, obj, j_calls->sign_channel_announcement_meth, ret_msg);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
void on_accept_jcall(void* this_arg, const LDKChannelPublicKeys *channel_points, uint16_t counterparty_selected_contest_delay, uint16_t holder_selected_contest_delay) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	long ret_channel_points = (long)channel_points;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->on_accept_meth, ret_channel_points, counterparty_selected_contest_delay, holder_selected_contest_delay);
}
static void LDKChannelKeys_JCalls_free(void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKChannelKeys_JCalls_clone(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKChannelKeys LDKChannelKeys_init (JNIEnv * env, jclass _a, jobject o, jlong pubkeys) {
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
	calls->sign_counterparty_commitment_meth = (*env)->GetMethodID(env, c, "sign_counterparty_commitment", "(IJJ[J)J");
	CHECK(calls->sign_counterparty_commitment_meth != NULL);
	calls->sign_holder_commitment_meth = (*env)->GetMethodID(env, c, "sign_holder_commitment", "(J)J");
	CHECK(calls->sign_holder_commitment_meth != NULL);
	calls->sign_holder_commitment_htlc_transactions_meth = (*env)->GetMethodID(env, c, "sign_holder_commitment_htlc_transactions", "(J)J");
	CHECK(calls->sign_holder_commitment_htlc_transactions_meth != NULL);
	calls->sign_justice_transaction_meth = (*env)->GetMethodID(env, c, "sign_justice_transaction", "(JJJ[BJ)J");
	CHECK(calls->sign_justice_transaction_meth != NULL);
	calls->sign_counterparty_htlc_transaction_meth = (*env)->GetMethodID(env, c, "sign_counterparty_htlc_transaction", "(JJJ[BJ)J");
	CHECK(calls->sign_counterparty_htlc_transaction_meth != NULL);
	calls->sign_closing_transaction_meth = (*env)->GetMethodID(env, c, "sign_closing_transaction", "(J)J");
	CHECK(calls->sign_closing_transaction_meth != NULL);
	calls->sign_channel_announcement_meth = (*env)->GetMethodID(env, c, "sign_channel_announcement", "(J)J");
	CHECK(calls->sign_channel_announcement_meth != NULL);
	calls->on_accept_meth = (*env)->GetMethodID(env, c, "on_accept", "(JSS)V");
	CHECK(calls->on_accept_meth != NULL);

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
		.on_accept = on_accept_jcall,
		.clone = LDKChannelKeys_JCalls_clone,
		.free = LDKChannelKeys_JCalls_free,
		.pubkeys = pubkeys_conv,
		.set_pubkeys = NULL,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1new (JNIEnv * env, jclass _a, jobject o, jlong pubkeys) {
	LDKChannelKeys *res_ptr = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*res_ptr = LDKChannelKeys_init(env, _a, o, pubkeys);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKChannelKeys_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1get_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_arg, jlong idx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, (this_arg_conv->get_per_commitment_point)(this_arg_conv->this_arg, idx).compressed_form);
	return arg_arr;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1release_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_arg, jlong idx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 32, (this_arg_conv->release_commitment_secret)(this_arg_conv->this_arg, idx).data);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1key_1derivation_1params(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKC2Tuple_u64u64Z* ret = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret = (this_arg_conv->key_derivation_params)(this_arg_conv->this_arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1counterparty_1commitment(JNIEnv * _env, jclass _b, jlong this_arg, jint feerate_per_kw, jlong commitment_tx, jlong keys, jlongArray htlcs) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction commitment_tx_conv = *(LDKTransaction*)commitment_tx;
	LDKPreCalculatedTxCreationKeys keys_conv;
	keys_conv.inner = (void*)(keys & (~1));
	keys_conv.is_owned = (keys & 1) || (keys == 0);
	LDKCVec_HTLCOutputInCommitmentZ htlcs_constr;
	htlcs_constr.datalen = (*_env)->GetArrayLength (_env, htlcs);
	if (htlcs_constr.datalen > 0)
		htlcs_constr.data = MALLOC(htlcs_constr.datalen * sizeof(LDKHTLCOutputInCommitment), "LDKCVec_HTLCOutputInCommitmentZ Elements");
	else
		htlcs_constr.data = NULL;
	long* htlcs_vals = (*_env)->GetLongArrayElements (_env, htlcs, NULL);
	for (size_t y = 0; y < htlcs_constr.datalen; y++) {
		long arr_conv_24 = htlcs_vals[y];
		LDKHTLCOutputInCommitment arr_conv_24_conv;
		arr_conv_24_conv.inner = (void*)(arr_conv_24 & (~1));
		arr_conv_24_conv.is_owned = (arr_conv_24 & 1) || (arr_conv_24 == 0);
		if (arr_conv_24_conv.inner != NULL)
			arr_conv_24_conv = HTLCOutputInCommitment_clone(&arr_conv_24_conv);
		htlcs_constr.data[y] = arr_conv_24_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, htlcs, htlcs_vals, 0);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret = (this_arg_conv->sign_counterparty_commitment)(this_arg_conv->this_arg, feerate_per_kw, commitment_tx_conv, &keys_conv, htlcs_constr);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1holder_1commitment(JNIEnv * _env, jclass _b, jlong this_arg, jlong holder_commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKHolderCommitmentTransaction holder_commitment_tx_conv;
	holder_commitment_tx_conv.inner = (void*)(holder_commitment_tx & (~1));
	holder_commitment_tx_conv.is_owned = (holder_commitment_tx & 1) || (holder_commitment_tx == 0);
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (this_arg_conv->sign_holder_commitment)(this_arg_conv->this_arg, &holder_commitment_tx_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1holder_1commitment_1htlc_1transactions(JNIEnv * _env, jclass _b, jlong this_arg, jlong holder_commitment_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKHolderCommitmentTransaction holder_commitment_tx_conv;
	holder_commitment_tx_conv.inner = (void*)(holder_commitment_tx & (~1));
	holder_commitment_tx_conv.is_owned = (holder_commitment_tx & 1) || (holder_commitment_tx == 0);
	LDKCResult_CVec_SignatureZNoneZ* ret = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret = (this_arg_conv->sign_holder_commitment_htlc_transactions)(this_arg_conv->this_arg, &holder_commitment_tx_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1justice_1transaction(JNIEnv * _env, jclass _b, jlong this_arg, jlong justice_tx, jlong input, jlong amount, jbyteArray per_commitment_key, jlong htlc) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction justice_tx_conv = *(LDKTransaction*)justice_tx;
	unsigned char per_commitment_key_arr[32];
	CHECK((*_env)->GetArrayLength (_env, per_commitment_key) == 32);
	(*_env)->GetByteArrayRegion (_env, per_commitment_key, 0, 32, per_commitment_key_arr);
	unsigned char (*per_commitment_key_ref)[32] = &per_commitment_key_arr;
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = (htlc & 1) || (htlc == 0);
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (this_arg_conv->sign_justice_transaction)(this_arg_conv->this_arg, justice_tx_conv, input, amount, per_commitment_key_ref, &htlc_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1counterparty_1htlc_1transaction(JNIEnv * _env, jclass _b, jlong this_arg, jlong htlc_tx, jlong input, jlong amount, jbyteArray per_commitment_point, jlong htlc) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction htlc_tx_conv = *(LDKTransaction*)htlc_tx;
	LDKPublicKey per_commitment_point_ref;
	CHECK((*_env)->GetArrayLength (_env, per_commitment_point) == 33);
	(*_env)->GetByteArrayRegion (_env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = (htlc & 1) || (htlc == 0);
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (this_arg_conv->sign_counterparty_htlc_transaction)(this_arg_conv->this_arg, htlc_tx_conv, input, amount, per_commitment_point_ref, &htlc_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1closing_1transaction(JNIEnv * _env, jclass _b, jlong this_arg, jlong closing_tx) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKTransaction closing_tx_conv = *(LDKTransaction*)closing_tx;
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (this_arg_conv->sign_closing_transaction)(this_arg_conv->this_arg, closing_tx_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1sign_1channel_1announcement(JNIEnv * _env, jclass _b, jlong this_arg, jlong msg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKUnsignedChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (this_arg_conv->sign_channel_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1on_1accept(JNIEnv * _env, jclass _b, jlong this_arg, jlong channel_points, jshort counterparty_selected_contest_delay, jshort holder_selected_contest_delay) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKChannelPublicKeys channel_points_conv;
	channel_points_conv.inner = (void*)(channel_points & (~1));
	channel_points_conv.is_owned = (channel_points & 1) || (channel_points == 0);
	(this_arg_conv->on_accept)(this_arg_conv->this_arg, &channel_points_conv, counterparty_selected_contest_delay, holder_selected_contest_delay);
}

LDKChannelPublicKeys LDKChannelKeys_set_get_pubkeys(LDKChannelKeys* this_arg) {
	if (this_arg->set_pubkeys != NULL)
		this_arg->set_pubkeys(this_arg);
	return this_arg->pubkeys;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1get_1pubkeys(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelKeys* this_arg_conv = (LDKChannelKeys*)this_arg;
	LDKChannelPublicKeys ret = LDKChannelKeys_set_get_pubkeys(this_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1MonitorEvent_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_MonitorEvent *vec = (LDKCVecTempl_MonitorEvent*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1MonitorEvent_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_MonitorEvent *ret = MALLOC(sizeof(LDKCVecTempl_MonitorEvent), "LDKCVecTempl_MonitorEvent");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKMonitorEvent) * ret->datalen, "LDKCVecTempl_MonitorEvent Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKMonitorEvent arr_elem_conv;
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
LDKCResult_NoneChannelMonitorUpdateErrZ watch_channel_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitor monitor) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	LDKOutPoint funding_txo_var = funding_txo;
	CHECK((((long)funding_txo_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&funding_txo_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long funding_txo_ref;
	if (funding_txo_var.is_owned) {
		funding_txo_ref = (long)funding_txo_var.inner | 1;
	} else {
		funding_txo_ref = (long)funding_txo_var.inner & ~1;
	}
	LDKChannelMonitor monitor_var = monitor;
	CHECK((((long)monitor_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&monitor_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long monitor_ref;
	if (monitor_var.is_owned) {
		monitor_ref = (long)monitor_var.inner | 1;
	} else {
		monitor_ref = (long)monitor_var.inner & ~1;
	}
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*_env)->CallLongMethod(_env, obj, j_calls->watch_channel_meth, funding_txo_ref, monitor_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_NoneChannelMonitorUpdateErrZ update_channel_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitorUpdate update) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	LDKOutPoint funding_txo_var = funding_txo;
	CHECK((((long)funding_txo_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&funding_txo_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long funding_txo_ref;
	if (funding_txo_var.is_owned) {
		funding_txo_ref = (long)funding_txo_var.inner | 1;
	} else {
		funding_txo_ref = (long)funding_txo_var.inner & ~1;
	}
	LDKChannelMonitorUpdate update_var = update;
	CHECK((((long)update_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&update_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long update_ref;
	if (update_var.is_owned) {
		update_ref = (long)update_var.inner | 1;
	} else {
		update_ref = (long)update_var.inner & ~1;
	}
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*_env)->CallLongMethod(_env, obj, j_calls->update_channel_meth, funding_txo_ref, update_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ res = *ret;
	FREE(ret);
	return res;
}
LDKCVec_MonitorEventZ release_pending_monitor_events_jcall(const void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jlongArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->release_pending_monitor_events_meth);
	LDKCVec_MonitorEventZ ret_constr;
	ret_constr.datalen = (*_env)->GetArrayLength (_env, ret);
	if (ret_constr.datalen > 0)
		ret_constr.data = MALLOC(ret_constr.datalen * sizeof(LDKMonitorEvent), "LDKCVec_MonitorEventZ Elements");
	else
		ret_constr.data = NULL;
	long* ret_vals = (*_env)->GetLongArrayElements (_env, ret, NULL);
	for (size_t o = 0; o < ret_constr.datalen; o++) {
		long arr_conv_14 = ret_vals[o];
		LDKMonitorEvent arr_conv_14_conv;
		arr_conv_14_conv.inner = (void*)(arr_conv_14 & (~1));
		arr_conv_14_conv.is_owned = (arr_conv_14 & 1) || (arr_conv_14 == 0);
		// Warning: we may need a move here but can't clone!
		ret_constr.data[o] = arr_conv_14_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, ret, ret_vals, 0);
	return ret_constr;
}
static void LDKWatch_JCalls_free(void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKWatch_JCalls_clone(const void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKWatch LDKWatch_init (JNIEnv * env, jclass _a, jobject o) {
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
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKWatch_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKWatch *res_ptr = MALLOC(sizeof(LDKWatch), "LDKWatch");
	*res_ptr = LDKWatch_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKWatch_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKWatch_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Watch_1watch_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jlong funding_txo, jlong monitor) {
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
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret = (this_arg_conv->watch_channel)(this_arg_conv->this_arg, funding_txo_conv, monitor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Watch_1update_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jlong funding_txo, jlong update) {
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
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret = (this_arg_conv->update_channel)(this_arg_conv->this_arg, funding_txo_conv, update_conv);
	return (long)ret;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_Watch_1release_1pending_1monitor_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKWatch* this_arg_conv = (LDKWatch*)this_arg;
	LDKCVec_MonitorEventZ ret_var = (this_arg_conv->release_pending_monitor_events)(this_arg_conv->this_arg);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t o = 0; o < ret_var.datalen; o++) {
		LDKMonitorEvent arr_conv_14_var = ret_var.data[o];
		CHECK((((long)arr_conv_14_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_14_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_14_ref;
		if (arr_conv_14_var.is_owned) {
			arr_conv_14_ref = (long)arr_conv_14_var.inner | 1;
		} else {
			arr_conv_14_ref = (long)arr_conv_14_var.inner & ~1;
		}
		ret_arr_ptr[o] = arr_conv_14_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

typedef struct LDKFilter_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID register_tx_meth;
	jmethodID register_output_meth;
} LDKFilter_JCalls;
void register_tx_jcall(const void* this_arg, const uint8_t (*txid)[32], LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray txid_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, txid_arr, 0, 32, *txid);
	LDKu8slice script_pubkey_var = script_pubkey;
	jbyteArray script_pubkey_arr = (*_env)->NewByteArray(_env, script_pubkey_var.datalen);
	(*_env)->SetByteArrayRegion(_env, script_pubkey_arr, 0, script_pubkey_var.datalen, script_pubkey_var.data);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->register_tx_meth, txid_arr, script_pubkey_arr);
}
void register_output_jcall(const void* this_arg, const LDKOutPoint *outpoint, LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	long ret_outpoint = (long)outpoint;
	LDKu8slice script_pubkey_var = script_pubkey;
	jbyteArray script_pubkey_arr = (*_env)->NewByteArray(_env, script_pubkey_var.datalen);
	(*_env)->SetByteArrayRegion(_env, script_pubkey_arr, 0, script_pubkey_var.datalen, script_pubkey_var.data);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->register_output_meth, ret_outpoint, script_pubkey_arr);
}
static void LDKFilter_JCalls_free(void* this_arg) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKFilter_JCalls_clone(const void* this_arg) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKFilter LDKFilter_init (JNIEnv * env, jclass _a, jobject o) {
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
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKFilter_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKFilter *res_ptr = MALLOC(sizeof(LDKFilter), "LDKFilter");
	*res_ptr = LDKFilter_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKFilter_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKFilter_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Filter_1register_1tx(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray txid, jbyteArray script_pubkey) {
	LDKFilter* this_arg_conv = (LDKFilter*)this_arg;
	unsigned char txid_arr[32];
	CHECK((*_env)->GetArrayLength (_env, txid) == 32);
	(*_env)->GetByteArrayRegion (_env, txid, 0, 32, txid_arr);
	unsigned char (*txid_ref)[32] = &txid_arr;
	LDKu8slice script_pubkey_ref;
	script_pubkey_ref.data = (*_env)->GetByteArrayElements (_env, script_pubkey, NULL);
	script_pubkey_ref.datalen = (*_env)->GetArrayLength (_env, script_pubkey);
	(this_arg_conv->register_tx)(this_arg_conv->this_arg, txid_ref, script_pubkey_ref);
	(*_env)->ReleaseByteArrayElements(_env, script_pubkey, (int8_t*)script_pubkey_ref.data, 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Filter_1register_1output(JNIEnv * _env, jclass _b, jlong this_arg, jlong outpoint, jbyteArray script_pubkey) {
	LDKFilter* this_arg_conv = (LDKFilter*)this_arg;
	LDKOutPoint outpoint_conv;
	outpoint_conv.inner = (void*)(outpoint & (~1));
	outpoint_conv.is_owned = (outpoint & 1) || (outpoint == 0);
	LDKu8slice script_pubkey_ref;
	script_pubkey_ref.data = (*_env)->GetByteArrayElements (_env, script_pubkey, NULL);
	script_pubkey_ref.datalen = (*_env)->GetArrayLength (_env, script_pubkey);
	(this_arg_conv->register_output)(this_arg_conv->this_arg, &outpoint_conv, script_pubkey_ref);
	(*_env)->ReleaseByteArrayElements(_env, script_pubkey, (int8_t*)script_pubkey_ref.data, 0);
}

typedef struct LDKBroadcasterInterface_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID broadcast_transaction_meth;
} LDKBroadcasterInterface_JCalls;
void broadcast_transaction_jcall(const void* this_arg, LDKTransaction tx) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	LDKTransaction *tx_copy = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	*tx_copy = tx;
	long tx_ref = (long)tx_copy;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->broadcast_transaction_meth, tx_ref);
}
static void LDKBroadcasterInterface_JCalls_free(void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKBroadcasterInterface_JCalls_clone(const void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKBroadcasterInterface LDKBroadcasterInterface_init (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	CHECK(c != NULL);
	LDKBroadcasterInterface_JCalls *calls = MALLOC(sizeof(LDKBroadcasterInterface_JCalls), "LDKBroadcasterInterface_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewWeakGlobalRef(env, o);
	calls->broadcast_transaction_meth = (*env)->GetMethodID(env, c, "broadcast_transaction", "(J)V");
	CHECK(calls->broadcast_transaction_meth != NULL);

	LDKBroadcasterInterface ret = {
		.this_arg = (void*) calls,
		.broadcast_transaction = broadcast_transaction_jcall,
		.free = LDKBroadcasterInterface_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKBroadcasterInterface_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKBroadcasterInterface *res_ptr = MALLOC(sizeof(LDKBroadcasterInterface), "LDKBroadcasterInterface");
	*res_ptr = LDKBroadcasterInterface_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKBroadcasterInterface_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKBroadcasterInterface_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BroadcasterInterface_1broadcast_1transaction(JNIEnv * _env, jclass _b, jlong this_arg, jlong tx) {
	LDKBroadcasterInterface* this_arg_conv = (LDKBroadcasterInterface*)this_arg;
	LDKTransaction tx_conv = *(LDKTransaction*)tx;
	(this_arg_conv->broadcast_transaction)(this_arg_conv->this_arg, tx_conv);
}

typedef struct LDKFeeEstimator_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID get_est_sat_per_1000_weight_meth;
} LDKFeeEstimator_JCalls;
uint32_t get_est_sat_per_1000_weight_jcall(const void* this_arg, LDKConfirmationTarget confirmation_target) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jclass confirmation_target_conv = LDKConfirmationTarget_to_java(_env, confirmation_target);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallIntMethod(_env, obj, j_calls->get_est_sat_per_1000_weight_meth, confirmation_target_conv);
}
static void LDKFeeEstimator_JCalls_free(void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKFeeEstimator_JCalls_clone(const void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKFeeEstimator LDKFeeEstimator_init (JNIEnv * env, jclass _a, jobject o) {
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
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKFeeEstimator_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKFeeEstimator *res_ptr = MALLOC(sizeof(LDKFeeEstimator), "LDKFeeEstimator");
	*res_ptr = LDKFeeEstimator_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKFeeEstimator_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKFeeEstimator_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_FeeEstimator_1get_1est_1sat_1per_11000_1weight(JNIEnv * _env, jclass _b, jlong this_arg, jclass confirmation_target) {
	LDKFeeEstimator* this_arg_conv = (LDKFeeEstimator*)this_arg;
	LDKConfirmationTarget confirmation_target_conv = LDKConfirmationTarget_from_java(_env, confirmation_target);
	jint ret_val = (this_arg_conv->get_est_sat_per_1000_weight)(this_arg_conv->this_arg, confirmation_target_conv);
	return ret_val;
}

JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1C2TupleTempl_1usize_1_1Transaction_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_C2TupleTempl_usize__Transaction *vec = (LDKCVecTempl_C2TupleTempl_usize__Transaction*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKC2TupleTempl_usize__Transaction));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1C2TupleTempl_1usize_1_1Transaction_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_C2TupleTempl_usize__Transaction *ret = MALLOC(sizeof(LDKCVecTempl_C2TupleTempl_usize__Transaction), "LDKCVecTempl_C2TupleTempl_usize__Transaction");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2TupleTempl_usize__Transaction) * ret->datalen, "LDKCVecTempl_C2TupleTempl_usize__Transaction Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKC2TupleTempl_usize__Transaction arr_elem_conv = *(LDKC2TupleTempl_usize__Transaction*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1Transaction_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_Transaction *vec = (LDKCVecTempl_Transaction*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKTransaction));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1Transaction_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_Transaction *ret = MALLOC(sizeof(LDKCVecTempl_Transaction), "LDKCVecTempl_Transaction");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKTransaction) * ret->datalen, "LDKCVecTempl_Transaction Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKTransaction arr_elem_conv = *(LDKTransaction*)arr_elem;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1C2TupleTempl_1ThirtyTwoBytes_1_1CVecTempl_1TxOut_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_C2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut *vec = (LDKCVecTempl_C2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1C2TupleTempl_1ThirtyTwoBytes_1_1CVecTempl_1TxOut_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_C2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut *ret = MALLOC(sizeof(LDKCVecTempl_C2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut), "LDKCVecTempl_C2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut) * ret->datalen, "LDKCVecTempl_C2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut arr_elem_conv = *(LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
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
} LDKKeysInterface_JCalls;
LDKSecretKey get_node_secret_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jbyteArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->get_node_secret_meth);
	LDKSecretKey ret_ref;
	CHECK((*_env)->GetArrayLength (_env, ret) == 32);
	(*_env)->GetByteArrayRegion (_env, ret, 0, 32, ret_ref.bytes);
	return ret_ref;
}
LDKCVec_u8Z get_destination_script_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jbyteArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->get_destination_script_meth);
	LDKCVec_u8Z ret_ref;
	ret_ref.data = (*_env)->GetByteArrayElements (_env, ret, NULL);
	ret_ref.datalen = (*_env)->GetArrayLength (_env, ret);
	return ret_ref;
}
LDKPublicKey get_shutdown_pubkey_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jbyteArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->get_shutdown_pubkey_meth);
	LDKPublicKey ret_ref;
	CHECK((*_env)->GetArrayLength (_env, ret) == 33);
	(*_env)->GetByteArrayRegion (_env, ret, 0, 33, ret_ref.compressed_form);
	return ret_ref;
}
LDKChannelKeys get_channel_keys_jcall(const void* this_arg, bool inbound, uint64_t channel_value_satoshis) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKChannelKeys* ret = (LDKChannelKeys*)(*_env)->CallLongMethod(_env, obj, j_calls->get_channel_keys_meth, inbound, channel_value_satoshis);
	LDKChannelKeys res = *ret;
	FREE(ret);
	return res;
}
LDKThirtyTwoBytes get_secure_random_bytes_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jbyteArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->get_secure_random_bytes_meth);
	LDKThirtyTwoBytes ret_ref;
	CHECK((*_env)->GetArrayLength (_env, ret) == 32);
	(*_env)->GetByteArrayRegion (_env, ret, 0, 32, ret_ref.data);
	return ret_ref;
}
static void LDKKeysInterface_JCalls_free(void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKKeysInterface_JCalls_clone(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKKeysInterface LDKKeysInterface_init (JNIEnv * env, jclass _a, jobject o) {
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

	LDKKeysInterface ret = {
		.this_arg = (void*) calls,
		.get_node_secret = get_node_secret_jcall,
		.get_destination_script = get_destination_script_jcall,
		.get_shutdown_pubkey = get_shutdown_pubkey_jcall,
		.get_channel_keys = get_channel_keys_jcall,
		.get_secure_random_bytes = get_secure_random_bytes_jcall,
		.free = LDKKeysInterface_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKKeysInterface_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKKeysInterface *res_ptr = MALLOC(sizeof(LDKKeysInterface), "LDKKeysInterface");
	*res_ptr = LDKKeysInterface_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKKeysInterface_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKKeysInterface_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1node_1secret(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 32, (this_arg_conv->get_node_secret)(this_arg_conv->this_arg).bytes);
	return arg_arr;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1destination_1script(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKCVec_u8Z arg_var = (this_arg_conv->get_destination_script)(this_arg_conv->this_arg);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1shutdown_1pubkey(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, (this_arg_conv->get_shutdown_pubkey)(this_arg_conv->this_arg).compressed_form);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1channel_1keys(JNIEnv * _env, jclass _b, jlong this_arg, jboolean inbound, jlong channel_value_satoshis) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = (this_arg_conv->get_channel_keys)(this_arg_conv->this_arg, inbound, channel_value_satoshis);
	return (long)ret;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_KeysInterface_1get_1secure_1random_1bytes(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKKeysInterface* this_arg_conv = (LDKKeysInterface*)this_arg;
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 32, (this_arg_conv->get_secure_random_bytes)(this_arg_conv->this_arg).data);
	return arg_arr;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1ChannelDetails_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_ChannelDetails *vec = (LDKCVecTempl_ChannelDetails*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1ChannelDetails_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_ChannelDetails *ret = MALLOC(sizeof(LDKCVecTempl_ChannelDetails), "LDKCVecTempl_ChannelDetails");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKChannelDetails) * ret->datalen, "LDKCVecTempl_ChannelDetails Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
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
static jclass LDKNetAddress_IPv4_class = NULL;
static jmethodID LDKNetAddress_IPv4_meth = NULL;
static jclass LDKNetAddress_IPv6_class = NULL;
static jmethodID LDKNetAddress_IPv6_meth = NULL;
static jclass LDKNetAddress_OnionV2_class = NULL;
static jmethodID LDKNetAddress_OnionV2_meth = NULL;
static jclass LDKNetAddress_OnionV3_class = NULL;
static jmethodID LDKNetAddress_OnionV3_meth = NULL;
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKNetAddress_init (JNIEnv * env, jclass _a) {
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
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKNetAddress_1ref_1from_1ptr (JNIEnv * _env, jclass _c, jlong ptr) {
	LDKNetAddress *obj = (LDKNetAddress*)ptr;
	switch(obj->tag) {
		case LDKNetAddress_IPv4: {
			jbyteArray addr_arr = (*_env)->NewByteArray(_env, 4);
			(*_env)->SetByteArrayRegion(_env, addr_arr, 0, 4, obj->i_pv4.addr.data);
			return (*_env)->NewObject(_env, LDKNetAddress_IPv4_class, LDKNetAddress_IPv4_meth, addr_arr, obj->i_pv4.port);
		}
		case LDKNetAddress_IPv6: {
			jbyteArray addr_arr = (*_env)->NewByteArray(_env, 16);
			(*_env)->SetByteArrayRegion(_env, addr_arr, 0, 16, obj->i_pv6.addr.data);
			return (*_env)->NewObject(_env, LDKNetAddress_IPv6_class, LDKNetAddress_IPv6_meth, addr_arr, obj->i_pv6.port);
		}
		case LDKNetAddress_OnionV2: {
			jbyteArray addr_arr = (*_env)->NewByteArray(_env, 10);
			(*_env)->SetByteArrayRegion(_env, addr_arr, 0, 10, obj->onion_v2.addr.data);
			return (*_env)->NewObject(_env, LDKNetAddress_OnionV2_class, LDKNetAddress_OnionV2_meth, addr_arr, obj->onion_v2.port);
		}
		case LDKNetAddress_OnionV3: {
			jbyteArray ed25519_pubkey_arr = (*_env)->NewByteArray(_env, 32);
			(*_env)->SetByteArrayRegion(_env, ed25519_pubkey_arr, 0, 32, obj->onion_v3.ed25519_pubkey.data);
			return (*_env)->NewObject(_env, LDKNetAddress_OnionV3_class, LDKNetAddress_OnionV3_meth, ed25519_pubkey_arr, obj->onion_v3.checksum, obj->onion_v3.version, obj->onion_v3.port);
		}
		default: abort();
	}
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1NetAddress_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_NetAddress *vec = (LDKCVecTempl_NetAddress*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKNetAddress));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1NetAddress_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_NetAddress *ret = MALLOC(sizeof(LDKCVecTempl_NetAddress), "LDKCVecTempl_NetAddress");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKNetAddress) * ret->datalen, "LDKCVecTempl_NetAddress Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKNetAddress arr_elem_conv = *(LDKNetAddress*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
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
void handle_open_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKOpenChannel *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKInitFeatures their_features_var = their_features;
	CHECK((((long)their_features_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&their_features_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long their_features_ref;
	if (their_features_var.is_owned) {
		their_features_ref = (long)their_features_var.inner | 1;
	} else {
		their_features_ref = (long)their_features_var.inner & ~1;
	}
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_open_channel_meth, their_node_id_arr, their_features_ref, ret_msg);
}
void handle_accept_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKAcceptChannel *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	LDKInitFeatures their_features_var = their_features;
	CHECK((((long)their_features_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&their_features_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long their_features_ref;
	if (their_features_var.is_owned) {
		their_features_ref = (long)their_features_var.inner | 1;
	} else {
		their_features_ref = (long)their_features_var.inner & ~1;
	}
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_accept_channel_meth, their_node_id_arr, their_features_ref, ret_msg);
}
void handle_funding_created_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingCreated *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_funding_created_meth, their_node_id_arr, ret_msg);
}
void handle_funding_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingSigned *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_funding_signed_meth, their_node_id_arr, ret_msg);
}
void handle_funding_locked_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingLocked *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_funding_locked_meth, their_node_id_arr, ret_msg);
}
void handle_shutdown_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKShutdown *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_shutdown_meth, their_node_id_arr, ret_msg);
}
void handle_closing_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKClosingSigned *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_closing_signed_meth, their_node_id_arr, ret_msg);
}
void handle_update_add_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateAddHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_update_add_htlc_meth, their_node_id_arr, ret_msg);
}
void handle_update_fulfill_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFulfillHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_update_fulfill_htlc_meth, their_node_id_arr, ret_msg);
}
void handle_update_fail_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_update_fail_htlc_meth, their_node_id_arr, ret_msg);
}
void handle_update_fail_malformed_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailMalformedHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_update_fail_malformed_htlc_meth, their_node_id_arr, ret_msg);
}
void handle_commitment_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKCommitmentSigned *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_commitment_signed_meth, their_node_id_arr, ret_msg);
}
void handle_revoke_and_ack_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKRevokeAndACK *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_revoke_and_ack_meth, their_node_id_arr, ret_msg);
}
void handle_update_fee_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFee *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_update_fee_meth, their_node_id_arr, ret_msg);
}
void handle_announcement_signatures_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKAnnouncementSignatures *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_announcement_signatures_meth, their_node_id_arr, ret_msg);
}
void peer_disconnected_jcall(const void* this_arg, LDKPublicKey their_node_id, bool no_connection_possible) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->peer_disconnected_meth, their_node_id_arr, no_connection_possible);
}
void peer_connected_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKInit *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->peer_connected_meth, their_node_id_arr, ret_msg);
}
void handle_channel_reestablish_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKChannelReestablish *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_channel_reestablish_meth, their_node_id_arr, ret_msg);
}
void handle_error_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKErrorMessage *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray their_node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, their_node_id_arr, 0, 33, their_node_id.compressed_form);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_error_meth, their_node_id_arr, ret_msg);
}
static void LDKChannelMessageHandler_JCalls_free(void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKChannelMessageHandler_JCalls_clone(const void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	atomic_fetch_add_explicit(&j_calls->MessageSendEventsProvider->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKChannelMessageHandler LDKChannelMessageHandler_init (JNIEnv * env, jclass _a, jobject o, jobject MessageSendEventsProvider) {
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
		.MessageSendEventsProvider = LDKMessageSendEventsProvider_init(env, _a, MessageSendEventsProvider),
	};
	calls->MessageSendEventsProvider = ret.MessageSendEventsProvider.this_arg;
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1new (JNIEnv * env, jclass _a, jobject o, jobject MessageSendEventsProvider) {
	LDKChannelMessageHandler *res_ptr = MALLOC(sizeof(LDKChannelMessageHandler), "LDKChannelMessageHandler");
	*res_ptr = LDKChannelMessageHandler_init(env, _a, o, MessageSendEventsProvider);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKChannelMessageHandler_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1open_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong their_features, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKInitFeatures their_features_conv;
	their_features_conv.inner = (void*)(their_features & (~1));
	their_features_conv.is_owned = (their_features & 1) || (their_features == 0);
	// Warning: we may need a move here but can't clone!
	LDKOpenChannel msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_open_channel)(this_arg_conv->this_arg, their_node_id_ref, their_features_conv, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1accept_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong their_features, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKInitFeatures their_features_conv;
	their_features_conv.inner = (void*)(their_features & (~1));
	their_features_conv.is_owned = (their_features & 1) || (their_features == 0);
	// Warning: we may need a move here but can't clone!
	LDKAcceptChannel msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_accept_channel)(this_arg_conv->this_arg, their_node_id_ref, their_features_conv, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1funding_1created(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKFundingCreated msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_funding_created)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1funding_1signed(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKFundingSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_funding_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1funding_1locked(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKFundingLocked msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_funding_locked)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1shutdown(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKShutdown msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_shutdown)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1closing_1signed(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKClosingSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_closing_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1add_1htlc(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateAddHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_update_add_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1fulfill_1htlc(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateFulfillHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_update_fulfill_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1fail_1htlc(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateFailHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_update_fail_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1fail_1malformed_1htlc(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateFailMalformedHTLC msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_update_fail_malformed_htlc)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1commitment_1signed(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKCommitmentSigned msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_commitment_signed)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1revoke_1and_1ack(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKRevokeAndACK msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_revoke_and_ack)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1update_1fee(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKUpdateFee msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_update_fee)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1announcement_1signatures(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKAnnouncementSignatures msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_announcement_signatures)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1peer_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jboolean no_connection_possible) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	(this_arg_conv->peer_disconnected)(this_arg_conv->this_arg, their_node_id_ref, no_connection_possible);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1peer_1connected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKInit msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->peer_connected)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1channel_1reestablish(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKChannelReestablish msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_channel_reestablish)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1handle_1error(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong msg) {
	LDKChannelMessageHandler* this_arg_conv = (LDKChannelMessageHandler*)this_arg;
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKErrorMessage msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	(this_arg_conv->handle_error)(this_arg_conv->this_arg, their_node_id_ref, &msg_conv);
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1ChannelMonitor_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_ChannelMonitor *vec = (LDKCVecTempl_ChannelMonitor*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1ChannelMonitor_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_ChannelMonitor *ret = MALLOC(sizeof(LDKCVecTempl_ChannelMonitor), "LDKCVecTempl_ChannelMonitor");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKChannelMonitor) * ret->datalen, "LDKCVecTempl_ChannelMonitor Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
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
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1u64_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_u64 *vec = (LDKCVecTempl_u64*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(uint64_t));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1u64_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_u64 *ret = MALLOC(sizeof(LDKCVecTempl_u64), "LDKCVecTempl_u64");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(uint64_t) * ret->datalen, "LDKCVecTempl_u64 Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			ret->data[i] = java_elems[i];
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateAddHTLC_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_UpdateAddHTLC *vec = (LDKCVecTempl_UpdateAddHTLC*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateAddHTLC_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_UpdateAddHTLC *ret = MALLOC(sizeof(LDKCVecTempl_UpdateAddHTLC), "LDKCVecTempl_UpdateAddHTLC");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateAddHTLC) * ret->datalen, "LDKCVecTempl_UpdateAddHTLC Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
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
JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFulfillHTLC_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_UpdateFulfillHTLC *vec = (LDKCVecTempl_UpdateFulfillHTLC*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFulfillHTLC_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_UpdateFulfillHTLC *ret = MALLOC(sizeof(LDKCVecTempl_UpdateFulfillHTLC), "LDKCVecTempl_UpdateFulfillHTLC");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFulfillHTLC) * ret->datalen, "LDKCVecTempl_UpdateFulfillHTLC Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
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
JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFailHTLC_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_UpdateFailHTLC *vec = (LDKCVecTempl_UpdateFailHTLC*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFailHTLC_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_UpdateFailHTLC *ret = MALLOC(sizeof(LDKCVecTempl_UpdateFailHTLC), "LDKCVecTempl_UpdateFailHTLC");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFailHTLC) * ret->datalen, "LDKCVecTempl_UpdateFailHTLC Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
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
JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFailMalformedHTLC_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_UpdateFailMalformedHTLC *vec = (LDKCVecTempl_UpdateFailMalformedHTLC*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFailMalformedHTLC_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_UpdateFailMalformedHTLC *ret = MALLOC(sizeof(LDKCVecTempl_UpdateFailMalformedHTLC), "LDKCVecTempl_UpdateFailMalformedHTLC");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKUpdateFailMalformedHTLC) * ret->datalen, "LDKCVecTempl_UpdateFailMalformedHTLC Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
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
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolLightningErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_boolLightningErrorZ*)arg)->result_ok;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolLightningErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_boolLightningErrorZ *val = (LDKCResult_boolLightningErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolLightningErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_boolLightningErrorZ *val = (LDKCResult_boolLightningErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1C3TupleTempl_1ChannelAnnouncement_1_1ChannelUpdate_1_1ChannelUpdate_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_C3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate *vec = (LDKCVecTempl_C3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1C3TupleTempl_1ChannelAnnouncement_1_1ChannelUpdate_1_1ChannelUpdate_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_C3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate *ret = MALLOC(sizeof(LDKCVecTempl_C3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate), "LDKCVecTempl_C3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate) * ret->datalen, "LDKCVecTempl_C3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate arr_elem_conv = *(LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1NodeAnnouncement_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_NodeAnnouncement *vec = (LDKCVecTempl_NodeAnnouncement*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1NodeAnnouncement_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_NodeAnnouncement *ret = MALLOC(sizeof(LDKCVecTempl_NodeAnnouncement), "LDKCVecTempl_NodeAnnouncement");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKNodeAnnouncement) * ret->datalen, "LDKCVecTempl_NodeAnnouncement Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
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
typedef struct LDKRoutingMessageHandler_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jweak o;
	jmethodID handle_node_announcement_meth;
	jmethodID handle_channel_announcement_meth;
	jmethodID handle_channel_update_meth;
	jmethodID handle_htlc_fail_channel_update_meth;
	jmethodID get_next_channel_announcements_meth;
	jmethodID get_next_node_announcements_meth;
	jmethodID should_request_full_sync_meth;
} LDKRoutingMessageHandler_JCalls;
LDKCResult_boolLightningErrorZ handle_node_announcement_jcall(const void* this_arg, const LDKNodeAnnouncement *msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*_env)->CallLongMethod(_env, obj, j_calls->handle_node_announcement_meth, ret_msg);
	LDKCResult_boolLightningErrorZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_boolLightningErrorZ handle_channel_announcement_jcall(const void* this_arg, const LDKChannelAnnouncement *msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*_env)->CallLongMethod(_env, obj, j_calls->handle_channel_announcement_meth, ret_msg);
	LDKCResult_boolLightningErrorZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_boolLightningErrorZ handle_channel_update_jcall(const void* this_arg, const LDKChannelUpdate *msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	long ret_msg = (long)msg;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*_env)->CallLongMethod(_env, obj, j_calls->handle_channel_update_meth, ret_msg);
	LDKCResult_boolLightningErrorZ res = *ret;
	FREE(ret);
	return res;
}
void handle_htlc_fail_channel_update_jcall(const void* this_arg, const LDKHTLCFailChannelUpdate *update) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	long ret_update = (long)update;
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->handle_htlc_fail_channel_update_meth, ret_update);
}
LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ get_next_channel_announcements_jcall(const void* this_arg, uint64_t starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jlongArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->get_next_channel_announcements_meth, starting_point, batch_amount);
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_constr;
	ret_constr.datalen = (*_env)->GetArrayLength (_env, ret);
	if (ret_constr.datalen > 0)
		ret_constr.data = MALLOC(ret_constr.datalen * sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Elements");
	else
		ret_constr.data = NULL;
	long* ret_vals = (*_env)->GetLongArrayElements (_env, ret, NULL);
	for (size_t l = 0; l < ret_constr.datalen; l++) {
		long arr_conv_63 = ret_vals[l];
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_conv_63_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arr_conv_63;
		FREE((void*)arr_conv_63);
		ret_constr.data[l] = arr_conv_63_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, ret, ret_vals, 0);
	return ret_constr;
}
LDKCVec_NodeAnnouncementZ get_next_node_announcements_jcall(const void* this_arg, LDKPublicKey starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray starting_point_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, starting_point_arr, 0, 33, starting_point.compressed_form);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	jlongArray ret = (*_env)->CallObjectMethod(_env, obj, j_calls->get_next_node_announcements_meth, starting_point_arr, batch_amount);
	LDKCVec_NodeAnnouncementZ ret_constr;
	ret_constr.datalen = (*_env)->GetArrayLength (_env, ret);
	if (ret_constr.datalen > 0)
		ret_constr.data = MALLOC(ret_constr.datalen * sizeof(LDKNodeAnnouncement), "LDKCVec_NodeAnnouncementZ Elements");
	else
		ret_constr.data = NULL;
	long* ret_vals = (*_env)->GetLongArrayElements (_env, ret, NULL);
	for (size_t s = 0; s < ret_constr.datalen; s++) {
		long arr_conv_18 = ret_vals[s];
		LDKNodeAnnouncement arr_conv_18_conv;
		arr_conv_18_conv.inner = (void*)(arr_conv_18 & (~1));
		arr_conv_18_conv.is_owned = (arr_conv_18 & 1) || (arr_conv_18 == 0);
		if (arr_conv_18_conv.inner != NULL)
			arr_conv_18_conv = NodeAnnouncement_clone(&arr_conv_18_conv);
		ret_constr.data[s] = arr_conv_18_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, ret, ret_vals, 0);
	return ret_constr;
}
bool should_request_full_sync_jcall(const void* this_arg, LDKPublicKey node_id) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray node_id_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, node_id_arr, 0, 33, node_id.compressed_form);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallBooleanMethod(_env, obj, j_calls->should_request_full_sync_meth, node_id_arr);
}
static void LDKRoutingMessageHandler_JCalls_free(void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKRoutingMessageHandler_JCalls_clone(const void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKRoutingMessageHandler LDKRoutingMessageHandler_init (JNIEnv * env, jclass _a, jobject o) {
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
	calls->should_request_full_sync_meth = (*env)->GetMethodID(env, c, "should_request_full_sync", "([B)Z");
	CHECK(calls->should_request_full_sync_meth != NULL);

	LDKRoutingMessageHandler ret = {
		.this_arg = (void*) calls,
		.handle_node_announcement = handle_node_announcement_jcall,
		.handle_channel_announcement = handle_channel_announcement_jcall,
		.handle_channel_update = handle_channel_update_jcall,
		.handle_htlc_fail_channel_update = handle_htlc_fail_channel_update_jcall,
		.get_next_channel_announcements = get_next_channel_announcements_jcall,
		.get_next_node_announcements = get_next_node_announcements_jcall,
		.should_request_full_sync = should_request_full_sync_jcall,
		.free = LDKRoutingMessageHandler_JCalls_free,
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKRoutingMessageHandler *res_ptr = MALLOC(sizeof(LDKRoutingMessageHandler), "LDKRoutingMessageHandler");
	*res_ptr = LDKRoutingMessageHandler_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKRoutingMessageHandler_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1node_1announcement(JNIEnv * _env, jclass _b, jlong this_arg, jlong msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKNodeAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	LDKCResult_boolLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret = (this_arg_conv->handle_node_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1channel_1announcement(JNIEnv * _env, jclass _b, jlong this_arg, jlong msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKChannelAnnouncement msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	LDKCResult_boolLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret = (this_arg_conv->handle_channel_announcement)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1channel_1update(JNIEnv * _env, jclass _b, jlong this_arg, jlong msg) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKChannelUpdate msg_conv;
	msg_conv.inner = (void*)(msg & (~1));
	msg_conv.is_owned = (msg & 1) || (msg == 0);
	LDKCResult_boolLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret = (this_arg_conv->handle_channel_update)(this_arg_conv->this_arg, &msg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1handle_1htlc_1fail_1channel_1update(JNIEnv * _env, jclass _b, jlong this_arg, jlong update) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKHTLCFailChannelUpdate* update_conv = (LDKHTLCFailChannelUpdate*)update;
	(this_arg_conv->handle_htlc_fail_channel_update)(this_arg_conv->this_arg, update_conv);
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1get_1next_1channel_1announcements(JNIEnv * _env, jclass _b, jlong this_arg, jlong starting_point, jbyte batch_amount) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ ret_var = (this_arg_conv->get_next_channel_announcements)(this_arg_conv->this_arg, starting_point, batch_amount);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t l = 0; l < ret_var.datalen; l++) {
		long arr_conv_63_ref = (long)&ret_var.data[l];
		ret_arr_ptr[l] = arr_conv_63_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(ret_var);
	return ret_arr;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1get_1next_1node_1announcements(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray starting_point, jbyte batch_amount) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey starting_point_ref;
	CHECK((*_env)->GetArrayLength (_env, starting_point) == 33);
	(*_env)->GetByteArrayRegion (_env, starting_point, 0, 33, starting_point_ref.compressed_form);
	LDKCVec_NodeAnnouncementZ ret_var = (this_arg_conv->get_next_node_announcements)(this_arg_conv->this_arg, starting_point_ref, batch_amount);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t s = 0; s < ret_var.datalen; s++) {
		LDKNodeAnnouncement arr_conv_18_var = ret_var.data[s];
		CHECK((((long)arr_conv_18_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_18_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_18_ref;
		if (arr_conv_18_var.is_owned) {
			arr_conv_18_ref = (long)arr_conv_18_var.inner | 1;
		} else {
			arr_conv_18_ref = (long)arr_conv_18_var.inner & ~1;
		}
		ret_arr_ptr[s] = arr_conv_18_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1should_1request_1full_1sync(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray node_id) {
	LDKRoutingMessageHandler* this_arg_conv = (LDKRoutingMessageHandler*)this_arg;
	LDKPublicKey node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, node_id, 0, 33, node_id_ref.compressed_form);
	jboolean ret_val = (this_arg_conv->should_request_full_sync)(this_arg_conv->this_arg, node_id_ref);
	return ret_val;
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
uintptr_t send_data_jcall(void* this_arg, LDKu8slice data, bool resume_read) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	LDKu8slice data_var = data;
	jbyteArray data_arr = (*_env)->NewByteArray(_env, data_var.datalen);
	(*_env)->SetByteArrayRegion(_env, data_arr, 0, data_var.datalen, data_var.data);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallLongMethod(_env, obj, j_calls->send_data_meth, data_arr, resume_read);
}
void disconnect_socket_jcall(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallVoidMethod(_env, obj, j_calls->disconnect_socket_meth);
}
bool eq_jcall(const void* this_arg, const void *other_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallBooleanMethod(_env, obj, j_calls->eq_meth, other_arg);
}
uint64_t hash_jcall(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *_env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&_env, JNI_VERSION_1_8) == JNI_OK);
	jobject obj = (*_env)->NewLocalRef(_env, j_calls->o);
	CHECK(obj != NULL);
	return (*_env)->CallLongMethod(_env, obj, j_calls->hash_meth);
}
static void LDKSocketDescriptor_JCalls_free(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteWeakGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKSocketDescriptor_JCalls_clone(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKSocketDescriptor LDKSocketDescriptor_init (JNIEnv * env, jclass _a, jobject o) {
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
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKSocketDescriptor_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKSocketDescriptor *res_ptr = MALLOC(sizeof(LDKSocketDescriptor), "LDKSocketDescriptor");
	*res_ptr = LDKSocketDescriptor_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKSocketDescriptor_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	jobject ret = (*env)->NewLocalRef(env, ((LDKSocketDescriptor_JCalls*)val)->o);
	CHECK(ret != NULL);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1send_1data(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray data, jboolean resume_read) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	LDKu8slice data_ref;
	data_ref.data = (*_env)->GetByteArrayElements (_env, data, NULL);
	data_ref.datalen = (*_env)->GetArrayLength (_env, data);
	jlong ret_val = (this_arg_conv->send_data)(this_arg_conv->this_arg, data_ref, resume_read);
	(*_env)->ReleaseByteArrayElements(_env, data, (int8_t*)data_ref.data, 0);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1disconnect_1socket(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	(this_arg_conv->disconnect_socket)(this_arg_conv->this_arg);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1hash(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKSocketDescriptor* this_arg_conv = (LDKSocketDescriptor*)this_arg;
	jlong ret_val = (this_arg_conv->hash)(this_arg_conv->this_arg);
	return ret_val;
}

JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1PublicKey_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_PublicKey *vec = (LDKCVecTempl_PublicKey*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKPublicKey));
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg)->result_ok;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ *val = (LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg;
	CHECK(val->result_ok);
	LDKCVecTempl_u8 res_var = (*val->contents.result);
	jbyteArray res_arr = (*_env)->NewByteArray(_env, res_var.datalen);
	(*_env)->SetByteArrayRegion(_env, res_arr, 0, res_var.datalen, res_var.data);
	return res_arr;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ *val = (LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolPeerHandleErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_boolPeerHandleErrorZ*)arg)->result_ok;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolPeerHandleErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_boolPeerHandleErrorZ *val = (LDKCResult_boolPeerHandleErrorZ*)arg;
	CHECK(val->result_ok);
	return *val->contents.result;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolPeerHandleErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_boolPeerHandleErrorZ *val = (LDKCResult_boolPeerHandleErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKPeerHandleError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SecretKeySecpErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_SecretKeySecpErrorZ*)arg)->result_ok;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SecretKeySecpErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_SecretKeySecpErrorZ *val = (LDKCResult_SecretKeySecpErrorZ*)arg;
	CHECK(val->result_ok);
	jbyteArray res_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, res_arr, 0, 32, (*val->contents.result).bytes);
	return res_arr;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SecretKeySecpErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_SecretKeySecpErrorZ *val = (LDKCResult_SecretKeySecpErrorZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKSecp256k1Error_to_java(_env, (*val->contents.err));
	return err_conv;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PublicKeySecpErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_PublicKeySecpErrorZ*)arg)->result_ok;
}
JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PublicKeySecpErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_PublicKeySecpErrorZ *val = (LDKCResult_PublicKeySecpErrorZ*)arg;
	CHECK(val->result_ok);
	jbyteArray res_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, res_arr, 0, 33, (*val->contents.result).compressed_form);
	return res_arr;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PublicKeySecpErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_PublicKeySecpErrorZ *val = (LDKCResult_PublicKeySecpErrorZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKSecp256k1Error_to_java(_env, (*val->contents.err));
	return err_conv;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxCreationKeysSecpErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_TxCreationKeysSecpErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxCreationKeysSecpErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_TxCreationKeysSecpErrorZ *val = (LDKCResult_TxCreationKeysSecpErrorZ*)arg;
	CHECK(val->result_ok);
	LDKTxCreationKeys res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxCreationKeysSecpErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_TxCreationKeysSecpErrorZ *val = (LDKCResult_TxCreationKeysSecpErrorZ*)arg;
	CHECK(!val->result_ok);
	jclass err_conv = LDKSecp256k1Error_to_java(_env, (*val->contents.err));
	return err_conv;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1C2TupleTempl_1HTLCOutputInCommitment_1_1Signature_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_C2TupleTempl_HTLCOutputInCommitment__Signature *vec = (LDKCVecTempl_C2TupleTempl_HTLCOutputInCommitment__Signature*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKC2TupleTempl_HTLCOutputInCommitment__Signature));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1C2TupleTempl_1HTLCOutputInCommitment_1_1Signature_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_C2TupleTempl_HTLCOutputInCommitment__Signature *ret = MALLOC(sizeof(LDKCVecTempl_C2TupleTempl_HTLCOutputInCommitment__Signature), "LDKCVecTempl_C2TupleTempl_HTLCOutputInCommitment__Signature");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKC2TupleTempl_HTLCOutputInCommitment__Signature) * ret->datalen, "LDKCVecTempl_C2TupleTempl_HTLCOutputInCommitment__Signature Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKC2TupleTempl_HTLCOutputInCommitment__Signature arr_elem_conv = *(LDKC2TupleTempl_HTLCOutputInCommitment__Signature*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1RouteHop_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_RouteHop *vec = (LDKCVecTempl_RouteHop*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1RouteHop_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_RouteHop *ret = MALLOC(sizeof(LDKCVecTempl_RouteHop), "LDKCVecTempl_RouteHop");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKRouteHop) * ret->datalen, "LDKCVecTempl_RouteHop Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
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
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1CVecTempl_1RouteHop_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_CVecTempl_RouteHop *vec = (LDKCVecTempl_CVecTempl_RouteHop*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKCVecTempl_RouteHop));
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteLightningErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_RouteLightningErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteLightningErrorZ_1get_1ok (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_RouteLightningErrorZ *val = (LDKCResult_RouteLightningErrorZ*)arg;
	CHECK(val->result_ok);
	LDKRoute res_var = (*val->contents.result);
	CHECK((((long)res_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&res_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long res_ref = (long)res_var.inner & ~1;
	return res_ref;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteLightningErrorZ_1get_1err (JNIEnv * _env, jclass _a, jlong arg) {
	LDKCResult_RouteLightningErrorZ *val = (LDKCResult_RouteLightningErrorZ*)arg;
	CHECK(!val->result_ok);
	LDKLightningError err_var = (*val->contents.err);
	CHECK((((long)err_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
	CHECK((((long)&err_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
	long err_ref = (long)err_var.inner & ~1;
	return err_ref;
}
JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1RouteHint_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_RouteHint *vec = (LDKCVecTempl_RouteHint*)ptr;
	jlongArray ret = (*env)->NewLongArray(env, vec->datalen);
	jlong *ret_elems = (*env)->GetPrimitiveArrayCritical(env, ret, NULL);
	for (size_t i = 0; i < vec->datalen; i++) {
		CHECK((((long)vec->data[i].inner) & 1) == 0);
		ret_elems[i] = (long)vec->data[i].inner | (vec->data[i].is_owned ? 1 : 0);
	}
	(*env)->ReleasePrimitiveArrayCritical(env, ret, ret_elems, 0);
	return ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1RouteHint_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_RouteHint *ret = MALLOC(sizeof(LDKCVecTempl_RouteHint), "LDKCVecTempl_RouteHint");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = MALLOC(sizeof(LDKRouteHint) * ret->datalen, "LDKCVecTempl_RouteHint Data");
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
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
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1HTLCOutputInCommitmentSignatureZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_HTLCOutputInCommitmentSignatureZ arg_conv = *(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ*)arg;
	FREE((void*)arg);
	C2Tuple_HTLCOutputInCommitmentSignatureZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1OutPointScriptZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_OutPointScriptZ arg_conv = *(LDKC2Tuple_OutPointScriptZ*)arg;
	FREE((void*)arg);
	C2Tuple_OutPointScriptZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1SignatureCVec_1SignatureZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_SignatureCVec_SignatureZZ arg_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)arg;
	FREE((void*)arg);
	C2Tuple_SignatureCVec_SignatureZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1TxidCVec_1TxOutZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_TxidCVec_TxOutZZ arg_conv = *(LDKC2Tuple_TxidCVec_TxOutZZ*)arg;
	FREE((void*)arg);
	C2Tuple_TxidCVec_TxOutZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u64u64Z_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_u64u64Z arg_conv = *(LDKC2Tuple_u64u64Z*)arg;
	FREE((void*)arg);
	C2Tuple_u64u64Z_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1usizeTransactionZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_usizeTransactionZ arg_conv = *(LDKC2Tuple_usizeTransactionZ*)arg;
	FREE((void*)arg);
	C2Tuple_usizeTransactionZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arg_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arg;
	FREE((void*)arg);
	C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ arg_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	FREE((void*)arg);
	CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_SignatureCVec_SignatureZZ arg_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)arg;
	FREE((void*)arg);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_CVec_SignatureZNoneZ arg_conv = *(LDKCResult_CVec_SignatureZNoneZ*)arg;
	FREE((void*)arg);
	CResult_CVec_SignatureZNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1ok(JNIEnv * _env, jclass _b, jobjectArray arg) {
	LDKCVec_SignatureZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		arg_constr.data = NULL;
	for (size_t i = 0; i < arg_constr.datalen; i++) {
		jobject arr_conv_8 = (*_env)->GetObjectArrayElement(_env, arg, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*_env)->GetArrayLength (_env, arr_conv_8) == 64);
		(*_env)->GetByteArrayRegion (_env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		arg_constr.data[i] = arr_conv_8_ref;
	}
	LDKCResult_CVec_SignatureZNoneZ* ret = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret = CResult_CVec_SignatureZNoneZ_ok(arg_constr);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPeerHandleError arg_conv = *(LDKPeerHandleError*)arg;
	FREE((void*)arg);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret = CResult_CVec_u8ZPeerHandleErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ arg_conv = *(LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg;
	FREE((void*)arg);
	CResult_CVec_u8ZPeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1ok(JNIEnv * _env, jclass _b, jbyteArray arg) {
	LDKCVec_u8Z arg_ref;
	arg_ref.data = (*_env)->GetByteArrayElements (_env, arg, NULL);
	arg_ref.datalen = (*_env)->GetArrayLength (_env, arg);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret = CResult_CVec_u8ZPeerHandleErrorZ_ok(arg_ref);
	(*_env)->ReleaseByteArrayElements(_env, arg, (int8_t*)arg_ref.data, 0);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneAPIErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKAPIError arg_conv = *(LDKAPIError*)arg;
	FREE((void*)arg);
	LDKCResult_NoneAPIErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret = CResult_NoneAPIErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneAPIErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NoneAPIErrorZ arg_conv = *(LDKCResult_NoneAPIErrorZ*)arg;
	FREE((void*)arg);
	CResult_NoneAPIErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneChannelMonitorUpdateErrZ_1err(JNIEnv * _env, jclass _b, jclass arg) {
	LDKChannelMonitorUpdateErr arg_conv = *(LDKChannelMonitorUpdateErr*)arg;
	FREE((void*)arg);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret = CResult_NoneChannelMonitorUpdateErrZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneChannelMonitorUpdateErrZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ arg_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)arg;
	FREE((void*)arg);
	CResult_NoneChannelMonitorUpdateErrZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneMonitorUpdateErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKMonitorUpdateError arg_conv = *(LDKMonitorUpdateError*)arg;
	FREE((void*)arg);
	LDKCResult_NoneMonitorUpdateErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret = CResult_NoneMonitorUpdateErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneMonitorUpdateErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NoneMonitorUpdateErrorZ arg_conv = *(LDKCResult_NoneMonitorUpdateErrorZ*)arg;
	FREE((void*)arg);
	CResult_NoneMonitorUpdateErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NonePaymentSendFailureZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPaymentSendFailure arg_conv = *(LDKPaymentSendFailure*)arg;
	FREE((void*)arg);
	LDKCResult_NonePaymentSendFailureZ* ret = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret = CResult_NonePaymentSendFailureZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NonePaymentSendFailureZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NonePaymentSendFailureZ arg_conv = *(LDKCResult_NonePaymentSendFailureZ*)arg;
	FREE((void*)arg);
	CResult_NonePaymentSendFailureZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPeerHandleError arg_conv = *(LDKPeerHandleError*)arg;
	FREE((void*)arg);
	LDKCResult_NonePeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret = CResult_NonePeerHandleErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NonePeerHandleErrorZ arg_conv = *(LDKCResult_NonePeerHandleErrorZ*)arg;
	FREE((void*)arg);
	CResult_NonePeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1PublicKeySecpErrorZ_1err(JNIEnv * _env, jclass _b, jclass arg) {
	LDKSecp256k1Error arg_conv = *(LDKSecp256k1Error*)arg;
	FREE((void*)arg);
	LDKCResult_PublicKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret = CResult_PublicKeySecpErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1PublicKeySecpErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_PublicKeySecpErrorZ arg_conv = *(LDKCResult_PublicKeySecpErrorZ*)arg;
	FREE((void*)arg);
	CResult_PublicKeySecpErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1PublicKeySecpErrorZ_1ok(JNIEnv * _env, jclass _b, jbyteArray arg) {
	LDKPublicKey arg_ref;
	CHECK((*_env)->GetArrayLength (_env, arg) == 33);
	(*_env)->GetByteArrayRegion (_env, arg, 0, 33, arg_ref.compressed_form);
	LDKCResult_PublicKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret = CResult_PublicKeySecpErrorZ_ok(arg_ref);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1RouteLightningErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKLightningError arg_conv = *(LDKLightningError*)arg;
	FREE((void*)arg);
	LDKCResult_RouteLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret = CResult_RouteLightningErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1RouteLightningErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_RouteLightningErrorZ arg_conv = *(LDKCResult_RouteLightningErrorZ*)arg;
	FREE((void*)arg);
	CResult_RouteLightningErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1RouteLightningErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKRoute arg_conv = *(LDKRoute*)arg;
	FREE((void*)arg);
	LDKCResult_RouteLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret = CResult_RouteLightningErrorZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1SecretKeySecpErrorZ_1err(JNIEnv * _env, jclass _b, jclass arg) {
	LDKSecp256k1Error arg_conv = *(LDKSecp256k1Error*)arg;
	FREE((void*)arg);
	LDKCResult_SecretKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret = CResult_SecretKeySecpErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1SecretKeySecpErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_SecretKeySecpErrorZ arg_conv = *(LDKCResult_SecretKeySecpErrorZ*)arg;
	FREE((void*)arg);
	CResult_SecretKeySecpErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1SecretKeySecpErrorZ_1ok(JNIEnv * _env, jclass _b, jbyteArray arg) {
	LDKSecretKey arg_ref;
	CHECK((*_env)->GetArrayLength (_env, arg) == 32);
	(*_env)->GetByteArrayRegion (_env, arg, 0, 32, arg_ref.bytes);
	LDKCResult_SecretKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret = CResult_SecretKeySecpErrorZ_ok(arg_ref);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_SignatureNoneZ arg_conv = *(LDKCResult_SignatureNoneZ*)arg;
	FREE((void*)arg);
	CResult_SignatureNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1ok(JNIEnv * _env, jclass _b, jbyteArray arg) {
	LDKSignature arg_ref;
	CHECK((*_env)->GetArrayLength (_env, arg) == 64);
	(*_env)->GetByteArrayRegion (_env, arg, 0, 64, arg_ref.compact_form);
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = CResult_SignatureNoneZ_ok(arg_ref);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1TxCreationKeysSecpErrorZ_1err(JNIEnv * _env, jclass _b, jclass arg) {
	LDKSecp256k1Error arg_conv = *(LDKSecp256k1Error*)arg;
	FREE((void*)arg);
	LDKCResult_TxCreationKeysSecpErrorZ* ret = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret = CResult_TxCreationKeysSecpErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1TxCreationKeysSecpErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_TxCreationKeysSecpErrorZ arg_conv = *(LDKCResult_TxCreationKeysSecpErrorZ*)arg;
	FREE((void*)arg);
	CResult_TxCreationKeysSecpErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1TxCreationKeysSecpErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKTxCreationKeys arg_conv = *(LDKTxCreationKeys*)arg;
	FREE((void*)arg);
	LDKCResult_TxCreationKeysSecpErrorZ* ret = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret = CResult_TxCreationKeysSecpErrorZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1TxOutAccessErrorZ_1err(JNIEnv * _env, jclass _b, jclass arg) {
	LDKAccessError arg_conv = *(LDKAccessError*)arg;
	FREE((void*)arg);
	LDKCResult_TxOutAccessErrorZ* ret = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret = CResult_TxOutAccessErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1TxOutAccessErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_TxOutAccessErrorZ arg_conv = *(LDKCResult_TxOutAccessErrorZ*)arg;
	FREE((void*)arg);
	CResult_TxOutAccessErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1TxOutAccessErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKTxOut arg_conv = *(LDKTxOut*)arg;
	FREE((void*)arg);
	LDKCResult_TxOutAccessErrorZ* ret = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret = CResult_TxOutAccessErrorZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1boolLightningErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKLightningError arg_conv = *(LDKLightningError*)arg;
	FREE((void*)arg);
	LDKCResult_boolLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret = CResult_boolLightningErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1boolLightningErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_boolLightningErrorZ arg_conv = *(LDKCResult_boolLightningErrorZ*)arg;
	FREE((void*)arg);
	CResult_boolLightningErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1boolLightningErrorZ_1ok(JNIEnv * _env, jclass _b, jboolean arg) {
	LDKCResult_boolLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret = CResult_boolLightningErrorZ_ok(arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPeerHandleError arg_conv = *(LDKPeerHandleError*)arg;
	FREE((void*)arg);
	LDKCResult_boolPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret = CResult_boolPeerHandleErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_boolPeerHandleErrorZ arg_conv = *(LDKCResult_boolPeerHandleErrorZ*)arg;
	FREE((void*)arg);
	CResult_boolPeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1ok(JNIEnv * _env, jclass _b, jboolean arg) {
	LDKCResult_boolPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret = CResult_boolPeerHandleErrorZ_ok(arg);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1HTLCOutputInCommitmentSignatureZZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ), "LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t q = 0; q < arg_constr.datalen; q++) {
		long arr_conv_42 = arg_vals[q];
		LDKC2Tuple_HTLCOutputInCommitmentSignatureZ arr_conv_42_conv = *(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ*)arr_conv_42;
		FREE((void*)arr_conv_42);
		arg_constr.data[q] = arr_conv_42_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1TxidCVec_1TxOutZZZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_C2Tuple_TxidCVec_TxOutZZZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKC2Tuple_TxidCVec_TxOutZZ), "LDKCVec_C2Tuple_TxidCVec_TxOutZZZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t b = 0; b < arg_constr.datalen; b++) {
		long arr_conv_27 = arg_vals[b];
		LDKC2Tuple_TxidCVec_TxOutZZ arr_conv_27_conv = *(LDKC2Tuple_TxidCVec_TxOutZZ*)arr_conv_27;
		FREE((void*)arr_conv_27);
		arg_constr.data[b] = arr_conv_27_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_C2Tuple_TxidCVec_TxOutZZZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1usizeTransactionZZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_C2Tuple_usizeTransactionZZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t d = 0; d < arg_constr.datalen; d++) {
		long arr_conv_29 = arg_vals[d];
		LDKC2Tuple_usizeTransactionZ arr_conv_29_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_29;
		FREE((void*)arr_conv_29);
		arg_constr.data[d] = arr_conv_29_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_C2Tuple_usizeTransactionZZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t l = 0; l < arg_constr.datalen; l++) {
		long arr_conv_63 = arg_vals[l];
		LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arr_conv_63_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arr_conv_63;
		FREE((void*)arr_conv_63);
		arg_constr.data[l] = arr_conv_63_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1CVec_1RouteHopZZ_1free(JNIEnv * _env, jclass _b, jobjectArray arg) {
	LDKCVec_CVec_RouteHopZZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		arg_constr.data = NULL;
	for (size_t m = 0; m < arg_constr.datalen; m++) {
		jobject arr_conv_12 = (*_env)->GetObjectArrayElement(_env, arg, m);
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = (*_env)->GetArrayLength (_env, arr_conv_12);
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		long* arr_conv_12_vals = (*_env)->GetLongArrayElements (_env, arr_conv_12, NULL);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			long arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		(*_env)->ReleaseLongArrayElements (_env, arr_conv_12, arr_conv_12_vals, 0);
		arg_constr.data[m] = arr_conv_12_constr;
	}
	CVec_CVec_RouteHopZZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1ChannelDetailsZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_ChannelDetailsZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKChannelDetails), "LDKCVec_ChannelDetailsZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t q = 0; q < arg_constr.datalen; q++) {
		long arr_conv_16 = arg_vals[q];
		LDKChannelDetails arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		arg_constr.data[q] = arr_conv_16_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_ChannelDetailsZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1ChannelMonitorZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_ChannelMonitorZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKChannelMonitor), "LDKCVec_ChannelMonitorZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t q = 0; q < arg_constr.datalen; q++) {
		long arr_conv_16 = arg_vals[q];
		LDKChannelMonitor arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		arg_constr.data[q] = arr_conv_16_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_ChannelMonitorZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1EventZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_EventZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKEvent), "LDKCVec_EventZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t h = 0; h < arg_constr.datalen; h++) {
		long arr_conv_7 = arg_vals[h];
		LDKEvent arr_conv_7_conv = *(LDKEvent*)arr_conv_7;
		FREE((void*)arr_conv_7);
		arg_constr.data[h] = arr_conv_7_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_EventZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1HTLCOutputInCommitmentZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_HTLCOutputInCommitmentZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKHTLCOutputInCommitment), "LDKCVec_HTLCOutputInCommitmentZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t y = 0; y < arg_constr.datalen; y++) {
		long arr_conv_24 = arg_vals[y];
		LDKHTLCOutputInCommitment arr_conv_24_conv;
		arr_conv_24_conv.inner = (void*)(arr_conv_24 & (~1));
		arr_conv_24_conv.is_owned = (arr_conv_24 & 1) || (arr_conv_24 == 0);
		arg_constr.data[y] = arr_conv_24_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_HTLCOutputInCommitmentZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1MessageSendEventZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_MessageSendEventZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKMessageSendEvent), "LDKCVec_MessageSendEventZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t s = 0; s < arg_constr.datalen; s++) {
		long arr_conv_18 = arg_vals[s];
		LDKMessageSendEvent arr_conv_18_conv = *(LDKMessageSendEvent*)arr_conv_18;
		FREE((void*)arr_conv_18);
		arg_constr.data[s] = arr_conv_18_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_MessageSendEventZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1MonitorEventZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_MonitorEventZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKMonitorEvent), "LDKCVec_MonitorEventZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t o = 0; o < arg_constr.datalen; o++) {
		long arr_conv_14 = arg_vals[o];
		LDKMonitorEvent arr_conv_14_conv;
		arr_conv_14_conv.inner = (void*)(arr_conv_14 & (~1));
		arr_conv_14_conv.is_owned = (arr_conv_14 & 1) || (arr_conv_14 == 0);
		arg_constr.data[o] = arr_conv_14_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_MonitorEventZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1NetAddressZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_NetAddressZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t m = 0; m < arg_constr.datalen; m++) {
		long arr_conv_12 = arg_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		arg_constr.data[m] = arr_conv_12_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_NetAddressZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1NodeAnnouncementZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_NodeAnnouncementZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKNodeAnnouncement), "LDKCVec_NodeAnnouncementZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t s = 0; s < arg_constr.datalen; s++) {
		long arr_conv_18 = arg_vals[s];
		LDKNodeAnnouncement arr_conv_18_conv;
		arr_conv_18_conv.inner = (void*)(arr_conv_18 & (~1));
		arr_conv_18_conv.is_owned = (arr_conv_18 & 1) || (arr_conv_18 == 0);
		arg_constr.data[s] = arr_conv_18_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_NodeAnnouncementZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1PublicKeyZ_1free(JNIEnv * _env, jclass _b, jobjectArray arg) {
	LDKCVec_PublicKeyZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKPublicKey), "LDKCVec_PublicKeyZ Elements");
	else
		arg_constr.data = NULL;
	for (size_t i = 0; i < arg_constr.datalen; i++) {
		jobject arr_conv_8 = (*_env)->GetObjectArrayElement(_env, arg, i);
		LDKPublicKey arr_conv_8_ref;
		CHECK((*_env)->GetArrayLength (_env, arr_conv_8) == 33);
		(*_env)->GetByteArrayRegion (_env, arr_conv_8, 0, 33, arr_conv_8_ref.compressed_form);
		arg_constr.data[i] = arr_conv_8_ref;
	}
	CVec_PublicKeyZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1RouteHintZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_RouteHintZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKRouteHint), "LDKCVec_RouteHintZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t l = 0; l < arg_constr.datalen; l++) {
		long arr_conv_11 = arg_vals[l];
		LDKRouteHint arr_conv_11_conv;
		arr_conv_11_conv.inner = (void*)(arr_conv_11 & (~1));
		arr_conv_11_conv.is_owned = (arr_conv_11 & 1) || (arr_conv_11 == 0);
		arg_constr.data[l] = arr_conv_11_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_RouteHintZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1RouteHopZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_RouteHopZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t k = 0; k < arg_constr.datalen; k++) {
		long arr_conv_10 = arg_vals[k];
		LDKRouteHop arr_conv_10_conv;
		arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
		arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
		arg_constr.data[k] = arr_conv_10_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_RouteHopZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1SignatureZ_1free(JNIEnv * _env, jclass _b, jobjectArray arg) {
	LDKCVec_SignatureZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		arg_constr.data = NULL;
	for (size_t i = 0; i < arg_constr.datalen; i++) {
		jobject arr_conv_8 = (*_env)->GetObjectArrayElement(_env, arg, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*_env)->GetArrayLength (_env, arr_conv_8) == 64);
		(*_env)->GetByteArrayRegion (_env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		arg_constr.data[i] = arr_conv_8_ref;
	}
	CVec_SignatureZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1SpendableOutputDescriptorZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_SpendableOutputDescriptorZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKSpendableOutputDescriptor), "LDKCVec_SpendableOutputDescriptorZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t b = 0; b < arg_constr.datalen; b++) {
		long arr_conv_27 = arg_vals[b];
		LDKSpendableOutputDescriptor arr_conv_27_conv = *(LDKSpendableOutputDescriptor*)arr_conv_27;
		FREE((void*)arr_conv_27);
		arg_constr.data[b] = arr_conv_27_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_SpendableOutputDescriptorZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1TransactionZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_TransactionZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKTransaction), "LDKCVec_TransactionZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t n = 0; n < arg_constr.datalen; n++) {
		long arr_conv_13 = arg_vals[n];
		LDKTransaction arr_conv_13_conv = *(LDKTransaction*)arr_conv_13;
		arg_constr.data[n] = arr_conv_13_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_TransactionZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1TxOutZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_TxOutZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKTxOut), "LDKCVec_TxOutZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t h = 0; h < arg_constr.datalen; h++) {
		long arr_conv_7 = arg_vals[h];
		LDKTxOut arr_conv_7_conv = *(LDKTxOut*)arr_conv_7;
		FREE((void*)arr_conv_7);
		arg_constr.data[h] = arr_conv_7_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_TxOutZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateAddHTLCZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_UpdateAddHTLCZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t p = 0; p < arg_constr.datalen; p++) {
		long arr_conv_15 = arg_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		arg_constr.data[p] = arr_conv_15_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_UpdateAddHTLCZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFailHTLCZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_UpdateFailHTLCZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t q = 0; q < arg_constr.datalen; q++) {
		long arr_conv_16 = arg_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		arg_constr.data[q] = arr_conv_16_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_UpdateFailHTLCZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFailMalformedHTLCZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_UpdateFailMalformedHTLCZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t z = 0; z < arg_constr.datalen; z++) {
		long arr_conv_25 = arg_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		arg_constr.data[z] = arr_conv_25_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_UpdateFailMalformedHTLCZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFulfillHTLCZ_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_UpdateFulfillHTLCZ arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t t = 0; t < arg_constr.datalen; t++) {
		long arr_conv_19 = arg_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		arg_constr.data[t] = arr_conv_19_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_UpdateFulfillHTLCZ_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1u64Z_1free(JNIEnv * _env, jclass _b, jlongArray arg) {
	LDKCVec_u64Z arg_constr;
	arg_constr.datalen = (*_env)->GetArrayLength (_env, arg);
	if (arg_constr.datalen > 0)
		arg_constr.data = MALLOC(arg_constr.datalen * sizeof(jlong), "LDKCVec_u64Z Elements");
	else
		arg_constr.data = NULL;
	long* arg_vals = (*_env)->GetLongArrayElements (_env, arg, NULL);
	for (size_t g = 0; g < arg_constr.datalen; g++) {
		long arr_conv_6 = arg_vals[g];
		arg_constr.data[g] = arr_conv_6;
	}
	(*_env)->ReleaseLongArrayElements (_env, arg, arg_vals, 0);
	CVec_u64Z_free(arg_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1u8Z_1free(JNIEnv * _env, jclass _b, jbyteArray arg) {
	LDKCVec_u8Z arg_ref;
	arg_ref.data = (*_env)->GetByteArrayElements (_env, arg, NULL);
	arg_ref.datalen = (*_env)->GetArrayLength (_env, arg);
	CVec_u8Z_free(arg_ref);
	(*_env)->ReleaseByteArrayElements(_env, arg, (int8_t*)arg_ref.data, 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Transaction_1free(JNIEnv * _env, jclass _b, jlong _res) {
	LDKTransaction _res_conv = *(LDKTransaction*)_res;
	Transaction_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxOut_1free(JNIEnv * _env, jclass _b, jlong _res) {
	LDKTxOut _res_conv = *(LDKTxOut*)_res;
	FREE((void*)_res);
	TxOut_free(_res_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1usizeTransactionZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKTransaction b_conv = *(LDKTransaction*)b;
	LDKC2Tuple_usizeTransactionZ* ret = MALLOC(sizeof(LDKC2Tuple_usizeTransactionZ), "LDKC2Tuple_usizeTransactionZ");
	*ret = C2Tuple_usizeTransactionZ_new(a, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneChannelMonitorUpdateErrZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret = CResult_NoneChannelMonitorUpdateErrZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneMonitorUpdateErrorZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NoneMonitorUpdateErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret = CResult_NoneMonitorUpdateErrorZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1OutPointScriptZ_1new(JNIEnv * _env, jclass _b, jlong a, jbyteArray b) {
	LDKOutPoint a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = OutPoint_clone(&a_conv);
	LDKCVec_u8Z b_ref;
	b_ref.data = (*_env)->GetByteArrayElements (_env, b, NULL);
	b_ref.datalen = (*_env)->GetArrayLength (_env, b);
	LDKC2Tuple_OutPointScriptZ* ret = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret = C2Tuple_OutPointScriptZ_new(a_conv, b_ref);
	(*_env)->ReleaseByteArrayElements(_env, b, (int8_t*)b_ref.data, 0);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1TxidCVec_1TxOutZZ_1new(JNIEnv * _env, jclass _b, jbyteArray a, jlongArray b) {
	LDKThirtyTwoBytes a_ref;
	CHECK((*_env)->GetArrayLength (_env, a) == 32);
	(*_env)->GetByteArrayRegion (_env, a, 0, 32, a_ref.data);
	LDKCVec_TxOutZ b_constr;
	b_constr.datalen = (*_env)->GetArrayLength (_env, b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKTxOut), "LDKCVec_TxOutZ Elements");
	else
		b_constr.data = NULL;
	long* b_vals = (*_env)->GetLongArrayElements (_env, b, NULL);
	for (size_t h = 0; h < b_constr.datalen; h++) {
		long arr_conv_7 = b_vals[h];
		LDKTxOut arr_conv_7_conv = *(LDKTxOut*)arr_conv_7;
		FREE((void*)arr_conv_7);
		b_constr.data[h] = arr_conv_7_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, b, b_vals, 0);
	LDKC2Tuple_TxidCVec_TxOutZZ* ret = MALLOC(sizeof(LDKC2Tuple_TxidCVec_TxOutZZ), "LDKC2Tuple_TxidCVec_TxOutZZ");
	*ret = C2Tuple_TxidCVec_TxOutZZ_new(a_ref, b_constr);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u64u64Z_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKC2Tuple_u64u64Z* ret = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret = C2Tuple_u64u64Z_new(a, b);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1SignatureCVec_1SignatureZZ_1new(JNIEnv * _env, jclass _b, jbyteArray a, jobjectArray b) {
	LDKSignature a_ref;
	CHECK((*_env)->GetArrayLength (_env, a) == 64);
	(*_env)->GetByteArrayRegion (_env, a, 0, 64, a_ref.compact_form);
	LDKCVec_SignatureZ b_constr;
	b_constr.datalen = (*_env)->GetArrayLength (_env, b);
	if (b_constr.datalen > 0)
		b_constr.data = MALLOC(b_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		b_constr.data = NULL;
	for (size_t i = 0; i < b_constr.datalen; i++) {
		jobject arr_conv_8 = (*_env)->GetObjectArrayElement(_env, b, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*_env)->GetArrayLength (_env, arr_conv_8) == 64);
		(*_env)->GetByteArrayRegion (_env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		b_constr.data[i] = arr_conv_8_ref;
	}
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret = MALLOC(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ), "LDKC2Tuple_SignatureCVec_SignatureZZ");
	*ret = C2Tuple_SignatureCVec_SignatureZZ_new(a_ref, b_constr);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1err(JNIEnv * _env, jclass _b) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1err(JNIEnv * _env, jclass _b) {
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = CResult_SignatureNoneZ_err();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1err(JNIEnv * _env, jclass _b) {
	LDKCResult_CVec_SignatureZNoneZ* ret = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret = CResult_CVec_SignatureZNoneZ_err();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneAPIErrorZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NoneAPIErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret = CResult_NoneAPIErrorZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NonePaymentSendFailureZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NonePaymentSendFailureZ* ret = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret = CResult_NonePaymentSendFailureZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b, jlong c) {
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
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
	*ret = C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a_conv, b_conv, c_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NonePeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret = CResult_NonePeerHandleErrorZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1HTLCOutputInCommitmentSignatureZ_1new(JNIEnv * _env, jclass _b, jlong a, jbyteArray b) {
	LDKHTLCOutputInCommitment a_conv;
	a_conv.inner = (void*)(a & (~1));
	a_conv.is_owned = (a & 1) || (a == 0);
	if (a_conv.inner != NULL)
		a_conv = HTLCOutputInCommitment_clone(&a_conv);
	LDKSignature b_ref;
	CHECK((*_env)->GetArrayLength (_env, b) == 64);
	(*_env)->GetByteArrayRegion (_env, b, 0, 64, b_ref.compact_form);
	LDKC2Tuple_HTLCOutputInCommitmentSignatureZ* ret = MALLOC(sizeof(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ), "LDKC2Tuple_HTLCOutputInCommitmentSignatureZ");
	*ret = C2Tuple_HTLCOutputInCommitmentSignatureZ_new(a_conv, b_ref);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Event_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKEvent this_ptr_conv = *(LDKEvent*)this_ptr;
	FREE((void*)this_ptr);
	Event_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Event_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKEvent* orig_conv = (LDKEvent*)orig;
	LDKEvent* ret = MALLOC(sizeof(LDKEvent), "LDKEvent");
	*ret = Event_clone(orig_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageSendEvent_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageSendEvent this_ptr_conv = *(LDKMessageSendEvent*)this_ptr;
	FREE((void*)this_ptr);
	MessageSendEvent_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_MessageSendEvent_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKMessageSendEvent* orig_conv = (LDKMessageSendEvent*)orig;
	LDKMessageSendEvent* ret = MALLOC(sizeof(LDKMessageSendEvent), "LDKMessageSendEvent");
	*ret = MessageSendEvent_clone(orig_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageSendEventsProvider_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageSendEventsProvider this_ptr_conv = *(LDKMessageSendEventsProvider*)this_ptr;
	FREE((void*)this_ptr);
	MessageSendEventsProvider_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_EventsProvider_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKEventsProvider this_ptr_conv = *(LDKEventsProvider*)this_ptr;
	FREE((void*)this_ptr);
	EventsProvider_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_APIError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAPIError this_ptr_conv = *(LDKAPIError*)this_ptr;
	FREE((void*)this_ptr);
	APIError_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_APIError_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKAPIError* orig_conv = (LDKAPIError*)orig;
	LDKAPIError* ret = MALLOC(sizeof(LDKAPIError), "LDKAPIError");
	*ret = APIError_clone(orig_conv);
	return (long)ret;
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_Level_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKLevel* orig_conv = (LDKLevel*)orig;
	jclass ret = LDKLevel_to_java(_env, Level_clone(orig_conv));
	return ret;
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_Level_1max(JNIEnv * _env, jclass _b) {
	jclass ret = LDKLevel_to_java(_env, Level_max());
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Logger_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLogger this_ptr_conv = *(LDKLogger*)this_ptr;
	FREE((void*)this_ptr);
	Logger_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeConfig_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelHandshakeConfig orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKChannelHandshakeConfig ret = ChannelHandshakeConfig_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1get_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = ChannelHandshakeConfig_get_minimum_depth(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1set_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeConfig_set_minimum_depth(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1get_1our_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = ChannelHandshakeConfig_get_our_to_self_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1set_1our_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeConfig_set_our_to_self_delay(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1get_1our_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelHandshakeConfig_get_our_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1set_1our_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeConfig_set_our_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1new(JNIEnv * _env, jclass _b, jint minimum_depth_arg, jshort our_to_self_delay_arg, jlong our_htlc_minimum_msat_arg) {
	LDKChannelHandshakeConfig ret = ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1default(JNIEnv * _env, jclass _b) {
	LDKChannelHandshakeConfig ret = ChannelHandshakeConfig_default();
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelHandshakeLimits orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKChannelHandshakeLimits ret = ChannelHandshakeLimits_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1funding_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelHandshakeLimits_get_min_funding_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1funding_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_min_funding_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelHandshakeLimits_get_max_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_max_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelHandshakeLimits_get_max_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_max_channel_reserve_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = ChannelHandshakeLimits_get_min_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_min_max_accepted_htlcs(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelHandshakeLimits_get_min_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_min_dust_limit_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelHandshakeLimits_get_max_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_max_dust_limit_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = ChannelHandshakeLimits_get_max_minimum_depth(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_max_minimum_depth(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1force_1announced_1channel_1preference(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jboolean ret_val = ChannelHandshakeLimits_get_force_announced_channel_preference(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1force_1announced_1channel_1preference(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_force_announced_channel_preference(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1their_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = ChannelHandshakeLimits_get_their_to_self_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1their_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKChannelHandshakeLimits this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelHandshakeLimits_set_their_to_self_delay(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1new(JNIEnv * _env, jclass _b, jlong min_funding_satoshis_arg, jlong max_htlc_minimum_msat_arg, jlong min_max_htlc_value_in_flight_msat_arg, jlong max_channel_reserve_satoshis_arg, jshort min_max_accepted_htlcs_arg, jlong min_dust_limit_satoshis_arg, jlong max_dust_limit_satoshis_arg, jint max_minimum_depth_arg, jboolean force_announced_channel_preference_arg, jshort their_to_self_delay_arg) {
	LDKChannelHandshakeLimits ret = ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1default(JNIEnv * _env, jclass _b) {
	LDKChannelHandshakeLimits ret = ChannelHandshakeLimits_default();
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelConfig_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelConfig orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKChannelConfig ret = ChannelConfig_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1get_1fee_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = ChannelConfig_get_fee_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1set_1fee_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelConfig_set_fee_proportional_millionths(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1get_1announced_1channel(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jboolean ret_val = ChannelConfig_get_announced_channel(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1set_1announced_1channel(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelConfig_set_announced_channel(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1get_1commit_1upfront_1shutdown_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jboolean ret_val = ChannelConfig_get_commit_upfront_shutdown_pubkey(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1set_1commit_1upfront_1shutdown_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKChannelConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelConfig_set_commit_upfront_shutdown_pubkey(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1new(JNIEnv * _env, jclass _b, jint fee_proportional_millionths_arg, jboolean announced_channel_arg, jboolean commit_upfront_shutdown_pubkey_arg) {
	LDKChannelConfig ret = ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1default(JNIEnv * _env, jclass _b) {
	LDKChannelConfig ret = ChannelConfig_default();
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelConfig obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ChannelConfig_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKChannelConfig ret = ChannelConfig_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UserConfig_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKUserConfig orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKUserConfig ret = UserConfig_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1own_1channel_1config(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelHandshakeConfig ret = UserConfig_get_own_channel_config(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1own_1channel_1config(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelHandshakeConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelHandshakeConfig_clone(&val_conv);
	UserConfig_set_own_channel_config(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1peer_1channel_1config_1limits(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelHandshakeLimits ret = UserConfig_get_peer_channel_config_limits(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1peer_1channel_1config_1limits(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelHandshakeLimits val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelHandshakeLimits_clone(&val_conv);
	UserConfig_set_peer_channel_config_limits(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1channel_1options(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelConfig ret = UserConfig_get_channel_options(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1channel_1options(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelConfig_clone(&val_conv);
	UserConfig_set_channel_options(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1new(JNIEnv * _env, jclass _b, jlong own_channel_config_arg, jlong peer_channel_config_limits_arg, jlong channel_options_arg) {
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
	LDKUserConfig ret = UserConfig_new(own_channel_config_arg_conv, peer_channel_config_limits_arg_conv, channel_options_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1default(JNIEnv * _env, jclass _b) {
	LDKUserConfig ret = UserConfig_default();
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_AccessError_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKAccessError* orig_conv = (LDKAccessError*)orig;
	jclass ret = LDKAccessError_to_java(_env, AccessError_clone(orig_conv));
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Access_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAccess this_ptr_conv = *(LDKAccess*)this_ptr;
	FREE((void*)this_ptr);
	Access_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Watch_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKWatch this_ptr_conv = *(LDKWatch*)this_ptr;
	FREE((void*)this_ptr);
	Watch_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Filter_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFilter this_ptr_conv = *(LDKFilter*)this_ptr;
	FREE((void*)this_ptr);
	Filter_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BroadcasterInterface_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKBroadcasterInterface this_ptr_conv = *(LDKBroadcasterInterface*)this_ptr;
	FREE((void*)this_ptr);
	BroadcasterInterface_free(this_ptr_conv);
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_ConfirmationTarget_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKConfirmationTarget* orig_conv = (LDKConfirmationTarget*)orig;
	jclass ret = LDKConfirmationTarget_to_java(_env, ConfirmationTarget_clone(orig_conv));
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FeeEstimator_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFeeEstimator this_ptr_conv = *(LDKFeeEstimator*)this_ptr;
	FREE((void*)this_ptr);
	FeeEstimator_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainMonitor this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChainMonitor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1block_1connected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jlongArray txdata, jint height) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char header_arr[80];
	CHECK((*_env)->GetArrayLength (_env, header) == 80);
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = (*_env)->GetArrayLength (_env, txdata);
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	long* txdata_vals = (*_env)->GetLongArrayElements (_env, txdata, NULL);
	for (size_t d = 0; d < txdata_constr.datalen; d++) {
		long arr_conv_29 = txdata_vals[d];
		LDKC2Tuple_usizeTransactionZ arr_conv_29_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_29;
		FREE((void*)arr_conv_29);
		txdata_constr.data[d] = arr_conv_29_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, txdata, txdata_vals, 0);
	ChainMonitor_block_connected(&this_arg_conv, header_ref, txdata_constr, height);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1block_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jint disconnected_height) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char header_arr[80];
	CHECK((*_env)->GetArrayLength (_env, header) == 80);
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	ChainMonitor_block_disconnected(&this_arg_conv, header_ref, disconnected_height);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1new(JNIEnv * _env, jclass _b, jlong chain_source, jlong broadcaster, jlong logger, jlong feeest) {
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
	LDKChainMonitor ret = ChainMonitor_new(chain_source_conv, broadcaster_conv, logger_conv, feeest_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1as_1Watch(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKWatch* ret = MALLOC(sizeof(LDKWatch), "LDKWatch");
	*ret = ChainMonitor_as_Watch(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1as_1EventsProvider(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChainMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChainMonitor_as_EventsProvider(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelMonitorUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelMonitorUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKChannelMonitorUpdate ret = ChannelMonitorUpdate_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1get_1update_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelMonitorUpdate_get_update_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1set_1update_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelMonitorUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelMonitorUpdate_set_update_id(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelMonitorUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ChannelMonitorUpdate_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKChannelMonitorUpdate ret = ChannelMonitorUpdate_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdateErr_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelMonitorUpdateErr* orig_conv = (LDKChannelMonitorUpdateErr*)orig;
	jclass ret = LDKChannelMonitorUpdateErr_to_java(_env, ChannelMonitorUpdateErr_clone(orig_conv));
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MonitorUpdateError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMonitorUpdateError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MonitorUpdateError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MonitorEvent_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMonitorEvent this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MonitorEvent_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKHTLCUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKHTLCUpdate ret = HTLCUpdate_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHTLCUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = HTLCUpdate_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKHTLCUpdate ret = HTLCUpdate_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitor this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelMonitor_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1update_1monitor(JNIEnv * _env, jclass _b, jlong this_arg, jlong updates, jlong broadcaster, jlong logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKChannelMonitorUpdate updates_conv;
	updates_conv.inner = (void*)(updates & (~1));
	updates_conv.is_owned = (updates & 1) || (updates == 0);
	if (updates_conv.inner != NULL)
		updates_conv = ChannelMonitorUpdate_clone(&updates_conv);
	LDKBroadcasterInterface* broadcaster_conv = (LDKBroadcasterInterface*)broadcaster;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCResult_NoneMonitorUpdateErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret = ChannelMonitor_update_monitor(&this_arg_conv, updates_conv, broadcaster_conv, logger_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1latest_1update_1id(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	jlong ret_val = ChannelMonitor_get_latest_update_id(&this_arg_conv);
	return ret_val;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1funding_1txo(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKC2Tuple_OutPointScriptZ* ret = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret = ChannelMonitor_get_funding_txo(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1and_1clear_1pending_1monitor_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKCVec_MonitorEventZ ret_var = ChannelMonitor_get_and_clear_pending_monitor_events(&this_arg_conv);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t o = 0; o < ret_var.datalen; o++) {
		LDKMonitorEvent arr_conv_14_var = ret_var.data[o];
		CHECK((((long)arr_conv_14_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_14_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_14_ref;
		if (arr_conv_14_var.is_owned) {
			arr_conv_14_ref = (long)arr_conv_14_var.inner | 1;
		} else {
			arr_conv_14_ref = (long)arr_conv_14_var.inner & ~1;
		}
		ret_arr_ptr[o] = arr_conv_14_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1and_1clear_1pending_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKCVec_EventZ ret_var = ChannelMonitor_get_and_clear_pending_events(&this_arg_conv);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t h = 0; h < ret_var.datalen; h++) {
		LDKEvent *arr_conv_7_copy = MALLOC(sizeof(LDKEvent), "LDKEvent");
		*arr_conv_7_copy = Event_clone(&ret_var.data[h]);
		long arr_conv_7_ref = (long)arr_conv_7_copy;
		ret_arr_ptr[h] = arr_conv_7_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	CVec_EventZ_free(ret_var);
	return ret_arr;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1latest_1holder_1commitment_1txn(JNIEnv * _env, jclass _b, jlong this_arg, jlong logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCVec_TransactionZ ret_var = ChannelMonitor_get_latest_holder_commitment_txn(&this_arg_conv, logger_conv);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t n = 0; n < ret_var.datalen; n++) {
		LDKTransaction *arr_conv_13_copy = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
		*arr_conv_13_copy = ret_var.data[n];
		long arr_conv_13_ref = (long)arr_conv_13_copy;
		ret_arr_ptr[n] = arr_conv_13_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	CVec_TransactionZ_free(ret_var);
	return ret_arr;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1block_1connected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jlongArray txdata, jint height, jlong broadcaster, jlong fee_estimator, jlong logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char header_arr[80];
	CHECK((*_env)->GetArrayLength (_env, header) == 80);
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = (*_env)->GetArrayLength (_env, txdata);
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	long* txdata_vals = (*_env)->GetLongArrayElements (_env, txdata, NULL);
	for (size_t d = 0; d < txdata_constr.datalen; d++) {
		long arr_conv_29 = txdata_vals[d];
		LDKC2Tuple_usizeTransactionZ arr_conv_29_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_29;
		FREE((void*)arr_conv_29);
		txdata_constr.data[d] = arr_conv_29_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, txdata, txdata_vals, 0);
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
	LDKCVec_C2Tuple_TxidCVec_TxOutZZZ ret_var = ChannelMonitor_block_connected(&this_arg_conv, header_ref, txdata_constr, height, broadcaster_conv, fee_estimator_conv, logger_conv);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t b = 0; b < ret_var.datalen; b++) {
		long arr_conv_27_ref = (long)&ret_var.data[b];
		ret_arr_ptr[b] = arr_conv_27_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	CVec_C2Tuple_TxidCVec_TxOutZZZ_free(ret_var);
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1block_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jint height, jlong broadcaster, jlong fee_estimator, jlong logger) {
	LDKChannelMonitor this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char header_arr[80];
	CHECK((*_env)->GetArrayLength (_env, header) == 80);
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
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

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OutPoint_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKOutPoint orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKOutPoint ret = OutPoint_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OutPoint_1get_1txid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OutPoint_get_txid(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1set_1txid(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	OutPoint_set_txid(&this_ptr_conv, val_ref);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_OutPoint_1get_1index(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = OutPoint_get_index(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1set_1index(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKOutPoint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OutPoint_set_index(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1new(JNIEnv * _env, jclass _b, jbyteArray txid_arg, jshort index_arg) {
	LDKThirtyTwoBytes txid_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, txid_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, txid_arg, 0, 32, txid_arg_ref.data);
	LDKOutPoint ret = OutPoint_new(txid_arg_ref, index_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OutPoint_1to_1channel_1id(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKOutPoint this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 32, OutPoint_to_channel_id(&this_arg_conv).data);
	return arg_arr;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OutPoint_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKOutPoint obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = OutPoint_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKOutPoint ret = OutPoint_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SpendableOutputDescriptor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKSpendableOutputDescriptor this_ptr_conv = *(LDKSpendableOutputDescriptor*)this_ptr;
	FREE((void*)this_ptr);
	SpendableOutputDescriptor_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_SpendableOutputDescriptor_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKSpendableOutputDescriptor* orig_conv = (LDKSpendableOutputDescriptor*)orig;
	LDKSpendableOutputDescriptor* ret = MALLOC(sizeof(LDKSpendableOutputDescriptor), "LDKSpendableOutputDescriptor");
	*ret = SpendableOutputDescriptor_clone(orig_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelKeys this_ptr_conv = *(LDKChannelKeys*)this_ptr;
	FREE((void*)this_ptr);
	ChannelKeys_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_KeysInterface_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKKeysInterface this_ptr_conv = *(LDKKeysInterface*)this_ptr;
	FREE((void*)this_ptr);
	KeysInterface_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	InMemoryChannelKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKInMemoryChannelKeys orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKInMemoryChannelKeys ret = InMemoryChannelKeys_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1funding_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_funding_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1funding_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSecretKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_funding_key(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1revocation_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_revocation_base_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1revocation_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSecretKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_revocation_base_key(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_payment_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSecretKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_payment_key(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1delayed_1payment_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_delayed_payment_base_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1delayed_1payment_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSecretKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_delayed_payment_base_key(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1htlc_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_htlc_base_key(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1htlc_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSecretKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.bytes);
	InMemoryChannelKeys_set_htlc_base_key(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1commitment_1seed(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_commitment_seed(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1commitment_1seed(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKInMemoryChannelKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	InMemoryChannelKeys_set_commitment_seed(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1new(JNIEnv * _env, jclass _b, jbyteArray funding_key, jbyteArray revocation_base_key, jbyteArray payment_key, jbyteArray delayed_payment_base_key, jbyteArray htlc_base_key, jbyteArray commitment_seed, jlong channel_value_satoshis, jlong key_derivation_params) {
	LDKSecretKey funding_key_ref;
	CHECK((*_env)->GetArrayLength (_env, funding_key) == 32);
	(*_env)->GetByteArrayRegion (_env, funding_key, 0, 32, funding_key_ref.bytes);
	LDKSecretKey revocation_base_key_ref;
	CHECK((*_env)->GetArrayLength (_env, revocation_base_key) == 32);
	(*_env)->GetByteArrayRegion (_env, revocation_base_key, 0, 32, revocation_base_key_ref.bytes);
	LDKSecretKey payment_key_ref;
	CHECK((*_env)->GetArrayLength (_env, payment_key) == 32);
	(*_env)->GetByteArrayRegion (_env, payment_key, 0, 32, payment_key_ref.bytes);
	LDKSecretKey delayed_payment_base_key_ref;
	CHECK((*_env)->GetArrayLength (_env, delayed_payment_base_key) == 32);
	(*_env)->GetByteArrayRegion (_env, delayed_payment_base_key, 0, 32, delayed_payment_base_key_ref.bytes);
	LDKSecretKey htlc_base_key_ref;
	CHECK((*_env)->GetArrayLength (_env, htlc_base_key) == 32);
	(*_env)->GetByteArrayRegion (_env, htlc_base_key, 0, 32, htlc_base_key_ref.bytes);
	LDKThirtyTwoBytes commitment_seed_ref;
	CHECK((*_env)->GetArrayLength (_env, commitment_seed) == 32);
	(*_env)->GetByteArrayRegion (_env, commitment_seed, 0, 32, commitment_seed_ref.data);
	LDKC2Tuple_u64u64Z key_derivation_params_conv = *(LDKC2Tuple_u64u64Z*)key_derivation_params;
	FREE((void*)key_derivation_params);
	LDKInMemoryChannelKeys ret = InMemoryChannelKeys_new(funding_key_ref, revocation_base_key_ref, payment_key_ref, delayed_payment_base_key_ref, htlc_base_key_ref, commitment_seed_ref, channel_value_satoshis, key_derivation_params_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1counterparty_1pubkeys(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKChannelPublicKeys ret = InMemoryChannelKeys_counterparty_pubkeys(&this_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1counterparty_1selected_1contest_1delay(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	jshort ret_val = InMemoryChannelKeys_counterparty_selected_contest_delay(&this_arg_conv);
	return ret_val;
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1holder_1selected_1contest_1delay(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	jshort ret_val = InMemoryChannelKeys_holder_selected_contest_delay(&this_arg_conv);
	return ret_val;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1as_1ChannelKeys(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = InMemoryChannelKeys_as_ChannelKeys(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKInMemoryChannelKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = InMemoryChannelKeys_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKInMemoryChannelKeys ret = InMemoryChannelKeys_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_KeysManager_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKKeysManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	KeysManager_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysManager_1new(JNIEnv * _env, jclass _b, jbyteArray seed, jclass network, jlong starting_time_secs, jint starting_time_nanos) {
	unsigned char seed_arr[32];
	CHECK((*_env)->GetArrayLength (_env, seed) == 32);
	(*_env)->GetByteArrayRegion (_env, seed, 0, 32, seed_arr);
	unsigned char (*seed_ref)[32] = &seed_arr;
	LDKNetwork network_conv = LDKNetwork_from_java(_env, network);
	LDKKeysManager ret = KeysManager_new(seed_ref, network_conv, starting_time_secs, starting_time_nanos);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysManager_1derive_1channel_1keys(JNIEnv * _env, jclass _b, jlong this_arg, jlong channel_value_satoshis, jlong params_1, jlong params_2) {
	LDKKeysManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKInMemoryChannelKeys ret = KeysManager_derive_channel_keys(&this_arg_conv, channel_value_satoshis, params_1, params_2);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysManager_1as_1KeysInterface(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKKeysManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKKeysInterface* ret = MALLOC(sizeof(LDKKeysInterface), "LDKKeysInterface");
	*ret = KeysManager_as_KeysInterface(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelManager_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelDetails_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelDetails orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKChannelDetails ret = ChannelDetails_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ChannelDetails_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	ChannelDetails_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1remote_1network_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, ChannelDetails_get_remote_network_id(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1remote_1network_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	ChannelDetails_set_remote_network_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1counterparty_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKInitFeatures ret = ChannelDetails_get_counterparty_features(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1counterparty_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKInitFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelDetails_set_counterparty_features(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1channel_1value_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelDetails_get_channel_value_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1channel_1value_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelDetails_set_channel_value_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1user_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelDetails_get_user_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1user_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelDetails_set_user_id(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1outbound_1capacity_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelDetails_get_outbound_capacity_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1outbound_1capacity_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelDetails_set_outbound_capacity_msat(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1inbound_1capacity_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelDetails_get_inbound_capacity_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1inbound_1capacity_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelDetails_set_inbound_capacity_msat(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1is_1live(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jboolean ret_val = ChannelDetails_get_is_live(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1is_1live(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKChannelDetails this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelDetails_set_is_live(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PaymentSendFailure_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPaymentSendFailure this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PaymentSendFailure_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1new(JNIEnv * _env, jclass _b, jclass network, jlong fee_est, jlong chain_monitor, jlong tx_broadcaster, jlong logger, jlong keys_manager, jlong config, jlong current_blockchain_height) {
	LDKNetwork network_conv = LDKNetwork_from_java(_env, network);
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
	LDKChannelManager ret = ChannelManager_new(network_conv, fee_est_conv, chain_monitor_conv, tx_broadcaster_conv, logger_conv, keys_manager_conv, config_conv, current_blockchain_height);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1create_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_network_key, jlong channel_value_satoshis, jlong push_msat, jlong user_id, jlong override_config) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKPublicKey their_network_key_ref;
	CHECK((*_env)->GetArrayLength (_env, their_network_key) == 33);
	(*_env)->GetByteArrayRegion (_env, their_network_key, 0, 33, their_network_key_ref.compressed_form);
	LDKUserConfig override_config_conv;
	override_config_conv.inner = (void*)(override_config & (~1));
	override_config_conv.is_owned = (override_config & 1) || (override_config == 0);
	if (override_config_conv.inner != NULL)
		override_config_conv = UserConfig_clone(&override_config_conv);
	LDKCResult_NoneAPIErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret = ChannelManager_create_channel(&this_arg_conv, their_network_key_ref, channel_value_satoshis, push_msat, user_id, override_config_conv);
	return (long)ret;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_ChannelManager_1list_1channels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKCVec_ChannelDetailsZ ret_var = ChannelManager_list_channels(&this_arg_conv);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t q = 0; q < ret_var.datalen; q++) {
		LDKChannelDetails arr_conv_16_var = ret_var.data[q];
		CHECK((((long)arr_conv_16_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_16_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_16_ref;
		if (arr_conv_16_var.is_owned) {
			arr_conv_16_ref = (long)arr_conv_16_var.inner | 1;
		} else {
			arr_conv_16_ref = (long)arr_conv_16_var.inner & ~1;
		}
		ret_arr_ptr[q] = arr_conv_16_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT jlongArray JNICALL Java_org_ldk_impl_bindings_ChannelManager_1list_1usable_1channels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKCVec_ChannelDetailsZ ret_var = ChannelManager_list_usable_channels(&this_arg_conv);
	jlongArray ret_arr = (*_env)->NewLongArray(_env, ret_var.datalen);
	jlong *ret_arr_ptr = (*_env)->GetPrimitiveArrayCritical(_env, ret_arr, NULL);
	for (size_t q = 0; q < ret_var.datalen; q++) {
		LDKChannelDetails arr_conv_16_var = ret_var.data[q];
		CHECK((((long)arr_conv_16_var.inner) & 1) == 0); // We rely on a free low bit, malloc guarantees this.
		CHECK((((long)&arr_conv_16_var) & 1) == 0); // We rely on a free low bit, pointer alignment guarantees this.
		long arr_conv_16_ref;
		if (arr_conv_16_var.is_owned) {
			arr_conv_16_ref = (long)arr_conv_16_var.inner | 1;
		} else {
			arr_conv_16_ref = (long)arr_conv_16_var.inner & ~1;
		}
		ret_arr_ptr[q] = arr_conv_16_ref;
	}
	(*_env)->ReleasePrimitiveArrayCritical(_env, ret_arr, ret_arr_ptr, 0);
	FREE(ret_var.data);
	return ret_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1close_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray channel_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char channel_id_arr[32];
	CHECK((*_env)->GetArrayLength (_env, channel_id) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id, 0, 32, channel_id_arr);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	LDKCResult_NoneAPIErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret = ChannelManager_close_channel(&this_arg_conv, channel_id_ref);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1force_1close_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray channel_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char channel_id_arr[32];
	CHECK((*_env)->GetArrayLength (_env, channel_id) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id, 0, 32, channel_id_arr);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	ChannelManager_force_close_channel(&this_arg_conv, channel_id_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1force_1close_1all_1channels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	ChannelManager_force_close_all_channels(&this_arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1send_1payment(JNIEnv * _env, jclass _b, jlong this_arg, jlong route, jbyteArray payment_hash, jbyteArray payment_secret) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKRoute route_conv;
	route_conv.inner = (void*)(route & (~1));
	route_conv.is_owned = (route & 1) || (route == 0);
	LDKThirtyTwoBytes payment_hash_ref;
	CHECK((*_env)->GetArrayLength (_env, payment_hash) == 32);
	(*_env)->GetByteArrayRegion (_env, payment_hash, 0, 32, payment_hash_ref.data);
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK((*_env)->GetArrayLength (_env, payment_secret) == 32);
	(*_env)->GetByteArrayRegion (_env, payment_secret, 0, 32, payment_secret_ref.data);
	LDKCResult_NonePaymentSendFailureZ* ret = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret = ChannelManager_send_payment(&this_arg_conv, &route_conv, payment_hash_ref, payment_secret_ref);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1funding_1transaction_1generated(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray temporary_channel_id, jlong funding_txo) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char temporary_channel_id_arr[32];
	CHECK((*_env)->GetArrayLength (_env, temporary_channel_id) == 32);
	(*_env)->GetByteArrayRegion (_env, temporary_channel_id, 0, 32, temporary_channel_id_arr);
	unsigned char (*temporary_channel_id_ref)[32] = &temporary_channel_id_arr;
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	if (funding_txo_conv.inner != NULL)
		funding_txo_conv = OutPoint_clone(&funding_txo_conv);
	ChannelManager_funding_transaction_generated(&this_arg_conv, temporary_channel_id_ref, funding_txo_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1broadcast_1node_1announcement(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray rgb, jbyteArray alias, jlongArray addresses) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKThreeBytes rgb_ref;
	CHECK((*_env)->GetArrayLength (_env, rgb) == 3);
	(*_env)->GetByteArrayRegion (_env, rgb, 0, 3, rgb_ref.data);
	LDKThirtyTwoBytes alias_ref;
	CHECK((*_env)->GetArrayLength (_env, alias) == 32);
	(*_env)->GetByteArrayRegion (_env, alias, 0, 32, alias_ref.data);
	LDKCVec_NetAddressZ addresses_constr;
	addresses_constr.datalen = (*_env)->GetArrayLength (_env, addresses);
	if (addresses_constr.datalen > 0)
		addresses_constr.data = MALLOC(addresses_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		addresses_constr.data = NULL;
	long* addresses_vals = (*_env)->GetLongArrayElements (_env, addresses, NULL);
	for (size_t m = 0; m < addresses_constr.datalen; m++) {
		long arr_conv_12 = addresses_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		addresses_constr.data[m] = arr_conv_12_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, addresses, addresses_vals, 0);
	ChannelManager_broadcast_node_announcement(&this_arg_conv, rgb_ref, alias_ref, addresses_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1process_1pending_1htlc_1forwards(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	ChannelManager_process_pending_htlc_forwards(&this_arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1timer_1chan_1freshness_1every_1min(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	ChannelManager_timer_chan_freshness_every_min(&this_arg_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelManager_1fail_1htlc_1backwards(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray payment_hash, jbyteArray payment_secret) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char payment_hash_arr[32];
	CHECK((*_env)->GetArrayLength (_env, payment_hash) == 32);
	(*_env)->GetByteArrayRegion (_env, payment_hash, 0, 32, payment_hash_arr);
	unsigned char (*payment_hash_ref)[32] = &payment_hash_arr;
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK((*_env)->GetArrayLength (_env, payment_secret) == 32);
	(*_env)->GetByteArrayRegion (_env, payment_secret, 0, 32, payment_secret_ref.data);
	jboolean ret_val = ChannelManager_fail_htlc_backwards(&this_arg_conv, payment_hash_ref, payment_secret_ref);
	return ret_val;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelManager_1claim_1funds(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray payment_preimage, jbyteArray payment_secret, jlong expected_amount) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKThirtyTwoBytes payment_preimage_ref;
	CHECK((*_env)->GetArrayLength (_env, payment_preimage) == 32);
	(*_env)->GetByteArrayRegion (_env, payment_preimage, 0, 32, payment_preimage_ref.data);
	LDKThirtyTwoBytes payment_secret_ref;
	CHECK((*_env)->GetArrayLength (_env, payment_secret) == 32);
	(*_env)->GetByteArrayRegion (_env, payment_secret, 0, 32, payment_secret_ref.data);
	jboolean ret_val = ChannelManager_claim_funds(&this_arg_conv, payment_preimage_ref, payment_secret_ref, expected_amount);
	return ret_val;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelManager_1get_1our_1node_1id(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, ChannelManager_get_our_node_id(&this_arg_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1channel_1monitor_1updated(JNIEnv * _env, jclass _b, jlong this_arg, jlong funding_txo, jlong highest_applied_update_id) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKOutPoint funding_txo_conv;
	funding_txo_conv.inner = (void*)(funding_txo & (~1));
	funding_txo_conv.is_owned = (funding_txo & 1) || (funding_txo == 0);
	ChannelManager_channel_monitor_updated(&this_arg_conv, &funding_txo_conv, highest_applied_update_id);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1MessageSendEventsProvider(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKMessageSendEventsProvider* ret = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*ret = ChannelManager_as_MessageSendEventsProvider(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1EventsProvider(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChannelManager_as_EventsProvider(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1block_1connected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jlongArray txdata, jint height) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char header_arr[80];
	CHECK((*_env)->GetArrayLength (_env, header) == 80);
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_constr;
	txdata_constr.datalen = (*_env)->GetArrayLength (_env, txdata);
	if (txdata_constr.datalen > 0)
		txdata_constr.data = MALLOC(txdata_constr.datalen * sizeof(LDKC2Tuple_usizeTransactionZ), "LDKCVec_C2Tuple_usizeTransactionZZ Elements");
	else
		txdata_constr.data = NULL;
	long* txdata_vals = (*_env)->GetLongArrayElements (_env, txdata, NULL);
	for (size_t d = 0; d < txdata_constr.datalen; d++) {
		long arr_conv_29 = txdata_vals[d];
		LDKC2Tuple_usizeTransactionZ arr_conv_29_conv = *(LDKC2Tuple_usizeTransactionZ*)arr_conv_29;
		FREE((void*)arr_conv_29);
		txdata_constr.data[d] = arr_conv_29_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, txdata, txdata_vals, 0);
	ChannelManager_block_connected(&this_arg_conv, header_ref, txdata_constr, height);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1block_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char header_arr[80];
	CHECK((*_env)->GetArrayLength (_env, header) == 80);
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	ChannelManager_block_disconnected(&this_arg_conv, header_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1ChannelMessageHandler(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKChannelMessageHandler* ret = MALLOC(sizeof(LDKChannelMessageHandler), "LDKChannelMessageHandler");
	*ret = ChannelManager_as_ChannelMessageHandler(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelManagerReadArgs_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1keys_1manager(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	long ret_ = (long)ChannelManagerReadArgs_get_keys_manager(&this_ptr_conv);
	return ret_;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1keys_1manager(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKKeysInterface val_conv = *(LDKKeysInterface*)val;
	if (val_conv.free == LDKKeysInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKKeysInterface_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_keys_manager(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1fee_1estimator(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	long ret_ = (long)ChannelManagerReadArgs_get_fee_estimator(&this_ptr_conv);
	return ret_;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1fee_1estimator(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKFeeEstimator val_conv = *(LDKFeeEstimator*)val;
	if (val_conv.free == LDKFeeEstimator_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKFeeEstimator_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_fee_estimator(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1chain_1monitor(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	long ret_ = (long)ChannelManagerReadArgs_get_chain_monitor(&this_ptr_conv);
	return ret_;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1chain_1monitor(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKWatch val_conv = *(LDKWatch*)val;
	if (val_conv.free == LDKWatch_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKWatch_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_chain_monitor(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1tx_1broadcaster(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	long ret_ = (long)ChannelManagerReadArgs_get_tx_broadcaster(&this_ptr_conv);
	return ret_;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1tx_1broadcaster(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKBroadcasterInterface val_conv = *(LDKBroadcasterInterface*)val;
	if (val_conv.free == LDKBroadcasterInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKBroadcasterInterface_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_tx_broadcaster(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1logger(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	long ret_ = (long)ChannelManagerReadArgs_get_logger(&this_ptr_conv);
	return ret_;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1logger(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKLogger val_conv = *(LDKLogger*)val;
	if (val_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(val_conv.this_arg);
	}
	ChannelManagerReadArgs_set_logger(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1default_1config(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUserConfig ret = ChannelManagerReadArgs_get_default_config(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1default_1config(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUserConfig val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UserConfig_clone(&val_conv);
	ChannelManagerReadArgs_set_default_config(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1new(JNIEnv * _env, jclass _b, jlong keys_manager, jlong fee_estimator, jlong chain_monitor, jlong tx_broadcaster, jlong logger, jlong default_config, jlongArray channel_monitors) {
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
	channel_monitors_constr.datalen = (*_env)->GetArrayLength (_env, channel_monitors);
	if (channel_monitors_constr.datalen > 0)
		channel_monitors_constr.data = MALLOC(channel_monitors_constr.datalen * sizeof(LDKChannelMonitor), "LDKCVec_ChannelMonitorZ Elements");
	else
		channel_monitors_constr.data = NULL;
	long* channel_monitors_vals = (*_env)->GetLongArrayElements (_env, channel_monitors, NULL);
	for (size_t q = 0; q < channel_monitors_constr.datalen; q++) {
		long arr_conv_16 = channel_monitors_vals[q];
		LDKChannelMonitor arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		// Warning: we may need a move here but can't clone!
		channel_monitors_constr.data[q] = arr_conv_16_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, channel_monitors, channel_monitors_vals, 0);
	LDKChannelManagerReadArgs ret = ChannelManagerReadArgs_new(keys_manager_conv, fee_estimator_conv, chain_monitor_conv, tx_broadcaster_conv, logger_conv, default_config_conv, channel_monitors_constr);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DecodeError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDecodeError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DecodeError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Init_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInit this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Init_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Init_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKInit orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKInit ret = Init_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ErrorMessage_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKErrorMessage orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKErrorMessage ret = ErrorMessage_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ErrorMessage_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	ErrorMessage_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jstring JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1get_1data(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKStr _str = ErrorMessage_get_data(&this_ptr_conv);
	char* _buf = MALLOC(_str.len + 1, "str conv buf");
	memcpy(_buf, _str.chars, _str.len);
	_buf[_str.len] = 0;
	jstring _conv = (*_env)->NewStringUTF(_env, _str.chars);
	FREE(_buf);
	return _conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1set_1data(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKErrorMessage this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_u8Z val_ref;
	val_ref.data = (*_env)->GetByteArrayElements (_env, val, NULL);
	val_ref.datalen = (*_env)->GetArrayLength (_env, val);
	ErrorMessage_set_data(&this_ptr_conv, val_ref);
	(*_env)->ReleaseByteArrayElements(_env, val, (int8_t*)val_ref.data, 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jbyteArray data_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKCVec_u8Z data_arg_ref;
	data_arg_ref.data = (*_env)->GetByteArrayElements (_env, data_arg, NULL);
	data_arg_ref.datalen = (*_env)->GetArrayLength (_env, data_arg);
	LDKErrorMessage ret = ErrorMessage_new(channel_id_arg_ref, data_arg_ref);
	(*_env)->ReleaseByteArrayElements(_env, data_arg, (int8_t*)data_arg_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Ping_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Ping_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKPing orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKPing ret = Ping_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_Ping_1get_1ponglen(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = Ping_get_ponglen(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1set_1ponglen(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Ping_set_ponglen(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_Ping_1get_1byteslen(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = Ping_get_byteslen(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1set_1byteslen(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKPing this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Ping_set_byteslen(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Ping_1new(JNIEnv * _env, jclass _b, jshort ponglen_arg, jshort byteslen_arg) {
	LDKPing ret = Ping_new(ponglen_arg, byteslen_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Pong_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Pong_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Pong_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKPong orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKPong ret = Pong_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_Pong_1get_1byteslen(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = Pong_get_byteslen(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Pong_1set_1byteslen(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKPong this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Pong_set_byteslen(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Pong_1new(JNIEnv * _env, jclass _b, jshort byteslen_arg) {
	LDKPong ret = Pong_new(byteslen_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKOpenChannel orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKOpenChannel ret = OpenChannel_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OpenChannel_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	OpenChannel_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OpenChannel_get_temporary_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	OpenChannel_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1funding_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = OpenChannel_get_funding_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1funding_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_funding_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1push_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = OpenChannel_get_push_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1push_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_push_msat(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = OpenChannel_get_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_dust_limit_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = OpenChannel_get_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = OpenChannel_get_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_channel_reserve_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = OpenChannel_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = OpenChannel_get_feerate_per_kw(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_feerate_per_kw(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = OpenChannel_get_to_self_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_to_self_delay(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = OpenChannel_get_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_max_accepted_htlcs(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, OpenChannel_get_funding_pubkey(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_funding_pubkey(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, OpenChannel_get_revocation_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, OpenChannel_get_payment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_payment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, OpenChannel_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, OpenChannel_get_htlc_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, OpenChannel_get_first_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	OpenChannel_set_first_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1channel_1flags(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyte ret_val = OpenChannel_get_channel_flags(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1channel_1flags(JNIEnv * _env, jclass _b, jlong this_ptr, jbyte val) {
	LDKOpenChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	OpenChannel_set_channel_flags(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKAcceptChannel orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKAcceptChannel ret = AcceptChannel_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *AcceptChannel_get_temporary_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	AcceptChannel_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = AcceptChannel_get_dust_limit_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_set_dust_limit_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = AcceptChannel_get_max_htlc_value_in_flight_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_set_max_htlc_value_in_flight_msat(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = AcceptChannel_get_channel_reserve_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_set_channel_reserve_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = AcceptChannel_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = AcceptChannel_get_minimum_depth(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_set_minimum_depth(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = AcceptChannel_get_to_self_delay(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_set_to_self_delay(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = AcceptChannel_get_max_accepted_htlcs(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AcceptChannel_set_max_accepted_htlcs(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, AcceptChannel_get_funding_pubkey(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_funding_pubkey(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, AcceptChannel_get_revocation_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, AcceptChannel_get_payment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_payment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, AcceptChannel_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, AcceptChannel_get_htlc_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, AcceptChannel_get_first_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAcceptChannel this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	AcceptChannel_set_first_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingCreated_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKFundingCreated orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKFundingCreated ret = FundingCreated_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingCreated_get_temporary_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	FundingCreated_set_temporary_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1funding_1txid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingCreated_get_funding_txid(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1funding_1txid(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	FundingCreated_set_funding_txid(&this_ptr_conv, val_ref);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1funding_1output_1index(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = FundingCreated_get_funding_output_index(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1funding_1output_1index(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingCreated_set_funding_output_index(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, FundingCreated_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingCreated this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	FundingCreated_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1new(JNIEnv * _env, jclass _b, jbyteArray temporary_channel_id_arg, jbyteArray funding_txid_arg, jshort funding_output_index_arg, jbyteArray signature_arg) {
	LDKThirtyTwoBytes temporary_channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, temporary_channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, temporary_channel_id_arg, 0, 32, temporary_channel_id_arg_ref.data);
	LDKThirtyTwoBytes funding_txid_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, funding_txid_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, funding_txid_arg, 0, 32, funding_txid_arg_ref.data);
	LDKSignature signature_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, signature_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKFundingCreated ret = FundingCreated_new(temporary_channel_id_arg_ref, funding_txid_arg_ref, funding_output_index_arg, signature_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingSigned_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKFundingSigned orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKFundingSigned ret = FundingSigned_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingSigned_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingSigned_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	FundingSigned_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingSigned_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, FundingSigned_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	FundingSigned_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jbyteArray signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature signature_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, signature_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKFundingSigned ret = FundingSigned_new(channel_id_arg_ref, signature_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	FundingLocked_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKFundingLocked orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKFundingLocked ret = FundingLocked_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingLocked_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingLocked_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	FundingLocked_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingLocked_1get_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, FundingLocked_get_next_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1set_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingLocked this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	FundingLocked_set_next_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jbyteArray next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKPublicKey next_per_commitment_point_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, next_per_commitment_point_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, next_per_commitment_point_arg, 0, 33, next_per_commitment_point_arg_ref.compressed_form);
	LDKFundingLocked ret = FundingLocked_new(channel_id_arg_ref, next_per_commitment_point_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Shutdown_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKShutdown orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKShutdown ret = Shutdown_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_Shutdown_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *Shutdown_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	Shutdown_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_Shutdown_1get_1scriptpubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKu8slice arg_var = Shutdown_get_scriptpubkey(&this_ptr_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1set_1scriptpubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKShutdown this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_u8Z val_ref;
	val_ref.data = (*_env)->GetByteArrayElements (_env, val, NULL);
	val_ref.datalen = (*_env)->GetArrayLength (_env, val);
	Shutdown_set_scriptpubkey(&this_ptr_conv, val_ref);
	(*_env)->ReleaseByteArrayElements(_env, val, (int8_t*)val_ref.data, 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jbyteArray scriptpubkey_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKCVec_u8Z scriptpubkey_arg_ref;
	scriptpubkey_arg_ref.data = (*_env)->GetByteArrayElements (_env, scriptpubkey_arg, NULL);
	scriptpubkey_arg_ref.datalen = (*_env)->GetArrayLength (_env, scriptpubkey_arg);
	LDKShutdown ret = Shutdown_new(channel_id_arg_ref, scriptpubkey_arg_ref);
	(*_env)->ReleaseByteArrayElements(_env, scriptpubkey_arg, (int8_t*)scriptpubkey_arg_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ClosingSigned_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKClosingSigned orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKClosingSigned ret = ClosingSigned_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ClosingSigned_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	ClosingSigned_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1fee_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ClosingSigned_get_fee_satoshis(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1fee_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ClosingSigned_set_fee_satoshis(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, ClosingSigned_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKClosingSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	ClosingSigned_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong fee_satoshis_arg, jbyteArray signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature signature_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, signature_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKClosingSigned ret = ClosingSigned_new(channel_id_arg_ref, fee_satoshis_arg, signature_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateAddHTLC_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKUpdateAddHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKUpdateAddHTLC ret = UpdateAddHTLC_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateAddHTLC_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UpdateAddHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = UpdateAddHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateAddHTLC_set_htlc_id(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1amount_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = UpdateAddHTLC_get_amount_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1amount_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateAddHTLC_set_amount_msat(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateAddHTLC_get_payment_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UpdateAddHTLC_set_payment_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1cltv_1expiry(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = UpdateAddHTLC_get_cltv_expiry(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1cltv_1expiry(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUpdateAddHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateAddHTLC_set_cltv_expiry(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFulfillHTLC_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKUpdateFulfillHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKUpdateFulfillHTLC ret = UpdateFulfillHTLC_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFulfillHTLC_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UpdateFulfillHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = UpdateFulfillHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFulfillHTLC_set_htlc_id(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1payment_1preimage(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFulfillHTLC_get_payment_preimage(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1payment_1preimage(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFulfillHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UpdateFulfillHTLC_set_payment_preimage(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong htlc_id_arg, jbyteArray payment_preimage_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKThirtyTwoBytes payment_preimage_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, payment_preimage_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, payment_preimage_arg, 0, 32, payment_preimage_arg_ref.data);
	LDKUpdateFulfillHTLC ret = UpdateFulfillHTLC_new(channel_id_arg_ref, htlc_id_arg, payment_preimage_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailHTLC_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKUpdateFailHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKUpdateFailHTLC ret = UpdateFailHTLC_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFailHTLC_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UpdateFailHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1get_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = UpdateFailHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1set_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFailHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailHTLC_set_htlc_id(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailMalformedHTLC_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKUpdateFailMalformedHTLC orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKUpdateFailMalformedHTLC ret = UpdateFailMalformedHTLC_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFailMalformedHTLC_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UpdateFailMalformedHTLC_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = UpdateFailMalformedHTLC_get_htlc_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailMalformedHTLC_set_htlc_id(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1failure_1code(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = UpdateFailMalformedHTLC_get_failure_code(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1failure_1code(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKUpdateFailMalformedHTLC this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFailMalformedHTLC_set_failure_code(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentSigned_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKCommitmentSigned orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKCommitmentSigned ret = CommitmentSigned_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *CommitmentSigned_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	CommitmentSigned_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, CommitmentSigned_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	CommitmentSigned_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1htlc_1signatures(JNIEnv * _env, jclass _b, jlong this_ptr, jobjectArray val) {
	LDKCommitmentSigned this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_SignatureZ val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		val_constr.data = NULL;
	for (size_t i = 0; i < val_constr.datalen; i++) {
		jobject arr_conv_8 = (*_env)->GetObjectArrayElement(_env, val, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*_env)->GetArrayLength (_env, arr_conv_8) == 64);
		(*_env)->GetByteArrayRegion (_env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		val_constr.data[i] = arr_conv_8_ref;
	}
	CommitmentSigned_set_htlc_signatures(&this_ptr_conv, val_constr);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jbyteArray signature_arg, jobjectArray htlc_signatures_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature signature_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, signature_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKCVec_SignatureZ htlc_signatures_arg_constr;
	htlc_signatures_arg_constr.datalen = (*_env)->GetArrayLength (_env, htlc_signatures_arg);
	if (htlc_signatures_arg_constr.datalen > 0)
		htlc_signatures_arg_constr.data = MALLOC(htlc_signatures_arg_constr.datalen * sizeof(LDKSignature), "LDKCVec_SignatureZ Elements");
	else
		htlc_signatures_arg_constr.data = NULL;
	for (size_t i = 0; i < htlc_signatures_arg_constr.datalen; i++) {
		jobject arr_conv_8 = (*_env)->GetObjectArrayElement(_env, htlc_signatures_arg, i);
		LDKSignature arr_conv_8_ref;
		CHECK((*_env)->GetArrayLength (_env, arr_conv_8) == 64);
		(*_env)->GetByteArrayRegion (_env, arr_conv_8, 0, 64, arr_conv_8_ref.compact_form);
		htlc_signatures_arg_constr.data[i] = arr_conv_8_ref;
	}
	LDKCommitmentSigned ret = CommitmentSigned_new(channel_id_arg_ref, signature_arg_ref, htlc_signatures_arg_constr);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RevokeAndACK_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKRevokeAndACK orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKRevokeAndACK ret = RevokeAndACK_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *RevokeAndACK_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	RevokeAndACK_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *RevokeAndACK_get_per_commitment_secret(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	RevokeAndACK_set_per_commitment_secret(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, RevokeAndACK_get_next_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKRevokeAndACK this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	RevokeAndACK_set_next_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jbyteArray per_commitment_secret_arg, jbyteArray next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKThirtyTwoBytes per_commitment_secret_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, per_commitment_secret_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, per_commitment_secret_arg, 0, 32, per_commitment_secret_arg_ref.data);
	LDKPublicKey next_per_commitment_point_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, next_per_commitment_point_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, next_per_commitment_point_arg, 0, 33, next_per_commitment_point_arg_ref.compressed_form);
	LDKRevokeAndACK ret = RevokeAndACK_new(channel_id_arg_ref, per_commitment_secret_arg_ref, next_per_commitment_point_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFee_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFee_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKUpdateFee orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKUpdateFee ret = UpdateFee_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFee_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFee_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UpdateFee_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UpdateFee_1get_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = UpdateFee_get_feerate_per_kw(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1set_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUpdateFee this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UpdateFee_set_feerate_per_kw(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFee_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jint feerate_per_kw_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKUpdateFee ret = UpdateFee_new(channel_id_arg_ref, feerate_per_kw_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DataLossProtect_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKDataLossProtect orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKDataLossProtect ret = DataLossProtect_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1get_1your_1last_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *DataLossProtect_get_your_last_per_commitment_secret(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1set_1your_1last_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	DataLossProtect_set_your_last_per_commitment_secret(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1get_1my_1current_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, DataLossProtect_get_my_current_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1set_1my_1current_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKDataLossProtect this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	DataLossProtect_set_my_current_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1new(JNIEnv * _env, jclass _b, jbyteArray your_last_per_commitment_secret_arg, jbyteArray my_current_per_commitment_point_arg) {
	LDKThirtyTwoBytes your_last_per_commitment_secret_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, your_last_per_commitment_secret_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, your_last_per_commitment_secret_arg, 0, 32, your_last_per_commitment_secret_arg_ref.data);
	LDKPublicKey my_current_per_commitment_point_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, my_current_per_commitment_point_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, my_current_per_commitment_point_arg, 0, 33, my_current_per_commitment_point_arg_ref.compressed_form);
	LDKDataLossProtect ret = DataLossProtect_new(your_last_per_commitment_secret_arg_ref, my_current_per_commitment_point_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelReestablish_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelReestablish orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKChannelReestablish ret = ChannelReestablish_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ChannelReestablish_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	ChannelReestablish_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1next_1local_1commitment_1number(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelReestablish_get_next_local_commitment_number(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1next_1local_1commitment_1number(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelReestablish_set_next_local_commitment_number(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1next_1remote_1commitment_1number(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = ChannelReestablish_get_next_remote_commitment_number(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1next_1remote_1commitment_1number(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelReestablish this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelReestablish_set_next_remote_commitment_number(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AnnouncementSignatures_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKAnnouncementSignatures orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKAnnouncementSignatures ret = AnnouncementSignatures_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *AnnouncementSignatures_get_channel_id(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	AnnouncementSignatures_set_channel_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = AnnouncementSignatures_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	AnnouncementSignatures_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1node_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, AnnouncementSignatures_get_node_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1node_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	AnnouncementSignatures_set_node_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1bitcoin_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, AnnouncementSignatures_get_bitcoin_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1bitcoin_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAnnouncementSignatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	AnnouncementSignatures_set_bitcoin_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong short_channel_id_arg, jbyteArray node_signature_arg, jbyteArray bitcoin_signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, channel_id_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature node_signature_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, node_signature_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, node_signature_arg, 0, 64, node_signature_arg_ref.compact_form);
	LDKSignature bitcoin_signature_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, bitcoin_signature_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, bitcoin_signature_arg, 0, 64, bitcoin_signature_arg_ref.compact_form);
	LDKAnnouncementSignatures ret = AnnouncementSignatures_new(channel_id_arg_ref, short_channel_id_arg, node_signature_arg_ref, bitcoin_signature_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetAddress_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetAddress this_ptr_conv = *(LDKNetAddress*)this_ptr;
	FREE((void*)this_ptr);
	NetAddress_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetAddress_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKNetAddress* orig_conv = (LDKNetAddress*)orig;
	LDKNetAddress* ret = MALLOC(sizeof(LDKNetAddress), "LDKNetAddress");
	*ret = NetAddress_clone(orig_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedNodeAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKUnsignedNodeAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKUnsignedNodeAnnouncement ret = UnsignedNodeAnnouncement_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeFeatures ret = UnsignedNodeAnnouncement_get_features(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	UnsignedNodeAnnouncement_set_features(&this_ptr_conv, val_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = UnsignedNodeAnnouncement_get_timestamp(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedNodeAnnouncement_set_timestamp(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, UnsignedNodeAnnouncement_get_node_id(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	UnsignedNodeAnnouncement_set_node_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1rgb(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 3);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 3, *UnsignedNodeAnnouncement_get_rgb(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1rgb(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThreeBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 3);
	(*_env)->GetByteArrayRegion (_env, val, 0, 3, val_ref.data);
	UnsignedNodeAnnouncement_set_rgb(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1alias(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UnsignedNodeAnnouncement_get_alias(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1alias(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UnsignedNodeAnnouncement_set_alias(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1addresses(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKUnsignedNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_NetAddressZ val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		long arr_conv_12 = val_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		val_constr.data[m] = arr_conv_12_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	UnsignedNodeAnnouncement_set_addresses(&this_ptr_conv, val_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKNodeAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKNodeAnnouncement ret = NodeAnnouncement_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, NodeAnnouncement_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	NodeAnnouncement_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1get_1contents(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUnsignedNodeAnnouncement ret = NodeAnnouncement_get_contents(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1set_1contents(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUnsignedNodeAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UnsignedNodeAnnouncement_clone(&val_conv);
	NodeAnnouncement_set_contents(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1new(JNIEnv * _env, jclass _b, jbyteArray signature_arg, jlong contents_arg) {
	LDKSignature signature_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, signature_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKUnsignedNodeAnnouncement contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
	if (contents_arg_conv.inner != NULL)
		contents_arg_conv = UnsignedNodeAnnouncement_clone(&contents_arg_conv);
	LDKNodeAnnouncement ret = NodeAnnouncement_new(signature_arg_ref, contents_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKUnsignedChannelAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKUnsignedChannelAnnouncement ret = UnsignedChannelAnnouncement_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelFeatures ret = UnsignedChannelAnnouncement_get_features(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	UnsignedChannelAnnouncement_set_features(&this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UnsignedChannelAnnouncement_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UnsignedChannelAnnouncement_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = UnsignedChannelAnnouncement_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelAnnouncement_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1node_1id_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, UnsignedChannelAnnouncement_get_node_id_1(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1node_1id_11(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	UnsignedChannelAnnouncement_set_node_id_1(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1node_1id_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, UnsignedChannelAnnouncement_get_node_id_2(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1node_1id_12(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	UnsignedChannelAnnouncement_set_node_id_2(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1bitcoin_1key_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, UnsignedChannelAnnouncement_get_bitcoin_key_1(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1bitcoin_1key_11(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	UnsignedChannelAnnouncement_set_bitcoin_key_1(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1bitcoin_1key_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, UnsignedChannelAnnouncement_get_bitcoin_key_2(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1bitcoin_1key_12(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	UnsignedChannelAnnouncement_set_bitcoin_key_2(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelAnnouncement orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKChannelAnnouncement ret = ChannelAnnouncement_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1node_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, ChannelAnnouncement_get_node_signature_1(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1node_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	ChannelAnnouncement_set_node_signature_1(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1node_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, ChannelAnnouncement_get_node_signature_2(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1node_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	ChannelAnnouncement_set_node_signature_2(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1bitcoin_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, ChannelAnnouncement_get_bitcoin_signature_1(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1bitcoin_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	ChannelAnnouncement_set_bitcoin_signature_1(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1bitcoin_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, ChannelAnnouncement_get_bitcoin_signature_2(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1bitcoin_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	ChannelAnnouncement_set_bitcoin_signature_2(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1contents(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUnsignedChannelAnnouncement ret = ChannelAnnouncement_get_contents(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1contents(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUnsignedChannelAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UnsignedChannelAnnouncement_clone(&val_conv);
	ChannelAnnouncement_set_contents(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1new(JNIEnv * _env, jclass _b, jbyteArray node_signature_1_arg, jbyteArray node_signature_2_arg, jbyteArray bitcoin_signature_1_arg, jbyteArray bitcoin_signature_2_arg, jlong contents_arg) {
	LDKSignature node_signature_1_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, node_signature_1_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, node_signature_1_arg, 0, 64, node_signature_1_arg_ref.compact_form);
	LDKSignature node_signature_2_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, node_signature_2_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, node_signature_2_arg, 0, 64, node_signature_2_arg_ref.compact_form);
	LDKSignature bitcoin_signature_1_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, bitcoin_signature_1_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, bitcoin_signature_1_arg, 0, 64, bitcoin_signature_1_arg_ref.compact_form);
	LDKSignature bitcoin_signature_2_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, bitcoin_signature_2_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, bitcoin_signature_2_arg, 0, 64, bitcoin_signature_2_arg_ref.compact_form);
	LDKUnsignedChannelAnnouncement contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
	if (contents_arg_conv.inner != NULL)
		contents_arg_conv = UnsignedChannelAnnouncement_clone(&contents_arg_conv);
	LDKChannelAnnouncement ret = ChannelAnnouncement_new(node_signature_1_arg_ref, node_signature_2_arg_ref, bitcoin_signature_1_arg_ref, bitcoin_signature_2_arg_ref, contents_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKUnsignedChannelUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKUnsignedChannelUpdate ret = UnsignedChannelUpdate_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UnsignedChannelUpdate_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	UnsignedChannelUpdate_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = UnsignedChannelUpdate_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = UnsignedChannelUpdate_get_timestamp(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_set_timestamp(&this_ptr_conv, val);
}

JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1flags(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyte ret_val = UnsignedChannelUpdate_get_flags(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1flags(JNIEnv * _env, jclass _b, jlong this_ptr, jbyte val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_set_flags(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = UnsignedChannelUpdate_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_set_cltv_expiry_delta(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = UnsignedChannelUpdate_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1fee_1base_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = UnsignedChannelUpdate_get_fee_base_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1fee_1base_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_set_fee_base_msat(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1fee_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = UnsignedChannelUpdate_get_fee_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1fee_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUnsignedChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	UnsignedChannelUpdate_set_fee_proportional_millionths(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKChannelUpdate ret = ChannelUpdate_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, ChannelUpdate_get_signature(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	ChannelUpdate_set_signature(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1get_1contents(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUnsignedChannelUpdate ret = ChannelUpdate_get_contents(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1set_1contents(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUnsignedChannelUpdate val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UnsignedChannelUpdate_clone(&val_conv);
	ChannelUpdate_set_contents(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1new(JNIEnv * _env, jclass _b, jbyteArray signature_arg, jlong contents_arg) {
	LDKSignature signature_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, signature_arg) == 64);
	(*_env)->GetByteArrayRegion (_env, signature_arg, 0, 64, signature_arg_ref.compact_form);
	LDKUnsignedChannelUpdate contents_arg_conv;
	contents_arg_conv.inner = (void*)(contents_arg & (~1));
	contents_arg_conv.is_owned = (contents_arg & 1) || (contents_arg == 0);
	if (contents_arg_conv.inner != NULL)
		contents_arg_conv = UnsignedChannelUpdate_clone(&contents_arg_conv);
	LDKChannelUpdate ret = ChannelUpdate_new(signature_arg_ref, contents_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryChannelRange_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKQueryChannelRange orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKQueryChannelRange ret = QueryChannelRange_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *QueryChannelRange_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	QueryChannelRange_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1get_1first_1blocknum(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = QueryChannelRange_get_first_blocknum(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1set_1first_1blocknum(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryChannelRange_set_first_blocknum(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1get_1number_1of_1blocks(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = QueryChannelRange_get_number_of_blocks(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1set_1number_1of_1blocks(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKQueryChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryChannelRange_set_number_of_blocks(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jint first_blocknum_arg, jint number_of_blocks_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, chain_hash_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKQueryChannelRange ret = QueryChannelRange_new(chain_hash_arg_ref, first_blocknum_arg, number_of_blocks_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyChannelRange_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKReplyChannelRange orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKReplyChannelRange ret = ReplyChannelRange_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ReplyChannelRange_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	ReplyChannelRange_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1first_1blocknum(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = ReplyChannelRange_get_first_blocknum(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1first_1blocknum(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyChannelRange_set_first_blocknum(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1number_1of_1blocks(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = ReplyChannelRange_get_number_of_blocks(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1number_1of_1blocks(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyChannelRange_set_number_of_blocks(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1full_1information(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jboolean ret_val = ReplyChannelRange_get_full_information(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1full_1information(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyChannelRange_set_full_information(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1short_1channel_1ids(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKReplyChannelRange this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_u64Z val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(jlong), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t g = 0; g < val_constr.datalen; g++) {
		long arr_conv_6 = val_vals[g];
		val_constr.data[g] = arr_conv_6;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	ReplyChannelRange_set_short_channel_ids(&this_ptr_conv, val_constr);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jint first_blocknum_arg, jint number_of_blocks_arg, jboolean full_information_arg, jlongArray short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, chain_hash_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKCVec_u64Z short_channel_ids_arg_constr;
	short_channel_ids_arg_constr.datalen = (*_env)->GetArrayLength (_env, short_channel_ids_arg);
	if (short_channel_ids_arg_constr.datalen > 0)
		short_channel_ids_arg_constr.data = MALLOC(short_channel_ids_arg_constr.datalen * sizeof(jlong), "LDKCVec_u64Z Elements");
	else
		short_channel_ids_arg_constr.data = NULL;
	long* short_channel_ids_arg_vals = (*_env)->GetLongArrayElements (_env, short_channel_ids_arg, NULL);
	for (size_t g = 0; g < short_channel_ids_arg_constr.datalen; g++) {
		long arr_conv_6 = short_channel_ids_arg_vals[g];
		short_channel_ids_arg_constr.data[g] = arr_conv_6;
	}
	(*_env)->ReleaseLongArrayElements (_env, short_channel_ids_arg, short_channel_ids_arg_vals, 0);
	LDKReplyChannelRange ret = ReplyChannelRange_new(chain_hash_arg_ref, first_blocknum_arg, number_of_blocks_arg, full_information_arg, short_channel_ids_arg_constr);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	QueryShortChannelIds_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKQueryShortChannelIds orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKQueryShortChannelIds ret = QueryShortChannelIds_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *QueryShortChannelIds_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	QueryShortChannelIds_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1set_1short_1channel_1ids(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKQueryShortChannelIds this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_u64Z val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(jlong), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t g = 0; g < val_constr.datalen; g++) {
		long arr_conv_6 = val_vals[g];
		val_constr.data[g] = arr_conv_6;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	QueryShortChannelIds_set_short_channel_ids(&this_ptr_conv, val_constr);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jlongArray short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, chain_hash_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKCVec_u64Z short_channel_ids_arg_constr;
	short_channel_ids_arg_constr.datalen = (*_env)->GetArrayLength (_env, short_channel_ids_arg);
	if (short_channel_ids_arg_constr.datalen > 0)
		short_channel_ids_arg_constr.data = MALLOC(short_channel_ids_arg_constr.datalen * sizeof(jlong), "LDKCVec_u64Z Elements");
	else
		short_channel_ids_arg_constr.data = NULL;
	long* short_channel_ids_arg_vals = (*_env)->GetLongArrayElements (_env, short_channel_ids_arg, NULL);
	for (size_t g = 0; g < short_channel_ids_arg_constr.datalen; g++) {
		long arr_conv_6 = short_channel_ids_arg_vals[g];
		short_channel_ids_arg_constr.data[g] = arr_conv_6;
	}
	(*_env)->ReleaseLongArrayElements (_env, short_channel_ids_arg, short_channel_ids_arg_vals, 0);
	LDKQueryShortChannelIds ret = QueryShortChannelIds_new(chain_hash_arg_ref, short_channel_ids_arg_constr);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyShortChannelIdsEnd_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKReplyShortChannelIdsEnd orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKReplyShortChannelIdsEnd ret = ReplyShortChannelIdsEnd_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ReplyShortChannelIdsEnd_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	ReplyShortChannelIdsEnd_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1get_1full_1information(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jboolean ret_val = ReplyShortChannelIdsEnd_get_full_information(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1set_1full_1information(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKReplyShortChannelIdsEnd this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ReplyShortChannelIdsEnd_set_full_information(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jboolean full_information_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, chain_hash_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKReplyShortChannelIdsEnd ret = ReplyShortChannelIdsEnd_new(chain_hash_arg_ref, full_information_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	GossipTimestampFilter_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKGossipTimestampFilter orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKGossipTimestampFilter ret = GossipTimestampFilter_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *GossipTimestampFilter_get_chain_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	GossipTimestampFilter_set_chain_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1get_1first_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = GossipTimestampFilter_get_first_timestamp(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1set_1first_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	GossipTimestampFilter_set_first_timestamp(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1get_1timestamp_1range(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = GossipTimestampFilter_get_timestamp_range(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1set_1timestamp_1range(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKGossipTimestampFilter this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	GossipTimestampFilter_set_timestamp_range(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jint first_timestamp_arg, jint timestamp_range_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, chain_hash_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKGossipTimestampFilter ret = GossipTimestampFilter_new(chain_hash_arg_ref, first_timestamp_arg, timestamp_range_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorAction_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorAction this_ptr_conv = *(LDKErrorAction*)this_ptr;
	FREE((void*)this_ptr);
	ErrorAction_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorAction_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKErrorAction* orig_conv = (LDKErrorAction*)orig;
	LDKErrorAction* ret = MALLOC(sizeof(LDKErrorAction), "LDKErrorAction");
	*ret = ErrorAction_clone(orig_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LightningError_free(this_ptr_conv);
}

JNIEXPORT jstring JNICALL Java_org_ldk_impl_bindings_LightningError_1get_1err(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKStr _str = LightningError_get_err(&this_ptr_conv);
	char* _buf = MALLOC(_str.len + 1, "str conv buf");
	memcpy(_buf, _str.chars, _str.len);
	_buf[_str.len] = 0;
	jstring _conv = (*_env)->NewStringUTF(_env, _str.chars);
	FREE(_buf);
	return _conv;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1set_1err(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_u8Z val_ref;
	val_ref.data = (*_env)->GetByteArrayElements (_env, val, NULL);
	val_ref.datalen = (*_env)->GetArrayLength (_env, val);
	LightningError_set_err(&this_ptr_conv, val_ref);
	(*_env)->ReleaseByteArrayElements(_env, val, (int8_t*)val_ref.data, 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LightningError_1get_1action(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKErrorAction* ret = MALLOC(sizeof(LDKErrorAction), "LDKErrorAction");
	*ret = LightningError_get_action(&this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1set_1action(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLightningError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKErrorAction val_conv = *(LDKErrorAction*)val;
	FREE((void*)val);
	LightningError_set_action(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LightningError_1new(JNIEnv * _env, jclass _b, jbyteArray err_arg, jlong action_arg) {
	LDKCVec_u8Z err_arg_ref;
	err_arg_ref.data = (*_env)->GetByteArrayElements (_env, err_arg, NULL);
	err_arg_ref.datalen = (*_env)->GetArrayLength (_env, err_arg);
	LDKErrorAction action_arg_conv = *(LDKErrorAction*)action_arg;
	FREE((void*)action_arg);
	LDKLightningError ret = LightningError_new(err_arg_ref, action_arg_conv);
	(*_env)->ReleaseByteArrayElements(_env, err_arg, (int8_t*)err_arg_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	CommitmentUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKCommitmentUpdate orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKCommitmentUpdate ret = CommitmentUpdate_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1add_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_UpdateAddHTLCZ val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t p = 0; p < val_constr.datalen; p++) {
		long arr_conv_15 = val_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		if (arr_conv_15_conv.inner != NULL)
			arr_conv_15_conv = UpdateAddHTLC_clone(&arr_conv_15_conv);
		val_constr.data[p] = arr_conv_15_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	CommitmentUpdate_set_update_add_htlcs(&this_ptr_conv, val_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fulfill_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_UpdateFulfillHTLCZ val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t t = 0; t < val_constr.datalen; t++) {
		long arr_conv_19 = val_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		if (arr_conv_19_conv.inner != NULL)
			arr_conv_19_conv = UpdateFulfillHTLC_clone(&arr_conv_19_conv);
		val_constr.data[t] = arr_conv_19_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	CommitmentUpdate_set_update_fulfill_htlcs(&this_ptr_conv, val_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fail_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_UpdateFailHTLCZ val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t q = 0; q < val_constr.datalen; q++) {
		long arr_conv_16 = val_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		if (arr_conv_16_conv.inner != NULL)
			arr_conv_16_conv = UpdateFailHTLC_clone(&arr_conv_16_conv);
		val_constr.data[q] = arr_conv_16_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	CommitmentUpdate_set_update_fail_htlcs(&this_ptr_conv, val_constr);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fail_1malformed_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_UpdateFailMalformedHTLCZ val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t z = 0; z < val_constr.datalen; z++) {
		long arr_conv_25 = val_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		if (arr_conv_25_conv.inner != NULL)
			arr_conv_25_conv = UpdateFailMalformedHTLC_clone(&arr_conv_25_conv);
		val_constr.data[z] = arr_conv_25_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	CommitmentUpdate_set_update_fail_malformed_htlcs(&this_ptr_conv, val_constr);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1get_1update_1fee(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUpdateFee ret = CommitmentUpdate_get_update_fee(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fee(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKUpdateFee val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = UpdateFee_clone(&val_conv);
	CommitmentUpdate_set_update_fee(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1get_1commitment_1signed(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCommitmentSigned ret = CommitmentUpdate_get_commitment_signed(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1commitment_1signed(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCommitmentSigned val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = CommitmentSigned_clone(&val_conv);
	CommitmentUpdate_set_commitment_signed(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1new(JNIEnv * _env, jclass _b, jlongArray update_add_htlcs_arg, jlongArray update_fulfill_htlcs_arg, jlongArray update_fail_htlcs_arg, jlongArray update_fail_malformed_htlcs_arg, jlong update_fee_arg, jlong commitment_signed_arg) {
	LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg_constr;
	update_add_htlcs_arg_constr.datalen = (*_env)->GetArrayLength (_env, update_add_htlcs_arg);
	if (update_add_htlcs_arg_constr.datalen > 0)
		update_add_htlcs_arg_constr.data = MALLOC(update_add_htlcs_arg_constr.datalen * sizeof(LDKUpdateAddHTLC), "LDKCVec_UpdateAddHTLCZ Elements");
	else
		update_add_htlcs_arg_constr.data = NULL;
	long* update_add_htlcs_arg_vals = (*_env)->GetLongArrayElements (_env, update_add_htlcs_arg, NULL);
	for (size_t p = 0; p < update_add_htlcs_arg_constr.datalen; p++) {
		long arr_conv_15 = update_add_htlcs_arg_vals[p];
		LDKUpdateAddHTLC arr_conv_15_conv;
		arr_conv_15_conv.inner = (void*)(arr_conv_15 & (~1));
		arr_conv_15_conv.is_owned = (arr_conv_15 & 1) || (arr_conv_15 == 0);
		if (arr_conv_15_conv.inner != NULL)
			arr_conv_15_conv = UpdateAddHTLC_clone(&arr_conv_15_conv);
		update_add_htlcs_arg_constr.data[p] = arr_conv_15_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, update_add_htlcs_arg, update_add_htlcs_arg_vals, 0);
	LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg_constr;
	update_fulfill_htlcs_arg_constr.datalen = (*_env)->GetArrayLength (_env, update_fulfill_htlcs_arg);
	if (update_fulfill_htlcs_arg_constr.datalen > 0)
		update_fulfill_htlcs_arg_constr.data = MALLOC(update_fulfill_htlcs_arg_constr.datalen * sizeof(LDKUpdateFulfillHTLC), "LDKCVec_UpdateFulfillHTLCZ Elements");
	else
		update_fulfill_htlcs_arg_constr.data = NULL;
	long* update_fulfill_htlcs_arg_vals = (*_env)->GetLongArrayElements (_env, update_fulfill_htlcs_arg, NULL);
	for (size_t t = 0; t < update_fulfill_htlcs_arg_constr.datalen; t++) {
		long arr_conv_19 = update_fulfill_htlcs_arg_vals[t];
		LDKUpdateFulfillHTLC arr_conv_19_conv;
		arr_conv_19_conv.inner = (void*)(arr_conv_19 & (~1));
		arr_conv_19_conv.is_owned = (arr_conv_19 & 1) || (arr_conv_19 == 0);
		if (arr_conv_19_conv.inner != NULL)
			arr_conv_19_conv = UpdateFulfillHTLC_clone(&arr_conv_19_conv);
		update_fulfill_htlcs_arg_constr.data[t] = arr_conv_19_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, update_fulfill_htlcs_arg, update_fulfill_htlcs_arg_vals, 0);
	LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg_constr;
	update_fail_htlcs_arg_constr.datalen = (*_env)->GetArrayLength (_env, update_fail_htlcs_arg);
	if (update_fail_htlcs_arg_constr.datalen > 0)
		update_fail_htlcs_arg_constr.data = MALLOC(update_fail_htlcs_arg_constr.datalen * sizeof(LDKUpdateFailHTLC), "LDKCVec_UpdateFailHTLCZ Elements");
	else
		update_fail_htlcs_arg_constr.data = NULL;
	long* update_fail_htlcs_arg_vals = (*_env)->GetLongArrayElements (_env, update_fail_htlcs_arg, NULL);
	for (size_t q = 0; q < update_fail_htlcs_arg_constr.datalen; q++) {
		long arr_conv_16 = update_fail_htlcs_arg_vals[q];
		LDKUpdateFailHTLC arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		if (arr_conv_16_conv.inner != NULL)
			arr_conv_16_conv = UpdateFailHTLC_clone(&arr_conv_16_conv);
		update_fail_htlcs_arg_constr.data[q] = arr_conv_16_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, update_fail_htlcs_arg, update_fail_htlcs_arg_vals, 0);
	LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg_constr;
	update_fail_malformed_htlcs_arg_constr.datalen = (*_env)->GetArrayLength (_env, update_fail_malformed_htlcs_arg);
	if (update_fail_malformed_htlcs_arg_constr.datalen > 0)
		update_fail_malformed_htlcs_arg_constr.data = MALLOC(update_fail_malformed_htlcs_arg_constr.datalen * sizeof(LDKUpdateFailMalformedHTLC), "LDKCVec_UpdateFailMalformedHTLCZ Elements");
	else
		update_fail_malformed_htlcs_arg_constr.data = NULL;
	long* update_fail_malformed_htlcs_arg_vals = (*_env)->GetLongArrayElements (_env, update_fail_malformed_htlcs_arg, NULL);
	for (size_t z = 0; z < update_fail_malformed_htlcs_arg_constr.datalen; z++) {
		long arr_conv_25 = update_fail_malformed_htlcs_arg_vals[z];
		LDKUpdateFailMalformedHTLC arr_conv_25_conv;
		arr_conv_25_conv.inner = (void*)(arr_conv_25 & (~1));
		arr_conv_25_conv.is_owned = (arr_conv_25 & 1) || (arr_conv_25 == 0);
		if (arr_conv_25_conv.inner != NULL)
			arr_conv_25_conv = UpdateFailMalformedHTLC_clone(&arr_conv_25_conv);
		update_fail_malformed_htlcs_arg_constr.data[z] = arr_conv_25_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, update_fail_malformed_htlcs_arg, update_fail_malformed_htlcs_arg_vals, 0);
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
	LDKCommitmentUpdate ret = CommitmentUpdate_new(update_add_htlcs_arg_constr, update_fulfill_htlcs_arg_constr, update_fail_htlcs_arg_constr, update_fail_malformed_htlcs_arg_constr, update_fee_arg_conv, commitment_signed_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCFailChannelUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCFailChannelUpdate this_ptr_conv = *(LDKHTLCFailChannelUpdate*)this_ptr;
	FREE((void*)this_ptr);
	HTLCFailChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCFailChannelUpdate_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKHTLCFailChannelUpdate* orig_conv = (LDKHTLCFailChannelUpdate*)orig;
	LDKHTLCFailChannelUpdate* ret = MALLOC(sizeof(LDKHTLCFailChannelUpdate), "LDKHTLCFailChannelUpdate");
	*ret = HTLCFailChannelUpdate_clone(orig_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMessageHandler this_ptr_conv = *(LDKChannelMessageHandler*)this_ptr;
	FREE((void*)this_ptr);
	ChannelMessageHandler_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingMessageHandler this_ptr_conv = *(LDKRoutingMessageHandler*)this_ptr;
	FREE((void*)this_ptr);
	RoutingMessageHandler_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKAcceptChannel obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = AcceptChannel_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKAcceptChannel ret = AcceptChannel_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKAnnouncementSignatures obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = AnnouncementSignatures_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKAnnouncementSignatures ret = AnnouncementSignatures_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelReestablish obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ChannelReestablish_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKChannelReestablish ret = ChannelReestablish_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKClosingSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ClosingSigned_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKClosingSigned ret = ClosingSigned_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKCommitmentSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = CommitmentSigned_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKCommitmentSigned ret = CommitmentSigned_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingCreated obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = FundingCreated_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKFundingCreated ret = FundingCreated_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingSigned_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingSigned obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = FundingSigned_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKFundingSigned ret = FundingSigned_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingLocked_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingLocked obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = FundingLocked_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKFundingLocked ret = FundingLocked_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_Init_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKInit obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = Init_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Init_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKInit ret = Init_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKOpenChannel obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = OpenChannel_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKOpenChannel ret = OpenChannel_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRevokeAndACK obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = RevokeAndACK_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKRevokeAndACK ret = RevokeAndACK_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_Shutdown_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKShutdown obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = Shutdown_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKShutdown ret = Shutdown_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFailHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = UpdateFailHTLC_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKUpdateFailHTLC ret = UpdateFailHTLC_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFailMalformedHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = UpdateFailMalformedHTLC_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKUpdateFailMalformedHTLC ret = UpdateFailMalformedHTLC_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFee_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFee obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = UpdateFee_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFee_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKUpdateFee ret = UpdateFee_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFulfillHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = UpdateFulfillHTLC_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKUpdateFulfillHTLC ret = UpdateFulfillHTLC_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateAddHTLC obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = UpdateAddHTLC_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKUpdateAddHTLC ret = UpdateAddHTLC_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_Ping_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKPing obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = Ping_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Ping_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKPing ret = Ping_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_Pong_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKPong obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = Pong_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Pong_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKPong ret = Pong_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedChannelAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = UnsignedChannelAnnouncement_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKUnsignedChannelAnnouncement ret = UnsignedChannelAnnouncement_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ChannelAnnouncement_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKChannelAnnouncement ret = ChannelAnnouncement_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedChannelUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = UnsignedChannelUpdate_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKUnsignedChannelUpdate ret = UnsignedChannelUpdate_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelUpdate obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ChannelUpdate_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKChannelUpdate ret = ChannelUpdate_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKErrorMessage obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ErrorMessage_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKErrorMessage ret = ErrorMessage_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedNodeAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = UnsignedNodeAnnouncement_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKUnsignedNodeAnnouncement ret = UnsignedNodeAnnouncement_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeAnnouncement obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = NodeAnnouncement_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKNodeAnnouncement ret = NodeAnnouncement_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKQueryShortChannelIds ret = QueryShortChannelIds_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKQueryShortChannelIds obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = QueryShortChannelIds_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKReplyShortChannelIdsEnd ret = ReplyShortChannelIdsEnd_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKReplyShortChannelIdsEnd obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ReplyShortChannelIdsEnd_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKQueryChannelRange ret = QueryChannelRange_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKQueryChannelRange obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = QueryChannelRange_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKReplyChannelRange ret = ReplyChannelRange_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKReplyChannelRange obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ReplyChannelRange_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKGossipTimestampFilter ret = GossipTimestampFilter_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKGossipTimestampFilter obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = GossipTimestampFilter_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	MessageHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_MessageHandler_1get_1chan_1handler(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	long ret_ = (long)MessageHandler_get_chan_handler(&this_ptr_conv);
	return ret_;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1set_1chan_1handler(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelMessageHandler val_conv = *(LDKChannelMessageHandler*)val;
	if (val_conv.free == LDKChannelMessageHandler_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKChannelMessageHandler_JCalls_clone(val_conv.this_arg);
	}
	MessageHandler_set_chan_handler(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_MessageHandler_1get_1route_1handler(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	long ret_ = (long)MessageHandler_get_route_handler(&this_ptr_conv);
	return ret_;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1set_1route_1handler(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKMessageHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKRoutingMessageHandler val_conv = *(LDKRoutingMessageHandler*)val;
	if (val_conv.free == LDKRoutingMessageHandler_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKRoutingMessageHandler_JCalls_clone(val_conv.this_arg);
	}
	MessageHandler_set_route_handler(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_MessageHandler_1new(JNIEnv * _env, jclass _b, jlong chan_handler_arg, jlong route_handler_arg) {
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
	LDKMessageHandler ret = MessageHandler_new(chan_handler_arg_conv, route_handler_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKSocketDescriptor this_ptr_conv = *(LDKSocketDescriptor*)this_ptr;
	FREE((void*)this_ptr);
	SocketDescriptor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PeerHandleError_free(this_ptr_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1get_1no_1connection_1possible(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jboolean ret_val = PeerHandleError_get_no_connection_possible(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1set_1no_1connection_1possible(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKPeerHandleError this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PeerHandleError_set_no_connection_possible(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1new(JNIEnv * _env, jclass _b, jboolean no_connection_possible_arg) {
	LDKPeerHandleError ret = PeerHandleError_new(no_connection_possible_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerManager this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PeerManager_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1new(JNIEnv * _env, jclass _b, jlong message_handler, jbyteArray our_node_secret, jbyteArray ephemeral_random_data, jlong logger) {
	LDKMessageHandler message_handler_conv;
	message_handler_conv.inner = (void*)(message_handler & (~1));
	message_handler_conv.is_owned = (message_handler & 1) || (message_handler == 0);
	// Warning: we may need a move here but can't clone!
	LDKSecretKey our_node_secret_ref;
	CHECK((*_env)->GetArrayLength (_env, our_node_secret) == 32);
	(*_env)->GetByteArrayRegion (_env, our_node_secret, 0, 32, our_node_secret_ref.bytes);
	unsigned char ephemeral_random_data_arr[32];
	CHECK((*_env)->GetArrayLength (_env, ephemeral_random_data) == 32);
	(*_env)->GetByteArrayRegion (_env, ephemeral_random_data, 0, 32, ephemeral_random_data_arr);
	unsigned char (*ephemeral_random_data_ref)[32] = &ephemeral_random_data_arr;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKPeerManager ret = PeerManager_new(message_handler_conv, our_node_secret_ref, ephemeral_random_data_ref, logger_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jobjectArray JNICALL Java_org_ldk_impl_bindings_PeerManager_1get_1peer_1node_1ids(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKCVec_PublicKeyZ ret_var = PeerManager_get_peer_node_ids(&this_arg_conv);
	jobjectArray ret_arr = (*_env)->NewObjectArray(_env, ret_var.datalen, NULL, NULL);
	for (size_t i = 0; i < ret_var.datalen; i++) {
		jbyteArray arr_conv_8_arr = (*_env)->NewByteArray(_env, 33);
		(*_env)->SetByteArrayRegion(_env, arr_conv_8_arr, 0, 33, ret_var.data[i].compressed_form);
		(*_env)->SetObjectArrayElement(_env, ret_arr, i, arr_conv_8_arr);
	}
	CVec_PublicKeyZ_free(ret_var);
	return ret_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1new_1outbound_1connection(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray their_node_id, jlong descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKPublicKey their_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, their_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, their_node_id, 0, 33, their_node_id_ref.compressed_form);
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	if (descriptor_conv.free == LDKSocketDescriptor_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKSocketDescriptor_JCalls_clone(descriptor_conv.this_arg);
	}
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret = PeerManager_new_outbound_connection(&this_arg_conv, their_node_id_ref, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1new_1inbound_1connection(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	if (descriptor_conv.free == LDKSocketDescriptor_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKSocketDescriptor_JCalls_clone(descriptor_conv.this_arg);
	}
	LDKCResult_NonePeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret = PeerManager_new_inbound_connection(&this_arg_conv, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1write_1buffer_1space_1avail(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	LDKCResult_NonePeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret = PeerManager_write_buffer_space_avail(&this_arg_conv, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1read_1event(JNIEnv * _env, jclass _b, jlong this_arg, jlong peer_descriptor, jbyteArray data) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKSocketDescriptor* peer_descriptor_conv = (LDKSocketDescriptor*)peer_descriptor;
	LDKu8slice data_ref;
	data_ref.data = (*_env)->GetByteArrayElements (_env, data, NULL);
	data_ref.datalen = (*_env)->GetArrayLength (_env, data);
	LDKCResult_boolPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret = PeerManager_read_event(&this_arg_conv, peer_descriptor_conv, data_ref);
	(*_env)->ReleaseByteArrayElements(_env, data, (int8_t*)data_ref.data, 0);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1process_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	PeerManager_process_events(&this_arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1socket_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	PeerManager_socket_disconnected(&this_arg_conv, descriptor_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1timer_1tick_1occured(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	PeerManager_timer_tick_occured(&this_arg_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_build_1commitment_1secret(JNIEnv * _env, jclass _b, jbyteArray commitment_seed, jlong idx) {
	unsigned char commitment_seed_arr[32];
	CHECK((*_env)->GetArrayLength (_env, commitment_seed) == 32);
	(*_env)->GetByteArrayRegion (_env, commitment_seed, 0, 32, commitment_seed_arr);
	unsigned char (*commitment_seed_ref)[32] = &commitment_seed_arr;
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 32, build_commitment_secret(commitment_seed_ref, idx).data);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_derive_1private_1key(JNIEnv * _env, jclass _b, jbyteArray per_commitment_point, jbyteArray base_secret) {
	LDKPublicKey per_commitment_point_ref;
	CHECK((*_env)->GetArrayLength (_env, per_commitment_point) == 33);
	(*_env)->GetByteArrayRegion (_env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	unsigned char base_secret_arr[32];
	CHECK((*_env)->GetArrayLength (_env, base_secret) == 32);
	(*_env)->GetByteArrayRegion (_env, base_secret, 0, 32, base_secret_arr);
	unsigned char (*base_secret_ref)[32] = &base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret = derive_private_key(per_commitment_point_ref, base_secret_ref);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_derive_1public_1key(JNIEnv * _env, jclass _b, jbyteArray per_commitment_point, jbyteArray base_point) {
	LDKPublicKey per_commitment_point_ref;
	CHECK((*_env)->GetArrayLength (_env, per_commitment_point) == 33);
	(*_env)->GetByteArrayRegion (_env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	LDKPublicKey base_point_ref;
	CHECK((*_env)->GetArrayLength (_env, base_point) == 33);
	(*_env)->GetByteArrayRegion (_env, base_point, 0, 33, base_point_ref.compressed_form);
	LDKCResult_PublicKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret = derive_public_key(per_commitment_point_ref, base_point_ref);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_derive_1private_1revocation_1key(JNIEnv * _env, jclass _b, jbyteArray per_commitment_secret, jbyteArray countersignatory_revocation_base_secret) {
	unsigned char per_commitment_secret_arr[32];
	CHECK((*_env)->GetArrayLength (_env, per_commitment_secret) == 32);
	(*_env)->GetByteArrayRegion (_env, per_commitment_secret, 0, 32, per_commitment_secret_arr);
	unsigned char (*per_commitment_secret_ref)[32] = &per_commitment_secret_arr;
	unsigned char countersignatory_revocation_base_secret_arr[32];
	CHECK((*_env)->GetArrayLength (_env, countersignatory_revocation_base_secret) == 32);
	(*_env)->GetByteArrayRegion (_env, countersignatory_revocation_base_secret, 0, 32, countersignatory_revocation_base_secret_arr);
	unsigned char (*countersignatory_revocation_base_secret_ref)[32] = &countersignatory_revocation_base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret = derive_private_revocation_key(per_commitment_secret_ref, countersignatory_revocation_base_secret_ref);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_derive_1public_1revocation_1key(JNIEnv * _env, jclass _b, jbyteArray per_commitment_point, jbyteArray countersignatory_revocation_base_point) {
	LDKPublicKey per_commitment_point_ref;
	CHECK((*_env)->GetArrayLength (_env, per_commitment_point) == 33);
	(*_env)->GetByteArrayRegion (_env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	LDKPublicKey countersignatory_revocation_base_point_ref;
	CHECK((*_env)->GetArrayLength (_env, countersignatory_revocation_base_point) == 33);
	(*_env)->GetByteArrayRegion (_env, countersignatory_revocation_base_point, 0, 33, countersignatory_revocation_base_point_ref.compressed_form);
	LDKCResult_PublicKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret = derive_public_revocation_key(per_commitment_point_ref, countersignatory_revocation_base_point_ref);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	TxCreationKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKTxCreationKeys orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKTxCreationKeys ret = TxCreationKeys_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, TxCreationKeys_get_per_commitment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_per_commitment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1revocation_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, TxCreationKeys_get_revocation_key(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1revocation_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_revocation_key(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1broadcaster_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, TxCreationKeys_get_broadcaster_htlc_key(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1broadcaster_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_broadcaster_htlc_key(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1countersignatory_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, TxCreationKeys_get_countersignatory_htlc_key(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1countersignatory_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_countersignatory_htlc_key(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1broadcaster_1delayed_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, TxCreationKeys_get_broadcaster_delayed_payment_key(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1broadcaster_1delayed_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	TxCreationKeys_set_broadcaster_delayed_payment_key(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1new(JNIEnv * _env, jclass _b, jbyteArray per_commitment_point_arg, jbyteArray revocation_key_arg, jbyteArray broadcaster_htlc_key_arg, jbyteArray countersignatory_htlc_key_arg, jbyteArray broadcaster_delayed_payment_key_arg) {
	LDKPublicKey per_commitment_point_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, per_commitment_point_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, per_commitment_point_arg, 0, 33, per_commitment_point_arg_ref.compressed_form);
	LDKPublicKey revocation_key_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, revocation_key_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, revocation_key_arg, 0, 33, revocation_key_arg_ref.compressed_form);
	LDKPublicKey broadcaster_htlc_key_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, broadcaster_htlc_key_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, broadcaster_htlc_key_arg, 0, 33, broadcaster_htlc_key_arg_ref.compressed_form);
	LDKPublicKey countersignatory_htlc_key_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, countersignatory_htlc_key_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, countersignatory_htlc_key_arg, 0, 33, countersignatory_htlc_key_arg_ref.compressed_form);
	LDKPublicKey broadcaster_delayed_payment_key_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, broadcaster_delayed_payment_key_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, broadcaster_delayed_payment_key_arg, 0, 33, broadcaster_delayed_payment_key_arg_ref.compressed_form);
	LDKTxCreationKeys ret = TxCreationKeys_new(per_commitment_point_arg_ref, revocation_key_arg_ref, broadcaster_htlc_key_arg_ref, countersignatory_htlc_key_arg_ref, broadcaster_delayed_payment_key_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKTxCreationKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = TxCreationKeys_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKTxCreationKeys ret = TxCreationKeys_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPreCalculatedTxCreationKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	PreCalculatedTxCreationKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1new(JNIEnv * _env, jclass _b, jlong keys) {
	LDKTxCreationKeys keys_conv;
	keys_conv.inner = (void*)(keys & (~1));
	keys_conv.is_owned = (keys & 1) || (keys == 0);
	if (keys_conv.inner != NULL)
		keys_conv = TxCreationKeys_clone(&keys_conv);
	LDKPreCalculatedTxCreationKeys ret = PreCalculatedTxCreationKeys_new(keys_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1trust_1key_1derivation(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPreCalculatedTxCreationKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKTxCreationKeys ret = PreCalculatedTxCreationKeys_trust_key_derivation(&this_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPreCalculatedTxCreationKeys this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, PreCalculatedTxCreationKeys_per_commitment_point(&this_arg_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelPublicKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKChannelPublicKeys orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKChannelPublicKeys ret = ChannelPublicKeys_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, ChannelPublicKeys_get_funding_pubkey(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_funding_pubkey(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, ChannelPublicKeys_get_revocation_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_revocation_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, ChannelPublicKeys_get_payment_point(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_payment_point(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, ChannelPublicKeys_get_delayed_payment_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_delayed_payment_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, ChannelPublicKeys_get_htlc_basepoint(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelPublicKeys this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	ChannelPublicKeys_set_htlc_basepoint(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1new(JNIEnv * _env, jclass _b, jbyteArray funding_pubkey_arg, jbyteArray revocation_basepoint_arg, jbyteArray payment_point_arg, jbyteArray delayed_payment_basepoint_arg, jbyteArray htlc_basepoint_arg) {
	LDKPublicKey funding_pubkey_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, funding_pubkey_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, funding_pubkey_arg, 0, 33, funding_pubkey_arg_ref.compressed_form);
	LDKPublicKey revocation_basepoint_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, revocation_basepoint_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, revocation_basepoint_arg, 0, 33, revocation_basepoint_arg_ref.compressed_form);
	LDKPublicKey payment_point_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, payment_point_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, payment_point_arg, 0, 33, payment_point_arg_ref.compressed_form);
	LDKPublicKey delayed_payment_basepoint_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, delayed_payment_basepoint_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, delayed_payment_basepoint_arg, 0, 33, delayed_payment_basepoint_arg_ref.compressed_form);
	LDKPublicKey htlc_basepoint_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, htlc_basepoint_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, htlc_basepoint_arg, 0, 33, htlc_basepoint_arg_ref.compressed_form);
	LDKChannelPublicKeys ret = ChannelPublicKeys_new(funding_pubkey_arg_ref, revocation_basepoint_arg_ref, payment_point_arg_ref, delayed_payment_basepoint_arg_ref, htlc_basepoint_arg_ref);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelPublicKeys obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ChannelPublicKeys_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKChannelPublicKeys ret = ChannelPublicKeys_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1derive_1new(JNIEnv * _env, jclass _b, jbyteArray per_commitment_point, jbyteArray broadcaster_delayed_payment_base, jbyteArray broadcaster_htlc_base, jbyteArray countersignatory_revocation_base, jbyteArray countersignatory_htlc_base) {
	LDKPublicKey per_commitment_point_ref;
	CHECK((*_env)->GetArrayLength (_env, per_commitment_point) == 33);
	(*_env)->GetByteArrayRegion (_env, per_commitment_point, 0, 33, per_commitment_point_ref.compressed_form);
	LDKPublicKey broadcaster_delayed_payment_base_ref;
	CHECK((*_env)->GetArrayLength (_env, broadcaster_delayed_payment_base) == 33);
	(*_env)->GetByteArrayRegion (_env, broadcaster_delayed_payment_base, 0, 33, broadcaster_delayed_payment_base_ref.compressed_form);
	LDKPublicKey broadcaster_htlc_base_ref;
	CHECK((*_env)->GetArrayLength (_env, broadcaster_htlc_base) == 33);
	(*_env)->GetByteArrayRegion (_env, broadcaster_htlc_base, 0, 33, broadcaster_htlc_base_ref.compressed_form);
	LDKPublicKey countersignatory_revocation_base_ref;
	CHECK((*_env)->GetArrayLength (_env, countersignatory_revocation_base) == 33);
	(*_env)->GetByteArrayRegion (_env, countersignatory_revocation_base, 0, 33, countersignatory_revocation_base_ref.compressed_form);
	LDKPublicKey countersignatory_htlc_base_ref;
	CHECK((*_env)->GetArrayLength (_env, countersignatory_htlc_base) == 33);
	(*_env)->GetByteArrayRegion (_env, countersignatory_htlc_base, 0, 33, countersignatory_htlc_base_ref.compressed_form);
	LDKCResult_TxCreationKeysSecpErrorZ* ret = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret = TxCreationKeys_derive_new(per_commitment_point_ref, broadcaster_delayed_payment_base_ref, broadcaster_htlc_base_ref, countersignatory_revocation_base_ref, countersignatory_htlc_base_ref);
	return (long)ret;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_get_1revokeable_1redeemscript(JNIEnv * _env, jclass _b, jbyteArray revocation_key, jshort contest_delay, jbyteArray broadcaster_delayed_payment_key) {
	LDKPublicKey revocation_key_ref;
	CHECK((*_env)->GetArrayLength (_env, revocation_key) == 33);
	(*_env)->GetByteArrayRegion (_env, revocation_key, 0, 33, revocation_key_ref.compressed_form);
	LDKPublicKey broadcaster_delayed_payment_key_ref;
	CHECK((*_env)->GetArrayLength (_env, broadcaster_delayed_payment_key) == 33);
	(*_env)->GetByteArrayRegion (_env, broadcaster_delayed_payment_key, 0, 33, broadcaster_delayed_payment_key_ref.compressed_form);
	LDKCVec_u8Z arg_var = get_revokeable_redeemscript(revocation_key_ref, contest_delay, broadcaster_delayed_payment_key_ref);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCOutputInCommitment_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKHTLCOutputInCommitment orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKHTLCOutputInCommitment ret = HTLCOutputInCommitment_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1offered(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jboolean ret_val = HTLCOutputInCommitment_get_offered(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1offered(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCOutputInCommitment_set_offered(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1amount_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = HTLCOutputInCommitment_get_amount_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1amount_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCOutputInCommitment_set_amount_msat(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1cltv_1expiry(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = HTLCOutputInCommitment_get_cltv_expiry(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1cltv_1expiry(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HTLCOutputInCommitment_set_cltv_expiry(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *HTLCOutputInCommitment_get_payment_hash(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKHTLCOutputInCommitment this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	HTLCOutputInCommitment_set_payment_hash(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHTLCOutputInCommitment obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = HTLCOutputInCommitment_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKHTLCOutputInCommitment ret = HTLCOutputInCommitment_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_get_1htlc_1redeemscript(JNIEnv * _env, jclass _b, jlong htlc, jlong keys) {
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = (htlc & 1) || (htlc == 0);
	LDKTxCreationKeys keys_conv;
	keys_conv.inner = (void*)(keys & (~1));
	keys_conv.is_owned = (keys & 1) || (keys == 0);
	LDKCVec_u8Z arg_var = get_htlc_redeemscript(&htlc_conv, &keys_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_make_1funding_1redeemscript(JNIEnv * _env, jclass _b, jbyteArray broadcaster, jbyteArray countersignatory) {
	LDKPublicKey broadcaster_ref;
	CHECK((*_env)->GetArrayLength (_env, broadcaster) == 33);
	(*_env)->GetByteArrayRegion (_env, broadcaster, 0, 33, broadcaster_ref.compressed_form);
	LDKPublicKey countersignatory_ref;
	CHECK((*_env)->GetArrayLength (_env, countersignatory) == 33);
	(*_env)->GetByteArrayRegion (_env, countersignatory, 0, 33, countersignatory_ref.compressed_form);
	LDKCVec_u8Z arg_var = make_funding_redeemscript(broadcaster_ref, countersignatory_ref);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_build_1htlc_1transaction(JNIEnv * _env, jclass _b, jbyteArray prev_hash, jint feerate_per_kw, jshort contest_delay, jlong htlc, jbyteArray broadcaster_delayed_payment_key, jbyteArray revocation_key) {
	unsigned char prev_hash_arr[32];
	CHECK((*_env)->GetArrayLength (_env, prev_hash) == 32);
	(*_env)->GetByteArrayRegion (_env, prev_hash, 0, 32, prev_hash_arr);
	unsigned char (*prev_hash_ref)[32] = &prev_hash_arr;
	LDKHTLCOutputInCommitment htlc_conv;
	htlc_conv.inner = (void*)(htlc & (~1));
	htlc_conv.is_owned = (htlc & 1) || (htlc == 0);
	LDKPublicKey broadcaster_delayed_payment_key_ref;
	CHECK((*_env)->GetArrayLength (_env, broadcaster_delayed_payment_key) == 33);
	(*_env)->GetByteArrayRegion (_env, broadcaster_delayed_payment_key, 0, 33, broadcaster_delayed_payment_key_ref.compressed_form);
	LDKPublicKey revocation_key_ref;
	CHECK((*_env)->GetArrayLength (_env, revocation_key) == 33);
	(*_env)->GetByteArrayRegion (_env, revocation_key, 0, 33, revocation_key_ref.compressed_form);
	LDKTransaction* ret = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	*ret = build_htlc_transaction(prev_hash_ref, feerate_per_kw, contest_delay, &htlc_conv, broadcaster_delayed_payment_key_ref, revocation_key_ref);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HolderCommitmentTransaction_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKHolderCommitmentTransaction orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKHolderCommitmentTransaction ret = HolderCommitmentTransaction_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1unsigned_1tx(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKTransaction* ret = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	*ret = HolderCommitmentTransaction_get_unsigned_tx(&this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1unsigned_1tx(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKTransaction val_conv = *(LDKTransaction*)val;
	HolderCommitmentTransaction_set_unsigned_tx(&this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1counterparty_1sig(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, HolderCommitmentTransaction_get_counterparty_sig(&this_ptr_conv).compact_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1counterparty_1sig(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKSignature val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 64);
	(*_env)->GetByteArrayRegion (_env, val, 0, 64, val_ref.compact_form);
	HolderCommitmentTransaction_set_counterparty_sig(&this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = HolderCommitmentTransaction_get_feerate_per_kw(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	HolderCommitmentTransaction_set_feerate_per_kw(&this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1per_1htlc(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKHolderCommitmentTransaction this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ), "LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t q = 0; q < val_constr.datalen; q++) {
		long arr_conv_42 = val_vals[q];
		LDKC2Tuple_HTLCOutputInCommitmentSignatureZ arr_conv_42_conv = *(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ*)arr_conv_42;
		FREE((void*)arr_conv_42);
		val_constr.data[q] = arr_conv_42_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	HolderCommitmentTransaction_set_per_htlc(&this_ptr_conv, val_constr);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1new_1missing_1holder_1sig(JNIEnv * _env, jclass _b, jlong unsigned_tx, jbyteArray counterparty_sig, jbyteArray holder_funding_key, jbyteArray counterparty_funding_key, jlong keys, jint feerate_per_kw, jlongArray htlc_data) {
	LDKTransaction unsigned_tx_conv = *(LDKTransaction*)unsigned_tx;
	LDKSignature counterparty_sig_ref;
	CHECK((*_env)->GetArrayLength (_env, counterparty_sig) == 64);
	(*_env)->GetByteArrayRegion (_env, counterparty_sig, 0, 64, counterparty_sig_ref.compact_form);
	LDKPublicKey holder_funding_key_ref;
	CHECK((*_env)->GetArrayLength (_env, holder_funding_key) == 33);
	(*_env)->GetByteArrayRegion (_env, holder_funding_key, 0, 33, holder_funding_key_ref.compressed_form);
	LDKPublicKey counterparty_funding_key_ref;
	CHECK((*_env)->GetArrayLength (_env, counterparty_funding_key) == 33);
	(*_env)->GetByteArrayRegion (_env, counterparty_funding_key, 0, 33, counterparty_funding_key_ref.compressed_form);
	LDKTxCreationKeys keys_conv;
	keys_conv.inner = (void*)(keys & (~1));
	keys_conv.is_owned = (keys & 1) || (keys == 0);
	if (keys_conv.inner != NULL)
		keys_conv = TxCreationKeys_clone(&keys_conv);
	LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ htlc_data_constr;
	htlc_data_constr.datalen = (*_env)->GetArrayLength (_env, htlc_data);
	if (htlc_data_constr.datalen > 0)
		htlc_data_constr.data = MALLOC(htlc_data_constr.datalen * sizeof(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ), "LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ Elements");
	else
		htlc_data_constr.data = NULL;
	long* htlc_data_vals = (*_env)->GetLongArrayElements (_env, htlc_data, NULL);
	for (size_t q = 0; q < htlc_data_constr.datalen; q++) {
		long arr_conv_42 = htlc_data_vals[q];
		LDKC2Tuple_HTLCOutputInCommitmentSignatureZ arr_conv_42_conv = *(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ*)arr_conv_42;
		FREE((void*)arr_conv_42);
		htlc_data_constr.data[q] = arr_conv_42_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, htlc_data, htlc_data_vals, 0);
	LDKHolderCommitmentTransaction ret = HolderCommitmentTransaction_new_missing_holder_sig(unsigned_tx_conv, counterparty_sig_ref, holder_funding_key_ref, counterparty_funding_key_ref, keys_conv, feerate_per_kw, htlc_data_constr);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1trust_1key_1derivation(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKHolderCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKTxCreationKeys ret = HolderCommitmentTransaction_trust_key_derivation(&this_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1txid(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKHolderCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 32, HolderCommitmentTransaction_txid(&this_arg_conv).data);
	return arg_arr;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1holder_1sig(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray funding_key, jbyteArray funding_redeemscript, jlong channel_value_satoshis) {
	LDKHolderCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char funding_key_arr[32];
	CHECK((*_env)->GetArrayLength (_env, funding_key) == 32);
	(*_env)->GetByteArrayRegion (_env, funding_key, 0, 32, funding_key_arr);
	unsigned char (*funding_key_ref)[32] = &funding_key_arr;
	LDKu8slice funding_redeemscript_ref;
	funding_redeemscript_ref.data = (*_env)->GetByteArrayElements (_env, funding_redeemscript, NULL);
	funding_redeemscript_ref.datalen = (*_env)->GetArrayLength (_env, funding_redeemscript);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 64);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 64, HolderCommitmentTransaction_get_holder_sig(&this_arg_conv, funding_key_ref, funding_redeemscript_ref, channel_value_satoshis).compact_form);
	(*_env)->ReleaseByteArrayElements(_env, funding_redeemscript, (int8_t*)funding_redeemscript_ref.data, 0);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1htlc_1sigs(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray htlc_base_key, jshort counterparty_selected_contest_delay) {
	LDKHolderCommitmentTransaction this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	unsigned char htlc_base_key_arr[32];
	CHECK((*_env)->GetArrayLength (_env, htlc_base_key) == 32);
	(*_env)->GetByteArrayRegion (_env, htlc_base_key, 0, 32, htlc_base_key_arr);
	unsigned char (*htlc_base_key_ref)[32] = &htlc_base_key_arr;
	LDKCResult_CVec_SignatureZNoneZ* ret = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret = HolderCommitmentTransaction_get_htlc_sigs(&this_arg_conv, htlc_base_key_ref, counterparty_selected_contest_delay);
	return (long)ret;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHolderCommitmentTransaction obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = HolderCommitmentTransaction_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKHolderCommitmentTransaction ret = HolderCommitmentTransaction_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InitFeatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInitFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	InitFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeFeatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelFeatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelFeatures this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHop_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKRouteHop orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKRouteHop ret = RouteHop_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, RouteHop_get_pubkey(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	RouteHop_set_pubkey(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1node_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeFeatures ret = RouteHop_get_node_features(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1node_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	RouteHop_set_node_features(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = RouteHop_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHop_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1channel_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelFeatures ret = RouteHop_get_channel_features(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1channel_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	RouteHop_set_channel_features(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1fee_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = RouteHop_get_fee_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1fee_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHop_set_fee_msat(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = RouteHop_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKRouteHop this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHop_set_cltv_expiry_delta(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1new(JNIEnv * _env, jclass _b, jbyteArray pubkey_arg, jlong node_features_arg, jlong short_channel_id_arg, jlong channel_features_arg, jlong fee_msat_arg, jint cltv_expiry_delta_arg) {
	LDKPublicKey pubkey_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, pubkey_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, pubkey_arg, 0, 33, pubkey_arg_ref.compressed_form);
	LDKNodeFeatures node_features_arg_conv;
	node_features_arg_conv.inner = (void*)(node_features_arg & (~1));
	node_features_arg_conv.is_owned = (node_features_arg & 1) || (node_features_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKChannelFeatures channel_features_arg_conv;
	channel_features_arg_conv.inner = (void*)(channel_features_arg & (~1));
	channel_features_arg_conv.is_owned = (channel_features_arg & 1) || (channel_features_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKRouteHop ret = RouteHop_new(pubkey_arg_ref, node_features_arg_conv, short_channel_id_arg, channel_features_arg_conv, fee_msat_arg, cltv_expiry_delta_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Route_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoute this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	Route_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Route_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKRoute orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKRoute ret = Route_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Route_1set_1paths(JNIEnv * _env, jclass _b, jlong this_ptr, jobjectArray val) {
	LDKRoute this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_CVec_RouteHopZZ val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		val_constr.data = NULL;
	for (size_t m = 0; m < val_constr.datalen; m++) {
		jobject arr_conv_12 = (*_env)->GetObjectArrayElement(_env, val, m);
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = (*_env)->GetArrayLength (_env, arr_conv_12);
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		long* arr_conv_12_vals = (*_env)->GetLongArrayElements (_env, arr_conv_12, NULL);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			long arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			if (arr_conv_10_conv.inner != NULL)
				arr_conv_10_conv = RouteHop_clone(&arr_conv_10_conv);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		(*_env)->ReleaseLongArrayElements (_env, arr_conv_12, arr_conv_12_vals, 0);
		val_constr.data[m] = arr_conv_12_constr;
	}
	Route_set_paths(&this_ptr_conv, val_constr);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Route_1new(JNIEnv * _env, jclass _b, jobjectArray paths_arg) {
	LDKCVec_CVec_RouteHopZZ paths_arg_constr;
	paths_arg_constr.datalen = (*_env)->GetArrayLength (_env, paths_arg);
	if (paths_arg_constr.datalen > 0)
		paths_arg_constr.data = MALLOC(paths_arg_constr.datalen * sizeof(LDKCVec_RouteHopZ), "LDKCVec_CVec_RouteHopZZ Elements");
	else
		paths_arg_constr.data = NULL;
	for (size_t m = 0; m < paths_arg_constr.datalen; m++) {
		jobject arr_conv_12 = (*_env)->GetObjectArrayElement(_env, paths_arg, m);
		LDKCVec_RouteHopZ arr_conv_12_constr;
		arr_conv_12_constr.datalen = (*_env)->GetArrayLength (_env, arr_conv_12);
		if (arr_conv_12_constr.datalen > 0)
			arr_conv_12_constr.data = MALLOC(arr_conv_12_constr.datalen * sizeof(LDKRouteHop), "LDKCVec_RouteHopZ Elements");
		else
			arr_conv_12_constr.data = NULL;
		long* arr_conv_12_vals = (*_env)->GetLongArrayElements (_env, arr_conv_12, NULL);
		for (size_t k = 0; k < arr_conv_12_constr.datalen; k++) {
			long arr_conv_10 = arr_conv_12_vals[k];
			LDKRouteHop arr_conv_10_conv;
			arr_conv_10_conv.inner = (void*)(arr_conv_10 & (~1));
			arr_conv_10_conv.is_owned = (arr_conv_10 & 1) || (arr_conv_10 == 0);
			if (arr_conv_10_conv.inner != NULL)
				arr_conv_10_conv = RouteHop_clone(&arr_conv_10_conv);
			arr_conv_12_constr.data[k] = arr_conv_10_conv;
		}
		(*_env)->ReleaseLongArrayElements (_env, arr_conv_12, arr_conv_12_vals, 0);
		paths_arg_constr.data[m] = arr_conv_12_constr;
	}
	LDKRoute ret = Route_new(paths_arg_constr);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_Route_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRoute obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = Route_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Route_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKRoute ret = Route_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHint_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKRouteHint orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKRouteHint ret = RouteHint_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1src_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, RouteHint_get_src_node_id(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1src_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	RouteHint_set_src_node_id(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = RouteHint_get_short_channel_id(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHint_set_short_channel_id(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1fees(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKRoutingFees ret = RouteHint_get_fees(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1fees(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = RoutingFees_clone(&val_conv);
	RouteHint_set_fees(&this_ptr_conv, val_conv);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = RouteHint_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHint_set_cltv_expiry_delta(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = RouteHint_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RouteHint_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1new(JNIEnv * _env, jclass _b, jbyteArray src_node_id_arg, jlong short_channel_id_arg, jlong fees_arg, jshort cltv_expiry_delta_arg, jlong htlc_minimum_msat_arg) {
	LDKPublicKey src_node_id_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, src_node_id_arg) == 33);
	(*_env)->GetByteArrayRegion (_env, src_node_id_arg, 0, 33, src_node_id_arg_ref.compressed_form);
	LDKRoutingFees fees_arg_conv;
	fees_arg_conv.inner = (void*)(fees_arg & (~1));
	fees_arg_conv.is_owned = (fees_arg & 1) || (fees_arg == 0);
	if (fees_arg_conv.inner != NULL)
		fees_arg_conv = RoutingFees_clone(&fees_arg_conv);
	LDKRouteHint ret = RouteHint_new(src_node_id_arg_ref, short_channel_id_arg, fees_arg_conv, cltv_expiry_delta_arg, htlc_minimum_msat_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_get_1route(JNIEnv * _env, jclass _b, jbyteArray our_node_id, jlong network, jbyteArray target, jlongArray first_hops, jlongArray last_hops, jlong final_value_msat, jint final_cltv, jlong logger) {
	LDKPublicKey our_node_id_ref;
	CHECK((*_env)->GetArrayLength (_env, our_node_id) == 33);
	(*_env)->GetByteArrayRegion (_env, our_node_id, 0, 33, our_node_id_ref.compressed_form);
	LDKNetworkGraph network_conv;
	network_conv.inner = (void*)(network & (~1));
	network_conv.is_owned = (network & 1) || (network == 0);
	LDKPublicKey target_ref;
	CHECK((*_env)->GetArrayLength (_env, target) == 33);
	(*_env)->GetByteArrayRegion (_env, target, 0, 33, target_ref.compressed_form);
	LDKCVec_ChannelDetailsZ first_hops_constr;
	first_hops_constr.datalen = (*_env)->GetArrayLength (_env, first_hops);
	if (first_hops_constr.datalen > 0)
		first_hops_constr.data = MALLOC(first_hops_constr.datalen * sizeof(LDKChannelDetails), "LDKCVec_ChannelDetailsZ Elements");
	else
		first_hops_constr.data = NULL;
	long* first_hops_vals = (*_env)->GetLongArrayElements (_env, first_hops, NULL);
	for (size_t q = 0; q < first_hops_constr.datalen; q++) {
		long arr_conv_16 = first_hops_vals[q];
		LDKChannelDetails arr_conv_16_conv;
		arr_conv_16_conv.inner = (void*)(arr_conv_16 & (~1));
		arr_conv_16_conv.is_owned = (arr_conv_16 & 1) || (arr_conv_16 == 0);
		first_hops_constr.data[q] = arr_conv_16_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, first_hops, first_hops_vals, 0);
	LDKCVec_RouteHintZ last_hops_constr;
	last_hops_constr.datalen = (*_env)->GetArrayLength (_env, last_hops);
	if (last_hops_constr.datalen > 0)
		last_hops_constr.data = MALLOC(last_hops_constr.datalen * sizeof(LDKRouteHint), "LDKCVec_RouteHintZ Elements");
	else
		last_hops_constr.data = NULL;
	long* last_hops_vals = (*_env)->GetLongArrayElements (_env, last_hops, NULL);
	for (size_t l = 0; l < last_hops_constr.datalen; l++) {
		long arr_conv_11 = last_hops_vals[l];
		LDKRouteHint arr_conv_11_conv;
		arr_conv_11_conv.inner = (void*)(arr_conv_11 & (~1));
		arr_conv_11_conv.is_owned = (arr_conv_11 & 1) || (arr_conv_11 == 0);
		if (arr_conv_11_conv.inner != NULL)
			arr_conv_11_conv = RouteHint_clone(&arr_conv_11_conv);
		last_hops_constr.data[l] = arr_conv_11_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, last_hops, last_hops_vals, 0);
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKCResult_RouteLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret = get_route(our_node_id_ref, &network_conv, target_ref, &first_hops_constr, last_hops_constr, final_value_msat, final_cltv, logger_conv);
	FREE(first_hops_constr.data);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetworkGraph this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NetworkGraph_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LockedNetworkGraph_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLockedNetworkGraph this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LockedNetworkGraph_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetGraphMsgHandler this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NetGraphMsgHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1new(JNIEnv * _env, jclass _b, jlong chain_access, jlong logger) {
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKNetGraphMsgHandler ret = NetGraphMsgHandler_new(chain_access_conv, logger_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1from_1net_1graph(JNIEnv * _env, jclass _b, jlong chain_access, jlong logger, jlong network_graph) {
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
	LDKNetGraphMsgHandler ret = NetGraphMsgHandler_from_net_graph(chain_access_conv, logger_conv, network_graph_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1read_1locked_1graph(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKLockedNetworkGraph ret = NetGraphMsgHandler_read_locked_graph(&this_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LockedNetworkGraph_1graph(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKLockedNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKNetworkGraph ret = LockedNetworkGraph_graph(&this_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1as_1RoutingMessageHandler(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKNetGraphMsgHandler this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	LDKRoutingMessageHandler* ret = MALLOC(sizeof(LDKRoutingMessageHandler), "LDKRoutingMessageHandler");
	*ret = NetGraphMsgHandler_as_RoutingMessageHandler(&this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectionalChannelInfo_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1last_1update(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = DirectionalChannelInfo_get_last_update(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1last_1update(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectionalChannelInfo_set_last_update(&this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1enabled(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jboolean ret_val = DirectionalChannelInfo_get_enabled(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1enabled(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectionalChannelInfo_set_enabled(&this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jshort ret_val = DirectionalChannelInfo_get_cltv_expiry_delta(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectionalChannelInfo_set_cltv_expiry_delta(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jlong ret_val = DirectionalChannelInfo_get_htlc_minimum_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	DirectionalChannelInfo_set_htlc_minimum_msat(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1last_1update_1message(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelUpdate ret = DirectionalChannelInfo_get_last_update_message(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1last_1update_1message(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKDirectionalChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelUpdate val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelUpdate_clone(&val_conv);
	DirectionalChannelInfo_set_last_update_message(&this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKDirectionalChannelInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = DirectionalChannelInfo_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKDirectionalChannelInfo ret = DirectionalChannelInfo_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	ChannelInfo_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelFeatures ret = ChannelInfo_get_features(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelInfo_set_features(&this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1node_1one(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, ChannelInfo_get_node_one(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1node_1one(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	ChannelInfo_set_node_one(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1one_1to_1two(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKDirectionalChannelInfo ret = ChannelInfo_get_one_to_two(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1one_1to_1two(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKDirectionalChannelInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelInfo_set_one_to_two(&this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1node_1two(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, 33);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, 33, ChannelInfo_get_node_two(&this_ptr_conv).compressed_form);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1node_1two(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKPublicKey val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 33);
	(*_env)->GetByteArrayRegion (_env, val, 0, 33, val_ref.compressed_form);
	ChannelInfo_set_node_two(&this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1two_1to_1one(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKDirectionalChannelInfo ret = ChannelInfo_get_two_to_one(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1two_1to_1one(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKDirectionalChannelInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	ChannelInfo_set_two_to_one(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1announcement_1message(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelAnnouncement ret = ChannelInfo_get_announcement_message(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1announcement_1message(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKChannelAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = ChannelAnnouncement_clone(&val_conv);
	ChannelInfo_set_announcement_message(&this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = ChannelInfo_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKChannelInfo ret = ChannelInfo_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RoutingFees_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingFees_1clone(JNIEnv * _env, jclass _b, jlong orig) {
	LDKRoutingFees orig_conv;
	orig_conv.inner = (void*)(orig & (~1));
	orig_conv.is_owned = (orig & 1) || (orig == 0);
	LDKRoutingFees ret = RoutingFees_clone(&orig_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_RoutingFees_1get_1base_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = RoutingFees_get_base_msat(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1set_1base_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RoutingFees_set_base_msat(&this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_RoutingFees_1get_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = RoutingFees_get_proportional_millionths(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1set_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKRoutingFees this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	RoutingFees_set_proportional_millionths(&this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingFees_1new(JNIEnv * _env, jclass _b, jint base_msat_arg, jint proportional_millionths_arg) {
	LDKRoutingFees ret = RoutingFees_new(base_msat_arg, proportional_millionths_arg);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingFees_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKRoutingFees ret = RoutingFees_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RoutingFees_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRoutingFees obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = RoutingFees_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeAnnouncementInfo_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeFeatures ret = NodeAnnouncementInfo_get_features(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeFeatures val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	NodeAnnouncementInfo_set_features(&this_ptr_conv, val_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1last_1update(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jint ret_val = NodeAnnouncementInfo_get_last_update(&this_ptr_conv);
	return ret_val;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1last_1update(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeAnnouncementInfo_set_last_update(&this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1rgb(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 3);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 3, *NodeAnnouncementInfo_get_rgb(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1rgb(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThreeBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 3);
	(*_env)->GetByteArrayRegion (_env, val, 0, 3, val_ref.data);
	NodeAnnouncementInfo_set_rgb(&this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1alias(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *NodeAnnouncementInfo_get_alias(&this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1alias(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKThirtyTwoBytes val_ref;
	CHECK((*_env)->GetArrayLength (_env, val) == 32);
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	NodeAnnouncementInfo_set_alias(&this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1addresses(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_NetAddressZ val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t m = 0; m < val_constr.datalen; m++) {
		long arr_conv_12 = val_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		val_constr.data[m] = arr_conv_12_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	NodeAnnouncementInfo_set_addresses(&this_ptr_conv, val_constr);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1announcement_1message(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeAnnouncement ret = NodeAnnouncementInfo_get_announcement_message(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1announcement_1message(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeAnnouncement val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = NodeAnnouncement_clone(&val_conv);
	NodeAnnouncementInfo_set_announcement_message(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1new(JNIEnv * _env, jclass _b, jlong features_arg, jint last_update_arg, jbyteArray rgb_arg, jbyteArray alias_arg, jlongArray addresses_arg, jlong announcement_message_arg) {
	LDKNodeFeatures features_arg_conv;
	features_arg_conv.inner = (void*)(features_arg & (~1));
	features_arg_conv.is_owned = (features_arg & 1) || (features_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKThreeBytes rgb_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, rgb_arg) == 3);
	(*_env)->GetByteArrayRegion (_env, rgb_arg, 0, 3, rgb_arg_ref.data);
	LDKThirtyTwoBytes alias_arg_ref;
	CHECK((*_env)->GetArrayLength (_env, alias_arg) == 32);
	(*_env)->GetByteArrayRegion (_env, alias_arg, 0, 32, alias_arg_ref.data);
	LDKCVec_NetAddressZ addresses_arg_constr;
	addresses_arg_constr.datalen = (*_env)->GetArrayLength (_env, addresses_arg);
	if (addresses_arg_constr.datalen > 0)
		addresses_arg_constr.data = MALLOC(addresses_arg_constr.datalen * sizeof(LDKNetAddress), "LDKCVec_NetAddressZ Elements");
	else
		addresses_arg_constr.data = NULL;
	long* addresses_arg_vals = (*_env)->GetLongArrayElements (_env, addresses_arg, NULL);
	for (size_t m = 0; m < addresses_arg_constr.datalen; m++) {
		long arr_conv_12 = addresses_arg_vals[m];
		LDKNetAddress arr_conv_12_conv = *(LDKNetAddress*)arr_conv_12;
		FREE((void*)arr_conv_12);
		addresses_arg_constr.data[m] = arr_conv_12_conv;
	}
	(*_env)->ReleaseLongArrayElements (_env, addresses_arg, addresses_arg_vals, 0);
	LDKNodeAnnouncement announcement_message_arg_conv;
	announcement_message_arg_conv.inner = (void*)(announcement_message_arg & (~1));
	announcement_message_arg_conv.is_owned = (announcement_message_arg & 1) || (announcement_message_arg == 0);
	if (announcement_message_arg_conv.inner != NULL)
		announcement_message_arg_conv = NodeAnnouncement_clone(&announcement_message_arg_conv);
	LDKNodeAnnouncementInfo ret = NodeAnnouncementInfo_new(features_arg_conv, last_update_arg, rgb_arg_ref, alias_arg_ref, addresses_arg_constr, announcement_message_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeAnnouncementInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = NodeAnnouncementInfo_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKNodeAnnouncementInfo ret = NodeAnnouncementInfo_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	NodeInfo_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1channels(JNIEnv * _env, jclass _b, jlong this_ptr, jlongArray val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKCVec_u64Z val_constr;
	val_constr.datalen = (*_env)->GetArrayLength (_env, val);
	if (val_constr.datalen > 0)
		val_constr.data = MALLOC(val_constr.datalen * sizeof(jlong), "LDKCVec_u64Z Elements");
	else
		val_constr.data = NULL;
	long* val_vals = (*_env)->GetLongArrayElements (_env, val, NULL);
	for (size_t g = 0; g < val_constr.datalen; g++) {
		long arr_conv_6 = val_vals[g];
		val_constr.data[g] = arr_conv_6;
	}
	(*_env)->ReleaseLongArrayElements (_env, val, val_vals, 0);
	NodeInfo_set_channels(&this_ptr_conv, val_constr);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1get_1lowest_1inbound_1channel_1fees(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKRoutingFees ret = NodeInfo_get_lowest_inbound_channel_fees(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1lowest_1inbound_1channel_1fees(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKRoutingFees val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	if (val_conv.inner != NULL)
		val_conv = RoutingFees_clone(&val_conv);
	NodeInfo_set_lowest_inbound_channel_fees(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1get_1announcement_1info(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeAnnouncementInfo ret = NodeInfo_get_announcement_info(&this_ptr_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1announcement_1info(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo this_ptr_conv;
	this_ptr_conv.inner = (void*)(this_ptr & (~1));
	this_ptr_conv.is_owned = (this_ptr & 1) || (this_ptr == 0);
	LDKNodeAnnouncementInfo val_conv;
	val_conv.inner = (void*)(val & (~1));
	val_conv.is_owned = (val & 1) || (val == 0);
	// Warning: we may need a move here but can't clone!
	NodeInfo_set_announcement_info(&this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1new(JNIEnv * _env, jclass _b, jlongArray channels_arg, jlong lowest_inbound_channel_fees_arg, jlong announcement_info_arg) {
	LDKCVec_u64Z channels_arg_constr;
	channels_arg_constr.datalen = (*_env)->GetArrayLength (_env, channels_arg);
	if (channels_arg_constr.datalen > 0)
		channels_arg_constr.data = MALLOC(channels_arg_constr.datalen * sizeof(jlong), "LDKCVec_u64Z Elements");
	else
		channels_arg_constr.data = NULL;
	long* channels_arg_vals = (*_env)->GetLongArrayElements (_env, channels_arg, NULL);
	for (size_t g = 0; g < channels_arg_constr.datalen; g++) {
		long arr_conv_6 = channels_arg_vals[g];
		channels_arg_constr.data[g] = arr_conv_6;
	}
	(*_env)->ReleaseLongArrayElements (_env, channels_arg, channels_arg_vals, 0);
	LDKRoutingFees lowest_inbound_channel_fees_arg_conv;
	lowest_inbound_channel_fees_arg_conv.inner = (void*)(lowest_inbound_channel_fees_arg & (~1));
	lowest_inbound_channel_fees_arg_conv.is_owned = (lowest_inbound_channel_fees_arg & 1) || (lowest_inbound_channel_fees_arg == 0);
	if (lowest_inbound_channel_fees_arg_conv.inner != NULL)
		lowest_inbound_channel_fees_arg_conv = RoutingFees_clone(&lowest_inbound_channel_fees_arg_conv);
	LDKNodeAnnouncementInfo announcement_info_arg_conv;
	announcement_info_arg_conv.inner = (void*)(announcement_info_arg & (~1));
	announcement_info_arg_conv.is_owned = (announcement_info_arg & 1) || (announcement_info_arg == 0);
	// Warning: we may need a move here but can't clone!
	LDKNodeInfo ret = NodeInfo_new(channels_arg_constr, lowest_inbound_channel_fees_arg_conv, announcement_info_arg_conv);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NodeInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeInfo obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = NodeInfo_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKNodeInfo ret = NodeInfo_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNetworkGraph obj_conv;
	obj_conv.inner = (void*)(obj & (~1));
	obj_conv.is_owned = (obj & 1) || (obj == 0);
	LDKCVec_u8Z arg_var = NetworkGraph_write(&obj_conv);
	jbyteArray arg_arr = (*_env)->NewByteArray(_env, arg_var.datalen);
	(*_env)->SetByteArrayRegion(_env, arg_arr, 0, arg_var.datalen, arg_var.data);
	CVec_u8Z_free(arg_var);
	return arg_arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1read(JNIEnv * _env, jclass _b, jbyteArray ser) {
	LDKu8slice ser_ref;
	ser_ref.data = (*_env)->GetByteArrayElements (_env, ser, NULL);
	ser_ref.datalen = (*_env)->GetArrayLength (_env, ser);
	LDKNetworkGraph ret = NetworkGraph_read(ser_ref);
	(*_env)->ReleaseByteArrayElements(_env, ser, (int8_t*)ser_ref.data, 0);
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1new(JNIEnv * _env, jclass _b) {
	LDKNetworkGraph ret = NetworkGraph_new();
	return ((long)ret.inner) | (ret.is_owned ? 1 : 0);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1close_1channel_1from_1update(JNIEnv * _env, jclass _b, jlong this_arg, jlong short_channel_id, jboolean is_permanent) {
	LDKNetworkGraph this_arg_conv;
	this_arg_conv.inner = (void*)(this_arg & (~1));
	this_arg_conv.is_owned = (this_arg & 1) || (this_arg == 0);
	NetworkGraph_close_channel_from_update(&this_arg_conv, short_channel_id, is_permanent);
}

