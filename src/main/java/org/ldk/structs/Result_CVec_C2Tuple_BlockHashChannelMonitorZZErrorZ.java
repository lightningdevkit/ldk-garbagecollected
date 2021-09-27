package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ extends CommonBase {
	private Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_free(ptr); } super.finalize();
	}

	static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_result_ok(ptr)) {
			return new Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_OK extends Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ {
		public final TwoTuple_BlockHashChannelMonitorZ[] res;
		private Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long[] res = bindings.LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_ok(ptr);
			TwoTuple_BlockHashChannelMonitorZ[] res_conv_35_arr = new TwoTuple_BlockHashChannelMonitorZ[res.length];
			for (int j = 0; j < res.length; j++) {
				long res_conv_35 = res[j];
				TwoTuple_BlockHashChannelMonitorZ res_conv_35_hu_conv = new TwoTuple_BlockHashChannelMonitorZ(null, res_conv_35);
				res_conv_35_hu_conv.ptrs_to.add(this);
				res_conv_35_arr[j] = res_conv_35_hu_conv;
			}
			this.res = res_conv_35_arr;
		}
	}

	public static final class Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err extends Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ {
		public final IOError err;
		private Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ in the success state.
	 */
	public static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ok(TwoTuple_BlockHashChannelMonitorZ[] o) {
		long ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_ok(o != null ? Arrays.stream(o).mapToLong(o_conv_35 -> o_conv_35 != null ? o_conv_35.ptr : 0).toArray() : null);
		if (ret < 1024) { return null; }
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ in the error state.
	 */
	public static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ err(org.ldk.enums.IOError e) {
		long ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_err(e);
		if (ret < 1024) { return null; }
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ clone() {
		long ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
