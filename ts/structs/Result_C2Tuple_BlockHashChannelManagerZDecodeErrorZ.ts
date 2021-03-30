
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
			const res_b_hu_conv: ChannelManager = new ChannelManager(null, res_b);
			res_b_hu_conv.ptrs_to.add(this);;
			TwoTuple<Uint8Array, ChannelManager> res_conv = new TwoTuple<Uint8Array, ChannelManager>(res_a, res_b_hu_conv, () -> {
				bindings.C2Tuple_BlockHashChannelManagerZ_free(res);
			});
			res_b_hu_conv.ptrs_to.add(res_conv);
			this.res = res_conv;
		}
	}

	public static final class Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err extends Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ {
		public final DecodeError err;
		private Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ constructor__ok(TwoTuple<Uint8Array, ChannelManager> o) {
		number ret = bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_ok(bindings.C2Tuple_BlockHashChannelManagerZ_new(o.a, o.b == null ? 0 : o.b.ptr & ~1));
		Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o.b);
		// Due to rust's strict-ownership memory model, in some cases we need to "move"
		// an object to pass exclusive ownership to the function being called.
		// In most cases, we avoid ret_hu_conv being visible in GC'd languages by cloning the object
		// at the FFI layer, creating a new object which Rust can claim ownership of
		// However, in some cases (eg here), there is no way to clone an object, and thus
		// we actually have to pass full ownership to Rust.
		// Thus, after ret_hu_conv call, o.b is reset to null and is now a dummy object.
		o.b.ptr = 0;
		return ret_hu_conv;
	}

	public static Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_C2Tuple_BlockHashChannelManagerZDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ ret_hu_conv = Result_C2Tuple_BlockHashChannelManagerZDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

}
