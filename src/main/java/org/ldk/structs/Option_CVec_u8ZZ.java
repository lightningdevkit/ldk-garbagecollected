package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::CVec_u8Z or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_CVec_u8ZZ extends CommonBase {
	private Option_CVec_u8ZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_CVec_u8ZZ_free(ptr); }
	}
	static Option_CVec_u8ZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_CVec_u8ZZ raw_val = bindings.LDKCOption_CVec_u8ZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_CVec_u8ZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_CVec_u8ZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_CVec_u8ZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_CVec_u8ZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_CVec_u8ZZ contains a crate::c_types::derived::CVec_u8Z
	 */
	public final static class Some extends Option_CVec_u8ZZ {
		public final byte[] some;
		private Some(long ptr, bindings.LDKCOption_CVec_u8ZZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_CVec_u8ZZ contains nothing
	 */
	public final static class None extends Option_CVec_u8ZZ {
		private None(long ptr, bindings.LDKCOption_CVec_u8ZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_CVec_u8ZZ containing a crate::c_types::derived::CVec_u8Z
	 */
	public static Option_CVec_u8ZZ some(byte[] o) {
		long ret = bindings.COption_CVec_u8ZZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_u8ZZ containing nothing
	 */
	public static Option_CVec_u8ZZ none() {
		long ret = bindings.COption_CVec_u8ZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_CVec_u8ZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_u8ZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CVec_u8ZZ clone() {
		long ret = bindings.COption_CVec_u8ZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_u8ZZ ret_hu_conv = org.ldk.structs.Option_CVec_u8ZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
