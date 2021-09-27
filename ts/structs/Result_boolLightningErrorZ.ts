
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_boolLightningErrorZ extends CommonBase {
	private Result_boolLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_boolLightningErrorZ_free(ptr); } super.finalize();
	}

	static Result_boolLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_boolLightningErrorZ_result_ok(ptr)) {
			return new Result_boolLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_boolLightningErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_boolLightningErrorZ_OK extends Result_boolLightningErrorZ {
		public final boolean res;
		private Result_boolLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_boolLightningErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_boolLightningErrorZ_Err extends Result_boolLightningErrorZ {
		public final LightningError err;
		private Result_boolLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_boolLightningErrorZ_get_err(ptr);
			const err_hu_conv: LightningError = new LightningError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_boolLightningErrorZ constructor_ok(boolean o) {
		number ret = bindings.CResult_boolLightningErrorZ_ok(o);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_boolLightningErrorZ constructor_err(LightningError e) {
		number ret = bindings.CResult_boolLightningErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_boolLightningErrorZ clone() {
		number ret = bindings.CResult_boolLightningErrorZ_clone(this.ptr);
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
