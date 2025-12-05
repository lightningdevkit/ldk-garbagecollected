
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Builds an [`InvoiceRequest`] from an [`Offer`] for the \"offer to be paid\" flow.
 * 
 * See [module-level documentation] for usage.
 * 
 * [module-level documentation]: self
 */
export class InvoiceRequestWithDerivedPayerSigningPubkeyBuilder extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InvoiceRequestWithDerivedPayerSigningPubkeyBuilder_free);
	}

	/**
	 * Builds a signed [`InvoiceRequest`] after checking for valid semantics.
	 */
	public build_and_sign(): Result_InvoiceRequestBolt12SemanticErrorZ {
		const ret: bigint = bindings.InvoiceRequestWithDerivedPayerSigningPubkeyBuilder_build_and_sign(this.ptr);
		const ret_hu_conv: Result_InvoiceRequestBolt12SemanticErrorZ = Result_InvoiceRequestBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets the [`InvoiceRequest::chain`] of the given [`Network`] for paying an invoice. If not
	 * called, [`Network::Bitcoin`] is assumed. Errors if the chain for `network` is not supported
	 * by the offer.
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public chain(network: Network): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.InvoiceRequestWithDerivedPayerSigningPubkeyBuilder_chain(this.ptr, network);
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets the [`InvoiceRequest::amount_msats`] for paying an invoice. Errors if `amount_msats` is
	 * not at least the expected invoice amount (i.e., [`Offer::amount`] times [`quantity`]).
	 * 
	 * Successive calls to this method will override the previous setting.
	 * 
	 * [`quantity`]: Self::quantity
	 */
	public amount_msats(amount_msats: bigint): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.InvoiceRequestWithDerivedPayerSigningPubkeyBuilder_amount_msats(this.ptr, amount_msats);
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets [`InvoiceRequest::quantity`] of items. If not set, `1` is assumed. Errors if `quantity`
	 * does not conform to [`Offer::is_valid_quantity`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public quantity(quantity: bigint): Result_NoneBolt12SemanticErrorZ {
		const ret: bigint = bindings.InvoiceRequestWithDerivedPayerSigningPubkeyBuilder_quantity(this.ptr, quantity);
		const ret_hu_conv: Result_NoneBolt12SemanticErrorZ = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets the [`InvoiceRequest::payer_note`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public payer_note(payer_note: string): void {
		bindings.InvoiceRequestWithDerivedPayerSigningPubkeyBuilder_payer_note(this.ptr, bindings.encodeString(payer_note));
	}

	/**
	 * Sets the [`InvoiceRequest::offer_from_hrn`].
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public sourced_from_human_readable_name(hrn: HumanReadableName): void {
		bindings.InvoiceRequestWithDerivedPayerSigningPubkeyBuilder_sourced_from_human_readable_name(this.ptr, CommonBase.get_ptr_of(hrn));
	}

}
