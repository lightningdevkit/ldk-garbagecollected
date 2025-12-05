using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ : CommonBase {
	Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ() {
		if (ptr != 0) { bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_free(ptr); }
	}

	internal static Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_is_ok(ptr)) {
			return new Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_OK(null, ptr);
		} else {
			return new Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_Err(null, ptr);
		}
	}
	public class Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_OK : Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		public readonly ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ res;
		internal Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_get_ok(ptr);
			ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ res_hu_conv = new ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_Err : Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		public readonly SendError err;
		internal Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_get_err(ptr);
			org.ldk.structs.SendError err_hu_conv = org.ldk.structs.SendError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ok(org.ldk.structs.ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ o) {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ err(org.ldk.structs.SendError e) {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ clone() {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
