package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ extends CommonBase {
	private Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_free(ptr); ptr = 0; }
	}

	static Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_is_ok(ptr)) {
			return new Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_OK extends Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ {
		public final ThreeTuple_OnionPacketu64u32Z res;
		private Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_get_ok(ptr);
			ThreeTuple_OnionPacketu64u32Z res_hu_conv = new ThreeTuple_OnionPacketu64u32Z(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_Err extends Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ {
		public final APIError err;
		private Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_get_err(ptr);
			org.ldk.structs.APIError err_hu_conv = org.ldk.structs.APIError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ in the success state.
	 */
	public static Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ ok(org.ldk.structs.ThreeTuple_OnionPacketu64u32Z o) {
		long ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ ret_hu_conv = Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ in the error state.
	 */
	public static Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ err(org.ldk.structs.APIError e) {
		long ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ ret_hu_conv = Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ clone() {
		long ret = bindings.CResult_C3Tuple_OnionPacketu64u32ZAPIErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ ret_hu_conv = Result_C3Tuple_OnionPacketu64u32ZAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
