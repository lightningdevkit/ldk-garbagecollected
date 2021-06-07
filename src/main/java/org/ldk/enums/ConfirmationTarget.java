package org.ldk.enums;

/**
 * An enum that represents the speed at which we want a transaction to confirm used for feerate
 * estimation.
 */
public enum ConfirmationTarget {
	LDKConfirmationTarget_Background,
	LDKConfirmationTarget_Normal,
	LDKConfirmationTarget_HighPriority,
	; static native void init();
	static { init(); }
}