package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_CResult_NetAddressu8ZDecodeErrorZ extends CommonBase {
	private Result_CResult_NetAddressu8ZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CResult_NetAddressu8ZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_CResult_NetAddressu8ZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_result_ok(ptr)) {
			return new Result_CResult_NetAddressu8ZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CResult_NetAddressu8ZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CResult_NetAddressu8ZDecodeErrorZ_OK extends Result_CResult_NetAddressu8ZDecodeErrorZ {
		public final Result_NetAddressu8Z res;
		private Result_CResult_NetAddressu8ZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_get_ok(ptr);
			Result_NetAddressu8Z res_hu_conv = Result_NetAddressu8Z.constr_from_ptr(res);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_CResult_NetAddressu8ZDecodeErrorZ_Err extends Result_CResult_NetAddressu8ZDecodeErrorZ {
		public final DecodeError err;
		private Result_CResult_NetAddressu8ZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_CResult_NetAddressu8ZDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CResult_NetAddressu8ZDecodeErrorZ in the success state.
	 */
	public static Result_CResult_NetAddressu8ZDecodeErrorZ constructor_ok(Result_NetAddressu8Z o) {
		long ret = bindings.CResult_CResult_NetAddressu8ZDecodeErrorZ_ok(o != null ? o.ptr : 0);
		Result_CResult_NetAddressu8ZDecodeErrorZ ret_hu_conv = Result_CResult_NetAddressu8ZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CResult_NetAddressu8ZDecodeErrorZ in the error state.
	 */
	public static Result_CResult_NetAddressu8ZDecodeErrorZ constructor_err(DecodeError e) {
		long ret = bindings.CResult_CResult_NetAddressu8ZDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_CResult_NetAddressu8ZDecodeErrorZ ret_hu_conv = Result_CResult_NetAddressu8ZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CResult_NetAddressu8ZDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CResult_NetAddressu8ZDecodeErrorZ clone() {
		long ret = bindings.CResult_CResult_NetAddressu8ZDecodeErrorZ_clone(this.ptr);
		Result_CResult_NetAddressu8ZDecodeErrorZ ret_hu_conv = Result_CResult_NetAddressu8ZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
