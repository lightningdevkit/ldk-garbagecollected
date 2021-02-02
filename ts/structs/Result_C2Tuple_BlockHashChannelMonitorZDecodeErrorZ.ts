
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ extends CommonBase {
	private Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_result_ok(ptr)) {
			return new Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK extends Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ {
		public final TwoTuple<Uint8Array, ChannelMonitor> res;
		private Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_ok(ptr);
			Uint8Array res_a = bindings.LDKC2Tuple_BlockHashChannelMonitorZ_get_a(res);
			number res_b = bindings.LDKC2Tuple_BlockHashChannelMonitorZ_get_b(res);
			const res_b_hu_conv: ChannelMonitor = new ChannelMonitor(null, res_b);
			res_b_hu_conv.ptrs_to.add(this);;
			TwoTuple<Uint8Array, ChannelMonitor> res_conv = new TwoTuple<Uint8Array, ChannelMonitor>(res_a, res_b_hu_conv, () -> {
				bindings.C2Tuple_BlockHashChannelMonitorZ_free(res);
			});
			res_b_hu_conv.ptrs_to.add(res_conv);
			this.res = res_conv;
		}
		public Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK(TwoTuple<Uint8Array, ChannelMonitor> res) {
			this(null, bindings.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(bindings.C2Tuple_BlockHashChannelMonitorZ_new(res.a, res.b == null ? 0 : res.b.ptr & ~1)));
			this.ptrs_to.add(res.b);
		}
	}

	public static final class Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_Err extends Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ {
		public final DecodeError err;
		private Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
