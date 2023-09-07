using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_RouteHopDecodeErrorZ : CommonBase {
	Result_RouteHopDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_RouteHopDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_RouteHopDecodeErrorZ_free(ptr); }
	}

	internal static Result_RouteHopDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RouteHopDecodeErrorZ_is_ok(ptr)) {
			return new Result_RouteHopDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteHopDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_RouteHopDecodeErrorZ_OK : Result_RouteHopDecodeErrorZ {
		public readonly RouteHop res;
		internal Result_RouteHopDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_RouteHopDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.RouteHop res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.RouteHop(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_RouteHopDecodeErrorZ_Err : Result_RouteHopDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_RouteHopDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_RouteHopDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_RouteHopDecodeErrorZ in the success state.
	 */
	public static Result_RouteHopDecodeErrorZ ok(org.ldk.structs.RouteHop o) {
		long ret = bindings.CResult_RouteHopDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHopDecodeErrorZ ret_hu_conv = Result_RouteHopDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RouteHopDecodeErrorZ in the error state.
	 */
	public static Result_RouteHopDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_RouteHopDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHopDecodeErrorZ ret_hu_conv = Result_RouteHopDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_RouteHopDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_RouteHopDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RouteHopDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RouteHopDecodeErrorZ clone() {
		long ret = bindings.CResult_RouteHopDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHopDecodeErrorZ ret_hu_conv = Result_RouteHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
