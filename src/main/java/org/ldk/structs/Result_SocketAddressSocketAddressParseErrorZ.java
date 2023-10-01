package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_SocketAddressSocketAddressParseErrorZ extends CommonBase {
	private Result_SocketAddressSocketAddressParseErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_SocketAddressSocketAddressParseErrorZ_free(ptr); } super.finalize();
	}

	static Result_SocketAddressSocketAddressParseErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_SocketAddressSocketAddressParseErrorZ_is_ok(ptr)) {
			return new Result_SocketAddressSocketAddressParseErrorZ_OK(null, ptr);
		} else {
			return new Result_SocketAddressSocketAddressParseErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_SocketAddressSocketAddressParseErrorZ_OK extends Result_SocketAddressSocketAddressParseErrorZ {
		public final SocketAddress res;
		private Result_SocketAddressSocketAddressParseErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_SocketAddressSocketAddressParseErrorZ_get_ok(ptr);
			org.ldk.structs.SocketAddress res_hu_conv = org.ldk.structs.SocketAddress.constr_from_ptr(res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_SocketAddressSocketAddressParseErrorZ_Err extends Result_SocketAddressSocketAddressParseErrorZ {
		public final SocketAddressParseError err;
		private Result_SocketAddressSocketAddressParseErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_SocketAddressSocketAddressParseErrorZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_SocketAddressSocketAddressParseErrorZ in the success state.
	 */
	public static Result_SocketAddressSocketAddressParseErrorZ ok(org.ldk.structs.SocketAddress o) {
		long ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_ok(o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressSocketAddressParseErrorZ ret_hu_conv = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_SocketAddressSocketAddressParseErrorZ in the error state.
	 */
	public static Result_SocketAddressSocketAddressParseErrorZ err(org.ldk.enums.SocketAddressParseError e) {
		long ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressSocketAddressParseErrorZ ret_hu_conv = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_SocketAddressSocketAddressParseErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_SocketAddressSocketAddressParseErrorZ clone() {
		long ret = bindings.CResult_SocketAddressSocketAddressParseErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_SocketAddressSocketAddressParseErrorZ ret_hu_conv = Result_SocketAddressSocketAddressParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
