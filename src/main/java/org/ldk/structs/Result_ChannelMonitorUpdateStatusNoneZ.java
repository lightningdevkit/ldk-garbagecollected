package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ChannelMonitorUpdateStatusNoneZ extends CommonBase {
	private Result_ChannelMonitorUpdateStatusNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelMonitorUpdateStatusNoneZ_free(ptr); } super.finalize();
	}

	static Result_ChannelMonitorUpdateStatusNoneZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ChannelMonitorUpdateStatusNoneZ_is_ok(ptr)) {
			return new Result_ChannelMonitorUpdateStatusNoneZ_OK(null, ptr);
		} else {
			return new Result_ChannelMonitorUpdateStatusNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelMonitorUpdateStatusNoneZ_OK extends Result_ChannelMonitorUpdateStatusNoneZ {
		public final ChannelMonitorUpdateStatus res;
		private Result_ChannelMonitorUpdateStatusNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_get_ok(ptr);
		}
	}

	public static final class Result_ChannelMonitorUpdateStatusNoneZ_Err extends Result_ChannelMonitorUpdateStatusNoneZ {
		private Result_ChannelMonitorUpdateStatusNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	/**
	 * Creates a new CResult_ChannelMonitorUpdateStatusNoneZ in the success state.
	 */
	public static Result_ChannelMonitorUpdateStatusNoneZ ok(org.ldk.enums.ChannelMonitorUpdateStatus o) {
		long ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_ok(o);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelMonitorUpdateStatusNoneZ in the error state.
	 */
	public static Result_ChannelMonitorUpdateStatusNoneZ err() {
		long ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_err();
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelMonitorUpdateStatusNoneZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelMonitorUpdateStatusNoneZ clone() {
		long ret = bindings.CResult_ChannelMonitorUpdateStatusNoneZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelMonitorUpdateStatusNoneZ ret_hu_conv = Result_ChannelMonitorUpdateStatusNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
