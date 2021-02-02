
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
		public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_OK(TwoTuple<Uint8Array, Uint8Array[]> res) {
			this(null, bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_ok(bindings.C2Tuple_SignatureCVec_SignatureZZ_new(res.a, res.b)));
		}
	}

	public static final class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err extends Result_C2Tuple_SignatureCVec_SignatureZZNoneZ {
		private Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
		}
		public Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err() {
			this(null, bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_err());
		}
	}
}
