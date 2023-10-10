using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_RouteHintHopDecodeErrorZ : CommonBase {
	Result_RouteHintHopDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_RouteHintHopDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_RouteHintHopDecodeErrorZ_free(ptr); }
	}

	internal static Result_RouteHintHopDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RouteHintHopDecodeErrorZ_is_ok(ptr)) {
			return new Result_RouteHintHopDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteHintHopDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_RouteHintHopDecodeErrorZ_OK : Result_RouteHintHopDecodeErrorZ {
		public readonly RouteHintHop res;
		internal Result_RouteHintHopDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_RouteHintHopDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.RouteHintHop res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.RouteHintHop(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_RouteHintHopDecodeErrorZ_Err : Result_RouteHintHopDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_RouteHintHopDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_RouteHintHopDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_RouteHintHopDecodeErrorZ in the success state.
	 */
	public static Result_RouteHintHopDecodeErrorZ ok(org.ldk.structs.RouteHintHop o) {
		long ret = bindings.CResult_RouteHintHopDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHintHopDecodeErrorZ ret_hu_conv = Result_RouteHintHopDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RouteHintHopDecodeErrorZ in the error state.
	 */
	public static Result_RouteHintHopDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_RouteHintHopDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHintHopDecodeErrorZ ret_hu_conv = Result_RouteHintHopDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_RouteHintHopDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_RouteHintHopDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RouteHintHopDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RouteHintHopDecodeErrorZ clone() {
		long ret = bindings.CResult_RouteHintHopDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteHintHopDecodeErrorZ ret_hu_conv = Result_RouteHintHopDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
