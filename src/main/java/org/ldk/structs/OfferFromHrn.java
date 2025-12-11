package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * An [`Offer`] which was fetched from a human readable name, ie through BIP 353.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class OfferFromHrn extends CommonBase {
	OfferFromHrn(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.OfferFromHrn_free(ptr); }
	}

	/**
	 * The offer itself.
	 * 
	 * When you resolve this into an [`InvoiceRequestBuilder`] you *must* call
	 * [`InvoiceRequestBuilder::sourced_from_human_readable_name`].
	 * 
	 * If you call [`Self::request_invoice`] rather than [`Offer::request_invoice`] this will be
	 * handled for you.
	 */
	public Offer get_offer() {
		long ret = bindings.OfferFromHrn_get_offer(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Offer ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Offer(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The offer itself.
	 * 
	 * When you resolve this into an [`InvoiceRequestBuilder`] you *must* call
	 * [`InvoiceRequestBuilder::sourced_from_human_readable_name`].
	 * 
	 * If you call [`Self::request_invoice`] rather than [`Offer::request_invoice`] this will be
	 * handled for you.
	 */
	public void set_offer(org.ldk.structs.Offer val) {
		bindings.OfferFromHrn_set_offer(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * The human readable name which was resolved to fetch the [`Self::offer`].
	 */
	public HumanReadableName get_hrn() {
		long ret = bindings.OfferFromHrn_get_hrn(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.HumanReadableName ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.HumanReadableName(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * The human readable name which was resolved to fetch the [`Self::offer`].
	 */
	public void set_hrn(org.ldk.structs.HumanReadableName val) {
		bindings.OfferFromHrn_set_hrn(this.ptr, val.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(val);
	}

	/**
	 * Constructs a new OfferFromHrn given each field
	 */
	public static OfferFromHrn of(org.ldk.structs.Offer offer_arg, org.ldk.structs.HumanReadableName hrn_arg) {
		long ret = bindings.OfferFromHrn_new(offer_arg.ptr, hrn_arg.ptr);
		Reference.reachabilityFence(offer_arg);
		Reference.reachabilityFence(hrn_arg);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.OfferFromHrn ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.OfferFromHrn(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Creates an [`InvoiceRequestBuilder`] for the offer, which
	 * - derives the [`InvoiceRequest::payer_signing_pubkey`] such that a different key can be used
	 * for each request in order to protect the sender's privacy,
	 * - sets [`InvoiceRequest::payer_metadata`] when [`InvoiceRequestBuilder::build_and_sign`] is
	 * called such that it can be used by [`Bolt12Invoice::verify_using_metadata`] to determine
	 * if the invoice was requested using a base [`ExpandedKey`] from which the payer id was
	 * derived, and
	 * - includes the [`PaymentId`] encrypted in [`InvoiceRequest::payer_metadata`] so that it can
	 * be used when sending the payment for the requested invoice.
	 * 
	 * Errors if the offer contains unknown required features.
	 * 
	 * [`InvoiceRequest::payer_signing_pubkey`]: crate::offers::invoice_request::InvoiceRequest::payer_signing_pubkey
	 * [`InvoiceRequest::payer_metadata`]: crate::offers::invoice_request::InvoiceRequest::payer_metadata
	 * [`Bolt12Invoice::verify_using_metadata`]: crate::offers::invoice::Bolt12Invoice::verify_using_metadata
	 * [`ExpandedKey`]: crate::ln::inbound_payment::ExpandedKey
	 */
	public Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ request_invoice(org.ldk.structs.ExpandedKey expanded_key, org.ldk.structs.Nonce nonce, byte[] payment_id) {
		long ret = bindings.OfferFromHrn_request_invoice(this.ptr, expanded_key.ptr, nonce.ptr, InternalUtils.check_arr_len(payment_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(expanded_key);
		Reference.reachabilityFence(nonce);
		Reference.reachabilityFence(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ ret_hu_conv = Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
