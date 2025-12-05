
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An `stfu` (quiescence) message to be sent by or received from the stfu initiator.
 */
export class Stfu extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Stfu_free);
	}

	/**
	 * The channel ID where quiescence is intended
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.Stfu_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID where quiescence is intended
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.Stfu_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Initiator flag, true if initiating, false if replying to an stfu.
	 */
	public get_initiator(): boolean {
		const ret: boolean = bindings.Stfu_get_initiator(this.ptr);
		return ret;
	}

	/**
	 * Initiator flag, true if initiating, false if replying to an stfu.
	 */
	public set_initiator(val: boolean): void {
		bindings.Stfu_set_initiator(this.ptr, val);
	}

	/**
	 * Constructs a new Stfu given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, initiator_arg: boolean): Stfu {
		const ret: bigint = bindings.Stfu_new(CommonBase.get_ptr_of(channel_id_arg), initiator_arg);
		const ret_hu_conv: Stfu = new Stfu(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Stfu_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Stfu
	 */
	public clone(): Stfu {
		const ret: bigint = bindings.Stfu_clone(this.ptr);
		const ret_hu_conv: Stfu = new Stfu(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two Stfus contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Stfu): boolean {
		const ret: boolean = bindings.Stfu_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Stfu object into a byte array which can be read by Stfu_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Stfu_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Stfu from a byte array, created by Stfu_write
	 */
	public static constructor_read(ser: Uint8Array): Result_StfuDecodeErrorZ {
		const ret: bigint = bindings.Stfu_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_StfuDecodeErrorZ = Result_StfuDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
