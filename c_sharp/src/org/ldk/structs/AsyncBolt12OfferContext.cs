using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * The context of a payment made for a static invoice requested from a BOLT 12 [`Offer`].
 * 
 * [`Offer`]: crate::offers::offer::Offer
 */
public class AsyncBolt12OfferContext : CommonBase {
	internal AsyncBolt12OfferContext(object _dummy, long ptr) : base(ptr) { }
	~AsyncBolt12OfferContext() {
		if (ptr != 0) { bindings.AsyncBolt12OfferContext_free(ptr); }
	}

	/**
	 * The [`Nonce`] used to verify that an inbound [`InvoiceRequest`] corresponds to this static
	 * invoice's offer.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public org.ldk.structs.Nonce get_offer_nonce() {
		long ret = bindings.AsyncBolt12OfferContext_get_offer_nonce(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Nonce ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Nonce(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The [`Nonce`] used to verify that an inbound [`InvoiceRequest`] corresponds to this static
	 * invoice's offer.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public void set_offer_nonce(org.ldk.structs.Nonce val) {
		bindings.AsyncBolt12OfferContext_set_offer_nonce(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new AsyncBolt12OfferContext given each field
	 */
	public static org.ldk.structs.AsyncBolt12OfferContext of(org.ldk.structs.Nonce offer_nonce_arg) {
		long ret = bindings.AsyncBolt12OfferContext_new(offer_nonce_arg.ptr);
		GC.KeepAlive(offer_nonce_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncBolt12OfferContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AsyncBolt12OfferContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.AsyncBolt12OfferContext_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the AsyncBolt12OfferContext
	 */
	public org.ldk.structs.AsyncBolt12OfferContext clone() {
		long ret = bindings.AsyncBolt12OfferContext_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.AsyncBolt12OfferContext ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.AsyncBolt12OfferContext(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Checks if two AsyncBolt12OfferContexts contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public bool eq(org.ldk.structs.AsyncBolt12OfferContext b) {
		bool ret = bindings.AsyncBolt12OfferContext_eq(this.ptr, b.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(b);
		return ret;
	}

	public override bool Equals(object o) {
		if (!(o is AsyncBolt12OfferContext)) return false;
		return this.eq((AsyncBolt12OfferContext)o);
	}
	/**
	 * Serialize the AsyncBolt12OfferContext object into a byte array which can be read by AsyncBolt12OfferContext_read
	 */
	public byte[] write() {
		long ret = bindings.AsyncBolt12OfferContext_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a AsyncBolt12OfferContext from a byte array, created by AsyncBolt12OfferContext_write
	 */
	public static org.ldk.structs.Result_AsyncBolt12OfferContextDecodeErrorZ read(byte[] ser) {
		long ret = bindings.AsyncBolt12OfferContext_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_AsyncBolt12OfferContextDecodeErrorZ ret_hu_conv = Result_AsyncBolt12OfferContextDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
