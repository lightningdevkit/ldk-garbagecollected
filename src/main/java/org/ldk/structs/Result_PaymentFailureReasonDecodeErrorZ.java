package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PaymentFailureReasonDecodeErrorZ extends CommonBase {
	private Result_PaymentFailureReasonDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentFailureReasonDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentFailureReasonDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentFailureReasonDecodeErrorZ_is_ok(ptr)) {
			return new Result_PaymentFailureReasonDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentFailureReasonDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentFailureReasonDecodeErrorZ_OK extends Result_PaymentFailureReasonDecodeErrorZ {
		public final PaymentFailureReason res;
		private Result_PaymentFailureReasonDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_PaymentFailureReasonDecodeErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentFailureReasonDecodeErrorZ_Err extends Result_PaymentFailureReasonDecodeErrorZ {
		public final DecodeError err;
		private Result_PaymentFailureReasonDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PaymentFailureReasonDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentFailureReasonDecodeErrorZ in the success state.
	 */
	public static Result_PaymentFailureReasonDecodeErrorZ ok(org.ldk.enums.PaymentFailureReason o) {
		long ret = bindings.CResult_PaymentFailureReasonDecodeErrorZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentFailureReasonDecodeErrorZ ret_hu_conv = Result_PaymentFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentFailureReasonDecodeErrorZ in the error state.
	 */
	public static Result_PaymentFailureReasonDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_PaymentFailureReasonDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentFailureReasonDecodeErrorZ ret_hu_conv = Result_PaymentFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentFailureReasonDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PaymentFailureReasonDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentFailureReasonDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentFailureReasonDecodeErrorZ clone() {
		long ret = bindings.CResult_PaymentFailureReasonDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentFailureReasonDecodeErrorZ ret_hu_conv = Result_PaymentFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
