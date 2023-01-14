package org.ldk.enums;

/**
 * Describes the type of HTLC claim as determined by analyzing the witness.
 */
public enum HTLCClaim {
	/**
	 * Claims an offered output on a commitment transaction through the timeout path.
	 */
	LDKHTLCClaim_OfferedTimeout,
	/**
	 * Claims an offered output on a commitment transaction through the success path.
	 */
	LDKHTLCClaim_OfferedPreimage,
	/**
	 * Claims an accepted output on a commitment transaction through the timeout path.
	 */
	LDKHTLCClaim_AcceptedTimeout,
	/**
	 * Claims an accepted output on a commitment transaction through the success path.
	 */
	LDKHTLCClaim_AcceptedPreimage,
	/**
	 * Claims an offered/accepted output on a commitment transaction through the revocation path.
	 */
	LDKHTLCClaim_Revocation,
	; static native void init();
	static { init(); }
}