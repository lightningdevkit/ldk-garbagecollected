package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_CommitmentSignedDecodeErrorZ extends CommonBase {
	private Result_CommitmentSignedDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CommitmentSignedDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_CommitmentSignedDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CommitmentSignedDecodeErrorZ_result_ok(ptr)) {
			return new Result_CommitmentSignedDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CommitmentSignedDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CommitmentSignedDecodeErrorZ_OK extends Result_CommitmentSignedDecodeErrorZ {
		public final CommitmentSigned res;
		private Result_CommitmentSignedDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_CommitmentSignedDecodeErrorZ_get_ok(ptr);
			CommitmentSigned res_hu_conv = new CommitmentSigned(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_CommitmentSignedDecodeErrorZ_OK(CommitmentSigned res) {
			this(null, bindings.CResult_CommitmentSignedDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_CommitmentSignedDecodeErrorZ_Err extends Result_CommitmentSignedDecodeErrorZ {
		public final DecodeError err;
		private Result_CommitmentSignedDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_CommitmentSignedDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_CommitmentSignedDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_CommitmentSignedDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
