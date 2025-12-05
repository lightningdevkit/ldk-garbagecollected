using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * A request from an async recipient for [`BlindedMessagePath`]s from a static invoice server.
 * These paths will be used in the async recipient's [`Offer::paths`], so payers can request
 * [`StaticInvoice`]s from the static invoice server.
 * 
 * [`Offer::paths`]: crate::offers::offer::Offer::paths
 */
public class OfferPathsRequest : CommonBase {
	internal OfferPathsRequest(object _dummy, long ptr) : base(ptr) { }
	~OfferPathsRequest() {
		if (ptr != 0) { bindings.OfferPathsRequest_free(ptr); }
	}

	/**
	 * The \"slot\" in the static invoice server's database that this invoice should go into. This
	 * allows us as the recipient to replace a specific invoice that is stored by the server, which
	 * is useful for limiting the number of invoices stored by the server while also keeping all the
	 * invoices persisted with the server fresh.
	 */
	public short get_invoice_slot() {
		short ret = bindings.OfferPathsRequest_get_invoice_slot(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * The \"slot\" in the static invoice server's database that this invoice should go into. This
	 * allows us as the recipient to replace a specific invoice that is stored by the server, which
	 * is useful for limiting the number of invoices stored by the server while also keeping all the
	 * invoices persisted with the server fresh.
	 */
	public void set_invoice_slot(short val) {
		bindings.OfferPathsRequest_set_invoice_slot(this.ptr, val);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Constructs a new OfferPathsRequest given each field
	 */
	public static org.ldk.structs.OfferPathsRequest of(short invoice_slot_arg) {
		long ret = bindings.OfferPathsRequest_new(invoice_slot_arg);
		GC.KeepAlive(invoice_slot_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferPathsRequest ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferPathsRequest(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	internal long clone_ptr() {
		long ret = bindings.OfferPathsRequest_clone_ptr(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Creates a copy of the OfferPathsRequest
	 */
	public org.ldk.structs.OfferPathsRequest clone() {
		long ret = bindings.OfferPathsRequest_clone(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferPathsRequest ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferPathsRequest(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the OfferPathsRequest object into a byte array which can be read by OfferPathsRequest_read
	 */
	public byte[] write() {
		long ret = bindings.OfferPathsRequest_write(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a OfferPathsRequest from a byte array, created by OfferPathsRequest_write
	 */
	public static org.ldk.structs.Result_OfferPathsRequestDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OfferPathsRequest_read(InternalUtils.encodeUint8Array(ser));
		GC.KeepAlive(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferPathsRequestDecodeErrorZ ret_hu_conv = Result_OfferPathsRequestDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
} } }
