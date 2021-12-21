package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::routing::network_graph::NetworkUpdate or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_NetworkUpdateZ extends CommonBase {
	private Option_NetworkUpdateZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_NetworkUpdateZ_free(ptr); }
	}
	static Option_NetworkUpdateZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_NetworkUpdateZ raw_val = bindings.LDKCOption_NetworkUpdateZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_NetworkUpdateZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_NetworkUpdateZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_NetworkUpdateZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_NetworkUpdateZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_NetworkUpdateZ contains a crate::lightning::routing::network_graph::NetworkUpdate
	 */
	public final static class Some extends Option_NetworkUpdateZ {
		public final NetworkUpdate some;
		private Some(long ptr, bindings.LDKCOption_NetworkUpdateZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			NetworkUpdate some_hu_conv = NetworkUpdate.constr_from_ptr(some);
			some_hu_conv.ptrs_to.add(this);
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_NetworkUpdateZ contains nothing
	 */
	public final static class None extends Option_NetworkUpdateZ {
		private None(long ptr, bindings.LDKCOption_NetworkUpdateZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_NetworkUpdateZ containing a crate::lightning::routing::network_graph::NetworkUpdate
	 */
	public static Option_NetworkUpdateZ some(NetworkUpdate o) {
		long ret = bindings.COption_NetworkUpdateZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_NetworkUpdateZ ret_hu_conv = Option_NetworkUpdateZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_NetworkUpdateZ containing nothing
	 */
	public static Option_NetworkUpdateZ none() {
		long ret = bindings.COption_NetworkUpdateZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_NetworkUpdateZ ret_hu_conv = Option_NetworkUpdateZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_NetworkUpdateZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_NetworkUpdateZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_NetworkUpdateZ clone() {
		long ret = bindings.COption_NetworkUpdateZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_NetworkUpdateZ ret_hu_conv = Option_NetworkUpdateZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
