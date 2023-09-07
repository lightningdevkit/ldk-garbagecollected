using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_Bolt11InvoiceParseOrSemanticErrorZ : CommonBase {
	Result_Bolt11InvoiceParseOrSemanticErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_Bolt11InvoiceParseOrSemanticErrorZ() {
		if (ptr != 0) { bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_free(ptr); }
	}

	internal static Result_Bolt11InvoiceParseOrSemanticErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_is_ok(ptr)) {
			return new Result_Bolt11InvoiceParseOrSemanticErrorZ_OK(null, ptr);
		} else {
			return new Result_Bolt11InvoiceParseOrSemanticErrorZ_Err(null, ptr);
		}
	}
	public class Result_Bolt11InvoiceParseOrSemanticErrorZ_OK : Result_Bolt11InvoiceParseOrSemanticErrorZ {
		public readonly Bolt11Invoice res;
		internal Result_Bolt11InvoiceParseOrSemanticErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_get_ok(ptr);
			org.ldk.structs.Bolt11Invoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Bolt11Invoice(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_Bolt11InvoiceParseOrSemanticErrorZ_Err : Result_Bolt11InvoiceParseOrSemanticErrorZ {
		public readonly ParseOrSemanticError err;
		internal Result_Bolt11InvoiceParseOrSemanticErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_get_err(ptr);
			org.ldk.structs.ParseOrSemanticError err_hu_conv = org.ldk.structs.ParseOrSemanticError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_Bolt11InvoiceParseOrSemanticErrorZ in the success state.
	 */
	public static Result_Bolt11InvoiceParseOrSemanticErrorZ ok(org.ldk.structs.Bolt11Invoice o) {
		long ret = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt11InvoiceParseOrSemanticErrorZ ret_hu_conv = Result_Bolt11InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_Bolt11InvoiceParseOrSemanticErrorZ in the error state.
	 */
	public static Result_Bolt11InvoiceParseOrSemanticErrorZ err(org.ldk.structs.ParseOrSemanticError e) {
		long ret = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt11InvoiceParseOrSemanticErrorZ ret_hu_conv = Result_Bolt11InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_Bolt11InvoiceParseOrSemanticErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_Bolt11InvoiceParseOrSemanticErrorZ clone() {
		long ret = bindings.CResult_Bolt11InvoiceParseOrSemanticErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_Bolt11InvoiceParseOrSemanticErrorZ ret_hu_conv = Result_Bolt11InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
