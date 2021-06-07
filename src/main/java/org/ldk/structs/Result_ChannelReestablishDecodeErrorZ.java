package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_ChannelReestablishDecodeErrorZ extends CommonBase {
	private Result_ChannelReestablishDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelReestablishDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelReestablishDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelReestablishDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelReestablishDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelReestablishDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelReestablishDecodeErrorZ_OK extends Result_ChannelReestablishDecodeErrorZ {
		public final ChannelReestablish res;
		private Result_ChannelReestablishDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ChannelReestablishDecodeErrorZ_get_ok(ptr);
			ChannelReestablish res_hu_conv = new ChannelReestablish(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelReestablishDecodeErrorZ_Err extends Result_ChannelReestablishDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelReestablishDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ChannelReestablishDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ChannelReestablishDecodeErrorZ in the success state.
	 */
	public static Result_ChannelReestablishDecodeErrorZ ok(ChannelReestablish o) {
		long ret = bindings.CResult_ChannelReestablishDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelReestablishDecodeErrorZ in the error state.
	 */
	public static Result_ChannelReestablishDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ChannelReestablishDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelReestablishDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelReestablishDecodeErrorZ clone() {
		long ret = bindings.CResult_ChannelReestablishDecodeErrorZ_clone(this.ptr);
		Result_ChannelReestablishDecodeErrorZ ret_hu_conv = Result_ChannelReestablishDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
