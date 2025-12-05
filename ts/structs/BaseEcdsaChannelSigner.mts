

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of BaseEcdsaChannelSigner */
export interface BaseEcdsaChannelSignerInterface {
	/**Create a signature for a counterparty's commitment transaction and associated HTLC transactions.
	 * 
	 * Policy checks should be implemented in this function, including checking the amount
	 * sent to us and checking the HTLCs.
	 * 
	 * The preimages of outbound and inbound HTLCs that were fulfilled since the last commitment
	 * are provided. A validating signer should ensure that an outbound HTLC output is removed
	 * only when the matching preimage is provided and after the corresponding inbound HTLC has
	 * been removed for forwarded payments.
	 * 
	 * Note that all the relevant preimages will be provided, but there may also be additional
	 * irrelevant or duplicate preimages.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelManager::signer_unblocked`] must be called.
	 * 
	 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
	 */
	sign_counterparty_commitment(channel_parameters: ChannelTransactionParameters, commitment_tx: CommitmentTransaction, inbound_htlc_preimages: Uint8Array[], outbound_htlc_preimages: Uint8Array[]): Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ;
	/**Creates a signature for a holder's commitment transaction.
	 * 
	 * This will be called
	 * - with a non-revoked `commitment_tx`.
	 * - with the latest `commitment_tx` when we initiate a force-close.
	 * 
	 * This may be called multiple times for the same transaction.
	 * 
	 * An external signer implementation should check that the commitment has not been revoked.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	sign_holder_commitment(channel_parameters: ChannelTransactionParameters, commitment_tx: HolderCommitmentTransaction): Result_ECDSASignatureNoneZ;
	/**Create a signature for the given input in a transaction spending an HTLC transaction output
	 * or a commitment transaction `to_local` output when our counterparty broadcasts an old state.
	 * 
	 * A justice transaction may claim multiple outputs at the same time if timelocks are
	 * similar, but only a signature for the input at index `input` should be signed for here.
	 * It may be called multiple times for same output(s) if a fee-bump is needed with regards
	 * to an upcoming timelock expiration.
	 * 
	 * Amount is value of the output spent by this input, committed to in the BIP 143 signature.
	 * 
	 * `per_commitment_key` is revocation secret which was provided by our counterparty when they
	 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
	 * not allow the spending of any funds by itself (you need our holder `revocation_secret` to do
	 * so).
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	sign_justice_revoked_output(channel_parameters: ChannelTransactionParameters, justice_tx: Uint8Array, input: number, amount: bigint, per_commitment_key: Uint8Array): Result_ECDSASignatureNoneZ;
	/**Create a signature for the given input in a transaction spending a commitment transaction
	 * HTLC output when our counterparty broadcasts an old state.
	 * 
	 * A justice transaction may claim multiple outputs at the same time if timelocks are
	 * similar, but only a signature for the input at index `input` should be signed for here.
	 * It may be called multiple times for same output(s) if a fee-bump is needed with regards
	 * to an upcoming timelock expiration.
	 * 
	 * `amount` is the value of the output spent by this input, committed to in the BIP 143
	 * signature.
	 * 
	 * `per_commitment_key` is revocation secret which was provided by our counterparty when they
	 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
	 * not allow the spending of any funds by itself (you need our holder revocation_secret to do
	 * so).
	 * 
	 * `htlc` holds HTLC elements (hash, timelock), thus changing the format of the witness script
	 * (which is committed to in the BIP 143 signatures).
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	sign_justice_revoked_htlc(channel_parameters: ChannelTransactionParameters, justice_tx: Uint8Array, input: number, amount: bigint, per_commitment_key: Uint8Array, htlc: HTLCOutputInCommitment): Result_ECDSASignatureNoneZ;
	/**Computes the signature for a commitment transaction's HTLC output used as an input within
	 * `htlc_tx`, which spends the commitment transaction at index `input`. The signature returned
	 * must be be computed using [`EcdsaSighashType::All`].
	 * 
	 * Note that this may be called for HTLCs in the penultimate commitment transaction if a
	 * [`ChannelMonitor`] [replica](https://github.com/lightningdevkit/rust-lightning/blob/main/GLOSSARY.md#monitor-replicas)
	 * broadcasts it before receiving the update for the latest commitment transaction.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`EcdsaSighashType::All`]: bitcoin::sighash::EcdsaSighashType::All
	 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	sign_holder_htlc_transaction(htlc_tx: Uint8Array, input: number, htlc_descriptor: HTLCDescriptor): Result_ECDSASignatureNoneZ;
	/**Create a signature for a claiming transaction for a HTLC output on a counterparty's commitment
	 * transaction, either offered or received.
	 * 
	 * Such a transaction may claim multiples offered outputs at same time if we know the
	 * preimage for each when we create it, but only the input at index `input` should be
	 * signed for here. It may be called multiple times for same output(s) if a fee-bump is
	 * needed with regards to an upcoming timelock expiration.
	 * 
	 * `witness_script` is either an offered or received script as defined in BOLT3 for HTLC
	 * outputs.
	 * 
	 * `amount` is value of the output spent by this input, committed to in the BIP 143 signature.
	 * 
	 * `per_commitment_point` is the dynamic point corresponding to the channel state
	 * detected onchain. It has been generated by our counterparty and is used to derive
	 * channel state keys, which are then included in the witness script and committed to in the
	 * BIP 143 signature.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	sign_counterparty_htlc_transaction(channel_parameters: ChannelTransactionParameters, htlc_tx: Uint8Array, input: number, amount: bigint, per_commitment_point: Uint8Array, htlc: HTLCOutputInCommitment): Result_ECDSASignatureNoneZ;
	/**Create a signature for a (proposed) closing transaction.
	 * 
	 * Note that, due to rounding, there may be one \"missing\" satoshi, and either party may have
	 * chosen to forgo their output as dust.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelManager::signer_unblocked`] must be called.
	 * 
	 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
	 */
	sign_closing_transaction(channel_parameters: ChannelTransactionParameters, closing_tx: ClosingTransaction): Result_ECDSASignatureNoneZ;
	/**Computes the signature for a commitment transaction's keyed anchor output used as an
	 * input within `anchor_tx`, which spends the commitment transaction, at index `input`.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	sign_holder_keyed_anchor_input(channel_parameters: ChannelTransactionParameters, anchor_tx: Uint8Array, input: number): Result_ECDSASignatureNoneZ;
	/**Signs a channel announcement message with our funding key proving it comes from one of the
	 * channel participants.
	 * 
	 * Channel announcements also require a signature from each node's network key. Our node
	 * signature is computed through [`NodeSigner::sign_gossip_message`].
	 * 
	 * This method is *not* asynchronous. If an `Err` is returned, the channel will not be
	 * publicly announced and our counterparty may (though likely will not) close the channel on
	 * us for violating the protocol.
	 * 
	 * [`NodeSigner::sign_gossip_message`]: crate::sign::NodeSigner::sign_gossip_message
	 */
	sign_channel_announcement_with_funding_key(channel_parameters: ChannelTransactionParameters, msg: UnsignedChannelAnnouncement): Result_ECDSASignatureNoneZ;
	/**Signs the shared input of a splice transaction with our funding key.
	 * 
	 * In splicing, the previous funding transaction output is spent as the input of
	 * the new funding transaction, and is a 2-of-2 multisig.
	 * 
	 * `channel_parameters`: The [`ChannelTransactionParameters`] for the channel's current funding
	 * transaction that is being spent in the splice transaction to sign. A new set of
	 * [`ChannelTransactionParameters`] will become available for the new funding transaction.
	 * 
	 * `input_index`: The index of the input within the new funding transaction `tx`,
	 * spending the previous funding transaction's output
	 */
	sign_splice_shared_input(channel_parameters: ChannelTransactionParameters, tx: Uint8Array, input_index: number): Uint8Array;
}

class LDKBaseEcdsaChannelSignerHolder {
	held: BaseEcdsaChannelSigner|null = null;
}

/**
 * A trait to sign Lightning channel transactions as described in
 * [BOLT 3](https://github.com/lightning/bolts/blob/master/03-transactions.md).
 * 
 * Signing services could be implemented on a hardware wallet and should implement signing
 * policies in order to be secure. Please refer to the [VLS Policy
 * Controls](https://gitlab.com/lightning-signer/validating-lightning-signer/-/blob/main/docs/policy-controls.md)
 * for an example of such policies.
 * 
 * Like [`ChannelSigner`], many of the methods allow errors to be returned to support async
 * signing. In such cases, the signing operation can be replayed by calling
 * [`ChannelManager::signer_unblocked`] or [`ChainMonitor::signer_unblocked`] (see individual
 * method documentation for which method should be called) once the result is ready, at which
 * point the channel operation will resume.
 * 
 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
 */
export class BaseEcdsaChannelSigner extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKBaseEcdsaChannelSigner|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.BaseEcdsaChannelSigner_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of BaseEcdsaChannelSigner from a given implementation */
	public static new_impl(arg: BaseEcdsaChannelSignerInterface, channelSigner_impl: ChannelSignerInterface): BaseEcdsaChannelSigner {
		const impl_holder: LDKBaseEcdsaChannelSignerHolder = new LDKBaseEcdsaChannelSignerHolder();
		let structImplementation = {
			sign_counterparty_commitment (channel_parameters: bigint, commitment_tx: bigint, inbound_htlc_preimages: number, outbound_htlc_preimages: number): bigint {
				const channel_parameters_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, channel_parameters);
				const commitment_tx_hu_conv: CommitmentTransaction = new CommitmentTransaction(null, commitment_tx);
				const inbound_htlc_preimages_conv_12_len: number = bindings.getArrayLength(inbound_htlc_preimages);
				const inbound_htlc_preimages_conv_12_arr: Uint8Array[] = new Array(inbound_htlc_preimages_conv_12_len).fill(null);
				for (var m = 0; m < inbound_htlc_preimages_conv_12_len; m++) {
					const inbound_htlc_preimages_conv_12: number = bindings.getU32ArrayElem(inbound_htlc_preimages, m);
					const inbound_htlc_preimages_conv_12_conv: Uint8Array = bindings.decodeUint8Array(inbound_htlc_preimages_conv_12);
					inbound_htlc_preimages_conv_12_arr[m] = inbound_htlc_preimages_conv_12_conv;
				}
				bindings.freeWasmMemory(inbound_htlc_preimages)
				const outbound_htlc_preimages_conv_12_len: number = bindings.getArrayLength(outbound_htlc_preimages);
				const outbound_htlc_preimages_conv_12_arr: Uint8Array[] = new Array(outbound_htlc_preimages_conv_12_len).fill(null);
				for (var m = 0; m < outbound_htlc_preimages_conv_12_len; m++) {
					const outbound_htlc_preimages_conv_12: number = bindings.getU32ArrayElem(outbound_htlc_preimages, m);
					const outbound_htlc_preimages_conv_12_conv: Uint8Array = bindings.decodeUint8Array(outbound_htlc_preimages_conv_12);
					outbound_htlc_preimages_conv_12_arr[m] = outbound_htlc_preimages_conv_12_conv;
				}
				bindings.freeWasmMemory(outbound_htlc_preimages)
				const ret: Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ = arg.sign_counterparty_commitment(channel_parameters_hu_conv, commitment_tx_hu_conv, inbound_htlc_preimages_conv_12_arr, outbound_htlc_preimages_conv_12_arr);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_holder_commitment (channel_parameters: bigint, commitment_tx: bigint): bigint {
				const channel_parameters_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, channel_parameters);
				const commitment_tx_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, commitment_tx);
				const ret: Result_ECDSASignatureNoneZ = arg.sign_holder_commitment(channel_parameters_hu_conv, commitment_tx_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_justice_revoked_output (channel_parameters: bigint, justice_tx: number, input: number, amount: bigint, per_commitment_key: number): bigint {
				const channel_parameters_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, channel_parameters);
				const justice_tx_conv: Uint8Array = bindings.decodeUint8Array(justice_tx);
				const per_commitment_key_conv: Uint8Array = bindings.decodeUint8Array(per_commitment_key);
				const ret: Result_ECDSASignatureNoneZ = arg.sign_justice_revoked_output(channel_parameters_hu_conv, justice_tx_conv, input, amount, per_commitment_key_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_justice_revoked_htlc (channel_parameters: bigint, justice_tx: number, input: number, amount: bigint, per_commitment_key: number, htlc: bigint): bigint {
				const channel_parameters_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, channel_parameters);
				const justice_tx_conv: Uint8Array = bindings.decodeUint8Array(justice_tx);
				const per_commitment_key_conv: Uint8Array = bindings.decodeUint8Array(per_commitment_key);
				const htlc_hu_conv: HTLCOutputInCommitment = new HTLCOutputInCommitment(null, htlc);
				const ret: Result_ECDSASignatureNoneZ = arg.sign_justice_revoked_htlc(channel_parameters_hu_conv, justice_tx_conv, input, amount, per_commitment_key_conv, htlc_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_holder_htlc_transaction (htlc_tx: number, input: number, htlc_descriptor: bigint): bigint {
				const htlc_tx_conv: Uint8Array = bindings.decodeUint8Array(htlc_tx);
				const htlc_descriptor_hu_conv: HTLCDescriptor = new HTLCDescriptor(null, htlc_descriptor);
				const ret: Result_ECDSASignatureNoneZ = arg.sign_holder_htlc_transaction(htlc_tx_conv, input, htlc_descriptor_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_counterparty_htlc_transaction (channel_parameters: bigint, htlc_tx: number, input: number, amount: bigint, per_commitment_point: number, htlc: bigint): bigint {
				const channel_parameters_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, channel_parameters);
				const htlc_tx_conv: Uint8Array = bindings.decodeUint8Array(htlc_tx);
				const per_commitment_point_conv: Uint8Array = bindings.decodeUint8Array(per_commitment_point);
				const htlc_hu_conv: HTLCOutputInCommitment = new HTLCOutputInCommitment(null, htlc);
				const ret: Result_ECDSASignatureNoneZ = arg.sign_counterparty_htlc_transaction(channel_parameters_hu_conv, htlc_tx_conv, input, amount, per_commitment_point_conv, htlc_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_closing_transaction (channel_parameters: bigint, closing_tx: bigint): bigint {
				const channel_parameters_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, channel_parameters);
				const closing_tx_hu_conv: ClosingTransaction = new ClosingTransaction(null, closing_tx);
				const ret: Result_ECDSASignatureNoneZ = arg.sign_closing_transaction(channel_parameters_hu_conv, closing_tx_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_holder_keyed_anchor_input (channel_parameters: bigint, anchor_tx: number, input: number): bigint {
				const channel_parameters_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, channel_parameters);
				const anchor_tx_conv: Uint8Array = bindings.decodeUint8Array(anchor_tx);
				const ret: Result_ECDSASignatureNoneZ = arg.sign_holder_keyed_anchor_input(channel_parameters_hu_conv, anchor_tx_conv, input);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_channel_announcement_with_funding_key (channel_parameters: bigint, msg: bigint): bigint {
				const channel_parameters_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, channel_parameters);
				const msg_hu_conv: UnsignedChannelAnnouncement = new UnsignedChannelAnnouncement(null, msg);
				const ret: Result_ECDSASignatureNoneZ = arg.sign_channel_announcement_with_funding_key(channel_parameters_hu_conv, msg_hu_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			sign_splice_shared_input (channel_parameters: bigint, tx: number, input_index: number): number {
				const channel_parameters_hu_conv: ChannelTransactionParameters = new ChannelTransactionParameters(null, channel_parameters);
				const tx_conv: Uint8Array = bindings.decodeUint8Array(tx);
				const ret: Uint8Array = arg.sign_splice_shared_input(channel_parameters_hu_conv, tx_conv, input_index);
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
		} as bindings.LDKBaseEcdsaChannelSigner;
		const channelSigner = ChannelSigner.new_impl(channelSigner_impl);
		const ptr_idx: [bigint, number] = bindings.LDKBaseEcdsaChannelSigner_new(structImplementation, channelSigner.instance_idx!);

		impl_holder.held = new BaseEcdsaChannelSigner(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		impl_holder.held.ptrs_to.push(channelSigner);
		return impl_holder.held!;
	}

	/**
	 * Create a signature for a counterparty's commitment transaction and associated HTLC transactions.
	 * 
	 * Policy checks should be implemented in this function, including checking the amount
	 * sent to us and checking the HTLCs.
	 * 
	 * The preimages of outbound and inbound HTLCs that were fulfilled since the last commitment
	 * are provided. A validating signer should ensure that an outbound HTLC output is removed
	 * only when the matching preimage is provided and after the corresponding inbound HTLC has
	 * been removed for forwarded payments.
	 * 
	 * Note that all the relevant preimages will be provided, but there may also be additional
	 * irrelevant or duplicate preimages.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelManager::signer_unblocked`] must be called.
	 * 
	 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
	 */
	public sign_counterparty_commitment(channel_parameters: ChannelTransactionParameters, commitment_tx: CommitmentTransaction, inbound_htlc_preimages: Uint8Array[], outbound_htlc_preimages: Uint8Array[]): Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ {
		const ret: bigint = bindings.BaseEcdsaChannelSigner_sign_counterparty_commitment(this.ptr, CommonBase.get_ptr_of(channel_parameters), CommonBase.get_ptr_of(commitment_tx), bindings.encodeUint32Array(inbound_htlc_preimages.map(inbound_htlc_preimages_conv_12 => bindings.encodeUint8Array(inbound_htlc_preimages_conv_12))), bindings.encodeUint32Array(outbound_htlc_preimages.map(outbound_htlc_preimages_conv_12 => bindings.encodeUint8Array(outbound_htlc_preimages_conv_12))));
		const ret_hu_conv: Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ = Result_C2Tuple_ECDSASignatureCVec_ECDSASignatureZZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Creates a signature for a holder's commitment transaction.
	 * 
	 * This will be called
	 * - with a non-revoked `commitment_tx`.
	 * - with the latest `commitment_tx` when we initiate a force-close.
	 * 
	 * This may be called multiple times for the same transaction.
	 * 
	 * An external signer implementation should check that the commitment has not been revoked.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	public sign_holder_commitment(channel_parameters: ChannelTransactionParameters, commitment_tx: HolderCommitmentTransaction): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.BaseEcdsaChannelSigner_sign_holder_commitment(this.ptr, CommonBase.get_ptr_of(channel_parameters), CommonBase.get_ptr_of(commitment_tx));
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a signature for the given input in a transaction spending an HTLC transaction output
	 * or a commitment transaction `to_local` output when our counterparty broadcasts an old state.
	 * 
	 * A justice transaction may claim multiple outputs at the same time if timelocks are
	 * similar, but only a signature for the input at index `input` should be signed for here.
	 * It may be called multiple times for same output(s) if a fee-bump is needed with regards
	 * to an upcoming timelock expiration.
	 * 
	 * Amount is value of the output spent by this input, committed to in the BIP 143 signature.
	 * 
	 * `per_commitment_key` is revocation secret which was provided by our counterparty when they
	 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
	 * not allow the spending of any funds by itself (you need our holder `revocation_secret` to do
	 * so).
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	public sign_justice_revoked_output(channel_parameters: ChannelTransactionParameters, justice_tx: Uint8Array, input: number, amount: bigint, per_commitment_key: Uint8Array): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.BaseEcdsaChannelSigner_sign_justice_revoked_output(this.ptr, CommonBase.get_ptr_of(channel_parameters), bindings.encodeUint8Array(justice_tx), input, amount, bindings.encodeUint8Array(per_commitment_key));
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a signature for the given input in a transaction spending a commitment transaction
	 * HTLC output when our counterparty broadcasts an old state.
	 * 
	 * A justice transaction may claim multiple outputs at the same time if timelocks are
	 * similar, but only a signature for the input at index `input` should be signed for here.
	 * It may be called multiple times for same output(s) if a fee-bump is needed with regards
	 * to an upcoming timelock expiration.
	 * 
	 * `amount` is the value of the output spent by this input, committed to in the BIP 143
	 * signature.
	 * 
	 * `per_commitment_key` is revocation secret which was provided by our counterparty when they
	 * revoked the state which they eventually broadcast. It's not a _holder_ secret key and does
	 * not allow the spending of any funds by itself (you need our holder revocation_secret to do
	 * so).
	 * 
	 * `htlc` holds HTLC elements (hash, timelock), thus changing the format of the witness script
	 * (which is committed to in the BIP 143 signatures).
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	public sign_justice_revoked_htlc(channel_parameters: ChannelTransactionParameters, justice_tx: Uint8Array, input: number, amount: bigint, per_commitment_key: Uint8Array, htlc: HTLCOutputInCommitment): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.BaseEcdsaChannelSigner_sign_justice_revoked_htlc(this.ptr, CommonBase.get_ptr_of(channel_parameters), bindings.encodeUint8Array(justice_tx), input, amount, bindings.encodeUint8Array(per_commitment_key), CommonBase.get_ptr_of(htlc));
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Computes the signature for a commitment transaction's HTLC output used as an input within
	 * `htlc_tx`, which spends the commitment transaction at index `input`. The signature returned
	 * must be be computed using [`EcdsaSighashType::All`].
	 * 
	 * Note that this may be called for HTLCs in the penultimate commitment transaction if a
	 * [`ChannelMonitor`] [replica](https://github.com/lightningdevkit/rust-lightning/blob/main/GLOSSARY.md#monitor-replicas)
	 * broadcasts it before receiving the update for the latest commitment transaction.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`EcdsaSighashType::All`]: bitcoin::sighash::EcdsaSighashType::All
	 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	public sign_holder_htlc_transaction(htlc_tx: Uint8Array, input: number, htlc_descriptor: HTLCDescriptor): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.BaseEcdsaChannelSigner_sign_holder_htlc_transaction(this.ptr, bindings.encodeUint8Array(htlc_tx), input, CommonBase.get_ptr_of(htlc_descriptor));
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a signature for a claiming transaction for a HTLC output on a counterparty's commitment
	 * transaction, either offered or received.
	 * 
	 * Such a transaction may claim multiples offered outputs at same time if we know the
	 * preimage for each when we create it, but only the input at index `input` should be
	 * signed for here. It may be called multiple times for same output(s) if a fee-bump is
	 * needed with regards to an upcoming timelock expiration.
	 * 
	 * `witness_script` is either an offered or received script as defined in BOLT3 for HTLC
	 * outputs.
	 * 
	 * `amount` is value of the output spent by this input, committed to in the BIP 143 signature.
	 * 
	 * `per_commitment_point` is the dynamic point corresponding to the channel state
	 * detected onchain. It has been generated by our counterparty and is used to derive
	 * channel state keys, which are then included in the witness script and committed to in the
	 * BIP 143 signature.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	public sign_counterparty_htlc_transaction(channel_parameters: ChannelTransactionParameters, htlc_tx: Uint8Array, input: number, amount: bigint, per_commitment_point: Uint8Array, htlc: HTLCOutputInCommitment): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.BaseEcdsaChannelSigner_sign_counterparty_htlc_transaction(this.ptr, CommonBase.get_ptr_of(channel_parameters), bindings.encodeUint8Array(htlc_tx), input, amount, bindings.encodeUint8Array(per_commitment_point), CommonBase.get_ptr_of(htlc));
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Create a signature for a (proposed) closing transaction.
	 * 
	 * Note that, due to rounding, there may be one \"missing\" satoshi, and either party may have
	 * chosen to forgo their output as dust.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelManager::signer_unblocked`] must be called.
	 * 
	 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
	 */
	public sign_closing_transaction(channel_parameters: ChannelTransactionParameters, closing_tx: ClosingTransaction): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.BaseEcdsaChannelSigner_sign_closing_transaction(this.ptr, CommonBase.get_ptr_of(channel_parameters), CommonBase.get_ptr_of(closing_tx));
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Computes the signature for a commitment transaction's keyed anchor output used as an
	 * input within `anchor_tx`, which spends the commitment transaction, at index `input`.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelMonitor::signer_unblocked`] must be called on its
	 * monitor or [`ChainMonitor::signer_unblocked`] called to attempt unblocking all monitors.
	 * 
	 * [`ChannelMonitor::signer_unblocked`]: crate::chain::channelmonitor::ChannelMonitor::signer_unblocked
	 * [`ChainMonitor::signer_unblocked`]: crate::chain::chainmonitor::ChainMonitor::signer_unblocked
	 */
	public sign_holder_keyed_anchor_input(channel_parameters: ChannelTransactionParameters, anchor_tx: Uint8Array, input: number): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.BaseEcdsaChannelSigner_sign_holder_keyed_anchor_input(this.ptr, CommonBase.get_ptr_of(channel_parameters), bindings.encodeUint8Array(anchor_tx), input);
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs a channel announcement message with our funding key proving it comes from one of the
	 * channel participants.
	 * 
	 * Channel announcements also require a signature from each node's network key. Our node
	 * signature is computed through [`NodeSigner::sign_gossip_message`].
	 * 
	 * This method is *not* asynchronous. If an `Err` is returned, the channel will not be
	 * publicly announced and our counterparty may (though likely will not) close the channel on
	 * us for violating the protocol.
	 * 
	 * [`NodeSigner::sign_gossip_message`]: crate::sign::NodeSigner::sign_gossip_message
	 */
	public sign_channel_announcement_with_funding_key(channel_parameters: ChannelTransactionParameters, msg: UnsignedChannelAnnouncement): Result_ECDSASignatureNoneZ {
		const ret: bigint = bindings.BaseEcdsaChannelSigner_sign_channel_announcement_with_funding_key(this.ptr, CommonBase.get_ptr_of(channel_parameters), CommonBase.get_ptr_of(msg));
		const ret_hu_conv: Result_ECDSASignatureNoneZ = Result_ECDSASignatureNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Signs the shared input of a splice transaction with our funding key.
	 * 
	 * In splicing, the previous funding transaction output is spent as the input of
	 * the new funding transaction, and is a 2-of-2 multisig.
	 * 
	 * `channel_parameters`: The [`ChannelTransactionParameters`] for the channel's current funding
	 * transaction that is being spent in the splice transaction to sign. A new set of
	 * [`ChannelTransactionParameters`] will become available for the new funding transaction.
	 * 
	 * `input_index`: The index of the input within the new funding transaction `tx`,
	 * spending the previous funding transaction's output
	 */
	public sign_splice_shared_input(channel_parameters: ChannelTransactionParameters, tx: Uint8Array, input_index: number): Uint8Array {
		const ret: number = bindings.BaseEcdsaChannelSigner_sign_splice_shared_input(this.ptr, CommonBase.get_ptr_of(channel_parameters), bindings.encodeUint8Array(tx), input_index);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
