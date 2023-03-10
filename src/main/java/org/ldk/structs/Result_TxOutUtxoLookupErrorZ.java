package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_TxOutUtxoLookupErrorZ extends CommonBase {
	private Result_TxOutUtxoLookupErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TxOutUtxoLookupErrorZ_free(ptr); } super.finalize();
	}

	static Result_TxOutUtxoLookupErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_TxOutUtxoLookupErrorZ_is_ok(ptr)) {
			return new Result_TxOutUtxoLookupErrorZ_OK(null, ptr);
		} else {
			return new Result_TxOutUtxoLookupErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_TxOutUtxoLookupErrorZ_OK extends Result_TxOutUtxoLookupErrorZ {
		public final TxOut res;
		private Result_TxOutUtxoLookupErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_TxOutUtxoLookupErrorZ_get_ok(ptr);
			TxOut res_conv = new TxOut(null, res);
			this.res = res_conv;
		}
	}

	public static final class Result_TxOutUtxoLookupErrorZ_Err extends Result_TxOutUtxoLookupErrorZ {
		public final UtxoLookupError err;
		private Result_TxOutUtxoLookupErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_TxOutUtxoLookupErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_TxOutUtxoLookupErrorZ in the success state.
	 */
	public static Result_TxOutUtxoLookupErrorZ ok(org.ldk.structs.TxOut o) {
		long ret = bindings.CResult_TxOutUtxoLookupErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutUtxoLookupErrorZ ret_hu_conv = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_TxOutUtxoLookupErrorZ in the error state.
	 */
	public static Result_TxOutUtxoLookupErrorZ err(org.ldk.enums.UtxoLookupError e) {
		long ret = bindings.CResult_TxOutUtxoLookupErrorZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutUtxoLookupErrorZ ret_hu_conv = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_TxOutUtxoLookupErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_TxOutUtxoLookupErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_TxOutUtxoLookupErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_TxOutUtxoLookupErrorZ clone() {
		long ret = bindings.CResult_TxOutUtxoLookupErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_TxOutUtxoLookupErrorZ ret_hu_conv = Result_TxOutUtxoLookupErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
