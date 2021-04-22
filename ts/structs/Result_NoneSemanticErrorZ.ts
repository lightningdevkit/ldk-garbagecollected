
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NoneSemanticErrorZ extends CommonBase {
	private Result_NoneSemanticErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneSemanticErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneSemanticErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NoneSemanticErrorZ_result_ok(ptr)) {
			return new Result_NoneSemanticErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneSemanticErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneSemanticErrorZ_OK extends Result_NoneSemanticErrorZ {
		private Result_NoneSemanticErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneSemanticErrorZ_Err extends Result_NoneSemanticErrorZ {
		public final LDKSemanticError err;
		private Result_NoneSemanticErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_NoneSemanticErrorZ_get_err(ptr);
		}
	}

	public static Result_NoneSemanticErrorZ constructor__ok() {
		number ret = bindings.CResult_NoneSemanticErrorZ_ok();
		Result_NoneSemanticErrorZ ret_hu_conv = Result_NoneSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NoneSemanticErrorZ constructor__err(LDKSemanticError e) {
		number ret = bindings.CResult_NoneSemanticErrorZ_err(e);
		Result_NoneSemanticErrorZ ret_hu_conv = Result_NoneSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NoneSemanticErrorZ _clone() {
		number ret = bindings.CResult_NoneSemanticErrorZ_clone(this.ptr);
		Result_NoneSemanticErrorZ ret_hu_conv = Result_NoneSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
