
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_UpdateFailHTLCDecodeErrorZ extends CommonBase {
	private Result_UpdateFailHTLCDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UpdateFailHTLCDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UpdateFailHTLCDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UpdateFailHTLCDecodeErrorZ_result_ok(ptr)) {
			return new Result_UpdateFailHTLCDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UpdateFailHTLCDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UpdateFailHTLCDecodeErrorZ_OK extends Result_UpdateFailHTLCDecodeErrorZ {
		public final UpdateFailHTLC res;
		private Result_UpdateFailHTLCDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_UpdateFailHTLCDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: UpdateFailHTLC = new UpdateFailHTLC(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_UpdateFailHTLCDecodeErrorZ_OK(UpdateFailHTLC res) {
			this(null, bindings.CResult_UpdateFailHTLCDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_UpdateFailHTLCDecodeErrorZ_Err extends Result_UpdateFailHTLCDecodeErrorZ {
		public final DecodeError err;
		private Result_UpdateFailHTLCDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_UpdateFailHTLCDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_UpdateFailHTLCDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_UpdateFailHTLCDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
