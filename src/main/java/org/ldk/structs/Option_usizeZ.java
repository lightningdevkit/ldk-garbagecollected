package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a usize or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_usizeZ extends CommonBase {
	private Option_usizeZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_usizeZ_free(ptr); }
	}
	static Option_usizeZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_usizeZ raw_val = bindings.LDKCOption_usizeZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_usizeZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_usizeZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_usizeZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_usizeZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_usizeZ contains a usize
	 */
	public final static class Some extends Option_usizeZ {
		public final long some;
		private Some(long ptr, bindings.LDKCOption_usizeZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_usizeZ contains nothing
	 */
	public final static class None extends Option_usizeZ {
		private None(long ptr, bindings.LDKCOption_usizeZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_usizeZ containing a usize
	 */
	public static Option_usizeZ some(long o) {
		long ret = bindings.COption_usizeZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_usizeZ ret_hu_conv = org.ldk.structs.Option_usizeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_usizeZ containing nothing
	 */
	public static Option_usizeZ none() {
		long ret = bindings.COption_usizeZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_usizeZ ret_hu_conv = org.ldk.structs.Option_usizeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_usizeZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_usizeZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_usizeZ clone() {
		long ret = bindings.COption_usizeZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_usizeZ ret_hu_conv = org.ldk.structs.Option_usizeZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
