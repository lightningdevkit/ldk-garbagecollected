
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Builds an [`Offer`] for the \"offer to be paid\" flow.
 * 
 * See [module-level documentation] for usage.
 * 
 * [module-level documentation]: self
 */
export class OfferWithDerivedMetadataBuilder extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OfferWithDerivedMetadataBuilder_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OfferWithDerivedMetadataBuilder_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OfferWithDerivedMetadataBuilder
	 */
	public clone(): OfferWithDerivedMetadataBuilder {
		const ret: bigint = bindings.OfferWithDerivedMetadataBuilder_clone(this.ptr);
		const ret_hu_conv: OfferWithDerivedMetadataBuilder = new OfferWithDerivedMetadataBuilder(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Similar to [`OfferBuilder::new`] except, if [`OfferBuilder::path`] is called, the signing
	 * pubkey is derived from the given [`ExpandedKey`] and [`Nonce`]. This provides recipient
	 * privacy by using a different signing pubkey for each offer. Otherwise, the provided
	 * `node_id` is used for [`Offer::issuer_signing_pubkey`].
	 * 
	 * Also, sets the metadata when [`OfferBuilder::build`] is called such that it can be used by
	 * [`InvoiceRequest::verify_using_metadata`] to determine if the request was produced for the
	 * offer given an [`ExpandedKey`]. However, if [`OfferBuilder::path`] is called, then the
	 * metadata will not be set and must be included in each [`BlindedMessagePath`] instead. In this case,
	 * use [`InvoiceRequest::verify_using_recipient_data`].
	 * 
	 * [`InvoiceRequest::verify_using_metadata`]: crate::offers::invoice_request::InvoiceRequest::verify_using_metadata
	 * [`InvoiceRequest::verify_using_recipient_data`]: crate::offers::invoice_request::InvoiceRequest::verify_using_recipient_data
	 * [`ExpandedKey`]: crate::ln::inbound_payment::ExpandedKey
	 */
	public static constructor_deriving_signing_pubkey(node_id: Uint8Array, expanded_key: ExpandedKey, nonce: Nonce): OfferWithDerivedMetadataBuilder {
		const ret: bigint = bindings.OfferWithDerivedMetadataBuilder_deriving_signing_pubkey(bindings.encodeUint8Array(node_id), CommonBase.get_ptr_of(expanded_key), CommonBase.get_ptr_of(nonce));
		const ret_hu_conv: OfferWithDerivedMetadataBuilder = new OfferWithDerivedMetadataBuilder(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Adds the chain hash of the given [`Network`] to [`Offer::chains`]. If not called,
	 * the chain hash of [`Network::Bitcoin`] is assumed to be the only one supported.
	 * 
	 * See [`Offer::chains`] on how this relates to the payment currency.
	 * 
	 * Successive calls to this method will add another chain hash.
	 */
	public chain(network: Network): void {
		bindings.OfferWithDerivedMetadataBuilder_chain(this.ptr, network);
	}

	/**
	 * Sets the [`Offer::amount`] as an [`Amount::Bitcoin`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public amount_msats(amount_msats: bigint): void {
		bindings.OfferWithDerivedMetadataBuilder_amount_msats(this.ptr, amount_msats);
	}

	/**
	 * Sets the [`Offer::absolute_expiry`] as seconds since the Unix epoch.
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public absolute_expiry(absolute_expiry: bigint): void {
		bindings.OfferWithDerivedMetadataBuilder_absolute_expiry(this.ptr, absolute_expiry);
	}

	/**
	 * Sets the [`Offer::description`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public description(description: string): void {
		bindings.OfferWithDerivedMetadataBuilder_description(this.ptr, bindings.encodeString(description));
	}

	/**
	 * Sets the [`Offer::issuer`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public issuer(issuer: string): void {
		bindings.OfferWithDerivedMetadataBuilder_issuer(this.ptr, bindings.encodeString(issuer));
	}

	/**
	 * Adds a blinded path to [`Offer::paths`]. Must include at least one path if only connected by
	 * private channels or if [`Offer::issuer_signing_pubkey`] is not a public node id.
	 * 
	 * Successive calls to this method will add another blinded path. Caller is responsible for not
	 * adding duplicate paths.
	 */
	public path(path: BlindedMessagePath): void {
		bindings.OfferWithDerivedMetadataBuilder_path(this.ptr, CommonBase.get_ptr_of(path));
	}

	/**
	 * Sets the quantity of items for [`Offer::supported_quantity`]. If not called, defaults to
	 * [`Quantity::One`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public supported_quantity(quantity: Quantity): void {
		bindings.OfferWithDerivedMetadataBuilder_supported_quantity(this.ptr, CommonBase.get_ptr_of(quantity));
	}

	/**
	 * Builds an [`Offer`] from the builder's settings.
	 */
	public build(): Result_OfferBolt12SemanticErrorZ {
		const ret: bigint = bindings.OfferWithDerivedMetadataBuilder_build(this.ptr);
		const ret_hu_conv: Result_OfferBolt12SemanticErrorZ = Result_OfferBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
