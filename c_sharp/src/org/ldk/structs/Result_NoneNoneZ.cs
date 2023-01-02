using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NoneNoneZ : CommonBase {
	Result_NoneNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NoneNoneZ() {
		if (ptr != 0) { bindings.CResult_NoneNoneZ_free(ptr); }
	}

	internal static Result_NoneNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneNoneZ_is_ok(ptr)) {
			return new Result_NoneNoneZ_OK(null, ptr);
		} else {
			return new Result_NoneNoneZ_Err(null, ptr);
		}
	}
	public class Result_NoneNoneZ_OK : Result_NoneNoneZ {
		internal Result_NoneNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	public class Result_NoneNoneZ_Err : Result_NoneNoneZ {
		internal Result_NoneNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_NoneNoneZ in the success state.
	 */
	public static Result_NoneNoneZ ok() {
		long ret = bindings.CResult_NoneNoneZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneNoneZ in the error state.
	 */
	public static Result_NoneNoneZ err() {
		long ret = bindings.CResult_NoneNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NoneNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_NoneNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneNoneZ clone() {
		long ret = bindings.CResult_NoneNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
