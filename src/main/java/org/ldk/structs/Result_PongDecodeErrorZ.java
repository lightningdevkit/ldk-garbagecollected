package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_PongDecodeErrorZ extends CommonBase {
	private Result_PongDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PongDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PongDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PongDecodeErrorZ_result_ok(ptr)) {
			return new Result_PongDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PongDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PongDecodeErrorZ_OK extends Result_PongDecodeErrorZ {
		public final Pong res;
		private Result_PongDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_PongDecodeErrorZ_get_ok(ptr);
			Pong res_hu_conv = new Pong(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PongDecodeErrorZ_Err extends Result_PongDecodeErrorZ {
		public final DecodeError err;
		private Result_PongDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_PongDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PongDecodeErrorZ in the success state.
	 */
	public static Result_PongDecodeErrorZ ok(Pong o) {
		long ret = bindings.CResult_PongDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PongDecodeErrorZ in the error state.
	 */
	public static Result_PongDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_PongDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PongDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PongDecodeErrorZ clone() {
		long ret = bindings.CResult_PongDecodeErrorZ_clone(this.ptr);
		Result_PongDecodeErrorZ ret_hu_conv = Result_PongDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
