

import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'



/** An implementation of ChannelSigner */
export interface ChannelSignerInterface {
	/**Gets the per-commitment point for a specific commitment number
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 * 
	 * This method is *not* asynchronous. This method is expected to always return `Ok`
	 * immediately after we reconnect to peers, and returning an `Err` may lead to an immediate
	 * `panic`. This method will be made asynchronous in a future release.
	 */
	get_per_commitment_point(idx: bigint): Result_PublicKeyNoneZ;
	/**Gets the commitment secret for a specific commitment number as part of the revocation process
	 * 
	 * An external signer implementation should error here if the commitment was already signed
	 * and should refuse to sign it in the future.
	 * 
	 * May be called more than once for the same index.
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelManager::signer_unblocked`] must be called.
	 * 
	 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
	 */
	release_commitment_secret(idx: bigint): Result__u832NoneZ;
	/**Validate the counterparty's signatures on the holder commitment transaction and HTLCs.
	 * 
	 * This is required in order for the signer to make sure that releasing a commitment
	 * secret won't leave us without a broadcastable holder transaction.
	 * Policy checks should be implemented in this function, including checking the amount
	 * sent to us and checking the HTLCs.
	 * 
	 * The preimages of outbound HTLCs that were fulfilled since the last commitment are provided.
	 * A validating signer should ensure that an HTLC output is removed only when the matching
	 * preimage is provided, or when the value to holder is restored.
	 * 
	 * Note that all the relevant preimages will be provided, but there may also be additional
	 * irrelevant or duplicate preimages.
	 * 
	 * This method is *not* asynchronous. If an `Err` is returned, the channel will be immediately
	 * closed. If you wish to make this operation asynchronous, you should instead return `Ok(())`
	 * and pause future signing operations until this validation completes.
	 */
	validate_holder_commitment(holder_tx: HolderCommitmentTransaction, outbound_htlc_preimages: Uint8Array[]): Result_NoneNoneZ;
	/**Validate the counterparty's revocation.
	 * 
	 * This is required in order for the signer to make sure that the state has moved
	 * forward and it is safe to sign the next counterparty commitment.
	 * 
	 * This method is *not* asynchronous. If an `Err` is returned, the channel will be immediately
	 * closed. If you wish to make this operation asynchronous, you should instead return `Ok(())`
	 * and pause future signing operations until this validation completes.
	 */
	validate_counterparty_revocation(idx: bigint, secret: Uint8Array): Result_NoneNoneZ;
	/**Returns the holder channel public keys and basepoints. This should only be called once
	 * during channel creation and as such implementations are allowed undefined behavior if
	 * called more than once.
	 * 
	 * This method is *not* asynchronous. Instead, the value must be computed locally or in
	 * advance and cached.
	 */
	pubkeys(): ChannelPublicKeys;
	/**Returns a new funding pubkey (i.e. our public which is used in a 2-of-2 with the
	 * counterparty's key to to lock the funds on-chain) for a spliced channel.
	 * 
	 * `splice_parent_funding_txid` can be used to compute a tweak with which to rotate the base
	 * key (which will then be available later in signing operations via
	 * [`ChannelTransactionParameters::splice_parent_funding_txid`]).
	 * 
	 * This method is *not* asynchronous. Instead, the value must be cached locally.
	 */
	new_funding_pubkey(splice_parent_funding_txid: Uint8Array): Uint8Array;
	/**Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
	 * 
	 * This method is *not* asynchronous. Instead, the value must be cached locally.
	 */
	channel_keys_id(): Uint8Array;
}

class LDKChannelSignerHolder {
	held: ChannelSigner|null = null;
}

/**
 * A trait to handle Lightning channel key material without concretizing the channel type or
 * the signature mechanism.
 * 
 * Several methods allow errors to be returned to support async signing. In such cases, the
 * signing operation can be replayed by calling [`ChannelManager::signer_unblocked`] once the
 * result is ready, at which point the channel operation will resume. Methods which allow for
 * async results are explicitly documented as such
 * 
 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
 */
export class ChannelSigner extends CommonBase {
	/* @internal */
	public bindings_instance: bindings.LDKChannelSigner|null;

	/* @internal */
	public instance_idx?: number;

	/* @internal */
	constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelSigner_free);
		this.bindings_instance = null;
	}

	/** Creates a new instance of ChannelSigner from a given implementation */
	public static new_impl(arg: ChannelSignerInterface): ChannelSigner {
		const impl_holder: LDKChannelSignerHolder = new LDKChannelSignerHolder();
		let structImplementation = {
			get_per_commitment_point (idx: bigint): bigint {
				const ret: Result_PublicKeyNoneZ = arg.get_per_commitment_point(idx);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			release_commitment_secret (idx: bigint): bigint {
				const ret: Result__u832NoneZ = arg.release_commitment_secret(idx);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			validate_holder_commitment (holder_tx: bigint, outbound_htlc_preimages: number): bigint {
				const holder_tx_hu_conv: HolderCommitmentTransaction = new HolderCommitmentTransaction(null, holder_tx);
				const outbound_htlc_preimages_conv_12_len: number = bindings.getArrayLength(outbound_htlc_preimages);
				const outbound_htlc_preimages_conv_12_arr: Uint8Array[] = new Array(outbound_htlc_preimages_conv_12_len).fill(null);
				for (var m = 0; m < outbound_htlc_preimages_conv_12_len; m++) {
					const outbound_htlc_preimages_conv_12: number = bindings.getU32ArrayElem(outbound_htlc_preimages, m);
					const outbound_htlc_preimages_conv_12_conv: Uint8Array = bindings.decodeUint8Array(outbound_htlc_preimages_conv_12);
					outbound_htlc_preimages_conv_12_arr[m] = outbound_htlc_preimages_conv_12_conv;
				}
				bindings.freeWasmMemory(outbound_htlc_preimages)
				const ret: Result_NoneNoneZ = arg.validate_holder_commitment(holder_tx_hu_conv, outbound_htlc_preimages_conv_12_arr);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			validate_counterparty_revocation (idx: bigint, secret: number): bigint {
				const secret_conv: Uint8Array = bindings.decodeUint8Array(secret);
				const ret: Result_NoneNoneZ = arg.validate_counterparty_revocation(idx, secret_conv);
				const result: bigint = ret.clone_ptr();
				return result;
			},
			pubkeys (): bigint {
				const ret: ChannelPublicKeys = arg.pubkeys();
				const result: bigint = ret.clone_ptr();
				return result;
			},
			new_funding_pubkey (splice_parent_funding_txid: number): number {
				const splice_parent_funding_txid_conv: Uint8Array = bindings.decodeUint8Array(splice_parent_funding_txid);
				const ret: Uint8Array = arg.new_funding_pubkey(splice_parent_funding_txid_conv);
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
			channel_keys_id (): number {
				const ret: Uint8Array = arg.channel_keys_id();
				const result: number = bindings.encodeUint8Array(ret);
				return result;
			},
		} as bindings.LDKChannelSigner;
		const ptr_idx: [bigint, number] = bindings.LDKChannelSigner_new(structImplementation);

		impl_holder.held = new ChannelSigner(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = structImplementation;
		return impl_holder.held!;
	}

	/**
	 * Gets the per-commitment point for a specific commitment number
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 * 
	 * This method is *not* asynchronous. This method is expected to always return `Ok`
	 * immediately after we reconnect to peers, and returning an `Err` may lead to an immediate
	 * `panic`. This method will be made asynchronous in a future release.
	 */
	public get_per_commitment_point(idx: bigint): Result_PublicKeyNoneZ {
		const ret: bigint = bindings.ChannelSigner_get_per_commitment_point(this.ptr, idx);
		const ret_hu_conv: Result_PublicKeyNoneZ = Result_PublicKeyNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the commitment secret for a specific commitment number as part of the revocation process
	 * 
	 * An external signer implementation should error here if the commitment was already signed
	 * and should refuse to sign it in the future.
	 * 
	 * May be called more than once for the same index.
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 * 
	 * An `Err` can be returned to signal that the signer is unavailable/cannot produce a valid
	 * signature and should be retried later. Once the signer is ready to provide a signature after
	 * previously returning an `Err`, [`ChannelManager::signer_unblocked`] must be called.
	 * 
	 * [`ChannelManager::signer_unblocked`]: crate::ln::channelmanager::ChannelManager::signer_unblocked
	 */
	public release_commitment_secret(idx: bigint): Result__u832NoneZ {
		const ret: bigint = bindings.ChannelSigner_release_commitment_secret(this.ptr, idx);
		const ret_hu_conv: Result__u832NoneZ = Result__u832NoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Validate the counterparty's signatures on the holder commitment transaction and HTLCs.
	 * 
	 * This is required in order for the signer to make sure that releasing a commitment
	 * secret won't leave us without a broadcastable holder transaction.
	 * Policy checks should be implemented in this function, including checking the amount
	 * sent to us and checking the HTLCs.
	 * 
	 * The preimages of outbound HTLCs that were fulfilled since the last commitment are provided.
	 * A validating signer should ensure that an HTLC output is removed only when the matching
	 * preimage is provided, or when the value to holder is restored.
	 * 
	 * Note that all the relevant preimages will be provided, but there may also be additional
	 * irrelevant or duplicate preimages.
	 * 
	 * This method is *not* asynchronous. If an `Err` is returned, the channel will be immediately
	 * closed. If you wish to make this operation asynchronous, you should instead return `Ok(())`
	 * and pause future signing operations until this validation completes.
	 */
	public validate_holder_commitment(holder_tx: HolderCommitmentTransaction, outbound_htlc_preimages: Uint8Array[]): Result_NoneNoneZ {
		const ret: bigint = bindings.ChannelSigner_validate_holder_commitment(this.ptr, CommonBase.get_ptr_of(holder_tx), bindings.encodeUint32Array(outbound_htlc_preimages.map(outbound_htlc_preimages_conv_12 => bindings.encodeUint8Array(outbound_htlc_preimages_conv_12))));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Validate the counterparty's revocation.
	 * 
	 * This is required in order for the signer to make sure that the state has moved
	 * forward and it is safe to sign the next counterparty commitment.
	 * 
	 * This method is *not* asynchronous. If an `Err` is returned, the channel will be immediately
	 * closed. If you wish to make this operation asynchronous, you should instead return `Ok(())`
	 * and pause future signing operations until this validation completes.
	 */
	public validate_counterparty_revocation(idx: bigint, secret: Uint8Array): Result_NoneNoneZ {
		const ret: bigint = bindings.ChannelSigner_validate_counterparty_revocation(this.ptr, idx, bindings.encodeUint8Array(secret));
		const ret_hu_conv: Result_NoneNoneZ = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns the holder channel public keys and basepoints. This should only be called once
	 * during channel creation and as such implementations are allowed undefined behavior if
	 * called more than once.
	 * 
	 * This method is *not* asynchronous. Instead, the value must be computed locally or in
	 * advance and cached.
	 */
	public pubkeys(): ChannelPublicKeys {
		const ret: bigint = bindings.ChannelSigner_pubkeys(this.ptr);
		const ret_hu_conv: ChannelPublicKeys = new ChannelPublicKeys(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Returns a new funding pubkey (i.e. our public which is used in a 2-of-2 with the
	 * counterparty's key to to lock the funds on-chain) for a spliced channel.
	 * 
	 * `splice_parent_funding_txid` can be used to compute a tweak with which to rotate the base
	 * key (which will then be available later in signing operations via
	 * [`ChannelTransactionParameters::splice_parent_funding_txid`]).
	 * 
	 * This method is *not* asynchronous. Instead, the value must be cached locally.
	 */
	public new_funding_pubkey(splice_parent_funding_txid: Uint8Array): Uint8Array {
		const ret: number = bindings.ChannelSigner_new_funding_pubkey(this.ptr, bindings.encodeUint8Array(splice_parent_funding_txid));
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
	 * 
	 * This method is *not* asynchronous. Instead, the value must be cached locally.
	 */
	public channel_keys_id(): Uint8Array {
		const ret: number = bindings.ChannelSigner_channel_keys_id(this.ptr);
		const ret_conv: Uint8Array = bindings.decodeUint8Array(ret);
		return ret_conv;
	}

}
