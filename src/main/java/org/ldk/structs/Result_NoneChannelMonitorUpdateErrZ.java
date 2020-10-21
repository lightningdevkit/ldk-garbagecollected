package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_NoneChannelMonitorUpdateErrZ extends CommonBase {
	private Result_NoneChannelMonitorUpdateErrZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_NoneChannelMonitorUpdateErrZ_free(ptr); super.finalize();
	}

	static Result_NoneChannelMonitorUpdateErrZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NoneChannelMonitorUpdateErrZ_result_ok(ptr)) {
			return new Result_NoneChannelMonitorUpdateErrZ_OK(null, ptr);
		} else {
			return new Result_NoneChannelMonitorUpdateErrZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneChannelMonitorUpdateErrZ_OK extends Result_NoneChannelMonitorUpdateErrZ {
		public byte res;
		private Result_NoneChannelMonitorUpdateErrZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_NoneChannelMonitorUpdateErrZ_get_ok(ptr);
		}

	}
	public static final class Result_NoneChannelMonitorUpdateErrZ_Err extends Result_NoneChannelMonitorUpdateErrZ {
		public LDKChannelMonitorUpdateErr err;
		private Result_NoneChannelMonitorUpdateErrZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_NoneChannelMonitorUpdateErrZ_get_err(ptr);
		}
	}
}
