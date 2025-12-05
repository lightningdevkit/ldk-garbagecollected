package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_RouteStrZ extends CommonBase {
	private Result_RouteStrZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteStrZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_RouteStrZ_free(ptr); ptr = 0; }
	}

	static Result_RouteStrZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RouteStrZ_is_ok(ptr)) {
			return new Result_RouteStrZ_OK(null, ptr);
		} else {
			return new Result_RouteStrZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteStrZ_OK extends Result_RouteStrZ {
		public final Route res;
		private Result_RouteStrZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_RouteStrZ_get_ok(ptr);
			org.ldk.structs.Route res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Route(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RouteStrZ_Err extends Result_RouteStrZ {
		public final String err;
		private Result_RouteStrZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_RouteStrZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_RouteStrZ in the success state.
	 */
	public static Result_RouteStrZ ok(org.ldk.structs.Route o) {
		long ret = bindings.CResult_RouteStrZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteStrZ ret_hu_conv = Result_RouteStrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RouteStrZ in the error state.
	 */
	public static Result_RouteStrZ err(java.lang.String e) {
		long ret = bindings.CResult_RouteStrZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteStrZ ret_hu_conv = Result_RouteStrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_RouteStrZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_RouteStrZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RouteStrZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RouteStrZ clone() {
		long ret = bindings.CResult_RouteStrZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteStrZ ret_hu_conv = Result_RouteStrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
