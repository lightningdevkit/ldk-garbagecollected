
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_CVec_CVec_u8ZZNoneZ extends CommonBase {
	private Result_CVec_CVec_u8ZZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_CVec_u8ZZNoneZ_free(ptr); } super.finalize();
	}

	static Result_CVec_CVec_u8ZZNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CVec_CVec_u8ZZNoneZ_result_ok(ptr)) {
			return new Result_CVec_CVec_u8ZZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_CVec_u8ZZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_CVec_u8ZZNoneZ_OK extends Result_CVec_CVec_u8ZZNoneZ {
		public final Uint8Array[] res;
		private Result_CVec_CVec_u8ZZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_CVec_CVec_u8ZZNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_CVec_CVec_u8ZZNoneZ_Err extends Result_CVec_CVec_u8ZZNoneZ {
		private Result_CVec_CVec_u8ZZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_CVec_CVec_u8ZZNoneZ constructor__ok(Uint8Array[] o) {
		number ret = bindings.CResult_CVec_CVec_u8ZZNoneZ_ok(o);
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_CVec_CVec_u8ZZNoneZ constructor__err() {
		number ret = bindings.CResult_CVec_CVec_u8ZZNoneZ_err();
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_CVec_CVec_u8ZZNoneZ _clone() {
		number ret = bindings.CResult_CVec_CVec_u8ZZNoneZ_clone(this.ptr);
		Result_CVec_CVec_u8ZZNoneZ ret_hu_conv = Result_CVec_CVec_u8ZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
