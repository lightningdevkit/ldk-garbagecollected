
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
			number res = bindings.LDKCResult_ScorerDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: Scorer = new Scorer(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ScorerDecodeErrorZ_Err extends Result_ScorerDecodeErrorZ {
		public final DecodeError err;
		private Result_ScorerDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ScorerDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ScorerDecodeErrorZ constructor_ok(ScoringParameters o_params) {
		number ret = bindings.CResult_ScorerDecodeErrorZ_ok(bindings.Scorer_new(o_params == null ? 0 : o_params.ptr & ~1));
		Result_ScorerDecodeErrorZ ret_hu_conv = Result_ScorerDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o_params);
// Due to rust's strict-ownership memory model, in some cases we need to "move"
// an object to pass exclusive ownership to the function being called.
// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
// at the FFI layer, creating a new object which Rust can claim ownership of
// However, in some cases (eg here), there is no way to clone an object, and thus
// we actually have to pass full ownership to Rust.
// Thus, after ret_hu_conv call, o_params is reset to null and is now a dummy object.
o_params.ptr = 0;
		return ret_hu_conv;
	}

	public static Result_ScorerDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ScorerDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ScorerDecodeErrorZ ret_hu_conv = Result_ScorerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_ScorerDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

}
