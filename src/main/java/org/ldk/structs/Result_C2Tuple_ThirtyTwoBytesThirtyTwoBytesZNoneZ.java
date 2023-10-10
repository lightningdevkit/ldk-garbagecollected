package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ extends CommonBase {
	private Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_is_ok(ptr)) {
			return new Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_OK extends Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ {
		public final TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ res;
		private Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_get_ok(ptr);
			TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ res_hu_conv = new TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_Err extends Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ {
		private Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ in the success state.
	 */
	public static Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ ok(org.ldk.structs.TwoTuple_ThirtyTwoBytesThirtyTwoBytesZ o) {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_ok(o != null ? o.ptr : 0);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ in the error state.
	 */
	public static Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ err() {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ clone() {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
