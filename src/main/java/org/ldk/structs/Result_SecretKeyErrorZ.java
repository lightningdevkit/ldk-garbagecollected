package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_SecretKeyErrorZ extends CommonBase {
	private Result_SecretKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SecretKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_SecretKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SecretKeyErrorZ_result_ok(ptr)) {
			return new Result_SecretKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_SecretKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SecretKeyErrorZ_OK extends Result_SecretKeyErrorZ {
		public final byte[] res;
		private Result_SecretKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_SecretKeyErrorZ_get_ok(ptr);
		}
		public Result_SecretKeyErrorZ_OK(byte[] res) {
			this(null, bindings.CResult_SecretKeyErrorZ_ok(res));
		}
	}

	public static final class Result_SecretKeyErrorZ_Err extends Result_SecretKeyErrorZ {
		public final LDKSecp256k1Error err;
		private Result_SecretKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_SecretKeyErrorZ_get_err(ptr);
		}
		public Result_SecretKeyErrorZ_Err(LDKSecp256k1Error err) {
			this(null, bindings.CResult_SecretKeyErrorZ_err(err));
		}
	}
}
