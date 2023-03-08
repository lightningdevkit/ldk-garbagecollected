package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PaymentHashRetryableSendFailureZ extends CommonBase {
	private Result_PaymentHashRetryableSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentHashRetryableSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_PaymentHashRetryableSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentHashRetryableSendFailureZ_is_ok(ptr)) {
			return new Result_PaymentHashRetryableSendFailureZ_OK(null, ptr);
		} else {
			return new Result_PaymentHashRetryableSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentHashRetryableSendFailureZ_OK extends Result_PaymentHashRetryableSendFailureZ {
		public final byte[] res;
		private Result_PaymentHashRetryableSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_PaymentHashRetryableSendFailureZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentHashRetryableSendFailureZ_Err extends Result_PaymentHashRetryableSendFailureZ {
		public final RetryableSendFailure err;
		private Result_PaymentHashRetryableSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_PaymentHashRetryableSendFailureZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PaymentHashRetryableSendFailureZ in the success state.
	 */
	public static Result_PaymentHashRetryableSendFailureZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentHashRetryableSendFailureZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashRetryableSendFailureZ ret_hu_conv = Result_PaymentHashRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentHashRetryableSendFailureZ in the error state.
	 */
	public static Result_PaymentHashRetryableSendFailureZ err(org.ldk.enums.RetryableSendFailure e) {
		long ret = bindings.CResult_PaymentHashRetryableSendFailureZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashRetryableSendFailureZ ret_hu_conv = Result_PaymentHashRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentHashRetryableSendFailureZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PaymentHashRetryableSendFailureZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentHashRetryableSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentHashRetryableSendFailureZ clone() {
		long ret = bindings.CResult_PaymentHashRetryableSendFailureZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashRetryableSendFailureZ ret_hu_conv = Result_PaymentHashRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
