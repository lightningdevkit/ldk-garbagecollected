package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_CResult_NetAddressu8ZDecodeErrorZ extends CommonBase {
	private Result_CResult_NetAddressu8ZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CResult_NetAddressu8ZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_CResult_NetAddressu8ZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_result_ok(ptr)) {
			return new Result_CResult_NetAddressu8ZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CResult_NetAddressu8ZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CResult_NetAddressu8ZDecodeErrorZ_OK extends Result_CResult_NetAddressu8ZDecodeErrorZ {
		public final Result_NetAddressu8Z res;
		private Result_CResult_NetAddressu8ZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_get_ok(ptr);
			Result_NetAddressu8Z res_hu_conv = Result_NetAddressu8Z.constr_from_ptr(res);
			this.res = res_hu_conv;
		}
		public Result_CResult_NetAddressu8ZDecodeErrorZ_OK(Result_NetAddressu8Z res) {
			this(null, bindings.CResult_CResult_NetAddressu8ZDecodeErrorZ_ok(res != null ? res.ptr : 0));
		}
	}

	public static final class Result_CResult_NetAddressu8ZDecodeErrorZ_Err extends Result_CResult_NetAddressu8ZDecodeErrorZ {
		public final DecodeError err;
		private Result_CResult_NetAddressu8ZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			this.err = err_hu_conv;
		}
		public Result_CResult_NetAddressu8ZDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_CResult_NetAddressu8ZDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
