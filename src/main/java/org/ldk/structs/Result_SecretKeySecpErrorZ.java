package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_SecretKeySecpErrorZ extends CommonBase {
	private Result_SecretKeySecpErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_SecretKeySecpErrorZ_free(ptr); super.finalize();
	}

	static Result_SecretKeySecpErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SecretKeySecpErrorZ_result_ok(ptr)) {
			return new Result_SecretKeySecpErrorZ_OK(null, ptr);
		} else {
			return new Result_SecretKeySecpErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SecretKeySecpErrorZ_OK extends Result_SecretKeySecpErrorZ {
		public byte[] res;
		private Result_SecretKeySecpErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_SecretKeySecpErrorZ_get_ok(ptr);
		}

	}
	public static final class Result_SecretKeySecpErrorZ_Err extends Result_SecretKeySecpErrorZ {
		public LDKSecp256k1Error err;
		private Result_SecretKeySecpErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_SecretKeySecpErrorZ_get_err(ptr);
		}
	}
}
