using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NoneSemanticErrorZ : CommonBase {
	Result_NoneSemanticErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NoneSemanticErrorZ() {
		if (ptr != 0) { bindings.CResult_NoneSemanticErrorZ_free(ptr); }
	}

	internal static Result_NoneSemanticErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneSemanticErrorZ_is_ok(ptr)) {
			return new Result_NoneSemanticErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneSemanticErrorZ_Err(null, ptr);
		}
	}
	public class Result_NoneSemanticErrorZ_OK : Result_NoneSemanticErrorZ {
		internal Result_NoneSemanticErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	public class Result_NoneSemanticErrorZ_Err : Result_NoneSemanticErrorZ {
		public readonly SemanticError err;
		internal Result_NoneSemanticErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_NoneSemanticErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_NoneSemanticErrorZ in the success state.
	 */
	public static Result_NoneSemanticErrorZ ok() {
		long ret = bindings.CResult_NoneSemanticErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSemanticErrorZ ret_hu_conv = Result_NoneSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneSemanticErrorZ in the error state.
	 */
	public static Result_NoneSemanticErrorZ err(SemanticError e) {
		long ret = bindings.CResult_NoneSemanticErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSemanticErrorZ ret_hu_conv = Result_NoneSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NoneSemanticErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_NoneSemanticErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneSemanticErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneSemanticErrorZ clone() {
		long ret = bindings.CResult_NoneSemanticErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSemanticErrorZ ret_hu_conv = Result_NoneSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
