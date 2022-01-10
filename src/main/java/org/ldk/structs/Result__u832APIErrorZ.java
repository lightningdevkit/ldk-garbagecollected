package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result__u832APIErrorZ extends CommonBase {
	private Result__u832APIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult__u832APIErrorZ_free(ptr); } super.finalize();
	}

	static Result__u832APIErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult__u832APIErrorZ_is_ok(ptr)) {
			return new Result__u832APIErrorZ_OK(null, ptr);
		} else {
			return new Result__u832APIErrorZ_Err(null, ptr);
		}
	}
	public static final class Result__u832APIErrorZ_OK extends Result__u832APIErrorZ {
		public final byte[] res;
		private Result__u832APIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult__u832APIErrorZ_get_ok(ptr);
		}
	}

	public static final class Result__u832APIErrorZ_Err extends Result__u832APIErrorZ {
		public final APIError err;
		private Result__u832APIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult__u832APIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult__u832APIErrorZ in the success state.
	 */
	public static Result__u832APIErrorZ ok(byte[] o) {
		long ret = bindings.CResult__u832APIErrorZ_ok(InternalUtils.check_arr_len(o, 32));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult__u832APIErrorZ in the error state.
	 */
	public static Result__u832APIErrorZ err(APIError e) {
		long ret = bindings.CResult__u832APIErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult__u832APIErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult__u832APIErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult__u832APIErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result__u832APIErrorZ clone() {
		long ret = bindings.CResult__u832APIErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
