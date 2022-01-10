package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_InvoiceNoneZ extends CommonBase {
	private Result_InvoiceNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InvoiceNoneZ_free(ptr); } super.finalize();
	}

	static Result_InvoiceNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_InvoiceNoneZ_is_ok(ptr)) {
			return new Result_InvoiceNoneZ_OK(null, ptr);
		} else {
			return new Result_InvoiceNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_InvoiceNoneZ_OK extends Result_InvoiceNoneZ {
		public final Invoice res;
		private Result_InvoiceNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_InvoiceNoneZ_get_ok(ptr);
			Invoice res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new Invoice(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InvoiceNoneZ_Err extends Result_InvoiceNoneZ {
		private Result_InvoiceNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_InvoiceNoneZ in the success state.
	 */
	public static Result_InvoiceNoneZ ok(Invoice o) {
		long ret = bindings.CResult_InvoiceNoneZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceNoneZ ret_hu_conv = Result_InvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InvoiceNoneZ in the error state.
	 */
	public static Result_InvoiceNoneZ err() {
		long ret = bindings.CResult_InvoiceNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceNoneZ ret_hu_conv = Result_InvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_InvoiceNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_InvoiceNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_InvoiceNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_InvoiceNoneZ clone() {
		long ret = bindings.CResult_InvoiceNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceNoneZ ret_hu_conv = Result_InvoiceNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
