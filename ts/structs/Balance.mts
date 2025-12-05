
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Details about the balance(s) available for spending once the channel appears on chain.
 * 
 * See [`ChannelMonitor::get_claimable_balances`] for more details on when these will or will not
 * be provided.
 */
export class Balance extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.Balance_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): Balance {
		const raw_ty: number = bindings.LDKBalance_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new Balance_ClaimableOnChannelClose(ptr);
			case 1: return new Balance_ClaimableAwaitingConfirmations(ptr);
			case 2: return new Balance_ContentiousClaimable(ptr);
			case 3: return new Balance_MaybeTimeoutClaimableHTLC(ptr);
			case 4: return new Balance_MaybePreimageClaimableHTLC(ptr);
			case 5: return new Balance_CounterpartyRevokedOutputClaimable(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Balance_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Balance
	 */
	public clone(): Balance {
		const ret: bigint = bindings.Balance_clone(this.ptr);
		const ret_hu_conv: Balance = Balance.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ClaimableOnChannelClose-variant Balance
	 */
	public static constructor_claimable_on_channel_close(balance_candidates: HolderCommitmentTransactionBalance[], confirmed_balance_candidate_index: number, outbound_payment_htlc_rounded_msat: bigint, outbound_forwarded_htlc_rounded_msat: bigint, inbound_claiming_htlc_rounded_msat: bigint, inbound_htlc_rounded_msat: bigint): Balance {
		const ret: bigint = bindings.Balance_claimable_on_channel_close(bindings.encodeUint64Array(balance_candidates.map(balance_candidates_conv_36 => CommonBase.get_ptr_of(balance_candidates_conv_36))), confirmed_balance_candidate_index, outbound_payment_htlc_rounded_msat, outbound_forwarded_htlc_rounded_msat, inbound_claiming_htlc_rounded_msat, inbound_htlc_rounded_msat);
		const ret_hu_conv: Balance = Balance.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ClaimableAwaitingConfirmations-variant Balance
	 */
	public static constructor_claimable_awaiting_confirmations(amount_satoshis: bigint, confirmation_height: number, source: BalanceSource): Balance {
		const ret: bigint = bindings.Balance_claimable_awaiting_confirmations(amount_satoshis, confirmation_height, source);
		const ret_hu_conv: Balance = Balance.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ContentiousClaimable-variant Balance
	 */
	public static constructor_contentious_claimable(amount_satoshis: bigint, timeout_height: number, payment_hash: Uint8Array, payment_preimage: Uint8Array): Balance {
		const ret: bigint = bindings.Balance_contentious_claimable(amount_satoshis, timeout_height, bindings.encodeUint8Array(payment_hash), bindings.encodeUint8Array(payment_preimage));
		const ret_hu_conv: Balance = Balance.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MaybeTimeoutClaimableHTLC-variant Balance
	 */
	public static constructor_maybe_timeout_claimable_htlc(amount_satoshis: bigint, claimable_height: number, payment_hash: Uint8Array, outbound_payment: boolean): Balance {
		const ret: bigint = bindings.Balance_maybe_timeout_claimable_htlc(amount_satoshis, claimable_height, bindings.encodeUint8Array(payment_hash), outbound_payment);
		const ret_hu_conv: Balance = Balance.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new MaybePreimageClaimableHTLC-variant Balance
	 */
	public static constructor_maybe_preimage_claimable_htlc(amount_satoshis: bigint, expiry_height: number, payment_hash: Uint8Array): Balance {
		const ret: bigint = bindings.Balance_maybe_preimage_claimable_htlc(amount_satoshis, expiry_height, bindings.encodeUint8Array(payment_hash));
		const ret_hu_conv: Balance = Balance.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new CounterpartyRevokedOutputClaimable-variant Balance
	 */
	public static constructor_counterparty_revoked_output_claimable(amount_satoshis: bigint): Balance {
		const ret: bigint = bindings.Balance_counterparty_revoked_output_claimable(amount_satoshis);
		const ret_hu_conv: Balance = Balance.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Balances contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: Balance): boolean {
		const ret: boolean = bindings.Balance_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
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
	public claimable_amount_satoshis(): bigint {
		const ret: bigint = bindings.Balance_claimable_amount_satoshis(this.ptr);
		return ret;
	}

}
/** A Balance of type ClaimableOnChannelClose */
export class Balance_ClaimableOnChannelClose extends Balance {
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
	public balance_candidates: HolderCommitmentTransactionBalance[];
	/**
	 * The index within [`Balance::ClaimableOnChannelClose::balance_candidates`] for the
	 * balance according to the current onchain state of the channel. This can be helpful when
	 * wanting to determine the claimable amount when the holder commitment transaction for the
	 * current funding transaction is broadcast and/or confirms.
	 */
	public confirmed_balance_candidate_index: number;
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
	public outbound_payment_htlc_rounded_msat: bigint;
	/**
	 * The amount of millisatoshis which has been burned to fees from HTLCs which are outbound
	 * from us and are related to a forwarded HTLC. This is the sum of the millisatoshis part
	 * of all HTLCs which are otherwise represented by [`Balance::MaybeTimeoutClaimableHTLC`]
	 * with their [`Balance::MaybeTimeoutClaimableHTLC::outbound_payment`] flag *not* set, as
	 * well as any dust HTLCs which would otherwise be represented the same.
	 * 
	 * This amount (rounded up to a whole satoshi value) will not be included in `amount_satoshis`.
	 */
	public outbound_forwarded_htlc_rounded_msat: bigint;
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
	public inbound_claiming_htlc_rounded_msat: bigint;
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
	public inbound_htlc_rounded_msat: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const balance_candidates: number = bindings.LDKBalance_ClaimableOnChannelClose_get_balance_candidates(ptr);
		const balance_candidates_conv_36_len: number = bindings.getArrayLength(balance_candidates);
			const balance_candidates_conv_36_arr: HolderCommitmentTransactionBalance[] = new Array(balance_candidates_conv_36_len).fill(null);
			for (var k = 0; k < balance_candidates_conv_36_len; k++) {
				const balance_candidates_conv_36: bigint = bindings.getU64ArrayElem(balance_candidates, k);
				const balance_candidates_conv_36_hu_conv: HolderCommitmentTransactionBalance = new HolderCommitmentTransactionBalance(null, balance_candidates_conv_36);
				CommonBase.add_ref_from(balance_candidates_conv_36_hu_conv, this);
				balance_candidates_conv_36_arr[k] = balance_candidates_conv_36_hu_conv;
			}
			bindings.freeWasmMemory(balance_candidates)
		this.balance_candidates = balance_candidates_conv_36_arr;
		this.confirmed_balance_candidate_index = bindings.LDKBalance_ClaimableOnChannelClose_get_confirmed_balance_candidate_index(ptr);
		this.outbound_payment_htlc_rounded_msat = bindings.LDKBalance_ClaimableOnChannelClose_get_outbound_payment_htlc_rounded_msat(ptr);
		this.outbound_forwarded_htlc_rounded_msat = bindings.LDKBalance_ClaimableOnChannelClose_get_outbound_forwarded_htlc_rounded_msat(ptr);
		this.inbound_claiming_htlc_rounded_msat = bindings.LDKBalance_ClaimableOnChannelClose_get_inbound_claiming_htlc_rounded_msat(ptr);
		this.inbound_htlc_rounded_msat = bindings.LDKBalance_ClaimableOnChannelClose_get_inbound_htlc_rounded_msat(ptr);
	}
}
/** A Balance of type ClaimableAwaitingConfirmations */
export class Balance_ClaimableAwaitingConfirmations extends Balance {
	/**
	 * The amount available to claim, in satoshis, possibly excluding the on-chain fees which
	 * were spent in broadcasting the transaction.
	 */
	public amount_satoshis: bigint;
	/**
	 * The height at which an [`Event::SpendableOutputs`] event will be generated for this
	 * amount.
	 */
	public confirmation_height: number;
	/**
	 * Whether this balance is a result of cooperative close, a force-close, or an HTLC.
	 */
	public source: BalanceSource;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.amount_satoshis = bindings.LDKBalance_ClaimableAwaitingConfirmations_get_amount_satoshis(ptr);
		this.confirmation_height = bindings.LDKBalance_ClaimableAwaitingConfirmations_get_confirmation_height(ptr);
		this.source = bindings.LDKBalance_ClaimableAwaitingConfirmations_get_source(ptr);
	}
}
/** A Balance of type ContentiousClaimable */
export class Balance_ContentiousClaimable extends Balance {
	/**
	 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
	 * required to do so.
	 */
	public amount_satoshis: bigint;
	/**
	 * The height at which the counterparty may be able to claim the balance if we have not
	 * done so.
	 */
	public timeout_height: number;
	/**
	 * The payment hash that locks this HTLC.
	 */
	public payment_hash: Uint8Array;
	/**
	 * The preimage that can be used to claim this HTLC.
	 */
	public payment_preimage: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.amount_satoshis = bindings.LDKBalance_ContentiousClaimable_get_amount_satoshis(ptr);
		this.timeout_height = bindings.LDKBalance_ContentiousClaimable_get_timeout_height(ptr);
		const payment_hash: number = bindings.LDKBalance_ContentiousClaimable_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		const payment_preimage: number = bindings.LDKBalance_ContentiousClaimable_get_payment_preimage(ptr);
		const payment_preimage_conv: Uint8Array = bindings.decodeUint8Array(payment_preimage);
		this.payment_preimage = payment_preimage_conv;
	}
}
/** A Balance of type MaybeTimeoutClaimableHTLC */
export class Balance_MaybeTimeoutClaimableHTLC extends Balance {
	/**
	 * The amount potentially available to claim, in satoshis, excluding the on-chain fees
	 * which will be required to do so.
	 */
	public amount_satoshis: bigint;
	/**
	 * The height at which we will be able to claim the balance if our counterparty has not
	 * done so.
	 */
	public claimable_height: number;
	/**
	 * The payment hash whose preimage our counterparty needs to claim this HTLC.
	 */
	public payment_hash: Uint8Array;
	/**
	 * Whether this HTLC represents a payment which was sent outbound from us. Otherwise it
	 * represents an HTLC which was forwarded (and should, thus, have a corresponding inbound
	 * edge on another channel).
	 */
	public outbound_payment: boolean;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.amount_satoshis = bindings.LDKBalance_MaybeTimeoutClaimableHTLC_get_amount_satoshis(ptr);
		this.claimable_height = bindings.LDKBalance_MaybeTimeoutClaimableHTLC_get_claimable_height(ptr);
		const payment_hash: number = bindings.LDKBalance_MaybeTimeoutClaimableHTLC_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
		this.outbound_payment = bindings.LDKBalance_MaybeTimeoutClaimableHTLC_get_outbound_payment(ptr);
	}
}
/** A Balance of type MaybePreimageClaimableHTLC */
export class Balance_MaybePreimageClaimableHTLC extends Balance {
	/**
	 * The amount potentially available to claim, in satoshis, excluding the on-chain fees
	 * which will be required to do so.
	 */
	public amount_satoshis: bigint;
	/**
	 * The height at which our counterparty will be able to claim the balance if we have not
	 * yet received the preimage and claimed it ourselves.
	 */
	public expiry_height: number;
	/**
	 * The payment hash whose preimage we need to claim this HTLC.
	 */
	public payment_hash: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.amount_satoshis = bindings.LDKBalance_MaybePreimageClaimableHTLC_get_amount_satoshis(ptr);
		this.expiry_height = bindings.LDKBalance_MaybePreimageClaimableHTLC_get_expiry_height(ptr);
		const payment_hash: number = bindings.LDKBalance_MaybePreimageClaimableHTLC_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
	}
}
/** A Balance of type CounterpartyRevokedOutputClaimable */
export class Balance_CounterpartyRevokedOutputClaimable extends Balance {
	/**
	 * The amount, in satoshis, of the output which we can claim.
	 * 
	 * Note that for outputs from HTLC balances this may be excluding some on-chain fees that
	 * were already spent.
	 */
	public amount_satoshis: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.amount_satoshis = bindings.LDKBalance_CounterpartyRevokedOutputClaimable_get_amount_satoshis(ptr);
	}
}
