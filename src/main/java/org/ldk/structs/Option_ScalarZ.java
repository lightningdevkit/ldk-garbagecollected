package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::BigEndianScalar or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_ScalarZ extends CommonBase {
	private Option_ScalarZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_ScalarZ_free(ptr); }
	}
	static Option_ScalarZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_ScalarZ raw_val = bindings.LDKCOption_ScalarZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_ScalarZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_ScalarZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_ScalarZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_ScalarZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_ScalarZ contains a crate::c_types::BigEndianScalar
	 */
	public final static class Some extends Option_ScalarZ {
		public final org.ldk.structs.BigEndianScalar some;
		private Some(long ptr, bindings.LDKCOption_ScalarZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			BigEndianScalar some_conv = new BigEndianScalar(null, some);
			this.some = some_conv;
		}
	}
	/**
	 * When we're in this state, this COption_ScalarZ contains nothing
	 */
	public final static class None extends Option_ScalarZ {
		private None(long ptr, bindings.LDKCOption_ScalarZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_ScalarZ containing a crate::c_types::BigEndianScalar
	 */
	public static Option_ScalarZ some(byte[] o_big_endian_bytes) {
		long ret = bindings.COption_ScalarZ_some(bindings.BigEndianScalar_new(InternalUtils.check_arr_len(o_big_endian_bytes, 32)));
		Reference.reachabilityFence(o_big_endian_bytes);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScalarZ ret_hu_conv = org.ldk.structs.Option_ScalarZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		;
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ScalarZ containing nothing
	 */
	public static Option_ScalarZ none() {
		long ret = bindings.COption_ScalarZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScalarZ ret_hu_conv = org.ldk.structs.Option_ScalarZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_ScalarZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_ScalarZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_ScalarZ clone() {
		long ret = bindings.COption_ScalarZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_ScalarZ ret_hu_conv = org.ldk.structs.Option_ScalarZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
