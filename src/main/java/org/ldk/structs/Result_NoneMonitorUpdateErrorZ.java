package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_NoneMonitorUpdateErrorZ extends CommonBase {
	private Result_NoneMonitorUpdateErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_NoneMonitorUpdateErrorZ_free(ptr); super.finalize();
	}

	static Result_NoneMonitorUpdateErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NoneMonitorUpdateErrorZ_result_ok(ptr)) {
			return new Result_NoneMonitorUpdateErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneMonitorUpdateErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneMonitorUpdateErrorZ_OK extends Result_NoneMonitorUpdateErrorZ {
		public byte res;
		private Result_NoneMonitorUpdateErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_NoneMonitorUpdateErrorZ_get_ok(ptr);
		}

	}
	public static final class Result_NoneMonitorUpdateErrorZ_Err extends Result_NoneMonitorUpdateErrorZ {
		public MonitorUpdateError err;
		private Result_NoneMonitorUpdateErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_NoneMonitorUpdateErrorZ_get_err(ptr);
			MonitorUpdateError err_hu_conv = new MonitorUpdateError(null, err);
			this.err = err_hu_conv;
		}
	}
}
