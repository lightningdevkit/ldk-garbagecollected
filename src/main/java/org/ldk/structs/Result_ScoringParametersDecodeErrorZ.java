package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_ScoringParametersDecodeErrorZ extends CommonBase {
	private Result_ScoringParametersDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ScoringParametersDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ScoringParametersDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ScoringParametersDecodeErrorZ_is_ok(ptr)) {
			return new Result_ScoringParametersDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ScoringParametersDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ScoringParametersDecodeErrorZ_OK extends Result_ScoringParametersDecodeErrorZ {
		public final ScoringParameters res;
		private Result_ScoringParametersDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ScoringParametersDecodeErrorZ_get_ok(ptr);
			ScoringParameters res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new ScoringParameters(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ScoringParametersDecodeErrorZ_Err extends Result_ScoringParametersDecodeErrorZ {
		public final DecodeError err;
		private Result_ScoringParametersDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ScoringParametersDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ScoringParametersDecodeErrorZ in the success state.
	 */
	public static Result_ScoringParametersDecodeErrorZ ok(long o_base_penalty_msat_arg, long o_failure_penalty_msat_arg, long o_failure_penalty_half_life_arg) {
		long ret = bindings.CResult_ScoringParametersDecodeErrorZ_ok(bindings.ScoringParameters_new(o_base_penalty_msat_arg, o_failure_penalty_msat_arg, o_failure_penalty_half_life_arg));
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScoringParametersDecodeErrorZ ret_hu_conv = Result_ScoringParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ScoringParametersDecodeErrorZ in the error state.
	 */
	public static Result_ScoringParametersDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ScoringParametersDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScoringParametersDecodeErrorZ ret_hu_conv = Result_ScoringParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ScoringParametersDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

}
