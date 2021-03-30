package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_PublicKeyErrorZ extends CommonBase {
	private Result_PublicKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PublicKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_PublicKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PublicKeyErrorZ_result_ok(ptr)) {
			return new Result_PublicKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_PublicKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PublicKeyErrorZ_OK extends Result_PublicKeyErrorZ {
		public final byte[] res;
		private Result_PublicKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PublicKeyErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PublicKeyErrorZ_Err extends Result_PublicKeyErrorZ {
		public final LDKSecp256k1Error err;
		private Result_PublicKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_PublicKeyErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PublicKeyErrorZ in the success state.
	 */
	public static Result_PublicKeyErrorZ constructor_ok(byte[] o) {
		long ret = bindings.CResult_PublicKeyErrorZ_ok(o);
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PublicKeyErrorZ in the error state.
	 */
	public static Result_PublicKeyErrorZ constructor_err(LDKSecp256k1Error e) {
		long ret = bindings.CResult_PublicKeyErrorZ_err(e);
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
