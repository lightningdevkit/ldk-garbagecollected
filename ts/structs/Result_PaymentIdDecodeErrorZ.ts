
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_PaymentIdDecodeErrorZ extends CommonBase {
	private Result_PaymentIdDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentIdDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PaymentIdDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PaymentIdDecodeErrorZ_result_ok(ptr)) {
			return new Result_PaymentIdDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PaymentIdDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentIdDecodeErrorZ_OK extends Result_PaymentIdDecodeErrorZ {
		public final PaymentId res;
		private Result_PaymentIdDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_PaymentIdDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: PaymentId = new PaymentId(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PaymentIdDecodeErrorZ_Err extends Result_PaymentIdDecodeErrorZ {
		public final DecodeError err;
		private Result_PaymentIdDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_PaymentIdDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_PaymentIdDecodeErrorZ constructor_ok(PaymentId o) {
		number ret = bindings.CResult_PaymentIdDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_PaymentIdDecodeErrorZ ret_hu_conv = Result_PaymentIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_PaymentIdDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_PaymentIdDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_PaymentIdDecodeErrorZ ret_hu_conv = Result_PaymentIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_PaymentIdDecodeErrorZ clone() {
		number ret = bindings.CResult_PaymentIdDecodeErrorZ_clone(this.ptr);
		Result_PaymentIdDecodeErrorZ ret_hu_conv = Result_PaymentIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
