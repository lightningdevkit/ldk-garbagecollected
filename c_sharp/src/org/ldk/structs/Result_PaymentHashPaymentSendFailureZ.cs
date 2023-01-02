using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PaymentHashPaymentSendFailureZ : CommonBase {
	Result_PaymentHashPaymentSendFailureZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PaymentHashPaymentSendFailureZ() {
		if (ptr != 0) { bindings.CResult_PaymentHashPaymentSendFailureZ_free(ptr); }
	}

	internal static Result_PaymentHashPaymentSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentHashPaymentSendFailureZ_is_ok(ptr)) {
			return new Result_PaymentHashPaymentSendFailureZ_OK(null, ptr);
		} else {
			return new Result_PaymentHashPaymentSendFailureZ_Err(null, ptr);
		}
	}
	public class Result_PaymentHashPaymentSendFailureZ_OK : Result_PaymentHashPaymentSendFailureZ {
		public readonly byte[] res;
		internal Result_PaymentHashPaymentSendFailureZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_PaymentHashPaymentSendFailureZ_get_ok(ptr);
		}
	}

	public class Result_PaymentHashPaymentSendFailureZ_Err : Result_PaymentHashPaymentSendFailureZ {
		public readonly PaymentSendFailure err;
		internal Result_PaymentHashPaymentSendFailureZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_PaymentHashPaymentSendFailureZ_get_err(ptr);
			org.ldk.structs.PaymentSendFailure err_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentHashPaymentSendFailureZ in the success state.
	 */
	public static Result_PaymentHashPaymentSendFailureZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentHashPaymentSendFailureZ_ok(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentHashPaymentSendFailureZ in the error state.
	 */
	public static Result_PaymentHashPaymentSendFailureZ err(org.ldk.structs.PaymentSendFailure e) {
		long ret = bindings.CResult_PaymentHashPaymentSendFailureZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PaymentHashPaymentSendFailureZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PaymentHashPaymentSendFailureZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentHashPaymentSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentHashPaymentSendFailureZ clone() {
		long ret = bindings.CResult_PaymentHashPaymentSendFailureZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
