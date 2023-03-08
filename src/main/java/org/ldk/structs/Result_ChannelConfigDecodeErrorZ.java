package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_ChannelConfigDecodeErrorZ extends CommonBase {
	private Result_ChannelConfigDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelConfigDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelConfigDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ChannelConfigDecodeErrorZ_is_ok(ptr)) {
			return new Result_ChannelConfigDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelConfigDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelConfigDecodeErrorZ_OK extends Result_ChannelConfigDecodeErrorZ {
		public final ChannelConfig res;
		private Result_ChannelConfigDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_ChannelConfigDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.ChannelConfig res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.ChannelConfig(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ChannelConfigDecodeErrorZ_Err extends Result_ChannelConfigDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelConfigDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_ChannelConfigDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_ChannelConfigDecodeErrorZ in the success state.
	 */
	public static Result_ChannelConfigDecodeErrorZ ok(org.ldk.structs.ChannelConfig o) {
		long ret = bindings.CResult_ChannelConfigDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelConfigDecodeErrorZ ret_hu_conv = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_ChannelConfigDecodeErrorZ in the error state.
	 */
	public static Result_ChannelConfigDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_ChannelConfigDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelConfigDecodeErrorZ ret_hu_conv = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_ChannelConfigDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_ChannelConfigDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_ChannelConfigDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_ChannelConfigDecodeErrorZ clone() {
		long ret = bindings.CResult_ChannelConfigDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ChannelConfigDecodeErrorZ ret_hu_conv = Result_ChannelConfigDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
