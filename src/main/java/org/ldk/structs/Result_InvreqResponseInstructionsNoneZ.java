package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_InvreqResponseInstructionsNoneZ extends CommonBase {
	private Result_InvreqResponseInstructionsNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InvreqResponseInstructionsNoneZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_InvreqResponseInstructionsNoneZ_free(ptr); ptr = 0; }
	}

	static Result_InvreqResponseInstructionsNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_InvreqResponseInstructionsNoneZ_is_ok(ptr)) {
			return new Result_InvreqResponseInstructionsNoneZ_OK(null, ptr);
		} else {
			return new Result_InvreqResponseInstructionsNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_InvreqResponseInstructionsNoneZ_OK extends Result_InvreqResponseInstructionsNoneZ {
		public final InvreqResponseInstructions res;
		private Result_InvreqResponseInstructionsNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_InvreqResponseInstructionsNoneZ_get_ok(ptr);
			org.ldk.structs.InvreqResponseInstructions res_hu_conv = org.ldk.structs.InvreqResponseInstructions.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InvreqResponseInstructionsNoneZ_Err extends Result_InvreqResponseInstructionsNoneZ {
		private Result_InvreqResponseInstructionsNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_InvreqResponseInstructionsNoneZ in the success state.
	 */
	public static Result_InvreqResponseInstructionsNoneZ ok(org.ldk.structs.InvreqResponseInstructions o) {
		long ret = bindings.CResult_InvreqResponseInstructionsNoneZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvreqResponseInstructionsNoneZ ret_hu_conv = Result_InvreqResponseInstructionsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InvreqResponseInstructionsNoneZ in the error state.
	 */
	public static Result_InvreqResponseInstructionsNoneZ err() {
		long ret = bindings.CResult_InvreqResponseInstructionsNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvreqResponseInstructionsNoneZ ret_hu_conv = Result_InvreqResponseInstructionsNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_InvreqResponseInstructionsNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
