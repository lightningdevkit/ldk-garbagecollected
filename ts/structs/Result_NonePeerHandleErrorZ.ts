
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NonePeerHandleErrorZ extends CommonBase {
	private Result_NonePeerHandleErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NonePeerHandleErrorZ_free(ptr); } super.finalize();
	}

	static Result_NonePeerHandleErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NonePeerHandleErrorZ_result_ok(ptr)) {
			return new Result_NonePeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_NonePeerHandleErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NonePeerHandleErrorZ_OK extends Result_NonePeerHandleErrorZ {
		private Result_NonePeerHandleErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
		public Result_NonePeerHandleErrorZ_OK() {
			this(null, bindings.CResult_NonePeerHandleErrorZ_ok());
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
		public Result_NonePeerHandleErrorZ_Err(PeerHandleError err) {
			this(null, bindings.CResult_NonePeerHandleErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
