using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ : CommonBase {
	Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_free(ptr); }
	}

	internal static Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_is_ok(ptr)) {
			return new Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_OK : Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ {
		public readonly TwoTuple_PaymentHashPaymentSecretZ res;
		internal Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_get_ok(ptr);
			TwoTuple_PaymentHashPaymentSecretZ res_hu_conv = new TwoTuple_PaymentHashPaymentSecretZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_Err : Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ {
		public readonly APIError err;
		internal Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_get_err(ptr);
			org.ldk.structs.APIError err_hu_conv = org.ldk.structs.APIError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ in the success state.
	 */
	public static Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ok(org.ldk.structs.TwoTuple_PaymentHashPaymentSecretZ o) {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ in the error state.
	 */
	public static Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ err(org.ldk.structs.APIError e) {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ clone() {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
