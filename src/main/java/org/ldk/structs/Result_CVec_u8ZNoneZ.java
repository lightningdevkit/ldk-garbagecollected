package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CVec_u8ZNoneZ extends CommonBase {
	private Result_CVec_u8ZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_u8ZNoneZ_free(ptr); } super.finalize();
	}

	static Result_CVec_u8ZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_u8ZNoneZ_is_ok(ptr)) {
			return new Result_CVec_u8ZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_u8ZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_u8ZNoneZ_OK extends Result_CVec_u8ZNoneZ {
		public final byte[] res;
		private Result_CVec_u8ZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_CVec_u8ZNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_CVec_u8ZNoneZ_Err extends Result_CVec_u8ZNoneZ {
		private Result_CVec_u8ZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_u8ZNoneZ in the success state.
	 */
	public static Result_CVec_u8ZNoneZ ok(byte[] o) {
		long ret = bindings.CResult_CVec_u8ZNoneZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_u8ZNoneZ in the error state.
	 */
	public static Result_CVec_u8ZNoneZ err() {
		long ret = bindings.CResult_CVec_u8ZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CVec_u8ZNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CVec_u8ZNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_u8ZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_u8ZNoneZ clone() {
		long ret = bindings.CResult_CVec_u8ZNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
