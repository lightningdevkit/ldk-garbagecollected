
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_CVec_SignatureZNoneZ extends CommonBase {
	private Result_CVec_SignatureZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_SignatureZNoneZ_free(ptr); } super.finalize();
	}

	static Result_CVec_SignatureZNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CVec_SignatureZNoneZ_result_ok(ptr)) {
			return new Result_CVec_SignatureZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_SignatureZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_SignatureZNoneZ_OK extends Result_CVec_SignatureZNoneZ {
		public final Uint8Array[] res;
		private Result_CVec_SignatureZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_CVec_SignatureZNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_CVec_SignatureZNoneZ_Err extends Result_CVec_SignatureZNoneZ {
		private Result_CVec_SignatureZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_CVec_SignatureZNoneZ constructor__ok(Uint8Array[] o) {
		number ret = bindings.CResult_CVec_SignatureZNoneZ_ok(o);
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_CVec_SignatureZNoneZ constructor__err() {
		number ret = bindings.CResult_CVec_SignatureZNoneZ_err();
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_CVec_SignatureZNoneZ _clone() {
		number ret = bindings.CResult_CVec_SignatureZNoneZ_clone(this.ptr);
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
