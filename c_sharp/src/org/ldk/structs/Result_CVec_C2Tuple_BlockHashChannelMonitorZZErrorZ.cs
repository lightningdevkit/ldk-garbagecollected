using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

public class Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ : CommonBase {
	Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ(object _dummy, long ptr) : base(ptr) { }
	~Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ() {
		if (ptr != 0) { bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_free(ptr); }
	}

	internal static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_is_ok(ptr)) {
			return new Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err(null, ptr);
		}
	}
	public class Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_OK : Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ {
		public readonly TwoTuple_BlockHashChannelMonitorZ[] res;
		internal Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_OK(object _dummy, long ptr) : base(_dummy, ptr) {
			long[] res = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_ok(ptr);
			int res_conv_35_len = res.Length;
			TwoTuple_BlockHashChannelMonitorZ[] res_conv_35_arr = new TwoTuple_BlockHashChannelMonitorZ[res_conv_35_len];
			for (int j = 0; j < res_conv_35_len; j++) {
				long res_conv_35 = res[j];
				TwoTuple_BlockHashChannelMonitorZ res_conv_35_hu_conv = new TwoTuple_BlockHashChannelMonitorZ(null, res_conv_35);
				if (res_conv_35_hu_conv != null) { res_conv_35_hu_conv.ptrs_to.AddLast(this); };
				res_conv_35_arr[j] = res_conv_35_hu_conv;
			}
			this.res = res_conv_35_arr;
		}
	}

	public class Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err : Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ {
		public readonly IOError err;
		internal Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err(object _dummy, long ptr) : base(_dummy, ptr) {
			this.err = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ in the success state.
	 */
	public static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ok(TwoTuple_BlockHashChannelMonitorZ[] o) {
		long ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_ok(o != null ? InternalUtils.mapArray(o, o_conv_35 => o_conv_35 != null ? o_conv_35.ptr : 0) : null);
		GC.KeepAlive(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ in the error state.
	 */
	public static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ err(IOError e) {
		long ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_err(e);
		GC.KeepAlive(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public bool is_ok() {
		bool ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_is_ok(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	internal long clone_ptr() {
		long ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ clone() {
		long ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
