using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CVec_u8ZPeerHandleErrorZ : CommonBase {
	Result_CVec_u8ZPeerHandleErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CVec_u8ZPeerHandleErrorZ() {
		if (ptr != 0) { bindings.CResult_CVec_u8ZPeerHandleErrorZ_free(ptr); }
	}

	internal static Result_CVec_u8ZPeerHandleErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_u8ZPeerHandleErrorZ_is_ok(ptr)) {
			return new Result_CVec_u8ZPeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_u8ZPeerHandleErrorZ_Err(null, ptr);
		}
	}
	public class Result_CVec_u8ZPeerHandleErrorZ_OK : Result_CVec_u8ZPeerHandleErrorZ {
		public readonly byte[] res;
		internal Result_CVec_u8ZPeerHandleErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_CVec_u8ZPeerHandleErrorZ_get_ok(ptr);
			byte[] res_conv = InternalUtils.decodeUint8Array(res);
			this.res = res_conv;
		}
	}

	public class Result_CVec_u8ZPeerHandleErrorZ_Err : Result_CVec_u8ZPeerHandleErrorZ {
		public readonly PeerHandleError err;
		internal Result_CVec_u8ZPeerHandleErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_CVec_u8ZPeerHandleErrorZ_get_err(ptr);
			org.ldk.structs.PeerHandleError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.PeerHandleError(null, err); }
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CVec_u8ZPeerHandleErrorZ in the success state.
	 */
	public static Result_CVec_u8ZPeerHandleErrorZ ok(byte[] o) {
		long ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_ok(InternalUtils.encodeUint8Array(o));
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_u8ZPeerHandleErrorZ in the error state.
	 */
	public static Result_CVec_u8ZPeerHandleErrorZ err(org.ldk.structs.PeerHandleError e) {
		long ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_err(e == null ? 0 : e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_u8ZPeerHandleErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_u8ZPeerHandleErrorZ clone() {
		long ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
