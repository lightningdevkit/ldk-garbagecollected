
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_OutPointDecodeErrorZ extends CommonBase {
	private Result_OutPointDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_OutPointDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_OutPointDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_OutPointDecodeErrorZ_result_ok(ptr)) {
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
		public Result_OutPointDecodeErrorZ_OK(OutPoint res) {
			this(null, bindings.CResult_OutPointDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
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
		public Result_OutPointDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_OutPointDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
