package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_NetAddressDecodeErrorZ extends CommonBase {
	private Result_NetAddressDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NetAddressDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_NetAddressDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NetAddressDecodeErrorZ_result_ok(ptr)) {
			return new Result_NetAddressDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NetAddressDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NetAddressDecodeErrorZ_OK extends Result_NetAddressDecodeErrorZ {
		public final NetAddress res;
		private Result_NetAddressDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_NetAddressDecodeErrorZ_get_ok(ptr);
			NetAddress res_hu_conv = NetAddress.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_NetAddressDecodeErrorZ_Err extends Result_NetAddressDecodeErrorZ {
		public final DecodeError err;
		private Result_NetAddressDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_NetAddressDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NetAddressDecodeErrorZ in the success state.
	 */
	public static Result_NetAddressDecodeErrorZ ok(NetAddress o) {
		long ret = bindings.CResult_NetAddressDecodeErrorZ_ok(o.ptr);
		if (ret < 1024) { return null; }
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NetAddressDecodeErrorZ in the error state.
	 */
	public static Result_NetAddressDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_NetAddressDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NetAddressDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NetAddressDecodeErrorZ clone() {
		long ret = bindings.CResult_NetAddressDecodeErrorZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
