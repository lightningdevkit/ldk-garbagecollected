package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_PublicKeySecpErrorZ extends CommonBase {
	private Result_PublicKeySecpErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_PublicKeySecpErrorZ_free(ptr); super.finalize();
	}

	static Result_PublicKeySecpErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PublicKeySecpErrorZ_result_ok(ptr)) {
			return new Result_PublicKeySecpErrorZ_OK(null, ptr);
		} else {
			return new Result_PublicKeySecpErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PublicKeySecpErrorZ_OK extends Result_PublicKeySecpErrorZ {
		public byte[] res;
		private Result_PublicKeySecpErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PublicKeySecpErrorZ_get_ok(ptr);
		}

	}
	public static final class Result_PublicKeySecpErrorZ_Err extends Result_PublicKeySecpErrorZ {
		public LDKSecp256k1Error err;
		private Result_PublicKeySecpErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_PublicKeySecpErrorZ_get_err(ptr);
		}
	}
}
