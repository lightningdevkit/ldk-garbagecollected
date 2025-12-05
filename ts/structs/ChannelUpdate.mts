
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`channel_update`] message to be sent to or received from a peer.
 * 
 * [`channel_update`]: https://github.com/lightning/bolts/blob/master/07-routing-gossip.md#the-channel_update-message
 */
export class ChannelUpdate extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelUpdate_free);
	}

	/**
	 * A signature of the channel update
	 */
	public get_signature(): Uint8Array {
		const ret: number = bindings.ChannelUpdate_get_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A signature of the channel update
	 */
	public set_signature(val: Uint8Array): void {
		bindings.ChannelUpdate_set_signature(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The actual channel update
	 */
	public get_contents(): UnsignedChannelUpdate {
		const ret: bigint = bindings.ChannelUpdate_get_contents(this.ptr);
		const ret_hu_conv: UnsignedChannelUpdate = new UnsignedChannelUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The actual channel update
	 */
	public set_contents(val: UnsignedChannelUpdate): void {
		bindings.ChannelUpdate_set_contents(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelUpdate given each field
	 */
	public static constructor_new(signature_arg: Uint8Array, contents_arg: UnsignedChannelUpdate): ChannelUpdate {
		const ret: bigint = bindings.ChannelUpdate_new(bindings.encodeUint8Array(signature_arg), CommonBase.get_ptr_of(contents_arg));
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelUpdate_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelUpdate
	 */
	public clone(): ChannelUpdate {
		const ret: bigint = bindings.ChannelUpdate_clone(this.ptr);
		const ret_hu_conv: ChannelUpdate = new ChannelUpdate(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ChannelUpdate.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ChannelUpdate_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ChannelUpdates contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelUpdate): boolean {
		const ret: boolean = bindings.ChannelUpdate_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ChannelUpdate object into a byte array which can be read by ChannelUpdate_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelUpdate_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelUpdate from a byte array, created by ChannelUpdate_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelUpdateDecodeErrorZ {
		const ret: bigint = bindings.ChannelUpdate_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelUpdateDecodeErrorZ = Result_ChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
