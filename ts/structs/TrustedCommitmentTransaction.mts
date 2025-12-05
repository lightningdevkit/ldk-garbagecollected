
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


/**
 * A wrapper on CommitmentTransaction indicating that the derived fields (the built bitcoin
 * transaction and the transaction creation keys) are trusted.
 * 
 * See trust() and verify() functions on CommitmentTransaction.
 * 
 * This structure implements Deref.
 */
export class TrustedCommitmentTransaction extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.TrustedCommitmentTransaction_free);
	}

	/**
	 * The transaction ID of the built Bitcoin transaction
	 */
	public txid(): Uint8Array {
		const ret: number = bindings.TrustedCommitmentTransaction_txid(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * The pre-built Bitcoin commitment transaction
	 */
	public built_transaction(): BuiltCommitmentTransaction {
		const ret: bigint = bindings.TrustedCommitmentTransaction_built_transaction(this.ptr);
		const ret_hu_conv: BuiltCommitmentTransaction = new BuiltCommitmentTransaction(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The pre-calculated transaction creation public keys.
	 */
	public keys(): TxCreationKeys {
		const ret: bigint = bindings.TrustedCommitmentTransaction_keys(this.ptr);
		const ret_hu_conv: TxCreationKeys = new TxCreationKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Should anchors be used.
	 */
	public channel_type_features(): ChannelTypeFeatures {
		const ret: bigint = bindings.TrustedCommitmentTransaction_channel_type_features(this.ptr);
		const ret_hu_conv: ChannelTypeFeatures = new ChannelTypeFeatures(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Get a signature for each HTLC which was included in the commitment transaction (ie for
	 * which HTLCOutputInCommitment::transaction_output_index.is_some()).
	 * 
	 * The returned Vec has one entry for each HTLC, and in the same order.
	 * 
	 * This function is only valid in the holder commitment context, it always uses EcdsaSighashType::All.
	 */
	public get_htlc_sigs(htlc_base_key: Uint8Array, channel_parameters: DirectedChannelTransactionParameters, entropy_source: EntropySource): Result_CVec_ECDSASignatureZNoneZ {
		const ret: bigint = bindings.TrustedCommitmentTransaction_get_htlc_sigs(this.ptr, bindings.encodeUint8Array(htlc_base_key), CommonBase.get_ptr_of(channel_parameters), CommonBase.get_ptr_of(entropy_source));
		const ret_hu_conv: Result_CVec_ECDSASignatureZNoneZ = Result_CVec_ECDSASignatureZNoneZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(this, channel_parameters);
		CommonBase.add_ref_from(this, entropy_source);
		return ret_hu_conv;
	}

	/**
	 * Returns the index of the revokeable output, i.e. the `to_local` output sending funds to
	 * the broadcaster, in the built transaction, if any exists.
	 * 
	 * There are two cases where this may return `None`:
	 * - The balance of the revokeable output is below the dust limit (only found on commitments
	 * early in the channel's lifetime, i.e. before the channel reserve is met).
	 * - This commitment was created before LDK 0.0.117. In this case, the
	 * commitment transaction previously didn't contain enough information to locate the
	 * revokeable output.
	 */
	public revokeable_output_index(): Option_usizeZ {
		const ret: bigint = bindings.TrustedCommitmentTransaction_revokeable_output_index(this.ptr);
		const ret_hu_conv: Option_usizeZ = Option_usizeZ.constr_from_ptr(ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Helper method to build an unsigned justice transaction spending the revokeable
	 * `to_local` output to a destination script. Fee estimation accounts for the expected
	 * revocation witness data that will be added when signed.
	 * 
	 * This method will error if the given fee rate results in a fee greater than the value
	 * of the output being spent, or if there exists no revokeable `to_local` output on this
	 * commitment transaction. See [`Self::revokeable_output_index`] for more details.
	 * 
	 * The built transaction will allow fee bumping with RBF, and this method takes
	 * `feerate_per_kw` as an input such that multiple copies of a justice transaction at different
	 * fee rates may be built.
	 */
	public build_to_local_justice_tx(feerate_per_kw: bigint, destination_script: Uint8Array): Result_TransactionNoneZ {
		const ret: bigint = bindings.TrustedCommitmentTransaction_build_to_local_justice_tx(this.ptr, feerate_per_kw, bindings.encodeUint8Array(destination_script));
		const ret_hu_conv: Result_TransactionNoneZ = Result_TransactionNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

}
