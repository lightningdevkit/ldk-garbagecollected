#include "org_ldk_bindings.h"
#include <rust_types.h>

#include <lightning.h>

JNIEXPORT void JNICALL C2TupleOutPointScriptZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_OutPointScriptZ arg_conv = *(LDKC2Tuple_OutPointScriptZ*)arg;
	return C2Tuple_OutPointScriptZ_free(arg_conv);
}

JNIEXPORT void JNICALL C2TupleScriptu64Zfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_Scriptu64Z arg_conv = *(LDKC2Tuple_Scriptu64Z*)arg;
	return C2Tuple_Scriptu64Z_free(arg_conv);
}

JNIEXPORT void JNICALL C2TupleSecretKeyu832Zfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_SecretKey_u832Z arg_conv = *(LDKC2Tuple_SecretKey_u832Z*)arg;
	return C2Tuple_SecretKey_u832Z_free(arg_conv);
}

JNIEXPORT void JNICALL C2TupleSignatureCVecSignatureZZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_SignatureCVec_SignatureZZ arg_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)arg;
	return C2Tuple_SignatureCVec_SignatureZZ_free(arg_conv);
}

JNIEXPORT void JNICALL C2TupleTxidu32Zfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_Txidu32Z arg_conv = *(LDKC2Tuple_Txidu32Z*)arg;
	return C2Tuple_Txidu32Z_free(arg_conv);
}

JNIEXPORT void JNICALL C2Tupleu64u64Zfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_u64u64Z arg_conv = *(LDKC2Tuple_u64u64Z*)arg;
	return C2Tuple_u64u64Z_free(arg_conv);
}

JNIEXPORT void JNICALL C3TupleChannelAnnouncementChannelUpdateChannelUpdateZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ arg_conv = *(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ*)arg;
	return C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultC2TupleScriptu64ZChainErrorZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKChainError arg_conv = *(LDKChainError*)arg;
	LDKCResult_C2Tuple_Scriptu64ZChainErrorZ* ret = malloc(sizeof(LDKCResult_C2Tuple_Scriptu64ZChainErrorZ));
	*ret = CResult_C2Tuple_Scriptu64ZChainErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultC2TupleScriptu64ZChainErrorZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_C2Tuple_Scriptu64ZChainErrorZ arg_conv = *(LDKCResult_C2Tuple_Scriptu64ZChainErrorZ*)arg;
	return CResult_C2Tuple_Scriptu64ZChainErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultC2TupleScriptu64ZChainErrorZgood(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_Scriptu64Z arg_conv = *(LDKC2Tuple_Scriptu64Z*)arg;
	LDKCResult_C2Tuple_Scriptu64ZChainErrorZ* ret = malloc(sizeof(LDKCResult_C2Tuple_Scriptu64ZChainErrorZ));
	*ret = CResult_C2Tuple_Scriptu64ZChainErrorZ_good(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultC2TupleSignatureCVecSignatureZZNoneZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ arg_conv = *(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ*)arg;
	return CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultC2TupleSignatureCVecSignatureZZNoneZgood(JNIEnv * _env, jclass _b, jlong arg) {
	LDKC2Tuple_SignatureCVec_SignatureZZ arg_conv = *(LDKC2Tuple_SignatureCVec_SignatureZZ*)arg;
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = malloc(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ));
	*ret = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_good(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultCVecSignatureZNoneZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_CVec_SignatureZNoneZ arg_conv = *(LDKCResult_CVec_SignatureZNoneZ*)arg;
	return CResult_CVec_SignatureZNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultCVecSignatureZNoneZgood(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_SignatureZ arg_conv = *(LDKCVec_SignatureZ*)arg;
	LDKCResult_CVec_SignatureZNoneZ* ret = malloc(sizeof(LDKCResult_CVec_SignatureZNoneZ));
	*ret = CResult_CVec_SignatureZNoneZ_good(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultCVecu8ZPeerHandleErrorZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPeerHandleError arg_conv = *(LDKPeerHandleError*)arg;
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ));
	*ret = CResult_CVec_u8ZPeerHandleErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultCVecu8ZPeerHandleErrorZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_CVec_u8ZPeerHandleErrorZ arg_conv = *(LDKCResult_CVec_u8ZPeerHandleErrorZ*)arg;
	return CResult_CVec_u8ZPeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultCVecu8ZPeerHandleErrorZgood(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_u8Z arg_conv = *(LDKCVec_u8Z*)arg;
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ));
	*ret = CResult_CVec_u8ZPeerHandleErrorZ_good(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultNoneAPIErrorZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKAPIError arg_conv = *(LDKAPIError*)arg;
	LDKCResult_NoneAPIErrorZ* ret = malloc(sizeof(LDKCResult_NoneAPIErrorZ));
	*ret = CResult_NoneAPIErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultNoneAPIErrorZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NoneAPIErrorZ arg_conv = *(LDKCResult_NoneAPIErrorZ*)arg;
	return CResult_NoneAPIErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultNoneChannelMonitorUpdateErrZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKChannelMonitorUpdateErr arg_conv = *(LDKChannelMonitorUpdateErr*)arg;
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = malloc(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ));
	*ret = CResult_NoneChannelMonitorUpdateErrZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultNoneChannelMonitorUpdateErrZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NoneChannelMonitorUpdateErrZ arg_conv = *(LDKCResult_NoneChannelMonitorUpdateErrZ*)arg;
	return CResult_NoneChannelMonitorUpdateErrZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultNoneMonitorUpdateErrorZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKMonitorUpdateError arg_conv = *(LDKMonitorUpdateError*)arg;
	LDKCResult_NoneMonitorUpdateErrorZ* ret = malloc(sizeof(LDKCResult_NoneMonitorUpdateErrorZ));
	*ret = CResult_NoneMonitorUpdateErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultNoneMonitorUpdateErrorZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NoneMonitorUpdateErrorZ arg_conv = *(LDKCResult_NoneMonitorUpdateErrorZ*)arg;
	return CResult_NoneMonitorUpdateErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultNonePaymentSendFailureZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPaymentSendFailure arg_conv = *(LDKPaymentSendFailure*)arg;
	LDKCResult_NonePaymentSendFailureZ* ret = malloc(sizeof(LDKCResult_NonePaymentSendFailureZ));
	*ret = CResult_NonePaymentSendFailureZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultNonePaymentSendFailureZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NonePaymentSendFailureZ arg_conv = *(LDKCResult_NonePaymentSendFailureZ*)arg;
	return CResult_NonePaymentSendFailureZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultNonePeerHandleErrorZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPeerHandleError arg_conv = *(LDKPeerHandleError*)arg;
	LDKCResult_NonePeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_NonePeerHandleErrorZ));
	*ret = CResult_NonePeerHandleErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultNonePeerHandleErrorZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_NonePeerHandleErrorZ arg_conv = *(LDKCResult_NonePeerHandleErrorZ*)arg;
	return CResult_NonePeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultRouteLightningErrorZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKLightningError arg_conv = *(LDKLightningError*)arg;
	LDKCResult_RouteLightningErrorZ* ret = malloc(sizeof(LDKCResult_RouteLightningErrorZ));
	*ret = CResult_RouteLightningErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultRouteLightningErrorZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_RouteLightningErrorZ arg_conv = *(LDKCResult_RouteLightningErrorZ*)arg;
	return CResult_RouteLightningErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultRouteLightningErrorZgood(JNIEnv * _env, jclass _b, jlong arg) {
	LDKRoute arg_conv = *(LDKRoute*)arg;
	LDKCResult_RouteLightningErrorZ* ret = malloc(sizeof(LDKCResult_RouteLightningErrorZ));
	*ret = CResult_RouteLightningErrorZ_good(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultSignatureNoneZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_SignatureNoneZ arg_conv = *(LDKCResult_SignatureNoneZ*)arg;
	return CResult_SignatureNoneZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultSignatureNoneZgood(JNIEnv * _env, jclass _b, jlong arg) {
	LDKSignature arg_conv = *(LDKSignature*)arg;
	LDKCResult_SignatureNoneZ* ret = malloc(sizeof(LDKCResult_SignatureNoneZ));
	*ret = CResult_SignatureNoneZ_good(arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultboolLightningErrorZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKLightningError arg_conv = *(LDKLightningError*)arg;
	LDKCResult_boolLightningErrorZ* ret = malloc(sizeof(LDKCResult_boolLightningErrorZ));
	*ret = CResult_boolLightningErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultboolLightningErrorZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_boolLightningErrorZ arg_conv = *(LDKCResult_boolLightningErrorZ*)arg;
	return CResult_boolLightningErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultboolLightningErrorZgood(JNIEnv * _env, jclass _b, jboolean arg) {
	LDKCResult_boolLightningErrorZ* ret = malloc(sizeof(LDKCResult_boolLightningErrorZ));
	*ret = CResult_boolLightningErrorZ_good(arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultboolPeerHandleErrorZerr(JNIEnv * _env, jclass _b, jlong arg) {
	LDKPeerHandleError arg_conv = *(LDKPeerHandleError*)arg;
	LDKCResult_boolPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_boolPeerHandleErrorZ));
	*ret = CResult_boolPeerHandleErrorZ_err(arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CResultboolPeerHandleErrorZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCResult_boolPeerHandleErrorZ arg_conv = *(LDKCResult_boolPeerHandleErrorZ*)arg;
	return CResult_boolPeerHandleErrorZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL CResultboolPeerHandleErrorZgood(JNIEnv * _env, jclass _b, jboolean arg) {
	LDKCResult_boolPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_boolPeerHandleErrorZ));
	*ret = CResult_boolPeerHandleErrorZ_good(arg);
	return (long)ret;
}

JNIEXPORT void JNICALL CVecC3TupleChannelAnnouncementChannelUpdateChannelUpdateZZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ arg_conv = *(LDKCVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ*)arg;
	return CVec_C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecCVecRouteHopZZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_CVec_RouteHopZZ arg_conv = *(LDKCVec_CVec_RouteHopZZ*)arg;
	return CVec_CVec_RouteHopZZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecChannelDetailsZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_ChannelDetailsZ arg_conv = *(LDKCVec_ChannelDetailsZ*)arg;
	return CVec_ChannelDetailsZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecEventZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_EventZ arg_conv = *(LDKCVec_EventZ*)arg;
	return CVec_EventZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecHTLCUpdateZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_HTLCUpdateZ arg_conv = *(LDKCVec_HTLCUpdateZ*)arg;
	return CVec_HTLCUpdateZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecMessageSendEventZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_MessageSendEventZ arg_conv = *(LDKCVec_MessageSendEventZ*)arg;
	return CVec_MessageSendEventZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecNetAddressZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_NetAddressZ arg_conv = *(LDKCVec_NetAddressZ*)arg;
	return CVec_NetAddressZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecNodeAnnouncementZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_NodeAnnouncementZ arg_conv = *(LDKCVec_NodeAnnouncementZ*)arg;
	return CVec_NodeAnnouncementZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecPublicKeyZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_PublicKeyZ arg_conv = *(LDKCVec_PublicKeyZ*)arg;
	return CVec_PublicKeyZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecRouteHopZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_RouteHopZ arg_conv = *(LDKCVec_RouteHopZ*)arg;
	return CVec_RouteHopZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecSignatureZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_SignatureZ arg_conv = *(LDKCVec_SignatureZ*)arg;
	return CVec_SignatureZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecSpendableOutputDescriptorZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_SpendableOutputDescriptorZ arg_conv = *(LDKCVec_SpendableOutputDescriptorZ*)arg;
	return CVec_SpendableOutputDescriptorZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecTransactionZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_TransactionZ arg_conv = *(LDKCVec_TransactionZ*)arg;
	return CVec_TransactionZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecUpdateAddHTLCZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateAddHTLCZ arg_conv = *(LDKCVec_UpdateAddHTLCZ*)arg;
	return CVec_UpdateAddHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecUpdateFailHTLCZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateFailHTLCZ arg_conv = *(LDKCVec_UpdateFailHTLCZ*)arg;
	return CVec_UpdateFailHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecUpdateFailMalformedHTLCZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateFailMalformedHTLCZ arg_conv = *(LDKCVec_UpdateFailMalformedHTLCZ*)arg;
	return CVec_UpdateFailMalformedHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecUpdateFulfillHTLCZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_UpdateFulfillHTLCZ arg_conv = *(LDKCVec_UpdateFulfillHTLCZ*)arg;
	return CVec_UpdateFulfillHTLCZ_free(arg_conv);
}

JNIEXPORT void JNICALL CVecu64Zfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_u64Z arg_conv = *(LDKCVec_u64Z*)arg;
	return CVec_u64Z_free(arg_conv);
}

JNIEXPORT void JNICALL CVecu8Zfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_u8Z arg_conv = *(LDKCVec_u8Z*)arg;
	return CVec_u8Z_free(arg_conv);
}

JNIEXPORT void JNICALL CVecusizeZfree(JNIEnv * _env, jclass _b, jlong arg) {
	LDKCVec_usizeZ arg_conv = *(LDKCVec_usizeZ*)arg;
	return CVec_usizeZ_free(arg_conv);
}

JNIEXPORT jlong JNICALL C2TupleTxidu32Znew(JNIEnv * _env, jclass _b, jlong a, jint b) {
	LDKThirtyTwoBytes a_conv = *(LDKThirtyTwoBytes*)a;
	LDKC2Tuple_Txidu32Z* ret = malloc(sizeof(LDKC2Tuple_Txidu32Z));
	*ret = C2Tuple_Txidu32Z_new(a_conv, b);
	return (long)ret;
}

JNIEXPORT jlong JNICALL C2TupleScriptu64Znew(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKCVec_u8Z a_conv = *(LDKCVec_u8Z*)a;
	LDKC2Tuple_Scriptu64Z* ret = malloc(sizeof(LDKC2Tuple_Scriptu64Z));
	*ret = C2Tuple_Scriptu64Z_new(a_conv, b);
	return (long)ret;
}

JNIEXPORT jlong JNICALL C2Tupleu64u64Znew(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKC2Tuple_u64u64Z* ret = malloc(sizeof(LDKC2Tuple_u64u64Z));
	*ret = C2Tuple_u64u64Z_new(a, b);
	return (long)ret;
}

JNIEXPORT jlong JNICALL C2TupleSignatureCVecSignatureZZnew(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKSignature a_conv = *(LDKSignature*)a;
	LDKCVec_SignatureZ b_conv = *(LDKCVec_SignatureZ*)b;
	LDKC2Tuple_SignatureCVec_SignatureZZ* ret = malloc(sizeof(LDKC2Tuple_SignatureCVec_SignatureZZ));
	*ret = C2Tuple_SignatureCVec_SignatureZZ_new(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultC2TupleSignatureCVecSignatureZZNoneZerr(JNIEnv * _env, jclass _b) {
	LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ* ret = malloc(sizeof(LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ));
	*ret = CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultSignatureNoneZerr(JNIEnv * _env, jclass _b) {
	LDKCResult_SignatureNoneZ* ret = malloc(sizeof(LDKCResult_SignatureNoneZ));
	*ret = CResult_SignatureNoneZ_err();
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultCVecSignatureZNoneZerr(JNIEnv * _env, jclass _b) {
	LDKCResult_CVec_SignatureZNoneZ* ret = malloc(sizeof(LDKCResult_CVec_SignatureZNoneZ));
	*ret = CResult_CVec_SignatureZNoneZ_err();
	return (long)ret;
}

JNIEXPORT jlong JNICALL C2TupleSecretKeyu832Znew(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKSecretKey a_conv = *(LDKSecretKey*)a;
	LDKThirtyTwoBytes b_conv = *(LDKThirtyTwoBytes*)b;
	LDKC2Tuple_SecretKey_u832Z* ret = malloc(sizeof(LDKC2Tuple_SecretKey_u832Z));
	*ret = C2Tuple_SecretKey_u832Z_new(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultNoneAPIErrorZgood(JNIEnv * _env, jclass _b) {
	LDKCResult_NoneAPIErrorZ* ret = malloc(sizeof(LDKCResult_NoneAPIErrorZ));
	*ret = CResult_NoneAPIErrorZ_good();
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultNonePaymentSendFailureZgood(JNIEnv * _env, jclass _b) {
	LDKCResult_NonePaymentSendFailureZ* ret = malloc(sizeof(LDKCResult_NonePaymentSendFailureZ));
	*ret = CResult_NonePaymentSendFailureZ_good();
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultNoneChannelMonitorUpdateErrZgood(JNIEnv * _env, jclass _b) {
	LDKCResult_NoneChannelMonitorUpdateErrZ* ret = malloc(sizeof(LDKCResult_NoneChannelMonitorUpdateErrZ));
	*ret = CResult_NoneChannelMonitorUpdateErrZ_good();
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultNoneMonitorUpdateErrorZgood(JNIEnv * _env, jclass _b) {
	LDKCResult_NoneMonitorUpdateErrorZ* ret = malloc(sizeof(LDKCResult_NoneMonitorUpdateErrorZ));
	*ret = CResult_NoneMonitorUpdateErrorZ_good();
	return (long)ret;
}

JNIEXPORT jlong JNICALL C2TupleOutPointScriptZnew(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKOutPoint a_conv = *(LDKOutPoint*)a;
	LDKCVec_u8Z b_conv = *(LDKCVec_u8Z*)b;
	LDKC2Tuple_OutPointScriptZ* ret = malloc(sizeof(LDKC2Tuple_OutPointScriptZ));
	*ret = C2Tuple_OutPointScriptZ_new(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL C3TupleChannelAnnouncementChannelUpdateChannelUpdateZnew(JNIEnv * _env, jclass _b, jlong a, jlong b, jlong c) {
	LDKChannelAnnouncement a_conv = *(LDKChannelAnnouncement*)a;
	LDKChannelUpdate b_conv = *(LDKChannelUpdate*)b;
	LDKChannelUpdate c_conv = *(LDKChannelUpdate*)c;
	LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ* ret = malloc(sizeof(LDKC3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ));
	*ret = C3Tuple_ChannelAnnouncementChannelUpdateChannelUpdateZ_new(a_conv, b_conv, c_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL CResultNonePeerHandleErrorZgood(JNIEnv * _env, jclass _b) {
	LDKCResult_NonePeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_NonePeerHandleErrorZ));
	*ret = CResult_NonePeerHandleErrorZ_good();
	return (long)ret;
}

JNIEXPORT void JNICALL Eventfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKEvent this_ptr_conv = *(LDKEvent*)this_ptr;
	return Event_free(this_ptr_conv);
}

JNIEXPORT void JNICALL MessageSendEventfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageSendEvent this_ptr_conv = *(LDKMessageSendEvent*)this_ptr;
	return MessageSendEvent_free(this_ptr_conv);
}

JNIEXPORT void JNICALL MessageSendEventsProviderfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageSendEventsProvider this_ptr_conv = *(LDKMessageSendEventsProvider*)this_ptr;
	return MessageSendEventsProvider_free(this_ptr_conv);
}

JNIEXPORT void JNICALL EventsProviderfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKEventsProvider this_ptr_conv = *(LDKEventsProvider*)this_ptr;
	return EventsProvider_free(this_ptr_conv);
}

JNIEXPORT void JNICALL APIErrorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAPIError this_ptr_conv = *(LDKAPIError*)this_ptr;
	return APIError_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL Levelmax(JNIEnv * _env, jclass _b) {
	LDKLevel* ret = malloc(sizeof(LDKLevel));
	*ret = Level_max();
	return (long)ret;
}

JNIEXPORT void JNICALL Loggerfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLogger this_ptr_conv = *(LDKLogger*)this_ptr;
	return Logger_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeConfigfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig this_ptr_conv = *(LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL ChannelHandshakeConfiggetminimumdepth(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_get_minimum_depth(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeConfigsetminimumdepth(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_set_minimum_depth(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelHandshakeConfiggetourtoselfdelay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	uint16_t* ret = malloc(sizeof(uint16_t));
	*ret = ChannelHandshakeConfig_get_our_to_self_delay(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelHandshakeConfigsetourtoselfdelay(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	uint16_t val_conv = *(uint16_t*)val;
	return ChannelHandshakeConfig_set_our_to_self_delay(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelHandshakeConfiggetourhtlcminimummsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_get_our_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeConfigsetourhtlcminimummsat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeConfig* this_ptr_conv = (LDKChannelHandshakeConfig*)this_ptr;
	return ChannelHandshakeConfig_set_our_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelHandshakeConfignew(JNIEnv * _env, jclass _b, jint minimum_depth_arg, jlong our_to_self_delay_arg, jlong our_htlc_minimum_msat_arg) {
	uint16_t our_to_self_delay_arg_conv = *(uint16_t*)our_to_self_delay_arg;
	LDKChannelHandshakeConfig* ret = malloc(sizeof(LDKChannelHandshakeConfig));
	*ret = ChannelHandshakeConfig_new(minimum_depth_arg, our_to_self_delay_arg_conv, our_htlc_minimum_msat_arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelHandshakeConfigdefault(JNIEnv * _env, jclass _b) {
	LDKChannelHandshakeConfig* ret = malloc(sizeof(LDKChannelHandshakeConfig));
	*ret = ChannelHandshakeConfig_default();
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelHandshakeLimitsfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits this_ptr_conv = *(LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsgetminfundingsatoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_min_funding_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssetminfundingsatoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_min_funding_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsgetmaxhtlcminimummsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_max_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssetmaxhtlcminimummsat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_max_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsgetminmaxhtlcvalueinflightmsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_min_max_htlc_value_in_flight_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssetminmaxhtlcvalueinflightmsat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_min_max_htlc_value_in_flight_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsgetmaxchannelreservesatoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_max_channel_reserve_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssetmaxchannelreservesatoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_max_channel_reserve_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsgetminmaxacceptedhtlcs(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	uint16_t* ret = malloc(sizeof(uint16_t));
	*ret = ChannelHandshakeLimits_get_min_max_accepted_htlcs(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssetminmaxacceptedhtlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	uint16_t val_conv = *(uint16_t*)val;
	return ChannelHandshakeLimits_set_min_max_accepted_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsgetmindustlimitsatoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_min_dust_limit_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssetmindustlimitsatoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_min_dust_limit_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsgetmaxdustlimitsatoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_max_dust_limit_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssetmaxdustlimitsatoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_max_dust_limit_satoshis(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL ChannelHandshakeLimitsgetmaxminimumdepth(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_max_minimum_depth(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssetmaxminimumdepth(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_max_minimum_depth(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL ChannelHandshakeLimitsgetforceannouncedchannelpreference(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_get_force_announced_channel_preference(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssetforceannouncedchannelpreference(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean va) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	return ChannelHandshakeLimits_set_force_announced_channel_preference(this_ptr_conv, va);
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsgettheirtoselfdelay(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	uint16_t* ret = malloc(sizeof(uint16_t));
	*ret = ChannelHandshakeLimits_get_their_to_self_delay(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelHandshakeLimitssettheirtoselfdelay(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelHandshakeLimits* this_ptr_conv = (LDKChannelHandshakeLimits*)this_ptr;
	uint16_t val_conv = *(uint16_t*)val;
	return ChannelHandshakeLimits_set_their_to_self_delay(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsnew(JNIEnv * _env, jclass _b, jlong min_funding_satoshis_arg, jlong max_htlc_minimum_msat_arg, jlong min_max_htlc_value_in_flight_msat_arg, jlong max_channel_reserve_satoshis_arg, jlong min_max_accepted_htlcs_arg, jlong min_dust_limit_satoshis_arg, jlong max_dust_limit_satoshis_arg, jint max_minimum_depth_arg, jboolean force_announced_channel_preference_arg, jlong their_to_self_delay_arg) {
	uint16_t min_max_accepted_htlcs_arg_conv = *(uint16_t*)min_max_accepted_htlcs_arg;
	uint16_t their_to_self_delay_arg_conv = *(uint16_t*)their_to_self_delay_arg;
	LDKChannelHandshakeLimits* ret = malloc(sizeof(LDKChannelHandshakeLimits));
	*ret = ChannelHandshakeLimits_new(min_funding_satoshis_arg, max_htlc_minimum_msat_arg, min_max_htlc_value_in_flight_msat_arg, max_channel_reserve_satoshis_arg, min_max_accepted_htlcs_arg_conv, min_dust_limit_satoshis_arg, max_dust_limit_satoshis_arg, max_minimum_depth_arg, force_announced_channel_preference_arg, their_to_self_delay_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelHandshakeLimitsdefault(JNIEnv * _env, jclass _b) {
	LDKChannelHandshakeLimits* ret = malloc(sizeof(LDKChannelHandshakeLimits));
	*ret = ChannelHandshakeLimits_default();
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelConfigfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig this_ptr_conv = *(LDKChannelConfig*)this_ptr;
	return ChannelConfig_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL ChannelConfiggetfeeproportionalmillionths(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_get_fee_proportional_millionths(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelConfigsetfeeproportionalmillionths(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_set_fee_proportional_millionths(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL ChannelConfiggetannouncedchannel(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_get_announced_channel(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelConfigsetannouncedchannel(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean va) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_set_announced_channel(this_ptr_conv, va);
}

JNIEXPORT jboolean JNICALL ChannelConfiggetcommitupfrontshutdownpubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_get_commit_upfront_shutdown_pubkey(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelConfigsetcommitupfrontshutdownpubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean va) {
	LDKChannelConfig* this_ptr_conv = (LDKChannelConfig*)this_ptr;
	return ChannelConfig_set_commit_upfront_shutdown_pubkey(this_ptr_conv, va);
}

JNIEXPORT jlong JNICALL ChannelConfignew(JNIEnv * _env, jclass _b, jint fee_proportional_millionths_arg, jboolean announced_channel_arg, jboolean commit_upfront_shutdown_pubkey_arg) {
	LDKChannelConfig* ret = malloc(sizeof(LDKChannelConfig));
	*ret = ChannelConfig_new(fee_proportional_millionths_arg, announced_channel_arg, commit_upfront_shutdown_pubkey_arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelConfigdefault(JNIEnv * _env, jclass _b) {
	LDKChannelConfig* ret = malloc(sizeof(LDKChannelConfig));
	*ret = ChannelConfig_default();
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelConfigwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelConfig* obj_conv = (LDKChannelConfig*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelConfig_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelConfigread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelConfig* ret = malloc(sizeof(LDKChannelConfig));
	*ret = ChannelConfig_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL UserConfigfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig this_ptr_conv = *(LDKUserConfig*)this_ptr;
	return UserConfig_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL UserConfiggetownchannelconfig(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeConfig* ret = malloc(sizeof(LDKChannelHandshakeConfig));
	*ret = UserConfig_get_own_channel_config(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL UserConfigsetownchannelconfig(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeConfig val_conv = *(LDKChannelHandshakeConfig*)val;
	return UserConfig_set_own_channel_config(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL UserConfiggetpeerchannelconfiglimits(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeLimits* ret = malloc(sizeof(LDKChannelHandshakeLimits));
	*ret = UserConfig_get_peer_channel_config_limits(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL UserConfigsetpeerchannelconfiglimits(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelHandshakeLimits val_conv = *(LDKChannelHandshakeLimits*)val;
	return UserConfig_set_peer_channel_config_limits(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL UserConfiggetchanneloptions(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelConfig* ret = malloc(sizeof(LDKChannelConfig));
	*ret = UserConfig_get_channel_options(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL UserConfigsetchanneloptions(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUserConfig* this_ptr_conv = (LDKUserConfig*)this_ptr;
	LDKChannelConfig val_conv = *(LDKChannelConfig*)val;
	return UserConfig_set_channel_options(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL UserConfignew(JNIEnv * _env, jclass _b, jlong own_channel_config_arg, jlong peer_channel_config_limits_arg, jlong channel_options_arg) {
	LDKChannelHandshakeConfig own_channel_config_arg_conv = *(LDKChannelHandshakeConfig*)own_channel_config_arg;
	LDKChannelHandshakeLimits peer_channel_config_limits_arg_conv = *(LDKChannelHandshakeLimits*)peer_channel_config_limits_arg;
	LDKChannelConfig channel_options_arg_conv = *(LDKChannelConfig*)channel_options_arg;
	LDKUserConfig* ret = malloc(sizeof(LDKUserConfig));
	*ret = UserConfig_new(own_channel_config_arg_conv, peer_channel_config_limits_arg_conv, channel_options_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UserConfigdefault(JNIEnv * _env, jclass _b) {
	LDKUserConfig* ret = malloc(sizeof(LDKUserConfig));
	*ret = UserConfig_default();
	return (long)ret;
}

JNIEXPORT void JNICALL ChainWatchInterfacefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainWatchInterface this_ptr_conv = *(LDKChainWatchInterface*)this_ptr;
	return ChainWatchInterface_free(this_ptr_conv);
}

JNIEXPORT void JNICALL BroadcasterInterfacefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKBroadcasterInterface this_ptr_conv = *(LDKBroadcasterInterface*)this_ptr;
	return BroadcasterInterface_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ChainListenerfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainListener this_ptr_conv = *(LDKChainListener*)this_ptr;
	return ChainListener_free(this_ptr_conv);
}

JNIEXPORT void JNICALL FeeEstimatorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFeeEstimator this_ptr_conv = *(LDKFeeEstimator*)this_ptr;
	return FeeEstimator_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ChainWatchedUtilfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainWatchedUtil this_ptr_conv = *(LDKChainWatchedUtil*)this_ptr;
	return ChainWatchedUtil_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL ChainWatchedUtilnew(JNIEnv * _env, jclass _b) {
	LDKChainWatchedUtil* ret = malloc(sizeof(LDKChainWatchedUtil));
	*ret = ChainWatchedUtil_new();
	return (long)ret;
}

JNIEXPORT jboolean JNICALL ChainWatchedUtilregistertx(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray txid, jlong script_pub_key) {
	LDKChainWatchedUtil* this_arg_conv = (LDKChainWatchedUtil*)this_arg;
	unsigned char txid_arr[32];
	(*_env)->GetByteArrayRegion (_env, txid, 0, 32, txid_arr);
	unsigned char (*txid_ref)[32] = &txid_arr;
	LDKu8slice script_pub_key_conv = *(LDKu8slice*)script_pub_key;
	return ChainWatchedUtil_register_tx(this_arg_conv, txid_ref, script_pub_key_conv);
}

JNIEXPORT jboolean JNICALL ChainWatchedUtilregisteroutpoint(JNIEnv * _env, jclass _b, jlong this_arg, jlong outpoint, jlong _script_pub_key) {
	LDKChainWatchedUtil* this_arg_conv = (LDKChainWatchedUtil*)this_arg;
	LDKC2Tuple_Txidu32Z outpoint_conv = *(LDKC2Tuple_Txidu32Z*)outpoint;
	LDKu8slice _script_pub_key_conv = *(LDKu8slice*)_script_pub_key;
	return ChainWatchedUtil_register_outpoint(this_arg_conv, outpoint_conv, _script_pub_key_conv);
}

JNIEXPORT jboolean JNICALL ChainWatchedUtilwatchall(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChainWatchedUtil* this_arg_conv = (LDKChainWatchedUtil*)this_arg;
	return ChainWatchedUtil_watch_all(this_arg_conv);
}

JNIEXPORT jboolean JNICALL ChainWatchedUtildoesmatchtx(JNIEnv * _env, jclass _b, jlong this_arg, jlong tx) {
	LDKChainWatchedUtil* this_arg_conv = (LDKChainWatchedUtil*)this_arg;
	LDKTransaction tx_conv = *(LDKTransaction*)tx;
	return ChainWatchedUtil_does_match_tx(this_arg_conv, tx_conv);
}

JNIEXPORT void JNICALL BlockNotifierfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKBlockNotifier this_ptr_conv = *(LDKBlockNotifier*)this_ptr;
	return BlockNotifier_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL BlockNotifiernew(JNIEnv * _env, jclass _b, jlong chain_monitor) {
	LDKChainWatchInterface chain_monitor_conv = *(LDKChainWatchInterface*)chain_monitor;
	LDKBlockNotifier* ret = malloc(sizeof(LDKBlockNotifier));
	*ret = BlockNotifier_new(chain_monitor_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL BlockNotifierregisterlistener(JNIEnv * _env, jclass _b, jlong this_arg, jlong listener) {
	LDKBlockNotifier* this_arg_conv = (LDKBlockNotifier*)this_arg;
	LDKChainListener listener_conv = *(LDKChainListener*)listener;
	return BlockNotifier_register_listener(this_arg_conv, listener_conv);
}

JNIEXPORT void JNICALL BlockNotifierblockconnected(JNIEnv * _env, jclass _b, jlong this_arg, jlong block, jint heigh) {
	LDKBlockNotifier* this_arg_conv = (LDKBlockNotifier*)this_arg;
	LDKu8slice block_conv = *(LDKu8slice*)block;
	return BlockNotifier_block_connected(this_arg_conv, block_conv, heigh);
}

JNIEXPORT jboolean JNICALL BlockNotifierblockconnectedchecked(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jint heigh, jlong txn_matched, jlong indexes_of_txn_matched) {
	LDKBlockNotifier* this_arg_conv = (LDKBlockNotifier*)this_arg;
	unsigned char header_arr[80];
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	LDKCTransactionSlice txn_matched_conv = *(LDKCTransactionSlice*)txn_matched;
	LDKusizeslice indexes_of_txn_matched_conv = *(LDKusizeslice*)indexes_of_txn_matched;
	return BlockNotifier_block_connected_checked(this_arg_conv, header_ref, heigh, txn_matched_conv, indexes_of_txn_matched_conv);
}

JNIEXPORT void JNICALL BlockNotifierblockdisconnected(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray header, jint disconnected_heigh) {
	LDKBlockNotifier* this_arg_conv = (LDKBlockNotifier*)this_arg;
	unsigned char header_arr[80];
	(*_env)->GetByteArrayRegion (_env, header, 0, 80, header_arr);
	unsigned char (*header_ref)[80] = &header_arr;
	return BlockNotifier_block_disconnected(this_arg_conv, header_ref, disconnected_heigh);
}

JNIEXPORT void JNICALL ChainWatchInterfaceUtilfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChainWatchInterfaceUtil this_ptr_conv = *(LDKChainWatchInterfaceUtil*)this_ptr;
	return ChainWatchInterfaceUtil_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL ChainWatchInterfaceUtilasChainWatchInterface(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChainWatchInterfaceUtil* this_arg_conv = (LDKChainWatchInterfaceUtil*)this_arg;
	LDKChainWatchInterface* ret = malloc(sizeof(LDKChainWatchInterface));
	*ret = ChainWatchInterfaceUtil_as_ChainWatchInterface(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChainWatchInterfaceUtilnew(JNIEnv * _env, jclass _b, jlong network) {
	LDKNetwork network_conv = *(LDKNetwork*)network;
	LDKChainWatchInterfaceUtil* ret = malloc(sizeof(LDKChainWatchInterfaceUtil));
	*ret = ChainWatchInterfaceUtil_new(network_conv);
	return (long)ret;
}

JNIEXPORT jboolean JNICALL ChainWatchInterfaceUtildoesmatchtx(JNIEnv * _env, jclass _b, jlong this_arg, jlong tx) {
	LDKChainWatchInterfaceUtil* this_arg_conv = (LDKChainWatchInterfaceUtil*)this_arg;
	LDKTransaction tx_conv = *(LDKTransaction*)tx;
	return ChainWatchInterfaceUtil_does_match_tx(this_arg_conv, tx_conv);
}

JNIEXPORT void JNICALL OutPointfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint this_ptr_conv = *(LDKOutPoint*)this_ptr;
	return OutPoint_free(this_ptr_conv);
}

JNIEXPORT jbyteArray  JNICALL OutPointgettxid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *OutPoint_get_txid(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL OutPointsettxid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	return OutPoint_set_txid(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL OutPointgetindex(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	uint16_t* ret = malloc(sizeof(uint16_t));
	*ret = OutPoint_get_index(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL OutPointsetindex(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKOutPoint* this_ptr_conv = (LDKOutPoint*)this_ptr;
	uint16_t val_conv = *(uint16_t*)val;
	return OutPoint_set_index(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL OutPointnew(JNIEnv * _env, jclass _b, jlong txid_arg, jlong index_arg) {
	LDKThirtyTwoBytes txid_arg_conv = *(LDKThirtyTwoBytes*)txid_arg;
	uint16_t index_arg_conv = *(uint16_t*)index_arg;
	LDKOutPoint* ret = malloc(sizeof(LDKOutPoint));
	*ret = OutPoint_new(txid_arg_conv, index_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL OutPointtochannelid(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKOutPoint* this_arg_conv = (LDKOutPoint*)this_arg;
	LDKThirtyTwoBytes* ret = malloc(sizeof(LDKThirtyTwoBytes));
	*ret = OutPoint_to_channel_id(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL OutPointwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKOutPoint* obj_conv = (LDKOutPoint*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = OutPoint_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL OutPointread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKOutPoint* ret = malloc(sizeof(LDKOutPoint));
	*ret = OutPoint_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL SpendableOutputDescriptorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKSpendableOutputDescriptor this_ptr_conv = *(LDKSpendableOutputDescriptor*)this_ptr;
	return SpendableOutputDescriptor_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL SpendableOutputDescriptorwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKSpendableOutputDescriptor* obj_conv = (LDKSpendableOutputDescriptor*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = SpendableOutputDescriptor_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL SpendableOutputDescriptorread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKSpendableOutputDescriptor* ret = malloc(sizeof(LDKSpendableOutputDescriptor));
	*ret = SpendableOutputDescriptor_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelKeysfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelKeys this_ptr_conv = *(LDKChannelKeys*)this_ptr;
	return ChannelKeys_free(this_ptr_conv);
}

JNIEXPORT void JNICALL KeysInterfacefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKKeysInterface this_ptr_conv = *(LDKKeysInterface*)this_ptr;
	return KeysInterface_free(this_ptr_conv);
}

JNIEXPORT void JNICALL InMemoryChannelKeysfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys this_ptr_conv = *(LDKInMemoryChannelKeys*)this_ptr;
	return InMemoryChannelKeys_free(this_ptr_conv);
}

JNIEXPORT jbyteArray  JNICALL InMemoryChannelKeysgetfundingkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_funding_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL InMemoryChannelKeyssetfundingkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	return InMemoryChannelKeys_set_funding_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray  JNICALL InMemoryChannelKeysgetrevocationbasekey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_revocation_base_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL InMemoryChannelKeyssetrevocationbasekey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	return InMemoryChannelKeys_set_revocation_base_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray  JNICALL InMemoryChannelKeysgetpaymentkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_payment_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL InMemoryChannelKeyssetpaymentkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	return InMemoryChannelKeys_set_payment_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray  JNICALL InMemoryChannelKeysgetdelayedpaymentbasekey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_delayed_payment_base_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL InMemoryChannelKeyssetdelayedpaymentbasekey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	return InMemoryChannelKeys_set_delayed_payment_base_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray  JNICALL InMemoryChannelKeysgethtlcbasekey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_htlc_base_key(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL InMemoryChannelKeyssethtlcbasekey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKSecretKey val_conv = *(LDKSecretKey*)val;
	return InMemoryChannelKeys_set_htlc_base_key(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray  JNICALL InMemoryChannelKeysgetcommitmentseed(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *InMemoryChannelKeys_get_commitment_seed(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL InMemoryChannelKeyssetcommitmentseed(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKInMemoryChannelKeys* this_ptr_conv = (LDKInMemoryChannelKeys*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	return InMemoryChannelKeys_set_commitment_seed(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL InMemoryChannelKeysnew(JNIEnv * _env, jclass _b, jlong funding_key, jlong revocation_base_key, jlong payment_key, jlong delayed_payment_base_key, jlong htlc_base_key, jlong commitment_seed, jlong channel_value_satoshis, jlong key_derivation_params) {
	LDKSecretKey funding_key_conv = *(LDKSecretKey*)funding_key;
	LDKSecretKey revocation_base_key_conv = *(LDKSecretKey*)revocation_base_key;
	LDKSecretKey payment_key_conv = *(LDKSecretKey*)payment_key;
	LDKSecretKey delayed_payment_base_key_conv = *(LDKSecretKey*)delayed_payment_base_key;
	LDKSecretKey htlc_base_key_conv = *(LDKSecretKey*)htlc_base_key;
	LDKThirtyTwoBytes commitment_seed_conv = *(LDKThirtyTwoBytes*)commitment_seed;
	LDKC2Tuple_u64u64Z key_derivation_params_conv = *(LDKC2Tuple_u64u64Z*)key_derivation_params;
	LDKInMemoryChannelKeys* ret = malloc(sizeof(LDKInMemoryChannelKeys));
	*ret = InMemoryChannelKeys_new(funding_key_conv, revocation_base_key_conv, payment_key_conv, delayed_payment_base_key_conv, htlc_base_key_conv, commitment_seed_conv, channel_value_satoshis, key_derivation_params_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL InMemoryChannelKeysasChannelKeys(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKInMemoryChannelKeys* this_arg_conv = (LDKInMemoryChannelKeys*)this_arg;
	LDKChannelKeys* ret = malloc(sizeof(LDKChannelKeys));
	*ret = InMemoryChannelKeys_as_ChannelKeys(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL InMemoryChannelKeyswrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKInMemoryChannelKeys* obj_conv = (LDKInMemoryChannelKeys*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = InMemoryChannelKeys_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL InMemoryChannelKeysread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKInMemoryChannelKeys* ret = malloc(sizeof(LDKInMemoryChannelKeys));
	*ret = InMemoryChannelKeys_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL KeysManagerfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKKeysManager this_ptr_conv = *(LDKKeysManager*)this_ptr;
	return KeysManager_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL KeysManagernew(JNIEnv * _env, jclass _b, jbyteArray seed, jlong network, jlong starting_time_secs, jint starting_time_nanos) {
	unsigned char seed_arr[32];
	(*_env)->GetByteArrayRegion (_env, seed, 0, 32, seed_arr);
	unsigned char (*seed_ref)[32] = &seed_arr;
	LDKNetwork network_conv = *(LDKNetwork*)network;
	LDKKeysManager* ret = malloc(sizeof(LDKKeysManager));
	*ret = KeysManager_new(seed_ref, network_conv, starting_time_secs, starting_time_nanos);
	return (long)ret;
}

JNIEXPORT jlong JNICALL KeysManagerderivechannelkeys(JNIEnv * _env, jclass _b, jlong this_arg, jlong channel_value_satoshis, jlong params_1, jlong params_2) {
	LDKKeysManager* this_arg_conv = (LDKKeysManager*)this_arg;
	LDKInMemoryChannelKeys* ret = malloc(sizeof(LDKInMemoryChannelKeys));
	*ret = KeysManager_derive_channel_keys(this_arg_conv, channel_value_satoshis, params_1, params_2);
	return (long)ret;
}

JNIEXPORT jlong JNICALL KeysManagerasKeysInterface(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKKeysManager* this_arg_conv = (LDKKeysManager*)this_arg;
	LDKKeysInterface* ret = malloc(sizeof(LDKKeysInterface));
	*ret = KeysManager_as_KeysInterface(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelManagerfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelManager this_ptr_conv = *(LDKChannelManager*)this_ptr;
	return ChannelManager_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelDetailsfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails this_ptr_conv = *(LDKChannelDetails*)this_ptr;
	return ChannelDetails_free(this_ptr_conv);
}

JNIEXPORT jbyteArray  JNICALL ChannelDetailsgetchannelid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *ChannelDetails_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL ChannelDetailssetchannelid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	return ChannelDetails_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelDetailsgetremotenetworkid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelDetails_get_remote_network_id(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelDetailssetremotenetworkid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return ChannelDetails_set_remote_network_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelDetailsgetcounterpartyfeatures(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKInitFeatures* ret = malloc(sizeof(LDKInitFeatures));
	*ret = ChannelDetails_get_counterparty_features(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelDetailssetcounterpartyfeatures(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	LDKInitFeatures val_conv = *(LDKInitFeatures*)val;
	return ChannelDetails_set_counterparty_features(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelDetailsgetchannelvaluesatoshis(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_channel_value_satoshis(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelDetailssetchannelvaluesatoshis(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_channel_value_satoshis(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelDetailsgetuserid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_user_id(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelDetailssetuserid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_user_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelDetailsgetoutboundcapacitymsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_outbound_capacity_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelDetailssetoutboundcapacitymsat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_outbound_capacity_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelDetailsgetinboundcapacitymsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_inbound_capacity_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelDetailssetinboundcapacitymsat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_inbound_capacity_msat(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL ChannelDetailsgetislive(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_get_is_live(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelDetailssetislive(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean va) {
	LDKChannelDetails* this_ptr_conv = (LDKChannelDetails*)this_ptr;
	return ChannelDetails_set_is_live(this_ptr_conv, va);
}

JNIEXPORT void JNICALL PaymentSendFailurefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPaymentSendFailure this_ptr_conv = *(LDKPaymentSendFailure*)this_ptr;
	return PaymentSendFailure_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL ChannelManagernew(JNIEnv * _env, jclass _b, jlong network, jlong fee_est, jlong monitor, jlong tx_broadcaster, jlong logger, jlong keys_manager, jlong config, jlong current_blockchain_height) {
	LDKNetwork network_conv = *(LDKNetwork*)network;
	LDKFeeEstimator fee_est_conv = *(LDKFeeEstimator*)fee_est;
	LDKManyChannelMonitor monitor_conv = *(LDKManyChannelMonitor*)monitor;
	LDKBroadcasterInterface tx_broadcaster_conv = *(LDKBroadcasterInterface*)tx_broadcaster;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKKeysInterface keys_manager_conv = *(LDKKeysInterface*)keys_manager;
	LDKUserConfig config_conv = *(LDKUserConfig*)config;
	uintptr_t current_blockchain_height_conv = *(uintptr_t*)current_blockchain_height;
	LDKChannelManager* ret = malloc(sizeof(LDKChannelManager));
	*ret = ChannelManager_new(network_conv, fee_est_conv, monitor_conv, tx_broadcaster_conv, logger_conv, keys_manager_conv, config_conv, current_blockchain_height_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelManagercreatechannel(JNIEnv * _env, jclass _b, jlong this_arg, jlong their_network_key, jlong channel_value_satoshis, jlong push_msa, jlong ser_id, jlong override_config) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKPublicKey their_network_key_conv = *(LDKPublicKey*)their_network_key;
	LDKUserConfig override_config_conv = *(LDKUserConfig*)override_config;
	LDKCResult_NoneAPIErrorZ* ret = malloc(sizeof(LDKCResult_NoneAPIErrorZ));
	*ret = ChannelManager_create_channel(this_arg_conv, their_network_key_conv, channel_value_satoshis, push_msa, ser_id, override_config_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelManagerlistchannels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKCVec_ChannelDetailsZ* ret = malloc(sizeof(LDKCVec_ChannelDetailsZ));
	*ret = ChannelManager_list_channels(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelManagerlistusablechannels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKCVec_ChannelDetailsZ* ret = malloc(sizeof(LDKCVec_ChannelDetailsZ));
	*ret = ChannelManager_list_usable_channels(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelManagerclosechannel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray channel_id) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char channel_id_arr[32];
	(*_env)->GetByteArrayRegion (_env, channel_id, 0, 32, channel_id_arr);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	LDKCResult_NoneAPIErrorZ* ret = malloc(sizeof(LDKCResult_NoneAPIErrorZ));
	*ret = ChannelManager_close_channel(this_arg_conv, channel_id_ref);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelManagerforceclosechannel(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray channel_id) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char channel_id_arr[32];
	(*_env)->GetByteArrayRegion (_env, channel_id, 0, 32, channel_id_arr);
	unsigned char (*channel_id_ref)[32] = &channel_id_arr;
	return ChannelManager_force_close_channel(this_arg_conv, channel_id_ref);
}

JNIEXPORT void JNICALL ChannelManagerforcecloseallchannels(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	return ChannelManager_force_close_all_channels(this_arg_conv);
}

JNIEXPORT jlong JNICALL ChannelManagersendpayment(JNIEnv * _env, jclass _b, jlong this_arg, jlong route, jlong payment_hash, jlong payment_secret) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKRoute* route_conv = (LDKRoute*)route;
	LDKThirtyTwoBytes payment_hash_conv = *(LDKThirtyTwoBytes*)payment_hash;
	LDKThirtyTwoBytes payment_secret_conv = *(LDKThirtyTwoBytes*)payment_secret;
	LDKCResult_NonePaymentSendFailureZ* ret = malloc(sizeof(LDKCResult_NonePaymentSendFailureZ));
	*ret = ChannelManager_send_payment(this_arg_conv, route_conv, payment_hash_conv, payment_secret_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelManagerfundingtransactiongenerated(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray temporary_channel_id, jlong funding_txo) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char temporary_channel_id_arr[32];
	(*_env)->GetByteArrayRegion (_env, temporary_channel_id, 0, 32, temporary_channel_id_arr);
	unsigned char (*temporary_channel_id_ref)[32] = &temporary_channel_id_arr;
	LDKOutPoint funding_txo_conv = *(LDKOutPoint*)funding_txo;
	return ChannelManager_funding_transaction_generated(this_arg_conv, temporary_channel_id_ref, funding_txo_conv);
}

JNIEXPORT void JNICALL ChannelManagerbroadcastnodeannouncement(JNIEnv * _env, jclass _b, jlong this_arg, jlong rgb, jlong alias, jlong addresses) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKThreeBytes rgb_conv = *(LDKThreeBytes*)rgb;
	LDKThirtyTwoBytes alias_conv = *(LDKThirtyTwoBytes*)alias;
	LDKCVec_NetAddressZ addresses_conv = *(LDKCVec_NetAddressZ*)addresses;
	return ChannelManager_broadcast_node_announcement(this_arg_conv, rgb_conv, alias_conv, addresses_conv);
}

JNIEXPORT void JNICALL ChannelManagerprocesspendinghtlcforwards(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	return ChannelManager_process_pending_htlc_forwards(this_arg_conv);
}

JNIEXPORT void JNICALL ChannelManagertimerchanfreshnesseverymin(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	return ChannelManager_timer_chan_freshness_every_min(this_arg_conv);
}

JNIEXPORT jboolean JNICALL ChannelManagerfailhtlcbackwards(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray payment_hash, jlong payment_secret) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	unsigned char payment_hash_arr[32];
	(*_env)->GetByteArrayRegion (_env, payment_hash, 0, 32, payment_hash_arr);
	unsigned char (*payment_hash_ref)[32] = &payment_hash_arr;
	LDKThirtyTwoBytes payment_secret_conv = *(LDKThirtyTwoBytes*)payment_secret;
	return ChannelManager_fail_htlc_backwards(this_arg_conv, payment_hash_ref, payment_secret_conv);
}

JNIEXPORT jboolean JNICALL ChannelManagerclaimfunds(JNIEnv * _env, jclass _b, jlong this_arg, jlong payment_preimage, jlong payment_secret, jlong expected_amo) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKThirtyTwoBytes payment_preimage_conv = *(LDKThirtyTwoBytes*)payment_preimage;
	LDKThirtyTwoBytes payment_secret_conv = *(LDKThirtyTwoBytes*)payment_secret;
	return ChannelManager_claim_funds(this_arg_conv, payment_preimage_conv, payment_secret_conv, expected_amo);
}

JNIEXPORT jlong JNICALL ChannelManagergetournodeid(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelManager_get_our_node_id(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelManagerchannelmonitorupdated(JNIEnv * _env, jclass _b, jlong this_arg, jlong funding_txo, jlong highest_applied_update_id) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKOutPoint* funding_txo_conv = (LDKOutPoint*)funding_txo;
	return ChannelManager_channel_monitor_updated(this_arg_conv, funding_txo_conv, highest_applied_update_id);
}

JNIEXPORT jlong JNICALL ChannelManagerasMessageSendEventsProvider(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKMessageSendEventsProvider* ret = malloc(sizeof(LDKMessageSendEventsProvider));
	*ret = ChannelManager_as_MessageSendEventsProvider(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelManagerasEventsProvider(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKEventsProvider* ret = malloc(sizeof(LDKEventsProvider));
	*ret = ChannelManager_as_EventsProvider(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelManagerasChainListener(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKChainListener* ret = malloc(sizeof(LDKChainListener));
	*ret = ChannelManager_as_ChainListener(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelManagerasChannelMessageHandler(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelManager* this_arg_conv = (LDKChannelManager*)this_arg;
	LDKChannelMessageHandler* ret = malloc(sizeof(LDKChannelMessageHandler));
	*ret = ChannelManager_as_ChannelMessageHandler(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelMonitorUpdatefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitorUpdate this_ptr_conv = *(LDKChannelMonitorUpdate*)this_ptr;
	return ChannelMonitorUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL ChannelMonitorUpdategetupdateid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitorUpdate* this_ptr_conv = (LDKChannelMonitorUpdate*)this_ptr;
	return ChannelMonitorUpdate_get_update_id(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelMonitorUpdatesetupdateid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelMonitorUpdate* this_ptr_conv = (LDKChannelMonitorUpdate*)this_ptr;
	return ChannelMonitorUpdate_set_update_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL ChannelMonitorUpdatewrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelMonitorUpdate* obj_conv = (LDKChannelMonitorUpdate*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelMonitorUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelMonitorUpdateread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelMonitorUpdate* ret = malloc(sizeof(LDKChannelMonitorUpdate));
	*ret = ChannelMonitorUpdate_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL MonitorUpdateErrorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMonitorUpdateError this_ptr_conv = *(LDKMonitorUpdateError*)this_ptr;
	return MonitorUpdateError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL HTLCUpdatefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCUpdate this_ptr_conv = *(LDKHTLCUpdate*)this_ptr;
	return HTLCUpdate_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL HTLCUpdatewrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHTLCUpdate* obj_conv = (LDKHTLCUpdate*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = HTLCUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL HTLCUpdateread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKHTLCUpdate* ret = malloc(sizeof(LDKHTLCUpdate));
	*ret = HTLCUpdate_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelMonitorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMonitor this_ptr_conv = *(LDKChannelMonitor*)this_ptr;
	return ChannelMonitor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ManyChannelMonitorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKManyChannelMonitor this_ptr_conv = *(LDKManyChannelMonitor*)this_ptr;
	return ManyChannelMonitor_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL ChannelMonitorupdatemonitor(JNIEnv * _env, jclass _b, jlong this_arg, jlong updates, jlong broadcaster, jlong logger) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKChannelMonitorUpdate updates_conv = *(LDKChannelMonitorUpdate*)updates;
	LDKBroadcasterInterface* broadcaster_conv = (LDKBroadcasterInterface*)broadcaster;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCResult_NoneMonitorUpdateErrorZ* ret = malloc(sizeof(LDKCResult_NoneMonitorUpdateErrorZ));
	*ret = ChannelMonitor_update_monitor(this_arg_conv, updates_conv, broadcaster_conv, logger_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelMonitorgetlatestupdateid(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	return ChannelMonitor_get_latest_update_id(this_arg_conv);
}

JNIEXPORT jlong JNICALL ChannelMonitorgetfundingtxo(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKC2Tuple_OutPointScriptZ* ret = malloc(sizeof(LDKC2Tuple_OutPointScriptZ));
	*ret = ChannelMonitor_get_funding_txo(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelMonitorgetandclearpendinghtlcsupdated(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKCVec_HTLCUpdateZ* ret = malloc(sizeof(LDKCVec_HTLCUpdateZ));
	*ret = ChannelMonitor_get_and_clear_pending_htlcs_updated(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelMonitorgetandclearpendingevents(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKCVec_EventZ* ret = malloc(sizeof(LDKCVec_EventZ));
	*ret = ChannelMonitor_get_and_clear_pending_events(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelMonitorgetlatestlocalcommitmenttxn(JNIEnv * _env, jclass _b, jlong this_arg, jlong logger) {
	LDKChannelMonitor* this_arg_conv = (LDKChannelMonitor*)this_arg;
	LDKLogger* logger_conv = (LDKLogger*)logger;
	LDKCVec_TransactionZ* ret = malloc(sizeof(LDKCVec_TransactionZ));
	*ret = ChannelMonitor_get_latest_local_commitment_txn(this_arg_conv, logger_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL DecodeErrorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDecodeError this_ptr_conv = *(LDKDecodeError*)this_ptr;
	return DecodeError_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Initfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInit this_ptr_conv = *(LDKInit*)this_ptr;
	return Init_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ErrorMessagefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorMessage this_ptr_conv = *(LDKErrorMessage*)this_ptr;
	return ErrorMessage_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Pingfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPing this_ptr_conv = *(LDKPing*)this_ptr;
	return Ping_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Pongfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPong this_ptr_conv = *(LDKPong*)this_ptr;
	return Pong_free(this_ptr_conv);
}

JNIEXPORT void JNICALL OpenChannelfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKOpenChannel this_ptr_conv = *(LDKOpenChannel*)this_ptr;
	return OpenChannel_free(this_ptr_conv);
}

JNIEXPORT void JNICALL AcceptChannelfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAcceptChannel this_ptr_conv = *(LDKAcceptChannel*)this_ptr;
	return AcceptChannel_free(this_ptr_conv);
}

JNIEXPORT void JNICALL FundingCreatedfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingCreated this_ptr_conv = *(LDKFundingCreated*)this_ptr;
	return FundingCreated_free(this_ptr_conv);
}

JNIEXPORT void JNICALL FundingSignedfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingSigned this_ptr_conv = *(LDKFundingSigned*)this_ptr;
	return FundingSigned_free(this_ptr_conv);
}

JNIEXPORT void JNICALL FundingLockedfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked this_ptr_conv = *(LDKFundingLocked*)this_ptr;
	return FundingLocked_free(this_ptr_conv);
}

JNIEXPORT jbyteArray  JNICALL FundingLockedgetchannelid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *FundingLocked_get_channel_id(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL FundingLockedsetchannelid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	return FundingLocked_set_channel_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL FundingLockedgetnextpercommitmentpoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = FundingLocked_get_next_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL FundingLockedsetnextpercommitmentpoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKFundingLocked* this_ptr_conv = (LDKFundingLocked*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return FundingLocked_set_next_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL FundingLockednew(JNIEnv * _env, jclass _b, jlong channel_id_arg, jlong next_per_commitment_point_arg) {
	LDKThirtyTwoBytes channel_id_arg_conv = *(LDKThirtyTwoBytes*)channel_id_arg;
	LDKPublicKey next_per_commitment_point_arg_conv = *(LDKPublicKey*)next_per_commitment_point_arg;
	LDKFundingLocked* ret = malloc(sizeof(LDKFundingLocked));
	*ret = FundingLocked_new(channel_id_arg_conv, next_per_commitment_point_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL Shutdownfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKShutdown this_ptr_conv = *(LDKShutdown*)this_ptr;
	return Shutdown_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ClosingSignedfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKClosingSigned this_ptr_conv = *(LDKClosingSigned*)this_ptr;
	return ClosingSigned_free(this_ptr_conv);
}

JNIEXPORT void JNICALL UpdateAddHTLCfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateAddHTLC this_ptr_conv = *(LDKUpdateAddHTLC*)this_ptr;
	return UpdateAddHTLC_free(this_ptr_conv);
}

JNIEXPORT void JNICALL UpdateFulfillHTLCfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFulfillHTLC this_ptr_conv = *(LDKUpdateFulfillHTLC*)this_ptr;
	return UpdateFulfillHTLC_free(this_ptr_conv);
}

JNIEXPORT void JNICALL UpdateFailHTLCfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailHTLC this_ptr_conv = *(LDKUpdateFailHTLC*)this_ptr;
	return UpdateFailHTLC_free(this_ptr_conv);
}

JNIEXPORT void JNICALL UpdateFailMalformedHTLCfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFailMalformedHTLC this_ptr_conv = *(LDKUpdateFailMalformedHTLC*)this_ptr;
	return UpdateFailMalformedHTLC_free(this_ptr_conv);
}

JNIEXPORT void JNICALL CommitmentSignedfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentSigned this_ptr_conv = *(LDKCommitmentSigned*)this_ptr;
	return CommitmentSigned_free(this_ptr_conv);
}

JNIEXPORT void JNICALL RevokeAndACKfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRevokeAndACK this_ptr_conv = *(LDKRevokeAndACK*)this_ptr;
	return RevokeAndACK_free(this_ptr_conv);
}

JNIEXPORT void JNICALL UpdateFeefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUpdateFee this_ptr_conv = *(LDKUpdateFee*)this_ptr;
	return UpdateFee_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelReestablishfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelReestablish this_ptr_conv = *(LDKChannelReestablish*)this_ptr;
	return ChannelReestablish_free(this_ptr_conv);
}

JNIEXPORT void JNICALL AnnouncementSignaturesfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKAnnouncementSignatures this_ptr_conv = *(LDKAnnouncementSignatures*)this_ptr;
	return AnnouncementSignatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL NetAddressfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetAddress this_ptr_conv = *(LDKNetAddress*)this_ptr;
	return NetAddress_free(this_ptr_conv);
}

JNIEXPORT void JNICALL UnsignedNodeAnnouncementfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement this_ptr_conv = *(LDKUnsignedNodeAnnouncement*)this_ptr;
	return UnsignedNodeAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL UnsignedNodeAnnouncementgetnodeid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = UnsignedNodeAnnouncement_get_node_id(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL UnsignedNodeAnnouncementsetnodeid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedNodeAnnouncement* this_ptr_conv = (LDKUnsignedNodeAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return UnsignedNodeAnnouncement_set_node_id(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL NodeAnnouncementfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncement this_ptr_conv = *(LDKNodeAnnouncement*)this_ptr;
	return NodeAnnouncement_free(this_ptr_conv);
}

JNIEXPORT void JNICALL UnsignedChannelAnnouncementfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement this_ptr_conv = *(LDKUnsignedChannelAnnouncement*)this_ptr;
	return UnsignedChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL UnsignedChannelAnnouncementgetnodeid1(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = UnsignedChannelAnnouncement_get_node_id_1(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL UnsignedChannelAnnouncementsetnodeid1(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return UnsignedChannelAnnouncement_set_node_id_1(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL UnsignedChannelAnnouncementgetnodeid2(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = UnsignedChannelAnnouncement_get_node_id_2(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL UnsignedChannelAnnouncementsetnodeid2(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKUnsignedChannelAnnouncement* this_ptr_conv = (LDKUnsignedChannelAnnouncement*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return UnsignedChannelAnnouncement_set_node_id_2(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL ChannelAnnouncementfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelAnnouncement this_ptr_conv = *(LDKChannelAnnouncement*)this_ptr;
	return ChannelAnnouncement_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelUpdatefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelUpdate this_ptr_conv = *(LDKChannelUpdate*)this_ptr;
	return ChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ErrorActionfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKErrorAction this_ptr_conv = *(LDKErrorAction*)this_ptr;
	return ErrorAction_free(this_ptr_conv);
}

JNIEXPORT void JNICALL LightningErrorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError this_ptr_conv = *(LDKLightningError*)this_ptr;
	return LightningError_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL LightningErrorgeterr(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKStr* ret = malloc(sizeof(LDKStr));
	*ret = LightningError_get_err(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL LightningErrorseterr(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKCVec_u8Z val_conv = *(LDKCVec_u8Z*)val;
	return LightningError_set_err(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL LightningErrorgetaction(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKErrorAction* ret = malloc(sizeof(LDKErrorAction));
	*ret = LightningError_get_action(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL LightningErrorsetaction(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLightningError* this_ptr_conv = (LDKLightningError*)this_ptr;
	LDKErrorAction val_conv = *(LDKErrorAction*)val;
	return LightningError_set_action(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL LightningErrornew(JNIEnv * _env, jclass _b, jlong err_arg, jlong action_arg) {
	LDKCVec_u8Z err_arg_conv = *(LDKCVec_u8Z*)err_arg;
	LDKErrorAction action_arg_conv = *(LDKErrorAction*)action_arg;
	LDKLightningError* ret = malloc(sizeof(LDKLightningError));
	*ret = LightningError_new(err_arg_conv, action_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CommitmentUpdatefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate this_ptr_conv = *(LDKCommitmentUpdate*)this_ptr;
	return CommitmentUpdate_free(this_ptr_conv);
}

JNIEXPORT void JNICALL CommitmentUpdatesetupdateaddhtlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateAddHTLCZ val_conv = *(LDKCVec_UpdateAddHTLCZ*)val;
	return CommitmentUpdate_set_update_add_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL CommitmentUpdatesetupdatefulfillhtlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateFulfillHTLCZ val_conv = *(LDKCVec_UpdateFulfillHTLCZ*)val;
	return CommitmentUpdate_set_update_fulfill_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL CommitmentUpdatesetupdatefailhtlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateFailHTLCZ val_conv = *(LDKCVec_UpdateFailHTLCZ*)val;
	return CommitmentUpdate_set_update_fail_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL CommitmentUpdatesetupdatefailmalformedhtlcs(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCVec_UpdateFailMalformedHTLCZ val_conv = *(LDKCVec_UpdateFailMalformedHTLCZ*)val;
	return CommitmentUpdate_set_update_fail_malformed_htlcs(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL CommitmentUpdategetupdatefee(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKUpdateFee* ret = malloc(sizeof(LDKUpdateFee));
	*ret = CommitmentUpdate_get_update_fee(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CommitmentUpdatesetupdatefee(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKUpdateFee val_conv = *(LDKUpdateFee*)val;
	return CommitmentUpdate_set_update_fee(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL CommitmentUpdategetcommitmentsigned(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCommitmentSigned* ret = malloc(sizeof(LDKCommitmentSigned));
	*ret = CommitmentUpdate_get_commitment_signed(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL CommitmentUpdatesetcommitmentsigned(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKCommitmentUpdate* this_ptr_conv = (LDKCommitmentUpdate*)this_ptr;
	LDKCommitmentSigned val_conv = *(LDKCommitmentSigned*)val;
	return CommitmentUpdate_set_commitment_signed(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL CommitmentUpdatenew(JNIEnv * _env, jclass _b, jlong update_add_htlcs_arg, jlong update_fulfill_htlcs_arg, jlong update_fail_htlcs_arg, jlong update_fail_malformed_htlcs_arg, jlong update_fee_arg, jlong commitment_signed_arg) {
	LDKCVec_UpdateAddHTLCZ update_add_htlcs_arg_conv = *(LDKCVec_UpdateAddHTLCZ*)update_add_htlcs_arg;
	LDKCVec_UpdateFulfillHTLCZ update_fulfill_htlcs_arg_conv = *(LDKCVec_UpdateFulfillHTLCZ*)update_fulfill_htlcs_arg;
	LDKCVec_UpdateFailHTLCZ update_fail_htlcs_arg_conv = *(LDKCVec_UpdateFailHTLCZ*)update_fail_htlcs_arg;
	LDKCVec_UpdateFailMalformedHTLCZ update_fail_malformed_htlcs_arg_conv = *(LDKCVec_UpdateFailMalformedHTLCZ*)update_fail_malformed_htlcs_arg;
	LDKUpdateFee update_fee_arg_conv = *(LDKUpdateFee*)update_fee_arg;
	LDKCommitmentSigned commitment_signed_arg_conv = *(LDKCommitmentSigned*)commitment_signed_arg;
	LDKCommitmentUpdate* ret = malloc(sizeof(LDKCommitmentUpdate));
	*ret = CommitmentUpdate_new(update_add_htlcs_arg_conv, update_fulfill_htlcs_arg_conv, update_fail_htlcs_arg_conv, update_fail_malformed_htlcs_arg_conv, update_fee_arg_conv, commitment_signed_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL HTLCFailChannelUpdatefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCFailChannelUpdate this_ptr_conv = *(LDKHTLCFailChannelUpdate*)this_ptr;
	return HTLCFailChannelUpdate_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelMessageHandlerfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelMessageHandler this_ptr_conv = *(LDKChannelMessageHandler*)this_ptr;
	return ChannelMessageHandler_free(this_ptr_conv);
}

JNIEXPORT void JNICALL RoutingMessageHandlerfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingMessageHandler this_ptr_conv = *(LDKRoutingMessageHandler*)this_ptr;
	return RoutingMessageHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL AcceptChannelwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKAcceptChannel* obj_conv = (LDKAcceptChannel*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = AcceptChannel_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL AcceptChannelread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKAcceptChannel* ret = malloc(sizeof(LDKAcceptChannel));
	*ret = AcceptChannel_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL AnnouncementSignatureswrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKAnnouncementSignatures* obj_conv = (LDKAnnouncementSignatures*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = AnnouncementSignatures_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL AnnouncementSignaturesread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKAnnouncementSignatures* ret = malloc(sizeof(LDKAnnouncementSignatures));
	*ret = AnnouncementSignatures_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelReestablishwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelReestablish* obj_conv = (LDKChannelReestablish*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelReestablish_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelReestablishread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelReestablish* ret = malloc(sizeof(LDKChannelReestablish));
	*ret = ChannelReestablish_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ClosingSignedwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKClosingSigned* obj_conv = (LDKClosingSigned*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ClosingSigned_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ClosingSignedread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKClosingSigned* ret = malloc(sizeof(LDKClosingSigned));
	*ret = ClosingSigned_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL CommitmentSignedwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKCommitmentSigned* obj_conv = (LDKCommitmentSigned*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = CommitmentSigned_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL CommitmentSignedread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKCommitmentSigned* ret = malloc(sizeof(LDKCommitmentSigned));
	*ret = CommitmentSigned_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL FundingCreatedwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingCreated* obj_conv = (LDKFundingCreated*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = FundingCreated_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL FundingCreatedread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKFundingCreated* ret = malloc(sizeof(LDKFundingCreated));
	*ret = FundingCreated_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL FundingSignedwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingSigned* obj_conv = (LDKFundingSigned*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = FundingSigned_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL FundingSignedread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKFundingSigned* ret = malloc(sizeof(LDKFundingSigned));
	*ret = FundingSigned_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL FundingLockedwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKFundingLocked* obj_conv = (LDKFundingLocked*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = FundingLocked_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL FundingLockedread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKFundingLocked* ret = malloc(sizeof(LDKFundingLocked));
	*ret = FundingLocked_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Initwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKInit* obj_conv = (LDKInit*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Init_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Initread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKInit* ret = malloc(sizeof(LDKInit));
	*ret = Init_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL OpenChannelwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKOpenChannel* obj_conv = (LDKOpenChannel*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = OpenChannel_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL OpenChannelread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKOpenChannel* ret = malloc(sizeof(LDKOpenChannel));
	*ret = OpenChannel_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL RevokeAndACKwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRevokeAndACK* obj_conv = (LDKRevokeAndACK*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = RevokeAndACK_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL RevokeAndACKread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKRevokeAndACK* ret = malloc(sizeof(LDKRevokeAndACK));
	*ret = RevokeAndACK_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Shutdownwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKShutdown* obj_conv = (LDKShutdown*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Shutdown_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Shutdownread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKShutdown* ret = malloc(sizeof(LDKShutdown));
	*ret = Shutdown_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateFailHTLCwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFailHTLC* obj_conv = (LDKUpdateFailHTLC*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateFailHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateFailHTLCread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateFailHTLC* ret = malloc(sizeof(LDKUpdateFailHTLC));
	*ret = UpdateFailHTLC_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateFailMalformedHTLCwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFailMalformedHTLC* obj_conv = (LDKUpdateFailMalformedHTLC*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateFailMalformedHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateFailMalformedHTLCread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateFailMalformedHTLC* ret = malloc(sizeof(LDKUpdateFailMalformedHTLC));
	*ret = UpdateFailMalformedHTLC_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateFeewrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFee* obj_conv = (LDKUpdateFee*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateFee_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateFeeread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateFee* ret = malloc(sizeof(LDKUpdateFee));
	*ret = UpdateFee_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateFulfillHTLCwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateFulfillHTLC* obj_conv = (LDKUpdateFulfillHTLC*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateFulfillHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateFulfillHTLCread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateFulfillHTLC* ret = malloc(sizeof(LDKUpdateFulfillHTLC));
	*ret = UpdateFulfillHTLC_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateAddHTLCwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUpdateAddHTLC* obj_conv = (LDKUpdateAddHTLC*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UpdateAddHTLC_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UpdateAddHTLCread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUpdateAddHTLC* ret = malloc(sizeof(LDKUpdateAddHTLC));
	*ret = UpdateAddHTLC_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Pingwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKPing* obj_conv = (LDKPing*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Ping_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Pingread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKPing* ret = malloc(sizeof(LDKPing));
	*ret = Ping_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Pongwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKPong* obj_conv = (LDKPong*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Pong_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Pongread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKPong* ret = malloc(sizeof(LDKPong));
	*ret = Pong_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UnsignedChannelAnnouncementwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedChannelAnnouncement* obj_conv = (LDKUnsignedChannelAnnouncement*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UnsignedChannelAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UnsignedChannelAnnouncementread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUnsignedChannelAnnouncement* ret = malloc(sizeof(LDKUnsignedChannelAnnouncement));
	*ret = UnsignedChannelAnnouncement_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelAnnouncementwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelAnnouncement* obj_conv = (LDKChannelAnnouncement*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelAnnouncementread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelAnnouncement* ret = malloc(sizeof(LDKChannelAnnouncement));
	*ret = ChannelAnnouncement_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelUpdatewrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelUpdate* obj_conv = (LDKChannelUpdate*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelUpdate_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelUpdateread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelUpdate* ret = malloc(sizeof(LDKChannelUpdate));
	*ret = ChannelUpdate_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ErrorMessagewrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKErrorMessage* obj_conv = (LDKErrorMessage*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ErrorMessage_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ErrorMessageread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKErrorMessage* ret = malloc(sizeof(LDKErrorMessage));
	*ret = ErrorMessage_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UnsignedNodeAnnouncementwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKUnsignedNodeAnnouncement* obj_conv = (LDKUnsignedNodeAnnouncement*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = UnsignedNodeAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL UnsignedNodeAnnouncementread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKUnsignedNodeAnnouncement* ret = malloc(sizeof(LDKUnsignedNodeAnnouncement));
	*ret = UnsignedNodeAnnouncement_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NodeAnnouncementwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeAnnouncement* obj_conv = (LDKNodeAnnouncement*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = NodeAnnouncement_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NodeAnnouncementread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKNodeAnnouncement* ret = malloc(sizeof(LDKNodeAnnouncement));
	*ret = NodeAnnouncement_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL MessageHandlerfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler this_ptr_conv = *(LDKMessageHandler*)this_ptr;
	return MessageHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL MessageHandlergetchanhandler(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	return (long) MessageHandler_get_chan_handler(this_ptr_conv);
}

JNIEXPORT void JNICALL MessageHandlersetchanhandler(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	LDKChannelMessageHandler val_conv = *(LDKChannelMessageHandler*)val;
	return MessageHandler_set_chan_handler(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL MessageHandlergetroutehandler(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	return (long) MessageHandler_get_route_handler(this_ptr_conv);
}

JNIEXPORT void JNICALL MessageHandlersetroutehandler(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKMessageHandler* this_ptr_conv = (LDKMessageHandler*)this_ptr;
	LDKRoutingMessageHandler val_conv = *(LDKRoutingMessageHandler*)val;
	return MessageHandler_set_route_handler(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL MessageHandlernew(JNIEnv * _env, jclass _b, jlong chan_handler_arg, jlong route_handler_arg) {
	LDKChannelMessageHandler chan_handler_arg_conv = *(LDKChannelMessageHandler*)chan_handler_arg;
	LDKRoutingMessageHandler route_handler_arg_conv = *(LDKRoutingMessageHandler*)route_handler_arg;
	LDKMessageHandler* ret = malloc(sizeof(LDKMessageHandler));
	*ret = MessageHandler_new(chan_handler_arg_conv, route_handler_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL SocketDescriptorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKSocketDescriptor this_ptr_conv = *(LDKSocketDescriptor*)this_ptr;
	return SocketDescriptor_free(this_ptr_conv);
}

JNIEXPORT void JNICALL PeerHandleErrorfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerHandleError this_ptr_conv = *(LDKPeerHandleError*)this_ptr;
	return PeerHandleError_free(this_ptr_conv);
}

JNIEXPORT jboolean JNICALL PeerHandleErrorgetnoconnectionpossible(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerHandleError* this_ptr_conv = (LDKPeerHandleError*)this_ptr;
	return PeerHandleError_get_no_connection_possible(this_ptr_conv);
}

JNIEXPORT void JNICALL PeerHandleErrorsetnoconnectionpossible(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean va) {
	LDKPeerHandleError* this_ptr_conv = (LDKPeerHandleError*)this_ptr;
	return PeerHandleError_set_no_connection_possible(this_ptr_conv, va);
}

JNIEXPORT jlong JNICALL PeerHandleErrornew(JNIEnv * _env, jclass _b, jboolean no_connection_possible_arg) {
	LDKPeerHandleError* ret = malloc(sizeof(LDKPeerHandleError));
	*ret = PeerHandleError_new(no_connection_possible_arg);
	return (long)ret;
}

JNIEXPORT void JNICALL PeerManagerfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKPeerManager this_ptr_conv = *(LDKPeerManager*)this_ptr;
	return PeerManager_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL PeerManagernew(JNIEnv * _env, jclass _b, jlong message_handler, jlong our_node_secret, jbyteArray ephemeral_random_data, jlong logger) {
	LDKMessageHandler message_handler_conv = *(LDKMessageHandler*)message_handler;
	LDKSecretKey our_node_secret_conv = *(LDKSecretKey*)our_node_secret;
	unsigned char ephemeral_random_data_arr[32];
	(*_env)->GetByteArrayRegion (_env, ephemeral_random_data, 0, 32, ephemeral_random_data_arr);
	unsigned char (*ephemeral_random_data_ref)[32] = &ephemeral_random_data_arr;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKPeerManager* ret = malloc(sizeof(LDKPeerManager));
	*ret = PeerManager_new(message_handler_conv, our_node_secret_conv, ephemeral_random_data_ref, logger_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL PeerManagergetpeernodeids(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKCVec_PublicKeyZ* ret = malloc(sizeof(LDKCVec_PublicKeyZ));
	*ret = PeerManager_get_peer_node_ids(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL PeerManagernewoutboundconnection(JNIEnv * _env, jclass _b, jlong this_arg, jlong their_node_id, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKPublicKey their_node_id_conv = *(LDKPublicKey*)their_node_id;
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	LDKCResult_CVec_u8ZPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_CVec_u8ZPeerHandleErrorZ));
	*ret = PeerManager_new_outbound_connection(this_arg_conv, their_node_id_conv, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL PeerManagernewinboundconnection(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor descriptor_conv = *(LDKSocketDescriptor*)descriptor;
	LDKCResult_NonePeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_NonePeerHandleErrorZ));
	*ret = PeerManager_new_inbound_connection(this_arg_conv, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL PeerManagerwritebufferspaceavail(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	LDKCResult_NonePeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_NonePeerHandleErrorZ));
	*ret = PeerManager_write_buffer_space_avail(this_arg_conv, descriptor_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL PeerManagerreadevent(JNIEnv * _env, jclass _b, jlong this_arg, jlong peer_descriptor, jlong data) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor* peer_descriptor_conv = (LDKSocketDescriptor*)peer_descriptor;
	LDKu8slice data_conv = *(LDKu8slice*)data;
	LDKCResult_boolPeerHandleErrorZ* ret = malloc(sizeof(LDKCResult_boolPeerHandleErrorZ));
	*ret = PeerManager_read_event(this_arg_conv, peer_descriptor_conv, data_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL PeerManagerprocessevents(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	return PeerManager_process_events(this_arg_conv);
}

JNIEXPORT void JNICALL PeerManagersocketdisconnected(JNIEnv * _env, jclass _b, jlong this_arg, jlong descriptor) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	LDKSocketDescriptor* descriptor_conv = (LDKSocketDescriptor*)descriptor;
	return PeerManager_socket_disconnected(this_arg_conv, descriptor_conv);
}

JNIEXPORT void JNICALL PeerManagertimertickoccured(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKPeerManager* this_arg_conv = (LDKPeerManager*)this_arg;
	return PeerManager_timer_tick_occured(this_arg_conv);
}

JNIEXPORT jlong JNICALL buildcommitmentsecret(JNIEnv * _env, jclass _b, jbyteArray commitment_seed, jlong dx) {
	unsigned char commitment_seed_arr[32];
	(*_env)->GetByteArrayRegion (_env, commitment_seed, 0, 32, commitment_seed_arr);
	unsigned char (*commitment_seed_ref)[32] = &commitment_seed_arr;
	LDKThirtyTwoBytes* ret = malloc(sizeof(LDKThirtyTwoBytes));
	*ret = build_commitment_secret(commitment_seed_ref, dx);
	return (long)ret;
}

JNIEXPORT void JNICALL TxCreationKeysfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys this_ptr_conv = *(LDKTxCreationKeys*)this_ptr;
	return TxCreationKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL TxCreationKeysgetpercommitmentpoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = TxCreationKeys_get_per_commitment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL TxCreationKeyssetpercommitmentpoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKTxCreationKeys* this_ptr_conv = (LDKTxCreationKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return TxCreationKeys_set_per_commitment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL TxCreationKeyswrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKTxCreationKeys* obj_conv = (LDKTxCreationKeys*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = TxCreationKeys_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL TxCreationKeysread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKTxCreationKeys* ret = malloc(sizeof(LDKTxCreationKeys));
	*ret = TxCreationKeys_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelPublicKeysfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys this_ptr_conv = *(LDKChannelPublicKeys*)this_ptr;
	return ChannelPublicKeys_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL ChannelPublicKeysgetfundingpubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_funding_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelPublicKeyssetfundingpubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return ChannelPublicKeys_set_funding_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelPublicKeysgetrevocationbasepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_revocation_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelPublicKeyssetrevocationbasepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return ChannelPublicKeys_set_revocation_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelPublicKeysgetpaymentpoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_payment_point(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelPublicKeyssetpaymentpoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return ChannelPublicKeys_set_payment_point(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelPublicKeysgetdelayedpaymentbasepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_delayed_payment_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelPublicKeyssetdelayedpaymentbasepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return ChannelPublicKeys_set_delayed_payment_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelPublicKeysgethtlcbasepoint(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelPublicKeys_get_htlc_basepoint(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelPublicKeyssethtlcbasepoint(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelPublicKeys* this_ptr_conv = (LDKChannelPublicKeys*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return ChannelPublicKeys_set_htlc_basepoint(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelPublicKeysnew(JNIEnv * _env, jclass _b, jlong funding_pubkey_arg, jlong revocation_basepoint_arg, jlong payment_point_arg, jlong delayed_payment_basepoint_arg, jlong htlc_basepoint_arg) {
	LDKPublicKey funding_pubkey_arg_conv = *(LDKPublicKey*)funding_pubkey_arg;
	LDKPublicKey revocation_basepoint_arg_conv = *(LDKPublicKey*)revocation_basepoint_arg;
	LDKPublicKey payment_point_arg_conv = *(LDKPublicKey*)payment_point_arg;
	LDKPublicKey delayed_payment_basepoint_arg_conv = *(LDKPublicKey*)delayed_payment_basepoint_arg;
	LDKPublicKey htlc_basepoint_arg_conv = *(LDKPublicKey*)htlc_basepoint_arg;
	LDKChannelPublicKeys* ret = malloc(sizeof(LDKChannelPublicKeys));
	*ret = ChannelPublicKeys_new(funding_pubkey_arg_conv, revocation_basepoint_arg_conv, payment_point_arg_conv, delayed_payment_basepoint_arg_conv, htlc_basepoint_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelPublicKeyswrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelPublicKeys* obj_conv = (LDKChannelPublicKeys*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelPublicKeys_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelPublicKeysread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelPublicKeys* ret = malloc(sizeof(LDKChannelPublicKeys));
	*ret = ChannelPublicKeys_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL getrevokeableredeemscript(JNIEnv * _env, jclass _b, jlong revocation_key, jlong to_self_delay, jlong delayed_payment_key) {
	LDKPublicKey revocation_key_conv = *(LDKPublicKey*)revocation_key;
	uint16_t to_self_delay_conv = *(uint16_t*)to_self_delay;
	LDKPublicKey delayed_payment_key_conv = *(LDKPublicKey*)delayed_payment_key;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = get_revokeable_redeemscript(revocation_key_conv, to_self_delay_conv, delayed_payment_key_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL HTLCOutputInCommitmentfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment this_ptr_conv = *(LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_free(this_ptr_conv);
}

JNIEXPORT jboolean JNICALL HTLCOutputInCommitmentgetoffered(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_get_offered(this_ptr_conv);
}

JNIEXPORT void JNICALL HTLCOutputInCommitmentsetoffered(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean va) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_set_offered(this_ptr_conv, va);
}

JNIEXPORT jlong JNICALL HTLCOutputInCommitmentgetamountmsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_get_amount_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL HTLCOutputInCommitmentsetamountmsat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_set_amount_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL HTLCOutputInCommitmentgetcltvexpiry(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_get_cltv_expiry(this_ptr_conv);
}

JNIEXPORT void JNICALL HTLCOutputInCommitmentsetcltvexpiry(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	return HTLCOutputInCommitment_set_cltv_expiry(this_ptr_conv, val);
}

JNIEXPORT jbyteArray  JNICALL HTLCOutputInCommitmentgetpaymenthash(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *HTLCOutputInCommitment_get_payment_hash(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL HTLCOutputInCommitmentsetpaymenthash(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKHTLCOutputInCommitment* this_ptr_conv = (LDKHTLCOutputInCommitment*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	return HTLCOutputInCommitment_set_payment_hash(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL HTLCOutputInCommitmentwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKHTLCOutputInCommitment* obj_conv = (LDKHTLCOutputInCommitment*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = HTLCOutputInCommitment_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL HTLCOutputInCommitmentread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKHTLCOutputInCommitment* ret = malloc(sizeof(LDKHTLCOutputInCommitment));
	*ret = HTLCOutputInCommitment_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL gethtlcredeemscript(JNIEnv * _env, jclass _b, jlong htlc, jlong keys) {
	LDKHTLCOutputInCommitment* htlc_conv = (LDKHTLCOutputInCommitment*)htlc;
	LDKTxCreationKeys* keys_conv = (LDKTxCreationKeys*)keys;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = get_htlc_redeemscript(htlc_conv, keys_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL makefundingredeemscript(JNIEnv * _env, jclass _b, jlong a, jlong b) {
	LDKPublicKey a_conv = *(LDKPublicKey*)a;
	LDKPublicKey b_conv = *(LDKPublicKey*)b;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = make_funding_redeemscript(a_conv, b_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL buildhtlctransaction(JNIEnv * _env, jclass _b, jbyteArray prev_hash, jint feerate_per_kw, jlong to_self_delay, jlong htlc, jlong a_delayed_payment_key, jlong revocation_key) {
	unsigned char prev_hash_arr[32];
	(*_env)->GetByteArrayRegion (_env, prev_hash, 0, 32, prev_hash_arr);
	unsigned char (*prev_hash_ref)[32] = &prev_hash_arr;
	uint16_t to_self_delay_conv = *(uint16_t*)to_self_delay;
	LDKHTLCOutputInCommitment* htlc_conv = (LDKHTLCOutputInCommitment*)htlc;
	LDKPublicKey a_delayed_payment_key_conv = *(LDKPublicKey*)a_delayed_payment_key;
	LDKPublicKey revocation_key_conv = *(LDKPublicKey*)revocation_key;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = build_htlc_transaction(prev_hash_ref, feerate_per_kw, to_self_delay_conv, htlc_conv, a_delayed_payment_key_conv, revocation_key_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL LocalCommitmentTransactionfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLocalCommitmentTransaction this_ptr_conv = *(LDKLocalCommitmentTransaction*)this_ptr;
	return LocalCommitmentTransaction_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL LocalCommitmentTransactiongetunsignedtx(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = LocalCommitmentTransaction_get_unsigned_tx(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL LocalCommitmentTransactionsetunsignedtx(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKCVec_u8Z val_conv = *(LDKCVec_u8Z*)val;
	return LocalCommitmentTransaction_set_unsigned_tx(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL LocalCommitmentTransactiongettheirsig(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = LocalCommitmentTransaction_get_their_sig(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL LocalCommitmentTransactionsettheirsig(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKSignature val_conv = *(LDKSignature*)val;
	return LocalCommitmentTransaction_set_their_sig(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL LocalCommitmentTransactiongetlocalkeys(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKTxCreationKeys* ret = malloc(sizeof(LDKTxCreationKeys));
	*ret = LocalCommitmentTransaction_get_local_keys(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL LocalCommitmentTransactionsetlocalkeys(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	LDKTxCreationKeys val_conv = *(LDKTxCreationKeys*)val;
	return LocalCommitmentTransaction_set_local_keys(this_ptr_conv, val_conv);
}

JNIEXPORT jint JNICALL LocalCommitmentTransactiongetfeerateperkw(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	return LocalCommitmentTransaction_get_feerate_per_kw(this_ptr_conv);
}

JNIEXPORT void JNICALL LocalCommitmentTransactionsetfeerateperkw(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKLocalCommitmentTransaction* this_ptr_conv = (LDKLocalCommitmentTransaction*)this_ptr;
	return LocalCommitmentTransaction_set_feerate_per_kw(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL LocalCommitmentTransactiontxid(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKLocalCommitmentTransaction* this_arg_conv = (LDKLocalCommitmentTransaction*)this_arg;
	LDKThirtyTwoBytes* ret = malloc(sizeof(LDKThirtyTwoBytes));
	*ret = LocalCommitmentTransaction_txid(this_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL LocalCommitmentTransactiongetlocalsig(JNIEnv * _env, jclass _b, jlong this_arg, jbyteArray funding_key, jlong funding_redeemscript, jlong channel_value_satoshis) {
	LDKLocalCommitmentTransaction* this_arg_conv = (LDKLocalCommitmentTransaction*)this_arg;
	unsigned char funding_key_arr[32];
	(*_env)->GetByteArrayRegion (_env, funding_key, 0, 32, funding_key_arr);
	unsigned char (*funding_key_ref)[32] = &funding_key_arr;
	LDKu8slice funding_redeemscript_conv = *(LDKu8slice*)funding_redeemscript;
	LDKSignature* ret = malloc(sizeof(LDKSignature));
	*ret = LocalCommitmentTransaction_get_local_sig(this_arg_conv, funding_key_ref, funding_redeemscript_conv, channel_value_satoshis);
	return (long)ret;
}

JNIEXPORT jlong JNICALL LocalCommitmentTransactionwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKLocalCommitmentTransaction* obj_conv = (LDKLocalCommitmentTransaction*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = LocalCommitmentTransaction_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL LocalCommitmentTransactionread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKLocalCommitmentTransaction* ret = malloc(sizeof(LDKLocalCommitmentTransaction));
	*ret = LocalCommitmentTransaction_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL InitFeaturesfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKInitFeatures this_ptr_conv = *(LDKInitFeatures*)this_ptr;
	return InitFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL NodeFeaturesfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeFeatures this_ptr_conv = *(LDKNodeFeatures*)this_ptr;
	return NodeFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL ChannelFeaturesfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelFeatures this_ptr_conv = *(LDKChannelFeatures*)this_ptr;
	return ChannelFeatures_free(this_ptr_conv);
}

JNIEXPORT void JNICALL RouteHopfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop this_ptr_conv = *(LDKRouteHop*)this_ptr;
	return RouteHop_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL RouteHopgetpubkey(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = RouteHop_get_pubkey(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL RouteHopsetpubkey(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return RouteHop_set_pubkey(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL RouteHopgetshortchannelid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_get_short_channel_id(this_ptr_conv);
}

JNIEXPORT void JNICALL RouteHopsetshortchannelid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_set_short_channel_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL RouteHopgetfeemsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_get_fee_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL RouteHopsetfeemsat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_set_fee_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL RouteHopgetcltvexpirydelta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_get_cltv_expiry_delta(this_ptr_conv);
}

JNIEXPORT void JNICALL RouteHopsetcltvexpirydelta(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKRouteHop* this_ptr_conv = (LDKRouteHop*)this_ptr;
	return RouteHop_set_cltv_expiry_delta(this_ptr_conv, val);
}

JNIEXPORT void JNICALL Routefree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoute this_ptr_conv = *(LDKRoute*)this_ptr;
	return Route_free(this_ptr_conv);
}

JNIEXPORT void JNICALL Routesetpaths(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRoute* this_ptr_conv = (LDKRoute*)this_ptr;
	LDKCVec_CVec_RouteHopZZ val_conv = *(LDKCVec_CVec_RouteHopZZ*)val;
	return Route_set_paths(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL Routenew(JNIEnv * _env, jclass _b, jlong paths_arg) {
	LDKCVec_CVec_RouteHopZZ paths_arg_conv = *(LDKCVec_CVec_RouteHopZZ*)paths_arg;
	LDKRoute* ret = malloc(sizeof(LDKRoute));
	*ret = Route_new(paths_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Routewrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRoute* obj_conv = (LDKRoute*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = Route_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL Routeread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKRoute* ret = malloc(sizeof(LDKRoute));
	*ret = Route_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL RouteHintfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint this_ptr_conv = *(LDKRouteHint*)this_ptr;
	return RouteHint_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL RouteHintgetsrcnodeid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = RouteHint_get_src_node_id(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL RouteHintsetsrcnodeid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return RouteHint_set_src_node_id(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL RouteHintgetshortchannelid(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_get_short_channel_id(this_ptr_conv);
}

JNIEXPORT void JNICALL RouteHintsetshortchannelid(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_set_short_channel_id(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL RouteHintgetfees(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKRoutingFees* ret = malloc(sizeof(LDKRoutingFees));
	*ret = RouteHint_get_fees(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL RouteHintsetfees(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	LDKRoutingFees val_conv = *(LDKRoutingFees*)val;
	return RouteHint_set_fees(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL RouteHintgetcltvexpirydelta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	uint16_t* ret = malloc(sizeof(uint16_t));
	*ret = RouteHint_get_cltv_expiry_delta(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL RouteHintsetcltvexpirydelta(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	uint16_t val_conv = *(uint16_t*)val;
	return RouteHint_set_cltv_expiry_delta(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL RouteHintgethtlcminimummsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_get_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL RouteHintsethtlcminimummsat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKRouteHint* this_ptr_conv = (LDKRouteHint*)this_ptr;
	return RouteHint_set_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL RouteHintnew(JNIEnv * _env, jclass _b, jlong src_node_id_arg, jlong short_channel_id_arg, jlong fees_arg, jlong cltv_expiry_delta_arg, jlong htlc_minimum_msat_arg) {
	LDKPublicKey src_node_id_arg_conv = *(LDKPublicKey*)src_node_id_arg;
	LDKRoutingFees fees_arg_conv = *(LDKRoutingFees*)fees_arg;
	uint16_t cltv_expiry_delta_arg_conv = *(uint16_t*)cltv_expiry_delta_arg;
	LDKRouteHint* ret = malloc(sizeof(LDKRouteHint));
	*ret = RouteHint_new(src_node_id_arg_conv, short_channel_id_arg, fees_arg_conv, cltv_expiry_delta_arg_conv, htlc_minimum_msat_arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL getroute(JNIEnv * _env, jclass _b, jlong our_node_id, jlong network, jlong target, jlong first_hops, jlong last_hops, jlong final_value_msa, jint final_cltv, jlong logger) {
	LDKPublicKey our_node_id_conv = *(LDKPublicKey*)our_node_id;
	LDKNetworkGraph* network_conv = (LDKNetworkGraph*)network;
	LDKPublicKey target_conv = *(LDKPublicKey*)target;
	LDKCChannelDetailsSlice* first_hops_conv = (LDKCChannelDetailsSlice*)first_hops;
	LDKCRouteHintSlice last_hops_conv = *(LDKCRouteHintSlice*)last_hops;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKCResult_RouteLightningErrorZ* ret = malloc(sizeof(LDKCResult_RouteLightningErrorZ));
	*ret = get_route(our_node_id_conv, network_conv, target_conv, first_hops_conv, last_hops_conv, final_value_msa, final_cltv, logger_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL NetworkGraphfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetworkGraph this_ptr_conv = *(LDKNetworkGraph*)this_ptr;
	return NetworkGraph_free(this_ptr_conv);
}

JNIEXPORT void JNICALL NetGraphMsgHandlerfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNetGraphMsgHandler this_ptr_conv = *(LDKNetGraphMsgHandler*)this_ptr;
	return NetGraphMsgHandler_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL NetGraphMsgHandlernew(JNIEnv * _env, jclass _b, jlong chain_monitor, jlong logger) {
	LDKChainWatchInterface chain_monitor_conv = *(LDKChainWatchInterface*)chain_monitor;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKNetGraphMsgHandler* ret = malloc(sizeof(LDKNetGraphMsgHandler));
	*ret = NetGraphMsgHandler_new(chain_monitor_conv, logger_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NetGraphMsgHandlerfromnetgraph(JNIEnv * _env, jclass _b, jlong chain_monitor, jlong logger, jlong network_graph) {
	LDKChainWatchInterface chain_monitor_conv = *(LDKChainWatchInterface*)chain_monitor;
	LDKLogger logger_conv = *(LDKLogger*)logger;
	LDKNetworkGraph network_graph_conv = *(LDKNetworkGraph*)network_graph;
	LDKNetGraphMsgHandler* ret = malloc(sizeof(LDKNetGraphMsgHandler));
	*ret = NetGraphMsgHandler_from_net_graph(chain_monitor_conv, logger_conv, network_graph_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NetGraphMsgHandlerasRoutingMessageHandler(JNIEnv * _env, jclass _b, jlong this_arg) {
	LDKNetGraphMsgHandler* this_arg_conv = (LDKNetGraphMsgHandler*)this_arg;
	LDKRoutingMessageHandler* ret = malloc(sizeof(LDKRoutingMessageHandler));
	*ret = NetGraphMsgHandler_as_RoutingMessageHandler(this_arg_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL DirectionalChannelInfofree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo this_ptr_conv = *(LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL DirectionalChannelInfogetlastupdate(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_get_last_update(this_ptr_conv);
}

JNIEXPORT void JNICALL DirectionalChannelInfosetlastupdate(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_set_last_update(this_ptr_conv, val);
}

JNIEXPORT jboolean JNICALL DirectionalChannelInfogetenabled(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_get_enabled(this_ptr_conv);
}

JNIEXPORT void JNICALL DirectionalChannelInfosetenabled(JNIEnv * _env, jclass _b, jlong this_ptr, jboolean va) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_set_enabled(this_ptr_conv, va);
}

JNIEXPORT jlong JNICALL DirectionalChannelInfogetcltvexpirydelta(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	uint16_t* ret = malloc(sizeof(uint16_t));
	*ret = DirectionalChannelInfo_get_cltv_expiry_delta(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL DirectionalChannelInfosetcltvexpirydelta(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	uint16_t val_conv = *(uint16_t*)val;
	return DirectionalChannelInfo_set_cltv_expiry_delta(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL DirectionalChannelInfogethtlcminimummsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_get_htlc_minimum_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL DirectionalChannelInfosethtlcminimummsat(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKDirectionalChannelInfo* this_ptr_conv = (LDKDirectionalChannelInfo*)this_ptr;
	return DirectionalChannelInfo_set_htlc_minimum_msat(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL DirectionalChannelInfowrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKDirectionalChannelInfo* obj_conv = (LDKDirectionalChannelInfo*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = DirectionalChannelInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL DirectionalChannelInforead(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKDirectionalChannelInfo* ret = malloc(sizeof(LDKDirectionalChannelInfo));
	*ret = DirectionalChannelInfo_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelInfofree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo this_ptr_conv = *(LDKChannelInfo*)this_ptr;
	return ChannelInfo_free(this_ptr_conv);
}

JNIEXPORT jlong JNICALL ChannelInfogetnodeone(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelInfo_get_node_one(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelInfosetnodeone(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return ChannelInfo_set_node_one(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelInfogetonetotwo(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo* ret = malloc(sizeof(LDKDirectionalChannelInfo));
	*ret = ChannelInfo_get_one_to_two(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelInfosetonetotwo(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo val_conv = *(LDKDirectionalChannelInfo*)val;
	return ChannelInfo_set_one_to_two(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelInfogetnodetwo(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey* ret = malloc(sizeof(LDKPublicKey));
	*ret = ChannelInfo_get_node_two(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelInfosetnodetwo(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKPublicKey val_conv = *(LDKPublicKey*)val;
	return ChannelInfo_set_node_two(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelInfogettwotoone(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo* ret = malloc(sizeof(LDKDirectionalChannelInfo));
	*ret = ChannelInfo_get_two_to_one(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL ChannelInfosettwotoone(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKChannelInfo* this_ptr_conv = (LDKChannelInfo*)this_ptr;
	LDKDirectionalChannelInfo val_conv = *(LDKDirectionalChannelInfo*)val;
	return ChannelInfo_set_two_to_one(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL ChannelInfowrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKChannelInfo* obj_conv = (LDKChannelInfo*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = ChannelInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL ChannelInforead(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKChannelInfo* ret = malloc(sizeof(LDKChannelInfo));
	*ret = ChannelInfo_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL RoutingFeesfree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees this_ptr_conv = *(LDKRoutingFees*)this_ptr;
	return RoutingFees_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL RoutingFeesgetbasemsat(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees* this_ptr_conv = (LDKRoutingFees*)this_ptr;
	return RoutingFees_get_base_msat(this_ptr_conv);
}

JNIEXPORT void JNICALL RoutingFeessetbasemsat(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKRoutingFees* this_ptr_conv = (LDKRoutingFees*)this_ptr;
	return RoutingFees_set_base_msat(this_ptr_conv, val);
}

JNIEXPORT jint JNICALL RoutingFeesgetproportionalmillionths(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKRoutingFees* this_ptr_conv = (LDKRoutingFees*)this_ptr;
	return RoutingFees_get_proportional_millionths(this_ptr_conv);
}

JNIEXPORT void JNICALL RoutingFeessetproportionalmillionths(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKRoutingFees* this_ptr_conv = (LDKRoutingFees*)this_ptr;
	return RoutingFees_set_proportional_millionths(this_ptr_conv, val);
}

JNIEXPORT jlong JNICALL RoutingFeesnew(JNIEnv * _env, jclass _b, jint base_msat_arg, jint proportional_millionths_arg) {
	LDKRoutingFees* ret = malloc(sizeof(LDKRoutingFees));
	*ret = RoutingFees_new(base_msat_arg, proportional_millionths_arg);
	return (long)ret;
}

JNIEXPORT jlong JNICALL RoutingFeesread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKRoutingFees* ret = malloc(sizeof(LDKRoutingFees));
	*ret = RoutingFees_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL RoutingFeeswrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKRoutingFees* obj_conv = (LDKRoutingFees*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = RoutingFees_write(obj_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL NodeAnnouncementInfofree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo this_ptr_conv = *(LDKNodeAnnouncementInfo*)this_ptr;
	return NodeAnnouncementInfo_free(this_ptr_conv);
}

JNIEXPORT jint JNICALL NodeAnnouncementInfogetlastupdate(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	return NodeAnnouncementInfo_get_last_update(this_ptr_conv);
}

JNIEXPORT void JNICALL NodeAnnouncementInfosetlastupdate(JNIEnv * _env, jclass _b, jlong this_ptr, jint val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	return NodeAnnouncementInfo_set_last_update(this_ptr_conv, val);
}

JNIEXPORT jbyteArray  JNICALL NodeAnnouncementInfogetrgb(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 3, *NodeAnnouncementInfo_get_rgb(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL NodeAnnouncementInfosetrgb(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKThreeBytes val_conv = *(LDKThreeBytes*)val;
	return NodeAnnouncementInfo_set_rgb(this_ptr_conv, val_conv);
}

JNIEXPORT jbyteArray  JNICALL NodeAnnouncementInfogetalias(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	jbyteArray ret_arr = (*_env)->NewByteArray(_env, 0); // XXX: len 0
	(*_env)->SetByteArrayRegion(_env, ret_arr, 0, 32, *NodeAnnouncementInfo_get_alias(this_ptr_conv));
	return ret_arr;
}

JNIEXPORT void JNICALL NodeAnnouncementInfosetalias(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKThirtyTwoBytes val_conv = *(LDKThirtyTwoBytes*)val;
	return NodeAnnouncementInfo_set_alias(this_ptr_conv, val_conv);
}

JNIEXPORT void JNICALL NodeAnnouncementInfosetaddresses(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeAnnouncementInfo* this_ptr_conv = (LDKNodeAnnouncementInfo*)this_ptr;
	LDKCVec_NetAddressZ val_conv = *(LDKCVec_NetAddressZ*)val;
	return NodeAnnouncementInfo_set_addresses(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL NodeAnnouncementInfowrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeAnnouncementInfo* obj_conv = (LDKNodeAnnouncementInfo*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = NodeAnnouncementInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NodeAnnouncementInforead(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKNodeAnnouncementInfo* ret = malloc(sizeof(LDKNodeAnnouncementInfo));
	*ret = NodeAnnouncementInfo_read(ser_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL NodeInfofree(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo this_ptr_conv = *(LDKNodeInfo*)this_ptr;
	return NodeInfo_free(this_ptr_conv);
}

JNIEXPORT void JNICALL NodeInfosetchannels(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKCVec_u64Z val_conv = *(LDKCVec_u64Z*)val;
	return NodeInfo_set_channels(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL NodeInfogetlowestinboundchannelfees(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKRoutingFees* ret = malloc(sizeof(LDKRoutingFees));
	*ret = NodeInfo_get_lowest_inbound_channel_fees(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL NodeInfosetlowestinboundchannelfees(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKRoutingFees val_conv = *(LDKRoutingFees*)val;
	return NodeInfo_set_lowest_inbound_channel_fees(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL NodeInfogetannouncementinfo(JNIEnv * _env, jclass _b, jlong this_ptr) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKNodeAnnouncementInfo* ret = malloc(sizeof(LDKNodeAnnouncementInfo));
	*ret = NodeInfo_get_announcement_info(this_ptr_conv);
	return (long)ret;
}

JNIEXPORT void JNICALL NodeInfosetannouncementinfo(JNIEnv * _env, jclass _b, jlong this_ptr, jlong val) {
	LDKNodeInfo* this_ptr_conv = (LDKNodeInfo*)this_ptr;
	LDKNodeAnnouncementInfo val_conv = *(LDKNodeAnnouncementInfo*)val;
	return NodeInfo_set_announcement_info(this_ptr_conv, val_conv);
}

JNIEXPORT jlong JNICALL NodeInfonew(JNIEnv * _env, jclass _b, jlong channels_arg, jlong lowest_inbound_channel_fees_arg, jlong announcement_info_arg) {
	LDKCVec_u64Z channels_arg_conv = *(LDKCVec_u64Z*)channels_arg;
	LDKRoutingFees lowest_inbound_channel_fees_arg_conv = *(LDKRoutingFees*)lowest_inbound_channel_fees_arg;
	LDKNodeAnnouncementInfo announcement_info_arg_conv = *(LDKNodeAnnouncementInfo*)announcement_info_arg;
	LDKNodeInfo* ret = malloc(sizeof(LDKNodeInfo));
	*ret = NodeInfo_new(channels_arg_conv, lowest_inbound_channel_fees_arg_conv, announcement_info_arg_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NodeInfowrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNodeInfo* obj_conv = (LDKNodeInfo*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = NodeInfo_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NodeInforead(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKNodeInfo* ret = malloc(sizeof(LDKNodeInfo));
	*ret = NodeInfo_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NetworkGraphwrite(JNIEnv * _env, jclass _b, jlong obj) {
	LDKNetworkGraph* obj_conv = (LDKNetworkGraph*)obj;
	LDKCVec_u8Z* ret = malloc(sizeof(LDKCVec_u8Z));
	*ret = NetworkGraph_write(obj_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NetworkGraphread(JNIEnv * _env, jclass _b, jlong ser) {
	LDKu8slice ser_conv = *(LDKu8slice*)ser;
	LDKNetworkGraph* ret = malloc(sizeof(LDKNetworkGraph));
	*ret = NetworkGraph_read(ser_conv);
	return (long)ret;
}

JNIEXPORT jlong JNICALL NetworkGraphnew(JNIEnv * _env, jclass _b) {
	LDKNetworkGraph* ret = malloc(sizeof(LDKNetworkGraph));
	*ret = NetworkGraph_new();
	return (long)ret;
}

JNIEXPORT void JNICALL NetworkGraphclosechannelfromupdate(JNIEnv * _env, jclass _b, jlong this_arg, jlong short_channel_id, jboolean is_permanent) {
	LDKNetworkGraph* this_arg_conv = (LDKNetworkGraph*)this_arg;
	return NetworkGraph_close_channel_from_update(this_arg_conv, short_channel_id, is_permanent);
}

