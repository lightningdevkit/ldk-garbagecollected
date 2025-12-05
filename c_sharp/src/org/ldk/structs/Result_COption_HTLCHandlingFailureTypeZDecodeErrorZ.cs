using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ : CommonBase {
	Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ_free(ptr); }
	}

	internal static Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ_is_ok(ptr)) {
			return new Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ_OK : Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ {
		public readonly Option_HTLCHandlingFailureTypeZ res;
		internal Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.Option_HTLCHandlingFailureTypeZ res_hu_conv = org.ldk.structs.Option_HTLCHandlingFailureTypeZ.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ_Err : Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ ok(org.ldk.structs.Option_HTLCHandlingFailureTypeZ o) {
		long ret = bindings.CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ ret_hu_conv = Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ ret_hu_conv = Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ clone() {
		long ret = bindings.CResult_COption_HTLCHandlingFailureTypeZDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ ret_hu_conv = Result_COption_HTLCHandlingFailureTypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
