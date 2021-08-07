package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_InitFeaturesDecodeErrorZ extends CommonBase {
	private Result_InitFeaturesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InitFeaturesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_InitFeaturesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_InitFeaturesDecodeErrorZ_result_ok(ptr)) {
			return new Result_InitFeaturesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_InitFeaturesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_InitFeaturesDecodeErrorZ_OK extends Result_InitFeaturesDecodeErrorZ {
		public final InitFeatures res;
		private Result_InitFeaturesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_InitFeaturesDecodeErrorZ_get_ok(ptr);
			InitFeatures res_hu_conv = new InitFeatures(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InitFeaturesDecodeErrorZ_Err extends Result_InitFeaturesDecodeErrorZ {
		public final DecodeError err;
		private Result_InitFeaturesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_InitFeaturesDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_InitFeaturesDecodeErrorZ in the success state.
	 */
	public static Result_InitFeaturesDecodeErrorZ ok(InitFeatures o) {
		long ret = bindings.CResult_InitFeaturesDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_InitFeaturesDecodeErrorZ ret_hu_conv = Result_InitFeaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InitFeaturesDecodeErrorZ in the error state.
	 */
	public static Result_InitFeaturesDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_InitFeaturesDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_InitFeaturesDecodeErrorZ ret_hu_conv = Result_InitFeaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

}
