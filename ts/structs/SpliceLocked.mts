
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A `splice_locked` message to be sent to or received from a peer.
 */
export class SpliceLocked extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.SpliceLocked_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.SpliceLocked_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.SpliceLocked_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The ID of the new funding transaction that has been locked
	 */
	public get_splice_txid(): Uint8Array {
		const ret: number = bindings.SpliceLocked_get_splice_txid(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The ID of the new funding transaction that has been locked
	 */
	public set_splice_txid(val: Uint8Array): void {
		bindings.SpliceLocked_set_splice_txid(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new SpliceLocked given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, splice_txid_arg: Uint8Array): SpliceLocked {
		const ret: bigint = bindings.SpliceLocked_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint8Array(splice_txid_arg));
		const ret_hu_conv: SpliceLocked = new SpliceLocked(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SpliceLocked_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceLocked
	 */
	public clone(): SpliceLocked {
		const ret: bigint = bindings.SpliceLocked_clone(this.ptr);
		const ret_hu_conv: SpliceLocked = new SpliceLocked(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two SpliceLockeds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: SpliceLocked): boolean {
		const ret: boolean = bindings.SpliceLocked_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the SpliceLocked object into a byte array which can be read by SpliceLocked_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.SpliceLocked_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a SpliceLocked from a byte array, created by SpliceLocked_write
	 */
	public static constructor_read(ser: Uint8Array): Result_SpliceLockedDecodeErrorZ {
		const ret: bigint = bindings.SpliceLocked_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_SpliceLockedDecodeErrorZ = Result_SpliceLockedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
