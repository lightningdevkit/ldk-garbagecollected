package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_PayeeDecodeErrorZ extends CommonBase {
	private Result_PayeeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PayeeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PayeeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PayeeDecodeErrorZ_is_ok(ptr)) {
			return new Result_PayeeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PayeeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PayeeDecodeErrorZ_OK extends Result_PayeeDecodeErrorZ {
		public final Payee res;
		private Result_PayeeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_PayeeDecodeErrorZ_get_ok(ptr);
			Payee res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new Payee(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PayeeDecodeErrorZ_Err extends Result_PayeeDecodeErrorZ {
		public final DecodeError err;
		private Result_PayeeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_PayeeDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PayeeDecodeErrorZ in the success state.
	 */
	public static Result_PayeeDecodeErrorZ ok(Payee o) {
		long ret = bindings.CResult_PayeeDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeeDecodeErrorZ ret_hu_conv = Result_PayeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PayeeDecodeErrorZ in the error state.
	 */
	public static Result_PayeeDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_PayeeDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeeDecodeErrorZ ret_hu_conv = Result_PayeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PayeeDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PayeeDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a new CResult_PayeeDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PayeeDecodeErrorZ clone() {
		long ret = bindings.CResult_PayeeDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeeDecodeErrorZ ret_hu_conv = Result_PayeeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
