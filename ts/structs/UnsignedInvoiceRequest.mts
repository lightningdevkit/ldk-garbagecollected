
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A semantically valid [`InvoiceRequest`] that hasn't been signed.
 * 
 * # Serialization
 * 
 * This is serialized as a TLV stream, which includes TLV records from the originating message. As
 * such, it may include unknown, odd TLV records.
 */
export class UnsignedInvoiceRequest extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UnsignedInvoiceRequest_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.UnsignedInvoiceRequest_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the UnsignedInvoiceRequest
	 */
	public clone(): UnsignedInvoiceRequest {
		const ret: bigint = bindings.UnsignedInvoiceRequest_clone(this.ptr);
		const ret_hu_conv: UnsignedInvoiceRequest = new UnsignedInvoiceRequest(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns the [`TaggedHash`] of the invoice to sign.
	 */
	public tagged_hash(): TaggedHash {
		const ret: bigint = bindings.UnsignedInvoiceRequest_tagged_hash(this.ptr);
		const ret_hu_conv: TaggedHash = new TaggedHash(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The chains that may be used when paying a requested invoice (e.g., bitcoin mainnet).
	 * Payments must be denominated in units of the minimal lightning-payable unit (e.g., msats)
	 * for the selected chain.
	 */
	public chains(): Uint8Array[] {
		const ret: number = bindings.UnsignedInvoiceRequest_chains(this.ptr);
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
		const ret: bigint = bindings.UnsignedInvoiceRequest_metadata(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 */
	public amount(): Option_AmountZ {
		const ret: bigint = bindings.UnsignedInvoiceRequest_amount(this.ptr);
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
		const ret: bigint = bindings.UnsignedInvoiceRequest_description(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the offer.
	 */
	public offer_features(): OfferFeatures {
		const ret: bigint = bindings.UnsignedInvoiceRequest_offer_features(this.ptr);
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
		const ret: bigint = bindings.UnsignedInvoiceRequest_absolute_expiry(this.ptr);
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
		const ret: bigint = bindings.UnsignedInvoiceRequest_issuer(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes. Blinded paths provide
	 * recipient privacy by obfuscating its node id.
	 */
	public paths(): BlindedMessagePath[] {
		const ret: number = bindings.UnsignedInvoiceRequest_paths(this.ptr);
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
		const ret: bigint = bindings.UnsignedInvoiceRequest_supported_quantity(this.ptr);
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
		const ret: number = bindings.UnsignedInvoiceRequest_issuer_signing_pubkey(this.ptr);
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
		const ret: number = bindings.UnsignedInvoiceRequest_payer_metadata(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A chain from [`Offer::chains`] that the offer is valid for.
	 */
	public chain(): Uint8Array {
		const ret: number = bindings.UnsignedInvoiceRequest_chain(this.ptr);
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
		const ret: bigint = bindings.UnsignedInvoiceRequest_amount_msats(this.ptr);
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
		const ret: boolean = bindings.UnsignedInvoiceRequest_has_amount_msats(this.ptr);
		return ret;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 */
	public invoice_request_features(): InvoiceRequestFeatures {
		const ret: bigint = bindings.UnsignedInvoiceRequest_invoice_request_features(this.ptr);
		const ret_hu_conv: InvoiceRequestFeatures = new InvoiceRequestFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The quantity of the offer's item conforming to [`Offer::is_valid_quantity`].
	 */
	public quantity(): Option_u64Z {
		const ret: bigint = bindings.UnsignedInvoiceRequest_quantity(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request.
	 */
	public payer_signing_pubkey(): Uint8Array {
		const ret: number = bindings.UnsignedInvoiceRequest_payer_signing_pubkey(this.ptr);
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
		const ret: bigint = bindings.UnsignedInvoiceRequest_payer_note(this.ptr);
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
		const ret: bigint = bindings.UnsignedInvoiceRequest_offer_from_hrn(this.ptr);
		const ret_hu_conv: HumanReadableName = new HumanReadableName(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the UnsignedInvoiceRequest object into a byte array which can be read by UnsignedInvoiceRequest_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.UnsignedInvoiceRequest_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
