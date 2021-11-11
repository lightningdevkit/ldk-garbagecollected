
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_DelayedPaymentOutputDescriptorDecodeErrorZ extends CommonBase {
	private Result_DelayedPaymentOutputDescriptorDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_DelayedPaymentOutputDescriptorDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_is_ok(ptr)) {
			return new Result_DelayedPaymentOutputDescriptorDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_DelayedPaymentOutputDescriptorDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_DelayedPaymentOutputDescriptorDecodeErrorZ_OK extends Result_DelayedPaymentOutputDescriptorDecodeErrorZ {
		public final DelayedPaymentOutputDescriptor res;
		private Result_DelayedPaymentOutputDescriptorDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: DelayedPaymentOutputDescriptor = new DelayedPaymentOutputDescriptor(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_DelayedPaymentOutputDescriptorDecodeErrorZ_Err extends Result_DelayedPaymentOutputDescriptorDecodeErrorZ {
		public final DecodeError err;
		private Result_DelayedPaymentOutputDescriptorDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_DelayedPaymentOutputDescriptorDecodeErrorZ constructor_ok(DelayedPaymentOutputDescriptor o) {
		number ret = bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_DelayedPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_DelayedPaymentOutputDescriptorDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_DelayedPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_DelayedPaymentOutputDescriptorDecodeErrorZ clone() {
		number ret = bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_clone(this.ptr);
		Result_DelayedPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
