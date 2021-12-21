package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple_usizeTransactionZ or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_C2Tuple_usizeTransactionZZ extends CommonBase {
	private Option_C2Tuple_usizeTransactionZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_C2Tuple_usizeTransactionZZ_free(ptr); }
	}
	static Option_C2Tuple_usizeTransactionZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_C2Tuple_usizeTransactionZZ raw_val = bindings.LDKCOption_C2Tuple_usizeTransactionZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_C2Tuple_usizeTransactionZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_C2Tuple_usizeTransactionZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_C2Tuple_usizeTransactionZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_C2Tuple_usizeTransactionZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_C2Tuple_usizeTransactionZZ contains a crate::c_types::derived::C2Tuple_usizeTransactionZ
	 */
	public final static class Some extends Option_C2Tuple_usizeTransactionZZ {
		public final TwoTuple_usizeTransactionZ some;
		private Some(long ptr, bindings.LDKCOption_C2Tuple_usizeTransactionZZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			TwoTuple_usizeTransactionZ some_hu_conv = new TwoTuple_usizeTransactionZ(null, some);
			some_hu_conv.ptrs_to.add(this);
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_C2Tuple_usizeTransactionZZ contains nothing
	 */
	public final static class None extends Option_C2Tuple_usizeTransactionZZ {
		private None(long ptr, bindings.LDKCOption_C2Tuple_usizeTransactionZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_C2Tuple_usizeTransactionZZ containing a crate::c_types::derived::C2Tuple_usizeTransactionZ
	 */
	public static Option_C2Tuple_usizeTransactionZZ some(TwoTuple_usizeTransactionZ o) {
		long ret = bindings.COption_C2Tuple_usizeTransactionZZ_some(o != null ? o.ptr : 0);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_usizeTransactionZZ containing nothing
	 */
	public static Option_C2Tuple_usizeTransactionZZ none() {
		long ret = bindings.COption_C2Tuple_usizeTransactionZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_C2Tuple_usizeTransactionZZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_C2Tuple_usizeTransactionZZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_C2Tuple_usizeTransactionZZ clone() {
		long ret = bindings.COption_C2Tuple_usizeTransactionZZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_C2Tuple_usizeTransactionZZ ret_hu_conv = Option_C2Tuple_usizeTransactionZZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
