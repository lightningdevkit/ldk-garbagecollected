package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PeeledOnionNoneZ extends CommonBase {
	private Result_PeeledOnionNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PeeledOnionNoneZ_free(ptr); } super.finalize();
	}

	static Result_PeeledOnionNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PeeledOnionNoneZ_is_ok(ptr)) {
			return new Result_PeeledOnionNoneZ_OK(null, ptr);
		} else {
			return new Result_PeeledOnionNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_PeeledOnionNoneZ_OK extends Result_PeeledOnionNoneZ {
		public final PeeledOnion res;
		private Result_PeeledOnionNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_PeeledOnionNoneZ_get_ok(ptr);
			org.ldk.structs.PeeledOnion res_hu_conv = org.ldk.structs.PeeledOnion.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PeeledOnionNoneZ_Err extends Result_PeeledOnionNoneZ {
		private Result_PeeledOnionNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_PeeledOnionNoneZ in the success state.
	 */
	public static Result_PeeledOnionNoneZ ok(org.ldk.structs.PeeledOnion o) {
		long ret = bindings.CResult_PeeledOnionNoneZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeeledOnionNoneZ ret_hu_conv = Result_PeeledOnionNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PeeledOnionNoneZ in the error state.
	 */
	public static Result_PeeledOnionNoneZ err() {
		long ret = bindings.CResult_PeeledOnionNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PeeledOnionNoneZ ret_hu_conv = Result_PeeledOnionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PeeledOnionNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
