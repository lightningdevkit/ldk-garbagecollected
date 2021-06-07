package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ extends CommonBase {
	private Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_result_ok(ptr)) {
			return new Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK extends Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ {
		public final TwoTuple<byte[], ChannelMonitor> res;
		private Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_ok(ptr);
			byte[] res_a = bindings.LDKC2Tuple_BlockHashChannelMonitorZ_get_a(res);
			long res_b = bindings.LDKC2Tuple_BlockHashChannelMonitorZ_get_b(res);
			ChannelMonitor res_b_hu_conv = new ChannelMonitor(null, res_b);
			res_b_hu_conv.ptrs_to.add(this);;
			TwoTuple<byte[], ChannelMonitor> res_conv = new TwoTuple<byte[], ChannelMonitor>(res_a, res_b_hu_conv, () -> {
				bindings.C2Tuple_BlockHashChannelMonitorZ_free(res);
			});
			res_b_hu_conv.ptrs_to.add(res_conv);
			this.res = res_conv;
		}
	}

	public static final class Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_Err extends Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ {
		public final DecodeError err;
		private Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	/**
	 * Creates a new CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ in the success state.
	 */
	public static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ok(TwoTuple<byte[], ChannelMonitor> o) {
		long ret = bindings.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_ok(bindings.C2Tuple_BlockHashChannelMonitorZ_new(o.a, o.b == null ? 0 : o.b.ptr & ~1));
		Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o.b);
		return ret_hu_conv;
	}

	/**
	 * Creates a new CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ in the error state.
	 */
	public static Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ err(DecodeError e) {
		long ret = bindings.CResult_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelMonitorZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

}
