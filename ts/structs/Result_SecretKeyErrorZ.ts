
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_SecretKeyErrorZ extends CommonBase {
	private Result_SecretKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SecretKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_SecretKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SecretKeyErrorZ_result_ok(ptr)) {
			return new Result_SecretKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_SecretKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SecretKeyErrorZ_OK extends Result_SecretKeyErrorZ {
		public final Uint8Array res;
		private Result_SecretKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_SecretKeyErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_SecretKeyErrorZ_Err extends Result_SecretKeyErrorZ {
		public final Secp256k1Error err;
		private Result_SecretKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_SecretKeyErrorZ_get_err(ptr);
		}
	}

	public static Result_SecretKeyErrorZ constructor__ok(Uint8Array o) {
		number ret = bindings.CResult_SecretKeyErrorZ_ok(o);
		Result_SecretKeyErrorZ ret_hu_conv = Result_SecretKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_SecretKeyErrorZ constructor__err(Secp256k1Error e) {
		number ret = bindings.CResult_SecretKeyErrorZ_err(e);
		Result_SecretKeyErrorZ ret_hu_conv = Result_SecretKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
