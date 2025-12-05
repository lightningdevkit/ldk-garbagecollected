
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information about a spendable output to our \"payment key\".
 * 
 * See [`SpendableOutputDescriptor::StaticPaymentOutput`] for more details on how to spend this.
 */
export class StaticPaymentOutputDescriptor extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.StaticPaymentOutputDescriptor_free);
	}

	/**
	 * The outpoint which is spendable.
	 */
	public get_outpoint(): OutPoint {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_get_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The outpoint which is spendable.
	 */
	public set_outpoint(val: OutPoint): void {
		bindings.StaticPaymentOutputDescriptor_set_outpoint(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public get_output(): TxOut {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_get_output(this.ptr);
		const ret_conv: TxOut = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The output which is referenced by the given outpoint.
	 */
	public set_output(val: TxOut): void {
		bindings.StaticPaymentOutputDescriptor_set_output(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public get_channel_keys_id(): Uint8Array {
		const ret: number = bindings.StaticPaymentOutputDescriptor_get_channel_keys_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Arbitrary identification information returned by a call to [`ChannelSigner::channel_keys_id`].
	 * This may be useful in re-deriving keys used in the channel to spend the output.
	 */
	public set_channel_keys_id(val: Uint8Array): void {
		bindings.StaticPaymentOutputDescriptor_set_channel_keys_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The value of the channel which this transactions spends.
	 */
	public get_channel_value_satoshis(): bigint {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_get_channel_value_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The value of the channel which this transactions spends.
	 */
	public set_channel_value_satoshis(val: bigint): void {
		bindings.StaticPaymentOutputDescriptor_set_channel_value_satoshis(this.ptr, val);
	}

	/**
	 * The necessary channel parameters that need to be provided to the signer.
	 * 
	 * Added as optional, but always `Some` if the descriptor was produced in v0.0.117 or later.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public get_channel_transaction_parameters(): ChannelTransactionParameters {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_get_channel_transaction_parameters(this.ptr);
		const ret_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The necessary channel parameters that need to be provided to the signer.
	 * 
	 * Added as optional, but always `Some` if the descriptor was produced in v0.0.117 or later.
	 * 
	 * Note that val (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public set_channel_transaction_parameters(val: ChannelTransactionParameters|null): void {
		bindings.StaticPaymentOutputDescriptor_set_channel_transaction_parameters(this.ptr, val == null ? 0n : CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new StaticPaymentOutputDescriptor given each field
	 * 
	 * Note that channel_transaction_parameters_arg (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public static constructor_new(outpoint_arg: OutPoint, output_arg: TxOut, channel_keys_id_arg: Uint8Array, channel_value_satoshis_arg: bigint, channel_transaction_parameters_arg: ChannelTransactionParameters|null): StaticPaymentOutputDescriptor {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_new(CommonBase.get_ptr_of(outpoint_arg), CommonBase.get_ptr_of(output_arg), bindings.encodeUint8Array(channel_keys_id_arg), channel_value_satoshis_arg, channel_transaction_parameters_arg == null ? 0n : CommonBase.get_ptr_of(channel_transaction_parameters_arg));
		const ret_hu_conv: StaticPaymentOutputDescriptor = new StaticPaymentOutputDescriptor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the StaticPaymentOutputDescriptor
	 */
	public clone(): StaticPaymentOutputDescriptor {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_clone(this.ptr);
		const ret_hu_conv: StaticPaymentOutputDescriptor = new StaticPaymentOutputDescriptor(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the StaticPaymentOutputDescriptor.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two StaticPaymentOutputDescriptors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: StaticPaymentOutputDescriptor): boolean {
		const ret: boolean = bindings.StaticPaymentOutputDescriptor_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Returns the `witness_script` of the spendable output.
	 * 
	 * Note that this will only return `Some` for [`StaticPaymentOutputDescriptor`]s that
	 * originated from an anchor outputs channel, as they take the form of a P2WSH script.
	 */
	public witness_script(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_witness_script(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The maximum length a well-formed witness spending one of these should have.
	 * 
	 * Note: If you have the `grind_signatures` feature enabled, this will be at least 1 byte
	 * shorter.
	 */
	public max_witness_length(): bigint {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_max_witness_length(this.ptr);
		return ret;
	}

	/**
	 * Returns true if spending this output requires a transaction with a CheckSequenceVerify
	 * value of at least 1.
	 */
	public needs_csv_1_for_spend(): boolean {
		const ret: boolean = bindings.StaticPaymentOutputDescriptor_needs_csv_1_for_spend(this.ptr);
		return ret;
	}

	/**
	 * Serialize the StaticPaymentOutputDescriptor object into a byte array which can be read by StaticPaymentOutputDescriptor_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.StaticPaymentOutputDescriptor_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a StaticPaymentOutputDescriptor from a byte array, created by StaticPaymentOutputDescriptor_write
	 */
	public static constructor_read(ser: Uint8Array): Result_StaticPaymentOutputDescriptorDecodeErrorZ {
		const ret: bigint = bindings.StaticPaymentOutputDescriptor_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_StaticPaymentOutputDescriptorDecodeErrorZ = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
