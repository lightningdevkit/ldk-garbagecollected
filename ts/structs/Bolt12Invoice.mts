
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A `Bolt12Invoice` is a payment request, typically corresponding to an [`Offer`] or a [`Refund`].
 * 
 * An invoice may be sent in response to an [`InvoiceRequest`] in the case of an offer or sent
 * directly after scanning a refund. It includes all the information needed to pay a recipient.
 * 
 * [`Offer`]: crate::offers::offer::Offer
 * [`Refund`]: crate::offers::refund::Refund
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 */
export class Bolt12Invoice extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Bolt12Invoice_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Bolt12Invoice_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Bolt12Invoice
	 */
	public clone(): Bolt12Invoice {
		const ret: bigint = bindings.Bolt12Invoice_clone(this.ptr);
		const ret_hu_conv: Bolt12Invoice = new Bolt12Invoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes, including information
	 * needed for routing payments across them.
	 * 
	 * Blinded paths provide recipient privacy by obfuscating its node id. Note, however, that this
	 * privacy is lost if a public node id is used for
	 * [`Bolt12Invoice::signing_pubkey`].
	 */
	public payment_paths(): BlindedPaymentPath[] {
		const ret: number = bindings.Bolt12Invoice_payment_paths(this.ptr);
		const ret_conv_20_len: number = bindings.getArrayLength(ret);
		const ret_conv_20_arr: BlindedPaymentPath[] = new Array(ret_conv_20_len).fill(null);
		for (var u = 0; u < ret_conv_20_len; u++) {
			const ret_conv_20: bigint = bindings.getU64ArrayElem(ret, u);
			const ret_conv_20_hu_conv: BlindedPaymentPath = new BlindedPaymentPath(null, ret_conv_20);
			CommonBase.add_ref_from(ret_conv_20_hu_conv, this);
			ret_conv_20_arr[u] = ret_conv_20_hu_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_20_arr;
	}

	/**
	 * Duration since the Unix epoch when the invoice was created.
	 */
	public created_at(): bigint {
		const ret: bigint = bindings.Bolt12Invoice_created_at(this.ptr);
		return ret;
	}

	/**
	 * Duration since
	 * [`Bolt12Invoice::created_at`]
	 * when the invoice has expired and therefore should no longer be paid.
	 */
	public relative_expiry(): bigint {
		const ret: bigint = bindings.Bolt12Invoice_relative_expiry(this.ptr);
		return ret;
	}

	/**
	 * Whether the invoice has expired given the current time as duration since the Unix epoch.
	 */
	public is_expired_no_std(duration_since_epoch: bigint): boolean {
		const ret: boolean = bindings.Bolt12Invoice_is_expired_no_std(this.ptr, duration_since_epoch);
		return ret;
	}

	/**
	 * Fallback addresses for paying the invoice on-chain, in order of most-preferred to
	 * least-preferred.
	 */
	public fallbacks(): Address[] {
		const ret: number = bindings.Bolt12Invoice_fallbacks(this.ptr);
		const ret_conv_9_len: number = bindings.getArrayLength(ret);
		const ret_conv_9_arr: Address[] = new Array(ret_conv_9_len).fill(null);
		for (var j = 0; j < ret_conv_9_len; j++) {
			const ret_conv_9: bigint = bindings.getU64ArrayElem(ret, j);
			const ret_conv_9_conv: Address = new Address(null, ret_conv_9);
			ret_conv_9_arr[j] = ret_conv_9_conv;
		}
		bindings.freeWasmMemory(ret)
		return ret_conv_9_arr;
	}

	/**
	 * Features pertaining to paying an invoice.
	 */
	public invoice_features(): Bolt12InvoiceFeatures {
		const ret: bigint = bindings.Bolt12Invoice_invoice_features(this.ptr);
		const ret_hu_conv: Bolt12InvoiceFeatures = new Bolt12InvoiceFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A typically transient public key corresponding to the key used to sign the invoice.
	 * 
	 * If the invoices was created in response to an [`Offer`], then this will be:
	 * - [`Offer::issuer_signing_pubkey`] if it's `Some`, otherwise
	 * - the final blinded node id from a [`BlindedMessagePath`] in [`Offer::paths`] if `None`.
	 * 
	 * If the invoice was created in response to a [`Refund`], then it is a valid pubkey chosen by
	 * the recipient.
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 * [`Refund`]: crate::offers::refund::Refund
	 */
	public signing_pubkey(): Uint8Array {
		const ret: number = bindings.Bolt12Invoice_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The chains that may be used when paying a requested invoice.
	 * 
	 * From [`Offer::chains`]; `None` if the invoice was created in response to a [`Refund`].
	 * 
	 * [`Offer::chains`]: crate::offers::offer::Offer::chains
	 */
	public offer_chains(): Option_CVec_ThirtyTwoBytesZZ {
		const ret: bigint = bindings.Bolt12Invoice_offer_chains(this.ptr);
		const ret_hu_conv: Option_CVec_ThirtyTwoBytesZZ = Option_CVec_ThirtyTwoBytesZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The chain that must be used when paying the invoice; selected from [`offer_chains`] if the
	 * invoice originated from an offer.
	 * 
	 * From [`InvoiceRequest::chain`] or [`Refund::chain`].
	 * 
	 * [`offer_chains`]: Self::offer_chains
	 * [`InvoiceRequest::chain`]: crate::offers::invoice_request::InvoiceRequest::chain
	 */
	public chain(): Uint8Array {
		const ret: number = bindings.Bolt12Invoice_chain(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Opaque bytes set by the originating [`Offer`].
	 * 
	 * From [`Offer::metadata`]; `None` if the invoice was created in response to a [`Refund`] or
	 * if the [`Offer`] did not set it.
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::metadata`]: crate::offers::offer::Offer::metadata
	 */
	public metadata(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.Bolt12Invoice_metadata(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 * 
	 * From [`Offer::amount`]; `None` if the invoice was created in response to a [`Refund`] or if
	 * the [`Offer`] did not set it.
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::amount`]: crate::offers::offer::Offer::amount
	 */
	public amount(): Option_AmountZ {
		const ret: bigint = bindings.Bolt12Invoice_amount(this.ptr);
		const ret_hu_conv: Option_AmountZ = Option_AmountZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the originating [`Offer`].
	 * 
	 * From [`Offer::offer_features`]; `None` if the invoice was created in response to a
	 * [`Refund`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::offer_features`]: crate::offers::offer::Offer::offer_features
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public offer_features(): OfferFeatures {
		const ret: bigint = bindings.Bolt12Invoice_offer_features(this.ptr);
		const ret_hu_conv: OfferFeatures = new OfferFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the originating offer or refund.
	 * 
	 * From [`Offer::description`] or [`Refund::description`].
	 * 
	 * [`Offer::description`]: crate::offers::offer::Offer::description
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public description(): PrintableString {
		const ret: bigint = bindings.Bolt12Invoice_description(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be requested.
	 * 
	 * From [`Offer::absolute_expiry`] or [`Refund::absolute_expiry`].
	 * 
	 * [`Offer::absolute_expiry`]: crate::offers::offer::Offer::absolute_expiry
	 */
	public absolute_expiry(): Option_u64Z {
		const ret: bigint = bindings.Bolt12Invoice_absolute_expiry(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The issuer of the offer or refund.
	 * 
	 * From [`Offer::issuer`] or [`Refund::issuer`].
	 * 
	 * [`Offer::issuer`]: crate::offers::offer::Offer::issuer
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public issuer(): PrintableString {
		const ret: bigint = bindings.Bolt12Invoice_issuer(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes.
	 * 
	 * From [`Offer::paths`] or [`Refund::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public message_paths(): BlindedMessagePath[] {
		const ret: number = bindings.Bolt12Invoice_message_paths(this.ptr);
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
	 * 
	 * From [`Offer::supported_quantity`]; `None` if the invoice was created in response to a
	 * [`Refund`].
	 * 
	 * [`Offer::supported_quantity`]: crate::offers::offer::Offer::supported_quantity
	 */
	public supported_quantity(): Option_QuantityZ {
		const ret: bigint = bindings.Bolt12Invoice_supported_quantity(this.ptr);
		const ret_hu_conv: Option_QuantityZ = Option_QuantityZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The public key used by the recipient to sign invoices.
	 * 
	 * From [`Offer::issuer_signing_pubkey`] and may be `None`; also `None` if the invoice was
	 * created in response to a [`Refund`].
	 * 
	 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public issuer_signing_pubkey(): Uint8Array {
		const ret: number = bindings.Bolt12Invoice_issuer_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * An unpredictable series of bytes from the payer.
	 * 
	 * From [`InvoiceRequest::payer_metadata`] or [`Refund::payer_metadata`].
	 */
	public payer_metadata(): Uint8Array {
		const ret: number = bindings.Bolt12Invoice_payer_metadata(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 * 
	 * From [`InvoiceRequest::invoice_request_features`] or [`Refund::features`].
	 */
	public invoice_request_features(): InvoiceRequestFeatures {
		const ret: bigint = bindings.Bolt12Invoice_invoice_request_features(this.ptr);
		const ret_hu_conv: InvoiceRequestFeatures = new InvoiceRequestFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The quantity of items requested or refunded for.
	 * 
	 * From [`InvoiceRequest::quantity`] or [`Refund::quantity`].
	 */
	public quantity(): Option_u64Z {
		const ret: bigint = bindings.Bolt12Invoice_quantity(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A possibly transient pubkey used to sign the invoice request or to send an invoice for a
	 * refund in case there are no [`message_paths`].
	 * 
	 * [`message_paths`]: Self::message_paths
	 */
	public payer_signing_pubkey(): Uint8Array {
		const ret: number = bindings.Bolt12Invoice_payer_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A payer-provided note reflected back in the invoice.
	 * 
	 * From [`InvoiceRequest::payer_note`] or [`Refund::payer_note`].
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payer_note(): PrintableString {
		const ret: bigint = bindings.Bolt12Invoice_payer_note(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * SHA256 hash of the payment preimage that will be given in return for paying the invoice.
	 */
	public payment_hash(): Uint8Array {
		const ret: number = bindings.Bolt12Invoice_payment_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The minimum amount required for a successful payment of the invoice.
	 */
	public amount_msats(): bigint {
		const ret: bigint = bindings.Bolt12Invoice_amount_msats(this.ptr);
		return ret;
	}

	/**
	 * Signature of the invoice verified using [`Bolt12Invoice::signing_pubkey`].
	 */
	public signature(): Uint8Array {
		const ret: number = bindings.Bolt12Invoice_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Hash that was used for signing the invoice.
	 */
	public signable_hash(): Uint8Array {
		const ret: number = bindings.Bolt12Invoice_signable_hash(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns the [`OfferId`] if this invoice corresponds to an [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public offer_id(): OfferId {
		const ret: bigint = bindings.Bolt12Invoice_offer_id(this.ptr);
		const ret_hu_conv: OfferId = new OfferId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Verifies that the invoice was for a request or refund created using the given key by
	 * checking the payer metadata from the invoice request.
	 * 
	 * Returns the associated [`PaymentId`] to use when sending the payment.
	 */
	public verify_using_metadata(key: ExpandedKey): Result_ThirtyTwoBytesNoneZ {
		const ret: bigint = bindings.Bolt12Invoice_verify_using_metadata(this.ptr, CommonBase.get_ptr_of(key));
		const ret_hu_conv: Result_ThirtyTwoBytesNoneZ = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Verifies that the invoice was for a request or refund created using the given key by
	 * checking a payment id and nonce included with the [`BlindedMessagePath`] for which the invoice was
	 * sent through.
	 */
	public verify_using_payer_data(payment_id: Uint8Array, nonce: Nonce, key: ExpandedKey): Result_ThirtyTwoBytesNoneZ {
		const ret: bigint = bindings.Bolt12Invoice_verify_using_payer_data(this.ptr, bindings.encodeUint8Array(payment_id), CommonBase.get_ptr_of(nonce), CommonBase.get_ptr_of(key));
		const ret_hu_conv: Result_ThirtyTwoBytesNoneZ = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the [`TaggedHash`] of the invoice that was signed.
	 */
	public tagged_hash(): TaggedHash {
		const ret: bigint = bindings.Bolt12Invoice_tagged_hash(this.ptr);
		const ret_hu_conv: TaggedHash = new TaggedHash(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Bolt12Invoice.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Bolt12Invoice_hash(this.ptr);
		return ret;
	}

	/**
	 * Serialize the Bolt12Invoice object into a byte array which can be read by Bolt12Invoice_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Bolt12Invoice_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Bolt12Invoice from a byte array, created by Bolt12Invoice_write
	 */
	public static constructor_read(ser: Uint8Array): Result_Bolt12InvoiceDecodeErrorZ {
		const ret: bigint = bindings.Bolt12Invoice_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_Bolt12InvoiceDecodeErrorZ = Result_Bolt12InvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
