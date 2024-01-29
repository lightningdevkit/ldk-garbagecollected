using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ : CommonBase {
	Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ() {
		if (ptr != 0) { bindings.CResult_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_free(ptr); }
	}

	internal static Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_is_ok(ptr)) {
			return new Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_OK(null, ptr);
		} else {
			return new Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_Err(null, ptr);
		}
	}
	public class Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_OK : Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ {
		public readonly ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ res;
		internal Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_get_ok(ptr);
			ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ res_hu_conv = new ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_Err : Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ {
		public readonly SendError err;
		internal Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_get_err(ptr);
			org.ldk.structs.SendError err_hu_conv = org.ldk.structs.SendError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ in the success state.
	 */
	public static Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ ok(org.ldk.structs.ThreeTuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZ o) {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ in the error state.
	 */
	public static Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ err(org.ldk.structs.SendError e) {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCOption_CVec_SocketAddressZZZSendErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
