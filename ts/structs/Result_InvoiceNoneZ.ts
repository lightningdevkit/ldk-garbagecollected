
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_InvoiceNoneZ extends CommonBase {
	private Result_InvoiceNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InvoiceNoneZ_free(ptr); } super.finalize();
	}

	static Result_InvoiceNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_InvoiceNoneZ_result_ok(ptr)) {
			return new Result_InvoiceNoneZ_OK(null, ptr);
		} else {
			return new Result_InvoiceNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_InvoiceNoneZ_OK extends Result_InvoiceNoneZ {
		public final Invoice res;
		private Result_InvoiceNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_InvoiceNoneZ_get_ok(ptr);
			const res_hu_conv: Invoice = new Invoice(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InvoiceNoneZ_Err extends Result_InvoiceNoneZ {
		private Result_InvoiceNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_InvoiceNoneZ constructor__ok(Invoice o) {
		number ret = bindings.CResult_InvoiceNoneZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_InvoiceNoneZ ret_hu_conv = Result_InvoiceNoneZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_InvoiceNoneZ constructor__err() {
		number ret = bindings.CResult_InvoiceNoneZ_err();
		Result_InvoiceNoneZ ret_hu_conv = Result_InvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_InvoiceNoneZ _clone() {
		number ret = bindings.CResult_InvoiceNoneZ_clone(this.ptr);
		Result_InvoiceNoneZ ret_hu_conv = Result_InvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
