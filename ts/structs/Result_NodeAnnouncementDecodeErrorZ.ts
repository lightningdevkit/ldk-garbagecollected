
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NodeAnnouncementDecodeErrorZ extends CommonBase {
	private Result_NodeAnnouncementDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NodeAnnouncementDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_NodeAnnouncementDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NodeAnnouncementDecodeErrorZ_result_ok(ptr)) {
			return new Result_NodeAnnouncementDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NodeAnnouncementDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NodeAnnouncementDecodeErrorZ_OK extends Result_NodeAnnouncementDecodeErrorZ {
		public final NodeAnnouncement res;
		private Result_NodeAnnouncementDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_NodeAnnouncementDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: NodeAnnouncement = new NodeAnnouncement(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_NodeAnnouncementDecodeErrorZ_OK(NodeAnnouncement res) {
			this(null, bindings.CResult_NodeAnnouncementDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_NodeAnnouncementDecodeErrorZ_Err extends Result_NodeAnnouncementDecodeErrorZ {
		public final DecodeError err;
		private Result_NodeAnnouncementDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NodeAnnouncementDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_NodeAnnouncementDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_NodeAnnouncementDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}