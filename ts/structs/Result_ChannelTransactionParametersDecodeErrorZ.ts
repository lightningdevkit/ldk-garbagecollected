
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ChannelTransactionParametersDecodeErrorZ extends CommonBase {
	private Result_ChannelTransactionParametersDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelTransactionParametersDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelTransactionParametersDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelTransactionParametersDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelTransactionParametersDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelTransactionParametersDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelTransactionParametersDecodeErrorZ_OK extends Result_ChannelTransactionParametersDecodeErrorZ {
		public final ChannelTransactionParameters res;
		private Result_ChannelTransactionParametersDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ChannelTransactionParametersDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelTransactionParametersDecodeErrorZ_Err extends Result_ChannelTransactionParametersDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelTransactionParametersDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ChannelTransactionParametersDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ChannelTransactionParametersDecodeErrorZ constructor_ok(ChannelTransactionParameters o) {
		number ret = bindings.CResult_ChannelTransactionParametersDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_ChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_ChannelTransactionParametersDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ChannelTransactionParametersDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_ChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_ChannelTransactionParametersDecodeErrorZ clone() {
		number ret = bindings.CResult_ChannelTransactionParametersDecodeErrorZ_clone(this.ptr);
		Result_ChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_ChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
