
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_UpdateFeeDecodeErrorZ extends CommonBase {
	private Result_UpdateFeeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UpdateFeeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UpdateFeeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UpdateFeeDecodeErrorZ_result_ok(ptr)) {
			return new Result_UpdateFeeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UpdateFeeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UpdateFeeDecodeErrorZ_OK extends Result_UpdateFeeDecodeErrorZ {
		public final UpdateFee res;
		private Result_UpdateFeeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_UpdateFeeDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: UpdateFee = new UpdateFee(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_UpdateFeeDecodeErrorZ_OK(UpdateFee res) {
			this(null, bindings.CResult_UpdateFeeDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_UpdateFeeDecodeErrorZ_Err extends Result_UpdateFeeDecodeErrorZ {
		public final DecodeError err;
		private Result_UpdateFeeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_UpdateFeeDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_UpdateFeeDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_UpdateFeeDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
