package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::Str or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_StrZ extends CommonBase {
	private Option_StrZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_StrZ_free(ptr); }
	}
	static Option_StrZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_StrZ raw_val = bindings.LDKCOption_StrZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_StrZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_StrZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_StrZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_StrZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_StrZ contains a crate::c_types::Str
	 */
	public final static class Some extends Option_StrZ {
		public final java.lang.String some;
		private Some(long ptr, bindings.LDKCOption_StrZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_StrZ contains nothing
	 */
	public final static class None extends Option_StrZ {
		private None(long ptr, bindings.LDKCOption_StrZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_StrZ containing a crate::c_types::Str
	 */
	public static Option_StrZ some(java.lang.String o) {
		long ret = bindings.COption_StrZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_StrZ ret_hu_conv = org.ldk.structs.Option_StrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_StrZ containing nothing
	 */
	public static Option_StrZ none() {
		long ret = bindings.COption_StrZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_StrZ ret_hu_conv = org.ldk.structs.Option_StrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_StrZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_StrZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_StrZ clone() {
		long ret = bindings.COption_StrZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_StrZ ret_hu_conv = org.ldk.structs.Option_StrZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
