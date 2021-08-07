package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

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
	}

	/**
	 * Creates a new CResult_CVec_u8ZPeerHandleErrorZ in the success state.
	 */
	public static Result_CVec_u8ZPeerHandleErrorZ ok(byte[] o) {
		long ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_ok(o);
		if (ret < 1024) { return null; }
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_u8ZPeerHandleErrorZ in the error state.
	 */
	public static Result_CVec_u8ZPeerHandleErrorZ err(PeerHandleError e) {
		long ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret < 1024) { return null; }
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CVec_u8ZPeerHandleErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CVec_u8ZPeerHandleErrorZ clone() {
		long ret = bindings.CResult_CVec_u8ZPeerHandleErrorZ_clone(this.ptr);
		if (ret < 1024) { return null; }
		Result_CVec_u8ZPeerHandleErrorZ ret_hu_conv = Result_CVec_u8ZPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
