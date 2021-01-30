
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_QueryShortChannelIdsDecodeErrorZ extends CommonBase {
	private Result_QueryShortChannelIdsDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_QueryShortChannelIdsDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_QueryShortChannelIdsDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_QueryShortChannelIdsDecodeErrorZ_result_ok(ptr)) {
			return new Result_QueryShortChannelIdsDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_QueryShortChannelIdsDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_QueryShortChannelIdsDecodeErrorZ_OK extends Result_QueryShortChannelIdsDecodeErrorZ {
		public final QueryShortChannelIds res;
		private Result_QueryShortChannelIdsDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_QueryShortChannelIdsDecodeErrorZ_OK(QueryShortChannelIds res) {
			this(null, bindings.CResult_QueryShortChannelIdsDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_QueryShortChannelIdsDecodeErrorZ_Err extends Result_QueryShortChannelIdsDecodeErrorZ {
		public final DecodeError err;
		private Result_QueryShortChannelIdsDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_QueryShortChannelIdsDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_QueryShortChannelIdsDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
