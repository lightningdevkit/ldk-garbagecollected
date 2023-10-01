package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ extends CommonBase {
	private Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_free(ptr); } super.finalize();
	}

	static Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_is_ok(ptr)) {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_OK extends Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ {
		public final TwoTuple_ThirtyTwoBytesChannelMonitorZ[] res;
		private Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long[] res = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_get_ok(ptr);
			int res_conv_40_len = res.length;
			TwoTuple_ThirtyTwoBytesChannelMonitorZ[] res_conv_40_arr = new TwoTuple_ThirtyTwoBytesChannelMonitorZ[res_conv_40_len];
			for (int o = 0; o < res_conv_40_len; o++) {
				long res_conv_40 = res[o];
				TwoTuple_ThirtyTwoBytesChannelMonitorZ res_conv_40_hu_conv = new TwoTuple_ThirtyTwoBytesChannelMonitorZ(null, res_conv_40);
				if (res_conv_40_hu_conv != null) { res_conv_40_hu_conv.ptrs_to.add(this); };
				res_conv_40_arr[o] = res_conv_40_hu_conv;
			}
			this.res = res_conv_40_arr;
		}
	}

	public static final class Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_Err extends Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ {
		public final IOError err;
		private Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ in the success state.
	 */
	public static Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ ok(TwoTuple_ThirtyTwoBytesChannelMonitorZ[] o) {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_ok(o != null ? Arrays.stream(o).mapToLong(o_conv_40 -> o_conv_40 != null ? o_conv_40.ptr : 0).toArray() : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ in the error state.
	 */
	public static Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ err(org.ldk.enums.IOError e) {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ clone() {
		long ret = bindings.CResult_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesChannelMonitorZZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
