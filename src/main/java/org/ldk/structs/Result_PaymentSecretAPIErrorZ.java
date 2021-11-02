package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_PaymentSecretAPIErrorZ extends CommonBase {
	private Result_PaymentSecretAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentSecretAPIErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentSecretAPIErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PaymentSecretAPIErrorZ_result_ok(ptr)) {
			return new Result_PaymentSecretAPIErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentSecretAPIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentSecretAPIErrorZ_OK extends Result_PaymentSecretAPIErrorZ {
		public final byte[] res;
		private Result_PaymentSecretAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PaymentSecretAPIErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentSecretAPIErrorZ_Err extends Result_PaymentSecretAPIErrorZ {
		public final APIError err;
		private Result_PaymentSecretAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_PaymentSecretAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaymentSecretAPIErrorZ in the success state.
	 */
	public static Result_PaymentSecretAPIErrorZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentSecretAPIErrorZ_ok(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentSecretAPIErrorZ in the error state.
	 */
	public static Result_PaymentSecretAPIErrorZ err(APIError e) {
		long ret = bindings.CResult_PaymentSecretAPIErrorZ_err(e.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentSecretAPIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentSecretAPIErrorZ clone() {
		long ret = bindings.CResult_PaymentSecretAPIErrorZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
