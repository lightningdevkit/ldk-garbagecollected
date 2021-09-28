
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
	}

	public static Result_UnsignedChannelAnnouncementDecodeErrorZ constructor_ok(UnsignedChannelAnnouncement o) {
		number ret = bindings.CResult_UnsignedChannelAnnouncementDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_UnsignedChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_UnsignedChannelAnnouncementDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_UnsignedChannelAnnouncementDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_UnsignedChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_UnsignedChannelAnnouncementDecodeErrorZ clone() {
		number ret = bindings.CResult_UnsignedChannelAnnouncementDecodeErrorZ_clone(this.ptr);
		Result_UnsignedChannelAnnouncementDecodeErrorZ ret_hu_conv = Result_UnsignedChannelAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
