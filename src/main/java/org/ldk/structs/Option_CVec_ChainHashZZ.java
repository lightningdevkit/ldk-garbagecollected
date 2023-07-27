package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::CVec_ChainHashZ or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_CVec_ChainHashZZ extends CommonBase {
	private Option_CVec_ChainHashZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_CVec_ChainHashZZ_free(ptr); }
	}
	static Option_CVec_ChainHashZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_CVec_ChainHashZZ raw_val = bindings.LDKCOption_CVec_ChainHashZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_CVec_ChainHashZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_CVec_ChainHashZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_CVec_ChainHashZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_CVec_ChainHashZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_CVec_ChainHashZZ contains a crate::c_types::derived::CVec_ChainHashZ
	 */
	public final static class Some extends Option_CVec_ChainHashZZ {
		public final byte[][] some;
		private Some(long ptr, bindings.LDKCOption_CVec_ChainHashZZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_CVec_ChainHashZZ contains nothing
	 */
	public final static class None extends Option_CVec_ChainHashZZ {
		private None(long ptr, bindings.LDKCOption_CVec_ChainHashZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_CVec_ChainHashZZ containing a crate::c_types::derived::CVec_ChainHashZ
	 */
	public static Option_CVec_ChainHashZZ some(byte[][] o) {
		long ret = bindings.COption_CVec_ChainHashZZ_some(o != null ? Arrays.stream(o).map(o_conv_8 -> InternalUtils.check_arr_len(o_conv_8, 32)).toArray(byte[][]::new) : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ChainHashZZ ret_hu_conv = org.ldk.structs.Option_CVec_ChainHashZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_ChainHashZZ containing nothing
	 */
	public static Option_CVec_ChainHashZZ none() {
		long ret = bindings.COption_CVec_ChainHashZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ChainHashZZ ret_hu_conv = org.ldk.structs.Option_CVec_ChainHashZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_CVec_ChainHashZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_ChainHashZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CVec_ChainHashZZ clone() {
		long ret = bindings.COption_CVec_ChainHashZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ChainHashZZ ret_hu_conv = org.ldk.structs.Option_CVec_ChainHashZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
