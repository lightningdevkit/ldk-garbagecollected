package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ThirtyTwoBytesPaymentErrorZ extends CommonBase {
	private Result_ThirtyTwoBytesPaymentErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ThirtyTwoBytesPaymentErrorZ_free(ptr); } super.finalize();
	}

	static Result_ThirtyTwoBytesPaymentErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ThirtyTwoBytesPaymentErrorZ_is_ok(ptr)) {
			return new Result_ThirtyTwoBytesPaymentErrorZ_OK(null, ptr);
		} else {
			return new Result_ThirtyTwoBytesPaymentErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ThirtyTwoBytesPaymentErrorZ_OK extends Result_ThirtyTwoBytesPaymentErrorZ {
		public final byte[] res;
		private Result_ThirtyTwoBytesPaymentErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_ThirtyTwoBytesPaymentErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_ThirtyTwoBytesPaymentErrorZ_Err extends Result_ThirtyTwoBytesPaymentErrorZ {
		public final PaymentError err;
		private Result_ThirtyTwoBytesPaymentErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_ThirtyTwoBytesPaymentErrorZ_get_err(ptr);
			org.ldk.structs.PaymentError err_hu_conv = org.ldk.structs.PaymentError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesPaymentErrorZ in the success state.
	 */
	public static Result_ThirtyTwoBytesPaymentErrorZ ok(byte[] o) {
		long ret = bindings.CResult_ThirtyTwoBytesPaymentErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesPaymentErrorZ ret_hu_conv = Result_ThirtyTwoBytesPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesPaymentErrorZ in the error state.
	 */
	public static Result_ThirtyTwoBytesPaymentErrorZ err(org.ldk.structs.PaymentError e) {
		long ret = bindings.CResult_ThirtyTwoBytesPaymentErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesPaymentErrorZ ret_hu_conv = Result_ThirtyTwoBytesPaymentErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ThirtyTwoBytesPaymentErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ThirtyTwoBytesPaymentErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesPaymentErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ThirtyTwoBytesPaymentErrorZ clone() {
		long ret = bindings.CResult_ThirtyTwoBytesPaymentErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesPaymentErrorZ ret_hu_conv = Result_ThirtyTwoBytesPaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
