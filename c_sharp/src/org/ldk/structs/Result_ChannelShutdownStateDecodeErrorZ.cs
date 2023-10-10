using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ChannelShutdownStateDecodeErrorZ : CommonBase {
	Result_ChannelShutdownStateDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ChannelShutdownStateDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_ChannelShutdownStateDecodeErrorZ_free(ptr); }
	}

	internal static Result_ChannelShutdownStateDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ChannelShutdownStateDecodeErrorZ_is_ok(ptr)) {
			return new Result_ChannelShutdownStateDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelShutdownStateDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_ChannelShutdownStateDecodeErrorZ_OK : Result_ChannelShutdownStateDecodeErrorZ {
		public readonly ChannelShutdownState res;
		internal Result_ChannelShutdownStateDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_ChannelShutdownStateDecodeErrorZ_get_ok(ptr);
		}
	}

	public class Result_ChannelShutdownStateDecodeErrorZ_Err : Result_ChannelShutdownStateDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_ChannelShutdownStateDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_ChannelShutdownStateDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ChannelShutdownStateDecodeErrorZ in the success state.
	 */
	public static Result_ChannelShutdownStateDecodeErrorZ ok(ChannelShutdownState o) {
		long ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_ok(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelShutdownStateDecodeErrorZ ret_hu_conv = Result_ChannelShutdownStateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelShutdownStateDecodeErrorZ in the error state.
	 */
	public static Result_ChannelShutdownStateDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelShutdownStateDecodeErrorZ ret_hu_conv = Result_ChannelShutdownStateDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelShutdownStateDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelShutdownStateDecodeErrorZ clone() {
		long ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelShutdownStateDecodeErrorZ ret_hu_conv = Result_ChannelShutdownStateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
