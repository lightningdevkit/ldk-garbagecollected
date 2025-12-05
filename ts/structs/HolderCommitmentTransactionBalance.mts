
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The claimable balance of a holder commitment transaction that has yet to be broadcast.
 */
export class HolderCommitmentTransactionBalance extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.HolderCommitmentTransactionBalance_free);
	}

	/**
	 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
	 * required to do so.
	 */
	public get_amount_satoshis(): bigint {
		const ret: bigint = bindings.HolderCommitmentTransactionBalance_get_amount_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The amount available to claim, in satoshis, excluding the on-chain fees which will be
	 * required to do so.
	 */
	public set_amount_satoshis(val: bigint): void {
		bindings.HolderCommitmentTransactionBalance_set_amount_satoshis(this.ptr, val);
	}

	/**
	 * The transaction fee we pay for the closing commitment transaction. This amount is not
	 * included in the [`HolderCommitmentTransactionBalance::amount_satoshis`] value.
	 * This amount includes the sum of dust HTLCs on the commitment transaction, any elided anchors,
	 * as well as the sum of msat amounts rounded down from non-dust HTLCs.
	 * 
	 * Note that if this channel is inbound (and thus our counterparty pays the commitment
	 * transaction fee) this value will be zero. For [`ChannelMonitor`]s created prior to LDK
	 * 0.0.124, the channel is always treated as outbound (and thus this value is never zero).
	 */
	public get_transaction_fee_satoshis(): bigint {
		const ret: bigint = bindings.HolderCommitmentTransactionBalance_get_transaction_fee_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The transaction fee we pay for the closing commitment transaction. This amount is not
	 * included in the [`HolderCommitmentTransactionBalance::amount_satoshis`] value.
	 * This amount includes the sum of dust HTLCs on the commitment transaction, any elided anchors,
	 * as well as the sum of msat amounts rounded down from non-dust HTLCs.
	 * 
	 * Note that if this channel is inbound (and thus our counterparty pays the commitment
	 * transaction fee) this value will be zero. For [`ChannelMonitor`]s created prior to LDK
	 * 0.0.124, the channel is always treated as outbound (and thus this value is never zero).
	 */
	public set_transaction_fee_satoshis(val: bigint): void {
		bindings.HolderCommitmentTransactionBalance_set_transaction_fee_satoshis(this.ptr, val);
	}

	/**
	 * Constructs a new HolderCommitmentTransactionBalance given each field
	 */
	public static constructor_new(amount_satoshis_arg: bigint, transaction_fee_satoshis_arg: bigint): HolderCommitmentTransactionBalance {
		const ret: bigint = bindings.HolderCommitmentTransactionBalance_new(amount_satoshis_arg, transaction_fee_satoshis_arg);
		const ret_hu_conv: HolderCommitmentTransactionBalance = new HolderCommitmentTransactionBalance(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HolderCommitmentTransactionBalance_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HolderCommitmentTransactionBalance
	 */
	public clone(): HolderCommitmentTransactionBalance {
		const ret: bigint = bindings.HolderCommitmentTransactionBalance_clone(this.ptr);
		const ret_hu_conv: HolderCommitmentTransactionBalance = new HolderCommitmentTransactionBalance(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two HolderCommitmentTransactionBalances contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: HolderCommitmentTransactionBalance): boolean {
		const ret: boolean = bindings.HolderCommitmentTransactionBalance_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
