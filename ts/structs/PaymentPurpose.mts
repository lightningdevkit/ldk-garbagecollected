
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Some information provided on receipt of payment depends on whether the payment received is a
 * spontaneous payment or a \"conventional\" lightning payment that's paying an invoice.
 */
export class PaymentPurpose extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.PaymentPurpose_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): PaymentPurpose {
		const raw_ty: number = bindings.LDKPaymentPurpose_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new PaymentPurpose_Bolt11InvoicePayment(ptr);
			case 1: return new PaymentPurpose_Bolt12OfferPayment(ptr);
			case 2: return new PaymentPurpose_Bolt12RefundPayment(ptr);
			case 3: return new PaymentPurpose_SpontaneousPayment(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.PaymentPurpose_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the PaymentPurpose
	 */
	public clone(): PaymentPurpose {
		const ret: bigint = bindings.PaymentPurpose_clone(this.ptr);
		const ret_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt11InvoicePayment-variant PaymentPurpose
	 */
	public static constructor_bolt11_invoice_payment(payment_preimage: Option_ThirtyTwoBytesZ, payment_secret: Uint8Array): PaymentPurpose {
		const ret: bigint = bindings.PaymentPurpose_bolt11_invoice_payment(CommonBase.get_ptr_of(payment_preimage), bindings.encodeUint8Array(payment_secret));
		const ret_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12OfferPayment-variant PaymentPurpose
	 */
	public static constructor_bolt12_offer_payment(payment_preimage: Option_ThirtyTwoBytesZ, payment_secret: Uint8Array, payment_context: Bolt12OfferContext): PaymentPurpose {
		const ret: bigint = bindings.PaymentPurpose_bolt12_offer_payment(CommonBase.get_ptr_of(payment_preimage), bindings.encodeUint8Array(payment_secret), CommonBase.get_ptr_of(payment_context));
		const ret_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new Bolt12RefundPayment-variant PaymentPurpose
	 */
	public static constructor_bolt12_refund_payment(payment_preimage: Option_ThirtyTwoBytesZ, payment_secret: Uint8Array, payment_context: Bolt12RefundContext): PaymentPurpose {
		const ret: bigint = bindings.PaymentPurpose_bolt12_refund_payment(CommonBase.get_ptr_of(payment_preimage), bindings.encodeUint8Array(payment_secret), CommonBase.get_ptr_of(payment_context));
		const ret_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new SpontaneousPayment-variant PaymentPurpose
	 */
	public static constructor_spontaneous_payment(a: Uint8Array): PaymentPurpose {
		const ret: bigint = bindings.PaymentPurpose_spontaneous_payment(bindings.encodeUint8Array(a));
		const ret_hu_conv: PaymentPurpose = PaymentPurpose.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two PaymentPurposes contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: PaymentPurpose): boolean {
		const ret: boolean = bindings.PaymentPurpose_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Returns the preimage for this payment, if it is known.
	 */
	public preimage(): Option_ThirtyTwoBytesZ {
		const ret: bigint = bindings.PaymentPurpose_preimage(this.ptr);
		const ret_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the PaymentPurpose object into a byte array which can be read by PaymentPurpose_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.PaymentPurpose_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a PaymentPurpose from a byte array, created by PaymentPurpose_write
	 */
	public static constructor_read(ser: Uint8Array): Result_PaymentPurposeDecodeErrorZ {
		const ret: bigint = bindings.PaymentPurpose_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_PaymentPurposeDecodeErrorZ = Result_PaymentPurposeDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A PaymentPurpose of type Bolt11InvoicePayment */
export class PaymentPurpose_Bolt11InvoicePayment extends PaymentPurpose {
	/**
	 * The preimage to the payment_hash, if the payment hash (and secret) were fetched via
	 * [`ChannelManager::create_inbound_payment`]. When handling [`Event::PaymentClaimable`],
	 * this can be passed directly to [`ChannelManager::claim_funds`] to claim the payment. No
	 * action is needed when seen in [`Event::PaymentClaimed`].
	 * 
	 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
	 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
	 */
	public payment_preimage: Option_ThirtyTwoBytesZ;
	/**
	 * The \"payment secret\". This authenticates the sender to the recipient, preventing a
	 * number of deanonymization attacks during the routing process.
	 * It is provided here for your reference, however its accuracy is enforced directly by
	 * [`ChannelManager`] using the values you previously provided to
	 * [`ChannelManager::create_inbound_payment`] or
	 * [`ChannelManager::create_inbound_payment_for_hash`].
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::create_inbound_payment`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment
	 * [`ChannelManager::create_inbound_payment_for_hash`]: crate::ln::channelmanager::ChannelManager::create_inbound_payment_for_hash
	 */
	public payment_secret: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_preimage: bigint = bindings.LDKPaymentPurpose_Bolt11InvoicePayment_get_payment_preimage(ptr);
		const payment_preimage_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_preimage);
			CommonBase.add_ref_from(payment_preimage_hu_conv, this);
		this.payment_preimage = payment_preimage_hu_conv;
		const payment_secret: number = bindings.LDKPaymentPurpose_Bolt11InvoicePayment_get_payment_secret(ptr);
		const payment_secret_conv: Uint8Array = bindings.decodeUint8Array(payment_secret);
		this.payment_secret = payment_secret_conv;
	}
}
/** A PaymentPurpose of type Bolt12OfferPayment */
export class PaymentPurpose_Bolt12OfferPayment extends PaymentPurpose {
	/**
	 * The preimage to the payment hash. When handling [`Event::PaymentClaimable`], this can be
	 * passed directly to [`ChannelManager::claim_funds`], if provided. No action is needed
	 * when seen in [`Event::PaymentClaimed`].
	 * 
	 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
	 */
	public payment_preimage: Option_ThirtyTwoBytesZ;
	/**
	 * The secret used to authenticate the sender to the recipient, preventing a number of
	 * de-anonymization attacks while routing a payment.
	 * 
	 * See [`PaymentPurpose::Bolt11InvoicePayment::payment_secret`] for further details.
	 */
	public payment_secret: Uint8Array;
	/**
	 * The context of the payment such as information about the corresponding [`Offer`] and
	 * [`InvoiceRequest`].
	 * 
	 * This includes the Human Readable Name which the sender indicated they were paying to,
	 * for possible recipient disambiguation if you're using a single wildcard DNS entry to
	 * resolve to many recipients.
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public payment_context: Bolt12OfferContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_preimage: bigint = bindings.LDKPaymentPurpose_Bolt12OfferPayment_get_payment_preimage(ptr);
		const payment_preimage_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_preimage);
			CommonBase.add_ref_from(payment_preimage_hu_conv, this);
		this.payment_preimage = payment_preimage_hu_conv;
		const payment_secret: number = bindings.LDKPaymentPurpose_Bolt12OfferPayment_get_payment_secret(ptr);
		const payment_secret_conv: Uint8Array = bindings.decodeUint8Array(payment_secret);
		this.payment_secret = payment_secret_conv;
		const payment_context: bigint = bindings.LDKPaymentPurpose_Bolt12OfferPayment_get_payment_context(ptr);
		const payment_context_hu_conv: Bolt12OfferContext = new Bolt12OfferContext(null, payment_context);
			CommonBase.add_ref_from(payment_context_hu_conv, this);
		this.payment_context = payment_context_hu_conv;
	}
}
/** A PaymentPurpose of type Bolt12RefundPayment */
export class PaymentPurpose_Bolt12RefundPayment extends PaymentPurpose {
	/**
	 * The preimage to the payment hash. When handling [`Event::PaymentClaimable`], this can be
	 * passed directly to [`ChannelManager::claim_funds`], if provided. No action is needed
	 * when seen in [`Event::PaymentClaimed`].
	 * 
	 * [`ChannelManager::claim_funds`]: crate::ln::channelmanager::ChannelManager::claim_funds
	 */
	public payment_preimage: Option_ThirtyTwoBytesZ;
	/**
	 * The secret used to authenticate the sender to the recipient, preventing a number of
	 * de-anonymization attacks while routing a payment.
	 * 
	 * See [`PaymentPurpose::Bolt11InvoicePayment::payment_secret`] for further details.
	 */
	public payment_secret: Uint8Array;
	/**
	 * The context of the payment such as information about the corresponding [`Refund`].
	 * 
	 * [`Refund`]: crate::offers::refund::Refund
	 */
	public payment_context: Bolt12RefundContext;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_preimage: bigint = bindings.LDKPaymentPurpose_Bolt12RefundPayment_get_payment_preimage(ptr);
		const payment_preimage_hu_conv: Option_ThirtyTwoBytesZ = Option_ThirtyTwoBytesZ.constr_from_ptr(payment_preimage);
			CommonBase.add_ref_from(payment_preimage_hu_conv, this);
		this.payment_preimage = payment_preimage_hu_conv;
		const payment_secret: number = bindings.LDKPaymentPurpose_Bolt12RefundPayment_get_payment_secret(ptr);
		const payment_secret_conv: Uint8Array = bindings.decodeUint8Array(payment_secret);
		this.payment_secret = payment_secret_conv;
		const payment_context: bigint = bindings.LDKPaymentPurpose_Bolt12RefundPayment_get_payment_context(ptr);
		const payment_context_hu_conv: Bolt12RefundContext = new Bolt12RefundContext(null, payment_context);
			CommonBase.add_ref_from(payment_context_hu_conv, this);
		this.payment_context = payment_context_hu_conv;
	}
}
/** A PaymentPurpose of type SpontaneousPayment */
export class PaymentPurpose_SpontaneousPayment extends PaymentPurpose {
	public spontaneous_payment: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const spontaneous_payment: number = bindings.LDKPaymentPurpose_SpontaneousPayment_get_spontaneous_payment(ptr);
		const spontaneous_payment_conv: Uint8Array = bindings.decodeUint8Array(spontaneous_payment);
		this.spontaneous_payment = spontaneous_payment_conv;
	}
}
