package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_QueryChannelRangeDecodeErrorZ extends CommonBase {
	private Result_QueryChannelRangeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_QueryChannelRangeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_QueryChannelRangeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_QueryChannelRangeDecodeErrorZ_is_ok(ptr)) {
			return new Result_QueryChannelRangeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_QueryChannelRangeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_QueryChannelRangeDecodeErrorZ_OK extends Result_QueryChannelRangeDecodeErrorZ {
		public final QueryChannelRange res;
		private Result_QueryChannelRangeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_QueryChannelRangeDecodeErrorZ_get_ok(ptr);
			QueryChannelRange res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new QueryChannelRange(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_QueryChannelRangeDecodeErrorZ_Err extends Result_QueryChannelRangeDecodeErrorZ {
		public final DecodeError err;
		private Result_QueryChannelRangeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_QueryChannelRangeDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_QueryChannelRangeDecodeErrorZ in the success state.
	 */
	public static Result_QueryChannelRangeDecodeErrorZ ok(QueryChannelRange o) {
		long ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_QueryChannelRangeDecodeErrorZ ret_hu_conv = Result_QueryChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_QueryChannelRangeDecodeErrorZ in the error state.
	 */
	public static Result_QueryChannelRangeDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_QueryChannelRangeDecodeErrorZ ret_hu_conv = Result_QueryChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_QueryChannelRangeDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_QueryChannelRangeDecodeErrorZ clone() {
		long ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_QueryChannelRangeDecodeErrorZ ret_hu_conv = Result_QueryChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
