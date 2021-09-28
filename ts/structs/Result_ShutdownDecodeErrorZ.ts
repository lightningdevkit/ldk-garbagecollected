
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ShutdownDecodeErrorZ extends CommonBase {
	private Result_ShutdownDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ShutdownDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ShutdownDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ShutdownDecodeErrorZ_result_ok(ptr)) {
			return new Result_ShutdownDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ShutdownDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ShutdownDecodeErrorZ_OK extends Result_ShutdownDecodeErrorZ {
		public final Shutdown res;
		private Result_ShutdownDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ShutdownDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: Shutdown = new Shutdown(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ShutdownDecodeErrorZ_Err extends Result_ShutdownDecodeErrorZ {
		public final DecodeError err;
		private Result_ShutdownDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ShutdownDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ShutdownDecodeErrorZ constructor_ok(Shutdown o) {
		number ret = bindings.CResult_ShutdownDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ShutdownDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ShutdownDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_ShutdownDecodeErrorZ clone() {
		number ret = bindings.CResult_ShutdownDecodeErrorZ_clone(this.ptr);
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
