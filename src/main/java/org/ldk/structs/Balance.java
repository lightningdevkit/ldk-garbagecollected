package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Details about the balance(s) available for spending once the channel appears on chain.
 * 
 * See [`ChannelMonitor::get_claimable_balances`] for more details on when these will or will not
 * be provided.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Balance extends CommonBase {
	private Balance(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.Balance_free(ptr); }
	}
	static Balance constr_from_ptr(long ptr) {
		bindings.LDKBalance raw_val = bindings.LDKBalance_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKBalance.ClaimableOnChannelClose.class) {
			return new ClaimableOnChannelClose(ptr, (bindings.LDKBalance.ClaimableOnChannelClose)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBalance.ClaimableAwaitingConfirmations.class) {
			return new ClaimableAwaitingConfirmations(ptr, (bindings.LDKBalance.ClaimableAwaitingConfirmations)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBalance.ContentiousClaimable.class) {
			return new ContentiousClaimable(ptr, (bindings.LDKBalance.ContentiousClaimable)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBalance.MaybeTimeoutClaimableHTLC.class) {
			return new MaybeTimeoutClaimableHTLC(ptr, (bindings.LDKBalance.MaybeTimeoutClaimableHTLC)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBalance.MaybePreimageClaimableHTLC.class) {
			return new MaybePreimageClaimableHTLC(ptr, (bindings.LDKBalance.MaybePreimageClaimableHTLC)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKBalance.CounterpartyRevokedOutputClaimable.class) {
			return new CounterpartyRevokedOutputClaimable(ptr, (bindings.LDKBalance.CounterpartyRevokedOutputClaimable)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * The channel is not yet closed (or the commitment or closing transaction has not yet
	 * appeared in a block).
	 */
	public final static class ClaimableOnChannelClose extends Balance {
		/**
		 * A list of balance candidates based on the latest set of valid holder commitment
		 * transactions that can hit the chain. Typically, a channel only has one valid holder
		 * commitment transaction that spends the current funding output. As soon as a channel is
		 * spliced, an alternative holder commitment transaction exists spending the new funding
		 * output. More alternative holder commitment transactions can exist as the splice remains
		 * pending and RBF attempts are made.
		 * 
		 * The candidates are sorted by the order in which the holder commitment transactions were
		 * negotiated. When only one candidate exists, the channel does not have a splice pending.
		 * When multiple candidates exist, the last one reflects the balance of the
		 * latest splice/RBF attempt, while the first reflects the balance prior to the splice
		 * occurring.
		 * 
		 * Entries remain in this vec until the pending splice has reached [`ANTI_REORG_DELAY`]
		 * confirmations, at which point any conflicts will be removed. Once a splice confirms
		 * [`Self::ClaimableOnChannelClose::confirmed_balance_candidate_index`] will point to the
		 * confirmed entry, even if it has fewer than [`ANTI_REORG_DELAY`] confirmations.
		*/
		public final HolderCommitmentTransactionBalance[] balance_candidates;
		/**
		 * The index within [`Balance::ClaimableOnChannelClose::balance_candidates`] for the
		 * balance according to the current onchain state of the channel. This can be helpful when
		 * wanting to determine the claimable amount when the holder commitment transaction for the
		 * current funding transaction is broadcast and/or confirms.
		*/
		public final long confirmed_balance_candidate_index;
		/**
		 * The amount of millisatoshis which has been burned to fees from HTLCs which are outbound
		 * from us and are related to a payment which was sent by us. This is the sum of the
		 * millisatoshis part of all HTLCs which are otherwise represented by
		 * [`Balance::MaybeTimeoutClaimableHTLC`] with their
		 * [`Balance::MaybeTimeoutClaimableHTLC::outbound_payment`] flag set, as well as any dust
		 * HTLCs which would otherwise be represented the same.
		 * 
		 * This amount (rounded up to a whole satoshi value) will not be included in `amount_satoshis`.
		*/
		public final long outbound_payment_htlc_rounded_msat;
		/**
		 * The amount of millisatoshis which has been burned to fees from HTLCs which are outbound
		 * from us and are related to a forwarded HTLC. This is the sum of the millisatoshis part
		 * of all HTLCs which are otherwise represented by [`Balance::MaybeTimeoutClaimableHTLC`]
		 * with their [`Balance::MaybeTimeoutClaimableHTLC::outbound_payment`] flag *not* set, as
		 * well as any dust HTLCs which would otherwise be represented the same.
		 * 
		 * This amount (rounded up to a whole satoshi value) will not be included in `amount_satoshis`.
		*/
		public final long outbound_forwarded_htlc_rounded_msat;
		/**
		 * The amount of millisatoshis which has been burned to fees from HTLCs which are inbound
		 * to us and for which we know the preimage. This is the sum of the millisatoshis part of
		 * all HTLCs which would be represented by [`Balance::ContentiousClaimable`] on channel
		 * close, but whose current value is included in
		 * [`HolderCommitmentTransactionBalance::amount_satoshis`], as well as any dust HTLCs which
		 * would otherwise be represented the same.
		 * 
		 * This amount (rounded up to a whole satoshi value) will not be included in the counterparty's
		 * `amount_satoshis`.
		*/
		public final long inbound_claiming_htlc_rounded_msat;
		/**
		 * The amount of millisatoshis which has been burned to fees from HTLCs which are inbound
		 * to us and for which we do not know the preimage. This is the sum of the millisatoshis
		 * part of all HTLCs which would be represented by [`Balance::MaybePreimageClaimableHTLC`]
		 * on channel close, as well as any dust HTLCs which would otherwise be represented the
		 * same.
		 * 
		 * This amount (rounded up to a whole satoshi value) will not be included in the counterparty's
		 * `amount_satoshis`.
		*/
		public final long inbound_htlc_rounded_msat;
		private ClaimableOnChannelClose(long ptr, bindings.LDKBalance.ClaimableOnChannelClose obj) {
			super(null, ptr);
			long[] balance_candidates = obj.balance_candidates;
			int balance_candidates_conv_36_len = balance_candidates.length;
			HolderCommitmentTransactionBalance[] balance_candidates_conv_36_arr = new HolderCommitmentTransactionBalance[balance_candidates_conv_36_len];
			for (int k = 0; k < balance_candidates_conv_36_len; k++) {
				long balance_candidates_conv_36 = balance_candidates[k];
				org.ldk.structs.HolderCommitmentTransactionBalance balance_candidates_conv_36_hu_conv = null; if (balance_candidates_conv_36 < 0 || balance_candidates_conv_36 > 4096) { balance_candidates_conv_36_hu_conv = new org.ldk.structs.HolderCommitmentTransactionBalance(null, balance_candidates_conv_36); }
				if (balance_candidates_conv_36_hu_conv != null) { balance_candidates_conv_36_hu_conv.ptrs_to.add(this); };
				balance_candidates_conv_36_arr[k] = balance_candidates_conv_36_hu_conv;
			}
			this.balance_candidates = balance_candidates_conv_36_arr;
			this.confirmed_balance_candidate_index = obj.confirmed_balance_candidate_index;
			this.outbound_payment_htlc_rounded_msat = obj.outbound_payment_htlc_rounded_msat;
			this.outbound_forwarded_htlc_rounded_msat = obj.outbound_forwarded_htlc_rounded_msat;
			this.inbound_claiming_htlc_rounded_msat = obj.inbound_claiming_htlc_rounded_msat;
			this.inbound_htlc_rounded_msat = obj.inbound_htlc_rounded_msat;
		}
	}
	/**
	 * The channel has been closed, and the given balance is ours but awaiting confirmations until
	 * we consider it spendable.
	 */
	public final static class ClaimableAwaitingConfirmations extends Balance {
		/**
		 * The amount available to claim, in satoshis, possibly excluding the on-chain fees which
		 * were spent in broadcasting the transaction.
		*/
		public final long amount_satoshis;
		/**
		 * The height at which an [`Event::SpendableOutputs`] event will be generated for this
		 * amount.
		*/
		public final int confirmation_height;
		/**
		 * Whether this balance is a result of cooperative close, a force-close, or an HTLC.
		*/
		public final org.ldk.enums.BalanceSource source;
		private ClaimableAwaitingConfirmations(long ptr, bindings.LDKBalance.ClaimableAwaitingConfirmations obj) {
			super(null, ptr);
			this.amount_satoshis = obj.amount_satoshis;
			this.confirmation_height = obj.confirmation_height;
			this.source = obj.source;
		}
	}
	/**
	 * The channel has been closed, and the given balance should be ours but awaiting spending
	 * transaction confirmation. If the spending transaction does not confirm in time, it is
	 * possible our counterparty can take the funds by broadcasting an HTLC timeout on-chain.
	 * 
	 * Once the spending transaction confirms, before it has reached enough confirmations to be
	 * considered safe from chain reorganizations, the balance will instead be provided via
	 * [`Balance::ClaimableAwaitingConfirmations`].
	 */
	public final static class ContentiousClaimable extends Balance {
		/**
		 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
		 * required to do so.
		*/
		public final long amount_satoshis;
		/**
		 * The height at which the counterparty may be able to claim the balance if we have not
		 * done so.
		*/
		public final int timeout_height;
		/**
		 * The payment hash that locks this HTLC.
		*/
		public final byte[] payment_hash;
		/**
		 * The preimage that can be used to claim this HTLC.
		*/
		public final byte[] payment_preimage;
		private ContentiousClaimable(long ptr, bindings.LDKBalance.ContentiousClaimable obj) {
			super(null, ptr);
			this.amount_satoshis = obj.amount_satoshis;
			this.timeout_height = obj.timeout_height;
			this.payment_hash = obj.payment_hash;
			this.payment_preimage = obj.payment_preimage;
		}
	}
	/**
	 * HTLCs which we sent to our counterparty which are claimable after a timeout (less on-chain
	 * fees) if the counterparty does not know the preimage for the HTLCs. These are somewhat
	 * likely to be claimed by our counterparty before we do.
	 */
	public final static class MaybeTimeoutClaimableHTLC extends Balance {
		/**
		 * The amount potentially available to claim, in satoshis, excluding the on-chain fees
		 * which will be required to do so.
		*/
		public final long amount_satoshis;
		/**
		 * The height at which we will be able to claim the balance if our counterparty has not
		 * done so.
		*/
		public final int claimable_height;
		/**
		 * The payment hash whose preimage our counterparty needs to claim this HTLC.
		*/
		public final byte[] payment_hash;
		/**
		 * Whether this HTLC represents a payment which was sent outbound from us. Otherwise it
		 * represents an HTLC which was forwarded (and should, thus, have a corresponding inbound
		 * edge on another channel).
		*/
		public final boolean outbound_payment;
		private MaybeTimeoutClaimableHTLC(long ptr, bindings.LDKBalance.MaybeTimeoutClaimableHTLC obj) {
			super(null, ptr);
			this.amount_satoshis = obj.amount_satoshis;
			this.claimable_height = obj.claimable_height;
			this.payment_hash = obj.payment_hash;
			this.outbound_payment = obj.outbound_payment;
		}
	}
	/**
	 * HTLCs which we received from our counterparty which are claimable with a preimage which we
	 * do not currently have. This will only be claimable if we receive the preimage from the node
	 * to which we forwarded this HTLC before the timeout.
	 */
	public final static class MaybePreimageClaimableHTLC extends Balance {
		/**
		 * The amount potentially available to claim, in satoshis, excluding the on-chain fees
		 * which will be required to do so.
		*/
		public final long amount_satoshis;
		/**
		 * The height at which our counterparty will be able to claim the balance if we have not
		 * yet received the preimage and claimed it ourselves.
		*/
		public final int expiry_height;
		/**
		 * The payment hash whose preimage we need to claim this HTLC.
		*/
		public final byte[] payment_hash;
		private MaybePreimageClaimableHTLC(long ptr, bindings.LDKBalance.MaybePreimageClaimableHTLC obj) {
			super(null, ptr);
			this.amount_satoshis = obj.amount_satoshis;
			this.expiry_height = obj.expiry_height;
			this.payment_hash = obj.payment_hash;
		}
	}
	/**
	 * The channel has been closed, and our counterparty broadcasted a revoked commitment
	 * transaction.
	 * 
	 * Thus, we're able to claim all outputs in the commitment transaction, one of which has the
	 * following amount.
	 */
	public final static class CounterpartyRevokedOutputClaimable extends Balance {
		/**
		 * The amount, in satoshis, of the output which we can claim.
		 * 
		 * Note that for outputs from HTLC balances this may be excluding some on-chain fees that
		 * were already spent.
		*/
		public final long amount_satoshis;
		private CounterpartyRevokedOutputClaimable(long ptr, bindings.LDKBalance.CounterpartyRevokedOutputClaimable obj) {
			super(null, ptr);
			this.amount_satoshis = obj.amount_satoshis;
		}
	}
	long clone_ptr() {
		long ret = bindings.Balance_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the Balance
	 */
	public Balance clone() {
		long ret = bindings.Balance_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ClaimableOnChannelClose-variant Balance
	 */
	public static Balance claimable_on_channel_close(HolderCommitmentTransactionBalance[] balance_candidates, long confirmed_balance_candidate_index, long outbound_payment_htlc_rounded_msat, long outbound_forwarded_htlc_rounded_msat, long inbound_claiming_htlc_rounded_msat, long inbound_htlc_rounded_msat) {
		long ret = bindings.Balance_claimable_on_channel_close(balance_candidates != null ? Arrays.stream(balance_candidates).mapToLong(balance_candidates_conv_36 -> balance_candidates_conv_36.ptr).toArray() : null, confirmed_balance_candidate_index, outbound_payment_htlc_rounded_msat, outbound_forwarded_htlc_rounded_msat, inbound_claiming_htlc_rounded_msat, inbound_htlc_rounded_msat);
		Reference.reachabilityFence(balance_candidates);
		Reference.reachabilityFence(confirmed_balance_candidate_index);
		Reference.reachabilityFence(outbound_payment_htlc_rounded_msat);
		Reference.reachabilityFence(outbound_forwarded_htlc_rounded_msat);
		Reference.reachabilityFence(inbound_claiming_htlc_rounded_msat);
		Reference.reachabilityFence(inbound_htlc_rounded_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ClaimableAwaitingConfirmations-variant Balance
	 */
	public static Balance claimable_awaiting_confirmations(long amount_satoshis, int confirmation_height, org.ldk.enums.BalanceSource source) {
		long ret = bindings.Balance_claimable_awaiting_confirmations(amount_satoshis, confirmation_height, source);
		Reference.reachabilityFence(amount_satoshis);
		Reference.reachabilityFence(confirmation_height);
		Reference.reachabilityFence(source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ContentiousClaimable-variant Balance
	 */
	public static Balance contentious_claimable(long amount_satoshis, int timeout_height, byte[] payment_hash, byte[] payment_preimage) {
		long ret = bindings.Balance_contentious_claimable(amount_satoshis, timeout_height, InternalUtils.check_arr_len(payment_hash, 32), InternalUtils.check_arr_len(payment_preimage, 32));
		Reference.reachabilityFence(amount_satoshis);
		Reference.reachabilityFence(timeout_height);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(payment_preimage);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MaybeTimeoutClaimableHTLC-variant Balance
	 */
	public static Balance maybe_timeout_claimable_htlc(long amount_satoshis, int claimable_height, byte[] payment_hash, boolean outbound_payment) {
		long ret = bindings.Balance_maybe_timeout_claimable_htlc(amount_satoshis, claimable_height, InternalUtils.check_arr_len(payment_hash, 32), outbound_payment);
		Reference.reachabilityFence(amount_satoshis);
		Reference.reachabilityFence(claimable_height);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(outbound_payment);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MaybePreimageClaimableHTLC-variant Balance
	 */
	public static Balance maybe_preimage_claimable_htlc(long amount_satoshis, int expiry_height, byte[] payment_hash) {
		long ret = bindings.Balance_maybe_preimage_claimable_htlc(amount_satoshis, expiry_height, InternalUtils.check_arr_len(payment_hash, 32));
		Reference.reachabilityFence(amount_satoshis);
		Reference.reachabilityFence(expiry_height);
		Reference.reachabilityFence(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyRevokedOutputClaimable-variant Balance
	 */
	public static Balance counterparty_revoked_output_claimable(long amount_satoshis) {
		long ret = bindings.Balance_counterparty_revoked_output_claimable(amount_satoshis);
		Reference.reachabilityFence(amount_satoshis);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Balances contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.Balance b) {
		boolean ret = bindings.Balance_eq(this.ptr, b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof Balance)) return false;
		return this.eq((Balance)o);
	}
	/**
	 * The amount claimable, in satoshis.
	 * 
	 * When the channel has yet to close, this returns the balance we expect to claim from the
	 * channel. This may change throughout the lifetime of the channel due to payments, but also
	 * due to splicing. If there's a pending splice, this will return the balance we expect to have
	 * assuming the latest negotiated splice confirms. However, if one of the negotiated splice
	 * transactions has already confirmed but is not yet locked, this reports the corresponding
	 * balance for said splice transaction instead.
	 * 
	 * For outbound payments, this excludes the balance from the possible HTLC timeout.
	 * 
	 * For forwarded payments, this includes the balance from the possible HTLC timeout as
	 * (to be conservative) that balance does not include routing fees we'd earn if we'd claim
	 * the balance from a preimage in a successful forward.
	 * 
	 * For more information on these balances see [`Balance::MaybeTimeoutClaimableHTLC`] and
	 * [`Balance::MaybePreimageClaimableHTLC`].
	 * 
	 * On-chain fees required to claim the balance are not included in this amount.
	 */
	public long claimable_amount_satoshis() {
		long ret = bindings.Balance_claimable_amount_satoshis(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
