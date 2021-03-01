package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_InMemorySignerDecodeErrorZ extends CommonBase {
	private Result_InMemorySignerDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InMemorySignerDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_InMemorySignerDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_InMemorySignerDecodeErrorZ_result_ok(ptr)) {
			return new Result_InMemorySignerDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_InMemorySignerDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_InMemorySignerDecodeErrorZ_OK extends Result_InMemorySignerDecodeErrorZ {
		public final InMemorySigner res;
		private Result_InMemorySignerDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_InMemorySignerDecodeErrorZ_get_ok(ptr);
			InMemorySigner res_hu_conv = new InMemorySigner(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_InMemorySignerDecodeErrorZ_OK(InMemorySigner res) {
			this(null, bindings.CResult_InMemorySignerDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_InMemorySignerDecodeErrorZ_Err extends Result_InMemorySignerDecodeErrorZ {
		public final DecodeError err;
		private Result_InMemorySignerDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_InMemorySignerDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_InMemorySignerDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_InMemorySignerDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
