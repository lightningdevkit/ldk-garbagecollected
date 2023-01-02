using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PaymentPreimageAPIErrorZ : CommonBase {
	Result_PaymentPreimageAPIErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PaymentPreimageAPIErrorZ() {
		if (ptr != 0) { bindings.CResult_PaymentPreimageAPIErrorZ_free(ptr); }
	}

	internal static Result_PaymentPreimageAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentPreimageAPIErrorZ_is_ok(ptr)) {
			return new Result_PaymentPreimageAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentPreimageAPIErrorZ_Err(null, ptr);
		}
	}
	public class Result_PaymentPreimageAPIErrorZ_OK : Result_PaymentPreimageAPIErrorZ {
		public readonly byte[] res;
		internal Result_PaymentPreimageAPIErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_PaymentPreimageAPIErrorZ_get_ok(ptr);
		}
	}

	public class Result_PaymentPreimageAPIErrorZ_Err : Result_PaymentPreimageAPIErrorZ {
		public readonly APIError err;
		internal Result_PaymentPreimageAPIErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_PaymentPreimageAPIErrorZ_get_err(ptr);
			org.ldk.structs.APIError err_hu_conv = org.ldk.structs.APIError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentPreimageAPIErrorZ in the success state.
	 */
	public static Result_PaymentPreimageAPIErrorZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentPreimageAPIErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentPreimageAPIErrorZ in the error state.
	 */
	public static Result_PaymentPreimageAPIErrorZ err(org.ldk.structs.APIError e) {
		long ret = bindings.CResult_PaymentPreimageAPIErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PaymentPreimageAPIErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PaymentPreimageAPIErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentPreimageAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentPreimageAPIErrorZ clone() {
		long ret = bindings.CResult_PaymentPreimageAPIErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
