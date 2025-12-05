
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`update_fail_htlc`] message to be sent to or received from a peer.
 * 
 * [`update_fail_htlc`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#removing-an-htlc-update_fulfill_htlc-update_fail_htlc-and-update_fail_malformed_htlc
 */
export class UpdateFailHTLC extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UpdateFailHTLC_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.UpdateFailHTLC_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.UpdateFailHTLC_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The HTLC ID
	 */
	public get_htlc_id(): bigint {
		const ret: bigint = bindings.UpdateFailHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	/**
	 * The HTLC ID
	 */
	public set_htlc_id(val: bigint): void {
		bindings.UpdateFailHTLC_set_htlc_id(this.ptr, val);
	}

	/**
	 * Optional field for the attribution data that allows the sender to pinpoint the failing node under all conditions
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_attribution_data(): AttributionData {
		const ret: bigint = bindings.UpdateFailHTLC_get_attribution_data(this.ptr);
		const ret_hu_conv: AttributionData = new AttributionData(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Optional field for the attribution data that allows the sender to pinpoint the failing node under all conditions
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_attribution_data(val: AttributionData|null): void {
		bindings.UpdateFailHTLC_set_attribution_data(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UpdateFailHTLC_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UpdateFailHTLC
	 */
	public clone(): UpdateFailHTLC {
		const ret: bigint = bindings.UpdateFailHTLC_clone(this.ptr);
		const ret_hu_conv: UpdateFailHTLC = new UpdateFailHTLC(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UpdateFailHTLC.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.UpdateFailHTLC_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two UpdateFailHTLCs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: UpdateFailHTLC): boolean {
		const ret: boolean = bindings.UpdateFailHTLC_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the UpdateFailHTLC object into a byte array which can be read by UpdateFailHTLC_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UpdateFailHTLC_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UpdateFailHTLC from a byte array, created by UpdateFailHTLC_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UpdateFailHTLCDecodeErrorZ {
		const ret: bigint = bindings.UpdateFailHTLC_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UpdateFailHTLCDecodeErrorZ = Result_UpdateFailHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
