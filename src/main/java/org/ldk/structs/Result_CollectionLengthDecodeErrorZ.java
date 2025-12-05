package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

public class Result_CollectionLengthDecodeErrorZ extends CommonBase {
	private Result_CollectionLengthDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CollectionLengthDecodeErrorZ_free(ptr); } super.finalize();
	}

	protected void force_free() {
		if (ptr != 0) { bindings.CResult_CollectionLengthDecodeErrorZ_free(ptr); ptr = 0; }
	}

	static Result_CollectionLengthDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CollectionLengthDecodeErrorZ_is_ok(ptr)) {
			return new Result_CollectionLengthDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CollectionLengthDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CollectionLengthDecodeErrorZ_OK extends Result_CollectionLengthDecodeErrorZ {
		public final CollectionLength res;
		private Result_CollectionLengthDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.CResult_CollectionLengthDecodeErrorZ_get_ok(ptr);
			org.ldk.structs.CollectionLength res_hu_conv = null; if (res < 0 || res > 4096) { res_hu_conv = new org.ldk.structs.CollectionLength(null, res); }
			if (res_hu_conv != null) { res_hu_conv.ptrs_to.add(this); };
			this.res = res_hu_conv;
		}
	}

	public static final class Result_CollectionLengthDecodeErrorZ_Err extends Result_CollectionLengthDecodeErrorZ {
		public final DecodeError err;
		private Result_CollectionLengthDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.CResult_CollectionLengthDecodeErrorZ_get_err(ptr);
			org.ldk.structs.DecodeError err_hu_conv = org.ldk.structs.DecodeError.constr_from_ptr(err);
			if (err_hu_conv != null) { err_hu_conv.ptrs_to.add(this); };
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_CollectionLengthDecodeErrorZ in the success state.
	 */
	public static Result_CollectionLengthDecodeErrorZ ok(long o_a_arg) {
		long ret = bindings.CResult_CollectionLengthDecodeErrorZ_ok(bindings.CollectionLength_new(o_a_arg));
		Reference.reachabilityFence(o_a_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CollectionLengthDecodeErrorZ ret_hu_conv = Result_CollectionLengthDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_CollectionLengthDecodeErrorZ in the error state.
	 */
	public static Result_CollectionLengthDecodeErrorZ err(org.ldk.structs.DecodeError e) {
		long ret = bindings.CResult_CollectionLengthDecodeErrorZ_err(e.ptr);
		Reference.reachabilityFence(e);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CollectionLengthDecodeErrorZ ret_hu_conv = Result_CollectionLengthDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Checks if the given object is currently in the success state
	 */
	public boolean is_ok() {
		boolean ret = bindings.CResult_CollectionLengthDecodeErrorZ_is_ok(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
