
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ChanKeySignerDecodeErrorZ extends CommonBase {
	private Result_ChanKeySignerDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChanKeySignerDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChanKeySignerDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChanKeySignerDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChanKeySignerDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChanKeySignerDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChanKeySignerDecodeErrorZ_OK extends Result_ChanKeySignerDecodeErrorZ {
		public final ChannelKeys res;
		private Result_ChanKeySignerDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ChanKeySignerDecodeErrorZ_get_ok(ptr);
			ChannelKeys ret_hu_conv = new ChannelKeys(null, res);
			ret_hu_conv.ptrs_to.add(this);
			this.res = ret_hu_conv;
		}
		public Result_ChanKeySignerDecodeErrorZ_OK(ChannelKeys res) {
			this(null, bindings.CResult_ChanKeySignerDecodeErrorZ_ok(res == null ? 0 : res.ptr));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_ChanKeySignerDecodeErrorZ_Err extends Result_ChanKeySignerDecodeErrorZ {
		public final DecodeError err;
		private Result_ChanKeySignerDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ChanKeySignerDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_ChanKeySignerDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ChanKeySignerDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
