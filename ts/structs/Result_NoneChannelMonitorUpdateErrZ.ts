
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NoneChannelMonitorUpdateErrZ extends CommonBase {
	private Result_NoneChannelMonitorUpdateErrZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneChannelMonitorUpdateErrZ_free(ptr); } super.finalize();
	}

	static Result_NoneChannelMonitorUpdateErrZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NoneChannelMonitorUpdateErrZ_result_ok(ptr)) {
			return new Result_NoneChannelMonitorUpdateErrZ_OK(null, ptr);
		} else {
			return new Result_NoneChannelMonitorUpdateErrZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneChannelMonitorUpdateErrZ_OK extends Result_NoneChannelMonitorUpdateErrZ {
		private Result_NoneChannelMonitorUpdateErrZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneChannelMonitorUpdateErrZ_Err extends Result_NoneChannelMonitorUpdateErrZ {
		public final ChannelMonitorUpdateErr err;
		private Result_NoneChannelMonitorUpdateErrZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_NoneChannelMonitorUpdateErrZ_get_err(ptr);
		}
	}

	public static Result_NoneChannelMonitorUpdateErrZ constructor_ok() {
		number ret = bindings.CResult_NoneChannelMonitorUpdateErrZ_ok();
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NoneChannelMonitorUpdateErrZ constructor_err(ChannelMonitorUpdateErr e) {
		number ret = bindings.CResult_NoneChannelMonitorUpdateErrZ_err(e);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NoneChannelMonitorUpdateErrZ clone() {
		number ret = bindings.CResult_NoneChannelMonitorUpdateErrZ_clone(this.ptr);
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
