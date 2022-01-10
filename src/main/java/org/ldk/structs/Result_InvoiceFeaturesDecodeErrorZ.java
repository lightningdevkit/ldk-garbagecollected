package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_InvoiceFeaturesDecodeErrorZ extends CommonBase {
	private Result_InvoiceFeaturesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InvoiceFeaturesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_InvoiceFeaturesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_InvoiceFeaturesDecodeErrorZ_is_ok(ptr)) {
			return new Result_InvoiceFeaturesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_InvoiceFeaturesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_InvoiceFeaturesDecodeErrorZ_OK extends Result_InvoiceFeaturesDecodeErrorZ {
		public final InvoiceFeatures res;
		private Result_InvoiceFeaturesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_InvoiceFeaturesDecodeErrorZ_get_ok(ptr);
			InvoiceFeatures res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new InvoiceFeatures(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InvoiceFeaturesDecodeErrorZ_Err extends Result_InvoiceFeaturesDecodeErrorZ {
		public final DecodeError err;
		private Result_InvoiceFeaturesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_InvoiceFeaturesDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_InvoiceFeaturesDecodeErrorZ in the success state.
	 */
	public static Result_InvoiceFeaturesDecodeErrorZ ok(InvoiceFeatures o) {
		long ret = bindings.CResult_InvoiceFeaturesDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_InvoiceFeaturesDecodeErrorZ in the error state.
	 */
	public static Result_InvoiceFeaturesDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_InvoiceFeaturesDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceFeaturesDecodeErrorZ ret_hu_conv = Result_InvoiceFeaturesDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_InvoiceFeaturesDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
