package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_boolPeerHandleErrorZ extends CommonBase {
	private Result_boolPeerHandleErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_boolPeerHandleErrorZ_free(ptr); super.finalize();
	}

	public static final class Result_boolPeerHandleErrorZ_OK extends Result_boolPeerHandleErrorZ {
		public boolean res;
		private Result_boolPeerHandleErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_boolPeerHandleErrorZ_get_ok(ptr);
		}

	}
	public static final class Result_boolPeerHandleErrorZ_Err extends Result_boolPeerHandleErrorZ {
		public PeerHandleError err;
		private Result_boolPeerHandleErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_boolPeerHandleErrorZ_get_err(ptr);
			PeerHandleError err_hu_conv = new PeerHandleError(null, err);
			this.err = err_hu_conv;
		}
	}
}
