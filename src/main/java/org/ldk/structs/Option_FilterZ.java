package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::chain::Filter or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_FilterZ extends CommonBase {
	private Option_FilterZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_FilterZ_free(ptr); }
	}
	static Option_FilterZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_FilterZ raw_val = bindings.LDKCOption_FilterZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_FilterZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_FilterZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_FilterZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_FilterZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_FilterZ contains a crate::lightning::chain::Filter
	 */
	public final static class Some extends Option_FilterZ {
		public final Filter some;
		private Some(long ptr, bindings.LDKCOption_FilterZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			Filter ret_hu_conv = new Filter(null, some);
			ret_hu_conv.ptrs_to.add(this);
			this.some = ret_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_FilterZ contains nothing
	 */
	public final static class None extends Option_FilterZ {
		private None(long ptr, bindings.LDKCOption_FilterZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_FilterZ containing a crate::lightning::chain::Filter
	 */
	public static Option_FilterZ some(Filter o) {
		long ret = bindings.COption_FilterZ_some(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_FilterZ ret_hu_conv = Option_FilterZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_FilterZ containing nothing
	 */
	public static Option_FilterZ none() {
		long ret = bindings.COption_FilterZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_FilterZ ret_hu_conv = Option_FilterZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
