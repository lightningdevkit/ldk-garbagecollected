
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_QueryChannelRangeDecodeErrorZ extends CommonBase {
	private Result_QueryChannelRangeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_QueryChannelRangeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_QueryChannelRangeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_QueryChannelRangeDecodeErrorZ_is_ok(ptr)) {
			return new Result_QueryChannelRangeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_QueryChannelRangeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_QueryChannelRangeDecodeErrorZ_OK extends Result_QueryChannelRangeDecodeErrorZ {
		public final QueryChannelRange res;
		private Result_QueryChannelRangeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_QueryChannelRangeDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: QueryChannelRange = new QueryChannelRange(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_QueryChannelRangeDecodeErrorZ_Err extends Result_QueryChannelRangeDecodeErrorZ {
		public final DecodeError err;
		private Result_QueryChannelRangeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_QueryChannelRangeDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_QueryChannelRangeDecodeErrorZ constructor_ok(QueryChannelRange o) {
		number ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_QueryChannelRangeDecodeErrorZ ret_hu_conv = Result_QueryChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_QueryChannelRangeDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_QueryChannelRangeDecodeErrorZ ret_hu_conv = Result_QueryChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_QueryChannelRangeDecodeErrorZ clone() {
		number ret = bindings.CResult_QueryChannelRangeDecodeErrorZ_clone(this.ptr);
		Result_QueryChannelRangeDecodeErrorZ ret_hu_conv = Result_QueryChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
