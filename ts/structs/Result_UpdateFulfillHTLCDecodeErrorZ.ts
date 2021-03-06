
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_UpdateFulfillHTLCDecodeErrorZ extends CommonBase {
	private Result_UpdateFulfillHTLCDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UpdateFulfillHTLCDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UpdateFulfillHTLCDecodeErrorZ_result_ok(ptr)) {
			return new Result_UpdateFulfillHTLCDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UpdateFulfillHTLCDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UpdateFulfillHTLCDecodeErrorZ_OK extends Result_UpdateFulfillHTLCDecodeErrorZ {
		public final UpdateFulfillHTLC res;
		private Result_UpdateFulfillHTLCDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_UpdateFulfillHTLCDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: UpdateFulfillHTLC = new UpdateFulfillHTLC(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_UpdateFulfillHTLCDecodeErrorZ_Err extends Result_UpdateFulfillHTLCDecodeErrorZ {
		public final DecodeError err;
		private Result_UpdateFulfillHTLCDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_UpdateFulfillHTLCDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_UpdateFulfillHTLCDecodeErrorZ constructor__ok(UpdateFulfillHTLC o) {
		number ret = bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_UpdateFulfillHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_UpdateFulfillHTLCDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_UpdateFulfillHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_UpdateFulfillHTLCDecodeErrorZ _clone() {
		number ret = bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_clone(this.ptr);
		Result_UpdateFulfillHTLCDecodeErrorZ ret_hu_conv = Result_UpdateFulfillHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
