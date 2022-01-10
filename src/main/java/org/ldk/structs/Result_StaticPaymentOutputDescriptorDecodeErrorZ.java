package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_StaticPaymentOutputDescriptorDecodeErrorZ extends CommonBase {
	private Result_StaticPaymentOutputDescriptorDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_StaticPaymentOutputDescriptorDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_is_ok(ptr)) {
			return new Result_StaticPaymentOutputDescriptorDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_StaticPaymentOutputDescriptorDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_StaticPaymentOutputDescriptorDecodeErrorZ_OK extends Result_StaticPaymentOutputDescriptorDecodeErrorZ {
		public final StaticPaymentOutputDescriptor res;
		private Result_StaticPaymentOutputDescriptorDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_get_ok(ptr);
			StaticPaymentOutputDescriptor res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new StaticPaymentOutputDescriptor(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_StaticPaymentOutputDescriptorDecodeErrorZ_Err extends Result_StaticPaymentOutputDescriptorDecodeErrorZ {
		public final DecodeError err;
		private Result_StaticPaymentOutputDescriptorDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_StaticPaymentOutputDescriptorDecodeErrorZ in the success state.
	 */
	public static Result_StaticPaymentOutputDescriptorDecodeErrorZ ok(StaticPaymentOutputDescriptor o) {
		long ret = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_StaticPaymentOutputDescriptorDecodeErrorZ in the error state.
	 */
	public static Result_StaticPaymentOutputDescriptorDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_StaticPaymentOutputDescriptorDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_StaticPaymentOutputDescriptorDecodeErrorZ clone() {
		long ret = bindings.CResult_StaticPaymentOutputDescriptorDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_StaticPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_StaticPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
