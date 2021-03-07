package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_NoneAPIErrorZ extends CommonBase {
	private Result_NoneAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneAPIErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NoneAPIErrorZ_result_ok(ptr)) {
			return new Result_NoneAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneAPIErrorZ_OK extends Result_NoneAPIErrorZ {
		private Result_NoneAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
		public Result_NoneAPIErrorZ_OK() {
			this(null, bindings.CResult_NoneAPIErrorZ_ok());
		}
	}

	public static final class Result_NoneAPIErrorZ_Err extends Result_NoneAPIErrorZ {
		public final APIError err;
		private Result_NoneAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_NoneAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_NoneAPIErrorZ_Err(APIError err) {
			this(null, bindings.CResult_NoneAPIErrorZ_err(err.ptr));
		}
	}
}
