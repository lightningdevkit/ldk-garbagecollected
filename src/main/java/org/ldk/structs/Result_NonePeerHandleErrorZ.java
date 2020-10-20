package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_NonePeerHandleErrorZ extends CommonBase {
	private Result_NonePeerHandleErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_NonePeerHandleErrorZ_free(ptr); super.finalize();
	}

	public static final class Result_NonePeerHandleErrorZ_OK extends Result_NonePeerHandleErrorZ {
		public byte res;
		private Result_NonePeerHandleErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_NonePeerHandleErrorZ_get_ok(ptr);
		}

	}
	public static final class Result_NonePeerHandleErrorZ_Err extends Result_NonePeerHandleErrorZ {
		public PeerHandleError err;
		private Result_NonePeerHandleErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_NonePeerHandleErrorZ_get_err(ptr);
			PeerHandleError err_hu_conv = new PeerHandleError(null, err);
			this.err = err_hu_conv;
		}
	}
}
