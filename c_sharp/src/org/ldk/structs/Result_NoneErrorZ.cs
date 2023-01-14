using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NoneErrorZ : CommonBase {
	Result_NoneErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NoneErrorZ() {
		if (ptr != 0) { bindings.CResult_NoneErrorZ_free(ptr); }
	}

	internal static Result_NoneErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneErrorZ_is_ok(ptr)) {
			return new Result_NoneErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneErrorZ_Err(null, ptr);
		}
	}
	public class Result_NoneErrorZ_OK : Result_NoneErrorZ {
		internal Result_NoneErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	public class Result_NoneErrorZ_Err : Result_NoneErrorZ {
		public readonly IOError err;
		internal Result_NoneErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_NoneErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_NoneErrorZ in the success state.
	 */
	public static Result_NoneErrorZ ok() {
		long ret = bindings.CResult_NoneErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneErrorZ in the error state.
	 */
	public static Result_NoneErrorZ err(IOError e) {
		long ret = bindings.CResult_NoneErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NoneErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_NoneErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneErrorZ clone() {
		long ret = bindings.CResult_NoneErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
