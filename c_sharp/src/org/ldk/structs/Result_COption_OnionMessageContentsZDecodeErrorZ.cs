using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_COption_OnionMessageContentsZDecodeErrorZ : CommonBase {
	Result_COption_OnionMessageContentsZDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_COption_OnionMessageContentsZDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_COption_OnionMessageContentsZDecodeErrorZ_free(ptr); }
	}

	internal static Result_COption_OnionMessageContentsZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_COption_OnionMessageContentsZDecodeErrorZ_is_ok(ptr)) {
			return new Result_COption_OnionMessageContentsZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_COption_OnionMessageContentsZDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_COption_OnionMessageContentsZDecodeErrorZ_OK : Result_COption_OnionMessageContentsZDecodeErrorZ {
		public readonly Option_OnionMessageContentsZ res;
		internal Result_COption_OnionMessageContentsZDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_COption_OnionMessageContentsZDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.Option_OnionMessageContentsZ res_hu_conv = org.ldk.structs.Option_OnionMessageContentsZ.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_COption_OnionMessageContentsZDecodeErrorZ_Err : Result_COption_OnionMessageContentsZDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_COption_OnionMessageContentsZDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_COption_OnionMessageContentsZDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_COption_OnionMessageContentsZDecodeErrorZ in the success state.
	 */
	public static Result_COption_OnionMessageContentsZDecodeErrorZ ok(org.ldk.structs.Option_OnionMessageContentsZ o) {
		long ret = bindings.CResult_COption_OnionMessageContentsZDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_OnionMessageContentsZDecodeErrorZ ret_hu_conv = Result_COption_OnionMessageContentsZDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_COption_OnionMessageContentsZDecodeErrorZ in the error state.
	 */
	public static Result_COption_OnionMessageContentsZDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_COption_OnionMessageContentsZDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_OnionMessageContentsZDecodeErrorZ ret_hu_conv = Result_COption_OnionMessageContentsZDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_COption_OnionMessageContentsZDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_COption_OnionMessageContentsZDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_COption_OnionMessageContentsZDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_COption_OnionMessageContentsZDecodeErrorZ clone() {
		long ret = bindings.CResult_COption_OnionMessageContentsZDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_COption_OnionMessageContentsZDecodeErrorZ ret_hu_conv = Result_COption_OnionMessageContentsZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
