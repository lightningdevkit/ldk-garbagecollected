
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_COption_ClosureReasonZDecodeErrorZ extends CommonBase {
	private Result_COption_ClosureReasonZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_COption_ClosureReasonZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_COption_ClosureReasonZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_COption_ClosureReasonZDecodeErrorZ_is_ok(ptr)) {
			return new Result_COption_ClosureReasonZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_COption_ClosureReasonZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_COption_ClosureReasonZDecodeErrorZ_OK extends Result_COption_ClosureReasonZDecodeErrorZ {
		public final Option_ClosureReasonZ res;
		private Result_COption_ClosureReasonZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_COption_ClosureReasonZDecodeErrorZ_get_ok(ptr);
			Option_ClosureReasonZ res_hu_conv = Option_ClosureReasonZ.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_COption_ClosureReasonZDecodeErrorZ_Err extends Result_COption_ClosureReasonZDecodeErrorZ {
		public final DecodeError err;
		private Result_COption_ClosureReasonZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_COption_ClosureReasonZDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_COption_ClosureReasonZDecodeErrorZ constructor_ok(Option_ClosureReasonZ o) {
		number ret = bindings.CResult_COption_ClosureReasonZDecodeErrorZ_ok(o.ptr);
		Result_COption_ClosureReasonZDecodeErrorZ ret_hu_conv = Result_COption_ClosureReasonZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_COption_ClosureReasonZDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_COption_ClosureReasonZDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_COption_ClosureReasonZDecodeErrorZ ret_hu_conv = Result_COption_ClosureReasonZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_COption_ClosureReasonZDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_COption_ClosureReasonZDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_COption_ClosureReasonZDecodeErrorZ clone() {
		number ret = bindings.CResult_COption_ClosureReasonZDecodeErrorZ_clone(this.ptr);
		Result_COption_ClosureReasonZDecodeErrorZ ret_hu_conv = Result_COption_ClosureReasonZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
