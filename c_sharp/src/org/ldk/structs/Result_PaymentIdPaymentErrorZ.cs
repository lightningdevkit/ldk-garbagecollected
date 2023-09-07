using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PaymentIdPaymentErrorZ : CommonBase {
	Result_PaymentIdPaymentErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PaymentIdPaymentErrorZ() {
		if (ptr != 0) { bindings.CResult_PaymentIdPaymentErrorZ_free(ptr); }
	}

	internal static Result_PaymentIdPaymentErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentIdPaymentErrorZ_is_ok(ptr)) {
			return new Result_PaymentIdPaymentErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentIdPaymentErrorZ_Err(null, ptr);
		}
	}
	public class Result_PaymentIdPaymentErrorZ_OK : Result_PaymentIdPaymentErrorZ {
		public readonly byte[] res;
		internal Result_PaymentIdPaymentErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_PaymentIdPaymentErrorZ_get_ok(ptr);
		}
	}

	public class Result_PaymentIdPaymentErrorZ_Err : Result_PaymentIdPaymentErrorZ {
		public readonly PaymentError err;
		internal Result_PaymentIdPaymentErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_PaymentIdPaymentErrorZ_get_err(ptr);
			org.ldk.structs.PaymentError err_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentErrorZ in the success state.
	 */
	public static Result_PaymentIdPaymentErrorZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentErrorZ in the error state.
	 */
	public static Result_PaymentIdPaymentErrorZ err(org.ldk.structs.PaymentError e) {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PaymentIdPaymentErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentIdPaymentErrorZ clone() {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
