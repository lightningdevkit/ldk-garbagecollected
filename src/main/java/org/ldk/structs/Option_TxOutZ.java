package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::TxOut or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_TxOutZ extends CommonBase {
	private Option_TxOutZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_TxOutZ_free(ptr); }
	}
	static Option_TxOutZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_TxOutZ raw_val = bindings.LDKCOption_TxOutZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_TxOutZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_TxOutZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_TxOutZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_TxOutZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_TxOutZ contains a crate::c_types::TxOut
	 */
	public final static class Some extends Option_TxOutZ {
		public final org.ldk.structs.TxOut some;
		private Some(long ptr, bindings.LDKCOption_TxOutZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			TxOut some_conv = new TxOut(null, some);
			this.some = some_conv;
		}
	}
	/**
	 * When we're in this state, this COption_TxOutZ contains nothing
	 */
	public final static class None extends Option_TxOutZ {
		private None(long ptr, bindings.LDKCOption_TxOutZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_TxOutZ containing a crate::c_types::TxOut
	 */
	public static Option_TxOutZ some(org.ldk.structs.TxOut o) {
		long ret = bindings.COption_TxOutZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_TxOutZ ret_hu_conv = org.ldk.structs.Option_TxOutZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_TxOutZ containing nothing
	 */
	public static Option_TxOutZ none() {
		long ret = bindings.COption_TxOutZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_TxOutZ ret_hu_conv = org.ldk.structs.Option_TxOutZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_TxOutZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_TxOutZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_TxOutZ clone() {
		long ret = bindings.COption_TxOutZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_TxOutZ ret_hu_conv = org.ldk.structs.Option_TxOutZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
