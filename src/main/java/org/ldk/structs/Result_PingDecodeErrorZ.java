package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_PingDecodeErrorZ extends CommonBase {
	private Result_PingDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PingDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PingDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PingDecodeErrorZ_result_ok(ptr)) {
			return new Result_PingDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PingDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PingDecodeErrorZ_OK extends Result_PingDecodeErrorZ {
		public final Ping res;
		private Result_PingDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_PingDecodeErrorZ_get_ok(ptr);
			Ping res_hu_conv = new Ping(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PingDecodeErrorZ_Err extends Result_PingDecodeErrorZ {
		public final DecodeError err;
		private Result_PingDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_PingDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PingDecodeErrorZ in the success state.
	 */
	public static Result_PingDecodeErrorZ constructor_ok(Ping o) {
		long ret = bindings.CResult_PingDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_PingDecodeErrorZ ret_hu_conv = Result_PingDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PingDecodeErrorZ in the error state.
	 */
	public static Result_PingDecodeErrorZ constructor_err(DecodeError e) {
		long ret = bindings.CResult_PingDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_PingDecodeErrorZ ret_hu_conv = Result_PingDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PingDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PingDecodeErrorZ clone() {
		long ret = bindings.CResult_PingDecodeErrorZ_clone(this.ptr);
		Result_PingDecodeErrorZ ret_hu_conv = Result_PingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
