
using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {



/** An implementation of ChannelSigner */
public interface ChannelSignerInterface {
	/**Gets the per-commitment point for a specific commitment number
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 * 
	 * This method is *not* asynchronous. This method is expected to always return `Ok`
	 * immediately after we reconnect to peers, and returning an `Err` may lead to an immediate
	 * `panic`. This method will be made asynchronous in a future release.
	 */
	Result_PublicKeyNoneZ get_per_commitment_point(long idx);
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
	Result__u832NoneZ release_commitment_secret(long idx);
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
	Result_NoneNoneZ validate_holder_commitment(org.ldk.structs.HolderCommitmentTransaction holder_tx, byte[][] outbound_htlc_preimages);
	/**Validate the counterparty's revocation.
	 * 
	 * This is required in order for the signer to make sure that the state has moved
	 * forward and it is safe to sign the next counterparty commitment.
	 * 
	 * This method is *not* asynchronous. If an `Err` is returned, the channel will be immediately
	 * closed. If you wish to make this operation asynchronous, you should instead return `Ok(())`
	 * and pause future signing operations until this validation completes.
	 */
	Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret);
	/**Returns the holder channel public keys and basepoints. This should only be called once
	 * during channel creation and as such implementations are allowed undefined behavior if
	 * called more than once.
	 * 
	 * This method is *not* asynchronous. Instead, the value must be computed locally or in
	 * advance and cached.
	 */
	ChannelPublicKeys pubkeys();
	/**Returns a new funding pubkey (i.e. our public which is used in a 2-of-2 with the
	 * counterparty's key to to lock the funds on-chain) for a spliced channel.
	 * 
	 * `splice_parent_funding_txid` can be used to compute a tweak with which to rotate the base
	 * key (which will then be available later in signing operations via
	 * [`ChannelTransactionParameters::splice_parent_funding_txid`]).
	 * 
	 * This method is *not* asynchronous. Instead, the value must be cached locally.
	 */
	byte[] new_funding_pubkey(byte[] splice_parent_funding_txid);
	/**Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
	 * 
	 * This method is *not* asynchronous. Instead, the value must be cached locally.
	 */
	byte[] channel_keys_id();
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
public class ChannelSigner : CommonBase {
	internal bindings.LDKChannelSigner bindings_instance;
	internal long instance_idx;

	internal ChannelSigner(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	~ChannelSigner() {
		if (ptr != 0) { bindings.ChannelSigner_free(ptr); }
	}

	private class LDKChannelSignerHolder { internal ChannelSigner held; }
	private class LDKChannelSignerImpl : bindings.LDKChannelSigner {
		internal LDKChannelSignerImpl(ChannelSignerInterface arg, LDKChannelSignerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ChannelSignerInterface arg;
		private LDKChannelSignerHolder impl_holder;
		public long get_per_commitment_point(long _idx) {
			Result_PublicKeyNoneZ ret = arg.get_per_commitment_point(_idx);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long release_commitment_secret(long _idx) {
			Result__u832NoneZ ret = arg.release_commitment_secret(_idx);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long validate_holder_commitment(long _holder_tx, long _outbound_htlc_preimages) {
			org.ldk.structs.HolderCommitmentTransaction _holder_tx_hu_conv = null; if (_holder_tx < 0 || _holder_tx > 4096) { _holder_tx_hu_conv = new org.ldk.structs.HolderCommitmentTransaction(null, _holder_tx); }
			int _outbound_htlc_preimages_conv_8_len = InternalUtils.getArrayLength(_outbound_htlc_preimages);
			byte[][] _outbound_htlc_preimages_conv_8_arr = new byte[_outbound_htlc_preimages_conv_8_len][];
			for (int i = 0; i < _outbound_htlc_preimages_conv_8_len; i++) {
				long _outbound_htlc_preimages_conv_8 = InternalUtils.getU64ArrayElem(_outbound_htlc_preimages, i);
				byte[] _outbound_htlc_preimages_conv_8_conv = InternalUtils.decodeUint8Array(_outbound_htlc_preimages_conv_8);
				_outbound_htlc_preimages_conv_8_arr[i] = _outbound_htlc_preimages_conv_8_conv;
			}
			bindings.free_buffer(_outbound_htlc_preimages);
			Result_NoneNoneZ ret = arg.validate_holder_commitment(_holder_tx_hu_conv, _outbound_htlc_preimages_conv_8_arr);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long validate_counterparty_revocation(long _idx, long _secret) {
			byte[] _secret_conv = InternalUtils.decodeUint8Array(_secret);
			Result_NoneNoneZ ret = arg.validate_counterparty_revocation(_idx, _secret_conv);
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long pubkeys() {
			ChannelPublicKeys ret = arg.pubkeys();
				GC.KeepAlive(arg);
			long result = ret.clone_ptr();
			return result;
		}
		public long new_funding_pubkey(long _splice_parent_funding_txid) {
			byte[] _splice_parent_funding_txid_conv = InternalUtils.decodeUint8Array(_splice_parent_funding_txid);
			byte[] ret = arg.new_funding_pubkey(_splice_parent_funding_txid_conv);
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(ret, 33));
			return result;
		}
		public long channel_keys_id() {
			byte[] ret = arg.channel_keys_id();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(ret, 32));
			return result;
		}
	}

	/** Creates a new instance of ChannelSigner from a given implementation */
	public static ChannelSigner new_impl(ChannelSignerInterface arg) {
		LDKChannelSignerHolder impl_holder = new LDKChannelSignerHolder();
		LDKChannelSignerImpl impl = new LDKChannelSignerImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKChannelSigner_new(impl);

		impl_holder.held = new ChannelSigner(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
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
	public org.ldk.structs.Result_PublicKeyNoneZ get_per_commitment_point(long idx) {
		long ret = bindings.ChannelSigner_get_per_commitment_point(this.ptr, idx);
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
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
	public org.ldk.structs.Result__u832NoneZ release_commitment_secret(long idx) {
		long ret = bindings.ChannelSigner_release_commitment_secret(this.ptr, idx);
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
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
	public org.ldk.structs.Result_NoneNoneZ validate_holder_commitment(org.ldk.structs.HolderCommitmentTransaction holder_tx, byte[][] outbound_htlc_preimages) {
		long ret = bindings.ChannelSigner_validate_holder_commitment(this.ptr, holder_tx.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(outbound_htlc_preimages, outbound_htlc_preimages_conv_8 => InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(outbound_htlc_preimages_conv_8, 32)))));
		GC.KeepAlive(this);
		GC.KeepAlive(holder_tx);
		GC.KeepAlive(outbound_htlc_preimages);
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
	public org.ldk.structs.Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret) {
		long ret = bindings.ChannelSigner_validate_counterparty_revocation(this.ptr, idx, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(secret, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		GC.KeepAlive(secret);
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
	public org.ldk.structs.ChannelPublicKeys pubkeys() {
		long ret = bindings.ChannelSigner_pubkeys(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
		long ret = bindings.ChannelSigner_new_funding_pubkey(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(splice_parent_funding_txid, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(splice_parent_funding_txid);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
	 * 
	 * This method is *not* asynchronous. Instead, the value must be cached locally.
	 */
	public byte[] channel_keys_id() {
		long ret = bindings.ChannelSigner_channel_keys_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

}
} } }
