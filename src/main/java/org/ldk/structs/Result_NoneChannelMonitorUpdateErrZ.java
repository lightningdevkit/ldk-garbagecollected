package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_NoneChannelMonitorUpdateErrZ extends CommonBase {
	private Result_NoneChannelMonitorUpdateErrZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NoneChannelMonitorUpdateErrZ_free(ptr); } super.finalize();
	}

	static Result_NoneChannelMonitorUpdateErrZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NoneChannelMonitorUpdateErrZ_is_ok(ptr)) {
			return new Result_NoneChannelMonitorUpdateErrZ_OK(null, ptr);
		} else {
			return new Result_NoneChannelMonitorUpdateErrZ_Err(null, ptr);
		}
	}
	public static final class Result_NoneChannelMonitorUpdateErrZ_OK extends Result_NoneChannelMonitorUpdateErrZ {
		private Result_NoneChannelMonitorUpdateErrZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static final class Result_NoneChannelMonitorUpdateErrZ_Err extends Result_NoneChannelMonitorUpdateErrZ {
		public final ChannelMonitorUpdateErr err;
		private Result_NoneChannelMonitorUpdateErrZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.CResult_NoneChannelMonitorUpdateErrZ_get_err(ptr);
		}
	}

	/**
	 * Creates a new CResult_NoneChannelMonitorUpdateErrZ in the success state.
	 */
	public static Result_NoneChannelMonitorUpdateErrZ ok() {
		long ret = bindings.CResult_NoneChannelMonitorUpdateErrZ_ok();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NoneChannelMonitorUpdateErrZ in the error state.
	 */
	public static Result_NoneChannelMonitorUpdateErrZ err(org.ldk.enums.ChannelMonitorUpdateErr e) {
		long ret = bindings.CResult_NoneChannelMonitorUpdateErrZ_err(e);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_NoneChannelMonitorUpdateErrZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_NoneChannelMonitorUpdateErrZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_NoneChannelMonitorUpdateErrZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NoneChannelMonitorUpdateErrZ clone() {
		long ret = bindings.CResult_NoneChannelMonitorUpdateErrZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneChannelMonitorUpdateErrZ ret_hu_conv = Result_NoneChannelMonitorUpdateErrZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
