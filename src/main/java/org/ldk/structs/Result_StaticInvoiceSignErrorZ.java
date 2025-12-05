package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_StaticInvoiceSignErrorZ extends CommonBase {
	private Result_StaticInvoiceSignErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_StaticInvoiceSignErrorZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_StaticInvoiceSignErrorZ_free(ptr); ptr = 0; }
	}

	static Result_StaticInvoiceSignErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_StaticInvoiceSignErrorZ_is_ok(ptr)) {
			return new Result_StaticInvoiceSignErrorZ_OK(null, ptr);
		} else {
			return new Result_StaticInvoiceSignErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_StaticInvoiceSignErrorZ_OK extends Result_StaticInvoiceSignErrorZ {
		public final StaticInvoice res;
		private Result_StaticInvoiceSignErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_StaticInvoiceSignErrorZ_get_ok(ptr);
			org.ldk.structs.StaticInvoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.StaticInvoice(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_StaticInvoiceSignErrorZ_Err extends Result_StaticInvoiceSignErrorZ {
		public final SignError err;
		private Result_StaticInvoiceSignErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_StaticInvoiceSignErrorZ_get_err(ptr);
			org.ldk.structs.SignError err_hu_conv = org.ldk.structs.SignError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_StaticInvoiceSignErrorZ in the success state.
	 */
	public static Result_StaticInvoiceSignErrorZ ok(org.ldk.structs.StaticInvoice o) {
		long ret = bindings.CResult_StaticInvoiceSignErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticInvoiceSignErrorZ ret_hu_conv = Result_StaticInvoiceSignErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_StaticInvoiceSignErrorZ in the error state.
	 */
	public static Result_StaticInvoiceSignErrorZ err(org.ldk.structs.SignError e) {
		long ret = bindings.CResult_StaticInvoiceSignErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticInvoiceSignErrorZ ret_hu_conv = Result_StaticInvoiceSignErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_StaticInvoiceSignErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
