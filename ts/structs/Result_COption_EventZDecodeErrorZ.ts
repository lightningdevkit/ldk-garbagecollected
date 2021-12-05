
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_COption_EventZDecodeErrorZ extends CommonBase {
	private Result_COption_EventZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_COption_EventZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_COption_EventZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_COption_EventZDecodeErrorZ_is_ok(ptr)) {
			return new Result_COption_EventZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_COption_EventZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_COption_EventZDecodeErrorZ_OK extends Result_COption_EventZDecodeErrorZ {
		public final Option_EventZ res;
		private Result_COption_EventZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_COption_EventZDecodeErrorZ_get_ok(ptr);
			Option_EventZ res_hu_conv = Option_EventZ.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_COption_EventZDecodeErrorZ_Err extends Result_COption_EventZDecodeErrorZ {
		public final DecodeError err;
		private Result_COption_EventZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_COption_EventZDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_COption_EventZDecodeErrorZ constructor_ok(Option_EventZ o) {
		number ret = bindings.CResult_COption_EventZDecodeErrorZ_ok(o.ptr);
		Result_COption_EventZDecodeErrorZ ret_hu_conv = Result_COption_EventZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_COption_EventZDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_COption_EventZDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_COption_EventZDecodeErrorZ ret_hu_conv = Result_COption_EventZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_COption_EventZDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_COption_EventZDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_COption_EventZDecodeErrorZ clone() {
		number ret = bindings.CResult_COption_EventZDecodeErrorZ_clone(this.ptr);
		Result_COption_EventZDecodeErrorZ ret_hu_conv = Result_COption_EventZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}