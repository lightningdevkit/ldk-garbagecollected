using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_RouteParametersConfigDecodeErrorZ : CommonBase {
	Result_RouteParametersConfigDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_RouteParametersConfigDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_RouteParametersConfigDecodeErrorZ_free(ptr); }
	}

	internal static Result_RouteParametersConfigDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RouteParametersConfigDecodeErrorZ_is_ok(ptr)) {
			return new Result_RouteParametersConfigDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteParametersConfigDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_RouteParametersConfigDecodeErrorZ_OK : Result_RouteParametersConfigDecodeErrorZ {
		public readonly RouteParametersConfig res;
		internal Result_RouteParametersConfigDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_RouteParametersConfigDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.RouteParametersConfig res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.RouteParametersConfig(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_RouteParametersConfigDecodeErrorZ_Err : Result_RouteParametersConfigDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_RouteParametersConfigDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_RouteParametersConfigDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_RouteParametersConfigDecodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_RouteParametersConfigDecodeErrorZ ok(org.ldk.structs.RouteParametersConfig o) {
		long ret = bindings.CResult_RouteParametersConfigDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersConfigDecodeErrorZ ret_hu_conv = Result_RouteParametersConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RouteParametersConfigDecodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_RouteParametersConfigDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_RouteParametersConfigDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersConfigDecodeErrorZ ret_hu_conv = Result_RouteParametersConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_RouteParametersConfigDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_RouteParametersConfigDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RouteParametersConfigDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_RouteParametersConfigDecodeErrorZ clone() {
		long ret = bindings.CResult_RouteParametersConfigDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteParametersConfigDecodeErrorZ ret_hu_conv = Result_RouteParametersConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
