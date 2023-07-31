package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_OnionMessagePathNoneZ extends CommonBase {
	private Result_OnionMessagePathNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_OnionMessagePathNoneZ_free(ptr); } super.finalize();
	}

	static Result_OnionMessagePathNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_OnionMessagePathNoneZ_is_ok(ptr)) {
			return new Result_OnionMessagePathNoneZ_OK(null, ptr);
		} else {
			return new Result_OnionMessagePathNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_OnionMessagePathNoneZ_OK extends Result_OnionMessagePathNoneZ {
		public final OnionMessagePath res;
		private Result_OnionMessagePathNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_OnionMessagePathNoneZ_get_ok(ptr);
			org.ldk.structs.OnionMessagePath res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.OnionMessagePath(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_OnionMessagePathNoneZ_Err extends Result_OnionMessagePathNoneZ {
		private Result_OnionMessagePathNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_OnionMessagePathNoneZ in the success state.
	 */
	public static Result_OnionMessagePathNoneZ ok(org.ldk.structs.OnionMessagePath o) {
		long ret = bindings.CResult_OnionMessagePathNoneZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessagePathNoneZ ret_hu_conv = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_OnionMessagePathNoneZ in the error state.
	 */
	public static Result_OnionMessagePathNoneZ err() {
		long ret = bindings.CResult_OnionMessagePathNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessagePathNoneZ ret_hu_conv = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_OnionMessagePathNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_OnionMessagePathNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_OnionMessagePathNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_OnionMessagePathNoneZ clone() {
		long ret = bindings.CResult_OnionMessagePathNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OnionMessagePathNoneZ ret_hu_conv = Result_OnionMessagePathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
