package org.ldk.enums;

/**
 * Enum representing the crypto currencies (or networks) supported by this library
 */
public enum Currency {
	LDKCurrency_Bitcoin,
	LDKCurrency_BitcoinTestnet,
	LDKCurrency_Regtest,
	LDKCurrency_Simnet,
	LDKCurrency_Signet,
	; static native void init();
	static { init(); }
}