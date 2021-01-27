
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_QueryChannelRangeDecodeErrorZ extends CommonBase {
	private Result_QueryChannelRangeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_QueryChannelRangeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_QueryChannelRangeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_QueryChannelRangeDecodeErrorZ_result_ok(ptr)) {
			return new Result_QueryChannelRangeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_QueryChannelRangeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_QueryChannelRangeDecodeErrorZ_OK extends Result_QueryChannelRangeDecodeErrorZ {
		public final QueryChannelRange res;
		private Result_QueryChannelRangeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_QueryChannelRangeDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: QueryChannelRange = new QueryChannelRange(null, res);
			this.res = res_hu_conv;
		}
		public Result_QueryChannelRangeDecodeErrorZ_OK(QueryChannelRange res) {
			this(null, bindings.CResult_QueryChannelRangeDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_QueryChannelRangeDecodeErrorZ_Err extends Result_QueryChannelRangeDecodeErrorZ {
		public final DecodeError err;
		private Result_QueryChannelRangeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_QueryChannelRangeDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			this.err = err_hu_conv;
		}
		public Result_QueryChannelRangeDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_QueryChannelRangeDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
