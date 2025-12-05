using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_FundingTxInputDecodeErrorZ : CommonBase {
	Result_FundingTxInputDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_FundingTxInputDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_FundingTxInputDecodeErrorZ_free(ptr); }
	}

	internal static Result_FundingTxInputDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_FundingTxInputDecodeErrorZ_is_ok(ptr)) {
			return new Result_FundingTxInputDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_FundingTxInputDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_FundingTxInputDecodeErrorZ_OK : Result_FundingTxInputDecodeErrorZ {
		public readonly FundingTxInput res;
		internal Result_FundingTxInputDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_FundingTxInputDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.FundingTxInput res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.FundingTxInput(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_FundingTxInputDecodeErrorZ_Err : Result_FundingTxInputDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_FundingTxInputDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_FundingTxInputDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_FundingTxInputDecodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_FundingTxInputDecodeErrorZ ok(org.ldk.structs.FundingTxInput o) {
		long ret = bindings.CResult_FundingTxInputDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputDecodeErrorZ ret_hu_conv = Result_FundingTxInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_FundingTxInputDecodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_FundingTxInputDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_FundingTxInputDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputDecodeErrorZ ret_hu_conv = Result_FundingTxInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_FundingTxInputDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_FundingTxInputDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_FundingTxInputDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_FundingTxInputDecodeErrorZ clone() {
		long ret = bindings.CResult_FundingTxInputDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputDecodeErrorZ ret_hu_conv = Result_FundingTxInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
