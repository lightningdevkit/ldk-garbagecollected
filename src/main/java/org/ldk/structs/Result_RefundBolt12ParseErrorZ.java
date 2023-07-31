package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_RefundBolt12ParseErrorZ extends CommonBase {
	private Result_RefundBolt12ParseErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RefundBolt12ParseErrorZ_free(ptr); } super.finalize();
	}

	static Result_RefundBolt12ParseErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RefundBolt12ParseErrorZ_is_ok(ptr)) {
			return new Result_RefundBolt12ParseErrorZ_OK(null, ptr);
		} else {
			return new Result_RefundBolt12ParseErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RefundBolt12ParseErrorZ_OK extends Result_RefundBolt12ParseErrorZ {
		public final Refund res;
		private Result_RefundBolt12ParseErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_RefundBolt12ParseErrorZ_get_ok(ptr);
			org.ldk.structs.Refund res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.Refund(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RefundBolt12ParseErrorZ_Err extends Result_RefundBolt12ParseErrorZ {
		public final Bolt12ParseError err;
		private Result_RefundBolt12ParseErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_RefundBolt12ParseErrorZ_get_err(ptr);
			org.ldk.structs.Bolt12ParseError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new org.ldk.structs.Bolt12ParseError(null, err); }
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_RefundBolt12ParseErrorZ in the success state.
	 */
	public static Result_RefundBolt12ParseErrorZ ok(org.ldk.structs.Refund o) {
		long ret = bindings.CResult_RefundBolt12ParseErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RefundBolt12ParseErrorZ ret_hu_conv = Result_RefundBolt12ParseErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RefundBolt12ParseErrorZ in the error state.
	 */
	public static Result_RefundBolt12ParseErrorZ err(org.ldk.structs.Bolt12ParseError e) {
		long ret = bindings.CResult_RefundBolt12ParseErrorZ_err(e == null ? 0 : e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RefundBolt12ParseErrorZ ret_hu_conv = Result_RefundBolt12ParseErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_RefundBolt12ParseErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_RefundBolt12ParseErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RefundBolt12ParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RefundBolt12ParseErrorZ clone() {
		long ret = bindings.CResult_RefundBolt12ParseErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RefundBolt12ParseErrorZ ret_hu_conv = Result_RefundBolt12ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
