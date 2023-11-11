using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NoneIOErrorZ : CommonBase {
	Result_NoneIOErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NoneIOErrorZ() {
		if (ptr != 0) { bindings.CResult_NoneIOErrorZ_free(ptr); }
	}

	internal static Result_NoneIOErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneIOErrorZ_is_ok(ptr)) {
			return new Result_NoneIOErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneIOErrorZ_Err(null, ptr);
		}
	}
	public class Result_NoneIOErrorZ_OK : Result_NoneIOErrorZ {
		internal Result_NoneIOErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	public class Result_NoneIOErrorZ_Err : Result_NoneIOErrorZ {
		public readonly IOError err;
		internal Result_NoneIOErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_NoneIOErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_NoneIOErrorZ in the success state.
	 */
	public static Result_NoneIOErrorZ ok() {
		long ret = bindings.CResult_NoneIOErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneIOErrorZ in the error state.
	 */
	public static Result_NoneIOErrorZ err(IOError e) {
		long ret = bindings.CResult_NoneIOErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NoneIOErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_NoneIOErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneIOErrorZ clone() {
		long ret = bindings.CResult_NoneIOErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
