package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::U128 or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_u128Z extends CommonBase {
	private Option_u128Z(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_u128Z_free(ptr); }
	}
	static Option_u128Z constr_from_ptr(long ptr) {
		bindings.LDKCOption_u128Z raw_val = bindings.LDKCOption_u128Z_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_u128Z.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_u128Z.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_u128Z.None.class) {
			return new None(ptr, (bindings.LDKCOption_u128Z.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_u128Z contains a crate::c_types::U128
	 */
	public final static class Some extends Option_u128Z {
		public final org.ldk.util.UInt128 some;
		private Some(long ptr, bindings.LDKCOption_u128Z.Some obj) {
			super(null, ptr);
			byte[] some = obj.some;
			org.ldk.util.UInt128 some_conv = new org.ldk.util.UInt128(some);
			this.some = some_conv;
		}
	}
	/**
	 * When we're in this state, this COption_u128Z contains nothing
	 */
	public final static class None extends Option_u128Z {
		private None(long ptr, bindings.LDKCOption_u128Z.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_u128Z containing a crate::c_types::U128
	 */
	public static Option_u128Z some(org.ldk.util.UInt128 o) {
		long ret = bindings.COption_u128Z_some(o.getLEBytes());
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u128Z ret_hu_conv = org.ldk.structs.Option_u128Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_u128Z containing nothing
	 */
	public static Option_u128Z none() {
		long ret = bindings.COption_u128Z_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u128Z ret_hu_conv = org.ldk.structs.Option_u128Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_u128Z_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_u128Z which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_u128Z clone() {
		long ret = bindings.COption_u128Z_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_u128Z ret_hu_conv = org.ldk.structs.Option_u128Z.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
