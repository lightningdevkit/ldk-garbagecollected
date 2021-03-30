
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ChannelMonitorUpdateDecodeErrorZ extends CommonBase {
	private Result_ChannelMonitorUpdateDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelMonitorUpdateDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelMonitorUpdateDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelMonitorUpdateDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelMonitorUpdateDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelMonitorUpdateDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelMonitorUpdateDecodeErrorZ_OK extends Result_ChannelMonitorUpdateDecodeErrorZ {
		public final ChannelMonitorUpdate res;
		private Result_ChannelMonitorUpdateDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ChannelMonitorUpdateDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ChannelMonitorUpdate = new ChannelMonitorUpdate(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelMonitorUpdateDecodeErrorZ_Err extends Result_ChannelMonitorUpdateDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelMonitorUpdateDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ChannelMonitorUpdateDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ChannelMonitorUpdateDecodeErrorZ constructor__ok(ChannelMonitorUpdate o) {
		number ret = bindings.CResult_ChannelMonitorUpdateDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ChannelMonitorUpdateDecodeErrorZ ret_hu_conv = Result_ChannelMonitorUpdateDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_ChannelMonitorUpdateDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_ChannelMonitorUpdateDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ChannelMonitorUpdateDecodeErrorZ ret_hu_conv = Result_ChannelMonitorUpdateDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_ChannelMonitorUpdateDecodeErrorZ _clone() {
		number ret = bindings.CResult_ChannelMonitorUpdateDecodeErrorZ_clone(this.ptr);
		Result_ChannelMonitorUpdateDecodeErrorZ ret_hu_conv = Result_ChannelMonitorUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
