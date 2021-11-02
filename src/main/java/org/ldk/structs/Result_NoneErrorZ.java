package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_NoneErrorZ extends CommonBase {
	private Result_NoneErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NoneErrorZ_result_ok(ptr)) {
			return new Result_NoneErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneErrorZ_OK extends Result_NoneErrorZ {
		private Result_NoneErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneErrorZ_Err extends Result_NoneErrorZ {
		public final IOError err;
		private Result_NoneErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_NoneErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_NoneErrorZ in the success state.
	 */
	public static Result_NoneErrorZ ok() {
		long ret = bindings.CResult_NoneErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneErrorZ in the error state.
	 */
	public static Result_NoneErrorZ err(org.ldk.enums.IOError e) {
		long ret = bindings.CResult_NoneErrorZ_err(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneErrorZ clone() {
		long ret = bindings.CResult_NoneErrorZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneErrorZ ret_hu_conv = Result_NoneErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
