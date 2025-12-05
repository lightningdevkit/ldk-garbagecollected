
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The current status of the output spend.
 */
export class OutputSpendStatus extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.OutputSpendStatus_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): OutputSpendStatus {
		const raw_ty: number = bindings.LDKOutputSpendStatus_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new OutputSpendStatus_PendingInitialBroadcast(ptr);
			case 1: return new OutputSpendStatus_PendingFirstConfirmation(ptr);
			case 2: return new OutputSpendStatus_PendingThresholdConfirmations(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OutputSpendStatus_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OutputSpendStatus
	 */
	public clone(): OutputSpendStatus {
		const ret: bigint = bindings.OutputSpendStatus_clone(this.ptr);
		const ret_hu_conv: OutputSpendStatus = OutputSpendStatus.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PendingInitialBroadcast-variant OutputSpendStatus
	 */
	public static constructor_pending_initial_broadcast(delayed_until_height: Option_u32Z): OutputSpendStatus {
		const ret: bigint = bindings.OutputSpendStatus_pending_initial_broadcast(CommonBase.get_ptr_of(delayed_until_height));
		const ret_hu_conv: OutputSpendStatus = OutputSpendStatus.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PendingFirstConfirmation-variant OutputSpendStatus
	 */
	public static constructor_pending_first_confirmation(first_broadcast_hash: Uint8Array, latest_broadcast_height: number, latest_spending_tx: Uint8Array): OutputSpendStatus {
		const ret: bigint = bindings.OutputSpendStatus_pending_first_confirmation(bindings.encodeUint8Array(first_broadcast_hash), latest_broadcast_height, bindings.encodeUint8Array(latest_spending_tx));
		const ret_hu_conv: OutputSpendStatus = OutputSpendStatus.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PendingThresholdConfirmations-variant OutputSpendStatus
	 */
	public static constructor_pending_threshold_confirmations(first_broadcast_hash: Uint8Array, latest_broadcast_height: number, latest_spending_tx: Uint8Array, confirmation_height: number, confirmation_hash: Uint8Array): OutputSpendStatus {
		const ret: bigint = bindings.OutputSpendStatus_pending_threshold_confirmations(bindings.encodeUint8Array(first_broadcast_hash), latest_broadcast_height, bindings.encodeUint8Array(latest_spending_tx), confirmation_height, bindings.encodeUint8Array(confirmation_hash));
		const ret_hu_conv: OutputSpendStatus = OutputSpendStatus.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two OutputSpendStatuss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: OutputSpendStatus): boolean {
		const ret: boolean = bindings.OutputSpendStatus_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the OutputSpendStatus object into a byte array which can be read by OutputSpendStatus_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OutputSpendStatus_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OutputSpendStatus from a byte array, created by OutputSpendStatus_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OutputSpendStatusDecodeErrorZ {
		const ret: bigint = bindings.OutputSpendStatus_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OutputSpendStatusDecodeErrorZ = Result_OutputSpendStatusDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A OutputSpendStatus of type PendingInitialBroadcast */
export class OutputSpendStatus_PendingInitialBroadcast extends OutputSpendStatus {
	/**
	 * The height at which we will first generate and broadcast a spending transaction.
	 */
	public delayed_until_height: Option_u32Z;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const delayed_until_height: bigint = bindings.LDKOutputSpendStatus_PendingInitialBroadcast_get_delayed_until_height(ptr);
		const delayed_until_height_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(delayed_until_height);
			CommonBase.add_ref_from(delayed_until_height_hu_conv, this);
		this.delayed_until_height = delayed_until_height_hu_conv;
	}
}
/** A OutputSpendStatus of type PendingFirstConfirmation */
export class OutputSpendStatus_PendingFirstConfirmation extends OutputSpendStatus {
	/**
	 * The hash of the chain tip when we first broadcast a transaction spending this output.
	 */
	public first_broadcast_hash: Uint8Array;
	/**
	 * The best height when we last broadcast a transaction spending this output.
	 */
	public latest_broadcast_height: number;
	/**
	 * The transaction spending this output we last broadcasted.
	 */
	public latest_spending_tx: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const first_broadcast_hash: number = bindings.LDKOutputSpendStatus_PendingFirstConfirmation_get_first_broadcast_hash(ptr);
		const first_broadcast_hash_conv: Uint8Array = bindings.decodeUint8Array(first_broadcast_hash);
		this.first_broadcast_hash = first_broadcast_hash_conv;
		this.latest_broadcast_height = bindings.LDKOutputSpendStatus_PendingFirstConfirmation_get_latest_broadcast_height(ptr);
		const latest_spending_tx: number = bindings.LDKOutputSpendStatus_PendingFirstConfirmation_get_latest_spending_tx(ptr);
		const latest_spending_tx_conv: Uint8Array = bindings.decodeUint8Array(latest_spending_tx);
		this.latest_spending_tx = latest_spending_tx_conv;
	}
}
/** A OutputSpendStatus of type PendingThresholdConfirmations */
export class OutputSpendStatus_PendingThresholdConfirmations extends OutputSpendStatus {
	/**
	 * The hash of the chain tip when we first broadcast a transaction spending this output.
	 */
	public first_broadcast_hash: Uint8Array;
	/**
	 * The best height when we last broadcast a transaction spending this output.
	 */
	public latest_broadcast_height: number;
	/**
	 * The transaction spending this output we saw confirmed on-chain.
	 */
	public latest_spending_tx: Uint8Array;
	/**
	 * The height at which the spending transaction was confirmed.
	 */
	public confirmation_height: number;
	/**
	 * The hash of the block in which the spending transaction was confirmed.
	 */
	public confirmation_hash: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const first_broadcast_hash: number = bindings.LDKOutputSpendStatus_PendingThresholdConfirmations_get_first_broadcast_hash(ptr);
		const first_broadcast_hash_conv: Uint8Array = bindings.decodeUint8Array(first_broadcast_hash);
		this.first_broadcast_hash = first_broadcast_hash_conv;
		this.latest_broadcast_height = bindings.LDKOutputSpendStatus_PendingThresholdConfirmations_get_latest_broadcast_height(ptr);
		const latest_spending_tx: number = bindings.LDKOutputSpendStatus_PendingThresholdConfirmations_get_latest_spending_tx(ptr);
		const latest_spending_tx_conv: Uint8Array = bindings.decodeUint8Array(latest_spending_tx);
		this.latest_spending_tx = latest_spending_tx_conv;
		this.confirmation_height = bindings.LDKOutputSpendStatus_PendingThresholdConfirmations_get_confirmation_height(ptr);
		const confirmation_hash: number = bindings.LDKOutputSpendStatus_PendingThresholdConfirmations_get_confirmation_hash(ptr);
		const confirmation_hash_conv: Uint8Array = bindings.decodeUint8Array(confirmation_hash);
		this.confirmation_hash = confirmation_hash_conv;
	}
}
