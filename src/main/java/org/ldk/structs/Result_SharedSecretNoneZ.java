package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SharedSecretNoneZ extends CommonBase {
	private Result_SharedSecretNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SharedSecretNoneZ_free(ptr); } super.finalize();
	}

	static Result_SharedSecretNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SharedSecretNoneZ_is_ok(ptr)) {
			return new Result_SharedSecretNoneZ_OK(null, ptr);
		} else {
			return new Result_SharedSecretNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_SharedSecretNoneZ_OK extends Result_SharedSecretNoneZ {
		public final byte[] res;
		private Result_SharedSecretNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_SharedSecretNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_SharedSecretNoneZ_Err extends Result_SharedSecretNoneZ {
		private Result_SharedSecretNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_SharedSecretNoneZ in the success state.
	 */
	public static Result_SharedSecretNoneZ ok(byte[] o) {
		long ret = bindings.CResult_SharedSecretNoneZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SharedSecretNoneZ ret_hu_conv = Result_SharedSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SharedSecretNoneZ in the error state.
	 */
	public static Result_SharedSecretNoneZ err() {
		long ret = bindings.CResult_SharedSecretNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SharedSecretNoneZ ret_hu_conv = Result_SharedSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SharedSecretNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SharedSecretNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SharedSecretNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SharedSecretNoneZ clone() {
		long ret = bindings.CResult_SharedSecretNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SharedSecretNoneZ ret_hu_conv = Result_SharedSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
