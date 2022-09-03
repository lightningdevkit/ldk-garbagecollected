package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_u32GraphSyncErrorZ extends CommonBase {
	private Result_u32GraphSyncErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_u32GraphSyncErrorZ_free(ptr); } super.finalize();
	}

	static Result_u32GraphSyncErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_u32GraphSyncErrorZ_is_ok(ptr)) {
			return new Result_u32GraphSyncErrorZ_OK(null, ptr);
		} else {
			return new Result_u32GraphSyncErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_u32GraphSyncErrorZ_OK extends Result_u32GraphSyncErrorZ {
		public final int res;
		private Result_u32GraphSyncErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_u32GraphSyncErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_u32GraphSyncErrorZ_Err extends Result_u32GraphSyncErrorZ {
		public final GraphSyncError err;
		private Result_u32GraphSyncErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_u32GraphSyncErrorZ_get_err(ptr);
			org.ldk.structs.GraphSyncError err_hu_conv = org.ldk.structs.GraphSyncError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_u32GraphSyncErrorZ in the success state.
	 */
	public static Result_u32GraphSyncErrorZ ok(int o) {
		long ret = bindings.CResult_u32GraphSyncErrorZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_u32GraphSyncErrorZ ret_hu_conv = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_u32GraphSyncErrorZ in the error state.
	 */
	public static Result_u32GraphSyncErrorZ err(GraphSyncError e) {
		long ret = bindings.CResult_u32GraphSyncErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_u32GraphSyncErrorZ ret_hu_conv = Result_u32GraphSyncErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_u32GraphSyncErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
