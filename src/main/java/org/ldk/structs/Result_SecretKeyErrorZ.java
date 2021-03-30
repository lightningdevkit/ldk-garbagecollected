package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_SecretKeyErrorZ extends CommonBase {
	private Result_SecretKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SecretKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_SecretKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SecretKeyErrorZ_result_ok(ptr)) {
			return new Result_SecretKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_SecretKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SecretKeyErrorZ_OK extends Result_SecretKeyErrorZ {
		public final byte[] res;
		private Result_SecretKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_SecretKeyErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_SecretKeyErrorZ_Err extends Result_SecretKeyErrorZ {
		public final LDKSecp256k1Error err;
		private Result_SecretKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_SecretKeyErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_SecretKeyErrorZ in the success state.
	 */
	public static Result_SecretKeyErrorZ constructor_ok(byte[] o) {
		long ret = bindings.CResult_SecretKeyErrorZ_ok(o);
		Result_SecretKeyErrorZ ret_hu_conv = Result_SecretKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SecretKeyErrorZ in the error state.
	 */
	public static Result_SecretKeyErrorZ constructor_err(LDKSecp256k1Error e) {
		long ret = bindings.CResult_SecretKeyErrorZ_err(e);
		Result_SecretKeyErrorZ ret_hu_conv = Result_SecretKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
