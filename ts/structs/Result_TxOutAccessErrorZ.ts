
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_TxOutAccessErrorZ extends CommonBase {
	private Result_TxOutAccessErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TxOutAccessErrorZ_free(ptr); } super.finalize();
	}

	static Result_TxOutAccessErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TxOutAccessErrorZ_is_ok(ptr)) {
			return new Result_TxOutAccessErrorZ_OK(null, ptr);
		} else {
			return new Result_TxOutAccessErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_TxOutAccessErrorZ_OK extends Result_TxOutAccessErrorZ {
		public final TxOut res;
		private Result_TxOutAccessErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_TxOutAccessErrorZ_get_ok(ptr);
			TxOut res_conv = new TxOut(null, res);
			this.res = res_conv;
		}
	}

	public static final class Result_TxOutAccessErrorZ_Err extends Result_TxOutAccessErrorZ {
		public final AccessError err;
		private Result_TxOutAccessErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_TxOutAccessErrorZ_get_err(ptr);
		}
	}

	public static Result_TxOutAccessErrorZ constructor_ok(TxOut o) {
		number ret = bindings.CResult_TxOutAccessErrorZ_ok(o.ptr);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_TxOutAccessErrorZ constructor_err(AccessError e) {
		number ret = bindings.CResult_TxOutAccessErrorZ_err(e);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_TxOutAccessErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_TxOutAccessErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_TxOutAccessErrorZ clone() {
		number ret = bindings.CResult_TxOutAccessErrorZ_clone(this.ptr);
		Result_TxOutAccessErrorZ ret_hu_conv = Result_TxOutAccessErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
