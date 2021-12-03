
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PayeePubKeyErrorZ extends CommonBase {
	private Result_PayeePubKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PayeePubKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_PayeePubKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PayeePubKeyErrorZ_is_ok(ptr)) {
			return new Result_PayeePubKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_PayeePubKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PayeePubKeyErrorZ_OK extends Result_PayeePubKeyErrorZ {
		public final PayeePubKey res;
		private Result_PayeePubKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_PayeePubKeyErrorZ_get_ok(ptr);
			const res_hu_conv: PayeePubKey = new PayeePubKey(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PayeePubKeyErrorZ_Err extends Result_PayeePubKeyErrorZ {
		public final Secp256k1Error err;
		private Result_PayeePubKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_PayeePubKeyErrorZ_get_err(ptr);
		}
	}

	public static Result_PayeePubKeyErrorZ constructor_ok(PayeePubKey o) {
		number ret = bindings.CResult_PayeePubKeyErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PayeePubKeyErrorZ constructor_err(Secp256k1Error e) {
		number ret = bindings.CResult_PayeePubKeyErrorZ_err(e);
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_PayeePubKeyErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_PayeePubKeyErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_PayeePubKeyErrorZ clone() {
		number ret = bindings.CResult_PayeePubKeyErrorZ_clone(this.ptr);
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
