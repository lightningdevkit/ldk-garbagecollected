package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;

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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelSigner extends CommonBase {
	final bindings.LDKChannelSigner bindings_instance;
	ChannelSigner(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private ChannelSigner(bindings.LDKChannelSigner arg) {
		super(bindings.LDKChannelSigner_new(arg));
		this.ptrs_to.add(arg);
		this.bindings_instance = arg;
	}
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		if (ptr != 0) { bindings.ChannelSigner_free(ptr); } super.finalize();
	}
	/**
	 * Destroys the object, freeing associated resources. After this call, any access
	 * to this object may result in a SEGFAULT or worse.
	 *
	 * You should generally NEVER call this method. You should let the garbage collector
	 * do this for you when it finalizes objects. However, it may be useful for types
	 * which represent locks and should be closed immediately to avoid holding locks
	 * until the GC runs.
	 */
	public void destroy() {
		if (ptr != 0) { bindings.ChannelSigner_free(ptr); }
		ptr = 0;
	}
	public static interface ChannelSignerInterface {
		/**
		 * Gets the per-commitment point for a specific commitment number
		 * 
		 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
		 * 
		 * This method is *not* asynchronous. This method is expected to always return `Ok`
		 * immediately after we reconnect to peers, and returning an `Err` may lead to an immediate
		 * `panic`. This method will be made asynchronous in a future release.
		 */
		Result_PublicKeyNoneZ get_per_commitment_point(long idx);
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
		Result__u832NoneZ release_commitment_secret(long idx);
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
		Result_NoneNoneZ validate_holder_commitment(HolderCommitmentTransaction holder_tx, byte[][] outbound_htlc_preimages);
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
		Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret);
		/**
		 * Returns the holder channel public keys and basepoints. This should only be called once
		 * during channel creation and as such implementations are allowed undefined behavior if
		 * called more than once.
		 * 
		 * This method is *not* asynchronous. Instead, the value must be computed locally or in
		 * advance and cached.
		 */
		ChannelPublicKeys pubkeys();
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
		byte[] new_funding_pubkey(byte[] splice_parent_funding_txid);
		/**
		 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
		 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
		 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
		 * 
		 * This method is *not* asynchronous. Instead, the value must be cached locally.
		 */
		byte[] channel_keys_id();
	}
	private static class LDKChannelSignerHolder { ChannelSigner held; }
	public static ChannelSigner new_impl(ChannelSignerInterface arg) {
		final LDKChannelSignerHolder impl_holder = new LDKChannelSignerHolder();
		impl_holder.held = new ChannelSigner(new bindings.LDKChannelSigner() {
			@Override public long get_per_commitment_point(long idx) {
				Result_PublicKeyNoneZ ret = arg.get_per_commitment_point(idx);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long release_commitment_secret(long idx) {
				Result__u832NoneZ ret = arg.release_commitment_secret(idx);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long validate_holder_commitment(long holder_tx, byte[][] outbound_htlc_preimages) {
				org.ldk.structs.HolderCommitmentTransaction holder_tx_hu_conv = null; if (holder_tx < 0 || holder_tx > 4096) { holder_tx_hu_conv = new org.ldk.structs.HolderCommitmentTransaction(null, holder_tx); }
				Result_NoneNoneZ ret = arg.validate_holder_commitment(holder_tx_hu_conv, outbound_htlc_preimages);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long validate_counterparty_revocation(long idx, byte[] secret) {
				Result_NoneNoneZ ret = arg.validate_counterparty_revocation(idx, secret);
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public long pubkeys() {
				ChannelPublicKeys ret = arg.pubkeys();
				Reference.reachabilityFence(arg);
				long result = ret.clone_ptr();
				return result;
			}
			@Override public byte[] new_funding_pubkey(byte[] splice_parent_funding_txid) {
				byte[] ret = arg.new_funding_pubkey(splice_parent_funding_txid);
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 33);
				return result;
			}
			@Override public byte[] channel_keys_id() {
				byte[] ret = arg.channel_keys_id();
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
		});
		return impl_holder.held;
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
	public Result_PublicKeyNoneZ get_per_commitment_point(long idx) {
		long ret = bindings.ChannelSigner_get_per_commitment_point(this.ptr, idx);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(idx);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PublicKeyNoneZ ret_hu_conv = Result_PublicKeyNoneZ.constr_from_ptr(ret);
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
	public Result__u832NoneZ release_commitment_secret(long idx) {
		long ret = bindings.ChannelSigner_release_commitment_secret(this.ptr, idx);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(idx);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result__u832NoneZ ret_hu_conv = Result__u832NoneZ.constr_from_ptr(ret);
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
	public Result_NoneNoneZ validate_holder_commitment(org.ldk.structs.HolderCommitmentTransaction holder_tx, byte[][] outbound_htlc_preimages) {
		long ret = bindings.ChannelSigner_validate_holder_commitment(this.ptr, holder_tx.ptr, outbound_htlc_preimages != null ? Arrays.stream(outbound_htlc_preimages).map(outbound_htlc_preimages_conv_8 -> InternalUtils.check_arr_len(outbound_htlc_preimages_conv_8, 32)).toArray(byte[][]::new) : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(holder_tx);
		Reference.reachabilityFence(outbound_htlc_preimages);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
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
	public Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret) {
		long ret = bindings.ChannelSigner_validate_counterparty_revocation(this.ptr, idx, InternalUtils.check_arr_len(secret, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(idx);
		Reference.reachabilityFence(secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
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
	public ChannelPublicKeys pubkeys() {
		long ret = bindings.ChannelSigner_pubkeys(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
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
	public byte[] new_funding_pubkey(byte[] splice_parent_funding_txid) {
		byte[] ret = bindings.ChannelSigner_new_funding_pubkey(this.ptr, InternalUtils.check_arr_len(splice_parent_funding_txid, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(splice_parent_funding_txid);
		return ret;
	}

	/**
	 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
	 * 
	 * This method is *not* asynchronous. Instead, the value must be cached locally.
	 */
	public byte[] channel_keys_id() {
		byte[] ret = bindings.ChannelSigner_channel_keys_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
