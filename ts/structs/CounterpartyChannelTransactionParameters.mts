
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Late-bound per-channel counterparty data used to build transactions.
 */
export class CounterpartyChannelTransactionParameters extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CounterpartyChannelTransactionParameters_free);
	}

	/**
	 * Counter-party public keys
	 */
	public get_pubkeys(): ChannelPublicKeys {
		const ret: bigint = bindings.CounterpartyChannelTransactionParameters_get_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Counter-party public keys
	 */
	public set_pubkeys(val: ChannelPublicKeys): void {
		bindings.CounterpartyChannelTransactionParameters_set_pubkeys(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The contest delay selected by the counterparty, which applies to holder-broadcast transactions
	 */
	public get_selected_contest_delay(): number {
		const ret: number = bindings.CounterpartyChannelTransactionParameters_get_selected_contest_delay(this.ptr);
		return ret;
	}

	/**
	 * The contest delay selected by the counterparty, which applies to holder-broadcast transactions
	 */
	public set_selected_contest_delay(val: number): void {
		bindings.CounterpartyChannelTransactionParameters_set_selected_contest_delay(this.ptr, val);
	}

	/**
	 * Constructs a new CounterpartyChannelTransactionParameters given each field
	 */
	public static constructor_new(pubkeys_arg: ChannelPublicKeys, selected_contest_delay_arg: number): CounterpartyChannelTransactionParameters {
		const ret: bigint = bindings.CounterpartyChannelTransactionParameters_new(CommonBase.get_ptr_of(pubkeys_arg), selected_contest_delay_arg);
		const ret_hu_conv: CounterpartyChannelTransactionParameters = new CounterpartyChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CounterpartyChannelTransactionParameters_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CounterpartyChannelTransactionParameters
	 */
	public clone(): CounterpartyChannelTransactionParameters {
		const ret: bigint = bindings.CounterpartyChannelTransactionParameters_clone(this.ptr);
		const ret_hu_conv: CounterpartyChannelTransactionParameters = new CounterpartyChannelTransactionParameters(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the CounterpartyChannelTransactionParameters.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.CounterpartyChannelTransactionParameters_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two CounterpartyChannelTransactionParameterss contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: CounterpartyChannelTransactionParameters): boolean {
		const ret: boolean = bindings.CounterpartyChannelTransactionParameters_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the CounterpartyChannelTransactionParameters object into a byte array which can be read by CounterpartyChannelTransactionParameters_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.CounterpartyChannelTransactionParameters_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a CounterpartyChannelTransactionParameters from a byte array, created by CounterpartyChannelTransactionParameters_write
	 */
	public static constructor_read(ser: Uint8Array): Result_CounterpartyChannelTransactionParametersDecodeErrorZ {
		const ret: bigint = bindings.CounterpartyChannelTransactionParameters_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_CounterpartyChannelTransactionParametersDecodeErrorZ = Result_CounterpartyChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
