
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Builds an [`Offer`] for the \"offer to be paid\" flow.
 * 
 * See [module-level documentation] for usage.
 * 
 * [module-level documentation]: self
 */
export class OfferWithExplicitMetadataBuilder extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.OfferWithExplicitMetadataBuilder_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.OfferWithExplicitMetadataBuilder_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the OfferWithExplicitMetadataBuilder
	 */
	public clone(): OfferWithExplicitMetadataBuilder {
		const ret: bigint = bindings.OfferWithExplicitMetadataBuilder_clone(this.ptr);
		const ret_hu_conv: OfferWithExplicitMetadataBuilder = new OfferWithExplicitMetadataBuilder(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new builder for an offer using the `signing_pubkey` for signing invoices. The
	 * associated secret key must be remembered while the offer is valid.
	 * 
	 * Use a different pubkey per offer to avoid correlating offers.
	 * 
	 * # Note
	 * 
	 * If constructing an [`Offer`] for use with a [`ChannelManager`], use
	 * [`ChannelManager::create_offer_builder`] instead of [`OfferBuilder::new`].
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::create_offer_builder`]: crate::ln::channelmanager::ChannelManager::create_offer_builder
	 */
	public static constructor_new(signing_pubkey: Uint8Array): OfferWithExplicitMetadataBuilder {
		const ret: bigint = bindings.OfferWithExplicitMetadataBuilder_new(bindings.encodeUint8Array(signing_pubkey));
		const ret_hu_conv: OfferWithExplicitMetadataBuilder = new OfferWithExplicitMetadataBuilder(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Sets the [`Offer::metadata`] to the given bytes.
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public metadata(metadata: Uint8Array): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.OfferWithExplicitMetadataBuilder_metadata(this.ptr, bindings.encodeUint8Array(metadata));
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
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
		bindings.OfferWithExplicitMetadataBuilder_chain(this.ptr, network);
	}

	/**
	 * Sets the [`Offer::amount`] as an [`Amount::Bitcoin`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public amount_msats(amount_msats: bigint): void {
		bindings.OfferWithExplicitMetadataBuilder_amount_msats(this.ptr, amount_msats);
	}

	/**
	 * Sets the [`Offer::absolute_expiry`] as seconds since the Unix epoch.
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public absolute_expiry(absolute_expiry: bigint): void {
		bindings.OfferWithExplicitMetadataBuilder_absolute_expiry(this.ptr, absolute_expiry);
	}

	/**
	 * Sets the [`Offer::description`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public description(description: string): void {
		bindings.OfferWithExplicitMetadataBuilder_description(this.ptr, bindings.encodeString(description));
	}

	/**
	 * Sets the [`Offer::issuer`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public issuer(issuer: string): void {
		bindings.OfferWithExplicitMetadataBuilder_issuer(this.ptr, bindings.encodeString(issuer));
	}

	/**
	 * Adds a blinded path to [`Offer::paths`]. Must include at least one path if only connected by
	 * private channels or if [`Offer::issuer_signing_pubkey`] is not a public node id.
	 * 
	 * Successive calls to this method will add another blinded path. Caller is responsible for not
	 * adding duplicate paths.
	 */
	public path(path: BlindedMessagePath): void {
		bindings.OfferWithExplicitMetadataBuilder_path(this.ptr, CommonBase.get_ptr_of(path));
	}

	/**
	 * Sets the quantity of items for [`Offer::supported_quantity`]. If not called, defaults to
	 * [`Quantity::One`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public supported_quantity(quantity: Quantity): void {
		bindings.OfferWithExplicitMetadataBuilder_supported_quantity(this.ptr, CommonBase.get_ptr_of(quantity));
	}

	/**
	 * Builds an [`Offer`] from the builder's settings.
	 */
	public build(): Result_OfferBolt12SemanticErrorZ {
		const ret: bigint = bindings.OfferWithExplicitMetadataBuilder_build(this.ptr);
		const ret_hu_conv: Result_OfferBolt12SemanticErrorZ = Result_OfferBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
