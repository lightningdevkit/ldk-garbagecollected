package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::events::HTLCHandlingFailureType or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_HTLCHandlingFailureTypeZ extends CommonBase {
	private Option_HTLCHandlingFailureTypeZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_HTLCHandlingFailureTypeZ_free(ptr); }
	}
	static Option_HTLCHandlingFailureTypeZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_HTLCHandlingFailureTypeZ raw_val = bindings.LDKCOption_HTLCHandlingFailureTypeZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_HTLCHandlingFailureTypeZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_HTLCHandlingFailureTypeZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_HTLCHandlingFailureTypeZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_HTLCHandlingFailureTypeZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_HTLCHandlingFailureTypeZ contains a crate::lightning::events::HTLCHandlingFailureType
	 */
	public final static class Some extends Option_HTLCHandlingFailureTypeZ {
		public final org.ldk.structs.HTLCHandlingFailureType some;
		private Some(long ptr, bindings.LDKCOption_HTLCHandlingFailureTypeZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.HTLCHandlingFailureType some_hu_conv = org.ldk.structs.HTLCHandlingFailureType.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_HTLCHandlingFailureTypeZ contains nothing
	 */
	public final static class None extends Option_HTLCHandlingFailureTypeZ {
		private None(long ptr, bindings.LDKCOption_HTLCHandlingFailureTypeZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_HTLCHandlingFailureTypeZ containing a crate::lightning::events::HTLCHandlingFailureType
	 */
	public static Option_HTLCHandlingFailureTypeZ some(org.ldk.structs.HTLCHandlingFailureType o) {
		long ret = bindings.COption_HTLCHandlingFailureTypeZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureTypeZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureTypeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCHandlingFailureTypeZ containing nothing
	 */
	public static Option_HTLCHandlingFailureTypeZ none() {
		long ret = bindings.COption_HTLCHandlingFailureTypeZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureTypeZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureTypeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_HTLCHandlingFailureTypeZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_HTLCHandlingFailureTypeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_HTLCHandlingFailureTypeZ clone() {
		long ret = bindings.COption_HTLCHandlingFailureTypeZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCHandlingFailureTypeZ ret_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureTypeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
