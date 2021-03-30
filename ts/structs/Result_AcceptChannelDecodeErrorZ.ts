
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_AcceptChannelDecodeErrorZ extends CommonBase {
	private Result_AcceptChannelDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_AcceptChannelDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_AcceptChannelDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_AcceptChannelDecodeErrorZ_result_ok(ptr)) {
			return new Result_AcceptChannelDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_AcceptChannelDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_AcceptChannelDecodeErrorZ_OK extends Result_AcceptChannelDecodeErrorZ {
		public final AcceptChannel res;
		private Result_AcceptChannelDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_AcceptChannelDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: AcceptChannel = new AcceptChannel(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_AcceptChannelDecodeErrorZ_Err extends Result_AcceptChannelDecodeErrorZ {
		public final DecodeError err;
		private Result_AcceptChannelDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_AcceptChannelDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_AcceptChannelDecodeErrorZ constructor__ok(AcceptChannel o) {
		number ret = bindings.CResult_AcceptChannelDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_AcceptChannelDecodeErrorZ ret_hu_conv = Result_AcceptChannelDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_AcceptChannelDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_AcceptChannelDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_AcceptChannelDecodeErrorZ ret_hu_conv = Result_AcceptChannelDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_AcceptChannelDecodeErrorZ _clone() {
		number ret = bindings.CResult_AcceptChannelDecodeErrorZ_clone(this.ptr);
		Result_AcceptChannelDecodeErrorZ ret_hu_conv = Result_AcceptChannelDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
