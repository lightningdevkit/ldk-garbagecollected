#include "org_ldk_impl_bindings.h"
#include <rust_types.h>
#include <lightning.h>
#include <string.h>
#include <stdatomic.h>
#include <assert.h>
#define DO_ASSERT(a) do { bool _assert_val = (a); assert(_assert_val); } while(0)

#include <threads.h>
static mtx_t allocation_mtx;

void __attribute__((constructor)) init_mtx() {
	DO_ASSERT(mtx_init(&allocation_mtx, mtx_plain) == thrd_success);
}

typedef struct allocation {
	struct allocation* next;
	void* ptr;
	const char* struct_name;
} allocation;
static allocation* allocation_ll = NULL;

static void* MALLOC(size_t len, const char* struct_name) {
	void* res = malloc(len);
	allocation* new_alloc = malloc(sizeof(allocation));
	new_alloc->ptr = res;
	new_alloc->struct_name = struct_name;
	DO_ASSERT(mtx_lock(&allocation_mtx) == thrd_success);
	new_alloc->next = allocation_ll;
	allocation_ll = new_alloc;
	DO_ASSERT(mtx_unlock(&allocation_mtx) == thrd_success);
	return res;
}

static void FREE(void* ptr) {
	allocation* p = NULL;
	DO_ASSERT(mtx_lock(&allocation_mtx) == thrd_success);
	allocation* it = allocation_ll;
	while (it->ptr != ptr) { p = it; it = it->next; }
	if (p) { p->next = it->next; } else { allocation_ll = it->next; }
	DO_ASSERT(mtx_unlock(&allocation_mtx) == thrd_success);
	DO_ASSERT(it->ptr == ptr);
	free(it);
	free(ptr);
}

void __attribute__((destructor)) check_leaks() {
	for (allocation* a = allocation_ll; a != NULL; a = a->next) { fprintf(stderr, "%s %p remains\n", a->struct_name, a->ptr); }
	DO_ASSERT(allocation_ll == NULL);
}

static jmethodID ordinal_meth = NULL;
static jmethodID slicedef_meth = NULL;
static jclass slicedef_cls = NULL;
JNIEXPORT void Java_org_ldk_impl_bindings_init(JNIEnv * env, jclass _b, jclass enum_class, jclass slicedef_class) {
	ordinal_meth = (*env)->GetMethodID(env, enum_class, "ordinal", "()I");
	DO_ASSERT(ordinal_meth != NULL);
	slicedef_meth = (*env)->GetMethodID(env, slicedef_class, "<init>", "(JJJ)V");
	DO_ASSERT(slicedef_meth != NULL);
	slicedef_cls = (*env)->NewGlobalRef(env, slicedef_class);
	DO_ASSERT(slicedef_cls != NULL);
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
	vec->data = (uint8_t*)malloc(vec->datalen); // May be freed by rust, so don't track allocation
	(*_env)->GetByteArrayRegion (_env, bytes, 0, vec->datalen, vec->data);
	return (long)vec;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_new_1txpointer_1copy_1data (JNIEnv * env, jclass _b, jbyteArray bytes) {
	LDKTransaction *txdata = (LDKTransaction*)MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	txdata->datalen = (*env)->GetArrayLength(env, bytes);
	txdata->data = (uint8_t*)malloc(txdata->datalen); // May be freed by rust, so don't track allocation
	txdata->data_is_owned = true;
	(*env)->GetByteArrayRegion (env, bytes, 0, txdata->datalen, txdata->data);
	return (long)txdata;
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

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKSecretKey_1new(JNIEnv * _env, jclass _b) {
	LDKSecretKey* key = (LDKSecretKey*)MALLOC(sizeof(LDKSecretKey), "LDKSecretKey");
	return (long)key;
}
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
	DO_ASSERT(LDKAccessError_class != NULL);
	LDKAccessError_LDKAccessError_UnknownChain = (*env)->GetStaticFieldID(env, LDKAccessError_class, "LDKAccessError_UnknownChain", "Lorg/ldk/enums/LDKAccessError;");
	DO_ASSERT(LDKAccessError_LDKAccessError_UnknownChain != NULL);
	LDKAccessError_LDKAccessError_UnknownTx = (*env)->GetStaticFieldID(env, LDKAccessError_class, "LDKAccessError_UnknownTx", "Lorg/ldk/enums/LDKAccessError;");
	DO_ASSERT(LDKAccessError_LDKAccessError_UnknownTx != NULL);
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
	DO_ASSERT(LDKChannelMonitorUpdateErr_class != NULL);
	LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_TemporaryFailure = (*env)->GetStaticFieldID(env, LDKChannelMonitorUpdateErr_class, "LDKChannelMonitorUpdateErr_TemporaryFailure", "Lorg/ldk/enums/LDKChannelMonitorUpdateErr;");
	DO_ASSERT(LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_TemporaryFailure != NULL);
	LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_PermanentFailure = (*env)->GetStaticFieldID(env, LDKChannelMonitorUpdateErr_class, "LDKChannelMonitorUpdateErr_PermanentFailure", "Lorg/ldk/enums/LDKChannelMonitorUpdateErr;");
	DO_ASSERT(LDKChannelMonitorUpdateErr_LDKChannelMonitorUpdateErr_PermanentFailure != NULL);
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
	DO_ASSERT(LDKConfirmationTarget_class != NULL);
	LDKConfirmationTarget_LDKConfirmationTarget_Background = (*env)->GetStaticFieldID(env, LDKConfirmationTarget_class, "LDKConfirmationTarget_Background", "Lorg/ldk/enums/LDKConfirmationTarget;");
	DO_ASSERT(LDKConfirmationTarget_LDKConfirmationTarget_Background != NULL);
	LDKConfirmationTarget_LDKConfirmationTarget_Normal = (*env)->GetStaticFieldID(env, LDKConfirmationTarget_class, "LDKConfirmationTarget_Normal", "Lorg/ldk/enums/LDKConfirmationTarget;");
	DO_ASSERT(LDKConfirmationTarget_LDKConfirmationTarget_Normal != NULL);
	LDKConfirmationTarget_LDKConfirmationTarget_HighPriority = (*env)->GetStaticFieldID(env, LDKConfirmationTarget_class, "LDKConfirmationTarget_HighPriority", "Lorg/ldk/enums/LDKConfirmationTarget;");
	DO_ASSERT(LDKConfirmationTarget_LDKConfirmationTarget_HighPriority != NULL);
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
	DO_ASSERT(LDKLevel_class != NULL);
	LDKLevel_LDKLevel_Off = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Off", "Lorg/ldk/enums/LDKLevel;");
	DO_ASSERT(LDKLevel_LDKLevel_Off != NULL);
	LDKLevel_LDKLevel_Error = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Error", "Lorg/ldk/enums/LDKLevel;");
	DO_ASSERT(LDKLevel_LDKLevel_Error != NULL);
	LDKLevel_LDKLevel_Warn = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Warn", "Lorg/ldk/enums/LDKLevel;");
	DO_ASSERT(LDKLevel_LDKLevel_Warn != NULL);
	LDKLevel_LDKLevel_Info = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Info", "Lorg/ldk/enums/LDKLevel;");
	DO_ASSERT(LDKLevel_LDKLevel_Info != NULL);
	LDKLevel_LDKLevel_Debug = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Debug", "Lorg/ldk/enums/LDKLevel;");
	DO_ASSERT(LDKLevel_LDKLevel_Debug != NULL);
	LDKLevel_LDKLevel_Trace = (*env)->GetStaticFieldID(env, LDKLevel_class, "LDKLevel_Trace", "Lorg/ldk/enums/LDKLevel;");
	DO_ASSERT(LDKLevel_LDKLevel_Trace != NULL);
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
	DO_ASSERT(LDKNetwork_class != NULL);
	LDKNetwork_LDKNetwork_Bitcoin = (*env)->GetStaticFieldID(env, LDKNetwork_class, "LDKNetwork_Bitcoin", "Lorg/ldk/enums/LDKNetwork;");
	DO_ASSERT(LDKNetwork_LDKNetwork_Bitcoin != NULL);
	LDKNetwork_LDKNetwork_Testnet = (*env)->GetStaticFieldID(env, LDKNetwork_class, "LDKNetwork_Testnet", "Lorg/ldk/enums/LDKNetwork;");
	DO_ASSERT(LDKNetwork_LDKNetwork_Testnet != NULL);
	LDKNetwork_LDKNetwork_Regtest = (*env)->GetStaticFieldID(env, LDKNetwork_class, "LDKNetwork_Regtest", "Lorg/ldk/enums/LDKNetwork;");
	DO_ASSERT(LDKNetwork_LDKNetwork_Regtest != NULL);
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
	DO_ASSERT(LDKSecp256k1Error_class != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_IncorrectSignature = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_IncorrectSignature", "Lorg/ldk/enums/LDKSecp256k1Error;");
	DO_ASSERT(LDKSecp256k1Error_LDKSecp256k1Error_IncorrectSignature != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidMessage = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidMessage", "Lorg/ldk/enums/LDKSecp256k1Error;");
	DO_ASSERT(LDKSecp256k1Error_LDKSecp256k1Error_InvalidMessage != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidPublicKey = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidPublicKey", "Lorg/ldk/enums/LDKSecp256k1Error;");
	DO_ASSERT(LDKSecp256k1Error_LDKSecp256k1Error_InvalidPublicKey != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidSignature = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidSignature", "Lorg/ldk/enums/LDKSecp256k1Error;");
	DO_ASSERT(LDKSecp256k1Error_LDKSecp256k1Error_InvalidSignature != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidSecretKey = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidSecretKey", "Lorg/ldk/enums/LDKSecp256k1Error;");
	DO_ASSERT(LDKSecp256k1Error_LDKSecp256k1Error_InvalidSecretKey != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidRecoveryId = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidRecoveryId", "Lorg/ldk/enums/LDKSecp256k1Error;");
	DO_ASSERT(LDKSecp256k1Error_LDKSecp256k1Error_InvalidRecoveryId != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_InvalidTweak = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_InvalidTweak", "Lorg/ldk/enums/LDKSecp256k1Error;");
	DO_ASSERT(LDKSecp256k1Error_LDKSecp256k1Error_InvalidTweak != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_NotEnoughMemory = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_NotEnoughMemory", "Lorg/ldk/enums/LDKSecp256k1Error;");
	DO_ASSERT(LDKSecp256k1Error_LDKSecp256k1Error_NotEnoughMemory != NULL);
	LDKSecp256k1Error_LDKSecp256k1Error_CallbackPanicked = (*env)->GetStaticFieldID(env, LDKSecp256k1Error_class, "LDKSecp256k1Error_CallbackPanicked", "Lorg/ldk/enums/LDKSecp256k1Error;");
	DO_ASSERT(LDKSecp256k1Error_LDKSecp256k1Error_CallbackPanicked != NULL);
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
		ret->data = malloc(sizeof(uint8_t) * ret->datalen); // often freed by rust directly
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
	FREE((void*)b);
	ret->b = b_conv;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneChannelMonitorUpdateErrZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NoneChannelMonitorUpdateErrZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneChannelMonitorUpdateErrZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_NoneChannelMonitorUpdateErrZ*)arg)->result_ok) {
		return (long)((LDKCResult_NoneChannelMonitorUpdateErrZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_NoneChannelMonitorUpdateErrZ*)arg)->contents.err;
	}
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKMonitorUpdateError_1optional_1none (JNIEnv * env, jclass _a) {
	LDKMonitorUpdateError *ret = MALLOC(sizeof(LDKMonitorUpdateError), "LDKMonitorUpdateError");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneMonitorUpdateErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NoneMonitorUpdateErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneMonitorUpdateErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_NoneMonitorUpdateErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_NoneMonitorUpdateErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_NoneMonitorUpdateErrorZ*)arg)->contents.err;
	}
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKOutPoint_1optional_1none (JNIEnv * env, jclass _a) {
	LDKOutPoint *ret = MALLOC(sizeof(LDKOutPoint), "LDKOutPoint");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1OutPoint_1_1CVec_1u8Z_1new(JNIEnv *_env, jclass _b, jlong a, jlong b) {
	LDKC2TupleTempl_OutPoint__CVec_u8Z* ret = MALLOC(sizeof(LDKC2TupleTempl_OutPoint__CVec_u8Z), "LDKC2TupleTempl_OutPoint__CVec_u8Z");
	LDKOutPoint a_conv = *(LDKOutPoint*)a;
	FREE((void*)a);
	a_conv.is_owned = true;
	ret->a = a_conv;
	LDKCVec_u8Z b_conv = *(LDKCVec_u8Z*)b;
	FREE((void*)b);
	ret->b = b_conv;
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
		ret->data = malloc(sizeof(LDKTxOut) * ret->datalen); // often freed by rust directly
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
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1ThirtyTwoBytes_1_1CVecTempl_1TxOut_1new(JNIEnv *_env, jclass _b, jbyteArray a, jlong b) {
	LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut* ret = MALLOC(sizeof(LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut), "LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut");
	LDKThirtyTwoBytes a_ref;
	(*_env)->GetByteArrayRegion (_env, a, 0, 32, a_ref.data);
	ret->a = a_ref;
	LDKCVecTempl_TxOut b_conv = *(LDKCVecTempl_TxOut*)b;
	FREE((void*)b);
	ret->b = b_conv;
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
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1Signature_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_Signature *ret = MALLOC(sizeof(LDKCVecTempl_Signature), "LDKCVecTempl_Signature");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKSignature) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKSignature arr_elem_conv = *(LDKSignature*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1Signature_1_1CVecTempl_1Signature_1new(JNIEnv *_env, jclass _b, jlong a, jlong b) {
	LDKC2TupleTempl_Signature__CVecTempl_Signature* ret = MALLOC(sizeof(LDKC2TupleTempl_Signature__CVecTempl_Signature), "LDKC2TupleTempl_Signature__CVecTempl_Signature");
	LDKSignature a_conv = *(LDKSignature*)a;
	FREE((void*)a);
	ret->a = a_conv;
	LDKCVecTempl_Signature b_conv = *(LDKCVecTempl_Signature*)b;
	FREE((void*)b);
	ret->b = b_conv;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg)->result_ok) {
		return (long)((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg)->contents.err;
	}
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SignatureNoneZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_SignatureNoneZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SignatureNoneZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_SignatureNoneZ*)arg)->result_ok) {
		return (long)((LDKCResult_SignatureNoneZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_SignatureNoneZ*)arg)->contents.err;
	}
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1SignatureZNoneZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_CVec_SignatureZNoneZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1SignatureZNoneZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_CVec_SignatureZNoneZ*)arg)->result_ok) {
		return (long)((LDKCResult_CVec_SignatureZNoneZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_CVec_SignatureZNoneZ*)arg)->contents.err;
	}
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
	DO_ASSERT(LDKAPIError_APIMisuseError_class != NULL);
	LDKAPIError_APIMisuseError_meth = (*env)->GetMethodID(env, LDKAPIError_APIMisuseError_class, "<init>", "(J)V");
	DO_ASSERT(LDKAPIError_APIMisuseError_meth != NULL);
	LDKAPIError_FeeRateTooHigh_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKAPIError$FeeRateTooHigh;"));
	DO_ASSERT(LDKAPIError_FeeRateTooHigh_class != NULL);
	LDKAPIError_FeeRateTooHigh_meth = (*env)->GetMethodID(env, LDKAPIError_FeeRateTooHigh_class, "<init>", "(JI)V");
	DO_ASSERT(LDKAPIError_FeeRateTooHigh_meth != NULL);
	LDKAPIError_RouteError_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKAPIError$RouteError;"));
	DO_ASSERT(LDKAPIError_RouteError_class != NULL);
	LDKAPIError_RouteError_meth = (*env)->GetMethodID(env, LDKAPIError_RouteError_class, "<init>", "(J)V");
	DO_ASSERT(LDKAPIError_RouteError_meth != NULL);
	LDKAPIError_ChannelUnavailable_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKAPIError$ChannelUnavailable;"));
	DO_ASSERT(LDKAPIError_ChannelUnavailable_class != NULL);
	LDKAPIError_ChannelUnavailable_meth = (*env)->GetMethodID(env, LDKAPIError_ChannelUnavailable_class, "<init>", "(J)V");
	DO_ASSERT(LDKAPIError_ChannelUnavailable_meth != NULL);
	LDKAPIError_MonitorUpdateFailed_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKAPIError$MonitorUpdateFailed;"));
	DO_ASSERT(LDKAPIError_MonitorUpdateFailed_class != NULL);
	LDKAPIError_MonitorUpdateFailed_meth = (*env)->GetMethodID(env, LDKAPIError_MonitorUpdateFailed_class, "<init>", "()V");
	DO_ASSERT(LDKAPIError_MonitorUpdateFailed_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKAPIError_1ref_1from_1ptr (JNIEnv * env, jclass _c, jlong ptr) {
	LDKAPIError *obj = (LDKAPIError*)ptr;
	switch(obj->tag) {
		case LDKAPIError_APIMisuseError: {
			long err_ref = (long)&obj->api_misuse_error.err;
			return (*env)->NewObject(env, LDKAPIError_APIMisuseError_class, LDKAPIError_APIMisuseError_meth, err_ref);
		}
		case LDKAPIError_FeeRateTooHigh: {
			long err_ref = (long)&obj->fee_rate_too_high.err;
			return (*env)->NewObject(env, LDKAPIError_FeeRateTooHigh_class, LDKAPIError_FeeRateTooHigh_meth, err_ref, obj->fee_rate_too_high.feerate);
		}
		case LDKAPIError_RouteError: {
			long err_ref = (long)&obj->route_error.err;
			return (*env)->NewObject(env, LDKAPIError_RouteError_class, LDKAPIError_RouteError_meth, err_ref);
		}
		case LDKAPIError_ChannelUnavailable: {
			long err_ref = (long)&obj->channel_unavailable.err;
			return (*env)->NewObject(env, LDKAPIError_ChannelUnavailable_class, LDKAPIError_ChannelUnavailable_meth, err_ref);
		}
		case LDKAPIError_MonitorUpdateFailed: {
			return (*env)->NewObject(env, LDKAPIError_MonitorUpdateFailed_class, LDKAPIError_MonitorUpdateFailed_meth);
		}
		default: abort();
	}
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneAPIErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NoneAPIErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NoneAPIErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_NoneAPIErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_NoneAPIErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_NoneAPIErrorZ*)arg)->contents.err;
	}
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKPaymentSendFailure_1optional_1none (JNIEnv * env, jclass _a) {
	LDKPaymentSendFailure *ret = MALLOC(sizeof(LDKPaymentSendFailure), "LDKPaymentSendFailure");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePaymentSendFailureZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NonePaymentSendFailureZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePaymentSendFailureZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_NonePaymentSendFailureZ*)arg)->result_ok) {
		return (long)((LDKCResult_NonePaymentSendFailureZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_NonePaymentSendFailureZ*)arg)->contents.err;
	}
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelAnnouncement_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelAnnouncement *ret = MALLOC(sizeof(LDKChannelAnnouncement), "LDKChannelAnnouncement");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelUpdate_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelUpdate *ret = MALLOC(sizeof(LDKChannelUpdate), "LDKChannelUpdate");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC3TupleTempl_1ChannelAnnouncement_1_1ChannelUpdate_1_1ChannelUpdate_1new(JNIEnv *_env, jclass _b, jlong a, jlong b, jlong c) {
	LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate* ret = MALLOC(sizeof(LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate), "LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate");
	LDKChannelAnnouncement a_conv = *(LDKChannelAnnouncement*)a;
	FREE((void*)a);
	a_conv.is_owned = true;
	ret->a = a_conv;
	LDKChannelUpdate b_conv = *(LDKChannelUpdate*)b;
	FREE((void*)b);
	b_conv.is_owned = true;
	ret->b = b_conv;
	LDKChannelUpdate c_conv = *(LDKChannelUpdate*)c;
	FREE((void*)c);
	c_conv.is_owned = true;
	ret->c = c_conv;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKPeerHandleError_1optional_1none (JNIEnv * env, jclass _a) {
	LDKPeerHandleError *ret = MALLOC(sizeof(LDKPeerHandleError), "LDKPeerHandleError");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePeerHandleErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_NonePeerHandleErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1NonePeerHandleErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_NonePeerHandleErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_NonePeerHandleErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_NonePeerHandleErrorZ*)arg)->contents.err;
	}
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKHTLCOutputInCommitment_1optional_1none (JNIEnv * env, jclass _a) {
	LDKHTLCOutputInCommitment *ret = MALLOC(sizeof(LDKHTLCOutputInCommitment), "LDKHTLCOutputInCommitment");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKC2TupleTempl_1HTLCOutputInCommitment_1_1Signature_1new(JNIEnv *_env, jclass _b, jlong a, jlong b) {
	LDKC2TupleTempl_HTLCOutputInCommitment__Signature* ret = MALLOC(sizeof(LDKC2TupleTempl_HTLCOutputInCommitment__Signature), "LDKC2TupleTempl_HTLCOutputInCommitment__Signature");
	LDKHTLCOutputInCommitment a_conv = *(LDKHTLCOutputInCommitment*)a;
	FREE((void*)a);
	a_conv.is_owned = true;
	ret->a = a_conv;
	LDKSignature b_conv = *(LDKSignature*)b;
	FREE((void*)b);
	ret->b = b_conv;
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
	DO_ASSERT(LDKSpendableOutputDescriptor_StaticOutput_class != NULL);
	LDKSpendableOutputDescriptor_StaticOutput_meth = (*env)->GetMethodID(env, LDKSpendableOutputDescriptor_StaticOutput_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKSpendableOutputDescriptor_StaticOutput_meth != NULL);
	LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKSpendableOutputDescriptor$DynamicOutputP2WSH;"));
	DO_ASSERT(LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class != NULL);
	LDKSpendableOutputDescriptor_DynamicOutputP2WSH_meth = (*env)->GetMethodID(env, LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class, "<init>", "(JJSJJJ)V");
	DO_ASSERT(LDKSpendableOutputDescriptor_DynamicOutputP2WSH_meth != NULL);
	LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKSpendableOutputDescriptor$StaticOutputCounterpartyPayment;"));
	DO_ASSERT(LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class != NULL);
	LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_meth = (*env)->GetMethodID(env, LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class, "<init>", "(JJJ)V");
	DO_ASSERT(LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKSpendableOutputDescriptor_1ref_1from_1ptr (JNIEnv * env, jclass _c, jlong ptr) {
	LDKSpendableOutputDescriptor *obj = (LDKSpendableOutputDescriptor*)ptr;
	switch(obj->tag) {
		case LDKSpendableOutputDescriptor_StaticOutput: {
			long outpoint_ref = (long)&obj->static_output.outpoint;
			long output_ref = (long)&obj->static_output.output;
			return (*env)->NewObject(env, LDKSpendableOutputDescriptor_StaticOutput_class, LDKSpendableOutputDescriptor_StaticOutput_meth, outpoint_ref, output_ref);
		}
		case LDKSpendableOutputDescriptor_DynamicOutputP2WSH: {
			long outpoint_ref = (long)&obj->dynamic_output_p2wsh.outpoint;
			long per_commitment_point_ref = (long)&obj->dynamic_output_p2wsh.per_commitment_point;
			long output_ref = (long)&obj->dynamic_output_p2wsh.output;
			long key_derivation_params_ref = (long)&obj->dynamic_output_p2wsh.key_derivation_params;
			long revocation_pubkey_ref = (long)&obj->dynamic_output_p2wsh.revocation_pubkey;
			return (*env)->NewObject(env, LDKSpendableOutputDescriptor_DynamicOutputP2WSH_class, LDKSpendableOutputDescriptor_DynamicOutputP2WSH_meth, outpoint_ref, per_commitment_point_ref, obj->dynamic_output_p2wsh.to_self_delay, output_ref, key_derivation_params_ref, revocation_pubkey_ref);
		}
		case LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment: {
			long outpoint_ref = (long)&obj->static_output_counterparty_payment.outpoint;
			long output_ref = (long)&obj->static_output_counterparty_payment.output;
			long key_derivation_params_ref = (long)&obj->static_output_counterparty_payment.key_derivation_params;
			return (*env)->NewObject(env, LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_class, LDKSpendableOutputDescriptor_StaticOutputCounterpartyPayment_meth, outpoint_ref, output_ref, key_derivation_params_ref);
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
		ret->data = malloc(sizeof(LDKSpendableOutputDescriptor) * ret->datalen); // often freed by rust directly
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
	DO_ASSERT(LDKEvent_FundingGenerationReady_class != NULL);
	LDKEvent_FundingGenerationReady_meth = (*env)->GetMethodID(env, LDKEvent_FundingGenerationReady_class, "<init>", "([BJJJ)V");
	DO_ASSERT(LDKEvent_FundingGenerationReady_meth != NULL);
	LDKEvent_FundingBroadcastSafe_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$FundingBroadcastSafe;"));
	DO_ASSERT(LDKEvent_FundingBroadcastSafe_class != NULL);
	LDKEvent_FundingBroadcastSafe_meth = (*env)->GetMethodID(env, LDKEvent_FundingBroadcastSafe_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKEvent_FundingBroadcastSafe_meth != NULL);
	LDKEvent_PaymentReceived_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$PaymentReceived;"));
	DO_ASSERT(LDKEvent_PaymentReceived_class != NULL);
	LDKEvent_PaymentReceived_meth = (*env)->GetMethodID(env, LDKEvent_PaymentReceived_class, "<init>", "([B[BJ)V");
	DO_ASSERT(LDKEvent_PaymentReceived_meth != NULL);
	LDKEvent_PaymentSent_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$PaymentSent;"));
	DO_ASSERT(LDKEvent_PaymentSent_class != NULL);
	LDKEvent_PaymentSent_meth = (*env)->GetMethodID(env, LDKEvent_PaymentSent_class, "<init>", "([B)V");
	DO_ASSERT(LDKEvent_PaymentSent_meth != NULL);
	LDKEvent_PaymentFailed_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$PaymentFailed;"));
	DO_ASSERT(LDKEvent_PaymentFailed_class != NULL);
	LDKEvent_PaymentFailed_meth = (*env)->GetMethodID(env, LDKEvent_PaymentFailed_class, "<init>", "([BZ)V");
	DO_ASSERT(LDKEvent_PaymentFailed_meth != NULL);
	LDKEvent_PendingHTLCsForwardable_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$PendingHTLCsForwardable;"));
	DO_ASSERT(LDKEvent_PendingHTLCsForwardable_class != NULL);
	LDKEvent_PendingHTLCsForwardable_meth = (*env)->GetMethodID(env, LDKEvent_PendingHTLCsForwardable_class, "<init>", "(J)V");
	DO_ASSERT(LDKEvent_PendingHTLCsForwardable_meth != NULL);
	LDKEvent_SpendableOutputs_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKEvent$SpendableOutputs;"));
	DO_ASSERT(LDKEvent_SpendableOutputs_class != NULL);
	LDKEvent_SpendableOutputs_meth = (*env)->GetMethodID(env, LDKEvent_SpendableOutputs_class, "<init>", "(J)V");
	DO_ASSERT(LDKEvent_SpendableOutputs_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKEvent_1ref_1from_1ptr (JNIEnv * env, jclass _c, jlong ptr) {
	LDKEvent *obj = (LDKEvent*)ptr;
	switch(obj->tag) {
		case LDKEvent_FundingGenerationReady: {
			jbyteArray temporary_channel_id_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, temporary_channel_id_arr, 0, 32, obj->funding_generation_ready.temporary_channel_id.data);
			long output_script_ref = (long)&obj->funding_generation_ready.output_script;
			return (*env)->NewObject(env, LDKEvent_FundingGenerationReady_class, LDKEvent_FundingGenerationReady_meth, temporary_channel_id_arr, obj->funding_generation_ready.channel_value_satoshis, output_script_ref, obj->funding_generation_ready.user_channel_id);
		}
		case LDKEvent_FundingBroadcastSafe: {
			long funding_txo_ref = (long)&obj->funding_broadcast_safe.funding_txo;
			return (*env)->NewObject(env, LDKEvent_FundingBroadcastSafe_class, LDKEvent_FundingBroadcastSafe_meth, funding_txo_ref, obj->funding_broadcast_safe.user_channel_id);
		}
		case LDKEvent_PaymentReceived: {
			jbyteArray payment_hash_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, payment_hash_arr, 0, 32, obj->payment_received.payment_hash.data);
			jbyteArray payment_secret_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, payment_secret_arr, 0, 32, obj->payment_received.payment_secret.data);
			return (*env)->NewObject(env, LDKEvent_PaymentReceived_class, LDKEvent_PaymentReceived_meth, payment_hash_arr, payment_secret_arr, obj->payment_received.amt);
		}
		case LDKEvent_PaymentSent: {
			jbyteArray payment_preimage_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, payment_preimage_arr, 0, 32, obj->payment_sent.payment_preimage.data);
			return (*env)->NewObject(env, LDKEvent_PaymentSent_class, LDKEvent_PaymentSent_meth, payment_preimage_arr);
		}
		case LDKEvent_PaymentFailed: {
			jbyteArray payment_hash_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, payment_hash_arr, 0, 32, obj->payment_failed.payment_hash.data);
			return (*env)->NewObject(env, LDKEvent_PaymentFailed_class, LDKEvent_PaymentFailed_meth, payment_hash_arr, obj->payment_failed.rejected_by_dest);
		}
		case LDKEvent_PendingHTLCsForwardable: {
			return (*env)->NewObject(env, LDKEvent_PendingHTLCsForwardable_class, LDKEvent_PendingHTLCsForwardable_meth, obj->pending_htl_cs_forwardable.time_forwardable);
		}
		case LDKEvent_SpendableOutputs: {
			long outputs_ref = (long)&obj->spendable_outputs.outputs;
			return (*env)->NewObject(env, LDKEvent_SpendableOutputs_class, LDKEvent_SpendableOutputs_meth, outputs_ref);
		}
		default: abort();
	}
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKAcceptChannel_1optional_1none (JNIEnv * env, jclass _a) {
	LDKAcceptChannel *ret = MALLOC(sizeof(LDKAcceptChannel), "LDKAcceptChannel");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKOpenChannel_1optional_1none (JNIEnv * env, jclass _a) {
	LDKOpenChannel *ret = MALLOC(sizeof(LDKOpenChannel), "LDKOpenChannel");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKFundingCreated_1optional_1none (JNIEnv * env, jclass _a) {
	LDKFundingCreated *ret = MALLOC(sizeof(LDKFundingCreated), "LDKFundingCreated");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKFundingSigned_1optional_1none (JNIEnv * env, jclass _a) {
	LDKFundingSigned *ret = MALLOC(sizeof(LDKFundingSigned), "LDKFundingSigned");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKFundingLocked_1optional_1none (JNIEnv * env, jclass _a) {
	LDKFundingLocked *ret = MALLOC(sizeof(LDKFundingLocked), "LDKFundingLocked");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKAnnouncementSignatures_1optional_1none (JNIEnv * env, jclass _a) {
	LDKAnnouncementSignatures *ret = MALLOC(sizeof(LDKAnnouncementSignatures), "LDKAnnouncementSignatures");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCommitmentUpdate_1optional_1none (JNIEnv * env, jclass _a) {
	LDKCommitmentUpdate *ret = MALLOC(sizeof(LDKCommitmentUpdate), "LDKCommitmentUpdate");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRevokeAndACK_1optional_1none (JNIEnv * env, jclass _a) {
	LDKRevokeAndACK *ret = MALLOC(sizeof(LDKRevokeAndACK), "LDKRevokeAndACK");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKClosingSigned_1optional_1none (JNIEnv * env, jclass _a) {
	LDKClosingSigned *ret = MALLOC(sizeof(LDKClosingSigned), "LDKClosingSigned");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKShutdown_1optional_1none (JNIEnv * env, jclass _a) {
	LDKShutdown *ret = MALLOC(sizeof(LDKShutdown), "LDKShutdown");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelReestablish_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelReestablish *ret = MALLOC(sizeof(LDKChannelReestablish), "LDKChannelReestablish");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKNodeAnnouncement_1optional_1none (JNIEnv * env, jclass _a) {
	LDKNodeAnnouncement *ret = MALLOC(sizeof(LDKNodeAnnouncement), "LDKNodeAnnouncement");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKErrorMessage_1optional_1none (JNIEnv * env, jclass _a) {
	LDKErrorMessage *ret = MALLOC(sizeof(LDKErrorMessage), "LDKErrorMessage");
	ret->inner = NULL;
	return (long)ret;
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
	DO_ASSERT(LDKErrorAction_DisconnectPeer_class != NULL);
	LDKErrorAction_DisconnectPeer_meth = (*env)->GetMethodID(env, LDKErrorAction_DisconnectPeer_class, "<init>", "(J)V");
	DO_ASSERT(LDKErrorAction_DisconnectPeer_meth != NULL);
	LDKErrorAction_IgnoreError_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKErrorAction$IgnoreError;"));
	DO_ASSERT(LDKErrorAction_IgnoreError_class != NULL);
	LDKErrorAction_IgnoreError_meth = (*env)->GetMethodID(env, LDKErrorAction_IgnoreError_class, "<init>", "()V");
	DO_ASSERT(LDKErrorAction_IgnoreError_meth != NULL);
	LDKErrorAction_SendErrorMessage_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKErrorAction$SendErrorMessage;"));
	DO_ASSERT(LDKErrorAction_SendErrorMessage_class != NULL);
	LDKErrorAction_SendErrorMessage_meth = (*env)->GetMethodID(env, LDKErrorAction_SendErrorMessage_class, "<init>", "(J)V");
	DO_ASSERT(LDKErrorAction_SendErrorMessage_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKErrorAction_1ref_1from_1ptr (JNIEnv * env, jclass _c, jlong ptr) {
	LDKErrorAction *obj = (LDKErrorAction*)ptr;
	switch(obj->tag) {
		case LDKErrorAction_DisconnectPeer: {
			long msg_ref = (long)&obj->disconnect_peer.msg;
			return (*env)->NewObject(env, LDKErrorAction_DisconnectPeer_class, LDKErrorAction_DisconnectPeer_meth, msg_ref);
		}
		case LDKErrorAction_IgnoreError: {
			return (*env)->NewObject(env, LDKErrorAction_IgnoreError_class, LDKErrorAction_IgnoreError_meth);
		}
		case LDKErrorAction_SendErrorMessage: {
			long msg_ref = (long)&obj->send_error_message.msg;
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
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_00024LDKHTLCFailChannelUpdate_init (JNIEnv * env, jclass _a) {
	LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKHTLCFailChannelUpdate$ChannelUpdateMessage;"));
	DO_ASSERT(LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class != NULL);
	LDKHTLCFailChannelUpdate_ChannelUpdateMessage_meth = (*env)->GetMethodID(env, LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class, "<init>", "(J)V");
	DO_ASSERT(LDKHTLCFailChannelUpdate_ChannelUpdateMessage_meth != NULL);
	LDKHTLCFailChannelUpdate_ChannelClosed_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKHTLCFailChannelUpdate$ChannelClosed;"));
	DO_ASSERT(LDKHTLCFailChannelUpdate_ChannelClosed_class != NULL);
	LDKHTLCFailChannelUpdate_ChannelClosed_meth = (*env)->GetMethodID(env, LDKHTLCFailChannelUpdate_ChannelClosed_class, "<init>", "(JZ)V");
	DO_ASSERT(LDKHTLCFailChannelUpdate_ChannelClosed_meth != NULL);
	LDKHTLCFailChannelUpdate_NodeFailure_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKHTLCFailChannelUpdate$NodeFailure;"));
	DO_ASSERT(LDKHTLCFailChannelUpdate_NodeFailure_class != NULL);
	LDKHTLCFailChannelUpdate_NodeFailure_meth = (*env)->GetMethodID(env, LDKHTLCFailChannelUpdate_NodeFailure_class, "<init>", "(JZ)V");
	DO_ASSERT(LDKHTLCFailChannelUpdate_NodeFailure_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKHTLCFailChannelUpdate_1ref_1from_1ptr (JNIEnv * env, jclass _c, jlong ptr) {
	LDKHTLCFailChannelUpdate *obj = (LDKHTLCFailChannelUpdate*)ptr;
	switch(obj->tag) {
		case LDKHTLCFailChannelUpdate_ChannelUpdateMessage: {
			long msg_ref = (long)&obj->channel_update_message.msg;
			return (*env)->NewObject(env, LDKHTLCFailChannelUpdate_ChannelUpdateMessage_class, LDKHTLCFailChannelUpdate_ChannelUpdateMessage_meth, msg_ref);
		}
		case LDKHTLCFailChannelUpdate_ChannelClosed: {
			return (*env)->NewObject(env, LDKHTLCFailChannelUpdate_ChannelClosed_class, LDKHTLCFailChannelUpdate_ChannelClosed_meth, obj->channel_closed.short_channel_id, obj->channel_closed.is_permanent);
		}
		case LDKHTLCFailChannelUpdate_NodeFailure: {
			long node_id_ref = (long)&obj->node_failure.node_id;
			return (*env)->NewObject(env, LDKHTLCFailChannelUpdate_NodeFailure_class, LDKHTLCFailChannelUpdate_NodeFailure_meth, node_id_ref, obj->node_failure.is_permanent);
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
	DO_ASSERT(LDKMessageSendEvent_SendAcceptChannel_class != NULL);
	LDKMessageSendEvent_SendAcceptChannel_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendAcceptChannel_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendAcceptChannel_meth != NULL);
	LDKMessageSendEvent_SendOpenChannel_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendOpenChannel;"));
	DO_ASSERT(LDKMessageSendEvent_SendOpenChannel_class != NULL);
	LDKMessageSendEvent_SendOpenChannel_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendOpenChannel_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendOpenChannel_meth != NULL);
	LDKMessageSendEvent_SendFundingCreated_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendFundingCreated;"));
	DO_ASSERT(LDKMessageSendEvent_SendFundingCreated_class != NULL);
	LDKMessageSendEvent_SendFundingCreated_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendFundingCreated_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendFundingCreated_meth != NULL);
	LDKMessageSendEvent_SendFundingSigned_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendFundingSigned;"));
	DO_ASSERT(LDKMessageSendEvent_SendFundingSigned_class != NULL);
	LDKMessageSendEvent_SendFundingSigned_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendFundingSigned_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendFundingSigned_meth != NULL);
	LDKMessageSendEvent_SendFundingLocked_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendFundingLocked;"));
	DO_ASSERT(LDKMessageSendEvent_SendFundingLocked_class != NULL);
	LDKMessageSendEvent_SendFundingLocked_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendFundingLocked_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendFundingLocked_meth != NULL);
	LDKMessageSendEvent_SendAnnouncementSignatures_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendAnnouncementSignatures;"));
	DO_ASSERT(LDKMessageSendEvent_SendAnnouncementSignatures_class != NULL);
	LDKMessageSendEvent_SendAnnouncementSignatures_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendAnnouncementSignatures_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendAnnouncementSignatures_meth != NULL);
	LDKMessageSendEvent_UpdateHTLCs_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$UpdateHTLCs;"));
	DO_ASSERT(LDKMessageSendEvent_UpdateHTLCs_class != NULL);
	LDKMessageSendEvent_UpdateHTLCs_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_UpdateHTLCs_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_UpdateHTLCs_meth != NULL);
	LDKMessageSendEvent_SendRevokeAndACK_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendRevokeAndACK;"));
	DO_ASSERT(LDKMessageSendEvent_SendRevokeAndACK_class != NULL);
	LDKMessageSendEvent_SendRevokeAndACK_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendRevokeAndACK_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendRevokeAndACK_meth != NULL);
	LDKMessageSendEvent_SendClosingSigned_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendClosingSigned;"));
	DO_ASSERT(LDKMessageSendEvent_SendClosingSigned_class != NULL);
	LDKMessageSendEvent_SendClosingSigned_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendClosingSigned_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendClosingSigned_meth != NULL);
	LDKMessageSendEvent_SendShutdown_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendShutdown;"));
	DO_ASSERT(LDKMessageSendEvent_SendShutdown_class != NULL);
	LDKMessageSendEvent_SendShutdown_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendShutdown_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendShutdown_meth != NULL);
	LDKMessageSendEvent_SendChannelReestablish_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$SendChannelReestablish;"));
	DO_ASSERT(LDKMessageSendEvent_SendChannelReestablish_class != NULL);
	LDKMessageSendEvent_SendChannelReestablish_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_SendChannelReestablish_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_SendChannelReestablish_meth != NULL);
	LDKMessageSendEvent_BroadcastChannelAnnouncement_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$BroadcastChannelAnnouncement;"));
	DO_ASSERT(LDKMessageSendEvent_BroadcastChannelAnnouncement_class != NULL);
	LDKMessageSendEvent_BroadcastChannelAnnouncement_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_BroadcastChannelAnnouncement_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_BroadcastChannelAnnouncement_meth != NULL);
	LDKMessageSendEvent_BroadcastNodeAnnouncement_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$BroadcastNodeAnnouncement;"));
	DO_ASSERT(LDKMessageSendEvent_BroadcastNodeAnnouncement_class != NULL);
	LDKMessageSendEvent_BroadcastNodeAnnouncement_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_BroadcastNodeAnnouncement_class, "<init>", "(J)V");
	DO_ASSERT(LDKMessageSendEvent_BroadcastNodeAnnouncement_meth != NULL);
	LDKMessageSendEvent_BroadcastChannelUpdate_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$BroadcastChannelUpdate;"));
	DO_ASSERT(LDKMessageSendEvent_BroadcastChannelUpdate_class != NULL);
	LDKMessageSendEvent_BroadcastChannelUpdate_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_BroadcastChannelUpdate_class, "<init>", "(J)V");
	DO_ASSERT(LDKMessageSendEvent_BroadcastChannelUpdate_meth != NULL);
	LDKMessageSendEvent_HandleError_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$HandleError;"));
	DO_ASSERT(LDKMessageSendEvent_HandleError_class != NULL);
	LDKMessageSendEvent_HandleError_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_HandleError_class, "<init>", "(JJ)V");
	DO_ASSERT(LDKMessageSendEvent_HandleError_meth != NULL);
	LDKMessageSendEvent_PaymentFailureNetworkUpdate_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKMessageSendEvent$PaymentFailureNetworkUpdate;"));
	DO_ASSERT(LDKMessageSendEvent_PaymentFailureNetworkUpdate_class != NULL);
	LDKMessageSendEvent_PaymentFailureNetworkUpdate_meth = (*env)->GetMethodID(env, LDKMessageSendEvent_PaymentFailureNetworkUpdate_class, "<init>", "(J)V");
	DO_ASSERT(LDKMessageSendEvent_PaymentFailureNetworkUpdate_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKMessageSendEvent_1ref_1from_1ptr (JNIEnv * env, jclass _c, jlong ptr) {
	LDKMessageSendEvent *obj = (LDKMessageSendEvent*)ptr;
	switch(obj->tag) {
		case LDKMessageSendEvent_SendAcceptChannel: {
			long node_id_ref = (long)&obj->send_accept_channel.node_id;
			long msg_ref = (long)&obj->send_accept_channel.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendAcceptChannel_class, LDKMessageSendEvent_SendAcceptChannel_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_SendOpenChannel: {
			long node_id_ref = (long)&obj->send_open_channel.node_id;
			long msg_ref = (long)&obj->send_open_channel.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendOpenChannel_class, LDKMessageSendEvent_SendOpenChannel_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_SendFundingCreated: {
			long node_id_ref = (long)&obj->send_funding_created.node_id;
			long msg_ref = (long)&obj->send_funding_created.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendFundingCreated_class, LDKMessageSendEvent_SendFundingCreated_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_SendFundingSigned: {
			long node_id_ref = (long)&obj->send_funding_signed.node_id;
			long msg_ref = (long)&obj->send_funding_signed.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendFundingSigned_class, LDKMessageSendEvent_SendFundingSigned_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_SendFundingLocked: {
			long node_id_ref = (long)&obj->send_funding_locked.node_id;
			long msg_ref = (long)&obj->send_funding_locked.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendFundingLocked_class, LDKMessageSendEvent_SendFundingLocked_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_SendAnnouncementSignatures: {
			long node_id_ref = (long)&obj->send_announcement_signatures.node_id;
			long msg_ref = (long)&obj->send_announcement_signatures.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendAnnouncementSignatures_class, LDKMessageSendEvent_SendAnnouncementSignatures_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_UpdateHTLCs: {
			long node_id_ref = (long)&obj->update_htl_cs.node_id;
			long updates_ref = (long)&obj->update_htl_cs.updates;
			return (*env)->NewObject(env, LDKMessageSendEvent_UpdateHTLCs_class, LDKMessageSendEvent_UpdateHTLCs_meth, node_id_ref, updates_ref);
		}
		case LDKMessageSendEvent_SendRevokeAndACK: {
			long node_id_ref = (long)&obj->send_revoke_and_ack.node_id;
			long msg_ref = (long)&obj->send_revoke_and_ack.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendRevokeAndACK_class, LDKMessageSendEvent_SendRevokeAndACK_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_SendClosingSigned: {
			long node_id_ref = (long)&obj->send_closing_signed.node_id;
			long msg_ref = (long)&obj->send_closing_signed.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendClosingSigned_class, LDKMessageSendEvent_SendClosingSigned_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_SendShutdown: {
			long node_id_ref = (long)&obj->send_shutdown.node_id;
			long msg_ref = (long)&obj->send_shutdown.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendShutdown_class, LDKMessageSendEvent_SendShutdown_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_SendChannelReestablish: {
			long node_id_ref = (long)&obj->send_channel_reestablish.node_id;
			long msg_ref = (long)&obj->send_channel_reestablish.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_SendChannelReestablish_class, LDKMessageSendEvent_SendChannelReestablish_meth, node_id_ref, msg_ref);
		}
		case LDKMessageSendEvent_BroadcastChannelAnnouncement: {
			long msg_ref = (long)&obj->broadcast_channel_announcement.msg;
			long update_msg_ref = (long)&obj->broadcast_channel_announcement.update_msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_BroadcastChannelAnnouncement_class, LDKMessageSendEvent_BroadcastChannelAnnouncement_meth, msg_ref, update_msg_ref);
		}
		case LDKMessageSendEvent_BroadcastNodeAnnouncement: {
			long msg_ref = (long)&obj->broadcast_node_announcement.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_BroadcastNodeAnnouncement_class, LDKMessageSendEvent_BroadcastNodeAnnouncement_meth, msg_ref);
		}
		case LDKMessageSendEvent_BroadcastChannelUpdate: {
			long msg_ref = (long)&obj->broadcast_channel_update.msg;
			return (*env)->NewObject(env, LDKMessageSendEvent_BroadcastChannelUpdate_class, LDKMessageSendEvent_BroadcastChannelUpdate_meth, msg_ref);
		}
		case LDKMessageSendEvent_HandleError: {
			long node_id_ref = (long)&obj->handle_error.node_id;
			long action_ref = (long)&obj->handle_error.action;
			return (*env)->NewObject(env, LDKMessageSendEvent_HandleError_class, LDKMessageSendEvent_HandleError_meth, node_id_ref, action_ref);
		}
		case LDKMessageSendEvent_PaymentFailureNetworkUpdate: {
			long update_ref = (long)&obj->payment_failure_network_update.update;
			return (*env)->NewObject(env, LDKMessageSendEvent_PaymentFailureNetworkUpdate_class, LDKMessageSendEvent_PaymentFailureNetworkUpdate_meth, update_ref);
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
		ret->data = malloc(sizeof(LDKMessageSendEvent) * ret->datalen); // often freed by rust directly
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
	jobject o;
	jmethodID get_and_clear_pending_msg_events_meth;
} LDKMessageSendEventsProvider_JCalls;
LDKCVec_MessageSendEventZ get_and_clear_pending_msg_events_jcall(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCVec_MessageSendEventZ* ret = (LDKCVec_MessageSendEventZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_and_clear_pending_msg_events_meth);
	LDKCVec_MessageSendEventZ res = *ret;
	FREE(ret);
	return res;
}
static void LDKMessageSendEventsProvider_JCalls_free(void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKMessageSendEventsProvider_JCalls *calls = MALLOC(sizeof(LDKMessageSendEventsProvider_JCalls), "LDKMessageSendEventsProvider_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_and_clear_pending_msg_events_meth = (*env)->GetMethodID(env, c, "get_and_clear_pending_msg_events", "()J");
	DO_ASSERT(calls->get_and_clear_pending_msg_events_meth != NULL);

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
	return ((LDKMessageSendEventsProvider_JCalls*)val)->o;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKMessageSendEventsProvider_1call_1get_1and_1clear_1pending_1msg_1events(JNIEnv * _env, jclass _b, jlong arg) {
	LDKMessageSendEventsProvider* arg_conv = (LDKMessageSendEventsProvider*)arg;
	LDKCVec_MessageSendEventZ* ret = MALLOC(sizeof(LDKCVec_MessageSendEventZ), "LDKCVec_MessageSendEventZ");
	*ret = (arg_conv->get_and_clear_pending_msg_events)(arg_conv->this_arg);
	return (long)ret;
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
		ret->data = malloc(sizeof(LDKEvent) * ret->datalen); // often freed by rust directly
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
	jobject o;
	jmethodID get_and_clear_pending_events_meth;
} LDKEventsProvider_JCalls;
LDKCVec_EventZ get_and_clear_pending_events_jcall(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCVec_EventZ* ret = (LDKCVec_EventZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_and_clear_pending_events_meth);
	LDKCVec_EventZ res = *ret;
	FREE(ret);
	return res;
}
static void LDKEventsProvider_JCalls_free(void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKEventsProvider_JCalls *calls = MALLOC(sizeof(LDKEventsProvider_JCalls), "LDKEventsProvider_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_and_clear_pending_events_meth = (*env)->GetMethodID(env, c, "get_and_clear_pending_events", "()J");
	DO_ASSERT(calls->get_and_clear_pending_events_meth != NULL);

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
	return ((LDKEventsProvider_JCalls*)val)->o;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKEventsProvider_1call_1get_1and_1clear_1pending_1events(JNIEnv * _env, jclass _b, jlong arg) {
	LDKEventsProvider* arg_conv = (LDKEventsProvider*)arg;
	LDKCVec_EventZ* ret = MALLOC(sizeof(LDKCVec_EventZ), "LDKCVec_EventZ");
	*ret = (arg_conv->get_and_clear_pending_events)(arg_conv->this_arg);
	return (long)ret;
}

typedef struct LDKLogger_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
	jmethodID log_meth;
} LDKLogger_JCalls;
void log_jcall(const void* this_arg, const char *record) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jstring record_conv = (*env)->NewStringUTF(env, record);
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->log_meth, record_conv);
}
static void LDKLogger_JCalls_free(void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKLogger_JCalls *calls = MALLOC(sizeof(LDKLogger_JCalls), "LDKLogger_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->log_meth = (*env)->GetMethodID(env, c, "log", "(Ljava/lang/String;)V");
	DO_ASSERT(calls->log_meth != NULL);

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
	return ((LDKLogger_JCalls*)val)->o;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelHandshakeConfig_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelHandshakeConfig *ret = MALLOC(sizeof(LDKChannelHandshakeConfig), "LDKChannelHandshakeConfig");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelHandshakeLimits_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelHandshakeLimits *ret = MALLOC(sizeof(LDKChannelHandshakeLimits), "LDKChannelHandshakeLimits");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelConfig_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelConfig *ret = MALLOC(sizeof(LDKChannelConfig), "LDKChannelConfig");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKUserConfig_1optional_1none (JNIEnv * env, jclass _a) {
	LDKUserConfig *ret = MALLOC(sizeof(LDKUserConfig), "LDKUserConfig");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxOutAccessErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_TxOutAccessErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxOutAccessErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_TxOutAccessErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_TxOutAccessErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_TxOutAccessErrorZ*)arg)->contents.err;
	}
}
typedef struct LDKAccess_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
	jmethodID get_utxo_meth;
} LDKAccess_JCalls;
LDKCResult_TxOutAccessErrorZ get_utxo_jcall(const void* this_arg, const uint8_t (*genesis_hash)[32], uint64_t short_channel_id) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray genesis_hash_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, genesis_hash_arr, 0, 32, *genesis_hash);
	LDKCResult_TxOutAccessErrorZ* ret = (LDKCResult_TxOutAccessErrorZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_utxo_meth, genesis_hash_arr, short_channel_id);
	LDKCResult_TxOutAccessErrorZ res = *ret;
	FREE(ret);
	return res;
}
static void LDKAccess_JCalls_free(void* this_arg) {
	LDKAccess_JCalls *j_calls = (LDKAccess_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKAccess_JCalls *calls = MALLOC(sizeof(LDKAccess_JCalls), "LDKAccess_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_utxo_meth = (*env)->GetMethodID(env, c, "get_utxo", "([BJ)J");
	DO_ASSERT(calls->get_utxo_meth != NULL);

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
	return ((LDKAccess_JCalls*)val)->o;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKAccess_1call_1get_1utxo(JNIEnv * _env, jclass _b, jlong arg, jbyteArray genesis_hash, jlong short_channel_id) {
	LDKAccess* arg_conv = (LDKAccess*)arg;
	unsigned char genesis_hash_arr[32];
	(*_env)->GetByteArrayRegion (_env, genesis_hash, 0, 32, genesis_hash_arr);
	unsigned char (*genesis_hash_ref)[32] = &genesis_hash_arr;
	LDKCResult_TxOutAccessErrorZ* ret = MALLOC(sizeof(LDKCResult_TxOutAccessErrorZ), "LDKCResult_TxOutAccessErrorZ");
	*ret = (arg_conv->get_utxo)(arg_conv->this_arg, genesis_hash_ref, short_channel_id);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelPublicKeys_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelPublicKeys *ret = MALLOC(sizeof(LDKChannelPublicKeys), "LDKChannelPublicKeys");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKPreCalculatedTxCreationKeys_1optional_1none (JNIEnv * env, jclass _a) {
	LDKPreCalculatedTxCreationKeys *ret = MALLOC(sizeof(LDKPreCalculatedTxCreationKeys), "LDKPreCalculatedTxCreationKeys");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1HTLCOutputInCommitment_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_HTLCOutputInCommitment *vec = (LDKCVecTempl_HTLCOutputInCommitment*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKHTLCOutputInCommitment));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1HTLCOutputInCommitment_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_HTLCOutputInCommitment *ret = MALLOC(sizeof(LDKCVecTempl_HTLCOutputInCommitment), "LDKCVecTempl_HTLCOutputInCommitment");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKHTLCOutputInCommitment) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKHTLCOutputInCommitment arr_elem_conv = *(LDKHTLCOutputInCommitment*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKHolderCommitmentTransaction_1optional_1none (JNIEnv * env, jclass _a) {
	LDKHolderCommitmentTransaction *ret = MALLOC(sizeof(LDKHolderCommitmentTransaction), "LDKHolderCommitmentTransaction");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKUnsignedChannelAnnouncement_1optional_1none (JNIEnv * env, jclass _a) {
	LDKUnsignedChannelAnnouncement *ret = MALLOC(sizeof(LDKUnsignedChannelAnnouncement), "LDKUnsignedChannelAnnouncement");
	ret->inner = NULL;
	return (long)ret;
}
typedef struct LDKChannelKeys_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
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
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKPublicKey* ret = (LDKPublicKey*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_per_commitment_point_meth, idx);
	LDKPublicKey res = *ret;
	FREE(ret);
	return res;
}
LDKThirtyTwoBytes release_commitment_secret_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray jret = (*env)->CallObjectMethod(env, j_calls->o, j_calls->release_commitment_secret_meth, idx);
	LDKThirtyTwoBytes ret;
	(*env)->GetByteArrayRegion(env, jret, 0, 32, ret.data);
	return ret;
}
LDKC2Tuple_u64u64Z key_derivation_params_jcall(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKC2Tuple_u64u64Z* ret = (LDKC2Tuple_u64u64Z*)(*env)->CallLongMethod(env, j_calls->o, j_calls->key_derivation_params_meth);
	LDKC2Tuple_u64u64Z res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_counterparty_commitment_jcall(const void* this_arg, uint32_t feerate_per_kw, LDKTransaction commitment_tx, const LDKPreCalculatedTxCreationKeys *keys, LDKCVec_HTLCOutputInCommitmentZ htlcs) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long commitment_tx_ref = (long)&commitment_tx;
	long htlcs_ref = (long)&htlcs;
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->sign_counterparty_commitment_meth, feerate_per_kw, commitment_tx_ref, keys, htlcs_ref);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_holder_commitment_jcall(const void* this_arg, const LDKHolderCommitmentTransaction *holder_commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->sign_holder_commitment_meth, holder_commitment_tx);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_CVec_SignatureZNoneZ sign_holder_commitment_htlc_transactions_jcall(const void* this_arg, const LDKHolderCommitmentTransaction *holder_commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCResult_CVec_SignatureZNoneZ* ret = (LDKCResult_CVec_SignatureZNoneZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->sign_holder_commitment_htlc_transactions_meth, holder_commitment_tx);
	LDKCResult_CVec_SignatureZNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_justice_transaction_jcall(const void* this_arg, LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (*per_commitment_key)[32], const LDKHTLCOutputInCommitment *htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long justice_tx_ref = (long)&justice_tx;
	jbyteArray per_commitment_key_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, per_commitment_key_arr, 0, 32, *per_commitment_key);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->sign_justice_transaction_meth, justice_tx_ref, input, amount, per_commitment_key_arr, htlc);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_counterparty_htlc_transaction_jcall(const void* this_arg, LDKTransaction htlc_tx, uintptr_t input, uint64_t amount, LDKPublicKey per_commitment_point, const LDKHTLCOutputInCommitment *htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long htlc_tx_ref = (long)&htlc_tx;
	long per_commitment_point_ref = (long)&per_commitment_point;
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->sign_counterparty_htlc_transaction_meth, htlc_tx_ref, input, amount, per_commitment_point_ref, htlc);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_closing_transaction_jcall(const void* this_arg, LDKTransaction closing_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long closing_tx_ref = (long)&closing_tx;
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->sign_closing_transaction_meth, closing_tx_ref);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_channel_announcement_jcall(const void* this_arg, const LDKUnsignedChannelAnnouncement *msg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->sign_channel_announcement_meth, msg);
	LDKCResult_SignatureNoneZ res = *ret;
	FREE(ret);
	return res;
}
void on_accept_jcall(void* this_arg, const LDKChannelPublicKeys *channel_points, uint16_t counterparty_selected_contest_delay, uint16_t holder_selected_contest_delay) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->on_accept_meth, channel_points, counterparty_selected_contest_delay, holder_selected_contest_delay);
}
static void LDKChannelKeys_JCalls_free(void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
		FREE(j_calls);
	}
}
static void* LDKChannelKeys_JCalls_clone(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
static inline LDKChannelKeys LDKChannelKeys_init (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	DO_ASSERT(c != NULL);
	LDKChannelKeys_JCalls *calls = MALLOC(sizeof(LDKChannelKeys_JCalls), "LDKChannelKeys_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_per_commitment_point_meth = (*env)->GetMethodID(env, c, "get_per_commitment_point", "(J)J");
	DO_ASSERT(calls->get_per_commitment_point_meth != NULL);
	calls->release_commitment_secret_meth = (*env)->GetMethodID(env, c, "release_commitment_secret", "(J)[B");
	DO_ASSERT(calls->release_commitment_secret_meth != NULL);
	calls->key_derivation_params_meth = (*env)->GetMethodID(env, c, "key_derivation_params", "()J");
	DO_ASSERT(calls->key_derivation_params_meth != NULL);
	calls->sign_counterparty_commitment_meth = (*env)->GetMethodID(env, c, "sign_counterparty_commitment", "(IJJJ)J");
	DO_ASSERT(calls->sign_counterparty_commitment_meth != NULL);
	calls->sign_holder_commitment_meth = (*env)->GetMethodID(env, c, "sign_holder_commitment", "(J)J");
	DO_ASSERT(calls->sign_holder_commitment_meth != NULL);
	calls->sign_holder_commitment_htlc_transactions_meth = (*env)->GetMethodID(env, c, "sign_holder_commitment_htlc_transactions", "(J)J");
	DO_ASSERT(calls->sign_holder_commitment_htlc_transactions_meth != NULL);
	calls->sign_justice_transaction_meth = (*env)->GetMethodID(env, c, "sign_justice_transaction", "(JJJ[BJ)J");
	DO_ASSERT(calls->sign_justice_transaction_meth != NULL);
	calls->sign_counterparty_htlc_transaction_meth = (*env)->GetMethodID(env, c, "sign_counterparty_htlc_transaction", "(JJJJJ)J");
	DO_ASSERT(calls->sign_counterparty_htlc_transaction_meth != NULL);
	calls->sign_closing_transaction_meth = (*env)->GetMethodID(env, c, "sign_closing_transaction", "(J)J");
	DO_ASSERT(calls->sign_closing_transaction_meth != NULL);
	calls->sign_channel_announcement_meth = (*env)->GetMethodID(env, c, "sign_channel_announcement", "(J)J");
	DO_ASSERT(calls->sign_channel_announcement_meth != NULL);
	calls->on_accept_meth = (*env)->GetMethodID(env, c, "on_accept", "(JSS)V");
	DO_ASSERT(calls->on_accept_meth != NULL);

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
	};
	return ret;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1new (JNIEnv * env, jclass _a, jobject o) {
	LDKChannelKeys *res_ptr = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*res_ptr = LDKChannelKeys_init(env, _a, o);
	return (long)res_ptr;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1get_1obj_1from_1jcalls (JNIEnv * env, jclass _a, jlong val) {
	return ((LDKChannelKeys_JCalls*)val)->o;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1get_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong arg, jlong idx) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = (arg_conv->get_per_commitment_point)(arg_conv->this_arg, idx);
	return (long)ret;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1release_1commitment_1secret(JNIEnv * _env, jclass _b, jlong arg, jlong idx) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	jbyteArray _arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, _arr, 0, 32, (arg_conv->release_commitment_secret)(arg_conv->this_arg, idx).data);
	return _arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1key_1derivation_1params(JNIEnv * _env, jclass _b, jlong arg) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKC2Tuple_u64u64Z* ret = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret = (arg_conv->key_derivation_params)(arg_conv->this_arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1sign_1counterparty_1commitment(JNIEnv * _env, jclass _b, jlong arg, jint feerate_per_kw, jlong commitment_tx, jlong keys, jlong htlcs) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKTransaction commitment_tx_conv = *(LDKTransaction*)commitment_tx;
	FREE((void*)commitment_tx);
	LDKPreCalculatedTxCreationKeys* keys_conv = (LDKPreCalculatedTxCreationKeys*)keys;
	LDKCVec_HTLCOutputInCommitmentZ htlcs_conv = *(LDKCVec_HTLCOutputInCommitmentZ*)htlcs;
	FREE((void*)htlcs);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = MALLOC(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ), "LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ");
	*ret = (arg_conv->sign_counterparty_commitment)(arg_conv->this_arg, feerate_per_kw, commitment_tx_conv, keys_conv, htlcs_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1sign_1holder_1commitment(JNIEnv * _env, jclass _b, jlong arg, jlong holder_commitment_tx) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKHolderCommitmentTransaction* holder_commitment_tx_conv = (LDKHolderCommitmentTransaction*)holder_commitment_tx;
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (arg_conv->sign_holder_commitment)(arg_conv->this_arg, holder_commitment_tx_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1sign_1holder_1commitment_1htlc_1transactions(JNIEnv * _env, jclass _b, jlong arg, jlong holder_commitment_tx) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKHolderCommitmentTransaction* holder_commitment_tx_conv = (LDKHolderCommitmentTransaction*)holder_commitment_tx;
	LDKCResult_CVec_SignatureZNoneZ* ret = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret = (arg_conv->sign_holder_commitment_htlc_transactions)(arg_conv->this_arg, holder_commitment_tx_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1sign_1justice_1transaction(JNIEnv * _env, jclass _b, jlong arg, jlong justice_tx, jlong input, jlong amount, jbyteArray per_commitment_key, jlong htlc) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKTransaction justice_tx_conv = *(LDKTransaction*)justice_tx;
	FREE((void*)justice_tx);
	unsigned char per_commitment_key_arr[32];
	(*_env)->GetByteArrayRegion (_env, per_commitment_key, 0, 32, per_commitment_key_arr);
	unsigned char (*per_commitment_key_ref)[32] = &per_commitment_key_arr;
	LDKHTLCOutputInCommitment* htlc_conv = (LDKHTLCOutputInCommitment*)htlc;
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (arg_conv->sign_justice_transaction)(arg_conv->this_arg, justice_tx_conv, input, amount, per_commitment_key_ref, htlc_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1sign_1counterparty_1htlc_1transaction(JNIEnv * _env, jclass _b, jlong arg, jlong htlc_tx, jlong input, jlong amount, jlong per_commitment_point, jlong htlc) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKTransaction htlc_tx_conv = *(LDKTransaction*)htlc_tx;
	FREE((void*)htlc_tx);
	LDKPublicKey per_commitment_point_conv = *(LDKPublicKey*)per_commitment_point;
	FREE((void*)per_commitment_point);
	LDKHTLCOutputInCommitment* htlc_conv = (LDKHTLCOutputInCommitment*)htlc;
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (arg_conv->sign_counterparty_htlc_transaction)(arg_conv->this_arg, htlc_tx_conv, input, amount, per_commitment_point_conv, htlc_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1sign_1closing_1transaction(JNIEnv * _env, jclass _b, jlong arg, jlong closing_tx) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKTransaction closing_tx_conv = *(LDKTransaction*)closing_tx;
	FREE((void*)closing_tx);
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (arg_conv->sign_closing_transaction)(arg_conv->this_arg, closing_tx_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1sign_1channel_1announcement(JNIEnv * _env, jclass _b, jlong arg, jlong msg) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKUnsignedChannelAnnouncement* msg_conv = (LDKUnsignedChannelAnnouncement*)msg;
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = (arg_conv->sign_channel_announcement)(arg_conv->this_arg, msg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1call_1on_1accept(JNIEnv * _env, jclass _b, jlong arg, jlong channel_points, jshort counterparty_selected_contest_delay, jshort holder_selected_contest_delay) {
	LDKChannelKeys* arg_conv = (LDKChannelKeys*)arg;
	LDKChannelPublicKeys* channel_points_conv = (LDKChannelPublicKeys*)channel_points;
	return (arg_conv->on_accept)(arg_conv->this_arg, channel_points_conv, counterparty_selected_contest_delay, holder_selected_contest_delay);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelMonitor_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelMonitor *ret = MALLOC(sizeof(LDKChannelMonitor), "LDKChannelMonitor");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelMonitorUpdate_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelMonitorUpdate *ret = MALLOC(sizeof(LDKChannelMonitorUpdate), "LDKChannelMonitorUpdate");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKMonitorEvent_1optional_1none (JNIEnv * env, jclass _a) {
	LDKMonitorEvent *ret = MALLOC(sizeof(LDKMonitorEvent), "LDKMonitorEvent");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1MonitorEvent_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_MonitorEvent *vec = (LDKCVecTempl_MonitorEvent*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKMonitorEvent));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1MonitorEvent_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_MonitorEvent *ret = MALLOC(sizeof(LDKCVecTempl_MonitorEvent), "LDKCVecTempl_MonitorEvent");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKMonitorEvent) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKMonitorEvent arr_elem_conv = *(LDKMonitorEvent*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
typedef struct LDKWatch_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
	jmethodID watch_channel_meth;
	jmethodID update_channel_meth;
	jmethodID release_pending_monitor_events_meth;
} LDKWatch_JCalls;
LDKCResult_NoneChannelMonitorUpdateErrZ watch_channel_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitor monitor) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long funding_txo_ref = (long)&funding_txo;
	long monitor_ref = (long)&monitor;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->watch_channel_meth, funding_txo_ref, monitor_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_NoneChannelMonitorUpdateErrZ update_channel_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitorUpdate update) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long funding_txo_ref = (long)&funding_txo;
	long update_ref = (long)&update;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->update_channel_meth, funding_txo_ref, update_ref);
	LDKCResult_NoneChannelMonitorUpdateErrZ res = *ret;
	FREE(ret);
	return res;
}
LDKCVec_MonitorEventZ release_pending_monitor_events_jcall(const void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCVec_MonitorEventZ* ret = (LDKCVec_MonitorEventZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->release_pending_monitor_events_meth);
	LDKCVec_MonitorEventZ res = *ret;
	FREE(ret);
	return res;
}
static void LDKWatch_JCalls_free(void* this_arg) {
	LDKWatch_JCalls *j_calls = (LDKWatch_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKWatch_JCalls *calls = MALLOC(sizeof(LDKWatch_JCalls), "LDKWatch_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->watch_channel_meth = (*env)->GetMethodID(env, c, "watch_channel", "(JJ)J");
	DO_ASSERT(calls->watch_channel_meth != NULL);
	calls->update_channel_meth = (*env)->GetMethodID(env, c, "update_channel", "(JJ)J");
	DO_ASSERT(calls->update_channel_meth != NULL);
	calls->release_pending_monitor_events_meth = (*env)->GetMethodID(env, c, "release_pending_monitor_events", "()J");
	DO_ASSERT(calls->release_pending_monitor_events_meth != NULL);

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
	return ((LDKWatch_JCalls*)val)->o;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKWatch_1call_1watch_1channel(JNIEnv * _env, jclass _b, jlong arg, jlong funding_txo, jlong monitor) {
	LDKWatch* arg_conv = (LDKWatch*)arg;
	LDKOutPoint funding_txo_conv = *(LDKOutPoint*)funding_txo;
	FREE((void*)funding_txo);
	funding_txo_conv.is_owned = true;
	LDKChannelMonitor monitor_conv = *(LDKChannelMonitor*)monitor;
	FREE((void*)monitor);
	monitor_conv.is_owned = true;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret = (arg_conv->watch_channel)(arg_conv->this_arg, funding_txo_conv, monitor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKWatch_1call_1update_1channel(JNIEnv * _env, jclass _b, jlong arg, jlong funding_txo, jlong update) {
	LDKWatch* arg_conv = (LDKWatch*)arg;
	LDKOutPoint funding_txo_conv = *(LDKOutPoint*)funding_txo;
	FREE((void*)funding_txo);
	funding_txo_conv.is_owned = true;
	LDKChannelMonitorUpdate update_conv = *(LDKChannelMonitorUpdate*)update;
	FREE((void*)update);
	update_conv.is_owned = true;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = MALLOC(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ), "LDKCResult_NoneChannelMonitorUpdateErrZ");
	*ret = (arg_conv->update_channel)(arg_conv->this_arg, funding_txo_conv, update_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKWatch_1call_1release_1pending_1monitor_1events(JNIEnv * _env, jclass _b, jlong arg) {
	LDKWatch* arg_conv = (LDKWatch*)arg;
	LDKCVec_MonitorEventZ* ret = MALLOC(sizeof(LDKCVec_MonitorEventZ), "LDKCVec_MonitorEventZ");
	*ret = (arg_conv->release_pending_monitor_events)(arg_conv->this_arg);
	return (long)ret;
}

typedef struct LDKFilter_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
	jmethodID register_tx_meth;
	jmethodID register_output_meth;
} LDKFilter_JCalls;
void register_tx_jcall(const void* this_arg, const uint8_t (*txid)[32], LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray txid_arr = (*env)->NewByteArray(env, 32);
	(*env)->SetByteArrayRegion(env, txid_arr, 0, 32, *txid);
	long script_pubkey_ref = (long)&script_pubkey;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->register_tx_meth, txid_arr, script_pubkey_ref);
}
void register_output_jcall(const void* this_arg, const LDKOutPoint *outpoint, LDKu8slice script_pubkey) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long script_pubkey_ref = (long)&script_pubkey;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->register_output_meth, outpoint, script_pubkey_ref);
}
static void LDKFilter_JCalls_free(void* this_arg) {
	LDKFilter_JCalls *j_calls = (LDKFilter_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKFilter_JCalls *calls = MALLOC(sizeof(LDKFilter_JCalls), "LDKFilter_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->register_tx_meth = (*env)->GetMethodID(env, c, "register_tx", "([BJ)V");
	DO_ASSERT(calls->register_tx_meth != NULL);
	calls->register_output_meth = (*env)->GetMethodID(env, c, "register_output", "(JJ)V");
	DO_ASSERT(calls->register_output_meth != NULL);

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
	return ((LDKFilter_JCalls*)val)->o;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKFilter_1call_1register_1tx(JNIEnv * _env, jclass _b, jlong arg, jbyteArray txid, jlong script_pubkey) {
	LDKFilter* arg_conv = (LDKFilter*)arg;
	unsigned char txid_arr[32];
	(*_env)->GetByteArrayRegion (_env, txid, 0, 32, txid_arr);
	unsigned char (*txid_ref)[32] = &txid_arr;
	LDKu8slice script_pubkey_conv = *(LDKu8slice*)script_pubkey;
	return (arg_conv->register_tx)(arg_conv->this_arg, txid_ref, script_pubkey_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKFilter_1call_1register_1output(JNIEnv * _env, jclass _b, jlong arg, jlong outpoint, jlong script_pubkey) {
	LDKFilter* arg_conv = (LDKFilter*)arg;
	LDKOutPoint* outpoint_conv = (LDKOutPoint*)outpoint;
	LDKu8slice script_pubkey_conv = *(LDKu8slice*)script_pubkey;
	return (arg_conv->register_output)(arg_conv->this_arg, outpoint_conv, script_pubkey_conv);
}

typedef struct LDKBroadcasterInterface_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
	jmethodID broadcast_transaction_meth;
} LDKBroadcasterInterface_JCalls;
void broadcast_transaction_jcall(const void* this_arg, LDKTransaction tx) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long tx_ref = (long)&tx;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->broadcast_transaction_meth, tx_ref);
}
static void LDKBroadcasterInterface_JCalls_free(void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKBroadcasterInterface_JCalls *calls = MALLOC(sizeof(LDKBroadcasterInterface_JCalls), "LDKBroadcasterInterface_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->broadcast_transaction_meth = (*env)->GetMethodID(env, c, "broadcast_transaction", "(J)V");
	DO_ASSERT(calls->broadcast_transaction_meth != NULL);

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
	return ((LDKBroadcasterInterface_JCalls*)val)->o;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKBroadcasterInterface_1call_1broadcast_1transaction(JNIEnv * _env, jclass _b, jlong arg, jlong tx) {
	LDKBroadcasterInterface* arg_conv = (LDKBroadcasterInterface*)arg;
	LDKTransaction tx_conv = *(LDKTransaction*)tx;
	FREE((void*)tx);
	return (arg_conv->broadcast_transaction)(arg_conv->this_arg, tx_conv);
}

typedef struct LDKFeeEstimator_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
	jmethodID get_est_sat_per_1000_weight_meth;
} LDKFeeEstimator_JCalls;
uint32_t get_est_sat_per_1000_weight_jcall(const void* this_arg, LDKConfirmationTarget confirmation_target) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jclass confirmation_target_conv = LDKConfirmationTarget_to_java(env, confirmation_target);
	return (*env)->CallIntMethod(env, j_calls->o, j_calls->get_est_sat_per_1000_weight_meth, confirmation_target_conv);
}
static void LDKFeeEstimator_JCalls_free(void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKFeeEstimator_JCalls *calls = MALLOC(sizeof(LDKFeeEstimator_JCalls), "LDKFeeEstimator_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_est_sat_per_1000_weight_meth = (*env)->GetMethodID(env, c, "get_est_sat_per_1000_weight", "(Lorg/ldk/enums/LDKConfirmationTarget;)I");
	DO_ASSERT(calls->get_est_sat_per_1000_weight_meth != NULL);

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
	return ((LDKFeeEstimator_JCalls*)val)->o;
}
JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_LDKFeeEstimator_1call_1get_1est_1sat_1per_11000_1weight(JNIEnv * _env, jclass _b, jlong arg, jclass confirmation_target) {
	LDKFeeEstimator* arg_conv = (LDKFeeEstimator*)arg;
	LDKConfirmationTarget confirmation_target_conv = LDKConfirmationTarget_from_java(_env, confirmation_target);
	return (arg_conv->get_est_sat_per_1000_weight)(arg_conv->this_arg, confirmation_target_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChainMonitor_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChainMonitor *ret = MALLOC(sizeof(LDKChainMonitor), "LDKChainMonitor");
	ret->inner = NULL;
	return (long)ret;
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
		ret->data = malloc(sizeof(LDKC2TupleTempl_usize__Transaction) * ret->datalen); // often freed by rust directly
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
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKHTLCUpdate_1optional_1none (JNIEnv * env, jclass _a) {
	LDKHTLCUpdate *ret = MALLOC(sizeof(LDKHTLCUpdate), "LDKHTLCUpdate");
	ret->inner = NULL;
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
		ret->data = malloc(sizeof(LDKTransaction) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKTransaction arr_elem_conv = *(LDKTransaction*)arr_elem;
			FREE((void*)arr_elem);
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
		ret->data = malloc(sizeof(LDKC2TupleTempl_ThirtyTwoBytes__CVecTempl_TxOut) * ret->datalen); // often freed by rust directly
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
	jobject o;
	jmethodID get_node_secret_meth;
	jmethodID get_destination_script_meth;
	jmethodID get_shutdown_pubkey_meth;
	jmethodID get_channel_keys_meth;
	jmethodID get_secure_random_bytes_meth;
} LDKKeysInterface_JCalls;
LDKSecretKey get_node_secret_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKSecretKey* ret = (LDKSecretKey*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_node_secret_meth);
	LDKSecretKey res = *ret;
	FREE(ret);
	return res;
}
LDKCVec_u8Z get_destination_script_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCVec_u8Z* ret = (LDKCVec_u8Z*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_destination_script_meth);
	LDKCVec_u8Z res = *ret;
	FREE(ret);
	return res;
}
LDKPublicKey get_shutdown_pubkey_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKPublicKey* ret = (LDKPublicKey*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_shutdown_pubkey_meth);
	LDKPublicKey res = *ret;
	FREE(ret);
	return res;
}
LDKChannelKeys get_channel_keys_jcall(const void* this_arg, bool inbound, uint64_t channel_value_satoshis) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKChannelKeys* ret = (LDKChannelKeys*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_channel_keys_meth, inbound, channel_value_satoshis);
	LDKChannelKeys res = *ret;
	FREE(ret);
	return res;
}
LDKThirtyTwoBytes get_secure_random_bytes_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	jbyteArray jret = (*env)->CallObjectMethod(env, j_calls->o, j_calls->get_secure_random_bytes_meth);
	LDKThirtyTwoBytes ret;
	(*env)->GetByteArrayRegion(env, jret, 0, 32, ret.data);
	return ret;
}
static void LDKKeysInterface_JCalls_free(void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKKeysInterface_JCalls *calls = MALLOC(sizeof(LDKKeysInterface_JCalls), "LDKKeysInterface_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_node_secret_meth = (*env)->GetMethodID(env, c, "get_node_secret", "()J");
	DO_ASSERT(calls->get_node_secret_meth != NULL);
	calls->get_destination_script_meth = (*env)->GetMethodID(env, c, "get_destination_script", "()J");
	DO_ASSERT(calls->get_destination_script_meth != NULL);
	calls->get_shutdown_pubkey_meth = (*env)->GetMethodID(env, c, "get_shutdown_pubkey", "()J");
	DO_ASSERT(calls->get_shutdown_pubkey_meth != NULL);
	calls->get_channel_keys_meth = (*env)->GetMethodID(env, c, "get_channel_keys", "(ZJ)J");
	DO_ASSERT(calls->get_channel_keys_meth != NULL);
	calls->get_secure_random_bytes_meth = (*env)->GetMethodID(env, c, "get_secure_random_bytes", "()[B");
	DO_ASSERT(calls->get_secure_random_bytes_meth != NULL);

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
	return ((LDKKeysInterface_JCalls*)val)->o;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKKeysInterface_1call_1get_1node_1secret(JNIEnv * _env, jclass _b, jlong arg) {
	LDKKeysInterface* arg_conv = (LDKKeysInterface*)arg;
	LDKSecretKey* ret = MALLOC(sizeof(LDKSecretKey), "LDKSecretKey");
	*ret = (arg_conv->get_node_secret)(arg_conv->this_arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKKeysInterface_1call_1get_1destination_1script(JNIEnv * _env, jclass _b, jlong arg) {
	LDKKeysInterface* arg_conv = (LDKKeysInterface*)arg;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = (arg_conv->get_destination_script)(arg_conv->this_arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKKeysInterface_1call_1get_1shutdown_1pubkey(JNIEnv * _env, jclass _b, jlong arg) {
	LDKKeysInterface* arg_conv = (LDKKeysInterface*)arg;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = (arg_conv->get_shutdown_pubkey)(arg_conv->this_arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKKeysInterface_1call_1get_1channel_1keys(JNIEnv * _env, jclass _b, jlong arg, jboolean inbound, jlong channel_value_satoshis) {
	LDKKeysInterface* arg_conv = (LDKKeysInterface*)arg;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = (arg_conv->get_channel_keys)(arg_conv->this_arg, inbound, channel_value_satoshis);
	return (long)ret;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_LDKKeysInterface_1call_1get_1secure_1random_1bytes(JNIEnv * _env, jclass _b, jlong arg) {
	LDKKeysInterface* arg_conv = (LDKKeysInterface*)arg;
	jbyteArray _arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, _arr, 0, 32, (arg_conv->get_secure_random_bytes)(arg_conv->this_arg).data);
	return _arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKInMemoryChannelKeys_1optional_1none (JNIEnv * env, jclass _a) {
	LDKInMemoryChannelKeys *ret = MALLOC(sizeof(LDKInMemoryChannelKeys), "LDKInMemoryChannelKeys");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKKeysManager_1optional_1none (JNIEnv * env, jclass _a) {
	LDKKeysManager *ret = MALLOC(sizeof(LDKKeysManager), "LDKKeysManager");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelManager_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelManager *ret = MALLOC(sizeof(LDKChannelManager), "LDKChannelManager");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelDetails_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelDetails *ret = MALLOC(sizeof(LDKChannelDetails), "LDKChannelDetails");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKInitFeatures_1optional_1none (JNIEnv * env, jclass _a) {
	LDKInitFeatures *ret = MALLOC(sizeof(LDKInitFeatures), "LDKInitFeatures");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1ChannelDetails_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_ChannelDetails *vec = (LDKCVecTempl_ChannelDetails*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKChannelDetails));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1ChannelDetails_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_ChannelDetails *ret = MALLOC(sizeof(LDKCVecTempl_ChannelDetails), "LDKCVecTempl_ChannelDetails");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKChannelDetails) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKChannelDetails arr_elem_conv = *(LDKChannelDetails*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRoute_1optional_1none (JNIEnv * env, jclass _a) {
	LDKRoute *ret = MALLOC(sizeof(LDKRoute), "LDKRoute");
	ret->inner = NULL;
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
	DO_ASSERT(LDKNetAddress_IPv4_class != NULL);
	LDKNetAddress_IPv4_meth = (*env)->GetMethodID(env, LDKNetAddress_IPv4_class, "<init>", "(JS)V");
	DO_ASSERT(LDKNetAddress_IPv4_meth != NULL);
	LDKNetAddress_IPv6_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKNetAddress$IPv6;"));
	DO_ASSERT(LDKNetAddress_IPv6_class != NULL);
	LDKNetAddress_IPv6_meth = (*env)->GetMethodID(env, LDKNetAddress_IPv6_class, "<init>", "(JS)V");
	DO_ASSERT(LDKNetAddress_IPv6_meth != NULL);
	LDKNetAddress_OnionV2_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKNetAddress$OnionV2;"));
	DO_ASSERT(LDKNetAddress_OnionV2_class != NULL);
	LDKNetAddress_OnionV2_meth = (*env)->GetMethodID(env, LDKNetAddress_OnionV2_class, "<init>", "(JS)V");
	DO_ASSERT(LDKNetAddress_OnionV2_meth != NULL);
	LDKNetAddress_OnionV3_class =
		(*env)->NewGlobalRef(env, (*env)->FindClass(env, "Lorg/ldk/impl/bindings$LDKNetAddress$OnionV3;"));
	DO_ASSERT(LDKNetAddress_OnionV3_class != NULL);
	LDKNetAddress_OnionV3_meth = (*env)->GetMethodID(env, LDKNetAddress_OnionV3_class, "<init>", "([BSBS)V");
	DO_ASSERT(LDKNetAddress_OnionV3_meth != NULL);
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKNetAddress_1ref_1from_1ptr (JNIEnv * env, jclass _c, jlong ptr) {
	LDKNetAddress *obj = (LDKNetAddress*)ptr;
	switch(obj->tag) {
		case LDKNetAddress_IPv4: {
			long addr_ref = (long)&obj->i_pv4.addr;
			return (*env)->NewObject(env, LDKNetAddress_IPv4_class, LDKNetAddress_IPv4_meth, addr_ref, obj->i_pv4.port);
		}
		case LDKNetAddress_IPv6: {
			long addr_ref = (long)&obj->i_pv6.addr;
			return (*env)->NewObject(env, LDKNetAddress_IPv6_class, LDKNetAddress_IPv6_meth, addr_ref, obj->i_pv6.port);
		}
		case LDKNetAddress_OnionV2: {
			long addr_ref = (long)&obj->onion_v2.addr;
			return (*env)->NewObject(env, LDKNetAddress_OnionV2_class, LDKNetAddress_OnionV2_meth, addr_ref, obj->onion_v2.port);
		}
		case LDKNetAddress_OnionV3: {
			jbyteArray ed25519_pubkey_arr = (*env)->NewByteArray(env, 32);
			(*env)->SetByteArrayRegion(env, ed25519_pubkey_arr, 0, 32, obj->onion_v3.ed25519_pubkey.data);
			return (*env)->NewObject(env, LDKNetAddress_OnionV3_class, LDKNetAddress_OnionV3_meth, ed25519_pubkey_arr, obj->onion_v3.checksum, obj->onion_v3.version, obj->onion_v3.port);
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
		ret->data = malloc(sizeof(LDKNetAddress) * ret->datalen); // often freed by rust directly
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
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKUpdateAddHTLC_1optional_1none (JNIEnv * env, jclass _a) {
	LDKUpdateAddHTLC *ret = MALLOC(sizeof(LDKUpdateAddHTLC), "LDKUpdateAddHTLC");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKUpdateFulfillHTLC_1optional_1none (JNIEnv * env, jclass _a) {
	LDKUpdateFulfillHTLC *ret = MALLOC(sizeof(LDKUpdateFulfillHTLC), "LDKUpdateFulfillHTLC");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKUpdateFailHTLC_1optional_1none (JNIEnv * env, jclass _a) {
	LDKUpdateFailHTLC *ret = MALLOC(sizeof(LDKUpdateFailHTLC), "LDKUpdateFailHTLC");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKUpdateFailMalformedHTLC_1optional_1none (JNIEnv * env, jclass _a) {
	LDKUpdateFailMalformedHTLC *ret = MALLOC(sizeof(LDKUpdateFailMalformedHTLC), "LDKUpdateFailMalformedHTLC");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCommitmentSigned_1optional_1none (JNIEnv * env, jclass _a) {
	LDKCommitmentSigned *ret = MALLOC(sizeof(LDKCommitmentSigned), "LDKCommitmentSigned");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKUpdateFee_1optional_1none (JNIEnv * env, jclass _a) {
	LDKUpdateFee *ret = MALLOC(sizeof(LDKUpdateFee), "LDKUpdateFee");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKInit_1optional_1none (JNIEnv * env, jclass _a) {
	LDKInit *ret = MALLOC(sizeof(LDKInit), "LDKInit");
	ret->inner = NULL;
	return (long)ret;
}
typedef struct LDKChannelMessageHandler_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
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
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	long their_features_ref = (long)&their_features;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_open_channel_meth, their_node_id_ref, their_features_ref, msg);
}
void handle_accept_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKAcceptChannel *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	long their_features_ref = (long)&their_features;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_accept_channel_meth, their_node_id_ref, their_features_ref, msg);
}
void handle_funding_created_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingCreated *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_funding_created_meth, their_node_id_ref, msg);
}
void handle_funding_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingSigned *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_funding_signed_meth, their_node_id_ref, msg);
}
void handle_funding_locked_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingLocked *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_funding_locked_meth, their_node_id_ref, msg);
}
void handle_shutdown_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKShutdown *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_shutdown_meth, their_node_id_ref, msg);
}
void handle_closing_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKClosingSigned *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_closing_signed_meth, their_node_id_ref, msg);
}
void handle_update_add_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateAddHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_update_add_htlc_meth, their_node_id_ref, msg);
}
void handle_update_fulfill_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFulfillHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_update_fulfill_htlc_meth, their_node_id_ref, msg);
}
void handle_update_fail_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_update_fail_htlc_meth, their_node_id_ref, msg);
}
void handle_update_fail_malformed_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailMalformedHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_update_fail_malformed_htlc_meth, their_node_id_ref, msg);
}
void handle_commitment_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKCommitmentSigned *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_commitment_signed_meth, their_node_id_ref, msg);
}
void handle_revoke_and_ack_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKRevokeAndACK *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_revoke_and_ack_meth, their_node_id_ref, msg);
}
void handle_update_fee_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFee *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_update_fee_meth, their_node_id_ref, msg);
}
void handle_announcement_signatures_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKAnnouncementSignatures *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_announcement_signatures_meth, their_node_id_ref, msg);
}
void peer_disconnected_jcall(const void* this_arg, LDKPublicKey their_node_id, bool no_connection_possible) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->peer_disconnected_meth, their_node_id_ref, no_connection_possible);
}
void peer_connected_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKInit *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->peer_connected_meth, their_node_id_ref, msg);
}
void handle_channel_reestablish_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKChannelReestablish *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_channel_reestablish_meth, their_node_id_ref, msg);
}
void handle_error_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKErrorMessage *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long their_node_id_ref = (long)&their_node_id;
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_error_meth, their_node_id_ref, msg);
}
static void LDKChannelMessageHandler_JCalls_free(void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKChannelMessageHandler_JCalls *calls = MALLOC(sizeof(LDKChannelMessageHandler_JCalls), "LDKChannelMessageHandler_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->handle_open_channel_meth = (*env)->GetMethodID(env, c, "handle_open_channel", "(JJJ)V");
	DO_ASSERT(calls->handle_open_channel_meth != NULL);
	calls->handle_accept_channel_meth = (*env)->GetMethodID(env, c, "handle_accept_channel", "(JJJ)V");
	DO_ASSERT(calls->handle_accept_channel_meth != NULL);
	calls->handle_funding_created_meth = (*env)->GetMethodID(env, c, "handle_funding_created", "(JJ)V");
	DO_ASSERT(calls->handle_funding_created_meth != NULL);
	calls->handle_funding_signed_meth = (*env)->GetMethodID(env, c, "handle_funding_signed", "(JJ)V");
	DO_ASSERT(calls->handle_funding_signed_meth != NULL);
	calls->handle_funding_locked_meth = (*env)->GetMethodID(env, c, "handle_funding_locked", "(JJ)V");
	DO_ASSERT(calls->handle_funding_locked_meth != NULL);
	calls->handle_shutdown_meth = (*env)->GetMethodID(env, c, "handle_shutdown", "(JJ)V");
	DO_ASSERT(calls->handle_shutdown_meth != NULL);
	calls->handle_closing_signed_meth = (*env)->GetMethodID(env, c, "handle_closing_signed", "(JJ)V");
	DO_ASSERT(calls->handle_closing_signed_meth != NULL);
	calls->handle_update_add_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_add_htlc", "(JJ)V");
	DO_ASSERT(calls->handle_update_add_htlc_meth != NULL);
	calls->handle_update_fulfill_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_fulfill_htlc", "(JJ)V");
	DO_ASSERT(calls->handle_update_fulfill_htlc_meth != NULL);
	calls->handle_update_fail_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_fail_htlc", "(JJ)V");
	DO_ASSERT(calls->handle_update_fail_htlc_meth != NULL);
	calls->handle_update_fail_malformed_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_fail_malformed_htlc", "(JJ)V");
	DO_ASSERT(calls->handle_update_fail_malformed_htlc_meth != NULL);
	calls->handle_commitment_signed_meth = (*env)->GetMethodID(env, c, "handle_commitment_signed", "(JJ)V");
	DO_ASSERT(calls->handle_commitment_signed_meth != NULL);
	calls->handle_revoke_and_ack_meth = (*env)->GetMethodID(env, c, "handle_revoke_and_ack", "(JJ)V");
	DO_ASSERT(calls->handle_revoke_and_ack_meth != NULL);
	calls->handle_update_fee_meth = (*env)->GetMethodID(env, c, "handle_update_fee", "(JJ)V");
	DO_ASSERT(calls->handle_update_fee_meth != NULL);
	calls->handle_announcement_signatures_meth = (*env)->GetMethodID(env, c, "handle_announcement_signatures", "(JJ)V");
	DO_ASSERT(calls->handle_announcement_signatures_meth != NULL);
	calls->peer_disconnected_meth = (*env)->GetMethodID(env, c, "peer_disconnected", "(JZ)V");
	DO_ASSERT(calls->peer_disconnected_meth != NULL);
	calls->peer_connected_meth = (*env)->GetMethodID(env, c, "peer_connected", "(JJ)V");
	DO_ASSERT(calls->peer_connected_meth != NULL);
	calls->handle_channel_reestablish_meth = (*env)->GetMethodID(env, c, "handle_channel_reestablish", "(JJ)V");
	DO_ASSERT(calls->handle_channel_reestablish_meth != NULL);
	calls->handle_error_meth = (*env)->GetMethodID(env, c, "handle_error", "(JJ)V");
	DO_ASSERT(calls->handle_error_meth != NULL);

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
	return ((LDKChannelMessageHandler_JCalls*)val)->o;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1open_1channel(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong their_features, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKInitFeatures their_features_conv = *(LDKInitFeatures*)their_features;
	FREE((void*)their_features);
	their_features_conv.is_owned = true;
	LDKOpenChannel* msg_conv = (LDKOpenChannel*)msg;
	return (arg_conv->handle_open_channel)(arg_conv->this_arg, their_node_id_conv, their_features_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1accept_1channel(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong their_features, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKInitFeatures their_features_conv = *(LDKInitFeatures*)their_features;
	FREE((void*)their_features);
	their_features_conv.is_owned = true;
	LDKAcceptChannel* msg_conv = (LDKAcceptChannel*)msg;
	return (arg_conv->handle_accept_channel)(arg_conv->this_arg, their_node_id_conv, their_features_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1funding_1created(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKFundingCreated* msg_conv = (LDKFundingCreated*)msg;
	return (arg_conv->handle_funding_created)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1funding_1signed(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKFundingSigned* msg_conv = (LDKFundingSigned*)msg;
	return (arg_conv->handle_funding_signed)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1funding_1locked(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKFundingLocked* msg_conv = (LDKFundingLocked*)msg;
	return (arg_conv->handle_funding_locked)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1shutdown(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKShutdown* msg_conv = (LDKShutdown*)msg;
	return (arg_conv->handle_shutdown)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1closing_1signed(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKClosingSigned* msg_conv = (LDKClosingSigned*)msg;
	return (arg_conv->handle_closing_signed)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1update_1add_1htlc(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKUpdateAddHTLC* msg_conv = (LDKUpdateAddHTLC*)msg;
	return (arg_conv->handle_update_add_htlc)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1update_1fulfill_1htlc(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKUpdateFulfillHTLC* msg_conv = (LDKUpdateFulfillHTLC*)msg;
	return (arg_conv->handle_update_fulfill_htlc)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1update_1fail_1htlc(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKUpdateFailHTLC* msg_conv = (LDKUpdateFailHTLC*)msg;
	return (arg_conv->handle_update_fail_htlc)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1update_1fail_1malformed_1htlc(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKUpdateFailMalformedHTLC* msg_conv = (LDKUpdateFailMalformedHTLC*)msg;
	return (arg_conv->handle_update_fail_malformed_htlc)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1commitment_1signed(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKCommitmentSigned* msg_conv = (LDKCommitmentSigned*)msg;
	return (arg_conv->handle_commitment_signed)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1revoke_1and_1ack(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKRevokeAndACK* msg_conv = (LDKRevokeAndACK*)msg;
	return (arg_conv->handle_revoke_and_ack)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1update_1fee(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKUpdateFee* msg_conv = (LDKUpdateFee*)msg;
	return (arg_conv->handle_update_fee)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1announcement_1signatures(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKAnnouncementSignatures* msg_conv = (LDKAnnouncementSignatures*)msg;
	return (arg_conv->handle_announcement_signatures)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1peer_1disconnected(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jboolean no_connection_possible) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	return (arg_conv->peer_disconnected)(arg_conv->this_arg, their_node_id_conv, no_connection_possible);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1peer_1connected(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKInit* msg_conv = (LDKInit*)msg;
	return (arg_conv->peer_connected)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1channel_1reestablish(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKChannelReestablish* msg_conv = (LDKChannelReestablish*)msg;
	return (arg_conv->handle_channel_reestablish)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1call_1handle_1error(JNIEnv * _env, jclass _b, jlong arg, jlong their_node_id, jlong msg) {
	LDKChannelMessageHandler* arg_conv = (LDKChannelMessageHandler*)arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKErrorMessage* msg_conv = (LDKErrorMessage*)msg;
	return (arg_conv->handle_error)(arg_conv->this_arg, their_node_id_conv, msg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelManagerReadArgs_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelManagerReadArgs *ret = MALLOC(sizeof(LDKChannelManagerReadArgs), "LDKChannelManagerReadArgs");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1ChannelMonitor_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_ChannelMonitor *vec = (LDKCVecTempl_ChannelMonitor*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKChannelMonitor));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1ChannelMonitor_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_ChannelMonitor *ret = MALLOC(sizeof(LDKCVecTempl_ChannelMonitor), "LDKCVecTempl_ChannelMonitor");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKChannelMonitor) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKChannelMonitor arr_elem_conv = *(LDKChannelMonitor*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKDecodeError_1optional_1none (JNIEnv * env, jclass _a) {
	LDKDecodeError *ret = MALLOC(sizeof(LDKDecodeError), "LDKDecodeError");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKPing_1optional_1none (JNIEnv * env, jclass _a) {
	LDKPing *ret = MALLOC(sizeof(LDKPing), "LDKPing");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKPong_1optional_1none (JNIEnv * env, jclass _a) {
	LDKPong *ret = MALLOC(sizeof(LDKPong), "LDKPong");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKDataLossProtect_1optional_1none (JNIEnv * env, jclass _a) {
	LDKDataLossProtect *ret = MALLOC(sizeof(LDKDataLossProtect), "LDKDataLossProtect");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKUnsignedNodeAnnouncement_1optional_1none (JNIEnv * env, jclass _a) {
	LDKUnsignedNodeAnnouncement *ret = MALLOC(sizeof(LDKUnsignedNodeAnnouncement), "LDKUnsignedNodeAnnouncement");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKNodeFeatures_1optional_1none (JNIEnv * env, jclass _a) {
	LDKNodeFeatures *ret = MALLOC(sizeof(LDKNodeFeatures), "LDKNodeFeatures");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelFeatures_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelFeatures *ret = MALLOC(sizeof(LDKChannelFeatures), "LDKChannelFeatures");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKUnsignedChannelUpdate_1optional_1none (JNIEnv * env, jclass _a) {
	LDKUnsignedChannelUpdate *ret = MALLOC(sizeof(LDKUnsignedChannelUpdate), "LDKUnsignedChannelUpdate");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKQueryChannelRange_1optional_1none (JNIEnv * env, jclass _a) {
	LDKQueryChannelRange *ret = MALLOC(sizeof(LDKQueryChannelRange), "LDKQueryChannelRange");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKReplyChannelRange_1optional_1none (JNIEnv * env, jclass _a) {
	LDKReplyChannelRange *ret = MALLOC(sizeof(LDKReplyChannelRange), "LDKReplyChannelRange");
	ret->inner = NULL;
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
		ret->data = malloc(sizeof(uint64_t) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			ret->data[i] = java_elems[i];
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKQueryShortChannelIds_1optional_1none (JNIEnv * env, jclass _a) {
	LDKQueryShortChannelIds *ret = MALLOC(sizeof(LDKQueryShortChannelIds), "LDKQueryShortChannelIds");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKReplyShortChannelIdsEnd_1optional_1none (JNIEnv * env, jclass _a) {
	LDKReplyShortChannelIdsEnd *ret = MALLOC(sizeof(LDKReplyShortChannelIdsEnd), "LDKReplyShortChannelIdsEnd");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKGossipTimestampFilter_1optional_1none (JNIEnv * env, jclass _a) {
	LDKGossipTimestampFilter *ret = MALLOC(sizeof(LDKGossipTimestampFilter), "LDKGossipTimestampFilter");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKLightningError_1optional_1none (JNIEnv * env, jclass _a) {
	LDKLightningError *ret = MALLOC(sizeof(LDKLightningError), "LDKLightningError");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateAddHTLC_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_UpdateAddHTLC *vec = (LDKCVecTempl_UpdateAddHTLC*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKUpdateAddHTLC));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateAddHTLC_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_UpdateAddHTLC *ret = MALLOC(sizeof(LDKCVecTempl_UpdateAddHTLC), "LDKCVecTempl_UpdateAddHTLC");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKUpdateAddHTLC) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKUpdateAddHTLC arr_elem_conv = *(LDKUpdateAddHTLC*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFulfillHTLC_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_UpdateFulfillHTLC *vec = (LDKCVecTempl_UpdateFulfillHTLC*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKUpdateFulfillHTLC));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFulfillHTLC_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_UpdateFulfillHTLC *ret = MALLOC(sizeof(LDKCVecTempl_UpdateFulfillHTLC), "LDKCVecTempl_UpdateFulfillHTLC");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKUpdateFulfillHTLC) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKUpdateFulfillHTLC arr_elem_conv = *(LDKUpdateFulfillHTLC*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFailHTLC_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_UpdateFailHTLC *vec = (LDKCVecTempl_UpdateFailHTLC*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKUpdateFailHTLC));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFailHTLC_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_UpdateFailHTLC *ret = MALLOC(sizeof(LDKCVecTempl_UpdateFailHTLC), "LDKCVecTempl_UpdateFailHTLC");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKUpdateFailHTLC) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKUpdateFailHTLC arr_elem_conv = *(LDKUpdateFailHTLC*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFailMalformedHTLC_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_UpdateFailMalformedHTLC *vec = (LDKCVecTempl_UpdateFailMalformedHTLC*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKUpdateFailMalformedHTLC));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1UpdateFailMalformedHTLC_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_UpdateFailMalformedHTLC *ret = MALLOC(sizeof(LDKCVecTempl_UpdateFailMalformedHTLC), "LDKCVecTempl_UpdateFailMalformedHTLC");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKUpdateFailMalformedHTLC) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKUpdateFailMalformedHTLC arr_elem_conv = *(LDKUpdateFailMalformedHTLC*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolLightningErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_boolLightningErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolLightningErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_boolLightningErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_boolLightningErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_boolLightningErrorZ*)arg)->contents.err;
	}
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
		ret->data = malloc(sizeof(LDKC3TupleTempl_ChannelAnnouncement__ChannelUpdate__ChannelUpdate) * ret->datalen); // often freed by rust directly
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
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1NodeAnnouncement_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_NodeAnnouncement *vec = (LDKCVecTempl_NodeAnnouncement*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKNodeAnnouncement));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1NodeAnnouncement_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_NodeAnnouncement *ret = MALLOC(sizeof(LDKCVecTempl_NodeAnnouncement), "LDKCVecTempl_NodeAnnouncement");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKNodeAnnouncement) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKNodeAnnouncement arr_elem_conv = *(LDKNodeAnnouncement*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
typedef struct LDKRoutingMessageHandler_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
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
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->handle_node_announcement_meth, msg);
	LDKCResult_boolLightningErrorZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_boolLightningErrorZ handle_channel_announcement_jcall(const void* this_arg, const LDKChannelAnnouncement *msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->handle_channel_announcement_meth, msg);
	LDKCResult_boolLightningErrorZ res = *ret;
	FREE(ret);
	return res;
}
LDKCResult_boolLightningErrorZ handle_channel_update_jcall(const void* this_arg, const LDKChannelUpdate *msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->handle_channel_update_meth, msg);
	LDKCResult_boolLightningErrorZ res = *ret;
	FREE(ret);
	return res;
}
void handle_htlc_fail_channel_update_jcall(const void* this_arg, const LDKHTLCFailChannelUpdate *update) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->handle_htlc_fail_channel_update_meth, update);
}
LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ get_next_channel_announcements_jcall(const void* this_arg, uint64_t starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ* ret = (LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_next_channel_announcements_meth, starting_point, batch_amount);
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ res = *ret;
	FREE(ret);
	return res;
}
LDKCVec_NodeAnnouncementZ get_next_node_announcements_jcall(const void* this_arg, LDKPublicKey starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long starting_point_ref = (long)&starting_point;
	LDKCVec_NodeAnnouncementZ* ret = (LDKCVec_NodeAnnouncementZ*)(*env)->CallLongMethod(env, j_calls->o, j_calls->get_next_node_announcements_meth, starting_point_ref, batch_amount);
	LDKCVec_NodeAnnouncementZ res = *ret;
	FREE(ret);
	return res;
}
bool should_request_full_sync_jcall(const void* this_arg, LDKPublicKey node_id) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long node_id_ref = (long)&node_id;
	return (*env)->CallBooleanMethod(env, j_calls->o, j_calls->should_request_full_sync_meth, node_id_ref);
}
static void LDKRoutingMessageHandler_JCalls_free(void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKRoutingMessageHandler_JCalls *calls = MALLOC(sizeof(LDKRoutingMessageHandler_JCalls), "LDKRoutingMessageHandler_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->handle_node_announcement_meth = (*env)->GetMethodID(env, c, "handle_node_announcement", "(J)J");
	DO_ASSERT(calls->handle_node_announcement_meth != NULL);
	calls->handle_channel_announcement_meth = (*env)->GetMethodID(env, c, "handle_channel_announcement", "(J)J");
	DO_ASSERT(calls->handle_channel_announcement_meth != NULL);
	calls->handle_channel_update_meth = (*env)->GetMethodID(env, c, "handle_channel_update", "(J)J");
	DO_ASSERT(calls->handle_channel_update_meth != NULL);
	calls->handle_htlc_fail_channel_update_meth = (*env)->GetMethodID(env, c, "handle_htlc_fail_channel_update", "(J)V");
	DO_ASSERT(calls->handle_htlc_fail_channel_update_meth != NULL);
	calls->get_next_channel_announcements_meth = (*env)->GetMethodID(env, c, "get_next_channel_announcements", "(JB)J");
	DO_ASSERT(calls->get_next_channel_announcements_meth != NULL);
	calls->get_next_node_announcements_meth = (*env)->GetMethodID(env, c, "get_next_node_announcements", "(JB)J");
	DO_ASSERT(calls->get_next_node_announcements_meth != NULL);
	calls->should_request_full_sync_meth = (*env)->GetMethodID(env, c, "should_request_full_sync", "(J)Z");
	DO_ASSERT(calls->should_request_full_sync_meth != NULL);

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
	return ((LDKRoutingMessageHandler_JCalls*)val)->o;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1call_1handle_1node_1announcement(JNIEnv * _env, jclass _b, jlong arg, jlong msg) {
	LDKRoutingMessageHandler* arg_conv = (LDKRoutingMessageHandler*)arg;
	LDKNodeAnnouncement* msg_conv = (LDKNodeAnnouncement*)msg;
	LDKCResult_boolLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret = (arg_conv->handle_node_announcement)(arg_conv->this_arg, msg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1call_1handle_1channel_1announcement(JNIEnv * _env, jclass _b, jlong arg, jlong msg) {
	LDKRoutingMessageHandler* arg_conv = (LDKRoutingMessageHandler*)arg;
	LDKChannelAnnouncement* msg_conv = (LDKChannelAnnouncement*)msg;
	LDKCResult_boolLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret = (arg_conv->handle_channel_announcement)(arg_conv->this_arg, msg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1call_1handle_1channel_1update(JNIEnv * _env, jclass _b, jlong arg, jlong msg) {
	LDKRoutingMessageHandler* arg_conv = (LDKRoutingMessageHandler*)arg;
	LDKChannelUpdate* msg_conv = (LDKChannelUpdate*)msg;
	LDKCResult_boolLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_boolLightningErrorZ), "LDKCResult_boolLightningErrorZ");
	*ret = (arg_conv->handle_channel_update)(arg_conv->this_arg, msg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1call_1handle_1htlc_1fail_1channel_1update(JNIEnv * _env, jclass _b, jlong arg, jlong update) {
	LDKRoutingMessageHandler* arg_conv = (LDKRoutingMessageHandler*)arg;
	LDKHTLCFailChannelUpdate* update_conv = (LDKHTLCFailChannelUpdate*)update;
	return (arg_conv->handle_htlc_fail_channel_update)(arg_conv->this_arg, update_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1call_1get_1next_1channel_1announcements(JNIEnv * _env, jclass _b, jlong arg, jlong starting_point, jbyte batch_amount) {
	LDKRoutingMessageHandler* arg_conv = (LDKRoutingMessageHandler*)arg;
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ* ret = MALLOC(sizeof(LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ), "LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ");
	*ret = (arg_conv->get_next_channel_announcements)(arg_conv->this_arg, starting_point, batch_amount);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1call_1get_1next_1node_1announcements(JNIEnv * _env, jclass _b, jlong arg, jlong starting_point, jbyte batch_amount) {
	LDKRoutingMessageHandler* arg_conv = (LDKRoutingMessageHandler*)arg;
	LDKPublicKey starting_point_conv = *(LDKPublicKey*)starting_point;
	FREE((void*)starting_point);
	LDKCVec_NodeAnnouncementZ* ret = MALLOC(sizeof(LDKCVec_NodeAnnouncementZ), "LDKCVec_NodeAnnouncementZ");
	*ret = (arg_conv->get_next_node_announcements)(arg_conv->this_arg, starting_point_conv, batch_amount);
	return (long)ret;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1call_1should_1request_1full_1sync(JNIEnv * _env, jclass _b, jlong arg, jlong node_id) {
	LDKRoutingMessageHandler* arg_conv = (LDKRoutingMessageHandler*)arg;
	LDKPublicKey node_id_conv = *(LDKPublicKey*)node_id;
	FREE((void*)node_id);
	return (arg_conv->should_request_full_sync)(arg_conv->this_arg, node_id_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKMessageHandler_1optional_1none (JNIEnv * env, jclass _a) {
	LDKMessageHandler *ret = MALLOC(sizeof(LDKMessageHandler), "LDKMessageHandler");
	ret->inner = NULL;
	return (long)ret;
}
typedef struct LDKSocketDescriptor_JCalls {
	atomic_size_t refcnt;
	JavaVM *vm;
	jobject o;
	jmethodID send_data_meth;
	jmethodID disconnect_socket_meth;
	jmethodID eq_meth;
	jmethodID hash_meth;
} LDKSocketDescriptor_JCalls;
uintptr_t send_data_jcall(void* this_arg, LDKu8slice data, bool resume_read) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	long data_ref = (long)&data;
	return (*env)->CallLongMethod(env, j_calls->o, j_calls->send_data_meth, data_ref, resume_read);
}
void disconnect_socket_jcall(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	return (*env)->CallVoidMethod(env, j_calls->o, j_calls->disconnect_socket_meth);
}
bool eq_jcall(const void* this_arg, const void *other_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	return (*env)->CallBooleanMethod(env, j_calls->o, j_calls->eq_meth, other_arg);
}
uint64_t hash_jcall(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	JNIEnv *env;
	DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
	return (*env)->CallLongMethod(env, j_calls->o, j_calls->hash_meth);
}
static void LDKSocketDescriptor_JCalls_free(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		JNIEnv *env;
		DO_ASSERT((*j_calls->vm)->GetEnv(j_calls->vm, (void**)&env, JNI_VERSION_1_8) == JNI_OK);
		(*env)->DeleteGlobalRef(env, j_calls->o);
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
	DO_ASSERT(c != NULL);
	LDKSocketDescriptor_JCalls *calls = MALLOC(sizeof(LDKSocketDescriptor_JCalls), "LDKSocketDescriptor_JCalls");
	atomic_init(&calls->refcnt, 1);
	DO_ASSERT((*env)->GetJavaVM(env, &calls->vm) == 0);
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->send_data_meth = (*env)->GetMethodID(env, c, "send_data", "(JZ)J");
	DO_ASSERT(calls->send_data_meth != NULL);
	calls->disconnect_socket_meth = (*env)->GetMethodID(env, c, "disconnect_socket", "()V");
	DO_ASSERT(calls->disconnect_socket_meth != NULL);
	calls->eq_meth = (*env)->GetMethodID(env, c, "eq", "(J)Z");
	DO_ASSERT(calls->eq_meth != NULL);
	calls->hash_meth = (*env)->GetMethodID(env, c, "hash", "()J");
	DO_ASSERT(calls->hash_meth != NULL);

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
	return ((LDKSocketDescriptor_JCalls*)val)->o;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKSocketDescriptor_1call_1send_1data(JNIEnv * _env, jclass _b, jlong arg, jlong data, jboolean resume_read) {
	LDKSocketDescriptor* arg_conv = (LDKSocketDescriptor*)arg;
	LDKu8slice data_conv = *(LDKu8slice*)data;
	return (arg_conv->send_data)(arg_conv->this_arg, data_conv, resume_read);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LDKSocketDescriptor_1call_1disconnect_1socket(JNIEnv * _env, jclass _b, jlong arg) {
	LDKSocketDescriptor* arg_conv = (LDKSocketDescriptor*)arg;
	return (arg_conv->disconnect_socket)(arg_conv->this_arg);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKSocketDescriptor_1call_1hash(JNIEnv * _env, jclass _b, jlong arg) {
	LDKSocketDescriptor* arg_conv = (LDKSocketDescriptor*)arg;
	return (arg_conv->hash)(arg_conv->this_arg);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKPeerManager_1optional_1none (JNIEnv * env, jclass _a) {
	LDKPeerManager *ret = MALLOC(sizeof(LDKPeerManager), "LDKPeerManager");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1PublicKey_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_PublicKey *vec = (LDKCVecTempl_PublicKey*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKPublicKey));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1PublicKey_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_PublicKey *ret = MALLOC(sizeof(LDKCVecTempl_PublicKey), "LDKCVecTempl_PublicKey");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKPublicKey) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKPublicKey arr_elem_conv = *(LDKPublicKey*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1CVec_1u8ZPeerHandleErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg)->contents.err;
	}
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolPeerHandleErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_boolPeerHandleErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1boolPeerHandleErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_boolPeerHandleErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_boolPeerHandleErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_boolPeerHandleErrorZ*)arg)->contents.err;
	}
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SecretKeySecpErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_SecretKeySecpErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1SecretKeySecpErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_SecretKeySecpErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_SecretKeySecpErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_SecretKeySecpErrorZ*)arg)->contents.err;
	}
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PublicKeySecpErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_PublicKeySecpErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1PublicKeySecpErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_PublicKeySecpErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_PublicKeySecpErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_PublicKeySecpErrorZ*)arg)->contents.err;
	}
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKTxCreationKeys_1optional_1none (JNIEnv * env, jclass _a) {
	LDKTxCreationKeys *ret = MALLOC(sizeof(LDKTxCreationKeys), "LDKTxCreationKeys");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxCreationKeysSecpErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_TxCreationKeysSecpErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1TxCreationKeysSecpErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_TxCreationKeysSecpErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_TxCreationKeysSecpErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_TxCreationKeysSecpErrorZ*)arg)->contents.err;
	}
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
		ret->data = malloc(sizeof(LDKC2TupleTempl_HTLCOutputInCommitment__Signature) * ret->datalen); // often freed by rust directly
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
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRouteHop_1optional_1none (JNIEnv * env, jclass _a) {
	LDKRouteHop *ret = MALLOC(sizeof(LDKRouteHop), "LDKRouteHop");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1RouteHop_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_RouteHop *vec = (LDKCVecTempl_RouteHop*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKRouteHop));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1RouteHop_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_RouteHop *ret = MALLOC(sizeof(LDKCVecTempl_RouteHop), "LDKCVecTempl_RouteHop");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKRouteHop) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKRouteHop arr_elem_conv = *(LDKRouteHop*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
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
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1CVecTempl_1RouteHop_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_CVecTempl_RouteHop *ret = MALLOC(sizeof(LDKCVecTempl_CVecTempl_RouteHop), "LDKCVecTempl_CVecTempl_RouteHop");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKCVecTempl_RouteHop) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKCVecTempl_RouteHop arr_elem_conv = *(LDKCVecTempl_RouteHop*)arr_elem;
			FREE((void*)arr_elem);
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRouteHint_1optional_1none (JNIEnv * env, jclass _a) {
	LDKRouteHint *ret = MALLOC(sizeof(LDKRouteHint), "LDKRouteHint");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKRoutingFees_1optional_1none (JNIEnv * env, jclass _a) {
	LDKRoutingFees *ret = MALLOC(sizeof(LDKRoutingFees), "LDKRoutingFees");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteLightningErrorZ_1result_1ok (JNIEnv * env, jclass _a, jlong arg) {
	return ((LDKCResult_RouteLightningErrorZ*)arg)->result_ok;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCResult_1RouteLightningErrorZ_1get_1inner (JNIEnv * env, jclass _a, jlong arg) {
	if (((LDKCResult_RouteLightningErrorZ*)arg)->result_ok) {
		return (long)((LDKCResult_RouteLightningErrorZ*)arg)->contents.result;
	} else {
		return (long)((LDKCResult_RouteLightningErrorZ*)arg)->contents.err;
	}
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKNetworkGraph_1optional_1none (JNIEnv * env, jclass _a) {
	LDKNetworkGraph *ret = MALLOC(sizeof(LDKNetworkGraph), "LDKNetworkGraph");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jobject JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1RouteHint_1arr_1info(JNIEnv *env, jclass _b, jlong ptr) {
	LDKCVecTempl_RouteHint *vec = (LDKCVecTempl_RouteHint*)ptr;
	return (*env)->NewObject(env, slicedef_cls, slicedef_meth, (long)vec->data, (long)vec->datalen, sizeof(LDKRouteHint));
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKCVecTempl_1RouteHint_1new(JNIEnv *env, jclass _b, jlongArray elems){
	LDKCVecTempl_RouteHint *ret = MALLOC(sizeof(LDKCVecTempl_RouteHint), "LDKCVecTempl_RouteHint");
	ret->datalen = (*env)->GetArrayLength(env, elems);
	if (ret->datalen == 0) {
		ret->data = NULL;
	} else {
		ret->data = malloc(sizeof(LDKRouteHint) * ret->datalen); // often freed by rust directly
		jlong *java_elems = (*env)->GetPrimitiveArrayCritical(env, elems, NULL);
		for (size_t i = 0; i < ret->datalen; i++) {
			jlong arr_elem = java_elems[i];
			LDKRouteHint arr_elem_conv = *(LDKRouteHint*)arr_elem;
			FREE((void*)arr_elem);
			arr_elem_conv.is_owned = true;
			ret->data[i] = arr_elem_conv;
		}
		(*env)->ReleasePrimitiveArrayCritical(env, elems, java_elems, 0);
	}
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKLockedNetworkGraph_1optional_1none (JNIEnv * env, jclass _a) {
	LDKLockedNetworkGraph *ret = MALLOC(sizeof(LDKLockedNetworkGraph), "LDKLockedNetworkGraph");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKNetGraphMsgHandler_1optional_1none (JNIEnv * env, jclass _a) {
	LDKNetGraphMsgHandler *ret = MALLOC(sizeof(LDKNetGraphMsgHandler), "LDKNetGraphMsgHandler");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKDirectionalChannelInfo_1optional_1none (JNIEnv * env, jclass _a) {
	LDKDirectionalChannelInfo *ret = MALLOC(sizeof(LDKDirectionalChannelInfo), "LDKDirectionalChannelInfo");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKChannelInfo_1optional_1none (JNIEnv * env, jclass _a) {
	LDKChannelInfo *ret = MALLOC(sizeof(LDKChannelInfo), "LDKChannelInfo");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKNodeAnnouncementInfo_1optional_1none (JNIEnv * env, jclass _a) {
	LDKNodeAnnouncementInfo *ret = MALLOC(sizeof(LDKNodeAnnouncementInfo), "LDKNodeAnnouncementInfo");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LDKNodeInfo_1optional_1none (JNIEnv * env, jclass _a) {
	LDKNodeInfo *ret = MALLOC(sizeof(LDKNodeInfo), "LDKNodeInfo");
	ret->inner = NULL;
	return (long)ret;
}
JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1HTLCOutputInCommitmentSignatureZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_HTLCOutputInCommitmentSignatureZ arg_conv = *(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ*)arg;
	FREE((void*)arg);
	return C2Tuple_HTLCOutputInCommitmentSignatureZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1OutPointScriptZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_OutPointScriptZ arg_conv = *(LDKC2Tuple_OutPointScriptZ*)arg;
	FREE((void*)arg);
	return C2Tuple_OutPointScriptZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1SignatureCVec_1SignatureZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_SignatureCVec_SignatureZZ arg_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)arg;
	FREE((void*)arg);
	return C2Tuple_SignatureCVec_SignatureZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1TxidCVec_1TxOutZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_TxidCVec_TxOutZZ arg_conv = *(LDKC2Tuple_TxidCVec_TxOutZZ*)arg;
	FREE((void*)arg);
	return C2Tuple_TxidCVec_TxOutZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u64u64Z_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_u64u64Z arg_conv = *(LDKC2Tuple_u64u64Z*)arg;
	FREE((void*)arg);
	return C2Tuple_u64u64Z_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1usizeTransactionZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_usizeTransactionZ arg_conv = *(LDKC2Tuple_usizeTransactionZ*)arg;
	FREE((void*)arg);
	return C2Tuple_usizeTransactionZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arg_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arg;
	FREE((void*)arg);
	return C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ arg_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	FREE((void*)arg);
	return CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(arg_conv);
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
	return CResult_CVec_SignatureZNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_SignatureZ arg_conv = *(LDKCVec_SignatureZ*)arg;
	FREE((void*)arg);
	LDKCResult_CVec_SignatureZNoneZ* ret = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret = CResult_CVec_SignatureZNoneZ_ok(arg_conv);
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
	return CResult_CVec_u8ZPeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_u8Z arg_conv = *(LDKCVec_u8Z*)arg;
	FREE((void*)arg);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret = CResult_CVec_u8ZPeerHandleErrorZ_ok(arg_conv);
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
	return CResult_NoneAPIErrorZ_free(arg_conv);
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
	return CResult_NoneChannelMonitorUpdateErrZ_free(arg_conv);
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
	return CResult_NoneMonitorUpdateErrorZ_free(arg_conv);
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
	return CResult_NonePaymentSendFailureZ_free(arg_conv);
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
	return CResult_NonePeerHandleErrorZ_free(arg_conv);
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
	return CResult_PublicKeySecpErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1PublicKeySecpErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPublicKey arg_conv = *(LDKPublicKey*)arg;
	FREE((void*)arg);
	LDKCResult_PublicKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret = CResult_PublicKeySecpErrorZ_ok(arg_conv);
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
	return CResult_RouteLightningErrorZ_free(arg_conv);
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
	return CResult_SecretKeySecpErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1SecretKeySecpErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKSecretKey arg_conv = *(LDKSecretKey*)arg;
	FREE((void*)arg);
	LDKCResult_SecretKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret = CResult_SecretKeySecpErrorZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_SignatureNoneZ arg_conv = *(LDKCResult_SignatureNoneZ*)arg;
	FREE((void*)arg);
	return CResult_SignatureNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKSignature arg_conv = *(LDKSignature*)arg;
	FREE((void*)arg);
	LDKCResult_SignatureNoneZ* ret = MALLOC(sizeof(LDKCResult_SignatureNoneZ), "LDKCResult_SignatureNoneZ");
	*ret = CResult_SignatureNoneZ_ok(arg_conv);
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
	return CResult_TxCreationKeysSecpErrorZ_free(arg_conv);
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
	return CResult_TxOutAccessErrorZ_free(arg_conv);
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
	return CResult_boolLightningErrorZ_free(arg_conv);
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
	return CResult_boolPeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1ok(JNIEnv * _env, jclass _b, jboolean arg) {
	LDKCResult_boolPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret = CResult_boolPeerHandleErrorZ_ok(arg);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1HTLCOutputInCommitmentSignatureZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ arg_conv = *(LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ*)arg;
	FREE((void*)arg);
	return CVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1TxidCVec_1TxOutZZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_C2Tuple_TxidCVec_TxOutZZZ arg_conv = *(LDKCVec_C2Tuple_TxidCVec_TxOutZZZ*)arg;
	FREE((void*)arg);
	return CVec_C2Tuple_TxidCVec_TxOutZZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1usizeTransactionZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_C2Tuple_usizeTransactionZZ arg_conv = *(LDKCVec_C2Tuple_usizeTransactionZZ*)arg;
	FREE((void*)arg);
	return CVec_C2Tuple_usizeTransactionZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ arg_conv = *(LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ*)arg;
	FREE((void*)arg);
	return CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1CVec_1RouteHopZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_CVec_RouteHopZZ arg_conv = *(LDKCVec_CVec_RouteHopZZ*)arg;
	FREE((void*)arg);
	return CVec_CVec_RouteHopZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1ChannelDetailsZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_ChannelDetailsZ arg_conv = *(LDKCVec_ChannelDetailsZ*)arg;
	FREE((void*)arg);
	return CVec_ChannelDetailsZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1ChannelMonitorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_ChannelMonitorZ arg_conv = *(LDKCVec_ChannelMonitorZ*)arg;
	FREE((void*)arg);
	return CVec_ChannelMonitorZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1EventZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_EventZ arg_conv = *(LDKCVec_EventZ*)arg;
	FREE((void*)arg);
	return CVec_EventZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1HTLCOutputInCommitmentZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_HTLCOutputInCommitmentZ arg_conv = *(LDKCVec_HTLCOutputInCommitmentZ*)arg;
	FREE((void*)arg);
	return CVec_HTLCOutputInCommitmentZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1MessageSendEventZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_MessageSendEventZ arg_conv = *(LDKCVec_MessageSendEventZ*)arg;
	FREE((void*)arg);
	return CVec_MessageSendEventZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1MonitorEventZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_MonitorEventZ arg_conv = *(LDKCVec_MonitorEventZ*)arg;
	FREE((void*)arg);
	return CVec_MonitorEventZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1NetAddressZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_NetAddressZ arg_conv = *(LDKCVec_NetAddressZ*)arg;
	FREE((void*)arg);
	return CVec_NetAddressZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1NodeAnnouncementZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_NodeAnnouncementZ arg_conv = *(LDKCVec_NodeAnnouncementZ*)arg;
	FREE((void*)arg);
	return CVec_NodeAnnouncementZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1PublicKeyZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_PublicKeyZ arg_conv = *(LDKCVec_PublicKeyZ*)arg;
	FREE((void*)arg);
	return CVec_PublicKeyZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1RouteHintZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_RouteHintZ arg_conv = *(LDKCVec_RouteHintZ*)arg;
	FREE((void*)arg);
	return CVec_RouteHintZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1RouteHopZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_RouteHopZ arg_conv = *(LDKCVec_RouteHopZ*)arg;
	FREE((void*)arg);
	return CVec_RouteHopZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1SignatureZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_SignatureZ arg_conv = *(LDKCVec_SignatureZ*)arg;
	FREE((void*)arg);
	return CVec_SignatureZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1SpendableOutputDescriptorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_SpendableOutputDescriptorZ arg_conv = *(LDKCVec_SpendableOutputDescriptorZ*)arg;
	FREE((void*)arg);
	return CVec_SpendableOutputDescriptorZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1TransactionZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_TransactionZ arg_conv = *(LDKCVec_TransactionZ*)arg;
	FREE((void*)arg);
	return CVec_TransactionZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1TxOutZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_TxOutZ arg_conv = *(LDKCVec_TxOutZ*)arg;
	FREE((void*)arg);
	return CVec_TxOutZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateAddHTLCZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateAddHTLCZ arg_conv = *(LDKCVec_UpdateAddHTLCZ*)arg;
	FREE((void*)arg);
	return CVec_UpdateAddHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFailHTLCZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateFailHTLCZ arg_conv = *(LDKCVec_UpdateFailHTLCZ*)arg;
	FREE((void*)arg);
	return CVec_UpdateFailHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFailMalformedHTLCZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateFailMalformedHTLCZ arg_conv = *(LDKCVec_UpdateFailMalformedHTLCZ*)arg;
	FREE((void*)arg);
	return CVec_UpdateFailMalformedHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFulfillHTLCZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateFulfillHTLCZ arg_conv = *(LDKCVec_UpdateFulfillHTLCZ*)arg;
	FREE((void*)arg);
	return CVec_UpdateFulfillHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1u64Z_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_u64Z arg_conv = *(LDKCVec_u64Z*)arg;
	FREE((void*)arg);
	return CVec_u64Z_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1u8Z_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_u8Z arg_conv = *(LDKCVec_u8Z*)arg;
	FREE((void*)arg);
	return CVec_u8Z_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Transaction_1free(JNIEnv * _env, jclass _b, jlong _res) {
	LDKTransaction _res_conv = *(LDKTransaction*)_res;
	FREE((void*)_res);
	return Transaction_free(_res_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxOut_1free(JNIEnv * _env, jclass _b, jlong _res) {
	LDKTxOut _res_conv = *(LDKTxOut*)_res;
	FREE((void*)_res);
	return TxOut_free(_res_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1usizeTransactionZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKTransaction b_conv = *(LDKTransaction*)b;
	FREE((void*)b);
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

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1OutPointScriptZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKOutPoint a_conv = *(LDKOutPoint*)a;
	FREE((void*)a);
	a_conv.is_owned = true;
	LDKCVec_u8Z b_conv = *(LDKCVec_u8Z*)b;
	FREE((void*)b);
	LDKC2Tuple_OutPointScriptZ* ret = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret = C2Tuple_OutPointScriptZ_new(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1TxidCVec_1TxOutZZ_1new(JNIEnv * _env, jclass _b, jbyteArray a, jlong b) {
	LDKThirtyTwoBytes a_ref;
	(*_env)->GetByteArrayRegion (_env, a, 0, 32, a_ref.data);
	LDKCVec_TxOutZ b_conv = *(LDKCVec_TxOutZ*)b;
	FREE((void*)b);
	LDKC2Tuple_TxidCVec_TxOutZZ* ret = MALLOC(sizeof(LDKC2Tuple_TxidCVec_TxOutZZ), "LDKC2Tuple_TxidCVec_TxOutZZ");
	*ret = C2Tuple_TxidCVec_TxOutZZ_new(a_ref, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u64u64Z_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKC2Tuple_u64u64Z* ret = MALLOC(sizeof(LDKC2Tuple_u64u64Z), "LDKC2Tuple_u64u64Z");
	*ret = C2Tuple_u64u64Z_new(a, b);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1SignatureCVec_1SignatureZZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKSignature a_conv = *(LDKSignature*)a;
	FREE((void*)a);
	LDKCVec_SignatureZ b_conv = *(LDKCVec_SignatureZ*)b;
	FREE((void*)b);
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret = MALLOC(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ), "LDKC2Tuple_SignatureCVec_SignatureZZ");
	*ret = C2Tuple_SignatureCVec_SignatureZZ_new(a_conv, b_conv);
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
	LDKChannelAnnouncement a_conv = *(LDKChannelAnnouncement*)a;
	FREE((void*)a);
	a_conv.is_owned = true;
	LDKChannelUpdate b_conv = *(LDKChannelUpdate*)b;
	FREE((void*)b);
	b_conv.is_owned = true;
	LDKChannelUpdate c_conv = *(LDKChannelUpdate*)c;
	FREE((void*)c);
	c_conv.is_owned = true;
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret = MALLOC(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ), "LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ");
	*ret = C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a_conv, b_conv, c_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NonePeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret = CResult_NonePeerHandleErrorZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1HTLCOutputInCommitmentSignatureZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKHTLCOutputInCommitment a_conv = *(LDKHTLCOutputInCommitment*)a;
	FREE((void*)a);
	a_conv.is_owned = true;
	LDKSignature b_conv = *(LDKSignature*)b;
	FREE((void*)b);
	LDKC2Tuple_HTLCOutputInCommitmentSignatureZ* ret = MALLOC(sizeof(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ), "LDKC2Tuple_HTLCOutputInCommitmentSignatureZ");
	*ret = C2Tuple_HTLCOutputInCommitmentSignatureZ_new(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Event_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKEvent this_ptr_conv = *(LDKEvent*)this_ptr;
	FREE((void*)this_ptr);
	return Event_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageSendEvent_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageSendEvent this_ptr_conv = *(LDKMessageSendEvent*)this_ptr;
	FREE((void*)this_ptr);
	return MessageSendEvent_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageSendEventsProvider_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageSendEventsProvider this_ptr_conv = *(LDKMessageSendEventsProvider*)this_ptr;
	FREE((void*)this_ptr);
	return MessageSendEventsProvider_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_EventsProvider_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKEventsProvider this_ptr_conv = *(LDKEventsProvider*)this_ptr;
	FREE((void*)this_ptr);
	return EventsProvider_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_APIError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAPIError this_ptr_conv = *(LDKAPIError*)this_ptr;
	FREE((void*)this_ptr);
	return APIError_free(this_ptr_conv);
}

JNIEXPORT jclass JNICALL Java_org_ldk_impl_bindings_Level_1max(JNIEnv * _env, jclass _b) {
	jclass ret = LDKLevel_to_java(_env, Level_max());
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Logger_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLogger this_ptr_conv = *(LDKLogger*)this_ptr;
	FREE((void*)this_ptr);
	return Logger_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv = *(LDKChannelHandshakeConfig*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelHandshakeConfig_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1get_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_get_minimum_depth(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1set_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_set_minimum_depth(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1get_1our_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_get_our_to_self_delay(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1set_1our_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_set_our_to_self_delay(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1get_1our_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_get_our_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1set_1our_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_set_our_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1new(JNIEnv * _env, jclass _b, jint minimum_depth_arg, jshort our_to_self_delay_arg, jlong our_htlc_minimum_msat_arg) {
	LDKChannelHandshakeConfig* ret = MALLOC(sizeof(LDKChannelHandshakeConfig), "LDKChannelHandshakeConfig");
	*ret = ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1default(JNIEnv * _env, jclass _b) {
	LDKChannelHandshakeConfig* ret = MALLOC(sizeof(LDKChannelHandshakeConfig), "LDKChannelHandshakeConfig");
	*ret = ChannelHandshakeConfig_default();
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv = *(LDKChannelHandshakeLimits*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelHandshakeLimits_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1funding_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_min_funding_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1funding_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_min_funding_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_max_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_max_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_max_channel_reserve_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_max_channel_reserve_satoshis(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_min_max_accepted_htlcs(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_min_max_accepted_htlcs(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1min_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_min_dust_limit_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1min_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_min_dust_limit_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_max_dust_limit_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_max_dust_limit_satoshis(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1max_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_max_minimum_depth(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1max_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_max_minimum_depth(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1force_1announced_1channel_1preference(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_force_announced_channel_preference(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1force_1announced_1channel_1preference(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_force_announced_channel_preference(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1get_1their_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_their_to_self_delay(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1set_1their_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_their_to_self_delay(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1new(JNIEnv * _env, jclass _b, jlong min_funding_satoshis_arg, jlong max_htlc_minimum_msat_arg, jlong min_max_htlc_value_in_flight_msat_arg, jlong max_channel_reserve_satoshis_arg, jshort min_max_accepted_htlcs_arg, jlong min_dust_limit_satoshis_arg, jlong max_dust_limit_satoshis_arg, jint max_minimum_depth_arg, jboolean force_announced_channel_preference_arg, jshort their_to_self_delay_arg) {
	LDKChannelHandshakeLimits* ret = MALLOC(sizeof(LDKChannelHandshakeLimits), "LDKChannelHandshakeLimits");
	*ret = ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1default(JNIEnv * _env, jclass _b) {
	LDKChannelHandshakeLimits* ret = MALLOC(sizeof(LDKChannelHandshakeLimits), "LDKChannelHandshakeLimits");
	*ret = ChannelHandshakeLimits_default();
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig this_ptr_conv = *(LDKChannelConfig*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelConfig_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1get_1fee_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_get_fee_proportional_millionths(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1set_1fee_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_set_fee_proportional_millionths(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1get_1announced_1channel(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_get_announced_channel(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1set_1announced_1channel(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_set_announced_channel(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1get_1commit_1upfront_1shutdown_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_get_commit_upfront_shutdown_pubkey(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1set_1commit_1upfront_1shutdown_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_set_commit_upfront_shutdown_pubkey(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1new(JNIEnv * _env, jclass _b, jint fee_proportional_millionths_arg, jboolean announced_channel_arg, jboolean commit_upfront_shutdown_pubkey_arg) {
	LDKChannelConfig* ret = MALLOC(sizeof(LDKChannelConfig), "LDKChannelConfig");
	*ret = ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1default(JNIEnv * _env, jclass _b) {
	LDKChannelConfig* ret = MALLOC(sizeof(LDKChannelConfig), "LDKChannelConfig");
	*ret = ChannelConfig_default();
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelConfig* obj_conv = (LDKChannelConfig*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ChannelConfig_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelConfig* ret = MALLOC(sizeof(LDKChannelConfig), "LDKChannelConfig");
	*ret = ChannelConfig_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig this_ptr_conv = *(LDKUserConfig*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return UserConfig_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1own_1channel_1config(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeConfig* ret = MALLOC(sizeof(LDKChannelHandshakeConfig), "LDKChannelHandshakeConfig");
	*ret = UserConfig_get_own_channel_config(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1own_1channel_1config(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeConfig val_conv = *(LDKChannelHandshakeConfig*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return UserConfig_set_own_channel_config(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1peer_1channel_1config_1limits(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeLimits* ret = MALLOC(sizeof(LDKChannelHandshakeLimits), "LDKChannelHandshakeLimits");
	*ret = UserConfig_get_peer_channel_config_limits(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1peer_1channel_1config_1limits(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeLimits val_conv = *(LDKChannelHandshakeLimits*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return UserConfig_set_peer_channel_config_limits(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1channel_1options(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelConfig* ret = MALLOC(sizeof(LDKChannelConfig), "LDKChannelConfig");
	*ret = UserConfig_get_channel_options(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1channel_1options(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelConfig val_conv = *(LDKChannelConfig*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return UserConfig_set_channel_options(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1new(JNIEnv * _env, jclass _b, jlong own_channel_config_arg, jlong peer_channel_config_limits_arg, jlong channel_options_arg) {
	LDKChannelHandshakeConfig own_channel_config_arg_conv = *(LDKChannelHandshakeConfig*)own_channel_config_arg;
	FREE((void*)own_channel_config_arg);
	own_channel_config_arg_conv.is_owned = true;
	LDKChannelHandshakeLimits peer_channel_config_limits_arg_conv = *(LDKChannelHandshakeLimits*)peer_channel_config_limits_arg;
	FREE((void*)peer_channel_config_limits_arg);
	peer_channel_config_limits_arg_conv.is_owned = true;
	LDKChannelConfig channel_options_arg_conv = *(LDKChannelConfig*)channel_options_arg;
	FREE((void*)channel_options_arg);
	channel_options_arg_conv.is_owned = true;
	LDKUserConfig* ret = MALLOC(sizeof(LDKUserConfig), "LDKUserConfig");
	*ret = UserConfig_new(own_channel_config_arg_conv, peer_channel_config_limits_arg_conv, channel_options_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1default(JNIEnv * _env, jclass _b) {
	LDKUserConfig* ret = MALLOC(sizeof(LDKUserConfig), "LDKUserConfig");
	*ret = UserConfig_default();
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Access_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAccess this_ptr_conv = *(LDKAccess*)this_ptr;
	FREE((void*)this_ptr);
	return Access_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Watch_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKWatch this_ptr_conv = *(LDKWatch*)this_ptr;
	FREE((void*)this_ptr);
	return Watch_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Filter_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFilter this_ptr_conv = *(LDKFilter*)this_ptr;
	FREE((void*)this_ptr);
	return Filter_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BroadcasterInterface_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKBroadcasterInterface this_ptr_conv = *(LDKBroadcasterInterface*)this_ptr;
	FREE((void*)this_ptr);
	return BroadcasterInterface_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FeeEstimator_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFeeEstimator this_ptr_conv = *(LDKFeeEstimator*)this_ptr;
	FREE((void*)this_ptr);
	return FeeEstimator_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainMonitor this_ptr_conv = *(LDKChainMonitor*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChainMonitor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1block_1connected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jlong txdata, jint height) {
	LDKChainMonitor* this_arg_conv = (LDKChainMonitor*)this_arg;
	unsigned char header_arr[80];
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_conv = *(LDKCVec_C2Tuple_usizeTransactionZZ*)txdata;
	FREE((void*)txdata);
	return ChainMonitor_block_connected(this_arg_conv, header_ref, txdata_conv, height);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1block_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jint disconnected_height) {
	LDKChainMonitor* this_arg_conv = (LDKChainMonitor*)this_arg;
	unsigned char header_arr[80];
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	return ChainMonitor_block_disconnected(this_arg_conv, header_ref, disconnected_height);
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
	LDKChainMonitor* ret = MALLOC(sizeof(LDKChainMonitor), "LDKChainMonitor");
	*ret = ChainMonitor_new(chain_source_conv, broadcaster_conv, logger_conv, feeest_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1as_1Watch(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChainMonitor* this_arg_conv = (LDKChainMonitor*)this_arg;
	LDKWatch* ret = MALLOC(sizeof(LDKWatch), "LDKWatch");
	*ret = ChainMonitor_as_Watch(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChainMonitor_1as_1EventsProvider(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChainMonitor* this_arg_conv = (LDKChainMonitor*)this_arg;
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChainMonitor_as_EventsProvider(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv = *(LDKChannelMonitorUpdate*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelMonitorUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1get_1update_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitorUpdate* this_ptr_conv = (LDKChannelMonitorUpdate*)this_ptr;
	return ChannelMonitorUpdate_get_update_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1set_1update_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelMonitorUpdate* this_ptr_conv = (LDKChannelMonitorUpdate*)this_ptr;
	return ChannelMonitorUpdate_set_update_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelMonitorUpdate* obj_conv = (LDKChannelMonitorUpdate*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ChannelMonitorUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelMonitorUpdate* ret = MALLOC(sizeof(LDKChannelMonitorUpdate), "LDKChannelMonitorUpdate");
	*ret = ChannelMonitorUpdate_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MonitorUpdateError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMonitorUpdateError this_ptr_conv = *(LDKMonitorUpdateError*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return MonitorUpdateError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MonitorEvent_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMonitorEvent this_ptr_conv = *(LDKMonitorEvent*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return MonitorEvent_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCUpdate this_ptr_conv = *(LDKHTLCUpdate*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return HTLCUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHTLCUpdate* obj_conv = (LDKHTLCUpdate*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = HTLCUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKHTLCUpdate* ret = MALLOC(sizeof(LDKHTLCUpdate), "LDKHTLCUpdate");
	*ret = HTLCUpdate_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitor this_ptr_conv = *(LDKChannelMonitor*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelMonitor_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1update_1monitor(JNIEnv * _env, jclass _b, jlong this_arg, jlong updates, jlong broadcaster, jlong logger) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKChannelMonitorUpdate updates_conv = *(LDKChannelMonitorUpdate*)updates;
	FREE((void*)updates);
	updates_conv.is_owned = true;
	LDKBroadcasterInterface* broadcaster_conv = (LDKBroadcasterInterface*)broadcaster;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCResult_NoneMonitorUpdateErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneMonitorUpdateErrorZ), "LDKCResult_NoneMonitorUpdateErrorZ");
	*ret = ChannelMonitor_update_monitor(this_arg_conv, updates_conv, broadcaster_conv, logger_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1latest_1update_1id(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	return ChannelMonitor_get_latest_update_id(this_arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1funding_1txo(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKC2Tuple_OutPointScriptZ* ret = MALLOC(sizeof(LDKC2Tuple_OutPointScriptZ), "LDKC2Tuple_OutPointScriptZ");
	*ret = ChannelMonitor_get_funding_txo(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1and_1clear_1pending_1monitor_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKCVec_MonitorEventZ* ret = MALLOC(sizeof(LDKCVec_MonitorEventZ), "LDKCVec_MonitorEventZ");
	*ret = ChannelMonitor_get_and_clear_pending_monitor_events(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1and_1clear_1pending_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKCVec_EventZ* ret = MALLOC(sizeof(LDKCVec_EventZ), "LDKCVec_EventZ");
	*ret = ChannelMonitor_get_and_clear_pending_events(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1latest_1holder_1commitment_1txn(JNIEnv * _env, jclass _b, jlong this_arg, jlong logger) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCVec_TransactionZ* ret = MALLOC(sizeof(LDKCVec_TransactionZ), "LDKCVec_TransactionZ");
	*ret = ChannelMonitor_get_latest_holder_commitment_txn(this_arg_conv, logger_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1block_1connected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jlong txdata, jint height, jlong broadcaster, jlong fee_estimator, jlong logger) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	unsigned char header_arr[80];
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_conv = *(LDKCVec_C2Tuple_usizeTransactionZZ*)txdata;
	FREE((void*)txdata);
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
	LDKCVec_C2Tuple_TxidCVec_TxOutZZZ* ret = MALLOC(sizeof(LDKCVec_C2Tuple_TxidCVec_TxOutZZZ), "LDKCVec_C2Tuple_TxidCVec_TxOutZZZ");
	*ret = ChannelMonitor_block_connected(this_arg_conv, header_ref, txdata_conv, height, broadcaster_conv, fee_estimator_conv, logger_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1block_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jint height, jlong broadcaster, jlong fee_estimator, jlong logger) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	unsigned char header_arr[80];
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
	return ChannelMonitor_block_disconnected(this_arg_conv, header_ref, height, broadcaster_conv, fee_estimator_conv, logger_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint this_ptr_conv = *(LDKOutPoint*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return OutPoint_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OutPoint_1get_1txid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OutPoint_get_txid(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1set_1txid(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return OutPoint_set_txid(this_ptr_conv, val_ref);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_OutPoint_1get_1index(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	return OutPoint_get_index(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1set_1index(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	return OutPoint_set_index(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1new(JNIEnv * _env, jclass _b, jbyteArray txid_arg, jshort index_arg) {
	LDKThirtyTwoBytes txid_arg_ref;
	(*_env)->GetByteArrayRegion (_env, txid_arg, 0, 32, txid_arg_ref.data);
	LDKOutPoint* ret = MALLOC(sizeof(LDKOutPoint), "LDKOutPoint");
	*ret = OutPoint_new(txid_arg_ref, index_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OutPoint_1to_1channel_1id(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKOutPoint* this_arg_conv = (LDKOutPoint*)this_arg;
	jbyteArray _arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, _arr, 0, 32, OutPoint_to_channel_id(this_arg_conv).data);
	return _arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKOutPoint* obj_conv = (LDKOutPoint*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = OutPoint_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKOutPoint* ret = MALLOC(sizeof(LDKOutPoint), "LDKOutPoint");
	*ret = OutPoint_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SpendableOutputDescriptor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKSpendableOutputDescriptor this_ptr_conv = *(LDKSpendableOutputDescriptor*)this_ptr;
	FREE((void*)this_ptr);
	return SpendableOutputDescriptor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelKeys this_ptr_conv = *(LDKChannelKeys*)this_ptr;
	FREE((void*)this_ptr);
	return ChannelKeys_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_KeysInterface_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKKeysInterface this_ptr_conv = *(LDKKeysInterface*)this_ptr;
	FREE((void*)this_ptr);
	return KeysInterface_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv = *(LDKInMemoryChannelKeys*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return InMemoryChannelKeys_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1funding_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_funding_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1funding_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	FREE((void*)val);
	return InMemoryChannelKeys_set_funding_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1revocation_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_revocation_base_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1revocation_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	FREE((void*)val);
	return InMemoryChannelKeys_set_revocation_base_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_payment_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	FREE((void*)val);
	return InMemoryChannelKeys_set_payment_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1delayed_1payment_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_delayed_payment_base_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1delayed_1payment_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	FREE((void*)val);
	return InMemoryChannelKeys_set_delayed_payment_base_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1htlc_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_htlc_base_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1htlc_1base_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	FREE((void*)val);
	return InMemoryChannelKeys_set_htlc_base_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1commitment_1seed(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_commitment_seed(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1commitment_1seed(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return InMemoryChannelKeys_set_commitment_seed(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1new(JNIEnv * _env, jclass _b, jlong funding_key, jlong revocation_base_key, jlong payment_key, jlong delayed_payment_base_key, jlong htlc_base_key, jbyteArray commitment_seed, jlong channel_value_satoshis, jlong key_derivation_params) {
	LDKSecretKey funding_key_conv = *(LDKSecretKey*)funding_key;
	FREE((void*)funding_key);
	LDKSecretKey revocation_base_key_conv = *(LDKSecretKey*)revocation_base_key;
	FREE((void*)revocation_base_key);
	LDKSecretKey payment_key_conv = *(LDKSecretKey*)payment_key;
	FREE((void*)payment_key);
	LDKSecretKey delayed_payment_base_key_conv = *(LDKSecretKey*)delayed_payment_base_key;
	FREE((void*)delayed_payment_base_key);
	LDKSecretKey htlc_base_key_conv = *(LDKSecretKey*)htlc_base_key;
	FREE((void*)htlc_base_key);
	LDKThirtyTwoBytes commitment_seed_ref;
	(*_env)->GetByteArrayRegion (_env, commitment_seed, 0, 32, commitment_seed_ref.data);
	LDKC2Tuple_u64u64Z key_derivation_params_conv = *(LDKC2Tuple_u64u64Z*)key_derivation_params;
	FREE((void*)key_derivation_params);
	LDKInMemoryChannelKeys* ret = MALLOC(sizeof(LDKInMemoryChannelKeys), "LDKInMemoryChannelKeys");
	*ret = InMemoryChannelKeys_new(funding_key_conv, revocation_base_key_conv, payment_key_conv, delayed_payment_base_key_conv, htlc_base_key_conv, commitment_seed_ref, channel_value_satoshis, key_derivation_params_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1counterparty_1pubkeys(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys* this_arg_conv = (LDKInMemoryChannelKeys*)this_arg;
	LDKChannelPublicKeys* ret = MALLOC(sizeof(LDKChannelPublicKeys), "LDKChannelPublicKeys");
	*ret = InMemoryChannelKeys_counterparty_pubkeys(this_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1counterparty_1selected_1contest_1delay(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys* this_arg_conv = (LDKInMemoryChannelKeys*)this_arg;
	return InMemoryChannelKeys_counterparty_selected_contest_delay(this_arg_conv);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1holder_1selected_1contest_1delay(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys* this_arg_conv = (LDKInMemoryChannelKeys*)this_arg;
	return InMemoryChannelKeys_holder_selected_contest_delay(this_arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1as_1ChannelKeys(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys* this_arg_conv = (LDKInMemoryChannelKeys*)this_arg;
	LDKChannelKeys* ret = MALLOC(sizeof(LDKChannelKeys), "LDKChannelKeys");
	*ret = InMemoryChannelKeys_as_ChannelKeys(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKInMemoryChannelKeys* obj_conv = (LDKInMemoryChannelKeys*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = InMemoryChannelKeys_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKInMemoryChannelKeys* ret = MALLOC(sizeof(LDKInMemoryChannelKeys), "LDKInMemoryChannelKeys");
	*ret = InMemoryChannelKeys_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_KeysManager_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKKeysManager this_ptr_conv = *(LDKKeysManager*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return KeysManager_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysManager_1new(JNIEnv * _env, jclass _b, jbyteArray seed, jclass network, jlong starting_time_secs, jint starting_time_nanos) {
	unsigned char seed_arr[32];
	(*_env)->GetByteArrayRegion (_env, seed, 0, 32, seed_arr);
	unsigned char (*seed_ref)[32] = &seed_arr;
	LDKNetwork network_conv = LDKNetwork_from_java(_env, network);
	LDKKeysManager* ret = MALLOC(sizeof(LDKKeysManager), "LDKKeysManager");
	*ret = KeysManager_new(seed_ref, network_conv, starting_time_secs, starting_time_nanos);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysManager_1derive_1channel_1keys(JNIEnv * _env, jclass _b, jlong this_arg, jlong channel_value_satoshis, jlong params_1, jlong params_2) {
	LDKKeysManager* this_arg_conv = (LDKKeysManager*)this_arg;
	LDKInMemoryChannelKeys* ret = MALLOC(sizeof(LDKInMemoryChannelKeys), "LDKInMemoryChannelKeys");
	*ret = KeysManager_derive_channel_keys(this_arg_conv, channel_value_satoshis, params_1, params_2);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysManager_1as_1KeysInterface(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKKeysManager* this_arg_conv = (LDKKeysManager*)this_arg;
	LDKKeysInterface* ret = MALLOC(sizeof(LDKKeysInterface), "LDKKeysInterface");
	*ret = KeysManager_as_KeysInterface(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManager this_ptr_conv = *(LDKChannelManager*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelManager_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv = *(LDKChannelDetails*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelDetails_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ChannelDetails_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return ChannelDetails_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1remote_1network_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = ChannelDetails_get_remote_network_id(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1remote_1network_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return ChannelDetails_set_remote_network_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1counterparty_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKInitFeatures* ret = MALLOC(sizeof(LDKInitFeatures), "LDKInitFeatures");
	*ret = ChannelDetails_get_counterparty_features(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1counterparty_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKInitFeatures val_conv = *(LDKInitFeatures*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return ChannelDetails_set_counterparty_features(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1channel_1value_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_channel_value_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1channel_1value_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_channel_value_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1user_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_user_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1user_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_user_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1outbound_1capacity_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_outbound_capacity_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1outbound_1capacity_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_outbound_capacity_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1inbound_1capacity_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_inbound_capacity_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1inbound_1capacity_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_inbound_capacity_msat(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1is_1live(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_is_live(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1is_1live(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_is_live(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PaymentSendFailure_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPaymentSendFailure this_ptr_conv = *(LDKPaymentSendFailure*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return PaymentSendFailure_free(this_ptr_conv);
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
	LDKUserConfig config_conv = *(LDKUserConfig*)config;
	FREE((void*)config);
	config_conv.is_owned = true;
	LDKChannelManager* ret = MALLOC(sizeof(LDKChannelManager), "LDKChannelManager");
	*ret = ChannelManager_new(network_conv, fee_est_conv, chain_monitor_conv, tx_broadcaster_conv, logger_conv, keys_manager_conv, config_conv, current_blockchain_height);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1create_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jlong their_network_key, jlong channel_value_satoshis, jlong push_msat, jlong user_id, jlong override_config) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKPublicKey their_network_key_conv = *(LDKPublicKey*)their_network_key;
	FREE((void*)their_network_key);
	LDKUserConfig override_config_conv = *(LDKUserConfig*)override_config;
	FREE((void*)override_config);
	override_config_conv.is_owned = true;
	LDKCResult_NoneAPIErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret = ChannelManager_create_channel(this_arg_conv, their_network_key_conv, channel_value_satoshis, push_msat, user_id, override_config_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1list_1channels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKCVec_ChannelDetailsZ* ret = MALLOC(sizeof(LDKCVec_ChannelDetailsZ), "LDKCVec_ChannelDetailsZ");
	*ret = ChannelManager_list_channels(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1list_1usable_1channels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKCVec_ChannelDetailsZ* ret = MALLOC(sizeof(LDKCVec_ChannelDetailsZ), "LDKCVec_ChannelDetailsZ");
	*ret = ChannelManager_list_usable_channels(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1close_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray channel_id) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char channel_id_arr[32];
	(*_env)->GetByteArrayRegion (_env, channel_id, 0, 32, channel_id_arr);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	LDKCResult_NoneAPIErrorZ* ret = MALLOC(sizeof(LDKCResult_NoneAPIErrorZ), "LDKCResult_NoneAPIErrorZ");
	*ret = ChannelManager_close_channel(this_arg_conv, channel_id_ref);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1force_1close_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray channel_id) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char channel_id_arr[32];
	(*_env)->GetByteArrayRegion (_env, channel_id, 0, 32, channel_id_arr);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	return ChannelManager_force_close_channel(this_arg_conv, channel_id_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1force_1close_1all_1channels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	return ChannelManager_force_close_all_channels(this_arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1send_1payment(JNIEnv * _env, jclass _b, jlong this_arg, jlong route, jbyteArray payment_hash, jbyteArray payment_secret) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKRoute* route_conv = (LDKRoute*)route;
	LDKThirtyTwoBytes payment_hash_ref;
	(*_env)->GetByteArrayRegion (_env, payment_hash, 0, 32, payment_hash_ref.data);
	LDKThirtyTwoBytes payment_secret_ref;
	(*_env)->GetByteArrayRegion (_env, payment_secret, 0, 32, payment_secret_ref.data);
	LDKCResult_NonePaymentSendFailureZ* ret = MALLOC(sizeof(LDKCResult_NonePaymentSendFailureZ), "LDKCResult_NonePaymentSendFailureZ");
	*ret = ChannelManager_send_payment(this_arg_conv, route_conv, payment_hash_ref, payment_secret_ref);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1funding_1transaction_1generated(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray temporary_channel_id, jlong funding_txo) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char temporary_channel_id_arr[32];
	(*_env)->GetByteArrayRegion (_env, temporary_channel_id, 0, 32, temporary_channel_id_arr);
	unsigned char (*temporary_channel_id_ref)[32] = &temporary_channel_id_arr;
	LDKOutPoint funding_txo_conv = *(LDKOutPoint*)funding_txo;
	FREE((void*)funding_txo);
	funding_txo_conv.is_owned = true;
	return ChannelManager_funding_transaction_generated(this_arg_conv, temporary_channel_id_ref, funding_txo_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1broadcast_1node_1announcement(JNIEnv * _env, jclass _b, jlong this_arg, jlong rgb, jbyteArray alias, jlong addresses) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKThreeBytes rgb_conv = *(LDKThreeBytes*)rgb;
	FREE((void*)rgb);
	LDKThirtyTwoBytes alias_ref;
	(*_env)->GetByteArrayRegion (_env, alias, 0, 32, alias_ref.data);
	LDKCVec_NetAddressZ addresses_conv = *(LDKCVec_NetAddressZ*)addresses;
	FREE((void*)addresses);
	return ChannelManager_broadcast_node_announcement(this_arg_conv, rgb_conv, alias_ref, addresses_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1process_1pending_1htlc_1forwards(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	return ChannelManager_process_pending_htlc_forwards(this_arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1timer_1chan_1freshness_1every_1min(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	return ChannelManager_timer_chan_freshness_every_min(this_arg_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelManager_1fail_1htlc_1backwards(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray payment_hash, jbyteArray payment_secret) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char payment_hash_arr[32];
	(*_env)->GetByteArrayRegion (_env, payment_hash, 0, 32, payment_hash_arr);
	unsigned char (*payment_hash_ref)[32] = &payment_hash_arr;
	LDKThirtyTwoBytes payment_secret_ref;
	(*_env)->GetByteArrayRegion (_env, payment_secret, 0, 32, payment_secret_ref.data);
	return ChannelManager_fail_htlc_backwards(this_arg_conv, payment_hash_ref, payment_secret_ref);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelManager_1claim_1funds(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray payment_preimage, jbyteArray payment_secret, jlong expected_amount) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKThirtyTwoBytes payment_preimage_ref;
	(*_env)->GetByteArrayRegion (_env, payment_preimage, 0, 32, payment_preimage_ref.data);
	LDKThirtyTwoBytes payment_secret_ref;
	(*_env)->GetByteArrayRegion (_env, payment_secret, 0, 32, payment_secret_ref.data);
	return ChannelManager_claim_funds(this_arg_conv, payment_preimage_ref, payment_secret_ref, expected_amount);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1get_1our_1node_1id(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = ChannelManager_get_our_node_id(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1channel_1monitor_1updated(JNIEnv * _env, jclass _b, jlong this_arg, jlong funding_txo, jlong highest_applied_update_id) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKOutPoint* funding_txo_conv = (LDKOutPoint*)funding_txo;
	return ChannelManager_channel_monitor_updated(this_arg_conv, funding_txo_conv, highest_applied_update_id);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1MessageSendEventsProvider(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKMessageSendEventsProvider* ret = MALLOC(sizeof(LDKMessageSendEventsProvider), "LDKMessageSendEventsProvider");
	*ret = ChannelManager_as_MessageSendEventsProvider(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1EventsProvider(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKEventsProvider* ret = MALLOC(sizeof(LDKEventsProvider), "LDKEventsProvider");
	*ret = ChannelManager_as_EventsProvider(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1block_1connected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jlong txdata, jint height) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char header_arr[80];
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_C2Tuple_usizeTransactionZZ txdata_conv = *(LDKCVec_C2Tuple_usizeTransactionZZ*)txdata;
	FREE((void*)txdata);
	return ChannelManager_block_connected(this_arg_conv, header_ref, txdata_conv, height);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1block_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char header_arr[80];
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	return ChannelManager_block_disconnected(this_arg_conv, header_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1ChannelMessageHandler(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKChannelMessageHandler* ret = MALLOC(sizeof(LDKChannelMessageHandler), "LDKChannelMessageHandler");
	*ret = ChannelManager_as_ChannelMessageHandler(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv = *(LDKChannelManagerReadArgs*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelManagerReadArgs_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1keys_1manager(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_keys_manager(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1keys_1manager(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKKeysInterface val_conv = *(LDKKeysInterface*)val;
	if (val_conv.free == LDKKeysInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKKeysInterface_JCalls_clone(val_conv.this_arg);
	}
	return ChannelManagerReadArgs_set_keys_manager(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1fee_1estimator(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_fee_estimator(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1fee_1estimator(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKFeeEstimator val_conv = *(LDKFeeEstimator*)val;
	if (val_conv.free == LDKFeeEstimator_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKFeeEstimator_JCalls_clone(val_conv.this_arg);
	}
	return ChannelManagerReadArgs_set_fee_estimator(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1chain_1monitor(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_chain_monitor(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1chain_1monitor(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKWatch val_conv = *(LDKWatch*)val;
	if (val_conv.free == LDKWatch_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKWatch_JCalls_clone(val_conv.this_arg);
	}
	return ChannelManagerReadArgs_set_chain_monitor(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1tx_1broadcaster(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_tx_broadcaster(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1tx_1broadcaster(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKBroadcasterInterface val_conv = *(LDKBroadcasterInterface*)val;
	if (val_conv.free == LDKBroadcasterInterface_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKBroadcasterInterface_JCalls_clone(val_conv.this_arg);
	}
	return ChannelManagerReadArgs_set_tx_broadcaster(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1logger(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_logger(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1logger(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKLogger val_conv = *(LDKLogger*)val;
	if (val_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(val_conv.this_arg);
	}
	return ChannelManagerReadArgs_set_logger(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1default_1config(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKUserConfig* ret = MALLOC(sizeof(LDKUserConfig), "LDKUserConfig");
	*ret = ChannelManagerReadArgs_get_default_config(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1default_1config(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKUserConfig val_conv = *(LDKUserConfig*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return ChannelManagerReadArgs_set_default_config(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1new(JNIEnv * _env, jclass _b, jlong keys_manager, jlong fee_estimator, jlong chain_monitor, jlong tx_broadcaster, jlong logger, jlong default_config, jlong channel_monitors) {
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
	LDKUserConfig default_config_conv = *(LDKUserConfig*)default_config;
	FREE((void*)default_config);
	default_config_conv.is_owned = true;
	LDKCVec_ChannelMonitorZ channel_monitors_conv = *(LDKCVec_ChannelMonitorZ*)channel_monitors;
	FREE((void*)channel_monitors);
	LDKChannelManagerReadArgs* ret = MALLOC(sizeof(LDKChannelManagerReadArgs), "LDKChannelManagerReadArgs");
	*ret = ChannelManagerReadArgs_new(keys_manager_conv, fee_estimator_conv, chain_monitor_conv, tx_broadcaster_conv, logger_conv, default_config_conv, channel_monitors_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DecodeError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDecodeError this_ptr_conv = *(LDKDecodeError*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return DecodeError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Init_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInit this_ptr_conv = *(LDKInit*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return Init_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage this_ptr_conv = *(LDKErrorMessage*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ErrorMessage_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage* this_ptr_conv = (LDKErrorMessage*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ErrorMessage_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKErrorMessage* this_ptr_conv = (LDKErrorMessage*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return ErrorMessage_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1get_1data(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage* this_ptr_conv = (LDKErrorMessage*)this_ptr;
	LDKStr* ret = MALLOC(sizeof(LDKStr), "LDKStr");
	*ret = ErrorMessage_get_data(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1set_1data(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKErrorMessage* this_ptr_conv = (LDKErrorMessage*)this_ptr;
	LDKCVec_u8Z val_conv = *(LDKCVec_u8Z*)val;
	FREE((void*)val);
	return ErrorMessage_set_data(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong data_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKCVec_u8Z data_arg_conv = *(LDKCVec_u8Z*)data_arg;
	FREE((void*)data_arg);
	LDKErrorMessage* ret = MALLOC(sizeof(LDKErrorMessage), "LDKErrorMessage");
	*ret = ErrorMessage_new(channel_id_arg_ref, data_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPing this_ptr_conv = *(LDKPing*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return Ping_free(this_ptr_conv);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_Ping_1get_1ponglen(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPing* this_ptr_conv = (LDKPing*)this_ptr;
	return Ping_get_ponglen(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1set_1ponglen(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKPing* this_ptr_conv = (LDKPing*)this_ptr;
	return Ping_set_ponglen(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_Ping_1get_1byteslen(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPing* this_ptr_conv = (LDKPing*)this_ptr;
	return Ping_get_byteslen(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1set_1byteslen(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKPing* this_ptr_conv = (LDKPing*)this_ptr;
	return Ping_set_byteslen(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Ping_1new(JNIEnv * _env, jclass _b, jshort ponglen_arg, jshort byteslen_arg) {
	LDKPing* ret = MALLOC(sizeof(LDKPing), "LDKPing");
	*ret = Ping_new(ponglen_arg, byteslen_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Pong_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPong this_ptr_conv = *(LDKPong*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return Pong_free(this_ptr_conv);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_Pong_1get_1byteslen(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPong* this_ptr_conv = (LDKPong*)this_ptr;
	return Pong_get_byteslen(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Pong_1set_1byteslen(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKPong* this_ptr_conv = (LDKPong*)this_ptr;
	return Pong_set_byteslen(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Pong_1new(JNIEnv * _env, jclass _b, jshort byteslen_arg) {
	LDKPong* ret = MALLOC(sizeof(LDKPong), "LDKPong");
	*ret = Pong_new(byteslen_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv = *(LDKOpenChannel*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return OpenChannel_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OpenChannel_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return OpenChannel_set_chain_hash(this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OpenChannel_get_temporary_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return OpenChannel_set_temporary_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1funding_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_funding_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1funding_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_funding_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1push_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_push_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1push_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_push_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_dust_limit_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_dust_limit_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_max_htlc_value_in_flight_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_max_htlc_value_in_flight_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_channel_reserve_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_channel_reserve_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_feerate_per_kw(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_feerate_per_kw(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_to_self_delay(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_to_self_delay(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_max_accepted_htlcs(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_max_accepted_htlcs(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = OpenChannel_get_funding_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return OpenChannel_set_funding_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = OpenChannel_get_revocation_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return OpenChannel_set_revocation_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = OpenChannel_get_payment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return OpenChannel_set_payment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = OpenChannel_get_delayed_payment_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return OpenChannel_set_delayed_payment_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = OpenChannel_get_htlc_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return OpenChannel_set_htlc_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = OpenChannel_get_first_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return OpenChannel_set_first_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1channel_1flags(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_get_channel_flags(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1channel_1flags(JNIEnv * _env, jclass _b, jlong this_ptr, jbyte val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	return OpenChannel_set_channel_flags(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv = *(LDKAcceptChannel*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return AcceptChannel_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *AcceptChannel_get_temporary_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return AcceptChannel_set_temporary_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_get_dust_limit_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1dust_1limit_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_set_dust_limit_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_get_max_htlc_value_in_flight_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1max_1htlc_1value_1in_1flight_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_set_max_htlc_value_in_flight_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_get_channel_reserve_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1channel_1reserve_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_set_channel_reserve_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_get_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_set_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_get_minimum_depth(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1minimum_1depth(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_set_minimum_depth(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_get_to_self_delay(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_set_to_self_delay(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_get_max_accepted_htlcs(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1max_1accepted_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	return AcceptChannel_set_max_accepted_htlcs(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = AcceptChannel_get_funding_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return AcceptChannel_set_funding_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = AcceptChannel_get_revocation_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return AcceptChannel_set_revocation_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = AcceptChannel_get_payment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return AcceptChannel_set_payment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = AcceptChannel_get_delayed_payment_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return AcceptChannel_set_delayed_payment_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = AcceptChannel_get_htlc_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return AcceptChannel_set_htlc_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = AcceptChannel_get_first_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return AcceptChannel_set_first_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated this_ptr_conv = *(LDKFundingCreated*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return FundingCreated_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingCreated_get_temporary_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return FundingCreated_set_temporary_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1funding_1txid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingCreated_get_funding_txid(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1funding_1txid(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return FundingCreated_set_funding_txid(this_ptr_conv, val_ref);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1funding_1output_1index(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	return FundingCreated_get_funding_output_index(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1funding_1output_1index(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	return FundingCreated_set_funding_output_index(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = FundingCreated_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return FundingCreated_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1new(JNIEnv * _env, jclass _b, jbyteArray temporary_channel_id_arg, jbyteArray funding_txid_arg, jshort funding_output_index_arg, jlong signature_arg) {
	LDKThirtyTwoBytes temporary_channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, temporary_channel_id_arg, 0, 32, temporary_channel_id_arg_ref.data);
	LDKThirtyTwoBytes funding_txid_arg_ref;
	(*_env)->GetByteArrayRegion (_env, funding_txid_arg, 0, 32, funding_txid_arg_ref.data);
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	FREE((void*)signature_arg);
	LDKFundingCreated* ret = MALLOC(sizeof(LDKFundingCreated), "LDKFundingCreated");
	*ret = FundingCreated_new(temporary_channel_id_arg_ref, funding_txid_arg_ref, funding_output_index_arg, signature_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned this_ptr_conv = *(LDKFundingSigned*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return FundingSigned_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingSigned_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned* this_ptr_conv = (LDKFundingSigned*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingSigned_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingSigned* this_ptr_conv = (LDKFundingSigned*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return FundingSigned_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned* this_ptr_conv = (LDKFundingSigned*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = FundingSigned_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingSigned* this_ptr_conv = (LDKFundingSigned*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return FundingSigned_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	FREE((void*)signature_arg);
	LDKFundingSigned* ret = MALLOC(sizeof(LDKFundingSigned), "LDKFundingSigned");
	*ret = FundingSigned_new(channel_id_arg_ref, signature_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked this_ptr_conv = *(LDKFundingLocked*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return FundingLocked_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingLocked_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingLocked_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return FundingLocked_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1get_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = FundingLocked_get_next_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1set_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return FundingLocked_set_next_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKPublicKey next_per_commitment_point_arg_conv = *(LDKPublicKey*)next_per_commitment_point_arg;
	FREE((void*)next_per_commitment_point_arg);
	LDKFundingLocked* ret = MALLOC(sizeof(LDKFundingLocked), "LDKFundingLocked");
	*ret = FundingLocked_new(channel_id_arg_ref, next_per_commitment_point_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown this_ptr_conv = *(LDKShutdown*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return Shutdown_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_Shutdown_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown* this_ptr_conv = (LDKShutdown*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *Shutdown_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKShutdown* this_ptr_conv = (LDKShutdown*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return Shutdown_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1get_1scriptpubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown* this_ptr_conv = (LDKShutdown*)this_ptr;
	LDKu8slice* ret = MALLOC(sizeof(LDKu8slice), "LDKu8slice");
	*ret = Shutdown_get_scriptpubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1set_1scriptpubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKShutdown* this_ptr_conv = (LDKShutdown*)this_ptr;
	LDKCVec_u8Z val_conv = *(LDKCVec_u8Z*)val;
	FREE((void*)val);
	return Shutdown_set_scriptpubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong scriptpubkey_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKCVec_u8Z scriptpubkey_arg_conv = *(LDKCVec_u8Z*)scriptpubkey_arg;
	FREE((void*)scriptpubkey_arg);
	LDKShutdown* ret = MALLOC(sizeof(LDKShutdown), "LDKShutdown");
	*ret = Shutdown_new(channel_id_arg_ref, scriptpubkey_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned this_ptr_conv = *(LDKClosingSigned*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ClosingSigned_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned* this_ptr_conv = (LDKClosingSigned*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ClosingSigned_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKClosingSigned* this_ptr_conv = (LDKClosingSigned*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return ClosingSigned_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1fee_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned* this_ptr_conv = (LDKClosingSigned*)this_ptr;
	return ClosingSigned_get_fee_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1fee_1satoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKClosingSigned* this_ptr_conv = (LDKClosingSigned*)this_ptr;
	return ClosingSigned_set_fee_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned* this_ptr_conv = (LDKClosingSigned*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = ClosingSigned_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKClosingSigned* this_ptr_conv = (LDKClosingSigned*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return ClosingSigned_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong fee_satoshis_arg, jlong signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	FREE((void*)signature_arg);
	LDKClosingSigned* ret = MALLOC(sizeof(LDKClosingSigned), "LDKClosingSigned");
	*ret = ClosingSigned_new(channel_id_arg_ref, fee_satoshis_arg, signature_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv = *(LDKUpdateAddHTLC*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return UpdateAddHTLC_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateAddHTLC_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UpdateAddHTLC_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	return UpdateAddHTLC_get_htlc_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	return UpdateAddHTLC_set_htlc_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1amount_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	return UpdateAddHTLC_get_amount_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1amount_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	return UpdateAddHTLC_set_amount_msat(this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateAddHTLC_get_payment_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UpdateAddHTLC_set_payment_hash(this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1cltv_1expiry(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	return UpdateAddHTLC_get_cltv_expiry(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1cltv_1expiry(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	return UpdateAddHTLC_set_cltv_expiry(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv = *(LDKUpdateFulfillHTLC*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return UpdateFulfillHTLC_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC* this_ptr_conv = (LDKUpdateFulfillHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFulfillHTLC_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFulfillHTLC* this_ptr_conv = (LDKUpdateFulfillHTLC*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UpdateFulfillHTLC_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC* this_ptr_conv = (LDKUpdateFulfillHTLC*)this_ptr;
	return UpdateFulfillHTLC_get_htlc_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFulfillHTLC* this_ptr_conv = (LDKUpdateFulfillHTLC*)this_ptr;
	return UpdateFulfillHTLC_set_htlc_id(this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1payment_1preimage(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC* this_ptr_conv = (LDKUpdateFulfillHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFulfillHTLC_get_payment_preimage(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1payment_1preimage(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFulfillHTLC* this_ptr_conv = (LDKUpdateFulfillHTLC*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UpdateFulfillHTLC_set_payment_preimage(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong htlc_id_arg, jbyteArray payment_preimage_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKThirtyTwoBytes payment_preimage_arg_ref;
	(*_env)->GetByteArrayRegion (_env, payment_preimage_arg, 0, 32, payment_preimage_arg_ref.data);
	LDKUpdateFulfillHTLC* ret = MALLOC(sizeof(LDKUpdateFulfillHTLC), "LDKUpdateFulfillHTLC");
	*ret = UpdateFulfillHTLC_new(channel_id_arg_ref, htlc_id_arg, payment_preimage_arg_ref);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv = *(LDKUpdateFailHTLC*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return UpdateFailHTLC_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailHTLC* this_ptr_conv = (LDKUpdateFailHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFailHTLC_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFailHTLC* this_ptr_conv = (LDKUpdateFailHTLC*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UpdateFailHTLC_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1get_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailHTLC* this_ptr_conv = (LDKUpdateFailHTLC*)this_ptr;
	return UpdateFailHTLC_get_htlc_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1set_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFailHTLC* this_ptr_conv = (LDKUpdateFailHTLC*)this_ptr;
	return UpdateFailHTLC_set_htlc_id(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv = *(LDKUpdateFailMalformedHTLC*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return UpdateFailMalformedHTLC_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC* this_ptr_conv = (LDKUpdateFailMalformedHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFailMalformedHTLC_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFailMalformedHTLC* this_ptr_conv = (LDKUpdateFailMalformedHTLC*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UpdateFailMalformedHTLC_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC* this_ptr_conv = (LDKUpdateFailMalformedHTLC*)this_ptr;
	return UpdateFailMalformedHTLC_get_htlc_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1htlc_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFailMalformedHTLC* this_ptr_conv = (LDKUpdateFailMalformedHTLC*)this_ptr;
	return UpdateFailMalformedHTLC_set_htlc_id(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1failure_1code(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC* this_ptr_conv = (LDKUpdateFailMalformedHTLC*)this_ptr;
	return UpdateFailMalformedHTLC_get_failure_code(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1failure_1code(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKUpdateFailMalformedHTLC* this_ptr_conv = (LDKUpdateFailMalformedHTLC*)this_ptr;
	return UpdateFailMalformedHTLC_set_failure_code(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentSigned this_ptr_conv = *(LDKCommitmentSigned*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return CommitmentSigned_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *CommitmentSigned_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return CommitmentSigned_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = CommitmentSigned_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return CommitmentSigned_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1htlc_1signatures(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	LDKCVec_SignatureZ val_conv = *(LDKCVec_SignatureZ*)val;
	FREE((void*)val);
	return CommitmentSigned_set_htlc_signatures(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong signature_arg, jlong htlc_signatures_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	FREE((void*)signature_arg);
	LDKCVec_SignatureZ htlc_signatures_arg_conv = *(LDKCVec_SignatureZ*)htlc_signatures_arg;
	FREE((void*)htlc_signatures_arg);
	LDKCommitmentSigned* ret = MALLOC(sizeof(LDKCommitmentSigned), "LDKCommitmentSigned");
	*ret = CommitmentSigned_new(channel_id_arg_ref, signature_arg_conv, htlc_signatures_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK this_ptr_conv = *(LDKRevokeAndACK*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return RevokeAndACK_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *RevokeAndACK_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return RevokeAndACK_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *RevokeAndACK_get_per_commitment_secret(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return RevokeAndACK_set_per_commitment_secret(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = RevokeAndACK_get_next_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return RevokeAndACK_set_next_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jbyteArray per_commitment_secret_arg, jlong next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKThirtyTwoBytes per_commitment_secret_arg_ref;
	(*_env)->GetByteArrayRegion (_env, per_commitment_secret_arg, 0, 32, per_commitment_secret_arg_ref.data);
	LDKPublicKey next_per_commitment_point_arg_conv = *(LDKPublicKey*)next_per_commitment_point_arg;
	FREE((void*)next_per_commitment_point_arg);
	LDKRevokeAndACK* ret = MALLOC(sizeof(LDKRevokeAndACK), "LDKRevokeAndACK");
	*ret = RevokeAndACK_new(channel_id_arg_ref, per_commitment_secret_arg_ref, next_per_commitment_point_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee this_ptr_conv = *(LDKUpdateFee*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return UpdateFee_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFee_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee* this_ptr_conv = (LDKUpdateFee*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFee_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUpdateFee* this_ptr_conv = (LDKUpdateFee*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UpdateFee_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UpdateFee_1get_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee* this_ptr_conv = (LDKUpdateFee*)this_ptr;
	return UpdateFee_get_feerate_per_kw(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1set_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUpdateFee* this_ptr_conv = (LDKUpdateFee*)this_ptr;
	return UpdateFee_set_feerate_per_kw(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFee_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jint feerate_per_kw_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKUpdateFee* ret = MALLOC(sizeof(LDKUpdateFee), "LDKUpdateFee");
	*ret = UpdateFee_new(channel_id_arg_ref, feerate_per_kw_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDataLossProtect this_ptr_conv = *(LDKDataLossProtect*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return DataLossProtect_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1get_1your_1last_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDataLossProtect* this_ptr_conv = (LDKDataLossProtect*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *DataLossProtect_get_your_last_per_commitment_secret(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1set_1your_1last_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKDataLossProtect* this_ptr_conv = (LDKDataLossProtect*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return DataLossProtect_set_your_last_per_commitment_secret(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1get_1my_1current_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDataLossProtect* this_ptr_conv = (LDKDataLossProtect*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = DataLossProtect_get_my_current_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1set_1my_1current_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKDataLossProtect* this_ptr_conv = (LDKDataLossProtect*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return DataLossProtect_set_my_current_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1new(JNIEnv * _env, jclass _b, jbyteArray your_last_per_commitment_secret_arg, jlong my_current_per_commitment_point_arg) {
	LDKThirtyTwoBytes your_last_per_commitment_secret_arg_ref;
	(*_env)->GetByteArrayRegion (_env, your_last_per_commitment_secret_arg, 0, 32, your_last_per_commitment_secret_arg_ref.data);
	LDKPublicKey my_current_per_commitment_point_arg_conv = *(LDKPublicKey*)my_current_per_commitment_point_arg;
	FREE((void*)my_current_per_commitment_point_arg);
	LDKDataLossProtect* ret = MALLOC(sizeof(LDKDataLossProtect), "LDKDataLossProtect");
	*ret = DataLossProtect_new(your_last_per_commitment_secret_arg_ref, my_current_per_commitment_point_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish this_ptr_conv = *(LDKChannelReestablish*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelReestablish_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish* this_ptr_conv = (LDKChannelReestablish*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ChannelReestablish_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKChannelReestablish* this_ptr_conv = (LDKChannelReestablish*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return ChannelReestablish_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1next_1local_1commitment_1number(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish* this_ptr_conv = (LDKChannelReestablish*)this_ptr;
	return ChannelReestablish_get_next_local_commitment_number(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1next_1local_1commitment_1number(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelReestablish* this_ptr_conv = (LDKChannelReestablish*)this_ptr;
	return ChannelReestablish_set_next_local_commitment_number(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1next_1remote_1commitment_1number(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish* this_ptr_conv = (LDKChannelReestablish*)this_ptr;
	return ChannelReestablish_get_next_remote_commitment_number(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1next_1remote_1commitment_1number(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelReestablish* this_ptr_conv = (LDKChannelReestablish*)this_ptr;
	return ChannelReestablish_set_next_remote_commitment_number(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv = *(LDKAnnouncementSignatures*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return AnnouncementSignatures_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *AnnouncementSignatures_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return AnnouncementSignatures_set_channel_id(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	return AnnouncementSignatures_get_short_channel_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	return AnnouncementSignatures_set_short_channel_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1node_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = AnnouncementSignatures_get_node_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1node_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return AnnouncementSignatures_set_node_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1bitcoin_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = AnnouncementSignatures_get_bitcoin_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1bitcoin_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return AnnouncementSignatures_set_bitcoin_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1new(JNIEnv * _env, jclass _b, jbyteArray channel_id_arg, jlong short_channel_id_arg, jlong node_signature_arg, jlong bitcoin_signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_ref;
	(*_env)->GetByteArrayRegion (_env, channel_id_arg, 0, 32, channel_id_arg_ref.data);
	LDKSignature node_signature_arg_conv = *(LDKSignature*)node_signature_arg;
	FREE((void*)node_signature_arg);
	LDKSignature bitcoin_signature_arg_conv = *(LDKSignature*)bitcoin_signature_arg;
	FREE((void*)bitcoin_signature_arg);
	LDKAnnouncementSignatures* ret = MALLOC(sizeof(LDKAnnouncementSignatures), "LDKAnnouncementSignatures");
	*ret = AnnouncementSignatures_new(channel_id_arg_ref, short_channel_id_arg, node_signature_arg_conv, bitcoin_signature_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetAddress_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetAddress this_ptr_conv = *(LDKNetAddress*)this_ptr;
	FREE((void*)this_ptr);
	return NetAddress_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv = *(LDKUnsignedNodeAnnouncement*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return UnsignedNodeAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKNodeFeatures* ret = MALLOC(sizeof(LDKNodeFeatures), "LDKNodeFeatures");
	*ret = UnsignedNodeAnnouncement_get_features(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKNodeFeatures val_conv = *(LDKNodeFeatures*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return UnsignedNodeAnnouncement_set_features(this_ptr_conv, val_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	return UnsignedNodeAnnouncement_get_timestamp(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	return UnsignedNodeAnnouncement_set_timestamp(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = UnsignedNodeAnnouncement_get_node_id(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return UnsignedNodeAnnouncement_set_node_id(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1rgb(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 3);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 3, *UnsignedNodeAnnouncement_get_rgb(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1rgb(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKThreeBytes val_conv = *(LDKThreeBytes*)val;
	FREE((void*)val);
	return UnsignedNodeAnnouncement_set_rgb(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1alias(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UnsignedNodeAnnouncement_get_alias(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1alias(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UnsignedNodeAnnouncement_set_alias(this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1addresses(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKCVec_NetAddressZ val_conv = *(LDKCVec_NetAddressZ*)val;
	FREE((void*)val);
	return UnsignedNodeAnnouncement_set_addresses(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement this_ptr_conv = *(LDKNodeAnnouncement*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return NodeAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement* this_ptr_conv = (LDKNodeAnnouncement*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = NodeAnnouncement_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncement* this_ptr_conv = (LDKNodeAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return NodeAnnouncement_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1get_1contents(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement* this_ptr_conv = (LDKNodeAnnouncement*)this_ptr;
	LDKUnsignedNodeAnnouncement* ret = MALLOC(sizeof(LDKUnsignedNodeAnnouncement), "LDKUnsignedNodeAnnouncement");
	*ret = NodeAnnouncement_get_contents(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1set_1contents(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncement* this_ptr_conv = (LDKNodeAnnouncement*)this_ptr;
	LDKUnsignedNodeAnnouncement val_conv = *(LDKUnsignedNodeAnnouncement*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return NodeAnnouncement_set_contents(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1new(JNIEnv * _env, jclass _b, jlong signature_arg, jlong contents_arg) {
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	FREE((void*)signature_arg);
	LDKUnsignedNodeAnnouncement contents_arg_conv = *(LDKUnsignedNodeAnnouncement*)contents_arg;
	FREE((void*)contents_arg);
	contents_arg_conv.is_owned = true;
	LDKNodeAnnouncement* ret = MALLOC(sizeof(LDKNodeAnnouncement), "LDKNodeAnnouncement");
	*ret = NodeAnnouncement_new(signature_arg_conv, contents_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv = *(LDKUnsignedChannelAnnouncement*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return UnsignedChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKChannelFeatures* ret = MALLOC(sizeof(LDKChannelFeatures), "LDKChannelFeatures");
	*ret = UnsignedChannelAnnouncement_get_features(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKChannelFeatures val_conv = *(LDKChannelFeatures*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return UnsignedChannelAnnouncement_set_features(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UnsignedChannelAnnouncement_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UnsignedChannelAnnouncement_set_chain_hash(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	return UnsignedChannelAnnouncement_get_short_channel_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	return UnsignedChannelAnnouncement_set_short_channel_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1node_1id_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = UnsignedChannelAnnouncement_get_node_id_1(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1node_1id_11(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return UnsignedChannelAnnouncement_set_node_id_1(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1node_1id_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = UnsignedChannelAnnouncement_get_node_id_2(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1node_1id_12(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return UnsignedChannelAnnouncement_set_node_id_2(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1bitcoin_1key_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = UnsignedChannelAnnouncement_get_bitcoin_key_1(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1bitcoin_1key_11(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return UnsignedChannelAnnouncement_set_bitcoin_key_1(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1bitcoin_1key_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = UnsignedChannelAnnouncement_get_bitcoin_key_2(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1bitcoin_1key_12(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return UnsignedChannelAnnouncement_set_bitcoin_key_2(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement this_ptr_conv = *(LDKChannelAnnouncement*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1node_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = ChannelAnnouncement_get_node_signature_1(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1node_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return ChannelAnnouncement_set_node_signature_1(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1node_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = ChannelAnnouncement_get_node_signature_2(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1node_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return ChannelAnnouncement_set_node_signature_2(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1bitcoin_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = ChannelAnnouncement_get_bitcoin_signature_1(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1bitcoin_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return ChannelAnnouncement_set_bitcoin_signature_1(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1bitcoin_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = ChannelAnnouncement_get_bitcoin_signature_2(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1bitcoin_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return ChannelAnnouncement_set_bitcoin_signature_2(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1contents(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKUnsignedChannelAnnouncement* ret = MALLOC(sizeof(LDKUnsignedChannelAnnouncement), "LDKUnsignedChannelAnnouncement");
	*ret = ChannelAnnouncement_get_contents(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1contents(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKUnsignedChannelAnnouncement val_conv = *(LDKUnsignedChannelAnnouncement*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return ChannelAnnouncement_set_contents(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1new(JNIEnv * _env, jclass _b, jlong node_signature_1_arg, jlong node_signature_2_arg, jlong bitcoin_signature_1_arg, jlong bitcoin_signature_2_arg, jlong contents_arg) {
	LDKSignature node_signature_1_arg_conv = *(LDKSignature*)node_signature_1_arg;
	FREE((void*)node_signature_1_arg);
	LDKSignature node_signature_2_arg_conv = *(LDKSignature*)node_signature_2_arg;
	FREE((void*)node_signature_2_arg);
	LDKSignature bitcoin_signature_1_arg_conv = *(LDKSignature*)bitcoin_signature_1_arg;
	FREE((void*)bitcoin_signature_1_arg);
	LDKSignature bitcoin_signature_2_arg_conv = *(LDKSignature*)bitcoin_signature_2_arg;
	FREE((void*)bitcoin_signature_2_arg);
	LDKUnsignedChannelAnnouncement contents_arg_conv = *(LDKUnsignedChannelAnnouncement*)contents_arg;
	FREE((void*)contents_arg);
	contents_arg_conv.is_owned = true;
	LDKChannelAnnouncement* ret = MALLOC(sizeof(LDKChannelAnnouncement), "LDKChannelAnnouncement");
	*ret = ChannelAnnouncement_new(node_signature_1_arg_conv, node_signature_2_arg_conv, bitcoin_signature_1_arg_conv, bitcoin_signature_2_arg_conv, contents_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv = *(LDKUnsignedChannelUpdate*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return UnsignedChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UnsignedChannelUpdate_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return UnsignedChannelUpdate_set_chain_hash(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_get_short_channel_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_set_short_channel_id(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_get_timestamp(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_set_timestamp(this_ptr_conv, val);
}

JNIEXPORT jbyte JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1flags(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_get_flags(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1flags(JNIEnv * _env, jclass _b, jlong this_ptr, jbyte val) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_set_flags(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_get_cltv_expiry_delta(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_set_cltv_expiry_delta(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_get_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_set_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1fee_1base_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_get_fee_base_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1fee_1base_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_set_fee_base_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1fee_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_get_fee_proportional_millionths(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1fee_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	return UnsignedChannelUpdate_set_fee_proportional_millionths(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelUpdate this_ptr_conv = *(LDKChannelUpdate*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelUpdate* this_ptr_conv = (LDKChannelUpdate*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = ChannelUpdate_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelUpdate* this_ptr_conv = (LDKChannelUpdate*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return ChannelUpdate_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1get_1contents(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelUpdate* this_ptr_conv = (LDKChannelUpdate*)this_ptr;
	LDKUnsignedChannelUpdate* ret = MALLOC(sizeof(LDKUnsignedChannelUpdate), "LDKUnsignedChannelUpdate");
	*ret = ChannelUpdate_get_contents(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1set_1contents(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelUpdate* this_ptr_conv = (LDKChannelUpdate*)this_ptr;
	LDKUnsignedChannelUpdate val_conv = *(LDKUnsignedChannelUpdate*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return ChannelUpdate_set_contents(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1new(JNIEnv * _env, jclass _b, jlong signature_arg, jlong contents_arg) {
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	FREE((void*)signature_arg);
	LDKUnsignedChannelUpdate contents_arg_conv = *(LDKUnsignedChannelUpdate*)contents_arg;
	FREE((void*)contents_arg);
	contents_arg_conv.is_owned = true;
	LDKChannelUpdate* ret = MALLOC(sizeof(LDKChannelUpdate), "LDKChannelUpdate");
	*ret = ChannelUpdate_new(signature_arg_conv, contents_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryChannelRange this_ptr_conv = *(LDKQueryChannelRange*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return QueryChannelRange_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryChannelRange* this_ptr_conv = (LDKQueryChannelRange*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *QueryChannelRange_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKQueryChannelRange* this_ptr_conv = (LDKQueryChannelRange*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return QueryChannelRange_set_chain_hash(this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1get_1first_1blocknum(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryChannelRange* this_ptr_conv = (LDKQueryChannelRange*)this_ptr;
	return QueryChannelRange_get_first_blocknum(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1set_1first_1blocknum(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKQueryChannelRange* this_ptr_conv = (LDKQueryChannelRange*)this_ptr;
	return QueryChannelRange_set_first_blocknum(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1get_1number_1of_1blocks(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryChannelRange* this_ptr_conv = (LDKQueryChannelRange*)this_ptr;
	return QueryChannelRange_get_number_of_blocks(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1set_1number_1of_1blocks(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKQueryChannelRange* this_ptr_conv = (LDKQueryChannelRange*)this_ptr;
	return QueryChannelRange_set_number_of_blocks(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jint first_blocknum_arg, jint number_of_blocks_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKQueryChannelRange* ret = MALLOC(sizeof(LDKQueryChannelRange), "LDKQueryChannelRange");
	*ret = QueryChannelRange_new(chain_hash_arg_ref, first_blocknum_arg, number_of_blocks_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange this_ptr_conv = *(LDKReplyChannelRange*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ReplyChannelRange_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange* this_ptr_conv = (LDKReplyChannelRange*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ReplyChannelRange_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKReplyChannelRange* this_ptr_conv = (LDKReplyChannelRange*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return ReplyChannelRange_set_chain_hash(this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1first_1blocknum(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange* this_ptr_conv = (LDKReplyChannelRange*)this_ptr;
	return ReplyChannelRange_get_first_blocknum(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1first_1blocknum(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKReplyChannelRange* this_ptr_conv = (LDKReplyChannelRange*)this_ptr;
	return ReplyChannelRange_set_first_blocknum(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1number_1of_1blocks(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange* this_ptr_conv = (LDKReplyChannelRange*)this_ptr;
	return ReplyChannelRange_get_number_of_blocks(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1number_1of_1blocks(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKReplyChannelRange* this_ptr_conv = (LDKReplyChannelRange*)this_ptr;
	return ReplyChannelRange_set_number_of_blocks(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1get_1full_1information(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyChannelRange* this_ptr_conv = (LDKReplyChannelRange*)this_ptr;
	return ReplyChannelRange_get_full_information(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1full_1information(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKReplyChannelRange* this_ptr_conv = (LDKReplyChannelRange*)this_ptr;
	return ReplyChannelRange_set_full_information(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1set_1short_1channel_1ids(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKReplyChannelRange* this_ptr_conv = (LDKReplyChannelRange*)this_ptr;
	LDKCVec_u64Z val_conv = *(LDKCVec_u64Z*)val;
	FREE((void*)val);
	return ReplyChannelRange_set_short_channel_ids(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jint first_blocknum_arg, jint number_of_blocks_arg, jboolean full_information_arg, jlong short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKCVec_u64Z short_channel_ids_arg_conv = *(LDKCVec_u64Z*)short_channel_ids_arg;
	FREE((void*)short_channel_ids_arg);
	LDKReplyChannelRange* ret = MALLOC(sizeof(LDKReplyChannelRange), "LDKReplyChannelRange");
	*ret = ReplyChannelRange_new(chain_hash_arg_ref, first_blocknum_arg, number_of_blocks_arg, full_information_arg, short_channel_ids_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryShortChannelIds this_ptr_conv = *(LDKQueryShortChannelIds*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return QueryShortChannelIds_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKQueryShortChannelIds* this_ptr_conv = (LDKQueryShortChannelIds*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *QueryShortChannelIds_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKQueryShortChannelIds* this_ptr_conv = (LDKQueryShortChannelIds*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return QueryShortChannelIds_set_chain_hash(this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1set_1short_1channel_1ids(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKQueryShortChannelIds* this_ptr_conv = (LDKQueryShortChannelIds*)this_ptr;
	LDKCVec_u64Z val_conv = *(LDKCVec_u64Z*)val;
	FREE((void*)val);
	return QueryShortChannelIds_set_short_channel_ids(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jlong short_channel_ids_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKCVec_u64Z short_channel_ids_arg_conv = *(LDKCVec_u64Z*)short_channel_ids_arg;
	FREE((void*)short_channel_ids_arg);
	LDKQueryShortChannelIds* ret = MALLOC(sizeof(LDKQueryShortChannelIds), "LDKQueryShortChannelIds");
	*ret = QueryShortChannelIds_new(chain_hash_arg_ref, short_channel_ids_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyShortChannelIdsEnd this_ptr_conv = *(LDKReplyShortChannelIdsEnd*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ReplyShortChannelIdsEnd_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyShortChannelIdsEnd* this_ptr_conv = (LDKReplyShortChannelIdsEnd*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ReplyShortChannelIdsEnd_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKReplyShortChannelIdsEnd* this_ptr_conv = (LDKReplyShortChannelIdsEnd*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return ReplyShortChannelIdsEnd_set_chain_hash(this_ptr_conv, val_ref);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1get_1full_1information(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKReplyShortChannelIdsEnd* this_ptr_conv = (LDKReplyShortChannelIdsEnd*)this_ptr;
	return ReplyShortChannelIdsEnd_get_full_information(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1set_1full_1information(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKReplyShortChannelIdsEnd* this_ptr_conv = (LDKReplyShortChannelIdsEnd*)this_ptr;
	return ReplyShortChannelIdsEnd_set_full_information(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jboolean full_information_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKReplyShortChannelIdsEnd* ret = MALLOC(sizeof(LDKReplyShortChannelIdsEnd), "LDKReplyShortChannelIdsEnd");
	*ret = ReplyShortChannelIdsEnd_new(chain_hash_arg_ref, full_information_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKGossipTimestampFilter this_ptr_conv = *(LDKGossipTimestampFilter*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return GossipTimestampFilter_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKGossipTimestampFilter* this_ptr_conv = (LDKGossipTimestampFilter*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *GossipTimestampFilter_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKGossipTimestampFilter* this_ptr_conv = (LDKGossipTimestampFilter*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return GossipTimestampFilter_set_chain_hash(this_ptr_conv, val_ref);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1get_1first_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKGossipTimestampFilter* this_ptr_conv = (LDKGossipTimestampFilter*)this_ptr;
	return GossipTimestampFilter_get_first_timestamp(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1set_1first_1timestamp(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKGossipTimestampFilter* this_ptr_conv = (LDKGossipTimestampFilter*)this_ptr;
	return GossipTimestampFilter_set_first_timestamp(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1get_1timestamp_1range(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKGossipTimestampFilter* this_ptr_conv = (LDKGossipTimestampFilter*)this_ptr;
	return GossipTimestampFilter_get_timestamp_range(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1set_1timestamp_1range(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKGossipTimestampFilter* this_ptr_conv = (LDKGossipTimestampFilter*)this_ptr;
	return GossipTimestampFilter_set_timestamp_range(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1new(JNIEnv * _env, jclass _b, jbyteArray chain_hash_arg, jint first_timestamp_arg, jint timestamp_range_arg) {
	LDKThirtyTwoBytes chain_hash_arg_ref;
	(*_env)->GetByteArrayRegion (_env, chain_hash_arg, 0, 32, chain_hash_arg_ref.data);
	LDKGossipTimestampFilter* ret = MALLOC(sizeof(LDKGossipTimestampFilter), "LDKGossipTimestampFilter");
	*ret = GossipTimestampFilter_new(chain_hash_arg_ref, first_timestamp_arg, timestamp_range_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorAction_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorAction this_ptr_conv = *(LDKErrorAction*)this_ptr;
	FREE((void*)this_ptr);
	return ErrorAction_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError this_ptr_conv = *(LDKLightningError*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return LightningError_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LightningError_1get_1err(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKStr* ret = MALLOC(sizeof(LDKStr), "LDKStr");
	*ret = LightningError_get_err(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1set_1err(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKCVec_u8Z val_conv = *(LDKCVec_u8Z*)val;
	FREE((void*)val);
	return LightningError_set_err(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LightningError_1get_1action(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKErrorAction* ret = MALLOC(sizeof(LDKErrorAction), "LDKErrorAction");
	*ret = LightningError_get_action(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1set_1action(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKErrorAction val_conv = *(LDKErrorAction*)val;
	FREE((void*)val);
	return LightningError_set_action(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LightningError_1new(JNIEnv * _env, jclass _b, jlong err_arg, jlong action_arg) {
	LDKCVec_u8Z err_arg_conv = *(LDKCVec_u8Z*)err_arg;
	FREE((void*)err_arg);
	LDKErrorAction action_arg_conv = *(LDKErrorAction*)action_arg;
	FREE((void*)action_arg);
	LDKLightningError* ret = MALLOC(sizeof(LDKLightningError), "LDKLightningError");
	*ret = LightningError_new(err_arg_conv, action_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate this_ptr_conv = *(LDKCommitmentUpdate*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return CommitmentUpdate_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1add_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateAddHTLCZ val_conv = *(LDKCVec_UpdateAddHTLCZ*)val;
	FREE((void*)val);
	return CommitmentUpdate_set_update_add_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fulfill_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateFulfillHTLCZ val_conv = *(LDKCVec_UpdateFulfillHTLCZ*)val;
	FREE((void*)val);
	return CommitmentUpdate_set_update_fulfill_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fail_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateFailHTLCZ val_conv = *(LDKCVec_UpdateFailHTLCZ*)val;
	FREE((void*)val);
	return CommitmentUpdate_set_update_fail_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fail_1malformed_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateFailMalformedHTLCZ val_conv = *(LDKCVec_UpdateFailMalformedHTLCZ*)val;
	FREE((void*)val);
	return CommitmentUpdate_set_update_fail_malformed_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1get_1update_1fee(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKUpdateFee* ret = MALLOC(sizeof(LDKUpdateFee), "LDKUpdateFee");
	*ret = CommitmentUpdate_get_update_fee(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fee(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKUpdateFee val_conv = *(LDKUpdateFee*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return CommitmentUpdate_set_update_fee(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1get_1commitment_1signed(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCommitmentSigned* ret = MALLOC(sizeof(LDKCommitmentSigned), "LDKCommitmentSigned");
	*ret = CommitmentUpdate_get_commitment_signed(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1commitment_1signed(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCommitmentSigned val_conv = *(LDKCommitmentSigned*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return CommitmentUpdate_set_commitment_signed(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1new(JNIEnv * _env, jclass _b, jlong update_add_htlcs_arg, jlong update_fulfill_htlcs_arg, jlong update_fail_htlcs_arg, jlong update_fail_malformed_htlcs_arg, jlong update_fee_arg, jlong commitment_signed_arg) {
	LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg_conv = *(LDKCVec_UpdateAddHTLCZ*)update_add_htlcs_arg;
	FREE((void*)update_add_htlcs_arg);
	LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg_conv = *(LDKCVec_UpdateFulfillHTLCZ*)update_fulfill_htlcs_arg;
	FREE((void*)update_fulfill_htlcs_arg);
	LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg_conv = *(LDKCVec_UpdateFailHTLCZ*)update_fail_htlcs_arg;
	FREE((void*)update_fail_htlcs_arg);
	LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg_conv = *(LDKCVec_UpdateFailMalformedHTLCZ*)update_fail_malformed_htlcs_arg;
	FREE((void*)update_fail_malformed_htlcs_arg);
	LDKUpdateFee update_fee_arg_conv = *(LDKUpdateFee*)update_fee_arg;
	FREE((void*)update_fee_arg);
	update_fee_arg_conv.is_owned = true;
	LDKCommitmentSigned commitment_signed_arg_conv = *(LDKCommitmentSigned*)commitment_signed_arg;
	FREE((void*)commitment_signed_arg);
	commitment_signed_arg_conv.is_owned = true;
	LDKCommitmentUpdate* ret = MALLOC(sizeof(LDKCommitmentUpdate), "LDKCommitmentUpdate");
	*ret = CommitmentUpdate_new(update_add_htlcs_arg_conv, update_fulfill_htlcs_arg_conv, update_fail_htlcs_arg_conv, update_fail_malformed_htlcs_arg_conv, update_fee_arg_conv, commitment_signed_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCFailChannelUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCFailChannelUpdate this_ptr_conv = *(LDKHTLCFailChannelUpdate*)this_ptr;
	FREE((void*)this_ptr);
	return HTLCFailChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMessageHandler this_ptr_conv = *(LDKChannelMessageHandler*)this_ptr;
	FREE((void*)this_ptr);
	return ChannelMessageHandler_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingMessageHandler this_ptr_conv = *(LDKRoutingMessageHandler*)this_ptr;
	FREE((void*)this_ptr);
	return RoutingMessageHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKAcceptChannel* obj_conv = (LDKAcceptChannel*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = AcceptChannel_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKAcceptChannel* ret = MALLOC(sizeof(LDKAcceptChannel), "LDKAcceptChannel");
	*ret = AcceptChannel_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKAnnouncementSignatures* obj_conv = (LDKAnnouncementSignatures*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = AnnouncementSignatures_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKAnnouncementSignatures* ret = MALLOC(sizeof(LDKAnnouncementSignatures), "LDKAnnouncementSignatures");
	*ret = AnnouncementSignatures_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelReestablish* obj_conv = (LDKChannelReestablish*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ChannelReestablish_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelReestablish* ret = MALLOC(sizeof(LDKChannelReestablish), "LDKChannelReestablish");
	*ret = ChannelReestablish_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKClosingSigned* obj_conv = (LDKClosingSigned*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ClosingSigned_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKClosingSigned* ret = MALLOC(sizeof(LDKClosingSigned), "LDKClosingSigned");
	*ret = ClosingSigned_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKCommitmentSigned* obj_conv = (LDKCommitmentSigned*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = CommitmentSigned_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKCommitmentSigned* ret = MALLOC(sizeof(LDKCommitmentSigned), "LDKCommitmentSigned");
	*ret = CommitmentSigned_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingCreated* obj_conv = (LDKFundingCreated*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = FundingCreated_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKFundingCreated* ret = MALLOC(sizeof(LDKFundingCreated), "LDKFundingCreated");
	*ret = FundingCreated_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingSigned* obj_conv = (LDKFundingSigned*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = FundingSigned_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKFundingSigned* ret = MALLOC(sizeof(LDKFundingSigned), "LDKFundingSigned");
	*ret = FundingSigned_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingLocked* obj_conv = (LDKFundingLocked*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = FundingLocked_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKFundingLocked* ret = MALLOC(sizeof(LDKFundingLocked), "LDKFundingLocked");
	*ret = FundingLocked_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Init_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKInit* obj_conv = (LDKInit*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = Init_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Init_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKInit* ret = MALLOC(sizeof(LDKInit), "LDKInit");
	*ret = Init_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKOpenChannel* obj_conv = (LDKOpenChannel*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = OpenChannel_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKOpenChannel* ret = MALLOC(sizeof(LDKOpenChannel), "LDKOpenChannel");
	*ret = OpenChannel_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRevokeAndACK* obj_conv = (LDKRevokeAndACK*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = RevokeAndACK_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKRevokeAndACK* ret = MALLOC(sizeof(LDKRevokeAndACK), "LDKRevokeAndACK");
	*ret = RevokeAndACK_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKShutdown* obj_conv = (LDKShutdown*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = Shutdown_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKShutdown* ret = MALLOC(sizeof(LDKShutdown), "LDKShutdown");
	*ret = Shutdown_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFailHTLC* obj_conv = (LDKUpdateFailHTLC*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = UpdateFailHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateFailHTLC* ret = MALLOC(sizeof(LDKUpdateFailHTLC), "LDKUpdateFailHTLC");
	*ret = UpdateFailHTLC_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFailMalformedHTLC* obj_conv = (LDKUpdateFailMalformedHTLC*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = UpdateFailMalformedHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateFailMalformedHTLC* ret = MALLOC(sizeof(LDKUpdateFailMalformedHTLC), "LDKUpdateFailMalformedHTLC");
	*ret = UpdateFailMalformedHTLC_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFee_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFee* obj_conv = (LDKUpdateFee*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = UpdateFee_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFee_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateFee* ret = MALLOC(sizeof(LDKUpdateFee), "LDKUpdateFee");
	*ret = UpdateFee_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFulfillHTLC* obj_conv = (LDKUpdateFulfillHTLC*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = UpdateFulfillHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateFulfillHTLC* ret = MALLOC(sizeof(LDKUpdateFulfillHTLC), "LDKUpdateFulfillHTLC");
	*ret = UpdateFulfillHTLC_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateAddHTLC* obj_conv = (LDKUpdateAddHTLC*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = UpdateAddHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateAddHTLC* ret = MALLOC(sizeof(LDKUpdateAddHTLC), "LDKUpdateAddHTLC");
	*ret = UpdateAddHTLC_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Ping_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKPing* obj_conv = (LDKPing*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = Ping_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Ping_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKPing* ret = MALLOC(sizeof(LDKPing), "LDKPing");
	*ret = Ping_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Pong_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKPong* obj_conv = (LDKPong*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = Pong_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Pong_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKPong* ret = MALLOC(sizeof(LDKPong), "LDKPong");
	*ret = Pong_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedChannelAnnouncement* obj_conv = (LDKUnsignedChannelAnnouncement*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = UnsignedChannelAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUnsignedChannelAnnouncement* ret = MALLOC(sizeof(LDKUnsignedChannelAnnouncement), "LDKUnsignedChannelAnnouncement");
	*ret = UnsignedChannelAnnouncement_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelAnnouncement* obj_conv = (LDKChannelAnnouncement*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ChannelAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelAnnouncement* ret = MALLOC(sizeof(LDKChannelAnnouncement), "LDKChannelAnnouncement");
	*ret = ChannelAnnouncement_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedChannelUpdate* obj_conv = (LDKUnsignedChannelUpdate*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = UnsignedChannelUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUnsignedChannelUpdate* ret = MALLOC(sizeof(LDKUnsignedChannelUpdate), "LDKUnsignedChannelUpdate");
	*ret = UnsignedChannelUpdate_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelUpdate* obj_conv = (LDKChannelUpdate*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ChannelUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelUpdate* ret = MALLOC(sizeof(LDKChannelUpdate), "LDKChannelUpdate");
	*ret = ChannelUpdate_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKErrorMessage* obj_conv = (LDKErrorMessage*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ErrorMessage_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKErrorMessage* ret = MALLOC(sizeof(LDKErrorMessage), "LDKErrorMessage");
	*ret = ErrorMessage_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedNodeAnnouncement* obj_conv = (LDKUnsignedNodeAnnouncement*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = UnsignedNodeAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUnsignedNodeAnnouncement* ret = MALLOC(sizeof(LDKUnsignedNodeAnnouncement), "LDKUnsignedNodeAnnouncement");
	*ret = UnsignedNodeAnnouncement_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeAnnouncement* obj_conv = (LDKNodeAnnouncement*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = NodeAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKNodeAnnouncement* ret = MALLOC(sizeof(LDKNodeAnnouncement), "LDKNodeAnnouncement");
	*ret = NodeAnnouncement_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKQueryShortChannelIds* ret = MALLOC(sizeof(LDKQueryShortChannelIds), "LDKQueryShortChannelIds");
	*ret = QueryShortChannelIds_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryShortChannelIds_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKQueryShortChannelIds* obj_conv = (LDKQueryShortChannelIds*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = QueryShortChannelIds_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKReplyShortChannelIdsEnd* ret = MALLOC(sizeof(LDKReplyShortChannelIdsEnd), "LDKReplyShortChannelIdsEnd");
	*ret = ReplyShortChannelIdsEnd_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyShortChannelIdsEnd_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKReplyShortChannelIdsEnd* obj_conv = (LDKReplyShortChannelIdsEnd*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ReplyShortChannelIdsEnd_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKQueryChannelRange* ret = MALLOC(sizeof(LDKQueryChannelRange), "LDKQueryChannelRange");
	*ret = QueryChannelRange_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_QueryChannelRange_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKQueryChannelRange* obj_conv = (LDKQueryChannelRange*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = QueryChannelRange_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKReplyChannelRange* ret = MALLOC(sizeof(LDKReplyChannelRange), "LDKReplyChannelRange");
	*ret = ReplyChannelRange_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ReplyChannelRange_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKReplyChannelRange* obj_conv = (LDKReplyChannelRange*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ReplyChannelRange_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKGossipTimestampFilter* ret = MALLOC(sizeof(LDKGossipTimestampFilter), "LDKGossipTimestampFilter");
	*ret = GossipTimestampFilter_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_GossipTimestampFilter_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKGossipTimestampFilter* obj_conv = (LDKGossipTimestampFilter*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = GossipTimestampFilter_write(obj_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler this_ptr_conv = *(LDKMessageHandler*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return MessageHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_MessageHandler_1get_1chan_1handler(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	long ret = (long)MessageHandler_get_chan_handler(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1set_1chan_1handler(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	LDKChannelMessageHandler val_conv = *(LDKChannelMessageHandler*)val;
	if (val_conv.free == LDKChannelMessageHandler_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKChannelMessageHandler_JCalls_clone(val_conv.this_arg);
	}
	return MessageHandler_set_chan_handler(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_MessageHandler_1get_1route_1handler(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	long ret = (long)MessageHandler_get_route_handler(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1set_1route_1handler(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	LDKRoutingMessageHandler val_conv = *(LDKRoutingMessageHandler*)val;
	if (val_conv.free == LDKRoutingMessageHandler_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKRoutingMessageHandler_JCalls_clone(val_conv.this_arg);
	}
	return MessageHandler_set_route_handler(this_ptr_conv, val_conv);
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
	LDKMessageHandler* ret = MALLOC(sizeof(LDKMessageHandler), "LDKMessageHandler");
	*ret = MessageHandler_new(chan_handler_arg_conv, route_handler_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKSocketDescriptor this_ptr_conv = *(LDKSocketDescriptor*)this_ptr;
	FREE((void*)this_ptr);
	return SocketDescriptor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerHandleError this_ptr_conv = *(LDKPeerHandleError*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return PeerHandleError_free(this_ptr_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1get_1no_1connection_1possible(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerHandleError* this_ptr_conv = (LDKPeerHandleError*)this_ptr;
	return PeerHandleError_get_no_connection_possible(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1set_1no_1connection_1possible(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKPeerHandleError* this_ptr_conv = (LDKPeerHandleError*)this_ptr;
	return PeerHandleError_set_no_connection_possible(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1new(JNIEnv * _env, jclass _b, jboolean no_connection_possible_arg) {
	LDKPeerHandleError* ret = MALLOC(sizeof(LDKPeerHandleError), "LDKPeerHandleError");
	*ret = PeerHandleError_new(no_connection_possible_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerManager this_ptr_conv = *(LDKPeerManager*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return PeerManager_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1new(JNIEnv * _env, jclass _b, jlong message_handler, jlong our_node_secret, jbyteArray ephemeral_random_data, jlong logger) {
	LDKMessageHandler message_handler_conv = *(LDKMessageHandler*)message_handler;
	FREE((void*)message_handler);
	message_handler_conv.is_owned = true;
	LDKSecretKey our_node_secret_conv = *(LDKSecretKey*)our_node_secret;
	FREE((void*)our_node_secret);
	unsigned char ephemeral_random_data_arr[32];
	(*_env)->GetByteArrayRegion (_env, ephemeral_random_data, 0, 32, ephemeral_random_data_arr);
	unsigned char (*ephemeral_random_data_ref)[32] = &ephemeral_random_data_arr;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKPeerManager* ret = MALLOC(sizeof(LDKPeerManager), "LDKPeerManager");
	*ret = PeerManager_new(message_handler_conv, our_node_secret_conv, ephemeral_random_data_ref, logger_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1get_1peer_1node_1ids(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKCVec_PublicKeyZ* ret = MALLOC(sizeof(LDKCVec_PublicKeyZ), "LDKCVec_PublicKeyZ");
	*ret = PeerManager_get_peer_node_ids(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1new_1outbound_1connection(JNIEnv * _env, jclass _b, jlong this_arg, jlong their_node_id, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	FREE((void*)their_node_id);
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	if (descriptor_conv.free == LDKSocketDescriptor_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKSocketDescriptor_JCalls_clone(descriptor_conv.this_arg);
	}
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ), "LDKCResult_CVec_u8ZPeerHandleErrorZ");
	*ret = PeerManager_new_outbound_connection(this_arg_conv, their_node_id_conv, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1new_1inbound_1connection(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	if (descriptor_conv.free == LDKSocketDescriptor_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKSocketDescriptor_JCalls_clone(descriptor_conv.this_arg);
	}
	LDKCResult_NonePeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret = PeerManager_new_inbound_connection(this_arg_conv, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1write_1buffer_1space_1avail(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	LDKCResult_NonePeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_NonePeerHandleErrorZ), "LDKCResult_NonePeerHandleErrorZ");
	*ret = PeerManager_write_buffer_space_avail(this_arg_conv, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1read_1event(JNIEnv * _env, jclass _b, jlong this_arg, jlong peer_descriptor, jlong data) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor* peer_descriptor_conv = (LDKSocketDescriptor*)peer_descriptor;
	LDKu8slice data_conv = *(LDKu8slice*)data;
	LDKCResult_boolPeerHandleErrorZ* ret = MALLOC(sizeof(LDKCResult_boolPeerHandleErrorZ), "LDKCResult_boolPeerHandleErrorZ");
	*ret = PeerManager_read_event(this_arg_conv, peer_descriptor_conv, data_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1process_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	return PeerManager_process_events(this_arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1socket_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	return PeerManager_socket_disconnected(this_arg_conv, descriptor_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1timer_1tick_1occured(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	return PeerManager_timer_tick_occured(this_arg_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_build_1commitment_1secret(JNIEnv * _env, jclass _b, jbyteArray commitment_seed, jlong idx) {
	unsigned char commitment_seed_arr[32];
	(*_env)->GetByteArrayRegion (_env, commitment_seed, 0, 32, commitment_seed_arr);
	unsigned char (*commitment_seed_ref)[32] = &commitment_seed_arr;
	jbyteArray _arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, _arr, 0, 32, build_commitment_secret(commitment_seed_ref, idx).data);
	return _arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_derive_1private_1key(JNIEnv * _env, jclass _b, jlong per_commitment_point, jbyteArray base_secret) {
	LDKPublicKey per_commitment_point_conv = *(LDKPublicKey*)per_commitment_point;
	FREE((void*)per_commitment_point);
	unsigned char base_secret_arr[32];
	(*_env)->GetByteArrayRegion (_env, base_secret, 0, 32, base_secret_arr);
	unsigned char (*base_secret_ref)[32] = &base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret = derive_private_key(per_commitment_point_conv, base_secret_ref);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_derive_1public_1key(JNIEnv * _env, jclass _b, jlong per_commitment_point, jlong base_point) {
	LDKPublicKey per_commitment_point_conv = *(LDKPublicKey*)per_commitment_point;
	FREE((void*)per_commitment_point);
	LDKPublicKey base_point_conv = *(LDKPublicKey*)base_point;
	FREE((void*)base_point);
	LDKCResult_PublicKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret = derive_public_key(per_commitment_point_conv, base_point_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_derive_1private_1revocation_1key(JNIEnv * _env, jclass _b, jbyteArray per_commitment_secret, jbyteArray countersignatory_revocation_base_secret) {
	unsigned char per_commitment_secret_arr[32];
	(*_env)->GetByteArrayRegion (_env, per_commitment_secret, 0, 32, per_commitment_secret_arr);
	unsigned char (*per_commitment_secret_ref)[32] = &per_commitment_secret_arr;
	unsigned char countersignatory_revocation_base_secret_arr[32];
	(*_env)->GetByteArrayRegion (_env, countersignatory_revocation_base_secret, 0, 32, countersignatory_revocation_base_secret_arr);
	unsigned char (*countersignatory_revocation_base_secret_ref)[32] = &countersignatory_revocation_base_secret_arr;
	LDKCResult_SecretKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_SecretKeySecpErrorZ), "LDKCResult_SecretKeySecpErrorZ");
	*ret = derive_private_revocation_key(per_commitment_secret_ref, countersignatory_revocation_base_secret_ref);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_derive_1public_1revocation_1key(JNIEnv * _env, jclass _b, jlong per_commitment_point, jlong countersignatory_revocation_base_point) {
	LDKPublicKey per_commitment_point_conv = *(LDKPublicKey*)per_commitment_point;
	FREE((void*)per_commitment_point);
	LDKPublicKey countersignatory_revocation_base_point_conv = *(LDKPublicKey*)countersignatory_revocation_base_point;
	FREE((void*)countersignatory_revocation_base_point);
	LDKCResult_PublicKeySecpErrorZ* ret = MALLOC(sizeof(LDKCResult_PublicKeySecpErrorZ), "LDKCResult_PublicKeySecpErrorZ");
	*ret = derive_public_revocation_key(per_commitment_point_conv, countersignatory_revocation_base_point_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys this_ptr_conv = *(LDKTxCreationKeys*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return TxCreationKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = TxCreationKeys_get_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return TxCreationKeys_set_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1revocation_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = TxCreationKeys_get_revocation_key(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1revocation_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return TxCreationKeys_set_revocation_key(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1broadcaster_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = TxCreationKeys_get_broadcaster_htlc_key(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1broadcaster_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return TxCreationKeys_set_broadcaster_htlc_key(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1countersignatory_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = TxCreationKeys_get_countersignatory_htlc_key(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1countersignatory_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return TxCreationKeys_set_countersignatory_htlc_key(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1broadcaster_1delayed_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = TxCreationKeys_get_broadcaster_delayed_payment_key(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1broadcaster_1delayed_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return TxCreationKeys_set_broadcaster_delayed_payment_key(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1new(JNIEnv * _env, jclass _b, jlong per_commitment_point_arg, jlong revocation_key_arg, jlong broadcaster_htlc_key_arg, jlong countersignatory_htlc_key_arg, jlong broadcaster_delayed_payment_key_arg) {
	LDKPublicKey per_commitment_point_arg_conv = *(LDKPublicKey*)per_commitment_point_arg;
	FREE((void*)per_commitment_point_arg);
	LDKPublicKey revocation_key_arg_conv = *(LDKPublicKey*)revocation_key_arg;
	FREE((void*)revocation_key_arg);
	LDKPublicKey broadcaster_htlc_key_arg_conv = *(LDKPublicKey*)broadcaster_htlc_key_arg;
	FREE((void*)broadcaster_htlc_key_arg);
	LDKPublicKey countersignatory_htlc_key_arg_conv = *(LDKPublicKey*)countersignatory_htlc_key_arg;
	FREE((void*)countersignatory_htlc_key_arg);
	LDKPublicKey broadcaster_delayed_payment_key_arg_conv = *(LDKPublicKey*)broadcaster_delayed_payment_key_arg;
	FREE((void*)broadcaster_delayed_payment_key_arg);
	LDKTxCreationKeys* ret = MALLOC(sizeof(LDKTxCreationKeys), "LDKTxCreationKeys");
	*ret = TxCreationKeys_new(per_commitment_point_arg_conv, revocation_key_arg_conv, broadcaster_htlc_key_arg_conv, countersignatory_htlc_key_arg_conv, broadcaster_delayed_payment_key_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKTxCreationKeys* obj_conv = (LDKTxCreationKeys*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = TxCreationKeys_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKTxCreationKeys* ret = MALLOC(sizeof(LDKTxCreationKeys), "LDKTxCreationKeys");
	*ret = TxCreationKeys_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPreCalculatedTxCreationKeys this_ptr_conv = *(LDKPreCalculatedTxCreationKeys*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return PreCalculatedTxCreationKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1new(JNIEnv * _env, jclass _b, jlong keys) {
	LDKTxCreationKeys keys_conv = *(LDKTxCreationKeys*)keys;
	FREE((void*)keys);
	keys_conv.is_owned = true;
	LDKPreCalculatedTxCreationKeys* ret = MALLOC(sizeof(LDKPreCalculatedTxCreationKeys), "LDKPreCalculatedTxCreationKeys");
	*ret = PreCalculatedTxCreationKeys_new(keys_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1trust_1key_1derivation(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPreCalculatedTxCreationKeys* this_arg_conv = (LDKPreCalculatedTxCreationKeys*)this_arg;
	LDKTxCreationKeys* ret = MALLOC(sizeof(LDKTxCreationKeys), "LDKTxCreationKeys");
	*ret = PreCalculatedTxCreationKeys_trust_key_derivation(this_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPreCalculatedTxCreationKeys* this_arg_conv = (LDKPreCalculatedTxCreationKeys*)this_arg;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = PreCalculatedTxCreationKeys_per_commitment_point(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys this_ptr_conv = *(LDKChannelPublicKeys*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelPublicKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = ChannelPublicKeys_get_funding_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return ChannelPublicKeys_set_funding_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = ChannelPublicKeys_get_revocation_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return ChannelPublicKeys_set_revocation_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = ChannelPublicKeys_get_payment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return ChannelPublicKeys_set_payment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = ChannelPublicKeys_get_delayed_payment_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return ChannelPublicKeys_set_delayed_payment_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = ChannelPublicKeys_get_htlc_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return ChannelPublicKeys_set_htlc_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1new(JNIEnv * _env, jclass _b, jlong funding_pubkey_arg, jlong revocation_basepoint_arg, jlong payment_point_arg, jlong delayed_payment_basepoint_arg, jlong htlc_basepoint_arg) {
	LDKPublicKey funding_pubkey_arg_conv = *(LDKPublicKey*)funding_pubkey_arg;
	FREE((void*)funding_pubkey_arg);
	LDKPublicKey revocation_basepoint_arg_conv = *(LDKPublicKey*)revocation_basepoint_arg;
	FREE((void*)revocation_basepoint_arg);
	LDKPublicKey payment_point_arg_conv = *(LDKPublicKey*)payment_point_arg;
	FREE((void*)payment_point_arg);
	LDKPublicKey delayed_payment_basepoint_arg_conv = *(LDKPublicKey*)delayed_payment_basepoint_arg;
	FREE((void*)delayed_payment_basepoint_arg);
	LDKPublicKey htlc_basepoint_arg_conv = *(LDKPublicKey*)htlc_basepoint_arg;
	FREE((void*)htlc_basepoint_arg);
	LDKChannelPublicKeys* ret = MALLOC(sizeof(LDKChannelPublicKeys), "LDKChannelPublicKeys");
	*ret = ChannelPublicKeys_new(funding_pubkey_arg_conv, revocation_basepoint_arg_conv, payment_point_arg_conv, delayed_payment_basepoint_arg_conv, htlc_basepoint_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelPublicKeys* obj_conv = (LDKChannelPublicKeys*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ChannelPublicKeys_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelPublicKeys* ret = MALLOC(sizeof(LDKChannelPublicKeys), "LDKChannelPublicKeys");
	*ret = ChannelPublicKeys_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1derive_1new(JNIEnv * _env, jclass _b, jlong per_commitment_point, jlong broadcaster_delayed_payment_base, jlong broadcaster_htlc_base, jlong countersignatory_revocation_base, jlong countersignatory_htlc_base) {
	LDKPublicKey per_commitment_point_conv = *(LDKPublicKey*)per_commitment_point;
	FREE((void*)per_commitment_point);
	LDKPublicKey broadcaster_delayed_payment_base_conv = *(LDKPublicKey*)broadcaster_delayed_payment_base;
	FREE((void*)broadcaster_delayed_payment_base);
	LDKPublicKey broadcaster_htlc_base_conv = *(LDKPublicKey*)broadcaster_htlc_base;
	FREE((void*)broadcaster_htlc_base);
	LDKPublicKey countersignatory_revocation_base_conv = *(LDKPublicKey*)countersignatory_revocation_base;
	FREE((void*)countersignatory_revocation_base);
	LDKPublicKey countersignatory_htlc_base_conv = *(LDKPublicKey*)countersignatory_htlc_base;
	FREE((void*)countersignatory_htlc_base);
	LDKCResult_TxCreationKeysSecpErrorZ* ret = MALLOC(sizeof(LDKCResult_TxCreationKeysSecpErrorZ), "LDKCResult_TxCreationKeysSecpErrorZ");
	*ret = TxCreationKeys_derive_new(per_commitment_point_conv, broadcaster_delayed_payment_base_conv, broadcaster_htlc_base_conv, countersignatory_revocation_base_conv, countersignatory_htlc_base_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_get_1revokeable_1redeemscript(JNIEnv * _env, jclass _b, jlong revocation_key, jshort contest_delay, jlong broadcaster_delayed_payment_key) {
	LDKPublicKey revocation_key_conv = *(LDKPublicKey*)revocation_key;
	FREE((void*)revocation_key);
	LDKPublicKey broadcaster_delayed_payment_key_conv = *(LDKPublicKey*)broadcaster_delayed_payment_key;
	FREE((void*)broadcaster_delayed_payment_key);
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = get_revokeable_redeemscript(revocation_key_conv, contest_delay, broadcaster_delayed_payment_key_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv = *(LDKHTLCOutputInCommitment*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return HTLCOutputInCommitment_free(this_ptr_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1offered(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_get_offered(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1offered(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_set_offered(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1amount_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_get_amount_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1amount_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_set_amount_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1cltv_1expiry(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_get_cltv_expiry(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1cltv_1expiry(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_set_cltv_expiry(this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1get_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *HTLCOutputInCommitment_get_payment_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return HTLCOutputInCommitment_set_payment_hash(this_ptr_conv, val_ref);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHTLCOutputInCommitment* obj_conv = (LDKHTLCOutputInCommitment*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = HTLCOutputInCommitment_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKHTLCOutputInCommitment* ret = MALLOC(sizeof(LDKHTLCOutputInCommitment), "LDKHTLCOutputInCommitment");
	*ret = HTLCOutputInCommitment_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_get_1htlc_1redeemscript(JNIEnv * _env, jclass _b, jlong htlc, jlong keys) {
	LDKHTLCOutputInCommitment* htlc_conv = (LDKHTLCOutputInCommitment*)htlc;
	LDKTxCreationKeys* keys_conv = (LDKTxCreationKeys*)keys;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = get_htlc_redeemscript(htlc_conv, keys_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_make_1funding_1redeemscript(JNIEnv * _env, jclass _b, jlong broadcaster, jlong countersignatory) {
	LDKPublicKey broadcaster_conv = *(LDKPublicKey*)broadcaster;
	FREE((void*)broadcaster);
	LDKPublicKey countersignatory_conv = *(LDKPublicKey*)countersignatory;
	FREE((void*)countersignatory);
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = make_funding_redeemscript(broadcaster_conv, countersignatory_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_build_1htlc_1transaction(JNIEnv * _env, jclass _b, jbyteArray prev_hash, jint feerate_per_kw, jshort contest_delay, jlong htlc, jlong broadcaster_delayed_payment_key, jlong revocation_key) {
	unsigned char prev_hash_arr[32];
	(*_env)->GetByteArrayRegion (_env, prev_hash, 0, 32, prev_hash_arr);
	unsigned char (*prev_hash_ref)[32] = &prev_hash_arr;
	LDKHTLCOutputInCommitment* htlc_conv = (LDKHTLCOutputInCommitment*)htlc;
	LDKPublicKey broadcaster_delayed_payment_key_conv = *(LDKPublicKey*)broadcaster_delayed_payment_key;
	FREE((void*)broadcaster_delayed_payment_key);
	LDKPublicKey revocation_key_conv = *(LDKPublicKey*)revocation_key;
	FREE((void*)revocation_key);
	LDKTransaction* ret = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	*ret = build_htlc_transaction(prev_hash_ref, feerate_per_kw, contest_delay, htlc_conv, broadcaster_delayed_payment_key_conv, revocation_key_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHolderCommitmentTransaction this_ptr_conv = *(LDKHolderCommitmentTransaction*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return HolderCommitmentTransaction_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1unsigned_1tx(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHolderCommitmentTransaction* this_ptr_conv = (LDKHolderCommitmentTransaction*)this_ptr;
	LDKTransaction* ret = MALLOC(sizeof(LDKTransaction), "LDKTransaction");
	*ret = HolderCommitmentTransaction_get_unsigned_tx(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1unsigned_1tx(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKHolderCommitmentTransaction* this_ptr_conv = (LDKHolderCommitmentTransaction*)this_ptr;
	LDKTransaction val_conv = *(LDKTransaction*)val;
	FREE((void*)val);
	return HolderCommitmentTransaction_set_unsigned_tx(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1counterparty_1sig(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHolderCommitmentTransaction* this_ptr_conv = (LDKHolderCommitmentTransaction*)this_ptr;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = HolderCommitmentTransaction_get_counterparty_sig(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1counterparty_1sig(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKHolderCommitmentTransaction* this_ptr_conv = (LDKHolderCommitmentTransaction*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	FREE((void*)val);
	return HolderCommitmentTransaction_set_counterparty_sig(this_ptr_conv, val_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHolderCommitmentTransaction* this_ptr_conv = (LDKHolderCommitmentTransaction*)this_ptr;
	return HolderCommitmentTransaction_get_feerate_per_kw(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKHolderCommitmentTransaction* this_ptr_conv = (LDKHolderCommitmentTransaction*)this_ptr;
	return HolderCommitmentTransaction_set_feerate_per_kw(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1set_1per_1htlc(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKHolderCommitmentTransaction* this_ptr_conv = (LDKHolderCommitmentTransaction*)this_ptr;
	LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ val_conv = *(LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ*)val;
	FREE((void*)val);
	return HolderCommitmentTransaction_set_per_htlc(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1new_1missing_1holder_1sig(JNIEnv * _env, jclass _b, jlong unsigned_tx, jlong counterparty_sig, jlong holder_funding_key, jlong counterparty_funding_key, jlong keys, jint feerate_per_kw, jlong htlc_data) {
	LDKTransaction unsigned_tx_conv = *(LDKTransaction*)unsigned_tx;
	FREE((void*)unsigned_tx);
	LDKSignature counterparty_sig_conv = *(LDKSignature*)counterparty_sig;
	FREE((void*)counterparty_sig);
	LDKPublicKey holder_funding_key_conv = *(LDKPublicKey*)holder_funding_key;
	FREE((void*)holder_funding_key);
	LDKPublicKey counterparty_funding_key_conv = *(LDKPublicKey*)counterparty_funding_key;
	FREE((void*)counterparty_funding_key);
	LDKTxCreationKeys keys_conv = *(LDKTxCreationKeys*)keys;
	FREE((void*)keys);
	keys_conv.is_owned = true;
	LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ htlc_data_conv = *(LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ*)htlc_data;
	FREE((void*)htlc_data);
	LDKHolderCommitmentTransaction* ret = MALLOC(sizeof(LDKHolderCommitmentTransaction), "LDKHolderCommitmentTransaction");
	*ret = HolderCommitmentTransaction_new_missing_holder_sig(unsigned_tx_conv, counterparty_sig_conv, holder_funding_key_conv, counterparty_funding_key_conv, keys_conv, feerate_per_kw, htlc_data_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1trust_1key_1derivation(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKHolderCommitmentTransaction* this_arg_conv = (LDKHolderCommitmentTransaction*)this_arg;
	LDKTxCreationKeys* ret = MALLOC(sizeof(LDKTxCreationKeys), "LDKTxCreationKeys");
	*ret = HolderCommitmentTransaction_trust_key_derivation(this_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1txid(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKHolderCommitmentTransaction* this_arg_conv = (LDKHolderCommitmentTransaction*)this_arg;
	jbyteArray _arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, _arr, 0, 32, HolderCommitmentTransaction_txid(this_arg_conv).data);
	return _arr;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1holder_1sig(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray funding_key, jlong funding_redeemscript, jlong channel_value_satoshis) {
	LDKHolderCommitmentTransaction* this_arg_conv = (LDKHolderCommitmentTransaction*)this_arg;
	unsigned char funding_key_arr[32];
	(*_env)->GetByteArrayRegion (_env, funding_key, 0, 32, funding_key_arr);
	unsigned char (*funding_key_ref)[32] = &funding_key_arr;
	LDKu8slice funding_redeemscript_conv = *(LDKu8slice*)funding_redeemscript;
	LDKSignature* ret = MALLOC(sizeof(LDKSignature), "LDKSignature");
	*ret = HolderCommitmentTransaction_get_holder_sig(this_arg_conv, funding_key_ref, funding_redeemscript_conv, channel_value_satoshis);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1get_1htlc_1sigs(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray htlc_base_key, jshort counterparty_selected_contest_delay) {
	LDKHolderCommitmentTransaction* this_arg_conv = (LDKHolderCommitmentTransaction*)this_arg;
	unsigned char htlc_base_key_arr[32];
	(*_env)->GetByteArrayRegion (_env, htlc_base_key, 0, 32, htlc_base_key_arr);
	unsigned char (*htlc_base_key_ref)[32] = &htlc_base_key_arr;
	LDKCResult_CVec_SignatureZNoneZ* ret = MALLOC(sizeof(LDKCResult_CVec_SignatureZNoneZ), "LDKCResult_CVec_SignatureZNoneZ");
	*ret = HolderCommitmentTransaction_get_htlc_sigs(this_arg_conv, htlc_base_key_ref, counterparty_selected_contest_delay);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHolderCommitmentTransaction* obj_conv = (LDKHolderCommitmentTransaction*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = HolderCommitmentTransaction_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HolderCommitmentTransaction_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKHolderCommitmentTransaction* ret = MALLOC(sizeof(LDKHolderCommitmentTransaction), "LDKHolderCommitmentTransaction");
	*ret = HolderCommitmentTransaction_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InitFeatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInitFeatures this_ptr_conv = *(LDKInitFeatures*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return InitFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeFeatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeFeatures this_ptr_conv = *(LDKNodeFeatures*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return NodeFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelFeatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelFeatures this_ptr_conv = *(LDKChannelFeatures*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv = *(LDKRouteHop*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return RouteHop_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = RouteHop_get_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return RouteHop_set_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1node_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKNodeFeatures* ret = MALLOC(sizeof(LDKNodeFeatures), "LDKNodeFeatures");
	*ret = RouteHop_get_node_features(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1node_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKNodeFeatures val_conv = *(LDKNodeFeatures*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return RouteHop_set_node_features(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_get_short_channel_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_set_short_channel_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1channel_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKChannelFeatures* ret = MALLOC(sizeof(LDKChannelFeatures), "LDKChannelFeatures");
	*ret = RouteHop_get_channel_features(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1channel_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKChannelFeatures val_conv = *(LDKChannelFeatures*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return RouteHop_set_channel_features(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1fee_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_get_fee_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1fee_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_set_fee_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_get_cltv_expiry_delta(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_set_cltv_expiry_delta(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1new(JNIEnv * _env, jclass _b, jlong pubkey_arg, jlong node_features_arg, jlong short_channel_id_arg, jlong channel_features_arg, jlong fee_msat_arg, jint cltv_expiry_delta_arg) {
	LDKPublicKey pubkey_arg_conv = *(LDKPublicKey*)pubkey_arg;
	FREE((void*)pubkey_arg);
	LDKNodeFeatures node_features_arg_conv = *(LDKNodeFeatures*)node_features_arg;
	FREE((void*)node_features_arg);
	node_features_arg_conv.is_owned = true;
	LDKChannelFeatures channel_features_arg_conv = *(LDKChannelFeatures*)channel_features_arg;
	FREE((void*)channel_features_arg);
	channel_features_arg_conv.is_owned = true;
	LDKRouteHop* ret = MALLOC(sizeof(LDKRouteHop), "LDKRouteHop");
	*ret = RouteHop_new(pubkey_arg_conv, node_features_arg_conv, short_channel_id_arg, channel_features_arg_conv, fee_msat_arg, cltv_expiry_delta_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Route_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoute this_ptr_conv = *(LDKRoute*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return Route_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Route_1set_1paths(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRoute* this_ptr_conv = (LDKRoute*)this_ptr;
	LDKCVec_CVec_RouteHopZZ val_conv = *(LDKCVec_CVec_RouteHopZZ*)val;
	FREE((void*)val);
	return Route_set_paths(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Route_1new(JNIEnv * _env, jclass _b, jlong paths_arg) {
	LDKCVec_CVec_RouteHopZZ paths_arg_conv = *(LDKCVec_CVec_RouteHopZZ*)paths_arg;
	FREE((void*)paths_arg);
	LDKRoute* ret = MALLOC(sizeof(LDKRoute), "LDKRoute");
	*ret = Route_new(paths_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Route_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRoute* obj_conv = (LDKRoute*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = Route_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Route_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKRoute* ret = MALLOC(sizeof(LDKRoute), "LDKRoute");
	*ret = Route_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint this_ptr_conv = *(LDKRouteHint*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return RouteHint_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1src_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = RouteHint_get_src_node_id(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1src_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return RouteHint_set_src_node_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_get_short_channel_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_set_short_channel_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1fees(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKRoutingFees* ret = MALLOC(sizeof(LDKRoutingFees), "LDKRoutingFees");
	*ret = RouteHint_get_fees(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1fees(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKRoutingFees val_conv = *(LDKRoutingFees*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return RouteHint_set_fees(this_ptr_conv, val_conv);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_get_cltv_expiry_delta(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_set_cltv_expiry_delta(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_get_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_set_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1new(JNIEnv * _env, jclass _b, jlong src_node_id_arg, jlong short_channel_id_arg, jlong fees_arg, jshort cltv_expiry_delta_arg, jlong htlc_minimum_msat_arg) {
	LDKPublicKey src_node_id_arg_conv = *(LDKPublicKey*)src_node_id_arg;
	FREE((void*)src_node_id_arg);
	LDKRoutingFees fees_arg_conv = *(LDKRoutingFees*)fees_arg;
	FREE((void*)fees_arg);
	fees_arg_conv.is_owned = true;
	LDKRouteHint* ret = MALLOC(sizeof(LDKRouteHint), "LDKRouteHint");
	*ret = RouteHint_new(src_node_id_arg_conv, short_channel_id_arg, fees_arg_conv, cltv_expiry_delta_arg, htlc_minimum_msat_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_get_1route(JNIEnv * _env, jclass _b, jlong our_node_id, jlong network, jlong target, jlong first_hops, jlong last_hops, jlong final_value_msat, jint final_cltv, jlong logger) {
	LDKPublicKey our_node_id_conv = *(LDKPublicKey*)our_node_id;
	FREE((void*)our_node_id);
	LDKNetworkGraph* network_conv = (LDKNetworkGraph*)network;
	LDKPublicKey target_conv = *(LDKPublicKey*)target;
	FREE((void*)target);
	LDKCVec_ChannelDetailsZ* first_hops_conv = (LDKCVec_ChannelDetailsZ*)first_hops;
	LDKCVec_RouteHintZ last_hops_conv = *(LDKCVec_RouteHintZ*)last_hops;
	FREE((void*)last_hops);
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKCResult_RouteLightningErrorZ* ret = MALLOC(sizeof(LDKCResult_RouteLightningErrorZ), "LDKCResult_RouteLightningErrorZ");
	*ret = get_route(our_node_id_conv, network_conv, target_conv, first_hops_conv, last_hops_conv, final_value_msat, final_cltv, logger_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetworkGraph this_ptr_conv = *(LDKNetworkGraph*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return NetworkGraph_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LockedNetworkGraph_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLockedNetworkGraph this_ptr_conv = *(LDKLockedNetworkGraph*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return LockedNetworkGraph_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetGraphMsgHandler this_ptr_conv = *(LDKNetGraphMsgHandler*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return NetGraphMsgHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1new(JNIEnv * _env, jclass _b, jlong chain_access, jlong logger) {
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKNetGraphMsgHandler* ret = MALLOC(sizeof(LDKNetGraphMsgHandler), "LDKNetGraphMsgHandler");
	*ret = NetGraphMsgHandler_new(chain_access_conv, logger_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1from_1net_1graph(JNIEnv * _env, jclass _b, jlong chain_access, jlong logger, jlong network_graph) {
	LDKAccess* chain_access_conv = (LDKAccess*)chain_access;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	if (logger_conv.free == LDKLogger_JCalls_free) {
		// If this_arg is a JCalls struct, then we need to increment the refcnt in it.
		LDKLogger_JCalls_clone(logger_conv.this_arg);
	}
	LDKNetworkGraph network_graph_conv = *(LDKNetworkGraph*)network_graph;
	FREE((void*)network_graph);
	network_graph_conv.is_owned = true;
	LDKNetGraphMsgHandler* ret = MALLOC(sizeof(LDKNetGraphMsgHandler), "LDKNetGraphMsgHandler");
	*ret = NetGraphMsgHandler_from_net_graph(chain_access_conv, logger_conv, network_graph_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1read_1locked_1graph(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKNetGraphMsgHandler* this_arg_conv = (LDKNetGraphMsgHandler*)this_arg;
	LDKLockedNetworkGraph* ret = MALLOC(sizeof(LDKLockedNetworkGraph), "LDKLockedNetworkGraph");
	*ret = NetGraphMsgHandler_read_locked_graph(this_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LockedNetworkGraph_1graph(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKLockedNetworkGraph* this_arg_conv = (LDKLockedNetworkGraph*)this_arg;
	LDKNetworkGraph* ret = MALLOC(sizeof(LDKNetworkGraph), "LDKNetworkGraph");
	*ret = LockedNetworkGraph_graph(this_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1as_1RoutingMessageHandler(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKNetGraphMsgHandler* this_arg_conv = (LDKNetGraphMsgHandler*)this_arg;
	LDKRoutingMessageHandler* ret = MALLOC(sizeof(LDKRoutingMessageHandler), "LDKRoutingMessageHandler");
	*ret = NetGraphMsgHandler_as_RoutingMessageHandler(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv = *(LDKDirectionalChannelInfo*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return DirectionalChannelInfo_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1last_1update(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_get_last_update(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1last_1update(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_set_last_update(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1enabled(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_get_enabled(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1enabled(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean val) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_set_enabled(this_ptr_conv, val);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_get_cltv_expiry_delta(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1cltv_1expiry_1delta(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_set_cltv_expiry_delta(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_get_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1htlc_1minimum_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_set_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1get_1last_1update_1message(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	LDKChannelUpdate* ret = MALLOC(sizeof(LDKChannelUpdate), "LDKChannelUpdate");
	*ret = DirectionalChannelInfo_get_last_update_message(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1set_1last_1update_1message(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	LDKChannelUpdate val_conv = *(LDKChannelUpdate*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return DirectionalChannelInfo_set_last_update_message(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKDirectionalChannelInfo* obj_conv = (LDKDirectionalChannelInfo*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = DirectionalChannelInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKDirectionalChannelInfo* ret = MALLOC(sizeof(LDKDirectionalChannelInfo), "LDKDirectionalChannelInfo");
	*ret = DirectionalChannelInfo_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv = *(LDKChannelInfo*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return ChannelInfo_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKChannelFeatures* ret = MALLOC(sizeof(LDKChannelFeatures), "LDKChannelFeatures");
	*ret = ChannelInfo_get_features(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKChannelFeatures val_conv = *(LDKChannelFeatures*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return ChannelInfo_set_features(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1node_1one(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = ChannelInfo_get_node_one(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1node_1one(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return ChannelInfo_set_node_one(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1one_1to_1two(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo* ret = MALLOC(sizeof(LDKDirectionalChannelInfo), "LDKDirectionalChannelInfo");
	*ret = ChannelInfo_get_one_to_two(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1one_1to_1two(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo val_conv = *(LDKDirectionalChannelInfo*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return ChannelInfo_set_one_to_two(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1node_1two(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey* ret = MALLOC(sizeof(LDKPublicKey), "LDKPublicKey");
	*ret = ChannelInfo_get_node_two(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1node_1two(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	FREE((void*)val);
	return ChannelInfo_set_node_two(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1two_1to_1one(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo* ret = MALLOC(sizeof(LDKDirectionalChannelInfo), "LDKDirectionalChannelInfo");
	*ret = ChannelInfo_get_two_to_one(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1two_1to_1one(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo val_conv = *(LDKDirectionalChannelInfo*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return ChannelInfo_set_two_to_one(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1announcement_1message(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKChannelAnnouncement* ret = MALLOC(sizeof(LDKChannelAnnouncement), "LDKChannelAnnouncement");
	*ret = ChannelInfo_get_announcement_message(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1announcement_1message(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKChannelAnnouncement val_conv = *(LDKChannelAnnouncement*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return ChannelInfo_set_announcement_message(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelInfo* obj_conv = (LDKChannelInfo*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = ChannelInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelInfo* ret = MALLOC(sizeof(LDKChannelInfo), "LDKChannelInfo");
	*ret = ChannelInfo_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees this_ptr_conv = *(LDKRoutingFees*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return RoutingFees_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_RoutingFees_1get_1base_1msat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees* this_ptr_conv = (LDKRoutingFees*)this_ptr;
	return RoutingFees_get_base_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1set_1base_1msat(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKRoutingFees* this_ptr_conv = (LDKRoutingFees*)this_ptr;
	return RoutingFees_set_base_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_RoutingFees_1get_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees* this_ptr_conv = (LDKRoutingFees*)this_ptr;
	return RoutingFees_get_proportional_millionths(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1set_1proportional_1millionths(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKRoutingFees* this_ptr_conv = (LDKRoutingFees*)this_ptr;
	return RoutingFees_set_proportional_millionths(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingFees_1new(JNIEnv * _env, jclass _b, jint base_msat_arg, jint proportional_millionths_arg) {
	LDKRoutingFees* ret = MALLOC(sizeof(LDKRoutingFees), "LDKRoutingFees");
	*ret = RoutingFees_new(base_msat_arg, proportional_millionths_arg);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingFees_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKRoutingFees* ret = MALLOC(sizeof(LDKRoutingFees), "LDKRoutingFees");
	*ret = RoutingFees_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingFees_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRoutingFees* obj_conv = (LDKRoutingFees*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = RoutingFees_write(obj_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv = *(LDKNodeAnnouncementInfo*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return NodeAnnouncementInfo_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKNodeFeatures* ret = MALLOC(sizeof(LDKNodeFeatures), "LDKNodeFeatures");
	*ret = NodeAnnouncementInfo_get_features(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKNodeFeatures val_conv = *(LDKNodeFeatures*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return NodeAnnouncementInfo_set_features(this_ptr_conv, val_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1last_1update(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	return NodeAnnouncementInfo_get_last_update(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1last_1update(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	return NodeAnnouncementInfo_set_last_update(this_ptr_conv, val);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1rgb(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 3);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 3, *NodeAnnouncementInfo_get_rgb(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1rgb(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKThreeBytes val_conv = *(LDKThreeBytes*)val;
	FREE((void*)val);
	return NodeAnnouncementInfo_set_rgb(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1alias(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *NodeAnnouncementInfo_get_alias(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1alias(JNIEnv * _env, jclass _b, jlong this_ptr, jbyteArray val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKThirtyTwoBytes val_ref;
	(*_env)->GetByteArrayRegion (_env, val, 0, 32, val_ref.data);
	return NodeAnnouncementInfo_set_alias(this_ptr_conv, val_ref);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1addresses(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKCVec_NetAddressZ val_conv = *(LDKCVec_NetAddressZ*)val;
	FREE((void*)val);
	return NodeAnnouncementInfo_set_addresses(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1announcement_1message(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKNodeAnnouncement* ret = MALLOC(sizeof(LDKNodeAnnouncement), "LDKNodeAnnouncement");
	*ret = NodeAnnouncementInfo_get_announcement_message(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1announcement_1message(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKNodeAnnouncement val_conv = *(LDKNodeAnnouncement*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return NodeAnnouncementInfo_set_announcement_message(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1new(JNIEnv * _env, jclass _b, jlong features_arg, jint last_update_arg, jlong rgb_arg, jbyteArray alias_arg, jlong addresses_arg, jlong announcement_message_arg) {
	LDKNodeFeatures features_arg_conv = *(LDKNodeFeatures*)features_arg;
	FREE((void*)features_arg);
	features_arg_conv.is_owned = true;
	LDKThreeBytes rgb_arg_conv = *(LDKThreeBytes*)rgb_arg;
	FREE((void*)rgb_arg);
	LDKThirtyTwoBytes alias_arg_ref;
	(*_env)->GetByteArrayRegion (_env, alias_arg, 0, 32, alias_arg_ref.data);
	LDKCVec_NetAddressZ addresses_arg_conv = *(LDKCVec_NetAddressZ*)addresses_arg;
	FREE((void*)addresses_arg);
	LDKNodeAnnouncement announcement_message_arg_conv = *(LDKNodeAnnouncement*)announcement_message_arg;
	FREE((void*)announcement_message_arg);
	announcement_message_arg_conv.is_owned = true;
	LDKNodeAnnouncementInfo* ret = MALLOC(sizeof(LDKNodeAnnouncementInfo), "LDKNodeAnnouncementInfo");
	*ret = NodeAnnouncementInfo_new(features_arg_conv, last_update_arg, rgb_arg_conv, alias_arg_ref, addresses_arg_conv, announcement_message_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeAnnouncementInfo* obj_conv = (LDKNodeAnnouncementInfo*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = NodeAnnouncementInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKNodeAnnouncementInfo* ret = MALLOC(sizeof(LDKNodeAnnouncementInfo), "LDKNodeAnnouncementInfo");
	*ret = NodeAnnouncementInfo_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo this_ptr_conv = *(LDKNodeInfo*)this_ptr;
	FREE((void*)this_ptr);
	this_ptr_conv.is_owned = true;
	return NodeInfo_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1channels(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKCVec_u64Z val_conv = *(LDKCVec_u64Z*)val;
	FREE((void*)val);
	return NodeInfo_set_channels(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1get_1lowest_1inbound_1channel_1fees(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKRoutingFees* ret = MALLOC(sizeof(LDKRoutingFees), "LDKRoutingFees");
	*ret = NodeInfo_get_lowest_inbound_channel_fees(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1lowest_1inbound_1channel_1fees(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKRoutingFees val_conv = *(LDKRoutingFees*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return NodeInfo_set_lowest_inbound_channel_fees(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1get_1announcement_1info(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKNodeAnnouncementInfo* ret = MALLOC(sizeof(LDKNodeAnnouncementInfo), "LDKNodeAnnouncementInfo");
	*ret = NodeInfo_get_announcement_info(this_ptr_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1announcement_1info(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKNodeAnnouncementInfo val_conv = *(LDKNodeAnnouncementInfo*)val;
	FREE((void*)val);
	val_conv.is_owned = true;
	return NodeInfo_set_announcement_info(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1new(JNIEnv * _env, jclass _b, jlong channels_arg, jlong lowest_inbound_channel_fees_arg, jlong announcement_info_arg) {
	LDKCVec_u64Z channels_arg_conv = *(LDKCVec_u64Z*)channels_arg;
	FREE((void*)channels_arg);
	LDKRoutingFees lowest_inbound_channel_fees_arg_conv = *(LDKRoutingFees*)lowest_inbound_channel_fees_arg;
	FREE((void*)lowest_inbound_channel_fees_arg);
	lowest_inbound_channel_fees_arg_conv.is_owned = true;
	LDKNodeAnnouncementInfo announcement_info_arg_conv = *(LDKNodeAnnouncementInfo*)announcement_info_arg;
	FREE((void*)announcement_info_arg);
	announcement_info_arg_conv.is_owned = true;
	LDKNodeInfo* ret = MALLOC(sizeof(LDKNodeInfo), "LDKNodeInfo");
	*ret = NodeInfo_new(channels_arg_conv, lowest_inbound_channel_fees_arg_conv, announcement_info_arg_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeInfo* obj_conv = (LDKNodeInfo*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = NodeInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKNodeInfo* ret = MALLOC(sizeof(LDKNodeInfo), "LDKNodeInfo");
	*ret = NodeInfo_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNetworkGraph* obj_conv = (LDKNetworkGraph*)obj;
	LDKCVec_u8Z* ret = MALLOC(sizeof(LDKCVec_u8Z), "LDKCVec_u8Z");
	*ret = NetworkGraph_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKNetworkGraph* ret = MALLOC(sizeof(LDKNetworkGraph), "LDKNetworkGraph");
	*ret = NetworkGraph_read(ser_conv);
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1new(JNIEnv * _env, jclass _b) {
	LDKNetworkGraph* ret = MALLOC(sizeof(LDKNetworkGraph), "LDKNetworkGraph");
	*ret = NetworkGraph_new();
	DO_ASSERT(ret->is_owned);
	ret->is_owned = false;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1close_1channel_1from_1update(JNIEnv * _env, jclass _b, jlong this_arg, jlong short_channel_id, jboolean is_permanent) {
	LDKNetworkGraph* this_arg_conv = (LDKNetworkGraph*)this_arg;
	return NetworkGraph_close_channel_from_update(this_arg_conv, short_channel_id, is_permanent);
}

