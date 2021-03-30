package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_QueryShortChannelIdsDecodeErrorZ extends CommonBase {
	private Result_QueryShortChannelIdsDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_QueryShortChannelIdsDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_QueryShortChannelIdsDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_QueryShortChannelIdsDecodeErrorZ_result_ok(ptr)) {
			return new Result_QueryShortChannelIdsDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_QueryShortChannelIdsDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_QueryShortChannelIdsDecodeErrorZ_OK extends Result_QueryShortChannelIdsDecodeErrorZ {
		public final QueryShortChannelIds res;
		private Result_QueryShortChannelIdsDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_ok(ptr);
			QueryShortChannelIds res_hu_conv = new QueryShortChannelIds(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_QueryShortChannelIdsDecodeErrorZ_Err extends Result_QueryShortChannelIdsDecodeErrorZ {
		public final DecodeError err;
		private Result_QueryShortChannelIdsDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_QueryShortChannelIdsDecodeErrorZ in the success state.
	 */
	public static Result_QueryShortChannelIdsDecodeErrorZ constructor_ok(QueryShortChannelIds o) {
		long ret = bindings.CResult_QueryShortChannelIdsDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_QueryShortChannelIdsDecodeErrorZ in the error state.
	 */
	public static Result_QueryShortChannelIdsDecodeErrorZ constructor_err(DecodeError e) {
		long ret = bindings.CResult_QueryShortChannelIdsDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_QueryShortChannelIdsDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_QueryShortChannelIdsDecodeErrorZ clone() {
		long ret = bindings.CResult_QueryShortChannelIdsDecodeErrorZ_clone(this.ptr);
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
