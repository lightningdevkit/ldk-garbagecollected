
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ExpiryTimeCreationErrorZ extends CommonBase {
	private Result_ExpiryTimeCreationErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ExpiryTimeCreationErrorZ_free(ptr); } super.finalize();
	}

	static Result_ExpiryTimeCreationErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ExpiryTimeCreationErrorZ_result_ok(ptr)) {
			return new Result_ExpiryTimeCreationErrorZ_OK(null, ptr);
		} else {
			return new Result_ExpiryTimeCreationErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ExpiryTimeCreationErrorZ_OK extends Result_ExpiryTimeCreationErrorZ {
		public final ExpiryTime res;
		private Result_ExpiryTimeCreationErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ExpiryTimeCreationErrorZ_get_ok(ptr);
			const res_hu_conv: ExpiryTime = new ExpiryTime(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ExpiryTimeCreationErrorZ_Err extends Result_ExpiryTimeCreationErrorZ {
		public final CreationError err;
		private Result_ExpiryTimeCreationErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_ExpiryTimeCreationErrorZ_get_err(ptr);
		}
	}

	public static Result_ExpiryTimeCreationErrorZ constructor_ok(ExpiryTime o) {
		number ret = bindings.CResult_ExpiryTimeCreationErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ExpiryTimeCreationErrorZ constructor_err(CreationError e) {
		number ret = bindings.CResult_ExpiryTimeCreationErrorZ_err(e);
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_ExpiryTimeCreationErrorZ clone() {
		number ret = bindings.CResult_ExpiryTimeCreationErrorZ_clone(this.ptr);
		Result_ExpiryTimeCreationErrorZ ret_hu_conv = Result_ExpiryTimeCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
