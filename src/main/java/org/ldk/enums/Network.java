package org.ldk.enums;

/**
 * An enum representing the possible Bitcoin or test networks which we can run on
 */
public enum Network {
	/**
	 * The main Bitcoin blockchain.
	 */
	LDKNetwork_Bitcoin,
	/**
	 * The testnet3 blockchain.
	 */
	LDKNetwork_Testnet3,
	/**
	 * The testnet4 blockchain.
	 */
	LDKNetwork_Testnet4,
	/**
	 * A local test blockchain.
	 */
	LDKNetwork_Regtest,
	/**
	 * A blockchain on which blocks are signed instead of mined.
	 */
	LDKNetwork_Signet,
	; static native void init();
	static { org.ldk.impl.bindings.run_statics(); init(); }
}