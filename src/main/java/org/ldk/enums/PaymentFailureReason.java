package org.ldk.enums;

/**
 * The reason the payment failed. Used in [`Event::PaymentFailed`].
 */
public enum PaymentFailureReason {
	/**
	 * The intended recipient rejected our payment.
	 * 
	 * Also used for [`UnknownRequiredFeatures`] and [`InvoiceRequestRejected`] when downgrading to
	 * version prior to 0.0.124.
	 * 
	 * [`UnknownRequiredFeatures`]: Self::UnknownRequiredFeatures
	 * [`InvoiceRequestRejected`]: Self::InvoiceRequestRejected
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
	 * exhausted the [`Retry::Timeout`] if the user set one.
	 * If at any point a retry attempt failed while being forwarded along the path, an [`Event::PaymentPathFailed`] will
	 * have come before this.
	 * 
	 * [`Retry::Timeout`]: crate::ln::channelmanager::Retry::Timeout
	 */
	LDKPaymentFailureReason_RetriesExhausted,
	/**
	 * Either the BOLT 12 invoice was expired by the time we received it or the payment expired while
	 * retrying based on the provided [`PaymentParameters::expiry_time`].
	 * 
	 * Also used for [`InvoiceRequestExpired`] when downgrading to version prior to 0.0.124.
	 * 
	 * [`PaymentParameters::expiry_time`]: crate::routing::router::PaymentParameters::expiry_time
	 * [`InvoiceRequestExpired`]: Self::InvoiceRequestExpired
	 */
	LDKPaymentFailureReason_PaymentExpired,
	/**
	 * We failed to find a route while sending or retrying the payment.
	 * 
	 * Note that this generally indicates that we've exhausted the available set of possible
	 * routes - we tried the payment over a few routes but were not able to find any further
	 * candidate routes beyond those.
	 * 
	 * Also used for [`BlindedPathCreationFailed`] when downgrading to versions prior to 0.0.124.
	 * 
	 * [`BlindedPathCreationFailed`]: Self::BlindedPathCreationFailed
	 */
	LDKPaymentFailureReason_RouteNotFound,
	/**
	 * This error should generally never happen. This likely means that there is a problem with
	 * your router.
	 */
	LDKPaymentFailureReason_UnexpectedError,
	/**
	 * An invoice was received that required unknown features.
	 */
	LDKPaymentFailureReason_UnknownRequiredFeatures,
	/**
	 * A [`Bolt12Invoice`] was not received in a reasonable amount of time.
	 */
	LDKPaymentFailureReason_InvoiceRequestExpired,
	/**
	 * An [`InvoiceRequest`] for the payment was rejected by the recipient.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	LDKPaymentFailureReason_InvoiceRequestRejected,
	/**
	 * Failed to create a blinded path back to ourselves.
	 * We attempted to initiate payment to a static invoice but failed to create a reply path for our
	 * [`HeldHtlcAvailable`] message.
	 * 
	 * [`HeldHtlcAvailable`]: crate::onion_message::async_payments::HeldHtlcAvailable
	 */
	LDKPaymentFailureReason_BlindedPathCreationFailed,
	; static native void init();
	static { org.ldk.impl.bindings.run_statics(); init(); }
}