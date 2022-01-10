package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ extends CommonBase {
	private Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_is_ok(ptr)) {
			return new Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_OK extends Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ {
		public final TwoTuple_PaymentHashPaymentIdZ res;
		private Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_get_ok(ptr);
			TwoTuple_PaymentHashPaymentIdZ res_hu_conv = new TwoTuple_PaymentHashPaymentIdZ(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_Err extends Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ {
		public final PaymentSendFailure err;
		private Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_get_err(ptr);
			PaymentSendFailure err_hu_conv = PaymentSendFailure.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ in the success state.
	 */
	public static Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ok(TwoTuple_PaymentHashPaymentIdZ o) {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_ok(o != null ? o.ptr : 0);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ in the error state.
	 */
	public static Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ err(PaymentSendFailure e) {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ clone() {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
