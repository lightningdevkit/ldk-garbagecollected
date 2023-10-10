package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PublicKeySecp256k1ErrorZ extends CommonBase {
	private Result_PublicKeySecp256k1ErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PublicKeySecp256k1ErrorZ_free(ptr); } super.finalize();
	}

	static Result_PublicKeySecp256k1ErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PublicKeySecp256k1ErrorZ_is_ok(ptr)) {
			return new Result_PublicKeySecp256k1ErrorZ_OK(null, ptr);
		} else {
			return new Result_PublicKeySecp256k1ErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PublicKeySecp256k1ErrorZ_OK extends Result_PublicKeySecp256k1ErrorZ {
		public final byte[] res;
		private Result_PublicKeySecp256k1ErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_PublicKeySecp256k1ErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_PublicKeySecp256k1ErrorZ_Err extends Result_PublicKeySecp256k1ErrorZ {
		public final Secp256k1Error err;
		private Result_PublicKeySecp256k1ErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_PublicKeySecp256k1ErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_PublicKeySecp256k1ErrorZ in the success state.
	 */
	public static Result_PublicKeySecp256k1ErrorZ ok(byte[] o) {
		long ret = bindings.CResult_PublicKeySecp256k1ErrorZ_ok(InternalUtils.check_arr_len(o, 33));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeySecp256k1ErrorZ ret_hu_conv = Result_PublicKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PublicKeySecp256k1ErrorZ in the error state.
	 */
	public static Result_PublicKeySecp256k1ErrorZ err(org.ldk.enums.Secp256k1Error e) {
		long ret = bindings.CResult_PublicKeySecp256k1ErrorZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeySecp256k1ErrorZ ret_hu_conv = Result_PublicKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PublicKeySecp256k1ErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PublicKeySecp256k1ErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PublicKeySecp256k1ErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PublicKeySecp256k1ErrorZ clone() {
		long ret = bindings.CResult_PublicKeySecp256k1ErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeySecp256k1ErrorZ ret_hu_conv = Result_PublicKeySecp256k1ErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
