
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`start_batch`] message to be sent to group together multiple channel messages as a single
 * logical message.
 * 
 * [`start_batch`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#batching-channel-messages
 */
export class StartBatch extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.StartBatch_free);
	}

	/**
	 * The channel ID of all messages in the batch.
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.StartBatch_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID of all messages in the batch.
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.StartBatch_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The number of messages to follow.
	 */
	public get_batch_size(): number {
		const ret: number = bindings.StartBatch_get_batch_size(this.ptr);
		return ret;
	}

	/**
	 * The number of messages to follow.
	 */
	public set_batch_size(val: number): void {
		bindings.StartBatch_set_batch_size(this.ptr, val);
	}

	/**
	 * The type of all messages expected in the batch.
	 */
	public get_message_type(): Option_u16Z {
		const ret: bigint = bindings.StartBatch_get_message_type(this.ptr);
		const ret_hu_conv: Option_u16Z = Option_u16Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The type of all messages expected in the batch.
	 */
	public set_message_type(val: Option_u16Z): void {
		bindings.StartBatch_set_message_type(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new StartBatch given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, batch_size_arg: number, message_type_arg: Option_u16Z): StartBatch {
		const ret: bigint = bindings.StartBatch_new(CommonBase.get_ptr_of(channel_id_arg), batch_size_arg, CommonBase.get_ptr_of(message_type_arg));
		const ret_hu_conv: StartBatch = new StartBatch(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.StartBatch_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the StartBatch
	 */
	public clone(): StartBatch {
		const ret: bigint = bindings.StartBatch_clone(this.ptr);
		const ret_hu_conv: StartBatch = new StartBatch(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the StartBatch.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.StartBatch_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two StartBatchs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: StartBatch): boolean {
		const ret: boolean = bindings.StartBatch_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the StartBatch object into a byte array which can be read by StartBatch_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.StartBatch_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a StartBatch from a byte array, created by StartBatch_write
	 */
	public static constructor_read(ser: Uint8Array): Result_StartBatchDecodeErrorZ {
		const ret: bigint = bindings.StartBatch_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_StartBatchDecodeErrorZ = Result_StartBatchDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
