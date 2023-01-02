using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_PaymentHashPaymentSecretZNoneZ : CommonBase {
	Result_C2Tuple_PaymentHashPaymentSecretZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_PaymentHashPaymentSecretZNoneZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_free(ptr); }
	}

	internal static Result_C2Tuple_PaymentHashPaymentSecretZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_is_ok(ptr)) {
			return new Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_OK : Result_C2Tuple_PaymentHashPaymentSecretZNoneZ {
		public readonly TwoTuple_PaymentHashPaymentSecretZ res;
		internal Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_get_ok(ptr);
			TwoTuple_PaymentHashPaymentSecretZ res_hu_conv = new TwoTuple_PaymentHashPaymentSecretZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_Err : Result_C2Tuple_PaymentHashPaymentSecretZNoneZ {
		internal Result_C2Tuple_PaymentHashPaymentSecretZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ in the success state.
	 */
	public static Result_C2Tuple_PaymentHashPaymentSecretZNoneZ ok(org.ldk.structs.TwoTuple_PaymentHashPaymentSecretZ o) {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZNoneZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ in the error state.
	 */
	public static Result_C2Tuple_PaymentHashPaymentSecretZNoneZ err() {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZNoneZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_PaymentHashPaymentSecretZNoneZ clone() {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZNoneZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
