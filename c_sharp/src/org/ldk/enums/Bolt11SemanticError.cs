namespace org { namespace ldk { namespace enums {/**
 * Errors that may occur when converting a [`RawBolt11Invoice`] to a [`Bolt11Invoice`]. They relate to
 * the requirements sections in BOLT #11
 */
public enum Bolt11SemanticError {
	/**
	 * The invoice is missing the mandatory payment hash
	 */
	LDKBolt11SemanticError_NoPaymentHash,
	/**
	 * The invoice has multiple payment hashes which isn't allowed
	 */
	LDKBolt11SemanticError_MultiplePaymentHashes,
	/**
	 * No description or description hash are part of the invoice
	 */
	LDKBolt11SemanticError_NoDescription,
	/**
	 * The invoice contains multiple descriptions and/or description hashes which isn't allowed
	 */
	LDKBolt11SemanticError_MultipleDescriptions,
	/**
	 * The invoice is missing the mandatory payment secret, which all modern lightning nodes
	 * should provide.
	 */
	LDKBolt11SemanticError_NoPaymentSecret,
	/**
	 * The invoice contains multiple payment secrets
	 */
	LDKBolt11SemanticError_MultiplePaymentSecrets,
	/**
	 * The invoice's features are invalid
	 */
	LDKBolt11SemanticError_InvalidFeatures,
	/**
	 * The recovery id doesn't fit the signature/pub key
	 */
	LDKBolt11SemanticError_InvalidRecoveryId,
	/**
	 * The invoice's signature is invalid
	 */
	LDKBolt11SemanticError_InvalidSignature,
	/**
	 * The invoice's amount was not a whole number of millisatoshis
	 */
	LDKBolt11SemanticError_ImpreciseAmount,
}} } }
