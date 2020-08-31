#include "org_ldk_impl_bindings.h"
#include <rust_types.h>
#include <lightning.h>
#include <assert.h>
#include <string.h>
#include <stdatomic.h>

typedef struct LDKMessageSendEventsProvider_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID get_and_clear_pending_msg_events_meth;
} LDKMessageSendEventsProvider_JCalls;
LDKCVec_MessageSendEventZ get_and_clear_pending_msg_events_jcall(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	LDKCVec_MessageSendEventZ* ret = (LDKCVec_MessageSendEventZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_and_clear_pending_msg_events_meth);
	LDKCVec_MessageSendEventZ res = *ret;
	free(ret);
	return res;
}
void LDKMessageSendEventsProvider_JCalls_free(void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKMessageSendEventsProvider_JCalls_clone(const void* this_arg) {
	LDKMessageSendEventsProvider_JCalls *j_calls = (LDKMessageSendEventsProvider_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKMessageSendEventsProvider_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKMessageSendEventsProvider_JCalls *calls = malloc(sizeof(LDKMessageSendEventsProvider_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_and_clear_pending_msg_events_meth = (*env)->GetMethodID(env, c, "get_and_clear_pending_msg_events", "()J");
	assert(calls->get_and_clear_pending_msg_events_meth != NULL);

	LDKMessageSendEventsProvider *ret = malloc(sizeof(LDKMessageSendEventsProvider));
	ret->this_arg = (void*) calls;
	ret->get_and_clear_pending_msg_events = get_and_clear_pending_msg_events_jcall;
	ret->free = LDKMessageSendEventsProvider_JCalls_free;
	return (long)ret;
}

typedef struct LDKEventsProvider_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID get_and_clear_pending_events_meth;
} LDKEventsProvider_JCalls;
LDKCVec_EventZ get_and_clear_pending_events_jcall(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	LDKCVec_EventZ* ret = (LDKCVec_EventZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_and_clear_pending_events_meth);
	LDKCVec_EventZ res = *ret;
	free(ret);
	return res;
}
void LDKEventsProvider_JCalls_free(void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKEventsProvider_JCalls_clone(const void* this_arg) {
	LDKEventsProvider_JCalls *j_calls = (LDKEventsProvider_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKEventsProvider_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKEventsProvider_JCalls *calls = malloc(sizeof(LDKEventsProvider_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_and_clear_pending_events_meth = (*env)->GetMethodID(env, c, "get_and_clear_pending_events", "()J");
	assert(calls->get_and_clear_pending_events_meth != NULL);

	LDKEventsProvider *ret = malloc(sizeof(LDKEventsProvider));
	ret->this_arg = (void*) calls;
	ret->get_and_clear_pending_events = get_and_clear_pending_events_jcall;
	ret->free = LDKEventsProvider_JCalls_free;
	return (long)ret;
}

typedef struct LDKLogger_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID log_meth;
} LDKLogger_JCalls;
void log_jcall(const void* this_arg, const char *record) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	jstring record_conv = (*j_calls->env)->NewStringUTF(j_calls->env, record);
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->log_meth, record_conv);
}
void LDKLogger_JCalls_free(void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKLogger_JCalls_clone(const void* this_arg) {
	LDKLogger_JCalls *j_calls = (LDKLogger_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKLogger_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKLogger_JCalls *calls = malloc(sizeof(LDKLogger_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->log_meth = (*env)->GetMethodID(env, c, "log", "(Ljava/lang/String;)V");
	assert(calls->log_meth != NULL);

	LDKLogger *ret = malloc(sizeof(LDKLogger));
	ret->this_arg = (void*) calls;
	ret->log = log_jcall;
	ret->free = LDKLogger_JCalls_free;
	return (long)ret;
}

typedef struct LDKChainWatchInterface_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID install_watch_tx_meth;
	jmethodID install_watch_outpoint_meth;
	jmethodID watch_all_txn_meth;
	jmethodID get_chain_utxo_meth;
	jmethodID filter_block_meth;
	jmethodID reentered_meth;
} LDKChainWatchInterface_JCalls;
void install_watch_tx_jcall(const void* this_arg, const uint8_t (*txid)[32], LDKu8slice script_pub_key) {
	LDKChainWatchInterface_JCalls *j_calls = (LDKChainWatchInterface_JCalls*) this_arg;
	jbyteArray txid_arr = (*j_calls->env)->NewByteArray(j_calls->env, 32);
	(*j_calls->env)->SetByteArrayRegion(j_calls->env, txid_arr, 0, 32, *txid);
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->install_watch_tx_meth, txid_arr, script_pub_key);
}
void install_watch_outpoint_jcall(const void* this_arg, LDKC2Tuple_Txidu32Z outpoint, LDKu8slice out_script) {
	LDKChainWatchInterface_JCalls *j_calls = (LDKChainWatchInterface_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->install_watch_outpoint_meth, outpoint, out_script);
}
void watch_all_txn_jcall(const void* this_arg) {
	LDKChainWatchInterface_JCalls *j_calls = (LDKChainWatchInterface_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->watch_all_txn_meth);
}
LDKCResult_C2Tuple_Scriptu64ZChainErrorZ get_chain_utxo_jcall(const void* this_arg, LDKThirtyTwoBytes genesis_hash, uint64_t unspent_tx_output_identifier) {
	LDKChainWatchInterface_JCalls *j_calls = (LDKChainWatchInterface_JCalls*) this_arg;
	LDKCResult_C2Tuple_Scriptu64ZChainErrorZ* ret = (LDKCResult_C2Tuple_Scriptu64ZChainErrorZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_chain_utxo_meth, genesis_hash, unspent_tx_output_identifier);
	LDKCResult_C2Tuple_Scriptu64ZChainErrorZ res = *ret;
	free(ret);
	return res;
}
LDKCVec_usizeZ filter_block_jcall(const void* this_arg, LDKu8slice block) {
	LDKChainWatchInterface_JCalls *j_calls = (LDKChainWatchInterface_JCalls*) this_arg;
	LDKCVec_usizeZ* ret = (LDKCVec_usizeZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->filter_block_meth, block);
	LDKCVec_usizeZ res = *ret;
	free(ret);
	return res;
}
uintptr_t reentered_jcall(const void* this_arg) {
	LDKChainWatchInterface_JCalls *j_calls = (LDKChainWatchInterface_JCalls*) this_arg;
	uintptr_t* ret = (uintptr_t*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->reentered_meth);
	uintptr_t res = *ret;
	free(ret);
	return res;
}
void LDKChainWatchInterface_JCalls_free(void* this_arg) {
	LDKChainWatchInterface_JCalls *j_calls = (LDKChainWatchInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKChainWatchInterface_JCalls_clone(const void* this_arg) {
	LDKChainWatchInterface_JCalls *j_calls = (LDKChainWatchInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKChainWatchInterface_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKChainWatchInterface_JCalls *calls = malloc(sizeof(LDKChainWatchInterface_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->install_watch_tx_meth = (*env)->GetMethodID(env, c, "install_watch_tx", "([BJ)V");
	assert(calls->install_watch_tx_meth != NULL);
	calls->install_watch_outpoint_meth = (*env)->GetMethodID(env, c, "install_watch_outpoint", "(JJ)V");
	assert(calls->install_watch_outpoint_meth != NULL);
	calls->watch_all_txn_meth = (*env)->GetMethodID(env, c, "watch_all_txn", "()V");
	assert(calls->watch_all_txn_meth != NULL);
	calls->get_chain_utxo_meth = (*env)->GetMethodID(env, c, "get_chain_utxo", "(JJ)J");
	assert(calls->get_chain_utxo_meth != NULL);
	calls->filter_block_meth = (*env)->GetMethodID(env, c, "filter_block", "(J)J");
	assert(calls->filter_block_meth != NULL);
	calls->reentered_meth = (*env)->GetMethodID(env, c, "reentered", "()J");
	assert(calls->reentered_meth != NULL);

	LDKChainWatchInterface *ret = malloc(sizeof(LDKChainWatchInterface));
	ret->this_arg = (void*) calls;
	ret->install_watch_tx = install_watch_tx_jcall;
	ret->install_watch_outpoint = install_watch_outpoint_jcall;
	ret->watch_all_txn = watch_all_txn_jcall;
	ret->get_chain_utxo = get_chain_utxo_jcall;
	ret->filter_block = filter_block_jcall;
	ret->reentered = reentered_jcall;
	ret->free = LDKChainWatchInterface_JCalls_free;
	return (long)ret;
}

typedef struct LDKBroadcasterInterface_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID broadcast_transaction_meth;
} LDKBroadcasterInterface_JCalls;
void broadcast_transaction_jcall(const void* this_arg, LDKTransaction tx) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->broadcast_transaction_meth, tx);
}
void LDKBroadcasterInterface_JCalls_free(void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKBroadcasterInterface_JCalls_clone(const void* this_arg) {
	LDKBroadcasterInterface_JCalls *j_calls = (LDKBroadcasterInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKBroadcasterInterface_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKBroadcasterInterface_JCalls *calls = malloc(sizeof(LDKBroadcasterInterface_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->broadcast_transaction_meth = (*env)->GetMethodID(env, c, "broadcast_transaction", "(J)V");
	assert(calls->broadcast_transaction_meth != NULL);

	LDKBroadcasterInterface *ret = malloc(sizeof(LDKBroadcasterInterface));
	ret->this_arg = (void*) calls;
	ret->broadcast_transaction = broadcast_transaction_jcall;
	ret->free = LDKBroadcasterInterface_JCalls_free;
	return (long)ret;
}

typedef struct LDKChainListener_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID block_connected_meth;
	jmethodID block_disconnected_meth;
} LDKChainListener_JCalls;
void block_connected_jcall(const void* this_arg, const uint8_t (*header)[80], uint32_t height, LDKCVec_TransactionZ txn_matched, LDKusizeslice indexes_of_txn_matched) {
	LDKChainListener_JCalls *j_calls = (LDKChainListener_JCalls*) this_arg;
	jbyteArray header_arr = (*j_calls->env)->NewByteArray(j_calls->env, 80);
	(*j_calls->env)->SetByteArrayRegion(j_calls->env, header_arr, 0, 80, *header);
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->block_connected_meth, header_arr, height, txn_matched, indexes_of_txn_matched);
}
void block_disconnected_jcall(const void* this_arg, const uint8_t (*header)[80], uint32_t disconnected_height) {
	LDKChainListener_JCalls *j_calls = (LDKChainListener_JCalls*) this_arg;
	jbyteArray header_arr = (*j_calls->env)->NewByteArray(j_calls->env, 80);
	(*j_calls->env)->SetByteArrayRegion(j_calls->env, header_arr, 0, 80, *header);
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->block_disconnected_meth, header_arr, disconnected_height);
}
void LDKChainListener_JCalls_free(void* this_arg) {
	LDKChainListener_JCalls *j_calls = (LDKChainListener_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKChainListener_JCalls_clone(const void* this_arg) {
	LDKChainListener_JCalls *j_calls = (LDKChainListener_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKChainListener_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKChainListener_JCalls *calls = malloc(sizeof(LDKChainListener_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->block_connected_meth = (*env)->GetMethodID(env, c, "block_connected", "([BIJJ)V");
	assert(calls->block_connected_meth != NULL);
	calls->block_disconnected_meth = (*env)->GetMethodID(env, c, "block_disconnected", "([BI)V");
	assert(calls->block_disconnected_meth != NULL);

	LDKChainListener *ret = malloc(sizeof(LDKChainListener));
	ret->this_arg = (void*) calls;
	ret->block_connected = block_connected_jcall;
	ret->block_disconnected = block_disconnected_jcall;
	ret->free = LDKChainListener_JCalls_free;
	return (long)ret;
}

typedef struct LDKFeeEstimator_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID get_est_sat_per_1000_weight_meth;
} LDKFeeEstimator_JCalls;
uint32_t get_est_sat_per_1000_weight_jcall(const void* this_arg, LDKConfirmationTarget confirmation_target) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	return (*j_calls->env)->CallIntMethod(j_calls->env, j_calls->o, j_calls->get_est_sat_per_1000_weight_meth, confirmation_target);
}
void LDKFeeEstimator_JCalls_free(void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKFeeEstimator_JCalls_clone(const void* this_arg) {
	LDKFeeEstimator_JCalls *j_calls = (LDKFeeEstimator_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKFeeEstimator_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKFeeEstimator_JCalls *calls = malloc(sizeof(LDKFeeEstimator_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_est_sat_per_1000_weight_meth = (*env)->GetMethodID(env, c, "get_est_sat_per_1000_weight", "(J)I");
	assert(calls->get_est_sat_per_1000_weight_meth != NULL);

	LDKFeeEstimator *ret = malloc(sizeof(LDKFeeEstimator));
	ret->this_arg = (void*) calls;
	ret->get_est_sat_per_1000_weight = get_est_sat_per_1000_weight_jcall;
	ret->free = LDKFeeEstimator_JCalls_free;
	return (long)ret;
}

typedef struct LDKChannelKeys_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID get_per_commitment_point_meth;
	jmethodID release_commitment_secret_meth;
	jmethodID key_derivation_params_meth;
	jmethodID sign_remote_commitment_meth;
	jmethodID sign_local_commitment_meth;
	jmethodID sign_local_commitment_htlc_transactions_meth;
	jmethodID sign_justice_transaction_meth;
	jmethodID sign_remote_htlc_transaction_meth;
	jmethodID sign_closing_transaction_meth;
	jmethodID sign_channel_announcement_meth;
	jmethodID on_accept_meth;
} LDKChannelKeys_JCalls;
LDKPublicKey get_per_commitment_point_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKPublicKey* ret = (LDKPublicKey*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_per_commitment_point_meth, idx);
	LDKPublicKey res = *ret;
	free(ret);
	return res;
}
LDKThirtyTwoBytes release_commitment_secret_jcall(const void* this_arg, uint64_t idx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKThirtyTwoBytes* ret = (LDKThirtyTwoBytes*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->release_commitment_secret_meth, idx);
	LDKThirtyTwoBytes res = *ret;
	free(ret);
	return res;
}
LDKC2Tuple_u64u64Z key_derivation_params_jcall(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKC2Tuple_u64u64Z* ret = (LDKC2Tuple_u64u64Z*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->key_derivation_params_meth);
	LDKC2Tuple_u64u64Z res = *ret;
	free(ret);
	return res;
}
LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ sign_remote_commitment_jcall(const void* this_arg, uint32_t feerate_per_kw, LDKTransaction commitment_tx, const LDKPreCalculatedTxCreationKeys *keys, LDKCVec_HTLCOutputInCommitmentZ htlcs) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = (LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->sign_remote_commitment_meth, feerate_per_kw, commitment_tx, keys, htlcs);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ res = *ret;
	free(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_local_commitment_jcall(const void* this_arg, const LDKLocalCommitmentTransaction *local_commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->sign_local_commitment_meth, local_commitment_tx);
	LDKCResult_SignatureNoneZ res = *ret;
	free(ret);
	return res;
}
LDKCResult_CVec_SignatureZNoneZ sign_local_commitment_htlc_transactions_jcall(const void* this_arg, const LDKLocalCommitmentTransaction *local_commitment_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKCResult_CVec_SignatureZNoneZ* ret = (LDKCResult_CVec_SignatureZNoneZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->sign_local_commitment_htlc_transactions_meth, local_commitment_tx);
	LDKCResult_CVec_SignatureZNoneZ res = *ret;
	free(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_justice_transaction_jcall(const void* this_arg, LDKTransaction justice_tx, uintptr_t input, uint64_t amount, const uint8_t (*per_commitment_key)[32], const LDKHTLCOutputInCommitment *htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	jbyteArray per_commitment_key_arr = (*j_calls->env)->NewByteArray(j_calls->env, 32);
	(*j_calls->env)->SetByteArrayRegion(j_calls->env, per_commitment_key_arr, 0, 32, *per_commitment_key);
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->sign_justice_transaction_meth, justice_tx, input, amount, per_commitment_key_arr, htlc);
	LDKCResult_SignatureNoneZ res = *ret;
	free(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_remote_htlc_transaction_jcall(const void* this_arg, LDKTransaction htlc_tx, uintptr_t input, uint64_t amount, LDKPublicKey per_commitment_point, const LDKHTLCOutputInCommitment *htlc) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->sign_remote_htlc_transaction_meth, htlc_tx, input, amount, per_commitment_point, htlc);
	LDKCResult_SignatureNoneZ res = *ret;
	free(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_closing_transaction_jcall(const void* this_arg, LDKTransaction closing_tx) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->sign_closing_transaction_meth, closing_tx);
	LDKCResult_SignatureNoneZ res = *ret;
	free(ret);
	return res;
}
LDKCResult_SignatureNoneZ sign_channel_announcement_jcall(const void* this_arg, const LDKUnsignedChannelAnnouncement *msg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	LDKCResult_SignatureNoneZ* ret = (LDKCResult_SignatureNoneZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->sign_channel_announcement_meth, msg);
	LDKCResult_SignatureNoneZ res = *ret;
	free(ret);
	return res;
}
void on_accept_jcall(void* this_arg, const LDKChannelPublicKeys *channel_points, uint16_t remote_to_self_delay, uint16_t local_to_self_delay) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->on_accept_meth, channel_points, remote_to_self_delay, local_to_self_delay);
}
void LDKChannelKeys_JCalls_free(void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKChannelKeys_JCalls_clone(const void* this_arg) {
	LDKChannelKeys_JCalls *j_calls = (LDKChannelKeys_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKChannelKeys_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKChannelKeys_JCalls *calls = malloc(sizeof(LDKChannelKeys_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_per_commitment_point_meth = (*env)->GetMethodID(env, c, "get_per_commitment_point", "(J)J");
	assert(calls->get_per_commitment_point_meth != NULL);
	calls->release_commitment_secret_meth = (*env)->GetMethodID(env, c, "release_commitment_secret", "(J)J");
	assert(calls->release_commitment_secret_meth != NULL);
	calls->key_derivation_params_meth = (*env)->GetMethodID(env, c, "key_derivation_params", "()J");
	assert(calls->key_derivation_params_meth != NULL);
	calls->sign_remote_commitment_meth = (*env)->GetMethodID(env, c, "sign_remote_commitment", "(IJJJ)J");
	assert(calls->sign_remote_commitment_meth != NULL);
	calls->sign_local_commitment_meth = (*env)->GetMethodID(env, c, "sign_local_commitment", "(J)J");
	assert(calls->sign_local_commitment_meth != NULL);
	calls->sign_local_commitment_htlc_transactions_meth = (*env)->GetMethodID(env, c, "sign_local_commitment_htlc_transactions", "(J)J");
	assert(calls->sign_local_commitment_htlc_transactions_meth != NULL);
	calls->sign_justice_transaction_meth = (*env)->GetMethodID(env, c, "sign_justice_transaction", "(JJJ[BJ)J");
	assert(calls->sign_justice_transaction_meth != NULL);
	calls->sign_remote_htlc_transaction_meth = (*env)->GetMethodID(env, c, "sign_remote_htlc_transaction", "(JJJJJ)J");
	assert(calls->sign_remote_htlc_transaction_meth != NULL);
	calls->sign_closing_transaction_meth = (*env)->GetMethodID(env, c, "sign_closing_transaction", "(J)J");
	assert(calls->sign_closing_transaction_meth != NULL);
	calls->sign_channel_announcement_meth = (*env)->GetMethodID(env, c, "sign_channel_announcement", "(J)J");
	assert(calls->sign_channel_announcement_meth != NULL);
	calls->on_accept_meth = (*env)->GetMethodID(env, c, "on_accept", "(JSS)V");
	assert(calls->on_accept_meth != NULL);

	LDKChannelKeys *ret = malloc(sizeof(LDKChannelKeys));
	ret->this_arg = (void*) calls;
	ret->get_per_commitment_point = get_per_commitment_point_jcall;
	ret->release_commitment_secret = release_commitment_secret_jcall;
	ret->key_derivation_params = key_derivation_params_jcall;
	ret->sign_remote_commitment = sign_remote_commitment_jcall;
	ret->sign_local_commitment = sign_local_commitment_jcall;
	ret->sign_local_commitment_htlc_transactions = sign_local_commitment_htlc_transactions_jcall;
	ret->sign_justice_transaction = sign_justice_transaction_jcall;
	ret->sign_remote_htlc_transaction = sign_remote_htlc_transaction_jcall;
	ret->sign_closing_transaction = sign_closing_transaction_jcall;
	ret->sign_channel_announcement = sign_channel_announcement_jcall;
	ret->on_accept = on_accept_jcall;
	ret->clone = LDKChannelKeys_JCalls_clone;
	ret->free = LDKChannelKeys_JCalls_free;
	return (long)ret;
}

typedef struct LDKKeysInterface_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID get_node_secret_meth;
	jmethodID get_destination_script_meth;
	jmethodID get_shutdown_pubkey_meth;
	jmethodID get_channel_keys_meth;
	jmethodID get_secure_random_bytes_meth;
} LDKKeysInterface_JCalls;
LDKSecretKey get_node_secret_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	LDKSecretKey* ret = (LDKSecretKey*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_node_secret_meth);
	LDKSecretKey res = *ret;
	free(ret);
	return res;
}
LDKCVec_u8Z get_destination_script_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	LDKCVec_u8Z* ret = (LDKCVec_u8Z*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_destination_script_meth);
	LDKCVec_u8Z res = *ret;
	free(ret);
	return res;
}
LDKPublicKey get_shutdown_pubkey_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	LDKPublicKey* ret = (LDKPublicKey*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_shutdown_pubkey_meth);
	LDKPublicKey res = *ret;
	free(ret);
	return res;
}
LDKChannelKeys get_channel_keys_jcall(const void* this_arg, bool inbound, uint64_t channel_value_satoshis) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	LDKChannelKeys* ret = (LDKChannelKeys*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_channel_keys_meth, inbound, channel_value_satoshis);
	LDKChannelKeys res = *ret;
	free(ret);
	return res;
}
LDKThirtyTwoBytes get_secure_random_bytes_jcall(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	LDKThirtyTwoBytes* ret = (LDKThirtyTwoBytes*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_secure_random_bytes_meth);
	LDKThirtyTwoBytes res = *ret;
	free(ret);
	return res;
}
void LDKKeysInterface_JCalls_free(void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKKeysInterface_JCalls_clone(const void* this_arg) {
	LDKKeysInterface_JCalls *j_calls = (LDKKeysInterface_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKKeysInterface_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKKeysInterface_JCalls *calls = malloc(sizeof(LDKKeysInterface_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->get_node_secret_meth = (*env)->GetMethodID(env, c, "get_node_secret", "()J");
	assert(calls->get_node_secret_meth != NULL);
	calls->get_destination_script_meth = (*env)->GetMethodID(env, c, "get_destination_script", "()J");
	assert(calls->get_destination_script_meth != NULL);
	calls->get_shutdown_pubkey_meth = (*env)->GetMethodID(env, c, "get_shutdown_pubkey", "()J");
	assert(calls->get_shutdown_pubkey_meth != NULL);
	calls->get_channel_keys_meth = (*env)->GetMethodID(env, c, "get_channel_keys", "(ZJ)J");
	assert(calls->get_channel_keys_meth != NULL);
	calls->get_secure_random_bytes_meth = (*env)->GetMethodID(env, c, "get_secure_random_bytes", "()J");
	assert(calls->get_secure_random_bytes_meth != NULL);

	LDKKeysInterface *ret = malloc(sizeof(LDKKeysInterface));
	ret->this_arg = (void*) calls;
	ret->get_node_secret = get_node_secret_jcall;
	ret->get_destination_script = get_destination_script_jcall;
	ret->get_shutdown_pubkey = get_shutdown_pubkey_jcall;
	ret->get_channel_keys = get_channel_keys_jcall;
	ret->get_secure_random_bytes = get_secure_random_bytes_jcall;
	ret->free = LDKKeysInterface_JCalls_free;
	return (long)ret;
}

typedef struct LDKManyChannelMonitor_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID add_monitor_meth;
	jmethodID update_monitor_meth;
	jmethodID get_and_clear_pending_monitor_events_meth;
} LDKManyChannelMonitor_JCalls;
LDKCResult_NoneChannelMonitorUpdateErrZ add_monitor_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitor monitor) {
	LDKManyChannelMonitor_JCalls *j_calls = (LDKManyChannelMonitor_JCalls*) this_arg;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->add_monitor_meth, funding_txo, monitor);
	LDKCResult_NoneChannelMonitorUpdateErrZ res = *ret;
	free(ret);
	return res;
}
LDKCResult_NoneChannelMonitorUpdateErrZ update_monitor_jcall(const void* this_arg, LDKOutPoint funding_txo, LDKChannelMonitorUpdate monitor) {
	LDKManyChannelMonitor_JCalls *j_calls = (LDKManyChannelMonitor_JCalls*) this_arg;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = (LDKCResult_NoneChannelMonitorUpdateErrZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->update_monitor_meth, funding_txo, monitor);
	LDKCResult_NoneChannelMonitorUpdateErrZ res = *ret;
	free(ret);
	return res;
}
LDKCVec_MonitorEventZ get_and_clear_pending_monitor_events_jcall(const void* this_arg) {
	LDKManyChannelMonitor_JCalls *j_calls = (LDKManyChannelMonitor_JCalls*) this_arg;
	LDKCVec_MonitorEventZ* ret = (LDKCVec_MonitorEventZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_and_clear_pending_monitor_events_meth);
	LDKCVec_MonitorEventZ res = *ret;
	free(ret);
	return res;
}
void LDKManyChannelMonitor_JCalls_free(void* this_arg) {
	LDKManyChannelMonitor_JCalls *j_calls = (LDKManyChannelMonitor_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKManyChannelMonitor_JCalls_clone(const void* this_arg) {
	LDKManyChannelMonitor_JCalls *j_calls = (LDKManyChannelMonitor_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKManyChannelMonitor_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKManyChannelMonitor_JCalls *calls = malloc(sizeof(LDKManyChannelMonitor_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->add_monitor_meth = (*env)->GetMethodID(env, c, "add_monitor", "(JJ)J");
	assert(calls->add_monitor_meth != NULL);
	calls->update_monitor_meth = (*env)->GetMethodID(env, c, "update_monitor", "(JJ)J");
	assert(calls->update_monitor_meth != NULL);
	calls->get_and_clear_pending_monitor_events_meth = (*env)->GetMethodID(env, c, "get_and_clear_pending_monitor_events", "()J");
	assert(calls->get_and_clear_pending_monitor_events_meth != NULL);

	LDKManyChannelMonitor *ret = malloc(sizeof(LDKManyChannelMonitor));
	ret->this_arg = (void*) calls;
	ret->add_monitor = add_monitor_jcall;
	ret->update_monitor = update_monitor_jcall;
	ret->get_and_clear_pending_monitor_events = get_and_clear_pending_monitor_events_jcall;
	ret->free = LDKManyChannelMonitor_JCalls_free;
	return (long)ret;
}

typedef struct LDKChannelMessageHandler_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
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
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_open_channel_meth, their_node_id, their_features, msg);
}
void handle_accept_channel_jcall(const void* this_arg, LDKPublicKey their_node_id, LDKInitFeatures their_features, const LDKAcceptChannel *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_accept_channel_meth, their_node_id, their_features, msg);
}
void handle_funding_created_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingCreated *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_funding_created_meth, their_node_id, msg);
}
void handle_funding_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingSigned *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_funding_signed_meth, their_node_id, msg);
}
void handle_funding_locked_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKFundingLocked *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_funding_locked_meth, their_node_id, msg);
}
void handle_shutdown_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKShutdown *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_shutdown_meth, their_node_id, msg);
}
void handle_closing_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKClosingSigned *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_closing_signed_meth, their_node_id, msg);
}
void handle_update_add_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateAddHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_update_add_htlc_meth, their_node_id, msg);
}
void handle_update_fulfill_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFulfillHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_update_fulfill_htlc_meth, their_node_id, msg);
}
void handle_update_fail_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_update_fail_htlc_meth, their_node_id, msg);
}
void handle_update_fail_malformed_htlc_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFailMalformedHTLC *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_update_fail_malformed_htlc_meth, their_node_id, msg);
}
void handle_commitment_signed_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKCommitmentSigned *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_commitment_signed_meth, their_node_id, msg);
}
void handle_revoke_and_ack_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKRevokeAndACK *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_revoke_and_ack_meth, their_node_id, msg);
}
void handle_update_fee_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKUpdateFee *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_update_fee_meth, their_node_id, msg);
}
void handle_announcement_signatures_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKAnnouncementSignatures *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_announcement_signatures_meth, their_node_id, msg);
}
void peer_disconnected_jcall(const void* this_arg, LDKPublicKey their_node_id, bool no_connection_possible) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->peer_disconnected_meth, their_node_id, no_connection_possible);
}
void peer_connected_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKInit *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->peer_connected_meth, their_node_id, msg);
}
void handle_channel_reestablish_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKChannelReestablish *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_channel_reestablish_meth, their_node_id, msg);
}
void handle_error_jcall(const void* this_arg, LDKPublicKey their_node_id, const LDKErrorMessage *msg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_error_meth, their_node_id, msg);
}
void LDKChannelMessageHandler_JCalls_free(void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKChannelMessageHandler_JCalls_clone(const void* this_arg) {
	LDKChannelMessageHandler_JCalls *j_calls = (LDKChannelMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	atomic_fetch_add_explicit(&j_calls->MessageSendEventsProvider->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKChannelMessageHandler_1new (JNIEnv * env, jclass _a, jobject o, jobject MessageSendEventsProvider) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKChannelMessageHandler_JCalls *calls = malloc(sizeof(LDKChannelMessageHandler_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->handle_open_channel_meth = (*env)->GetMethodID(env, c, "handle_open_channel", "(JJJ)V");
	assert(calls->handle_open_channel_meth != NULL);
	calls->handle_accept_channel_meth = (*env)->GetMethodID(env, c, "handle_accept_channel", "(JJJ)V");
	assert(calls->handle_accept_channel_meth != NULL);
	calls->handle_funding_created_meth = (*env)->GetMethodID(env, c, "handle_funding_created", "(JJ)V");
	assert(calls->handle_funding_created_meth != NULL);
	calls->handle_funding_signed_meth = (*env)->GetMethodID(env, c, "handle_funding_signed", "(JJ)V");
	assert(calls->handle_funding_signed_meth != NULL);
	calls->handle_funding_locked_meth = (*env)->GetMethodID(env, c, "handle_funding_locked", "(JJ)V");
	assert(calls->handle_funding_locked_meth != NULL);
	calls->handle_shutdown_meth = (*env)->GetMethodID(env, c, "handle_shutdown", "(JJ)V");
	assert(calls->handle_shutdown_meth != NULL);
	calls->handle_closing_signed_meth = (*env)->GetMethodID(env, c, "handle_closing_signed", "(JJ)V");
	assert(calls->handle_closing_signed_meth != NULL);
	calls->handle_update_add_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_add_htlc", "(JJ)V");
	assert(calls->handle_update_add_htlc_meth != NULL);
	calls->handle_update_fulfill_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_fulfill_htlc", "(JJ)V");
	assert(calls->handle_update_fulfill_htlc_meth != NULL);
	calls->handle_update_fail_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_fail_htlc", "(JJ)V");
	assert(calls->handle_update_fail_htlc_meth != NULL);
	calls->handle_update_fail_malformed_htlc_meth = (*env)->GetMethodID(env, c, "handle_update_fail_malformed_htlc", "(JJ)V");
	assert(calls->handle_update_fail_malformed_htlc_meth != NULL);
	calls->handle_commitment_signed_meth = (*env)->GetMethodID(env, c, "handle_commitment_signed", "(JJ)V");
	assert(calls->handle_commitment_signed_meth != NULL);
	calls->handle_revoke_and_ack_meth = (*env)->GetMethodID(env, c, "handle_revoke_and_ack", "(JJ)V");
	assert(calls->handle_revoke_and_ack_meth != NULL);
	calls->handle_update_fee_meth = (*env)->GetMethodID(env, c, "handle_update_fee", "(JJ)V");
	assert(calls->handle_update_fee_meth != NULL);
	calls->handle_announcement_signatures_meth = (*env)->GetMethodID(env, c, "handle_announcement_signatures", "(JJ)V");
	assert(calls->handle_announcement_signatures_meth != NULL);
	calls->peer_disconnected_meth = (*env)->GetMethodID(env, c, "peer_disconnected", "(JZ)V");
	assert(calls->peer_disconnected_meth != NULL);
	calls->peer_connected_meth = (*env)->GetMethodID(env, c, "peer_connected", "(JJ)V");
	assert(calls->peer_connected_meth != NULL);
	calls->handle_channel_reestablish_meth = (*env)->GetMethodID(env, c, "handle_channel_reestablish", "(JJ)V");
	assert(calls->handle_channel_reestablish_meth != NULL);
	calls->handle_error_meth = (*env)->GetMethodID(env, c, "handle_error", "(JJ)V");
	assert(calls->handle_error_meth != NULL);

	LDKChannelMessageHandler *ret = malloc(sizeof(LDKChannelMessageHandler));
	ret->this_arg = (void*) calls;
	ret->handle_open_channel = handle_open_channel_jcall;
	ret->handle_accept_channel = handle_accept_channel_jcall;
	ret->handle_funding_created = handle_funding_created_jcall;
	ret->handle_funding_signed = handle_funding_signed_jcall;
	ret->handle_funding_locked = handle_funding_locked_jcall;
	ret->handle_shutdown = handle_shutdown_jcall;
	ret->handle_closing_signed = handle_closing_signed_jcall;
	ret->handle_update_add_htlc = handle_update_add_htlc_jcall;
	ret->handle_update_fulfill_htlc = handle_update_fulfill_htlc_jcall;
	ret->handle_update_fail_htlc = handle_update_fail_htlc_jcall;
	ret->handle_update_fail_malformed_htlc = handle_update_fail_malformed_htlc_jcall;
	ret->handle_commitment_signed = handle_commitment_signed_jcall;
	ret->handle_revoke_and_ack = handle_revoke_and_ack_jcall;
	ret->handle_update_fee = handle_update_fee_jcall;
	ret->handle_announcement_signatures = handle_announcement_signatures_jcall;
	ret->peer_disconnected = peer_disconnected_jcall;
	ret->peer_connected = peer_connected_jcall;
	ret->handle_channel_reestablish = handle_channel_reestablish_jcall;
	ret->handle_error = handle_error_jcall;
	ret->free = LDKChannelMessageHandler_JCalls_free;
	ret->MessageSendEventsProvider = *(LDKMessageSendEventsProvider*)Java_org_ldk_impl_bindings_LDKMessageSendEventsProvider_1new(env, _a, MessageSendEventsProvider);
	calls->MessageSendEventsProvider = ret->MessageSendEventsProvider.this_arg;
	return (long)ret;
}

typedef struct LDKRoutingMessageHandler_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
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
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->handle_node_announcement_meth, msg);
	LDKCResult_boolLightningErrorZ res = *ret;
	free(ret);
	return res;
}
LDKCResult_boolLightningErrorZ handle_channel_announcement_jcall(const void* this_arg, const LDKChannelAnnouncement *msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->handle_channel_announcement_meth, msg);
	LDKCResult_boolLightningErrorZ res = *ret;
	free(ret);
	return res;
}
LDKCResult_boolLightningErrorZ handle_channel_update_jcall(const void* this_arg, const LDKChannelUpdate *msg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKCResult_boolLightningErrorZ* ret = (LDKCResult_boolLightningErrorZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->handle_channel_update_meth, msg);
	LDKCResult_boolLightningErrorZ res = *ret;
	free(ret);
	return res;
}
void handle_htlc_fail_channel_update_jcall(const void* this_arg, const LDKHTLCFailChannelUpdate *update) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->handle_htlc_fail_channel_update_meth, update);
}
LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ get_next_channel_announcements_jcall(const void* this_arg, uint64_t starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ* ret = (LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_next_channel_announcements_meth, starting_point, batch_amount);
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ res = *ret;
	free(ret);
	return res;
}
LDKCVec_NodeAnnouncementZ get_next_node_announcements_jcall(const void* this_arg, LDKPublicKey starting_point, uint8_t batch_amount) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	LDKCVec_NodeAnnouncementZ* ret = (LDKCVec_NodeAnnouncementZ*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->get_next_node_announcements_meth, starting_point, batch_amount);
	LDKCVec_NodeAnnouncementZ res = *ret;
	free(ret);
	return res;
}
bool should_request_full_sync_jcall(const void* this_arg, LDKPublicKey node_id) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	return (*j_calls->env)->CallBooleanMethod(j_calls->env, j_calls->o, j_calls->should_request_full_sync_meth, node_id);
}
void LDKRoutingMessageHandler_JCalls_free(void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKRoutingMessageHandler_JCalls_clone(const void* this_arg) {
	LDKRoutingMessageHandler_JCalls *j_calls = (LDKRoutingMessageHandler_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKRoutingMessageHandler_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKRoutingMessageHandler_JCalls *calls = malloc(sizeof(LDKRoutingMessageHandler_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->handle_node_announcement_meth = (*env)->GetMethodID(env, c, "handle_node_announcement", "(J)J");
	assert(calls->handle_node_announcement_meth != NULL);
	calls->handle_channel_announcement_meth = (*env)->GetMethodID(env, c, "handle_channel_announcement", "(J)J");
	assert(calls->handle_channel_announcement_meth != NULL);
	calls->handle_channel_update_meth = (*env)->GetMethodID(env, c, "handle_channel_update", "(J)J");
	assert(calls->handle_channel_update_meth != NULL);
	calls->handle_htlc_fail_channel_update_meth = (*env)->GetMethodID(env, c, "handle_htlc_fail_channel_update", "(J)V");
	assert(calls->handle_htlc_fail_channel_update_meth != NULL);
	calls->get_next_channel_announcements_meth = (*env)->GetMethodID(env, c, "get_next_channel_announcements", "(JB)J");
	assert(calls->get_next_channel_announcements_meth != NULL);
	calls->get_next_node_announcements_meth = (*env)->GetMethodID(env, c, "get_next_node_announcements", "(JB)J");
	assert(calls->get_next_node_announcements_meth != NULL);
	calls->should_request_full_sync_meth = (*env)->GetMethodID(env, c, "should_request_full_sync", "(J)Z");
	assert(calls->should_request_full_sync_meth != NULL);

	LDKRoutingMessageHandler *ret = malloc(sizeof(LDKRoutingMessageHandler));
	ret->this_arg = (void*) calls;
	ret->handle_node_announcement = handle_node_announcement_jcall;
	ret->handle_channel_announcement = handle_channel_announcement_jcall;
	ret->handle_channel_update = handle_channel_update_jcall;
	ret->handle_htlc_fail_channel_update = handle_htlc_fail_channel_update_jcall;
	ret->get_next_channel_announcements = get_next_channel_announcements_jcall;
	ret->get_next_node_announcements = get_next_node_announcements_jcall;
	ret->should_request_full_sync = should_request_full_sync_jcall;
	ret->free = LDKRoutingMessageHandler_JCalls_free;
	return (long)ret;
}

typedef struct LDKSocketDescriptor_JCalls {
	atomic_size_t refcnt;
	JNIEnv *env;
	jobject o;
	jmethodID send_data_meth;
	jmethodID disconnect_socket_meth;
	jmethodID eq_meth;
	jmethodID hash_meth;
} LDKSocketDescriptor_JCalls;
uintptr_t send_data_jcall(void* this_arg, LDKu8slice data, bool resume_read) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	uintptr_t* ret = (uintptr_t*)(*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->send_data_meth, data, resume_read);
	uintptr_t res = *ret;
	free(ret);
	return res;
}
void disconnect_socket_jcall(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	return (*j_calls->env)->CallVoidMethod(j_calls->env, j_calls->o, j_calls->disconnect_socket_meth);
}
bool eq_jcall(const void* this_arg, const void *other_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	return (*j_calls->env)->CallBooleanMethod(j_calls->env, j_calls->o, j_calls->eq_meth, other_arg);
}
uint64_t hash_jcall(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	return (*j_calls->env)->CallLongMethod(j_calls->env, j_calls->o, j_calls->hash_meth);
}
void LDKSocketDescriptor_JCalls_free(void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	if (atomic_fetch_sub_explicit(&j_calls->refcnt, 1, memory_order_acquire) == 1) {
		(*j_calls->env)->DeleteGlobalRef(j_calls->env, j_calls->o);
		free(j_calls);
	}
}
void* LDKSocketDescriptor_JCalls_clone(const void* this_arg) {
	LDKSocketDescriptor_JCalls *j_calls = (LDKSocketDescriptor_JCalls*) this_arg;
	atomic_fetch_add_explicit(&j_calls->refcnt, 1, memory_order_release);
	return (void*) this_arg;
}
JNIEXPORT long JNICALL Java_org_ldk_impl_bindings_LDKSocketDescriptor_1new (JNIEnv * env, jclass _a, jobject o) {
	jclass c = (*env)->GetObjectClass(env, o);
	assert(c != NULL);
	LDKSocketDescriptor_JCalls *calls = malloc(sizeof(LDKSocketDescriptor_JCalls));
	atomic_init(&calls->refcnt, 1);
	calls->env = env;
	calls->o = (*env)->NewGlobalRef(env, o);
	calls->send_data_meth = (*env)->GetMethodID(env, c, "send_data", "(JZ)J");
	assert(calls->send_data_meth != NULL);
	calls->disconnect_socket_meth = (*env)->GetMethodID(env, c, "disconnect_socket", "()V");
	assert(calls->disconnect_socket_meth != NULL);
	calls->eq_meth = (*env)->GetMethodID(env, c, "eq", "(V)Z");
	assert(calls->eq_meth != NULL);
	calls->hash_meth = (*env)->GetMethodID(env, c, "hash", "()J");
	assert(calls->hash_meth != NULL);

	LDKSocketDescriptor *ret = malloc(sizeof(LDKSocketDescriptor));
	ret->this_arg = (void*) calls;
	ret->send_data = send_data_jcall;
	ret->disconnect_socket = disconnect_socket_jcall;
	ret->eq = eq_jcall;
	ret->hash = hash_jcall;
	ret->clone = LDKSocketDescriptor_JCalls_clone;
	ret->free = LDKSocketDescriptor_JCalls_free;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1HTLCOutputInCommitmentSignatureZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_HTLCOutputInCommitmentSignatureZ arg_conv = *(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ*)arg;
	free((void*)arg);
	return C2Tuple_HTLCOutputInCommitmentSignatureZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1OutPointScriptZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_OutPointScriptZ arg_conv = *(LDKC2Tuple_OutPointScriptZ*)arg;
	free((void*)arg);
	return C2Tuple_OutPointScriptZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1Scriptu64Z_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_Scriptu64Z arg_conv = *(LDKC2Tuple_Scriptu64Z*)arg;
	free((void*)arg);
	return C2Tuple_Scriptu64Z_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1SignatureCVec_1SignatureZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_SignatureCVec_SignatureZZ arg_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)arg;
	free((void*)arg);
	return C2Tuple_SignatureCVec_SignatureZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1Txidu32Z_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_Txidu32Z arg_conv = *(LDKC2Tuple_Txidu32Z*)arg;
	free((void*)arg);
	return C2Tuple_Txidu32Z_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u64u64Z_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_u64u64Z arg_conv = *(LDKC2Tuple_u64u64Z*)arg;
	free((void*)arg);
	return C2Tuple_u64u64Z_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arg_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arg;
	free((void*)arg);
	return C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1Scriptu64ZChainErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKChainError arg_conv = *(LDKChainError*)arg;
	free((void*)arg);
	LDKCResult_C2Tuple_Scriptu64ZChainErrorZ* ret = malloc(sizeof(LDKCResult_C2Tuple_Scriptu64ZChainErrorZ));
	*ret = CResult_C2Tuple_Scriptu64ZChainErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1Scriptu64ZChainErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_C2Tuple_Scriptu64ZChainErrorZ arg_conv = *(LDKCResult_C2Tuple_Scriptu64ZChainErrorZ*)arg;
	free((void*)arg);
	return CResult_C2Tuple_Scriptu64ZChainErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1Scriptu64ZChainErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_Scriptu64Z arg_conv = *(LDKC2Tuple_Scriptu64Z*)arg;
	free((void*)arg);
	LDKCResult_C2Tuple_Scriptu64ZChainErrorZ* ret = malloc(sizeof(LDKCResult_C2Tuple_Scriptu64ZChainErrorZ));
	*ret = CResult_C2Tuple_Scriptu64ZChainErrorZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ arg_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	free((void*)arg);
	return CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_SignatureCVec_SignatureZZ arg_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)arg;
	free((void*)arg);
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = malloc(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ));
	*ret = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_CVec_SignatureZNoneZ arg_conv = *(LDKCResult_CVec_SignatureZNoneZ*)arg;
	free((void*)arg);
	return CResult_CVec_SignatureZNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_SignatureZ arg_conv = *(LDKCVec_SignatureZ*)arg;
	free((void*)arg);
	LDKCResult_CVec_SignatureZNoneZ* ret = malloc(sizeof(LDKCResult_CVec_SignatureZNoneZ));
	*ret = CResult_CVec_SignatureZNoneZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPeerHandleError arg_conv = *(LDKPeerHandleError*)arg;
	free((void*)arg);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ));
	*ret = CResult_CVec_u8ZPeerHandleErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ arg_conv = *(LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg;
	free((void*)arg);
	return CResult_CVec_u8ZPeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1u8ZPeerHandleErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_u8Z arg_conv = *(LDKCVec_u8Z*)arg;
	free((void*)arg);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ));
	*ret = CResult_CVec_u8ZPeerHandleErrorZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneAPIErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKAPIError arg_conv = *(LDKAPIError*)arg;
	free((void*)arg);
	LDKCResult_NoneAPIErrorZ* ret = malloc(sizeof(LDKCResult_NoneAPIErrorZ));
	*ret = CResult_NoneAPIErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneAPIErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NoneAPIErrorZ arg_conv = *(LDKCResult_NoneAPIErrorZ*)arg;
	free((void*)arg);
	return CResult_NoneAPIErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneChannelMonitorUpdateErrZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKChannelMonitorUpdateErr arg_conv = *(LDKChannelMonitorUpdateErr*)arg;
	free((void*)arg);
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = malloc(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ));
	*ret = CResult_NoneChannelMonitorUpdateErrZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneChannelMonitorUpdateErrZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ arg_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)arg;
	free((void*)arg);
	return CResult_NoneChannelMonitorUpdateErrZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneMonitorUpdateErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKMonitorUpdateError arg_conv = *(LDKMonitorUpdateError*)arg;
	free((void*)arg);
	LDKCResult_NoneMonitorUpdateErrorZ* ret = malloc(sizeof(LDKCResult_NoneMonitorUpdateErrorZ));
	*ret = CResult_NoneMonitorUpdateErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NoneMonitorUpdateErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NoneMonitorUpdateErrorZ arg_conv = *(LDKCResult_NoneMonitorUpdateErrorZ*)arg;
	free((void*)arg);
	return CResult_NoneMonitorUpdateErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NonePaymentSendFailureZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPaymentSendFailure arg_conv = *(LDKPaymentSendFailure*)arg;
	free((void*)arg);
	LDKCResult_NonePaymentSendFailureZ* ret = malloc(sizeof(LDKCResult_NonePaymentSendFailureZ));
	*ret = CResult_NonePaymentSendFailureZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NonePaymentSendFailureZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NonePaymentSendFailureZ arg_conv = *(LDKCResult_NonePaymentSendFailureZ*)arg;
	free((void*)arg);
	return CResult_NonePaymentSendFailureZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPeerHandleError arg_conv = *(LDKPeerHandleError*)arg;
	free((void*)arg);
	LDKCResult_NonePeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_NonePeerHandleErrorZ));
	*ret = CResult_NonePeerHandleErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NonePeerHandleErrorZ arg_conv = *(LDKCResult_NonePeerHandleErrorZ*)arg;
	free((void*)arg);
	return CResult_NonePeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1RouteLightningErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKLightningError arg_conv = *(LDKLightningError*)arg;
	free((void*)arg);
	LDKCResult_RouteLightningErrorZ* ret = malloc(sizeof(LDKCResult_RouteLightningErrorZ));
	*ret = CResult_RouteLightningErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1RouteLightningErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_RouteLightningErrorZ arg_conv = *(LDKCResult_RouteLightningErrorZ*)arg;
	free((void*)arg);
	return CResult_RouteLightningErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1RouteLightningErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKRoute arg_conv = *(LDKRoute*)arg;
	free((void*)arg);
	LDKCResult_RouteLightningErrorZ* ret = malloc(sizeof(LDKCResult_RouteLightningErrorZ));
	*ret = CResult_RouteLightningErrorZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_SignatureNoneZ arg_conv = *(LDKCResult_SignatureNoneZ*)arg;
	free((void*)arg);
	return CResult_SignatureNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKSignature arg_conv = *(LDKSignature*)arg;
	free((void*)arg);
	LDKCResult_SignatureNoneZ* ret = malloc(sizeof(LDKCResult_SignatureNoneZ));
	*ret = CResult_SignatureNoneZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1TxCreationKeysSecpErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKSecp256k1Error arg_conv = *(LDKSecp256k1Error*)arg;
	free((void*)arg);
	LDKCResult_TxCreationKeysSecpErrorZ* ret = malloc(sizeof(LDKCResult_TxCreationKeysSecpErrorZ));
	*ret = CResult_TxCreationKeysSecpErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1TxCreationKeysSecpErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_TxCreationKeysSecpErrorZ arg_conv = *(LDKCResult_TxCreationKeysSecpErrorZ*)arg;
	free((void*)arg);
	return CResult_TxCreationKeysSecpErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1TxCreationKeysSecpErrorZ_1ok(JNIEnv * _env, jclass _b, jlong arg) {
	LDKTxCreationKeys arg_conv = *(LDKTxCreationKeys*)arg;
	free((void*)arg);
	LDKCResult_TxCreationKeysSecpErrorZ* ret = malloc(sizeof(LDKCResult_TxCreationKeysSecpErrorZ));
	*ret = CResult_TxCreationKeysSecpErrorZ_ok(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1boolLightningErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKLightningError arg_conv = *(LDKLightningError*)arg;
	free((void*)arg);
	LDKCResult_boolLightningErrorZ* ret = malloc(sizeof(LDKCResult_boolLightningErrorZ));
	*ret = CResult_boolLightningErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1boolLightningErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_boolLightningErrorZ arg_conv = *(LDKCResult_boolLightningErrorZ*)arg;
	free((void*)arg);
	return CResult_boolLightningErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1boolLightningErrorZ_1ok(JNIEnv * _env, jclass _b, jboolean arg) {
	LDKCResult_boolLightningErrorZ* ret = malloc(sizeof(LDKCResult_boolLightningErrorZ));
	*ret = CResult_boolLightningErrorZ_ok(arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1err(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPeerHandleError arg_conv = *(LDKPeerHandleError*)arg;
	free((void*)arg);
	LDKCResult_boolPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_boolPeerHandleErrorZ));
	*ret = CResult_boolPeerHandleErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_boolPeerHandleErrorZ arg_conv = *(LDKCResult_boolPeerHandleErrorZ*)arg;
	free((void*)arg);
	return CResult_boolPeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1boolPeerHandleErrorZ_1ok(JNIEnv * _env, jclass _b, jboolean arg) {
	LDKCResult_boolPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_boolPeerHandleErrorZ));
	*ret = CResult_boolPeerHandleErrorZ_ok(arg);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C2Tuple_1HTLCOutputInCommitmentSignatureZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ arg_conv = *(LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ*)arg;
	free((void*)arg);
	return CVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ arg_conv = *(LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ*)arg;
	free((void*)arg);
	return CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1CVec_1RouteHopZZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_CVec_RouteHopZZ arg_conv = *(LDKCVec_CVec_RouteHopZZ*)arg;
	free((void*)arg);
	return CVec_CVec_RouteHopZZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1ChannelDetailsZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_ChannelDetailsZ arg_conv = *(LDKCVec_ChannelDetailsZ*)arg;
	free((void*)arg);
	return CVec_ChannelDetailsZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1ChannelMonitorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_ChannelMonitorZ arg_conv = *(LDKCVec_ChannelMonitorZ*)arg;
	free((void*)arg);
	return CVec_ChannelMonitorZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1EventZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_EventZ arg_conv = *(LDKCVec_EventZ*)arg;
	free((void*)arg);
	return CVec_EventZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1HTLCOutputInCommitmentZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_HTLCOutputInCommitmentZ arg_conv = *(LDKCVec_HTLCOutputInCommitmentZ*)arg;
	free((void*)arg);
	return CVec_HTLCOutputInCommitmentZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1MessageSendEventZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_MessageSendEventZ arg_conv = *(LDKCVec_MessageSendEventZ*)arg;
	free((void*)arg);
	return CVec_MessageSendEventZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1MonitorEventZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_MonitorEventZ arg_conv = *(LDKCVec_MonitorEventZ*)arg;
	free((void*)arg);
	return CVec_MonitorEventZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1NetAddressZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_NetAddressZ arg_conv = *(LDKCVec_NetAddressZ*)arg;
	free((void*)arg);
	return CVec_NetAddressZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1NodeAnnouncementZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_NodeAnnouncementZ arg_conv = *(LDKCVec_NodeAnnouncementZ*)arg;
	free((void*)arg);
	return CVec_NodeAnnouncementZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1PublicKeyZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_PublicKeyZ arg_conv = *(LDKCVec_PublicKeyZ*)arg;
	free((void*)arg);
	return CVec_PublicKeyZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1RouteHintZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_RouteHintZ arg_conv = *(LDKCVec_RouteHintZ*)arg;
	free((void*)arg);
	return CVec_RouteHintZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1RouteHopZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_RouteHopZ arg_conv = *(LDKCVec_RouteHopZ*)arg;
	free((void*)arg);
	return CVec_RouteHopZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1SignatureZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_SignatureZ arg_conv = *(LDKCVec_SignatureZ*)arg;
	free((void*)arg);
	return CVec_SignatureZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1SpendableOutputDescriptorZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_SpendableOutputDescriptorZ arg_conv = *(LDKCVec_SpendableOutputDescriptorZ*)arg;
	free((void*)arg);
	return CVec_SpendableOutputDescriptorZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1TransactionZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_TransactionZ arg_conv = *(LDKCVec_TransactionZ*)arg;
	free((void*)arg);
	return CVec_TransactionZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateAddHTLCZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateAddHTLCZ arg_conv = *(LDKCVec_UpdateAddHTLCZ*)arg;
	free((void*)arg);
	return CVec_UpdateAddHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFailHTLCZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateFailHTLCZ arg_conv = *(LDKCVec_UpdateFailHTLCZ*)arg;
	free((void*)arg);
	return CVec_UpdateFailHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFailMalformedHTLCZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateFailMalformedHTLCZ arg_conv = *(LDKCVec_UpdateFailMalformedHTLCZ*)arg;
	free((void*)arg);
	return CVec_UpdateFailMalformedHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1UpdateFulfillHTLCZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateFulfillHTLCZ arg_conv = *(LDKCVec_UpdateFulfillHTLCZ*)arg;
	free((void*)arg);
	return CVec_UpdateFulfillHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1u64Z_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_u64Z arg_conv = *(LDKCVec_u64Z*)arg;
	free((void*)arg);
	return CVec_u64Z_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1u8Z_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_u8Z arg_conv = *(LDKCVec_u8Z*)arg;
	free((void*)arg);
	return CVec_u8Z_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CVec_1usizeZ_1free(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_usizeZ arg_conv = *(LDKCVec_usizeZ*)arg;
	free((void*)arg);
	return CVec_usizeZ_free(arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxOut_1free(JNIEnv * _env, jclass _b, jlong _res) {
	LDKTxOut _res_conv = *(LDKTxOut*)_res;
	free((void*)_res);
	return TxOut_free(_res_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1Txidu32Z_1new(JNIEnv * _env, jclass _b, jlong a, jint b) {
	LDKThirtyTwoBytes a_conv = *(LDKThirtyTwoBytes*)a;
	free((void*)a);
	LDKC2Tuple_Txidu32Z* ret = malloc(sizeof(LDKC2Tuple_Txidu32Z));
	*ret = C2Tuple_Txidu32Z_new(a_conv, b);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1Scriptu64Z_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKCVec_u8Z a_conv = *(LDKCVec_u8Z*)a;
	free((void*)a);
	LDKC2Tuple_Scriptu64Z* ret = malloc(sizeof(LDKC2Tuple_Scriptu64Z));
	*ret = C2Tuple_Scriptu64Z_new(a_conv, b);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1u64u64Z_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKC2Tuple_u64u64Z* ret = malloc(sizeof(LDKC2Tuple_u64u64Z));
	*ret = C2Tuple_u64u64Z_new(a, b);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1SignatureCVec_1SignatureZZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKSignature a_conv = *(LDKSignature*)a;
	free((void*)a);
	LDKCVec_SignatureZ b_conv = *(LDKCVec_SignatureZ*)b;
	free((void*)b);
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret = malloc(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ));
	*ret = C2Tuple_SignatureCVec_SignatureZZ_new(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1C2Tuple_1SignatureCVec_1SignatureZZNoneZ_1err(JNIEnv * _env, jclass _b) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = malloc(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ));
	*ret = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1SignatureNoneZ_1err(JNIEnv * _env, jclass _b) {
	LDKCResult_SignatureNoneZ* ret = malloc(sizeof(LDKCResult_SignatureNoneZ));
	*ret = CResult_SignatureNoneZ_err();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1CVec_1SignatureZNoneZ_1err(JNIEnv * _env, jclass _b) {
	LDKCResult_CVec_SignatureZNoneZ* ret = malloc(sizeof(LDKCResult_CVec_SignatureZNoneZ));
	*ret = CResult_CVec_SignatureZNoneZ_err();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneAPIErrorZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NoneAPIErrorZ* ret = malloc(sizeof(LDKCResult_NoneAPIErrorZ));
	*ret = CResult_NoneAPIErrorZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NonePaymentSendFailureZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NonePaymentSendFailureZ* ret = malloc(sizeof(LDKCResult_NonePaymentSendFailureZ));
	*ret = CResult_NonePaymentSendFailureZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneChannelMonitorUpdateErrZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = malloc(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ));
	*ret = CResult_NoneChannelMonitorUpdateErrZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NoneMonitorUpdateErrorZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NoneMonitorUpdateErrorZ* ret = malloc(sizeof(LDKCResult_NoneMonitorUpdateErrorZ));
	*ret = CResult_NoneMonitorUpdateErrorZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1OutPointScriptZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKOutPoint a_conv = *(LDKOutPoint*)a;
	free((void*)a);
	a_conv._underlying_ref = false;
	LDKCVec_u8Z b_conv = *(LDKCVec_u8Z*)b;
	free((void*)b);
	LDKC2Tuple_OutPointScriptZ* ret = malloc(sizeof(LDKC2Tuple_OutPointScriptZ));
	*ret = C2Tuple_OutPointScriptZ_new(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C3Tuple_1ChannelAnnouncementChannelUpdateChannelUpdateZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b, jlong c) {
	LDKChannelAnnouncement a_conv = *(LDKChannelAnnouncement*)a;
	free((void*)a);
	a_conv._underlying_ref = false;
	LDKChannelUpdate b_conv = *(LDKChannelUpdate*)b;
	free((void*)b);
	b_conv._underlying_ref = false;
	LDKChannelUpdate c_conv = *(LDKChannelUpdate*)c;
	free((void*)c);
	c_conv._underlying_ref = false;
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret = malloc(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ));
	*ret = C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a_conv, b_conv, c_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CResult_1NonePeerHandleErrorZ_1ok(JNIEnv * _env, jclass _b) {
	LDKCResult_NonePeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_NonePeerHandleErrorZ));
	*ret = CResult_NonePeerHandleErrorZ_ok();
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_C2Tuple_1HTLCOutputInCommitmentSignatureZ_1new(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKHTLCOutputInCommitment a_conv = *(LDKHTLCOutputInCommitment*)a;
	free((void*)a);
	a_conv._underlying_ref = false;
	LDKSignature b_conv = *(LDKSignature*)b;
	free((void*)b);
	LDKC2Tuple_HTLCOutputInCommitmentSignatureZ* ret = malloc(sizeof(LDKC2Tuple_HTLCOutputInCommitmentSignatureZ));
	*ret = C2Tuple_HTLCOutputInCommitmentSignatureZ_new(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Event_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKEvent this_ptr_conv = *(LDKEvent*)this_ptr;
	free((void*)this_ptr);
	return Event_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageSendEvent_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageSendEvent this_ptr_conv = *(LDKMessageSendEvent*)this_ptr;
	free((void*)this_ptr);
	return MessageSendEvent_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageSendEventsProvider_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageSendEventsProvider *this_ptr_conv = (LDKMessageSendEventsProvider*)this_ptr;
	return MessageSendEventsProvider_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_EventsProvider_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKEventsProvider *this_ptr_conv = (LDKEventsProvider*)this_ptr;
	return EventsProvider_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_APIError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAPIError this_ptr_conv = *(LDKAPIError*)this_ptr;
	free((void*)this_ptr);
	return APIError_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Level_1max(JNIEnv * _env, jclass _b) {
	LDKLevel* ret = malloc(sizeof(LDKLevel));
	*ret = Level_max();
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Logger_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLogger *this_ptr_conv = (LDKLogger*)this_ptr;
	return Logger_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv = *(LDKChannelHandshakeConfig*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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
	LDKChannelHandshakeConfig* ret = malloc(sizeof(LDKChannelHandshakeConfig));
	*ret = ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg, our_htlc_minimum_msat_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeConfig_1default(JNIEnv * _env, jclass _b) {
	LDKChannelHandshakeConfig* ret = malloc(sizeof(LDKChannelHandshakeConfig));
	*ret = ChannelHandshakeConfig_default();
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv = *(LDKChannelHandshakeLimits*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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
	LDKChannelHandshakeLimits* ret = malloc(sizeof(LDKChannelHandshakeLimits));
	*ret = ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelHandshakeLimits_1default(JNIEnv * _env, jclass _b) {
	LDKChannelHandshakeLimits* ret = malloc(sizeof(LDKChannelHandshakeLimits));
	*ret = ChannelHandshakeLimits_default();
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig this_ptr_conv = *(LDKChannelConfig*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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
	LDKChannelConfig* ret = malloc(sizeof(LDKChannelConfig));
	*ret = ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1default(JNIEnv * _env, jclass _b) {
	LDKChannelConfig* ret = malloc(sizeof(LDKChannelConfig));
	*ret = ChannelConfig_default();
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelConfig* obj_conv = (LDKChannelConfig*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelConfig_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelConfig_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKChannelConfig* ret = malloc(sizeof(LDKChannelConfig));
	*ret = ChannelConfig_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig this_ptr_conv = *(LDKUserConfig*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return UserConfig_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1own_1channel_1config(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeConfig* ret = malloc(sizeof(LDKChannelHandshakeConfig));
	*ret = UserConfig_get_own_channel_config(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1own_1channel_1config(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeConfig val_conv = *(LDKChannelHandshakeConfig*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return UserConfig_set_own_channel_config(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1peer_1channel_1config_1limits(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeLimits* ret = malloc(sizeof(LDKChannelHandshakeLimits));
	*ret = UserConfig_get_peer_channel_config_limits(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1peer_1channel_1config_1limits(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeLimits val_conv = *(LDKChannelHandshakeLimits*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return UserConfig_set_peer_channel_config_limits(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1get_1channel_1options(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelConfig* ret = malloc(sizeof(LDKChannelConfig));
	*ret = UserConfig_get_channel_options(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UserConfig_1set_1channel_1options(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelConfig val_conv = *(LDKChannelConfig*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return UserConfig_set_channel_options(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1new(JNIEnv * _env, jclass _b, jlong own_channel_config_arg, jlong peer_channel_config_limits_arg, jlong channel_options_arg) {
	LDKChannelHandshakeConfig own_channel_config_arg_conv = *(LDKChannelHandshakeConfig*)own_channel_config_arg;
	free((void*)own_channel_config_arg);
	own_channel_config_arg_conv._underlying_ref = false;
	LDKChannelHandshakeLimits peer_channel_config_limits_arg_conv = *(LDKChannelHandshakeLimits*)peer_channel_config_limits_arg;
	free((void*)peer_channel_config_limits_arg);
	peer_channel_config_limits_arg_conv._underlying_ref = false;
	LDKChannelConfig channel_options_arg_conv = *(LDKChannelConfig*)channel_options_arg;
	free((void*)channel_options_arg);
	channel_options_arg_conv._underlying_ref = false;
	LDKUserConfig* ret = malloc(sizeof(LDKUserConfig));
	*ret = UserConfig_new(own_channel_config_arg_conv, peer_channel_config_limits_arg_conv, channel_options_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UserConfig_1default(JNIEnv * _env, jclass _b) {
	LDKUserConfig* ret = malloc(sizeof(LDKUserConfig));
	*ret = UserConfig_default();
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainWatchInterface_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainWatchInterface *this_ptr_conv = (LDKChainWatchInterface*)this_ptr;
	return ChainWatchInterface_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BroadcasterInterface_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKBroadcasterInterface *this_ptr_conv = (LDKBroadcasterInterface*)this_ptr;
	return BroadcasterInterface_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainListener_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainListener *this_ptr_conv = (LDKChainListener*)this_ptr;
	return ChainListener_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FeeEstimator_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFeeEstimator *this_ptr_conv = (LDKFeeEstimator*)this_ptr;
	return FeeEstimator_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainWatchedUtil_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainWatchedUtil this_ptr_conv = *(LDKChainWatchedUtil*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChainWatchedUtil_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChainWatchedUtil_1new(JNIEnv * _env, jclass _b) {
	LDKChainWatchedUtil* ret = malloc(sizeof(LDKChainWatchedUtil));
	*ret = ChainWatchedUtil_new();
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChainWatchedUtil_1register_1tx(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray txid, jlong script_pub_key) {
	LDKChainWatchedUtil* this_arg_conv = (LDKChainWatchedUtil*)this_arg;
	unsigned char txid_arr[32];
	(*_env)->GetByteArrayRegion (_env, txid, 0, 32, txid_arr);
	unsigned char (*txid_ref)[32] = &txid_arr;
	LDKu8slice script_pub_key_conv = *(LDKu8slice*)script_pub_key;
	free((void*)script_pub_key);
	return ChainWatchedUtil_register_tx(this_arg_conv, txid_ref, script_pub_key_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChainWatchedUtil_1register_1outpoint(JNIEnv * _env, jclass _b, jlong this_arg, jlong outpoint, jlong _script_pub_key) {
	LDKChainWatchedUtil* this_arg_conv = (LDKChainWatchedUtil*)this_arg;
	LDKC2Tuple_Txidu32Z outpoint_conv = *(LDKC2Tuple_Txidu32Z*)outpoint;
	free((void*)outpoint);
	LDKu8slice _script_pub_key_conv = *(LDKu8slice*)_script_pub_key;
	free((void*)_script_pub_key);
	return ChainWatchedUtil_register_outpoint(this_arg_conv, outpoint_conv, _script_pub_key_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChainWatchedUtil_1watch_1all(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChainWatchedUtil* this_arg_conv = (LDKChainWatchedUtil*)this_arg;
	return ChainWatchedUtil_watch_all(this_arg_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChainWatchedUtil_1does_1match_1tx(JNIEnv * _env, jclass _b, jlong this_arg, jlong tx) {
	LDKChainWatchedUtil* this_arg_conv = (LDKChainWatchedUtil*)this_arg;
	LDKTransaction tx_conv = *(LDKTransaction*)tx;
	free((void*)tx);
	return ChainWatchedUtil_does_match_tx(this_arg_conv, tx_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BlockNotifier_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKBlockNotifier this_ptr_conv = *(LDKBlockNotifier*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return BlockNotifier_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_BlockNotifier_1new(JNIEnv * _env, jclass _b, jlong chain_monitor) {
	LDKChainWatchInterface *chain_monitor_conv = (LDKChainWatchInterface*)chain_monitor;
	LDKChainWatchInterface_JCalls_clone(chain_monitor_conv->this_arg);
	LDKBlockNotifier* ret = malloc(sizeof(LDKBlockNotifier));
	*ret = BlockNotifier_new(*chain_monitor_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BlockNotifier_1register_1listener(JNIEnv * _env, jclass _b, jlong this_arg, jlong listener) {
	LDKBlockNotifier* this_arg_conv = (LDKBlockNotifier*)this_arg;
	LDKChainListener *listener_conv = (LDKChainListener*)listener;
	LDKChainListener_JCalls_clone(listener_conv->this_arg);
	return BlockNotifier_register_listener(this_arg_conv, *listener_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BlockNotifier_1block_1connected(JNIEnv * _env, jclass _b, jlong this_arg, jlong block, jint height) {
	LDKBlockNotifier* this_arg_conv = (LDKBlockNotifier*)this_arg;
	LDKu8slice block_conv = *(LDKu8slice*)block;
	free((void*)block);
	return BlockNotifier_block_connected(this_arg_conv, block_conv, height);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_BlockNotifier_1block_1connected_1checked(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jint height, jlong txn_matched, jlong indexes_of_txn_matched) {
	LDKBlockNotifier* this_arg_conv = (LDKBlockNotifier*)this_arg;
	unsigned char header_arr[80];
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCVec_TransactionZ txn_matched_conv = *(LDKCVec_TransactionZ*)txn_matched;
	free((void*)txn_matched);
	LDKusizeslice indexes_of_txn_matched_conv = *(LDKusizeslice*)indexes_of_txn_matched;
	free((void*)indexes_of_txn_matched);
	return BlockNotifier_block_connected_checked(this_arg_conv, header_ref, height, txn_matched_conv, indexes_of_txn_matched_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_BlockNotifier_1block_1disconnected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jint disconnected_height) {
	LDKBlockNotifier* this_arg_conv = (LDKBlockNotifier*)this_arg;
	unsigned char header_arr[80];
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	return BlockNotifier_block_disconnected(this_arg_conv, header_ref, disconnected_height);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChainWatchInterfaceUtil_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainWatchInterfaceUtil this_ptr_conv = *(LDKChainWatchInterfaceUtil*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChainWatchInterfaceUtil_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChainWatchInterfaceUtil_1as_1ChainWatchInterface(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChainWatchInterfaceUtil* this_arg_conv = (LDKChainWatchInterfaceUtil*)this_arg;
	LDKChainWatchInterface* ret = malloc(sizeof(LDKChainWatchInterface));
	*ret = ChainWatchInterfaceUtil_as_ChainWatchInterface(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChainWatchInterfaceUtil_1new(JNIEnv * _env, jclass _b, jlong network) {
	LDKNetwork network_conv = *(LDKNetwork*)network;
	free((void*)network);
	LDKChainWatchInterfaceUtil* ret = malloc(sizeof(LDKChainWatchInterfaceUtil));
	*ret = ChainWatchInterfaceUtil_new(network_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChainWatchInterfaceUtil_1does_1match_1tx(JNIEnv * _env, jclass _b, jlong this_arg, jlong tx) {
	LDKChainWatchInterfaceUtil* this_arg_conv = (LDKChainWatchInterfaceUtil*)this_arg;
	LDKTransaction tx_conv = *(LDKTransaction*)tx;
	free((void*)tx);
	return ChainWatchInterfaceUtil_does_match_tx(this_arg_conv, tx_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint this_ptr_conv = *(LDKOutPoint*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return OutPoint_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OutPoint_1get_1txid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OutPoint_get_txid(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1set_1txid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return OutPoint_set_txid(this_ptr_conv, val_conv);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_OutPoint_1get_1index(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	return OutPoint_get_index(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OutPoint_1set_1index(JNIEnv * _env, jclass _b, jlong this_ptr, jshort val) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	return OutPoint_set_index(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1new(JNIEnv * _env, jclass _b, jlong txid_arg, jshort index_arg) {
	LDKThirtyTwoBytes txid_arg_conv = *(LDKThirtyTwoBytes*)txid_arg;
	free((void*)txid_arg);
	LDKOutPoint* ret = malloc(sizeof(LDKOutPoint));
	*ret = OutPoint_new(txid_arg_conv, index_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1to_1channel_1id(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKOutPoint* this_arg_conv = (LDKOutPoint*)this_arg;
	LDKThirtyTwoBytes* ret = malloc(sizeof(LDKThirtyTwoBytes));
	*ret = OutPoint_to_channel_id(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKOutPoint* obj_conv = (LDKOutPoint*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = OutPoint_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OutPoint_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKOutPoint* ret = malloc(sizeof(LDKOutPoint));
	*ret = OutPoint_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SpendableOutputDescriptor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKSpendableOutputDescriptor this_ptr_conv = *(LDKSpendableOutputDescriptor*)this_ptr;
	free((void*)this_ptr);
	return SpendableOutputDescriptor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelKeys *this_ptr_conv = (LDKChannelKeys*)this_ptr;
	return ChannelKeys_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_KeysInterface_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKKeysInterface *this_ptr_conv = (LDKKeysInterface*)this_ptr;
	return KeysInterface_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv = *(LDKInMemoryChannelKeys*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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
	free((void*)val);
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
	free((void*)val);
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
	free((void*)val);
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
	free((void*)val);
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
	free((void*)val);
	return InMemoryChannelKeys_set_htlc_base_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1get_1commitment_1seed(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_commitment_seed(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1set_1commitment_1seed(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return InMemoryChannelKeys_set_commitment_seed(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1new(JNIEnv * _env, jclass _b, jlong funding_key, jlong revocation_base_key, jlong payment_key, jlong delayed_payment_base_key, jlong htlc_base_key, jlong commitment_seed, jlong channel_value_satoshis, jlong key_derivation_params) {
	LDKSecretKey funding_key_conv = *(LDKSecretKey*)funding_key;
	free((void*)funding_key);
	LDKSecretKey revocation_base_key_conv = *(LDKSecretKey*)revocation_base_key;
	free((void*)revocation_base_key);
	LDKSecretKey payment_key_conv = *(LDKSecretKey*)payment_key;
	free((void*)payment_key);
	LDKSecretKey delayed_payment_base_key_conv = *(LDKSecretKey*)delayed_payment_base_key;
	free((void*)delayed_payment_base_key);
	LDKSecretKey htlc_base_key_conv = *(LDKSecretKey*)htlc_base_key;
	free((void*)htlc_base_key);
	LDKThirtyTwoBytes commitment_seed_conv = *(LDKThirtyTwoBytes*)commitment_seed;
	free((void*)commitment_seed);
	LDKC2Tuple_u64u64Z key_derivation_params_conv = *(LDKC2Tuple_u64u64Z*)key_derivation_params;
	free((void*)key_derivation_params);
	LDKInMemoryChannelKeys* ret = malloc(sizeof(LDKInMemoryChannelKeys));
	*ret = InMemoryChannelKeys_new(funding_key_conv, revocation_base_key_conv, payment_key_conv, delayed_payment_base_key_conv, htlc_base_key_conv, commitment_seed_conv, channel_value_satoshis, key_derivation_params_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1remote_1pubkeys(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys* this_arg_conv = (LDKInMemoryChannelKeys*)this_arg;
	LDKChannelPublicKeys* ret = malloc(sizeof(LDKChannelPublicKeys));
	*ret = InMemoryChannelKeys_remote_pubkeys(this_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1remote_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys* this_arg_conv = (LDKInMemoryChannelKeys*)this_arg;
	return InMemoryChannelKeys_remote_to_self_delay(this_arg_conv);
}

JNIEXPORT jshort JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1local_1to_1self_1delay(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys* this_arg_conv = (LDKInMemoryChannelKeys*)this_arg;
	return InMemoryChannelKeys_local_to_self_delay(this_arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1as_1ChannelKeys(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys* this_arg_conv = (LDKInMemoryChannelKeys*)this_arg;
	LDKChannelKeys* ret = malloc(sizeof(LDKChannelKeys));
	*ret = InMemoryChannelKeys_as_ChannelKeys(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKInMemoryChannelKeys* obj_conv = (LDKInMemoryChannelKeys*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = InMemoryChannelKeys_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_InMemoryChannelKeys_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKInMemoryChannelKeys* ret = malloc(sizeof(LDKInMemoryChannelKeys));
	*ret = InMemoryChannelKeys_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_KeysManager_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKKeysManager this_ptr_conv = *(LDKKeysManager*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return KeysManager_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysManager_1new(JNIEnv * _env, jclass _b, jbyteArray seed, jlong network, jlong starting_time_secs, jint starting_time_nanos) {
	unsigned char seed_arr[32];
	(*_env)->GetByteArrayRegion (_env, seed, 0, 32, seed_arr);
	unsigned char (*seed_ref)[32] = &seed_arr;
	LDKNetwork network_conv = *(LDKNetwork*)network;
	free((void*)network);
	LDKKeysManager* ret = malloc(sizeof(LDKKeysManager));
	*ret = KeysManager_new(seed_ref, network_conv, starting_time_secs, starting_time_nanos);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysManager_1derive_1channel_1keys(JNIEnv * _env, jclass _b, jlong this_arg, jlong channel_value_satoshis, jlong params_1, jlong params_2) {
	LDKKeysManager* this_arg_conv = (LDKKeysManager*)this_arg;
	LDKInMemoryChannelKeys* ret = malloc(sizeof(LDKInMemoryChannelKeys));
	*ret = KeysManager_derive_channel_keys(this_arg_conv, channel_value_satoshis, params_1, params_2);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_KeysManager_1as_1KeysInterface(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKKeysManager* this_arg_conv = (LDKKeysManager*)this_arg;
	LDKKeysInterface* ret = malloc(sizeof(LDKKeysInterface));
	*ret = KeysManager_as_KeysInterface(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManager this_ptr_conv = *(LDKChannelManager*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelManager_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv = *(LDKChannelDetails*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelDetails_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ChannelDetails_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return ChannelDetails_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1remote_1network_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelDetails_get_remote_network_id(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1remote_1network_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return ChannelDetails_set_remote_network_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1get_1counterparty_1features(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKInitFeatures* ret = malloc(sizeof(LDKInitFeatures));
	*ret = ChannelDetails_get_counterparty_features(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelDetails_1set_1counterparty_1features(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKInitFeatures val_conv = *(LDKInitFeatures*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
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
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return PaymentSendFailure_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1new(JNIEnv * _env, jclass _b, jlong network, jlong fee_est, jlong monitor, jlong tx_broadcaster, jlong logger, jlong keys_manager, jlong config, jlong current_blockchain_height) {
	LDKNetwork network_conv = *(LDKNetwork*)network;
	free((void*)network);
	LDKFeeEstimator *fee_est_conv = (LDKFeeEstimator*)fee_est;
	LDKFeeEstimator_JCalls_clone(fee_est_conv->this_arg);
	LDKManyChannelMonitor *monitor_conv = (LDKManyChannelMonitor*)monitor;
	LDKManyChannelMonitor_JCalls_clone(monitor_conv->this_arg);
	LDKBroadcasterInterface *tx_broadcaster_conv = (LDKBroadcasterInterface*)tx_broadcaster;
	LDKBroadcasterInterface_JCalls_clone(tx_broadcaster_conv->this_arg);
	LDKLogger *logger_conv = (LDKLogger*)logger;
	LDKLogger_JCalls_clone(logger_conv->this_arg);
	LDKKeysInterface *keys_manager_conv = (LDKKeysInterface*)keys_manager;
	LDKKeysInterface_JCalls_clone(keys_manager_conv->this_arg);
	LDKUserConfig config_conv = *(LDKUserConfig*)config;
	free((void*)config);
	config_conv._underlying_ref = false;
	uintptr_t current_blockchain_height_conv = *(uintptr_t*)current_blockchain_height;
	free((void*)current_blockchain_height);
	LDKChannelManager* ret = malloc(sizeof(LDKChannelManager));
	*ret = ChannelManager_new(network_conv, *fee_est_conv, *monitor_conv, *tx_broadcaster_conv, *logger_conv, *keys_manager_conv, config_conv, current_blockchain_height_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1create_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jlong their_network_key, jlong channel_value_satoshis, jlong push_msat, jlong user_id, jlong override_config) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKPublicKey their_network_key_conv = *(LDKPublicKey*)their_network_key;
	free((void*)their_network_key);
	LDKUserConfig override_config_conv = *(LDKUserConfig*)override_config;
	free((void*)override_config);
	override_config_conv._underlying_ref = false;
	LDKCResult_NoneAPIErrorZ* ret = malloc(sizeof(LDKCResult_NoneAPIErrorZ));
	*ret = ChannelManager_create_channel(this_arg_conv, their_network_key_conv, channel_value_satoshis, push_msat, user_id, override_config_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1list_1channels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKCVec_ChannelDetailsZ* ret = malloc(sizeof(LDKCVec_ChannelDetailsZ));
	*ret = ChannelManager_list_channels(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1list_1usable_1channels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKCVec_ChannelDetailsZ* ret = malloc(sizeof(LDKCVec_ChannelDetailsZ));
	*ret = ChannelManager_list_usable_channels(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1close_1channel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray channel_id) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char channel_id_arr[32];
	(*_env)->GetByteArrayRegion (_env, channel_id, 0, 32, channel_id_arr);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	LDKCResult_NoneAPIErrorZ* ret = malloc(sizeof(LDKCResult_NoneAPIErrorZ));
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

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1send_1payment(JNIEnv * _env, jclass _b, jlong this_arg, jlong route, jlong payment_hash, jlong payment_secret) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKRoute* route_conv = (LDKRoute*)route;
	LDKThirtyTwoBytes payment_hash_conv = *(LDKThirtyTwoBytes*)payment_hash;
	free((void*)payment_hash);
	LDKThirtyTwoBytes payment_secret_conv = *(LDKThirtyTwoBytes*)payment_secret;
	free((void*)payment_secret);
	LDKCResult_NonePaymentSendFailureZ* ret = malloc(sizeof(LDKCResult_NonePaymentSendFailureZ));
	*ret = ChannelManager_send_payment(this_arg_conv, route_conv, payment_hash_conv, payment_secret_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1funding_1transaction_1generated(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray temporary_channel_id, jlong funding_txo) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char temporary_channel_id_arr[32];
	(*_env)->GetByteArrayRegion (_env, temporary_channel_id, 0, 32, temporary_channel_id_arr);
	unsigned char (*temporary_channel_id_ref)[32] = &temporary_channel_id_arr;
	LDKOutPoint funding_txo_conv = *(LDKOutPoint*)funding_txo;
	free((void*)funding_txo);
	funding_txo_conv._underlying_ref = false;
	return ChannelManager_funding_transaction_generated(this_arg_conv, temporary_channel_id_ref, funding_txo_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1broadcast_1node_1announcement(JNIEnv * _env, jclass _b, jlong this_arg, jlong rgb, jlong alias, jlong addresses) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKThreeBytes rgb_conv = *(LDKThreeBytes*)rgb;
	free((void*)rgb);
	LDKThirtyTwoBytes alias_conv = *(LDKThirtyTwoBytes*)alias;
	free((void*)alias);
	LDKCVec_NetAddressZ addresses_conv = *(LDKCVec_NetAddressZ*)addresses;
	free((void*)addresses);
	return ChannelManager_broadcast_node_announcement(this_arg_conv, rgb_conv, alias_conv, addresses_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1process_1pending_1htlc_1forwards(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	return ChannelManager_process_pending_htlc_forwards(this_arg_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManager_1timer_1chan_1freshness_1every_1min(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	return ChannelManager_timer_chan_freshness_every_min(this_arg_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelManager_1fail_1htlc_1backwards(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray payment_hash, jlong payment_secret) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char payment_hash_arr[32];
	(*_env)->GetByteArrayRegion (_env, payment_hash, 0, 32, payment_hash_arr);
	unsigned char (*payment_hash_ref)[32] = &payment_hash_arr;
	LDKThirtyTwoBytes payment_secret_conv = *(LDKThirtyTwoBytes*)payment_secret;
	free((void*)payment_secret);
	return ChannelManager_fail_htlc_backwards(this_arg_conv, payment_hash_ref, payment_secret_conv);
}

JNIEXPORT jboolean JNICALL Java_org_ldk_impl_bindings_ChannelManager_1claim_1funds(JNIEnv * _env, jclass _b, jlong this_arg, jlong payment_preimage, jlong payment_secret, jlong expected_amount) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKThirtyTwoBytes payment_preimage_conv = *(LDKThirtyTwoBytes*)payment_preimage;
	free((void*)payment_preimage);
	LDKThirtyTwoBytes payment_secret_conv = *(LDKThirtyTwoBytes*)payment_secret;
	free((void*)payment_secret);
	return ChannelManager_claim_funds(this_arg_conv, payment_preimage_conv, payment_secret_conv, expected_amount);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1get_1our_1node_1id(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
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
	LDKMessageSendEventsProvider* ret = malloc(sizeof(LDKMessageSendEventsProvider));
	*ret = ChannelManager_as_MessageSendEventsProvider(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1EventsProvider(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKEventsProvider* ret = malloc(sizeof(LDKEventsProvider));
	*ret = ChannelManager_as_EventsProvider(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1ChainListener(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKChainListener* ret = malloc(sizeof(LDKChainListener));
	*ret = ChannelManager_as_ChainListener(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManager_1as_1ChannelMessageHandler(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKChannelMessageHandler* ret = malloc(sizeof(LDKChannelMessageHandler));
	*ret = ChannelManager_as_ChannelMessageHandler(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs this_ptr_conv = *(LDKChannelManagerReadArgs*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelManagerReadArgs_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1keys_1manager(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_keys_manager(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1keys_1manager(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKKeysInterface *val_conv = (LDKKeysInterface*)val;
	LDKKeysInterface_JCalls_clone(val_conv->this_arg);
	return ChannelManagerReadArgs_set_keys_manager(this_ptr_conv, *val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1fee_1estimator(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_fee_estimator(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1fee_1estimator(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKFeeEstimator *val_conv = (LDKFeeEstimator*)val;
	LDKFeeEstimator_JCalls_clone(val_conv->this_arg);
	return ChannelManagerReadArgs_set_fee_estimator(this_ptr_conv, *val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1monitor(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_monitor(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1monitor(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKManyChannelMonitor *val_conv = (LDKManyChannelMonitor*)val;
	LDKManyChannelMonitor_JCalls_clone(val_conv->this_arg);
	return ChannelManagerReadArgs_set_monitor(this_ptr_conv, *val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1tx_1broadcaster(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_tx_broadcaster(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1tx_1broadcaster(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKBroadcasterInterface *val_conv = (LDKBroadcasterInterface*)val;
	LDKBroadcasterInterface_JCalls_clone(val_conv->this_arg);
	return ChannelManagerReadArgs_set_tx_broadcaster(this_ptr_conv, *val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1logger(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	long ret = (long)ChannelManagerReadArgs_get_logger(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1logger(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKLogger *val_conv = (LDKLogger*)val;
	LDKLogger_JCalls_clone(val_conv->this_arg);
	return ChannelManagerReadArgs_set_logger(this_ptr_conv, *val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1get_1default_1config(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKUserConfig* ret = malloc(sizeof(LDKUserConfig));
	*ret = ChannelManagerReadArgs_get_default_config(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1set_1default_1config(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelManagerReadArgs* this_ptr_conv = (LDKChannelManagerReadArgs*)this_ptr;
	LDKUserConfig val_conv = *(LDKUserConfig*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return ChannelManagerReadArgs_set_default_config(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelManagerReadArgs_1new(JNIEnv * _env, jclass _b, jlong keys_manager, jlong fee_estimator, jlong monitor, jlong tx_broadcaster, jlong logger, jlong default_config, jlong channel_monitors) {
	LDKKeysInterface *keys_manager_conv = (LDKKeysInterface*)keys_manager;
	LDKKeysInterface_JCalls_clone(keys_manager_conv->this_arg);
	LDKFeeEstimator *fee_estimator_conv = (LDKFeeEstimator*)fee_estimator;
	LDKFeeEstimator_JCalls_clone(fee_estimator_conv->this_arg);
	LDKManyChannelMonitor *monitor_conv = (LDKManyChannelMonitor*)monitor;
	LDKManyChannelMonitor_JCalls_clone(monitor_conv->this_arg);
	LDKBroadcasterInterface *tx_broadcaster_conv = (LDKBroadcasterInterface*)tx_broadcaster;
	LDKBroadcasterInterface_JCalls_clone(tx_broadcaster_conv->this_arg);
	LDKLogger *logger_conv = (LDKLogger*)logger;
	LDKLogger_JCalls_clone(logger_conv->this_arg);
	LDKUserConfig default_config_conv = *(LDKUserConfig*)default_config;
	free((void*)default_config);
	default_config_conv._underlying_ref = false;
	LDKCVec_ChannelMonitorZ channel_monitors_conv = *(LDKCVec_ChannelMonitorZ*)channel_monitors;
	free((void*)channel_monitors);
	LDKChannelManagerReadArgs* ret = malloc(sizeof(LDKChannelManagerReadArgs));
	*ret = ChannelManagerReadArgs_new(*keys_manager_conv, *fee_estimator_conv, *monitor_conv, *tx_broadcaster_conv, *logger_conv, default_config_conv, channel_monitors_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv = *(LDKChannelMonitorUpdate*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelMonitorUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitorUpdate_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKChannelMonitorUpdate* ret = malloc(sizeof(LDKChannelMonitorUpdate));
	*ret = ChannelMonitorUpdate_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MonitorUpdateError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMonitorUpdateError this_ptr_conv = *(LDKMonitorUpdateError*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return MonitorUpdateError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MonitorEvent_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMonitorEvent this_ptr_conv = *(LDKMonitorEvent*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return MonitorEvent_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCUpdate this_ptr_conv = *(LDKHTLCUpdate*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return HTLCUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHTLCUpdate* obj_conv = (LDKHTLCUpdate*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = HTLCUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCUpdate_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKHTLCUpdate* ret = malloc(sizeof(LDKHTLCUpdate));
	*ret = HTLCUpdate_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitor this_ptr_conv = *(LDKChannelMonitor*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelMonitor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ManyChannelMonitor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKManyChannelMonitor *this_ptr_conv = (LDKManyChannelMonitor*)this_ptr;
	return ManyChannelMonitor_free(*this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1update_1monitor(JNIEnv * _env, jclass _b, jlong this_arg, jlong updates, jlong broadcaster, jlong logger) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKChannelMonitorUpdate updates_conv = *(LDKChannelMonitorUpdate*)updates;
	free((void*)updates);
	updates_conv._underlying_ref = false;
	LDKBroadcasterInterface* broadcaster_conv = (LDKBroadcasterInterface*)broadcaster;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCResult_NoneMonitorUpdateErrorZ* ret = malloc(sizeof(LDKCResult_NoneMonitorUpdateErrorZ));
	*ret = ChannelMonitor_update_monitor(this_arg_conv, updates_conv, broadcaster_conv, logger_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1latest_1update_1id(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	return ChannelMonitor_get_latest_update_id(this_arg_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1funding_1txo(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKC2Tuple_OutPointScriptZ* ret = malloc(sizeof(LDKC2Tuple_OutPointScriptZ));
	*ret = ChannelMonitor_get_funding_txo(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1and_1clear_1pending_1monitor_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKCVec_MonitorEventZ* ret = malloc(sizeof(LDKCVec_MonitorEventZ));
	*ret = ChannelMonitor_get_and_clear_pending_monitor_events(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1and_1clear_1pending_1events(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKCVec_EventZ* ret = malloc(sizeof(LDKCVec_EventZ));
	*ret = ChannelMonitor_get_and_clear_pending_events(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelMonitor_1get_1latest_1local_1commitment_1txn(JNIEnv * _env, jclass _b, jlong this_arg, jlong logger) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCVec_TransactionZ* ret = malloc(sizeof(LDKCVec_TransactionZ));
	*ret = ChannelMonitor_get_latest_local_commitment_txn(this_arg_conv, logger_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DecodeError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDecodeError this_ptr_conv = *(LDKDecodeError*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return DecodeError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Init_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInit this_ptr_conv = *(LDKInit*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return Init_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage this_ptr_conv = *(LDKErrorMessage*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ErrorMessage_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage* this_ptr_conv = (LDKErrorMessage*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ErrorMessage_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKErrorMessage* this_ptr_conv = (LDKErrorMessage*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return ErrorMessage_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1get_1data(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage* this_ptr_conv = (LDKErrorMessage*)this_ptr;
	LDKStr* ret = malloc(sizeof(LDKStr));
	*ret = ErrorMessage_get_data(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1set_1data(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKErrorMessage* this_ptr_conv = (LDKErrorMessage*)this_ptr;
	LDKCVec_u8Z val_conv = *(LDKCVec_u8Z*)val;
	free((void*)val);
	return ErrorMessage_set_data(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong data_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKCVec_u8Z data_arg_conv = *(LDKCVec_u8Z*)data_arg;
	free((void*)data_arg);
	LDKErrorMessage* ret = malloc(sizeof(LDKErrorMessage));
	*ret = ErrorMessage_new(channel_id_arg_conv, data_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Ping_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPing this_ptr_conv = *(LDKPing*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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
	LDKPing* ret = malloc(sizeof(LDKPing));
	*ret = Ping_new(ponglen_arg, byteslen_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Pong_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPong this_ptr_conv = *(LDKPong*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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
	LDKPong* ret = malloc(sizeof(LDKPong));
	*ret = Pong_new(byteslen_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv = *(LDKOpenChannel*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return OpenChannel_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OpenChannel_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return OpenChannel_set_chain_hash(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OpenChannel_get_temporary_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return OpenChannel_set_temporary_channel_id(this_ptr_conv, val_conv);
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
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = OpenChannel_get_funding_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return OpenChannel_set_funding_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = OpenChannel_get_revocation_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return OpenChannel_set_revocation_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = OpenChannel_get_payment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return OpenChannel_set_payment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = OpenChannel_get_delayed_payment_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return OpenChannel_set_delayed_payment_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = OpenChannel_get_htlc_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return OpenChannel_set_htlc_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1get_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = OpenChannel_get_first_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_OpenChannel_1set_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOpenChannel* this_ptr_conv = (LDKOpenChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
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
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return AcceptChannel_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *AcceptChannel_get_temporary_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return AcceptChannel_set_temporary_channel_id(this_ptr_conv, val_conv);
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
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = AcceptChannel_get_funding_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return AcceptChannel_set_funding_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = AcceptChannel_get_revocation_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return AcceptChannel_set_revocation_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = AcceptChannel_get_payment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return AcceptChannel_set_payment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = AcceptChannel_get_delayed_payment_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return AcceptChannel_set_delayed_payment_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = AcceptChannel_get_htlc_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return AcceptChannel_set_htlc_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1get_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = AcceptChannel_get_first_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1set_1first_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAcceptChannel* this_ptr_conv = (LDKAcceptChannel*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return AcceptChannel_set_first_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated this_ptr_conv = *(LDKFundingCreated*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return FundingCreated_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingCreated_get_temporary_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1temporary_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return FundingCreated_set_temporary_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingCreated_1get_1funding_1txid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingCreated_get_funding_txid(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1funding_1txid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return FundingCreated_set_funding_txid(this_ptr_conv, val_conv);
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
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = FundingCreated_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingCreated_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingCreated* this_ptr_conv = (LDKFundingCreated*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return FundingCreated_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1new(JNIEnv * _env, jclass _b, jlong temporary_channel_id_arg, jlong funding_txid_arg, jshort funding_output_index_arg, jlong signature_arg) {
	LDKThirtyTwoBytes temporary_channel_id_arg_conv = *(LDKThirtyTwoBytes*)temporary_channel_id_arg;
	free((void*)temporary_channel_id_arg);
	LDKThirtyTwoBytes funding_txid_arg_conv = *(LDKThirtyTwoBytes*)funding_txid_arg;
	free((void*)funding_txid_arg);
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	free((void*)signature_arg);
	LDKFundingCreated* ret = malloc(sizeof(LDKFundingCreated));
	*ret = FundingCreated_new(temporary_channel_id_arg_conv, funding_txid_arg_conv, funding_output_index_arg, signature_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned this_ptr_conv = *(LDKFundingSigned*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return FundingSigned_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingSigned_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned* this_ptr_conv = (LDKFundingSigned*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingSigned_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingSigned* this_ptr_conv = (LDKFundingSigned*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return FundingSigned_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned* this_ptr_conv = (LDKFundingSigned*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = FundingSigned_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingSigned_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingSigned* this_ptr_conv = (LDKFundingSigned*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return FundingSigned_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	free((void*)signature_arg);
	LDKFundingSigned* ret = malloc(sizeof(LDKFundingSigned));
	*ret = FundingSigned_new(channel_id_arg_conv, signature_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked this_ptr_conv = *(LDKFundingLocked*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return FundingLocked_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_FundingLocked_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingLocked_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return FundingLocked_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1get_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = FundingLocked_get_next_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_FundingLocked_1set_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return FundingLocked_set_next_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKPublicKey next_per_commitment_point_arg_conv = *(LDKPublicKey*)next_per_commitment_point_arg;
	free((void*)next_per_commitment_point_arg);
	LDKFundingLocked* ret = malloc(sizeof(LDKFundingLocked));
	*ret = FundingLocked_new(channel_id_arg_conv, next_per_commitment_point_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown this_ptr_conv = *(LDKShutdown*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return Shutdown_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_Shutdown_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown* this_ptr_conv = (LDKShutdown*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *Shutdown_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKShutdown* this_ptr_conv = (LDKShutdown*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return Shutdown_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1get_1scriptpubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown* this_ptr_conv = (LDKShutdown*)this_ptr;
	LDKu8slice* ret = malloc(sizeof(LDKu8slice));
	*ret = Shutdown_get_scriptpubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Shutdown_1set_1scriptpubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKShutdown* this_ptr_conv = (LDKShutdown*)this_ptr;
	LDKCVec_u8Z val_conv = *(LDKCVec_u8Z*)val;
	free((void*)val);
	return Shutdown_set_scriptpubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong scriptpubkey_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKCVec_u8Z scriptpubkey_arg_conv = *(LDKCVec_u8Z*)scriptpubkey_arg;
	free((void*)scriptpubkey_arg);
	LDKShutdown* ret = malloc(sizeof(LDKShutdown));
	*ret = Shutdown_new(channel_id_arg_conv, scriptpubkey_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned this_ptr_conv = *(LDKClosingSigned*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ClosingSigned_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned* this_ptr_conv = (LDKClosingSigned*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ClosingSigned_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKClosingSigned* this_ptr_conv = (LDKClosingSigned*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return ClosingSigned_set_channel_id(this_ptr_conv, val_conv);
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
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = ClosingSigned_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKClosingSigned* this_ptr_conv = (LDKClosingSigned*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return ClosingSigned_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong fee_satoshis_arg, jlong signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	free((void*)signature_arg);
	LDKClosingSigned* ret = malloc(sizeof(LDKClosingSigned));
	*ret = ClosingSigned_new(channel_id_arg_conv, fee_satoshis_arg, signature_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv = *(LDKUpdateAddHTLC*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return UpdateAddHTLC_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateAddHTLC_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UpdateAddHTLC_set_channel_id(this_ptr_conv, val_conv);
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

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1set_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateAddHTLC* this_ptr_conv = (LDKUpdateAddHTLC*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UpdateAddHTLC_set_payment_hash(this_ptr_conv, val_conv);
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
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return UpdateFulfillHTLC_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC* this_ptr_conv = (LDKUpdateFulfillHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFulfillHTLC_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFulfillHTLC* this_ptr_conv = (LDKUpdateFulfillHTLC*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UpdateFulfillHTLC_set_channel_id(this_ptr_conv, val_conv);
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

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1set_1payment_1preimage(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFulfillHTLC* this_ptr_conv = (LDKUpdateFulfillHTLC*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UpdateFulfillHTLC_set_payment_preimage(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong htlc_id_arg, jlong payment_preimage_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKThirtyTwoBytes payment_preimage_arg_conv = *(LDKThirtyTwoBytes*)payment_preimage_arg;
	free((void*)payment_preimage_arg);
	LDKUpdateFulfillHTLC* ret = malloc(sizeof(LDKUpdateFulfillHTLC));
	*ret = UpdateFulfillHTLC_new(channel_id_arg_conv, htlc_id_arg, payment_preimage_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv = *(LDKUpdateFailHTLC*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return UpdateFailHTLC_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailHTLC* this_ptr_conv = (LDKUpdateFailHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFailHTLC_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFailHTLC* this_ptr_conv = (LDKUpdateFailHTLC*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UpdateFailHTLC_set_channel_id(this_ptr_conv, val_conv);
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
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return UpdateFailMalformedHTLC_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC* this_ptr_conv = (LDKUpdateFailMalformedHTLC*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFailMalformedHTLC_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFailMalformedHTLC* this_ptr_conv = (LDKUpdateFailMalformedHTLC*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UpdateFailMalformedHTLC_set_channel_id(this_ptr_conv, val_conv);
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
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return CommitmentSigned_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *CommitmentSigned_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return CommitmentSigned_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = CommitmentSigned_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return CommitmentSigned_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1set_1htlc_1signatures(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentSigned* this_ptr_conv = (LDKCommitmentSigned*)this_ptr;
	LDKCVec_SignatureZ val_conv = *(LDKCVec_SignatureZ*)val;
	free((void*)val);
	return CommitmentSigned_set_htlc_signatures(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong signature_arg, jlong htlc_signatures_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	free((void*)signature_arg);
	LDKCVec_SignatureZ htlc_signatures_arg_conv = *(LDKCVec_SignatureZ*)htlc_signatures_arg;
	free((void*)htlc_signatures_arg);
	LDKCommitmentSigned* ret = malloc(sizeof(LDKCommitmentSigned));
	*ret = CommitmentSigned_new(channel_id_arg_conv, signature_arg_conv, htlc_signatures_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK this_ptr_conv = *(LDKRevokeAndACK*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return RevokeAndACK_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *RevokeAndACK_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return RevokeAndACK_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *RevokeAndACK_get_per_commitment_secret(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return RevokeAndACK_set_per_commitment_secret(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1get_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = RevokeAndACK_get_next_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1set_1next_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRevokeAndACK* this_ptr_conv = (LDKRevokeAndACK*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return RevokeAndACK_set_next_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong per_commitment_secret_arg, jlong next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKThirtyTwoBytes per_commitment_secret_arg_conv = *(LDKThirtyTwoBytes*)per_commitment_secret_arg;
	free((void*)per_commitment_secret_arg);
	LDKPublicKey next_per_commitment_point_arg_conv = *(LDKPublicKey*)next_per_commitment_point_arg;
	free((void*)next_per_commitment_point_arg);
	LDKRevokeAndACK* ret = malloc(sizeof(LDKRevokeAndACK));
	*ret = RevokeAndACK_new(channel_id_arg_conv, per_commitment_secret_arg_conv, next_per_commitment_point_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee this_ptr_conv = *(LDKUpdateFee*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return UpdateFee_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UpdateFee_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee* this_ptr_conv = (LDKUpdateFee*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UpdateFee_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUpdateFee* this_ptr_conv = (LDKUpdateFee*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UpdateFee_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_UpdateFee_1get_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee* this_ptr_conv = (LDKUpdateFee*)this_ptr;
	return UpdateFee_get_feerate_per_kw(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UpdateFee_1set_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKUpdateFee* this_ptr_conv = (LDKUpdateFee*)this_ptr;
	return UpdateFee_set_feerate_per_kw(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFee_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jint feerate_per_kw_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKUpdateFee* ret = malloc(sizeof(LDKUpdateFee));
	*ret = UpdateFee_new(channel_id_arg_conv, feerate_per_kw_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDataLossProtect this_ptr_conv = *(LDKDataLossProtect*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return DataLossProtect_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1get_1your_1last_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDataLossProtect* this_ptr_conv = (LDKDataLossProtect*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *DataLossProtect_get_your_last_per_commitment_secret(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1set_1your_1last_1per_1commitment_1secret(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKDataLossProtect* this_ptr_conv = (LDKDataLossProtect*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return DataLossProtect_set_your_last_per_commitment_secret(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1get_1my_1current_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDataLossProtect* this_ptr_conv = (LDKDataLossProtect*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = DataLossProtect_get_my_current_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1set_1my_1current_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKDataLossProtect* this_ptr_conv = (LDKDataLossProtect*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return DataLossProtect_set_my_current_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DataLossProtect_1new(JNIEnv * _env, jclass _b, jlong your_last_per_commitment_secret_arg, jlong my_current_per_commitment_point_arg) {
	LDKThirtyTwoBytes your_last_per_commitment_secret_arg_conv = *(LDKThirtyTwoBytes*)your_last_per_commitment_secret_arg;
	free((void*)your_last_per_commitment_secret_arg);
	LDKPublicKey my_current_per_commitment_point_arg_conv = *(LDKPublicKey*)my_current_per_commitment_point_arg;
	free((void*)my_current_per_commitment_point_arg);
	LDKDataLossProtect* ret = malloc(sizeof(LDKDataLossProtect));
	*ret = DataLossProtect_new(your_last_per_commitment_secret_arg_conv, my_current_per_commitment_point_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish this_ptr_conv = *(LDKChannelReestablish*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelReestablish_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish* this_ptr_conv = (LDKChannelReestablish*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ChannelReestablish_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelReestablish* this_ptr_conv = (LDKChannelReestablish*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return ChannelReestablish_set_channel_id(this_ptr_conv, val_conv);
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
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return AnnouncementSignatures_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *AnnouncementSignatures_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return AnnouncementSignatures_set_channel_id(this_ptr_conv, val_conv);
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
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = AnnouncementSignatures_get_node_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1node_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return AnnouncementSignatures_set_node_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1get_1bitcoin_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = AnnouncementSignatures_get_bitcoin_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1set_1bitcoin_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKAnnouncementSignatures* this_ptr_conv = (LDKAnnouncementSignatures*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return AnnouncementSignatures_set_bitcoin_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1new(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong short_channel_id_arg, jlong node_signature_arg, jlong bitcoin_signature_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	free((void*)channel_id_arg);
	LDKSignature node_signature_arg_conv = *(LDKSignature*)node_signature_arg;
	free((void*)node_signature_arg);
	LDKSignature bitcoin_signature_arg_conv = *(LDKSignature*)bitcoin_signature_arg;
	free((void*)bitcoin_signature_arg);
	LDKAnnouncementSignatures* ret = malloc(sizeof(LDKAnnouncementSignatures));
	*ret = AnnouncementSignatures_new(channel_id_arg_conv, short_channel_id_arg, node_signature_arg_conv, bitcoin_signature_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetAddress_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetAddress this_ptr_conv = *(LDKNetAddress*)this_ptr;
	free((void*)this_ptr);
	return NetAddress_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv = *(LDKUnsignedNodeAnnouncement*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return UnsignedNodeAnnouncement_free(this_ptr_conv);
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
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = UnsignedNodeAnnouncement_get_node_id(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
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
	free((void*)val);
	return UnsignedNodeAnnouncement_set_rgb(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1get_1alias(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UnsignedNodeAnnouncement_get_alias(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1alias(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UnsignedNodeAnnouncement_set_alias(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1set_1addresses(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKCVec_NetAddressZ val_conv = *(LDKCVec_NetAddressZ*)val;
	free((void*)val);
	return UnsignedNodeAnnouncement_set_addresses(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement this_ptr_conv = *(LDKNodeAnnouncement*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return NodeAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement* this_ptr_conv = (LDKNodeAnnouncement*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = NodeAnnouncement_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncement* this_ptr_conv = (LDKNodeAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return NodeAnnouncement_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1get_1contents(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement* this_ptr_conv = (LDKNodeAnnouncement*)this_ptr;
	LDKUnsignedNodeAnnouncement* ret = malloc(sizeof(LDKUnsignedNodeAnnouncement));
	*ret = NodeAnnouncement_get_contents(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1set_1contents(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncement* this_ptr_conv = (LDKNodeAnnouncement*)this_ptr;
	LDKUnsignedNodeAnnouncement val_conv = *(LDKUnsignedNodeAnnouncement*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return NodeAnnouncement_set_contents(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1new(JNIEnv * _env, jclass _b, jlong signature_arg, jlong contents_arg) {
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	free((void*)signature_arg);
	LDKUnsignedNodeAnnouncement contents_arg_conv = *(LDKUnsignedNodeAnnouncement*)contents_arg;
	free((void*)contents_arg);
	contents_arg_conv._underlying_ref = false;
	LDKNodeAnnouncement* ret = malloc(sizeof(LDKNodeAnnouncement));
	*ret = NodeAnnouncement_new(signature_arg_conv, contents_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv = *(LDKUnsignedChannelAnnouncement*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return UnsignedChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UnsignedChannelAnnouncement_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UnsignedChannelAnnouncement_set_chain_hash(this_ptr_conv, val_conv);
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
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = UnsignedChannelAnnouncement_get_node_id_1(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1node_1id_11(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return UnsignedChannelAnnouncement_set_node_id_1(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1node_1id_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = UnsignedChannelAnnouncement_get_node_id_2(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1node_1id_12(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return UnsignedChannelAnnouncement_set_node_id_2(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1bitcoin_1key_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = UnsignedChannelAnnouncement_get_bitcoin_key_1(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1bitcoin_1key_11(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return UnsignedChannelAnnouncement_set_bitcoin_key_1(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1get_1bitcoin_1key_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = UnsignedChannelAnnouncement_get_bitcoin_key_2(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1set_1bitcoin_1key_12(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return UnsignedChannelAnnouncement_set_bitcoin_key_2(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement this_ptr_conv = *(LDKChannelAnnouncement*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1node_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = ChannelAnnouncement_get_node_signature_1(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1node_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return ChannelAnnouncement_set_node_signature_1(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1node_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = ChannelAnnouncement_get_node_signature_2(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1node_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return ChannelAnnouncement_set_node_signature_2(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1bitcoin_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = ChannelAnnouncement_get_bitcoin_signature_1(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1bitcoin_1signature_11(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return ChannelAnnouncement_set_bitcoin_signature_1(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1bitcoin_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = ChannelAnnouncement_get_bitcoin_signature_2(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1bitcoin_1signature_12(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return ChannelAnnouncement_set_bitcoin_signature_2(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1get_1contents(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKUnsignedChannelAnnouncement* ret = malloc(sizeof(LDKUnsignedChannelAnnouncement));
	*ret = ChannelAnnouncement_get_contents(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1set_1contents(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelAnnouncement* this_ptr_conv = (LDKChannelAnnouncement*)this_ptr;
	LDKUnsignedChannelAnnouncement val_conv = *(LDKUnsignedChannelAnnouncement*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return ChannelAnnouncement_set_contents(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1new(JNIEnv * _env, jclass _b, jlong node_signature_1_arg, jlong node_signature_2_arg, jlong bitcoin_signature_1_arg, jlong bitcoin_signature_2_arg, jlong contents_arg) {
	LDKSignature node_signature_1_arg_conv = *(LDKSignature*)node_signature_1_arg;
	free((void*)node_signature_1_arg);
	LDKSignature node_signature_2_arg_conv = *(LDKSignature*)node_signature_2_arg;
	free((void*)node_signature_2_arg);
	LDKSignature bitcoin_signature_1_arg_conv = *(LDKSignature*)bitcoin_signature_1_arg;
	free((void*)bitcoin_signature_1_arg);
	LDKSignature bitcoin_signature_2_arg_conv = *(LDKSignature*)bitcoin_signature_2_arg;
	free((void*)bitcoin_signature_2_arg);
	LDKUnsignedChannelAnnouncement contents_arg_conv = *(LDKUnsignedChannelAnnouncement*)contents_arg;
	free((void*)contents_arg);
	contents_arg_conv._underlying_ref = false;
	LDKChannelAnnouncement* ret = malloc(sizeof(LDKChannelAnnouncement));
	*ret = ChannelAnnouncement_new(node_signature_1_arg_conv, node_signature_2_arg_conv, bitcoin_signature_1_arg_conv, bitcoin_signature_2_arg_conv, contents_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate this_ptr_conv = *(LDKUnsignedChannelUpdate*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return UnsignedChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1get_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *UnsignedChannelUpdate_get_chain_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1set_1chain_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelUpdate* this_ptr_conv = (LDKUnsignedChannelUpdate*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return UnsignedChannelUpdate_set_chain_hash(this_ptr_conv, val_conv);
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
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1get_1signature(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelUpdate* this_ptr_conv = (LDKChannelUpdate*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = ChannelUpdate_get_signature(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1set_1signature(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelUpdate* this_ptr_conv = (LDKChannelUpdate*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return ChannelUpdate_set_signature(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1get_1contents(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelUpdate* this_ptr_conv = (LDKChannelUpdate*)this_ptr;
	LDKUnsignedChannelUpdate* ret = malloc(sizeof(LDKUnsignedChannelUpdate));
	*ret = ChannelUpdate_get_contents(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1set_1contents(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelUpdate* this_ptr_conv = (LDKChannelUpdate*)this_ptr;
	LDKUnsignedChannelUpdate val_conv = *(LDKUnsignedChannelUpdate*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return ChannelUpdate_set_contents(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1new(JNIEnv * _env, jclass _b, jlong signature_arg, jlong contents_arg) {
	LDKSignature signature_arg_conv = *(LDKSignature*)signature_arg;
	free((void*)signature_arg);
	LDKUnsignedChannelUpdate contents_arg_conv = *(LDKUnsignedChannelUpdate*)contents_arg;
	free((void*)contents_arg);
	contents_arg_conv._underlying_ref = false;
	LDKChannelUpdate* ret = malloc(sizeof(LDKChannelUpdate));
	*ret = ChannelUpdate_new(signature_arg_conv, contents_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ErrorAction_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorAction this_ptr_conv = *(LDKErrorAction*)this_ptr;
	free((void*)this_ptr);
	return ErrorAction_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError this_ptr_conv = *(LDKLightningError*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return LightningError_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LightningError_1get_1err(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKStr* ret = malloc(sizeof(LDKStr));
	*ret = LightningError_get_err(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1set_1err(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKCVec_u8Z val_conv = *(LDKCVec_u8Z*)val;
	free((void*)val);
	return LightningError_set_err(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LightningError_1get_1action(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKErrorAction* ret = malloc(sizeof(LDKErrorAction));
	*ret = LightningError_get_action(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LightningError_1set_1action(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKErrorAction val_conv = *(LDKErrorAction*)val;
	free((void*)val);
	return LightningError_set_action(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LightningError_1new(JNIEnv * _env, jclass _b, jlong err_arg, jlong action_arg) {
	LDKCVec_u8Z err_arg_conv = *(LDKCVec_u8Z*)err_arg;
	free((void*)err_arg);
	LDKErrorAction action_arg_conv = *(LDKErrorAction*)action_arg;
	free((void*)action_arg);
	LDKLightningError* ret = malloc(sizeof(LDKLightningError));
	*ret = LightningError_new(err_arg_conv, action_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate this_ptr_conv = *(LDKCommitmentUpdate*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return CommitmentUpdate_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1add_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateAddHTLCZ val_conv = *(LDKCVec_UpdateAddHTLCZ*)val;
	free((void*)val);
	return CommitmentUpdate_set_update_add_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fulfill_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateFulfillHTLCZ val_conv = *(LDKCVec_UpdateFulfillHTLCZ*)val;
	free((void*)val);
	return CommitmentUpdate_set_update_fulfill_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fail_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateFailHTLCZ val_conv = *(LDKCVec_UpdateFailHTLCZ*)val;
	free((void*)val);
	return CommitmentUpdate_set_update_fail_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fail_1malformed_1htlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateFailMalformedHTLCZ val_conv = *(LDKCVec_UpdateFailMalformedHTLCZ*)val;
	free((void*)val);
	return CommitmentUpdate_set_update_fail_malformed_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1get_1update_1fee(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKUpdateFee* ret = malloc(sizeof(LDKUpdateFee));
	*ret = CommitmentUpdate_get_update_fee(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1update_1fee(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKUpdateFee val_conv = *(LDKUpdateFee*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return CommitmentUpdate_set_update_fee(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1get_1commitment_1signed(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCommitmentSigned* ret = malloc(sizeof(LDKCommitmentSigned));
	*ret = CommitmentUpdate_get_commitment_signed(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1set_1commitment_1signed(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCommitmentSigned val_conv = *(LDKCommitmentSigned*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return CommitmentUpdate_set_commitment_signed(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentUpdate_1new(JNIEnv * _env, jclass _b, jlong update_add_htlcs_arg, jlong update_fulfill_htlcs_arg, jlong update_fail_htlcs_arg, jlong update_fail_malformed_htlcs_arg, jlong update_fee_arg, jlong commitment_signed_arg) {
	LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg_conv = *(LDKCVec_UpdateAddHTLCZ*)update_add_htlcs_arg;
	free((void*)update_add_htlcs_arg);
	LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg_conv = *(LDKCVec_UpdateFulfillHTLCZ*)update_fulfill_htlcs_arg;
	free((void*)update_fulfill_htlcs_arg);
	LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg_conv = *(LDKCVec_UpdateFailHTLCZ*)update_fail_htlcs_arg;
	free((void*)update_fail_htlcs_arg);
	LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg_conv = *(LDKCVec_UpdateFailMalformedHTLCZ*)update_fail_malformed_htlcs_arg;
	free((void*)update_fail_malformed_htlcs_arg);
	LDKUpdateFee update_fee_arg_conv = *(LDKUpdateFee*)update_fee_arg;
	free((void*)update_fee_arg);
	update_fee_arg_conv._underlying_ref = false;
	LDKCommitmentSigned commitment_signed_arg_conv = *(LDKCommitmentSigned*)commitment_signed_arg;
	free((void*)commitment_signed_arg);
	commitment_signed_arg_conv._underlying_ref = false;
	LDKCommitmentUpdate* ret = malloc(sizeof(LDKCommitmentUpdate));
	*ret = CommitmentUpdate_new(update_add_htlcs_arg_conv, update_fulfill_htlcs_arg_conv, update_fail_htlcs_arg_conv, update_fail_malformed_htlcs_arg_conv, update_fee_arg_conv, commitment_signed_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCFailChannelUpdate_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCFailChannelUpdate this_ptr_conv = *(LDKHTLCFailChannelUpdate*)this_ptr;
	free((void*)this_ptr);
	return HTLCFailChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelMessageHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMessageHandler *this_ptr_conv = (LDKChannelMessageHandler*)this_ptr;
	return ChannelMessageHandler_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingMessageHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingMessageHandler *this_ptr_conv = (LDKRoutingMessageHandler*)this_ptr;
	return RoutingMessageHandler_free(*this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKAcceptChannel* obj_conv = (LDKAcceptChannel*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = AcceptChannel_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AcceptChannel_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKAcceptChannel* ret = malloc(sizeof(LDKAcceptChannel));
	*ret = AcceptChannel_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKAnnouncementSignatures* obj_conv = (LDKAnnouncementSignatures*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = AnnouncementSignatures_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_AnnouncementSignatures_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKAnnouncementSignatures* ret = malloc(sizeof(LDKAnnouncementSignatures));
	*ret = AnnouncementSignatures_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelReestablish* obj_conv = (LDKChannelReestablish*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelReestablish_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelReestablish_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKChannelReestablish* ret = malloc(sizeof(LDKChannelReestablish));
	*ret = ChannelReestablish_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKClosingSigned* obj_conv = (LDKClosingSigned*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ClosingSigned_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ClosingSigned_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKClosingSigned* ret = malloc(sizeof(LDKClosingSigned));
	*ret = ClosingSigned_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKCommitmentSigned* obj_conv = (LDKCommitmentSigned*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = CommitmentSigned_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_CommitmentSigned_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKCommitmentSigned* ret = malloc(sizeof(LDKCommitmentSigned));
	*ret = CommitmentSigned_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingCreated* obj_conv = (LDKFundingCreated*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = FundingCreated_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingCreated_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKFundingCreated* ret = malloc(sizeof(LDKFundingCreated));
	*ret = FundingCreated_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingSigned* obj_conv = (LDKFundingSigned*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = FundingSigned_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingSigned_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKFundingSigned* ret = malloc(sizeof(LDKFundingSigned));
	*ret = FundingSigned_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingLocked* obj_conv = (LDKFundingLocked*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = FundingLocked_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_FundingLocked_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKFundingLocked* ret = malloc(sizeof(LDKFundingLocked));
	*ret = FundingLocked_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Init_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKInit* obj_conv = (LDKInit*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Init_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Init_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKInit* ret = malloc(sizeof(LDKInit));
	*ret = Init_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKOpenChannel* obj_conv = (LDKOpenChannel*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = OpenChannel_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_OpenChannel_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKOpenChannel* ret = malloc(sizeof(LDKOpenChannel));
	*ret = OpenChannel_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRevokeAndACK* obj_conv = (LDKRevokeAndACK*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = RevokeAndACK_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RevokeAndACK_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKRevokeAndACK* ret = malloc(sizeof(LDKRevokeAndACK));
	*ret = RevokeAndACK_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKShutdown* obj_conv = (LDKShutdown*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Shutdown_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Shutdown_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKShutdown* ret = malloc(sizeof(LDKShutdown));
	*ret = Shutdown_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFailHTLC* obj_conv = (LDKUpdateFailHTLC*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateFailHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailHTLC_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKUpdateFailHTLC* ret = malloc(sizeof(LDKUpdateFailHTLC));
	*ret = UpdateFailHTLC_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFailMalformedHTLC* obj_conv = (LDKUpdateFailMalformedHTLC*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateFailMalformedHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFailMalformedHTLC_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKUpdateFailMalformedHTLC* ret = malloc(sizeof(LDKUpdateFailMalformedHTLC));
	*ret = UpdateFailMalformedHTLC_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFee_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFee* obj_conv = (LDKUpdateFee*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateFee_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFee_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKUpdateFee* ret = malloc(sizeof(LDKUpdateFee));
	*ret = UpdateFee_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFulfillHTLC* obj_conv = (LDKUpdateFulfillHTLC*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateFulfillHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateFulfillHTLC_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKUpdateFulfillHTLC* ret = malloc(sizeof(LDKUpdateFulfillHTLC));
	*ret = UpdateFulfillHTLC_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateAddHTLC* obj_conv = (LDKUpdateAddHTLC*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateAddHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UpdateAddHTLC_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKUpdateAddHTLC* ret = malloc(sizeof(LDKUpdateAddHTLC));
	*ret = UpdateAddHTLC_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Ping_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKPing* obj_conv = (LDKPing*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Ping_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Ping_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKPing* ret = malloc(sizeof(LDKPing));
	*ret = Ping_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Pong_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKPong* obj_conv = (LDKPong*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Pong_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Pong_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKPong* ret = malloc(sizeof(LDKPong));
	*ret = Pong_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedChannelAnnouncement* obj_conv = (LDKUnsignedChannelAnnouncement*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UnsignedChannelAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelAnnouncement_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKUnsignedChannelAnnouncement* ret = malloc(sizeof(LDKUnsignedChannelAnnouncement));
	*ret = UnsignedChannelAnnouncement_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelAnnouncement* obj_conv = (LDKChannelAnnouncement*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelAnnouncement_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKChannelAnnouncement* ret = malloc(sizeof(LDKChannelAnnouncement));
	*ret = ChannelAnnouncement_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedChannelUpdate* obj_conv = (LDKUnsignedChannelUpdate*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UnsignedChannelUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedChannelUpdate_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKUnsignedChannelUpdate* ret = malloc(sizeof(LDKUnsignedChannelUpdate));
	*ret = UnsignedChannelUpdate_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelUpdate* obj_conv = (LDKChannelUpdate*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelUpdate_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKChannelUpdate* ret = malloc(sizeof(LDKChannelUpdate));
	*ret = ChannelUpdate_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKErrorMessage* obj_conv = (LDKErrorMessage*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ErrorMessage_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ErrorMessage_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKErrorMessage* ret = malloc(sizeof(LDKErrorMessage));
	*ret = ErrorMessage_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedNodeAnnouncement* obj_conv = (LDKUnsignedNodeAnnouncement*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UnsignedNodeAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_UnsignedNodeAnnouncement_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKUnsignedNodeAnnouncement* ret = malloc(sizeof(LDKUnsignedNodeAnnouncement));
	*ret = UnsignedNodeAnnouncement_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeAnnouncement* obj_conv = (LDKNodeAnnouncement*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = NodeAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncement_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKNodeAnnouncement* ret = malloc(sizeof(LDKNodeAnnouncement));
	*ret = NodeAnnouncement_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler this_ptr_conv = *(LDKMessageHandler*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return MessageHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_MessageHandler_1get_1chan_1handler(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	long ret = (long)MessageHandler_get_chan_handler(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1set_1chan_1handler(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	LDKChannelMessageHandler *val_conv = (LDKChannelMessageHandler*)val;
	LDKChannelMessageHandler_JCalls_clone(val_conv->this_arg);
	return MessageHandler_set_chan_handler(this_ptr_conv, *val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_MessageHandler_1get_1route_1handler(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	long ret = (long)MessageHandler_get_route_handler(this_ptr_conv);
	return ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_MessageHandler_1set_1route_1handler(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	LDKRoutingMessageHandler *val_conv = (LDKRoutingMessageHandler*)val;
	LDKRoutingMessageHandler_JCalls_clone(val_conv->this_arg);
	return MessageHandler_set_route_handler(this_ptr_conv, *val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_MessageHandler_1new(JNIEnv * _env, jclass _b, jlong chan_handler_arg, jlong route_handler_arg) {
	LDKChannelMessageHandler *chan_handler_arg_conv = (LDKChannelMessageHandler*)chan_handler_arg;
	LDKChannelMessageHandler_JCalls_clone(chan_handler_arg_conv->this_arg);
	LDKRoutingMessageHandler *route_handler_arg_conv = (LDKRoutingMessageHandler*)route_handler_arg;
	LDKRoutingMessageHandler_JCalls_clone(route_handler_arg_conv->this_arg);
	LDKMessageHandler* ret = malloc(sizeof(LDKMessageHandler));
	*ret = MessageHandler_new(*chan_handler_arg_conv, *route_handler_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_SocketDescriptor_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKSocketDescriptor *this_ptr_conv = (LDKSocketDescriptor*)this_ptr;
	return SocketDescriptor_free(*this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerHandleError_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerHandleError this_ptr_conv = *(LDKPeerHandleError*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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
	LDKPeerHandleError* ret = malloc(sizeof(LDKPeerHandleError));
	*ret = PeerHandleError_new(no_connection_possible_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PeerManager_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerManager this_ptr_conv = *(LDKPeerManager*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return PeerManager_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1new(JNIEnv * _env, jclass _b, jlong message_handler, jlong our_node_secret, jbyteArray ephemeral_random_data, jlong logger) {
	LDKMessageHandler message_handler_conv = *(LDKMessageHandler*)message_handler;
	free((void*)message_handler);
	message_handler_conv._underlying_ref = false;
	LDKSecretKey our_node_secret_conv = *(LDKSecretKey*)our_node_secret;
	free((void*)our_node_secret);
	unsigned char ephemeral_random_data_arr[32];
	(*_env)->GetByteArrayRegion (_env, ephemeral_random_data, 0, 32, ephemeral_random_data_arr);
	unsigned char (*ephemeral_random_data_ref)[32] = &ephemeral_random_data_arr;
	LDKLogger *logger_conv = (LDKLogger*)logger;
	LDKLogger_JCalls_clone(logger_conv->this_arg);
	LDKPeerManager* ret = malloc(sizeof(LDKPeerManager));
	*ret = PeerManager_new(message_handler_conv, our_node_secret_conv, ephemeral_random_data_ref, *logger_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1get_1peer_1node_1ids(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKCVec_PublicKeyZ* ret = malloc(sizeof(LDKCVec_PublicKeyZ));
	*ret = PeerManager_get_peer_node_ids(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1new_1outbound_1connection(JNIEnv * _env, jclass _b, jlong this_arg, jlong their_node_id, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	free((void*)their_node_id);
	LDKSocketDescriptor *descriptor_conv = (LDKSocketDescriptor*)descriptor;
	LDKSocketDescriptor_JCalls_clone(descriptor_conv->this_arg);
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ));
	*ret = PeerManager_new_outbound_connection(this_arg_conv, their_node_id_conv, *descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1new_1inbound_1connection(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor *descriptor_conv = (LDKSocketDescriptor*)descriptor;
	LDKSocketDescriptor_JCalls_clone(descriptor_conv->this_arg);
	LDKCResult_NonePeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_NonePeerHandleErrorZ));
	*ret = PeerManager_new_inbound_connection(this_arg_conv, *descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1write_1buffer_1space_1avail(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	LDKCResult_NonePeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_NonePeerHandleErrorZ));
	*ret = PeerManager_write_buffer_space_avail(this_arg_conv, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PeerManager_1read_1event(JNIEnv * _env, jclass _b, jlong this_arg, jlong peer_descriptor, jlong data) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor* peer_descriptor_conv = (LDKSocketDescriptor*)peer_descriptor;
	LDKu8slice data_conv = *(LDKu8slice*)data;
	free((void*)data);
	LDKCResult_boolPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_boolPeerHandleErrorZ));
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

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_build_1commitment_1secret(JNIEnv * _env, jclass _b, jbyteArray commitment_seed, jlong idx) {
	unsigned char commitment_seed_arr[32];
	(*_env)->GetByteArrayRegion (_env, commitment_seed, 0, 32, commitment_seed_arr);
	unsigned char (*commitment_seed_ref)[32] = &commitment_seed_arr;
	LDKThirtyTwoBytes* ret = malloc(sizeof(LDKThirtyTwoBytes));
	*ret = build_commitment_secret(commitment_seed_ref, idx);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys this_ptr_conv = *(LDKTxCreationKeys*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return TxCreationKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = TxCreationKeys_get_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return TxCreationKeys_set_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1revocation_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = TxCreationKeys_get_revocation_key(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1revocation_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return TxCreationKeys_set_revocation_key(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1a_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = TxCreationKeys_get_a_htlc_key(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1a_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return TxCreationKeys_set_a_htlc_key(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1b_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = TxCreationKeys_get_b_htlc_key(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1b_1htlc_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return TxCreationKeys_set_b_htlc_key(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1get_1a_1delayed_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = TxCreationKeys_get_a_delayed_payment_key(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1set_1a_1delayed_1payment_1key(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return TxCreationKeys_set_a_delayed_payment_key(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1new(JNIEnv * _env, jclass _b, jlong per_commitment_point_arg, jlong revocation_key_arg, jlong a_htlc_key_arg, jlong b_htlc_key_arg, jlong a_delayed_payment_key_arg) {
	LDKPublicKey per_commitment_point_arg_conv = *(LDKPublicKey*)per_commitment_point_arg;
	free((void*)per_commitment_point_arg);
	LDKPublicKey revocation_key_arg_conv = *(LDKPublicKey*)revocation_key_arg;
	free((void*)revocation_key_arg);
	LDKPublicKey a_htlc_key_arg_conv = *(LDKPublicKey*)a_htlc_key_arg;
	free((void*)a_htlc_key_arg);
	LDKPublicKey b_htlc_key_arg_conv = *(LDKPublicKey*)b_htlc_key_arg;
	free((void*)b_htlc_key_arg);
	LDKPublicKey a_delayed_payment_key_arg_conv = *(LDKPublicKey*)a_delayed_payment_key_arg;
	free((void*)a_delayed_payment_key_arg);
	LDKTxCreationKeys* ret = malloc(sizeof(LDKTxCreationKeys));
	*ret = TxCreationKeys_new(per_commitment_point_arg_conv, revocation_key_arg_conv, a_htlc_key_arg_conv, b_htlc_key_arg_conv, a_delayed_payment_key_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKTxCreationKeys* obj_conv = (LDKTxCreationKeys*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = TxCreationKeys_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKTxCreationKeys* ret = malloc(sizeof(LDKTxCreationKeys));
	*ret = TxCreationKeys_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPreCalculatedTxCreationKeys this_ptr_conv = *(LDKPreCalculatedTxCreationKeys*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return PreCalculatedTxCreationKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1new(JNIEnv * _env, jclass _b, jlong keys) {
	LDKTxCreationKeys keys_conv = *(LDKTxCreationKeys*)keys;
	free((void*)keys);
	keys_conv._underlying_ref = false;
	LDKPreCalculatedTxCreationKeys* ret = malloc(sizeof(LDKPreCalculatedTxCreationKeys));
	*ret = PreCalculatedTxCreationKeys_new(keys_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1trust_1key_1derivation(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPreCalculatedTxCreationKeys* this_arg_conv = (LDKPreCalculatedTxCreationKeys*)this_arg;
	LDKTxCreationKeys* ret = malloc(sizeof(LDKTxCreationKeys));
	*ret = PreCalculatedTxCreationKeys_trust_key_derivation(this_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_PreCalculatedTxCreationKeys_1per_1commitment_1point(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPreCalculatedTxCreationKeys* this_arg_conv = (LDKPreCalculatedTxCreationKeys*)this_arg;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = PreCalculatedTxCreationKeys_per_commitment_point(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys this_ptr_conv = *(LDKChannelPublicKeys*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelPublicKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_funding_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1funding_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return ChannelPublicKeys_set_funding_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_revocation_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1revocation_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return ChannelPublicKeys_set_revocation_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_payment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1payment_1point(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return ChannelPublicKeys_set_payment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_delayed_payment_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1delayed_1payment_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return ChannelPublicKeys_set_delayed_payment_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1get_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_htlc_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1set_1htlc_1basepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return ChannelPublicKeys_set_htlc_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1new(JNIEnv * _env, jclass _b, jlong funding_pubkey_arg, jlong revocation_basepoint_arg, jlong payment_point_arg, jlong delayed_payment_basepoint_arg, jlong htlc_basepoint_arg) {
	LDKPublicKey funding_pubkey_arg_conv = *(LDKPublicKey*)funding_pubkey_arg;
	free((void*)funding_pubkey_arg);
	LDKPublicKey revocation_basepoint_arg_conv = *(LDKPublicKey*)revocation_basepoint_arg;
	free((void*)revocation_basepoint_arg);
	LDKPublicKey payment_point_arg_conv = *(LDKPublicKey*)payment_point_arg;
	free((void*)payment_point_arg);
	LDKPublicKey delayed_payment_basepoint_arg_conv = *(LDKPublicKey*)delayed_payment_basepoint_arg;
	free((void*)delayed_payment_basepoint_arg);
	LDKPublicKey htlc_basepoint_arg_conv = *(LDKPublicKey*)htlc_basepoint_arg;
	free((void*)htlc_basepoint_arg);
	LDKChannelPublicKeys* ret = malloc(sizeof(LDKChannelPublicKeys));
	*ret = ChannelPublicKeys_new(funding_pubkey_arg_conv, revocation_basepoint_arg_conv, payment_point_arg_conv, delayed_payment_basepoint_arg_conv, htlc_basepoint_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelPublicKeys* obj_conv = (LDKChannelPublicKeys*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelPublicKeys_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelPublicKeys_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKChannelPublicKeys* ret = malloc(sizeof(LDKChannelPublicKeys));
	*ret = ChannelPublicKeys_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_TxCreationKeys_1derive_1new(JNIEnv * _env, jclass _b, jlong per_commitment_point, jlong a_delayed_payment_base, jlong a_htlc_base, jlong b_revocation_base, jlong b_htlc_base) {
	LDKPublicKey per_commitment_point_conv = *(LDKPublicKey*)per_commitment_point;
	free((void*)per_commitment_point);
	LDKPublicKey a_delayed_payment_base_conv = *(LDKPublicKey*)a_delayed_payment_base;
	free((void*)a_delayed_payment_base);
	LDKPublicKey a_htlc_base_conv = *(LDKPublicKey*)a_htlc_base;
	free((void*)a_htlc_base);
	LDKPublicKey b_revocation_base_conv = *(LDKPublicKey*)b_revocation_base;
	free((void*)b_revocation_base);
	LDKPublicKey b_htlc_base_conv = *(LDKPublicKey*)b_htlc_base;
	free((void*)b_htlc_base);
	LDKCResult_TxCreationKeysSecpErrorZ* ret = malloc(sizeof(LDKCResult_TxCreationKeysSecpErrorZ));
	*ret = TxCreationKeys_derive_new(per_commitment_point_conv, a_delayed_payment_base_conv, a_htlc_base_conv, b_revocation_base_conv, b_htlc_base_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_get_1revokeable_1redeemscript(JNIEnv * _env, jclass _b, jlong revocation_key, jshort to_self_delay, jlong delayed_payment_key) {
	LDKPublicKey revocation_key_conv = *(LDKPublicKey*)revocation_key;
	free((void*)revocation_key);
	LDKPublicKey delayed_payment_key_conv = *(LDKPublicKey*)delayed_payment_key;
	free((void*)delayed_payment_key);
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = get_revokeable_redeemscript(revocation_key_conv, to_self_delay, delayed_payment_key_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv = *(LDKHTLCOutputInCommitment*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1set_1payment_1hash(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return HTLCOutputInCommitment_set_payment_hash(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHTLCOutputInCommitment* obj_conv = (LDKHTLCOutputInCommitment*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = HTLCOutputInCommitment_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_HTLCOutputInCommitment_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKHTLCOutputInCommitment* ret = malloc(sizeof(LDKHTLCOutputInCommitment));
	*ret = HTLCOutputInCommitment_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_get_1htlc_1redeemscript(JNIEnv * _env, jclass _b, jlong htlc, jlong keys) {
	LDKHTLCOutputInCommitment* htlc_conv = (LDKHTLCOutputInCommitment*)htlc;
	LDKTxCreationKeys* keys_conv = (LDKTxCreationKeys*)keys;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = get_htlc_redeemscript(htlc_conv, keys_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_make_1funding_1redeemscript(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKPublicKey a_conv = *(LDKPublicKey*)a;
	free((void*)a);
	LDKPublicKey b_conv = *(LDKPublicKey*)b;
	free((void*)b);
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = make_funding_redeemscript(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_build_1htlc_1transaction(JNIEnv * _env, jclass _b, jbyteArray prev_hash, jint feerate_per_kw, jshort to_self_delay, jlong htlc, jlong a_delayed_payment_key, jlong revocation_key) {
	unsigned char prev_hash_arr[32];
	(*_env)->GetByteArrayRegion (_env, prev_hash, 0, 32, prev_hash_arr);
	unsigned char (*prev_hash_ref)[32] = &prev_hash_arr;
	LDKHTLCOutputInCommitment* htlc_conv = (LDKHTLCOutputInCommitment*)htlc;
	LDKPublicKey a_delayed_payment_key_conv = *(LDKPublicKey*)a_delayed_payment_key;
	free((void*)a_delayed_payment_key);
	LDKPublicKey revocation_key_conv = *(LDKPublicKey*)revocation_key;
	free((void*)revocation_key);
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = build_htlc_transaction(prev_hash_ref, feerate_per_kw, to_self_delay, htlc_conv, a_delayed_payment_key_conv, revocation_key_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLocalCommitmentTransaction this_ptr_conv = *(LDKLocalCommitmentTransaction*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return LocalCommitmentTransaction_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1get_1unsigned_1tx(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = LocalCommitmentTransaction_get_unsigned_tx(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1set_1unsigned_1tx(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKCVec_u8Z val_conv = *(LDKCVec_u8Z*)val;
	free((void*)val);
	return LocalCommitmentTransaction_set_unsigned_tx(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1get_1their_1sig(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = LocalCommitmentTransaction_get_their_sig(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1set_1their_1sig(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	free((void*)val);
	return LocalCommitmentTransaction_set_their_sig(this_ptr_conv, val_conv);
}

JNIEXPORT jint JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1get_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	return LocalCommitmentTransaction_get_feerate_per_kw(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1set_1feerate_1per_1kw(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	return LocalCommitmentTransaction_set_feerate_per_kw(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1set_1per_1htlc(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ val_conv = *(LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ*)val;
	free((void*)val);
	return LocalCommitmentTransaction_set_per_htlc(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1new_1missing_1local_1sig(JNIEnv * _env, jclass _b, jlong unsigned_tx, jlong their_sig, jlong our_funding_key, jlong their_funding_key, jlong local_keys, jint feerate_per_kw, jlong htlc_data) {
	LDKCVec_u8Z unsigned_tx_conv = *(LDKCVec_u8Z*)unsigned_tx;
	free((void*)unsigned_tx);
	LDKSignature their_sig_conv = *(LDKSignature*)their_sig;
	free((void*)their_sig);
	LDKPublicKey our_funding_key_conv = *(LDKPublicKey*)our_funding_key;
	free((void*)our_funding_key);
	LDKPublicKey their_funding_key_conv = *(LDKPublicKey*)their_funding_key;
	free((void*)their_funding_key);
	LDKTxCreationKeys local_keys_conv = *(LDKTxCreationKeys*)local_keys;
	free((void*)local_keys);
	local_keys_conv._underlying_ref = false;
	LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ htlc_data_conv = *(LDKCVec_C2Tuple_HTLCOutputInCommitmentSignatureZZ*)htlc_data;
	free((void*)htlc_data);
	LDKLocalCommitmentTransaction* ret = malloc(sizeof(LDKLocalCommitmentTransaction));
	*ret = LocalCommitmentTransaction_new_missing_local_sig(unsigned_tx_conv, their_sig_conv, our_funding_key_conv, their_funding_key_conv, local_keys_conv, feerate_per_kw, htlc_data_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1trust_1key_1derivation(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKLocalCommitmentTransaction* this_arg_conv = (LDKLocalCommitmentTransaction*)this_arg;
	LDKTxCreationKeys* ret = malloc(sizeof(LDKTxCreationKeys));
	*ret = LocalCommitmentTransaction_trust_key_derivation(this_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1txid(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKLocalCommitmentTransaction* this_arg_conv = (LDKLocalCommitmentTransaction*)this_arg;
	LDKThirtyTwoBytes* ret = malloc(sizeof(LDKThirtyTwoBytes));
	*ret = LocalCommitmentTransaction_txid(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1get_1local_1sig(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray funding_key, jlong funding_redeemscript, jlong channel_value_satoshis) {
	LDKLocalCommitmentTransaction* this_arg_conv = (LDKLocalCommitmentTransaction*)this_arg;
	unsigned char funding_key_arr[32];
	(*_env)->GetByteArrayRegion (_env, funding_key, 0, 32, funding_key_arr);
	unsigned char (*funding_key_ref)[32] = &funding_key_arr;
	LDKu8slice funding_redeemscript_conv = *(LDKu8slice*)funding_redeemscript;
	free((void*)funding_redeemscript);
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = LocalCommitmentTransaction_get_local_sig(this_arg_conv, funding_key_ref, funding_redeemscript_conv, channel_value_satoshis);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1get_1htlc_1sigs(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray htlc_base_key, jshort local_csv) {
	LDKLocalCommitmentTransaction* this_arg_conv = (LDKLocalCommitmentTransaction*)this_arg;
	unsigned char htlc_base_key_arr[32];
	(*_env)->GetByteArrayRegion (_env, htlc_base_key, 0, 32, htlc_base_key_arr);
	unsigned char (*htlc_base_key_ref)[32] = &htlc_base_key_arr;
	LDKCResult_CVec_SignatureZNoneZ* ret = malloc(sizeof(LDKCResult_CVec_SignatureZNoneZ));
	*ret = LocalCommitmentTransaction_get_htlc_sigs(this_arg_conv, htlc_base_key_ref, local_csv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKLocalCommitmentTransaction* obj_conv = (LDKLocalCommitmentTransaction*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = LocalCommitmentTransaction_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LocalCommitmentTransaction_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKLocalCommitmentTransaction* ret = malloc(sizeof(LDKLocalCommitmentTransaction));
	*ret = LocalCommitmentTransaction_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_InitFeatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInitFeatures this_ptr_conv = *(LDKInitFeatures*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return InitFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeFeatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeFeatures this_ptr_conv = *(LDKNodeFeatures*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return NodeFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelFeatures_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelFeatures this_ptr_conv = *(LDKChannelFeatures*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv = *(LDKRouteHop*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return RouteHop_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = RouteHop_get_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1pubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return RouteHop_set_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHop_1get_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_get_short_channel_id(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHop_1set_1short_1channel_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_set_short_channel_id(this_ptr_conv, val);
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

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Route_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoute this_ptr_conv = *(LDKRoute*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return Route_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_Route_1set_1paths(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRoute* this_ptr_conv = (LDKRoute*)this_ptr;
	LDKCVec_CVec_RouteHopZZ val_conv = *(LDKCVec_CVec_RouteHopZZ*)val;
	free((void*)val);
	return Route_set_paths(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Route_1new(JNIEnv * _env, jclass _b, jlong paths_arg) {
	LDKCVec_CVec_RouteHopZZ paths_arg_conv = *(LDKCVec_CVec_RouteHopZZ*)paths_arg;
	free((void*)paths_arg);
	LDKRoute* ret = malloc(sizeof(LDKRoute));
	*ret = Route_new(paths_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Route_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRoute* obj_conv = (LDKRoute*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Route_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_Route_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKRoute* ret = malloc(sizeof(LDKRoute));
	*ret = Route_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint this_ptr_conv = *(LDKRouteHint*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return RouteHint_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RouteHint_1get_1src_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = RouteHint_get_src_node_id(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1src_1node_1id(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
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
	LDKRoutingFees* ret = malloc(sizeof(LDKRoutingFees));
	*ret = RouteHint_get_fees(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RouteHint_1set_1fees(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKRoutingFees val_conv = *(LDKRoutingFees*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
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
	free((void*)src_node_id_arg);
	LDKRoutingFees fees_arg_conv = *(LDKRoutingFees*)fees_arg;
	free((void*)fees_arg);
	fees_arg_conv._underlying_ref = false;
	LDKRouteHint* ret = malloc(sizeof(LDKRouteHint));
	*ret = RouteHint_new(src_node_id_arg_conv, short_channel_id_arg, fees_arg_conv, cltv_expiry_delta_arg, htlc_minimum_msat_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_get_1route(JNIEnv * _env, jclass _b, jlong our_node_id, jlong network, jlong target, jlong first_hops, jlong last_hops, jlong final_value_msat, jint final_cltv, jlong logger) {
	LDKPublicKey our_node_id_conv = *(LDKPublicKey*)our_node_id;
	free((void*)our_node_id);
	LDKNetworkGraph* network_conv = (LDKNetworkGraph*)network;
	LDKPublicKey target_conv = *(LDKPublicKey*)target;
	free((void*)target);
	LDKCVec_ChannelDetailsZ* first_hops_conv = (LDKCVec_ChannelDetailsZ*)first_hops;
	LDKCVec_RouteHintZ last_hops_conv = *(LDKCVec_RouteHintZ*)last_hops;
	free((void*)last_hops);
	LDKLogger *logger_conv = (LDKLogger*)logger;
	LDKLogger_JCalls_clone(logger_conv->this_arg);
	LDKCResult_RouteLightningErrorZ* ret = malloc(sizeof(LDKCResult_RouteLightningErrorZ));
	*ret = get_route(our_node_id_conv, network_conv, target_conv, first_hops_conv, last_hops_conv, final_value_msat, final_cltv, *logger_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetworkGraph this_ptr_conv = *(LDKNetworkGraph*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return NetworkGraph_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_LockedNetworkGraph_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLockedNetworkGraph this_ptr_conv = *(LDKLockedNetworkGraph*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return LockedNetworkGraph_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetGraphMsgHandler this_ptr_conv = *(LDKNetGraphMsgHandler*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return NetGraphMsgHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1new(JNIEnv * _env, jclass _b, jlong chain_monitor, jlong logger) {
	LDKChainWatchInterface *chain_monitor_conv = (LDKChainWatchInterface*)chain_monitor;
	LDKChainWatchInterface_JCalls_clone(chain_monitor_conv->this_arg);
	LDKLogger *logger_conv = (LDKLogger*)logger;
	LDKLogger_JCalls_clone(logger_conv->this_arg);
	LDKNetGraphMsgHandler* ret = malloc(sizeof(LDKNetGraphMsgHandler));
	*ret = NetGraphMsgHandler_new(*chain_monitor_conv, *logger_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1from_1net_1graph(JNIEnv * _env, jclass _b, jlong chain_monitor, jlong logger, jlong network_graph) {
	LDKChainWatchInterface *chain_monitor_conv = (LDKChainWatchInterface*)chain_monitor;
	LDKChainWatchInterface_JCalls_clone(chain_monitor_conv->this_arg);
	LDKLogger *logger_conv = (LDKLogger*)logger;
	LDKLogger_JCalls_clone(logger_conv->this_arg);
	LDKNetworkGraph network_graph_conv = *(LDKNetworkGraph*)network_graph;
	free((void*)network_graph);
	network_graph_conv._underlying_ref = false;
	LDKNetGraphMsgHandler* ret = malloc(sizeof(LDKNetGraphMsgHandler));
	*ret = NetGraphMsgHandler_from_net_graph(*chain_monitor_conv, *logger_conv, network_graph_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1read_1locked_1graph(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKNetGraphMsgHandler* this_arg_conv = (LDKNetGraphMsgHandler*)this_arg;
	LDKLockedNetworkGraph* ret = malloc(sizeof(LDKLockedNetworkGraph));
	*ret = NetGraphMsgHandler_read_locked_graph(this_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_LockedNetworkGraph_1graph(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKLockedNetworkGraph* this_arg_conv = (LDKLockedNetworkGraph*)this_arg;
	LDKNetworkGraph* ret = malloc(sizeof(LDKNetworkGraph));
	*ret = LockedNetworkGraph_graph(this_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetGraphMsgHandler_1as_1RoutingMessageHandler(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKNetGraphMsgHandler* this_arg_conv = (LDKNetGraphMsgHandler*)this_arg;
	LDKRoutingMessageHandler* ret = malloc(sizeof(LDKRoutingMessageHandler));
	*ret = NetGraphMsgHandler_as_RoutingMessageHandler(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv = *(LDKDirectionalChannelInfo*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKDirectionalChannelInfo* obj_conv = (LDKDirectionalChannelInfo*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = DirectionalChannelInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_DirectionalChannelInfo_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKDirectionalChannelInfo* ret = malloc(sizeof(LDKDirectionalChannelInfo));
	*ret = DirectionalChannelInfo_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv = *(LDKChannelInfo*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return ChannelInfo_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1node_1one(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelInfo_get_node_one(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1node_1one(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return ChannelInfo_set_node_one(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1one_1to_1two(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo* ret = malloc(sizeof(LDKDirectionalChannelInfo));
	*ret = ChannelInfo_get_one_to_two(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1one_1to_1two(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo val_conv = *(LDKDirectionalChannelInfo*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return ChannelInfo_set_one_to_two(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1node_1two(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelInfo_get_node_two(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1node_1two(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	free((void*)val);
	return ChannelInfo_set_node_two(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1get_1two_1to_1one(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo* ret = malloc(sizeof(LDKDirectionalChannelInfo));
	*ret = ChannelInfo_get_two_to_one(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1set_1two_1to_1one(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo val_conv = *(LDKDirectionalChannelInfo*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return ChannelInfo_set_two_to_one(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelInfo* obj_conv = (LDKChannelInfo*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_ChannelInfo_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKChannelInfo* ret = malloc(sizeof(LDKChannelInfo));
	*ret = ChannelInfo_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_RoutingFees_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees this_ptr_conv = *(LDKRoutingFees*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
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
	LDKRoutingFees* ret = malloc(sizeof(LDKRoutingFees));
	*ret = RoutingFees_new(base_msat_arg, proportional_millionths_arg);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingFees_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKRoutingFees* ret = malloc(sizeof(LDKRoutingFees));
	*ret = RoutingFees_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_RoutingFees_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRoutingFees* obj_conv = (LDKRoutingFees*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = RoutingFees_write(obj_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv = *(LDKNodeAnnouncementInfo*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return NodeAnnouncementInfo_free(this_ptr_conv);
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
	free((void*)val);
	return NodeAnnouncementInfo_set_rgb(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1get_1alias(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 32);
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *NodeAnnouncementInfo_get_alias(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1alias(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	free((void*)val);
	return NodeAnnouncementInfo_set_alias(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1set_1addresses(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKCVec_NetAddressZ val_conv = *(LDKCVec_NetAddressZ*)val;
	free((void*)val);
	return NodeAnnouncementInfo_set_addresses(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeAnnouncementInfo* obj_conv = (LDKNodeAnnouncementInfo*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = NodeAnnouncementInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeAnnouncementInfo_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKNodeAnnouncementInfo* ret = malloc(sizeof(LDKNodeAnnouncementInfo));
	*ret = NodeAnnouncementInfo_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1free(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo this_ptr_conv = *(LDKNodeInfo*)this_ptr;
	free((void*)this_ptr);
	this_ptr_conv._underlying_ref = false;
	return NodeInfo_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1channels(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKCVec_u64Z val_conv = *(LDKCVec_u64Z*)val;
	free((void*)val);
	return NodeInfo_set_channels(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1get_1lowest_1inbound_1channel_1fees(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKRoutingFees* ret = malloc(sizeof(LDKRoutingFees));
	*ret = NodeInfo_get_lowest_inbound_channel_fees(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1lowest_1inbound_1channel_1fees(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKRoutingFees val_conv = *(LDKRoutingFees*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return NodeInfo_set_lowest_inbound_channel_fees(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1get_1announcement_1info(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKNodeAnnouncementInfo* ret = malloc(sizeof(LDKNodeAnnouncementInfo));
	*ret = NodeInfo_get_announcement_info(this_ptr_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NodeInfo_1set_1announcement_1info(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKNodeAnnouncementInfo val_conv = *(LDKNodeAnnouncementInfo*)val;
	free((void*)val);
	val_conv._underlying_ref = false;
	return NodeInfo_set_announcement_info(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1new(JNIEnv * _env, jclass _b, jlong channels_arg, jlong lowest_inbound_channel_fees_arg, jlong announcement_info_arg) {
	LDKCVec_u64Z channels_arg_conv = *(LDKCVec_u64Z*)channels_arg;
	free((void*)channels_arg);
	LDKRoutingFees lowest_inbound_channel_fees_arg_conv = *(LDKRoutingFees*)lowest_inbound_channel_fees_arg;
	free((void*)lowest_inbound_channel_fees_arg);
	lowest_inbound_channel_fees_arg_conv._underlying_ref = false;
	LDKNodeAnnouncementInfo announcement_info_arg_conv = *(LDKNodeAnnouncementInfo*)announcement_info_arg;
	free((void*)announcement_info_arg);
	announcement_info_arg_conv._underlying_ref = false;
	LDKNodeInfo* ret = malloc(sizeof(LDKNodeInfo));
	*ret = NodeInfo_new(channels_arg_conv, lowest_inbound_channel_fees_arg_conv, announcement_info_arg_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeInfo* obj_conv = (LDKNodeInfo*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = NodeInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NodeInfo_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKNodeInfo* ret = malloc(sizeof(LDKNodeInfo));
	*ret = NodeInfo_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1write(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNetworkGraph* obj_conv = (LDKNetworkGraph*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = NetworkGraph_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1read(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	free((void*)ser);
	LDKNetworkGraph* ret = malloc(sizeof(LDKNetworkGraph));
	*ret = NetworkGraph_read(ser_conv);
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT jlong JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1new(JNIEnv * _env, jclass _b) {
	LDKNetworkGraph* ret = malloc(sizeof(LDKNetworkGraph));
	*ret = NetworkGraph_new();
	assert(!ret->_underlying_ref);
	ret->_underlying_ref = true;
	return (long)ret;
}

JNIEXPORT void JNICALL Java_org_ldk_impl_bindings_NetworkGraph_1close_1channel_1from_1update(JNIEnv * _env, jclass _b, jlong this_arg, jlong short_channel_id, jboolean is_permanent) {
	LDKNetworkGraph* this_arg_conv = (LDKNetworkGraph*)this_arg;
	return NetworkGraph_close_channel_from_update(this_arg_conv, short_channel_id, is_permanent);
}

