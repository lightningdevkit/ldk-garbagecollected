using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ : CommonBase {
	Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_free(ptr); }
	}

	internal static Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_is_ok(ptr)) {
			return new Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_OK : Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ {
		public readonly TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ res;
		internal Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_get_ok(ptr);
			TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ res_hu_conv = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_Err : Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ {
		public readonly PaymentSendFailure err;
		internal Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_get_err(ptr);
			org.ldk.structs.PaymentSendFailure err_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ in the success state.
	 */
	public static Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ ok(org.ldk.structs.TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ o) {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ in the error state.
	 */
	public static Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ err(org.ldk.structs.PaymentSendFailure e) {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ clone() {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
