package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


/**
 * When on-chain outputs are created by rust-lightning (which our counterparty is not able to
 * claim at any point in the future) an event is generated which you must track and be able to
 * spend on-chain. The information needed to do this is provided in this enum, including the
 * outpoint describing which txid and output index is available, the full output which exists at
 * that txid/index, and any keys or other information required to sign.
 */
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
		/**
		 * The outpoint which is spendable
		*/
		public final OutPoint outpoint;
		/**
		 * The output which is referenced by the given outpoint.
		*/
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
		public final DelayedPaymentOutputDescriptor delayed_payment_output;
		private DelayedPaymentOutput(long ptr, bindings.LDKSpendableOutputDescriptor.DelayedPaymentOutput obj) {
			super(null, ptr);
			long delayed_payment_output = obj.delayed_payment_output;
			DelayedPaymentOutputDescriptor delayed_payment_output_hu_conv = new DelayedPaymentOutputDescriptor(null, delayed_payment_output);
			delayed_payment_output_hu_conv.ptrs_to.add(this);
			this.delayed_payment_output = delayed_payment_output_hu_conv;
		}
	}
	public final static class StaticPaymentOutput extends SpendableOutputDescriptor {
		public final StaticPaymentOutputDescriptor static_payment_output;
		private StaticPaymentOutput(long ptr, bindings.LDKSpendableOutputDescriptor.StaticPaymentOutput obj) {
			super(null, ptr);
			long static_payment_output = obj.static_payment_output;
			StaticPaymentOutputDescriptor static_payment_output_hu_conv = new StaticPaymentOutputDescriptor(null, static_payment_output);
			static_payment_output_hu_conv.ptrs_to.add(this);
			this.static_payment_output = static_payment_output_hu_conv;
		}
	}
	/**
	 * Creates a copy of the SpendableOutputDescriptor
	 */
	public SpendableOutputDescriptor clone() {
		long ret = bindings.SpendableOutputDescriptor_clone(this.ptr);
		if (ret < 1024) { return null; }
		SpendableOutputDescriptor ret_hu_conv = SpendableOutputDescriptor.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticOutput-variant SpendableOutputDescriptor
	 */
	public static SpendableOutputDescriptor static_output(OutPoint outpoint, TxOut output) {
		long ret = bindings.SpendableOutputDescriptor_static_output(outpoint == null ? 0 : outpoint.ptr & ~1, output.ptr);
		if (ret < 1024) { return null; }
		SpendableOutputDescriptor ret_hu_conv = SpendableOutputDescriptor.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(outpoint);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DelayedPaymentOutput-variant SpendableOutputDescriptor
	 */
	public static SpendableOutputDescriptor delayed_payment_output(DelayedPaymentOutputDescriptor a) {
		long ret = bindings.SpendableOutputDescriptor_delayed_payment_output(a == null ? 0 : a.ptr & ~1);
		if (ret < 1024) { return null; }
		SpendableOutputDescriptor ret_hu_conv = SpendableOutputDescriptor.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(a);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticPaymentOutput-variant SpendableOutputDescriptor
	 */
	public static SpendableOutputDescriptor static_payment_output(StaticPaymentOutputDescriptor a) {
		long ret = bindings.SpendableOutputDescriptor_static_payment_output(a == null ? 0 : a.ptr & ~1);
		if (ret < 1024) { return null; }
		SpendableOutputDescriptor ret_hu_conv = SpendableOutputDescriptor.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(a);
		return ret_hu_conv;
	}

	/**
	 * Serialize the SpendableOutputDescriptor object into a byte array which can be read by SpendableOutputDescriptor_read
	 */
	public byte[] write() {
		byte[] ret = bindings.SpendableOutputDescriptor_write(this.ptr);
		return ret;
	}

	/**
	 * Read a SpendableOutputDescriptor from a byte array, created by SpendableOutputDescriptor_write
	 */
	public static Result_SpendableOutputDescriptorDecodeErrorZ read(byte[] ser) {
		long ret = bindings.SpendableOutputDescriptor_read(ser);
		if (ret < 1024) { return null; }
		Result_SpendableOutputDescriptorDecodeErrorZ ret_hu_conv = Result_SpendableOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
