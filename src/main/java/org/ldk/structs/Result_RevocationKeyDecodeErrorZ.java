package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_RevocationKeyDecodeErrorZ extends CommonBase {
	private Result_RevocationKeyDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_RevocationKeyDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_RevocationKeyDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_RevocationKeyDecodeErrorZ_is_ok(ptr)) {
			return new Result_RevocationKeyDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_RevocationKeyDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_RevocationKeyDecodeErrorZ_OK extends Result_RevocationKeyDecodeErrorZ {
		public final RevocationKey res;
		private Result_RevocationKeyDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_RevocationKeyDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.RevocationKey res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.RevocationKey(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_RevocationKeyDecodeErrorZ_Err extends Result_RevocationKeyDecodeErrorZ {
		public final DecodeError err;
		private Result_RevocationKeyDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_RevocationKeyDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_RevocationKeyDecodeErrorZ in the success state.
	 */
	public static Result_RevocationKeyDecodeErrorZ ok(org.ldk.structs.RevocationKey o) {
		long ret = bindings.CResult_RevocationKeyDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RevocationKeyDecodeErrorZ ret_hu_conv = Result_RevocationKeyDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_RevocationKeyDecodeErrorZ in the error state.
	 */
	public static Result_RevocationKeyDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_RevocationKeyDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RevocationKeyDecodeErrorZ ret_hu_conv = Result_RevocationKeyDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(e); };
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_RevocationKeyDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_RevocationKeyDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_RevocationKeyDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_RevocationKeyDecodeErrorZ clone() {
		long ret = bindings.CResult_RevocationKeyDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_RevocationKeyDecodeErrorZ ret_hu_conv = Result_RevocationKeyDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
