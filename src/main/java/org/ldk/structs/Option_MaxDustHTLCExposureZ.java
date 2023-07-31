package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::util::config::MaxDustHTLCExposure or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_MaxDustHTLCExposureZ extends CommonBase {
	private Option_MaxDustHTLCExposureZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_MaxDustHTLCExposureZ_free(ptr); }
	}
	static Option_MaxDustHTLCExposureZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_MaxDustHTLCExposureZ raw_val = bindings.LDKCOption_MaxDustHTLCExposureZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_MaxDustHTLCExposureZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_MaxDustHTLCExposureZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_MaxDustHTLCExposureZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_MaxDustHTLCExposureZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_MaxDustHTLCExposureZ contains a crate::lightning::util::config::MaxDustHTLCExposure
	 */
	public final static class Some extends Option_MaxDustHTLCExposureZ {
		public final org.ldk.structs.MaxDustHTLCExposure some;
		private Some(long ptr, bindings.LDKCOption_MaxDustHTLCExposureZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.MaxDustHTLCExposure some_hu_conv = org.ldk.structs.MaxDustHTLCExposure.constr_from_ptr(some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_MaxDustHTLCExposureZ contains nothing
	 */
	public final static class None extends Option_MaxDustHTLCExposureZ {
		private None(long ptr, bindings.LDKCOption_MaxDustHTLCExposureZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_MaxDustHTLCExposureZ containing a crate::lightning::util::config::MaxDustHTLCExposure
	 */
	public static Option_MaxDustHTLCExposureZ some(org.ldk.structs.MaxDustHTLCExposure o) {
		long ret = bindings.COption_MaxDustHTLCExposureZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MaxDustHTLCExposureZ ret_hu_conv = org.ldk.structs.Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_MaxDustHTLCExposureZ containing nothing
	 */
	public static Option_MaxDustHTLCExposureZ none() {
		long ret = bindings.COption_MaxDustHTLCExposureZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MaxDustHTLCExposureZ ret_hu_conv = org.ldk.structs.Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_MaxDustHTLCExposureZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_MaxDustHTLCExposureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_MaxDustHTLCExposureZ clone() {
		long ret = bindings.COption_MaxDustHTLCExposureZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_MaxDustHTLCExposureZ ret_hu_conv = org.ldk.structs.Option_MaxDustHTLCExposureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
