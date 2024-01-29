using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_SendSuccessSendErrorZ : CommonBase {
	Result_SendSuccessSendErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_SendSuccessSendErrorZ() {
		if (ptr != 0) { bindings.CResult_SendSuccessSendErrorZ_free(ptr); }
	}

	internal static Result_SendSuccessSendErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SendSuccessSendErrorZ_is_ok(ptr)) {
			return new Result_SendSuccessSendErrorZ_OK(null, ptr);
		} else {
			return new Result_SendSuccessSendErrorZ_Err(null, ptr);
		}
	}
	public class Result_SendSuccessSendErrorZ_OK : Result_SendSuccessSendErrorZ {
		public readonly SendSuccess res;
		internal Result_SendSuccessSendErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_SendSuccessSendErrorZ_get_ok(ptr);
			org.ldk.structs.SendSuccess res_hu_conv = org.ldk.structs.SendSuccess.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_SendSuccessSendErrorZ_Err : Result_SendSuccessSendErrorZ {
		public readonly SendError err;
		internal Result_SendSuccessSendErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_SendSuccessSendErrorZ_get_err(ptr);
			org.ldk.structs.SendError err_hu_conv = org.ldk.structs.SendError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SendSuccessSendErrorZ in the success state.
	 */
	public static Result_SendSuccessSendErrorZ ok(org.ldk.structs.SendSuccess o) {
		long ret = bindings.CResult_SendSuccessSendErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SendSuccessSendErrorZ ret_hu_conv = Result_SendSuccessSendErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SendSuccessSendErrorZ in the error state.
	 */
	public static Result_SendSuccessSendErrorZ err(org.ldk.structs.SendError e) {
		long ret = bindings.CResult_SendSuccessSendErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SendSuccessSendErrorZ ret_hu_conv = Result_SendSuccessSendErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_SendSuccessSendErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
