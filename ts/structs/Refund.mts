
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A `Refund` is a request to send an [`Bolt12Invoice`] without a preceding [`Offer`].
 * 
 * Typically, after an invoice is paid, the recipient may publish a refund allowing the sender to
 * recoup their funds. A refund may be used more generally as an \"offer for money\", such as with a
 * bitcoin ATM.
 * 
 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
 * [`Offer`]: crate::offers::offer::Offer
 */
export class Refund extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.Refund_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.Refund_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the Refund
	 */
	public clone(): Refund {
		const ret: bigint = bindings.Refund_clone(this.ptr);
		const ret_hu_conv: Refund = new Refund(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A complete description of the purpose of the refund. Intended to be displayed to the user
	 * but with the caveat that it has not been verified in any way.
	 */
	public description(): PrintableString {
		const ret: bigint = bindings.Refund_description(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Duration since the Unix epoch when an invoice should no longer be sent.
	 * 
	 * If `None`, the refund does not expire.
	 */
	public absolute_expiry(): Option_u64Z {
		const ret: bigint = bindings.Refund_absolute_expiry(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Whether the refund has expired given the duration since the Unix epoch.
	 */
	public is_expired_no_std(duration_since_epoch: bigint): boolean {
		const ret: boolean = bindings.Refund_is_expired_no_std(this.ptr, duration_since_epoch);
		return ret;
	}

	/**
	 * The issuer of the refund, possibly beginning with `user@domain` or `domain`. Intended to be
	 * displayed to the user but with the caveat that it has not been verified in any way.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public issuer(): PrintableString {
		const ret: bigint = bindings.Refund_issuer(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Paths to the sender originating from publicly reachable nodes. Blinded paths provide sender
	 * privacy by obfuscating its node id.
	 */
	public paths(): BlindedMessagePath[] {
		const ret: number = bindings.Refund_paths(this.ptr);
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
	 * An unpredictable series of bytes, typically containing information about the derivation of
	 * [`payer_signing_pubkey`].
	 * 
	 * [`payer_signing_pubkey`]: Self::payer_signing_pubkey
	 */
	public payer_metadata(): Uint8Array {
		const ret: number = bindings.Refund_payer_metadata(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * A chain that the refund is valid for.
	 */
	public chain(): Uint8Array {
		const ret: number = bindings.Refund_chain(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The amount to refund in msats (i.e., the minimum lightning-payable unit for [`chain`]).
	 * 
	 * [`chain`]: Self::chain
	 */
	public amount_msats(): bigint {
		const ret: bigint = bindings.Refund_amount_msats(this.ptr);
		return ret;
	}

	/**
	 * Features pertaining to requesting an invoice.
	 */
	public features(): InvoiceRequestFeatures {
		const ret: bigint = bindings.Refund_features(this.ptr);
		const ret_hu_conv: InvoiceRequestFeatures = new InvoiceRequestFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The quantity of an item that refund is for.
	 */
	public quantity(): Option_u64Z {
		const ret: bigint = bindings.Refund_quantity(this.ptr);
		const ret_hu_conv: Option_u64Z = Option_u64Z.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A public node id to send to in the case where there are no [`paths`]. Otherwise, a possibly
	 * transient pubkey.
	 * 
	 * [`paths`]: Self::paths
	 */
	public payer_signing_pubkey(): Uint8Array {
		const ret: number = bindings.Refund_payer_signing_pubkey(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Payer provided note to include in the invoice.
	 * 
	 * Note that the return value (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public payer_note(): PrintableString {
		const ret: bigint = bindings.Refund_payer_note(this.ptr);
		const ret_hu_conv: PrintableString = new PrintableString(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the Refund.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.Refund_hash(this.ptr);
		return ret;
	}

	/**
	 * Read a Refund from a byte array, created by Refund_write
	 */
	public static constructor_read(ser: Uint8Array): Result_RefundDecodeErrorZ {
		const ret: bigint = bindings.Refund_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_RefundDecodeErrorZ = Result_RefundDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Serialize the Refund object into a byte array which can be read by Refund_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.Refund_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a Refund object from a string
	 */
	public static constructor_from_str(s: string): Result_RefundBolt12ParseErrorZ {
		const ret: bigint = bindings.Refund_from_str(bindings.encodeString(s));
		const ret_hu_conv: Result_RefundBolt12ParseErrorZ = Result_RefundBolt12ParseErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the string representation of a Refund object
	 */
	public to_str(): string {
		const ret: number = bindings.Refund_to_str(this.ptr);
		const ret_conv: string = bindings.decodeString(ret);
		return ret_conv;
	}

}
