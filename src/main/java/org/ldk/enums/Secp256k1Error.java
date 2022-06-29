package org.ldk.enums;

/**
 * Represents an error returned from libsecp256k1 during validation of some secp256k1 data
 */
public enum Secp256k1Error {
	/**
	 * Signature failed verification
	 */
	LDKSecp256k1Error_IncorrectSignature,
	/**
	 * Badly sized message ("messages" are actually fixed-sized digests; see the MESSAGE_SIZE constant)
	 */
	LDKSecp256k1Error_InvalidMessage,
	/**
	 * Bad public key
	 */
	LDKSecp256k1Error_InvalidPublicKey,
	/**
	 * Bad signature
	 */
	LDKSecp256k1Error_InvalidSignature,
	/**
	 * Bad secret key
	 */
	LDKSecp256k1Error_InvalidSecretKey,
	/**
	 * Bad shared secret.
	 */
	LDKSecp256k1Error_InvalidSharedSecret,
	/**
	 * Bad recovery id
	 */
	LDKSecp256k1Error_InvalidRecoveryId,
	/**
	 * Invalid tweak for add_assign or mul_assign
	 */
	LDKSecp256k1Error_InvalidTweak,
	/**
	 * Didn't pass enough memory to context creation with preallocated memory
	 */
	LDKSecp256k1Error_NotEnoughMemory,
	/**
	 * Bad set of public keys.
	 */
	LDKSecp256k1Error_InvalidPublicKeySum,
	/**
	 * The only valid parity values are 0 or 1.
	 */
	LDKSecp256k1Error_InvalidParityValue,
	; static native void init();
	static { init(); }
}