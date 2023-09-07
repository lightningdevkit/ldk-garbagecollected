using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PaymentHashRetryableSendFailureZ : CommonBase {
	Result_PaymentHashRetryableSendFailureZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PaymentHashRetryableSendFailureZ() {
		if (ptr != 0) { bindings.CResult_PaymentHashRetryableSendFailureZ_free(ptr); }
	}

	internal static Result_PaymentHashRetryableSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentHashRetryableSendFailureZ_is_ok(ptr)) {
			return new Result_PaymentHashRetryableSendFailureZ_OK(null, ptr);
		} else {
			return new Result_PaymentHashRetryableSendFailureZ_Err(null, ptr);
		}
	}
	public class Result_PaymentHashRetryableSendFailureZ_OK : Result_PaymentHashRetryableSendFailureZ {
		public readonly byte[] res;
		internal Result_PaymentHashRetryableSendFailureZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_PaymentHashRetryableSendFailureZ_get_ok(ptr);
		}
	}

	public class Result_PaymentHashRetryableSendFailureZ_Err : Result_PaymentHashRetryableSendFailureZ {
		public readonly RetryableSendFailure err;
		internal Result_PaymentHashRetryableSendFailureZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_PaymentHashRetryableSendFailureZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PaymentHashRetryableSendFailureZ in the success state.
	 */
	public static Result_PaymentHashRetryableSendFailureZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentHashRetryableSendFailureZ_ok(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashRetryableSendFailureZ ret_hu_conv = Result_PaymentHashRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentHashRetryableSendFailureZ in the error state.
	 */
	public static Result_PaymentHashRetryableSendFailureZ err(RetryableSendFailure e) {
		long ret = bindings.CResult_PaymentHashRetryableSendFailureZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashRetryableSendFailureZ ret_hu_conv = Result_PaymentHashRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PaymentHashRetryableSendFailureZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PaymentHashRetryableSendFailureZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentHashRetryableSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentHashRetryableSendFailureZ clone() {
		long ret = bindings.CResult_PaymentHashRetryableSendFailureZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashRetryableSendFailureZ ret_hu_conv = Result_PaymentHashRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
