package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PayeePubKeySecp256k1ErrorZ extends CommonBase {
	private Result_PayeePubKeySecp256k1ErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PayeePubKeySecp256k1ErrorZ_free(ptr); } super.finalize();
	}

	static Result_PayeePubKeySecp256k1ErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PayeePubKeySecp256k1ErrorZ_is_ok(ptr)) {
			return new Result_PayeePubKeySecp256k1ErrorZ_OK(null, ptr);
		} else {
			return new Result_PayeePubKeySecp256k1ErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PayeePubKeySecp256k1ErrorZ_OK extends Result_PayeePubKeySecp256k1ErrorZ {
		public final PayeePubKey res;
		private Result_PayeePubKeySecp256k1ErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_PayeePubKeySecp256k1ErrorZ_get_ok(ptr);
			org.ldk.structs.PayeePubKey res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.PayeePubKey(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PayeePubKeySecp256k1ErrorZ_Err extends Result_PayeePubKeySecp256k1ErrorZ {
		public final Secp256k1Error err;
		private Result_PayeePubKeySecp256k1ErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_PayeePubKeySecp256k1ErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PayeePubKeySecp256k1ErrorZ in the success state.
	 */
	public static Result_PayeePubKeySecp256k1ErrorZ ok(org.ldk.structs.PayeePubKey o) {
		long ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeySecp256k1ErrorZ ret_hu_conv = Result_PayeePubKeySecp256k1ErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PayeePubKeySecp256k1ErrorZ in the error state.
	 */
	public static Result_PayeePubKeySecp256k1ErrorZ err(org.ldk.enums.Secp256k1Error e) {
		long ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeySecp256k1ErrorZ ret_hu_conv = Result_PayeePubKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PayeePubKeySecp256k1ErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PayeePubKeySecp256k1ErrorZ clone() {
		long ret = bindings.CResult_PayeePubKeySecp256k1ErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PayeePubKeySecp256k1ErrorZ ret_hu_conv = Result_PayeePubKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
