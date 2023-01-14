package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::util::events::HTLCDestination or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_HTLCDestinationZ extends CommonBase {
	private Option_HTLCDestinationZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_HTLCDestinationZ_free(ptr); }
	}
	static Option_HTLCDestinationZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_HTLCDestinationZ raw_val = bindings.LDKCOption_HTLCDestinationZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_HTLCDestinationZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_HTLCDestinationZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_HTLCDestinationZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_HTLCDestinationZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_HTLCDestinationZ contains a crate::lightning::util::events::HTLCDestination
	 */
	public final static class Some extends Option_HTLCDestinationZ {
		public final org.ldk.structs.HTLCDestination some;
		private Some(long ptr, bindings.LDKCOption_HTLCDestinationZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.HTLCDestination some_hu_conv = org.ldk.structs.HTLCDestination.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_HTLCDestinationZ contains nothing
	 */
	public final static class None extends Option_HTLCDestinationZ {
		private None(long ptr, bindings.LDKCOption_HTLCDestinationZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_HTLCDestinationZ containing a crate::lightning::util::events::HTLCDestination
	 */
	public static Option_HTLCDestinationZ some(org.ldk.structs.HTLCDestination o) {
		long ret = bindings.COption_HTLCDestinationZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCDestinationZ ret_hu_conv = org.ldk.structs.Option_HTLCDestinationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCDestinationZ containing nothing
	 */
	public static Option_HTLCDestinationZ none() {
		long ret = bindings.COption_HTLCDestinationZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCDestinationZ ret_hu_conv = org.ldk.structs.Option_HTLCDestinationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_HTLCDestinationZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_HTLCDestinationZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_HTLCDestinationZ clone() {
		long ret = bindings.COption_HTLCDestinationZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCDestinationZ ret_hu_conv = org.ldk.structs.Option_HTLCDestinationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
