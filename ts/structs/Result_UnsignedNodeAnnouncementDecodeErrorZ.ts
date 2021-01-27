
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_UnsignedNodeAnnouncementDecodeErrorZ extends CommonBase {
	private Result_UnsignedNodeAnnouncementDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UnsignedNodeAnnouncementDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UnsignedNodeAnnouncementDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_result_ok(ptr)) {
			return new Result_UnsignedNodeAnnouncementDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UnsignedNodeAnnouncementDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UnsignedNodeAnnouncementDecodeErrorZ_OK extends Result_UnsignedNodeAnnouncementDecodeErrorZ {
		public final UnsignedNodeAnnouncement res;
		private Result_UnsignedNodeAnnouncementDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: UnsignedNodeAnnouncement = new UnsignedNodeAnnouncement(null, res);
			this.res = res_hu_conv;
		}
		public Result_UnsignedNodeAnnouncementDecodeErrorZ_OK(UnsignedNodeAnnouncement res) {
			this(null, bindings.CResult_UnsignedNodeAnnouncementDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_UnsignedNodeAnnouncementDecodeErrorZ_Err extends Result_UnsignedNodeAnnouncementDecodeErrorZ {
		public final DecodeError err;
		private Result_UnsignedNodeAnnouncementDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_UnsignedNodeAnnouncementDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			this.err = err_hu_conv;
		}
		public Result_UnsignedNodeAnnouncementDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_UnsignedNodeAnnouncementDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
