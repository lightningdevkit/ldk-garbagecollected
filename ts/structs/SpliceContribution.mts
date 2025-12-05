
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * The components of a splice's funding transaction that are contributed by one party.
 */
export class SpliceContribution extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.SpliceContribution_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): SpliceContribution {
		const raw_ty: number = bindings.LDKSpliceContribution_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SpliceContribution_SpliceIn(ptr);
			case 1: return new SpliceContribution_SpliceOut(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.SpliceContribution_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceContribution
	 */
	public clone(): SpliceContribution {
		const ret: bigint = bindings.SpliceContribution_clone(this.ptr);
		const ret_hu_conv: SpliceContribution = SpliceContribution.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpliceIn-variant SpliceContribution
	 */
	public static constructor_splice_in(value: bigint, inputs: FundingTxInput[], change_script: Option_CVec_u8ZZ): SpliceContribution {
		const ret: bigint = bindings.SpliceContribution_splice_in(value, bindings.encodeUint64Array(inputs.map(inputs_conv_16 => CommonBase.get_ptr_of(inputs_conv_16))), CommonBase.get_ptr_of(change_script));
		const ret_hu_conv: SpliceContribution = SpliceContribution.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpliceOut-variant SpliceContribution
	 */
	public static constructor_splice_out(outputs: TxOut[]): SpliceContribution {
		const ret: bigint = bindings.SpliceContribution_splice_out(bindings.encodeUint64Array(outputs.map(outputs_conv_7 => CommonBase.get_ptr_of(outputs_conv_7))));
		const ret_hu_conv: SpliceContribution = SpliceContribution.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
/** A SpliceContribution of type SpliceIn */
export class SpliceContribution_SpliceIn extends SpliceContribution {
	/**
	 * The amount to contribute to the splice.
	 */
	public value: bigint;
	/**
	 * The inputs included in the splice's funding transaction to meet the contributed amount
	 * plus fees. Any excess amount will be sent to a change output.
	 */
	public inputs: FundingTxInput[];
	/**
	 * An optional change output script. This will be used if needed or, when not set,
	 * generated using [`SignerProvider::get_destination_script`].
	 * 
	 * [`SignerProvider::get_destination_script`]: crate::sign::SignerProvider::get_destination_script
	 */
	public change_script: Option_CVec_u8ZZ;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.value = bindings.LDKSpliceContribution_SpliceIn_get_value(ptr);
		const inputs: number = bindings.LDKSpliceContribution_SpliceIn_get_inputs(ptr);
		const inputs_conv_16_len: number = bindings.getArrayLength(inputs);
			const inputs_conv_16_arr: FundingTxInput[] = new Array(inputs_conv_16_len).fill(null);
			for (var q = 0; q < inputs_conv_16_len; q++) {
				const inputs_conv_16: bigint = bindings.getU64ArrayElem(inputs, q);
				const inputs_conv_16_hu_conv: FundingTxInput = new FundingTxInput(null, inputs_conv_16);
				CommonBase.add_ref_from(inputs_conv_16_hu_conv, this);
				inputs_conv_16_arr[q] = inputs_conv_16_hu_conv;
			}
			bindings.freeWasmMemory(inputs)
		this.inputs = inputs_conv_16_arr;
		const change_script: bigint = bindings.LDKSpliceContribution_SpliceIn_get_change_script(ptr);
		const change_script_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(change_script);
			CommonBase.add_ref_from(change_script_hu_conv, this);
		this.change_script = change_script_hu_conv;
	}
}
/** A SpliceContribution of type SpliceOut */
export class SpliceContribution_SpliceOut extends SpliceContribution {
	/**
	 * The outputs to include in the splice's funding transaction. The total value of all
	 * outputs plus fees will be the amount that is removed.
	 */
	public outputs: TxOut[];
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const outputs: number = bindings.LDKSpliceContribution_SpliceOut_get_outputs(ptr);
		const outputs_conv_7_len: number = bindings.getArrayLength(outputs);
			const outputs_conv_7_arr: TxOut[] = new Array(outputs_conv_7_len).fill(null);
			for (var h = 0; h < outputs_conv_7_len; h++) {
				const outputs_conv_7: bigint = bindings.getU64ArrayElem(outputs, h);
				const outputs_conv_7_conv: TxOut = new TxOut(null, outputs_conv_7);
				outputs_conv_7_arr[h] = outputs_conv_7_conv;
			}
			bindings.freeWasmMemory(outputs)
		this.outputs = outputs_conv_7_arr;
	}
}
