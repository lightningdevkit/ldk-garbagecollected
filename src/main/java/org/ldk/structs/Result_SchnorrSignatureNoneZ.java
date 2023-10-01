package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SchnorrSignatureNoneZ extends CommonBase {
	private Result_SchnorrSignatureNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SchnorrSignatureNoneZ_free(ptr); } super.finalize();
	}

	static Result_SchnorrSignatureNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SchnorrSignatureNoneZ_is_ok(ptr)) {
			return new Result_SchnorrSignatureNoneZ_OK(null, ptr);
		} else {
			return new Result_SchnorrSignatureNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_SchnorrSignatureNoneZ_OK extends Result_SchnorrSignatureNoneZ {
		public final byte[] res;
		private Result_SchnorrSignatureNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_SchnorrSignatureNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_SchnorrSignatureNoneZ_Err extends Result_SchnorrSignatureNoneZ {
		private Result_SchnorrSignatureNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_SchnorrSignatureNoneZ in the success state.
	 */
	public static Result_SchnorrSignatureNoneZ ok(byte[] o) {
		long ret = bindings.CResult_SchnorrSignatureNoneZ_ok(InternalUtils.check_arr_len(o, 64));
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SchnorrSignatureNoneZ in the error state.
	 */
	public static Result_SchnorrSignatureNoneZ err() {
		long ret = bindings.CResult_SchnorrSignatureNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SchnorrSignatureNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SchnorrSignatureNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SchnorrSignatureNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SchnorrSignatureNoneZ clone() {
		long ret = bindings.CResult_SchnorrSignatureNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SchnorrSignatureNoneZ ret_hu_conv = Result_SchnorrSignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
