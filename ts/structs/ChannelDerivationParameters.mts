
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The parameters required to derive a channel signer via [`SignerProvider`].
 */
export class ChannelDerivationParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelDerivationParameters_free);
	}

	/**
	 * The value in satoshis of the channel we're attempting to spend the anchor output of.
	 */
	public get_value_satoshis(): bigint {
		const ret: bigint = bindings.ChannelDerivationParameters_get_value_satoshis(this.ptr);
		return ret;
	}

	/**
	 * The value in satoshis of the channel we're attempting to spend the anchor output of.
	 */
	public set_value_satoshis(val: bigint): void {
		bindings.ChannelDerivationParameters_set_value_satoshis(this.ptr, val);
	}

	/**
	 * The unique identifier to re-derive the signer for the associated channel.
	 */
	public get_keys_id(): Uint8Array {
		const ret: number = bindings.ChannelDerivationParameters_get_keys_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The unique identifier to re-derive the signer for the associated channel.
	 */
	public set_keys_id(val: Uint8Array): void {
		bindings.ChannelDerivationParameters_set_keys_id(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The necessary channel parameters that need to be provided to the signer.
	 */
	public get_transaction_parameters(): ChannelTransactionParameters {
		const ret: bigint = bindings.ChannelDerivationParameters_get_transaction_parameters(this.ptr);
		const ret_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The necessary channel parameters that need to be provided to the signer.
	 */
	public set_transaction_parameters(val: ChannelTransactionParameters): void {
		bindings.ChannelDerivationParameters_set_transaction_parameters(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new ChannelDerivationParameters given each field
	 */
	public static constructor_new(value_satoshis_arg: bigint, keys_id_arg: Uint8Array, transaction_parameters_arg: ChannelTransactionParameters): ChannelDerivationParameters {
		const ret: bigint = bindings.ChannelDerivationParameters_new(value_satoshis_arg, bindings.encodeUint8Array(keys_id_arg), CommonBase.get_ptr_of(transaction_parameters_arg));
		const ret_hu_conv: ChannelDerivationParameters = new ChannelDerivationParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ChannelDerivationParameters_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ChannelDerivationParameters
	 */
	public clone(): ChannelDerivationParameters {
		const ret: bigint = bindings.ChannelDerivationParameters_clone(this.ptr);
		const ret_hu_conv: ChannelDerivationParameters = new ChannelDerivationParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Checks if two ChannelDerivationParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ChannelDerivationParameters): boolean {
		const ret: boolean = bindings.ChannelDerivationParameters_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the ChannelDerivationParameters object into a byte array which can be read by ChannelDerivationParameters_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.ChannelDerivationParameters_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ChannelDerivationParameters from a byte array, created by ChannelDerivationParameters_write
	 */
	public static constructor_read(ser: Uint8Array): Result_ChannelDerivationParametersDecodeErrorZ {
		const ret: bigint = bindings.ChannelDerivationParameters_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_ChannelDerivationParametersDecodeErrorZ = Result_ChannelDerivationParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
