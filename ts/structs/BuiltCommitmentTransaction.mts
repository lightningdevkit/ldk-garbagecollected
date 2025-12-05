
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A pre-built Bitcoin commitment transaction and its txid.
 */
export class BuiltCommitmentTransaction extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BuiltCommitmentTransaction_free);
	}

	/**
	 * The commitment transaction
	 */
	public get_transaction(): Uint8Array {
		const ret: number = bindings.BuiltCommitmentTransaction_get_transaction(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The commitment transaction
	 */
	public set_transaction(val: Uint8Array): void {
		bindings.BuiltCommitmentTransaction_set_transaction(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * The txid for the commitment transaction.
	 * 
	 * This is provided as a performance optimization, instead of calling transaction.txid()
	 * multiple times.
	 */
	public get_txid(): Uint8Array {
		const ret: number = bindings.BuiltCommitmentTransaction_get_txid(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The txid for the commitment transaction.
	 * 
	 * This is provided as a performance optimization, instead of calling transaction.txid()
	 * multiple times.
	 */
	public set_txid(val: Uint8Array): void {
		bindings.BuiltCommitmentTransaction_set_txid(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * Constructs a new BuiltCommitmentTransaction given each field
	 */
	public static constructor_new(transaction_arg: Uint8Array, txid_arg: Uint8Array): BuiltCommitmentTransaction {
		const ret: bigint = bindings.BuiltCommitmentTransaction_new(bindings.encodeUint8Array(transaction_arg), bindings.encodeUint8Array(txid_arg));
		const ret_hu_conv: BuiltCommitmentTransaction = new BuiltCommitmentTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.BuiltCommitmentTransaction_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the BuiltCommitmentTransaction
	 */
	public clone(): BuiltCommitmentTransaction {
		const ret: bigint = bindings.BuiltCommitmentTransaction_clone(this.ptr);
		const ret_hu_conv: BuiltCommitmentTransaction = new BuiltCommitmentTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the BuiltCommitmentTransaction object into a byte array which can be read by BuiltCommitmentTransaction_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.BuiltCommitmentTransaction_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a BuiltCommitmentTransaction from a byte array, created by BuiltCommitmentTransaction_write
	 */
	public static constructor_read(ser: Uint8Array): Result_BuiltCommitmentTransactionDecodeErrorZ {
		const ret: bigint = bindings.BuiltCommitmentTransaction_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_BuiltCommitmentTransactionDecodeErrorZ = Result_BuiltCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Get the SIGHASH_ALL sighash value of the transaction.
	 * 
	 * This can be used to verify a signature.
	 */
	public get_sighash_all(funding_redeemscript: Uint8Array, channel_value_satoshis: bigint): Uint8Array {
		const ret: number = bindings.BuiltCommitmentTransaction_get_sighash_all(this.ptr, bindings.encodeUint8Array(funding_redeemscript), channel_value_satoshis);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Signs the counterparty's commitment transaction.
	 */
	public sign_counterparty_commitment(funding_key: Uint8Array, funding_redeemscript: Uint8Array, channel_value_satoshis: bigint): Uint8Array {
		const ret: number = bindings.BuiltCommitmentTransaction_sign_counterparty_commitment(this.ptr, bindings.encodeUint8Array(funding_key), bindings.encodeUint8Array(funding_redeemscript), channel_value_satoshis);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Signs the holder commitment transaction because we are about to broadcast it.
	 */
	public sign_holder_commitment(funding_key: Uint8Array, funding_redeemscript: Uint8Array, channel_value_satoshis: bigint, entropy_source: EntropySource): Uint8Array {
		const ret: number = bindings.BuiltCommitmentTransaction_sign_holder_commitment(this.ptr, bindings.encodeUint8Array(funding_key), bindings.encodeUint8Array(funding_redeemscript), channel_value_satoshis, CommonBase.get_ptr_of(entropy_source));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		CommonBase.add_ref_from(this, entropy_source);
		return ret_conv;
	}

}
