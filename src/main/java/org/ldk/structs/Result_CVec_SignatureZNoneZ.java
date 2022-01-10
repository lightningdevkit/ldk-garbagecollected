package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CVec_SignatureZNoneZ extends CommonBase {
	private Result_CVec_SignatureZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_SignatureZNoneZ_free(ptr); } super.finalize();
	}

	static Result_CVec_SignatureZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_SignatureZNoneZ_is_ok(ptr)) {
			return new Result_CVec_SignatureZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_SignatureZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_SignatureZNoneZ_OK extends Result_CVec_SignatureZNoneZ {
		public final byte[][] res;
		private Result_CVec_SignatureZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_CVec_SignatureZNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_CVec_SignatureZNoneZ_Err extends Result_CVec_SignatureZNoneZ {
		private Result_CVec_SignatureZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_SignatureZNoneZ in the success state.
	 */
	public static Result_CVec_SignatureZNoneZ ok(byte[][] o) {
		long ret = bindings.CResult_CVec_SignatureZNoneZ_ok(o != null ? Arrays.stream(o).map(o_conv_8 -> InternalUtils.check_arr_len(o_conv_8, 64)).toArray(byte[][]::new) : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_SignatureZNoneZ in the error state.
	 */
	public static Result_CVec_SignatureZNoneZ err() {
		long ret = bindings.CResult_CVec_SignatureZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CVec_SignatureZNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CVec_SignatureZNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_SignatureZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_SignatureZNoneZ clone() {
		long ret = bindings.CResult_CVec_SignatureZNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_SignatureZNoneZ ret_hu_conv = Result_CVec_SignatureZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
