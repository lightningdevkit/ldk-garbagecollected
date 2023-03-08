package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_OnionMessageDecodeErrorZ extends CommonBase {
	private Result_OnionMessageDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_OnionMessageDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_OnionMessageDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_OnionMessageDecodeErrorZ_is_ok(ptr)) {
			return new Result_OnionMessageDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_OnionMessageDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_OnionMessageDecodeErrorZ_OK extends Result_OnionMessageDecodeErrorZ {
		public final OnionMessage res;
		private Result_OnionMessageDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_OnionMessageDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.OnionMessage res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.OnionMessage(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_OnionMessageDecodeErrorZ_Err extends Result_OnionMessageDecodeErrorZ {
		public final DecodeError err;
		private Result_OnionMessageDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_OnionMessageDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_OnionMessageDecodeErrorZ in the success state.
	 */
	public static Result_OnionMessageDecodeErrorZ ok(org.ldk.structs.OnionMessage o) {
		long ret = bindings.CResult_OnionMessageDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessageDecodeErrorZ ret_hu_conv = Result_OnionMessageDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OnionMessageDecodeErrorZ in the error state.
	 */
	public static Result_OnionMessageDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_OnionMessageDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessageDecodeErrorZ ret_hu_conv = Result_OnionMessageDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_OnionMessageDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_OnionMessageDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_OnionMessageDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_OnionMessageDecodeErrorZ clone() {
		long ret = bindings.CResult_OnionMessageDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessageDecodeErrorZ ret_hu_conv = Result_OnionMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
