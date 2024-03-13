package org.ldk.enums;

/**
 * The reason the payment failed. Used in [`Event::PaymentFailed`].
 */
public enum PaymentFailureReason {
	/**
	 * The intended recipient rejected our payment.
	 */
	LDKPaymentFailureReason_RecipientRejected,
	/**
	 * The user chose to abandon this payment by calling [`ChannelManager::abandon_payment`].
	 * 
	 * [`ChannelManager::abandon_payment`]: crate::ln::channelmanager::ChannelManager::abandon_payment
	 */
	LDKPaymentFailureReason_UserAbandoned,
	/**
	 * We exhausted all of our retry attempts while trying to send the payment, or we
	 * exhausted the [`Retry::Timeout`] if the user set one. If at any point a retry
	 * attempt failed while being forwarded along the path, an [`Event::PaymentPathFailed`] will
	 * have come before this.
	 * 
	 * [`Retry::Timeout`]: crate::ln::channelmanager::Retry::Timeout
	 */
	LDKPaymentFailureReason_RetriesExhausted,
	/**
	 * The payment expired while retrying, based on the provided
	 * [`PaymentParameters::expiry_time`].
	 * 
	 * [`PaymentParameters::expiry_time`]: crate::routing::router::PaymentParameters::expiry_time
	 */
	LDKPaymentFailureReason_PaymentExpired,
	/**
	 * We failed to find a route while retrying the payment.
	 */
	LDKPaymentFailureReason_RouteNotFound,
	/**
	 * This error should generally never happen. This likely means that there is a problem with
	 * your router.
	 */
	LDKPaymentFailureReason_UnexpectedError,
	; static native void init();
	static { org.ldk.impl.bindings.run_statics(); init(); }
}