package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::chain::Access or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_AccessZ extends CommonBase {
	private Option_AccessZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_AccessZ_free(ptr); }
	}
	static Option_AccessZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_AccessZ raw_val = bindings.LDKCOption_AccessZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_AccessZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_AccessZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_AccessZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_AccessZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_AccessZ contains a crate::lightning::chain::Access
	 */
	public final static class Some extends Option_AccessZ {
		public final Access some;
		private Some(long ptr, bindings.LDKCOption_AccessZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			Access ret_hu_conv = new Access(null, some);
			ret_hu_conv.ptrs_to.add(this);
			this.some = ret_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_AccessZ contains nothing
	 */
	public final static class None extends Option_AccessZ {
		private None(long ptr, bindings.LDKCOption_AccessZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_AccessZ containing a crate::lightning::chain::Access
	 */
	public static Option_AccessZ some(Access o) {
		long ret = bindings.COption_AccessZ_some(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_AccessZ ret_hu_conv = Option_AccessZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_AccessZ containing nothing
	 */
	public static Option_AccessZ none() {
		long ret = bindings.COption_AccessZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_AccessZ ret_hu_conv = Option_AccessZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
