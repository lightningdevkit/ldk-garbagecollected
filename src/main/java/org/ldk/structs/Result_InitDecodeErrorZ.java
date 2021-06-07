package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_InitDecodeErrorZ extends CommonBase {
	private Result_InitDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InitDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_InitDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_InitDecodeErrorZ_result_ok(ptr)) {
			return new Result_InitDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_InitDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_InitDecodeErrorZ_OK extends Result_InitDecodeErrorZ {
		public final Init res;
		private Result_InitDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_InitDecodeErrorZ_get_ok(ptr);
			Init res_hu_conv = new Init(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InitDecodeErrorZ_Err extends Result_InitDecodeErrorZ {
		public final DecodeError err;
		private Result_InitDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_InitDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_InitDecodeErrorZ in the success state.
	 */
	public static Result_InitDecodeErrorZ ok(Init o) {
		long ret = bindings.CResult_InitDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_InitDecodeErrorZ ret_hu_conv = Result_InitDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InitDecodeErrorZ in the error state.
	 */
	public static Result_InitDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_InitDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_InitDecodeErrorZ ret_hu_conv = Result_InitDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InitDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_InitDecodeErrorZ clone() {
		long ret = bindings.CResult_InitDecodeErrorZ_clone(this.ptr);
		Result_InitDecodeErrorZ ret_hu_conv = Result_InitDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
