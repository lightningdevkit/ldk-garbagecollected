package org.ldk.enums;

/**
 * Errors that may occur when converting a `RawInvoice` to an `Invoice`. They relate to the
 * requirements sections in BOLT #11
 */
public enum LDKSemanticError {
	LDKSemanticError_NoPaymentHash,
	LDKSemanticError_MultiplePaymentHashes,
	LDKSemanticError_NoDescription,
	LDKSemanticError_MultipleDescriptions,
	LDKSemanticError_InvalidRecoveryId,
	LDKSemanticError_InvalidSignature,
	; static native void init();
	static { init(); }
}