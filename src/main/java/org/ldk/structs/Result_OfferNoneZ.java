package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_OfferNoneZ extends CommonBase {
	private Result_OfferNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_OfferNoneZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_OfferNoneZ_free(ptr); ptr = 0; }
	}

	static Result_OfferNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_OfferNoneZ_is_ok(ptr)) {
			return new Result_OfferNoneZ_OK(null, ptr);
		} else {
			return new Result_OfferNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_OfferNoneZ_OK extends Result_OfferNoneZ {
		public final Offer res;
		private Result_OfferNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_OfferNoneZ_get_ok(ptr);
			org.ldk.structs.Offer res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Offer(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_OfferNoneZ_Err extends Result_OfferNoneZ {
		private Result_OfferNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_OfferNoneZ in the success state.
	 */
	public static Result_OfferNoneZ ok(org.ldk.structs.Offer o) {
		long ret = bindings.CResult_OfferNoneZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferNoneZ ret_hu_conv = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OfferNoneZ in the error state.
	 */
	public static Result_OfferNoneZ err() {
		long ret = bindings.CResult_OfferNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferNoneZ ret_hu_conv = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_OfferNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_OfferNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_OfferNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_OfferNoneZ clone() {
		long ret = bindings.CResult_OfferNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferNoneZ ret_hu_conv = Result_OfferNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
