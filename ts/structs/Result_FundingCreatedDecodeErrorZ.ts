
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_FundingCreatedDecodeErrorZ extends CommonBase {
	private Result_FundingCreatedDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_FundingCreatedDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_FundingCreatedDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_FundingCreatedDecodeErrorZ_result_ok(ptr)) {
			return new Result_FundingCreatedDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_FundingCreatedDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_FundingCreatedDecodeErrorZ_OK extends Result_FundingCreatedDecodeErrorZ {
		public final FundingCreated res;
		private Result_FundingCreatedDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_FundingCreatedDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: FundingCreated = new FundingCreated(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_FundingCreatedDecodeErrorZ_Err extends Result_FundingCreatedDecodeErrorZ {
		public final DecodeError err;
		private Result_FundingCreatedDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_FundingCreatedDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_FundingCreatedDecodeErrorZ constructor_ok(FundingCreated o) {
		number ret = bindings.CResult_FundingCreatedDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_FundingCreatedDecodeErrorZ ret_hu_conv = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_FundingCreatedDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_FundingCreatedDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_FundingCreatedDecodeErrorZ ret_hu_conv = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_FundingCreatedDecodeErrorZ clone() {
		number ret = bindings.CResult_FundingCreatedDecodeErrorZ_clone(this.ptr);
		Result_FundingCreatedDecodeErrorZ ret_hu_conv = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
