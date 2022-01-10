package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::CVec_NetAddressZ or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_CVec_NetAddressZZ extends CommonBase {
	private Option_CVec_NetAddressZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_CVec_NetAddressZZ_free(ptr); }
	}
	static Option_CVec_NetAddressZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_CVec_NetAddressZZ raw_val = bindings.LDKCOption_CVec_NetAddressZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_CVec_NetAddressZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_CVec_NetAddressZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_CVec_NetAddressZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_CVec_NetAddressZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_CVec_NetAddressZZ contains a crate::c_types::derived::CVec_NetAddressZ
	 */
	public final static class Some extends Option_CVec_NetAddressZZ {
		public final NetAddress[] some;
		private Some(long ptr, bindings.LDKCOption_CVec_NetAddressZZ.Some obj) {
			super(null, ptr);
			long[] some = obj.some;
			int some_conv_12_len = some.length;
			NetAddress[] some_conv_12_arr = new NetAddress[some_conv_12_len];
			for (int m = 0; m < some_conv_12_len; m++) {
				long some_conv_12 = some[m];
				NetAddress some_conv_12_hu_conv = NetAddress.constr_from_ptr(some_conv_12);
				some_conv_12_hu_conv.ptrs_to.add(this);
				some_conv_12_arr[m] = some_conv_12_hu_conv;
			}
			this.some = some_conv_12_arr;
		}
	}
	/**
	 * When we're in this state, this COption_CVec_NetAddressZZ contains nothing
	 */
	public final static class None extends Option_CVec_NetAddressZZ {
		private None(long ptr, bindings.LDKCOption_CVec_NetAddressZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_CVec_NetAddressZZ containing a crate::c_types::derived::CVec_NetAddressZ
	 */
	public static Option_CVec_NetAddressZZ some(NetAddress[] o) {
		long ret = bindings.COption_CVec_NetAddressZZ_some(o != null ? Arrays.stream(o).mapToLong(o_conv_12 -> o_conv_12.ptr).toArray() : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_CVec_NetAddressZZ ret_hu_conv = Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_CVec_NetAddressZZ containing nothing
	 */
	public static Option_CVec_NetAddressZZ none() {
		long ret = bindings.COption_CVec_NetAddressZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_CVec_NetAddressZZ ret_hu_conv = Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_CVec_NetAddressZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_CVec_NetAddressZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_CVec_NetAddressZZ clone() {
		long ret = bindings.COption_CVec_NetAddressZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_CVec_NetAddressZZ ret_hu_conv = Option_CVec_NetAddressZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
