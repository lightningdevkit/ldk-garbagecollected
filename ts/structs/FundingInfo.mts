
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * `FundingInfo` holds information about a channel's funding transaction.
 * 
 * When LDK is set to manual propagation of the funding transaction
 * (via [`ChannelManager::unsafe_manual_funding_transaction_generated`),
 * LDK does not have the full transaction data. Instead, the `OutPoint`
 * for the funding is provided here.
 * 
 * [`ChannelManager::unsafe_manual_funding_transaction_generated`]: crate::ln::channelmanager::ChannelManager::unsafe_manual_funding_transaction_generated
 */
export class FundingInfo extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.FundingInfo_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): FundingInfo {
		const raw_ty: number = bindings.LDKFundingInfo_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new FundingInfo_Tx(ptr);
			case 1: return new FundingInfo_OutPoint(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.FundingInfo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the FundingInfo
	 */
	public clone(): FundingInfo {
		const ret: bigint = bindings.FundingInfo_clone(this.ptr);
		const ret_hu_conv: FundingInfo = FundingInfo.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Tx-variant FundingInfo
	 */
	public static constructor_tx(transaction: Uint8Array): FundingInfo {
		const ret: bigint = bindings.FundingInfo_tx(bindings.encodeUint8Array(transaction));
		const ret_hu_conv: FundingInfo = FundingInfo.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutPoint-variant FundingInfo
	 */
	public static constructor_out_point(outpoint: OutPoint): FundingInfo {
		const ret: bigint = bindings.FundingInfo_out_point(CommonBase.get_ptr_of(outpoint));
		const ret_hu_conv: FundingInfo = FundingInfo.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two FundingInfos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: FundingInfo): boolean {
		const ret: boolean = bindings.FundingInfo_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the FundingInfo object into a byte array which can be read by FundingInfo_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.FundingInfo_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a FundingInfo from a byte array, created by FundingInfo_write
	 */
	public static constructor_read(ser: Uint8Array): Result_FundingInfoDecodeErrorZ {
		const ret: bigint = bindings.FundingInfo_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_FundingInfoDecodeErrorZ = Result_FundingInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A FundingInfo of type Tx */
export class FundingInfo_Tx extends FundingInfo {
	/**
	 * The funding transaction
	 */
	public transaction: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const transaction: number = bindings.LDKFundingInfo_Tx_get_transaction(ptr);
		const transaction_conv: Uint8Array = bindings.decodeUint8Array(transaction);
		this.transaction = transaction_conv;
	}
}
/** A FundingInfo of type OutPoint */
export class FundingInfo_OutPoint extends FundingInfo {
	/**
	 * The outpoint of the funding
	 */
	public outpoint: OutPoint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const outpoint: bigint = bindings.LDKFundingInfo_OutPoint_get_outpoint(ptr);
		const outpoint_hu_conv: OutPoint = new OutPoint(null, outpoint);
			CommonBase.add_ref_from(outpoint_hu_conv, this);
		this.outpoint = outpoint_hu_conv;
	}
}
