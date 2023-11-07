using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * If a payment fails to send with [`ChannelManager::send_payment_with_route`], it can be in one
 * of several states. This enum is returned as the Err() type describing which state the payment
 * is in, see the description of individual enum states for more.
 * 
 * [`ChannelManager::send_payment_with_route`]: crate::ln::channelmanager::ChannelManager::send_payment_with_route
 */
public class PaymentSendFailure : CommonBase {
	protected PaymentSendFailure(object _dummy, long ptr) : base(ptr) { }
	~PaymentSendFailure() {
		if (ptr != 0) { bindings.PaymentSendFailure_free(ptr); }
	}

	internal static PaymentSendFailure constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKPaymentSendFailure_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PaymentSendFailure_ParameterError(ptr);
			case 1: return new PaymentSendFailure_PathParameterError(ptr);
			case 2: return new PaymentSendFailure_AllFailedResendSafe(ptr);
			case 3: return new PaymentSendFailure_DuplicatePayment(ptr);
			case 4: return new PaymentSendFailure_PartialFailure(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A PaymentSendFailure of type ParameterError */
	public class PaymentSendFailure_ParameterError : PaymentSendFailure {
		public APIError parameter_error;
		internal PaymentSendFailure_ParameterError(long ptr) : base(null, ptr) {
			long parameter_error = bindings.LDKPaymentSendFailure_ParameterError_get_parameter_error(ptr);
			org.ldk.structs.APIError parameter_error_hu_conv = org.ldk.structs.APIError.constr_from_ptr(parameter_error);
			if (parameter_error_hu_conv != null) { parameter_error_hu_conv.ptrs_to.AddLast(this); };
			this.parameter_error = parameter_error_hu_conv;
		}
	}
	/** A PaymentSendFailure of type PathParameterError */
	public class PaymentSendFailure_PathParameterError : PaymentSendFailure {
		public Result_NoneAPIErrorZ[] path_parameter_error;
		internal PaymentSendFailure_PathParameterError(long ptr) : base(null, ptr) {
			long path_parameter_error = bindings.LDKPaymentSendFailure_PathParameterError_get_path_parameter_error(ptr);
			int path_parameter_error_conv_22_len = InternalUtils.getArrayLength(path_parameter_error);
			Result_NoneAPIErrorZ[] path_parameter_error_conv_22_arr = new Result_NoneAPIErrorZ[path_parameter_error_conv_22_len];
			for (int w = 0; w < path_parameter_error_conv_22_len; w++) {
				long path_parameter_error_conv_22 = InternalUtils.getU64ArrayElem(path_parameter_error, w);
				Result_NoneAPIErrorZ path_parameter_error_conv_22_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(path_parameter_error_conv_22);
				path_parameter_error_conv_22_arr[w] = path_parameter_error_conv_22_hu_conv;
			}
			bindings.free_buffer(path_parameter_error);
			this.path_parameter_error = path_parameter_error_conv_22_arr;
		}
	}
	/** A PaymentSendFailure of type AllFailedResendSafe */
	public class PaymentSendFailure_AllFailedResendSafe : PaymentSendFailure {
		public APIError[] all_failed_resend_safe;
		internal PaymentSendFailure_AllFailedResendSafe(long ptr) : base(null, ptr) {
			long all_failed_resend_safe = bindings.LDKPaymentSendFailure_AllFailedResendSafe_get_all_failed_resend_safe(ptr);
			int all_failed_resend_safe_conv_10_len = InternalUtils.getArrayLength(all_failed_resend_safe);
			APIError[] all_failed_resend_safe_conv_10_arr = new APIError[all_failed_resend_safe_conv_10_len];
			for (int k = 0; k < all_failed_resend_safe_conv_10_len; k++) {
				long all_failed_resend_safe_conv_10 = InternalUtils.getU64ArrayElem(all_failed_resend_safe, k);
				org.ldk.structs.APIError all_failed_resend_safe_conv_10_hu_conv = org.ldk.structs.APIError.constr_from_ptr(all_failed_resend_safe_conv_10);
				if (all_failed_resend_safe_conv_10_hu_conv != null) { all_failed_resend_safe_conv_10_hu_conv.ptrs_to.AddLast(this); };
				all_failed_resend_safe_conv_10_arr[k] = all_failed_resend_safe_conv_10_hu_conv;
			}
			bindings.free_buffer(all_failed_resend_safe);
			this.all_failed_resend_safe = all_failed_resend_safe_conv_10_arr;
		}
	}
	/** A PaymentSendFailure of type DuplicatePayment */
	public class PaymentSendFailure_DuplicatePayment : PaymentSendFailure {
		internal PaymentSendFailure_DuplicatePayment(long ptr) : base(null, ptr) {
		}
	}
	/** A PaymentSendFailure of type PartialFailure */
	public class PaymentSendFailure_PartialFailure : PaymentSendFailure {
		/**
		 * The errors themselves, in the same order as the paths from the route.
		 */
		public Result_NoneAPIErrorZ[] results;
		/**
		 * If some paths failed without irrevocably committing to the new HTLC(s), this will
		 * contain a [`RouteParameters`] object for the failing paths.
		 * 
		 * Note that this (or a relevant inner pointer) may be NULL or all-0s to represent None
		 */
		public RouteParameters failed_paths_retry;
		/**
		 * The payment id for the payment, which is now at least partially pending.
		 */
		public byte[] payment_id;
		internal PaymentSendFailure_PartialFailure(long ptr) : base(null, ptr) {
			long results = bindings.LDKPaymentSendFailure_PartialFailure_get_results(ptr);
			int results_conv_22_len = InternalUtils.getArrayLength(results);
			Result_NoneAPIErrorZ[] results_conv_22_arr = new Result_NoneAPIErrorZ[results_conv_22_len];
			for (int w = 0; w < results_conv_22_len; w++) {
				long results_conv_22 = InternalUtils.getU64ArrayElem(results, w);
				Result_NoneAPIErrorZ results_conv_22_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(results_conv_22);
				results_conv_22_arr[w] = results_conv_22_hu_conv;
			}
			bindings.free_buffer(results);
			this.results = results_conv_22_arr;
			long failed_paths_retry = bindings.LDKPaymentSendFailure_PartialFailure_get_failed_paths_retry(ptr);
			org.ldk.structs.RouteParameters failed_paths_retry_hu_conv = null; if (failed_paths_retry < 0 || failed_paths_retry > 4096) { failed_paths_retry_hu_conv = new org.ldk.structs.RouteParameters(null, failed_paths_retry); }
			if (failed_paths_retry_hu_conv != null) { failed_paths_retry_hu_conv.ptrs_to.AddLast(this); };
			this.failed_paths_retry = failed_paths_retry_hu_conv;
			long payment_id = bindings.LDKPaymentSendFailure_PartialFailure_get_payment_id(ptr);
			byte[] payment_id_conv = InternalUtils.decodeUint8Array(payment_id);
			this.payment_id = payment_id_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.PaymentSendFailure_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentSendFailure
	 */
	public PaymentSendFailure clone() {
		long ret = bindings.PaymentSendFailure_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ParameterError-variant PaymentSendFailure
	 */
	public static PaymentSendFailure parameter_error(org.ldk.structs.APIError a) {
		long ret = bindings.PaymentSendFailure_parameter_error(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PathParameterError-variant PaymentSendFailure
	 */
	public static PaymentSendFailure path_parameter_error(Result_NoneAPIErrorZ[] a) {
		long ret = bindings.PaymentSendFailure_path_parameter_error(InternalUtils.encodeUint64Array(InternalUtils.mapArray(a, a_conv_22 => a_conv_22 != null ? a_conv_22.ptr : 0)));
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new AllFailedResendSafe-variant PaymentSendFailure
	 */
	public static PaymentSendFailure all_failed_resend_safe(APIError[] a) {
		long ret = bindings.PaymentSendFailure_all_failed_resend_safe(InternalUtils.encodeUint64Array(InternalUtils.mapArray(a, a_conv_10 => a_conv_10.ptr)));
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		foreach (APIError a_conv_10 in a) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(a_conv_10); }; };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new DuplicatePayment-variant PaymentSendFailure
	 */
	public static PaymentSendFailure duplicate_payment() {
		long ret = bindings.PaymentSendFailure_duplicate_payment();
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new PartialFailure-variant PaymentSendFailure
	 */
	public static PaymentSendFailure partial_failure(Result_NoneAPIErrorZ[] results, org.ldk.structs.RouteParameters failed_paths_retry, byte[] payment_id) {
		long ret = bindings.PaymentSendFailure_partial_failure(InternalUtils.encodeUint64Array(InternalUtils.mapArray(results, results_conv_22 => results_conv_22 != null ? results_conv_22.ptr : 0)), failed_paths_retry == null ? 0 : failed_paths_retry.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_id, 32)));
		GC.KeepAlive(results);
		GC.KeepAlive(failed_paths_retry);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PaymentSendFailure ret_hu_conv = org.ldk.structs.PaymentSendFailure.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(failed_paths_retry); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaymentSendFailures contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public bool eq(org.ldk.structs.PaymentSendFailure b) {
		bool ret = bindings.PaymentSendFailure_eq(this.ptr, b == null ? 0 : b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is PaymentSendFailure)) return false;
		return this.eq((PaymentSendFailure)o);
	}
}
} } }
