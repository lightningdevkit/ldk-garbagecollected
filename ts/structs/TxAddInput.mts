
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`tx_add_input`] message for adding an input during interactive transaction construction
 * 
 * [`tx_add_input`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-tx_add_input-message
 */
export class TxAddInput extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxAddInput_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.TxAddInput_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.TxAddInput_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * A randomly chosen unique identifier for this input, which is even for initiators and odd for
	 * non-initiators.
	 */
	public get_serial_id(): bigint {
		const ret: bigint = bindings.TxAddInput_get_serial_id(this.ptr);
		return ret;
	}

	/**
	 * A randomly chosen unique identifier for this input, which is even for initiators and odd for
	 * non-initiators.
	 */
	public set_serial_id(val: bigint): void {
		bindings.TxAddInput_set_serial_id(this.ptr, val);
	}

	/**
	 * Serialized transaction that contains the output this input spends to verify that it is
	 * non-malleable. Omitted for shared input.
	 */
	public get_prevtx(): Option_TransactionZ {
		const ret: bigint = bindings.TxAddInput_get_prevtx(this.ptr);
		const ret_hu_conv: Option_TransactionZ = Option_TransactionZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialized transaction that contains the output this input spends to verify that it is
	 * non-malleable. Omitted for shared input.
	 */
	public set_prevtx(val: Option_TransactionZ): void {
		bindings.TxAddInput_set_prevtx(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The index of the output being spent
	 */
	public get_prevtx_out(): number {
		const ret: number = bindings.TxAddInput_get_prevtx_out(this.ptr);
		return ret;
	}

	/**
	 * The index of the output being spent
	 */
	public set_prevtx_out(val: number): void {
		bindings.TxAddInput_set_prevtx_out(this.ptr, val);
	}

	/**
	 * The sequence number of this input
	 */
	public get_sequence(): number {
		const ret: number = bindings.TxAddInput_get_sequence(this.ptr);
		return ret;
	}

	/**
	 * The sequence number of this input
	 */
	public set_sequence(val: number): void {
		bindings.TxAddInput_set_sequence(this.ptr, val);
	}

	/**
	 * The ID of the previous funding transaction, when it is being added as an input during splicing
	 */
	public get_shared_input_txid(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.TxAddInput_get_shared_input_txid(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The ID of the previous funding transaction, when it is being added as an input during splicing
	 */
	public set_shared_input_txid(val: Option_ThirtyTwoBytesZ): void {
		bindings.TxAddInput_set_shared_input_txid(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new TxAddInput given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, serial_id_arg: bigint, prevtx_arg: Option_TransactionZ, prevtx_out_arg: number, sequence_arg: number, shared_input_txid_arg: Option_ThirtyTwoBytesZ): TxAddInput {
		const ret: bigint = bindings.TxAddInput_new(CommonBase.get_ptr_of(channel_id_arg), serial_id_arg, CommonBase.get_ptr_of(prevtx_arg), prevtx_out_arg, sequence_arg, CommonBase.get_ptr_of(shared_input_txid_arg));
		const ret_hu_conv: TxAddInput = new TxAddInput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TxAddInput_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TxAddInput
	 */
	public clone(): TxAddInput {
		const ret: bigint = bindings.TxAddInput_clone(this.ptr);
		const ret_hu_conv: TxAddInput = new TxAddInput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxAddInput.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.TxAddInput_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two TxAddInputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TxAddInput): boolean {
		const ret: boolean = bindings.TxAddInput_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the TxAddInput object into a byte array which can be read by TxAddInput_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TxAddInput_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxAddInput from a byte array, created by TxAddInput_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TxAddInputDecodeErrorZ {
		const ret: bigint = bindings.TxAddInput_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TxAddInputDecodeErrorZ = Result_TxAddInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
