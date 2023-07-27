package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CVec_UtxoZNoneZ extends CommonBase {
	private Result_CVec_UtxoZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_UtxoZNoneZ_free(ptr); } super.finalize();
	}

	static Result_CVec_UtxoZNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CVec_UtxoZNoneZ_is_ok(ptr)) {
			return new Result_CVec_UtxoZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_UtxoZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_UtxoZNoneZ_OK extends Result_CVec_UtxoZNoneZ {
		public final Utxo[] res;
		private Result_CVec_UtxoZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long[] res = bindings.CResult_CVec_UtxoZNoneZ_get_ok(ptr);
			int res_conv_6_len = res.length;
			Utxo[] res_conv_6_arr = new Utxo[res_conv_6_len];
			for (int g = 0; g < res_conv_6_len; g++) {
				long res_conv_6 = res[g];
				org.ldk.structs.Utxo res_conv_6_hu_conv = null; if (res_conv_6 < 0 || res_conv_6 > 4096) { res_conv_6_hu_conv = new org.ldk.structs.Utxo(null, res_conv_6); }
				if (res_conv_6_hu_conv != null) { res_conv_6_hu_conv.ptrs_to.add(this); };
				res_conv_6_arr[g] = res_conv_6_hu_conv;
			}
			this.res = res_conv_6_arr;
		}
	}

	public static final class Result_CVec_UtxoZNoneZ_Err extends Result_CVec_UtxoZNoneZ {
		private Result_CVec_UtxoZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_CVec_UtxoZNoneZ in the success state.
	 */
	public static Result_CVec_UtxoZNoneZ ok(Utxo[] o) {
		long ret = bindings.CResult_CVec_UtxoZNoneZ_ok(o != null ? Arrays.stream(o).mapToLong(o_conv_6 -> o_conv_6 == null ? 0 : o_conv_6.ptr).toArray() : null);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_UtxoZNoneZ ret_hu_conv = Result_CVec_UtxoZNoneZ.constr_from_ptr(ret);
		for (Utxo o_conv_6: o) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o_conv_6); }; };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_UtxoZNoneZ in the error state.
	 */
	public static Result_CVec_UtxoZNoneZ err() {
		long ret = bindings.CResult_CVec_UtxoZNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_UtxoZNoneZ ret_hu_conv = Result_CVec_UtxoZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CVec_UtxoZNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CVec_UtxoZNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CVec_UtxoZNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_UtxoZNoneZ clone() {
		long ret = bindings.CResult_CVec_UtxoZNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_UtxoZNoneZ ret_hu_conv = Result_CVec_UtxoZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
