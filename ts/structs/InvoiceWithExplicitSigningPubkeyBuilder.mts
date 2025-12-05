
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Builds a [`Bolt12Invoice`] from either:
 * - an [`InvoiceRequest`] for the \"offer to be paid\" flow or
 * - a [`Refund`] for the \"offer for money\" flow.
 * 
 * See [module-level documentation] for usage.
 * 
 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
 * [`Refund`]: crate::offers::refund::Refund
 * [module-level documentation]: self
 */
export class InvoiceWithExplicitSigningPubkeyBuilder extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.InvoiceWithExplicitSigningPubkeyBuilder_free);
	}

	/**
	 * Builds an unsigned [`Bolt12Invoice`] after checking for valid semantics.
	 */
	public build(): Result_UnsignedBolt12InvoiceBolt12SemanticErrorZ {
		const ret: bigint = bindings.InvoiceWithExplicitSigningPubkeyBuilder_build(this.ptr);
		const ret_hu_conv: Result_UnsignedBolt12InvoiceBolt12SemanticErrorZ = Result_UnsignedBolt12InvoiceBolt12SemanticErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Sets the [`Bolt12Invoice::relative_expiry`]
	 * as seconds since [`Bolt12Invoice::created_at`].
	 * Any expiry that has already passed is valid and can be checked for using
	 * 
	 * Successive calls to this method will override the previous setting.
	 */
	public relative_expiry(relative_expiry_secs: number): void {
		bindings.InvoiceWithExplicitSigningPubkeyBuilder_relative_expiry(this.ptr, relative_expiry_secs);
	}

	/**
	 * Adds a P2WSH address to [`Bolt12Invoice::fallbacks`].
	 * 
	 * Successive calls to this method will add another address. Caller is responsible for not
	 * adding duplicate addresses and only calling if capable of receiving to P2WSH addresses.
	 */
	public fallback_v0_p2wsh(script_hash: Uint8Array): void {
		bindings.InvoiceWithExplicitSigningPubkeyBuilder_fallback_v0_p2wsh(this.ptr, bindings.encodeUint8Array(script_hash));
	}

	/**
	 * Adds a P2WPKH address to [`Bolt12Invoice::fallbacks`].
	 * 
	 * Successive calls to this method will add another address. Caller is responsible for not
	 * adding duplicate addresses and only calling if capable of receiving to P2WPKH addresses.
	 */
	public fallback_v0_p2wpkh(pubkey_hash: Uint8Array): void {
		bindings.InvoiceWithExplicitSigningPubkeyBuilder_fallback_v0_p2wpkh(this.ptr, bindings.encodeUint8Array(pubkey_hash));
	}

	/**
	 * Adds a P2TR address to [`Bolt12Invoice::fallbacks`].
	 * 
	 * Successive calls to this method will add another address. Caller is responsible for not
	 * adding duplicate addresses and only calling if capable of receiving to P2TR addresses.
	 */
	public fallback_v1_p2tr_tweaked(utput_key: Uint8Array): void {
		bindings.InvoiceWithExplicitSigningPubkeyBuilder_fallback_v1_p2tr_tweaked(this.ptr, bindings.encodeUint8Array(utput_key));
	}

	/**
	 * Sets [`Bolt12Invoice::invoice_features`]
	 * to indicate MPP may be used. Otherwise, MPP is disallowed.
	 */
	public allow_mpp(): void {
		bindings.InvoiceWithExplicitSigningPubkeyBuilder_allow_mpp(this.ptr);
	}

}
