package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_SignDecodeErrorZ extends CommonBase {
	private Result_SignDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SignDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_SignDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SignDecodeErrorZ_result_ok(ptr)) {
			return new Result_SignDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_SignDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SignDecodeErrorZ_OK extends Result_SignDecodeErrorZ {
		public final Sign res;
		private Result_SignDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_SignDecodeErrorZ_get_ok(ptr);
			Sign ret_hu_conv = new Sign(null, res);
			ret_hu_conv.ptrs_to.add(this);
			this.res = ret_hu_conv;
		}
		public Result_SignDecodeErrorZ_OK(Sign res) {
			this(null, bindings.CResult_SignDecodeErrorZ_ok(res == null ? 0 : res.ptr));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_SignDecodeErrorZ_Err extends Result_SignDecodeErrorZ {
		public final DecodeError err;
		private Result_SignDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_SignDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_SignDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_SignDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
