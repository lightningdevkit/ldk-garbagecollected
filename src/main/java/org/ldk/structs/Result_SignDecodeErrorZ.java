package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SignDecodeErrorZ extends CommonBase {
	private Result_SignDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SignDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_SignDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SignDecodeErrorZ_is_ok(ptr)) {
			return new Result_SignDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_SignDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SignDecodeErrorZ_OK extends Result_SignDecodeErrorZ {
		public final Sign res;
		private Result_SignDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_SignDecodeErrorZ_get_ok(ptr);
			Sign ret_hu_conv = new Sign(null, res);
			ret_hu_conv.ptrs_to.add(this);
			this.res = ret_hu_conv;
		}
	}

	public static final class Result_SignDecodeErrorZ_Err extends Result_SignDecodeErrorZ {
		public final DecodeError err;
		private Result_SignDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_SignDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SignDecodeErrorZ in the success state.
	 */
	public static Result_SignDecodeErrorZ ok(Sign o) {
		long ret = bindings.CResult_SignDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SignDecodeErrorZ in the error state.
	 */
	public static Result_SignDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_SignDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SignDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SignDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SignDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SignDecodeErrorZ clone() {
		long ret = bindings.CResult_SignDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
