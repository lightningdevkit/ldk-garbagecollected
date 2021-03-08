package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

public class Result_ChannelInfoDecodeErrorZ extends CommonBase {
	private Result_ChannelInfoDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ChannelInfoDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ChannelInfoDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_ChannelInfoDecodeErrorZ_result_ok(ptr)) {
			return new Result_ChannelInfoDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ChannelInfoDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ChannelInfoDecodeErrorZ_OK extends Result_ChannelInfoDecodeErrorZ {
		public final ChannelInfo res;
		private Result_ChannelInfoDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_ChannelInfoDecodeErrorZ_get_ok(ptr);
			ChannelInfo res_hu_conv = new ChannelInfo(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_ChannelInfoDecodeErrorZ_OK(ChannelInfo res) {
			this(null, bindings.CResult_ChannelInfoDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_ChannelInfoDecodeErrorZ_Err extends Result_ChannelInfoDecodeErrorZ {
		public final DecodeError err;
		private Result_ChannelInfoDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_ChannelInfoDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_ChannelInfoDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_ChannelInfoDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
