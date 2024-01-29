package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CVec_BlindedPathZNoneZ extends CommonBase {
	private Result_CVec_BlindedPathZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_BlindedPathZNoneZ_free(ptr); } super.finalize();
	}

	static Result_CVec_BlindedPathZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_BlindedPathZNoneZ_is_ok(ptr)) {
			return new Result_CVec_BlindedPathZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_BlindedPathZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_BlindedPathZNoneZ_OK extends Result_CVec_BlindedPathZNoneZ {
		public final BlindedPath[] res;
		private Result_CVec_BlindedPathZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long[] res = bindings.CResult_CVec_BlindedPathZNoneZ_get_ok(ptr);
			int res_conv_13_len = res.length;
			BlindedPath[] res_conv_13_arr = new BlindedPath[res_conv_13_len];
			for (int n = 0; n < res_conv_13_len; n++) {
				long res_conv_13 = res[n];
				org.ldk.structs.BlindedPath res_conv_13_hu_conv = null; if (res_conv_13 < 0 || res_conv_13 > 4096) { res_conv_13_hu_conv = new org.ldk.structs.BlindedPath(null, res_conv_13); }
				if (res_conv_13_hu_conv != null) { res_conv_13_hu_conv.ptrs_to.add(this); };
				res_conv_13_arr[n] = res_conv_13_hu_conv;
			}
			this.res = res_conv_13_arr;
		}
	}

	public static final class Result_CVec_BlindedPathZNoneZ_Err extends Result_CVec_BlindedPathZNoneZ {
		private Result_CVec_BlindedPathZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_BlindedPathZNoneZ in the success state.
	 */
	public static Result_CVec_BlindedPathZNoneZ ok(BlindedPath[] o) {
		long ret = bindings.CResult_CVec_BlindedPathZNoneZ_ok(o != null ? Arrays.stream(o).mapToLong(o_conv_13 -> o_conv_13 == null ? 0 : o_conv_13.ptr).toArray() : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_BlindedPathZNoneZ ret_hu_conv = Result_CVec_BlindedPathZNoneZ.constr_from_ptr(ret);
		for (BlindedPath o_conv_13: o) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o_conv_13); }; };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_BlindedPathZNoneZ in the error state.
	 */
	public static Result_CVec_BlindedPathZNoneZ err() {
		long ret = bindings.CResult_CVec_BlindedPathZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_BlindedPathZNoneZ ret_hu_conv = Result_CVec_BlindedPathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CVec_BlindedPathZNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CVec_BlindedPathZNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_BlindedPathZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_BlindedPathZNoneZ clone() {
		long ret = bindings.CResult_CVec_BlindedPathZNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_BlindedPathZNoneZ ret_hu_conv = Result_CVec_BlindedPathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
