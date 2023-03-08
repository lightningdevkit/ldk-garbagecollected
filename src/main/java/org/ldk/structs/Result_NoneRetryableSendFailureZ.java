package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_NoneRetryableSendFailureZ extends CommonBase {
	private Result_NoneRetryableSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneRetryableSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_NoneRetryableSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneRetryableSendFailureZ_is_ok(ptr)) {
			return new Result_NoneRetryableSendFailureZ_OK(null, ptr);
		} else {
			return new Result_NoneRetryableSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneRetryableSendFailureZ_OK extends Result_NoneRetryableSendFailureZ {
		private Result_NoneRetryableSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneRetryableSendFailureZ_Err extends Result_NoneRetryableSendFailureZ {
		public final RetryableSendFailure err;
		private Result_NoneRetryableSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_NoneRetryableSendFailureZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_NoneRetryableSendFailureZ in the success state.
	 */
	public static Result_NoneRetryableSendFailureZ ok() {
		long ret = bindings.CResult_NoneRetryableSendFailureZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneRetryableSendFailureZ ret_hu_conv = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneRetryableSendFailureZ in the error state.
	 */
	public static Result_NoneRetryableSendFailureZ err(org.ldk.enums.RetryableSendFailure e) {
		long ret = bindings.CResult_NoneRetryableSendFailureZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneRetryableSendFailureZ ret_hu_conv = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneRetryableSendFailureZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_NoneRetryableSendFailureZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneRetryableSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneRetryableSendFailureZ clone() {
		long ret = bindings.CResult_NoneRetryableSendFailureZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneRetryableSendFailureZ ret_hu_conv = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
