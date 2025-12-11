package org.ldk.enums;

/**
 * Bit positions used in [`FundingLocked::retransmit_flags`] for requesting message retransmission.
 */
public enum FundingLockedFlags {
	/**
	 * Retransmit `announcement_signatures`.
	 */
	LDKFundingLockedFlags_AnnouncementSignatures,
	; static native void init();
	static { org.ldk.impl.bindings.run_statics(); init(); }
}