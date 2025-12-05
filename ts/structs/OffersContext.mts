
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Contains data specific to an [`OffersMessage`].
 * 
 * [`OffersMessage`]: crate::onion_message::offers::OffersMessage
 */
export class OffersContext extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.OffersContext_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): OffersContext {
		const raw_ty: number = bindings.LDKOffersContext_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new OffersContext_InvoiceRequest(ptr);
			case 1: return new OffersContext_StaticInvoiceRequested(ptr);
			case 2: return new OffersContext_OutboundPayment(ptr);
			case 3: return new OffersContext_InboundPayment(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OffersContext_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OffersContext
	 */
	public clone(): OffersContext {
		const ret: bigint = bindings.OffersContext_clone(this.ptr);
		const ret_hu_conv: OffersContext = OffersContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InvoiceRequest-variant OffersContext
	 */
	public static constructor_invoice_request(nonce: Nonce): OffersContext {
		const ret: bigint = bindings.OffersContext_invoice_request(CommonBase.get_ptr_of(nonce));
		const ret_hu_conv: OffersContext = OffersContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoiceRequested-variant OffersContext
	 */
	public static constructor_static_invoice_requested(recipient_id: Uint8Array, invoice_slot: number, path_absolute_expiry: bigint): OffersContext {
		const ret: bigint = bindings.OffersContext_static_invoice_requested(bindings.encodeUint8Array(recipient_id), invoice_slot, path_absolute_expiry);
		const ret_hu_conv: OffersContext = OffersContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutboundPayment-variant OffersContext
	 */
	public static constructor_outbound_payment(payment_id: Uint8Array, nonce: Nonce): OffersContext {
		const ret: bigint = bindings.OffersContext_outbound_payment(bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(nonce));
		const ret_hu_conv: OffersContext = OffersContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InboundPayment-variant OffersContext
	 */
	public static constructor_inbound_payment(payment_hash: Uint8Array): OffersContext {
		const ret: bigint = bindings.OffersContext_inbound_payment(bindings.encodeUint8Array(payment_hash));
		const ret_hu_conv: OffersContext = OffersContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Checks if two OffersContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 */
	public eq(b: OffersContext): boolean {
		const ret: boolean = bindings.OffersContext_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Serialize the OffersContext object into a byte array which can be read by OffersContext_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.OffersContext_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OffersContext from a byte array, created by OffersContext_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OffersContextDecodeErrorZ {
		const ret: bigint = bindings.OffersContext_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OffersContextDecodeErrorZ = Result_OffersContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A OffersContext of type InvoiceRequest */
export class OffersContext_InvoiceRequest extends OffersContext {
	/**
	 * A nonce used for authenticating that an [`InvoiceRequest`] is for a valid [`Offer`] and
	 * for deriving the offer's signing keys.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public nonce: Nonce;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const nonce: bigint = bindings.LDKOffersContext_InvoiceRequest_get_nonce(ptr);
		const nonce_hu_conv: Nonce = new Nonce(null, nonce);
			CommonBase.add_ref_from(nonce_hu_conv, this);
		this.nonce = nonce_hu_conv;
	}
}
/** A OffersContext of type StaticInvoiceRequested */
export class OffersContext_StaticInvoiceRequested extends OffersContext {
	/**
	 * An identifier for the async recipient for whom we as a static invoice server are serving
	 * [`StaticInvoice`]s. Used paired with the
	 * [`OffersContext::StaticInvoiceRequested::invoice_slot`] when looking up a corresponding
	 * [`StaticInvoice`] to return to the payer if the recipient is offline. This id was previously
	 * provided via [`AsyncPaymentsContext::ServeStaticInvoice::recipient_id`].
	 * 
	 * Also useful for rate limiting the number of [`InvoiceRequest`]s we will respond to on
	 * recipient's behalf.
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public recipient_id: Uint8Array;
	/**
	 * The slot number for a specific [`StaticInvoice`] that the recipient previously
	 * requested be served on their behalf. Useful when paired with the
	 * [`OffersContext::StaticInvoiceRequested::recipient_id`] to pull that specific invoice from
	 * the database when payers send an [`InvoiceRequest`]. This id was previously
	 * provided via [`AsyncPaymentsContext::ServeStaticInvoice::invoice_slot`].
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public invoice_slot: number;
	/**
	 * The time as duration since the Unix epoch at which this path expires and messages sent over
	 * it should be ignored.
	 * 
	 * Useful to timeout async recipients that are no longer supported as clients.
	 */
	public path_absolute_expiry: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const recipient_id: number = bindings.LDKOffersContext_StaticInvoiceRequested_get_recipient_id(ptr);
		const recipient_id_conv: Uint8Array = bindings.decodeUint8Array(recipient_id);
		this.recipient_id = recipient_id_conv;
		this.invoice_slot = bindings.LDKOffersContext_StaticInvoiceRequested_get_invoice_slot(ptr);
		this.path_absolute_expiry = bindings.LDKOffersContext_StaticInvoiceRequested_get_path_absolute_expiry(ptr);
	}
}
/** A OffersContext of type OutboundPayment */
export class OffersContext_OutboundPayment extends OffersContext {
	/**
	 * Payment ID used when creating a [`Refund`] or [`InvoiceRequest`].
	 * 
	 * [`Refund`]: crate::offers::refund::Refund
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public payment_id: Uint8Array;
	/**
	 * A nonce used for authenticating that a [`Bolt12Invoice`] is for a valid [`Refund`] or
	 * [`InvoiceRequest`] and for deriving their signing keys.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * [`Refund`]: crate::offers::refund::Refund
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public nonce: Nonce;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKOffersContext_OutboundPayment_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
		const nonce: bigint = bindings.LDKOffersContext_OutboundPayment_get_nonce(ptr);
		const nonce_hu_conv: Nonce = new Nonce(null, nonce);
			CommonBase.add_ref_from(nonce_hu_conv, this);
		this.nonce = nonce_hu_conv;
	}
}
/** A OffersContext of type InboundPayment */
export class OffersContext_InboundPayment extends OffersContext {
	/**
	 * The same payment hash as [`Bolt12Invoice::payment_hash`].
	 * 
	 * [`Bolt12Invoice::payment_hash`]: crate::offers::invoice::Bolt12Invoice::payment_hash
	 */
	public payment_hash: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_hash: number = bindings.LDKOffersContext_InboundPayment_get_payment_hash(ptr);
		const payment_hash_conv: Uint8Array = bindings.decodeUint8Array(payment_hash);
		this.payment_hash = payment_hash_conv;
	}
}
