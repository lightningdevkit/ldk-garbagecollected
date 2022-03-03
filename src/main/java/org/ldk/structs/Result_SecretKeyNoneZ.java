package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SecretKeyNoneZ extends CommonBase {
	private Result_SecretKeyNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SecretKeyNoneZ_free(ptr); } super.finalize();
	}

	static Result_SecretKeyNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SecretKeyNoneZ_is_ok(ptr)) {
			return new Result_SecretKeyNoneZ_OK(null, ptr);
		} else {
			return new Result_SecretKeyNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_SecretKeyNoneZ_OK extends Result_SecretKeyNoneZ {
		public final byte[] res;
		private Result_SecretKeyNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_SecretKeyNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_SecretKeyNoneZ_Err extends Result_SecretKeyNoneZ {
		private Result_SecretKeyNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_SecretKeyNoneZ in the success state.
	 */
	public static Result_SecretKeyNoneZ ok(byte[] o) {
		long ret = bindings.CResult_SecretKeyNoneZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyNoneZ ret_hu_conv = Result_SecretKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SecretKeyNoneZ in the error state.
	 */
	public static Result_SecretKeyNoneZ err() {
		long ret = bindings.CResult_SecretKeyNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyNoneZ ret_hu_conv = Result_SecretKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SecretKeyNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SecretKeyNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SecretKeyNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SecretKeyNoneZ clone() {
		long ret = bindings.CResult_SecretKeyNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SecretKeyNoneZ ret_hu_conv = Result_SecretKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
