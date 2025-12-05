using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A request from an async recipient to a static invoice server that a [`StaticInvoice`] be
 * provided in response to [`InvoiceRequest`]s from payers.
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 */
public class ServeStaticInvoice : CommonBase {
	internal ServeStaticInvoice(object _dummy, long ptr) : base(ptr) { }
	~ServeStaticInvoice() {
		if (ptr != 0) { bindings.ServeStaticInvoice_free(ptr); }
	}

	/**
	 * The invoice that should be served by the static invoice server. Once this invoice has been
	 * persisted, the [`Responder`] accompanying this message should be used to send
	 * [`StaticInvoicePersisted`] to the recipient to confirm that the offer corresponding to the
	 * invoice is ready to receive async payments.
	 */
	public org.ldk.structs.StaticInvoice get_invoice() {
		long ret = bindings.ServeStaticInvoice_get_invoice(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.StaticInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.StaticInvoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The invoice that should be served by the static invoice server. Once this invoice has been
	 * persisted, the [`Responder`] accompanying this message should be used to send
	 * [`StaticInvoicePersisted`] to the recipient to confirm that the offer corresponding to the
	 * invoice is ready to receive async payments.
	 */
	public void set_invoice(org.ldk.structs.StaticInvoice val) {
		bindings.ServeStaticInvoice_set_invoice(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * If a static invoice server receives an [`InvoiceRequest`] for a [`StaticInvoice`], they should
	 * also forward the [`InvoiceRequest`] to the async recipient so they can respond with a fresh
	 * [`Bolt12Invoice`] if the recipient is online at the time. Use this path to forward the
	 * [`InvoiceRequest`] to the async recipient.
	 * 
	 * This path's [`BlindedMessagePath::introduction_node`] MUST be set to the static invoice server
	 * node or one of its peers. This is because, for DoS protection, invoice requests forwarded over
	 * this path are treated by the server node like any other onion message forward and the server
	 * will not directly connect to the introduction node if they are not already peers.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public org.ldk.structs.BlindedMessagePath get_forward_invoice_request_path() {
		long ret = bindings.ServeStaticInvoice_get_forward_invoice_request_path(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BlindedMessagePath ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BlindedMessagePath(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * If a static invoice server receives an [`InvoiceRequest`] for a [`StaticInvoice`], they should
	 * also forward the [`InvoiceRequest`] to the async recipient so they can respond with a fresh
	 * [`Bolt12Invoice`] if the recipient is online at the time. Use this path to forward the
	 * [`InvoiceRequest`] to the async recipient.
	 * 
	 * This path's [`BlindedMessagePath::introduction_node`] MUST be set to the static invoice server
	 * node or one of its peers. This is because, for DoS protection, invoice requests forwarded over
	 * this path are treated by the server node like any other onion message forward and the server
	 * will not directly connect to the introduction node if they are not already peers.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public void set_forward_invoice_request_path(org.ldk.structs.BlindedMessagePath val) {
		bindings.ServeStaticInvoice_set_forward_invoice_request_path(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new ServeStaticInvoice given each field
	 */
	public static org.ldk.structs.ServeStaticInvoice of(org.ldk.structs.StaticInvoice invoice_arg, org.ldk.structs.BlindedMessagePath forward_invoice_request_path_arg) {
		long ret = bindings.ServeStaticInvoice_new(invoice_arg.ptr, forward_invoice_request_path_arg.ptr);
		GC.KeepAlive(invoice_arg);
		GC.KeepAlive(forward_invoice_request_path_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ServeStaticInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ServeStaticInvoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.ServeStaticInvoice_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the ServeStaticInvoice
	 */
	public org.ldk.structs.ServeStaticInvoice clone() {
		long ret = bindings.ServeStaticInvoice_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ServeStaticInvoice ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ServeStaticInvoice(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OnionMessageContents which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OnionMessageContents must be freed before this_arg is
	 */
	public org.ldk.structs.OnionMessageContents as_OnionMessageContents() {
		long ret = bindings.ServeStaticInvoice_as_OnionMessageContents(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OnionMessageContents ret_hu_conv = new OnionMessageContents(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ServeStaticInvoice object into a byte array which can be read by ServeStaticInvoice_read
	 */
	public byte[] write() {
		long ret = bindings.ServeStaticInvoice_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a ServeStaticInvoice from a byte array, created by ServeStaticInvoice_write
	 */
	public static org.ldk.structs.Result_ServeStaticInvoiceDecodeErrorZ read(byte[] ser) {
		long ret = bindings.ServeStaticInvoice_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ServeStaticInvoiceDecodeErrorZ ret_hu_conv = Result_ServeStaticInvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
