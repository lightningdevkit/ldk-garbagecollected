
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_TrustedCommitmentTransactionNoneZ extends CommonBase {
	private Result_TrustedCommitmentTransactionNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TrustedCommitmentTransactionNoneZ_free(ptr); } super.finalize();
	}

	static Result_TrustedCommitmentTransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_TrustedCommitmentTransactionNoneZ_result_ok(ptr)) {
			return new Result_TrustedCommitmentTransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_TrustedCommitmentTransactionNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_TrustedCommitmentTransactionNoneZ_OK extends Result_TrustedCommitmentTransactionNoneZ {
		public final TrustedCommitmentTransaction res;
		private Result_TrustedCommitmentTransactionNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_TrustedCommitmentTransactionNoneZ_get_ok(ptr);
			const res_hu_conv: TrustedCommitmentTransaction = new TrustedCommitmentTransaction(null, res);
			this.res = res_hu_conv;
		}
		public Result_TrustedCommitmentTransactionNoneZ_OK(TrustedCommitmentTransaction res) {
			this(null, bindings.CResult_TrustedCommitmentTransactionNoneZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_TrustedCommitmentTransactionNoneZ_Err extends Result_TrustedCommitmentTransactionNoneZ {
		private Result_TrustedCommitmentTransactionNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
		public Result_TrustedCommitmentTransactionNoneZ_Err() {
			this(null, bindings.CResult_TrustedCommitmentTransactionNoneZ_err());
		}
	}
}
