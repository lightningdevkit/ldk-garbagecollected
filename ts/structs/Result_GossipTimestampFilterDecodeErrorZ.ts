
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

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
			number res = bindings.LDKCResult_GossipTimestampFilterDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: GossipTimestampFilter = new GossipTimestampFilter(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_GossipTimestampFilterDecodeErrorZ_Err extends Result_GossipTimestampFilterDecodeErrorZ {
		public final DecodeError err;
		private Result_GossipTimestampFilterDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_GossipTimestampFilterDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_GossipTimestampFilterDecodeErrorZ constructor_ok(GossipTimestampFilter o) {
		number ret = bindings.CResult_GossipTimestampFilterDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_GossipTimestampFilterDecodeErrorZ ret_hu_conv = Result_GossipTimestampFilterDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_GossipTimestampFilterDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_GossipTimestampFilterDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_GossipTimestampFilterDecodeErrorZ ret_hu_conv = Result_GossipTimestampFilterDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_GossipTimestampFilterDecodeErrorZ clone() {
		number ret = bindings.CResult_GossipTimestampFilterDecodeErrorZ_clone(this.ptr);
		Result_GossipTimestampFilterDecodeErrorZ ret_hu_conv = Result_GossipTimestampFilterDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
