package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SignedRawInvoiceParseErrorZ extends CommonBase {
	private Result_SignedRawInvoiceParseErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SignedRawInvoiceParseErrorZ_free(ptr); } super.finalize();
	}

	static Result_SignedRawInvoiceParseErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SignedRawInvoiceParseErrorZ_is_ok(ptr)) {
			return new Result_SignedRawInvoiceParseErrorZ_OK(null, ptr);
		} else {
			return new Result_SignedRawInvoiceParseErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SignedRawInvoiceParseErrorZ_OK extends Result_SignedRawInvoiceParseErrorZ {
		public final SignedRawInvoice res;
		private Result_SignedRawInvoiceParseErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_SignedRawInvoiceParseErrorZ_get_ok(ptr);
			SignedRawInvoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new SignedRawInvoice(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_SignedRawInvoiceParseErrorZ_Err extends Result_SignedRawInvoiceParseErrorZ {
		public final ParseError err;
		private Result_SignedRawInvoiceParseErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_SignedRawInvoiceParseErrorZ_get_err(ptr);
			org.ldk.structs.ParseError err_hu_conv = org.ldk.structs.ParseError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SignedRawInvoiceParseErrorZ in the success state.
	 */
	public static Result_SignedRawInvoiceParseErrorZ ok(SignedRawInvoice o) {
		long ret = bindings.CResult_SignedRawInvoiceParseErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceParseErrorZ ret_hu_conv = Result_SignedRawInvoiceParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SignedRawInvoiceParseErrorZ in the error state.
	 */
	public static Result_SignedRawInvoiceParseErrorZ err(ParseError e) {
		long ret = bindings.CResult_SignedRawInvoiceParseErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceParseErrorZ ret_hu_conv = Result_SignedRawInvoiceParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SignedRawInvoiceParseErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SignedRawInvoiceParseErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SignedRawInvoiceParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SignedRawInvoiceParseErrorZ clone() {
		long ret = bindings.CResult_SignedRawInvoiceParseErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SignedRawInvoiceParseErrorZ ret_hu_conv = Result_SignedRawInvoiceParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
