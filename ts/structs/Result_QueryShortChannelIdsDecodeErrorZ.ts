
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_QueryShortChannelIdsDecodeErrorZ extends CommonBase {
	private Result_QueryShortChannelIdsDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_QueryShortChannelIdsDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_QueryShortChannelIdsDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_QueryShortChannelIdsDecodeErrorZ_is_ok(ptr)) {
			return new Result_QueryShortChannelIdsDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_QueryShortChannelIdsDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_QueryShortChannelIdsDecodeErrorZ_OK extends Result_QueryShortChannelIdsDecodeErrorZ {
		public final QueryShortChannelIds res;
		private Result_QueryShortChannelIdsDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: QueryShortChannelIds = new QueryShortChannelIds(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_QueryShortChannelIdsDecodeErrorZ_Err extends Result_QueryShortChannelIdsDecodeErrorZ {
		public final DecodeError err;
		private Result_QueryShortChannelIdsDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_QueryShortChannelIdsDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_QueryShortChannelIdsDecodeErrorZ constructor_ok(QueryShortChannelIds o) {
		number ret = bindings.CResult_QueryShortChannelIdsDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_QueryShortChannelIdsDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_QueryShortChannelIdsDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_QueryShortChannelIdsDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_QueryShortChannelIdsDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_QueryShortChannelIdsDecodeErrorZ clone() {
		number ret = bindings.CResult_QueryShortChannelIdsDecodeErrorZ_clone(this.ptr);
		Result_QueryShortChannelIdsDecodeErrorZ ret_hu_conv = Result_QueryShortChannelIdsDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
