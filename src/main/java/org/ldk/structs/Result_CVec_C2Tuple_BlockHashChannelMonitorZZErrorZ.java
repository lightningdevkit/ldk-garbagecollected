package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

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
		public final TwoTuple<byte[], ChannelMonitor>[] res;
		private Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long[] res = bindings.LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_ok(ptr);
			TwoTuple<byte[], ChannelMonitor>[] res_conv_34_arr = new TwoTuple[res.length];
			for (int i = 0; i < res.length; i++) {
				long res_conv_34 = res[i];
				byte[] res_conv_34_a = bindings.LDKC2Tuple_BlockHashChannelMonitorZ_get_a(res_conv_34);
				long res_conv_34_b = bindings.LDKC2Tuple_BlockHashChannelMonitorZ_get_b(res_conv_34);
				ChannelMonitor res_conv_34_b_hu_conv = new ChannelMonitor(null, res_conv_34_b);
				res_conv_34_b_hu_conv.ptrs_to.add(this);;
				TwoTuple<byte[], ChannelMonitor> res_conv_34_conv = new TwoTuple<byte[], ChannelMonitor>(res_conv_34_a, res_conv_34_b_hu_conv, () -> {
					bindings.C2Tuple_BlockHashChannelMonitorZ_free(res_conv_34);
				});
				res_conv_34_b_hu_conv.ptrs_to.add(res_conv_34_conv);
				res_conv_34_arr[i] = res_conv_34_conv;
			}
			this.res = res_conv_34_arr;
		}
	}

	public static final class Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err extends Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ {
		public final LDKIOError err;
		private Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ in the success state.
	 */
	public static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ constructor_ok(TwoTuple<byte[], ChannelMonitor>[] o) {
		long ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_ok(Arrays.stream(o).mapToLong(o_conv_34 -> bindings.C2Tuple_BlockHashChannelMonitorZ_new(o_conv_34.a, o_conv_34.b == null ? 0 : o_conv_34.b.ptr & ~1)).toArray());
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		/* TODO 2 TwoTuple<byte[], ChannelMonitor>  */;
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ in the error state.
	 */
	public static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ constructor_err(LDKIOError e) {
		long ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_err(e);
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
