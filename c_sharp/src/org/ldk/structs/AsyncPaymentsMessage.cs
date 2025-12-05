using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * Possible async payment messages sent and received via an [`OnionMessage`].
 * 
 * [`OnionMessage`]: crate::ln::msgs::OnionMessage
 */
public class AsyncPaymentsMessage : CommonBase {
	protected AsyncPaymentsMessage(object _dummy, long ptr) : base(ptr) { }
	~AsyncPaymentsMessage() {
		if (ptr != 0) { bindings.AsyncPaymentsMessage_free(ptr); }
	}

	internal static AsyncPaymentsMessage constr_from_ptr(long ptr) {
		long raw_ty = bindings.LDKAsyncPaymentsMessage_ty_from_ptr(ptr);
		switch (raw_ty) {
			case 0: return new AsyncPaymentsMessage_OfferPathsRequest(ptr);
			case 1: return new AsyncPaymentsMessage_OfferPaths(ptr);
			case 2: return new AsyncPaymentsMessage_ServeStaticInvoice(ptr);
			case 3: return new AsyncPaymentsMessage_StaticInvoicePersisted(ptr);
			case 4: return new AsyncPaymentsMessage_HeldHtlcAvailable(ptr);
			case 5: return new AsyncPaymentsMessage_ReleaseHeldHtlc(ptr);
			default:
				throw new ArgumentException("Impossible enum variant");
		}
	}

	/** A AsyncPaymentsMessage of type OfferPathsRequest */
	public class AsyncPaymentsMessage_OfferPathsRequest : AsyncPaymentsMessage {
		public org.ldk.structs.OfferPathsRequest offer_paths_request;
		internal AsyncPaymentsMessage_OfferPathsRequest(long ptr) : base(null, ptr) {
			long offer_paths_request = bindings.LDKAsyncPaymentsMessage_OfferPathsRequest_get_offer_paths_request(ptr);
			org.ldk.structs.OfferPathsRequest offer_paths_request_hu_conv = null; if (offer_paths_request < 0 || offer_paths_request > 4096) { offer_paths_request_hu_conv = new org.ldk.structs.OfferPathsRequest(null, offer_paths_request); }
			if (offer_paths_request_hu_conv != null) { offer_paths_request_hu_conv.ptrs_to.AddLast(this); };
			this.offer_paths_request = offer_paths_request_hu_conv;
		}
	}
	/** A AsyncPaymentsMessage of type OfferPaths */
	public class AsyncPaymentsMessage_OfferPaths : AsyncPaymentsMessage {
		public org.ldk.structs.OfferPaths offer_paths;
		internal AsyncPaymentsMessage_OfferPaths(long ptr) : base(null, ptr) {
			long offer_paths = bindings.LDKAsyncPaymentsMessage_OfferPaths_get_offer_paths(ptr);
			org.ldk.structs.OfferPaths offer_paths_hu_conv = null; if (offer_paths < 0 || offer_paths > 4096) { offer_paths_hu_conv = new org.ldk.structs.OfferPaths(null, offer_paths); }
			if (offer_paths_hu_conv != null) { offer_paths_hu_conv.ptrs_to.AddLast(this); };
			this.offer_paths = offer_paths_hu_conv;
		}
	}
	/** A AsyncPaymentsMessage of type ServeStaticInvoice */
	public class AsyncPaymentsMessage_ServeStaticInvoice : AsyncPaymentsMessage {
		public org.ldk.structs.ServeStaticInvoice serve_static_invoice;
		internal AsyncPaymentsMessage_ServeStaticInvoice(long ptr) : base(null, ptr) {
			long serve_static_invoice = bindings.LDKAsyncPaymentsMessage_ServeStaticInvoice_get_serve_static_invoice(ptr);
			org.ldk.structs.ServeStaticInvoice serve_static_invoice_hu_conv = null; if (serve_static_invoice < 0 || serve_static_invoice > 4096) { serve_static_invoice_hu_conv = new org.ldk.structs.ServeStaticInvoice(null, serve_static_invoice); }
			if (serve_static_invoice_hu_conv != null) { serve_static_invoice_hu_conv.ptrs_to.AddLast(this); };
			this.serve_static_invoice = serve_static_invoice_hu_conv;
		}
	}
	/** A AsyncPaymentsMessage of type StaticInvoicePersisted */
	public class AsyncPaymentsMessage_StaticInvoicePersisted : AsyncPaymentsMessage {
		public org.ldk.structs.StaticInvoicePersisted static_invoice_persisted;
		internal AsyncPaymentsMessage_StaticInvoicePersisted(long ptr) : base(null, ptr) {
			long static_invoice_persisted = bindings.LDKAsyncPaymentsMessage_StaticInvoicePersisted_get_static_invoice_persisted(ptr);
			org.ldk.structs.StaticInvoicePersisted static_invoice_persisted_hu_conv = null; if (static_invoice_persisted < 0 || static_invoice_persisted > 4096) { static_invoice_persisted_hu_conv = new org.ldk.structs.StaticInvoicePersisted(null, static_invoice_persisted); }
			if (static_invoice_persisted_hu_conv != null) { static_invoice_persisted_hu_conv.ptrs_to.AddLast(this); };
			this.static_invoice_persisted = static_invoice_persisted_hu_conv;
		}
	}
	/** A AsyncPaymentsMessage of type HeldHtlcAvailable */
	public class AsyncPaymentsMessage_HeldHtlcAvailable : AsyncPaymentsMessage {
		public org.ldk.structs.HeldHtlcAvailable held_htlc_available;
		internal AsyncPaymentsMessage_HeldHtlcAvailable(long ptr) : base(null, ptr) {
			long held_htlc_available = bindings.LDKAsyncPaymentsMessage_HeldHtlcAvailable_get_held_htlc_available(ptr);
			org.ldk.structs.HeldHtlcAvailable held_htlc_available_hu_conv = null; if (held_htlc_available < 0 || held_htlc_available > 4096) { held_htlc_available_hu_conv = new org.ldk.structs.HeldHtlcAvailable(null, held_htlc_available); }
			if (held_htlc_available_hu_conv != null) { held_htlc_available_hu_conv.ptrs_to.AddLast(this); };
			this.held_htlc_available = held_htlc_available_hu_conv;
		}
	}
	/** A AsyncPaymentsMessage of type ReleaseHeldHtlc */
	public class AsyncPaymentsMessage_ReleaseHeldHtlc : AsyncPaymentsMessage {
		public org.ldk.structs.ReleaseHeldHtlc release_held_htlc;
		internal AsyncPaymentsMessage_ReleaseHeldHtlc(long ptr) : base(null, ptr) {
			long release_held_htlc = bindings.LDKAsyncPaymentsMessage_ReleaseHeldHtlc_get_release_held_htlc(ptr);
			org.ldk.structs.ReleaseHeldHtlc release_held_htlc_hu_conv = null; if (release_held_htlc < 0 || release_held_htlc > 4096) { release_held_htlc_hu_conv = new org.ldk.structs.ReleaseHeldHtlc(null, release_held_htlc); }
			if (release_held_htlc_hu_conv != null) { release_held_htlc_hu_conv.ptrs_to.AddLast(this); };
			this.release_held_htlc = release_held_htlc_hu_conv;
		}
	}
	internal long clone_ptr() {
		long ret = bindings.AsyncPaymentsMessage_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the AsyncPaymentsMessage
	 */
	public org.ldk.structs.AsyncPaymentsMessage clone() {
		long ret = bindings.AsyncPaymentsMessage_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsMessage ret_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPathsRequest-variant AsyncPaymentsMessage
	 */
	public static org.ldk.structs.AsyncPaymentsMessage offer_paths_request(org.ldk.structs.OfferPathsRequest a) {
		long ret = bindings.AsyncPaymentsMessage_offer_paths_request(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsMessage ret_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new OfferPaths-variant AsyncPaymentsMessage
	 */
	public static org.ldk.structs.AsyncPaymentsMessage offer_paths(org.ldk.structs.OfferPaths a) {
		long ret = bindings.AsyncPaymentsMessage_offer_paths(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsMessage ret_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ServeStaticInvoice-variant AsyncPaymentsMessage
	 */
	public static org.ldk.structs.AsyncPaymentsMessage serve_static_invoice(org.ldk.structs.ServeStaticInvoice a) {
		long ret = bindings.AsyncPaymentsMessage_serve_static_invoice(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsMessage ret_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new StaticInvoicePersisted-variant AsyncPaymentsMessage
	 */
	public static org.ldk.structs.AsyncPaymentsMessage static_invoice_persisted(org.ldk.structs.StaticInvoicePersisted a) {
		long ret = bindings.AsyncPaymentsMessage_static_invoice_persisted(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsMessage ret_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new HeldHtlcAvailable-variant AsyncPaymentsMessage
	 */
	public static org.ldk.structs.AsyncPaymentsMessage held_htlc_available(org.ldk.structs.HeldHtlcAvailable a) {
		long ret = bindings.AsyncPaymentsMessage_held_htlc_available(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsMessage ret_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Utility method to constructs a new ReleaseHeldHtlc-variant AsyncPaymentsMessage
	 */
	public static org.ldk.structs.AsyncPaymentsMessage release_held_htlc(org.ldk.structs.ReleaseHeldHtlc a) {
		long ret = bindings.AsyncPaymentsMessage_release_held_htlc(a.ptr);
		GC.KeepAlive(a);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncPaymentsMessage ret_hu_conv = org.ldk.structs.AsyncPaymentsMessage.constr_from_ptr(ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public org.ldk.structs.OnionMessageContents as_OnionMessageContents() {
		long ret = bindings.AsyncPaymentsMessage_as_OnionMessageContents(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the AsyncPaymentsMessage object into a byte array which can be read by AsyncPaymentsMessage_read
	 */
	public byte[] write() {
		long ret = bindings.AsyncPaymentsMessage_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AsyncPaymentsMessage from a byte array, created by AsyncPaymentsMessage_write
	 */
	public static org.ldk.structs.Result_AsyncPaymentsMessageDecodeErrorZ read(byte[] ser, long arg) {
		long ret = bindings.AsyncPaymentsMessage_read(InternalUtils.encodeUint8Array(ser), arg);
		GC.KeepAlive(ser);
		GC.KeepAlive(arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AsyncPaymentsMessageDecodeErrorZ ret_hu_conv = Result_AsyncPaymentsMessageDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
