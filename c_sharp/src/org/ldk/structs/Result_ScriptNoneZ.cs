using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ScriptNoneZ : CommonBase {
	Result_ScriptNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ScriptNoneZ() {
		if (ptr != 0) { bindings.CResult_ScriptNoneZ_free(ptr); }
	}

	internal static Result_ScriptNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ScriptNoneZ_is_ok(ptr)) {
			return new Result_ScriptNoneZ_OK(null, ptr);
		} else {
			return new Result_ScriptNoneZ_Err(null, ptr);
		}
	}
	public class Result_ScriptNoneZ_OK : Result_ScriptNoneZ {
		public readonly byte[] res;
		internal Result_ScriptNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_ScriptNoneZ_get_ok(ptr);
		}
	}

	public class Result_ScriptNoneZ_Err : Result_ScriptNoneZ {
		internal Result_ScriptNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_ScriptNoneZ in the success state.
	 */
	public static Result_ScriptNoneZ ok(byte[] o) {
		long ret = bindings.CResult_ScriptNoneZ_ok(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScriptNoneZ ret_hu_conv = Result_ScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ScriptNoneZ in the error state.
	 */
	public static Result_ScriptNoneZ err() {
		long ret = bindings.CResult_ScriptNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScriptNoneZ ret_hu_conv = Result_ScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ScriptNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ScriptNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ScriptNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ScriptNoneZ clone() {
		long ret = bindings.CResult_ScriptNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScriptNoneZ ret_hu_conv = Result_ScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
