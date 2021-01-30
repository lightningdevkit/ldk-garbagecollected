package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_PongDecodeErrorZ extends CommonBase {
	private Result_PongDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PongDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PongDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PongDecodeErrorZ_result_ok(ptr)) {
			return new Result_PongDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PongDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PongDecodeErrorZ_OK extends Result_PongDecodeErrorZ {
		public final Pong res;
		private Result_PongDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_PongDecodeErrorZ_get_ok(ptr);
			Pong res_hu_conv = new Pong(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_PongDecodeErrorZ_OK(Pong res) {
			this(null, bindings.CResult_PongDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_PongDecodeErrorZ_Err extends Result_PongDecodeErrorZ {
		public final DecodeError err;
		private Result_PongDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_PongDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_PongDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_PongDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
