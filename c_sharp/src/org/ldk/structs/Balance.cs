using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Details about the balance(s) available for spending once the channel appears on chain.
 * 
 * See [`ChannelMonitor::get_claimable_balances`] for more details on when these will or will not
 * be provided.
 */
public class Balance : CommonBase {
	protected Balance(object _dummy, long ptr) : base(ptr) { }
	~Balance() {
		if (ptr != 0) { bindings.Balance_free(ptr); }
	}

	internal static Balance constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKBalance_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Balance_ClaimableOnChannelClose(ptr);
			case 1: return new Balance_ClaimableAwaitingConfirmations(ptr);
			case 2: return new Balance_ContentiousClaimable(ptr);
			case 3: return new Balance_MaybeTimeoutClaimableHTLC(ptr);
			case 4: return new Balance_MaybePreimageClaimableHTLC(ptr);
			case 5: return new Balance_CounterpartyRevokedOutputClaimable(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A Balance of type ClaimableOnChannelClose */
	public class Balance_ClaimableOnChannelClose : Balance {
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
		public HolderCommitmentTransactionBalance[] balance_candidates;
		/**
		 * The index within [`Balance::ClaimableOnChannelClose::balance_candidates`] for the
		 * balance according to the current onchain state of the channel. This can be helpful when
		 * wanting to determine the claimable amount when the holder commitment transaction for the
		 * current funding transaction is broadcast and/or confirms.
		 */
		public long confirmed_balance_candidate_index;
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
		public long outbound_payment_htlc_rounded_msat;
		/**
		 * The amount of millisatoshis which has been burned to fees from HTLCs which are outbound
		 * from us and are related to a forwarded HTLC. This is the sum of the millisatoshis part
		 * of all HTLCs which are otherwise represented by [`Balance::MaybeTimeoutClaimableHTLC`]
		 * with their [`Balance::MaybeTimeoutClaimableHTLC::outbound_payment`] flag *not* set, as
		 * well as any dust HTLCs which would otherwise be represented the same.
		 * 
		 * This amount (rounded up to a whole satoshi value) will not be included in `amount_satoshis`.
		 */
		public long outbound_forwarded_htlc_rounded_msat;
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
		public long inbound_claiming_htlc_rounded_msat;
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
		public long inbound_htlc_rounded_msat;
		internal Balance_ClaimableOnChannelClose(long ptr) : base(null, ptr) {
			long balance_candidates = bindings.LDKBalance_ClaimableOnChannelClose_get_balance_candidates(ptr);
			int balance_candidates_conv_36_len = InternalUtils.getArrayLength(balance_candidates);
			HolderCommitmentTransactionBalance[] balance_candidates_conv_36_arr = new HolderCommitmentTransactionBalance[balance_candidates_conv_36_len];
			for (int k = 0; k < balance_candidates_conv_36_len; k++) {
				long balance_candidates_conv_36 = InternalUtils.getU64ArrayElem(balance_candidates, k);
				org.ldk.structs.HolderCommitmentTransactionBalance balance_candidates_conv_36_hu_conv = null; if (balance_candidates_conv_36 < 0 || balance_candidates_conv_36 > 4096) { balance_candidates_conv_36_hu_conv = new org.ldk.structs.HolderCommitmentTransactionBalance(null, balance_candidates_conv_36); }
				if (balance_candidates_conv_36_hu_conv != null) { balance_candidates_conv_36_hu_conv.ptrs_to.AddLast(this); };
				balance_candidates_conv_36_arr[k] = balance_candidates_conv_36_hu_conv;
			}
			bindings.free_buffer(balance_candidates);
			this.balance_candidates = balance_candidates_conv_36_arr;
			this.confirmed_balance_candidate_index = bindings.LDKBalance_ClaimableOnChannelClose_get_confirmed_balance_candidate_index(ptr);
			this.outbound_payment_htlc_rounded_msat = bindings.LDKBalance_ClaimableOnChannelClose_get_outbound_payment_htlc_rounded_msat(ptr);
			this.outbound_forwarded_htlc_rounded_msat = bindings.LDKBalance_ClaimableOnChannelClose_get_outbound_forwarded_htlc_rounded_msat(ptr);
			this.inbound_claiming_htlc_rounded_msat = bindings.LDKBalance_ClaimableOnChannelClose_get_inbound_claiming_htlc_rounded_msat(ptr);
			this.inbound_htlc_rounded_msat = bindings.LDKBalance_ClaimableOnChannelClose_get_inbound_htlc_rounded_msat(ptr);
		}
	}
	/** A Balance of type ClaimableAwaitingConfirmations */
	public class Balance_ClaimableAwaitingConfirmations : Balance {
		/**
		 * The amount available to claim, in satoshis, possibly excluding the on-chain fees which
		 * were spent in broadcasting the transaction.
		 */
		public long amount_satoshis;
		/**
		 * The height at which an [`Event::SpendableOutputs`] event will be generated for this
		 * amount.
		 */
		public int confirmation_height;
		/**
		 * Whether this balance is a result of cooperative close, a force-close, or an HTLC.
		 */
		public BalanceSource source;
		internal Balance_ClaimableAwaitingConfirmations(long ptr) : base(null, ptr) {
			this.amount_satoshis = bindings.LDKBalance_ClaimableAwaitingConfirmations_get_amount_satoshis(ptr);
			this.confirmation_height = bindings.LDKBalance_ClaimableAwaitingConfirmations_get_confirmation_height(ptr);
			this.source = bindings.LDKBalance_ClaimableAwaitingConfirmations_get_source(ptr);
		}
	}
	/** A Balance of type ContentiousClaimable */
	public class Balance_ContentiousClaimable : Balance {
		/**
		 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
		 * required to do so.
		 */
		public long amount_satoshis;
		/**
		 * The height at which the counterparty may be able to claim the balance if we have not
		 * done so.
		 */
		public int timeout_height;
		/**
		 * The payment hash that locks this HTLC.
		 */
		public byte[] payment_hash;
		/**
		 * The preimage that can be used to claim this HTLC.
		 */
		public byte[] payment_preimage;
		internal Balance_ContentiousClaimable(long ptr) : base(null, ptr) {
			this.amount_satoshis = bindings.LDKBalance_ContentiousClaimable_get_amount_satoshis(ptr);
			this.timeout_height = bindings.LDKBalance_ContentiousClaimable_get_timeout_height(ptr);
			long payment_hash = bindings.LDKBalance_ContentiousClaimable_get_payment_hash(ptr);
			byte[] payment_hash_conv = InternalUtils.decodeUint8Array(payment_hash);
			this.payment_hash = payment_hash_conv;
			long payment_preimage = bindings.LDKBalance_ContentiousClaimable_get_payment_preimage(ptr);
			byte[] payment_preimage_conv = InternalUtils.decodeUint8Array(payment_preimage);
			this.payment_preimage = payment_preimage_conv;
		}
	}
	/** A Balance of type MaybeTimeoutClaimableHTLC */
	public class Balance_MaybeTimeoutClaimableHTLC : Balance {
		/**
		 * The amount potentially available to claim, in satoshis, excluding the on-chain fees
		 * which will be required to do so.
		 */
		public long amount_satoshis;
		/**
		 * The height at which we will be able to claim the balance if our counterparty has not
		 * done so.
		 */
		public int claimable_height;
		/**
		 * The payment hash whose preimage our counterparty needs to claim this HTLC.
		 */
		public byte[] payment_hash;
		/**
		 * Whether this HTLC represents a payment which was sent outbound from us. Otherwise it
		 * represents an HTLC which was forwarded (and should, thus, have a corresponding inbound
		 * edge on another channel).
		 */
		public bool outbound_payment;
		internal Balance_MaybeTimeoutClaimableHTLC(long ptr) : base(null, ptr) {
			this.amount_satoshis = bindings.LDKBalance_MaybeTimeoutClaimableHTLC_get_amount_satoshis(ptr);
			this.claimable_height = bindings.LDKBalance_MaybeTimeoutClaimableHTLC_get_claimable_height(ptr);
			long payment_hash = bindings.LDKBalance_MaybeTimeoutClaimableHTLC_get_payment_hash(ptr);
			byte[] payment_hash_conv = InternalUtils.decodeUint8Array(payment_hash);
			this.payment_hash = payment_hash_conv;
			this.outbound_payment = bindings.LDKBalance_MaybeTimeoutClaimableHTLC_get_outbound_payment(ptr);
		}
	}
	/** A Balance of type MaybePreimageClaimableHTLC */
	public class Balance_MaybePreimageClaimableHTLC : Balance {
		/**
		 * The amount potentially available to claim, in satoshis, excluding the on-chain fees
		 * which will be required to do so.
		 */
		public long amount_satoshis;
		/**
		 * The height at which our counterparty will be able to claim the balance if we have not
		 * yet received the preimage and claimed it ourselves.
		 */
		public int expiry_height;
		/**
		 * The payment hash whose preimage we need to claim this HTLC.
		 */
		public byte[] payment_hash;
		internal Balance_MaybePreimageClaimableHTLC(long ptr) : base(null, ptr) {
			this.amount_satoshis = bindings.LDKBalance_MaybePreimageClaimableHTLC_get_amount_satoshis(ptr);
			this.expiry_height = bindings.LDKBalance_MaybePreimageClaimableHTLC_get_expiry_height(ptr);
			long payment_hash = bindings.LDKBalance_MaybePreimageClaimableHTLC_get_payment_hash(ptr);
			byte[] payment_hash_conv = InternalUtils.decodeUint8Array(payment_hash);
			this.payment_hash = payment_hash_conv;
		}
	}
	/** A Balance of type CounterpartyRevokedOutputClaimable */
	public class Balance_CounterpartyRevokedOutputClaimable : Balance {
		/**
		 * The amount, in satoshis, of the output which we can claim.
		 * 
		 * Note that for outputs from HTLC balances this may be excluding some on-chain fees that
		 * were already spent.
		 */
		public long amount_satoshis;
		internal Balance_CounterpartyRevokedOutputClaimable(long ptr) : base(null, ptr) {
			this.amount_satoshis = bindings.LDKBalance_CounterpartyRevokedOutputClaimable_get_amount_satoshis(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.Balance_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the Balance
	 */
	public org.ldk.structs.Balance clone() {
		long ret = bindings.Balance_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ClaimableOnChannelClose-variant Balance
	 */
	public static org.ldk.structs.Balance claimable_on_channel_close(HolderCommitmentTransactionBalance[] balance_candidates, long confirmed_balance_candidate_index, long outbound_payment_htlc_rounded_msat, long outbound_forwarded_htlc_rounded_msat, long inbound_claiming_htlc_rounded_msat, long inbound_htlc_rounded_msat) {
		long ret = bindings.Balance_claimable_on_channel_close(InternalUtils.encodeUint64Array(InternalUtils.mapArray(balance_candidates, balance_candidates_conv_36 => balance_candidates_conv_36.ptr)), confirmed_balance_candidate_index, outbound_payment_htlc_rounded_msat, outbound_forwarded_htlc_rounded_msat, inbound_claiming_htlc_rounded_msat, inbound_htlc_rounded_msat);
		GC.KeepAlive(balance_candidates);
		GC.KeepAlive(confirmed_balance_candidate_index);
		GC.KeepAlive(outbound_payment_htlc_rounded_msat);
		GC.KeepAlive(outbound_forwarded_htlc_rounded_msat);
		GC.KeepAlive(inbound_claiming_htlc_rounded_msat);
		GC.KeepAlive(inbound_htlc_rounded_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ClaimableAwaitingConfirmations-variant Balance
	 */
	public static org.ldk.structs.Balance claimable_awaiting_confirmations(long amount_satoshis, int confirmation_height, BalanceSource source) {
		long ret = bindings.Balance_claimable_awaiting_confirmations(amount_satoshis, confirmation_height, source);
		GC.KeepAlive(amount_satoshis);
		GC.KeepAlive(confirmation_height);
		GC.KeepAlive(source);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ContentiousClaimable-variant Balance
	 */
	public static org.ldk.structs.Balance contentious_claimable(long amount_satoshis, int timeout_height, byte[] payment_hash, byte[] payment_preimage) {
		long ret = bindings.Balance_contentious_claimable(amount_satoshis, timeout_height, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)), InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_preimage, 32)));
		GC.KeepAlive(amount_satoshis);
		GC.KeepAlive(timeout_height);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(payment_preimage);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MaybeTimeoutClaimableHTLC-variant Balance
	 */
	public static org.ldk.structs.Balance maybe_timeout_claimable_htlc(long amount_satoshis, int claimable_height, byte[] payment_hash, bool outbound_payment) {
		long ret = bindings.Balance_maybe_timeout_claimable_htlc(amount_satoshis, claimable_height, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)), outbound_payment);
		GC.KeepAlive(amount_satoshis);
		GC.KeepAlive(claimable_height);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(outbound_payment);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MaybePreimageClaimableHTLC-variant Balance
	 */
	public static org.ldk.structs.Balance maybe_preimage_claimable_htlc(long amount_satoshis, int expiry_height, byte[] payment_hash) {
		long ret = bindings.Balance_maybe_preimage_claimable_htlc(amount_satoshis, expiry_height, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_hash, 32)));
		GC.KeepAlive(amount_satoshis);
		GC.KeepAlive(expiry_height);
		GC.KeepAlive(payment_hash);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyRevokedOutputClaimable-variant Balance
	 */
	public static org.ldk.structs.Balance counterparty_revoked_output_claimable(long amount_satoshis) {
		long ret = bindings.Balance_counterparty_revoked_output_claimable(amount_satoshis);
		GC.KeepAlive(amount_satoshis);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Balance ret_hu_conv = org.ldk.structs.Balance.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two Balances contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.Balance b) {
		bool ret = bindings.Balance_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is Balance)) return false;
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
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
