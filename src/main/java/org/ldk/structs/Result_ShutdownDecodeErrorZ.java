package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_ShutdownDecodeErrorZ extends CommonBase {
	private Result_ShutdownDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ShutdownDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ShutdownDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ShutdownDecodeErrorZ_result_ok(ptr)) {
			return new Result_ShutdownDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ShutdownDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ShutdownDecodeErrorZ_OK extends Result_ShutdownDecodeErrorZ {
		public final Shutdown res;
		private Result_ShutdownDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ShutdownDecodeErrorZ_get_ok(ptr);
			Shutdown res_hu_conv = new Shutdown(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ShutdownDecodeErrorZ_Err extends Result_ShutdownDecodeErrorZ {
		public final DecodeError err;
		private Result_ShutdownDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ShutdownDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ShutdownDecodeErrorZ in the success state.
	 */
	public static Result_ShutdownDecodeErrorZ ok(Shutdown o) {
		long ret = bindings.CResult_ShutdownDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ShutdownDecodeErrorZ in the error state.
	 */
	public static Result_ShutdownDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ShutdownDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ShutdownDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ShutdownDecodeErrorZ clone() {
		long ret = bindings.CResult_ShutdownDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_ShutdownDecodeErrorZ ret_hu_conv = Result_ShutdownDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
