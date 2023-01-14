using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_RouteLightningErrorZ : CommonBase {
	Result_RouteLightningErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_RouteLightningErrorZ() {
		if (ptr != 0) { bindings.CResult_RouteLightningErrorZ_free(ptr); }
	}

	internal static Result_RouteLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RouteLightningErrorZ_is_ok(ptr)) {
			return new Result_RouteLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteLightningErrorZ_Err(null, ptr);
		}
	}
	public class Result_RouteLightningErrorZ_OK : Result_RouteLightningErrorZ {
		public readonly Route res;
		internal Result_RouteLightningErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_RouteLightningErrorZ_get_ok(ptr);
			org.ldk.structs.Route res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Route(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_RouteLightningErrorZ_Err : Result_RouteLightningErrorZ {
		public readonly LightningError err;
		internal Result_RouteLightningErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_RouteLightningErrorZ_get_err(ptr);
			org.ldk.structs.LightningError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.LightningError(null, err); }
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_RouteLightningErrorZ in the success state.
	 */
	public static Result_RouteLightningErrorZ ok(org.ldk.structs.Route o) {
		long ret = bindings.CResult_RouteLightningErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RouteLightningErrorZ in the error state.
	 */
	public static Result_RouteLightningErrorZ err(org.ldk.structs.LightningError e) {
		long ret = bindings.CResult_RouteLightningErrorZ_err(e == null ? 0 : e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_RouteLightningErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_RouteLightningErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RouteLightningErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RouteLightningErrorZ clone() {
		long ret = bindings.CResult_RouteLightningErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RouteLightningErrorZ ret_hu_conv = Result_RouteLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
