
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_CounterpartyChannelTransactionParametersDecodeErrorZ extends CommonBase {
	private Result_CounterpartyChannelTransactionParametersDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_CounterpartyChannelTransactionParametersDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ_result_ok(ptr)) {
			return new Result_CounterpartyChannelTransactionParametersDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CounterpartyChannelTransactionParametersDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CounterpartyChannelTransactionParametersDecodeErrorZ_OK extends Result_CounterpartyChannelTransactionParametersDecodeErrorZ {
		public final CounterpartyChannelTransactionParameters res;
		private Result_CounterpartyChannelTransactionParametersDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: CounterpartyChannelTransactionParameters = new CounterpartyChannelTransactionParameters(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_CounterpartyChannelTransactionParametersDecodeErrorZ_OK(CounterpartyChannelTransactionParameters res) {
			this(null, bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_CounterpartyChannelTransactionParametersDecodeErrorZ_Err extends Result_CounterpartyChannelTransactionParametersDecodeErrorZ {
		public final DecodeError err;
		private Result_CounterpartyChannelTransactionParametersDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_CounterpartyChannelTransactionParametersDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
