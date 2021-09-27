
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_TxCreationKeysDecodeErrorZ extends CommonBase {
	private Result_TxCreationKeysDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TxCreationKeysDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_TxCreationKeysDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_TxCreationKeysDecodeErrorZ_result_ok(ptr)) {
			return new Result_TxCreationKeysDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_TxCreationKeysDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_TxCreationKeysDecodeErrorZ_OK extends Result_TxCreationKeysDecodeErrorZ {
		public final TxCreationKeys res;
		private Result_TxCreationKeysDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_TxCreationKeysDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: TxCreationKeys = new TxCreationKeys(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_TxCreationKeysDecodeErrorZ_Err extends Result_TxCreationKeysDecodeErrorZ {
		public final DecodeError err;
		private Result_TxCreationKeysDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_TxCreationKeysDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_TxCreationKeysDecodeErrorZ constructor_ok(TxCreationKeys o) {
		number ret = bindings.CResult_TxCreationKeysDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_TxCreationKeysDecodeErrorZ ret_hu_conv = Result_TxCreationKeysDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_TxCreationKeysDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_TxCreationKeysDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_TxCreationKeysDecodeErrorZ ret_hu_conv = Result_TxCreationKeysDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_TxCreationKeysDecodeErrorZ clone() {
		number ret = bindings.CResult_TxCreationKeysDecodeErrorZ_clone(this.ptr);
		Result_TxCreationKeysDecodeErrorZ ret_hu_conv = Result_TxCreationKeysDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
