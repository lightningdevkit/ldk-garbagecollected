
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * The result of a successful coin selection attempt for a transaction requiring additional UTXOs
 * to cover its fees.
 */
export class CoinSelection extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CoinSelection_free);
	}

	/**
	 * The set of UTXOs (with at least 1 confirmation) to spend and use within a transaction
	 * requiring additional fees.
	 */
	public get_confirmed_utxos(): Utxo[] {
		const ret: number = bindings.CoinSelection_get_confirmed_utxos(this.ptr);
		const ret_conv_6_len: number = bindings.getArrayLength(ret);
		const ret_conv_6_arr: Utxo[] = new Array(ret_conv_6_len).fill(null);
		for (var g = 0; g < ret_conv_6_len; g++) {
			const ret_conv_6: bigint = bindings.getU64ArrayElem(ret, g);
			const ret_conv_6_hu_conv: Utxo = new Utxo(null, ret_conv_6);
			CommonBase.add_ref_from(ret_conv_6_hu_conv, this);
			ret_conv_6_arr[g] = ret_conv_6_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_6_arr;
	}

	/**
	 * The set of UTXOs (with at least 1 confirmation) to spend and use within a transaction
	 * requiring additional fees.
	 */
	public set_confirmed_utxos(val: Utxo[]): void {
		bindings.CoinSelection_set_confirmed_utxos(this.ptr, bindings.encodeUint64Array(val.map(val_conv_6 => CommonBase.get_ptr_of(val_conv_6))));
	}

	/**
	 * An additional output tracking whether any change remained after coin selection. This output
	 * should always have a value above dust for its given `script_pubkey`. It should not be
	 * spent until the transaction it belongs to confirms to ensure mempool descendant limits are
	 * not met. This implies no other party should be able to spend it except us.
	 */
	public get_change_output(): Option_TxOutZ {
		const ret: bigint = bindings.CoinSelection_get_change_output(this.ptr);
		const ret_hu_conv: Option_TxOutZ = Option_TxOutZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * An additional output tracking whether any change remained after coin selection. This output
	 * should always have a value above dust for its given `script_pubkey`. It should not be
	 * spent until the transaction it belongs to confirms to ensure mempool descendant limits are
	 * not met. This implies no other party should be able to spend it except us.
	 */
	public set_change_output(val: Option_TxOutZ): void {
		bindings.CoinSelection_set_change_output(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new CoinSelection given each field
	 */
	public static constructor_new(confirmed_utxos_arg: Utxo[], change_output_arg: Option_TxOutZ): CoinSelection {
		const ret: bigint = bindings.CoinSelection_new(bindings.encodeUint64Array(confirmed_utxos_arg.map(confirmed_utxos_arg_conv_6 => CommonBase.get_ptr_of(confirmed_utxos_arg_conv_6))), CommonBase.get_ptr_of(change_output_arg));
		const ret_hu_conv: CoinSelection = new CoinSelection(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CoinSelection_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CoinSelection
	 */
	public clone(): CoinSelection {
		const ret: bigint = bindings.CoinSelection_clone(this.ptr);
		const ret_hu_conv: CoinSelection = new CoinSelection(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
