package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_UpdateAddHTLCDecodeErrorZ extends CommonBase {
	private Result_UpdateAddHTLCDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UpdateAddHTLCDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UpdateAddHTLCDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UpdateAddHTLCDecodeErrorZ_result_ok(ptr)) {
			return new Result_UpdateAddHTLCDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UpdateAddHTLCDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UpdateAddHTLCDecodeErrorZ_OK extends Result_UpdateAddHTLCDecodeErrorZ {
		public final UpdateAddHTLC res;
		private Result_UpdateAddHTLCDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_UpdateAddHTLCDecodeErrorZ_get_ok(ptr);
			UpdateAddHTLC res_hu_conv = new UpdateAddHTLC(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_UpdateAddHTLCDecodeErrorZ_Err extends Result_UpdateAddHTLCDecodeErrorZ {
		public final DecodeError err;
		private Result_UpdateAddHTLCDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_UpdateAddHTLCDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_UpdateAddHTLCDecodeErrorZ in the success state.
	 */
	public static Result_UpdateAddHTLCDecodeErrorZ constructor_ok(UpdateAddHTLC o) {
		long ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_UpdateAddHTLCDecodeErrorZ in the error state.
	 */
	public static Result_UpdateAddHTLCDecodeErrorZ constructor_err(DecodeError e) {
		long ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_UpdateAddHTLCDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_UpdateAddHTLCDecodeErrorZ clone() {
		long ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_clone(this.ptr);
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
