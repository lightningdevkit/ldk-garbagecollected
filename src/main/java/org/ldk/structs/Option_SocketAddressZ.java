package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::ln::msgs::SocketAddress or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_SocketAddressZ extends CommonBase {
	private Option_SocketAddressZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_SocketAddressZ_free(ptr); }
	}
	static Option_SocketAddressZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_SocketAddressZ raw_val = bindings.LDKCOption_SocketAddressZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_SocketAddressZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_SocketAddressZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_SocketAddressZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_SocketAddressZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_SocketAddressZ contains a crate::lightning::ln::msgs::SocketAddress
	 */
	public final static class Some extends Option_SocketAddressZ {
		public final org.ldk.structs.SocketAddress some;
		private Some(long ptr, bindings.LDKCOption_SocketAddressZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.SocketAddress some_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_SocketAddressZ contains nothing
	 */
	public final static class None extends Option_SocketAddressZ {
		private None(long ptr, bindings.LDKCOption_SocketAddressZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_SocketAddressZ containing a crate::lightning::ln::msgs::SocketAddress
	 */
	public static Option_SocketAddressZ some(org.ldk.structs.SocketAddress o) {
		long ret = bindings.COption_SocketAddressZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_SocketAddressZ ret_hu_conv = org.ldk.structs.Option_SocketAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_SocketAddressZ containing nothing
	 */
	public static Option_SocketAddressZ none() {
		long ret = bindings.COption_SocketAddressZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_SocketAddressZ ret_hu_conv = org.ldk.structs.Option_SocketAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_SocketAddressZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_SocketAddressZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_SocketAddressZ clone() {
		long ret = bindings.COption_SocketAddressZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_SocketAddressZ ret_hu_conv = org.ldk.structs.Option_SocketAddressZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
