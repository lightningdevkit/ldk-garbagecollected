package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ChannelShutdownStateDecodeErrorZ extends CommonBase {
	private Result_ChannelShutdownStateDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelShutdownStateDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelShutdownStateDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ChannelShutdownStateDecodeErrorZ_is_ok(ptr)) {
			return new Result_ChannelShutdownStateDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelShutdownStateDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelShutdownStateDecodeErrorZ_OK extends Result_ChannelShutdownStateDecodeErrorZ {
		public final ChannelShutdownState res;
		private Result_ChannelShutdownStateDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_ChannelShutdownStateDecodeErrorZ_get_ok(ptr);
		}
	}

	public static final class Result_ChannelShutdownStateDecodeErrorZ_Err extends Result_ChannelShutdownStateDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelShutdownStateDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_ChannelShutdownStateDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ChannelShutdownStateDecodeErrorZ in the success state.
	 */
	public static Result_ChannelShutdownStateDecodeErrorZ ok(org.ldk.enums.ChannelShutdownState o) {
		long ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelShutdownStateDecodeErrorZ ret_hu_conv = Result_ChannelShutdownStateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelShutdownStateDecodeErrorZ in the error state.
	 */
	public static Result_ChannelShutdownStateDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelShutdownStateDecodeErrorZ ret_hu_conv = Result_ChannelShutdownStateDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelShutdownStateDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelShutdownStateDecodeErrorZ clone() {
		long ret = bindings.CResult_ChannelShutdownStateDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelShutdownStateDecodeErrorZ ret_hu_conv = Result_ChannelShutdownStateDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
