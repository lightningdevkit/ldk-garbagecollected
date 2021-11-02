package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_PaymentIdPaymentErrorZ extends CommonBase {
	private Result_PaymentIdPaymentErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentIdPaymentErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentIdPaymentErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PaymentIdPaymentErrorZ_result_ok(ptr)) {
			return new Result_PaymentIdPaymentErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentIdPaymentErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentIdPaymentErrorZ_OK extends Result_PaymentIdPaymentErrorZ {
		public final byte[] res;
		private Result_PaymentIdPaymentErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PaymentIdPaymentErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentIdPaymentErrorZ_Err extends Result_PaymentIdPaymentErrorZ {
		public final PaymentError err;
		private Result_PaymentIdPaymentErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_PaymentIdPaymentErrorZ_get_err(ptr);
			PaymentError err_hu_conv = PaymentError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentErrorZ in the success state.
	 */
	public static Result_PaymentIdPaymentErrorZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_ok(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentErrorZ in the error state.
	 */
	public static Result_PaymentIdPaymentErrorZ err(PaymentError e) {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_err(e.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentIdPaymentErrorZ clone() {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
