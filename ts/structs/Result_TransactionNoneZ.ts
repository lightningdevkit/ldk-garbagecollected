
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_TransactionNoneZ extends CommonBase {
	private Result_TransactionNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TransactionNoneZ_free(ptr); } super.finalize();
	}

	static Result_TransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_TransactionNoneZ_result_ok(ptr)) {
			return new Result_TransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_TransactionNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_TransactionNoneZ_OK extends Result_TransactionNoneZ {
		public final Uint8Array res;
		private Result_TransactionNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_TransactionNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_TransactionNoneZ_Err extends Result_TransactionNoneZ {
		private Result_TransactionNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_TransactionNoneZ constructor__ok(Uint8Array o) {
		number ret = bindings.CResult_TransactionNoneZ_ok(o);
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_TransactionNoneZ constructor__err() {
		number ret = bindings.CResult_TransactionNoneZ_err();
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_TransactionNoneZ _clone() {
		number ret = bindings.CResult_TransactionNoneZ_clone(this.ptr);
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
