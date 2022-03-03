package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ScorerDecodeErrorZ extends CommonBase {
	private Result_ScorerDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ScorerDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ScorerDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ScorerDecodeErrorZ_is_ok(ptr)) {
			return new Result_ScorerDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ScorerDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ScorerDecodeErrorZ_OK extends Result_ScorerDecodeErrorZ {
		public final Scorer res;
		private Result_ScorerDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_ScorerDecodeErrorZ_get_ok(ptr);
			Scorer res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new Scorer(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ScorerDecodeErrorZ_Err extends Result_ScorerDecodeErrorZ {
		public final DecodeError err;
		private Result_ScorerDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_ScorerDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ScorerDecodeErrorZ in the success state.
	 */
	public static Result_ScorerDecodeErrorZ ok(ScoringParameters o_params) {
		long ret = bindings.CResult_ScorerDecodeErrorZ_ok(bindings.Scorer_new(o_params == null ? 0 : o_params.ptr & ~1));
		Reference.reachabilityFence(o_params);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScorerDecodeErrorZ ret_hu_conv = Result_ScorerDecodeErrorZ.constr_from_ptr(ret);
		;
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ScorerDecodeErrorZ in the error state.
	 */
	public static Result_ScorerDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ScorerDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScorerDecodeErrorZ ret_hu_conv = Result_ScorerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ScorerDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
