package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::events::PaymentFailureReason or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_PaymentFailureReasonZ extends CommonBase {
	private Option_PaymentFailureReasonZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_PaymentFailureReasonZ_free(ptr); }
	}
	static Option_PaymentFailureReasonZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_PaymentFailureReasonZ raw_val = bindings.LDKCOption_PaymentFailureReasonZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_PaymentFailureReasonZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_PaymentFailureReasonZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_PaymentFailureReasonZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_PaymentFailureReasonZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_PaymentFailureReasonZ contains a crate::lightning::events::PaymentFailureReason
	 */
	public final static class Some extends Option_PaymentFailureReasonZ {
		public final org.ldk.enums.PaymentFailureReason some;
		private Some(long ptr, bindings.LDKCOption_PaymentFailureReasonZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_PaymentFailureReasonZ contains nothing
	 */
	public final static class None extends Option_PaymentFailureReasonZ {
		private None(long ptr, bindings.LDKCOption_PaymentFailureReasonZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_PaymentFailureReasonZ containing a crate::lightning::events::PaymentFailureReason
	 */
	public static Option_PaymentFailureReasonZ some(org.ldk.enums.PaymentFailureReason o) {
		long ret = bindings.COption_PaymentFailureReasonZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentFailureReasonZ ret_hu_conv = org.ldk.structs.Option_PaymentFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PaymentFailureReasonZ containing nothing
	 */
	public static Option_PaymentFailureReasonZ none() {
		long ret = bindings.COption_PaymentFailureReasonZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentFailureReasonZ ret_hu_conv = org.ldk.structs.Option_PaymentFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_PaymentFailureReasonZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_PaymentFailureReasonZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PaymentFailureReasonZ clone() {
		long ret = bindings.COption_PaymentFailureReasonZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PaymentFailureReasonZ ret_hu_conv = org.ldk.structs.Option_PaymentFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
