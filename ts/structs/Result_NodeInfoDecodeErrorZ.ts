
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_NodeInfoDecodeErrorZ extends CommonBase {
	private Result_NodeInfoDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_NodeInfoDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_NodeInfoDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_NodeInfoDecodeErrorZ_result_ok(ptr)) {
			return new Result_NodeInfoDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_NodeInfoDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_NodeInfoDecodeErrorZ_OK extends Result_NodeInfoDecodeErrorZ {
		public final NodeInfo res;
		private Result_NodeInfoDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_NodeInfoDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: NodeInfo = new NodeInfo(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
		public Result_NodeInfoDecodeErrorZ_OK(NodeInfo res) {
			this(null, bindings.CResult_NodeInfoDecodeErrorZ_ok(res == null ? 0 : res.ptr & ~1));
			this.ptrs_to.add(res);
		}
	}

	public static final class Result_NodeInfoDecodeErrorZ_Err extends Result_NodeInfoDecodeErrorZ {
		public final DecodeError err;
		private Result_NodeInfoDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_NodeInfoDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
		public Result_NodeInfoDecodeErrorZ_Err(DecodeError err) {
			this(null, bindings.CResult_NodeInfoDecodeErrorZ_err(err == null ? 0 : err.ptr & ~1));
			this.ptrs_to.add(err);
		}
	}
}
