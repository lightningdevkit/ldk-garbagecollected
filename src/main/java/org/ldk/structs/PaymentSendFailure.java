package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


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
		public final APIError parameter_error;
		private ParameterError(long ptr, bindings.LDKPaymentSendFailure.ParameterError obj) {
			super(null, ptr);
			long parameter_error = obj.parameter_error;
			APIError parameter_error_hu_conv = APIError.constr_from_ptr(parameter_error);
			parameter_error_hu_conv.ptrs_to.add(this);
			this.parameter_error = parameter_error_hu_conv;
		}
	}
	public final static class PathParameterError extends PaymentSendFailure {
		public final Result_NoneAPIErrorZ[] path_parameter_error;
		private PathParameterError(long ptr, bindings.LDKPaymentSendFailure.PathParameterError obj) {
			super(null, ptr);
			long[] path_parameter_error = obj.path_parameter_error;
			Result_NoneAPIErrorZ[] path_parameter_error_conv_22_arr = new Result_NoneAPIErrorZ[path_parameter_error.length];
			for (int w = 0; w < path_parameter_error.length; w++) {
				long path_parameter_error_conv_22 = path_parameter_error[w];
				Result_NoneAPIErrorZ path_parameter_error_conv_22_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(path_parameter_error_conv_22);
				path_parameter_error_conv_22_arr[w] = path_parameter_error_conv_22_hu_conv;
			}
			this.path_parameter_error = path_parameter_error_conv_22_arr;
		}
	}
	public final static class AllFailedRetrySafe extends PaymentSendFailure {
		public final APIError[] all_failed_retry_safe;
		private AllFailedRetrySafe(long ptr, bindings.LDKPaymentSendFailure.AllFailedRetrySafe obj) {
			super(null, ptr);
			long[] all_failed_retry_safe = obj.all_failed_retry_safe;
			APIError[] all_failed_retry_safe_conv_10_arr = new APIError[all_failed_retry_safe.length];
			for (int k = 0; k < all_failed_retry_safe.length; k++) {
				long all_failed_retry_safe_conv_10 = all_failed_retry_safe[k];
				APIError all_failed_retry_safe_conv_10_hu_conv = APIError.constr_from_ptr(all_failed_retry_safe_conv_10);
				all_failed_retry_safe_conv_10_hu_conv.ptrs_to.add(this);
				all_failed_retry_safe_conv_10_arr[k] = all_failed_retry_safe_conv_10_hu_conv;
			}
			this.all_failed_retry_safe = all_failed_retry_safe_conv_10_arr;
		}
	}
	public final static class PartialFailure extends PaymentSendFailure {
		public final Result_NoneAPIErrorZ[] partial_failure;
		private PartialFailure(long ptr, bindings.LDKPaymentSendFailure.PartialFailure obj) {
			super(null, ptr);
			long[] partial_failure = obj.partial_failure;
			Result_NoneAPIErrorZ[] partial_failure_conv_22_arr = new Result_NoneAPIErrorZ[partial_failure.length];
			for (int w = 0; w < partial_failure.length; w++) {
				long partial_failure_conv_22 = partial_failure[w];
				Result_NoneAPIErrorZ partial_failure_conv_22_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(partial_failure_conv_22);
				partial_failure_conv_22_arr[w] = partial_failure_conv_22_hu_conv;
			}
			this.partial_failure = partial_failure_conv_22_arr;
		}
	}
	/**
	 * Creates a copy of the PaymentSendFailure
	 */
	public PaymentSendFailure clone() {
		long ret = bindings.PaymentSendFailure_clone(this.ptr);
		if (ret < 1024) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParameterError-variant PaymentSendFailure
	 */
	public static PaymentSendFailure parameter_error(APIError a) {
		long ret = bindings.PaymentSendFailure_parameter_error(a.ptr);
		if (ret < 1024) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PathParameterError-variant PaymentSendFailure
	 */
	public static PaymentSendFailure path_parameter_error(Result_NoneAPIErrorZ[] a) {
		long ret = bindings.PaymentSendFailure_path_parameter_error(a != null ? Arrays.stream(a).mapToLong(a_conv_22 -> a_conv_22 != null ? a_conv_22.ptr : 0).toArray() : null);
		if (ret < 1024) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		/* TODO 2 Result_NoneAPIErrorZ  */;
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AllFailedRetrySafe-variant PaymentSendFailure
	 */
	public static PaymentSendFailure all_failed_retry_safe(APIError[] a) {
		long ret = bindings.PaymentSendFailure_all_failed_retry_safe(a != null ? Arrays.stream(a).mapToLong(a_conv_10 -> a_conv_10.ptr).toArray() : null);
		if (ret < 1024) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		/* TODO 2 APIError  */;
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PartialFailure-variant PaymentSendFailure
	 */
	public static PaymentSendFailure partial_failure(Result_NoneAPIErrorZ[] a) {
		long ret = bindings.PaymentSendFailure_partial_failure(a != null ? Arrays.stream(a).mapToLong(a_conv_22 -> a_conv_22 != null ? a_conv_22.ptr : 0).toArray() : null);
		if (ret < 1024) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		/* TODO 2 Result_NoneAPIErrorZ  */;
		return ret_hu_conv;
	}

}
