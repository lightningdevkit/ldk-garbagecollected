
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_COption_TypeZDecodeErrorZ extends CommonBase {
	private Result_COption_TypeZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_COption_TypeZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_COption_TypeZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_COption_TypeZDecodeErrorZ_result_ok(ptr)) {
			return new Result_COption_TypeZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_COption_TypeZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_COption_TypeZDecodeErrorZ_OK extends Result_COption_TypeZDecodeErrorZ {
		public final Option_TypeZ res;
		private Result_COption_TypeZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_COption_TypeZDecodeErrorZ_get_ok(ptr);
			Option_TypeZ res_hu_conv = Option_TypeZ.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_COption_TypeZDecodeErrorZ_Err extends Result_COption_TypeZDecodeErrorZ {
		public final DecodeError err;
		private Result_COption_TypeZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_COption_TypeZDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_COption_TypeZDecodeErrorZ constructor__ok(Option_TypeZ o) {
		number ret = bindings.CResult_COption_TypeZDecodeErrorZ_ok(o.ptr);
		Result_COption_TypeZDecodeErrorZ ret_hu_conv = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_COption_TypeZDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_COption_TypeZDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_COption_TypeZDecodeErrorZ ret_hu_conv = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_COption_TypeZDecodeErrorZ _clone() {
		number ret = bindings.CResult_COption_TypeZDecodeErrorZ_clone(this.ptr);
		Result_COption_TypeZDecodeErrorZ ret_hu_conv = Result_COption_TypeZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
