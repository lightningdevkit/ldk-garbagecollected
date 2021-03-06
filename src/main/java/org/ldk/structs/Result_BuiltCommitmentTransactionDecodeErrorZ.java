package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_BuiltCommitmentTransactionDecodeErrorZ extends CommonBase {
	private Result_BuiltCommitmentTransactionDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_BuiltCommitmentTransactionDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_result_ok(ptr)) {
			return new Result_BuiltCommitmentTransactionDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_BuiltCommitmentTransactionDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_BuiltCommitmentTransactionDecodeErrorZ_OK extends Result_BuiltCommitmentTransactionDecodeErrorZ {
		public final BuiltCommitmentTransaction res;
		private Result_BuiltCommitmentTransactionDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_get_ok(ptr);
			BuiltCommitmentTransaction res_hu_conv = new BuiltCommitmentTransaction(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_BuiltCommitmentTransactionDecodeErrorZ_OK(BuiltCommitmentTransaction res) {
			this(null, bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_BuiltCommitmentTransactionDecodeErrorZ_Err extends Result_BuiltCommitmentTransactionDecodeErrorZ {
		public final DecodeError err;
		private Result_BuiltCommitmentTransactionDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_BuiltCommitmentTransactionDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
