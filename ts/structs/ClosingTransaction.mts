
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * This class tracks the per-transaction information needed to build a closing transaction and will
 * actually build it and sign.
 * 
 * This class can be used inside a signer implementation to generate a signature given the relevant
 * secret key.
 */
export class ClosingTransaction extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ClosingTransaction_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.ClosingTransaction_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the ClosingTransaction
	 */
	public clone(): ClosingTransaction {
		const ret: bigint = bindings.ClosingTransaction_clone(this.ptr);
		const ret_hu_conv: ClosingTransaction = new ClosingTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Generates a non-cryptographic 64-bit hash of the ClosingTransaction.
	 */
	public hash(): bigint {
		const ret: bigint = bindings.ClosingTransaction_hash(this.ptr);
		return ret;
	}

	/**
	 * Checks if two ClosingTransactions contain equal inner contents.
	 * This ignores pointers and is_owned flags and looks at the values in fields.
	 * Two objects with NULL inner values will be considered "equal" here.
	 */
	public eq(b: ClosingTransaction): boolean {
		const ret: boolean = bindings.ClosingTransaction_eq(this.ptr, CommonBase.get_ptr_of(b));
		return ret;
	}

	/**
	 * Construct an object of the class
	 */
	public static constructor_new(to_holder_value_sat: bigint, to_counterparty_value_sat: bigint, to_holder_script: Uint8Array, to_counterparty_script: Uint8Array, funding_outpoint: OutPoint): ClosingTransaction {
		const ret: bigint = bindings.ClosingTransaction_new(to_holder_value_sat, to_counterparty_value_sat, bindings.encodeUint8Array(to_holder_script), bindings.encodeUint8Array(to_counterparty_script), CommonBase.get_ptr_of(funding_outpoint));
		const ret_hu_conv: ClosingTransaction = new ClosingTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

	/**
	 * Trust our pre-built transaction.
	 * 
	 * Applies a wrapper which allows access to the transaction.
	 * 
	 * This should only be used if you fully trust the builder of this object. It should not
	 * be used by an external signer - instead use the verify function.
	 */
	public trust(): TrustedClosingTransaction {
		const ret: bigint = bindings.ClosingTransaction_trust(this.ptr);
		const ret_hu_conv: TrustedClosingTransaction = new TrustedClosingTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Verify our pre-built transaction.
	 * 
	 * Applies a wrapper which allows access to the transaction.
	 * 
	 * An external validating signer must call this method before signing
	 * or using the built transaction.
	 */
	public verify(funding_outpoint: OutPoint): Result_TrustedClosingTransactionNoneZ {
		const ret: bigint = bindings.ClosingTransaction_verify(this.ptr, CommonBase.get_ptr_of(funding_outpoint));
		const ret_hu_conv: Result_TrustedClosingTransactionNoneZ = Result_TrustedClosingTransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * The value to be sent to the holder, or zero if the output will be omitted
	 */
	public to_holder_value_sat(): bigint {
		const ret: bigint = bindings.ClosingTransaction_to_holder_value_sat(this.ptr);
		return ret;
	}

	/**
	 * The value to be sent to the counterparty, or zero if the output will be omitted
	 */
	public to_counterparty_value_sat(): bigint {
		const ret: bigint = bindings.ClosingTransaction_to_counterparty_value_sat(this.ptr);
		return ret;
	}

	/**
	 * The destination of the holder's output
	 */
	public to_holder_script(): Uint8Array {
		const ret: number = bindings.ClosingTransaction_to_holder_script(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The destination of the counterparty's output
	 */
	public to_counterparty_script(): Uint8Array {
		const ret: number = bindings.ClosingTransaction_to_counterparty_script(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
