
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ChannelAnnouncementDecodeErrorZ extends CommonBase {
	private Result_ChannelAnnouncementDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelAnnouncementDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelAnnouncementDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelAnnouncementDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelAnnouncementDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelAnnouncementDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelAnnouncementDecodeErrorZ_OK extends Result_ChannelAnnouncementDecodeErrorZ {
		public final ChannelAnnouncement res;
		private Result_ChannelAnnouncementDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ChannelAnnouncementDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ChannelAnnouncement = new ChannelAnnouncement(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelAnnouncementDecodeErrorZ_Err extends Result_ChannelAnnouncementDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelAnnouncementDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ChannelAnnouncementDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ChannelAnnouncementDecodeErrorZ constructor__ok(ChannelAnnouncement o) {
		number ret = bindings.CResult_ChannelAnnouncementDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_ChannelAnnouncementDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_ChannelAnnouncementDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_ChannelAnnouncementDecodeErrorZ _clone() {
		number ret = bindings.CResult_ChannelAnnouncementDecodeErrorZ_clone(this.ptr);
		Result_ChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_ChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
