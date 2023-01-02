using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NonePeerHandleErrorZ : CommonBase {
	Result_NonePeerHandleErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NonePeerHandleErrorZ() {
		if (ptr != 0) { bindings.CResult_NonePeerHandleErrorZ_free(ptr); }
	}

	internal static Result_NonePeerHandleErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NonePeerHandleErrorZ_is_ok(ptr)) {
			return new Result_NonePeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_NonePeerHandleErrorZ_Err(null, ptr);
		}
	}
	public class Result_NonePeerHandleErrorZ_OK : Result_NonePeerHandleErrorZ {
		internal Result_NonePeerHandleErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	public class Result_NonePeerHandleErrorZ_Err : Result_NonePeerHandleErrorZ {
		public readonly PeerHandleError err;
		internal Result_NonePeerHandleErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_NonePeerHandleErrorZ_get_err(ptr);
			org.ldk.structs.PeerHandleError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.PeerHandleError(null, err); }
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NonePeerHandleErrorZ in the success state.
	 */
	public static Result_NonePeerHandleErrorZ ok() {
		long ret = bindings.CResult_NonePeerHandleErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NonePeerHandleErrorZ in the error state.
	 */
	public static Result_NonePeerHandleErrorZ err(org.ldk.structs.PeerHandleError e) {
		long ret = bindings.CResult_NonePeerHandleErrorZ_err(e == null ? 0 : e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NonePeerHandleErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_NonePeerHandleErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NonePeerHandleErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NonePeerHandleErrorZ clone() {
		long ret = bindings.CResult_NonePeerHandleErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
