
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`closing_signed`] message to be sent to or received from a peer.
 * 
 * [`closing_signed`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#closing-negotiation-closing_signed
 */
export class ClosingSigned extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ClosingSigned_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.ClosingSigned_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.ClosingSigned_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The proposed total fee for the closing transaction
	 */
	public get_fee_satoshis(): bigint {
		const ret: bigint = bindings.ClosingSigned_get_fee_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The proposed total fee for the closing transaction
	 */
	public set_fee_satoshis(val: bigint): void {
		bindings.ClosingSigned_set_fee_satoshis(this.ptr, val);
	}

	/**
	 * A signature on the closing transaction
	 */
	public get_signature(): Uint8Array {
		const ret: number = bindings.ClosingSigned_get_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A signature on the closing transaction
	 */
	public set_signature(val: Uint8Array): void {
		bindings.ClosingSigned_set_signature(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The minimum and maximum fees which the sender is willing to accept, provided only by new
	 * nodes.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_fee_range(): ClosingSignedFeeRange {
		const ret: bigint = bindings.ClosingSigned_get_fee_range(this.ptr);
		const ret_hu_conv: ClosingSignedFeeRange = new ClosingSignedFeeRange(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The minimum and maximum fees which the sender is willing to accept, provided only by new
	 * nodes.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_fee_range(val: ClosingSignedFeeRange|null): void {
		bindings.ClosingSigned_set_fee_range(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ClosingSigned given each field
	 * 
	 * Note that fee_range_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(channel_id_arg: ChannelId, fee_satoshis_arg: bigint, signature_arg: Uint8Array, fee_range_arg: ClosingSignedFeeRange|null): ClosingSigned {
		const ret: bigint = bindings.ClosingSigned_new(CommonBase.get_ptr_of(channel_id_arg), fee_satoshis_arg, bindings.encodeUint8Array(signature_arg), fee_range_arg == null ? 0n : CommonBase.get_ptr_of(fee_range_arg));
		const ret_hu_conv: ClosingSigned = new ClosingSigned(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ClosingSigned_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ClosingSigned
	 */
	public clone(): ClosingSigned {
		const ret: bigint = bindings.ClosingSigned_clone(this.ptr);
		const ret_hu_conv: ClosingSigned = new ClosingSigned(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ClosingSigned.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ClosingSigned_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ClosingSigneds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ClosingSigned): boolean {
		const ret: boolean = bindings.ClosingSigned_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ClosingSigned object into a byte array which can be read by ClosingSigned_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ClosingSigned_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ClosingSigned from a byte array, created by ClosingSigned_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ClosingSignedDecodeErrorZ {
		const ret: bigint = bindings.ClosingSigned_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ClosingSignedDecodeErrorZ = Result_ClosingSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
