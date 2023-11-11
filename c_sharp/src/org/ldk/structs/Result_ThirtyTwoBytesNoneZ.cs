using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ThirtyTwoBytesNoneZ : CommonBase {
	Result_ThirtyTwoBytesNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ThirtyTwoBytesNoneZ() {
		if (ptr != 0) { bindings.CResult_ThirtyTwoBytesNoneZ_free(ptr); }
	}

	internal static Result_ThirtyTwoBytesNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ThirtyTwoBytesNoneZ_is_ok(ptr)) {
			return new Result_ThirtyTwoBytesNoneZ_OK(null, ptr);
		} else {
			return new Result_ThirtyTwoBytesNoneZ_Err(null, ptr);
		}
	}
	public class Result_ThirtyTwoBytesNoneZ_OK : Result_ThirtyTwoBytesNoneZ {
		public readonly byte[] res;
		internal Result_ThirtyTwoBytesNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_ThirtyTwoBytesNoneZ_get_ok(ptr);
			byte[] res_conv = InternalUtils.decodeUint8Array(res);
			this.res = res_conv;
		}
	}

	public class Result_ThirtyTwoBytesNoneZ_Err : Result_ThirtyTwoBytesNoneZ {
		internal Result_ThirtyTwoBytesNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesNoneZ in the success state.
	 */
	public static Result_ThirtyTwoBytesNoneZ ok(byte[] o) {
		long ret = bindings.CResult_ThirtyTwoBytesNoneZ_ok(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(o, 32)));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesNoneZ in the error state.
	 */
	public static Result_ThirtyTwoBytesNoneZ err() {
		long ret = bindings.CResult_ThirtyTwoBytesNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ThirtyTwoBytesNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ThirtyTwoBytesNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ThirtyTwoBytesNoneZ clone() {
		long ret = bindings.CResult_ThirtyTwoBytesNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
