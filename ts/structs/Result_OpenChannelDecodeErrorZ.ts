
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_OpenChannelDecodeErrorZ extends CommonBase {
	private Result_OpenChannelDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_OpenChannelDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_OpenChannelDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_OpenChannelDecodeErrorZ_result_ok(ptr)) {
			return new Result_OpenChannelDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_OpenChannelDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_OpenChannelDecodeErrorZ_OK extends Result_OpenChannelDecodeErrorZ {
		public final OpenChannel res;
		private Result_OpenChannelDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_OpenChannelDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: OpenChannel = new OpenChannel(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_OpenChannelDecodeErrorZ_OK(OpenChannel res) {
			this(null, bindings.CResult_OpenChannelDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_OpenChannelDecodeErrorZ_Err extends Result_OpenChannelDecodeErrorZ {
		public final DecodeError err;
		private Result_OpenChannelDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_OpenChannelDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_OpenChannelDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_OpenChannelDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
