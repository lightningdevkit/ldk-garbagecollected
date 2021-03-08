package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_TxCreationKeysDecodeErrorZ extends CommonBase {
	private Result_TxCreationKeysDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TxCreationKeysDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_TxCreationKeysDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_TxCreationKeysDecodeErrorZ_result_ok(ptr)) {
			return new Result_TxCreationKeysDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_TxCreationKeysDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_TxCreationKeysDecodeErrorZ_OK extends Result_TxCreationKeysDecodeErrorZ {
		public final TxCreationKeys res;
		private Result_TxCreationKeysDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_TxCreationKeysDecodeErrorZ_get_ok(ptr);
			TxCreationKeys res_hu_conv = new TxCreationKeys(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_TxCreationKeysDecodeErrorZ_OK(TxCreationKeys res) {
			this(null, bindings.CResult_TxCreationKeysDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_TxCreationKeysDecodeErrorZ_Err extends Result_TxCreationKeysDecodeErrorZ {
		public final DecodeError err;
		private Result_TxCreationKeysDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_TxCreationKeysDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_TxCreationKeysDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_TxCreationKeysDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
