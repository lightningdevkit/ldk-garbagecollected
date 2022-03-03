package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ChannelCounterpartyDecodeErrorZ extends CommonBase {
	private Result_ChannelCounterpartyDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelCounterpartyDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelCounterpartyDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ChannelCounterpartyDecodeErrorZ_is_ok(ptr)) {
			return new Result_ChannelCounterpartyDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelCounterpartyDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelCounterpartyDecodeErrorZ_OK extends Result_ChannelCounterpartyDecodeErrorZ {
		public final ChannelCounterparty res;
		private Result_ChannelCounterpartyDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_ChannelCounterpartyDecodeErrorZ_get_ok(ptr);
			ChannelCounterparty res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new ChannelCounterparty(null, res); }
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelCounterpartyDecodeErrorZ_Err extends Result_ChannelCounterpartyDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelCounterpartyDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_ChannelCounterpartyDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ChannelCounterpartyDecodeErrorZ in the success state.
	 */
	public static Result_ChannelCounterpartyDecodeErrorZ ok(ChannelCounterparty o) {
		long ret = bindings.CResult_ChannelCounterpartyDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelCounterpartyDecodeErrorZ ret_hu_conv = Result_ChannelCounterpartyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelCounterpartyDecodeErrorZ in the error state.
	 */
	public static Result_ChannelCounterpartyDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_ChannelCounterpartyDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelCounterpartyDecodeErrorZ ret_hu_conv = Result_ChannelCounterpartyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ChannelCounterpartyDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ChannelCounterpartyDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelCounterpartyDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelCounterpartyDecodeErrorZ clone() {
		long ret = bindings.CResult_ChannelCounterpartyDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelCounterpartyDecodeErrorZ ret_hu_conv = Result_ChannelCounterpartyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
