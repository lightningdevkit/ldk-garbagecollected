package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_NoneNoneZ extends CommonBase {
	private Result_NoneNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneNoneZ_free(ptr); } super.finalize();
	}

	static Result_NoneNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneNoneZ_is_ok(ptr)) {
			return new Result_NoneNoneZ_OK(null, ptr);
		} else {
			return new Result_NoneNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneNoneZ_OK extends Result_NoneNoneZ {
		private Result_NoneNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneNoneZ_Err extends Result_NoneNoneZ {
		private Result_NoneNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_NoneNoneZ in the success state.
	 */
	public static Result_NoneNoneZ ok() {
		long ret = bindings.CResult_NoneNoneZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneNoneZ in the error state.
	 */
	public static Result_NoneNoneZ err() {
		long ret = bindings.CResult_NoneNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_NoneNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneNoneZ clone() {
		long ret = bindings.CResult_NoneNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
