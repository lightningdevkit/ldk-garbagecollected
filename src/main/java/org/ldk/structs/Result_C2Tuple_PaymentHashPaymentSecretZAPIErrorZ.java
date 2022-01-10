package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ extends CommonBase {
	private Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_is_ok(ptr)) {
			return new Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_OK extends Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ {
		public final TwoTuple_PaymentHashPaymentSecretZ res;
		private Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_get_ok(ptr);
			TwoTuple_PaymentHashPaymentSecretZ res_hu_conv = new TwoTuple_PaymentHashPaymentSecretZ(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_Err extends Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ {
		public final APIError err;
		private Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ in the success state.
	 */
	public static Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ok(TwoTuple_PaymentHashPaymentSecretZ o) {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_ok(o != null ? o.ptr : 0);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ in the error state.
	 */
	public static Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ err(APIError e) {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ clone() {
		long ret = bindings.CResult_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
