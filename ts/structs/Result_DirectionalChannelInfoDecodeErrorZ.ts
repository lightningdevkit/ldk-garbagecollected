
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_DirectionalChannelInfoDecodeErrorZ extends CommonBase {
	private Result_DirectionalChannelInfoDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_DirectionalChannelInfoDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_DirectionalChannelInfoDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_DirectionalChannelInfoDecodeErrorZ_is_ok(ptr)) {
			return new Result_DirectionalChannelInfoDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_DirectionalChannelInfoDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_DirectionalChannelInfoDecodeErrorZ_OK extends Result_DirectionalChannelInfoDecodeErrorZ {
		public final DirectionalChannelInfo res;
		private Result_DirectionalChannelInfoDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_DirectionalChannelInfoDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: DirectionalChannelInfo = new DirectionalChannelInfo(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_DirectionalChannelInfoDecodeErrorZ_Err extends Result_DirectionalChannelInfoDecodeErrorZ {
		public final DecodeError err;
		private Result_DirectionalChannelInfoDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_DirectionalChannelInfoDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_DirectionalChannelInfoDecodeErrorZ constructor_ok(DirectionalChannelInfo o) {
		number ret = bindings.CResult_DirectionalChannelInfoDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_DirectionalChannelInfoDecodeErrorZ ret_hu_conv = Result_DirectionalChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_DirectionalChannelInfoDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_DirectionalChannelInfoDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_DirectionalChannelInfoDecodeErrorZ ret_hu_conv = Result_DirectionalChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_DirectionalChannelInfoDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_DirectionalChannelInfoDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_DirectionalChannelInfoDecodeErrorZ clone() {
		number ret = bindings.CResult_DirectionalChannelInfoDecodeErrorZ_clone(this.ptr);
		Result_DirectionalChannelInfoDecodeErrorZ ret_hu_conv = Result_DirectionalChannelInfoDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
