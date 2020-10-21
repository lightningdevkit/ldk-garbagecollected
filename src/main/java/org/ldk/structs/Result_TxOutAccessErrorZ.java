package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_TxOutAccessErrorZ extends CommonBase {
	private Result_TxOutAccessErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_TxOutAccessErrorZ_free(ptr); super.finalize();
	}

	static Result_TxOutAccessErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_TxOutAccessErrorZ_result_ok(ptr)) {
			return new Result_TxOutAccessErrorZ_OK(null, ptr);
		} else {
			return new Result_TxOutAccessErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_TxOutAccessErrorZ_OK extends Result_TxOutAccessErrorZ {
		public TxOut res;
		private Result_TxOutAccessErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_TxOutAccessErrorZ_get_ok(ptr);
			TxOut res_conv = new TxOut(null, res);
			this.res = res_conv;
		}

	}
	public static final class Result_TxOutAccessErrorZ_Err extends Result_TxOutAccessErrorZ {
		public LDKAccessError err;
		private Result_TxOutAccessErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_TxOutAccessErrorZ_get_err(ptr);
		}
	}
}
