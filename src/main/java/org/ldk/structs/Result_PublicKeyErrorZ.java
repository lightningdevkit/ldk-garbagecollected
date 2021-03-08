package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_PublicKeyErrorZ extends CommonBase {
	private Result_PublicKeyErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_PublicKeyErrorZ_free(ptr); } super.finalize();
	}

	static Result_PublicKeyErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_PublicKeyErrorZ_result_ok(ptr)) {
			return new Result_PublicKeyErrorZ_OK(null, ptr);
		} else {
			return new Result_PublicKeyErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_PublicKeyErrorZ_OK extends Result_PublicKeyErrorZ {
		public final byte[] res;
		private Result_PublicKeyErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_PublicKeyErrorZ_get_ok(ptr);
		}
		public Result_PublicKeyErrorZ_OK(byte[] res) {
			this(null, bindings.CResult_PublicKeyErrorZ_ok(res));
		}
	}

	public static final class Result_PublicKeyErrorZ_Err extends Result_PublicKeyErrorZ {
		public final LDKSecp256k1Error err;
		private Result_PublicKeyErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_PublicKeyErrorZ_get_err(ptr);
		}
		public Result_PublicKeyErrorZ_Err(LDKSecp256k1Error err) {
			this(null, bindings.CResult_PublicKeyErrorZ_err(err));
		}
	}
}
