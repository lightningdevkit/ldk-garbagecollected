package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_RouteParametersDecodeErrorZ extends CommonBase {
	private Result_RouteParametersDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteParametersDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_RouteParametersDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RouteParametersDecodeErrorZ_is_ok(ptr)) {
			return new Result_RouteParametersDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteParametersDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteParametersDecodeErrorZ_OK extends Result_RouteParametersDecodeErrorZ {
		public final RouteParameters res;
		private Result_RouteParametersDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_RouteParametersDecodeErrorZ_get_ok(ptr);
			RouteParameters res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new RouteParameters(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RouteParametersDecodeErrorZ_Err extends Result_RouteParametersDecodeErrorZ {
		public final DecodeError err;
		private Result_RouteParametersDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_RouteParametersDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_RouteParametersDecodeErrorZ in the success state.
	 */
	public static Result_RouteParametersDecodeErrorZ ok(RouteParameters o) {
		long ret = bindings.CResult_RouteParametersDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RouteParametersDecodeErrorZ in the error state.
	 */
	public static Result_RouteParametersDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_RouteParametersDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_RouteParametersDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_RouteParametersDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RouteParametersDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RouteParametersDecodeErrorZ clone() {
		long ret = bindings.CResult_RouteParametersDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersDecodeErrorZ ret_hu_conv = Result_RouteParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
