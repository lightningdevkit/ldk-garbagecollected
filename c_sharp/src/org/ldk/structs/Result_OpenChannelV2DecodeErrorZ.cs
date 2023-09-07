using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_OpenChannelV2DecodeErrorZ : CommonBase {
	Result_OpenChannelV2DecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_OpenChannelV2DecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_OpenChannelV2DecodeErrorZ_free(ptr); }
	}

	internal static Result_OpenChannelV2DecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_OpenChannelV2DecodeErrorZ_is_ok(ptr)) {
			return new Result_OpenChannelV2DecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_OpenChannelV2DecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_OpenChannelV2DecodeErrorZ_OK : Result_OpenChannelV2DecodeErrorZ {
		public readonly OpenChannelV2 res;
		internal Result_OpenChannelV2DecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_OpenChannelV2DecodeErrorZ_get_ok(ptr);
			org.ldk.structs.OpenChannelV2 res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.OpenChannelV2(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_OpenChannelV2DecodeErrorZ_Err : Result_OpenChannelV2DecodeErrorZ {
		public readonly DecodeError err;
		internal Result_OpenChannelV2DecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_OpenChannelV2DecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_OpenChannelV2DecodeErrorZ in the success state.
	 */
	public static Result_OpenChannelV2DecodeErrorZ ok(org.ldk.structs.OpenChannelV2 o) {
		long ret = bindings.CResult_OpenChannelV2DecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OpenChannelV2DecodeErrorZ ret_hu_conv = Result_OpenChannelV2DecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OpenChannelV2DecodeErrorZ in the error state.
	 */
	public static Result_OpenChannelV2DecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_OpenChannelV2DecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OpenChannelV2DecodeErrorZ ret_hu_conv = Result_OpenChannelV2DecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_OpenChannelV2DecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_OpenChannelV2DecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_OpenChannelV2DecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_OpenChannelV2DecodeErrorZ clone() {
		long ret = bindings.CResult_OpenChannelV2DecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OpenChannelV2DecodeErrorZ ret_hu_conv = Result_OpenChannelV2DecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
