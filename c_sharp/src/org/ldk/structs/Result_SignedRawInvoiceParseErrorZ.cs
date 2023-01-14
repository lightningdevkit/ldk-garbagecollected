using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_SignedRawInvoiceParseErrorZ : CommonBase {
	Result_SignedRawInvoiceParseErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_SignedRawInvoiceParseErrorZ() {
		if (ptr != 0) { bindings.CResult_SignedRawInvoiceParseErrorZ_free(ptr); }
	}

	internal static Result_SignedRawInvoiceParseErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SignedRawInvoiceParseErrorZ_is_ok(ptr)) {
			return new Result_SignedRawInvoiceParseErrorZ_OK(null, ptr);
		} else {
			return new Result_SignedRawInvoiceParseErrorZ_Err(null, ptr);
		}
	}
	public class Result_SignedRawInvoiceParseErrorZ_OK : Result_SignedRawInvoiceParseErrorZ {
		public readonly SignedRawInvoice res;
		internal Result_SignedRawInvoiceParseErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_SignedRawInvoiceParseErrorZ_get_ok(ptr);
			org.ldk.structs.SignedRawInvoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.SignedRawInvoice(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_SignedRawInvoiceParseErrorZ_Err : Result_SignedRawInvoiceParseErrorZ {
		public readonly ParseError err;
		internal Result_SignedRawInvoiceParseErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_SignedRawInvoiceParseErrorZ_get_err(ptr);
			org.ldk.structs.ParseError err_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SignedRawInvoiceParseErrorZ in the success state.
	 */
	public static Result_SignedRawInvoiceParseErrorZ ok(org.ldk.structs.SignedRawInvoice o) {
		long ret = bindings.CResult_SignedRawInvoiceParseErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceParseErrorZ ret_hu_conv = Result_SignedRawInvoiceParseErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SignedRawInvoiceParseErrorZ in the error state.
	 */
	public static Result_SignedRawInvoiceParseErrorZ err(org.ldk.structs.ParseError e) {
		long ret = bindings.CResult_SignedRawInvoiceParseErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceParseErrorZ ret_hu_conv = Result_SignedRawInvoiceParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_SignedRawInvoiceParseErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_SignedRawInvoiceParseErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SignedRawInvoiceParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SignedRawInvoiceParseErrorZ clone() {
		long ret = bindings.CResult_SignedRawInvoiceParseErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceParseErrorZ ret_hu_conv = Result_SignedRawInvoiceParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
