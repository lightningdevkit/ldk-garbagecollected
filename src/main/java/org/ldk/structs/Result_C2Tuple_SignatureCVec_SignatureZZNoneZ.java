package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ extends CommonBase {
	private Result_C2Tuple_SignatureCVec_SignatureZZNoneZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_free(ptr); super.finalize();
	}

	public static final class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_OK extends Result_C2Tuple_SignatureCVec_SignatureZZNoneZ {
		public TwoTuple<byte[], byte[][]> res;
		private Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long res = bindings.LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_ok(ptr);
			byte[] res_a = bindings.LDKC2Tuple_SignatureCVec_SignatureZZ_get_a(res);
			byte[][] res_b = bindings.LDKC2Tuple_SignatureCVec_SignatureZZ_get_b(res);
			TwoTuple<byte[], byte[][]> res_conv = new TwoTuple<byte[], byte[][]>(res_a, res_b);
			this.res = res_conv;
		}

	}
	public static final class Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err extends Result_C2Tuple_SignatureCVec_SignatureZZNoneZ {
		public byte err;
		private Result_C2Tuple_SignatureCVec_SignatureZZNoneZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.err = bindings.LDKCResult_C2Tuple_SignatureCVec_SignatureZZNoneZ_get_err(ptr);
		}
	}
}
