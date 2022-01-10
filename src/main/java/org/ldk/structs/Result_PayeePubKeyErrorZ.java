package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PayeePubKeyErrorZ extends CommonBase {
	private Result_PayeePubKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PayeePubKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_PayeePubKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PayeePubKeyErrorZ_is_ok(ptr)) {
			return new Result_PayeePubKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_PayeePubKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PayeePubKeyErrorZ_OK extends Result_PayeePubKeyErrorZ {
		public final PayeePubKey res;
		private Result_PayeePubKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_PayeePubKeyErrorZ_get_ok(ptr);
			PayeePubKey res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new PayeePubKey(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PayeePubKeyErrorZ_Err extends Result_PayeePubKeyErrorZ {
		public final Secp256k1Error err;
		private Result_PayeePubKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_PayeePubKeyErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PayeePubKeyErrorZ in the success state.
	 */
	public static Result_PayeePubKeyErrorZ ok(PayeePubKey o) {
		long ret = bindings.CResult_PayeePubKeyErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PayeePubKeyErrorZ in the error state.
	 */
	public static Result_PayeePubKeyErrorZ err(org.ldk.enums.Secp256k1Error e) {
		long ret = bindings.CResult_PayeePubKeyErrorZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PayeePubKeyErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PayeePubKeyErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PayeePubKeyErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PayeePubKeyErrorZ clone() {
		long ret = bindings.CResult_PayeePubKeyErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeyErrorZ ret_hu_conv = Result_PayeePubKeyErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
