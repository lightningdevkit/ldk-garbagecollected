package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_RoutingFeesDecodeErrorZ extends CommonBase {
	private Result_RoutingFeesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RoutingFeesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_RoutingFeesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RoutingFeesDecodeErrorZ_result_ok(ptr)) {
			return new Result_RoutingFeesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RoutingFeesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RoutingFeesDecodeErrorZ_OK extends Result_RoutingFeesDecodeErrorZ {
		public final RoutingFees res;
		private Result_RoutingFeesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_RoutingFeesDecodeErrorZ_get_ok(ptr);
			RoutingFees res_hu_conv = new RoutingFees(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RoutingFeesDecodeErrorZ_Err extends Result_RoutingFeesDecodeErrorZ {
		public final DecodeError err;
		private Result_RoutingFeesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_RoutingFeesDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_RoutingFeesDecodeErrorZ in the success state.
	 */
	public static Result_RoutingFeesDecodeErrorZ ok(RoutingFees o) {
		long ret = bindings.CResult_RoutingFeesDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RoutingFeesDecodeErrorZ in the error state.
	 */
	public static Result_RoutingFeesDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_RoutingFeesDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RoutingFeesDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RoutingFeesDecodeErrorZ clone() {
		long ret = bindings.CResult_RoutingFeesDecodeErrorZ_clone(this.ptr);
		Result_RoutingFeesDecodeErrorZ ret_hu_conv = Result_RoutingFeesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
