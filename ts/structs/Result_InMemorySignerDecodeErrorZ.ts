
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_InMemorySignerDecodeErrorZ extends CommonBase {
	private Result_InMemorySignerDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_InMemorySignerDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_InMemorySignerDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_InMemorySignerDecodeErrorZ_result_ok(ptr)) {
			return new Result_InMemorySignerDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_InMemorySignerDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_InMemorySignerDecodeErrorZ_OK extends Result_InMemorySignerDecodeErrorZ {
		public final InMemorySigner res;
		private Result_InMemorySignerDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_InMemorySignerDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: InMemorySigner = new InMemorySigner(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_InMemorySignerDecodeErrorZ_Err extends Result_InMemorySignerDecodeErrorZ {
		public final DecodeError err;
		private Result_InMemorySignerDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_InMemorySignerDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_InMemorySignerDecodeErrorZ constructor_ok(InMemorySigner o) {
		number ret = bindings.CResult_InMemorySignerDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_InMemorySignerDecodeErrorZ ret_hu_conv = Result_InMemorySignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_InMemorySignerDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_InMemorySignerDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_InMemorySignerDecodeErrorZ ret_hu_conv = Result_InMemorySignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_InMemorySignerDecodeErrorZ clone() {
		number ret = bindings.CResult_InMemorySignerDecodeErrorZ_clone(this.ptr);
		Result_InMemorySignerDecodeErrorZ ret_hu_conv = Result_InMemorySignerDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
