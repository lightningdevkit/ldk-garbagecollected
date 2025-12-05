
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * Information needed to build and sign a holder's commitment transaction.
 * 
 * The transaction is only signed once we are ready to broadcast.
 */
export class HolderCommitmentTransaction extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.HolderCommitmentTransaction_free);
	}

	/**
	 * Our counterparty's signature for the transaction
	 */
	public get_counterparty_sig(): Uint8Array {
		const ret: number = bindings.HolderCommitmentTransaction_get_counterparty_sig(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Our counterparty's signature for the transaction
	 */
	public set_counterparty_sig(val: Uint8Array): void {
		bindings.HolderCommitmentTransaction_set_counterparty_sig(this.ptr, bindings.encodeUint8Array(val));
	}

	/**
	 * All non-dust counterparty HTLC signatures, in the order they appear in the transaction
	 * 
	 * Returns a copy of the field.
	 */
	public get_counterparty_htlc_sigs(): Uint8Array[] {
		const ret: number = bindings.HolderCommitmentTransaction_get_counterparty_htlc_sigs(this.ptr);
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
	 * All non-dust counterparty HTLC signatures, in the order they appear in the transaction
	 */
	public set_counterparty_htlc_sigs(val: Uint8Array[]): void {
		bindings.HolderCommitmentTransaction_set_counterparty_htlc_sigs(this.ptr, bindings.encodeUint32Array(val.map(val_conv_12 => bindings.encodeUint8Array(val_conv_12))));
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.HolderCommitmentTransaction_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the HolderCommitmentTransaction
	 */
	public clone(): HolderCommitmentTransaction {
		const ret: bigint = bindings.HolderCommitmentTransaction_clone(this.ptr);
		const ret_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the HolderCommitmentTransaction object into a byte array which can be read by HolderCommitmentTransaction_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.HolderCommitmentTransaction_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a HolderCommitmentTransaction from a byte array, created by HolderCommitmentTransaction_write
	 */
	public static constructor_read(ser: Uint8Array): Result_HolderCommitmentTransactionDecodeErrorZ {
		const ret: bigint = bindings.HolderCommitmentTransaction_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_HolderCommitmentTransactionDecodeErrorZ = Result_HolderCommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a new holder transaction with the given counterparty signatures.
	 * The funding keys are used to figure out which signature should go first when building the transaction for broadcast.
	 */
	public static constructor_new(commitment_tx: CommitmentTransaction, counterparty_sig: Uint8Array, counterparty_htlc_sigs: Uint8Array[], holder_funding_key: Uint8Array, counterparty_funding_key: Uint8Array): HolderCommitmentTransaction {
		const ret: bigint = bindings.HolderCommitmentTransaction_new(CommonBase.get_ptr_of(commitment_tx), bindings.encodeUint8Array(counterparty_sig), bindings.encodeUint32Array(counterparty_htlc_sigs.map(counterparty_htlc_sigs_conv_12 => bindings.encodeUint8Array(counterparty_htlc_sigs_conv_12))), bindings.encodeUint8Array(holder_funding_key), bindings.encodeUint8Array(counterparty_funding_key));
		const ret_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		return ret_hu_conv;
	}

}
