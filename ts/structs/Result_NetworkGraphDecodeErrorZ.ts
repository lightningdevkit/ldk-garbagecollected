
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NetworkGraphDecodeErrorZ extends CommonBase {
	private Result_NetworkGraphDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NetworkGraphDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_NetworkGraphDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_NetworkGraphDecodeErrorZ_is_ok(ptr)) {
			return new Result_NetworkGraphDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NetworkGraphDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NetworkGraphDecodeErrorZ_OK extends Result_NetworkGraphDecodeErrorZ {
		public final NetworkGraph res;
		private Result_NetworkGraphDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_NetworkGraphDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: NetworkGraph = new NetworkGraph(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_NetworkGraphDecodeErrorZ_Err extends Result_NetworkGraphDecodeErrorZ {
		public final DecodeError err;
		private Result_NetworkGraphDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NetworkGraphDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_NetworkGraphDecodeErrorZ constructor_ok(NetworkGraph o) {
		number ret = bindings.CResult_NetworkGraphDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_NetworkGraphDecodeErrorZ ret_hu_conv = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NetworkGraphDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_NetworkGraphDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_NetworkGraphDecodeErrorZ ret_hu_conv = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_NetworkGraphDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_NetworkGraphDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_NetworkGraphDecodeErrorZ clone() {
		number ret = bindings.CResult_NetworkGraphDecodeErrorZ_clone(this.ptr);
		Result_NetworkGraphDecodeErrorZ ret_hu_conv = Result_NetworkGraphDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
