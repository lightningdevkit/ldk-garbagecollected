
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_boolPeerHandleErrorZ extends CommonBase {
	private Result_boolPeerHandleErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_boolPeerHandleErrorZ_free(ptr); } super.finalize();
	}

	static Result_boolPeerHandleErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_boolPeerHandleErrorZ_is_ok(ptr)) {
			return new Result_boolPeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_boolPeerHandleErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_boolPeerHandleErrorZ_OK extends Result_boolPeerHandleErrorZ {
		public final boolean res;
		private Result_boolPeerHandleErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_boolPeerHandleErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_boolPeerHandleErrorZ_Err extends Result_boolPeerHandleErrorZ {
		public final PeerHandleError err;
		private Result_boolPeerHandleErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_boolPeerHandleErrorZ_get_err(ptr);
			const err_hu_conv: PeerHandleError = new PeerHandleError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_boolPeerHandleErrorZ constructor_ok(boolean o) {
		number ret = bindings.CResult_boolPeerHandleErrorZ_ok(o);
		Result_boolPeerHandleErrorZ ret_hu_conv = Result_boolPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_boolPeerHandleErrorZ constructor_err(PeerHandleError e) {
		number ret = bindings.CResult_boolPeerHandleErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_boolPeerHandleErrorZ ret_hu_conv = Result_boolPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_boolPeerHandleErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_boolPeerHandleErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_boolPeerHandleErrorZ clone() {
		number ret = bindings.CResult_boolPeerHandleErrorZ_clone(this.ptr);
		Result_boolPeerHandleErrorZ ret_hu_conv = Result_boolPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
