
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An unspent transaction output that is available to spend resulting from a successful
 * [`CoinSelection`] attempt.
 */
export class Utxo extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Utxo_free);
	}

	/**
	 * The unique identifier of the output.
	 */
	public get_outpoint(): OutPoint {
		const ret: bigint = bindings.Utxo_get_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The unique identifier of the output.
	 */
	public set_outpoint(val: OutPoint): void {
		bindings.Utxo_set_outpoint(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The output to spend.
	 */
	public get_output(): TxOut {
		const ret: bigint = bindings.Utxo_get_output(this.ptr);
		const ret_conv: TxOut = new TxOut(null, ret);
		return ret_conv;
	}

	/**
	 * The output to spend.
	 */
	public set_output(val: TxOut): void {
		bindings.Utxo_set_output(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and [`TxIn::witness`], each
	 * with their lengths included, required to satisfy the output's script. The weight consumed by
	 * the input's `script_sig` must account for [`WITNESS_SCALE_FACTOR`].
	 */
	public get_satisfaction_weight(): bigint {
		const ret: bigint = bindings.Utxo_get_satisfaction_weight(this.ptr);
		return ret;
	}

	/**
	 * The upper-bound weight consumed by the input's full [`TxIn::script_sig`] and [`TxIn::witness`], each
	 * with their lengths included, required to satisfy the output's script. The weight consumed by
	 * the input's `script_sig` must account for [`WITNESS_SCALE_FACTOR`].
	 */
	public set_satisfaction_weight(val: bigint): void {
		bindings.Utxo_set_satisfaction_weight(this.ptr, val);
	}

	/**
	 * Constructs a new Utxo given each field
	 */
	public static constructor_new(outpoint_arg: OutPoint, output_arg: TxOut, satisfaction_weight_arg: bigint): Utxo {
		const ret: bigint = bindings.Utxo_new(CommonBase.get_ptr_of(outpoint_arg), CommonBase.get_ptr_of(output_arg), satisfaction_weight_arg);
		const ret_hu_conv: Utxo = new Utxo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Utxo_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Utxo
	 */
	public clone(): Utxo {
		const ret: bigint = bindings.Utxo_clone(this.ptr);
		const ret_hu_conv: Utxo = new Utxo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Utxo.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Utxo_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two Utxos contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: Utxo): boolean {
		const ret: boolean = bindings.Utxo_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the Utxo object into a byte array which can be read by Utxo_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Utxo_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Utxo from a byte array, created by Utxo_write
	 */
	public static constructor_read(ser: Uint8Array): Result_UtxoDecodeErrorZ {
		const ret: bigint = bindings.Utxo_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_UtxoDecodeErrorZ = Result_UtxoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns a `Utxo` with the `satisfaction_weight` estimate for a legacy P2PKH output.
	 */
	public static constructor_new_p2pkh(outpoint: OutPoint, value: bigint, pubkey_hash: Uint8Array): Utxo {
		const ret: bigint = bindings.Utxo_new_p2pkh(CommonBase.get_ptr_of(outpoint), value, bindings.encodeUint8Array(pubkey_hash));
		const ret_hu_conv: Utxo = new Utxo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
