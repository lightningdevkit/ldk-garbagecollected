
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_HolderCommitmentTransactionDecodeErrorZ extends CommonBase {
	private Result_HolderCommitmentTransactionDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_HolderCommitmentTransactionDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_HolderCommitmentTransactionDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_HolderCommitmentTransactionDecodeErrorZ_result_ok(ptr)) {
			return new Result_HolderCommitmentTransactionDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_HolderCommitmentTransactionDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_HolderCommitmentTransactionDecodeErrorZ_OK extends Result_HolderCommitmentTransactionDecodeErrorZ {
		public final HolderCommitmentTransaction res;
		private Result_HolderCommitmentTransactionDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_HolderCommitmentTransactionDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_HolderCommitmentTransactionDecodeErrorZ_Err extends Result_HolderCommitmentTransactionDecodeErrorZ {
		public final DecodeError err;
		private Result_HolderCommitmentTransactionDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_HolderCommitmentTransactionDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_HolderCommitmentTransactionDecodeErrorZ constructor_ok(HolderCommitmentTransaction o) {
		number ret = bindings.CResult_HolderCommitmentTransactionDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_HolderCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_HolderCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_HolderCommitmentTransactionDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_HolderCommitmentTransactionDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_HolderCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_HolderCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_HolderCommitmentTransactionDecodeErrorZ clone() {
		number ret = bindings.CResult_HolderCommitmentTransactionDecodeErrorZ_clone(this.ptr);
		Result_HolderCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_HolderCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
