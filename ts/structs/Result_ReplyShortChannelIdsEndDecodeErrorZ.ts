
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ReplyShortChannelIdsEndDecodeErrorZ extends CommonBase {
	private Result_ReplyShortChannelIdsEndDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ReplyShortChannelIdsEndDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_result_ok(ptr)) {
			return new Result_ReplyShortChannelIdsEndDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ReplyShortChannelIdsEndDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ReplyShortChannelIdsEndDecodeErrorZ_OK extends Result_ReplyShortChannelIdsEndDecodeErrorZ {
		public final ReplyShortChannelIdsEnd res;
		private Result_ReplyShortChannelIdsEndDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ReplyShortChannelIdsEnd = new ReplyShortChannelIdsEnd(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_ReplyShortChannelIdsEndDecodeErrorZ_OK(ReplyShortChannelIdsEnd res) {
			this(null, bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_ReplyShortChannelIdsEndDecodeErrorZ_Err extends Result_ReplyShortChannelIdsEndDecodeErrorZ {
		public final DecodeError err;
		private Result_ReplyShortChannelIdsEndDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_ReplyShortChannelIdsEndDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
