
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
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_TrustedCommitmentTransactionNoneZ_OK(TrustedCommitmentTransaction res) {
			this(null, bindings.CResult_TrustedCommitmentTransactionNoneZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
			// Due to rust's strict-ownership memory model, in some cases we need to "move"
			// an object to pass exclusive ownership to the function being called.
			// In most cases, we avoid this being visible in GC'd languages by cloning the object
			// at the FFI layer, creating a new object which Rust can claim ownership of
			// However, in some cases (eg here), there is no way to clone an object, and thus
			// we actually have to pass full ownership to Rust.
			// Thus, after this call, res is reset to null and is now a dummy object.
			res.ptr = 0;
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
