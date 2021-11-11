
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_OutPointDecodeErrorZ extends CommonBase {
	private Result_OutPointDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_OutPointDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_OutPointDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_OutPointDecodeErrorZ_is_ok(ptr)) {
			return new Result_OutPointDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_OutPointDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_OutPointDecodeErrorZ_OK extends Result_OutPointDecodeErrorZ {
		public final OutPoint res;
		private Result_OutPointDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_OutPointDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: OutPoint = new OutPoint(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_OutPointDecodeErrorZ_Err extends Result_OutPointDecodeErrorZ {
		public final DecodeError err;
		private Result_OutPointDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_OutPointDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_OutPointDecodeErrorZ constructor_ok(OutPoint o) {
		number ret = bindings.CResult_OutPointDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_OutPointDecodeErrorZ ret_hu_conv = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_OutPointDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_OutPointDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_OutPointDecodeErrorZ ret_hu_conv = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_OutPointDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_OutPointDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_OutPointDecodeErrorZ clone() {
		number ret = bindings.CResult_OutPointDecodeErrorZ_clone(this.ptr);
		Result_OutPointDecodeErrorZ ret_hu_conv = Result_OutPointDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
