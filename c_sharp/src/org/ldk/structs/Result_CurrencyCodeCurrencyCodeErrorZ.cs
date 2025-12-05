using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CurrencyCodeCurrencyCodeErrorZ : CommonBase {
	Result_CurrencyCodeCurrencyCodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CurrencyCodeCurrencyCodeErrorZ() {
		if (ptr != 0) { bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_free(ptr); }
	}

	internal static Result_CurrencyCodeCurrencyCodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_is_ok(ptr)) {
			return new Result_CurrencyCodeCurrencyCodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CurrencyCodeCurrencyCodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_CurrencyCodeCurrencyCodeErrorZ_OK : Result_CurrencyCodeCurrencyCodeErrorZ {
		public readonly CurrencyCode res;
		internal Result_CurrencyCodeCurrencyCodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_get_ok(ptr);
			org.ldk.structs.CurrencyCode res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.CurrencyCode(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_CurrencyCodeCurrencyCodeErrorZ_Err : Result_CurrencyCodeCurrencyCodeErrorZ {
		public readonly CurrencyCodeError err;
		internal Result_CurrencyCodeCurrencyCodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_get_err(ptr);
			org.ldk.structs.CurrencyCodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.CurrencyCodeError(null, err); }
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CurrencyCodeCurrencyCodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_CurrencyCodeCurrencyCodeErrorZ ok(org.ldk.structs.CurrencyCode o) {
		long ret = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CurrencyCodeCurrencyCodeErrorZ ret_hu_conv = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CurrencyCodeCurrencyCodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_CurrencyCodeCurrencyCodeErrorZ err(org.ldk.structs.CurrencyCodeError e) {
		long ret = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CurrencyCodeCurrencyCodeErrorZ ret_hu_conv = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CurrencyCodeCurrencyCodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_CurrencyCodeCurrencyCodeErrorZ clone() {
		long ret = bindings.CResult_CurrencyCodeCurrencyCodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CurrencyCodeCurrencyCodeErrorZ ret_hu_conv = Result_CurrencyCodeCurrencyCodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
