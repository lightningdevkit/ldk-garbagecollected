
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_StaticPaymentOutputDescriptorDecodeErrorZ extends CommonBase {
	private Result_StaticPaymentOutputDescriptorDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_StaticPaymentOutputDescriptorDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ_result_ok(ptr)) {
			return new Result_StaticPaymentOutputDescriptorDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_StaticPaymentOutputDescriptorDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_StaticPaymentOutputDescriptorDecodeErrorZ_OK extends Result_StaticPaymentOutputDescriptorDecodeErrorZ {
		public final StaticPaymentOutputDescriptor res;
		private Result_StaticPaymentOutputDescriptorDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: StaticPaymentOutputDescriptor = new StaticPaymentOutputDescriptor(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_StaticPaymentOutputDescriptorDecodeErrorZ_Err extends Result_StaticPaymentOutputDescriptorDecodeErrorZ {
		public final DecodeError err;
		private Result_StaticPaymentOutputDescriptorDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_StaticPaymentOutputDescriptorDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_StaticPaymentOutputDescriptorDecodeErrorZ constructor_ok(StaticPaymentOutputDescriptor o) {
		number ret = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_StaticPaymentOutputDescriptorDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_StaticPaymentOutputDescriptorDecodeErrorZ clone() {
		number ret = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_clone(this.ptr);
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
