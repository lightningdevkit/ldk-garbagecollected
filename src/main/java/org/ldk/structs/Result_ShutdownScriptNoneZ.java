package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ShutdownScriptNoneZ extends CommonBase {
	private Result_ShutdownScriptNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ShutdownScriptNoneZ_free(ptr); } super.finalize();
	}

	static Result_ShutdownScriptNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ShutdownScriptNoneZ_is_ok(ptr)) {
			return new Result_ShutdownScriptNoneZ_OK(null, ptr);
		} else {
			return new Result_ShutdownScriptNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_ShutdownScriptNoneZ_OK extends Result_ShutdownScriptNoneZ {
		public final ShutdownScript res;
		private Result_ShutdownScriptNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_ShutdownScriptNoneZ_get_ok(ptr);
			org.ldk.structs.ShutdownScript res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.ShutdownScript(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ShutdownScriptNoneZ_Err extends Result_ShutdownScriptNoneZ {
		private Result_ShutdownScriptNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_ShutdownScriptNoneZ in the success state.
	 */
	public static Result_ShutdownScriptNoneZ ok(org.ldk.structs.ShutdownScript o) {
		long ret = bindings.CResult_ShutdownScriptNoneZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptNoneZ ret_hu_conv = Result_ShutdownScriptNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ShutdownScriptNoneZ in the error state.
	 */
	public static Result_ShutdownScriptNoneZ err() {
		long ret = bindings.CResult_ShutdownScriptNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptNoneZ ret_hu_conv = Result_ShutdownScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ShutdownScriptNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ShutdownScriptNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ShutdownScriptNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ShutdownScriptNoneZ clone() {
		long ret = bindings.CResult_ShutdownScriptNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ShutdownScriptNoneZ ret_hu_conv = Result_ShutdownScriptNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
