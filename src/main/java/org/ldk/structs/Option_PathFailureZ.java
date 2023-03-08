package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::util::events::PathFailure or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_PathFailureZ extends CommonBase {
	private Option_PathFailureZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_PathFailureZ_free(ptr); }
	}
	static Option_PathFailureZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_PathFailureZ raw_val = bindings.LDKCOption_PathFailureZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_PathFailureZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_PathFailureZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_PathFailureZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_PathFailureZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_PathFailureZ contains a crate::lightning::util::events::PathFailure
	 */
	public final static class Some extends Option_PathFailureZ {
		public final org.ldk.structs.PathFailure some;
		private Some(long ptr, bindings.LDKCOption_PathFailureZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.PathFailure some_hu_conv = org.ldk.structs.PathFailure.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_PathFailureZ contains nothing
	 */
	public final static class None extends Option_PathFailureZ {
		private None(long ptr, bindings.LDKCOption_PathFailureZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_PathFailureZ containing a crate::lightning::util::events::PathFailure
	 */
	public static Option_PathFailureZ some(org.ldk.structs.PathFailure o) {
		long ret = bindings.COption_PathFailureZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PathFailureZ ret_hu_conv = org.ldk.structs.Option_PathFailureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_PathFailureZ containing nothing
	 */
	public static Option_PathFailureZ none() {
		long ret = bindings.COption_PathFailureZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PathFailureZ ret_hu_conv = org.ldk.structs.Option_PathFailureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_PathFailureZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_PathFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_PathFailureZ clone() {
		long ret = bindings.COption_PathFailureZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_PathFailureZ ret_hu_conv = org.ldk.structs.Option_PathFailureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
