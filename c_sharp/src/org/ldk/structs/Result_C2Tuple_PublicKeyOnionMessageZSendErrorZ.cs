using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ : CommonBase {
	Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_PublicKeyOnionMessageZSendErrorZ_free(ptr); }
	}

	internal static Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_PublicKeyOnionMessageZSendErrorZ_is_ok(ptr)) {
			return new Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ_OK : Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ {
		public readonly TwoTuple_PublicKeyOnionMessageZ res;
		internal Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_PublicKeyOnionMessageZSendErrorZ_get_ok(ptr);
			TwoTuple_PublicKeyOnionMessageZ res_hu_conv = new TwoTuple_PublicKeyOnionMessageZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ_Err : Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ {
		public readonly SendError err;
		internal Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_C2Tuple_PublicKeyOnionMessageZSendErrorZ_get_err(ptr);
			org.ldk.structs.SendError err_hu_conv = org.ldk.structs.SendError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_PublicKeyOnionMessageZSendErrorZ in the success state.
	 */
	public static Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ ok(org.ldk.structs.TwoTuple_PublicKeyOnionMessageZ o) {
		long ret = bindings.CResult_C2Tuple_PublicKeyOnionMessageZSendErrorZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ ret_hu_conv = Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_PublicKeyOnionMessageZSendErrorZ in the error state.
	 */
	public static Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ err(org.ldk.structs.SendError e) {
		long ret = bindings.CResult_C2Tuple_PublicKeyOnionMessageZSendErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ ret_hu_conv = Result_C2Tuple_PublicKeyOnionMessageZSendErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_PublicKeyOnionMessageZSendErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
