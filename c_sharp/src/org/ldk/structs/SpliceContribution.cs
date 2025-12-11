using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * The components of a splice's funding transaction that are contributed by one party.
 */
public class SpliceContribution : CommonBase {
	protected SpliceContribution(object _dummy, long ptr) : base(ptr) { }
	~SpliceContribution() {
		if (ptr != 0) { bindings.SpliceContribution_free(ptr); }
	}

	internal static SpliceContribution constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKSpliceContribution_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new SpliceContribution_SpliceIn(ptr);
			case 1: return new SpliceContribution_SpliceOut(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A SpliceContribution of type SpliceIn */
	public class SpliceContribution_SpliceIn : SpliceContribution {
		/**
		 * The amount to contribute to the splice.
		 */
		public long value;
		/**
		 * The inputs included in the splice's funding transaction to meet the contributed amount
		 * plus fees. Any excess amount will be sent to a change output.
		 */
		public FundingTxInput[] inputs;
		/**
		 * An optional change output script. This will be used if needed or, when not set,
		 * generated using [`SignerProvider::get_destination_script`].
		 * 
		 * [`SignerProvider::get_destination_script`]: crate::sign::SignerProvider::get_destination_script
		 */
		public org.ldk.structs.Option_CVec_u8ZZ change_script;
		internal SpliceContribution_SpliceIn(long ptr) : base(null, ptr) {
			this.value = bindings.LDKSpliceContribution_SpliceIn_get_value(ptr);
			long inputs = bindings.LDKSpliceContribution_SpliceIn_get_inputs(ptr);
			int inputs_conv_16_len = InternalUtils.getArrayLength(inputs);
			FundingTxInput[] inputs_conv_16_arr = new FundingTxInput[inputs_conv_16_len];
			for (int q = 0; q < inputs_conv_16_len; q++) {
				long inputs_conv_16 = InternalUtils.getU64ArrayElem(inputs, q);
				org.ldk.structs.FundingTxInput inputs_conv_16_hu_conv = null; if (inputs_conv_16 < 0 || inputs_conv_16 > 4096) { inputs_conv_16_hu_conv = new org.ldk.structs.FundingTxInput(null, inputs_conv_16); }
				if (inputs_conv_16_hu_conv != null) { inputs_conv_16_hu_conv.ptrs_to.AddLast(this); };
				inputs_conv_16_arr[q] = inputs_conv_16_hu_conv;
			}
			bindings.free_buffer(inputs);
			this.inputs = inputs_conv_16_arr;
			long change_script = bindings.LDKSpliceContribution_SpliceIn_get_change_script(ptr);
			org.ldk.structs.Option_CVec_u8ZZ change_script_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(change_script);
			if (change_script_hu_conv != null) { change_script_hu_conv.ptrs_to.AddLast(this); };
			this.change_script = change_script_hu_conv;
		}
	}
	/** A SpliceContribution of type SpliceOut */
	public class SpliceContribution_SpliceOut : SpliceContribution {
		/**
		 * The outputs to include in the splice's funding transaction. The total value of all
		 * outputs plus fees will be the amount that is removed.
		 */
		public TxOut[] outputs;
		internal SpliceContribution_SpliceOut(long ptr) : base(null, ptr) {
			long outputs = bindings.LDKSpliceContribution_SpliceOut_get_outputs(ptr);
			int outputs_conv_7_len = InternalUtils.getArrayLength(outputs);
			TxOut[] outputs_conv_7_arr = new TxOut[outputs_conv_7_len];
			for (int h = 0; h < outputs_conv_7_len; h++) {
				long outputs_conv_7 = InternalUtils.getU64ArrayElem(outputs, h);
				TxOut outputs_conv_7_conv = new TxOut(null, outputs_conv_7);
				outputs_conv_7_arr[h] = outputs_conv_7_conv;
			}
			bindings.free_buffer(outputs);
			this.outputs = outputs_conv_7_arr;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.SpliceContribution_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceContribution
	 */
	public org.ldk.structs.SpliceContribution clone() {
		long ret = bindings.SpliceContribution_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceContribution ret_hu_conv = org.ldk.structs.SpliceContribution.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpliceIn-variant SpliceContribution
	 */
	public static org.ldk.structs.SpliceContribution splice_in(long value, FundingTxInput[] inputs, org.ldk.structs.Option_CVec_u8ZZ change_script) {
		long ret = bindings.SpliceContribution_splice_in(value, InternalUtils.encodeUint64Array(InternalUtils.mapArray(inputs, inputs_conv_16 => inputs_conv_16.ptr)), change_script.ptr);
		GC.KeepAlive(value);
		GC.KeepAlive(inputs);
		GC.KeepAlive(change_script);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceContribution ret_hu_conv = org.ldk.structs.SpliceContribution.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpliceOut-variant SpliceContribution
	 */
	public static org.ldk.structs.SpliceContribution splice_out(TxOut[] outputs) {
		long ret = bindings.SpliceContribution_splice_out(InternalUtils.encodeUint64Array(InternalUtils.mapArray(outputs, outputs_conv_7 => outputs_conv_7.ptr)));
		GC.KeepAlive(outputs);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceContribution ret_hu_conv = org.ldk.structs.SpliceContribution.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

}
} } }
