package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

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
		public Result_ErrorMessageDecodeErrorZ_OK(ErrorMessage res) {
			this(null, bindings.CResult_ErrorMessageDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
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
		public Result_ErrorMessageDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ErrorMessageDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
