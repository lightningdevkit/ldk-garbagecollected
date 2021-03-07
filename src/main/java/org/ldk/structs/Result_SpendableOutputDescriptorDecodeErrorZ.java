package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_SpendableOutputDescriptorDecodeErrorZ extends CommonBase {
	private Result_SpendableOutputDescriptorDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_SpendableOutputDescriptorDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SpendableOutputDescriptorDecodeErrorZ_result_ok(ptr)) {
			return new Result_SpendableOutputDescriptorDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_SpendableOutputDescriptorDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SpendableOutputDescriptorDecodeErrorZ_OK extends Result_SpendableOutputDescriptorDecodeErrorZ {
		public final SpendableOutputDescriptor res;
		private Result_SpendableOutputDescriptorDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_ok(ptr);
			SpendableOutputDescriptor res_hu_conv = SpendableOutputDescriptor.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_SpendableOutputDescriptorDecodeErrorZ_OK(SpendableOutputDescriptor res) {
			this(null, bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_ok(res.ptr));
		}
	}

	public static final class Result_SpendableOutputDescriptorDecodeErrorZ_Err extends Result_SpendableOutputDescriptorDecodeErrorZ {
		public final DecodeError err;
		private Result_SpendableOutputDescriptorDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_SpendableOutputDescriptorDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_SpendableOutputDescriptorDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_SpendableOutputDescriptorDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
