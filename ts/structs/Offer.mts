
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An `Offer` is a potentially long-lived proposal for payment of a good or service.
 * 
 * An offer is a precursor to an [`InvoiceRequest`]. A merchant publishes an offer from which a
 * customer may request an [`Bolt12Invoice`] for a specific quantity and using an amount sufficient
 * to cover that quantity (i.e., at least `quantity * amount`). See [`Offer::amount`].
 * 
 * Offers may be denominated in currency other than bitcoin but are ultimately paid using the
 * latter.
 * 
 * Through the use of [`BlindedMessagePath`]s, offers provide recipient privacy.
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
export class Offer extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Offer_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Offer_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Offer
	 */
	public clone(): Offer {
		const ret: bigint = bindings.Offer_clone(this.ptr);
		const ret_hu_conv: Offer = new Offer(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The chains that may be used when paying a requested invoice (e.g., bitcoin mainnet).
	 * Payments must be denominated in units of the minimal lightning-payable unit (e.g., msats)
	 * for the selected chain.
	 */
	public chains(): Uint8Array[] {
		const ret: number = bindings.Offer_chains(this.ptr);
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
		const ret: bigint = bindings.Offer_metadata(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 */
	public amount(): Option_AmountZ {
		const ret: bigint = bindings.Offer_amount(this.ptr);
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
		const ret: bigint = bindings.Offer_description(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the offer.
	 */
	public offer_features(): OfferFeatures {
		const ret: bigint = bindings.Offer_offer_features(this.ptr);
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
		const ret: bigint = bindings.Offer_absolute_expiry(this.ptr);
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
		const ret: bigint = bindings.Offer_issuer(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes. Blinded paths provide
	 * recipient privacy by obfuscating its node id.
	 */
	public paths(): BlindedMessagePath[] {
		const ret: number = bindings.Offer_paths(this.ptr);
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
		const ret: bigint = bindings.Offer_supported_quantity(this.ptr);
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
		const ret: number = bindings.Offer_issuer_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the id of the offer.
	 */
	public id(): OfferId {
		const ret: bigint = bindings.Offer_id(this.ptr);
		const ret_hu_conv: OfferId = new OfferId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns whether the given chain is supported by the offer.
	 */
	public supports_chain(chain: Uint8Array): boolean {
		const ret: boolean = bindings.Offer_supports_chain(this.ptr, bindings.encodeUint8Array(chain));
		return ret;
	}

	/**
	 * Whether the offer has expired given the duration since the Unix epoch.
	 */
	public is_expired_no_std(duration_since_epoch: bigint): boolean {
		const ret: boolean = bindings.Offer_is_expired_no_std(this.ptr, duration_since_epoch);
		return ret;
	}

	/**
	 * Returns whether the given quantity is valid for the offer.
	 */
	public is_valid_quantity(quantity: bigint): boolean {
		const ret: boolean = bindings.Offer_is_valid_quantity(this.ptr, quantity);
		return ret;
	}

	/**
	 * Returns whether a quantity is expected in an [`InvoiceRequest`] for the offer.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 */
	public expects_quantity(): boolean {
		const ret: boolean = bindings.Offer_expects_quantity(this.ptr);
		return ret;
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
		const ret: bigint = bindings.Offer_request_invoice(this.ptr, CommonBase.get_ptr_of(expanded_key), CommonBase.get_ptr_of(nonce), bindings.encodeUint8Array(payment_id));
		const ret_hu_conv: Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ = Result_InvoiceRequestWithDerivedPayerSigningPubkeyBuilderBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Offer.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Offer_hash(this.ptr);
		return ret;
	}

	/**
	 * Read a Offer from a byte array, created by Offer_write
	 */
	public static constructor_read(ser: Uint8Array): Result_OfferDecodeErrorZ {
		const ret: bigint = bindings.Offer_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_OfferDecodeErrorZ = Result_OfferDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the Offer object into a byte array which can be read by Offer_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Offer_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Offer object from a string
	 */
	public static constructor_from_str(s: string): Result_OfferBolt12ParseErrorZ {
		const ret: bigint = bindings.Offer_from_str(bindings.encodeString(s));
		const ret_hu_conv: Result_OfferBolt12ParseErrorZ = Result_OfferBolt12ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Offer object
	 */
	public to_str(): string {
		const ret: number = bindings.Offer_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
