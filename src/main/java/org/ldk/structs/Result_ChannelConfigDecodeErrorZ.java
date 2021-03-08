package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_ChannelConfigDecodeErrorZ extends CommonBase {
	private Result_ChannelConfigDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelConfigDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelConfigDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelConfigDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelConfigDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelConfigDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelConfigDecodeErrorZ_OK extends Result_ChannelConfigDecodeErrorZ {
		public final ChannelConfig res;
		private Result_ChannelConfigDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ChannelConfigDecodeErrorZ_get_ok(ptr);
			ChannelConfig res_hu_conv = new ChannelConfig(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_ChannelConfigDecodeErrorZ_OK(ChannelConfig res) {
			this(null, bindings.CResult_ChannelConfigDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_ChannelConfigDecodeErrorZ_Err extends Result_ChannelConfigDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelConfigDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ChannelConfigDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_ChannelConfigDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ChannelConfigDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
