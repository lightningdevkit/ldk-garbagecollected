
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_TrustedClosingTransactionNoneZ extends CommonBase {
	private Result_TrustedClosingTransactionNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TrustedClosingTransactionNoneZ_free(ptr); } super.finalize();
	}

	static Result_TrustedClosingTransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TrustedClosingTransactionNoneZ_is_ok(ptr)) {
			return new Result_TrustedClosingTransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_TrustedClosingTransactionNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_TrustedClosingTransactionNoneZ_OK extends Result_TrustedClosingTransactionNoneZ {
		public final TrustedClosingTransaction res;
		private Result_TrustedClosingTransactionNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_TrustedClosingTransactionNoneZ_get_ok(ptr);
			const res_hu_conv: TrustedClosingTransaction = new TrustedClosingTransaction(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_TrustedClosingTransactionNoneZ_Err extends Result_TrustedClosingTransactionNoneZ {
		private Result_TrustedClosingTransactionNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_TrustedClosingTransactionNoneZ constructor_ok(TrustedClosingTransaction o) {
		number ret = bindings.CResult_TrustedClosingTransactionNoneZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_TrustedClosingTransactionNoneZ ret_hu_conv = Result_TrustedClosingTransactionNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, o is reset to null and is now a dummy object.
		o.ptr = 0;
		return ret_hu_conv;
	}

	public static Result_TrustedClosingTransactionNoneZ constructor_err() {
		number ret = bindings.CResult_TrustedClosingTransactionNoneZ_err();
		Result_TrustedClosingTransactionNoneZ ret_hu_conv = Result_TrustedClosingTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_TrustedClosingTransactionNoneZ_is_ok(this.ptr);
		return ret;
	}

}
