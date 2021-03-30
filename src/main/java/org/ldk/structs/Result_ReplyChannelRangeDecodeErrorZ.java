package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_ReplyChannelRangeDecodeErrorZ extends CommonBase {
	private Result_ReplyChannelRangeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ReplyChannelRangeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ReplyChannelRangeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ReplyChannelRangeDecodeErrorZ_result_ok(ptr)) {
			return new Result_ReplyChannelRangeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ReplyChannelRangeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ReplyChannelRangeDecodeErrorZ_OK extends Result_ReplyChannelRangeDecodeErrorZ {
		public final ReplyChannelRange res;
		private Result_ReplyChannelRangeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ReplyChannelRangeDecodeErrorZ_get_ok(ptr);
			ReplyChannelRange res_hu_conv = new ReplyChannelRange(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ReplyChannelRangeDecodeErrorZ_Err extends Result_ReplyChannelRangeDecodeErrorZ {
		public final DecodeError err;
		private Result_ReplyChannelRangeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ReplyChannelRangeDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ReplyChannelRangeDecodeErrorZ in the success state.
	 */
	public static Result_ReplyChannelRangeDecodeErrorZ constructor_ok(ReplyChannelRange o) {
		long ret = bindings.CResult_ReplyChannelRangeDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ReplyChannelRangeDecodeErrorZ ret_hu_conv = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ReplyChannelRangeDecodeErrorZ in the error state.
	 */
	public static Result_ReplyChannelRangeDecodeErrorZ constructor_err(DecodeError e) {
		long ret = bindings.CResult_ReplyChannelRangeDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ReplyChannelRangeDecodeErrorZ ret_hu_conv = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ReplyChannelRangeDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ReplyChannelRangeDecodeErrorZ clone() {
		long ret = bindings.CResult_ReplyChannelRangeDecodeErrorZ_clone(this.ptr);
		Result_ReplyChannelRangeDecodeErrorZ ret_hu_conv = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
