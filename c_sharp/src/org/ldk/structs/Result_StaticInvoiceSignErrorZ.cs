using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_StaticInvoiceSignErrorZ : CommonBase {
	Result_StaticInvoiceSignErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_StaticInvoiceSignErrorZ() {
		if (ptr != 0) { bindings.CResult_StaticInvoiceSignErrorZ_free(ptr); }
	}

	internal static Result_StaticInvoiceSignErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_StaticInvoiceSignErrorZ_is_ok(ptr)) {
			return new Result_StaticInvoiceSignErrorZ_OK(null, ptr);
		} else {
			return new Result_StaticInvoiceSignErrorZ_Err(null, ptr);
		}
	}
	public class Result_StaticInvoiceSignErrorZ_OK : Result_StaticInvoiceSignErrorZ {
		public readonly StaticInvoice res;
		internal Result_StaticInvoiceSignErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_StaticInvoiceSignErrorZ_get_ok(ptr);
			org.ldk.structs.StaticInvoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.StaticInvoice(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_StaticInvoiceSignErrorZ_Err : Result_StaticInvoiceSignErrorZ {
		public readonly SignError err;
		internal Result_StaticInvoiceSignErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_StaticInvoiceSignErrorZ_get_err(ptr);
			org.ldk.structs.SignError err_hu_conv = org.ldk.structs.SignError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_StaticInvoiceSignErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_StaticInvoiceSignErrorZ ok(org.ldk.structs.StaticInvoice o) {
		long ret = bindings.CResult_StaticInvoiceSignErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticInvoiceSignErrorZ ret_hu_conv = Result_StaticInvoiceSignErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_StaticInvoiceSignErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_StaticInvoiceSignErrorZ err(org.ldk.structs.SignError e) {
		long ret = bindings.CResult_StaticInvoiceSignErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticInvoiceSignErrorZ ret_hu_conv = Result_StaticInvoiceSignErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_StaticInvoiceSignErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
