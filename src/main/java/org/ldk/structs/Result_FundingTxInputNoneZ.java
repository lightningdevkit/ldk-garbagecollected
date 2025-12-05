package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_FundingTxInputNoneZ extends CommonBase {
	private Result_FundingTxInputNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_FundingTxInputNoneZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_FundingTxInputNoneZ_free(ptr); ptr = 0; }
	}

	static Result_FundingTxInputNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_FundingTxInputNoneZ_is_ok(ptr)) {
			return new Result_FundingTxInputNoneZ_OK(null, ptr);
		} else {
			return new Result_FundingTxInputNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_FundingTxInputNoneZ_OK extends Result_FundingTxInputNoneZ {
		public final FundingTxInput res;
		private Result_FundingTxInputNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_FundingTxInputNoneZ_get_ok(ptr);
			org.ldk.structs.FundingTxInput res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.FundingTxInput(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_FundingTxInputNoneZ_Err extends Result_FundingTxInputNoneZ {
		private Result_FundingTxInputNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_FundingTxInputNoneZ in the success state.
	 */
	public static Result_FundingTxInputNoneZ ok(org.ldk.structs.FundingTxInput o) {
		long ret = bindings.CResult_FundingTxInputNoneZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_FundingTxInputNoneZ in the error state.
	 */
	public static Result_FundingTxInputNoneZ err() {
		long ret = bindings.CResult_FundingTxInputNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_FundingTxInputNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_FundingTxInputNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_FundingTxInputNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_FundingTxInputNoneZ clone() {
		long ret = bindings.CResult_FundingTxInputNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_FundingTxInputNoneZ ret_hu_conv = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
