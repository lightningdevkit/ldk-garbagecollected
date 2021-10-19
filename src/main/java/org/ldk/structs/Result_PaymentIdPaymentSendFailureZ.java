package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_PaymentIdPaymentSendFailureZ extends CommonBase {
	private Result_PaymentIdPaymentSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentIdPaymentSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_PaymentIdPaymentSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PaymentIdPaymentSendFailureZ_result_ok(ptr)) {
			return new Result_PaymentIdPaymentSendFailureZ_OK(null, ptr);
		} else {
			return new Result_PaymentIdPaymentSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentIdPaymentSendFailureZ_OK extends Result_PaymentIdPaymentSendFailureZ {
		public final PaymentId res;
		private Result_PaymentIdPaymentSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_PaymentIdPaymentSendFailureZ_get_ok(ptr);
			PaymentId res_hu_conv = new PaymentId(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PaymentIdPaymentSendFailureZ_Err extends Result_PaymentIdPaymentSendFailureZ {
		public final PaymentSendFailure err;
		private Result_PaymentIdPaymentSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_PaymentIdPaymentSendFailureZ_get_err(ptr);
			PaymentSendFailure err_hu_conv = PaymentSendFailure.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentSendFailureZ in the success state.
	 */
	public static Result_PaymentIdPaymentSendFailureZ ok(PaymentId o) {
		long ret = bindings.CResult_PaymentIdPaymentSendFailureZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentSendFailureZ in the error state.
	 */
	public static Result_PaymentIdPaymentSendFailureZ err(PaymentSendFailure e) {
		long ret = bindings.CResult_PaymentIdPaymentSendFailureZ_err(e.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentIdPaymentSendFailureZ clone() {
		long ret = bindings.CResult_PaymentIdPaymentSendFailureZ_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
