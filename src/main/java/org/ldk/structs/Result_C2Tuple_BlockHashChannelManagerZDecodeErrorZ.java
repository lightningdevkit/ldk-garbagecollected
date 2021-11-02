package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;

public class Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ extends CommonBase {
	private Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_result_ok(ptr)) {
			return new Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK extends Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ {
		public final TwoTuple_BlockHashChannelManagerZ res;
		private Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_ok(ptr);
			TwoTuple_BlockHashChannelManagerZ res_hu_conv = new TwoTuple_BlockHashChannelManagerZ(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err extends Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ {
		public final DecodeError err;
		private Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = null; if (err < 0 || err > 4096) { err_hu_conv = new DecodeError(null, err); }
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ in the success state.
	 */
	public static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ok(TwoTuple_BlockHashChannelManagerZ o) {
		long ret = bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(o != null ? o.ptr : 0);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ in the error state.
	 */
	public static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
