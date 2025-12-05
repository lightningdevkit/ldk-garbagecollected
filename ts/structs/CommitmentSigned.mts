
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`commitment_signed`] message to be sent to or received from a peer.
 * 
 * [`commitment_signed`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#committing-updates-so-far-commitment_signed
 */
export class CommitmentSigned extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CommitmentSigned_free);
	}

	/**
	 * The channel ID
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.CommitmentSigned_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.CommitmentSigned_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * A signature on the commitment transaction
	 */
	public get_signature(): Uint8Array {
		const ret: number = bindings.CommitmentSigned_get_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A signature on the commitment transaction
	 */
	public set_signature(val: Uint8Array): void {
		bindings.CommitmentSigned_set_signature(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Signatures on the HTLC transactions
	 * 
	 * Returns a copy of the field.
	 */
	public get_htlc_signatures(): Uint8Array[] {
		const ret: number = bindings.CommitmentSigned_get_htlc_signatures(this.ptr);
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
	 * Signatures on the HTLC transactions
	 */
	public set_htlc_signatures(val: Uint8Array[]): void {
		bindings.CommitmentSigned_set_htlc_signatures(this.ptr, bindings.encodeUint32Array(val.map(val_conv_12 => bindings.encodeUint8Array(val_conv_12))));
	}

	/**
	 * The funding transaction, to discriminate among multiple pending funding transactions (e.g. in case of splicing)
	 */
	public get_funding_txid(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.CommitmentSigned_get_funding_txid(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The funding transaction, to discriminate among multiple pending funding transactions (e.g. in case of splicing)
	 */
	public set_funding_txid(val: Option_ThirtyTwoBytesZ): void {
		bindings.CommitmentSigned_set_funding_txid(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new CommitmentSigned given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, signature_arg: Uint8Array, htlc_signatures_arg: Uint8Array[], funding_txid_arg: Option_ThirtyTwoBytesZ): CommitmentSigned {
		const ret: bigint = bindings.CommitmentSigned_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint8Array(signature_arg), bindings.encodeUint32Array(htlc_signatures_arg.map(htlc_signatures_arg_conv_12 => bindings.encodeUint8Array(htlc_signatures_arg_conv_12))), CommonBase.get_ptr_of(funding_txid_arg));
		const ret_hu_conv: CommitmentSigned = new CommitmentSigned(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CommitmentSigned_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CommitmentSigned
	 */
	public clone(): CommitmentSigned {
		const ret: bigint = bindings.CommitmentSigned_clone(this.ptr);
		const ret_hu_conv: CommitmentSigned = new CommitmentSigned(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the CommitmentSigned.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.CommitmentSigned_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two CommitmentSigneds contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: CommitmentSigned): boolean {
		const ret: boolean = bindings.CommitmentSigned_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the CommitmentSigned object into a byte array which can be read by CommitmentSigned_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.CommitmentSigned_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a CommitmentSigned from a byte array, created by CommitmentSigned_write
	 */
	public static constructor_read(ser: Uint8Array): Result_CommitmentSignedDecodeErrorZ {
		const ret: bigint = bindings.CommitmentSigned_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_CommitmentSignedDecodeErrorZ = Result_CommitmentSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
