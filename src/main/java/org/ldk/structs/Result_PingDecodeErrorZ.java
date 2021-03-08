package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_PingDecodeErrorZ extends CommonBase {
	private Result_PingDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PingDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PingDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PingDecodeErrorZ_result_ok(ptr)) {
			return new Result_PingDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PingDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PingDecodeErrorZ_OK extends Result_PingDecodeErrorZ {
		public final Ping res;
		private Result_PingDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_PingDecodeErrorZ_get_ok(ptr);
			Ping res_hu_conv = new Ping(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_PingDecodeErrorZ_OK(Ping res) {
			this(null, bindings.CResult_PingDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_PingDecodeErrorZ_Err extends Result_PingDecodeErrorZ {
		public final DecodeError err;
		private Result_PingDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_PingDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_PingDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_PingDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
