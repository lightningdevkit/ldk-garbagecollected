
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ChannelFeaturesDecodeErrorZ extends CommonBase {
	private Result_ChannelFeaturesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelFeaturesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelFeaturesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelFeaturesDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelFeaturesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelFeaturesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelFeaturesDecodeErrorZ_OK extends Result_ChannelFeaturesDecodeErrorZ {
		public final ChannelFeatures res;
		private Result_ChannelFeaturesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ChannelFeaturesDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ChannelFeatures = new ChannelFeatures(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelFeaturesDecodeErrorZ_Err extends Result_ChannelFeaturesDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelFeaturesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ChannelFeaturesDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ChannelFeaturesDecodeErrorZ constructor__ok(ChannelFeatures o) {
		number ret = bindings.CResult_ChannelFeaturesDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ChannelFeaturesDecodeErrorZ ret_hu_conv = Result_ChannelFeaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_ChannelFeaturesDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_ChannelFeaturesDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ChannelFeaturesDecodeErrorZ ret_hu_conv = Result_ChannelFeaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

}
