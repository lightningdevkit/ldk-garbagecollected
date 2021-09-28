package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_PayeePubKeyErrorZ extends CommonBase {
	private Result_PayeePubKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PayeePubKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_PayeePubKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PayeePubKeyErrorZ_result_ok(ptr)) {
			return new Result_PayeePubKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_PayeePubKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PayeePubKeyErrorZ_OK extends Result_PayeePubKeyErrorZ {
		public final PayeePubKey res;
		private Result_PayeePubKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_PayeePubKeyErrorZ_get_ok(ptr);
			PayeePubKey res_hu_conv = new PayeePubKey(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PayeePubKeyErrorZ_Err extends Result_PayeePubKeyErrorZ {
		public final Secp256k1Error err;
		private Result_PayeePubKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_PayeePubKeyErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PayeePubKeyErrorZ in the success state.
	 */
	public static Result_PayeePubKeyErrorZ ok(PayeePubKey o) {
		long ret = bindings.CResult_PayeePubKeyErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PayeePubKeyErrorZ in the error state.
	 */
	public static Result_PayeePubKeyErrorZ err(org.ldk.enums.Secp256k1Error e) {
		long ret = bindings.CResult_PayeePubKeyErrorZ_err(e);
		if (ret < 1024) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PayeePubKeyErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PayeePubKeyErrorZ clone() {
		long ret = bindings.CResult_PayeePubKeyErrorZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
