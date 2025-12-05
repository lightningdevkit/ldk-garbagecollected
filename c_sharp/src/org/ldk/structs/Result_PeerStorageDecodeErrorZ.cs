using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_PeerStorageDecodeErrorZ : CommonBase {
	Result_PeerStorageDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_PeerStorageDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_PeerStorageDecodeErrorZ_free(ptr); }
	}

	internal static Result_PeerStorageDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PeerStorageDecodeErrorZ_is_ok(ptr)) {
			return new Result_PeerStorageDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PeerStorageDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_PeerStorageDecodeErrorZ_OK : Result_PeerStorageDecodeErrorZ {
		public readonly PeerStorage res;
		internal Result_PeerStorageDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_PeerStorageDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.PeerStorage res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.PeerStorage(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_PeerStorageDecodeErrorZ_Err : Result_PeerStorageDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_PeerStorageDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_PeerStorageDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PeerStorageDecodeErrorZ in the success state.
	 */
	public static org.ldk.structs.Result_PeerStorageDecodeErrorZ ok(org.ldk.structs.PeerStorage o) {
		long ret = bindings.CResult_PeerStorageDecodeErrorZ_ok(o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeerStorageDecodeErrorZ ret_hu_conv = Result_PeerStorageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PeerStorageDecodeErrorZ in the error state.
	 */
	public static org.ldk.structs.Result_PeerStorageDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_PeerStorageDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeerStorageDecodeErrorZ ret_hu_conv = Result_PeerStorageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_PeerStorageDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_PeerStorageDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PeerStorageDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public org.ldk.structs.Result_PeerStorageDecodeErrorZ clone() {
		long ret = bindings.CResult_PeerStorageDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeerStorageDecodeErrorZ ret_hu_conv = Result_PeerStorageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
