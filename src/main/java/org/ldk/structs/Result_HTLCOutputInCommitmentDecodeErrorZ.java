package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_HTLCOutputInCommitmentDecodeErrorZ extends CommonBase {
	private Result_HTLCOutputInCommitmentDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_HTLCOutputInCommitmentDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_HTLCOutputInCommitmentDecodeErrorZ_result_ok(ptr)) {
			return new Result_HTLCOutputInCommitmentDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_HTLCOutputInCommitmentDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_HTLCOutputInCommitmentDecodeErrorZ_OK extends Result_HTLCOutputInCommitmentDecodeErrorZ {
		public final HTLCOutputInCommitment res;
		private Result_HTLCOutputInCommitmentDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_HTLCOutputInCommitmentDecodeErrorZ_get_ok(ptr);
			HTLCOutputInCommitment res_hu_conv = new HTLCOutputInCommitment(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_HTLCOutputInCommitmentDecodeErrorZ_Err extends Result_HTLCOutputInCommitmentDecodeErrorZ {
		public final DecodeError err;
		private Result_HTLCOutputInCommitmentDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_HTLCOutputInCommitmentDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_HTLCOutputInCommitmentDecodeErrorZ in the success state.
	 */
	public static Result_HTLCOutputInCommitmentDecodeErrorZ ok(HTLCOutputInCommitment o) {
		long ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_HTLCOutputInCommitmentDecodeErrorZ in the error state.
	 */
	public static Result_HTLCOutputInCommitmentDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_HTLCOutputInCommitmentDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_HTLCOutputInCommitmentDecodeErrorZ clone() {
		long ret = bindings.CResult_HTLCOutputInCommitmentDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_HTLCOutputInCommitmentDecodeErrorZ ret_hu_conv = Result_HTLCOutputInCommitmentDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
