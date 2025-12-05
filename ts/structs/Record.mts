
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A Record, unit of logging output with Metadata to enable filtering
 * Module_path, file, line to inform on log's source
 */
export class Record extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Record_free);
	}

	/**
	 * The verbosity level of the message.
	 */
	public get_level(): Level {
		const ret: Level = bindings.Record_get_level(this.ptr);
		return ret;
	}

	/**
	 * The verbosity level of the message.
	 */
	public set_level(val: Level): void {
		bindings.Record_set_level(this.ptr, val);
	}

	/**
	 * The node id of the peer pertaining to the logged record.
	 * 
	 * Note that in some cases a [`Self::channel_id`] may be filled in but this may still be
	 * `None`, depending on if the peer information is readily available in LDK when the log is
	 * generated.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_peer_id(): Uint8Array {
		const ret: number = bindings.Record_get_peer_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The node id of the peer pertaining to the logged record.
	 * 
	 * Note that in some cases a [`Self::channel_id`] may be filled in but this may still be
	 * `None`, depending on if the peer information is readily available in LDK when the log is
	 * generated.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_peer_id(val: Uint8Array|null): void {
		bindings.Record_set_peer_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The channel id of the channel pertaining to the logged record. May be a temporary id before
	 * the channel has been funded.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.Record_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel id of the channel pertaining to the logged record. May be a temporary id before
	 * the channel has been funded.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_channel_id(val: ChannelId|null): void {
		bindings.Record_set_channel_id(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * The message body.
	 */
	public get_args(): string {
		const ret: number = bindings.Record_get_args(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * The message body.
	 */
	public set_args(val: string): void {
		bindings.Record_set_args(this.ptr, bindings.encodeString(val));
	}

	/**
	 * The module path of the message.
	 */
	public get_module_path(): string {
		const ret: number = bindings.Record_get_module_path(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * The module path of the message.
	 */
	public set_module_path(val: string): void {
		bindings.Record_set_module_path(this.ptr, bindings.encodeString(val));
	}

	/**
	 * The source file containing the message.
	 */
	public get_file(): string {
		const ret: number = bindings.Record_get_file(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

	/**
	 * The source file containing the message.
	 */
	public set_file(val: string): void {
		bindings.Record_set_file(this.ptr, bindings.encodeString(val));
	}

	/**
	 * The line containing the message.
	 */
	public get_line(): number {
		const ret: number = bindings.Record_get_line(this.ptr);
		return ret;
	}

	/**
	 * The line containing the message.
	 */
	public set_line(val: number): void {
		bindings.Record_set_line(this.ptr, val);
	}

	/**
	 * The payment hash.
	 * 
	 * Note that this is only filled in for logs pertaining to a specific payment, and will be
	 * `None` for logs which are not directly related to a payment.
	 */
	public get_payment_hash(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.Record_get_payment_hash(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The payment hash.
	 * 
	 * Note that this is only filled in for logs pertaining to a specific payment, and will be
	 * `None` for logs which are not directly related to a payment.
	 */
	public set_payment_hash(val: Option_ThirtyTwoBytesZ): void {
		bindings.Record_set_payment_hash(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new Record given each field
	 * 
	 * Note that peer_id_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 * Note that channel_id_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(level_arg: Level, peer_id_arg: Uint8Array|null, channel_id_arg: ChannelId|null, args_arg: string, module_path_arg: string, file_arg: string, line_arg: number, payment_hash_arg: Option_ThirtyTwoBytesZ): Record {
		const ret: bigint = bindings.Record_new(level_arg, bindings.encodeUint8Array(peer_id_arg), channel_id_arg == null ? 0n : CommonBase.get_ptr_of(channel_id_arg), bindings.encodeString(args_arg), bindings.encodeString(module_path_arg), bindings.encodeString(file_arg), line_arg, CommonBase.get_ptr_of(payment_hash_arg));
		const ret_hu_conv: Record = new Record(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Record_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Record
	 */
	public clone(): Record {
		const ret: bigint = bindings.Record_clone(this.ptr);
		const ret_hu_conv: Record = new Record(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
