package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;

@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class Result_NonePaymentSendFailureZ extends CommonBase {
	private Result_NonePaymentSendFailureZ(Object _dummy, long ptr) { super(ptr); }
	protected void finalize() throws Throwable {
		bindings.CResult_NonePaymentSendFailureZ_free(ptr); super.finalize();
	}

	public static final class Result_NonePaymentSendFailureZ_OK extends Result_NonePaymentSendFailureZ {
		public byte res;
		private Result_NonePaymentSendFailureZ_OK(Object _dummy, long ptr) {
			super(_dummy, ptr);
			this.res = bindings.LDKCResult_NonePaymentSendFailureZ_get_ok(ptr);
		}

	}
	public static final class Result_NonePaymentSendFailureZ_Err extends Result_NonePaymentSendFailureZ {
		public PaymentSendFailure err;
		private Result_NonePaymentSendFailureZ_Err(Object _dummy, long ptr) {
			super(_dummy, ptr);
			long err = bindings.LDKCResult_NonePaymentSendFailureZ_get_err(ptr);
			PaymentSendFailure err_hu_conv = new PaymentSendFailure(null, err);
			this.err = err_hu_conv;
		}
	}
}
