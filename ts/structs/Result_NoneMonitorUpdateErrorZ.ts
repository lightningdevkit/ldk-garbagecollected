
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NoneMonitorUpdateErrorZ extends CommonBase {
	private Result_NoneMonitorUpdateErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneMonitorUpdateErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneMonitorUpdateErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneMonitorUpdateErrorZ_is_ok(ptr)) {
			return new Result_NoneMonitorUpdateErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneMonitorUpdateErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneMonitorUpdateErrorZ_OK extends Result_NoneMonitorUpdateErrorZ {
		private Result_NoneMonitorUpdateErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
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
	}

	public static Result_NoneMonitorUpdateErrorZ constructor_ok() {
		number ret = bindings.CResult_NoneMonitorUpdateErrorZ_ok();
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NoneMonitorUpdateErrorZ constructor_err(MonitorUpdateError e) {
		number ret = bindings.CResult_NoneMonitorUpdateErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneMonitorUpdateErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_NoneMonitorUpdateErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_NoneMonitorUpdateErrorZ clone() {
		number ret = bindings.CResult_NoneMonitorUpdateErrorZ_clone(this.ptr);
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
