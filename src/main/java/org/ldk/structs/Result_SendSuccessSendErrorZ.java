package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SendSuccessSendErrorZ extends CommonBase {
	private Result_SendSuccessSendErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SendSuccessSendErrorZ_free(ptr); } super.finalize();
	}

	static Result_SendSuccessSendErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SendSuccessSendErrorZ_is_ok(ptr)) {
			return new Result_SendSuccessSendErrorZ_OK(null, ptr);
		} else {
			return new Result_SendSuccessSendErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SendSuccessSendErrorZ_OK extends Result_SendSuccessSendErrorZ {
		public final SendSuccess res;
		private Result_SendSuccessSendErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_SendSuccessSendErrorZ_get_ok(ptr);
			org.ldk.structs.SendSuccess res_hu_conv = org.ldk.structs.SendSuccess.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_SendSuccessSendErrorZ_Err extends Result_SendSuccessSendErrorZ {
		public final SendError err;
		private Result_SendSuccessSendErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_SendSuccessSendErrorZ_get_err(ptr);
			org.ldk.structs.SendError err_hu_conv = org.ldk.structs.SendError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SendSuccessSendErrorZ in the success state.
	 */
	public static Result_SendSuccessSendErrorZ ok(org.ldk.structs.SendSuccess o) {
		long ret = bindings.CResult_SendSuccessSendErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SendSuccessSendErrorZ ret_hu_conv = Result_SendSuccessSendErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SendSuccessSendErrorZ in the error state.
	 */
	public static Result_SendSuccessSendErrorZ err(org.ldk.structs.SendError e) {
		long ret = bindings.CResult_SendSuccessSendErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SendSuccessSendErrorZ ret_hu_conv = Result_SendSuccessSendErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SendSuccessSendErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
