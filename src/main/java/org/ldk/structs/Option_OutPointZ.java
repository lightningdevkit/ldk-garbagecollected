package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::chain::transaction::OutPoint or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_OutPointZ extends CommonBase {
	private Option_OutPointZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_OutPointZ_free(ptr); }
	}
	static Option_OutPointZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_OutPointZ raw_val = bindings.LDKCOption_OutPointZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_OutPointZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_OutPointZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_OutPointZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_OutPointZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_OutPointZ contains a crate::lightning::chain::transaction::OutPoint
	 */
	public final static class Some extends Option_OutPointZ {
		public final org.ldk.structs.OutPoint some;
		private Some(long ptr, bindings.LDKCOption_OutPointZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			org.ldk.structs.OutPoint some_hu_conv = null; if (some < 0 || some > 4096) { some_hu_conv = new org.ldk.structs.OutPoint(null, some); }
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_OutPointZ contains nothing
	 */
	public final static class None extends Option_OutPointZ {
		private None(long ptr, bindings.LDKCOption_OutPointZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_OutPointZ containing a crate::lightning::chain::transaction::OutPoint
	 */
	public static Option_OutPointZ some(org.ldk.structs.OutPoint o) {
		long ret = bindings.COption_OutPointZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OutPointZ ret_hu_conv = org.ldk.structs.Option_OutPointZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_OutPointZ containing nothing
	 */
	public static Option_OutPointZ none() {
		long ret = bindings.COption_OutPointZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OutPointZ ret_hu_conv = org.ldk.structs.Option_OutPointZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_OutPointZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_OutPointZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_OutPointZ clone() {
		long ret = bindings.COption_OutPointZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_OutPointZ ret_hu_conv = org.ldk.structs.Option_OutPointZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
