using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_SignDecodeErrorZ : CommonBase {
	Result_SignDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_SignDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_SignDecodeErrorZ_free(ptr); }
	}

	internal static Result_SignDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SignDecodeErrorZ_is_ok(ptr)) {
			return new Result_SignDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_SignDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_SignDecodeErrorZ_OK : Result_SignDecodeErrorZ {
		public readonly Sign res;
		internal Result_SignDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_SignDecodeErrorZ_get_ok(ptr);
			Sign ret_hu_conv = new Sign(null, res);
			if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
			this.res = ret_hu_conv;
		}
	}

	public class Result_SignDecodeErrorZ_Err : Result_SignDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_SignDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_SignDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SignDecodeErrorZ in the success state.
	 */
	public static Result_SignDecodeErrorZ ok(org.ldk.structs.Sign o) {
		long ret = bindings.CResult_SignDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SignDecodeErrorZ in the error state.
	 */
	public static Result_SignDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_SignDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_SignDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_SignDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SignDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SignDecodeErrorZ clone() {
		long ret = bindings.CResult_SignDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignDecodeErrorZ ret_hu_conv = Result_SignDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
