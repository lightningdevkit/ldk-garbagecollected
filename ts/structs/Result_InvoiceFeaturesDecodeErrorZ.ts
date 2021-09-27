
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_InvoiceFeaturesDecodeErrorZ extends CommonBase {
	private Result_InvoiceFeaturesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InvoiceFeaturesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_InvoiceFeaturesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_InvoiceFeaturesDecodeErrorZ_result_ok(ptr)) {
			return new Result_InvoiceFeaturesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_InvoiceFeaturesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_InvoiceFeaturesDecodeErrorZ_OK extends Result_InvoiceFeaturesDecodeErrorZ {
		public final InvoiceFeatures res;
		private Result_InvoiceFeaturesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_InvoiceFeaturesDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: InvoiceFeatures = new InvoiceFeatures(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InvoiceFeaturesDecodeErrorZ_Err extends Result_InvoiceFeaturesDecodeErrorZ {
		public final DecodeError err;
		private Result_InvoiceFeaturesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_InvoiceFeaturesDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_InvoiceFeaturesDecodeErrorZ constructor_ok(InvoiceFeatures o) {
		number ret = bindings.CResult_InvoiceFeaturesDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_InvoiceFeaturesDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_InvoiceFeaturesDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

}
