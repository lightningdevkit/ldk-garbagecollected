
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_RecoverableSignatureNoneZ extends CommonBase {
	private Result_RecoverableSignatureNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RecoverableSignatureNoneZ_free(ptr); } super.finalize();
	}

	static Result_RecoverableSignatureNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RecoverableSignatureNoneZ_result_ok(ptr)) {
			return new Result_RecoverableSignatureNoneZ_OK(null, ptr);
		} else {
			return new Result_RecoverableSignatureNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_RecoverableSignatureNoneZ_OK extends Result_RecoverableSignatureNoneZ {
		public final Uint8Array res;
		private Result_RecoverableSignatureNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_RecoverableSignatureNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_RecoverableSignatureNoneZ_Err extends Result_RecoverableSignatureNoneZ {
		private Result_RecoverableSignatureNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_RecoverableSignatureNoneZ constructor_ok(Uint8Array arg) {
		number ret = bindings.CResult_RecoverableSignatureNoneZ_ok(arg);
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_RecoverableSignatureNoneZ constructor_err() {
		number ret = bindings.CResult_RecoverableSignatureNoneZ_err();
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_RecoverableSignatureNoneZ clone() {
		number ret = bindings.CResult_RecoverableSignatureNoneZ_clone(this.ptr);
		Result_RecoverableSignatureNoneZ ret_hu_conv = Result_RecoverableSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
