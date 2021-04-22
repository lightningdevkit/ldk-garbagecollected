package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_PositiveTimestampCreationErrorZ extends CommonBase {
	private Result_PositiveTimestampCreationErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PositiveTimestampCreationErrorZ_free(ptr); } super.finalize();
	}

	static Result_PositiveTimestampCreationErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PositiveTimestampCreationErrorZ_result_ok(ptr)) {
			return new Result_PositiveTimestampCreationErrorZ_OK(null, ptr);
		} else {
			return new Result_PositiveTimestampCreationErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PositiveTimestampCreationErrorZ_OK extends Result_PositiveTimestampCreationErrorZ {
		public final PositiveTimestamp res;
		private Result_PositiveTimestampCreationErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_PositiveTimestampCreationErrorZ_get_ok(ptr);
			PositiveTimestamp res_hu_conv = new PositiveTimestamp(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PositiveTimestampCreationErrorZ_Err extends Result_PositiveTimestampCreationErrorZ {
		public final LDKCreationError err;
		private Result_PositiveTimestampCreationErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_PositiveTimestampCreationErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PositiveTimestampCreationErrorZ in the success state.
	 */
	public static Result_PositiveTimestampCreationErrorZ constructor_ok(PositiveTimestamp o) {
		long ret = bindings.CResult_PositiveTimestampCreationErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PositiveTimestampCreationErrorZ in the error state.
	 */
	public static Result_PositiveTimestampCreationErrorZ constructor_err(LDKCreationError e) {
		long ret = bindings.CResult_PositiveTimestampCreationErrorZ_err(e);
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PositiveTimestampCreationErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PositiveTimestampCreationErrorZ clone() {
		long ret = bindings.CResult_PositiveTimestampCreationErrorZ_clone(this.ptr);
		Result_PositiveTimestampCreationErrorZ ret_hu_conv = Result_PositiveTimestampCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
