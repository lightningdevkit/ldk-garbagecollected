
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_BuiltCommitmentTransactionDecodeErrorZ extends CommonBase {
	private Result_BuiltCommitmentTransactionDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_BuiltCommitmentTransactionDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_result_ok(ptr)) {
			return new Result_BuiltCommitmentTransactionDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_BuiltCommitmentTransactionDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_BuiltCommitmentTransactionDecodeErrorZ_OK extends Result_BuiltCommitmentTransactionDecodeErrorZ {
		public final BuiltCommitmentTransaction res;
		private Result_BuiltCommitmentTransactionDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: BuiltCommitmentTransaction = new BuiltCommitmentTransaction(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_BuiltCommitmentTransactionDecodeErrorZ_Err extends Result_BuiltCommitmentTransactionDecodeErrorZ {
		public final DecodeError err;
		private Result_BuiltCommitmentTransactionDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_BuiltCommitmentTransactionDecodeErrorZ constructor_ok(BuiltCommitmentTransaction o) {
		number ret = bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_BuiltCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_BuiltCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_BuiltCommitmentTransactionDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_BuiltCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_BuiltCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_BuiltCommitmentTransactionDecodeErrorZ clone() {
		number ret = bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_clone(this.ptr);
		Result_BuiltCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_BuiltCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
