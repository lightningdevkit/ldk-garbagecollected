package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_boolLightningErrorZ extends CommonBase {
	private Result_boolLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_boolLightningErrorZ_free(ptr); } super.finalize();
	}

	static Result_boolLightningErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_boolLightningErrorZ_is_ok(ptr)) {
			return new Result_boolLightningErrorZ_OK(null, ptr);
		} else {
			return new Result_boolLightningErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_boolLightningErrorZ_OK extends Result_boolLightningErrorZ {
		public final boolean res;
		private Result_boolLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_boolLightningErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_boolLightningErrorZ_Err extends Result_boolLightningErrorZ {
		public final LightningError err;
		private Result_boolLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_boolLightningErrorZ_get_err(ptr);
			LightningError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new LightningError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_boolLightningErrorZ in the success state.
	 */
	public static Result_boolLightningErrorZ ok(boolean o) {
		long ret = bindings.CResult_boolLightningErrorZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_boolLightningErrorZ in the error state.
	 */
	public static Result_boolLightningErrorZ err(LightningError e) {
		long ret = bindings.CResult_boolLightningErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_boolLightningErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_boolLightningErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_boolLightningErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_boolLightningErrorZ clone() {
		long ret = bindings.CResult_boolLightningErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolLightningErrorZ ret_hu_conv = Result_boolLightningErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
