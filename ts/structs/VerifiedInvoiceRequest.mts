
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An [`InvoiceRequest`] that has been verified by [`InvoiceRequest::verify_using_metadata`] or
 * [`InvoiceRequest::verify_using_recipient_data`] and exposes different ways to respond depending
 * on whether the signing keys were derived.
 */
export class VerifiedInvoiceRequest extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.VerifiedInvoiceRequest_free);
	}

	/**
	 * The identifier of the [`Offer`] for which the [`InvoiceRequest`] was made.
	 */
	public get_offer_id(): OfferId {
		const ret: bigint = bindings.VerifiedInvoiceRequest_get_offer_id(this.ptr);
		const ret_hu_conv: OfferId = new OfferId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The identifier of the [`Offer`] for which the [`InvoiceRequest`] was made.
	 */
	public set_offer_id(val: OfferId): void {
		bindings.VerifiedInvoiceRequest_set_offer_id(this.ptr, CommonBase.get_ptr_of(val));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.VerifiedInvoiceRequest_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the VerifiedInvoiceRequest
	 */
	public clone(): VerifiedInvoiceRequest {
		const ret: bigint = bindings.VerifiedInvoiceRequest_clone(this.ptr);
		const ret_hu_conv: VerifiedInvoiceRequest = new VerifiedInvoiceRequest(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The chains that may be used when paying a requested invoice (e.g., bitcoin mainnet).
	 * Payments must be denominated in units of the minimal lightning-payable unit (e.g., msats)
	 * for the selected chain.
	 */
	public chains(): Uint8Array[] {
		const ret: number = bindings.VerifiedInvoiceRequest_chains(this.ptr);
		const ret_conv_12_len: number = bindings.getArrayLength(ret);
		const ret_conv_12_arr: Uint8Array[] = new Array(ret_conv_12_len).fill(null);
		for (var m = 0; m < ret_conv_12_len; m++) {
			const ret_conv_12: number = bindings.getU32ArrayElem(ret, m);
			const ret_conv_12_conv: Uint8Array = bindings.decodeUint8Array(ret_conv_12);
			ret_conv_12_arr[m] = ret_conv_12_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_12_arr;
	}

	/**
	 * Opaque bytes set by the originator. Useful for authentication and validating fields since it
	 * is reflected in `invoice_request` messages along with all the other fields from the `offer`.
	 */
	public metadata(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.VerifiedInvoiceRequest_metadata(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 */
	public amount(): Option_AmountZ {
		const ret: bigint = bindings.VerifiedInvoiceRequest_amount(this.ptr);
		const ret_hu_conv: Option_AmountZ = Option_AmountZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the payment. Intended to be displayed to the user
	 * but with the caveat that it has not been verified in any way.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public description(): PrintableString {
		const ret: bigint = bindings.VerifiedInvoiceRequest_description(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the offer.
	 */
	public offer_features(): OfferFeatures {
		const ret: bigint = bindings.VerifiedInvoiceRequest_offer_features(this.ptr);
		const ret_hu_conv: OfferFeatures = new OfferFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be requested.
	 * 
	 * If `None`, the offer does not expire.
	 */
	public absolute_expiry(): Option_u64Z {
		const ret: bigint = bindings.VerifiedInvoiceRequest_absolute_expiry(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The issuer of the offer, possibly beginning with `user@domain` or `domain`. Intended to be
	 * displayed to the user but with the caveat that it has not been verified in any way.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public issuer(): PrintableString {
		const ret: bigint = bindings.VerifiedInvoiceRequest_issuer(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes. Blinded paths provide
	 * recipient privacy by obfuscating its node id.
	 */
	public paths(): BlindedMessagePath[] {
		const ret: number = bindings.VerifiedInvoiceRequest_paths(this.ptr);
		const ret_conv_20_len: number = bindings.getArrayLength(ret);
		const ret_conv_20_arr: BlindedMessagePath[] = new Array(ret_conv_20_len).fill(null);
		for (var u = 0; u < ret_conv_20_len; u++) {
			const ret_conv_20: bigint = bindings.getU64ArrayElem(ret, u);
			const ret_conv_20_hu_conv: BlindedMessagePath = new BlindedMessagePath(null, ret_conv_20);
			CommonBase.add_ref_from(ret_conv_20_hu_conv, this);
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_20_arr;
	}

	/**
	 * The quantity of items supported.
	 */
	public supported_quantity(): Quantity {
		const ret: bigint = bindings.VerifiedInvoiceRequest_supported_quantity(this.ptr);
		const ret_hu_conv: Quantity = Quantity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The public key corresponding to the key used by the recipient to sign invoices.
	 * - If [`Offer::paths`] is empty, MUST be `Some` and contain the recipient's node id for
	 * sending an [`InvoiceRequest`].
	 * - If [`Offer::paths`] is not empty, MAY be `Some` and contain a transient id.
	 * - If `None`, the signing pubkey will be the final blinded node id from the
	 * [`BlindedMessagePath`] in [`Offer::paths`] used to send the [`InvoiceRequest`].
	 * 
	 * See also [`Bolt12Invoice::signing_pubkey`].
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`Bolt12Invoice::signing_pubkey`]: crate::offers::invoice::Bolt12Invoice::signing_pubkey
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public issuer_signing_pubkey(): Uint8Array {
		const ret: number = bindings.VerifiedInvoiceRequest_issuer_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * An unpredictable series of bytes, typically containing information about the derivation of
	 * [`payer_signing_pubkey`].
	 * 
	 * [`payer_signing_pubkey`]: Self::payer_signing_pubkey
	 */
	public payer_metadata(): Uint8Array {
		const ret: number = bindings.VerifiedInvoiceRequest_payer_metadata(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A chain from [`Offer::chains`] that the offer is valid for.
	 */
	public chain(): Uint8Array {
		const ret: number = bindings.VerifiedInvoiceRequest_chain(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The amount to pay in msats (i.e., the minimum lightning-payable unit for [`chain`]), which
	 * must be greater than or equal to [`Offer::amount`], converted if necessary.
	 * 
	 * [`chain`]: Self::chain
	 */
	public amount_msats(): Option_u64Z {
		const ret: bigint = bindings.VerifiedInvoiceRequest_amount_msats(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns whether an amount was set in the request; otherwise, if [`amount_msats`] is `Some`
	 * then it was inferred from the [`Offer::amount`] and [`quantity`].
	 * 
	 * [`amount_msats`]: Self::amount_msats
	 * [`quantity`]: Self::quantity
	 */
	public has_amount_msats(): boolean {
		const ret: boolean = bindings.VerifiedInvoiceRequest_has_amount_msats(this.ptr);
		return ret;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 */
	public invoice_request_features(): InvoiceRequestFeatures {
		const ret: bigint = bindings.VerifiedInvoiceRequest_invoice_request_features(this.ptr);
		const ret_hu_conv: InvoiceRequestFeatures = new InvoiceRequestFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The quantity of the offer's item conforming to [`Offer::is_valid_quantity`].
	 */
	public quantity(): Option_u64Z {
		const ret: bigint = bindings.VerifiedInvoiceRequest_quantity(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request.
	 */
	public payer_signing_pubkey(): Uint8Array {
		const ret: number = bindings.VerifiedInvoiceRequest_payer_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A payer-provided note which will be seen by the recipient and reflected back in the invoice
	 * response.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payer_note(): PrintableString {
		const ret: bigint = bindings.VerifiedInvoiceRequest_payer_note(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * If the [`Offer`] was sourced from a BIP 353 Human Readable Name, this should be set by the
	 * builder to indicate the original [`HumanReadableName`] which was resolved.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public offer_from_hrn(): HumanReadableName {
		const ret: bigint = bindings.VerifiedInvoiceRequest_offer_from_hrn(this.ptr);
		const ret_hu_conv: HumanReadableName = new HumanReadableName(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Creates an [`InvoiceBuilder`] for the request with the given required fields.
	 * 
	 * Unless [`InvoiceBuilder::relative_expiry`] is set, the invoice will expire two hours after
	 * `created_at`, which is used to set [`Bolt12Invoice::created_at`].
	 * 
	 * The caller is expected to remember the preimage of `payment_hash` in order to claim a payment
	 * for the invoice.
	 * 
	 * The `payment_paths` parameter is useful for maintaining the payment recipient's privacy. It
	 * must contain one or more elements ordered from most-preferred to least-preferred, if there's
	 * a preference. Note, however, that any privacy is lost if a public node id was used for
	 * [`Offer::issuer_signing_pubkey`].
	 * 
	 * Errors if the request contains unknown required features.
	 * 
	 * # Note
	 * 
	 * If the originating [`Offer`] was created using [`OfferBuilder::deriving_signing_pubkey`],
	 * then first use [`InvoiceRequest::verify_using_metadata`] or
	 * [`InvoiceRequest::verify_using_recipient_data`] and then [`VerifiedInvoiceRequest`] methods
	 * instead.
	 * 
	 * [`Bolt12Invoice::created_at`]: crate::offers::invoice::Bolt12Invoice::created_at
	 * [`OfferBuilder::deriving_signing_pubkey`]: crate::offers::offer::OfferBuilder::deriving_signing_pubkey
	 */
	public respond_with_no_std(payment_paths: BlindedPaymentPath[], payment_hash: Uint8Array, created_at: bigint): Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ {
		const ret: bigint = bindings.VerifiedInvoiceRequest_respond_with_no_std(this.ptr, bindings.encodeUint64Array(payment_paths.map(payment_paths_conv_20 => CommonBase.get_ptr_of(payment_paths_conv_20))), bindings.encodeUint8Array(payment_hash), created_at);
		const ret_hu_conv: Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ = Result_InvoiceWithExplicitSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an [`InvoiceBuilder`] for the request using the given required fields and that uses
	 * derived signing keys from the originating [`Offer`] to sign the [`Bolt12Invoice`]. Must use
	 * the same [`ExpandedKey`] as the one used to create the offer.
	 * 
	 * See [`InvoiceRequest::respond_with_no_std`] for further details.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public respond_using_derived_keys_no_std(payment_paths: BlindedPaymentPath[], payment_hash: Uint8Array, created_at: bigint): Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ {
		const ret: bigint = bindings.VerifiedInvoiceRequest_respond_using_derived_keys_no_std(this.ptr, bindings.encodeUint64Array(payment_paths.map(payment_paths_conv_20 => CommonBase.get_ptr_of(payment_paths_conv_20))), bindings.encodeUint8Array(payment_hash), created_at);
		const ret_hu_conv: Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ = Result_InvoiceWithDerivedSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Fetch the [`InvoiceRequestFields`] for this verified invoice.
	 * 
	 * These are fields which we expect to be useful when receiving a payment for this invoice
	 * request, and include the returned [`InvoiceRequestFields`] in the
	 * [`PaymentContext::Bolt12Offer`].
	 * 
	 * [`PaymentContext::Bolt12Offer`]: crate::blinded_path::payment::PaymentContext::Bolt12Offer
	 */
	public fields(): InvoiceRequestFields {
		const ret: bigint = bindings.VerifiedInvoiceRequest_fields(this.ptr);
		const ret_hu_conv: InvoiceRequestFields = new InvoiceRequestFields(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
