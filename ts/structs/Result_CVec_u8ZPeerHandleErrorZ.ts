
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_CVec_u8ZPeerHandleErrorZ extends CommonBase {
	private Result_CVec_u8ZPeerHandleErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_u8ZPeerHandleErrorZ_free(ptr); } super.finalize();
	}

	static Result_CVec_u8ZPeerHandleErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_u8ZPeerHandleErrorZ_is_ok(ptr)) {
			return new Result_CVec_u8ZPeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_u8ZPeerHandleErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_u8ZPeerHandleErrorZ_OK extends Result_CVec_u8ZPeerHandleErrorZ {
		public final Uint8Array res;
		private Result_CVec_u8ZPeerHandleErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_CVec_u8ZPeerHandleErrorZ_Err extends Result_CVec_u8ZPeerHandleErrorZ {
		public final PeerHandleError err;
		private Result_CVec_u8ZPeerHandleErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_get_err(ptr);
			const err_hu_conv: PeerHandleError = new PeerHandleError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_CVec_u8ZPeerHandleErrorZ constructor_ok(Uint8Array o) {
		number ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_ok(o);
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_CVec_u8ZPeerHandleErrorZ constructor_err(PeerHandleError e) {
		number ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_CVec_u8ZPeerHandleErrorZ clone() {
		number ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_clone(this.ptr);
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
