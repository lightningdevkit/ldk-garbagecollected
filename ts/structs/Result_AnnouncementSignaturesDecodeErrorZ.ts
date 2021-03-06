
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_AnnouncementSignaturesDecodeErrorZ extends CommonBase {
	private Result_AnnouncementSignaturesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_AnnouncementSignaturesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_AnnouncementSignaturesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_AnnouncementSignaturesDecodeErrorZ_result_ok(ptr)) {
			return new Result_AnnouncementSignaturesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_AnnouncementSignaturesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_AnnouncementSignaturesDecodeErrorZ_OK extends Result_AnnouncementSignaturesDecodeErrorZ {
		public final AnnouncementSignatures res;
		private Result_AnnouncementSignaturesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_AnnouncementSignaturesDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: AnnouncementSignatures = new AnnouncementSignatures(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_AnnouncementSignaturesDecodeErrorZ_OK(AnnouncementSignatures res) {
			this(null, bindings.CResult_AnnouncementSignaturesDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_AnnouncementSignaturesDecodeErrorZ_Err extends Result_AnnouncementSignaturesDecodeErrorZ {
		public final DecodeError err;
		private Result_AnnouncementSignaturesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_AnnouncementSignaturesDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_AnnouncementSignaturesDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_AnnouncementSignaturesDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
