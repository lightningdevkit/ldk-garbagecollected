
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`tx_add_output`] message for adding an output during interactive transaction construction.
 * 
 * [`tx_add_output`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-tx_add_output-message
 */
export class TxAddOutput extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxAddOutput_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.TxAddOutput_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.TxAddOutput_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * A randomly chosen unique identifier for this output, which is even for initiators and odd for
	 * non-initiators.
	 */
	public get_serial_id(): bigint {
		const ret: bigint = bindings.TxAddOutput_get_serial_id(this.ptr);
		return ret;
	}

	/**
	 * A randomly chosen unique identifier for this output, which is even for initiators and odd for
	 * non-initiators.
	 */
	public set_serial_id(val: bigint): void {
		bindings.TxAddOutput_set_serial_id(this.ptr, val);
	}

	/**
	 * The satoshi value of the output
	 */
	public get_sats(): bigint {
		const ret: bigint = bindings.TxAddOutput_get_sats(this.ptr);
		return ret;
	}

	/**
	 * The satoshi value of the output
	 */
	public set_sats(val: bigint): void {
		bindings.TxAddOutput_set_sats(this.ptr, val);
	}

	/**
	 * The scriptPubKey for the output
	 */
	public get_script(): Uint8Array {
		const ret: number = bindings.TxAddOutput_get_script(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The scriptPubKey for the output
	 */
	public set_script(val: Uint8Array): void {
		bindings.TxAddOutput_set_script(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new TxAddOutput given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, serial_id_arg: bigint, sats_arg: bigint, script_arg: Uint8Array): TxAddOutput {
		const ret: bigint = bindings.TxAddOutput_new(CommonBase.get_ptr_of(channel_id_arg), serial_id_arg, sats_arg, bindings.encodeUint8Array(script_arg));
		const ret_hu_conv: TxAddOutput = new TxAddOutput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TxAddOutput_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TxAddOutput
	 */
	public clone(): TxAddOutput {
		const ret: bigint = bindings.TxAddOutput_clone(this.ptr);
		const ret_hu_conv: TxAddOutput = new TxAddOutput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxAddOutput.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.TxAddOutput_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two TxAddOutputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TxAddOutput): boolean {
		const ret: boolean = bindings.TxAddOutput_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the TxAddOutput object into a byte array which can be read by TxAddOutput_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TxAddOutput_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxAddOutput from a byte array, created by TxAddOutput_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TxAddOutputDecodeErrorZ {
		const ret: bigint = bindings.TxAddOutput_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TxAddOutputDecodeErrorZ = Result_TxAddOutputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
