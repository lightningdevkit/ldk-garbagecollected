
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_StringErrorZ extends CommonBase {
	private Result_StringErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_StringErrorZ_free(ptr); } super.finalize();
	}

	static Result_StringErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_StringErrorZ_is_ok(ptr)) {
			return new Result_StringErrorZ_OK(null, ptr);
		} else {
			return new Result_StringErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_StringErrorZ_OK extends Result_StringErrorZ {
		public final String res;
		private Result_StringErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_StringErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_StringErrorZ_Err extends Result_StringErrorZ {
		public final Secp256k1Error err;
		private Result_StringErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_StringErrorZ_get_err(ptr);
		}
	}

	public static Result_StringErrorZ constructor_ok(String o) {
		number ret = bindings.CResult_StringErrorZ_ok(o);
		Result_StringErrorZ ret_hu_conv = Result_StringErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_StringErrorZ constructor_err(Secp256k1Error e) {
		number ret = bindings.CResult_StringErrorZ_err(e);
		Result_StringErrorZ ret_hu_conv = Result_StringErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_StringErrorZ_is_ok(this.ptr);
		return ret;
	}

}
