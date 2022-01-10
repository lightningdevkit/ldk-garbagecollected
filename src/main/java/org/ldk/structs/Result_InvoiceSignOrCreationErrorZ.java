package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_InvoiceSignOrCreationErrorZ extends CommonBase {
	private Result_InvoiceSignOrCreationErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InvoiceSignOrCreationErrorZ_free(ptr); } super.finalize();
	}

	static Result_InvoiceSignOrCreationErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_InvoiceSignOrCreationErrorZ_is_ok(ptr)) {
			return new Result_InvoiceSignOrCreationErrorZ_OK(null, ptr);
		} else {
			return new Result_InvoiceSignOrCreationErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_InvoiceSignOrCreationErrorZ_OK extends Result_InvoiceSignOrCreationErrorZ {
		public final Invoice res;
		private Result_InvoiceSignOrCreationErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_InvoiceSignOrCreationErrorZ_get_ok(ptr);
			Invoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new Invoice(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InvoiceSignOrCreationErrorZ_Err extends Result_InvoiceSignOrCreationErrorZ {
		public final SignOrCreationError err;
		private Result_InvoiceSignOrCreationErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_InvoiceSignOrCreationErrorZ_get_err(ptr);
			SignOrCreationError err_hu_conv = SignOrCreationError.constr_from_ptr(err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_InvoiceSignOrCreationErrorZ in the success state.
	 */
	public static Result_InvoiceSignOrCreationErrorZ ok(Invoice o) {
		long ret = bindings.CResult_InvoiceSignOrCreationErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceSignOrCreationErrorZ ret_hu_conv = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InvoiceSignOrCreationErrorZ in the error state.
	 */
	public static Result_InvoiceSignOrCreationErrorZ err(SignOrCreationError e) {
		long ret = bindings.CResult_InvoiceSignOrCreationErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceSignOrCreationErrorZ ret_hu_conv = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_InvoiceSignOrCreationErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_InvoiceSignOrCreationErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_InvoiceSignOrCreationErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_InvoiceSignOrCreationErrorZ clone() {
		long ret = bindings.CResult_InvoiceSignOrCreationErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceSignOrCreationErrorZ ret_hu_conv = Result_InvoiceSignOrCreationErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
