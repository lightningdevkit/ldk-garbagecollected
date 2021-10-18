package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_PaymentIdDecodeErrorZ extends CommonBase {
	private Result_PaymentIdDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentIdDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentIdDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PaymentIdDecodeErrorZ_result_ok(ptr)) {
			return new Result_PaymentIdDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentIdDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentIdDecodeErrorZ_OK extends Result_PaymentIdDecodeErrorZ {
		public final PaymentId res;
		private Result_PaymentIdDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_PaymentIdDecodeErrorZ_get_ok(ptr);
			PaymentId res_hu_conv = new PaymentId(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PaymentIdDecodeErrorZ_Err extends Result_PaymentIdDecodeErrorZ {
		public final DecodeError err;
		private Result_PaymentIdDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_PaymentIdDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentIdDecodeErrorZ in the success state.
	 */
	public static Result_PaymentIdDecodeErrorZ ok(PaymentId o) {
		long ret = bindings.CResult_PaymentIdDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_PaymentIdDecodeErrorZ ret_hu_conv = Result_PaymentIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentIdDecodeErrorZ in the error state.
	 */
	public static Result_PaymentIdDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_PaymentIdDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_PaymentIdDecodeErrorZ ret_hu_conv = Result_PaymentIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentIdDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentIdDecodeErrorZ clone() {
		long ret = bindings.CResult_PaymentIdDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_PaymentIdDecodeErrorZ ret_hu_conv = Result_PaymentIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
