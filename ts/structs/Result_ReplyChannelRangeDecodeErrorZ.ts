
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ReplyChannelRangeDecodeErrorZ extends CommonBase {
	private Result_ReplyChannelRangeDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ReplyChannelRangeDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ReplyChannelRangeDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ReplyChannelRangeDecodeErrorZ_is_ok(ptr)) {
			return new Result_ReplyChannelRangeDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ReplyChannelRangeDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ReplyChannelRangeDecodeErrorZ_OK extends Result_ReplyChannelRangeDecodeErrorZ {
		public final ReplyChannelRange res;
		private Result_ReplyChannelRangeDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ReplyChannelRangeDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ReplyChannelRange = new ReplyChannelRange(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ReplyChannelRangeDecodeErrorZ_Err extends Result_ReplyChannelRangeDecodeErrorZ {
		public final DecodeError err;
		private Result_ReplyChannelRangeDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ReplyChannelRangeDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ReplyChannelRangeDecodeErrorZ constructor_ok(ReplyChannelRange o) {
		number ret = bindings.CResult_ReplyChannelRangeDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ReplyChannelRangeDecodeErrorZ ret_hu_conv = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ReplyChannelRangeDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ReplyChannelRangeDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ReplyChannelRangeDecodeErrorZ ret_hu_conv = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_ReplyChannelRangeDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_ReplyChannelRangeDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_ReplyChannelRangeDecodeErrorZ clone() {
		number ret = bindings.CResult_ReplyChannelRangeDecodeErrorZ_clone(this.ptr);
		Result_ReplyChannelRangeDecodeErrorZ ret_hu_conv = Result_ReplyChannelRangeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
