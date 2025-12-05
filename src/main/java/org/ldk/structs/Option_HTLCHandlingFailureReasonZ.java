package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::events::HTLCHandlingFailureReason or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_HTLCHandlingFailureReasonZ extends CommonBase {
	private Option_HTLCHandlingFailureReasonZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_HTLCHandlingFailureReasonZ_free(ptr); }
	}
	static Option_HTLCHandlingFailureReasonZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_HTLCHandlingFailureReasonZ raw_val = bindings.LDKCOption_HTLCHandlingFailureReasonZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_HTLCHandlingFailureReasonZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_HTLCHandlingFailureReasonZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_HTLCHandlingFailureReasonZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_HTLCHandlingFailureReasonZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_HTLCHandlingFailureReasonZ contains a crate::lightning::events::HTLCHandlingFailureReason
	 */
	public final static class Some extends Option_HTLCHandlingFailureReasonZ {
		public final org.ldk.structs.HTLCHandlingFailureReason some;
		private Some(long ptr, bindings.LDKCOption_HTLCHandlingFailureReasonZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.HTLCHandlingFailureReason some_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_HTLCHandlingFailureReasonZ contains nothing
	 */
	public final static class None extends Option_HTLCHandlingFailureReasonZ {
		private None(long ptr, bindings.LDKCOption_HTLCHandlingFailureReasonZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_HTLCHandlingFailureReasonZ containing a crate::lightning::events::HTLCHandlingFailureReason
	 */
	public static Option_HTLCHandlingFailureReasonZ some(org.ldk.structs.HTLCHandlingFailureReason o) {
		long ret = bindings.COption_HTLCHandlingFailureReasonZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureReasonZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCHandlingFailureReasonZ containing nothing
	 */
	public static Option_HTLCHandlingFailureReasonZ none() {
		long ret = bindings.COption_HTLCHandlingFailureReasonZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureReasonZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_HTLCHandlingFailureReasonZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_HTLCHandlingFailureReasonZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_HTLCHandlingFailureReasonZ clone() {
		long ret = bindings.COption_HTLCHandlingFailureReasonZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureReasonZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureReasonZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
