package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PublicKeyNoneZ extends CommonBase {
	private Result_PublicKeyNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PublicKeyNoneZ_free(ptr); } super.finalize();
	}

	static Result_PublicKeyNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PublicKeyNoneZ_is_ok(ptr)) {
			return new Result_PublicKeyNoneZ_OK(null, ptr);
		} else {
			return new Result_PublicKeyNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_PublicKeyNoneZ_OK extends Result_PublicKeyNoneZ {
		public final byte[] res;
		private Result_PublicKeyNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_PublicKeyNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_PublicKeyNoneZ_Err extends Result_PublicKeyNoneZ {
		private Result_PublicKeyNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_PublicKeyNoneZ in the success state.
	 */
	public static Result_PublicKeyNoneZ ok(byte[] o) {
		long ret = bindings.CResult_PublicKeyNoneZ_ok(InternalUtils.check_arr_len(o, 33));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyNoneZ ret_hu_conv = Result_PublicKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PublicKeyNoneZ in the error state.
	 */
	public static Result_PublicKeyNoneZ err() {
		long ret = bindings.CResult_PublicKeyNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyNoneZ ret_hu_conv = Result_PublicKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PublicKeyNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PublicKeyNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PublicKeyNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PublicKeyNoneZ clone() {
		long ret = bindings.CResult_PublicKeyNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyNoneZ ret_hu_conv = Result_PublicKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
