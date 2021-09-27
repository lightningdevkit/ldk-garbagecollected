
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NetAddressDecodeErrorZ extends CommonBase {
	private Result_NetAddressDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NetAddressDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_NetAddressDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NetAddressDecodeErrorZ_result_ok(ptr)) {
			return new Result_NetAddressDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NetAddressDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NetAddressDecodeErrorZ_OK extends Result_NetAddressDecodeErrorZ {
		public final NetAddress res;
		private Result_NetAddressDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_NetAddressDecodeErrorZ_get_ok(ptr);
			NetAddress res_hu_conv = NetAddress.constr_from_ptr(res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_NetAddressDecodeErrorZ_Err extends Result_NetAddressDecodeErrorZ {
		public final DecodeError err;
		private Result_NetAddressDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NetAddressDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_NetAddressDecodeErrorZ constructor_ok(NetAddress o) {
		number ret = bindings.CResult_NetAddressDecodeErrorZ_ok(o.ptr);
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NetAddressDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_NetAddressDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

	public Result_NetAddressDecodeErrorZ clone() {
		number ret = bindings.CResult_NetAddressDecodeErrorZ_clone(this.ptr);
		Result_NetAddressDecodeErrorZ ret_hu_conv = Result_NetAddressDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
