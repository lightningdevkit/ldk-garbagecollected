package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ThirtyTwoBytesNoneZ extends CommonBase {
	private Result_ThirtyTwoBytesNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ThirtyTwoBytesNoneZ_free(ptr); } super.finalize();
	}

	static Result_ThirtyTwoBytesNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ThirtyTwoBytesNoneZ_is_ok(ptr)) {
			return new Result_ThirtyTwoBytesNoneZ_OK(null, ptr);
		} else {
			return new Result_ThirtyTwoBytesNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_ThirtyTwoBytesNoneZ_OK extends Result_ThirtyTwoBytesNoneZ {
		public final byte[] res;
		private Result_ThirtyTwoBytesNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_ThirtyTwoBytesNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_ThirtyTwoBytesNoneZ_Err extends Result_ThirtyTwoBytesNoneZ {
		private Result_ThirtyTwoBytesNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesNoneZ in the success state.
	 */
	public static Result_ThirtyTwoBytesNoneZ ok(byte[] o) {
		long ret = bindings.CResult_ThirtyTwoBytesNoneZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesNoneZ in the error state.
	 */
	public static Result_ThirtyTwoBytesNoneZ err() {
		long ret = bindings.CResult_ThirtyTwoBytesNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ThirtyTwoBytesNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ThirtyTwoBytesNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ThirtyTwoBytesNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ThirtyTwoBytesNoneZ clone() {
		long ret = bindings.CResult_ThirtyTwoBytesNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
