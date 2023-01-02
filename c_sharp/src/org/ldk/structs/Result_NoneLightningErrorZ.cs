using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NoneLightningErrorZ : CommonBase {
	Result_NoneLightningErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NoneLightningErrorZ() {
		if (ptr != 0) { bindings.CResult_NoneLightningErrorZ_free(ptr); }
	}

	internal static Result_NoneLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneLightningErrorZ_is_ok(ptr)) {
			return new Result_NoneLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneLightningErrorZ_Err(null, ptr);
		}
	}
	public class Result_NoneLightningErrorZ_OK : Result_NoneLightningErrorZ {
		internal Result_NoneLightningErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	public class Result_NoneLightningErrorZ_Err : Result_NoneLightningErrorZ {
		public readonly LightningError err;
		internal Result_NoneLightningErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_NoneLightningErrorZ_get_err(ptr);
			org.ldk.structs.LightningError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.LightningError(null, err); }
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NoneLightningErrorZ in the success state.
	 */
	public static Result_NoneLightningErrorZ ok() {
		long ret = bindings.CResult_NoneLightningErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneLightningErrorZ in the error state.
	 */
	public static Result_NoneLightningErrorZ err(org.ldk.structs.LightningError e) {
		long ret = bindings.CResult_NoneLightningErrorZ_err(e == null ? 0 : e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NoneLightningErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_NoneLightningErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneLightningErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneLightningErrorZ clone() {
		long ret = bindings.CResult_NoneLightningErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
