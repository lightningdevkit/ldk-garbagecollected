using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CVec_BlindedPathZNoneZ : CommonBase {
	Result_CVec_BlindedPathZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CVec_BlindedPathZNoneZ() {
		if (ptr != 0) { bindings.CResult_CVec_BlindedPathZNoneZ_free(ptr); }
	}

	internal static Result_CVec_BlindedPathZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_BlindedPathZNoneZ_is_ok(ptr)) {
			return new Result_CVec_BlindedPathZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_BlindedPathZNoneZ_Err(null, ptr);
		}
	}
	public class Result_CVec_BlindedPathZNoneZ_OK : Result_CVec_BlindedPathZNoneZ {
		public readonly BlindedPath[] res;
		internal Result_CVec_BlindedPathZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CVec_BlindedPathZNoneZ_get_ok(ptr);
			int res_conv_13_len = InternalUtils.getArrayLength(res);
			BlindedPath[] res_conv_13_arr = new BlindedPath[res_conv_13_len];
			for (int n = 0; n < res_conv_13_len; n++) {
				long res_conv_13 = InternalUtils.getU64ArrayElem(res, n);
				org.ldk.structs.BlindedPath res_conv_13_hu_conv = null; if (res_conv_13 < 0 || res_conv_13 > 4096) { res_conv_13_hu_conv = new org.ldk.structs.BlindedPath(null, res_conv_13); }
				if (res_conv_13_hu_conv != null) { res_conv_13_hu_conv.ptrs_to.AddLast(this); };
				res_conv_13_arr[n] = res_conv_13_hu_conv;
			}
			bindings.free_buffer(res);
			this.res = res_conv_13_arr;
		}
	}

	public class Result_CVec_BlindedPathZNoneZ_Err : Result_CVec_BlindedPathZNoneZ {
		internal Result_CVec_BlindedPathZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_CVec_BlindedPathZNoneZ in the success state.
	 */
	public static Result_CVec_BlindedPathZNoneZ ok(BlindedPath[] o) {
		long ret = bindings.CResult_CVec_BlindedPathZNoneZ_ok(InternalUtils.encodeUint64Array(InternalUtils.mapArray(o, o_conv_13 => o_conv_13 == null ? 0 : o_conv_13.ptr)));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_BlindedPathZNoneZ ret_hu_conv = Result_CVec_BlindedPathZNoneZ.constr_from_ptr(ret);
		foreach (BlindedPath o_conv_13 in o) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o_conv_13); }; };
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
	public bool is_ok() {
		bool ret = bindings.CResult_CVec_BlindedPathZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CVec_BlindedPathZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_BlindedPathZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_BlindedPathZNoneZ clone() {
		long ret = bindings.CResult_CVec_BlindedPathZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_BlindedPathZNoneZ ret_hu_conv = Result_CVec_BlindedPathZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
