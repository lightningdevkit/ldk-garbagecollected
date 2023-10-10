package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::ThirtyTwoBytes or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_ThirtyTwoBytesZ extends CommonBase {
	private Option_ThirtyTwoBytesZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_ThirtyTwoBytesZ_free(ptr); }
	}
	static Option_ThirtyTwoBytesZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_ThirtyTwoBytesZ raw_val = bindings.LDKCOption_ThirtyTwoBytesZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_ThirtyTwoBytesZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_ThirtyTwoBytesZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_ThirtyTwoBytesZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_ThirtyTwoBytesZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_ThirtyTwoBytesZ contains a crate::c_types::ThirtyTwoBytes
	 */
	public final static class Some extends Option_ThirtyTwoBytesZ {
		public final byte[] some;
		private Some(long ptr, bindings.LDKCOption_ThirtyTwoBytesZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_ThirtyTwoBytesZ contains nothing
	 */
	public final static class None extends Option_ThirtyTwoBytesZ {
		private None(long ptr, bindings.LDKCOption_ThirtyTwoBytesZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_ThirtyTwoBytesZ containing a crate::c_types::ThirtyTwoBytes
	 */
	public static Option_ThirtyTwoBytesZ some(byte[] o) {
		long ret = bindings.COption_ThirtyTwoBytesZ_some(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ThirtyTwoBytesZ containing nothing
	 */
	public static Option_ThirtyTwoBytesZ none() {
		long ret = bindings.COption_ThirtyTwoBytesZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_ThirtyTwoBytesZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_ThirtyTwoBytesZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_ThirtyTwoBytesZ clone() {
		long ret = bindings.COption_ThirtyTwoBytesZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ThirtyTwoBytesZ ret_hu_conv = org.ldk.structs.Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
