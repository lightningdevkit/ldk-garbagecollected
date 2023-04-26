package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a u64 or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_DurationZ extends CommonBase {
	private Option_DurationZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_DurationZ_free(ptr); }
	}
	static Option_DurationZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_DurationZ raw_val = bindings.LDKCOption_DurationZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_DurationZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_DurationZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_DurationZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_DurationZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_DurationZ contains a u64
	 */
	public final static class Some extends Option_DurationZ {
		public final long some;
		private Some(long ptr, bindings.LDKCOption_DurationZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_DurationZ contains nothing
	 */
	public final static class None extends Option_DurationZ {
		private None(long ptr, bindings.LDKCOption_DurationZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_DurationZ containing a u64
	 */
	public static Option_DurationZ some(long o) {
		long ret = bindings.COption_DurationZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_DurationZ ret_hu_conv = org.ldk.structs.Option_DurationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_DurationZ containing nothing
	 */
	public static Option_DurationZ none() {
		long ret = bindings.COption_DurationZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_DurationZ ret_hu_conv = org.ldk.structs.Option_DurationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_DurationZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_DurationZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_DurationZ clone() {
		long ret = bindings.COption_DurationZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_DurationZ ret_hu_conv = org.ldk.structs.Option_DurationZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
