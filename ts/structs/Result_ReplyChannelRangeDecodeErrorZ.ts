
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ReplyChannelRangeDecodeErrorZ extends CommonBase {
	private Result_ReplyChannelRangeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ReplyChannelRangeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ReplyChannelRangeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ReplyChannelRangeDecodeErrorZ_result_ok(ptr)) {
			return new Result_ReplyChannelRangeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ReplyChannelRangeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ReplyChannelRangeDecodeErrorZ_OK extends Result_ReplyChannelRangeDecodeErrorZ {
		public final ReplyChannelRange res;
		private Result_ReplyChannelRangeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ReplyChannelRangeDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, res);
			this.res = res_hu_conv;
		}
		public Result_ReplyChannelRangeDecodeErrorZ_OK(ReplyChannelRange res) {
			this(null, bindings.CResult_ReplyChannelRangeDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_ReplyChannelRangeDecodeErrorZ_Err extends Result_ReplyChannelRangeDecodeErrorZ {
		public final DecodeError err;
		private Result_ReplyChannelRangeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ReplyChannelRangeDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			this.err = err_hu_conv;
		}
		public Result_ReplyChannelRangeDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ReplyChannelRangeDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
