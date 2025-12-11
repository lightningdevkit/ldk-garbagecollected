using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_RouteStrZ : CommonBase {
	Result_RouteStrZ(object _dummy, long ptr) : base(ptr) { }
	~Result_RouteStrZ() {
		if (ptr != 0) { bindings.CResult_RouteStrZ_free(ptr); }
	}

	internal static Result_RouteStrZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RouteStrZ_is_ok(ptr)) {
			return new Result_RouteStrZ_OK(null, ptr);
		} else {
			return new Result_RouteStrZ_Err(null, ptr);
		}
	}
	public class Result_RouteStrZ_OK : Result_RouteStrZ {
		public readonly Route res;
		internal Result_RouteStrZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_RouteStrZ_get_ok(ptr);
			org.ldk.structs.Route res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Route(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_RouteStrZ_Err : Result_RouteStrZ {
		public readonly string err;
		internal Result_RouteStrZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_RouteStrZ_get_err(ptr);
			string err_conv = InternalUtils.decodeString(err);
			this.err = err_conv;
		}
	}

	/**
	 * Creates a new CResult_RouteStrZ in the success state.
	 */
	public static org.ldk.structs.Result_RouteStrZ ok(org.ldk.structs.Route o) {
		long ret = bindings.CResult_RouteStrZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteStrZ ret_hu_conv = Result_RouteStrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RouteStrZ in the error state.
	 */
	public static org.ldk.structs.Result_RouteStrZ err(string e) {
		long ret = bindings.CResult_RouteStrZ_err(InternalUtils.encodeString(e));
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteStrZ ret_hu_conv = Result_RouteStrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_RouteStrZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_RouteStrZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RouteStrZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_RouteStrZ clone() {
		long ret = bindings.CResult_RouteStrZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteStrZ ret_hu_conv = Result_RouteStrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
