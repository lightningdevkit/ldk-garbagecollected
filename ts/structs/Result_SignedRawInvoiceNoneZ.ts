
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_SignedRawInvoiceNoneZ extends CommonBase {
	private Result_SignedRawInvoiceNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SignedRawInvoiceNoneZ_free(ptr); } super.finalize();
	}

	static Result_SignedRawInvoiceNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SignedRawInvoiceNoneZ_result_ok(ptr)) {
			return new Result_SignedRawInvoiceNoneZ_OK(null, ptr);
		} else {
			return new Result_SignedRawInvoiceNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_SignedRawInvoiceNoneZ_OK extends Result_SignedRawInvoiceNoneZ {
		public final SignedRawInvoice res;
		private Result_SignedRawInvoiceNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_SignedRawInvoiceNoneZ_get_ok(ptr);
			const res_hu_conv: SignedRawInvoice = new SignedRawInvoice(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_SignedRawInvoiceNoneZ_Err extends Result_SignedRawInvoiceNoneZ {
		private Result_SignedRawInvoiceNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_SignedRawInvoiceNoneZ constructor_ok(SignedRawInvoice o) {
		number ret = bindings.CResult_SignedRawInvoiceNoneZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_SignedRawInvoiceNoneZ ret_hu_conv = Result_SignedRawInvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_SignedRawInvoiceNoneZ constructor_err() {
		number ret = bindings.CResult_SignedRawInvoiceNoneZ_err();
		Result_SignedRawInvoiceNoneZ ret_hu_conv = Result_SignedRawInvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_SignedRawInvoiceNoneZ clone() {
		number ret = bindings.CResult_SignedRawInvoiceNoneZ_clone(this.ptr);
		Result_SignedRawInvoiceNoneZ ret_hu_conv = Result_SignedRawInvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
