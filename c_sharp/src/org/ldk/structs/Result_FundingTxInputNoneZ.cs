using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_FundingTxInputNoneZ : CommonBase {
	Result_FundingTxInputNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_FundingTxInputNoneZ() {
		if (ptr != 0) { bindings.CResult_FundingTxInputNoneZ_free(ptr); }
	}

	internal static Result_FundingTxInputNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_FundingTxInputNoneZ_is_ok(ptr)) {
			return new Result_FundingTxInputNoneZ_OK(null, ptr);
		} else {
			return new Result_FundingTxInputNoneZ_Err(null, ptr);
		}
	}
	public class Result_FundingTxInputNoneZ_OK : Result_FundingTxInputNoneZ {
		public readonly FundingTxInput res;
		internal Result_FundingTxInputNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_FundingTxInputNoneZ_get_ok(ptr);
			org.ldk.structs.FundingTxInput res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.FundingTxInput(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_FundingTxInputNoneZ_Err : Result_FundingTxInputNoneZ {
		internal Result_FundingTxInputNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_FundingTxInputNoneZ in the success state.
	 */
	public static org.ldk.structs.Result_FundingTxInputNoneZ ok(org.ldk.structs.FundingTxInput o) {
		long ret = bindings.CResult_FundingTxInputNoneZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_FundingTxInputNoneZ in the error state.
	 */
	public static org.ldk.structs.Result_FundingTxInputNoneZ err() {
		long ret = bindings.CResult_FundingTxInputNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_FundingTxInputNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_FundingTxInputNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_FundingTxInputNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_FundingTxInputNoneZ clone() {
		long ret = bindings.CResult_FundingTxInputNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
