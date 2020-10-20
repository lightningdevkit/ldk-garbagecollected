package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_boolLightningErrorZ extends CommonBase {
	private Result_boolLightningErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_boolLightningErrorZ_free(ptr); super.finalize();
	}

	public static final class Result_boolLightningErrorZ_OK extends Result_boolLightningErrorZ {
		public boolean res;
		private Result_boolLightningErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_boolLightningErrorZ_get_ok(ptr);
		}

	}
	public static final class Result_boolLightningErrorZ_Err extends Result_boolLightningErrorZ {
		public LightningError err;
		private Result_boolLightningErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_boolLightningErrorZ_get_err(ptr);
			LightningError err_hu_conv = new LightningError(null, err);
			this.err = err_hu_conv;
		}
	}
}
