
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
		public Result_TxCreationKeysErrorZ_OK(TxCreationKeys res) {
			this(null, bindings.CResult_TxCreationKeysErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_TxCreationKeysErrorZ_Err extends Result_TxCreationKeysErrorZ {
		public final LDKSecp256k1Error err;
		private Result_TxCreationKeysErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_TxCreationKeysErrorZ_get_err(ptr);
		}
		public Result_TxCreationKeysErrorZ_Err(LDKSecp256k1Error err) {
			this(null, bindings.CResult_TxCreationKeysErrorZ_err(err));
		}
	}
}
