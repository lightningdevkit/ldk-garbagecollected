package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_TransactionNoneZ extends CommonBase {
	private Result_TransactionNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TransactionNoneZ_free(ptr); } super.finalize();
	}

	static Result_TransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TransactionNoneZ_is_ok(ptr)) {
			return new Result_TransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_TransactionNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_TransactionNoneZ_OK extends Result_TransactionNoneZ {
		public final byte[] res;
		private Result_TransactionNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_TransactionNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_TransactionNoneZ_Err extends Result_TransactionNoneZ {
		private Result_TransactionNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_TransactionNoneZ in the success state.
	 */
	public static Result_TransactionNoneZ ok(byte[] o) {
		long ret = bindings.CResult_TransactionNoneZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TransactionNoneZ in the error state.
	 */
	public static Result_TransactionNoneZ err() {
		long ret = bindings.CResult_TransactionNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_TransactionNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_TransactionNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_TransactionNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_TransactionNoneZ clone() {
		long ret = bindings.CResult_TransactionNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TransactionNoneZ ret_hu_conv = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
