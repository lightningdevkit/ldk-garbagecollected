
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * [`A tx_complete`] message signalling the conclusion of a peer's transaction contributions during
 * interactive transaction construction.
 * 
 * [`tx_complete`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-tx_complete-message
 */
export class TxComplete extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxComplete_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.TxComplete_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.TxComplete_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new TxComplete given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId): TxComplete {
		const ret: bigint = bindings.TxComplete_new(CommonBase.get_ptr_of(channel_id_arg));
		const ret_hu_conv: TxComplete = new TxComplete(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TxComplete_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TxComplete
	 */
	public clone(): TxComplete {
		const ret: bigint = bindings.TxComplete_clone(this.ptr);
		const ret_hu_conv: TxComplete = new TxComplete(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxComplete.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.TxComplete_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two TxCompletes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TxComplete): boolean {
		const ret: boolean = bindings.TxComplete_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the TxComplete object into a byte array which can be read by TxComplete_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TxComplete_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxComplete from a byte array, created by TxComplete_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TxCompleteDecodeErrorZ {
		const ret: bigint = bindings.TxComplete_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TxCompleteDecodeErrorZ = Result_TxCompleteDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
