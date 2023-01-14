package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CommitmentSignedDecodeErrorZ extends CommonBase {
	private Result_CommitmentSignedDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CommitmentSignedDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_CommitmentSignedDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CommitmentSignedDecodeErrorZ_is_ok(ptr)) {
			return new Result_CommitmentSignedDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CommitmentSignedDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CommitmentSignedDecodeErrorZ_OK extends Result_CommitmentSignedDecodeErrorZ {
		public final CommitmentSigned res;
		private Result_CommitmentSignedDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_CommitmentSignedDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.CommitmentSigned res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.CommitmentSigned(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_CommitmentSignedDecodeErrorZ_Err extends Result_CommitmentSignedDecodeErrorZ {
		public final DecodeError err;
		private Result_CommitmentSignedDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_CommitmentSignedDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CommitmentSignedDecodeErrorZ in the success state.
	 */
	public static Result_CommitmentSignedDecodeErrorZ ok(org.ldk.structs.CommitmentSigned o) {
		long ret = bindings.CResult_CommitmentSignedDecodeErrorZ_ok(o == null ? 0 : o.ptr);
		Reference.reachabilityFence(o);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CommitmentSignedDecodeErrorZ ret_hu_conv = Result_CommitmentSignedDecodeErrorZ.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(o); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CommitmentSignedDecodeErrorZ in the error state.
	 */
	public static Result_CommitmentSignedDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_CommitmentSignedDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CommitmentSignedDecodeErrorZ ret_hu_conv = Result_CommitmentSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CommitmentSignedDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	long clone_ptr() {
		long ret = bindings.CResult_CommitmentSignedDecodeErrorZ_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a new CResult_CommitmentSignedDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_CommitmentSignedDecodeErrorZ clone() {
		long ret = bindings.CResult_CommitmentSignedDecodeErrorZ_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CommitmentSignedDecodeErrorZ ret_hu_conv = Result_CommitmentSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
