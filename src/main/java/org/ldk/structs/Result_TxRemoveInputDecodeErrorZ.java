package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_TxRemoveInputDecodeErrorZ extends CommonBase {
	private Result_TxRemoveInputDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TxRemoveInputDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_TxRemoveInputDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TxRemoveInputDecodeErrorZ_is_ok(ptr)) {
			return new Result_TxRemoveInputDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_TxRemoveInputDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_TxRemoveInputDecodeErrorZ_OK extends Result_TxRemoveInputDecodeErrorZ {
		public final TxRemoveInput res;
		private Result_TxRemoveInputDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_TxRemoveInputDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.TxRemoveInput res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.TxRemoveInput(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_TxRemoveInputDecodeErrorZ_Err extends Result_TxRemoveInputDecodeErrorZ {
		public final DecodeError err;
		private Result_TxRemoveInputDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_TxRemoveInputDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_TxRemoveInputDecodeErrorZ in the success state.
	 */
	public static Result_TxRemoveInputDecodeErrorZ ok(org.ldk.structs.TxRemoveInput o) {
		long ret = bindings.CResult_TxRemoveInputDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxRemoveInputDecodeErrorZ ret_hu_conv = Result_TxRemoveInputDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TxRemoveInputDecodeErrorZ in the error state.
	 */
	public static Result_TxRemoveInputDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_TxRemoveInputDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxRemoveInputDecodeErrorZ ret_hu_conv = Result_TxRemoveInputDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_TxRemoveInputDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_TxRemoveInputDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_TxRemoveInputDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_TxRemoveInputDecodeErrorZ clone() {
		long ret = bindings.CResult_TxRemoveInputDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxRemoveInputDecodeErrorZ ret_hu_conv = Result_TxRemoveInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
