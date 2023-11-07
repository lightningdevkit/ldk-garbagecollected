using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CVec_u8ZNoneZ : CommonBase {
	Result_CVec_u8ZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CVec_u8ZNoneZ() {
		if (ptr != 0) { bindings.CResult_CVec_u8ZNoneZ_free(ptr); }
	}

	internal static Result_CVec_u8ZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_u8ZNoneZ_is_ok(ptr)) {
			return new Result_CVec_u8ZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_u8ZNoneZ_Err(null, ptr);
		}
	}
	public class Result_CVec_u8ZNoneZ_OK : Result_CVec_u8ZNoneZ {
		public readonly byte[] res;
		internal Result_CVec_u8ZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CVec_u8ZNoneZ_get_ok(ptr);
			byte[] res_conv = InternalUtils.decodeUint8Array(res);
			this.res = res_conv;
		}
	}

	public class Result_CVec_u8ZNoneZ_Err : Result_CVec_u8ZNoneZ {
		internal Result_CVec_u8ZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_CVec_u8ZNoneZ in the success state.
	 */
	public static Result_CVec_u8ZNoneZ ok(byte[] o) {
		long ret = bindings.CResult_CVec_u8ZNoneZ_ok(InternalUtils.encodeUint8Array(o));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_u8ZNoneZ in the error state.
	 */
	public static Result_CVec_u8ZNoneZ err() {
		long ret = bindings.CResult_CVec_u8ZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CVec_u8ZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CVec_u8ZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_u8ZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_u8ZNoneZ clone() {
		long ret = bindings.CResult_CVec_u8ZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
