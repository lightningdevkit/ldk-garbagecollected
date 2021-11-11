
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ShutdownScriptDecodeErrorZ extends CommonBase {
	private Result_ShutdownScriptDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ShutdownScriptDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ShutdownScriptDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ShutdownScriptDecodeErrorZ_is_ok(ptr)) {
			return new Result_ShutdownScriptDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ShutdownScriptDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ShutdownScriptDecodeErrorZ_OK extends Result_ShutdownScriptDecodeErrorZ {
		public final ShutdownScript res;
		private Result_ShutdownScriptDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ShutdownScriptDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ShutdownScript = new ShutdownScript(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ShutdownScriptDecodeErrorZ_Err extends Result_ShutdownScriptDecodeErrorZ {
		public final DecodeError err;
		private Result_ShutdownScriptDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ShutdownScriptDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ShutdownScriptDecodeErrorZ constructor_ok(ShutdownScript o) {
		number ret = bindings.CResult_ShutdownScriptDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ShutdownScriptDecodeErrorZ ret_hu_conv = Result_ShutdownScriptDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ShutdownScriptDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ShutdownScriptDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ShutdownScriptDecodeErrorZ ret_hu_conv = Result_ShutdownScriptDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_ShutdownScriptDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_ShutdownScriptDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_ShutdownScriptDecodeErrorZ clone() {
		number ret = bindings.CResult_ShutdownScriptDecodeErrorZ_clone(this.ptr);
		Result_ShutdownScriptDecodeErrorZ ret_hu_conv = Result_ShutdownScriptDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
