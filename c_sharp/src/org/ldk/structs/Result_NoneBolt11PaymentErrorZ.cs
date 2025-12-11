using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NoneBolt11PaymentErrorZ : CommonBase {
	Result_NoneBolt11PaymentErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NoneBolt11PaymentErrorZ() {
		if (ptr != 0) { bindings.CResult_NoneBolt11PaymentErrorZ_free(ptr); }
	}

	internal static Result_NoneBolt11PaymentErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneBolt11PaymentErrorZ_is_ok(ptr)) {
			return new Result_NoneBolt11PaymentErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneBolt11PaymentErrorZ_Err(null, ptr);
		}
	}
	public class Result_NoneBolt11PaymentErrorZ_OK : Result_NoneBolt11PaymentErrorZ {
		internal Result_NoneBolt11PaymentErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	public class Result_NoneBolt11PaymentErrorZ_Err : Result_NoneBolt11PaymentErrorZ {
		public readonly Bolt11PaymentError err;
		internal Result_NoneBolt11PaymentErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_NoneBolt11PaymentErrorZ_get_err(ptr);
			org.ldk.structs.Bolt11PaymentError err_hu_conv = org.ldk.structs.Bolt11PaymentError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NoneBolt11PaymentErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_NoneBolt11PaymentErrorZ ok() {
		long ret = bindings.CResult_NoneBolt11PaymentErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt11PaymentErrorZ ret_hu_conv = Result_NoneBolt11PaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneBolt11PaymentErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_NoneBolt11PaymentErrorZ err(org.ldk.structs.Bolt11PaymentError e) {
		long ret = bindings.CResult_NoneBolt11PaymentErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt11PaymentErrorZ ret_hu_conv = Result_NoneBolt11PaymentErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NoneBolt11PaymentErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
