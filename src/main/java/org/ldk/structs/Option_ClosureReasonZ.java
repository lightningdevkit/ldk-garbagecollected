package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An enum which can either contain a crate::lightning::util::events::ClosureReason or not
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Option_ClosureReasonZ extends CommonBase {
	private Option_ClosureReasonZ(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.COption_ClosureReasonZ_free(ptr); }
	}
	static Option_ClosureReasonZ constr_from_ptr(long ptr) {
		bindings.LDKCOption_ClosureReasonZ raw_val = bindings.LDKCOption_ClosureReasonZ_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKCOption_ClosureReasonZ.Some.class) {
			return new Some(ptr, (bindings.LDKCOption_ClosureReasonZ.Some)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKCOption_ClosureReasonZ.None.class) {
			return new None(ptr, (bindings.LDKCOption_ClosureReasonZ.None)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * When we're in this state, this COption_ClosureReasonZ contains a crate::lightning::util::events::ClosureReason
	 */
	public final static class Some extends Option_ClosureReasonZ {
		public final ClosureReason some;
		private Some(long ptr, bindings.LDKCOption_ClosureReasonZ.Some obj) {
			super(null, ptr);
			long some = obj.some;
			ClosureReason some_hu_conv = ClosureReason.constr_from_ptr(some);
			some_hu_conv.ptrs_to.add(this);
			this.some = some_hu_conv;
		}
	}
	/**
	 * When we're in this state, this COption_ClosureReasonZ contains nothing
	 */
	public final static class None extends Option_ClosureReasonZ {
		private None(long ptr, bindings.LDKCOption_ClosureReasonZ.None obj) {
			super(null, ptr);
		}
	}
	/**
	 * Constructs a new COption_ClosureReasonZ containing a crate::lightning::util::events::ClosureReason
	 */
	public static Option_ClosureReasonZ some(ClosureReason o) {
		long ret = bindings.COption_ClosureReasonZ_some(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_ClosureReasonZ ret_hu_conv = Option_ClosureReasonZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new COption_ClosureReasonZ containing nothing
	 */
	public static Option_ClosureReasonZ none() {
		long ret = bindings.COption_ClosureReasonZ_none();
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_ClosureReasonZ ret_hu_conv = Option_ClosureReasonZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.COption_ClosureReasonZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new COption_ClosureReasonZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Option_ClosureReasonZ clone() {
		long ret = bindings.COption_ClosureReasonZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Option_ClosureReasonZ ret_hu_conv = Option_ClosureReasonZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
