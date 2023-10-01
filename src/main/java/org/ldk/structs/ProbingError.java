package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An error that may occur when sending a payment probe.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ProbingError extends CommonBase {
	private ProbingError(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ProbingError_free(ptr); }
	}
	static ProbingError constr_from_ptr(long ptr) {
		bindings.LDKProbingError raw_val = bindings.LDKProbingError_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKProbingError.Invoice.class) {
			return new Invoice(ptr, (bindings.LDKProbingError.Invoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKProbingError.Sending.class) {
			return new Sending(ptr, (bindings.LDKProbingError.Sending)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * An error resulting from the provided [`Bolt11Invoice`].
	 */
	public final static class Invoice extends ProbingError {
		public final java.lang.String invoice;
		private Invoice(long ptr, bindings.LDKProbingError.Invoice obj) {
			super(null, ptr);
			this.invoice = obj.invoice;
		}
	}
	/**
	 * An error occurring when sending a payment probe.
	 */
	public final static class Sending extends ProbingError {
		public final org.ldk.structs.ProbeSendFailure sending;
		private Sending(long ptr, bindings.LDKProbingError.Sending obj) {
			super(null, ptr);
			long sending = obj.sending;
			org.ldk.structs.ProbeSendFailure sending_hu_conv = org.ldk.structs.ProbeSendFailure.constr_from_ptr(sending);
			if (sending_hu_conv != null) { sending_hu_conv.ptrs_to.add(this); };
			this.sending = sending_hu_conv;
		}
	}
	long clone_ptr() {
		long ret = bindings.ProbingError_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the ProbingError
	 */
	public ProbingError clone() {
		long ret = bindings.ProbingError_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbingError ret_hu_conv = org.ldk.structs.ProbingError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Invoice-variant ProbingError
	 */
	public static ProbingError invoice(java.lang.String a) {
		long ret = bindings.ProbingError_invoice(a);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbingError ret_hu_conv = org.ldk.structs.ProbingError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Sending-variant ProbingError
	 */
	public static ProbingError sending(org.ldk.structs.ProbeSendFailure a) {
		long ret = bindings.ProbingError_sending(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ProbingError ret_hu_conv = org.ldk.structs.ProbingError.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two ProbingErrors contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public boolean eq(org.ldk.structs.ProbingError b) {
		boolean ret = bindings.ProbingError_eq(this.ptr, b == null ? 0 : b.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(b);
		return ret;
	}

	@Override public boolean equals(Object o) {
		if (!(o instanceof ProbingError)) return false;
		return this.eq((ProbingError)o);
	}
}
