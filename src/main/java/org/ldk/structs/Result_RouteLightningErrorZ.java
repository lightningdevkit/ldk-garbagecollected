package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_RouteLightningErrorZ extends CommonBase {
	private Result_RouteLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RouteLightningErrorZ_free(ptr); } super.finalize();
	}

	static Result_RouteLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RouteLightningErrorZ_result_ok(ptr)) {
			return new Result_RouteLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_RouteLightningErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RouteLightningErrorZ_OK extends Result_RouteLightningErrorZ {
		public final Route res;
		private Result_RouteLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_RouteLightningErrorZ_get_ok(ptr);
			Route res_hu_conv = new Route(null, res);
			this.res = res_hu_conv;
		}
		public Result_RouteLightningErrorZ_OK(Route res) {
			this(null, bindings.CResult_RouteLightningErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_RouteLightningErrorZ_Err extends Result_RouteLightningErrorZ {
		public final LightningError err;
		private Result_RouteLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_RouteLightningErrorZ_get_err(ptr);
			LightningError err_hu_conv = new LightningError(null, err);
			this.err = err_hu_conv;
		}
		public Result_RouteLightningErrorZ_Err(LightningError err) {
			this(null, bindings.CResult_RouteLightningErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
