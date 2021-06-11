package org.ldk.enums;

/**
 * Represents an error returned from libsecp256k1 during validation of some secp256k1 data
 */
public enum Secp256k1Error {
	LDKSecp256k1Error_IncorrectSignature,
	LDKSecp256k1Error_InvalidMessage,
	LDKSecp256k1Error_InvalidPublicKey,
	LDKSecp256k1Error_InvalidSignature,
	LDKSecp256k1Error_InvalidSecretKey,
	LDKSecp256k1Error_InvalidRecoveryId,
	LDKSecp256k1Error_InvalidTweak,
	LDKSecp256k1Error_TweakCheckFailed,
	LDKSecp256k1Error_NotEnoughMemory,
	; static native void init();
	static { init(); }
}