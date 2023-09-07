using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ChannelReestablishDecodeErrorZ : CommonBase {
	Result_ChannelReestablishDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ChannelReestablishDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_ChannelReestablishDecodeErrorZ_free(ptr); }
	}

	internal static Result_ChannelReestablishDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ChannelReestablishDecodeErrorZ_is_ok(ptr)) {
			return new Result_ChannelReestablishDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelReestablishDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_ChannelReestablishDecodeErrorZ_OK : Result_ChannelReestablishDecodeErrorZ {
		public readonly ChannelReestablish res;
		internal Result_ChannelReestablishDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_ChannelReestablishDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.ChannelReestablish res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.ChannelReestablish(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_ChannelReestablishDecodeErrorZ_Err : Result_ChannelReestablishDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_ChannelReestablishDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_ChannelReestablishDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ChannelReestablishDecodeErrorZ in the success state.
	 */
	public static Result_ChannelReestablishDecodeErrorZ ok(org.ldk.structs.ChannelReestablish o) {
		long ret = bindings.CResult_ChannelReestablishDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelReestablishDecodeErrorZ in the error state.
	 */
	public static Result_ChannelReestablishDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_ChannelReestablishDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ChannelReestablishDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ChannelReestablishDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelReestablishDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelReestablishDecodeErrorZ clone() {
		long ret = bindings.CResult_ChannelReestablishDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
