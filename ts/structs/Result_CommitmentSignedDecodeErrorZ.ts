
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_CommitmentSignedDecodeErrorZ extends CommonBase {
	private Result_CommitmentSignedDecodeErrorZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_CommitmentSignedDecodeErrorZ_free(ptr); } super.finalize();
	}

	static Result_CommitmentSignedDecodeErrorZ constr_from_ptr(long ptr) {
		if (bindings.CResult_CommitmentSignedDecodeErrorZ_is_ok(ptr)) {
			return new Result_CommitmentSignedDecodeErrorZ_OK(null, ptr);
		} else {
			return new Result_CommitmentSignedDecodeErrorZ_Err(null, ptr);
		}
	}
	public static final class Result_CommitmentSignedDecodeErrorZ_OK extends Result_CommitmentSignedDecodeErrorZ {
		public final CommitmentSigned res;
		private Result_CommitmentSignedDecodeErrorZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_CommitmentSignedDecodeErrorZ_get_ok(ptr);
			const res_hu_conv: CommitmentSigned = new CommitmentSigned(null, res);
			res_hu_conv.ptrs_to.add(this);
			this.res = res_hu_conv;
		}
	}

	public static final class Result_CommitmentSignedDecodeErrorZ_Err extends Result_CommitmentSignedDecodeErrorZ {
		public final DecodeError err;
		private Result_CommitmentSignedDecodeErrorZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number err = bindings.LDKCResult_CommitmentSignedDecodeErrorZ_get_err(ptr);
			const err_hu_conv: DecodeError = new DecodeError(null, err);
			err_hu_conv.ptrs_to.add(this);
			this.err = err_hu_conv;
		}
	}

	public static Result_CommitmentSignedDecodeErrorZ constructor_ok(CommitmentSigned o) {
		number ret = bindings.CResult_CommitmentSignedDecodeErrorZ_ok(o == null ? 0 : o.ptr & ~1);
		Result_CommitmentSignedDecodeErrorZ ret_hu_conv = Result_CommitmentSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_CommitmentSignedDecodeErrorZ constructor_err(DecodeError e) {
		number ret = bindings.CResult_CommitmentSignedDecodeErrorZ_err(e == null ? 0 : e.ptr & ~1);
		Result_CommitmentSignedDecodeErrorZ ret_hu_conv = Result_CommitmentSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public boolean is_ok() {
		boolean ret = bindings.CResult_CommitmentSignedDecodeErrorZ_is_ok(this.ptr);
		return ret;
	}

	public number clone_ptr() {
		number ret = bindings.CResult_CommitmentSignedDecodeErrorZ_clone_ptr(this.ptr);
		return ret;
	}

	public Result_CommitmentSignedDecodeErrorZ clone() {
		number ret = bindings.CResult_CommitmentSignedDecodeErrorZ_clone(this.ptr);
		Result_CommitmentSignedDecodeErrorZ ret_hu_conv = Result_CommitmentSignedDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
