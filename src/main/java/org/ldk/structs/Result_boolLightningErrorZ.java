package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_boolLightningErrorZ extends CommonBase {
	private Result_boolLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_boolLightningErrorZ_free(ptr); } super.finalize();
	}

	static Result_boolLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_boolLightningErrorZ_result_ok(ptr)) {
			return new Result_boolLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_boolLightningErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_boolLightningErrorZ_OK extends Result_boolLightningErrorZ {
		public final boolean res;
		private Result_boolLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_boolLightningErrorZ_get_ok(ptr);
		}
		public Result_boolLightningErrorZ_OK(boolean res) {
			this(null, bindings.CResult_boolLightningErrorZ_ok(res));
		}
	}

	public static final class Result_boolLightningErrorZ_Err extends Result_boolLightningErrorZ {
		public final LightningError err;
		private Result_boolLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_boolLightningErrorZ_get_err(ptr);
			LightningError err_hu_conv = new LightningError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_boolLightningErrorZ_Err(LightningError err) {
			this(null, bindings.CResult_boolLightningErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
