using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_InvoiceParseOrSemanticErrorZ : CommonBase {
	Result_InvoiceParseOrSemanticErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_InvoiceParseOrSemanticErrorZ() {
		if (ptr != 0) { bindings.CResult_InvoiceParseOrSemanticErrorZ_free(ptr); }
	}

	internal static Result_InvoiceParseOrSemanticErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_InvoiceParseOrSemanticErrorZ_is_ok(ptr)) {
			return new Result_InvoiceParseOrSemanticErrorZ_OK(null, ptr);
		} else {
			return new Result_InvoiceParseOrSemanticErrorZ_Err(null, ptr);
		}
	}
	public class Result_InvoiceParseOrSemanticErrorZ_OK : Result_InvoiceParseOrSemanticErrorZ {
		public readonly Invoice res;
		internal Result_InvoiceParseOrSemanticErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_InvoiceParseOrSemanticErrorZ_get_ok(ptr);
			org.ldk.structs.Invoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Invoice(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_InvoiceParseOrSemanticErrorZ_Err : Result_InvoiceParseOrSemanticErrorZ {
		public readonly ParseOrSemanticError err;
		internal Result_InvoiceParseOrSemanticErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_InvoiceParseOrSemanticErrorZ_get_err(ptr);
			org.ldk.structs.ParseOrSemanticError err_hu_conv = org.ldk.structs.ParseOrSemanticError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_InvoiceParseOrSemanticErrorZ in the success state.
	 */
	public static Result_InvoiceParseOrSemanticErrorZ ok(org.ldk.structs.Invoice o) {
		long ret = bindings.CResult_InvoiceParseOrSemanticErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceParseOrSemanticErrorZ ret_hu_conv = Result_InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InvoiceParseOrSemanticErrorZ in the error state.
	 */
	public static Result_InvoiceParseOrSemanticErrorZ err(org.ldk.structs.ParseOrSemanticError e) {
		long ret = bindings.CResult_InvoiceParseOrSemanticErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceParseOrSemanticErrorZ ret_hu_conv = Result_InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_InvoiceParseOrSemanticErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_InvoiceParseOrSemanticErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_InvoiceParseOrSemanticErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_InvoiceParseOrSemanticErrorZ clone() {
		long ret = bindings.CResult_InvoiceParseOrSemanticErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceParseOrSemanticErrorZ ret_hu_conv = Result_InvoiceParseOrSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
