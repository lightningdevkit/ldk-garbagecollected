
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
		public final TwoTuple_BlockHashChannelMonitorZ res;
		private Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_ok(ptr);
			TwoTuple_BlockHashChannelMonitorZ res_hu_conv = new TwoTuple_BlockHashChannelMonitorZ(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
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
	}

	public static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ constructor_ok(TwoTuple_BlockHashChannelMonitorZ o) {
		number ret = bindings.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(o != null ? o.ptr : 0);
		Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ clone() {
		number ret = bindings.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_clone(this.ptr);
		Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
