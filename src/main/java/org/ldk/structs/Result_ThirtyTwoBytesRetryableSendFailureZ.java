package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ThirtyTwoBytesRetryableSendFailureZ extends CommonBase {
	private Result_ThirtyTwoBytesRetryableSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_ThirtyTwoBytesRetryableSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_is_ok(ptr)) {
			return new Result_ThirtyTwoBytesRetryableSendFailureZ_OK(null, ptr);
		} else {
			return new Result_ThirtyTwoBytesRetryableSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_ThirtyTwoBytesRetryableSendFailureZ_OK extends Result_ThirtyTwoBytesRetryableSendFailureZ {
		public final byte[] res;
		private Result_ThirtyTwoBytesRetryableSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_get_ok(ptr);
		}
	}

	public static final class Result_ThirtyTwoBytesRetryableSendFailureZ_Err extends Result_ThirtyTwoBytesRetryableSendFailureZ {
		public final RetryableSendFailure err;
		private Result_ThirtyTwoBytesRetryableSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesRetryableSendFailureZ in the success state.
	 */
	public static Result_ThirtyTwoBytesRetryableSendFailureZ ok(byte[] o) {
		long ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesRetryableSendFailureZ ret_hu_conv = Result_ThirtyTwoBytesRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesRetryableSendFailureZ in the error state.
	 */
	public static Result_ThirtyTwoBytesRetryableSendFailureZ err(org.ldk.enums.RetryableSendFailure e) {
		long ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesRetryableSendFailureZ ret_hu_conv = Result_ThirtyTwoBytesRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesRetryableSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ThirtyTwoBytesRetryableSendFailureZ clone() {
		long ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesRetryableSendFailureZ ret_hu_conv = Result_ThirtyTwoBytesRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
