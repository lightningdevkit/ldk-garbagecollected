package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PaymentPurposeDecodeErrorZ extends CommonBase {
	private Result_PaymentPurposeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentPurposeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentPurposeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentPurposeDecodeErrorZ_is_ok(ptr)) {
			return new Result_PaymentPurposeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentPurposeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentPurposeDecodeErrorZ_OK extends Result_PaymentPurposeDecodeErrorZ {
		public final PaymentPurpose res;
		private Result_PaymentPurposeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_PaymentPurposeDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.PaymentPurpose res_hu_conv = org.ldk.structs.PaymentPurpose.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PaymentPurposeDecodeErrorZ_Err extends Result_PaymentPurposeDecodeErrorZ {
		public final DecodeError err;
		private Result_PaymentPurposeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PaymentPurposeDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentPurposeDecodeErrorZ in the success state.
	 */
	public static Result_PaymentPurposeDecodeErrorZ ok(PaymentPurpose o) {
		long ret = bindings.CResult_PaymentPurposeDecodeErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPurposeDecodeErrorZ ret_hu_conv = Result_PaymentPurposeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentPurposeDecodeErrorZ in the error state.
	 */
	public static Result_PaymentPurposeDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_PaymentPurposeDecodeErrorZ_err(e == null ? 0 : e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPurposeDecodeErrorZ ret_hu_conv = Result_PaymentPurposeDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentPurposeDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PaymentPurposeDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentPurposeDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentPurposeDecodeErrorZ clone() {
		long ret = bindings.CResult_PaymentPurposeDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPurposeDecodeErrorZ ret_hu_conv = Result_PaymentPurposeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
