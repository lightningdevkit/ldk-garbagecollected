using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_WarningMessageDecodeErrorZ : CommonBase {
	Result_WarningMessageDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_WarningMessageDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_WarningMessageDecodeErrorZ_free(ptr); }
	}

	internal static Result_WarningMessageDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_WarningMessageDecodeErrorZ_is_ok(ptr)) {
			return new Result_WarningMessageDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_WarningMessageDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_WarningMessageDecodeErrorZ_OK : Result_WarningMessageDecodeErrorZ {
		public readonly WarningMessage res;
		internal Result_WarningMessageDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_WarningMessageDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.WarningMessage res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.WarningMessage(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_WarningMessageDecodeErrorZ_Err : Result_WarningMessageDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_WarningMessageDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_WarningMessageDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_WarningMessageDecodeErrorZ in the success state.
	 */
	public static Result_WarningMessageDecodeErrorZ ok(org.ldk.structs.WarningMessage o) {
		long ret = bindings.CResult_WarningMessageDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WarningMessageDecodeErrorZ ret_hu_conv = Result_WarningMessageDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_WarningMessageDecodeErrorZ in the error state.
	 */
	public static Result_WarningMessageDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_WarningMessageDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WarningMessageDecodeErrorZ ret_hu_conv = Result_WarningMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_WarningMessageDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_WarningMessageDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_WarningMessageDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_WarningMessageDecodeErrorZ clone() {
		long ret = bindings.CResult_WarningMessageDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WarningMessageDecodeErrorZ ret_hu_conv = Result_WarningMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
