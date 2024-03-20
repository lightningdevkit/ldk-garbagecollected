package org.ldk.enums;

/**
 * An error when accessing the chain via [`UtxoLookup`].
 */
public enum UtxoLookupError {
	/**
	 * The requested chain is unknown.
	 */
	LDKUtxoLookupError_UnknownChain,
	/**
	 * The requested transaction doesn't exist or hasn't confirmed.
	 */
	LDKUtxoLookupError_UnknownTx,
	; static native void init();
	static { org.ldk.impl.bindings.run_statics(); init(); }
}