package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_DelayedPaymentOutputDescriptorDecodeErrorZ extends CommonBase {
	private Result_DelayedPaymentOutputDescriptorDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_DelayedPaymentOutputDescriptorDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ_result_ok(ptr)) {
			return new Result_DelayedPaymentOutputDescriptorDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_DelayedPaymentOutputDescriptorDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_DelayedPaymentOutputDescriptorDecodeErrorZ_OK extends Result_DelayedPaymentOutputDescriptorDecodeErrorZ {
		public final DelayedPaymentOutputDescriptor res;
		private Result_DelayedPaymentOutputDescriptorDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ_get_ok(ptr);
			DelayedPaymentOutputDescriptor res_hu_conv = new DelayedPaymentOutputDescriptor(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_DelayedPaymentOutputDescriptorDecodeErrorZ_Err extends Result_DelayedPaymentOutputDescriptorDecodeErrorZ {
		public final DecodeError err;
		private Result_DelayedPaymentOutputDescriptorDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_DelayedPaymentOutputDescriptorDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_DelayedPaymentOutputDescriptorDecodeErrorZ in the success state.
	 */
	public static Result_DelayedPaymentOutputDescriptorDecodeErrorZ ok(DelayedPaymentOutputDescriptor o) {
		long ret = bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_DelayedPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_DelayedPaymentOutputDescriptorDecodeErrorZ in the error state.
	 */
	public static Result_DelayedPaymentOutputDescriptorDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_DelayedPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_DelayedPaymentOutputDescriptorDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_DelayedPaymentOutputDescriptorDecodeErrorZ clone() {
		long ret = bindings.CResult_DelayedPaymentOutputDescriptorDecodeErrorZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		Result_DelayedPaymentOutputDescriptorDecodeErrorZ ret_hu_conv = Result_DelayedPaymentOutputDescriptorDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
