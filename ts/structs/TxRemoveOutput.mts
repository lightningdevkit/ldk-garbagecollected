
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`tx_remove_output`] message for removing an output during interactive transaction construction.
 * 
 * [`tx_remove_output`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-tx_remove_input-and-tx_remove_output-messages
 */
export class TxRemoveOutput extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxRemoveOutput_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.TxRemoveOutput_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.TxRemoveOutput_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The serial ID of the output to be removed
	 */
	public get_serial_id(): bigint {
		const ret: bigint = bindings.TxRemoveOutput_get_serial_id(this.ptr);
		return ret;
	}

	/**
	 * The serial ID of the output to be removed
	 */
	public set_serial_id(val: bigint): void {
		bindings.TxRemoveOutput_set_serial_id(this.ptr, val);
	}

	/**
	 * Constructs a new TxRemoveOutput given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, serial_id_arg: bigint): TxRemoveOutput {
		const ret: bigint = bindings.TxRemoveOutput_new(CommonBase.get_ptr_of(channel_id_arg), serial_id_arg);
		const ret_hu_conv: TxRemoveOutput = new TxRemoveOutput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TxRemoveOutput_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TxRemoveOutput
	 */
	public clone(): TxRemoveOutput {
		const ret: bigint = bindings.TxRemoveOutput_clone(this.ptr);
		const ret_hu_conv: TxRemoveOutput = new TxRemoveOutput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxRemoveOutput.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.TxRemoveOutput_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two TxRemoveOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TxRemoveOutput): boolean {
		const ret: boolean = bindings.TxRemoveOutput_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the TxRemoveOutput object into a byte array which can be read by TxRemoveOutput_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TxRemoveOutput_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxRemoveOutput from a byte array, created by TxRemoveOutput_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TxRemoveOutputDecodeErrorZ {
		const ret: bigint = bindings.TxRemoveOutput_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TxRemoveOutputDecodeErrorZ = Result_TxRemoveOutputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
