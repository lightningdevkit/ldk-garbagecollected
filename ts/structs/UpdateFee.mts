
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`update_fee`] message to be sent to or received from a peer
 * 
 * [`update_fee`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#updating-fees-update_fee
 */
export class UpdateFee extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UpdateFee_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.UpdateFee_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.UpdateFee_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Fee rate per 1000-weight of the transaction
	 */
	public get_feerate_per_kw(): number {
		const ret: number = bindings.UpdateFee_get_feerate_per_kw(this.ptr);
		return ret;
	}

	/**
	 * Fee rate per 1000-weight of the transaction
	 */
	public set_feerate_per_kw(val: number): void {
		bindings.UpdateFee_set_feerate_per_kw(this.ptr, val);
	}

	/**
	 * Constructs a new UpdateFee given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, feerate_per_kw_arg: number): UpdateFee {
		const ret: bigint = bindings.UpdateFee_new(CommonBase.get_ptr_of(channel_id_arg), feerate_per_kw_arg);
		const ret_hu_conv: UpdateFee = new UpdateFee(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UpdateFee_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UpdateFee
	 */
	public clone(): UpdateFee {
		const ret: bigint = bindings.UpdateFee_clone(this.ptr);
		const ret_hu_conv: UpdateFee = new UpdateFee(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UpdateFee.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.UpdateFee_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two UpdateFees contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: UpdateFee): boolean {
		const ret: boolean = bindings.UpdateFee_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the UpdateFee object into a byte array which can be read by UpdateFee_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UpdateFee_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UpdateFee from a byte array, created by UpdateFee_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UpdateFeeDecodeErrorZ {
		const ret: bigint = bindings.UpdateFee_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UpdateFeeDecodeErrorZ = Result_UpdateFeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
