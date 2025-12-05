package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Contains data specific to an [`AsyncPaymentsMessage`].
 * 
 * [`AsyncPaymentsMessage`]: crate::onion_message::async_payments::AsyncPaymentsMessage
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class AsyncPaymentsContext extends CommonBase {
	private AsyncPaymentsContext(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.AsyncPaymentsContext_free(ptr); }
	}
	static AsyncPaymentsContext constr_from_ptr(long ptr) {
		bindings.LDKAsyncPaymentsContext raw_val = bindings.LDKAsyncPaymentsContext_ref_from_ptr(ptr);
		if (raw_val.getClass() == bindings.LDKAsyncPaymentsContext.OfferPathsRequest.class) {
			return new OfferPathsRequest(ptr, (bindings.LDKAsyncPaymentsContext.OfferPathsRequest)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAsyncPaymentsContext.OfferPaths.class) {
			return new OfferPaths(ptr, (bindings.LDKAsyncPaymentsContext.OfferPaths)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAsyncPaymentsContext.ServeStaticInvoice.class) {
			return new ServeStaticInvoice(ptr, (bindings.LDKAsyncPaymentsContext.ServeStaticInvoice)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAsyncPaymentsContext.StaticInvoicePersisted.class) {
			return new StaticInvoicePersisted(ptr, (bindings.LDKAsyncPaymentsContext.StaticInvoicePersisted)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAsyncPaymentsContext.OutboundPayment.class) {
			return new OutboundPayment(ptr, (bindings.LDKAsyncPaymentsContext.OutboundPayment)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAsyncPaymentsContext.InboundPayment.class) {
			return new InboundPayment(ptr, (bindings.LDKAsyncPaymentsContext.InboundPayment)raw_val);
		}
		if (raw_val.getClass() == bindings.LDKAsyncPaymentsContext.ReleaseHeldHtlc.class) {
			return new ReleaseHeldHtlc(ptr, (bindings.LDKAsyncPaymentsContext.ReleaseHeldHtlc)raw_val);
		}
		assert false; return null; // Unreachable without extending the (internal) bindings interface
	}

	/**
	 * Context used by a [`BlindedMessagePath`] provided out-of-band to an async recipient, where the
	 * context is provided back to the static invoice server in corresponding [`OfferPathsRequest`]s.
	 * 
	 * [`OfferPathsRequest`]: crate::onion_message::async_payments::OfferPathsRequest
	 */
	public final static class OfferPathsRequest extends AsyncPaymentsContext {
		/**
		 * An identifier for the async recipient that is requesting blinded paths to include in their
		 * [`Offer::paths`]. This ID will be surfaced when the async recipient eventually sends a
		 * corresponding [`ServeStaticInvoice`] message, and can be used to rate limit the recipient.
		 * 
		 * [`Offer::paths`]: crate::offers::offer::Offer::paths
		 * [`ServeStaticInvoice`]: crate::onion_message::async_payments::ServeStaticInvoice
		*/
		public final byte[] recipient_id;
		/**
		 * An optional field indicating the time as duration since the Unix epoch at which this path
		 * expires and messages sent over it should be ignored.
		 * 
		 * Useful to timeout async recipients that are no longer supported as clients.
		*/
		public final org.ldk.structs.Option_u64Z path_absolute_expiry;
		private OfferPathsRequest(long ptr, bindings.LDKAsyncPaymentsContext.OfferPathsRequest obj) {
			super(null, ptr);
			this.recipient_id = obj.recipient_id;
			long path_absolute_expiry = obj.path_absolute_expiry;
			org.ldk.structs.Option_u64Z path_absolute_expiry_hu_conv = org.ldk.structs.Option_u64Z.constr_from_ptr(path_absolute_expiry);
			if (path_absolute_expiry_hu_conv != null) { path_absolute_expiry_hu_conv.ptrs_to.add(this); };
			this.path_absolute_expiry = path_absolute_expiry_hu_conv;
		}
	}
	/**
	 * Context used by a reply path to an [`OfferPathsRequest`], provided back to us as an async
	 * recipient in corresponding [`OfferPaths`] messages from the static invoice server.
	 * 
	 * [`OfferPathsRequest`]: crate::onion_message::async_payments::OfferPathsRequest
	 * [`OfferPaths`]: crate::onion_message::async_payments::OfferPaths
	 */
	public final static class OfferPaths extends AsyncPaymentsContext {
		/**
		 * The \"slot\" in the static invoice server's database that the invoice corresponding to these
		 * offer paths should go into, originally set by us in [`OfferPathsRequest::invoice_slot`]. This
		 * value allows us as the recipient to replace a specific invoice that is stored by the server,
		 * which is useful for limiting the number of invoices stored by the server while also keeping
		 * all the invoices persisted with the server fresh.
		 * 
		 * [`OfferPathsRequest::invoice_slot`]: crate::onion_message::async_payments::OfferPathsRequest::invoice_slot
		*/
		public final short invoice_slot;
		/**
		 * The time as duration since the Unix epoch at which this path expires and messages sent over
		 * it should be ignored.
		 * 
		 * This avoids the situation where the [`OfferPaths`] message is very delayed and thus
		 * outdated.
		 * 
		 * [`OfferPaths`]: crate::onion_message::async_payments::OfferPaths
		*/
		public final long path_absolute_expiry;
		private OfferPaths(long ptr, bindings.LDKAsyncPaymentsContext.OfferPaths obj) {
			super(null, ptr);
			this.invoice_slot = obj.invoice_slot;
			this.path_absolute_expiry = obj.path_absolute_expiry;
		}
	}
	/**
	 * Context used by a reply path to an [`OfferPaths`] message, provided back to us as the static
	 * invoice server in corresponding [`ServeStaticInvoice`] messages.
	 * 
	 * [`OfferPaths`]: crate::onion_message::async_payments::OfferPaths
	 * [`ServeStaticInvoice`]: crate::onion_message::async_payments::ServeStaticInvoice
	 */
	public final static class ServeStaticInvoice extends AsyncPaymentsContext {
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
		public final byte[] recipient_id;
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
		public final short invoice_slot;
		/**
		 * The time as duration since the Unix epoch at which this path expires and messages sent over
		 * it should be ignored.
		 * 
		 * Useful to timeout async recipients that are no longer supported as clients.
		*/
		public final long path_absolute_expiry;
		private ServeStaticInvoice(long ptr, bindings.LDKAsyncPaymentsContext.ServeStaticInvoice obj) {
			super(null, ptr);
			this.recipient_id = obj.recipient_id;
			this.invoice_slot = obj.invoice_slot;
			this.path_absolute_expiry = obj.path_absolute_expiry;
		}
	}
	/**
	 * Context used by a reply path to a [`ServeStaticInvoice`] message, provided back to us in
	 * corresponding [`StaticInvoicePersisted`] messages.
	 * 
	 * [`ServeStaticInvoice`]: crate::onion_message::async_payments::ServeStaticInvoice
	 * [`StaticInvoicePersisted`]: crate::onion_message::async_payments::StaticInvoicePersisted
	 */
	public final static class StaticInvoicePersisted extends AsyncPaymentsContext {
		/**
		 * The id of the offer in the cache corresponding to the [`StaticInvoice`] that has been
		 * persisted. This invoice is now ready to be provided by the static invoice server in response
		 * to [`InvoiceRequest`]s, so the corresponding offer can be marked as ready to receive
		 * payments.
		 * 
		 * [`StaticInvoice`]: crate::offers::static_invoice::StaticInvoice
		 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
		*/
		public final org.ldk.structs.OfferId offer_id;
		/**
		 * The time as duration since the Unix epoch at which the invoice corresponding to this path
		 * was created. Useful to know when an invoice needs replacement.
		*/
		public final long invoice_created_at;
		private StaticInvoicePersisted(long ptr, bindings.LDKAsyncPaymentsContext.StaticInvoicePersisted obj) {
			super(null, ptr);
			long offer_id = obj.offer_id;
			org.ldk.structs.OfferId offer_id_hu_conv = null; if (offer_id < 0 || offer_id > 4096) { offer_id_hu_conv = new org.ldk.structs.OfferId(null, offer_id); }
			if (offer_id_hu_conv != null) { offer_id_hu_conv.ptrs_to.add(this); };
			this.offer_id = offer_id_hu_conv;
			this.invoice_created_at = obj.invoice_created_at;
		}
	}
	/**
	 * Context contained within the reply [`BlindedMessagePath`] we put in outbound
	 * [`HeldHtlcAvailable`] messages, provided back to us in corresponding [`ReleaseHeldHtlc`]
	 * messages if we are an always-online sender paying an async recipient.
	 * 
	 * [`HeldHtlcAvailable`]: crate::onion_message::async_payments::HeldHtlcAvailable
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 */
	public final static class OutboundPayment extends AsyncPaymentsContext {
		/**
		 * ID used when payment to the originating [`Offer`] was initiated. Useful for us to identify
		 * which of our pending outbound payments should be released to its often-offline payee.
		 * 
		 * [`Offer`]: crate::offers::offer::Offer
		*/
		public final byte[] payment_id;
		private OutboundPayment(long ptr, bindings.LDKAsyncPaymentsContext.OutboundPayment obj) {
			super(null, ptr);
			this.payment_id = obj.payment_id;
		}
	}
	/**
	 * Context contained within the [`BlindedMessagePath`]s we put in static invoices, provided back
	 * to us in corresponding [`HeldHtlcAvailable`] messages.
	 * 
	 * [`HeldHtlcAvailable`]: crate::onion_message::async_payments::HeldHtlcAvailable
	 */
	public final static class InboundPayment extends AsyncPaymentsContext {
		/**
		 * The time as duration since the Unix epoch at which this path expires and messages sent over
		 * it should be ignored. Without this, anyone with the path corresponding to this context is
		 * able to trivially ask if we're online forever.
		*/
		public final long path_absolute_expiry;
		private InboundPayment(long ptr, bindings.LDKAsyncPaymentsContext.InboundPayment obj) {
			super(null, ptr);
			this.path_absolute_expiry = obj.path_absolute_expiry;
		}
	}
	/**
	 * Context contained within the reply [`BlindedMessagePath`] put in outbound
	 * [`HeldHtlcAvailable`] messages, provided back to the async sender's always-online counterparty
	 * in corresponding [`ReleaseHeldHtlc`] messages.
	 * 
	 * [`HeldHtlcAvailable`]: crate::onion_message::async_payments::HeldHtlcAvailable
	 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
	 */
	public final static class ReleaseHeldHtlc extends AsyncPaymentsContext {
		/**
		 * An identifier for the HTLC that should be released by us as the sender's always-online
		 * channel counterparty to the often-offline recipient.
		*/
		public final byte[] intercept_id;
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
		public final long prev_outbound_scid_alias;
		/**
		 * The id of the to-be-released HTLC, to help locate the HTLC internally if the
		 * [`ReleaseHeldHtlc`] races our node decoding the held HTLC's onion.
		 * 
		 * [`ReleaseHeldHtlc`]: crate::onion_message::async_payments::ReleaseHeldHtlc
		*/
		public final long htlc_id;
		private ReleaseHeldHtlc(long ptr, bindings.LDKAsyncPaymentsContext.ReleaseHeldHtlc obj) {
			super(null, ptr);
			this.intercept_id = obj.intercept_id;
			this.prev_outbound_scid_alias = obj.prev_outbound_scid_alias;
			this.htlc_id = obj.htlc_id;
		}
	}
	long clone_ptr() {
		long ret = bindings.AsyncPaymentsContext_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the AsyncPaymentsContext
	 */
	public AsyncPaymentsContext clone() {
		long ret = bindings.AsyncPaymentsContext_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPathsRequest-variant AsyncPaymentsContext
	 */
	public static AsyncPaymentsContext offer_paths_request(byte[] recipient_id, org.ldk.structs.Option_u64Z path_absolute_expiry) {
		long ret = bindings.AsyncPaymentsContext_offer_paths_request(recipient_id, path_absolute_expiry.ptr);
		Reference.reachabilityFence(recipient_id);
		Reference.reachabilityFence(path_absolute_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPaths-variant AsyncPaymentsContext
	 */
	public static AsyncPaymentsContext offer_paths(short invoice_slot, long path_absolute_expiry) {
		long ret = bindings.AsyncPaymentsContext_offer_paths(invoice_slot, path_absolute_expiry);
		Reference.reachabilityFence(invoice_slot);
		Reference.reachabilityFence(path_absolute_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ServeStaticInvoice-variant AsyncPaymentsContext
	 */
	public static AsyncPaymentsContext serve_static_invoice(byte[] recipient_id, short invoice_slot, long path_absolute_expiry) {
		long ret = bindings.AsyncPaymentsContext_serve_static_invoice(recipient_id, invoice_slot, path_absolute_expiry);
		Reference.reachabilityFence(recipient_id);
		Reference.reachabilityFence(invoice_slot);
		Reference.reachabilityFence(path_absolute_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoicePersisted-variant AsyncPaymentsContext
	 */
	public static AsyncPaymentsContext static_invoice_persisted(org.ldk.structs.OfferId offer_id, long invoice_created_at) {
		long ret = bindings.AsyncPaymentsContext_static_invoice_persisted(offer_id.ptr, invoice_created_at);
		Reference.reachabilityFence(offer_id);
		Reference.reachabilityFence(invoice_created_at);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OutboundPayment-variant AsyncPaymentsContext
	 */
	public static AsyncPaymentsContext outbound_payment(byte[] payment_id) {
		long ret = bindings.AsyncPaymentsContext_outbound_payment(InternalUtils.check_arr_len(payment_id, 32));
		Reference.reachabilityFence(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new InboundPayment-variant AsyncPaymentsContext
	 */
	public static AsyncPaymentsContext inbound_payment(long path_absolute_expiry) {
		long ret = bindings.AsyncPaymentsContext_inbound_payment(path_absolute_expiry);
		Reference.reachabilityFence(path_absolute_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ReleaseHeldHtlc-variant AsyncPaymentsContext
	 */
	public static AsyncPaymentsContext release_held_htlc(byte[] intercept_id, long prev_outbound_scid_alias, long htlc_id) {
		long ret = bindings.AsyncPaymentsContext_release_held_htlc(InternalUtils.check_arr_len(intercept_id, 32), prev_outbound_scid_alias, htlc_id);
		Reference.reachabilityFence(intercept_id);
		Reference.reachabilityFence(prev_outbound_scid_alias);
		Reference.reachabilityFence(htlc_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsContext ret_hu_conv = org.ldk.structs.AsyncPaymentsContext.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the AsyncPaymentsContext object into a byte array which can be read by AsyncPaymentsContext_read
	 */
	public byte[] write() {
		byte[] ret = bindings.AsyncPaymentsContext_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a AsyncPaymentsContext from a byte array, created by AsyncPaymentsContext_write
	 */
	public static Result_AsyncPaymentsContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.AsyncPaymentsContext_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AsyncPaymentsContextDecodeErrorZ ret_hu_conv = Result_AsyncPaymentsContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
