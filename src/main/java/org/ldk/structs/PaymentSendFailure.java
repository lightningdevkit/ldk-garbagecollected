package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * If a payment fails to send with [`ChannelManager::send_payment`], it can be in one of several
 * states. This enum is returned as the Err() type describing which state the payment is in, see
 * the description of individual enum states for more.
 * 
 * [`ChannelManager::send_payment`]: crate::ln::channelmanager::ChannelManager::send_payment
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
		if (raw_val.getClass() == bindings.LDKPaymentSendFailure.AllFailedResendSafe.class) {
			return new AllFailedResendSafe(ptr, (bindings.LDKPaymentSendFailure.AllFailedResendSafe)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentSendFailure.DuplicatePayment.class) {
			return new DuplicatePayment(ptr, (bindings.LDKPaymentSendFailure.DuplicatePayment)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKPaymentSendFailure.PartialFailure.class) {
			return new PartialFailure(ptr, (bindings.LDKPaymentSendFailure.PartialFailure)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * A parameter which was passed to send_payment was invalid, preventing us from attempting to
	 * send the payment at all.
	 * 
	 * You can freely resend the payment in full (with the parameter error fixed).
	 * 
	 * Because the payment failed outright, no payment tracking is done and no
	 * [`Event::PaymentPathFailed`] or [`Event::PaymentFailed`] events will be generated.
	 * 
	 * [`Event::PaymentPathFailed`]: crate::util::events::Event::PaymentPathFailed
	 * [`Event::PaymentFailed`]: crate::util::events::Event::PaymentFailed
	 */
	public final static class ParameterError extends PaymentSendFailure {
		public final org.ldk.structs.APIError parameter_error;
		private ParameterError(long ptr, bindings.LDKPaymentSendFailure.ParameterError obj) {
			super(null, ptr);
			long parameter_error = obj.parameter_error;
			org.ldk.structs.APIError parameter_error_hu_conv = org.ldk.structs.APIError.constr_from_ptr(parameter_error);
			if (parameter_error_hu_conv != null) { parameter_error_hu_conv.ptrs_to.add(this); };
			this.parameter_error = parameter_error_hu_conv;
		}
	}
	/**
	 * A parameter in a single path which was passed to send_payment was invalid, preventing us
	 * from attempting to send the payment at all.
	 * 
	 * You can freely resend the payment in full (with the parameter error fixed).
	 * 
	 * Because the payment failed outright, no payment tracking is done and no
	 * [`Event::PaymentPathFailed`] or [`Event::PaymentFailed`] events will be generated.
	 * 
	 * The results here are ordered the same as the paths in the route object which was passed to
	 * send_payment.
	 * 
	 * [`Event::PaymentPathFailed`]: crate::util::events::Event::PaymentPathFailed
	 * [`Event::PaymentFailed`]: crate::util::events::Event::PaymentFailed
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
	 * You can freely resend the payment in full (though you probably want to do so over different
	 * paths than the ones selected).
	 * 
	 * Because the payment failed outright, no payment tracking is done and no
	 * [`Event::PaymentPathFailed`] or [`Event::PaymentFailed`] events will be generated.
	 * 
	 * [`Event::PaymentPathFailed`]: crate::util::events::Event::PaymentPathFailed
	 * [`Event::PaymentFailed`]: crate::util::events::Event::PaymentFailed
	 */
	public final static class AllFailedResendSafe extends PaymentSendFailure {
		public final APIError[] all_failed_resend_safe;
		private AllFailedResendSafe(long ptr, bindings.LDKPaymentSendFailure.AllFailedResendSafe obj) {
			super(null, ptr);
			long[] all_failed_resend_safe = obj.all_failed_resend_safe;
			int all_failed_resend_safe_conv_10_len = all_failed_resend_safe.length;
			APIError[] all_failed_resend_safe_conv_10_arr = new APIError[all_failed_resend_safe_conv_10_len];
			for (int k = 0; k < all_failed_resend_safe_conv_10_len; k++) {
				long all_failed_resend_safe_conv_10 = all_failed_resend_safe[k];
				org.ldk.structs.APIError all_failed_resend_safe_conv_10_hu_conv = org.ldk.structs.APIError.constr_from_ptr(all_failed_resend_safe_conv_10);
				if (all_failed_resend_safe_conv_10_hu_conv != null) { all_failed_resend_safe_conv_10_hu_conv.ptrs_to.add(this); };
				all_failed_resend_safe_conv_10_arr[k] = all_failed_resend_safe_conv_10_hu_conv;
			}
			this.all_failed_resend_safe = all_failed_resend_safe_conv_10_arr;
		}
	}
	/**
	 * Indicates that a payment for the provided [`PaymentId`] is already in-flight and has not
	 * yet completed (i.e. generated an [`Event::PaymentSent`] or [`Event::PaymentFailed`]).
	 * 
	 * [`PaymentId`]: crate::ln::channelmanager::PaymentId
	 * [`Event::PaymentSent`]: crate::util::events::Event::PaymentSent
	 * [`Event::PaymentFailed`]: crate::util::events::Event::PaymentFailed
	 */
	public final static class DuplicatePayment extends PaymentSendFailure {
		private DuplicatePayment(long ptr, bindings.LDKPaymentSendFailure.DuplicatePayment obj) {
			super(null, ptr);
		}
	}
	/**
	 * Some paths that were attempted failed to send, though some paths may have succeeded. At least
	 * some paths have irrevocably committed to the HTLC.
	 * 
	 * The results here are ordered the same as the paths in the route object that was passed to
	 * send_payment.
	 * 
	 * Any entries that contain `Err(APIError::MonitorUpdateInprogress)` will send once a
	 * [`MonitorEvent::Completed`] is provided for the next-hop channel with the latest update_id.
	 * 
	 * [`MonitorEvent::Completed`]: crate::chain::channelmonitor::MonitorEvent::Completed
	 */
	public final static class PartialFailure extends PaymentSendFailure {
		/**
		 * The errors themselves, in the same order as the paths from the route.
		*/
		public final Result_NoneAPIErrorZ[] results;
		/**
		 * If some paths failed without irrevocably committing to the new HTLC(s), this will
		 * contain a [`RouteParameters`] object for the failing paths.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		*/
		@Nullable public final org.ldk.structs.RouteParameters failed_paths_retry;
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
			org.ldk.structs.RouteParameters failed_paths_retry_hu_conv = null; if (failed_paths_retry < 0 || failed_paths_retry > 4096) { failed_paths_retry_hu_conv = new org.ldk.structs.RouteParameters(null, failed_paths_retry); }
			if (failed_paths_retry_hu_conv != null) { failed_paths_retry_hu_conv.ptrs_to.add(this); };
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
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParameterError-variant PaymentSendFailure
	 */
	public static PaymentSendFailure parameter_error(org.ldk.structs.APIError a) {
		long ret = bindings.PaymentSendFailure_parameter_error(a.ptr);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PathParameterError-variant PaymentSendFailure
	 */
	public static PaymentSendFailure path_parameter_error(Result_NoneAPIErrorZ[] a) {
		long ret = bindings.PaymentSendFailure_path_parameter_error(a != null ? Arrays.stream(a).mapToLong(a_conv_22 -> a_conv_22 != null ? a_conv_22.ptr : 0).toArray() : null);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AllFailedResendSafe-variant PaymentSendFailure
	 */
	public static PaymentSendFailure all_failed_resend_safe(APIError[] a) {
		long ret = bindings.PaymentSendFailure_all_failed_resend_safe(a != null ? Arrays.stream(a).mapToLong(a_conv_10 -> a_conv_10.ptr).toArray() : null);
		Reference.reachabilityFence(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		for (APIError a_conv_10: a) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(a_conv_10); }; };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DuplicatePayment-variant PaymentSendFailure
	 */
	public static PaymentSendFailure duplicate_payment() {
		long ret = bindings.PaymentSendFailure_duplicate_payment();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PartialFailure-variant PaymentSendFailure
	 */
	public static PaymentSendFailure partial_failure(Result_NoneAPIErrorZ[] results, org.ldk.structs.RouteParameters failed_paths_retry, byte[] payment_id) {
		long ret = bindings.PaymentSendFailure_partial_failure(results != null ? Arrays.stream(results).mapToLong(results_conv_22 -> results_conv_22 != null ? results_conv_22.ptr : 0).toArray() : null, failed_paths_retry == null ? 0 : failed_paths_retry.ptr, InternalUtils.check_arr_len(payment_id, 32));
		Reference.reachabilityFence(results);
		Reference.reachabilityFence(failed_paths_retry);
		Reference.reachabilityFence(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(failed_paths_retry); };
		return ret_hu_conv;
	}

}
