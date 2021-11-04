
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ShutdownScriptInvalidShutdownScriptZ extends CommonBase {
	private Result_ShutdownScriptInvalidShutdownScriptZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_free(ptr); } super.finalize();
	}

	static Result_ShutdownScriptInvalidShutdownScriptZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ShutdownScriptInvalidShutdownScriptZ_result_ok(ptr)) {
			return new Result_ShutdownScriptInvalidShutdownScriptZ_OK(null, ptr);
		} else {
			return new Result_ShutdownScriptInvalidShutdownScriptZ_Err(null, ptr);
		}
	}
	public static final class Result_ShutdownScriptInvalidShutdownScriptZ_OK extends Result_ShutdownScriptInvalidShutdownScriptZ {
		public final ShutdownScript res;
		private Result_ShutdownScriptInvalidShutdownScriptZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ShutdownScriptInvalidShutdownScriptZ_get_ok(ptr);
			const res_hu_conv: ShutdownScript = new ShutdownScript(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ShutdownScriptInvalidShutdownScriptZ_Err extends Result_ShutdownScriptInvalidShutdownScriptZ {
		public final InvalidShutdownScript err;
		private Result_ShutdownScriptInvalidShutdownScriptZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ShutdownScriptInvalidShutdownScriptZ_get_err(ptr);
			const err_hu_conv: InvalidShutdownScript = new InvalidShutdownScript(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ShutdownScriptInvalidShutdownScriptZ constructor_ok(ShutdownScript o) {
		number ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ShutdownScriptInvalidShutdownScriptZ ret_hu_conv = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ShutdownScriptInvalidShutdownScriptZ constructor_err(InvalidShutdownScript e) {
		number ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ShutdownScriptInvalidShutdownScriptZ ret_hu_conv = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_ShutdownScriptInvalidShutdownScriptZ clone() {
		number ret = bindings.CResult_ShutdownScriptInvalidShutdownScriptZ_clone(this.ptr);
		Result_ShutdownScriptInvalidShutdownScriptZ ret_hu_conv = Result_ShutdownScriptInvalidShutdownScriptZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
