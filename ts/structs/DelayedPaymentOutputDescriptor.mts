
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information about a spendable output to a P2WSH script.
 * 
 * See [`SpendableOutputDescriptor::DelayedPaymentOutput`] for more details on how to spend this.
 */
export class DelayedPaymentOutputDescriptor extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.DelayedPaymentOutputDescriptor_free);
	}

	/**
	 * The outpoint which is spendable.
	 */
	public get_outpoint(): OutPoint {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_get_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The outpoint which is spendable.
	 */
	public set_outpoint(val: OutPoint): void {
		bindings.DelayedPaymentOutputDescriptor_set_outpoint(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Per commitment point to derive the delayed payment key by key holder.
	 */
	public get_per_commitment_point(): Uint8Array {
		const ret: number = bindings.DelayedPaymentOutputDescriptor_get_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Per commitment point to derive the delayed payment key by key holder.
	 */
	public set_per_commitment_point(val: Uint8Array): void {
		bindings.DelayedPaymentOutputDescriptor_set_per_commitment_point(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The `nSequence` value which must be set in the spending input to satisfy the `OP_CSV` in
	 * the witness_script.
	 */
	public get_to_self_delay(): number {
		const ret: number = bindings.DelayedPaymentOutputDescriptor_get_to_self_delay(this.ptr);
		return ret;
	}

	/**
	 * The `nSequence` value which must be set in the spending input to satisfy the `OP_CSV` in
	 * the witness_script.
	 */
	public set_to_self_delay(val: number): void {
		bindings.DelayedPaymentOutputDescriptor_set_to_self_delay(this.ptr, val);
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public get_output(): TxOut {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_get_output(this.ptr);
		const ret_conv: TxOut = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public set_output(val: TxOut): void {
		bindings.DelayedPaymentOutputDescriptor_set_output(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The revocation point specific to the commitment transaction which was broadcast. Used to
	 * derive the witnessScript for this output.
	 */
	public get_revocation_pubkey(): RevocationKey {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_get_revocation_pubkey(this.ptr);
		const ret_hu_conv: RevocationKey = new RevocationKey(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The revocation point specific to the commitment transaction which was broadcast. Used to
	 * derive the witnessScript for this output.
	 */
	public set_revocation_pubkey(val: RevocationKey): void {
		bindings.DelayedPaymentOutputDescriptor_set_revocation_pubkey(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public get_channel_keys_id(): Uint8Array {
		const ret: number = bindings.DelayedPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public set_channel_keys_id(val: Uint8Array): void {
		bindings.DelayedPaymentOutputDescriptor_set_channel_keys_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The value of the channel which this output originated from, possibly indirectly.
	 */
	public get_channel_value_satoshis(): bigint {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The value of the channel which this output originated from, possibly indirectly.
	 */
	public set_channel_value_satoshis(val: bigint): void {
		bindings.DelayedPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
	}

	/**
	 * The channel public keys and other parameters needed to generate a spending transaction or
	 * to provide to a signer.
	 * 
	 * Added as optional, but always `Some` if the descriptor was produced in v0.0.123 or later.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_channel_transaction_parameters(): ChannelTransactionParameters {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_get_channel_transaction_parameters(this.ptr);
		const ret_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The channel public keys and other parameters needed to generate a spending transaction or
	 * to provide to a signer.
	 * 
	 * Added as optional, but always `Some` if the descriptor was produced in v0.0.123 or later.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_channel_transaction_parameters(val: ChannelTransactionParameters|null): void {
		bindings.DelayedPaymentOutputDescriptor_set_channel_transaction_parameters(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new DelayedPaymentOutputDescriptor given each field
	 * 
	 * Note that channel_transaction_parameters_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(outpoint_arg: OutPoint, per_commitment_point_arg: Uint8Array, to_self_delay_arg: number, output_arg: TxOut, revocation_pubkey_arg: RevocationKey, channel_keys_id_arg: Uint8Array, channel_value_satoshis_arg: bigint, channel_transaction_parameters_arg: ChannelTransactionParameters|null): DelayedPaymentOutputDescriptor {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_new(CommonBase.get_ptr_of(outpoint_arg), bindings.encodeUint8Array(per_commitment_point_arg), to_self_delay_arg, CommonBase.get_ptr_of(output_arg), CommonBase.get_ptr_of(revocation_pubkey_arg), bindings.encodeUint8Array(channel_keys_id_arg), channel_value_satoshis_arg, channel_transaction_parameters_arg == null ? 0n : CommonBase.get_ptr_of(channel_transaction_parameters_arg));
		const ret_hu_conv: DelayedPaymentOutputDescriptor = new DelayedPaymentOutputDescriptor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the DelayedPaymentOutputDescriptor
	 */
	public clone(): DelayedPaymentOutputDescriptor {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_clone(this.ptr);
		const ret_hu_conv: DelayedPaymentOutputDescriptor = new DelayedPaymentOutputDescriptor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the DelayedPaymentOutputDescriptor.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two DelayedPaymentOutputDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: DelayedPaymentOutputDescriptor): boolean {
		const ret: boolean = bindings.DelayedPaymentOutputDescriptor_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the DelayedPaymentOutputDescriptor object into a byte array which can be read by DelayedPaymentOutputDescriptor_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.DelayedPaymentOutputDescriptor_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a DelayedPaymentOutputDescriptor from a byte array, created by DelayedPaymentOutputDescriptor_write
	 */
	public static constructor_read(ser: Uint8Array): Result_DelayedPaymentOutputDescriptorDecodeErrorZ {
		const ret: bigint = bindings.DelayedPaymentOutputDescriptor_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_DelayedPaymentOutputDescriptorDecodeErrorZ = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
