package org.ldk.enums;

/**
 * Enum representing the crypto currencies (or networks) supported by this library
 */
public enum Currency {
	/**
	 * Bitcoin mainnet
	 */
	LDKCurrency_Bitcoin,
	/**
	 * Bitcoin testnet
	 */
	LDKCurrency_BitcoinTestnet,
	/**
	 * Bitcoin regtest
	 */
	LDKCurrency_Regtest,
	/**
	 * Bitcoin simnet
	 */
	LDKCurrency_Simnet,
	/**
	 * Bitcoin signet
	 */
	LDKCurrency_Signet,
	; static native void init();
	static { init(); }
}