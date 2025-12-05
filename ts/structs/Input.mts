
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An input that must be included in a transaction when performing coin selection through
 * [`CoinSelectionSource::select_confirmed_utxos`]. It is guaranteed to be a SegWit input, so it
 * must have an empty [`TxIn::script_sig`] when spent.
 */
export class Input extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Input_free);
	}

	/**
	 * The unique identifier of the input.
	 */
	public get_outpoint(): OutPoint {
		const ret: bigint = bindings.Input_get_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The unique identifier of the input.
	 */
	public set_outpoint(val: OutPoint): void {
		bindings.Input_set_outpoint(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The UTXO being spent by the input.
	 */
	public get_previous_utxo(): TxOut {
		const ret: bigint = bindings.Input_get_previous_utxo(this.ptr);
		const ret_conv: TxOut = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The UTXO being spent by the input.
	 */
	public set_previous_utxo(val: TxOut): void {
		bindings.Input_set_previous_utxo(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and
	 * [`TxIn::witness`], each with their lengths included, required to satisfy the output's
	 * script.
	 */
	public get_satisfaction_weight(): bigint {
		const ret: bigint = bindings.Input_get_satisfaction_weight(this.ptr);
		return ret;
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and
	 * [`TxIn::witness`], each with their lengths included, required to satisfy the output's
	 * script.
	 */
	public set_satisfaction_weight(val: bigint): void {
		bindings.Input_set_satisfaction_weight(this.ptr, val);
	}

	/**
	 * Constructs a new Input given each field
	 */
	public static constructor_new(outpoint_arg: OutPoint, previous_utxo_arg: TxOut, satisfaction_weight_arg: bigint): Input {
		const ret: bigint = bindings.Input_new(CommonBase.get_ptr_of(outpoint_arg), CommonBase.get_ptr_of(previous_utxo_arg), satisfaction_weight_arg);
		const ret_hu_conv: Input = new Input(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Input_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Input
	 */
	public clone(): Input {
		const ret: bigint = bindings.Input_clone(this.ptr);
		const ret_hu_conv: Input = new Input(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Input.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Input_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Inputs contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Input): boolean {
		const ret: boolean = bindings.Input_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

}
