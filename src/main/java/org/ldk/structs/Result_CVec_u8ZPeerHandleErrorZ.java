package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_CVec_u8ZPeerHandleErrorZ extends CommonBase {
	private Result_CVec_u8ZPeerHandleErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CVec_u8ZPeerHandleErrorZ_free(ptr); } super.finalize();
	}

	static Result_CVec_u8ZPeerHandleErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_result_ok(ptr)) {
			return new Result_CVec_u8ZPeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_CVec_u8ZPeerHandleErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CVec_u8ZPeerHandleErrorZ_OK extends Result_CVec_u8ZPeerHandleErrorZ {
		public final byte[] res;
		private Result_CVec_u8ZPeerHandleErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_get_ok(ptr);
		}
		public Result_CVec_u8ZPeerHandleErrorZ_OK(byte[] res) {
			this(null, bindings.CResult_CVec_u8ZPeerHandleErrorZ_ok(res));
		}
	}

	public static final class Result_CVec_u8ZPeerHandleErrorZ_Err extends Result_CVec_u8ZPeerHandleErrorZ {
		public final PeerHandleError err;
		private Result_CVec_u8ZPeerHandleErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_CVec_u8ZPeerHandleErrorZ_get_err(ptr);
			PeerHandleError err_hu_conv = new PeerHandleError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_CVec_u8ZPeerHandleErrorZ_Err(PeerHandleError err) {
			this(null, bindings.CResult_CVec_u8ZPeerHandleErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
