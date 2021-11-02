package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

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
			BuiltCommitmentTransaction res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new BuiltCommitmentTransaction(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_BuiltCommitmentTransactionDecodeErrorZ_Err extends Result_BuiltCommitmentTransactionDecodeErrorZ {
		public final DecodeError err;
		private Result_BuiltCommitmentTransactionDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_BuiltCommitmentTransactionDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_BuiltCommitmentTransactionDecodeErrorZ in the success state.
	 */
	public static Result_BuiltCommitmentTransactionDecodeErrorZ ok(BuiltCommitmentTransaction o) {
		long ret = bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BuiltCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_BuiltCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_BuiltCommitmentTransactionDecodeErrorZ in the error state.
	 */
	public static Result_BuiltCommitmentTransactionDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BuiltCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_BuiltCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_BuiltCommitmentTransactionDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_BuiltCommitmentTransactionDecodeErrorZ clone() {
		long ret = bindings.CResult_BuiltCommitmentTransactionDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BuiltCommitmentTransactionDecodeErrorZ ret_hu_conv = Result_BuiltCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
