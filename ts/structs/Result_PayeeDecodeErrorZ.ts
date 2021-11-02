
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PayeeDecodeErrorZ extends CommonBase {
	private Result_PayeeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PayeeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PayeeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PayeeDecodeErrorZ_result_ok(ptr)) {
			return new Result_PayeeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PayeeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PayeeDecodeErrorZ_OK extends Result_PayeeDecodeErrorZ {
		public final Payee res;
		private Result_PayeeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_PayeeDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: Payee = new Payee(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PayeeDecodeErrorZ_Err extends Result_PayeeDecodeErrorZ {
		public final DecodeError err;
		private Result_PayeeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_PayeeDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_PayeeDecodeErrorZ constructor_ok(Payee o) {
		number ret = bindings.CResult_PayeeDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_PayeeDecodeErrorZ ret_hu_conv = Result_PayeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PayeeDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_PayeeDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_PayeeDecodeErrorZ ret_hu_conv = Result_PayeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_PayeeDecodeErrorZ clone() {
		number ret = bindings.CResult_PayeeDecodeErrorZ_clone(this.ptr);
		Result_PayeeDecodeErrorZ ret_hu_conv = Result_PayeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
