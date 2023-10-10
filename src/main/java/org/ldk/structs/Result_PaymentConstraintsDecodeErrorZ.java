package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PaymentConstraintsDecodeErrorZ extends CommonBase {
	private Result_PaymentConstraintsDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentConstraintsDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentConstraintsDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentConstraintsDecodeErrorZ_is_ok(ptr)) {
			return new Result_PaymentConstraintsDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentConstraintsDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentConstraintsDecodeErrorZ_OK extends Result_PaymentConstraintsDecodeErrorZ {
		public final PaymentConstraints res;
		private Result_PaymentConstraintsDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_PaymentConstraintsDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.PaymentConstraints res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.PaymentConstraints(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PaymentConstraintsDecodeErrorZ_Err extends Result_PaymentConstraintsDecodeErrorZ {
		public final DecodeError err;
		private Result_PaymentConstraintsDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PaymentConstraintsDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentConstraintsDecodeErrorZ in the success state.
	 */
	public static Result_PaymentConstraintsDecodeErrorZ ok(org.ldk.structs.PaymentConstraints o) {
		long ret = bindings.CResult_PaymentConstraintsDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentConstraintsDecodeErrorZ ret_hu_conv = Result_PaymentConstraintsDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentConstraintsDecodeErrorZ in the error state.
	 */
	public static Result_PaymentConstraintsDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_PaymentConstraintsDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentConstraintsDecodeErrorZ ret_hu_conv = Result_PaymentConstraintsDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentConstraintsDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PaymentConstraintsDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentConstraintsDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentConstraintsDecodeErrorZ clone() {
		long ret = bindings.CResult_PaymentConstraintsDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentConstraintsDecodeErrorZ ret_hu_conv = Result_PaymentConstraintsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
