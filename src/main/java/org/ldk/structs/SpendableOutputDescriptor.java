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
		if (ptr != 0) { bindings.SpendableOutputDescriptor_free(ptr); }
	}
	static SpendableOutputDescriptor constr_from_ptr(long ptr) {
		bindings.LDKSpendableOutputDescriptor raw_val = bindings.LDKSpendableOutputDescriptor_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKSpendableOutputDescriptor.StaticOutput.class) {
			return new StaticOutput(ptr, (bindings.LDKSpendableOutputDescriptor.StaticOutput)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSpendableOutputDescriptor.DelayedPaymentOutput.class) {
			return new DelayedPaymentOutput(ptr, (bindings.LDKSpendableOutputDescriptor.DelayedPaymentOutput)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKSpendableOutputDescriptor.StaticPaymentOutput.class) {
			return new StaticPaymentOutput(ptr, (bindings.LDKSpendableOutputDescriptor.StaticPaymentOutput)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class StaticOutput extends SpendableOutputDescriptor {
		public final OutPoint outpoint;
		public final TxOut output;
		private StaticOutput(long ptr, bindings.LDKSpendableOutputDescriptor.StaticOutput obj) {
			super(null, ptr);
			long outpoint = obj.outpoint;
			OutPoint outpoint_hu_conv = new OutPoint(null, outpoint);
			outpoint_hu_conv.ptrs_to.add(this);
			this.outpoint = outpoint_hu_conv;
			long output = obj.output;
			TxOut output_conv = new TxOut(null, output);
			this.output = output_conv;
		}
	}
	public final static class DelayedPaymentOutput extends SpendableOutputDescriptor {
		private DelayedPaymentOutput(long ptr, bindings.LDKSpendableOutputDescriptor.DelayedPaymentOutput obj) {
			super(null, ptr);
		}
	}
	public final static class StaticPaymentOutput extends SpendableOutputDescriptor {
		private StaticPaymentOutput(long ptr, bindings.LDKSpendableOutputDescriptor.StaticPaymentOutput obj) {
			super(null, ptr);
		}
	}
}
