
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
		public final TwoTuple<Uint8Array, ChannelManager> res;
		private Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_ok(ptr);
			Uint8Array res_a = bindings.LDKC2Tuple_BlockHashChannelManagerZ_get_a(res);
			number res_b = bindings.LDKC2Tuple_BlockHashChannelManagerZ_get_b(res);
			const res_b_hu_conv: ChannelManager = new ChannelManager(null, res_b);;
			TwoTuple<Uint8Array, ChannelManager> res_conv = new TwoTuple<Uint8Array, ChannelManager>(res_a, res_b_hu_conv);
			this.res = res_conv;
		}
		public Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_OK(TwoTuple<Uint8Array, ChannelManager> res) {
			this(null, bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(bindings.C2Tuple_BlockHashChannelManagerZ_new(res.a, res.b == null ? 0 : res.b.ptr & ~1/*XXX: this.ptrs_to.add(res_b)*/)));
		}
	}

	public static final class Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err extends Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ {
		public final DecodeError err;
		private Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			this.err = err_hu_conv;
		}
		public Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
