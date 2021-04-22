package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_StringErrorZ extends CommonBase {
	private Result_StringErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_StringErrorZ_free(ptr); } super.finalize();
	}

	static Result_StringErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_StringErrorZ_result_ok(ptr)) {
			return new Result_StringErrorZ_OK(null, ptr);
		} else {
			return new Result_StringErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_StringErrorZ_OK extends Result_StringErrorZ {
		public final String res;
		private Result_StringErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_StringErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_StringErrorZ_Err extends Result_StringErrorZ {
		public final LDKSecp256k1Error err;
		private Result_StringErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_StringErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_StringErrorZ in the success state.
	 */
	public static Result_StringErrorZ constructor_ok(String o) {
		long ret = bindings.CResult_StringErrorZ_ok(o);
		Result_StringErrorZ ret_hu_conv = Result_StringErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_StringErrorZ in the error state.
	 */
	public static Result_StringErrorZ constructor_err(LDKSecp256k1Error e) {
		long ret = bindings.CResult_StringErrorZ_err(e);
		Result_StringErrorZ ret_hu_conv = Result_StringErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
