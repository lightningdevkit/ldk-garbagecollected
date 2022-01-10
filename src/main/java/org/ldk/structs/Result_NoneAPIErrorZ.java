package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_NoneAPIErrorZ extends CommonBase {
	private Result_NoneAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneAPIErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneAPIErrorZ_is_ok(ptr)) {
			return new Result_NoneAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneAPIErrorZ_OK extends Result_NoneAPIErrorZ {
		private Result_NoneAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneAPIErrorZ_Err extends Result_NoneAPIErrorZ {
		public final APIError err;
		private Result_NoneAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_NoneAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NoneAPIErrorZ in the success state.
	 */
	public static Result_NoneAPIErrorZ ok() {
		long ret = bindings.CResult_NoneAPIErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneAPIErrorZ in the error state.
	 */
	public static Result_NoneAPIErrorZ err(APIError e) {
		long ret = bindings.CResult_NoneAPIErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneAPIErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_NoneAPIErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneAPIErrorZ clone() {
		long ret = bindings.CResult_NoneAPIErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
