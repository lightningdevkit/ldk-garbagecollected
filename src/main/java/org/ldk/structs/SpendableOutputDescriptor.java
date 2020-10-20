package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class SpendableOutputDescriptor extends CommonBase {
	private SpendableOutputDescriptor(Object _dummy, long ptr) { super(ptr); }
	long conv_to_c() { assert false; return 0; /* Should only be called on subclasses */ }
	static SpendableOutputDescriptor constr_from_ptr(long ptr) {
		bindings.LDKSpendableOutputDescriptor raw_val = bindings.LDKSpendableOutputDescriptor_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKSpendableOutputDescriptor.StaticOutput.class) {
			return new StaticOutput(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKSpendableOutputDescriptor.DynamicOutputP2WSH.class) {
			return new DynamicOutputP2WSH(null, ptr);
		}
		if (raw_val.getClass() == bindings.LDKSpendableOutputDescriptor.StaticOutputCounterpartyPayment.class) {
			return new StaticOutputCounterpartyPayment(null, ptr);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class StaticOutput extends SpendableOutputDescriptor {
		public OutPoint outpoint;
		public TxOut output;
		private StaticOutput(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class DynamicOutputP2WSH extends SpendableOutputDescriptor {
		public OutPoint outpoint;
		public byte[] per_commitment_point;
		public short to_self_delay;
		public TxOut output;
		public TwoTuple<Long, Long> key_derivation_params;
		public byte[] revocation_pubkey;
		private DynamicOutputP2WSH(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
	public final static class StaticOutputCounterpartyPayment extends SpendableOutputDescriptor {
		public OutPoint outpoint;
		public TxOut output;
		public TwoTuple<Long, Long> key_derivation_params;
		private StaticOutputCounterpartyPayment(Object _dummy, long ptr) { super(null, ptr); }
		@Override long conv_to_c() { return 0; /*XXX*/ }
	}
}
