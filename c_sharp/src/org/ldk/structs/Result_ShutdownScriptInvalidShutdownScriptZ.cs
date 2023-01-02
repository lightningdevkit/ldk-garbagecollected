using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ShutdownScriptInvalidShutdownScriptZ : CommonBase {
	Result_ShutdownScriptInvalidShutdownScriptZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ShutdownScriptInvalidShutdownScriptZ() {
		if (ptr != 0) { bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_free(ptr); }
	}

	internal static Result_ShutdownScriptInvalidShutdownScriptZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_is_ok(ptr)) {
			return new Result_ShutdownScriptInvalidShutdownScriptZ_OK(null, ptr);
		} else {
			return new Result_ShutdownScriptInvalidShutdownScriptZ_Err(null, ptr);
		}
	}
	public class Result_ShutdownScriptInvalidShutdownScriptZ_OK : Result_ShutdownScriptInvalidShutdownScriptZ {
		public readonly ShutdownScript res;
		internal Result_ShutdownScriptInvalidShutdownScriptZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_get_ok(ptr);
			org.ldk.structs.ShutdownScript res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.ShutdownScript(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_ShutdownScriptInvalidShutdownScriptZ_Err : Result_ShutdownScriptInvalidShutdownScriptZ {
		public readonly InvalidShutdownScript err;
		internal Result_ShutdownScriptInvalidShutdownScriptZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_get_err(ptr);
			org.ldk.structs.InvalidShutdownScript err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.InvalidShutdownScript(null, err); }
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ShutdownScriptInvalidShutdownScriptZ in the success state.
	 */
	public static Result_ShutdownScriptInvalidShutdownScriptZ ok(org.ldk.structs.ShutdownScript o) {
		long ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptInvalidShutdownScriptZ ret_hu_conv = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ShutdownScriptInvalidShutdownScriptZ in the error state.
	 */
	public static Result_ShutdownScriptInvalidShutdownScriptZ err(org.ldk.structs.InvalidShutdownScript e) {
		long ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_err(e == null ? 0 : e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptInvalidShutdownScriptZ ret_hu_conv = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ShutdownScriptInvalidShutdownScriptZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ShutdownScriptInvalidShutdownScriptZ clone() {
		long ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptInvalidShutdownScriptZ ret_hu_conv = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
