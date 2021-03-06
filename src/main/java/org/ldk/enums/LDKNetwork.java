package org.ldk.enums;

public enum LDKNetwork {
	LDKNetwork_Bitcoin,
	LDKNetwork_Testnet,
	LDKNetwork_Regtest,
	LDKNetwork_Signet,
	; static native void init();
	static { init(); }
}