
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`error`] message to be sent to or received from a peer.
 * 
 * [`error`]: https://github.com/lightning/bolts/blob/master/01-messaging.md#the-error-and-warning-messages
 */
export class ErrorMessage extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ErrorMessage_free);
	}

	/**
	 * The channel ID involved in the error.
	 * 
	 * All-0s indicates a general error unrelated to a specific channel, after which all channels
	 * with the sending peer should be closed.
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.ErrorMessage_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID involved in the error.
	 * 
	 * All-0s indicates a general error unrelated to a specific channel, after which all channels
	 * with the sending peer should be closed.
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.ErrorMessage_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * A possibly human-readable error description.
	 * 
	 * The string should be sanitized before it is used (e.g., emitted to logs or printed to
	 * `stdout`). Otherwise, a well crafted error message may trigger a security vulnerability in
	 * the terminal emulator or the logging subsystem.
	 */
	public get_data(): string {
		const ret: number = bindings.ErrorMessage_get_data(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * A possibly human-readable error description.
	 * 
	 * The string should be sanitized before it is used (e.g., emitted to logs or printed to
	 * `stdout`). Otherwise, a well crafted error message may trigger a security vulnerability in
	 * the terminal emulator or the logging subsystem.
	 */
	public set_data(val: string): void {
		bindings.ErrorMessage_set_data(this.ptr, bindings.encodeString(val));
	}

	/**
	 * Constructs a new ErrorMessage given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, data_arg: string): ErrorMessage {
		const ret: bigint = bindings.ErrorMessage_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeString(data_arg));
		const ret_hu_conv: ErrorMessage = new ErrorMessage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ErrorMessage_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ErrorMessage
	 */
	public clone(): ErrorMessage {
		const ret: bigint = bindings.ErrorMessage_clone(this.ptr);
		const ret_hu_conv: ErrorMessage = new ErrorMessage(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ErrorMessage.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ErrorMessage_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ErrorMessages contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ErrorMessage): boolean {
		const ret: boolean = bindings.ErrorMessage_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ErrorMessage object into a byte array which can be read by ErrorMessage_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ErrorMessage_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ErrorMessage from a byte array, created by ErrorMessage_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ErrorMessageDecodeErrorZ {
		const ret: bigint = bindings.ErrorMessage_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ErrorMessageDecodeErrorZ = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
