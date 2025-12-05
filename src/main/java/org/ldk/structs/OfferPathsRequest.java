package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * A request from an async recipient for [`BlindedMessagePath`]s from a static invoice server.
 * These paths will be used in the async recipient's [`Offer::paths`], so payers can request
 * [`StaticInvoice`]s from the static invoice server.
 * 
 * [`Offer::paths`]: crate::offers::offer::Offer::paths
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OfferPathsRequest extends CommonBase {
	OfferPathsRequest(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
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
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new OfferPathsRequest given each field
	 */
	public static OfferPathsRequest of(short invoice_slot_arg) {
		long ret = bindings.OfferPathsRequest_new(invoice_slot_arg);
		Reference.reachabilityFence(invoice_slot_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferPathsRequest ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferPathsRequest(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	long clone_ptr() {
		long ret = bindings.OfferPathsRequest_clone_ptr(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Creates a copy of the OfferPathsRequest
	 */
	public OfferPathsRequest clone() {
		long ret = bindings.OfferPathsRequest_clone(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferPathsRequest ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferPathsRequest(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the OfferPathsRequest object into a byte array which can be read by OfferPathsRequest_read
	 */
	public byte[] write() {
		byte[] ret = bindings.OfferPathsRequest_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Read a OfferPathsRequest from a byte array, created by OfferPathsRequest_write
	 */
	public static Result_OfferPathsRequestDecodeErrorZ read(byte[] ser) {
		long ret = bindings.OfferPathsRequest_read(ser);
		Reference.reachabilityFence(ser);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_OfferPathsRequestDecodeErrorZ ret_hu_conv = Result_OfferPathsRequestDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
