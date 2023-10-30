package org.ldk.enums;

/**
 * Error when interpreting a TLV stream as a specific type.
 */
public enum Bolt12SemanticError {
	/**
	 * The current [`std::time::SystemTime`] is past the offer or invoice's expiration.
	 */
	LDKBolt12SemanticError_AlreadyExpired,
	/**
	 * The provided chain hash does not correspond to a supported chain.
	 */
	LDKBolt12SemanticError_UnsupportedChain,
	/**
	 * A chain was provided but was not expected.
	 */
	LDKBolt12SemanticError_UnexpectedChain,
	/**
	 * An amount was expected but was missing.
	 */
	LDKBolt12SemanticError_MissingAmount,
	/**
	 * The amount exceeded the total bitcoin supply.
	 */
	LDKBolt12SemanticError_InvalidAmount,
	/**
	 * An amount was provided but was not sufficient in value.
	 */
	LDKBolt12SemanticError_InsufficientAmount,
	/**
	 * An amount was provided but was not expected.
	 */
	LDKBolt12SemanticError_UnexpectedAmount,
	/**
	 * A currency was provided that is not supported.
	 */
	LDKBolt12SemanticError_UnsupportedCurrency,
	/**
	 * A feature was required but is unknown.
	 */
	LDKBolt12SemanticError_UnknownRequiredFeatures,
	/**
	 * Features were provided but were not expected.
	 */
	LDKBolt12SemanticError_UnexpectedFeatures,
	/**
	 * A required description was not provided.
	 */
	LDKBolt12SemanticError_MissingDescription,
	/**
	 * A signing pubkey was not provided.
	 */
	LDKBolt12SemanticError_MissingSigningPubkey,
	/**
	 * A signing pubkey was provided but a different one was expected.
	 */
	LDKBolt12SemanticError_InvalidSigningPubkey,
	/**
	 * A signing pubkey was provided but was not expected.
	 */
	LDKBolt12SemanticError_UnexpectedSigningPubkey,
	/**
	 * A quantity was expected but was missing.
	 */
	LDKBolt12SemanticError_MissingQuantity,
	/**
	 * An unsupported quantity was provided.
	 */
	LDKBolt12SemanticError_InvalidQuantity,
	/**
	 * A quantity or quantity bounds was provided but was not expected.
	 */
	LDKBolt12SemanticError_UnexpectedQuantity,
	/**
	 * Metadata could not be used to verify the offers message.
	 */
	LDKBolt12SemanticError_InvalidMetadata,
	/**
	 * Metadata was provided but was not expected.
	 */
	LDKBolt12SemanticError_UnexpectedMetadata,
	/**
	 * Payer metadata was expected but was missing.
	 */
	LDKBolt12SemanticError_MissingPayerMetadata,
	/**
	 * A payer id was expected but was missing.
	 */
	LDKBolt12SemanticError_MissingPayerId,
	/**
	 * The payment id for a refund or request is already in use.
	 */
	LDKBolt12SemanticError_DuplicatePaymentId,
	/**
	 * Blinded paths were expected but were missing.
	 */
	LDKBolt12SemanticError_MissingPaths,
	/**
	 * The blinded payinfo given does not match the number of blinded path hops.
	 */
	LDKBolt12SemanticError_InvalidPayInfo,
	/**
	 * An invoice creation time was expected but was missing.
	 */
	LDKBolt12SemanticError_MissingCreationTime,
	/**
	 * An invoice payment hash was expected but was missing.
	 */
	LDKBolt12SemanticError_MissingPaymentHash,
	/**
	 * A signature was expected but was missing.
	 */
	LDKBolt12SemanticError_MissingSignature,
	; static native void init();
	static { init(); }
}