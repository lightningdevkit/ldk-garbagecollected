package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::CVec_ThirtyTwoBytesZ or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_CVec_ThirtyTwoBytesZZ extends CommonBase {
	private Option_CVec_ThirtyTwoBytesZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_CVec_ThirtyTwoBytesZZ_free(ptr); }
	}
	static Option_CVec_ThirtyTwoBytesZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_CVec_ThirtyTwoBytesZZ raw_val = bindings.LDKCOption_CVec_ThirtyTwoBytesZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_CVec_ThirtyTwoBytesZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_CVec_ThirtyTwoBytesZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_CVec_ThirtyTwoBytesZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_CVec_ThirtyTwoBytesZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_CVec_ThirtyTwoBytesZZ contains a crate::c_types::derived::CVec_ThirtyTwoBytesZ
	 */
	public final static class Some extends Option_CVec_ThirtyTwoBytesZZ {
		public final byte[][] some;
		private Some(long ptr, bindings.LDKCOption_CVec_ThirtyTwoBytesZZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_CVec_ThirtyTwoBytesZZ contains nothing
	 */
	public final static class None extends Option_CVec_ThirtyTwoBytesZZ {
		private None(long ptr, bindings.LDKCOption_CVec_ThirtyTwoBytesZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_CVec_ThirtyTwoBytesZZ containing a crate::c_types::derived::CVec_ThirtyTwoBytesZ
	 */
	public static Option_CVec_ThirtyTwoBytesZZ some(byte[][] o) {
		long ret = bindings.COption_CVec_ThirtyTwoBytesZZ_some(o != null ? Arrays.stream(o).map(o_conv_8 -> InternalUtils.check_arr_len(o_conv_8, 32)).toArray(byte[][]::new) : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ ret_hu_conv = org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_ThirtyTwoBytesZZ containing nothing
	 */
	public static Option_CVec_ThirtyTwoBytesZZ none() {
		long ret = bindings.COption_CVec_ThirtyTwoBytesZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ ret_hu_conv = org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_CVec_ThirtyTwoBytesZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_ThirtyTwoBytesZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CVec_ThirtyTwoBytesZZ clone() {
		long ret = bindings.COption_CVec_ThirtyTwoBytesZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ ret_hu_conv = org.ldk.structs.Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
