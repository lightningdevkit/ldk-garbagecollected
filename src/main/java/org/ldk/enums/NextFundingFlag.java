package org.ldk.enums;

/**
 * Bit positions used in [`NextFunding::retransmit_flags`] for requesting message retransmission.
 */
public enum NextFundingFlag {
	/**
	 * Retransmit `commitment_signed`.
	 */
	LDKNextFundingFlag_CommitmentSigned,
	; static native void init();
	static { org.ldk.impl.bindings.run_statics(); init(); }
}