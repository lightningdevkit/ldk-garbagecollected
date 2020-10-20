package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_NoneAPIErrorZ extends CommonBase {
	private Result_NoneAPIErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_NoneAPIErrorZ_free(ptr); super.finalize();
	}

	public static final class Result_NoneAPIErrorZ_OK extends Result_NoneAPIErrorZ {
		public byte res;
		private Result_NoneAPIErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_NoneAPIErrorZ_get_ok(ptr);
		}

	}
	public static final class Result_NoneAPIErrorZ_Err extends Result_NoneAPIErrorZ {
		public APIError err;
		private Result_NoneAPIErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_NoneAPIErrorZ_get_err(ptr);
			APIError err_hu_conv = APIError.constr_from_ptr(err);
			this.err = err_hu_conv;
		}
	}
}
