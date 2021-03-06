package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_UpdateFulfillHTLCDecodeErrorZ extends CommonBase {
	private Result_UpdateFulfillHTLCDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_UpdateFulfillHTLCDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_UpdateFulfillHTLCDecodeErrorZ_result_ok(ptr)) {
			return new Result_UpdateFulfillHTLCDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_UpdateFulfillHTLCDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_UpdateFulfillHTLCDecodeErrorZ_OK extends Result_UpdateFulfillHTLCDecodeErrorZ {
		public final UpdateFulfillHTLC res;
		private Result_UpdateFulfillHTLCDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_UpdateFulfillHTLCDecodeErrorZ_get_ok(ptr);
			UpdateFulfillHTLC res_hu_conv = new UpdateFulfillHTLC(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_UpdateFulfillHTLCDecodeErrorZ_OK(UpdateFulfillHTLC res) {
			this(null, bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_UpdateFulfillHTLCDecodeErrorZ_Err extends Result_UpdateFulfillHTLCDecodeErrorZ {
		public final DecodeError err;
		private Result_UpdateFulfillHTLCDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_UpdateFulfillHTLCDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_UpdateFulfillHTLCDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_UpdateFulfillHTLCDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
