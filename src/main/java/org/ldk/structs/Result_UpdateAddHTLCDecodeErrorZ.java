package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_UpdateAddHTLCDecodeErrorZ extends CommonBase {
	private Result_UpdateAddHTLCDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UpdateAddHTLCDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UpdateAddHTLCDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UpdateAddHTLCDecodeErrorZ_result_ok(ptr)) {
			return new Result_UpdateAddHTLCDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UpdateAddHTLCDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UpdateAddHTLCDecodeErrorZ_OK extends Result_UpdateAddHTLCDecodeErrorZ {
		public final UpdateAddHTLC res;
		private Result_UpdateAddHTLCDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_UpdateAddHTLCDecodeErrorZ_get_ok(ptr);
			UpdateAddHTLC res_hu_conv = new UpdateAddHTLC(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_UpdateAddHTLCDecodeErrorZ_OK(UpdateAddHTLC res) {
			this(null, bindings.CResult_UpdateAddHTLCDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_UpdateAddHTLCDecodeErrorZ_Err extends Result_UpdateAddHTLCDecodeErrorZ {
		public final DecodeError err;
		private Result_UpdateAddHTLCDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_UpdateAddHTLCDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_UpdateAddHTLCDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_UpdateAddHTLCDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
