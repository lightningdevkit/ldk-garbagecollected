package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_HolderCommitmentTransactionDecodeErrorZ extends CommonBase {
	private Result_HolderCommitmentTransactionDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_HolderCommitmentTransactionDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_HolderCommitmentTransactionDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_HolderCommitmentTransactionDecodeErrorZ_result_ok(ptr)) {
			return new Result_HolderCommitmentTransactionDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_HolderCommitmentTransactionDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_HolderCommitmentTransactionDecodeErrorZ_OK extends Result_HolderCommitmentTransactionDecodeErrorZ {
		public final HolderCommitmentTransaction res;
		private Result_HolderCommitmentTransactionDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_HolderCommitmentTransactionDecodeErrorZ_get_ok(ptr);
			HolderCommitmentTransaction res_hu_conv = new HolderCommitmentTransaction(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_HolderCommitmentTransactionDecodeErrorZ_OK(HolderCommitmentTransaction res) {
			this(null, bindings.CResult_HolderCommitmentTransactionDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_HolderCommitmentTransactionDecodeErrorZ_Err extends Result_HolderCommitmentTransactionDecodeErrorZ {
		public final DecodeError err;
		private Result_HolderCommitmentTransactionDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_HolderCommitmentTransactionDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_HolderCommitmentTransactionDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_HolderCommitmentTransactionDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
