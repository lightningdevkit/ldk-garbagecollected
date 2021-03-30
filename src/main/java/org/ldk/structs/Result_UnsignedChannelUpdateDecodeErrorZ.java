package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_UnsignedChannelUpdateDecodeErrorZ extends CommonBase {
	private Result_UnsignedChannelUpdateDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UnsignedChannelUpdateDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UnsignedChannelUpdateDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UnsignedChannelUpdateDecodeErrorZ_result_ok(ptr)) {
			return new Result_UnsignedChannelUpdateDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UnsignedChannelUpdateDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UnsignedChannelUpdateDecodeErrorZ_OK extends Result_UnsignedChannelUpdateDecodeErrorZ {
		public final UnsignedChannelUpdate res;
		private Result_UnsignedChannelUpdateDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_UnsignedChannelUpdateDecodeErrorZ_get_ok(ptr);
			UnsignedChannelUpdate res_hu_conv = new UnsignedChannelUpdate(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_UnsignedChannelUpdateDecodeErrorZ_Err extends Result_UnsignedChannelUpdateDecodeErrorZ {
		public final DecodeError err;
		private Result_UnsignedChannelUpdateDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_UnsignedChannelUpdateDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_UnsignedChannelUpdateDecodeErrorZ in the success state.
	 */
	public static Result_UnsignedChannelUpdateDecodeErrorZ constructor_ok(UnsignedChannelUpdate o) {
		long ret = bindings.CResult_UnsignedChannelUpdateDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_UnsignedChannelUpdateDecodeErrorZ ret_hu_conv = Result_UnsignedChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_UnsignedChannelUpdateDecodeErrorZ in the error state.
	 */
	public static Result_UnsignedChannelUpdateDecodeErrorZ constructor_err(DecodeError e) {
		long ret = bindings.CResult_UnsignedChannelUpdateDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_UnsignedChannelUpdateDecodeErrorZ ret_hu_conv = Result_UnsignedChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_UnsignedChannelUpdateDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_UnsignedChannelUpdateDecodeErrorZ clone() {
		long ret = bindings.CResult_UnsignedChannelUpdateDecodeErrorZ_clone(this.ptr);
		Result_UnsignedChannelUpdateDecodeErrorZ ret_hu_conv = Result_UnsignedChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
