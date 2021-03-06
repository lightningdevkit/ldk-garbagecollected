
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ChannelPublicKeysDecodeErrorZ extends CommonBase {
	private Result_ChannelPublicKeysDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelPublicKeysDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelPublicKeysDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelPublicKeysDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelPublicKeysDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelPublicKeysDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelPublicKeysDecodeErrorZ_OK extends Result_ChannelPublicKeysDecodeErrorZ {
		public final ChannelPublicKeys res;
		private Result_ChannelPublicKeysDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ChannelPublicKeysDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_ChannelPublicKeysDecodeErrorZ_OK(ChannelPublicKeys res) {
			this(null, bindings.CResult_ChannelPublicKeysDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_ChannelPublicKeysDecodeErrorZ_Err extends Result_ChannelPublicKeysDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelPublicKeysDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ChannelPublicKeysDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_ChannelPublicKeysDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ChannelPublicKeysDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
