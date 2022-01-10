package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SignatureNoneZ extends CommonBase {
	private Result_SignatureNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SignatureNoneZ_free(ptr); } super.finalize();
	}

	static Result_SignatureNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SignatureNoneZ_is_ok(ptr)) {
			return new Result_SignatureNoneZ_OK(null, ptr);
		} else {
			return new Result_SignatureNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_SignatureNoneZ_OK extends Result_SignatureNoneZ {
		public final byte[] res;
		private Result_SignatureNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_SignatureNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_SignatureNoneZ_Err extends Result_SignatureNoneZ {
		private Result_SignatureNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_SignatureNoneZ in the success state.
	 */
	public static Result_SignatureNoneZ ok(byte[] o) {
		long ret = bindings.CResult_SignatureNoneZ_ok(InternalUtils.check_arr_len(o, 64));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SignatureNoneZ in the error state.
	 */
	public static Result_SignatureNoneZ err() {
		long ret = bindings.CResult_SignatureNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SignatureNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SignatureNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SignatureNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SignatureNoneZ clone() {
		long ret = bindings.CResult_SignatureNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignatureNoneZ ret_hu_conv = Result_SignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
