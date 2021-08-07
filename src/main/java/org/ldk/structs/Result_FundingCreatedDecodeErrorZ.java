package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_FundingCreatedDecodeErrorZ extends CommonBase {
	private Result_FundingCreatedDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_FundingCreatedDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_FundingCreatedDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_FundingCreatedDecodeErrorZ_result_ok(ptr)) {
			return new Result_FundingCreatedDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_FundingCreatedDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_FundingCreatedDecodeErrorZ_OK extends Result_FundingCreatedDecodeErrorZ {
		public final FundingCreated res;
		private Result_FundingCreatedDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_FundingCreatedDecodeErrorZ_get_ok(ptr);
			FundingCreated res_hu_conv = new FundingCreated(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_FundingCreatedDecodeErrorZ_Err extends Result_FundingCreatedDecodeErrorZ {
		public final DecodeError err;
		private Result_FundingCreatedDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_FundingCreatedDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_FundingCreatedDecodeErrorZ in the success state.
	 */
	public static Result_FundingCreatedDecodeErrorZ ok(FundingCreated o) {
		long ret = bindings.CResult_FundingCreatedDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_FundingCreatedDecodeErrorZ ret_hu_conv = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_FundingCreatedDecodeErrorZ in the error state.
	 */
	public static Result_FundingCreatedDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_FundingCreatedDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_FundingCreatedDecodeErrorZ ret_hu_conv = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_FundingCreatedDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_FundingCreatedDecodeErrorZ clone() {
		long ret = bindings.CResult_FundingCreatedDecodeErrorZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		Result_FundingCreatedDecodeErrorZ ret_hu_conv = Result_FundingCreatedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
