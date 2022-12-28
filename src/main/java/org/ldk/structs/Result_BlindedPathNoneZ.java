package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_BlindedPathNoneZ extends CommonBase {
	private Result_BlindedPathNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_BlindedPathNoneZ_free(ptr); } super.finalize();
	}

	static Result_BlindedPathNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_BlindedPathNoneZ_is_ok(ptr)) {
			return new Result_BlindedPathNoneZ_OK(null, ptr);
		} else {
			return new Result_BlindedPathNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_BlindedPathNoneZ_OK extends Result_BlindedPathNoneZ {
		public final BlindedPath res;
		private Result_BlindedPathNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_BlindedPathNoneZ_get_ok(ptr);
			org.ldk.structs.BlindedPath res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.BlindedPath(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_BlindedPathNoneZ_Err extends Result_BlindedPathNoneZ {
		private Result_BlindedPathNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_BlindedPathNoneZ in the success state.
	 */
	public static Result_BlindedPathNoneZ ok(org.ldk.structs.BlindedPath o) {
		long ret = bindings.CResult_BlindedPathNoneZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_BlindedPathNoneZ in the error state.
	 */
	public static Result_BlindedPathNoneZ err() {
		long ret = bindings.CResult_BlindedPathNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_BlindedPathNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_BlindedPathNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_BlindedPathNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_BlindedPathNoneZ clone() {
		long ret = bindings.CResult_BlindedPathNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_BlindedPathNoneZ ret_hu_conv = Result_BlindedPathNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
