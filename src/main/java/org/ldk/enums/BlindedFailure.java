package org.ldk.enums;

/**
 * Whether this blinded HTLC is being failed backwards by the introduction node or a blinded node,
 * which determines the failure message that should be used.
 */
public enum BlindedFailure {
	/**
	 * This HTLC is being failed backwards by the introduction node, and thus should be failed with
	 * [`msgs::UpdateFailHTLC`] and error code `0x8000|0x4000|24`.
	 */
	LDKBlindedFailure_FromIntroductionNode,
	/**
	 * This HTLC is being failed backwards by a blinded node within the path, and thus should be
	 * failed with [`msgs::UpdateFailMalformedHTLC`] and error code `0x8000|0x4000|24`.
	 */
	LDKBlindedFailure_FromBlindedNode,
	; static native void init();
	static { org.ldk.impl.bindings.run_statics(); init(); }
}