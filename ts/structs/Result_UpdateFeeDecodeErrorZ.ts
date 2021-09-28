
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
	}

	public static Result_UpdateFeeDecodeErrorZ constructor_ok(UpdateFee o) {
		number ret = bindings.CResult_UpdateFeeDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_UpdateFeeDecodeErrorZ ret_hu_conv = Result_UpdateFeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_UpdateFeeDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_UpdateFeeDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_UpdateFeeDecodeErrorZ ret_hu_conv = Result_UpdateFeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_UpdateFeeDecodeErrorZ clone() {
		number ret = bindings.CResult_UpdateFeeDecodeErrorZ_clone(this.ptr);
		Result_UpdateFeeDecodeErrorZ ret_hu_conv = Result_UpdateFeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
