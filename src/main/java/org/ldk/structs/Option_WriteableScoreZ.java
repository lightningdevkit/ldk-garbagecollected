package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::routing::scoring::WriteableScore or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_WriteableScoreZ extends CommonBase {
	private Option_WriteableScoreZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_WriteableScoreZ_free(ptr); }
	}
	static Option_WriteableScoreZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_WriteableScoreZ raw_val = bindings.LDKCOption_WriteableScoreZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_WriteableScoreZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_WriteableScoreZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_WriteableScoreZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_WriteableScoreZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_WriteableScoreZ contains a crate::lightning::routing::scoring::WriteableScore
	 */
	public final static class Some extends Option_WriteableScoreZ {
		public final org.ldk.structs.WriteableScore some;
		private Some(long ptr, bindings.LDKCOption_WriteableScoreZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			WriteableScore ret_hu_conv = new WriteableScore(null, some);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
			this.some = ret_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_WriteableScoreZ contains nothing
	 */
	public final static class None extends Option_WriteableScoreZ {
		private None(long ptr, bindings.LDKCOption_WriteableScoreZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_WriteableScoreZ containing a crate::lightning::routing::scoring::WriteableScore
	 */
	public static Option_WriteableScoreZ some(org.ldk.structs.WriteableScore o) {
		long ret = bindings.COption_WriteableScoreZ_some(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_WriteableScoreZ ret_hu_conv = org.ldk.structs.Option_WriteableScoreZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_WriteableScoreZ containing nothing
	 */
	public static Option_WriteableScoreZ none() {
		long ret = bindings.COption_WriteableScoreZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_WriteableScoreZ ret_hu_conv = org.ldk.structs.Option_WriteableScoreZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
