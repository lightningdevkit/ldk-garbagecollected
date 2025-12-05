
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Builds a [`Refund`] for the \"offer for money\" flow.
 * 
 * See [module-level documentation] for usage.
 * 
 * [module-level documentation]: self
 */
export class RefundMaybeWithDerivedMetadataBuilder extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.RefundMaybeWithDerivedMetadataBuilder_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.RefundMaybeWithDerivedMetadataBuilder_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the RefundMaybeWithDerivedMetadataBuilder
	 */
	public clone(): RefundMaybeWithDerivedMetadataBuilder {
		const ret: bigint = bindings.RefundMaybeWithDerivedMetadataBuilder_clone(this.ptr);
		const ret_hu_conv: RefundMaybeWithDerivedMetadataBuilder = new RefundMaybeWithDerivedMetadataBuilder(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new builder for a refund using the `signing_pubkey` for the public node id to send
	 * to if no [`Refund::paths`] are set. Otherwise, `signing_pubkey` may be a transient pubkey.
	 * 
	 * Additionally, sets the required (empty) [`Refund::description`], [`Refund::payer_metadata`],
	 * and [`Refund::amount_msats`].
	 * 
	 * # Note
	 * 
	 * If constructing a [`Refund`] for use with a [`ChannelManager`], use
	 * [`ChannelManager::create_refund_builder`] instead of [`RefundBuilder::new`].
	 * 
	 * [`ChannelManager`]: crate::ln::channelmanager::ChannelManager
	 * [`ChannelManager::create_refund_builder`]: crate::ln::channelmanager::ChannelManager::create_refund_builder
	 */
	public static constructor_new(metadata: Uint8Array, signing_pubkey: Uint8Array, amount_msats: bigint): Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ {
		const ret: bigint = bindings.RefundMaybeWithDerivedMetadataBuilder_new(bindings.encodeUint8Array(metadata), bindings.encodeUint8Array(signing_pubkey), amount_msats);
		const ret_hu_conv: Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ = Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Similar to [`RefundBuilder::new`] except, if [`RefundBuilder::path`] is called, the payer id
	 * is derived from the given [`ExpandedKey`] and nonce. This provides sender privacy by using a
	 * different payer id for each refund, assuming a different nonce is used.  Otherwise, the
	 * provided `node_id` is used for the payer id.
	 * 
	 * Also, sets the metadata when [`RefundBuilder::build`] is called such that it can be used by
	 * [`Bolt12Invoice::verify_using_metadata`] to determine if the invoice was produced for the
	 * refund given an [`ExpandedKey`]. However, if [`RefundBuilder::path`] is called, then the
	 * metadata must be included in each [`BlindedMessagePath`] instead. In this case, use
	 * [`Bolt12Invoice::verify_using_payer_data`].
	 * 
	 * The `payment_id` is encrypted in the metadata and should be unique. This ensures that only
	 * one invoice will be paid for the refund and that payments can be uniquely identified.
	 * 
	 * [`Bolt12Invoice::verify_using_metadata`]: crate::offers::invoice::Bolt12Invoice::verify_using_metadata
	 * [`Bolt12Invoice::verify_using_payer_data`]: crate::offers::invoice::Bolt12Invoice::verify_using_payer_data
	 * [`ExpandedKey`]: crate::ln::inbound_payment::ExpandedKey
	 */
	public static constructor_deriving_signing_pubkey(node_id: Uint8Array, expanded_key: ExpandedKey, nonce: Nonce, amount_msats: bigint, payment_id: Uint8Array): Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ {
		const ret: bigint = bindings.RefundMaybeWithDerivedMetadataBuilder_deriving_signing_pubkey(bindings.encodeUint8Array(node_id), CommonBase.get_ptr_of(expanded_key), CommonBase.get_ptr_of(nonce), amount_msats, bindings.encodeUint8Array(payment_id));
		const ret_hu_conv: Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ = Result_RefundMaybeWithDerivedMetadataBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets the [`Refund::description`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public description(description: string): void {
		bindings.RefundMaybeWithDerivedMetadataBuilder_description(this.ptr, bindings.encodeString(description));
	}

	/**
	 * Sets the [`Refund::absolute_expiry`] as seconds since the Unix epoch.
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public absolute_expiry(absolute_expiry: bigint): void {
		bindings.RefundMaybeWithDerivedMetadataBuilder_absolute_expiry(this.ptr, absolute_expiry);
	}

	/**
	 * Sets the [`Refund::issuer`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public issuer(issuer: string): void {
		bindings.RefundMaybeWithDerivedMetadataBuilder_issuer(this.ptr, bindings.encodeString(issuer));
	}

	/**
	 * Adds a blinded path to [`Refund::paths`]. Must include at least one path if only connected
	 * by private channels or if [`Refund::payer_signing_pubkey`] is not a public node id.
	 * 
	 * Successive calls to this method will add another blinded path. Caller is responsible for not
	 * adding duplicate paths.
	 */
	public path(path: BlindedMessagePath): void {
		bindings.RefundMaybeWithDerivedMetadataBuilder_path(this.ptr, CommonBase.get_ptr_of(path));
	}

	/**
	 * Sets the [`Refund::chain`] of the given [`Network`] for paying an invoice. If not
	 * called, [`Network::Bitcoin`] is assumed.
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public chain(network: Network): void {
		bindings.RefundMaybeWithDerivedMetadataBuilder_chain(this.ptr, network);
	}

	/**
	 * Sets [`Refund::quantity`] of items. This is purely for informational purposes. It is useful
	 * when the refund pertains to a [`Bolt12Invoice`] that paid for more than one item from an
	 * [`Offer`] as specified by [`InvoiceRequest::quantity`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * [`InvoiceRequest::quantity`]: crate::offers::invoice_request::InvoiceRequest::quantity
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public quantity(quantity: bigint): void {
		bindings.RefundMaybeWithDerivedMetadataBuilder_quantity(this.ptr, quantity);
	}

	/**
	 * Sets the [`Refund::payer_note`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public payer_note(payer_note: string): void {
		bindings.RefundMaybeWithDerivedMetadataBuilder_payer_note(this.ptr, bindings.encodeString(payer_note));
	}

	/**
	 * Builds a [`Refund`] after checking for valid semantics.
	 */
	public build(): Result_RefundBolt12SemanticErrorZ {
		const ret: bigint = bindings.RefundMaybeWithDerivedMetadataBuilder_build(this.ptr);
		const ret_hu_conv: Result_RefundBolt12SemanticErrorZ = Result_RefundBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
