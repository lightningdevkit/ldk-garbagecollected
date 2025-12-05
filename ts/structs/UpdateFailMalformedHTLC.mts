
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`update_fail_malformed_htlc`] message to be sent to or received from a peer.
 * 
 * [`update_fail_malformed_htlc`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#removing-an-htlc-update_fulfill_htlc-update_fail_htlc-and-update_fail_malformed_htlc
 */
export class UpdateFailMalformedHTLC extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UpdateFailMalformedHTLC_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.UpdateFailMalformedHTLC_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.UpdateFailMalformedHTLC_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The HTLC ID
	 */
	public get_htlc_id(): bigint {
		const ret: bigint = bindings.UpdateFailMalformedHTLC_get_htlc_id(this.ptr);
		return ret;
	}

	/**
	 * The HTLC ID
	 */
	public set_htlc_id(val: bigint): void {
		bindings.UpdateFailMalformedHTLC_set_htlc_id(this.ptr, val);
	}

	/**
	 * The failure code
	 */
	public get_failure_code(): number {
		const ret: number = bindings.UpdateFailMalformedHTLC_get_failure_code(this.ptr);
		return ret;
	}

	/**
	 * The failure code
	 */
	public set_failure_code(val: number): void {
		bindings.UpdateFailMalformedHTLC_set_failure_code(this.ptr, val);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UpdateFailMalformedHTLC_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UpdateFailMalformedHTLC
	 */
	public clone(): UpdateFailMalformedHTLC {
		const ret: bigint = bindings.UpdateFailMalformedHTLC_clone(this.ptr);
		const ret_hu_conv: UpdateFailMalformedHTLC = new UpdateFailMalformedHTLC(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the UpdateFailMalformedHTLC.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.UpdateFailMalformedHTLC_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two UpdateFailMalformedHTLCs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: UpdateFailMalformedHTLC): boolean {
		const ret: boolean = bindings.UpdateFailMalformedHTLC_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the UpdateFailMalformedHTLC object into a byte array which can be read by UpdateFailMalformedHTLC_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UpdateFailMalformedHTLC_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a UpdateFailMalformedHTLC from a byte array, created by UpdateFailMalformedHTLC_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UpdateFailMalformedHTLCDecodeErrorZ {
		const ret: bigint = bindings.UpdateFailMalformedHTLC_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UpdateFailMalformedHTLCDecodeErrorZ = Result_UpdateFailMalformedHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
