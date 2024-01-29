
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
	 */
	byte[] get_per_commitment_point(long idx);
	/**Gets the commitment secret for a specific commitment number as part of the revocation process
	 * 
	 * An external signer implementation should error here if the commitment was already signed
	 * and should refuse to sign it in the future.
	 * 
	 * May be called more than once for the same index.
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 */
	byte[] release_commitment_secret(long idx);
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
	 */
	Result_NoneNoneZ validate_holder_commitment(HolderCommitmentTransaction holder_tx, byte[][] outbound_htlc_preimages);
	/**Validate the counterparty's revocation.
	 * 
	 * This is required in order for the signer to make sure that the state has moved
	 * forward and it is safe to sign the next counterparty commitment.
	 */
	Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret);
	/**Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
	 */
	byte[] channel_keys_id();
	/**Set the counterparty static channel data, including basepoints,
	 * `counterparty_selected`/`holder_selected_contest_delay` and funding outpoint.
	 * 
	 * This data is static, and will never change for a channel once set. For a given [`ChannelSigner`]
	 * instance, LDK will call this method exactly once - either immediately after construction
	 * (not including if done via [`SignerProvider::read_chan_signer`]) or when the funding
	 * information has been generated.
	 * 
	 * channel_parameters.is_populated() MUST be true.
	 */
	void provide_channel_parameters(ChannelTransactionParameters channel_parameters);
}

/**
 * A trait to handle Lightning channel key material without concretizing the channel type or
 * the signature mechanism.
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
			byte[] ret = arg.get_per_commitment_point(_idx);
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(ret, 33));
			return result;
		}
		public long release_commitment_secret(long _idx) {
			byte[] ret = arg.release_commitment_secret(_idx);
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(ret, 32));
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
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long validate_counterparty_revocation(long _idx, long _secret) {
			byte[] _secret_conv = InternalUtils.decodeUint8Array(_secret);
			Result_NoneNoneZ ret = arg.validate_counterparty_revocation(_idx, _secret_conv);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public long channel_keys_id() {
			byte[] ret = arg.channel_keys_id();
				GC.KeepAlive(arg);
			long result = InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(ret, 32));
			return result;
		}
		public void provide_channel_parameters(long _channel_parameters) {
			org.ldk.structs.ChannelTransactionParameters _channel_parameters_hu_conv = null; if (_channel_parameters < 0 || _channel_parameters > 4096) { _channel_parameters_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, _channel_parameters); }
			arg.provide_channel_parameters(_channel_parameters_hu_conv);
				GC.KeepAlive(arg);
		}
	}

	/** Creates a new instance of ChannelSigner from a given implementation */
	public static ChannelSigner new_impl(ChannelSignerInterface arg, ChannelPublicKeys pubkeys) {
		LDKChannelSignerHolder impl_holder = new LDKChannelSignerHolder();
		LDKChannelSignerImpl impl = new LDKChannelSignerImpl(arg, impl_holder);
		long[] ptr_idx = bindings.LDKChannelSigner_new(impl, pubkeys == null ? 0 : pubkeys.clone_ptr());

		impl_holder.held = new ChannelSigner(null, ptr_idx[0]);
		impl_holder.held.instance_idx = ptr_idx[1];
		impl_holder.held.bindings_instance = impl;
		return impl_holder.held;
	}

	/**
	 * Gets the per-commitment point for a specific commitment number
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 */
	public byte[] get_per_commitment_point(long idx) {
		long ret = bindings.ChannelSigner_get_per_commitment_point(this.ptr, idx);
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
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
	 */
	public byte[] release_commitment_secret(long idx) {
		long ret = bindings.ChannelSigner_release_commitment_secret(this.ptr, idx);
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
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
	 */
	public Result_NoneNoneZ validate_holder_commitment(org.ldk.structs.HolderCommitmentTransaction holder_tx, byte[][] outbound_htlc_preimages) {
		long ret = bindings.ChannelSigner_validate_holder_commitment(this.ptr, holder_tx == null ? 0 : holder_tx.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(outbound_htlc_preimages, outbound_htlc_preimages_conv_8 => InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(outbound_htlc_preimages_conv_8, 32)))));
		GC.KeepAlive(this);
		GC.KeepAlive(holder_tx);
		GC.KeepAlive(outbound_htlc_preimages);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(holder_tx); };
		return ret_hu_conv;
	}

	/**
	 * Validate the counterparty's revocation.
	 * 
	 * This is required in order for the signer to make sure that the state has moved
	 * forward and it is safe to sign the next counterparty commitment.
	 */
	public Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret) {
		long ret = bindings.ChannelSigner_validate_counterparty_revocation(this.ptr, idx, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(secret, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		GC.KeepAlive(secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
	 */
	public byte[] channel_keys_id() {
		long ret = bindings.ChannelSigner_channel_keys_id(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
	}

	/**
	 * Set the counterparty static channel data, including basepoints,
	 * `counterparty_selected`/`holder_selected_contest_delay` and funding outpoint.
	 * 
	 * This data is static, and will never change for a channel once set. For a given [`ChannelSigner`]
	 * instance, LDK will call this method exactly once - either immediately after construction
	 * (not including if done via [`SignerProvider::read_chan_signer`]) or when the funding
	 * information has been generated.
	 * 
	 * channel_parameters.is_populated() MUST be true.
	 */
	public void provide_channel_parameters(org.ldk.structs.ChannelTransactionParameters channel_parameters) {
		bindings.ChannelSigner_provide_channel_parameters(this.ptr, channel_parameters == null ? 0 : channel_parameters.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_parameters);
		if (this != null) { this.ptrs_to.AddLast(channel_parameters); };
	}

	/**
	 * Frees any resources associated with this object given its this_arg pointer.
	 * Does not need to free the outer struct containing function pointers and may be NULL is no resources need to be freed.
	 */
	public ChannelPublicKeys get_pubkeys() {
		long ret = bindings.ChannelSigner_get_pubkeys(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
