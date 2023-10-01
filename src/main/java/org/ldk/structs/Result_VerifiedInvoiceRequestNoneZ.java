package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_VerifiedInvoiceRequestNoneZ extends CommonBase {
	private Result_VerifiedInvoiceRequestNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_VerifiedInvoiceRequestNoneZ_free(ptr); } super.finalize();
	}

	static Result_VerifiedInvoiceRequestNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_VerifiedInvoiceRequestNoneZ_is_ok(ptr)) {
			return new Result_VerifiedInvoiceRequestNoneZ_OK(null, ptr);
		} else {
			return new Result_VerifiedInvoiceRequestNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_VerifiedInvoiceRequestNoneZ_OK extends Result_VerifiedInvoiceRequestNoneZ {
		public final VerifiedInvoiceRequest res;
		private Result_VerifiedInvoiceRequestNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_VerifiedInvoiceRequestNoneZ_get_ok(ptr);
			org.ldk.structs.VerifiedInvoiceRequest res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.VerifiedInvoiceRequest(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_VerifiedInvoiceRequestNoneZ_Err extends Result_VerifiedInvoiceRequestNoneZ {
		private Result_VerifiedInvoiceRequestNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_VerifiedInvoiceRequestNoneZ in the success state.
	 */
	public static Result_VerifiedInvoiceRequestNoneZ ok(org.ldk.structs.VerifiedInvoiceRequest o) {
		long ret = bindings.CResult_VerifiedInvoiceRequestNoneZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_VerifiedInvoiceRequestNoneZ ret_hu_conv = Result_VerifiedInvoiceRequestNoneZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_VerifiedInvoiceRequestNoneZ in the error state.
	 */
	public static Result_VerifiedInvoiceRequestNoneZ err() {
		long ret = bindings.CResult_VerifiedInvoiceRequestNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_VerifiedInvoiceRequestNoneZ ret_hu_conv = Result_VerifiedInvoiceRequestNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_VerifiedInvoiceRequestNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_VerifiedInvoiceRequestNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_VerifiedInvoiceRequestNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_VerifiedInvoiceRequestNoneZ clone() {
		long ret = bindings.CResult_VerifiedInvoiceRequestNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_VerifiedInvoiceRequestNoneZ ret_hu_conv = Result_VerifiedInvoiceRequestNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
