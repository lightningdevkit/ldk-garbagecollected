
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`funding_signed`] message to be sent to or received from a peer.
 * 
 * Used in V1 channel establishment
 * 
 * [`funding_signed`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-funding_signed-message
 */
export class FundingSigned extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.FundingSigned_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.FundingSigned_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.FundingSigned_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The signature of the channel acceptor (fundee) on the initial commitment transaction
	 */
	public get_signature(): Uint8Array {
		const ret: number = bindings.FundingSigned_get_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The signature of the channel acceptor (fundee) on the initial commitment transaction
	 */
	public set_signature(val: Uint8Array): void {
		bindings.FundingSigned_set_signature(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new FundingSigned given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, signature_arg: Uint8Array): FundingSigned {
		const ret: bigint = bindings.FundingSigned_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint8Array(signature_arg));
		const ret_hu_conv: FundingSigned = new FundingSigned(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.FundingSigned_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the FundingSigned
	 */
	public clone(): FundingSigned {
		const ret: bigint = bindings.FundingSigned_clone(this.ptr);
		const ret_hu_conv: FundingSigned = new FundingSigned(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the FundingSigned.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.FundingSigned_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two FundingSigneds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: FundingSigned): boolean {
		const ret: boolean = bindings.FundingSigned_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the FundingSigned object into a byte array which can be read by FundingSigned_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.FundingSigned_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a FundingSigned from a byte array, created by FundingSigned_write
	 */
	public static constructor_read(ser: Uint8Array): Result_FundingSignedDecodeErrorZ {
		const ret: bigint = bindings.FundingSigned_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_FundingSignedDecodeErrorZ = Result_FundingSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
