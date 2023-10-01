package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ extends CommonBase {
	private Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_is_ok(ptr)) {
			return new Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK extends Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ {
		public final TwoTuple_ThirtyTwoBytesChannelMonitorZ res;
		private Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_get_ok(ptr);
			TwoTuple_ThirtyTwoBytesChannelMonitorZ res_hu_conv = new TwoTuple_ThirtyTwoBytesChannelMonitorZ(null, res);
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_Err extends Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ {
		public final DecodeError err;
		private Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ in the success state.
	 */
	public static Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ ok(org.ldk.structs.TwoTuple_ThirtyTwoBytesChannelMonitorZ o) {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_ok(o != null ? o.ptr : 0);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ in the error state.
	 */
	public static Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ clone() {
		long ret = bindings.CResult_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
