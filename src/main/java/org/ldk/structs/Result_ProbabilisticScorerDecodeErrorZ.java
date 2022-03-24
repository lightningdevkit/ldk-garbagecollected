package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ProbabilisticScorerDecodeErrorZ extends CommonBase {
	private Result_ProbabilisticScorerDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ProbabilisticScorerDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ProbabilisticScorerDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ProbabilisticScorerDecodeErrorZ_is_ok(ptr)) {
			return new Result_ProbabilisticScorerDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ProbabilisticScorerDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ProbabilisticScorerDecodeErrorZ_OK extends Result_ProbabilisticScorerDecodeErrorZ {
		public final ProbabilisticScorer res;
		private Result_ProbabilisticScorerDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_ProbabilisticScorerDecodeErrorZ_get_ok(ptr);
			ProbabilisticScorer res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new ProbabilisticScorer(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ProbabilisticScorerDecodeErrorZ_Err extends Result_ProbabilisticScorerDecodeErrorZ {
		public final DecodeError err;
		private Result_ProbabilisticScorerDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_ProbabilisticScorerDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ProbabilisticScorerDecodeErrorZ in the success state.
	 */
	public static Result_ProbabilisticScorerDecodeErrorZ ok(ProbabilisticScoringParameters o_params, NetworkGraph o_network_graph) {
		long ret = bindings.CResult_ProbabilisticScorerDecodeErrorZ_ok(bindings.ProbabilisticScorer_new(o_params == null ? 0 : o_params.ptr & ~1, o_network_graph == null ? 0 : o_network_graph.ptr & ~1));
		Reference.reachabilityFence(o_params);
		Reference.reachabilityFence(o_network_graph);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ProbabilisticScorerDecodeErrorZ ret_hu_conv = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		;
		ret_hu_conv.ptrs_to.add(o_network_graph);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ProbabilisticScorerDecodeErrorZ in the error state.
	 */
	public static Result_ProbabilisticScorerDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ProbabilisticScorerDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ProbabilisticScorerDecodeErrorZ ret_hu_conv = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ProbabilisticScorerDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
