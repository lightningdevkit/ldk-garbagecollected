package org.ldk.enums;

/**
 * Enum representing the crypto currencies (or networks) supported by this library
 */
public enum LDKCurrency {
	LDKCurrency_Bitcoin,
	LDKCurrency_BitcoinTestnet,
	LDKCurrency_Regtest,
	LDKCurrency_Simnet,
	; static native void init();
	static { init(); }
}