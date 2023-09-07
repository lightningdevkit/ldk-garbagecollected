using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ChannelConfigDecodeErrorZ : CommonBase {
	Result_ChannelConfigDecodeErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ChannelConfigDecodeErrorZ() {
		if (ptr != 0) { bindings.CResult_ChannelConfigDecodeErrorZ_free(ptr); }
	}

	internal static Result_ChannelConfigDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ChannelConfigDecodeErrorZ_is_ok(ptr)) {
			return new Result_ChannelConfigDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelConfigDecodeErrorZ_Err(null, ptr);
		}
	}
	public class Result_ChannelConfigDecodeErrorZ_OK : Result_ChannelConfigDecodeErrorZ {
		public readonly ChannelConfig res;
		internal Result_ChannelConfigDecodeErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_ChannelConfigDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.ChannelConfig res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.ChannelConfig(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_ChannelConfigDecodeErrorZ_Err : Result_ChannelConfigDecodeErrorZ {
		public readonly DecodeError err;
		internal Result_ChannelConfigDecodeErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			long err = bindings.CResult_ChannelConfigDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.AddLast(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ChannelConfigDecodeErrorZ in the success state.
	 */
	public static Result_ChannelConfigDecodeErrorZ ok(org.ldk.structs.ChannelConfig o) {
		long ret = bindings.CResult_ChannelConfigDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelConfigDecodeErrorZ ret_hu_conv = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelConfigDecodeErrorZ in the error state.
	 */
	public static Result_ChannelConfigDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_ChannelConfigDecodeErrorZ_err(e.ptr);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelConfigDecodeErrorZ ret_hu_conv = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ChannelConfigDecodeErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ChannelConfigDecodeErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelConfigDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelConfigDecodeErrorZ clone() {
		long ret = bindings.CResult_ChannelConfigDecodeErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelConfigDecodeErrorZ ret_hu_conv = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
