
import CommonBase from './CommonBase';
import * as bindings from '../bindings' // TODO: figure out location

public class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ extends CommonBase {
	private Result_C2Tuple_SignatureCVec_SignatureZZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(ptr); } super.finalize();
	}

	static Result_C2Tuple_SignatureCVec_SignatureZZNoneZ constr_from_ptr(long ptr) {
		if (bindings.LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_result_ok(ptr)) {
			return new Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_OK(null, ptr);
		} else {
			return new Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err(null, ptr);
		}
	}
	public static final class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_OK extends Result_C2Tuple_SignatureCVec_SignatureZZNoneZ {
		public final TwoTuple<Uint8Array, Uint8Array[]> res;
		private Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			number res = bindings.LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_ok(ptr);
			Uint8Array res_a = bindings.LDKC2Tuple_SignatureCVec_SignatureZZ_get_a(res);
			Uint8Array[] res_b = bindings.LDKC2Tuple_SignatureCVec_SignatureZZ_get_b(res);
			TwoTuple<Uint8Array, Uint8Array[]> res_conv = new TwoTuple<Uint8Array, Uint8Array[]>(res_a, res_b, () -> {
				bindings.C2Tuple_SignatureCVec_SignatureZZ_free(res);
			});
			this.res = res_conv;
		}
	}

	public static final class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err extends Result_C2Tuple_SignatureCVec_SignatureZZNoneZ {
		private Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
	}

	public static Result_C2Tuple_SignatureCVec_SignatureZZNoneZ constructor__ok(TwoTuple<Uint8Array, Uint8Array[]> o) {
		number ret = bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(bindings.C2Tuple_SignatureCVec_SignatureZZ_new(o.a, o.b));
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public static Result_C2Tuple_SignatureCVec_SignatureZZNoneZ constructor__err() {
		number ret = bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err();
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ _clone() {
		number ret = bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_clone(this.ptr);
		Result_C2Tuple_SignatureCVec_SignatureZZNoneZ ret_hu_conv = Result_C2Tuple_SignatureCVec_SignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
