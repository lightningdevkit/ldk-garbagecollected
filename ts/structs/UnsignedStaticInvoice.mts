
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A semantically valid [`StaticInvoice`] that hasn't been signed.
 */
export class UnsignedStaticInvoice extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.UnsignedStaticInvoice_free);
	}

	/**
	 * Signs the [`TaggedHash`] of the invoice using the given function.
	 * 
	 * Note: The hash computation may have included unknown, odd TLV records.
	 */
	public sign(sign: SignStaticInvoiceFn): Result_StaticInvoiceSignErrorZ {
		const ret: bigint = bindings.UnsignedStaticInvoice_sign(this.ptr, CommonBase.get_ptr_of(sign));
		const ret_hu_conv: Result_StaticInvoiceSignErrorZ = Result_StaticInvoiceSignErrorZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, sign);
		return ret_hu_conv;
	}

	/**
	 * Paths to the recipient originating from publicly reachable nodes, including information
	 * needed for routing payments across them.
	 * 
	 * Blinded paths provide recipient privacy by obfuscating its node id. Note, however, that this
	 * privacy is lost if a public node id is used for
	 * [`UnsignedStaticInvoice::signing_pubkey`].
	 */
	public payment_paths(): BlindedPaymentPath[] {
		const ret: number = bindings.UnsignedStaticInvoice_payment_paths(this.ptr);
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
		const ret: bigint = bindings.UnsignedStaticInvoice_created_at(this.ptr);
		return ret;
	}

	/**
	 * Duration since
	 * [`UnsignedStaticInvoice::created_at`]
	 * when the invoice has expired and therefore should no longer be paid.
	 */
	public relative_expiry(): bigint {
		const ret: bigint = bindings.UnsignedStaticInvoice_relative_expiry(this.ptr);
		return ret;
	}

	/**
	 * Whether the invoice has expired given the current time as duration since the Unix epoch.
	 */
	public is_expired_no_std(duration_since_epoch: bigint): boolean {
		const ret: boolean = bindings.UnsignedStaticInvoice_is_expired_no_std(this.ptr, duration_since_epoch);
		return ret;
	}

	/**
	 * Fallback addresses for paying the invoice on-chain, in order of most-preferred to
	 * least-preferred.
	 */
	public fallbacks(): Address[] {
		const ret: number = bindings.UnsignedStaticInvoice_fallbacks(this.ptr);
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
		const ret: bigint = bindings.UnsignedStaticInvoice_invoice_features(this.ptr);
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
		const ret: number = bindings.UnsignedStaticInvoice_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The chain that must be used when paying the invoice. [`StaticInvoice`]s currently can only be
	 * created from offers that support a single chain.
	 */
	public chain(): Uint8Array {
		const ret: number = bindings.UnsignedStaticInvoice_chain(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Opaque bytes set by the originating [`Offer::metadata`].
	 * 
	 * [`Offer::metadata`]: crate::offers::offer::Offer::metadata
	 */
	public metadata(): Option_CVec_u8ZZ {
		const ret: bigint = bindings.UnsignedStaticInvoice_metadata(this.ptr);
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
		const ret: bigint = bindings.UnsignedStaticInvoice_amount(this.ptr);
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
		const ret: bigint = bindings.UnsignedStaticInvoice_offer_features(this.ptr);
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
		const ret: bigint = bindings.UnsignedStaticInvoice_description(this.ptr);
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
		const ret: bigint = bindings.UnsignedStaticInvoice_absolute_expiry(this.ptr);
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
		const ret: bigint = bindings.UnsignedStaticInvoice_issuer(this.ptr);
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
		const ret: number = bindings.UnsignedStaticInvoice_offer_message_paths(this.ptr);
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
		const ret: number = bindings.UnsignedStaticInvoice_message_paths(this.ptr);
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
		const ret: bigint = bindings.UnsignedStaticInvoice_supported_quantity(this.ptr);
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
		const ret: number = bindings.UnsignedStaticInvoice_issuer_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
