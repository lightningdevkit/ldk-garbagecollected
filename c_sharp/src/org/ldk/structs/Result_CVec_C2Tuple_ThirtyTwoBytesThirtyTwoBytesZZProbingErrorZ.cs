using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ : CommonBase {
	Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ() {
		if (ptr != 0) { bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_free(ptr); }
	}

	internal static Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_is_ok(ptr)) {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_Err(null, ptr);
		}
	}
	public class Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_OK : Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ {
		public readonly TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[] res;
		internal Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_get_ok(ptr);
			int res_conv_40_len = InternalUtils.getArrayLength(res);
			TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[] res_conv_40_arr = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[res_conv_40_len];
			for (int o = 0; o < res_conv_40_len; o++) {
				long res_conv_40 = InternalUtils.getU64ArrayElem(res, o);
				TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ res_conv_40_hu_conv = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ(null, res_conv_40);
				if (res_conv_40_hu_conv != null) { res_conv_40_hu_conv.ptrs_to.AddLast(this); };
				res_conv_40_arr[o] = res_conv_40_hu_conv;
			}
			bindings.free_buffer(res);
			this.res = res_conv_40_arr;
		}
	}

	public class Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_Err : Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ {
		public readonly ProbingError err;
		internal Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_get_err(ptr);
			org.ldk.structs.ProbingError err_hu_conv = org.ldk.structs.ProbingError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ in the success state.
	 */
	public static Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ ok(TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ[] o) {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_ok(InternalUtils.encodeUint64Array(InternalUtils.mapArray(o, o_conv_40 => o_conv_40 != null ? o_conv_40.ptr : 0)));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ in the error state.
	 */
	public static Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ err(org.ldk.structs.ProbingError e) {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ clone() {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbingErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
