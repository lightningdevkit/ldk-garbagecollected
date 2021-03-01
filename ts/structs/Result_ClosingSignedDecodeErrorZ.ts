
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
		public Result_ClosingSignedDecodeErrorZ_OK(ClosingSigned res) {
			this(null, bindings.CResult_ClosingSignedDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
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
		public Result_ClosingSignedDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ClosingSignedDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
