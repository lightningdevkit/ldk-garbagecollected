package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_CVec_SignatureZNoneZ extends CommonBase {
	private Result_CVec_SignatureZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_SignatureZNoneZ_free(ptr); } super.finalize();
	}

	static Result_CVec_SignatureZNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CVec_SignatureZNoneZ_result_ok(ptr)) {
			return new Result_CVec_SignatureZNoneZ_OK(null, ptr);
		} else {
			return new Result_CVec_SignatureZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_SignatureZNoneZ_OK extends Result_CVec_SignatureZNoneZ {
		public final byte[][] res;
		private Result_CVec_SignatureZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_CVec_SignatureZNoneZ_get_ok(ptr);
		}
		public Result_CVec_SignatureZNoneZ_OK(byte[][] res) {
			this(null, bindings.CResult_CVec_SignatureZNoneZ_ok(res));
		}
	}

	public static final class Result_CVec_SignatureZNoneZ_Err extends Result_CVec_SignatureZNoneZ {
		private Result_CVec_SignatureZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
		public Result_CVec_SignatureZNoneZ_Err() {
			this(null, bindings.CResult_CVec_SignatureZNoneZ_err());
		}
	}
}
