
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
		public final TwoTuple<Uint8Array, ChannelMonitor>[] res;
		private Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number[] res = bindings.LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_ok(ptr);
			TwoTuple<Uint8Array, ChannelMonitor>[] res_conv_38_arr = new TwoTuple[res.length];
			for (int m = 0; m < res.length; m++) {
				number res_conv_38 = res[m];
				Uint8Array res_conv_38_a = bindings.LDKC2Tuple_BlockHashChannelMonitorZ_get_a(res_conv_38);
				number res_conv_38_b = bindings.LDKC2Tuple_BlockHashChannelMonitorZ_get_b(res_conv_38);
				const res_conv_38_b_hu_conv: ChannelMonitor = new ChannelMonitor(null, res_conv_38_b);
				res_conv_38_b_hu_conv.ptrs_to.add(this);;
				TwoTuple<Uint8Array, ChannelMonitor> res_conv_38_conv = new TwoTuple<Uint8Array, ChannelMonitor>(res_conv_38_a, res_conv_38_b_hu_conv, () -> {
					bindings.C2Tuple_BlockHashChannelMonitorZ_free(res_conv_38);
				});
				res_conv_38_b_hu_conv.ptrs_to.add(res_conv_38_conv);
				res_conv_38_arr[m] = res_conv_38_conv;
			}
			this.res = res_conv_38_arr;
		}
	}

	public static final class Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err extends Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ {
		public final IOError err;
		private Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_get_err(ptr);
		}
	}

	public static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ constructor__ok(TwoTuple<Uint8Array, ChannelMonitor>[] o) {
		number ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_ok(o != null ? Arrays.stream(o).map(o_conv_38 -> bindings.C2Tuple_BlockHashChannelMonitorZ_new(o_conv_38.a, o_conv_38.b == null ? 0 : o_conv_38.b.ptr & ~1)).toArray(number[]::new) : null);
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		for (TwoTuple<Uint8Array, ChannelMonitor> o_conv_38: o) { ret_hu_conv.ptrs_to.add(o_conv_38.b); };
		return ret_hu_conv;
	}

	public static Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ constructor__err(IOError e) {
		number ret = bindings.CResult_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ_err(e);
		Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ ret_hu_conv = Result_CVec_C2Tuple_BlockHashChannelMonitorZZErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
