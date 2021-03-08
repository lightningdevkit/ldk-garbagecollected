package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_TransactionNoneZ extends CommonBase {
	private Result_TransactionNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_TransactionNoneZ_free(ptr); } super.finalize();
	}

	static Result_TransactionNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_TransactionNoneZ_result_ok(ptr)) {
			return new Result_TransactionNoneZ_OK(null, ptr);
		} else {
			return new Result_TransactionNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_TransactionNoneZ_OK extends Result_TransactionNoneZ {
		public final byte[] res;
		private Result_TransactionNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_TransactionNoneZ_get_ok(ptr);
		}
		public Result_TransactionNoneZ_OK(byte[] res) {
			this(null, bindings.CResult_TransactionNoneZ_ok(res));
		}
	}

	public static final class Result_TransactionNoneZ_Err extends Result_TransactionNoneZ {
		private Result_TransactionNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
		public Result_TransactionNoneZ_Err() {
			this(null, bindings.CResult_TransactionNoneZ_err());
		}
	}
}
