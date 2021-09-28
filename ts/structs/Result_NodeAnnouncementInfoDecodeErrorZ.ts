
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NodeAnnouncementInfoDecodeErrorZ extends CommonBase {
	private Result_NodeAnnouncementInfoDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NodeAnnouncementInfoDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_NodeAnnouncementInfoDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NodeAnnouncementInfoDecodeErrorZ_result_ok(ptr)) {
			return new Result_NodeAnnouncementInfoDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NodeAnnouncementInfoDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NodeAnnouncementInfoDecodeErrorZ_OK extends Result_NodeAnnouncementInfoDecodeErrorZ {
		public final NodeAnnouncementInfo res;
		private Result_NodeAnnouncementInfoDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_NodeAnnouncementInfoDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: NodeAnnouncementInfo = new NodeAnnouncementInfo(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_NodeAnnouncementInfoDecodeErrorZ_Err extends Result_NodeAnnouncementInfoDecodeErrorZ {
		public final DecodeError err;
		private Result_NodeAnnouncementInfoDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NodeAnnouncementInfoDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_NodeAnnouncementInfoDecodeErrorZ constructor_ok(NodeAnnouncementInfo o) {
		number ret = bindings.CResult_NodeAnnouncementInfoDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_NodeAnnouncementInfoDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NodeAnnouncementInfoDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_NodeAnnouncementInfoDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_NodeAnnouncementInfoDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NodeAnnouncementInfoDecodeErrorZ clone() {
		number ret = bindings.CResult_NodeAnnouncementInfoDecodeErrorZ_clone(this.ptr);
		Result_NodeAnnouncementInfoDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
