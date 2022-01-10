package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SignedRawInvoiceNoneZ extends CommonBase {
	private Result_SignedRawInvoiceNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SignedRawInvoiceNoneZ_free(ptr); } super.finalize();
	}

	static Result_SignedRawInvoiceNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SignedRawInvoiceNoneZ_is_ok(ptr)) {
			return new Result_SignedRawInvoiceNoneZ_OK(null, ptr);
		} else {
			return new Result_SignedRawInvoiceNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_SignedRawInvoiceNoneZ_OK extends Result_SignedRawInvoiceNoneZ {
		public final SignedRawInvoice res;
		private Result_SignedRawInvoiceNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_SignedRawInvoiceNoneZ_get_ok(ptr);
			SignedRawInvoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new SignedRawInvoice(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_SignedRawInvoiceNoneZ_Err extends Result_SignedRawInvoiceNoneZ {
		private Result_SignedRawInvoiceNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_SignedRawInvoiceNoneZ in the success state.
	 */
	public static Result_SignedRawInvoiceNoneZ ok(SignedRawInvoice o) {
		long ret = bindings.CResult_SignedRawInvoiceNoneZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceNoneZ ret_hu_conv = Result_SignedRawInvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SignedRawInvoiceNoneZ in the error state.
	 */
	public static Result_SignedRawInvoiceNoneZ err() {
		long ret = bindings.CResult_SignedRawInvoiceNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceNoneZ ret_hu_conv = Result_SignedRawInvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SignedRawInvoiceNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SignedRawInvoiceNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SignedRawInvoiceNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SignedRawInvoiceNoneZ clone() {
		long ret = bindings.CResult_SignedRawInvoiceNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceNoneZ ret_hu_conv = Result_SignedRawInvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
