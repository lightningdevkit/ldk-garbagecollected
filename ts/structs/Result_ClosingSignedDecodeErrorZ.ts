
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ClosingSignedDecodeErrorZ extends CommonBase {
	private Result_ClosingSignedDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ClosingSignedDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ClosingSignedDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ClosingSignedDecodeErrorZ_result_ok(ptr)) {
			return new Result_ClosingSignedDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ClosingSignedDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ClosingSignedDecodeErrorZ_OK extends Result_ClosingSignedDecodeErrorZ {
		public final ClosingSigned res;
		private Result_ClosingSignedDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ClosingSignedDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ClosingSigned = new ClosingSigned(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ClosingSignedDecodeErrorZ_Err extends Result_ClosingSignedDecodeErrorZ {
		public final DecodeError err;
		private Result_ClosingSignedDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ClosingSignedDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ClosingSignedDecodeErrorZ constructor_ok(ClosingSigned o) {
		number ret = bindings.CResult_ClosingSignedDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ClosingSignedDecodeErrorZ ret_hu_conv = Result_ClosingSignedDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_ClosingSignedDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ClosingSignedDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ClosingSignedDecodeErrorZ ret_hu_conv = Result_ClosingSignedDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_ClosingSignedDecodeErrorZ clone() {
		number ret = bindings.CResult_ClosingSignedDecodeErrorZ_clone(this.ptr);
		Result_ClosingSignedDecodeErrorZ ret_hu_conv = Result_ClosingSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
