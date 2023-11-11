using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ThirtyTwoBytesRetryableSendFailureZ : CommonBase {
	Result_ThirtyTwoBytesRetryableSendFailureZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ThirtyTwoBytesRetryableSendFailureZ() {
		if (ptr != 0) { bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_free(ptr); }
	}

	internal static Result_ThirtyTwoBytesRetryableSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_is_ok(ptr)) {
			return new Result_ThirtyTwoBytesRetryableSendFailureZ_OK(null, ptr);
		} else {
			return new Result_ThirtyTwoBytesRetryableSendFailureZ_Err(null, ptr);
		}
	}
	public class Result_ThirtyTwoBytesRetryableSendFailureZ_OK : Result_ThirtyTwoBytesRetryableSendFailureZ {
		public readonly byte[] res;
		internal Result_ThirtyTwoBytesRetryableSendFailureZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_get_ok(ptr);
			byte[] res_conv = InternalUtils.decodeUint8Array(res);
			this.res = res_conv;
		}
	}

	public class Result_ThirtyTwoBytesRetryableSendFailureZ_Err : Result_ThirtyTwoBytesRetryableSendFailureZ {
		public readonly RetryableSendFailure err;
		internal Result_ThirtyTwoBytesRetryableSendFailureZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesRetryableSendFailureZ in the success state.
	 */
	public static Result_ThirtyTwoBytesRetryableSendFailureZ ok(byte[] o) {
		long ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_ok(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(o, 32)));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesRetryableSendFailureZ ret_hu_conv = Result_ThirtyTwoBytesRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesRetryableSendFailureZ in the error state.
	 */
	public static Result_ThirtyTwoBytesRetryableSendFailureZ err(RetryableSendFailure e) {
		long ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesRetryableSendFailureZ ret_hu_conv = Result_ThirtyTwoBytesRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesRetryableSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ThirtyTwoBytesRetryableSendFailureZ clone() {
		long ret = bindings.CResult_ThirtyTwoBytesRetryableSendFailureZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesRetryableSendFailureZ ret_hu_conv = Result_ThirtyTwoBytesRetryableSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
