
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_InvoiceSignOrCreationErrorZ extends CommonBase {
	private Result_InvoiceSignOrCreationErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InvoiceSignOrCreationErrorZ_free(ptr); } super.finalize();
	}

	static Result_InvoiceSignOrCreationErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_InvoiceSignOrCreationErrorZ_result_ok(ptr)) {
			return new Result_InvoiceSignOrCreationErrorZ_OK(null, ptr);
		} else {
			return new Result_InvoiceSignOrCreationErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_InvoiceSignOrCreationErrorZ_OK extends Result_InvoiceSignOrCreationErrorZ {
		public final Invoice res;
		private Result_InvoiceSignOrCreationErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_InvoiceSignOrCreationErrorZ_get_ok(ptr);
			const res_hu_conv: Invoice = new Invoice(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InvoiceSignOrCreationErrorZ_Err extends Result_InvoiceSignOrCreationErrorZ {
		public final SignOrCreationError err;
		private Result_InvoiceSignOrCreationErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_InvoiceSignOrCreationErrorZ_get_err(ptr);
			SignOrCreationError err_hu_conv = SignOrCreationError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_InvoiceSignOrCreationErrorZ constructor_ok(Invoice o) {
		number ret = bindings.CResult_InvoiceSignOrCreationErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_InvoiceSignOrCreationErrorZ ret_hu_conv = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_InvoiceSignOrCreationErrorZ constructor_err(SignOrCreationError e) {
		number ret = bindings.CResult_InvoiceSignOrCreationErrorZ_err(e.ptr);
		Result_InvoiceSignOrCreationErrorZ ret_hu_conv = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_InvoiceSignOrCreationErrorZ clone() {
		number ret = bindings.CResult_InvoiceSignOrCreationErrorZ_clone(this.ptr);
		Result_InvoiceSignOrCreationErrorZ ret_hu_conv = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
