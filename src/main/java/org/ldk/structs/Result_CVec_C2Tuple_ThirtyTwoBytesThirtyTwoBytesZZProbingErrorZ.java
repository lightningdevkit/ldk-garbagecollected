package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ extends CommonBase {
	private Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_free(ptr); } super.finalize();
	}

	static Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_is_ok(ptr)) {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_OK extends Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ {
		public final TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[] res;
		private Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long[] res = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_get_ok(ptr);
			int res_conv_40_len = res.length;
			TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[] res_conv_40_arr = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[res_conv_40_len];
			for (int o = 0; o < res_conv_40_len; o++) {
				long res_conv_40 = res[o];
				TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ res_conv_40_hu_conv = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ(null, res_conv_40);
				if (res_conv_40_hu_conv != null) { res_conv_40_hu_conv.ptrs_to.add(this); };
				res_conv_40_arr[o] = res_conv_40_hu_conv;
			}
			this.res = res_conv_40_arr;
		}
	}

	public static final class Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_Err extends Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ {
		public final ProbingError err;
		private Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_get_err(ptr);
			org.ldk.structs.ProbingError err_hu_conv = org.ldk.structs.ProbingError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ in the success state.
	 */
	public static Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ ok(TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[] o) {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_ok(o != null ? Arrays.stream(o).mapToLong(o_conv_40 -> o_conv_40 != null ? o_conv_40.ptr : 0).toArray() : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ in the error state.
	 */
	public static Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ err(org.ldk.structs.ProbingError e) {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ clone() {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
