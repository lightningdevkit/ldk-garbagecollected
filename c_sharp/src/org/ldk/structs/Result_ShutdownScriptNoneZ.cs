using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ShutdownScriptNoneZ : CommonBase {
	Result_ShutdownScriptNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ShutdownScriptNoneZ() {
		if (ptr != 0) { bindings.CResult_ShutdownScriptNoneZ_free(ptr); }
	}

	internal static Result_ShutdownScriptNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ShutdownScriptNoneZ_is_ok(ptr)) {
			return new Result_ShutdownScriptNoneZ_OK(null, ptr);
		} else {
			return new Result_ShutdownScriptNoneZ_Err(null, ptr);
		}
	}
	public class Result_ShutdownScriptNoneZ_OK : Result_ShutdownScriptNoneZ {
		public readonly ShutdownScript res;
		internal Result_ShutdownScriptNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_ShutdownScriptNoneZ_get_ok(ptr);
			org.ldk.structs.ShutdownScript res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.ShutdownScript(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_ShutdownScriptNoneZ_Err : Result_ShutdownScriptNoneZ {
		internal Result_ShutdownScriptNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_ShutdownScriptNoneZ in the success state.
	 */
	public static Result_ShutdownScriptNoneZ ok(org.ldk.structs.ShutdownScript o) {
		long ret = bindings.CResult_ShutdownScriptNoneZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptNoneZ ret_hu_conv = Result_ShutdownScriptNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ShutdownScriptNoneZ in the error state.
	 */
	public static Result_ShutdownScriptNoneZ err() {
		long ret = bindings.CResult_ShutdownScriptNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptNoneZ ret_hu_conv = Result_ShutdownScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ShutdownScriptNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ShutdownScriptNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ShutdownScriptNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ShutdownScriptNoneZ clone() {
		long ret = bindings.CResult_ShutdownScriptNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptNoneZ ret_hu_conv = Result_ShutdownScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
