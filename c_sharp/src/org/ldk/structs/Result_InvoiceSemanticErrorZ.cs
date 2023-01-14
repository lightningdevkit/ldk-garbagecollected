using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_InvoiceSemanticErrorZ : CommonBase {
	Result_InvoiceSemanticErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_InvoiceSemanticErrorZ() {
		if (ptr != 0) { bindings.CResult_InvoiceSemanticErrorZ_free(ptr); }
	}

	internal static Result_InvoiceSemanticErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_InvoiceSemanticErrorZ_is_ok(ptr)) {
			return new Result_InvoiceSemanticErrorZ_OK(null, ptr);
		} else {
			return new Result_InvoiceSemanticErrorZ_Err(null, ptr);
		}
	}
	public class Result_InvoiceSemanticErrorZ_OK : Result_InvoiceSemanticErrorZ {
		public readonly Invoice res;
		internal Result_InvoiceSemanticErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_InvoiceSemanticErrorZ_get_ok(ptr);
			org.ldk.structs.Invoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Invoice(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_InvoiceSemanticErrorZ_Err : Result_InvoiceSemanticErrorZ {
		public readonly SemanticError err;
		internal Result_InvoiceSemanticErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_InvoiceSemanticErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_InvoiceSemanticErrorZ in the success state.
	 */
	public static Result_InvoiceSemanticErrorZ ok(org.ldk.structs.Invoice o) {
		long ret = bindings.CResult_InvoiceSemanticErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceSemanticErrorZ ret_hu_conv = Result_InvoiceSemanticErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InvoiceSemanticErrorZ in the error state.
	 */
	public static Result_InvoiceSemanticErrorZ err(SemanticError e) {
		long ret = bindings.CResult_InvoiceSemanticErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceSemanticErrorZ ret_hu_conv = Result_InvoiceSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_InvoiceSemanticErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_InvoiceSemanticErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_InvoiceSemanticErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_InvoiceSemanticErrorZ clone() {
		long ret = bindings.CResult_InvoiceSemanticErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceSemanticErrorZ ret_hu_conv = Result_InvoiceSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
