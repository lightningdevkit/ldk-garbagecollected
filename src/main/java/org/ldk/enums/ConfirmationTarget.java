package org.ldk.enums;

/**
 * An enum that represents the priority at which we want a transaction to confirm used for feerate
 * estimation.
 */
public enum ConfirmationTarget {
	/**
	 * We'd like a transaction to confirm in the future, but don't want to commit most of the fees
	 * required to do so yet. The remaining fees will come via a Child-Pays-For-Parent (CPFP) fee
	 * bump of the transaction.
	 * 
	 * The feerate returned should be the absolute minimum feerate required to enter most node
	 * mempools across the network. Note that if you are not able to obtain this feerate estimate,
	 * you should likely use the furthest-out estimate allowed by your fee estimator.
	 */
	LDKConfirmationTarget_MempoolMinimum,
	/**
	 * We are happy with a transaction confirming slowly, at least within a day or so worth of
	 * blocks.
	 */
	LDKConfirmationTarget_Background,
	/**
	 * We'd like a transaction to confirm without major delayed, i.e., within the next 12-24 blocks.
	 */
	LDKConfirmationTarget_Normal,
	/**
	 * We'd like a transaction to confirm in the next few blocks.
	 */
	LDKConfirmationTarget_HighPriority,
	; static native void init();
	static { init(); }
}