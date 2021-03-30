
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NodeFeaturesDecodeErrorZ extends CommonBase {
	private Result_NodeFeaturesDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NodeFeaturesDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_NodeFeaturesDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NodeFeaturesDecodeErrorZ_result_ok(ptr)) {
			return new Result_NodeFeaturesDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NodeFeaturesDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NodeFeaturesDecodeErrorZ_OK extends Result_NodeFeaturesDecodeErrorZ {
		public final NodeFeatures res;
		private Result_NodeFeaturesDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_NodeFeaturesDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: NodeFeatures = new NodeFeatures(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_NodeFeaturesDecodeErrorZ_Err extends Result_NodeFeaturesDecodeErrorZ {
		public final DecodeError err;
		private Result_NodeFeaturesDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NodeFeaturesDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_NodeFeaturesDecodeErrorZ constructor__ok(NodeFeatures o) {
		number ret = bindings.CResult_NodeFeaturesDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_NodeFeaturesDecodeErrorZ ret_hu_conv = Result_NodeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(o);
		return ret_hu_conv;
	}

	public static Result_NodeFeaturesDecodeErrorZ constructor__err(DecodeError e) {
		number ret = bindings.CResult_NodeFeaturesDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_NodeFeaturesDecodeErrorZ ret_hu_conv = Result_NodeFeaturesDecodeErrorZ.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(e);
		return ret_hu_conv;
	}

}
