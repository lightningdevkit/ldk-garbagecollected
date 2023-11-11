using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CVec_CVec_u8ZZNoneZ : CommonBase {
	Result_CVec_CVec_u8ZZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CVec_CVec_u8ZZNoneZ() {
		if (ptr != 0) { bindings.CResult_CVec_CVec_u8ZZNoneZ_free(ptr); }
	}

	internal static Result_CVec_CVec_u8ZZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_CVec_u8ZZNoneZ_is_ok(ptr)) {
			return new Result_CVec_CVec_u8ZZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_CVec_u8ZZNoneZ_Err(null, ptr);
		}
	}
	public class Result_CVec_CVec_u8ZZNoneZ_OK : Result_CVec_CVec_u8ZZNoneZ {
		public readonly byte[][] res;
		internal Result_CVec_CVec_u8ZZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CVec_CVec_u8ZZNoneZ_get_ok(ptr);
			int res_conv_8_len = InternalUtils.getArrayLength(res);
			byte[][] res_conv_8_arr = new byte[res_conv_8_len][];
			for (int i = 0; i < res_conv_8_len; i++) {
				long res_conv_8 = InternalUtils.getU64ArrayElem(res, i);
				byte[] res_conv_8_conv = InternalUtils.decodeUint8Array(res_conv_8);
				res_conv_8_arr[i] = res_conv_8_conv;
			}
			bindings.free_buffer(res);
			this.res = res_conv_8_arr;
		}
	}

	public class Result_CVec_CVec_u8ZZNoneZ_Err : Result_CVec_CVec_u8ZZNoneZ {
		internal Result_CVec_CVec_u8ZZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_CVec_CVec_u8ZZNoneZ in the success state.
	 */
	public static Result_CVec_CVec_u8ZZNoneZ ok(byte[][] o) {
		long ret = bindings.CResult_CVec_CVec_u8ZZNoneZ_ok(InternalUtils.encodeUint64Array(InternalUtils.mapArray(o, o_conv_8 => InternalUtils.encodeUint8Array(o_conv_8))));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_CVec_u8ZZNoneZ in the error state.
	 */
	public static Result_CVec_CVec_u8ZZNoneZ err() {
		long ret = bindings.CResult_CVec_CVec_u8ZZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CVec_CVec_u8ZZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CVec_CVec_u8ZZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_CVec_u8ZZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_CVec_u8ZZNoneZ clone() {
		long ret = bindings.CResult_CVec_CVec_u8ZZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
