
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NoneLightningErrorZ extends CommonBase {
	private Result_NoneLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneLightningErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneLightningErrorZ_is_ok(ptr)) {
			return new Result_NoneLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneLightningErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneLightningErrorZ_OK extends Result_NoneLightningErrorZ {
		private Result_NoneLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneLightningErrorZ_Err extends Result_NoneLightningErrorZ {
		public final LightningError err;
		private Result_NoneLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NoneLightningErrorZ_get_err(ptr);
			const err_hu_conv: LightningError = new LightningError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_NoneLightningErrorZ constructor_ok() {
		number ret = bindings.CResult_NoneLightningErrorZ_ok();
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NoneLightningErrorZ constructor_err(LightningError e) {
		number ret = bindings.CResult_NoneLightningErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneLightningErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_NoneLightningErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_NoneLightningErrorZ clone() {
		number ret = bindings.CResult_NoneLightningErrorZ_clone(this.ptr);
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
