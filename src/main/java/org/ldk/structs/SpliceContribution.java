package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * The components of a splice's funding transaction that are contributed by one party.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SpliceContribution extends CommonBase {
	private SpliceContribution(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.SpliceContribution_free(ptr); }
	}
	static SpliceContribution constr_from_ptr(long ptr) {
		bindings.LDKSpliceContribution raw_val = bindings.LDKSpliceContribution_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKSpliceContribution.SpliceIn.class) {
			return new SpliceIn(ptr, (bindings.LDKSpliceContribution.SpliceIn)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSpliceContribution.SpliceOut.class) {
			return new SpliceOut(ptr, (bindings.LDKSpliceContribution.SpliceOut)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When funds are added to a channel.
	 */
	public final static class SpliceIn extends SpliceContribution {
		/**
		 * The amount to contribute to the splice.
		*/
		public final long value;
		/**
		 * The inputs included in the splice's funding transaction to meet the contributed amount
		 * plus fees. Any excess amount will be sent to a change output.
		*/
		public final FundingTxInput[] inputs;
		/**
		 * An optional change output script. This will be used if needed or, when not set,
		 * generated using [`SignerProvider::get_destination_script`].
		 * 
		 * [`SignerProvider::get_destination_script`]: crate::sign::SignerProvider::get_destination_script
		*/
		public final org.ldk.structs.Option_CVec_u8ZZ change_script;
		private SpliceIn(long ptr, bindings.LDKSpliceContribution.SpliceIn obj) {
			super(null, ptr);
			this.value = obj.value;
			long[] inputs = obj.inputs;
			int inputs_conv_16_len = inputs.length;
			FundingTxInput[] inputs_conv_16_arr = new FundingTxInput[inputs_conv_16_len];
			for (int q = 0; q < inputs_conv_16_len; q++) {
				long inputs_conv_16 = inputs[q];
				org.ldk.structs.FundingTxInput inputs_conv_16_hu_conv = null; if (inputs_conv_16 < 0 || inputs_conv_16 > 4096) { inputs_conv_16_hu_conv = new org.ldk.structs.FundingTxInput(null, inputs_conv_16); }
				if (inputs_conv_16_hu_conv != null) { inputs_conv_16_hu_conv.ptrs_to.add(this); };
				inputs_conv_16_arr[q] = inputs_conv_16_hu_conv;
			}
			this.inputs = inputs_conv_16_arr;
			long change_script = obj.change_script;
			org.ldk.structs.Option_CVec_u8ZZ change_script_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(change_script);
			if (change_script_hu_conv != null) { change_script_hu_conv.ptrs_to.add(this); };
			this.change_script = change_script_hu_conv;
		}
	}
	/**
	 * When funds are removed from a channel.
	 */
	public final static class SpliceOut extends SpliceContribution {
		/**
		 * The outputs to include in the splice's funding transaction. The total value of all
		 * outputs plus fees will be the amount that is removed.
		*/
		public final TxOut[] outputs;
		private SpliceOut(long ptr, bindings.LDKSpliceContribution.SpliceOut obj) {
			super(null, ptr);
			long[] outputs = obj.outputs;
			int outputs_conv_7_len = outputs.length;
			TxOut[] outputs_conv_7_arr = new TxOut[outputs_conv_7_len];
			for (int h = 0; h < outputs_conv_7_len; h++) {
				long outputs_conv_7 = outputs[h];
				TxOut outputs_conv_7_conv = new TxOut(null, outputs_conv_7);
				outputs_conv_7_arr[h] = outputs_conv_7_conv;
			}
			this.outputs = outputs_conv_7_arr;
		}
	}
	long clone_ptr() {
		long ret = bindings.SpliceContribution_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the SpliceContribution
	 */
	public SpliceContribution clone() {
		long ret = bindings.SpliceContribution_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceContribution ret_hu_conv = org.ldk.structs.SpliceContribution.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpliceIn-variant SpliceContribution
	 */
	public static SpliceContribution splice_in(long value, FundingTxInput[] inputs, org.ldk.structs.Option_CVec_u8ZZ change_script) {
		long ret = bindings.SpliceContribution_splice_in(value, inputs != null ? Arrays.stream(inputs).mapToLong(inputs_conv_16 -> inputs_conv_16.ptr).toArray() : null, change_script.ptr);
		Reference.reachabilityFence(value);
		Reference.reachabilityFence(inputs);
		Reference.reachabilityFence(change_script);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceContribution ret_hu_conv = org.ldk.structs.SpliceContribution.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpliceOut-variant SpliceContribution
	 */
	public static SpliceContribution splice_out(TxOut[] outputs) {
		long ret = bindings.SpliceContribution_splice_out(outputs != null ? Arrays.stream(outputs).mapToLong(outputs_conv_7 -> outputs_conv_7.ptr).toArray() : null);
		Reference.reachabilityFence(outputs);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.SpliceContribution ret_hu_conv = org.ldk.structs.SpliceContribution.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
