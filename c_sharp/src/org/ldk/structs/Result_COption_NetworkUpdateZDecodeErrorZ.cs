using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_COption_NetworkUpdateZDecodeErrorZ : CommonBase {
	Result_COption_NetworkUpdateZDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_COption_NetworkUpdateZDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_COption_NetworkUpdateZDecodeErrorZ_free(ptr); }
	}

	internal static Result_COption_NetworkUpdateZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_COption_NetworkUpdateZDecodeErrorZ_is_ok(ptr)) {
			return new Result_COption_NetworkUpdateZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_COption_NetworkUpdateZDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_COption_NetworkUpdateZDecodeErrorZ_OK : Result_COption_NetworkUpdateZDecodeErrorZ {
		public readonly Option_NetworkUpdateZ res;
		internal Result_COption_NetworkUpdateZDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_COption_NetworkUpdateZDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.Option_NetworkUpdateZ res_hu_conv = org.ldk.structs.Option_NetworkUpdateZ.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_COption_NetworkUpdateZDecodeErrorZ_Err : Result_COption_NetworkUpdateZDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_COption_NetworkUpdateZDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_COption_NetworkUpdateZDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_COption_NetworkUpdateZDecodeErrorZ in the success state.
	 */
	public static Result_COption_NetworkUpdateZDecodeErrorZ ok(org.ldk.structs.Option_NetworkUpdateZ o) {
		long ret = bindings.CResult_COption_NetworkUpdateZDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_NetworkUpdateZDecodeErrorZ ret_hu_conv = Result_COption_NetworkUpdateZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_COption_NetworkUpdateZDecodeErrorZ in the error state.
	 */
	public static Result_COption_NetworkUpdateZDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_COption_NetworkUpdateZDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_NetworkUpdateZDecodeErrorZ ret_hu_conv = Result_COption_NetworkUpdateZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_COption_NetworkUpdateZDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_COption_NetworkUpdateZDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_COption_NetworkUpdateZDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_COption_NetworkUpdateZDecodeErrorZ clone() {
		long ret = bindings.CResult_COption_NetworkUpdateZDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_NetworkUpdateZDecodeErrorZ ret_hu_conv = Result_COption_NetworkUpdateZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
