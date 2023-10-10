package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_NoneIOErrorZ extends CommonBase {
	private Result_NoneIOErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneIOErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneIOErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneIOErrorZ_is_ok(ptr)) {
			return new Result_NoneIOErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneIOErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneIOErrorZ_OK extends Result_NoneIOErrorZ {
		private Result_NoneIOErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneIOErrorZ_Err extends Result_NoneIOErrorZ {
		public final IOError err;
		private Result_NoneIOErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_NoneIOErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_NoneIOErrorZ in the success state.
	 */
	public static Result_NoneIOErrorZ ok() {
		long ret = bindings.CResult_NoneIOErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneIOErrorZ in the error state.
	 */
	public static Result_NoneIOErrorZ err(org.ldk.enums.IOError e) {
		long ret = bindings.CResult_NoneIOErrorZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneIOErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_NoneIOErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneIOErrorZ clone() {
		long ret = bindings.CResult_NoneIOErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneIOErrorZ ret_hu_conv = Result_NoneIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
