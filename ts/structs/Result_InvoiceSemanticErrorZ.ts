
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_InvoiceSemanticErrorZ extends CommonBase {
	private Result_InvoiceSemanticErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InvoiceSemanticErrorZ_free(ptr); } super.finalize();
	}

	static Result_InvoiceSemanticErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_InvoiceSemanticErrorZ_is_ok(ptr)) {
			return new Result_InvoiceSemanticErrorZ_OK(null, ptr);
		} else {
			return new Result_InvoiceSemanticErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_InvoiceSemanticErrorZ_OK extends Result_InvoiceSemanticErrorZ {
		public final Invoice res;
		private Result_InvoiceSemanticErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_InvoiceSemanticErrorZ_get_ok(ptr);
			const res_hu_conv: Invoice = new Invoice(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InvoiceSemanticErrorZ_Err extends Result_InvoiceSemanticErrorZ {
		public final SemanticError err;
		private Result_InvoiceSemanticErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_InvoiceSemanticErrorZ_get_err(ptr);
		}
	}

	public static Result_InvoiceSemanticErrorZ constructor_ok(Invoice o) {
		number ret = bindings.CResult_InvoiceSemanticErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_InvoiceSemanticErrorZ ret_hu_conv = Result_InvoiceSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_InvoiceSemanticErrorZ constructor_err(SemanticError e) {
		number ret = bindings.CResult_InvoiceSemanticErrorZ_err(e);
		Result_InvoiceSemanticErrorZ ret_hu_conv = Result_InvoiceSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_InvoiceSemanticErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_InvoiceSemanticErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_InvoiceSemanticErrorZ clone() {
		number ret = bindings.CResult_InvoiceSemanticErrorZ_clone(this.ptr);
		Result_InvoiceSemanticErrorZ ret_hu_conv = Result_InvoiceSemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
