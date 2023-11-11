using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ : CommonBase {
	Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ() {
		if (ptr != 0) { bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_free(ptr); }
	}

	internal static Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_is_ok(ptr)) {
			return new Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_Err(null, ptr);
		}
	}
	public class Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_OK : Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ {
		public readonly TwoTuple_ThirtyTwoBytesChannelMonitorZ res;
		internal Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long res = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_get_ok(ptr);
			TwoTuple_ThirtyTwoBytesChannelMonitorZ res_hu_conv = new TwoTuple_ThirtyTwoBytesChannelMonitorZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.AddLast(this); };
			this.res = res_hu_conv;
		}
	}

	public class Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_Err : Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ {
		public readonly IOError err;
		internal Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ in the success state.
	 */
	public static Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ ok(org.ldk.structs.TwoTuple_ThirtyTwoBytesChannelMonitorZ o) {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_ok(o != null ? o.ptr : 0);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ in the error state.
	 */
	public static Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ err(IOError e) {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ clone() {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesChannelMonitorZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
