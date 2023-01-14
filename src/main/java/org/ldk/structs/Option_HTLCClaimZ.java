package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::ln::chan_utils::HTLCClaim or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_HTLCClaimZ extends CommonBase {
	private Option_HTLCClaimZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_HTLCClaimZ_free(ptr); }
	}
	static Option_HTLCClaimZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_HTLCClaimZ raw_val = bindings.LDKCOption_HTLCClaimZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_HTLCClaimZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_HTLCClaimZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_HTLCClaimZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_HTLCClaimZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_HTLCClaimZ contains a crate::lightning::ln::chan_utils::HTLCClaim
	 */
	public final static class Some extends Option_HTLCClaimZ {
		public final org.ldk.enums.HTLCClaim some;
		private Some(long ptr, bindings.LDKCOption_HTLCClaimZ.Some obj) {
			super(null, ptr);
			this.some = obj.some;
		}
	}
	/**
	 * When we're in this state, this COption_HTLCClaimZ contains nothing
	 */
	public final static class None extends Option_HTLCClaimZ {
		private None(long ptr, bindings.LDKCOption_HTLCClaimZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_HTLCClaimZ containing a crate::lightning::ln::chan_utils::HTLCClaim
	 */
	public static Option_HTLCClaimZ some(org.ldk.enums.HTLCClaim o) {
		long ret = bindings.COption_HTLCClaimZ_some(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCClaimZ ret_hu_conv = org.ldk.structs.Option_HTLCClaimZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_HTLCClaimZ containing nothing
	 */
	public static Option_HTLCClaimZ none() {
		long ret = bindings.COption_HTLCClaimZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_HTLCClaimZ ret_hu_conv = org.ldk.structs.Option_HTLCClaimZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
