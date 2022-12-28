package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PaymentHashPaymentSendFailureZ extends CommonBase {
	private Result_PaymentHashPaymentSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentHashPaymentSendFailureZ_free(ptr); } super.finalize();
	}

	static Result_PaymentHashPaymentSendFailureZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentHashPaymentSendFailureZ_is_ok(ptr)) {
			return new Result_PaymentHashPaymentSendFailureZ_OK(null, ptr);
		} else {
			return new Result_PaymentHashPaymentSendFailureZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentHashPaymentSendFailureZ_OK extends Result_PaymentHashPaymentSendFailureZ {
		public final byte[] res;
		private Result_PaymentHashPaymentSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_PaymentHashPaymentSendFailureZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentHashPaymentSendFailureZ_Err extends Result_PaymentHashPaymentSendFailureZ {
		public final PaymentSendFailure err;
		private Result_PaymentHashPaymentSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PaymentHashPaymentSendFailureZ_get_err(ptr);
			org.ldk.structs.PaymentSendFailure err_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentHashPaymentSendFailureZ in the success state.
	 */
	public static Result_PaymentHashPaymentSendFailureZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentHashPaymentSendFailureZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentHashPaymentSendFailureZ in the error state.
	 */
	public static Result_PaymentHashPaymentSendFailureZ err(org.ldk.structs.PaymentSendFailure e) {
		long ret = bindings.CResult_PaymentHashPaymentSendFailureZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentHashPaymentSendFailureZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PaymentHashPaymentSendFailureZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentHashPaymentSendFailureZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentHashPaymentSendFailureZ clone() {
		long ret = bindings.CResult_PaymentHashPaymentSendFailureZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
