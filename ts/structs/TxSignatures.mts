
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`tx_signatures`] message containing the sender's signatures for a transaction constructed with
 * interactive transaction construction.
 * 
 * [`tx_signatures`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-tx_signatures-message
 */
export class TxSignatures extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TxSignatures_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.TxSignatures_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.TxSignatures_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The TXID
	 */
	public get_tx_hash(): Uint8Array {
		const ret: number = bindings.TxSignatures_get_tx_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The TXID
	 */
	public set_tx_hash(val: Uint8Array): void {
		bindings.TxSignatures_set_tx_hash(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The list of witnesses
	 * 
	 * Returns a copy of the field.
	 */
	public get_witnesses(): Uint8Array[] {
		const ret: number = bindings.TxSignatures_get_witnesses(this.ptr);
		const ret_conv_12_len: number = bindings.getArrayLength(ret);
		const ret_conv_12_arr: Uint8Array[] = new Array(ret_conv_12_len).fill(null);
		for (var m = 0; m < ret_conv_12_len; m++) {
			const ret_conv_12: number = bindings.getU32ArrayElem(ret, m);
			const ret_conv_12_conv: Uint8Array = bindings.decodeUint8Array(ret_conv_12);
			ret_conv_12_arr[m] = ret_conv_12_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_12_arr;
	}

	/**
	 * The list of witnesses
	 */
	public set_witnesses(val: Uint8Array[]): void {
		bindings.TxSignatures_set_witnesses(this.ptr, bindings.encodeUint32Array(val.map(val_conv_12 => bindings.encodeUint8Array(val_conv_12))));
	}

	/**
	 * Optional signature for the shared input -- the previous funding outpoint -- signed by both peers
	 */
	public get_shared_input_signature(): Option_ECDSASignatureZ {
		const ret: bigint = bindings.TxSignatures_get_shared_input_signature(this.ptr);
		const ret_hu_conv: Option_ECDSASignatureZ = Option_ECDSASignatureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Optional signature for the shared input -- the previous funding outpoint -- signed by both peers
	 */
	public set_shared_input_signature(val: Option_ECDSASignatureZ): void {
		bindings.TxSignatures_set_shared_input_signature(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new TxSignatures given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, tx_hash_arg: Uint8Array, witnesses_arg: Uint8Array[], shared_input_signature_arg: Option_ECDSASignatureZ): TxSignatures {
		const ret: bigint = bindings.TxSignatures_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint8Array(tx_hash_arg), bindings.encodeUint32Array(witnesses_arg.map(witnesses_arg_conv_12 => bindings.encodeUint8Array(witnesses_arg_conv_12))), CommonBase.get_ptr_of(shared_input_signature_arg));
		const ret_hu_conv: TxSignatures = new TxSignatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.TxSignatures_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the TxSignatures
	 */
	public clone(): TxSignatures {
		const ret: bigint = bindings.TxSignatures_clone(this.ptr);
		const ret_hu_conv: TxSignatures = new TxSignatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the TxSignatures.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.TxSignatures_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two TxSignaturess contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: TxSignatures): boolean {
		const ret: boolean = bindings.TxSignatures_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the TxSignatures object into a byte array which can be read by TxSignatures_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.TxSignatures_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a TxSignatures from a byte array, created by TxSignatures_write
	 */
	public static constructor_read(ser: Uint8Array): Result_TxSignaturesDecodeErrorZ {
		const ret: bigint = bindings.TxSignatures_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_TxSignaturesDecodeErrorZ = Result_TxSignaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
