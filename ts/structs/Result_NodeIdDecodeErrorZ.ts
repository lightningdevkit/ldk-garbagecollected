
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NodeIdDecodeErrorZ extends CommonBase {
	private Result_NodeIdDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NodeIdDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_NodeIdDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NodeIdDecodeErrorZ_result_ok(ptr)) {
			return new Result_NodeIdDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NodeIdDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NodeIdDecodeErrorZ_OK extends Result_NodeIdDecodeErrorZ {
		public final NodeId res;
		private Result_NodeIdDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_NodeIdDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: NodeId = new NodeId(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_NodeIdDecodeErrorZ_Err extends Result_NodeIdDecodeErrorZ {
		public final DecodeError err;
		private Result_NodeIdDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NodeIdDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_NodeIdDecodeErrorZ constructor_ok(NodeId o) {
		number ret = bindings.CResult_NodeIdDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_NodeIdDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_NodeIdDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_NodeIdDecodeErrorZ clone() {
		number ret = bindings.CResult_NodeIdDecodeErrorZ_clone(this.ptr);
		Result_NodeIdDecodeErrorZ ret_hu_conv = Result_NodeIdDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
