package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ extends CommonBase {
	private Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_free(ptr); } super.finalize();
	}

	static Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_is_ok(ptr)) {
			return new Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_OK extends Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ {
		public final TwoTuple_BlindedPayInfoBlindedPathZ[] res;
		private Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long[] res = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_get_ok(ptr);
			int res_conv_37_len = res.length;
			TwoTuple_BlindedPayInfoBlindedPathZ[] res_conv_37_arr = new TwoTuple_BlindedPayInfoBlindedPathZ[res_conv_37_len];
			for (int l = 0; l < res_conv_37_len; l++) {
				long res_conv_37 = res[l];
				TwoTuple_BlindedPayInfoBlindedPathZ res_conv_37_hu_conv = new TwoTuple_BlindedPayInfoBlindedPathZ(null, res_conv_37);
				if (res_conv_37_hu_conv != null) { res_conv_37_hu_conv.ptrs_to.add(this); };
				res_conv_37_arr[l] = res_conv_37_hu_conv;
			}
			this.res = res_conv_37_arr;
		}
	}

	public static final class Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_Err extends Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ {
		private Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ in the success state.
	 */
	public static Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ok(TwoTuple_BlindedPayInfoBlindedPathZ[] o) {
		long ret = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_ok(o != null ? Arrays.stream(o).mapToLong(o_conv_37 -> o_conv_37 != null ? o_conv_37.ptr : 0).toArray() : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ret_hu_conv = Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ in the error state.
	 */
	public static Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ err() {
		long ret = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ret_hu_conv = Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ clone() {
		long ret = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ret_hu_conv = Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
