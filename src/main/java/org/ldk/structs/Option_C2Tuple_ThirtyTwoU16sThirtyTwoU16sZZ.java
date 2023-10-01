package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::c_types::derived::C2Tuple__u1632_u1632Z or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ extends CommonBase {
	private Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_free(ptr); }
	}
	static Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ raw_val = bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ contains a crate::c_types::derived::C2Tuple__u1632_u1632Z
	 */
	public final static class Some extends Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ {
		public final org.ldk.structs.TwoTuple__u1632_u1632Z some;
		private Some(long ptr, bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			TwoTuple__u1632_u1632Z some_hu_conv = new TwoTuple__u1632_u1632Z(null, some);
			if (some_hu_conv != null) { some_hu_conv.ptrs_to.add(this); };
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ contains nothing
	 */
	public final static class None extends Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ {
		private None(long ptr, bindings.LDKCOption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ containing a crate::c_types::derived::C2Tuple__u1632_u1632Z
	 */
	public static Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ some(org.ldk.structs.TwoTuple__u1632_u1632Z o) {
		long ret = bindings.COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_some(o != null ? o.ptr : 0);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ containing nothing
	 */
	public static Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ none() {
		long ret = bindings.COption_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ ret_hu_conv = org.ldk.structs.Option_C2Tuple_ThirtyTwoU16sThirtyTwoU16sZZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

}
