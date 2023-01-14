package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_NonePaymentErrorZ extends CommonBase {
	private Result_NonePaymentErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NonePaymentErrorZ_free(ptr); } super.finalize();
	}

	static Result_NonePaymentErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NonePaymentErrorZ_is_ok(ptr)) {
			return new Result_NonePaymentErrorZ_OK(null, ptr);
		} else {
			return new Result_NonePaymentErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NonePaymentErrorZ_OK extends Result_NonePaymentErrorZ {
		private Result_NonePaymentErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NonePaymentErrorZ_Err extends Result_NonePaymentErrorZ {
		public final PaymentError err;
		private Result_NonePaymentErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_NonePaymentErrorZ_get_err(ptr);
			org.ldk.structs.PaymentError err_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NonePaymentErrorZ in the success state.
	 */
	public static Result_NonePaymentErrorZ ok() {
		long ret = bindings.CResult_NonePaymentErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentErrorZ ret_hu_conv = Result_NonePaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NonePaymentErrorZ in the error state.
	 */
	public static Result_NonePaymentErrorZ err(org.ldk.structs.PaymentError e) {
		long ret = bindings.CResult_NonePaymentErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentErrorZ ret_hu_conv = Result_NonePaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_NonePaymentErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_NonePaymentErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NonePaymentErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NonePaymentErrorZ clone() {
		long ret = bindings.CResult_NonePaymentErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentErrorZ ret_hu_conv = Result_NonePaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
