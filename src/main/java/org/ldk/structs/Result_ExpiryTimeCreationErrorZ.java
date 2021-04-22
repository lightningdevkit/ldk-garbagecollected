package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_ExpiryTimeCreationErrorZ extends CommonBase {
	private Result_ExpiryTimeCreationErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ExpiryTimeCreationErrorZ_free(ptr); } super.finalize();
	}

	static Result_ExpiryTimeCreationErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ExpiryTimeCreationErrorZ_result_ok(ptr)) {
			return new Result_ExpiryTimeCreationErrorZ_OK(null, ptr);
		} else {
			return new Result_ExpiryTimeCreationErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ExpiryTimeCreationErrorZ_OK extends Result_ExpiryTimeCreationErrorZ {
		public final ExpiryTime res;
		private Result_ExpiryTimeCreationErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ExpiryTimeCreationErrorZ_get_ok(ptr);
			ExpiryTime res_hu_conv = new ExpiryTime(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ExpiryTimeCreationErrorZ_Err extends Result_ExpiryTimeCreationErrorZ {
		public final LDKCreationError err;
		private Result_ExpiryTimeCreationErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_ExpiryTimeCreationErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_ExpiryTimeCreationErrorZ in the success state.
	 */
	public static Result_ExpiryTimeCreationErrorZ constructor_ok(ExpiryTime o) {
		long ret = bindings.CResult_ExpiryTimeCreationErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ExpiryTimeCreationErrorZ in the error state.
	 */
	public static Result_ExpiryTimeCreationErrorZ constructor_err(LDKCreationError e) {
		long ret = bindings.CResult_ExpiryTimeCreationErrorZ_err(e);
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ExpiryTimeCreationErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ExpiryTimeCreationErrorZ clone() {
		long ret = bindings.CResult_ExpiryTimeCreationErrorZ_clone(this.ptr);
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
