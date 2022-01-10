package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PaymentSecretNoneZ extends CommonBase {
	private Result_PaymentSecretNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaymentSecretNoneZ_free(ptr); } super.finalize();
	}

	static Result_PaymentSecretNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaymentSecretNoneZ_is_ok(ptr)) {
			return new Result_PaymentSecretNoneZ_OK(null, ptr);
		} else {
			return new Result_PaymentSecretNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_PaymentSecretNoneZ_OK extends Result_PaymentSecretNoneZ {
		public final byte[] res;
		private Result_PaymentSecretNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_PaymentSecretNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_PaymentSecretNoneZ_Err extends Result_PaymentSecretNoneZ {
		private Result_PaymentSecretNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_PaymentSecretNoneZ in the success state.
	 */
	public static Result_PaymentSecretNoneZ ok(byte[] o) {
		long ret = bindings.CResult_PaymentSecretNoneZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretNoneZ ret_hu_conv = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaymentSecretNoneZ in the error state.
	 */
	public static Result_PaymentSecretNoneZ err() {
		long ret = bindings.CResult_PaymentSecretNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretNoneZ ret_hu_conv = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PaymentSecretNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PaymentSecretNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaymentSecretNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaymentSecretNoneZ clone() {
		long ret = bindings.CResult_PaymentSecretNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretNoneZ ret_hu_conv = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
