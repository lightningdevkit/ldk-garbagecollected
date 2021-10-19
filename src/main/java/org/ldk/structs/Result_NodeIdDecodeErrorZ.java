package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_NodeIdDecodeErrorZ extends CommonBase {
	private Result_NodeIdDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NodeIdDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_NodeIdDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NodeIdDecodeErrorZ_result_ok(ptr)) {
			return new Result_NodeIdDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NodeIdDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NodeIdDecodeErrorZ_OK extends Result_NodeIdDecodeErrorZ {
		public final NodeId res;
		private Result_NodeIdDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_NodeIdDecodeErrorZ_get_ok(ptr);
			NodeId res_hu_conv = new NodeId(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_NodeIdDecodeErrorZ_Err extends Result_NodeIdDecodeErrorZ {
		public final DecodeError err;
		private Result_NodeIdDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_NodeIdDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_NodeIdDecodeErrorZ in the success state.
	 */
	public static Result_NodeIdDecodeErrorZ ok(NodeId o) {
		long ret = bindings.CResult_NodeIdDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NodeIdDecodeErrorZ in the error state.
	 */
	public static Result_NodeIdDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_NodeIdDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_NodeIdDecodeErrorZ which has the same data as `orig`
	 * but with all dynamically-allocated buffers duplicated in new buffers.
	 */
	public Result_NodeIdDecodeErrorZ clone() {
		long ret = bindings.CResult_NodeIdDecodeErrorZ_clone(this.ptr);
		if (ret >= 0 && ret < 1024) { return null; }
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
