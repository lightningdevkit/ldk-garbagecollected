
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`Offer`] which was fetched from a human readable name, ie through BIP 353.
 */
export class OfferFromHrn extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OfferFromHrn_free);
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
	public get_offer(): Offer {
		const ret: bigint = bindings.OfferFromHrn_get_offer(this.ptr);
		const ret_hu_conv: Offer = new Offer(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
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
	public set_offer(val: Offer): void {
		bindings.OfferFromHrn_set_offer(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * The human readable name which was resolved to fetch the [`Self::offer`].
	 */
	public get_hrn(): HumanReadableName {
		const ret: bigint = bindings.OfferFromHrn_get_hrn(this.ptr);
		const ret_hu_conv: HumanReadableName = new HumanReadableName(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The human readable name which was resolved to fetch the [`Self::offer`].
	 */
	public set_hrn(val: HumanReadableName): void {
		bindings.OfferFromHrn_set_hrn(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Constructs a new OfferFromHrn given each field
	 */
	public static constructor_new(offer_arg: Offer, hrn_arg: HumanReadableName): OfferFromHrn {
		const ret: bigint = bindings.OfferFromHrn_new(CommonBase.get_ptr_of(offer_arg), CommonBase.get_ptr_of(hrn_arg));
		const ret_hu_conv: OfferFromHrn = new OfferFromHrn(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
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
	public request_invoice(expanded_key: ExpandedKey, nonce: Nonce, payment_id: Uint8Array): Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ {
		const ret: bigint = bindings.OfferFromHrn_request_invoice(this.ptr, CommonBase.get_ptr_of(expanded_key), CommonBase.get_ptr_of(nonce), bindings.encodeUint8Array(payment_id));
		const ret_hu_conv: Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ = Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
