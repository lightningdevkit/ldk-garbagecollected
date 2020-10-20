package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_CVec_SignatureZNoneZ extends CommonBase {
	private Result_CVec_SignatureZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_CVec_SignatureZNoneZ_free(ptr); super.finalize();
	}

	public static final class Result_CVec_SignatureZNoneZ_OK extends Result_CVec_SignatureZNoneZ {
		public byte[][] res;
		private Result_CVec_SignatureZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_CVec_SignatureZNoneZ_get_ok(ptr);
		}

	}
	public static final class Result_CVec_SignatureZNoneZ_Err extends Result_CVec_SignatureZNoneZ {
		public byte err;
		private Result_CVec_SignatureZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_CVec_SignatureZNoneZ_get_err(ptr);
		}
	}
}
