
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A [`closing_sig`] message to be sent to or received from a peer.
 * 
 * [`closing_sig`]: https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#closing-negotiation-closing_complete-and-closing_sig
 */
export class ClosingSig extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ClosingSig_free);
	}

	/**
	 * The channel ID.
	 */
	public get_channel_id(): ChannelId {
		const ret: bigint = bindings.ClosingSig_get_channel_id(this.ptr);
		const ret_hu_conv: ChannelId = new ChannelId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel ID.
	 */
	public set_channel_id(val: ChannelId): void {
		bindings.ClosingSig_set_channel_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The destination of the closer's funds on closing.
	 */
	public get_closer_scriptpubkey(): Uint8Array {
		const ret: number = bindings.ClosingSig_get_closer_scriptpubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The destination of the closer's funds on closing.
	 */
	public set_closer_scriptpubkey(val: Uint8Array): void {
		bindings.ClosingSig_set_closer_scriptpubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The destination of the closee's funds on closing.
	 */
	public get_closee_scriptpubkey(): Uint8Array {
		const ret: number = bindings.ClosingSig_get_closee_scriptpubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The destination of the closee's funds on closing.
	 */
	public set_closee_scriptpubkey(val: Uint8Array): void {
		bindings.ClosingSig_set_closee_scriptpubkey(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The proposed total fee for the closing transaction.
	 */
	public get_fee_satoshis(): bigint {
		const ret: bigint = bindings.ClosingSig_get_fee_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The proposed total fee for the closing transaction.
	 */
	public set_fee_satoshis(val: bigint): void {
		bindings.ClosingSig_set_fee_satoshis(this.ptr, val);
	}

	/**
	 * The locktime of the closing transaction.
	 */
	public get_locktime(): number {
		const ret: number = bindings.ClosingSig_get_locktime(this.ptr);
		return ret;
	}

	/**
	 * The locktime of the closing transaction.
	 */
	public set_locktime(val: number): void {
		bindings.ClosingSig_set_locktime(this.ptr, val);
	}

	/**
	 * A signature on the closing transaction omitting the `closee` output.
	 */
	public get_closer_output_only(): Option_ECDSASignatureZ {
		const ret: bigint = bindings.ClosingSig_get_closer_output_only(this.ptr);
		const ret_hu_conv: Option_ECDSASignatureZ = Option_ECDSASignatureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A signature on the closing transaction omitting the `closee` output.
	 */
	public set_closer_output_only(val: Option_ECDSASignatureZ): void {
		bindings.ClosingSig_set_closer_output_only(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * A signature on the closing transaction omitting the `closer` output.
	 */
	public get_closee_output_only(): Option_ECDSASignatureZ {
		const ret: bigint = bindings.ClosingSig_get_closee_output_only(this.ptr);
		const ret_hu_conv: Option_ECDSASignatureZ = Option_ECDSASignatureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A signature on the closing transaction omitting the `closer` output.
	 */
	public set_closee_output_only(val: Option_ECDSASignatureZ): void {
		bindings.ClosingSig_set_closee_output_only(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * A signature on the closing transaction covering both `closer` and `closee` outputs.
	 */
	public get_closer_and_closee_outputs(): Option_ECDSASignatureZ {
		const ret: bigint = bindings.ClosingSig_get_closer_and_closee_outputs(this.ptr);
		const ret_hu_conv: Option_ECDSASignatureZ = Option_ECDSASignatureZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A signature on the closing transaction covering both `closer` and `closee` outputs.
	 */
	public set_closer_and_closee_outputs(val: Option_ECDSASignatureZ): void {
		bindings.ClosingSig_set_closer_and_closee_outputs(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ClosingSig given each field
	 */
	public static constructor_new(channel_id_arg: ChannelId, closer_scriptpubkey_arg: Uint8Array, closee_scriptpubkey_arg: Uint8Array, fee_satoshis_arg: bigint, locktime_arg: number, closer_output_only_arg: Option_ECDSASignatureZ, closee_output_only_arg: Option_ECDSASignatureZ, closer_and_closee_outputs_arg: Option_ECDSASignatureZ): ClosingSig {
		const ret: bigint = bindings.ClosingSig_new(CommonBase.get_ptr_of(channel_id_arg), bindings.encodeUint8Array(closer_scriptpubkey_arg), bindings.encodeUint8Array(closee_scriptpubkey_arg), fee_satoshis_arg, locktime_arg, CommonBase.get_ptr_of(closer_output_only_arg), CommonBase.get_ptr_of(closee_output_only_arg), CommonBase.get_ptr_of(closer_and_closee_outputs_arg));
		const ret_hu_conv: ClosingSig = new ClosingSig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ClosingSig_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ClosingSig
	 */
	public clone(): ClosingSig {
		const ret: bigint = bindings.ClosingSig_clone(this.ptr);
		const ret_hu_conv: ClosingSig = new ClosingSig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ClosingSig.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ClosingSig_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ClosingSigs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ClosingSig): boolean {
		const ret: boolean = bindings.ClosingSig_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ClosingSig object into a byte array which can be read by ClosingSig_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ClosingSig_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ClosingSig from a byte array, created by ClosingSig_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ClosingSigDecodeErrorZ {
		const ret: bigint = bindings.ClosingSig_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ClosingSigDecodeErrorZ = Result_ClosingSigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
