
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
	}

	public static Result_ChannelPublicKeysDecodeErrorZ constructor__ok(ChannelPublicKeys o) {
		number ret = bindings.CResult_ChannelPublicKeysDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ChannelPublicKeysDecodeErrorZ ret_hu_conv = Result_ChannelPublicKeysDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_ChannelPublicKeysDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_ChannelPublicKeysDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ChannelPublicKeysDecodeErrorZ ret_hu_conv = Result_ChannelPublicKeysDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_ChannelPublicKeysDecodeErrorZ _clone() {
		number ret = bindings.CResult_ChannelPublicKeysDecodeErrorZ_clone(this.ptr);
		Result_ChannelPublicKeysDecodeErrorZ ret_hu_conv = Result_ChannelPublicKeysDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
