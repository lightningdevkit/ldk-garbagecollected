
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NoneMonitorUpdateErrorZ extends CommonBase {
	private Result_NoneMonitorUpdateErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneMonitorUpdateErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneMonitorUpdateErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NoneMonitorUpdateErrorZ_result_ok(ptr)) {
			return new Result_NoneMonitorUpdateErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneMonitorUpdateErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneMonitorUpdateErrorZ_OK extends Result_NoneMonitorUpdateErrorZ {
		private Result_NoneMonitorUpdateErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
		public Result_NoneMonitorUpdateErrorZ_OK() {
			this(null, bindings.CResult_NoneMonitorUpdateErrorZ_ok());
		}
	}

	public static final class Result_NoneMonitorUpdateErrorZ_Err extends Result_NoneMonitorUpdateErrorZ {
		public final MonitorUpdateError err;
		private Result_NoneMonitorUpdateErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NoneMonitorUpdateErrorZ_get_err(ptr);
			const err_hu_conv: MonitorUpdateError = new MonitorUpdateError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_NoneMonitorUpdateErrorZ_Err(MonitorUpdateError err) {
			this(null, bindings.CResult_NoneMonitorUpdateErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
