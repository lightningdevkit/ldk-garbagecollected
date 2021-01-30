package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
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
		public final TwoTuple<byte[], ChannelManager> res;
		private Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_ok(ptr);
			byte[] res_a = bindings.LDKC2Tuple_BlockHashChannelManagerZ_get_a(res);
			long res_b = bindings.LDKC2Tuple_BlockHashChannelManagerZ_get_b(res);
			ChannelManager res_b_hu_conv = new ChannelManager(null, res_b);
			res_b_hu_conv.ptrs_to.add(this);;
			TwoTuple<byte[], ChannelManager> res_conv = new TwoTuple<byte[], ChannelManager>(res_a, res_b_hu_conv);
			this.res = res_conv;
		}
		public Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK(TwoTuple<byte[], ChannelManager> res) {
			this(null, bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(bindings.C2Tuple_BlockHashChannelManagerZ_new(res.a, res.b == null ? 0 : res.b.ptr & ~1)));
			this.ptrs_to.add(res.b);
			// Due to rust's strict-ownership memory model, in some cases we need to "move"
			// an object to pass exclusive ownership to the function being called.
			// In most cases, we avoid this being visible in GC'd languages by cloning the object
			// at the FFI layer, creating a new object which Rust can claim ownership of
			// However, in some cases (eg here), there is no way to clone an object, and thus
			// we actually have to pass full ownership to Rust.
			// Thus, after this call, res.b is reset to null and is now a dummy object.
			res.b.ptr = 0;
		}
	}

	public static final class Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err extends Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ {
		public final DecodeError err;
		private Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_err(ptr);
			DecodeError err_hu_conv = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
