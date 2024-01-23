package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PendingHTLCInfoDecodeErrorZ extends CommonBase {
	private Result_PendingHTLCInfoDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PendingHTLCInfoDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PendingHTLCInfoDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PendingHTLCInfoDecodeErrorZ_is_ok(ptr)) {
			return new Result_PendingHTLCInfoDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PendingHTLCInfoDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PendingHTLCInfoDecodeErrorZ_OK extends Result_PendingHTLCInfoDecodeErrorZ {
		public final PendingHTLCInfo res;
		private Result_PendingHTLCInfoDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_PendingHTLCInfoDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.PendingHTLCInfo res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.PendingHTLCInfo(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PendingHTLCInfoDecodeErrorZ_Err extends Result_PendingHTLCInfoDecodeErrorZ {
		public final DecodeError err;
		private Result_PendingHTLCInfoDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PendingHTLCInfoDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PendingHTLCInfoDecodeErrorZ in the success state.
	 */
	public static Result_PendingHTLCInfoDecodeErrorZ ok(org.ldk.structs.PendingHTLCInfo o) {
		long ret = bindings.CResult_PendingHTLCInfoDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCInfoDecodeErrorZ ret_hu_conv = Result_PendingHTLCInfoDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PendingHTLCInfoDecodeErrorZ in the error state.
	 */
	public static Result_PendingHTLCInfoDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_PendingHTLCInfoDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCInfoDecodeErrorZ ret_hu_conv = Result_PendingHTLCInfoDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PendingHTLCInfoDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PendingHTLCInfoDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PendingHTLCInfoDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PendingHTLCInfoDecodeErrorZ clone() {
		long ret = bindings.CResult_PendingHTLCInfoDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCInfoDecodeErrorZ ret_hu_conv = Result_PendingHTLCInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
