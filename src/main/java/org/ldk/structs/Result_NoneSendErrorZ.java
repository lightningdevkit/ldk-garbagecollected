package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_NoneSendErrorZ extends CommonBase {
	private Result_NoneSendErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneSendErrorZ_free(ptr); } super.finalize();
	}

	static Result_NoneSendErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneSendErrorZ_is_ok(ptr)) {
			return new Result_NoneSendErrorZ_OK(null, ptr);
		} else {
			return new Result_NoneSendErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneSendErrorZ_OK extends Result_NoneSendErrorZ {
		private Result_NoneSendErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneSendErrorZ_Err extends Result_NoneSendErrorZ {
		public final SendError err;
		private Result_NoneSendErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_NoneSendErrorZ_get_err(ptr);
			org.ldk.structs.SendError err_hu_conv = org.ldk.structs.SendError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NoneSendErrorZ in the success state.
	 */
	public static Result_NoneSendErrorZ ok() {
		long ret = bindings.CResult_NoneSendErrorZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSendErrorZ ret_hu_conv = Result_NoneSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneSendErrorZ in the error state.
	 */
	public static Result_NoneSendErrorZ err(org.ldk.structs.SendError e) {
		long ret = bindings.CResult_NoneSendErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneSendErrorZ ret_hu_conv = Result_NoneSendErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneSendErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
