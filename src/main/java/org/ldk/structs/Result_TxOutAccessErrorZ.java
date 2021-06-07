package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_TxOutAccessErrorZ extends CommonBase {
	private Result_TxOutAccessErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TxOutAccessErrorZ_free(ptr); } super.finalize();
	}

	static Result_TxOutAccessErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_TxOutAccessErrorZ_result_ok(ptr)) {
			return new Result_TxOutAccessErrorZ_OK(null, ptr);
		} else {
			return new Result_TxOutAccessErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_TxOutAccessErrorZ_OK extends Result_TxOutAccessErrorZ {
		public final TxOut res;
		private Result_TxOutAccessErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_TxOutAccessErrorZ_get_ok(ptr);
			TxOut res_conv = new TxOut(null, res);
			this.res = res_conv;
		}
	}

	public static final class Result_TxOutAccessErrorZ_Err extends Result_TxOutAccessErrorZ {
		public final AccessError err;
		private Result_TxOutAccessErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_TxOutAccessErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_TxOutAccessErrorZ in the success state.
	 */
	public static Result_TxOutAccessErrorZ ok(TxOut o) {
		long ret = bindings.CResult_TxOutAccessErrorZ_ok(o.ptr);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TxOutAccessErrorZ in the error state.
	 */
	public static Result_TxOutAccessErrorZ err(AccessError e) {
		long ret = bindings.CResult_TxOutAccessErrorZ_err(e);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TxOutAccessErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_TxOutAccessErrorZ clone() {
		long ret = bindings.CResult_TxOutAccessErrorZ_clone(this.ptr);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
