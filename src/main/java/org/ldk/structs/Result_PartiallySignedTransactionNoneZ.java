package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PartiallySignedTransactionNoneZ extends CommonBase {
	private Result_PartiallySignedTransactionNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PartiallySignedTransactionNoneZ_free(ptr); } super.finalize();
	}

	static Result_PartiallySignedTransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PartiallySignedTransactionNoneZ_is_ok(ptr)) {
			return new Result_PartiallySignedTransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_PartiallySignedTransactionNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_PartiallySignedTransactionNoneZ_OK extends Result_PartiallySignedTransactionNoneZ {
		public final byte[] res;
		private Result_PartiallySignedTransactionNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_PartiallySignedTransactionNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_PartiallySignedTransactionNoneZ_Err extends Result_PartiallySignedTransactionNoneZ {
		private Result_PartiallySignedTransactionNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_PartiallySignedTransactionNoneZ in the success state.
	 */
	public static Result_PartiallySignedTransactionNoneZ ok(byte[] o) {
		long ret = bindings.CResult_PartiallySignedTransactionNoneZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PartiallySignedTransactionNoneZ ret_hu_conv = Result_PartiallySignedTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PartiallySignedTransactionNoneZ in the error state.
	 */
	public static Result_PartiallySignedTransactionNoneZ err() {
		long ret = bindings.CResult_PartiallySignedTransactionNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PartiallySignedTransactionNoneZ ret_hu_conv = Result_PartiallySignedTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PartiallySignedTransactionNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PartiallySignedTransactionNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PartiallySignedTransactionNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PartiallySignedTransactionNoneZ clone() {
		long ret = bindings.CResult_PartiallySignedTransactionNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PartiallySignedTransactionNoneZ ret_hu_conv = Result_PartiallySignedTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
