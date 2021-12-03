
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_ReplyShortChannelIdsEndDecodeErrorZ extends CommonBase {
	private Result_ReplyShortChannelIdsEndDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_ReplyShortChannelIdsEndDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_is_ok(ptr)) {
			return new Result_ReplyShortChannelIdsEndDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_ReplyShortChannelIdsEndDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_ReplyShortChannelIdsEndDecodeErrorZ_OK extends Result_ReplyShortChannelIdsEndDecodeErrorZ {
		public final ReplyShortChannelIdsEnd res;
		private Result_ReplyShortChannelIdsEndDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: ReplyShortChannelIdsEnd = new ReplyShortChannelIdsEnd(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_ReplyShortChannelIdsEndDecodeErrorZ_Err extends Result_ReplyShortChannelIdsEndDecodeErrorZ {
		public final DecodeError err;
		private Result_ReplyShortChannelIdsEndDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_ReplyShortChannelIdsEndDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_ReplyShortChannelIdsEndDecodeErrorZ constructor_ok(ReplyShortChannelIdsEnd o) {
		number ret = bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_ReplyShortChannelIdsEndDecodeErrorZ ret_hu_conv = Result_ReplyShortChannelIdsEndDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_ReplyShortChannelIdsEndDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_ReplyShortChannelIdsEndDecodeErrorZ ret_hu_conv = Result_ReplyShortChannelIdsEndDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_ReplyShortChannelIdsEndDecodeErrorZ clone() {
		number ret = bindings.CResult_ReplyShortChannelIdsEndDecodeErrorZ_clone(this.ptr);
		Result_ReplyShortChannelIdsEndDecodeErrorZ ret_hu_conv = Result_ReplyShortChannelIdsEndDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
