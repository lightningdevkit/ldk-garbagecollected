package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_ChannelUpdateDecodeErrorZ extends CommonBase {
	private Result_ChannelUpdateDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelUpdateDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelUpdateDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelUpdateDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelUpdateDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelUpdateDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelUpdateDecodeErrorZ_OK extends Result_ChannelUpdateDecodeErrorZ {
		public final ChannelUpdate res;
		private Result_ChannelUpdateDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ChannelUpdateDecodeErrorZ_get_ok(ptr);
			ChannelUpdate res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new ChannelUpdate(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelUpdateDecodeErrorZ_Err extends Result_ChannelUpdateDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelUpdateDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ChannelUpdateDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ChannelUpdateDecodeErrorZ in the success state.
	 */
	public static Result_ChannelUpdateDecodeErrorZ ok(ChannelUpdate o) {
		long ret = bindings.CResult_ChannelUpdateDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelUpdateDecodeErrorZ ret_hu_conv = Result_ChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelUpdateDecodeErrorZ in the error state.
	 */
	public static Result_ChannelUpdateDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ChannelUpdateDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelUpdateDecodeErrorZ ret_hu_conv = Result_ChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelUpdateDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelUpdateDecodeErrorZ clone() {
		long ret = bindings.CResult_ChannelUpdateDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelUpdateDecodeErrorZ ret_hu_conv = Result_ChannelUpdateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
