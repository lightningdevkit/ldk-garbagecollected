
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_SpendableOutputDescriptorDecodeErrorZ extends CommonBase {
	private Result_SpendableOutputDescriptorDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_SpendableOutputDescriptorDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SpendableOutputDescriptorDecodeErrorZ_result_ok(ptr)) {
			return new Result_SpendableOutputDescriptorDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_SpendableOutputDescriptorDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SpendableOutputDescriptorDecodeErrorZ_OK extends Result_SpendableOutputDescriptorDecodeErrorZ {
		public final SpendableOutputDescriptor res;
		private Result_SpendableOutputDescriptorDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_ok(ptr);
			SpendableOutputDescriptor res_hu_conv = SpendableOutputDescriptor.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_SpendableOutputDescriptorDecodeErrorZ_Err extends Result_SpendableOutputDescriptorDecodeErrorZ {
		public final DecodeError err;
		private Result_SpendableOutputDescriptorDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_SpendableOutputDescriptorDecodeErrorZ constructor__ok(SpendableOutputDescriptor o) {
		number ret = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_ok(o.ptr);
		Result_SpendableOutputDescriptorDecodeErrorZ ret_hu_conv = Result_SpendableOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_SpendableOutputDescriptorDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_SpendableOutputDescriptorDecodeErrorZ ret_hu_conv = Result_SpendableOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_SpendableOutputDescriptorDecodeErrorZ _clone() {
		number ret = bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_clone(this.ptr);
		Result_SpendableOutputDescriptorDecodeErrorZ ret_hu_conv = Result_SpendableOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
