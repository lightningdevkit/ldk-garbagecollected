
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ChannelInfoDecodeErrorZ extends CommonBase {
	private Result_ChannelInfoDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelInfoDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelInfoDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelInfoDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelInfoDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelInfoDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelInfoDecodeErrorZ_OK extends Result_ChannelInfoDecodeErrorZ {
		public final ChannelInfo res;
		private Result_ChannelInfoDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ChannelInfoDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ChannelInfo = new ChannelInfo(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelInfoDecodeErrorZ_Err extends Result_ChannelInfoDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelInfoDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ChannelInfoDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ChannelInfoDecodeErrorZ constructor_ok(ChannelInfo o) {
		number ret = bindings.CResult_ChannelInfoDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ChannelInfoDecodeErrorZ ret_hu_conv = Result_ChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ChannelInfoDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ChannelInfoDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ChannelInfoDecodeErrorZ ret_hu_conv = Result_ChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_ChannelInfoDecodeErrorZ clone() {
		number ret = bindings.CResult_ChannelInfoDecodeErrorZ_clone(this.ptr);
		Result_ChannelInfoDecodeErrorZ ret_hu_conv = Result_ChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
