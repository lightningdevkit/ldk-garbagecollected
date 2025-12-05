
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`update_fulfill_htlc`] message to be sent to or received from a peer.
 * 
 * [`update_fulfill_htlc`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#removing-an-htlc-update_fulfill_htlc-update_fail_htlc-and-update_fail_malformed_htlc
 */
export class UpdateFulfillHTLC extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UpdateFulfillHTLC_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.UpdateFulfillHTLC_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.UpdateFulfillHTLC_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The HTLC ID
	 */
	public get_htlc_id(): bigint {
		const ret: bigint = bindings.UpdateFulfillHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	/**
	 * The HTLC ID
	 */
	public set_htlc_id(val: bigint): void {
		bindings.UpdateFulfillHTLC_set_htlc_id(this.ptr, val);
	}

	/**
	 * The pre-image of the payment hash, allowing HTLC redemption
	 */
	public get_payment_preimage(): Uint8Array {
		const ret: number = bindings.UpdateFulfillHTLC_get_payment_preimage(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The pre-image of the payment hash, allowing HTLC redemption
	 */
	public set_payment_preimage(val: Uint8Array): void {
		bindings.UpdateFulfillHTLC_set_payment_preimage(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Optional field for attribution data that allows the sender to receive per hop HTLC hold times.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_attribution_data(): AttributionData {
		const ret: bigint = bindings.UpdateFulfillHTLC_get_attribution_data(this.ptr);
		const ret_hu_conv: AttributionData = new AttributionData(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Optional field for attribution data that allows the sender to receive per hop HTLC hold times.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_attribution_data(val: AttributionData|null): void {
		bindings.UpdateFulfillHTLC_set_attribution_data(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new UpdateFulfillHTLC given each field
	 * 
	 * Note that attribution_data_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(channel_id_arg: ChannelId, htlc_id_arg: bigint, payment_preimage_arg: Uint8Array, attribution_data_arg: AttributionData|null): UpdateFulfillHTLC {
		const ret: bigint = bindings.UpdateFulfillHTLC_new(CommonBase.get_ptr_of(channel_id_arg), htlc_id_arg, bindings.encodeUint8Array(payment_preimage_arg), attribution_data_arg == null ? 0n : CommonBase.get_ptr_of(attribution_data_arg));
		const ret_hu_conv: UpdateFulfillHTLC = new UpdateFulfillHTLC(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UpdateFulfillHTLC_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UpdateFulfillHTLC
	 */
	public clone(): UpdateFulfillHTLC {
		const ret: bigint = bindings.UpdateFulfillHTLC_clone(this.ptr);
		const ret_hu_conv: UpdateFulfillHTLC = new UpdateFulfillHTLC(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UpdateFulfillHTLC.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.UpdateFulfillHTLC_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two UpdateFulfillHTLCs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: UpdateFulfillHTLC): boolean {
		const ret: boolean = bindings.UpdateFulfillHTLC_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the UpdateFulfillHTLC object into a byte array which can be read by UpdateFulfillHTLC_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UpdateFulfillHTLC_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UpdateFulfillHTLC from a byte array, created by UpdateFulfillHTLC_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UpdateFulfillHTLCDecodeErrorZ {
		const ret: bigint = bindings.UpdateFulfillHTLC_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UpdateFulfillHTLCDecodeErrorZ = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
