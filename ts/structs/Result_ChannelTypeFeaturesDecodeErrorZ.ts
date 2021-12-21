
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ChannelTypeFeaturesDecodeErrorZ extends CommonBase {
	private Result_ChannelTypeFeaturesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelTypeFeaturesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelTypeFeaturesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ChannelTypeFeaturesDecodeErrorZ_is_ok(ptr)) {
			return new Result_ChannelTypeFeaturesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelTypeFeaturesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelTypeFeaturesDecodeErrorZ_OK extends Result_ChannelTypeFeaturesDecodeErrorZ {
		public final ChannelTypeFeatures res;
		private Result_ChannelTypeFeaturesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ChannelTypeFeaturesDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelTypeFeaturesDecodeErrorZ_Err extends Result_ChannelTypeFeaturesDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelTypeFeaturesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ChannelTypeFeaturesDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ChannelTypeFeaturesDecodeErrorZ constructor_ok(ChannelTypeFeatures o) {
		number ret = bindings.CResult_ChannelTypeFeaturesDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ChannelTypeFeaturesDecodeErrorZ ret_hu_conv = Result_ChannelTypeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ChannelTypeFeaturesDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ChannelTypeFeaturesDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ChannelTypeFeaturesDecodeErrorZ ret_hu_conv = Result_ChannelTypeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_ChannelTypeFeaturesDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

}
