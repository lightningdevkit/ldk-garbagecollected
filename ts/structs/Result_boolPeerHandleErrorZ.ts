
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_boolPeerHandleErrorZ extends CommonBase {
	private Result_boolPeerHandleErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_boolPeerHandleErrorZ_free(ptr); } super.finalize();
	}

	static Result_boolPeerHandleErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_boolPeerHandleErrorZ_result_ok(ptr)) {
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
		public Result_boolPeerHandleErrorZ_OK(boolean res) {
			this(null, bindings.CResult_boolPeerHandleErrorZ_ok(res));
		}
	}

	public static final class Result_boolPeerHandleErrorZ_Err extends Result_boolPeerHandleErrorZ {
		public final PeerHandleError err;
		private Result_boolPeerHandleErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_boolPeerHandleErrorZ_get_err(ptr);
			const err_hu_conv: PeerHandleError = new PeerHandleError(null, err);
			this.err = err_hu_conv;
		}
		public Result_boolPeerHandleErrorZ_Err(PeerHandleError err) {
			this(null, bindings.CResult_boolPeerHandleErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
