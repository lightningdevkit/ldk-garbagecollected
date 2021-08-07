package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_ErrorMessageDecodeErrorZ extends CommonBase {
	private Result_ErrorMessageDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ErrorMessageDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ErrorMessageDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ErrorMessageDecodeErrorZ_result_ok(ptr)) {
			return new Result_ErrorMessageDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ErrorMessageDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ErrorMessageDecodeErrorZ_OK extends Result_ErrorMessageDecodeErrorZ {
		public final ErrorMessage res;
		private Result_ErrorMessageDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ErrorMessageDecodeErrorZ_get_ok(ptr);
			ErrorMessage res_hu_conv = new ErrorMessage(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ErrorMessageDecodeErrorZ_Err extends Result_ErrorMessageDecodeErrorZ {
		public final DecodeError err;
		private Result_ErrorMessageDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ErrorMessageDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ErrorMessageDecodeErrorZ in the success state.
	 */
	public static Result_ErrorMessageDecodeErrorZ ok(ErrorMessage o) {
		long ret = bindings.CResult_ErrorMessageDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_ErrorMessageDecodeErrorZ ret_hu_conv = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ErrorMessageDecodeErrorZ in the error state.
	 */
	public static Result_ErrorMessageDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ErrorMessageDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_ErrorMessageDecodeErrorZ ret_hu_conv = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ErrorMessageDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ErrorMessageDecodeErrorZ clone() {
		long ret = bindings.CResult_ErrorMessageDecodeErrorZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		Result_ErrorMessageDecodeErrorZ ret_hu_conv = Result_ErrorMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
