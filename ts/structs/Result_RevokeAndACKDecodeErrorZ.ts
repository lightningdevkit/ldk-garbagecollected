
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_RevokeAndACKDecodeErrorZ extends CommonBase {
	private Result_RevokeAndACKDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RevokeAndACKDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_RevokeAndACKDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_RevokeAndACKDecodeErrorZ_result_ok(ptr)) {
			return new Result_RevokeAndACKDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RevokeAndACKDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RevokeAndACKDecodeErrorZ_OK extends Result_RevokeAndACKDecodeErrorZ {
		public final RevokeAndACK res;
		private Result_RevokeAndACKDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_RevokeAndACKDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: RevokeAndACK = new RevokeAndACK(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RevokeAndACKDecodeErrorZ_Err extends Result_RevokeAndACKDecodeErrorZ {
		public final DecodeError err;
		private Result_RevokeAndACKDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_RevokeAndACKDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_RevokeAndACKDecodeErrorZ constructor_ok(RevokeAndACK o) {
		number ret = bindings.CResult_RevokeAndACKDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_RevokeAndACKDecodeErrorZ ret_hu_conv = Result_RevokeAndACKDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_RevokeAndACKDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_RevokeAndACKDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_RevokeAndACKDecodeErrorZ ret_hu_conv = Result_RevokeAndACKDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_RevokeAndACKDecodeErrorZ clone() {
		number ret = bindings.CResult_RevokeAndACKDecodeErrorZ_clone(this.ptr);
		Result_RevokeAndACKDecodeErrorZ ret_hu_conv = Result_RevokeAndACKDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
