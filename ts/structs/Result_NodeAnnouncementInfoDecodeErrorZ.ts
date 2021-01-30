
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
		public Result_NodeAnnouncementInfoDecodeErrorZ_OK(NodeAnnouncementInfo res) {
			this(null, bindings.CResult_NodeAnnouncementInfoDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
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
		public Result_NodeAnnouncementInfoDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_NodeAnnouncementInfoDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
