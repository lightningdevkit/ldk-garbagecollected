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
			org.ldk.structs.ProbabilisticScorer res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.ProbabilisticScorer(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ProbabilisticScorerDecodeErrorZ_Err extends Result_ProbabilisticScorerDecodeErrorZ {
		public final DecodeError err;
		private Result_ProbabilisticScorerDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_ProbabilisticScorerDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ProbabilisticScorerDecodeErrorZ in the success state.
	 */
	public static Result_ProbabilisticScorerDecodeErrorZ ok(ProbabilisticScoringParameters o_params, NetworkGraph o_network_graph, Logger o_logger) {
		long ret = bindings.CResult_ProbabilisticScorerDecodeErrorZ_ok(bindings.ProbabilisticScorer_new(o_params == null ? 0 : o_params.ptr, o_network_graph == null ? 0 : o_network_graph.ptr, o_logger == null ? 0 : o_logger.ptr));
		Reference.reachabilityFence(o_params);
		Reference.reachabilityFence(o_network_graph);
		Reference.reachabilityFence(o_logger);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ProbabilisticScorerDecodeErrorZ ret_hu_conv = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o_params); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o_network_graph); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o_logger); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ProbabilisticScorerDecodeErrorZ in the error state.
	 */
	public static Result_ProbabilisticScorerDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_ProbabilisticScorerDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ProbabilisticScorerDecodeErrorZ ret_hu_conv = Result_ProbabilisticScorerDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
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
