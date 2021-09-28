
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_HTLCOutputInCommitmentDecodeErrorZ extends CommonBase {
	private Result_HTLCOutputInCommitmentDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_HTLCOutputInCommitmentDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_HTLCOutputInCommitmentDecodeErrorZ_result_ok(ptr)) {
			return new Result_HTLCOutputInCommitmentDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_HTLCOutputInCommitmentDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_HTLCOutputInCommitmentDecodeErrorZ_OK extends Result_HTLCOutputInCommitmentDecodeErrorZ {
		public final HTLCOutputInCommitment res;
		private Result_HTLCOutputInCommitmentDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_HTLCOutputInCommitmentDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: HTLCOutputInCommitment = new HTLCOutputInCommitment(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_HTLCOutputInCommitmentDecodeErrorZ_Err extends Result_HTLCOutputInCommitmentDecodeErrorZ {
		public final DecodeError err;
		private Result_HTLCOutputInCommitmentDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_HTLCOutputInCommitmentDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_HTLCOutputInCommitmentDecodeErrorZ constructor_ok(HTLCOutputInCommitment o) {
		number ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_HTLCOutputInCommitmentDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_HTLCOutputInCommitmentDecodeErrorZ clone() {
		number ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_clone(this.ptr);
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
