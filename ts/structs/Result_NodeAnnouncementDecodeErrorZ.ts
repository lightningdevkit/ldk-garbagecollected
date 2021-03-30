
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
	}

	public static Result_NodeAnnouncementDecodeErrorZ constructor__ok(NodeAnnouncement o) {
		number ret = bindings.CResult_NodeAnnouncementDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_NodeAnnouncementDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_NodeAnnouncementDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_NodeAnnouncementDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_NodeAnnouncementDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_NodeAnnouncementDecodeErrorZ _clone() {
		number ret = bindings.CResult_NodeAnnouncementDecodeErrorZ_clone(this.ptr);
		Result_NodeAnnouncementDecodeErrorZ ret_hu_conv = Result_NodeAnnouncementDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
