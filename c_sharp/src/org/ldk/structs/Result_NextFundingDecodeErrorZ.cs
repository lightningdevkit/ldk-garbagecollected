using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NextFundingDecodeErrorZ : CommonBase {
	Result_NextFundingDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NextFundingDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_NextFundingDecodeErrorZ_free(ptr); }
	}

	internal static Result_NextFundingDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NextFundingDecodeErrorZ_is_ok(ptr)) {
			return new Result_NextFundingDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NextFundingDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_NextFundingDecodeErrorZ_OK : Result_NextFundingDecodeErrorZ {
		public readonly NextFunding res;
		internal Result_NextFundingDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_NextFundingDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.NextFunding res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.NextFunding(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_NextFundingDecodeErrorZ_Err : Result_NextFundingDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_NextFundingDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_NextFundingDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NextFundingDecodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_NextFundingDecodeErrorZ ok(org.ldk.structs.NextFunding o) {
		long ret = bindings.CResult_NextFundingDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NextFundingDecodeErrorZ ret_hu_conv = Result_NextFundingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NextFundingDecodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_NextFundingDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_NextFundingDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NextFundingDecodeErrorZ ret_hu_conv = Result_NextFundingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NextFundingDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_NextFundingDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NextFundingDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_NextFundingDecodeErrorZ clone() {
		long ret = bindings.CResult_NextFundingDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NextFundingDecodeErrorZ ret_hu_conv = Result_NextFundingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
