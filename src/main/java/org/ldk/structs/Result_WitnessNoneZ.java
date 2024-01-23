package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_WitnessNoneZ extends CommonBase {
	private Result_WitnessNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_WitnessNoneZ_free(ptr); } super.finalize();
	}

	static Result_WitnessNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_WitnessNoneZ_is_ok(ptr)) {
			return new Result_WitnessNoneZ_OK(null, ptr);
		} else {
			return new Result_WitnessNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_WitnessNoneZ_OK extends Result_WitnessNoneZ {
		public final byte[] res;
		private Result_WitnessNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_WitnessNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_WitnessNoneZ_Err extends Result_WitnessNoneZ {
		private Result_WitnessNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_WitnessNoneZ in the success state.
	 */
	public static Result_WitnessNoneZ ok(byte[] o) {
		long ret = bindings.CResult_WitnessNoneZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_WitnessNoneZ in the error state.
	 */
	public static Result_WitnessNoneZ err() {
		long ret = bindings.CResult_WitnessNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_WitnessNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_WitnessNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_WitnessNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_WitnessNoneZ clone() {
		long ret = bindings.CResult_WitnessNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_WitnessNoneZ ret_hu_conv = Result_WitnessNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
