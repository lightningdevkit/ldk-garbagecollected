package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_RouteLightningErrorZ extends CommonBase {
	private Result_RouteLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteLightningErrorZ_free(ptr); } super.finalize();
	}

	static Result_RouteLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RouteLightningErrorZ_is_ok(ptr)) {
			return new Result_RouteLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteLightningErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteLightningErrorZ_OK extends Result_RouteLightningErrorZ {
		public final Route res;
		private Result_RouteLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_RouteLightningErrorZ_get_ok(ptr);
			Route res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new Route(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RouteLightningErrorZ_Err extends Result_RouteLightningErrorZ {
		public final LightningError err;
		private Result_RouteLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_RouteLightningErrorZ_get_err(ptr);
			LightningError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new LightningError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_RouteLightningErrorZ in the success state.
	 */
	public static Result_RouteLightningErrorZ ok(Route o) {
		long ret = bindings.CResult_RouteLightningErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RouteLightningErrorZ in the error state.
	 */
	public static Result_RouteLightningErrorZ err(LightningError e) {
		long ret = bindings.CResult_RouteLightningErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_RouteLightningErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_RouteLightningErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RouteLightningErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RouteLightningErrorZ clone() {
		long ret = bindings.CResult_RouteLightningErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
