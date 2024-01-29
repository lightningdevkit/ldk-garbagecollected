package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PendingHTLCRoutingDecodeErrorZ extends CommonBase {
	private Result_PendingHTLCRoutingDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PendingHTLCRoutingDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_PendingHTLCRoutingDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PendingHTLCRoutingDecodeErrorZ_is_ok(ptr)) {
			return new Result_PendingHTLCRoutingDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PendingHTLCRoutingDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PendingHTLCRoutingDecodeErrorZ_OK extends Result_PendingHTLCRoutingDecodeErrorZ {
		public final PendingHTLCRouting res;
		private Result_PendingHTLCRoutingDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_PendingHTLCRoutingDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.PendingHTLCRouting res_hu_conv = org.ldk.structs.PendingHTLCRouting.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PendingHTLCRoutingDecodeErrorZ_Err extends Result_PendingHTLCRoutingDecodeErrorZ {
		public final DecodeError err;
		private Result_PendingHTLCRoutingDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PendingHTLCRoutingDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PendingHTLCRoutingDecodeErrorZ in the success state.
	 */
	public static Result_PendingHTLCRoutingDecodeErrorZ ok(org.ldk.structs.PendingHTLCRouting o) {
		long ret = bindings.CResult_PendingHTLCRoutingDecodeErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCRoutingDecodeErrorZ ret_hu_conv = Result_PendingHTLCRoutingDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PendingHTLCRoutingDecodeErrorZ in the error state.
	 */
	public static Result_PendingHTLCRoutingDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_PendingHTLCRoutingDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCRoutingDecodeErrorZ ret_hu_conv = Result_PendingHTLCRoutingDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PendingHTLCRoutingDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PendingHTLCRoutingDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PendingHTLCRoutingDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PendingHTLCRoutingDecodeErrorZ clone() {
		long ret = bindings.CResult_PendingHTLCRoutingDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PendingHTLCRoutingDecodeErrorZ ret_hu_conv = Result_PendingHTLCRoutingDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
