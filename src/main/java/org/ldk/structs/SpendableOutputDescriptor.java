package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SpendableOutputDescriptor extends CommonBase {
	private SpendableOutputDescriptor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		bindings.SpendableOutputDescriptor_free(ptr);
	}
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
	static SpendableOutputDescriptor constr_from_ptr(long ptr) {
		bindings.LDKSpendableOutputDescriptor raw_val = bindings.LDKSpendableOutputDescriptor_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKSpendableOutputDescriptor.StaticOutput.class) {
			return new StaticOutput(ptr, (bindings.LDKSpendableOutputDescriptor.StaticOutput)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSpendableOutputDescriptor.DynamicOutputP2WSH.class) {
			return new DynamicOutputP2WSH(ptr, (bindings.LDKSpendableOutputDescriptor.DynamicOutputP2WSH)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSpendableOutputDescriptor.StaticOutputCounterpartyPayment.class) {
			return new StaticOutputCounterpartyPayment(ptr, (bindings.LDKSpendableOutputDescriptor.StaticOutputCounterpartyPayment)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class StaticOutput extends SpendableOutputDescriptor {
		public OutPoint outpoint;
		public TxOut output;
		private StaticOutput(long ptr, bindings.LDKSpendableOutputDescriptor.StaticOutput obj) {
			super(null, ptr);
			long outpoint = obj.outpoint;
			OutPoint outpoint_hu_conv = new OutPoint(null, outpoint);
			this.outpoint = outpoint_hu_conv;
			long output = obj.output;
			TxOut output_conv = new TxOut(null, output);
			this.output = output_conv;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class DynamicOutputP2WSH extends SpendableOutputDescriptor {
		public OutPoint outpoint;
		public byte[] per_commitment_point;
		public short to_self_delay;
		public TxOut output;
		public TwoTuple<Long, Long> key_derivation_params;
		public byte[] revocation_pubkey;
		private DynamicOutputP2WSH(long ptr, bindings.LDKSpendableOutputDescriptor.DynamicOutputP2WSH obj) {
			super(null, ptr);
			long outpoint = obj.outpoint;
			OutPoint outpoint_hu_conv = new OutPoint(null, outpoint);
			this.outpoint = outpoint_hu_conv;
			this.per_commitment_point = obj.per_commitment_point;
			this.to_self_delay = obj.to_self_delay;
			long output = obj.output;
			TxOut output_conv = new TxOut(null, output);
			this.output = output_conv;
			long key_derivation_params = obj.key_derivation_params;
			long key_derivation_params_a = bindings.LDKC2Tuple_u64u64Z_get_a(key_derivation_params);
			long key_derivation_params_b = bindings.LDKC2Tuple_u64u64Z_get_b(key_derivation_params);
			TwoTuple<Long, Long> key_derivation_params_conv = new TwoTuple<Long, Long>(key_derivation_params_a, key_derivation_params_b);
			this.key_derivation_params = key_derivation_params_conv;
			this.revocation_pubkey = obj.revocation_pubkey;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class StaticOutputCounterpartyPayment extends SpendableOutputDescriptor {
		public OutPoint outpoint;
		public TxOut output;
		public TwoTuple<Long, Long> key_derivation_params;
		private StaticOutputCounterpartyPayment(long ptr, bindings.LDKSpendableOutputDescriptor.StaticOutputCounterpartyPayment obj) {
			super(null, ptr);
			long outpoint = obj.outpoint;
			OutPoint outpoint_hu_conv = new OutPoint(null, outpoint);
			this.outpoint = outpoint_hu_conv;
			long output = obj.output;
			TxOut output_conv = new TxOut(null, output);
			this.output = output_conv;
			long key_derivation_params = obj.key_derivation_params;
			long key_derivation_params_a = bindings.LDKC2Tuple_u64u64Z_get_a(key_derivation_params);
			long key_derivation_params_b = bindings.LDKC2Tuple_u64u64Z_get_b(key_derivation_params);
			TwoTuple<Long, Long> key_derivation_params_conv = new TwoTuple<Long, Long>(key_derivation_params_a, key_derivation_params_b);
			this.key_derivation_params = key_derivation_params_conv;
		}
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}
