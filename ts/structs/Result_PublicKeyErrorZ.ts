
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PublicKeyErrorZ extends CommonBase {
	private Result_PublicKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PublicKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_PublicKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PublicKeyErrorZ_result_ok(ptr)) {
			return new Result_PublicKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_PublicKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PublicKeyErrorZ_OK extends Result_PublicKeyErrorZ {
		public final Uint8Array res;
		private Result_PublicKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PublicKeyErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PublicKeyErrorZ_Err extends Result_PublicKeyErrorZ {
		public final LDKSecp256k1Error err;
		private Result_PublicKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_PublicKeyErrorZ_get_err(ptr);
		}
	}

	public static Result_PublicKeyErrorZ constructor__ok(Uint8Array o) {
		number ret = bindings.CResult_PublicKeyErrorZ_ok(o);
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PublicKeyErrorZ constructor__err(LDKSecp256k1Error e) {
		number ret = bindings.CResult_PublicKeyErrorZ_err(e);
		Result_PublicKeyErrorZ ret_hu_conv = Result_PublicKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
