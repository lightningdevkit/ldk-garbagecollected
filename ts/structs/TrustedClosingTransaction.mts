
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A wrapper on ClosingTransaction indicating that the built bitcoin
 * transaction is trusted.
 * 
 * See trust() and verify() functions on CommitmentTransaction.
 * 
 * This structure implements Deref.
 */
export class TrustedClosingTransaction extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TrustedClosingTransaction_free);
	}

	/**
	 * The pre-built Bitcoin commitment transaction
	 */
	public built_transaction(): Uint8Array {
		const ret: number = bindings.TrustedClosingTransaction_built_transaction(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Get the SIGHASH_ALL sighash value of the transaction.
	 * 
	 * This can be used to verify a signature.
	 */
	public get_sighash_all(funding_redeemscript: Uint8Array, channel_value_satoshis: bigint): Uint8Array {
		const ret: number = bindings.TrustedClosingTransaction_get_sighash_all(this.ptr, bindings.encodeUint8Array(funding_redeemscript), channel_value_satoshis);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Sign a transaction, either because we are counter-signing the counterparty's transaction or
	 * because we are about to broadcast a holder transaction.
	 */
	public sign(funding_key: Uint8Array, funding_redeemscript: Uint8Array, channel_value_satoshis: bigint): Uint8Array {
		const ret: number = bindings.TrustedClosingTransaction_sign(this.ptr, bindings.encodeUint8Array(funding_key), bindings.encodeUint8Array(funding_redeemscript), channel_value_satoshis);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
