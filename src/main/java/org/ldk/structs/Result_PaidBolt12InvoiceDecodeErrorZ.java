package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_PaidBolt12InvoiceDecodeErrorZ extends CommonBase {
	private Result_PaidBolt12InvoiceDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_free(ptr); ptr = 0; }
	}

	static Result_PaidBolt12InvoiceDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_is_ok(ptr)) {
			return new Result_PaidBolt12InvoiceDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_PaidBolt12InvoiceDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PaidBolt12InvoiceDecodeErrorZ_OK extends Result_PaidBolt12InvoiceDecodeErrorZ {
		public final PaidBolt12Invoice res;
		private Result_PaidBolt12InvoiceDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.PaidBolt12Invoice res_hu_conv = org.ldk.structs.PaidBolt12Invoice.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_PaidBolt12InvoiceDecodeErrorZ_Err extends Result_PaidBolt12InvoiceDecodeErrorZ {
		public final DecodeError err;
		private Result_PaidBolt12InvoiceDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_PaidBolt12InvoiceDecodeErrorZ in the success state.
	 */
	public static Result_PaidBolt12InvoiceDecodeErrorZ ok(org.ldk.structs.PaidBolt12Invoice o) {
		long ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaidBolt12InvoiceDecodeErrorZ ret_hu_conv = Result_PaidBolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_PaidBolt12InvoiceDecodeErrorZ in the error state.
	 */
	public static Result_PaidBolt12InvoiceDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaidBolt12InvoiceDecodeErrorZ ret_hu_conv = Result_PaidBolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_PaidBolt12InvoiceDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_PaidBolt12InvoiceDecodeErrorZ clone() {
		long ret = bindings.CResult_PaidBolt12InvoiceDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaidBolt12InvoiceDecodeErrorZ ret_hu_conv = Result_PaidBolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
