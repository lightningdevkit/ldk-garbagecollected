package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_DirectionalChannelInfoDecodeErrorZ extends CommonBase {
	private Result_DirectionalChannelInfoDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_DirectionalChannelInfoDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_DirectionalChannelInfoDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_DirectionalChannelInfoDecodeErrorZ_result_ok(ptr)) {
			return new Result_DirectionalChannelInfoDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_DirectionalChannelInfoDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_DirectionalChannelInfoDecodeErrorZ_OK extends Result_DirectionalChannelInfoDecodeErrorZ {
		public final DirectionalChannelInfo res;
		private Result_DirectionalChannelInfoDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_DirectionalChannelInfoDecodeErrorZ_get_ok(ptr);
			DirectionalChannelInfo res_hu_conv = new DirectionalChannelInfo(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_DirectionalChannelInfoDecodeErrorZ_Err extends Result_DirectionalChannelInfoDecodeErrorZ {
		public final DecodeError err;
		private Result_DirectionalChannelInfoDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_DirectionalChannelInfoDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_DirectionalChannelInfoDecodeErrorZ in the success state.
	 */
	public static Result_DirectionalChannelInfoDecodeErrorZ ok(DirectionalChannelInfo o) {
		long ret = bindings.CResult_DirectionalChannelInfoDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_DirectionalChannelInfoDecodeErrorZ ret_hu_conv = Result_DirectionalChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_DirectionalChannelInfoDecodeErrorZ in the error state.
	 */
	public static Result_DirectionalChannelInfoDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_DirectionalChannelInfoDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_DirectionalChannelInfoDecodeErrorZ ret_hu_conv = Result_DirectionalChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_DirectionalChannelInfoDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_DirectionalChannelInfoDecodeErrorZ clone() {
		long ret = bindings.CResult_DirectionalChannelInfoDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_DirectionalChannelInfoDecodeErrorZ ret_hu_conv = Result_DirectionalChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
