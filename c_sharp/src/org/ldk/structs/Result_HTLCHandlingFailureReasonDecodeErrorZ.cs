using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_HTLCHandlingFailureReasonDecodeErrorZ : CommonBase {
	Result_HTLCHandlingFailureReasonDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_HTLCHandlingFailureReasonDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_HTLCHandlingFailureReasonDecodeErrorZ_free(ptr); }
	}

	internal static Result_HTLCHandlingFailureReasonDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_HTLCHandlingFailureReasonDecodeErrorZ_is_ok(ptr)) {
			return new Result_HTLCHandlingFailureReasonDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_HTLCHandlingFailureReasonDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_HTLCHandlingFailureReasonDecodeErrorZ_OK : Result_HTLCHandlingFailureReasonDecodeErrorZ {
		public readonly HTLCHandlingFailureReason res;
		internal Result_HTLCHandlingFailureReasonDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_HTLCHandlingFailureReasonDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.HTLCHandlingFailureReason res_hu_conv = org.ldk.structs.HTLCHandlingFailureReason.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_HTLCHandlingFailureReasonDecodeErrorZ_Err : Result_HTLCHandlingFailureReasonDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_HTLCHandlingFailureReasonDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_HTLCHandlingFailureReasonDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_HTLCHandlingFailureReasonDecodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_HTLCHandlingFailureReasonDecodeErrorZ ok(org.ldk.structs.HTLCHandlingFailureReason o) {
		long ret = bindings.CResult_HTLCHandlingFailureReasonDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCHandlingFailureReasonDecodeErrorZ ret_hu_conv = Result_HTLCHandlingFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_HTLCHandlingFailureReasonDecodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_HTLCHandlingFailureReasonDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_HTLCHandlingFailureReasonDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCHandlingFailureReasonDecodeErrorZ ret_hu_conv = Result_HTLCHandlingFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_HTLCHandlingFailureReasonDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_HTLCHandlingFailureReasonDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_HTLCHandlingFailureReasonDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_HTLCHandlingFailureReasonDecodeErrorZ clone() {
		long ret = bindings.CResult_HTLCHandlingFailureReasonDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCHandlingFailureReasonDecodeErrorZ ret_hu_conv = Result_HTLCHandlingFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
