package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a bool or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_boolZ extends CommonBase {
	private Option_boolZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_boolZ_free(ptr); }
	}
	static Option_boolZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_boolZ raw_val = bindings.LDKCOption_boolZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_boolZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_boolZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_boolZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_boolZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_boolZ contains a bool
	 */
	public final static class Some extends Option_boolZ {
		public final boolean some;
		private Some(long ptr, bindings.LDKCOption_boolZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_boolZ contains nothing
	 */
	public final static class None extends Option_boolZ {
		private None(long ptr, bindings.LDKCOption_boolZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_boolZ containing a bool
	 */
	public static Option_boolZ some(boolean o) {
		long ret = bindings.COption_boolZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_boolZ ret_hu_conv = org.ldk.structs.Option_boolZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_boolZ containing nothing
	 */
	public static Option_boolZ none() {
		long ret = bindings.COption_boolZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_boolZ ret_hu_conv = org.ldk.structs.Option_boolZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_boolZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_boolZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_boolZ clone() {
		long ret = bindings.COption_boolZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_boolZ ret_hu_conv = org.ldk.structs.Option_boolZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
