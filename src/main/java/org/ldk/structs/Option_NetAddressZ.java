package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::ln::msgs::NetAddress or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_NetAddressZ extends CommonBase {
	private Option_NetAddressZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_NetAddressZ_free(ptr); }
	}
	static Option_NetAddressZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_NetAddressZ raw_val = bindings.LDKCOption_NetAddressZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_NetAddressZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_NetAddressZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_NetAddressZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_NetAddressZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_NetAddressZ contains a crate::lightning::ln::msgs::NetAddress
	 */
	public final static class Some extends Option_NetAddressZ {
		public final org.ldk.structs.NetAddress some;
		private Some(long ptr, bindings.LDKCOption_NetAddressZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.NetAddress some_hu_conv = org.ldk.structs.NetAddress.constr_from_ptr(some);
			some_hu_conv.ptrs_to.add(this);
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_NetAddressZ contains nothing
	 */
	public final static class None extends Option_NetAddressZ {
		private None(long ptr, bindings.LDKCOption_NetAddressZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_NetAddressZ containing a crate::lightning::ln::msgs::NetAddress
	 */
	public static Option_NetAddressZ some(NetAddress o) {
		long ret = bindings.COption_NetAddressZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetAddressZ ret_hu_conv = org.ldk.structs.Option_NetAddressZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_NetAddressZ containing nothing
	 */
	public static Option_NetAddressZ none() {
		long ret = bindings.COption_NetAddressZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetAddressZ ret_hu_conv = org.ldk.structs.Option_NetAddressZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_NetAddressZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_NetAddressZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_NetAddressZ clone() {
		long ret = bindings.COption_NetAddressZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_NetAddressZ ret_hu_conv = org.ldk.structs.Option_NetAddressZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
