using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_NetworkGraphDecodeErrorZ : CommonBase {
	Result_NetworkGraphDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_NetworkGraphDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_NetworkGraphDecodeErrorZ_free(ptr); }
	}

	internal static Result_NetworkGraphDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NetworkGraphDecodeErrorZ_is_ok(ptr)) {
			return new Result_NetworkGraphDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NetworkGraphDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_NetworkGraphDecodeErrorZ_OK : Result_NetworkGraphDecodeErrorZ {
		public readonly NetworkGraph res;
		internal Result_NetworkGraphDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_NetworkGraphDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.NetworkGraph res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.NetworkGraph(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_NetworkGraphDecodeErrorZ_Err : Result_NetworkGraphDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_NetworkGraphDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_NetworkGraphDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NetworkGraphDecodeErrorZ in the success state.
	 */
	public static Result_NetworkGraphDecodeErrorZ ok(Network o_network, Logger o_logger) {
		long ret = bindings.CResult_NetworkGraphDecodeErrorZ_ok(bindings.NetworkGraph_new(o_network, o_logger.ptr));
		GC.KeepAlive(o_network);
		GC.KeepAlive(o_logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NetworkGraphDecodeErrorZ ret_hu_conv = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o_logger); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NetworkGraphDecodeErrorZ in the error state.
	 */
	public static Result_NetworkGraphDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_NetworkGraphDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NetworkGraphDecodeErrorZ ret_hu_conv = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_NetworkGraphDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

}
} } }
