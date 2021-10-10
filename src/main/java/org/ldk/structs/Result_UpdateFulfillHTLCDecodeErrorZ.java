package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_UpdateFulfillHTLCDecodeErrorZ extends CommonBase {
	private Result_UpdateFulfillHTLCDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UpdateFulfillHTLCDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UpdateFulfillHTLCDecodeErrorZ_result_ok(ptr)) {
			return new Result_UpdateFulfillHTLCDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UpdateFulfillHTLCDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UpdateFulfillHTLCDecodeErrorZ_OK extends Result_UpdateFulfillHTLCDecodeErrorZ {
		public final UpdateFulfillHTLC res;
		private Result_UpdateFulfillHTLCDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_UpdateFulfillHTLCDecodeErrorZ_get_ok(ptr);
			UpdateFulfillHTLC res_hu_conv = new UpdateFulfillHTLC(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_UpdateFulfillHTLCDecodeErrorZ_Err extends Result_UpdateFulfillHTLCDecodeErrorZ {
		public final DecodeError err;
		private Result_UpdateFulfillHTLCDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_UpdateFulfillHTLCDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_UpdateFulfillHTLCDecodeErrorZ in the success state.
	 */
	public static Result_UpdateFulfillHTLCDecodeErrorZ ok(UpdateFulfillHTLC o) {
		long ret = bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_UpdateFulfillHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_UpdateFulfillHTLCDecodeErrorZ in the error state.
	 */
	public static Result_UpdateFulfillHTLCDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_UpdateFulfillHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_UpdateFulfillHTLCDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_UpdateFulfillHTLCDecodeErrorZ clone() {
		long ret = bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_UpdateFulfillHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
