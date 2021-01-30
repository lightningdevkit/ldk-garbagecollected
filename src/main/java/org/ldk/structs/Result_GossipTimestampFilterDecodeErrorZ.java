package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_GossipTimestampFilterDecodeErrorZ extends CommonBase {
	private Result_GossipTimestampFilterDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_GossipTimestampFilterDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_GossipTimestampFilterDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_GossipTimestampFilterDecodeErrorZ_result_ok(ptr)) {
			return new Result_GossipTimestampFilterDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_GossipTimestampFilterDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_GossipTimestampFilterDecodeErrorZ_OK extends Result_GossipTimestampFilterDecodeErrorZ {
		public final GossipTimestampFilter res;
		private Result_GossipTimestampFilterDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_GossipTimestampFilterDecodeErrorZ_get_ok(ptr);
			GossipTimestampFilter res_hu_conv = new GossipTimestampFilter(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_GossipTimestampFilterDecodeErrorZ_OK(GossipTimestampFilter res) {
			this(null, bindings.CResult_GossipTimestampFilterDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_GossipTimestampFilterDecodeErrorZ_Err extends Result_GossipTimestampFilterDecodeErrorZ {
		public final DecodeError err;
		private Result_GossipTimestampFilterDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_GossipTimestampFilterDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_GossipTimestampFilterDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_GossipTimestampFilterDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
