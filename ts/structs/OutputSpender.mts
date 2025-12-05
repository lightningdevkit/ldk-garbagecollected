

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of OutputSpender */
export interface OutputSpenderInterface {
	/**Creates a [`Transaction`] which spends the given descriptors to the given outputs, plus an
	 * output to the given change destination (if sufficient change value remains). The
	 * transaction will have a feerate, at least, of the given value.
	 * 
	 * The `locktime` argument is used to set the transaction's locktime. If `None`, the
	 * transaction will have a locktime of 0. It it recommended to set this to the current block
	 * height to avoid fee sniping, unless you have some specific reason to use a different
	 * locktime.
	 * 
	 * Returns `Err(())` if the output value is greater than the input value minus required fee,
	 * if a descriptor was duplicated, or if an output descriptor `script_pubkey`
	 * does not match the one we can spend.
	 */
	spend_spendable_outputs(descriptors: SpendableOutputDescriptor[], outputs: TxOut[], change_destination_script: Uint8Array, feerate_sat_per_1000_weight: number, locktime: Option_u32Z): Result_TransactionNoneZ;
}

class LDKOutputSpenderHolder {
	held: OutputSpender|null = null;
}

/**
 * A trait that describes a wallet capable of creating a spending [`Transaction`] from a set of
 * [`SpendableOutputDescriptor`]s.
 */
export class OutputSpender extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKOutputSpender|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OutputSpender_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of OutputSpender from a given implementation */
	public static new_impl(arg: OutputSpenderInterface): OutputSpender {
		const impl_holder: LDKOutputSpenderHolder = new LDKOutputSpenderHolder();
		let structImplementation = {
			spend_spendable_outputs (descriptors: number, outputs: number, change_destination_script: number, feerate_sat_per_1000_weight: number, locktime: bigint): bigint {
				const descriptors_conv_27_len: number = bindings.getArrayLength(descriptors);
				const descriptors_conv_27_arr: SpendableOutputDescriptor[] = new Array(descriptors_conv_27_len).fill(null);
				for (var b = 0; b < descriptors_conv_27_len; b++) {
					const descriptors_conv_27: bigint = bindings.getU64ArrayElem(descriptors, b);
					const descriptors_conv_27_hu_conv: SpendableOutputDescriptor = SpendableOutputDescriptor.constr_from_ptr(descriptors_conv_27);
					CommonBase.add_ref_from(descriptors_conv_27_hu_conv, this);
					descriptors_conv_27_arr[b] = descriptors_conv_27_hu_conv;
				}
				bindings.freeWasmMemory(descriptors)
				const outputs_conv_7_len: number = bindings.getArrayLength(outputs);
				const outputs_conv_7_arr: TxOut[] = new Array(outputs_conv_7_len).fill(null);
				for (var h = 0; h < outputs_conv_7_len; h++) {
					const outputs_conv_7: bigint = bindings.getU64ArrayElem(outputs, h);
					const outputs_conv_7_conv: TxOut = new TxOut(null, outputs_conv_7);
					outputs_conv_7_arr[h] = outputs_conv_7_conv;
				}
				bindings.freeWasmMemory(outputs)
				const change_destination_script_conv: Uint8Array = bindings.decodeUint8Array(change_destination_script);
				const locktime_hu_conv: Option_u32Z = Option_u32Z.constr_from_ptr(locktime);
				CommonBase.add_ref_from(locktime_hu_conv, this);
				const ret: Result_TransactionNoneZ = arg.spend_spendable_outputs(descriptors_conv_27_arr, outputs_conv_7_arr, change_destination_script_conv, feerate_sat_per_1000_weight, locktime_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
		} as bindings.LDKOutputSpender;
		const ptr_idx: [bigint, number] = bindings.LDKOutputSpender_new(structImplementation);

		impl_holder.held = new OutputSpender(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Creates a [`Transaction`] which spends the given descriptors to the given outputs, plus an
	 * output to the given change destination (if sufficient change value remains). The
	 * transaction will have a feerate, at least, of the given value.
	 * 
	 * The `locktime` argument is used to set the transaction's locktime. If `None`, the
	 * transaction will have a locktime of 0. It it recommended to set this to the current block
	 * height to avoid fee sniping, unless you have some specific reason to use a different
	 * locktime.
	 * 
	 * Returns `Err(())` if the output value is greater than the input value minus required fee,
	 * if a descriptor was duplicated, or if an output descriptor `script_pubkey`
	 * does not match the one we can spend.
	 */
	public spend_spendable_outputs(descriptors: SpendableOutputDescriptor[], outputs: TxOut[], change_destination_script: Uint8Array, feerate_sat_per_1000_weight: number, locktime: Option_u32Z): Result_TransactionNoneZ {
		const ret: bigint = bindings.OutputSpender_spend_spendable_outputs(this.ptr, bindings.encodeUint64Array(descriptors.map(descriptors_conv_27 => CommonBase.get_ptr_of(descriptors_conv_27))), bindings.encodeUint64Array(outputs.map(outputs_conv_7 => CommonBase.get_ptr_of(outputs_conv_7))), bindings.encodeUint8Array(change_destination_script), feerate_sat_per_1000_weight, CommonBase.get_ptr_of(locktime));
		const ret_hu_conv: Result_TransactionNoneZ = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
