package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ScriptNoneZ extends CommonBase {
	private Result_ScriptNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ScriptNoneZ_free(ptr); } super.finalize();
	}

	static Result_ScriptNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ScriptNoneZ_is_ok(ptr)) {
			return new Result_ScriptNoneZ_OK(null, ptr);
		} else {
			return new Result_ScriptNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_ScriptNoneZ_OK extends Result_ScriptNoneZ {
		public final byte[] res;
		private Result_ScriptNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_ScriptNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_ScriptNoneZ_Err extends Result_ScriptNoneZ {
		private Result_ScriptNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_ScriptNoneZ in the success state.
	 */
	public static Result_ScriptNoneZ ok(byte[] o) {
		long ret = bindings.CResult_ScriptNoneZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScriptNoneZ ret_hu_conv = Result_ScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ScriptNoneZ in the error state.
	 */
	public static Result_ScriptNoneZ err() {
		long ret = bindings.CResult_ScriptNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScriptNoneZ ret_hu_conv = Result_ScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ScriptNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ScriptNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ScriptNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ScriptNoneZ clone() {
		long ret = bindings.CResult_ScriptNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ScriptNoneZ ret_hu_conv = Result_ScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
