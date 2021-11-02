package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_boolPeerHandleErrorZ extends CommonBase {
	private Result_boolPeerHandleErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_boolPeerHandleErrorZ_free(ptr); } super.finalize();
	}

	static Result_boolPeerHandleErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_boolPeerHandleErrorZ_result_ok(ptr)) {
			return new Result_boolPeerHandleErrorZ_OK(null, ptr);
		} else {
			return new Result_boolPeerHandleErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_boolPeerHandleErrorZ_OK extends Result_boolPeerHandleErrorZ {
		public final boolean res;
		private Result_boolPeerHandleErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_boolPeerHandleErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_boolPeerHandleErrorZ_Err extends Result_boolPeerHandleErrorZ {
		public final PeerHandleError err;
		private Result_boolPeerHandleErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_boolPeerHandleErrorZ_get_err(ptr);
			PeerHandleError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new PeerHandleError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_boolPeerHandleErrorZ in the success state.
	 */
	public static Result_boolPeerHandleErrorZ ok(boolean o) {
		long ret = bindings.CResult_boolPeerHandleErrorZ_ok(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolPeerHandleErrorZ ret_hu_conv = Result_boolPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_boolPeerHandleErrorZ in the error state.
	 */
	public static Result_boolPeerHandleErrorZ err(PeerHandleError e) {
		long ret = bindings.CResult_boolPeerHandleErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolPeerHandleErrorZ ret_hu_conv = Result_boolPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_boolPeerHandleErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_boolPeerHandleErrorZ clone() {
		long ret = bindings.CResult_boolPeerHandleErrorZ_clone(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_boolPeerHandleErrorZ ret_hu_conv = Result_boolPeerHandleErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
