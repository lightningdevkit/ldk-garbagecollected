package org.ldk.enums;

/**
 * An enum representing the possible Bitcoin or test networks which we can run on
 */
public enum Network {
	LDKNetwork_Bitcoin,
	LDKNetwork_Testnet,
	LDKNetwork_Regtest,
	LDKNetwork_Signet,
	; static native void init();
	static { init(); }
}