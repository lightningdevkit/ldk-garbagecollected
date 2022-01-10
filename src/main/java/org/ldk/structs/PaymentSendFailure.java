package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
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

	/**
	 * A parameter which was passed to send_payment was invalid, preventing us from attempting to
	 * send the payment at all. No channel state has been changed or messages sent to peers, and
	 * once you've changed the parameter at error, you can freely retry the payment in full.
	 */
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
	/**
	 * A parameter in a single path which was passed to send_payment was invalid, preventing us
	 * from attempting to send the payment at all. No channel state has been changed or messages
	 * sent to peers, and once you've changed the parameter at error, you can freely retry the
	 * payment in full.
	 * 
	 * The results here are ordered the same as the paths in the route object which was passed to
	 * send_payment.
	 */
	public final static class PathParameterError extends PaymentSendFailure {
		public final Result_NoneAPIErrorZ[] path_parameter_error;
		private PathParameterError(long ptr, bindings.LDKPaymentSendFailure.PathParameterError obj) {
			super(null, ptr);
			long[] path_parameter_error = obj.path_parameter_error;
			int path_parameter_error_conv_22_len = path_parameter_error.length;
			Result_NoneAPIErrorZ[] path_parameter_error_conv_22_arr = new Result_NoneAPIErrorZ[path_parameter_error_conv_22_len];
			for (int w = 0; w < path_parameter_error_conv_22_len; w++) {
				long path_parameter_error_conv_22 = path_parameter_error[w];
				Result_NoneAPIErrorZ path_parameter_error_conv_22_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(path_parameter_error_conv_22);
				path_parameter_error_conv_22_arr[w] = path_parameter_error_conv_22_hu_conv;
			}
			this.path_parameter_error = path_parameter_error_conv_22_arr;
		}
	}
	/**
	 * All paths which were attempted failed to send, with no channel state change taking place.
	 * You can freely retry the payment in full (though you probably want to do so over different
	 * paths than the ones selected).
	 */
	public final static class AllFailedRetrySafe extends PaymentSendFailure {
		public final APIError[] all_failed_retry_safe;
		private AllFailedRetrySafe(long ptr, bindings.LDKPaymentSendFailure.AllFailedRetrySafe obj) {
			super(null, ptr);
			long[] all_failed_retry_safe = obj.all_failed_retry_safe;
			int all_failed_retry_safe_conv_10_len = all_failed_retry_safe.length;
			APIError[] all_failed_retry_safe_conv_10_arr = new APIError[all_failed_retry_safe_conv_10_len];
			for (int k = 0; k < all_failed_retry_safe_conv_10_len; k++) {
				long all_failed_retry_safe_conv_10 = all_failed_retry_safe[k];
				APIError all_failed_retry_safe_conv_10_hu_conv = APIError.constr_from_ptr(all_failed_retry_safe_conv_10);
				all_failed_retry_safe_conv_10_hu_conv.ptrs_to.add(this);
				all_failed_retry_safe_conv_10_arr[k] = all_failed_retry_safe_conv_10_hu_conv;
			}
			this.all_failed_retry_safe = all_failed_retry_safe_conv_10_arr;
		}
	}
	/**
	 * Some paths which were attempted failed to send, though possibly not all. At least some
	 * paths have irrevocably committed to the HTLC and retrying the payment in full would result
	 * in over-/re-payment.
	 * 
	 * The results here are ordered the same as the paths in the route object which was passed to
	 * send_payment, and any Errs which are not APIError::MonitorUpdateFailed can be safely
	 * retried (though there is currently no API with which to do so).
	 * 
	 * Any entries which contain Err(APIError::MonitorUpdateFailed) or Ok(()) MUST NOT be retried
	 * as they will result in over-/re-payment. These HTLCs all either successfully sent (in the
	 * case of Ok(())) or will send once channel_monitor_updated is called on the next-hop channel
	 * with the latest update_id.
	 */
	public final static class PartialFailure extends PaymentSendFailure {
		/**
		 * The errors themselves, in the same order as the route hops.
		*/
		public final Result_NoneAPIErrorZ[] results;
		/**
		 * If some paths failed without irrevocably committing to the new HTLC(s), this will
		 * contain a [`RouteParameters`] object which can be used to calculate a new route that
		 * will pay all remaining unpaid balance.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final RouteParameters failed_paths_retry;
		/**
		 * The payment id for the payment, which is now at least partially pending.
		*/
		public final byte[] payment_id;
		private PartialFailure(long ptr, bindings.LDKPaymentSendFailure.PartialFailure obj) {
			super(null, ptr);
			long[] results = obj.results;
			int results_conv_22_len = results.length;
			Result_NoneAPIErrorZ[] results_conv_22_arr = new Result_NoneAPIErrorZ[results_conv_22_len];
			for (int w = 0; w < results_conv_22_len; w++) {
				long results_conv_22 = results[w];
				Result_NoneAPIErrorZ results_conv_22_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(results_conv_22);
				results_conv_22_arr[w] = results_conv_22_hu_conv;
			}
			this.results = results_conv_22_arr;
			long failed_paths_retry = obj.failed_paths_retry;
			RouteParameters failed_paths_retry_hu_conv = null; if (failed_paths_retry < 0 || failed_paths_retry > 4096) { failed_paths_retry_hu_conv = new RouteParameters(null, failed_paths_retry); }
			failed_paths_retry_hu_conv.ptrs_to.add(this);
			this.failed_paths_retry = failed_paths_retry_hu_conv;
			this.payment_id = obj.payment_id;
		}
	}
	long clone_ptr() {
		long ret = bindings.PaymentSendFailure_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentSendFailure
	 */
	public PaymentSendFailure clone() {
		long ret = bindings.PaymentSendFailure_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParameterError-variant PaymentSendFailure
	 */
	public static PaymentSendFailure parameter_error(APIError a) {
		long ret = bindings.PaymentSendFailure_parameter_error(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PathParameterError-variant PaymentSendFailure
	 */
	public static PaymentSendFailure path_parameter_error(Result_NoneAPIErrorZ[] a) {
		long ret = bindings.PaymentSendFailure_path_parameter_error(a != null ? Arrays.stream(a).mapToLong(a_conv_22 -> a_conv_22 != null ? a_conv_22.ptr : 0).toArray() : null);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AllFailedRetrySafe-variant PaymentSendFailure
	 */
	public static PaymentSendFailure all_failed_retry_safe(APIError[] a) {
		long ret = bindings.PaymentSendFailure_all_failed_retry_safe(a != null ? Arrays.stream(a).mapToLong(a_conv_10 -> a_conv_10.ptr).toArray() : null);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PartialFailure-variant PaymentSendFailure
	 */
	public static PaymentSendFailure partial_failure(Result_NoneAPIErrorZ[] results, RouteParameters failed_paths_retry, byte[] payment_id) {
		long ret = bindings.PaymentSendFailure_partial_failure(results != null ? Arrays.stream(results).mapToLong(results_conv_22 -> results_conv_22 != null ? results_conv_22.ptr : 0).toArray() : null, failed_paths_retry == null ? 0 : failed_paths_retry.ptr & ~1, InternalUtils.check_arr_len(payment_id, 32));
		Reference.reachabilityFence(results);
		Reference.reachabilityFence(failed_paths_retry);
		Reference.reachabilityFence(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		PaymentSendFailure ret_hu_conv = PaymentSendFailure.constr_from_ptr(ret);
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		return ret_hu_conv;
	}

}
