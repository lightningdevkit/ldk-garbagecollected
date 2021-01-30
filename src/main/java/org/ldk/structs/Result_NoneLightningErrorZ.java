package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_NoneLightningErrorZ extends CommonBase {
	private Result_NoneLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneLightningErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NoneLightningErrorZ_result_ok(ptr)) {
			return new Result_NoneLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneLightningErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneLightningErrorZ_OK extends Result_NoneLightningErrorZ {
		private Result_NoneLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
		public Result_NoneLightningErrorZ_OK() {
			this(null, bindings.CResult_NoneLightningErrorZ_ok());
		}
	}

	public static final class Result_NoneLightningErrorZ_Err extends Result_NoneLightningErrorZ {
		public final LightningError err;
		private Result_NoneLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_NoneLightningErrorZ_get_err(ptr);
			LightningError err_hu_conv = new LightningError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_NoneLightningErrorZ_Err(LightningError err) {
			this(null, bindings.CResult_NoneLightningErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
