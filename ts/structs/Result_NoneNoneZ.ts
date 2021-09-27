
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NoneNoneZ extends CommonBase {
	private Result_NoneNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneNoneZ_free(ptr); } super.finalize();
	}

	static Result_NoneNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NoneNoneZ_result_ok(ptr)) {
			return new Result_NoneNoneZ_OK(null, ptr);
		} else {
			return new Result_NoneNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneNoneZ_OK extends Result_NoneNoneZ {
		private Result_NoneNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneNoneZ_Err extends Result_NoneNoneZ {
		private Result_NoneNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_NoneNoneZ constructor_ok() {
		number ret = bindings.CResult_NoneNoneZ_ok();
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NoneNoneZ constructor_err() {
		number ret = bindings.CResult_NoneNoneZ_err();
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NoneNoneZ clone() {
		number ret = bindings.CResult_NoneNoneZ_clone(this.ptr);
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
