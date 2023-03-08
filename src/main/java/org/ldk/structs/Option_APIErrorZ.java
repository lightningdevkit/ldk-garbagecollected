package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::util::errors::APIError or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_APIErrorZ extends CommonBase {
	private Option_APIErrorZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_APIErrorZ_free(ptr); }
	}
	static Option_APIErrorZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_APIErrorZ raw_val = bindings.LDKCOption_APIErrorZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_APIErrorZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_APIErrorZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_APIErrorZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_APIErrorZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_APIErrorZ contains a crate::lightning::util::errors::APIError
	 */
	public final static class Some extends Option_APIErrorZ {
		public final org.ldk.structs.APIError some;
		private Some(long ptr, bindings.LDKCOption_APIErrorZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.APIError some_hu_conv = org.ldk.structs.APIError.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_APIErrorZ contains nothing
	 */
	public final static class None extends Option_APIErrorZ {
		private None(long ptr, bindings.LDKCOption_APIErrorZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_APIErrorZ containing a crate::lightning::util::errors::APIError
	 */
	public static Option_APIErrorZ some(org.ldk.structs.APIError o) {
		long ret = bindings.COption_APIErrorZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_APIErrorZ ret_hu_conv = org.ldk.structs.Option_APIErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_APIErrorZ containing nothing
	 */
	public static Option_APIErrorZ none() {
		long ret = bindings.COption_APIErrorZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_APIErrorZ ret_hu_conv = org.ldk.structs.Option_APIErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_APIErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_APIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_APIErrorZ clone() {
		long ret = bindings.COption_APIErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_APIErrorZ ret_hu_conv = org.ldk.structs.Option_APIErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
