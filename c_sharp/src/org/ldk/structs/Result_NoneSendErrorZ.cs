using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NoneSendErrorZ : CommonBase {
	Result_NoneSendErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NoneSendErrorZ() {
		if (ptr != 0) { bindings.CResult_NoneSendErrorZ_free(ptr); }
	}

	internal static Result_NoneSendErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneSendErrorZ_is_ok(ptr)) {
			return new Result_NoneSendErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneSendErrorZ_Err(null, ptr);
		}
	}
	public class Result_NoneSendErrorZ_OK : Result_NoneSendErrorZ {
		internal Result_NoneSendErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	public class Result_NoneSendErrorZ_Err : Result_NoneSendErrorZ {
		public readonly SendError err;
		internal Result_NoneSendErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_NoneSendErrorZ_get_err(ptr);
			org.ldk.structs.SendError err_hu_conv = org.ldk.structs.SendError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NoneSendErrorZ in the success state.
	 */
	public static Result_NoneSendErrorZ ok() {
		long ret = bindings.CResult_NoneSendErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSendErrorZ ret_hu_conv = Result_NoneSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneSendErrorZ in the error state.
	 */
	public static Result_NoneSendErrorZ err(org.ldk.structs.SendError e) {
		long ret = bindings.CResult_NoneSendErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSendErrorZ ret_hu_conv = Result_NoneSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NoneSendErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
