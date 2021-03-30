
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_UpdateAddHTLCDecodeErrorZ extends CommonBase {
	private Result_UpdateAddHTLCDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UpdateAddHTLCDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UpdateAddHTLCDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UpdateAddHTLCDecodeErrorZ_result_ok(ptr)) {
			return new Result_UpdateAddHTLCDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UpdateAddHTLCDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UpdateAddHTLCDecodeErrorZ_OK extends Result_UpdateAddHTLCDecodeErrorZ {
		public final UpdateAddHTLC res;
		private Result_UpdateAddHTLCDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_UpdateAddHTLCDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: UpdateAddHTLC = new UpdateAddHTLC(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_UpdateAddHTLCDecodeErrorZ_Err extends Result_UpdateAddHTLCDecodeErrorZ {
		public final DecodeError err;
		private Result_UpdateAddHTLCDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_UpdateAddHTLCDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_UpdateAddHTLCDecodeErrorZ constructor__ok(UpdateAddHTLC o) {
		number ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_UpdateAddHTLCDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_UpdateAddHTLCDecodeErrorZ _clone() {
		number ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_clone(this.ptr);
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
