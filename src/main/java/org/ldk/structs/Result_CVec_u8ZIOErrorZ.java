package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CVec_u8ZIOErrorZ extends CommonBase {
	private Result_CVec_u8ZIOErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_u8ZIOErrorZ_free(ptr); } super.finalize();
	}

	static Result_CVec_u8ZIOErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_u8ZIOErrorZ_is_ok(ptr)) {
			return new Result_CVec_u8ZIOErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_u8ZIOErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_u8ZIOErrorZ_OK extends Result_CVec_u8ZIOErrorZ {
		public final byte[] res;
		private Result_CVec_u8ZIOErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_CVec_u8ZIOErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_CVec_u8ZIOErrorZ_Err extends Result_CVec_u8ZIOErrorZ {
		public final IOError err;
		private Result_CVec_u8ZIOErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_CVec_u8ZIOErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_u8ZIOErrorZ in the success state.
	 */
	public static Result_CVec_u8ZIOErrorZ ok(byte[] o) {
		long ret = bindings.CResult_CVec_u8ZIOErrorZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZIOErrorZ ret_hu_conv = Result_CVec_u8ZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_u8ZIOErrorZ in the error state.
	 */
	public static Result_CVec_u8ZIOErrorZ err(org.ldk.enums.IOError e) {
		long ret = bindings.CResult_CVec_u8ZIOErrorZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZIOErrorZ ret_hu_conv = Result_CVec_u8ZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CVec_u8ZIOErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CVec_u8ZIOErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_u8ZIOErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_u8ZIOErrorZ clone() {
		long ret = bindings.CResult_CVec_u8ZIOErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZIOErrorZ ret_hu_conv = Result_CVec_u8ZIOErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
