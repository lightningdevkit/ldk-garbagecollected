using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NodeInfoDecodeErrorZ : CommonBase {
	Result_NodeInfoDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NodeInfoDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_NodeInfoDecodeErrorZ_free(ptr); }
	}

	internal static Result_NodeInfoDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NodeInfoDecodeErrorZ_is_ok(ptr)) {
			return new Result_NodeInfoDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NodeInfoDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_NodeInfoDecodeErrorZ_OK : Result_NodeInfoDecodeErrorZ {
		public readonly NodeInfo res;
		internal Result_NodeInfoDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_NodeInfoDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.NodeInfo res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.NodeInfo(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_NodeInfoDecodeErrorZ_Err : Result_NodeInfoDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_NodeInfoDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_NodeInfoDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NodeInfoDecodeErrorZ in the success state.
	 */
	public static Result_NodeInfoDecodeErrorZ ok(org.ldk.structs.NodeInfo o) {
		long ret = bindings.CResult_NodeInfoDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeInfoDecodeErrorZ ret_hu_conv = Result_NodeInfoDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NodeInfoDecodeErrorZ in the error state.
	 */
	public static Result_NodeInfoDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_NodeInfoDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeInfoDecodeErrorZ ret_hu_conv = Result_NodeInfoDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NodeInfoDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_NodeInfoDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NodeInfoDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NodeInfoDecodeErrorZ clone() {
		long ret = bindings.CResult_NodeInfoDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NodeInfoDecodeErrorZ ret_hu_conv = Result_NodeInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
