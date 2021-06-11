package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

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
			long res = bindings.LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ_get_ok(ptr);
			CounterpartyChannelTransactionParameters res_hu_conv = new CounterpartyChannelTransactionParameters(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_CounterpartyChannelTransactionParametersDecodeErrorZ_Err extends Result_CounterpartyChannelTransactionParametersDecodeErrorZ {
		public final DecodeError err;
		private Result_CounterpartyChannelTransactionParametersDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_CounterpartyChannelTransactionParametersDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CounterpartyChannelTransactionParametersDecodeErrorZ in the success state.
	 */
	public static Result_CounterpartyChannelTransactionParametersDecodeErrorZ ok(CounterpartyChannelTransactionParameters o) {
		long ret = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_CounterpartyChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_CounterpartyChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CounterpartyChannelTransactionParametersDecodeErrorZ in the error state.
	 */
	public static Result_CounterpartyChannelTransactionParametersDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_CounterpartyChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_CounterpartyChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CounterpartyChannelTransactionParametersDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CounterpartyChannelTransactionParametersDecodeErrorZ clone() {
		long ret = bindings.CResult_CounterpartyChannelTransactionParametersDecodeErrorZ_clone(this.ptr);
		Result_CounterpartyChannelTransactionParametersDecodeErrorZ ret_hu_conv = Result_CounterpartyChannelTransactionParametersDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
