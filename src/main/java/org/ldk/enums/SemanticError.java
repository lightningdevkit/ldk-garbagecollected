package org.ldk.enums;

/**
 * Errors that may occur when converting a `RawInvoice` to an `Invoice`. They relate to the
 * requirements sections in BOLT #11
 */
public enum SemanticError {
	/**
	 * The invoice is missing the mandatory payment hash
	 */
	LDKSemanticError_NoPaymentHash,
	/**
	 * The invoice has multiple payment hashes which isn't allowed
	 */
	LDKSemanticError_MultiplePaymentHashes,
	/**
	 * No description or description hash are part of the invoice
	 */
	LDKSemanticError_NoDescription,
	/**
	 * The invoice contains multiple descriptions and/or description hashes which isn't allowed
	 */
	LDKSemanticError_MultipleDescriptions,
	/**
	 * The invoice is missing the mandatory payment secret, which all modern lightning nodes
	 * should provide.
	 */
	LDKSemanticError_NoPaymentSecret,
	/**
	 * The invoice contains multiple payment secrets
	 */
	LDKSemanticError_MultiplePaymentSecrets,
	/**
	 * The invoice's features are invalid
	 */
	LDKSemanticError_InvalidFeatures,
	/**
	 * The recovery id doesn't fit the signature/pub key
	 */
	LDKSemanticError_InvalidRecoveryId,
	/**
	 * The invoice's signature is invalid
	 */
	LDKSemanticError_InvalidSignature,
	/**
	 * The invoice's amount was not a whole number of millisatoshis
	 */
	LDKSemanticError_ImpreciseAmount,
	; static native void init();
	static { init(); }
}