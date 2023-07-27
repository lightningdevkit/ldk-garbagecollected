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
public class Option_BlockHashZ extends CommonBase {
	private Option_BlockHashZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_BlockHashZ_free(ptr); }
	}
	static Option_BlockHashZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_BlockHashZ raw_val = bindings.LDKCOption_BlockHashZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_BlockHashZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_BlockHashZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_BlockHashZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_BlockHashZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_BlockHashZ contains a crate::c_types::ThirtyTwoBytes
	 */
	public final static class Some extends Option_BlockHashZ {
		public final byte[] some;
		private Some(long ptr, bindings.LDKCOption_BlockHashZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_BlockHashZ contains nothing
	 */
	public final static class None extends Option_BlockHashZ {
		private None(long ptr, bindings.LDKCOption_BlockHashZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_BlockHashZ containing a crate::c_types::ThirtyTwoBytes
	 */
	public static Option_BlockHashZ some(byte[] o) {
		long ret = bindings.COption_BlockHashZ_some(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_BlockHashZ ret_hu_conv = org.ldk.structs.Option_BlockHashZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_BlockHashZ containing nothing
	 */
	public static Option_BlockHashZ none() {
		long ret = bindings.COption_BlockHashZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_BlockHashZ ret_hu_conv = org.ldk.structs.Option_BlockHashZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_BlockHashZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_BlockHashZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_BlockHashZ clone() {
		long ret = bindings.COption_BlockHashZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_BlockHashZ ret_hu_conv = org.ldk.structs.Option_BlockHashZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
