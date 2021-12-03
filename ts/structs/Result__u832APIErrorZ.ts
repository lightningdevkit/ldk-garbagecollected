
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result__u832APIErrorZ extends CommonBase {
	private Result__u832APIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult__u832APIErrorZ_free(ptr); } super.finalize();
	}

	static Result__u832APIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult__u832APIErrorZ_is_ok(ptr)) {
			return new Result__u832APIErrorZ_OK(null, ptr);
		} else {
			return new Result__u832APIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result__u832APIErrorZ_OK extends Result__u832APIErrorZ {
		public final Uint8Array res;
		private Result__u832APIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult__u832APIErrorZ_get_ok(ptr);
		}
	}

	public static final class Result__u832APIErrorZ_Err extends Result__u832APIErrorZ {
		public final APIError err;
		private Result__u832APIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult__u832APIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result__u832APIErrorZ constructor_ok(Uint8Array o) {
		number ret = bindings.CResult__u832APIErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result__u832APIErrorZ constructor_err(APIError e) {
		number ret = bindings.CResult__u832APIErrorZ_err(e.ptr);
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult__u832APIErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult__u832APIErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result__u832APIErrorZ clone() {
		number ret = bindings.CResult__u832APIErrorZ_clone(this.ptr);
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
