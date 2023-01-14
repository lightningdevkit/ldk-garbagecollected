using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CVec_SignatureZNoneZ : CommonBase {
	Result_CVec_SignatureZNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CVec_SignatureZNoneZ() {
		if (ptr != 0) { bindings.CResult_CVec_SignatureZNoneZ_free(ptr); }
	}

	internal static Result_CVec_SignatureZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_SignatureZNoneZ_is_ok(ptr)) {
			return new Result_CVec_SignatureZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_SignatureZNoneZ_Err(null, ptr);
		}
	}
	public class Result_CVec_SignatureZNoneZ_OK : Result_CVec_SignatureZNoneZ {
		public readonly byte[][] res;
		internal Result_CVec_SignatureZNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_CVec_SignatureZNoneZ_get_ok(ptr);
		}
	}

	public class Result_CVec_SignatureZNoneZ_Err : Result_CVec_SignatureZNoneZ {
		internal Result_CVec_SignatureZNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_CVec_SignatureZNoneZ in the success state.
	 */
	public static Result_CVec_SignatureZNoneZ ok(byte[][] o) {
		long ret = bindings.CResult_CVec_SignatureZNoneZ_ok(o != null ? InternalUtils.mapArray(o, o_conv_8 => InternalUtils.check_arr_len(o_conv_8, 64)) : null);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_SignatureZNoneZ in the error state.
	 */
	public static Result_CVec_SignatureZNoneZ err() {
		long ret = bindings.CResult_CVec_SignatureZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CVec_SignatureZNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CVec_SignatureZNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_SignatureZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_SignatureZNoneZ clone() {
		long ret = bindings.CResult_CVec_SignatureZNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
