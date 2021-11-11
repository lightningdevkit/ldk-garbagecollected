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
	 * Bad recovery id
	 */
	LDKSecp256k1Error_InvalidRecoveryId,
	/**
	 * Invalid tweak for add_assign or mul_assign
	 */
	LDKSecp256k1Error_InvalidTweak,
	/**
	 * tweak_add_check failed on an xonly public key
	 */
	LDKSecp256k1Error_TweakCheckFailed,
	/**
	 * Didn't pass enough memory to context creation with preallocated memory
	 */
	LDKSecp256k1Error_NotEnoughMemory,
	; static native void init();
	static { init(); }
}