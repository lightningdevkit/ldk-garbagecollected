using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Contains data specific to an [`AsyncPaymentsMessage`].
 * 
 * [`AsyncPaymentsMessage`]: crate::onion_message::async_payments::AsyncPaymentsMessage
 */
public class AsyncPaymentsContext : CommonBase {
	protected AsyncPaymentsContext(object _dummy, long ptr) : base(ptr) { }
	~AsyncPaymentsContext() {
		if (ptr != 0) { bindings.AsyncPaymentsContext_free(ptr); }
	}

	internal static AsyncPaymentsContext constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKAsyncPaymentsContext_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new AsyncPaymentsContext_OfferPathsRequest(ptr);
			case 1: return new AsyncPaymentsContext_OfferPaths(ptr);
			case 2: return new AsyncPaymentsContext_ServeStaticInvoice(ptr);
			case 3: return new AsyncPaymentsContext_StaticInvoicePersisted(ptr);
			case 4: return new AsyncPaymentsContext_OutboundPayment(ptr);
			case 5: return new AsyncPaymentsContext_InboundPayment(ptr);
			case 6: return new AsyncPaymentsContext_ReleaseHeldHtlc(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A AsyncPaymentsContext of type OfferPathsRequest */
	public class AsyncPaymentsContext_OfferPathsRequest : AsyncPaymentsContext {
		/**
		 * An identifier for the async recipient that is requesting blinded paths to include in their
		 * [`Offer::paths`]. This ID will be surfaced when the async recipient eventually sends a
		 * corresponding [`ServeStaticInvoice`] message, and can be used to rate limit the recipient.
		 * 
		 * [`Offer::paths`]: crate::offers::offer::Offer::paths
		 * [`ServeStaticInvoice`]: crate::onion_message::async_payments::ServeStaticInvoice
		 */
		public byte[] recipient_id;
		/**
		 * An optional field indicating the time as duration since the Unix epoch at which this path
		 * expires and messages sent over it should be ignored.
		 * 
		 * Useful to timeout async recipients that are no longer supported as clients.
		 */
		public org.ldk.structs.Option_u64Z path_absolute_expiry;
		internal AsyncPaymentsContext_OfferPathsRequest(long ptr) : base(null, ptr) {
			long recipient_id = bindings.LDKAsyncPaymentsContext_OfferPathsRequest_get_recipient_id(ptr);
			byte[] recipient_id_conv = InternalUtils.decodeUint8Array(recipient_id);
			this.recipient_id = recipient_id_conv;
			long path_absolute_expiry = bindings.LDKAsyncPaymentsContext_OfferPathsRequest_get_path_absolute_expiry(ptr);
			org.ldk.structs.Option_u64Z path_absolute_expiry_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(path_absolute_expiry);
			if (path_absolute_expiry_hu_conv != null) { path_absolute_expiry_hu_conv.ptrs_to.AddLast(this); };
			this.path_absolute_expiry = path_absolute_expiry_hu_conv;
		}
	}
	/** A AsyncPaymentsContext of type OfferPaths */
	public class AsyncPaymentsContext_OfferPaths : AsyncPaymentsContext {
		/**
		 * The \"slot\" in the static invoice server's database that the invoice corresponding to these
		 * offer paths should go into, originally set by us in [`OfferPathsRequest::invoice_slot`]. This
		 * value allows us as the recipient to replace a specific invoice that is stored by the server,
		 * which is useful for limiting the number of invoices stored by the server while also keeping
		 * all the invoices persisted with the server fresh.
		 * 
		 * [`OfferPathsRequest::invoice_slot`]: crate::onion_message::async_payments::OfferPathsRequest::invoice_slot
		 */
		public short invoice_slot;
		/**
		 * The time as duration since the Unix epoch at which this path expires and messages sent over
		 * it should be ignored.
		 * 
		 * This avoids the situation where the [`OfferPaths`] message is very delayed and thus
		 * outdated.
		 * 
		 * [`OfferPaths`]: crate::onion_message::async_payments::OfferPaths
		 */
		public long path_absolute_expiry;
		internal AsyncPaymentsContext_OfferPaths(long ptr) : base(null, ptr) {
			this.invoice_slot = bindings.LDKAsyncPaymentsContext_OfferPaths_get_invoice_slot(ptr);
			this.path_absolute_expiry = bindings.LDKAsyncPaymentsContext_OfferPaths_get_path_absolute_expiry(ptr);
		}
	}
	/** A AsyncPaymentsContext of type ServeStaticInvoice */
	public class AsyncPaymentsContext_ServeStaticInvoice : AsyncPaymentsContext {
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
		public byte[] recipient_id;
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
		public short invoice_slot;
		/**
		 * The time as duration since the Unix epoch at which this path expires and messages sent over
		 * it should be ignored.
		 * 
		 * Useful to timeout async recipients that are no longer supported as clients.
		 */
		public long path_absolute_expiry;
		internal AsyncPaymentsContext_ServeStaticInvoice(long ptr) : base(null, ptr) {
			long recipient_id = bindings.LDKAsyncPaymentsContext_ServeStaticInvoice_get_recipient_id(ptr);
			byte[] recipient_id_conv = InternalUtils.decodeUint8Array(recipient_id);
			this.recipient_id = recipient_id_conv;
			this.invoice_slot = bindings.LDKAsyncPaymentsContext_ServeStaticInvoice_get_invoice_slot(ptr);
			this.path_absolute_expiry = bindings.LDKAsyncPaymentsContext_ServeStaticInvoice_get_path_absolute_expiry(ptr);
		}
	}
	/** A AsyncPaymentsContext of type StaticInvoicePersisted */
	public class AsyncPaymentsContext_StaticInvoicePersisted : AsyncPaymentsContext {
		/**
		 * The id of the offer in the cache corresponding to the [`StaticInvoice`] that has been
		 * persisted. This invoice is now ready to be provided by the static invoice server in response
		 * to [`InvoiceRequest`]s, so the corresponding offer can be marked as ready to receive
		 * payments.
		 * 
		 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
		 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
		 */
		public org.ldk.structs.OfferId offer_id;
		/**
		 * The time as duration since the Unix epoch at which the invoice corresponding to this path
		 * was created. Useful to know when an invoice needs replacement.
		 */
		public long invoice_created_at;
		internal AsyncPaymentsContext_StaticInvoicePersisted(long ptr) : base(null, ptr) {
			long offer_id = bindings.LDKAsyncPaymentsContext_StaticInvoicePersisted_get_offer_id(ptr);
			org.ldk.structs.OfferId offer_id_hu_conv = null; if (offer_id < 0 || offer_id > 4096) { offer_id_hu_conv = new org.ldk.structs.OfferId(null, offer_id); }
			if (offer_id_hu_conv != null) { offer_id_hu_conv.ptrs_to.AddLast(this); };
			this.offer_id = offer_id_hu_conv;
			this.invoice_created_at = bindings.LDKAsyncPaymentsContext_StaticInvoicePersisted_get_invoice_created_at(ptr);
		}
	}
	/** A AsyncPaymentsContext of type OutboundPayment */
	public class AsyncPaymentsContext_OutboundPayment : AsyncPaymentsContext {
		/**
		 * ID used when payment to the originating [`Offer`] was initiated. Useful for us to identify
		 * which of our pending outbound payments should be released to its often-offline payee.
		 * 
		 * [`Offer`]: crate::offers::offer::Offer
		 */
		public byte[] payment_id;
		internal AsyncPaymentsContext_OutboundPayment(long ptr) : base(null, ptr) {
			long payment_id = bindings.LDKAsyncPaymentsContext_OutboundPayment_get_payment_id(ptr);
			byte[] payment_id_conv = InternalUtils.decodeUint8Array(payment_id);
			this.payment_id = payment_id_conv;
		}
	}
	/** A AsyncPaymentsContext of type InboundPayment */
	public class AsyncPaymentsContext_InboundPayment : AsyncPaymentsContext {
		/**
		 * The time as duration since the Unix epoch at which this path expires and messages sent over
		 * it should be ignored. Without this, anyone with the path corresponding to this context is
		 * able to trivially ask if we're online forever.
		 */
		public long path_absolute_expiry;
		internal AsyncPaymentsContext_InboundPayment(long ptr) : base(null, ptr) {
			this.path_absolute_expiry = bindings.LDKAsyncPaymentsContext_InboundPayment_get_path_absolute_expiry(ptr);
		}
	}
	/** A AsyncPaymentsContext of type ReleaseHeldHtlc */
	public class AsyncPaymentsContext_ReleaseHeldHtlc : AsyncPaymentsContext {
		/**
		 * An identifier for the HTLC that should be released by us as the sender's always-online
		 * channel counterparty to the often-offline recipient.
		 */
		public byte[] intercept_id;
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
		public long prev_outbound_scid_alias;
		/**
		 * The id of the to-be-released HTLC, to help locate the HTLC internally if the
		 * [`ReleaseHeldHtlc`] races our node decoding the held HTLC's onion.
		 * 
		 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
		 */
		public long htlc_id;
		internal AsyncPaymentsContext_ReleaseHeldHtlc(long ptr) : base(null, ptr) {
			long intercept_id = bindings.LDKAsyncPaymentsContext_ReleaseHeldHtlc_get_intercept_id(ptr);
			byte[] intercept_id_conv = InternalUtils.decodeUint8Array(intercept_id);
			this.intercept_id = intercept_id_conv;
			this.prev_outbound_scid_alias = bindings.LDKAsyncPaymentsContext_ReleaseHeldHtlc_get_prev_outbound_scid_alias(ptr);
			this.htlc_id = bindings.LDKAsyncPaymentsContext_ReleaseHeldHtlc_get_htlc_id(ptr);
		}
	}
	internal long clone_ptr() {
		long ret = bindings.AsyncPaymentsContext_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the AsyncPaymentsContext
	 */
	public org.ldk.structs.AsyncPaymentsContext clone() {
		long ret = bindings.AsyncPaymentsContext_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPathsRequest-variant AsyncPaymentsContext
	 */
	public static org.ldk.structs.AsyncPaymentsContext offer_paths_request(byte[] recipient_id, org.ldk.structs.Option_u64Z path_absolute_expiry) {
		long ret = bindings.AsyncPaymentsContext_offer_paths_request(InternalUtils.encodeUint8Array(recipient_id), path_absolute_expiry.ptr);
		GC.KeepAlive(recipient_id);
		GC.KeepAlive(path_absolute_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPaths-variant AsyncPaymentsContext
	 */
	public static org.ldk.structs.AsyncPaymentsContext offer_paths(short invoice_slot, long path_absolute_expiry) {
		long ret = bindings.AsyncPaymentsContext_offer_paths(invoice_slot, path_absolute_expiry);
		GC.KeepAlive(invoice_slot);
		GC.KeepAlive(path_absolute_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ServeStaticInvoice-variant AsyncPaymentsContext
	 */
	public static org.ldk.structs.AsyncPaymentsContext serve_static_invoice(byte[] recipient_id, short invoice_slot, long path_absolute_expiry) {
		long ret = bindings.AsyncPaymentsContext_serve_static_invoice(InternalUtils.encodeUint8Array(recipient_id), invoice_slot, path_absolute_expiry);
		GC.KeepAlive(recipient_id);
		GC.KeepAlive(invoice_slot);
		GC.KeepAlive(path_absolute_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoicePersisted-variant AsyncPaymentsContext
	 */
	public static org.ldk.structs.AsyncPaymentsContext static_invoice_persisted(org.ldk.structs.OfferId offer_id, long invoice_created_at) {
		long ret = bindings.AsyncPaymentsContext_static_invoice_persisted(offer_id.ptr, invoice_created_at);
		GC.KeepAlive(offer_id);
		GC.KeepAlive(invoice_created_at);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutboundPayment-variant AsyncPaymentsContext
	 */
	public static org.ldk.structs.AsyncPaymentsContext outbound_payment(byte[] payment_id) {
		long ret = bindings.AsyncPaymentsContext_outbound_payment(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(payment_id, 32)));
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InboundPayment-variant AsyncPaymentsContext
	 */
	public static org.ldk.structs.AsyncPaymentsContext inbound_payment(long path_absolute_expiry) {
		long ret = bindings.AsyncPaymentsContext_inbound_payment(path_absolute_expiry);
		GC.KeepAlive(path_absolute_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ReleaseHeldHtlc-variant AsyncPaymentsContext
	 */
	public static org.ldk.structs.AsyncPaymentsContext release_held_htlc(byte[] intercept_id, long prev_outbound_scid_alias, long htlc_id) {
		long ret = bindings.AsyncPaymentsContext_release_held_htlc(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(intercept_id, 32)), prev_outbound_scid_alias, htlc_id);
		GC.KeepAlive(intercept_id);
		GC.KeepAlive(prev_outbound_scid_alias);
		GC.KeepAlive(htlc_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the AsyncPaymentsContext object into a byte array which can be read by AsyncPaymentsContext_read
	 */
	public byte[] write() {
		long ret = bindings.AsyncPaymentsContext_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AsyncPaymentsContext from a byte array, created by AsyncPaymentsContext_write
	 */
	public static org.ldk.structs.Result_AsyncPaymentsContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.AsyncPaymentsContext_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AsyncPaymentsContextDecodeErrorZ ret_hu_conv = Result_AsyncPaymentsContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
