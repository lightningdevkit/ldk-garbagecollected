package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

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
			long err = bindings.LDKCResult_NoneMonitorUpdateErrorZ_get_err(ptr);
			MonitorUpdateError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new MonitorUpdateError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NoneMonitorUpdateErrorZ in the success state.
	 */
	public static Result_NoneMonitorUpdateErrorZ ok() {
		long ret = bindings.CResult_NoneMonitorUpdateErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneMonitorUpdateErrorZ in the error state.
	 */
	public static Result_NoneMonitorUpdateErrorZ err(MonitorUpdateError e) {
		long ret = bindings.CResult_NoneMonitorUpdateErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneMonitorUpdateErrorZ_is_ok(this.ptr);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_NoneMonitorUpdateErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneMonitorUpdateErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneMonitorUpdateErrorZ clone() {
		long ret = bindings.CResult_NoneMonitorUpdateErrorZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneMonitorUpdateErrorZ ret_hu_conv = Result_NoneMonitorUpdateErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
