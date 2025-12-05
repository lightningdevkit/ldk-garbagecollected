
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * This class tracks the per-transaction information needed to build a commitment transaction and will
 * actually build it and sign.  It is used for holder transactions that we sign only when needed
 * and for transactions we sign for the counterparty.
 * 
 * This class can be used inside a signer implementation to generate a signature given the relevant
 * secret key.
 */
export class CommitmentTransaction extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.CommitmentTransaction_free);
	}

	public clone_ptr(): bigint {
		const ret: bigint = bindings.CommitmentTransaction_clone_ptr(this.ptr);
		return ret;
	}

	/**
	 * Creates a copy of the CommitmentTransaction
	 */
	public clone(): CommitmentTransaction {
		const ret: bigint = bindings.CommitmentTransaction_clone(this.ptr);
		const ret_hu_conv: CommitmentTransaction = new CommitmentTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the CommitmentTransaction object into a byte array which can be read by CommitmentTransaction_read
	 */
	public write(): Uint8Array {
		const ret: number = bindings.CommitmentTransaction_write(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Read a CommitmentTransaction from a byte array, created by CommitmentTransaction_write
	 */
	public static constructor_read(ser: Uint8Array): Result_CommitmentTransactionDecodeErrorZ {
		const ret: bigint = bindings.CommitmentTransaction_read(bindings.encodeUint8Array(ser));
		const ret_hu_conv: Result_CommitmentTransactionDecodeErrorZ = Result_CommitmentTransactionDecodeErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new `CommitmentTransaction` from the list of HTLCs and the direct balances.
	 * 
	 * All HTLCs MUST be above the dust limit for the channel.
	 * The broadcaster and countersignatory amounts MUST be either 0 or above dust. If the amount
	 * is 0, the corresponding output will be omitted from the transaction.
	 */
	public static constructor_new(commitment_number: bigint, per_commitment_point: Uint8Array, to_broadcaster_value_sat: bigint, to_countersignatory_value_sat: bigint, feerate_per_kw: number, nondust_htlcs: HTLCOutputInCommitment[], channel_parameters: DirectedChannelTransactionParameters): CommitmentTransaction {
		const ret: bigint = bindings.CommitmentTransaction_new(commitment_number, bindings.encodeUint8Array(per_commitment_point), to_broadcaster_value_sat, to_countersignatory_value_sat, feerate_per_kw, bindings.encodeUint64Array(nondust_htlcs.map(nondust_htlcs_conv_24 => CommonBase.get_ptr_of(nondust_htlcs_conv_24))), CommonBase.get_ptr_of(channel_parameters));
		const ret_hu_conv: CommitmentTransaction = new CommitmentTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, channel_parameters);
		return ret_hu_conv;
	}

	/**
	 * The backwards-counting commitment number
	 */
	public commitment_number(): bigint {
		const ret: bigint = bindings.CommitmentTransaction_commitment_number(this.ptr);
		return ret;
	}

	/**
	 * The per commitment point used by the broadcaster.
	 */
	public per_commitment_point(): Uint8Array {
		const ret: number = bindings.CommitmentTransaction_per_commitment_point(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The value to be sent to the broadcaster
	 */
	public to_broadcaster_value_sat(): bigint {
		const ret: bigint = bindings.CommitmentTransaction_to_broadcaster_value_sat(this.ptr);
		return ret;
	}

	/**
	 * The value to be sent to the counterparty
	 */
	public to_countersignatory_value_sat(): bigint {
		const ret: bigint = bindings.CommitmentTransaction_to_countersignatory_value_sat(this.ptr);
		return ret;
	}

	/**
	 * The feerate paid per 1000-weight-unit we negotiated with our
	 * peer for this commitment transaction. Note that the actual
	 * feerate of the commitment transaction may be higher than the
	 * negotiated feerate.
	 */
	public negotiated_feerate_per_kw(): number {
		const ret: number = bindings.CommitmentTransaction_negotiated_feerate_per_kw(this.ptr);
		return ret;
	}

	/**
	 * Trust our pre-built transaction and derived transaction creation public keys.
	 * 
	 * Applies a wrapper which allows access to these fields.
	 * 
	 * This should only be used if you fully trust the builder of this object.  It should not
	 * be used by an external signer - instead use the verify function.
	 */
	public trust(): TrustedCommitmentTransaction {
		const ret: bigint = bindings.CommitmentTransaction_trust(this.ptr);
		const ret_hu_conv: TrustedCommitmentTransaction = new TrustedCommitmentTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Verify our pre-built transaction and derived transaction creation public keys.
	 * 
	 * Applies a wrapper which allows access to these fields.
	 * 
	 * An external validating signer must call this method before signing
	 * or using the built transaction.
	 */
	public verify(channel_parameters: DirectedChannelTransactionParameters): Result_TrustedCommitmentTransactionNoneZ {
		const ret: bigint = bindings.CommitmentTransaction_verify(this.ptr, CommonBase.get_ptr_of(channel_parameters));
		const ret_hu_conv: Result_TrustedCommitmentTransactionNoneZ = Result_TrustedCommitmentTransactionNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, channel_parameters);
		return ret_hu_conv;
	}

}
