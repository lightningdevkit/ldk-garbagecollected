package org.ldk.enums;

/**
 * An error when accessing the chain via [`Access`].
 */
public enum AccessError {
	/**
	 * The requested chain is unknown.
	 */
	LDKAccessError_UnknownChain,
	/**
	 * The requested transaction doesn't exist or hasn't confirmed.
	 */
	LDKAccessError_UnknownTx,
	; static native void init();
	static { init(); }
}