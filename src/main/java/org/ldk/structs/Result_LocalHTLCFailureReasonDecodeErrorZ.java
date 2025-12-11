package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_LocalHTLCFailureReasonDecodeErrorZ extends CommonBase {
	private Result_LocalHTLCFailureReasonDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_free(ptr); ptr = 0; }
	}

	static Result_LocalHTLCFailureReasonDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_is_ok(ptr)) {
			return new Result_LocalHTLCFailureReasonDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_LocalHTLCFailureReasonDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_LocalHTLCFailureReasonDecodeErrorZ_OK extends Result_LocalHTLCFailureReasonDecodeErrorZ {
		public final LocalHTLCFailureReason res;
		private Result_LocalHTLCFailureReasonDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.LocalHTLCFailureReason res_hu_conv = org.ldk.structs.LocalHTLCFailureReason.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_LocalHTLCFailureReasonDecodeErrorZ_Err extends Result_LocalHTLCFailureReasonDecodeErrorZ {
		public final DecodeError err;
		private Result_LocalHTLCFailureReasonDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_LocalHTLCFailureReasonDecodeErrorZ in the success state.
	 */
	public static Result_LocalHTLCFailureReasonDecodeErrorZ ok(org.ldk.structs.LocalHTLCFailureReason o) {
		long ret = bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_LocalHTLCFailureReasonDecodeErrorZ ret_hu_conv = Result_LocalHTLCFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_LocalHTLCFailureReasonDecodeErrorZ in the error state.
	 */
	public static Result_LocalHTLCFailureReasonDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_LocalHTLCFailureReasonDecodeErrorZ ret_hu_conv = Result_LocalHTLCFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_LocalHTLCFailureReasonDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_LocalHTLCFailureReasonDecodeErrorZ clone() {
		long ret = bindings.CResult_LocalHTLCFailureReasonDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_LocalHTLCFailureReasonDecodeErrorZ ret_hu_conv = Result_LocalHTLCFailureReasonDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
