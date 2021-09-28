
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_TxCreationKeysErrorZ extends CommonBase {
	private Result_TxCreationKeysErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TxCreationKeysErrorZ_free(ptr); } super.finalize();
	}

	static Result_TxCreationKeysErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_TxCreationKeysErrorZ_result_ok(ptr)) {
			return new Result_TxCreationKeysErrorZ_OK(null, ptr);
		} else {
			return new Result_TxCreationKeysErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_TxCreationKeysErrorZ_OK extends Result_TxCreationKeysErrorZ {
		public final TxCreationKeys res;
		private Result_TxCreationKeysErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_TxCreationKeysErrorZ_get_ok(ptr);
			const res_hu_conv: TxCreationKeys = new TxCreationKeys(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_TxCreationKeysErrorZ_Err extends Result_TxCreationKeysErrorZ {
		public final Secp256k1Error err;
		private Result_TxCreationKeysErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_TxCreationKeysErrorZ_get_err(ptr);
		}
	}

	public static Result_TxCreationKeysErrorZ constructor_ok(TxCreationKeys o) {
		number ret = bindings.CResult_TxCreationKeysErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_TxCreationKeysErrorZ ret_hu_conv = Result_TxCreationKeysErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_TxCreationKeysErrorZ constructor_err(Secp256k1Error e) {
		number ret = bindings.CResult_TxCreationKeysErrorZ_err(e);
		Result_TxCreationKeysErrorZ ret_hu_conv = Result_TxCreationKeysErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_TxCreationKeysErrorZ clone() {
		number ret = bindings.CResult_TxCreationKeysErrorZ_clone(this.ptr);
		Result_TxCreationKeysErrorZ ret_hu_conv = Result_TxCreationKeysErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
