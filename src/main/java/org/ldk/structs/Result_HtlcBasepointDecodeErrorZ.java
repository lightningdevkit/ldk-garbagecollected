package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_HtlcBasepointDecodeErrorZ extends CommonBase {
	private Result_HtlcBasepointDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_HtlcBasepointDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_HtlcBasepointDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_HtlcBasepointDecodeErrorZ_is_ok(ptr)) {
			return new Result_HtlcBasepointDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_HtlcBasepointDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_HtlcBasepointDecodeErrorZ_OK extends Result_HtlcBasepointDecodeErrorZ {
		public final HtlcBasepoint res;
		private Result_HtlcBasepointDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_HtlcBasepointDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.HtlcBasepoint res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.HtlcBasepoint(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_HtlcBasepointDecodeErrorZ_Err extends Result_HtlcBasepointDecodeErrorZ {
		public final DecodeError err;
		private Result_HtlcBasepointDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_HtlcBasepointDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_HtlcBasepointDecodeErrorZ in the success state.
	 */
	public static Result_HtlcBasepointDecodeErrorZ ok(org.ldk.structs.HtlcBasepoint o) {
		long ret = bindings.CResult_HtlcBasepointDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HtlcBasepointDecodeErrorZ ret_hu_conv = Result_HtlcBasepointDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_HtlcBasepointDecodeErrorZ in the error state.
	 */
	public static Result_HtlcBasepointDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_HtlcBasepointDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HtlcBasepointDecodeErrorZ ret_hu_conv = Result_HtlcBasepointDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_HtlcBasepointDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_HtlcBasepointDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_HtlcBasepointDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_HtlcBasepointDecodeErrorZ clone() {
		long ret = bindings.CResult_HtlcBasepointDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HtlcBasepointDecodeErrorZ ret_hu_conv = Result_HtlcBasepointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
