package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_NoneLightningErrorZ extends CommonBase {
	private Result_NoneLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneLightningErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneLightningErrorZ_is_ok(ptr)) {
			return new Result_NoneLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneLightningErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneLightningErrorZ_OK extends Result_NoneLightningErrorZ {
		private Result_NoneLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneLightningErrorZ_Err extends Result_NoneLightningErrorZ {
		public final LightningError err;
		private Result_NoneLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_NoneLightningErrorZ_get_err(ptr);
			LightningError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new LightningError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NoneLightningErrorZ in the success state.
	 */
	public static Result_NoneLightningErrorZ ok() {
		long ret = bindings.CResult_NoneLightningErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneLightningErrorZ in the error state.
	 */
	public static Result_NoneLightningErrorZ err(LightningError e) {
		long ret = bindings.CResult_NoneLightningErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneLightningErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_NoneLightningErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneLightningErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneLightningErrorZ clone() {
		long ret = bindings.CResult_NoneLightningErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneLightningErrorZ ret_hu_conv = Result_NoneLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
