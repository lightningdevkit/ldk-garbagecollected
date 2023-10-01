package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SocketAddressDecodeErrorZ extends CommonBase {
	private Result_SocketAddressDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SocketAddressDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_SocketAddressDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SocketAddressDecodeErrorZ_is_ok(ptr)) {
			return new Result_SocketAddressDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_SocketAddressDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SocketAddressDecodeErrorZ_OK extends Result_SocketAddressDecodeErrorZ {
		public final SocketAddress res;
		private Result_SocketAddressDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_SocketAddressDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.SocketAddress res_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_SocketAddressDecodeErrorZ_Err extends Result_SocketAddressDecodeErrorZ {
		public final DecodeError err;
		private Result_SocketAddressDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_SocketAddressDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_SocketAddressDecodeErrorZ in the success state.
	 */
	public static Result_SocketAddressDecodeErrorZ ok(org.ldk.structs.SocketAddress o) {
		long ret = bindings.CResult_SocketAddressDecodeErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressDecodeErrorZ ret_hu_conv = Result_SocketAddressDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SocketAddressDecodeErrorZ in the error state.
	 */
	public static Result_SocketAddressDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_SocketAddressDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressDecodeErrorZ ret_hu_conv = Result_SocketAddressDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SocketAddressDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SocketAddressDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SocketAddressDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SocketAddressDecodeErrorZ clone() {
		long ret = bindings.CResult_SocketAddressDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressDecodeErrorZ ret_hu_conv = Result_SocketAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
