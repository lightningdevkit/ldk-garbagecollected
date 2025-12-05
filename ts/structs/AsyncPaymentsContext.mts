
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'

/**
 * Contains data specific to an [`AsyncPaymentsMessage`].
 * 
 * [`AsyncPaymentsMessage`]: crate::onion_message::async_payments::AsyncPaymentsMessage
 */
export class AsyncPaymentsContext extends CommonBase {
	protected constructor(_dummy: null, ptr: bigint) { super(ptr, bindings.AsyncPaymentsContext_free); }
	/* @internal */
	public static constr_from_ptr(ptr: bigint): AsyncPaymentsContext {
		const raw_ty: number = bindings.LDKAsyncPaymentsContext_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new AsyncPaymentsContext_OfferPathsRequest(ptr);
			case 1: return new AsyncPaymentsContext_OfferPaths(ptr);
			case 2: return new AsyncPaymentsContext_ServeStaticInvoice(ptr);
			case 3: return new AsyncPaymentsContext_StaticInvoicePersisted(ptr);
			case 4: return new AsyncPaymentsContext_OutboundPayment(ptr);
			case 5: return new AsyncPaymentsContext_InboundPayment(ptr);
			case 6: return new AsyncPaymentsContext_ReleaseHeldHtlc(ptr);
			default:
				throw new Error('oops, this should be unreachable'); // Unreachable without extending the (internal) bindings interface
		}
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.AsyncPaymentsContext_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the AsyncPaymentsContext
	 */
	public clone(): AsyncPaymentsContext {
		const ret: bigint = bindings.AsyncPaymentsContext_clone(this.ptr);
		const ret_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPathsRequest-variant AsyncPaymentsContext
	 */
	public static constructor_offer_paths_request(recipient_id: Uint8Array, path_absolute_expiry: Option_u64Z): AsyncPaymentsContext {
		const ret: bigint = bindings.AsyncPaymentsContext_offer_paths_request(bindings.encodeUint8Array(recipient_id), CommonBase.get_ptr_of(path_absolute_expiry));
		const ret_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPaths-variant AsyncPaymentsContext
	 */
	public static constructor_offer_paths(invoice_slot: number, path_absolute_expiry: bigint): AsyncPaymentsContext {
		const ret: bigint = bindings.AsyncPaymentsContext_offer_paths(invoice_slot, path_absolute_expiry);
		const ret_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ServeStaticInvoice-variant AsyncPaymentsContext
	 */
	public static constructor_serve_static_invoice(recipient_id: Uint8Array, invoice_slot: number, path_absolute_expiry: bigint): AsyncPaymentsContext {
		const ret: bigint = bindings.AsyncPaymentsContext_serve_static_invoice(bindings.encodeUint8Array(recipient_id), invoice_slot, path_absolute_expiry);
		const ret_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoicePersisted-variant AsyncPaymentsContext
	 */
	public static constructor_static_invoice_persisted(offer_id: OfferId, invoice_created_at: bigint): AsyncPaymentsContext {
		const ret: bigint = bindings.AsyncPaymentsContext_static_invoice_persisted(CommonBase.get_ptr_of(offer_id), invoice_created_at);
		const ret_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutboundPayment-variant AsyncPaymentsContext
	 */
	public static constructor_outbound_payment(payment_id: Uint8Array): AsyncPaymentsContext {
		const ret: bigint = bindings.AsyncPaymentsContext_outbound_payment(bindings.encodeUint8Array(payment_id));
		const ret_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InboundPayment-variant AsyncPaymentsContext
	 */
	public static constructor_inbound_payment(path_absolute_expiry: bigint): AsyncPaymentsContext {
		const ret: bigint = bindings.AsyncPaymentsContext_inbound_payment(path_absolute_expiry);
		const ret_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ReleaseHeldHtlc-variant AsyncPaymentsContext
	 */
	public static constructor_release_held_htlc(intercept_id: Uint8Array, prev_outbound_scid_alias: bigint, htlc_id: bigint): AsyncPaymentsContext {
		const ret: bigint = bindings.AsyncPaymentsContext_release_held_htlc(bindings.encodeUint8Array(intercept_id), prev_outbound_scid_alias, htlc_id);
		const ret_hu_conv: AsyncPaymentsContext = AsyncPaymentsContext.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Serialize the AsyncPaymentsContext object into a byte array which can be read by AsyncPaymentsContext_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.AsyncPaymentsContext_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AsyncPaymentsContext from a byte array, created by AsyncPaymentsContext_write
	 */
	public static constructor_read(ser: Uint8Array): Result_AsyncPaymentsContextDecodeErrorZ {
		const ret: bigint = bindings.AsyncPaymentsContext_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_AsyncPaymentsContextDecodeErrorZ = Result_AsyncPaymentsContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
/** A AsyncPaymentsContext of type OfferPathsRequest */
export class AsyncPaymentsContext_OfferPathsRequest extends AsyncPaymentsContext {
	/**
	 * An identifier for the async recipient that is requesting blinded paths to include in their
	 * [`Offer::paths`]. This ID will be surfaced when the async recipient eventually sends a
	 * corresponding [`ServeStaticInvoice`] message, and can be used to rate limit the recipient.
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 * [`ServeStaticInvoice`]: crate::onion_message::async_payments::ServeStaticInvoice
	 */
	public recipient_id: Uint8Array;
	/**
	 * An optional field indicating the time as duration since the Unix epoch at which this path
	 * expires and messages sent over it should be ignored.
	 * 
	 * Useful to timeout async recipients that are no longer supported as clients.
	 */
	public path_absolute_expiry: Option_u64Z;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const recipient_id: number = bindings.LDKAsyncPaymentsContext_OfferPathsRequest_get_recipient_id(ptr);
		const recipient_id_conv: Uint8Array = bindings.decodeUint8Array(recipient_id);
		this.recipient_id = recipient_id_conv;
		const path_absolute_expiry: bigint = bindings.LDKAsyncPaymentsContext_OfferPathsRequest_get_path_absolute_expiry(ptr);
		const path_absolute_expiry_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(path_absolute_expiry);
			CommonBase.add_ref_from(path_absolute_expiry_hu_conv, this);
		this.path_absolute_expiry = path_absolute_expiry_hu_conv;
	}
}
/** A AsyncPaymentsContext of type OfferPaths */
export class AsyncPaymentsContext_OfferPaths extends AsyncPaymentsContext {
	/**
	 * The \"slot\" in the static invoice server's database that the invoice corresponding to these
	 * offer paths should go into, originally set by us in [`OfferPathsRequest::invoice_slot`]. This
	 * value allows us as the recipient to replace a specific invoice that is stored by the server,
	 * which is useful for limiting the number of invoices stored by the server while also keeping
	 * all the invoices persisted with the server fresh.
	 * 
	 * [`OfferPathsRequest::invoice_slot`]: crate::onion_message::async_payments::OfferPathsRequest::invoice_slot
	 */
	public invoice_slot: number;
	/**
	 * The time as duration since the Unix epoch at which this path expires and messages sent over
	 * it should be ignored.
	 * 
	 * This avoids the situation where the [`OfferPaths`] message is very delayed and thus
	 * outdated.
	 * 
	 * [`OfferPaths`]: crate::onion_message::async_payments::OfferPaths
	 */
	public path_absolute_expiry: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.invoice_slot = bindings.LDKAsyncPaymentsContext_OfferPaths_get_invoice_slot(ptr);
		this.path_absolute_expiry = bindings.LDKAsyncPaymentsContext_OfferPaths_get_path_absolute_expiry(ptr);
	}
}
/** A AsyncPaymentsContext of type ServeStaticInvoice */
export class AsyncPaymentsContext_ServeStaticInvoice extends AsyncPaymentsContext {
	/**
	 * An identifier for the async recipient that is requesting that a [`StaticInvoice`] be served
	 * on their behalf.
	 * 
	 * Useful when surfaced alongside the below `invoice_slot` when payers send an
	 * [`InvoiceRequest`], to pull the specific static invoice from the database.
	 * 
	 * Also useful to rate limit the invoices being persisted on behalf of a particular recipient.
	 * 
	 * This id will be provided back to us as the static invoice server via
	 * [`OffersContext::StaticInvoiceRequested::recipient_id`].
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public recipient_id: Uint8Array;
	/**
	 * The slot number for the specific [`StaticInvoice`] that the recipient is requesting be
	 * served on their behalf. Useful when surfaced alongside the above `recipient_id` when payers
	 * send an [`InvoiceRequest`], to pull the specific static invoice from the database. This id
	 * will be provided back to us as the static invoice server via
	 * [`OffersContext::StaticInvoiceRequested::invoice_slot`].
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
		const recipient_id: number = bindings.LDKAsyncPaymentsContext_ServeStaticInvoice_get_recipient_id(ptr);
		const recipient_id_conv: Uint8Array = bindings.decodeUint8Array(recipient_id);
		this.recipient_id = recipient_id_conv;
		this.invoice_slot = bindings.LDKAsyncPaymentsContext_ServeStaticInvoice_get_invoice_slot(ptr);
		this.path_absolute_expiry = bindings.LDKAsyncPaymentsContext_ServeStaticInvoice_get_path_absolute_expiry(ptr);
	}
}
/** A AsyncPaymentsContext of type StaticInvoicePersisted */
export class AsyncPaymentsContext_StaticInvoicePersisted extends AsyncPaymentsContext {
	/**
	 * The id of the offer in the cache corresponding to the [`StaticInvoice`] that has been
	 * persisted. This invoice is now ready to be provided by the static invoice server in response
	 * to [`InvoiceRequest`]s, so the corresponding offer can be marked as ready to receive
	 * payments.
	 * 
	 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public offer_id: OfferId;
	/**
	 * The time as duration since the Unix epoch at which the invoice corresponding to this path
	 * was created. Useful to know when an invoice needs replacement.
	 */
	public invoice_created_at: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const offer_id: bigint = bindings.LDKAsyncPaymentsContext_StaticInvoicePersisted_get_offer_id(ptr);
		const offer_id_hu_conv: OfferId = new OfferId(null, offer_id);
			CommonBase.add_ref_from(offer_id_hu_conv, this);
		this.offer_id = offer_id_hu_conv;
		this.invoice_created_at = bindings.LDKAsyncPaymentsContext_StaticInvoicePersisted_get_invoice_created_at(ptr);
	}
}
/** A AsyncPaymentsContext of type OutboundPayment */
export class AsyncPaymentsContext_OutboundPayment extends AsyncPaymentsContext {
	/**
	 * ID used when payment to the originating [`Offer`] was initiated. Useful for us to identify
	 * which of our pending outbound payments should be released to its often-offline payee.
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public payment_id: Uint8Array;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const payment_id: number = bindings.LDKAsyncPaymentsContext_OutboundPayment_get_payment_id(ptr);
		const payment_id_conv: Uint8Array = bindings.decodeUint8Array(payment_id);
		this.payment_id = payment_id_conv;
	}
}
/** A AsyncPaymentsContext of type InboundPayment */
export class AsyncPaymentsContext_InboundPayment extends AsyncPaymentsContext {
	/**
	 * The time as duration since the Unix epoch at which this path expires and messages sent over
	 * it should be ignored. Without this, anyone with the path corresponding to this context is
	 * able to trivially ask if we're online forever.
	 */
	public path_absolute_expiry: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		this.path_absolute_expiry = bindings.LDKAsyncPaymentsContext_InboundPayment_get_path_absolute_expiry(ptr);
	}
}
/** A AsyncPaymentsContext of type ReleaseHeldHtlc */
export class AsyncPaymentsContext_ReleaseHeldHtlc extends AsyncPaymentsContext {
	/**
	 * An identifier for the HTLC that should be released by us as the sender's always-online
	 * channel counterparty to the often-offline recipient.
	 */
	public intercept_id: Uint8Array;
	/**
	 * The short channel id alias corresponding to the to-be-released inbound HTLC, to help locate
	 * the HTLC internally if the [`ReleaseHeldHtlc`] races our node decoding the held HTLC's
	 * onion.
	 * 
	 * We use the outbound scid alias because it is stable even if the channel splices, unlike
	 * regular short channel ids.
	 * 
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 */
	public prev_outbound_scid_alias: bigint;
	/**
	 * The id of the to-be-released HTLC, to help locate the HTLC internally if the
	 * [`ReleaseHeldHtlc`] races our node decoding the held HTLC's onion.
	 * 
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 */
	public htlc_id: bigint;
	/* @internal */
	public constructor(ptr: bigint) {
		super(null, ptr);
		const intercept_id: number = bindings.LDKAsyncPaymentsContext_ReleaseHeldHtlc_get_intercept_id(ptr);
		const intercept_id_conv: Uint8Array = bindings.decodeUint8Array(intercept_id);
		this.intercept_id = intercept_id_conv;
		this.prev_outbound_scid_alias = bindings.LDKAsyncPaymentsContext_ReleaseHeldHtlc_get_prev_outbound_scid_alias(ptr);
		this.htlc_id = bindings.LDKAsyncPaymentsContext_ReleaseHeldHtlc_get_htlc_id(ptr);
	}
}
