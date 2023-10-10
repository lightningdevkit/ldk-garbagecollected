using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PongDecodeErrorZ : CommonBase {
	Result_PongDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PongDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_PongDecodeErrorZ_free(ptr); }
	}

	internal static Result_PongDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PongDecodeErrorZ_is_ok(ptr)) {
			return new Result_PongDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PongDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_PongDecodeErrorZ_OK : Result_PongDecodeErrorZ {
		public readonly Pong res;
		internal Result_PongDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_PongDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.Pong res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Pong(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_PongDecodeErrorZ_Err : Result_PongDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_PongDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_PongDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PongDecodeErrorZ in the success state.
	 */
	public static Result_PongDecodeErrorZ ok(org.ldk.structs.Pong o) {
		long ret = bindings.CResult_PongDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PongDecodeErrorZ in the error state.
	 */
	public static Result_PongDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_PongDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PongDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PongDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PongDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PongDecodeErrorZ clone() {
		long ret = bindings.CResult_PongDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
