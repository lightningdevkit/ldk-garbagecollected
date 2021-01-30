
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_UnsignedChannelAnnouncementDecodeErrorZ extends CommonBase {
	private Result_UnsignedChannelAnnouncementDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UnsignedChannelAnnouncementDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UnsignedChannelAnnouncementDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_result_ok(ptr)) {
			return new Result_UnsignedChannelAnnouncementDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UnsignedChannelAnnouncementDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UnsignedChannelAnnouncementDecodeErrorZ_OK extends Result_UnsignedChannelAnnouncementDecodeErrorZ {
		public final UnsignedChannelAnnouncement res;
		private Result_UnsignedChannelAnnouncementDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: UnsignedChannelAnnouncement = new UnsignedChannelAnnouncement(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_UnsignedChannelAnnouncementDecodeErrorZ_OK(UnsignedChannelAnnouncement res) {
			this(null, bindings.CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_UnsignedChannelAnnouncementDecodeErrorZ_Err extends Result_UnsignedChannelAnnouncementDecodeErrorZ {
		public final DecodeError err;
		private Result_UnsignedChannelAnnouncementDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_UnsignedChannelAnnouncementDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_UnsignedChannelAnnouncementDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
