
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * An input to contribute to a channel's funding transaction either when using the v2 channel
 * establishment protocol or when splicing.
 */
export class FundingTxInput extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.FundingTxInput_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.FundingTxInput_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the FundingTxInput
	 */
	public clone(): FundingTxInput {
		const ret: bigint = bindings.FundingTxInput_clone(this.ptr);
		const ret_hu_conv: FundingTxInput = new FundingTxInput(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the FundingTxInput object into a byte array which can be read by FundingTxInput_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.FundingTxInput_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a FundingTxInput from a byte array, created by FundingTxInput_write
	 */
	public static constructor_read(ser: Uint8Array): Result_FundingTxInputDecodeErrorZ {
		const ret: bigint = bindings.FundingTxInput_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_FundingTxInputDecodeErrorZ = Result_FundingTxInputDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an input spending a P2WPKH output from the given `prevtx` at index `vout`.
	 * 
	 * Uses [`Sequence::ENABLE_RBF_NO_LOCKTIME`] as the [`TxIn::sequence`], which can be overridden
	 * by [`set_sequence`].
	 * 
	 * Returns `Err` if no such output exists in `prevtx` at index `vout`.
	 * 
	 * [`TxIn::sequence`]: bitcoin::TxIn::sequence
	 * [`set_sequence`]: Self::set_sequence
	 */
	public static constructor_new_p2wpkh(prevtx: Uint8Array, vout: number): Result_FundingTxInputNoneZ {
		const ret: bigint = bindings.FundingTxInput_new_p2wpkh(bindings.encodeUint8Array(prevtx), vout);
		const ret_hu_conv: Result_FundingTxInputNoneZ = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an input spending a P2WSH output from the given `prevtx` at index `vout`.
	 * 
	 * Requires passing the weight of witness needed to satisfy the output's script.
	 * 
	 * Uses [`Sequence::ENABLE_RBF_NO_LOCKTIME`] as the [`TxIn::sequence`], which can be overridden
	 * by [`set_sequence`].
	 * 
	 * Returns `Err` if no such output exists in `prevtx` at index `vout`.
	 * 
	 * [`TxIn::sequence`]: bitcoin::TxIn::sequence
	 * [`set_sequence`]: Self::set_sequence
	 */
	public static constructor_new_p2wsh(prevtx: Uint8Array, vout: number, witness_weight: bigint): Result_FundingTxInputNoneZ {
		const ret: bigint = bindings.FundingTxInput_new_p2wsh(bindings.encodeUint8Array(prevtx), vout, witness_weight);
		const ret_hu_conv: Result_FundingTxInputNoneZ = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an input spending a P2TR output from the given `prevtx` at index `vout`.
	 * 
	 * This is meant for inputs spending a taproot output using the key path. See
	 * [`new_p2tr_script_spend`] for when spending using a script path.
	 * 
	 * Uses [`Sequence::ENABLE_RBF_NO_LOCKTIME`] as the [`TxIn::sequence`], which can be overridden
	 * by [`set_sequence`].
	 * 
	 * Returns `Err` if no such output exists in `prevtx` at index `vout`.
	 * 
	 * [`new_p2tr_script_spend`]: Self::new_p2tr_script_spend
	 * 
	 * [`TxIn::sequence`]: bitcoin::TxIn::sequence
	 * [`set_sequence`]: Self::set_sequence
	 */
	public static constructor_new_p2tr_key_spend(prevtx: Uint8Array, vout: number): Result_FundingTxInputNoneZ {
		const ret: bigint = bindings.FundingTxInput_new_p2tr_key_spend(bindings.encodeUint8Array(prevtx), vout);
		const ret_hu_conv: Result_FundingTxInputNoneZ = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates an input spending a P2TR output from the given `prevtx` at index `vout`.
	 * 
	 * Requires passing the weight of witness needed to satisfy a script path of the taproot
	 * output. See [`new_p2tr_key_spend`] for when spending using the key path.
	 * 
	 * Uses [`Sequence::ENABLE_RBF_NO_LOCKTIME`] as the [`TxIn::sequence`], which can be overridden
	 * by [`set_sequence`].
	 * 
	 * Returns `Err` if no such output exists in `prevtx` at index `vout`.
	 * 
	 * [`new_p2tr_key_spend`]: Self::new_p2tr_key_spend
	 * 
	 * [`TxIn::sequence`]: bitcoin::TxIn::sequence
	 * [`set_sequence`]: Self::set_sequence
	 */
	public static constructor_new_p2tr_script_spend(prevtx: Uint8Array, vout: number, witness_weight: bigint): Result_FundingTxInputNoneZ {
		const ret: bigint = bindings.FundingTxInput_new_p2tr_script_spend(bindings.encodeUint8Array(prevtx), vout, witness_weight);
		const ret_hu_conv: Result_FundingTxInputNoneZ = Result_FundingTxInputNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * The outpoint of the UTXO being spent.
	 */
	public outpoint(): OutPoint {
		const ret: bigint = bindings.FundingTxInput_outpoint(this.ptr);
		const ret_hu_conv: OutPoint = new OutPoint(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The sequence number to use in the [`TxIn`].
	 * 
	 * [`TxIn`]: bitcoin::TxIn
	 */
	public sequence(): number {
		const ret: number = bindings.FundingTxInput_sequence(this.ptr);
		return ret;
	}

	/**
	 * Sets the sequence number to use in the [`TxIn`].
	 * 
	 * [`TxIn`]: bitcoin::TxIn
	 */
	public set_sequence(sequence: number): void {
		bindings.FundingTxInput_set_sequence(this.ptr, sequence);
	}

	/**
	 * Converts the [`FundingTxInput`] into a [`Utxo`] for coin selection.
	 */
	public into_utxo(): Utxo {
		const ret: bigint = bindings.FundingTxInput_into_utxo(this.ptr);
		const ret_hu_conv: Utxo = new Utxo(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

}
