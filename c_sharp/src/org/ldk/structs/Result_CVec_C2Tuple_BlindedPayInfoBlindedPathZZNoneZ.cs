using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ : CommonBase {
	Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ() {
		if (ptr != 0) { bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_free(ptr); }
	}

	internal static Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_is_ok(ptr)) {
			return new Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_Err(null, ptr);
		}
	}
	public class Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_OK : Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ {
		public readonly TwoTuple_BlindedPayInfoBlindedPathZ[] res;
		internal Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_get_ok(ptr);
			int res_conv_37_len = InternalUtils.getArrayLength(res);
			TwoTuple_BlindedPayInfoBlindedPathZ[] res_conv_37_arr = new TwoTuple_BlindedPayInfoBlindedPathZ[res_conv_37_len];
			for (int l = 0; l < res_conv_37_len; l++) {
				long res_conv_37 = InternalUtils.getU64ArrayElem(res, l);
				TwoTuple_BlindedPayInfoBlindedPathZ res_conv_37_hu_conv = new TwoTuple_BlindedPayInfoBlindedPathZ(null, res_conv_37);
				if (res_conv_37_hu_conv != null) { res_conv_37_hu_conv.ptrs_to.AddLast(this); };
				res_conv_37_arr[l] = res_conv_37_hu_conv;
			}
			bindings.free_buffer(res);
			this.res = res_conv_37_arr;
		}
	}

	public class Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_Err : Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ {
		internal Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ in the success state.
	 */
	public static Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ok(TwoTuple_BlindedPayInfoBlindedPathZ[] o) {
		long ret = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_ok(InternalUtils.encodeUint64Array(InternalUtils.mapArray(o, o_conv_37 => o_conv_37 != null ? o_conv_37.ptr : 0)));
		GC.KeepAlive(o);
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
	public bool is_ok() {
		bool ret = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ clone() {
		long ret = bindings.CResult_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ ret_hu_conv = Result_CVec_C2Tuple_BlindedPayInfoBlindedPathZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
