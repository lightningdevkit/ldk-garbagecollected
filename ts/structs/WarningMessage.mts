
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`warning`] message to be sent to or received from a peer.
 * 
 * [`warning`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-error-and-warning-messages
 */
export class WarningMessage extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.WarningMessage_free);
	}

	/**
	 * The channel ID involved in the warning.
	 * 
	 * All-0s indicates a warning unrelated to a specific channel.
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.WarningMessage_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID involved in the warning.
	 * 
	 * All-0s indicates a warning unrelated to a specific channel.
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.WarningMessage_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * A possibly human-readable warning description.
	 * 
	 * The string should be sanitized before it is used (e.g. emitted to logs or printed to
	 * stdout). Otherwise, a well crafted error message may trigger a security vulnerability in
	 * the terminal emulator or the logging subsystem.
	 */
	public get_data(): string {
		const ret: number = bindings.WarningMessage_get_data(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * A possibly human-readable warning description.
	 * 
	 * The string should be sanitized before it is used (e.g. emitted to logs or printed to
	 * stdout). Otherwise, a well crafted error message may trigger a security vulnerability in
	 * the terminal emulator or the logging subsystem.
	 */
	public set_data(val: string): void {
		bindings.WarningMessage_set_data(this.ptr, bindings.encodeString(val));
	}

	/**
	 * Constructs a new WarningMessage given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, data_arg: string): WarningMessage {
		const ret: bigint = bindings.WarningMessage_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeString(data_arg));
		const ret_hu_conv: WarningMessage = new WarningMessage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.WarningMessage_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the WarningMessage
	 */
	public clone(): WarningMessage {
		const ret: bigint = bindings.WarningMessage_clone(this.ptr);
		const ret_hu_conv: WarningMessage = new WarningMessage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the WarningMessage.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.WarningMessage_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two WarningMessages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: WarningMessage): boolean {
		const ret: boolean = bindings.WarningMessage_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the WarningMessage object into a byte array which can be read by WarningMessage_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.WarningMessage_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a WarningMessage from a byte array, created by WarningMessage_write
	 */
	public static constructor_read(ser: Uint8Array): Result_WarningMessageDecodeErrorZ {
		const ret: bigint = bindings.WarningMessage_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_WarningMessageDecodeErrorZ = Result_WarningMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
