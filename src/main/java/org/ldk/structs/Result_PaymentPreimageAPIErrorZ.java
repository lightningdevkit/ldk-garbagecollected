package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PaymentPreimageAPIErrorZ extends CommonBase {
	private Result_PaymentPreimageAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentPreimageAPIErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentPreimageAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentPreimageAPIErrorZ_is_ok(ptr)) {
			return new Result_PaymentPreimageAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentPreimageAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentPreimageAPIErrorZ_OK extends Result_PaymentPreimageAPIErrorZ {
		public final byte[] res;
		private Result_PaymentPreimageAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_PaymentPreimageAPIErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentPreimageAPIErrorZ_Err extends Result_PaymentPreimageAPIErrorZ {
		public final APIError err;
		private Result_PaymentPreimageAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PaymentPreimageAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentPreimageAPIErrorZ in the success state.
	 */
	public static Result_PaymentPreimageAPIErrorZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentPreimageAPIErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentPreimageAPIErrorZ in the error state.
	 */
	public static Result_PaymentPreimageAPIErrorZ err(APIError e) {
		long ret = bindings.CResult_PaymentPreimageAPIErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentPreimageAPIErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PaymentPreimageAPIErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentPreimageAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentPreimageAPIErrorZ clone() {
		long ret = bindings.CResult_PaymentPreimageAPIErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
