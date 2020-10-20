package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_TxCreationKeysSecpErrorZ extends CommonBase {
	private Result_TxCreationKeysSecpErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_TxCreationKeysSecpErrorZ_free(ptr); super.finalize();
	}

	public static final class Result_TxCreationKeysSecpErrorZ_OK extends Result_TxCreationKeysSecpErrorZ {
		public TxCreationKeys res;
		private Result_TxCreationKeysSecpErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_TxCreationKeysSecpErrorZ_get_ok(ptr);
			TxCreationKeys res_hu_conv = new TxCreationKeys(null, res);
			this.res = res_hu_conv;
		}

	}
	public static final class Result_TxCreationKeysSecpErrorZ_Err extends Result_TxCreationKeysSecpErrorZ {
		public LDKSecp256k1Error err;
		private Result_TxCreationKeysSecpErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_TxCreationKeysSecpErrorZ_get_err(ptr);
		}
	}
}
