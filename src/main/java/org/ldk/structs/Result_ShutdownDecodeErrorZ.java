package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ShutdownDecodeErrorZ extends CommonBase {
	private Result_ShutdownDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ShutdownDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ShutdownDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ShutdownDecodeErrorZ_is_ok(ptr)) {
			return new Result_ShutdownDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ShutdownDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ShutdownDecodeErrorZ_OK extends Result_ShutdownDecodeErrorZ {
		public final Shutdown res;
		private Result_ShutdownDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_ShutdownDecodeErrorZ_get_ok(ptr);
			Shutdown res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new Shutdown(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ShutdownDecodeErrorZ_Err extends Result_ShutdownDecodeErrorZ {
		public final DecodeError err;
		private Result_ShutdownDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_ShutdownDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ShutdownDecodeErrorZ in the success state.
	 */
	public static Result_ShutdownDecodeErrorZ ok(Shutdown o) {
		long ret = bindings.CResult_ShutdownDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ShutdownDecodeErrorZ in the error state.
	 */
	public static Result_ShutdownDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ShutdownDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ShutdownDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ShutdownDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ShutdownDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ShutdownDecodeErrorZ clone() {
		long ret = bindings.CResult_ShutdownDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
