package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_CVec_CVec_u8ZZNoneZ extends CommonBase {
	private Result_CVec_CVec_u8ZZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_CVec_u8ZZNoneZ_free(ptr); } super.finalize();
	}

	static Result_CVec_CVec_u8ZZNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CVec_CVec_u8ZZNoneZ_result_ok(ptr)) {
			return new Result_CVec_CVec_u8ZZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_CVec_u8ZZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_CVec_u8ZZNoneZ_OK extends Result_CVec_CVec_u8ZZNoneZ {
		public final byte[][] res;
		private Result_CVec_CVec_u8ZZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_CVec_CVec_u8ZZNoneZ_get_ok(ptr);
		}
		public Result_CVec_CVec_u8ZZNoneZ_OK(byte[][] res) {
			this(null, bindings.CResult_CVec_CVec_u8ZZNoneZ_ok(res));
		}
	}

	public static final class Result_CVec_CVec_u8ZZNoneZ_Err extends Result_CVec_CVec_u8ZZNoneZ {
		private Result_CVec_CVec_u8ZZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
		public Result_CVec_CVec_u8ZZNoneZ_Err() {
			this(null, bindings.CResult_CVec_CVec_u8ZZNoneZ_err());
		}
	}
}
