package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_SignatureNoneZ extends CommonBase {
	private Result_SignatureNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_SignatureNoneZ_free(ptr); super.finalize();
	}

	static Result_SignatureNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_SignatureNoneZ_result_ok(ptr)) {
			return new Result_SignatureNoneZ_OK(null, ptr);
		} else {
			return new Result_SignatureNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_SignatureNoneZ_OK extends Result_SignatureNoneZ {
		public byte[] res;
		private Result_SignatureNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_SignatureNoneZ_get_ok(ptr);
		}

	}
	public static final class Result_SignatureNoneZ_Err extends Result_SignatureNoneZ {
		public byte err;
		private Result_SignatureNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_SignatureNoneZ_get_err(ptr);
		}
	}
}
