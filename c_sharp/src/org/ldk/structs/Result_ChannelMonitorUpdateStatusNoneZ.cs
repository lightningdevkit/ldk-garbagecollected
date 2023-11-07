using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_ChannelMonitorUpdateStatusNoneZ : CommonBase {
	Result_ChannelMonitorUpdateStatusNoneZ(object _dummy, long ptr) : base(ptr) { }
	~Result_ChannelMonitorUpdateStatusNoneZ() {
		if (ptr != 0) { bindings.CResult_ChannelMonitorUpdateStatusNoneZ_free(ptr); }
	}

	internal static Result_ChannelMonitorUpdateStatusNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ChannelMonitorUpdateStatusNoneZ_is_ok(ptr)) {
			return new Result_ChannelMonitorUpdateStatusNoneZ_OK(null, ptr);
		} else {
			return new Result_ChannelMonitorUpdateStatusNoneZ_Err(null, ptr);
		}
	}
	public class Result_ChannelMonitorUpdateStatusNoneZ_OK : Result_ChannelMonitorUpdateStatusNoneZ {
		public readonly ChannelMonitorUpdateStatus res;
		internal Result_ChannelMonitorUpdateStatusNoneZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			this.res = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_get_ok(ptr);
		}
	}

	public class Result_ChannelMonitorUpdateStatusNoneZ_Err : Result_ChannelMonitorUpdateStatusNoneZ {
		internal Result_ChannelMonitorUpdateStatusNoneZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
		}
	}

	/**
	 * Creates a new CResult_ChannelMonitorUpdateStatusNoneZ in the success state.
	 */
	public static Result_ChannelMonitorUpdateStatusNoneZ ok(ChannelMonitorUpdateStatus o) {
		long ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_ok(o);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelMonitorUpdateStatusNoneZ in the error state.
	 */
	public static Result_ChannelMonitorUpdateStatusNoneZ err() {
		long ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelMonitorUpdateStatusNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelMonitorUpdateStatusNoneZ clone() {
		long ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
