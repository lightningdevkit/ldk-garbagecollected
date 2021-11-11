
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NonePeerHandleErrorZ extends CommonBase {
	private Result_NonePeerHandleErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NonePeerHandleErrorZ_free(ptr); } super.finalize();
	}

	static Result_NonePeerHandleErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NonePeerHandleErrorZ_is_ok(ptr)) {
			return new Result_NonePeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_NonePeerHandleErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NonePeerHandleErrorZ_OK extends Result_NonePeerHandleErrorZ {
		private Result_NonePeerHandleErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NonePeerHandleErrorZ_Err extends Result_NonePeerHandleErrorZ {
		public final PeerHandleError err;
		private Result_NonePeerHandleErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NonePeerHandleErrorZ_get_err(ptr);
			const err_hu_conv: PeerHandleError = new PeerHandleError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_NonePeerHandleErrorZ constructor_ok() {
		number ret = bindings.CResult_NonePeerHandleErrorZ_ok();
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NonePeerHandleErrorZ constructor_err(PeerHandleError e) {
		number ret = bindings.CResult_NonePeerHandleErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_NonePeerHandleErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_NonePeerHandleErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_NonePeerHandleErrorZ clone() {
		number ret = bindings.CResult_NonePeerHandleErrorZ_clone(this.ptr);
		Result_NonePeerHandleErrorZ ret_hu_conv = Result_NonePeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
