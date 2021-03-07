package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

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
			long res = bindings.LDKCResult_ChannelTransactionParametersDecodeErrorZ_get_ok(ptr);
			ChannelTransactionParameters res_hu_conv = new ChannelTransactionParameters(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_ChannelTransactionParametersDecodeErrorZ_OK(ChannelTransactionParameters res) {
			this(null, bindings.CResult_ChannelTransactionParametersDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_ChannelTransactionParametersDecodeErrorZ_Err extends Result_ChannelTransactionParametersDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelTransactionParametersDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ChannelTransactionParametersDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_ChannelTransactionParametersDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ChannelTransactionParametersDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
