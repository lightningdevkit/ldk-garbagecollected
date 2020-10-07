package org.ldk.enums;

public enum LDKSecp256k1Error {
   LDKSecp256k1Error_IncorrectSignature,
   LDKSecp256k1Error_InvalidMessage,
   LDKSecp256k1Error_InvalidPublicKey,
   LDKSecp256k1Error_InvalidSignature,
   LDKSecp256k1Error_InvalidSecretKey,
   LDKSecp256k1Error_InvalidRecoveryId,
   LDKSecp256k1Error_InvalidTweak,
   LDKSecp256k1Error_NotEnoughMemory,
   LDKSecp256k1Error_CallbackPanicked,
	; static native void init();
	static { init(); }
}