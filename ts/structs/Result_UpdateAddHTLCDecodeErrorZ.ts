
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_UpdateAddHTLCDecodeErrorZ extends CommonBase {
	private Result_UpdateAddHTLCDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UpdateAddHTLCDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UpdateAddHTLCDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_UpdateAddHTLCDecodeErrorZ_is_ok(ptr)) {
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

	public static Result_UpdateAddHTLCDecodeErrorZ constructor_ok(UpdateAddHTLC o) {
		number ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_UpdateAddHTLCDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_UpdateAddHTLCDecodeErrorZ clone() {
		number ret = bindings.CResult_UpdateAddHTLCDecodeErrorZ_clone(this.ptr);
		Result_UpdateAddHTLCDecodeErrorZ ret_hu_conv = Result_UpdateAddHTLCDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
