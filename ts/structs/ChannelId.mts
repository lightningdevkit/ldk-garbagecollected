
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A unique 32-byte identifier for a channel.
 * Depending on how the ID is generated, several varieties are distinguished
 * (but all are stored as 32 bytes):
 * _v1_ and _temporary_.
 * A _v1_ channel ID is generated based on funding tx outpoint (txid & index).
 * A _temporary_ ID is generated randomly.
 * (Later revocation-point-based _v2_ is a possibility.)
 * The variety (context) is not stored, it is relevant only at creation.
 */
export class ChannelId extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelId_free);
	}

	public get_a(): Uint8Array {
		const ret: number = bindings.ChannelId_get_a(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	public set_a(val: Uint8Array): void {
		bindings.ChannelId_set_a(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new ChannelId given each field
	 */
	public static constructor_new(a_arg: Uint8Array): ChannelId {
		const ret: bigint = bindings.ChannelId_new(bindings.encodeUint8Array(a_arg));
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelId_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelId
	 */
	public clone(): ChannelId {
		const ret: bigint = bindings.ChannelId_clone(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelIds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelId): boolean {
		const ret: boolean = bindings.ChannelId_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelId.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ChannelId_hash(this.ptr);
		return ret;
	}

	/**
	 * Create _v1_ channel ID based on a funding TX ID and output index
	 */
	public static constructor_v1_from_funding_txid(txid: Uint8Array, output_index: number): ChannelId {
		const ret: bigint = bindings.ChannelId_v1_from_funding_txid(bindings.encodeUint8Array(txid), output_index);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Create _v1_ channel ID from a funding tx outpoint
	 */
	public static constructor_v1_from_funding_outpoint(outpoint: OutPoint): ChannelId {
		const ret: bigint = bindings.ChannelId_v1_from_funding_outpoint(CommonBase.get_ptr_of(outpoint));
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Create a _temporary_ channel ID randomly, based on an entropy source.
	 */
	public static constructor_temporary_from_entropy_source(entropy_source: EntropySource): ChannelId {
		const ret: bigint = bindings.ChannelId_temporary_from_entropy_source(CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Generic constructor; create a new channel ID from the provided data.
	 * Use a more specific `*_from_*` constructor when possible.
	 */
	public static constructor_from_bytes(data: Uint8Array): ChannelId {
		const ret: bigint = bindings.ChannelId_from_bytes(bindings.encodeUint8Array(data));
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Create a channel ID consisting of all-zeros data (e.g. when uninitialized or a placeholder).
	 */
	public static constructor_new_zero(): ChannelId {
		const ret: bigint = bindings.ChannelId_new_zero();
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Check whether ID is consisting of all zeros (uninitialized)
	 */
	public is_zero(): boolean {
		const ret: boolean = bindings.ChannelId_is_zero(this.ptr);
		return ret;
	}

	/**
	 * Create _v2_ channel ID by concatenating the holder revocation basepoint with the counterparty
	 * revocation basepoint and hashing the result. The basepoints will be concatenated in increasing
	 * sorted order.
	 */
	public static constructor_v2_from_revocation_basepoints(ours: RevocationBasepoint, theirs: RevocationBasepoint): ChannelId {
		const ret: bigint = bindings.ChannelId_v2_from_revocation_basepoints(CommonBase.get_ptr_of(ours), CommonBase.get_ptr_of(theirs));
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Create temporary _v2_ channel ID by concatenating a zeroed out basepoint with the holder
	 * revocation basepoint and hashing the result.
	 */
	public static constructor_temporary_v2_from_revocation_basepoint(our_revocation_basepoint: RevocationBasepoint): ChannelId {
		const ret: bigint = bindings.ChannelId_temporary_v2_from_revocation_basepoint(CommonBase.get_ptr_of(our_revocation_basepoint));
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Indicates whether this is a V2 channel ID for the given local and remote revocation basepoints.
	 */
	public is_v2_channel_id(ours: RevocationBasepoint, theirs: RevocationBasepoint): boolean {
		const ret: boolean = bindings.ChannelId_is_v2_channel_id(this.ptr, CommonBase.get_ptr_of(ours), CommonBase.get_ptr_of(theirs));
		return ret;
	}

	/**
	 * Serialize the ChannelId object into a byte array which can be read by ChannelId_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelId_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelId from a byte array, created by ChannelId_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelIdDecodeErrorZ {
		const ret: bigint = bindings.ChannelId_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelIdDecodeErrorZ = Result_ChannelIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
