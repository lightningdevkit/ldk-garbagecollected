using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_HTLCUpdateDecodeErrorZ : CommonBase {
	Result_HTLCUpdateDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_HTLCUpdateDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_HTLCUpdateDecodeErrorZ_free(ptr); }
	}

	internal static Result_HTLCUpdateDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_HTLCUpdateDecodeErrorZ_is_ok(ptr)) {
			return new Result_HTLCUpdateDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_HTLCUpdateDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_HTLCUpdateDecodeErrorZ_OK : Result_HTLCUpdateDecodeErrorZ {
		public readonly HTLCUpdate res;
		internal Result_HTLCUpdateDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_HTLCUpdateDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.HTLCUpdate res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.HTLCUpdate(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_HTLCUpdateDecodeErrorZ_Err : Result_HTLCUpdateDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_HTLCUpdateDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_HTLCUpdateDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_HTLCUpdateDecodeErrorZ in the success state.
	 */
	public static Result_HTLCUpdateDecodeErrorZ ok(org.ldk.structs.HTLCUpdate o) {
		long ret = bindings.CResult_HTLCUpdateDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCUpdateDecodeErrorZ ret_hu_conv = Result_HTLCUpdateDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_HTLCUpdateDecodeErrorZ in the error state.
	 */
	public static Result_HTLCUpdateDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_HTLCUpdateDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCUpdateDecodeErrorZ ret_hu_conv = Result_HTLCUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_HTLCUpdateDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_HTLCUpdateDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_HTLCUpdateDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_HTLCUpdateDecodeErrorZ clone() {
		long ret = bindings.CResult_HTLCUpdateDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_HTLCUpdateDecodeErrorZ ret_hu_conv = Result_HTLCUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
