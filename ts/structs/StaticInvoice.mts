
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A `StaticInvoice` is a reusable payment request corresponding to an [`Offer`].
 * 
 * A static invoice may be sent in response to an [`InvoiceRequest`] and includes all the
 * information needed to pay the recipient. However, unlike [`Bolt12Invoice`]s, static invoices do
 * not provide proof-of-payment. Therefore, [`Bolt12Invoice`]s should be preferred when the
 * recipient is online to provide one.
 * 
 * [`Offer`]: crate::offers::offer::Offer
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 */
export class StaticInvoice extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.StaticInvoice_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.StaticInvoice_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the StaticInvoice
	 */
	public clone(): StaticInvoice {
		const ret: bigint = bindings.StaticInvoice_clone(this.ptr);
		const ret_hu_conv: StaticInvoice = new StaticInvoice(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the StaticInvoice.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.StaticInvoice_hash(this.ptr);
		return ret;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes, including information
	 * needed for routing payments across them.
	 * 
	 * Blinded paths provide recipient privacy by obfuscating its node id. Note, however, that this
	 * privacy is lost if a public node id is used for
	 * [`StaticInvoice::signing_pubkey`].
	 */
	public payment_paths(): BlindedPaymentPath[] {
		const ret: number = bindings.StaticInvoice_payment_paths(this.ptr);
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
		const ret: bigint = bindings.StaticInvoice_created_at(this.ptr);
		return ret;
	}

	/**
	 * Duration since
	 * [`StaticInvoice::created_at`]
	 * when the invoice has expired and therefore should no longer be paid.
	 */
	public relative_expiry(): bigint {
		const ret: bigint = bindings.StaticInvoice_relative_expiry(this.ptr);
		return ret;
	}

	/**
	 * Whether the invoice has expired given the current time as duration since the Unix epoch.
	 */
	public is_expired_no_std(duration_since_epoch: bigint): boolean {
		const ret: boolean = bindings.StaticInvoice_is_expired_no_std(this.ptr, duration_since_epoch);
		return ret;
	}

	/**
	 * Fallback addresses for paying the invoice on-chain, in order of most-preferred to
	 * least-preferred.
	 */
	public fallbacks(): Address[] {
		const ret: number = bindings.StaticInvoice_fallbacks(this.ptr);
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
		const ret: bigint = bindings.StaticInvoice_invoice_features(this.ptr);
		const ret_hu_conv: Bolt12InvoiceFeatures = new Bolt12InvoiceFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The public key corresponding to the key used to sign the invoice.
	 * 
	 * This will be:
	 * - [`Offer::issuer_signing_pubkey`] if it's `Some`, otherwise
	 * - the final blinded node id from a [`BlindedMessagePath`] in [`Offer::paths`] if `None`.
	 * 
	 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public signing_pubkey(): Uint8Array {
		const ret: number = bindings.StaticInvoice_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The chain that must be used when paying the invoice. [`StaticInvoice`]s currently can only be
	 * created from offers that support a single chain.
	 */
	public chain(): Uint8Array {
		const ret: number = bindings.StaticInvoice_chain(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Opaque bytes set by the originating [`Offer::metadata`].
	 * 
	 * [`Offer::metadata`]: crate::offers::offer::Offer::metadata
	 */
	public metadata(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.StaticInvoice_metadata(this.ptr);
		const ret_hu_conv: Option_CVec_u8ZZ = Option_CVec_u8ZZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The minimum amount required for a successful payment of a single item.
	 * 
	 * From [`Offer::amount`].
	 * 
	 * [`Offer::amount`]: crate::offers::offer::Offer::amount
	 */
	public amount(): Option_AmountZ {
		const ret: bigint = bindings.StaticInvoice_amount(this.ptr);
		const ret_hu_conv: Option_AmountZ = Option_AmountZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Features pertaining to the originating [`Offer`], from [`Offer::offer_features`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 * [`Offer::offer_features`]: crate::offers::offer::Offer::offer_features
	 */
	public offer_features(): OfferFeatures {
		const ret: bigint = bindings.StaticInvoice_offer_features(this.ptr);
		const ret_hu_conv: OfferFeatures = new OfferFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the originating offer, from [`Offer::description`].
	 * 
	 * [`Offer::description`]: crate::offers::offer::Offer::description
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public description(): PrintableString {
		const ret: bigint = bindings.StaticInvoice_description(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be requested, from
	 * [`Offer::absolute_expiry`].
	 * 
	 * [`Offer::absolute_expiry`]: crate::offers::offer::Offer::absolute_expiry
	 */
	public absolute_expiry(): Option_u64Z {
		const ret: bigint = bindings.StaticInvoice_absolute_expiry(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The issuer of the offer, from [`Offer::issuer`].
	 * 
	 * [`Offer::issuer`]: crate::offers::offer::Offer::issuer
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public issuer(): PrintableString {
		const ret: bigint = bindings.StaticInvoice_issuer(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Paths to the node that may supply the invoice on the recipient's behalf, originating from
	 * publicly reachable nodes. Taken from [`Offer::paths`].
	 * 
	 * [`Offer::paths`]: crate::offers::offer::Offer::paths
	 */
	public offer_message_paths(): BlindedMessagePath[] {
		const ret: number = bindings.StaticInvoice_offer_message_paths(this.ptr);
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
	 * Paths to the recipient for indicating that a held HTLC is available to claim when they next
	 * come online.
	 */
	public message_paths(): BlindedMessagePath[] {
		const ret: number = bindings.StaticInvoice_message_paths(this.ptr);
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
	 * The quantity of items supported, from [`Offer::supported_quantity`].
	 * 
	 * [`Offer::supported_quantity`]: crate::offers::offer::Offer::supported_quantity
	 */
	public supported_quantity(): Quantity {
		const ret: bigint = bindings.StaticInvoice_supported_quantity(this.ptr);
		const ret_hu_conv: Quantity = Quantity.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The public key used by the recipient to sign invoices, from
	 * [`Offer::issuer_signing_pubkey`].
	 * 
	 * [`Offer::issuer_signing_pubkey`]: crate::offers::offer::Offer::issuer_signing_pubkey
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public issuer_signing_pubkey(): Uint8Array {
		const ret: number = bindings.StaticInvoice_issuer_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Signature of the invoice verified using [`StaticInvoice::signing_pubkey`].
	 */
	public signature(): Uint8Array {
		const ret: number = bindings.StaticInvoice_signature(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Whether the [`Offer`] that this invoice is based on is expired, given the current time as
	 * duration since the Unix epoch.
	 */
	public is_offer_expired_no_std(duration_since_epoch: bigint): boolean {
		const ret: boolean = bindings.StaticInvoice_is_offer_expired_no_std(this.ptr, duration_since_epoch);
		return ret;
	}

	/**
	 * Returns the [`OfferId`] corresponding to the originating [`Offer`].
	 * 
	 * [`Offer`]: crate::offers::offer::Offer
	 */
	public offer_id(): OfferId {
		const ret: bigint = bindings.StaticInvoice_offer_id(this.ptr);
		const ret_hu_conv: OfferId = new OfferId(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the StaticInvoice object into a byte array which can be read by StaticInvoice_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.StaticInvoice_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a StaticInvoice from a byte array, created by StaticInvoice_write
	 */
	public static constructor_read(ser: Uint8Array): Result_StaticInvoiceDecodeErrorZ {
		const ret: bigint = bindings.StaticInvoice_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_StaticInvoiceDecodeErrorZ = Result_StaticInvoiceDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
