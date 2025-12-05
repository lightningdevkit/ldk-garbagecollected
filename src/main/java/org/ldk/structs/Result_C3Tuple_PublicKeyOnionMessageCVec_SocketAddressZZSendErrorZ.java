package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ extends CommonBase {
	private Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_free(ptr); ptr = 0; }
	}

	static Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_is_ok(ptr)) {
			return new Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_OK(null, ptr);
		} else {
			return new Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_OK extends Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		public final ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ res;
		private Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_get_ok(ptr);
			ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ res_hu_conv = new ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_Err extends Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ {
		public final SendError err;
		private Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_get_err(ptr);
			org.ldk.structs.SendError err_hu_conv = org.ldk.structs.SendError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ in the success state.
	 */
	public static Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ok(org.ldk.structs.ThreeTuple_PublicKeyOnionMessageCVec_SocketAddressZZ o) {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ in the error state.
	 */
	public static Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ err(org.ldk.structs.SendError e) {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ clone() {
		long ret = bindings.CResult_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ ret_hu_conv = Result_C3Tuple_PublicKeyOnionMessageCVec_SocketAddressZZSendErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
