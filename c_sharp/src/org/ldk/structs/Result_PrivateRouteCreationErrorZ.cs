using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PrivateRouteCreationErrorZ : CommonBase {
	Result_PrivateRouteCreationErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PrivateRouteCreationErrorZ() {
		if (ptr != 0) { bindings.CResult_PrivateRouteCreationErrorZ_free(ptr); }
	}

	internal static Result_PrivateRouteCreationErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PrivateRouteCreationErrorZ_is_ok(ptr)) {
			return new Result_PrivateRouteCreationErrorZ_OK(null, ptr);
		} else {
			return new Result_PrivateRouteCreationErrorZ_Err(null, ptr);
		}
	}
	public class Result_PrivateRouteCreationErrorZ_OK : Result_PrivateRouteCreationErrorZ {
		public readonly PrivateRoute res;
		internal Result_PrivateRouteCreationErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_PrivateRouteCreationErrorZ_get_ok(ptr);
			org.ldk.structs.PrivateRoute res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.PrivateRoute(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_PrivateRouteCreationErrorZ_Err : Result_PrivateRouteCreationErrorZ {
		public readonly CreationError err;
		internal Result_PrivateRouteCreationErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_PrivateRouteCreationErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PrivateRouteCreationErrorZ in the success state.
	 */
	public static Result_PrivateRouteCreationErrorZ ok(org.ldk.structs.PrivateRoute o) {
		long ret = bindings.CResult_PrivateRouteCreationErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PrivateRouteCreationErrorZ ret_hu_conv = Result_PrivateRouteCreationErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PrivateRouteCreationErrorZ in the error state.
	 */
	public static Result_PrivateRouteCreationErrorZ err(CreationError e) {
		long ret = bindings.CResult_PrivateRouteCreationErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PrivateRouteCreationErrorZ ret_hu_conv = Result_PrivateRouteCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PrivateRouteCreationErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PrivateRouteCreationErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PrivateRouteCreationErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PrivateRouteCreationErrorZ clone() {
		long ret = bindings.CResult_PrivateRouteCreationErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PrivateRouteCreationErrorZ ret_hu_conv = Result_PrivateRouteCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
