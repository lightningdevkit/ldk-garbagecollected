package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::CVec_SocketAddressZ or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_CVec_SocketAddressZZ extends CommonBase {
	private Option_CVec_SocketAddressZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_CVec_SocketAddressZZ_free(ptr); }
	}
	static Option_CVec_SocketAddressZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_CVec_SocketAddressZZ raw_val = bindings.LDKCOption_CVec_SocketAddressZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_CVec_SocketAddressZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_CVec_SocketAddressZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_CVec_SocketAddressZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_CVec_SocketAddressZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_CVec_SocketAddressZZ contains a crate::c_types::derived::CVec_SocketAddressZ
	 */
	public final static class Some extends Option_CVec_SocketAddressZZ {
		public final SocketAddress[] some;
		private Some(long ptr, bindings.LDKCOption_CVec_SocketAddressZZ.Some obj) {
			super(null, ptr);
			long[] some = obj.some;
			int some_conv_15_len = some.length;
			SocketAddress[] some_conv_15_arr = new SocketAddress[some_conv_15_len];
			for (int p = 0; p < some_conv_15_len; p++) {
				long some_conv_15 = some[p];
				org.ldk.structs.SocketAddress some_conv_15_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(some_conv_15);
				if (some_conv_15_hu_conv != null) { some_conv_15_hu_conv.ptrs_to.add(this); };
				some_conv_15_arr[p] = some_conv_15_hu_conv;
			}
			this.some = some_conv_15_arr;
		}
	}
	/**
	 * When we're in this state, this COption_CVec_SocketAddressZZ contains nothing
	 */
	public final static class None extends Option_CVec_SocketAddressZZ {
		private None(long ptr, bindings.LDKCOption_CVec_SocketAddressZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_CVec_SocketAddressZZ containing a crate::c_types::derived::CVec_SocketAddressZ
	 */
	public static Option_CVec_SocketAddressZZ some(SocketAddress[] o) {
		long ret = bindings.COption_CVec_SocketAddressZZ_some(o != null ? Arrays.stream(o).mapToLong(o_conv_15 -> o_conv_15.ptr).toArray() : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_SocketAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (SocketAddress o_conv_15: o) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o_conv_15); }; };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_SocketAddressZZ containing nothing
	 */
	public static Option_CVec_SocketAddressZZ none() {
		long ret = bindings.COption_CVec_SocketAddressZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_SocketAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_CVec_SocketAddressZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_SocketAddressZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CVec_SocketAddressZZ clone() {
		long ret = bindings.COption_CVec_SocketAddressZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_CVec_SocketAddressZZ ret_hu_conv = org.ldk.structs.Option_CVec_SocketAddressZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
