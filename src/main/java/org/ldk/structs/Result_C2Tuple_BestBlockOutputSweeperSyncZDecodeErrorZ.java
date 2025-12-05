package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ extends CommonBase {
	private Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_free(ptr); ptr = 0; }
	}

	static Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_is_ok(ptr)) {
			return new Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_OK extends Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ {
		public final TwoTuple_BestBlockOutputSweeperSyncZ res;
		private Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_get_ok(ptr);
			TwoTuple_BestBlockOutputSweeperSyncZ res_hu_conv = new TwoTuple_BestBlockOutputSweeperSyncZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_Err extends Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ {
		public final DecodeError err;
		private Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ in the success state.
	 */
	public static Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ ok(org.ldk.structs.TwoTuple_BestBlockOutputSweeperSyncZ o) {
		long ret = bindings.CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ in the error state.
	 */
	public static Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_C2Tuple_BestBlockOutputSweeperSyncZDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
