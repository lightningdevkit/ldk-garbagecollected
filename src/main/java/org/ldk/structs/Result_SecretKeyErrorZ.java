package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SecretKeyErrorZ extends CommonBase {
	private Result_SecretKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SecretKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_SecretKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SecretKeyErrorZ_is_ok(ptr)) {
			return new Result_SecretKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_SecretKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SecretKeyErrorZ_OK extends Result_SecretKeyErrorZ {
		public final byte[] res;
		private Result_SecretKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_SecretKeyErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_SecretKeyErrorZ_Err extends Result_SecretKeyErrorZ {
		public final Secp256k1Error err;
		private Result_SecretKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_SecretKeyErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_SecretKeyErrorZ in the success state.
	 */
	public static Result_SecretKeyErrorZ ok(byte[] o) {
		long ret = bindings.CResult_SecretKeyErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyErrorZ ret_hu_conv = Result_SecretKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SecretKeyErrorZ in the error state.
	 */
	public static Result_SecretKeyErrorZ err(org.ldk.enums.Secp256k1Error e) {
		long ret = bindings.CResult_SecretKeyErrorZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyErrorZ ret_hu_conv = Result_SecretKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SecretKeyErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SecretKeyErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SecretKeyErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SecretKeyErrorZ clone() {
		long ret = bindings.CResult_SecretKeyErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyErrorZ ret_hu_conv = Result_SecretKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
