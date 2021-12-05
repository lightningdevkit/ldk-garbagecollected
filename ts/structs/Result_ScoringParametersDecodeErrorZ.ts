
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
			number res = bindings.LDKCResult_ScoringParametersDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ScoringParameters = new ScoringParameters(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ScoringParametersDecodeErrorZ_Err extends Result_ScoringParametersDecodeErrorZ {
		public final DecodeError err;
		private Result_ScoringParametersDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ScoringParametersDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ScoringParametersDecodeErrorZ constructor_ok(number o_base_penalty_msat_arg, number o_failure_penalty_msat_arg, number o_overuse_penalty_start_1024th_arg, number o_overuse_penalty_msat_per_1024th_arg, number o_failure_penalty_half_life_arg) {
		number ret = bindings.CResult_ScoringParametersDecodeErrorZ_ok(bindings.ScoringParameters_new(o_base_penalty_msat_arg, o_failure_penalty_msat_arg, o_overuse_penalty_start_1024th_arg, o_overuse_penalty_msat_per_1024th_arg, o_failure_penalty_half_life_arg));
		Result_ScoringParametersDecodeErrorZ ret_hu_conv = Result_ScoringParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ScoringParametersDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ScoringParametersDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ScoringParametersDecodeErrorZ ret_hu_conv = Result_ScoringParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_ScoringParametersDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

}
