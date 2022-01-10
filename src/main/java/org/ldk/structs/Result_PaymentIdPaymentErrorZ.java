package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PaymentIdPaymentErrorZ extends CommonBase {
	private Result_PaymentIdPaymentErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentIdPaymentErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentIdPaymentErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentIdPaymentErrorZ_is_ok(ptr)) {
			return new Result_PaymentIdPaymentErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentIdPaymentErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentIdPaymentErrorZ_OK extends Result_PaymentIdPaymentErrorZ {
		public final byte[] res;
		private Result_PaymentIdPaymentErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_PaymentIdPaymentErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentIdPaymentErrorZ_Err extends Result_PaymentIdPaymentErrorZ {
		public final PaymentError err;
		private Result_PaymentIdPaymentErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PaymentIdPaymentErrorZ_get_err(ptr);
			PaymentError err_hu_conv = PaymentError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentErrorZ in the success state.
	 */
	public static Result_PaymentIdPaymentErrorZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentErrorZ in the error state.
	 */
	public static Result_PaymentIdPaymentErrorZ err(PaymentError e) {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentIdPaymentErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentIdPaymentErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentIdPaymentErrorZ clone() {
		long ret = bindings.CResult_PaymentIdPaymentErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentErrorZ ret_hu_conv = Result_PaymentIdPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
