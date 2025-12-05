
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`tx_abort`] message which signals the cancellation of an in-progress transaction negotiation.
 * 
 * [`tx_abort`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-tx_abort-message
 */
export class TxAbort extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxAbort_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.TxAbort_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.TxAbort_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Message data
	 * 
	 * Returns a copy of the field.
	 */
	public get_data(): Uint8Array {
		const ret: number = bindings.TxAbort_get_data(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Message data
	 */
	public set_data(val: Uint8Array): void {
		bindings.TxAbort_set_data(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new TxAbort given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, data_arg: Uint8Array): TxAbort {
		const ret: bigint = bindings.TxAbort_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint8Array(data_arg));
		const ret_hu_conv: TxAbort = new TxAbort(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TxAbort_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TxAbort
	 */
	public clone(): TxAbort {
		const ret: bigint = bindings.TxAbort_clone(this.ptr);
		const ret_hu_conv: TxAbort = new TxAbort(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxAbort.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.TxAbort_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two TxAborts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TxAbort): boolean {
		const ret: boolean = bindings.TxAbort_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the TxAbort object into a byte array which can be read by TxAbort_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TxAbort_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxAbort from a byte array, created by TxAbort_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TxAbortDecodeErrorZ {
		const ret: bigint = bindings.TxAbort_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TxAbortDecodeErrorZ = Result_TxAbortDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
