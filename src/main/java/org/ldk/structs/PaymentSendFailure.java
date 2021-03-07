package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;


/**
 * If a payment fails to send, it can be in one of several states. This enum is returned as the
 * Err() type describing which state the payment is in, see the description of individual enum
 * states for more.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class PaymentSendFailure extends CommonBase {
	private PaymentSendFailure(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.PaymentSendFailure_free(ptr); }
	}
	static PaymentSendFailure constr_from_ptr(long ptr) {
		bindings.LDKPaymentSendFailure raw_val = bindings.LDKPaymentSendFailure_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKPaymentSendFailure.ParameterError.class) {
			return new ParameterError(ptr, (bindings.LDKPaymentSendFailure.ParameterError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentSendFailure.PathParameterError.class) {
			return new PathParameterError(ptr, (bindings.LDKPaymentSendFailure.PathParameterError)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentSendFailure.AllFailedRetrySafe.class) {
			return new AllFailedRetrySafe(ptr, (bindings.LDKPaymentSendFailure.AllFailedRetrySafe)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentSendFailure.PartialFailure.class) {
			return new PartialFailure(ptr, (bindings.LDKPaymentSendFailure.PartialFailure)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	public final static class ParameterError extends PaymentSendFailure {
		private ParameterError(long ptr, bindings.LDKPaymentSendFailure.ParameterError obj) {
			super(null, ptr);
		}
	}
	public final static class PathParameterError extends PaymentSendFailure {
		private PathParameterError(long ptr, bindings.LDKPaymentSendFailure.PathParameterError obj) {
			super(null, ptr);
		}
	}
	public final static class AllFailedRetrySafe extends PaymentSendFailure {
		private AllFailedRetrySafe(long ptr, bindings.LDKPaymentSendFailure.AllFailedRetrySafe obj) {
			super(null, ptr);
		}
	}
	public final static class PartialFailure extends PaymentSendFailure {
		private PartialFailure(long ptr, bindings.LDKPaymentSendFailure.PartialFailure obj) {
			super(null, ptr);
		}
	}
}
