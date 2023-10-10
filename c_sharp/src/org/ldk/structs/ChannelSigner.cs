using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {

/**
 * A trait to handle Lightning channel key material without concretizing the channel type or
 * the signature mechanism.
 */
public class ChannelSigner : CommonBase {
	internal readonly bindings.LDKChannelSigner bindings_instance;
	internal ChannelSigner(object _dummy, long ptr) : base(ptr) { bindings_instance = null; }
	private ChannelSigner(bindings.LDKChannelSigner arg, ChannelPublicKeys pubkeys) : base(bindings.LDKChannelSigner_new(arg, pubkeys == null ? 0 : pubkeys.clone_ptr())) {
		this.ptrs_to.AddLast(arg);
		this.bindings_instance = arg;
	}
	~ChannelSigner() {
		if (ptr != 0) { bindings.ChannelSigner_free(ptr); }
	}

	public interface ChannelSignerInterface {
		/**
		 * Gets the per-commitment point for a specific commitment number
		 * 
		 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
		 */
		byte[] get_per_commitment_point(long _idx);
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
		byte[] release_commitment_secret(long _idx);
		/**
		 * Validate the counterparty's signatures on the holder commitment transaction and HTLCs.
		 * 
		 * This is required in order for the signer to make sure that releasing a commitment
		 * secret won't leave us without a broadcastable holder transaction.
		 * Policy checks should be implemented in this function, including checking the amount
		 * sent to us and checking the HTLCs.
		 * 
		 * The preimages of outgoing HTLCs that were fulfilled since the last commitment are provided.
		 * A validating signer should ensure that an HTLC output is removed only when the matching
		 * preimage is provided, or when the value to holder is restored.
		 * 
		 * Note that all the relevant preimages will be provided, but there may also be additional
		 * irrelevant or duplicate preimages.
		 */
		Result_NoneNoneZ validate_holder_commitment(HolderCommitmentTransaction _holder_tx, byte[][] _preimages);
		/**
		 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
		 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
		 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
		 */
		byte[] channel_keys_id();
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
		void provide_channel_parameters(ChannelTransactionParameters _channel_parameters);
	}
	private class LDKChannelSignerHolder { internal ChannelSigner held; }
	private class LDKChannelSignerImpl : bindings.LDKChannelSigner {
		internal LDKChannelSignerImpl(ChannelSignerInterface arg, LDKChannelSignerHolder impl_holder) { this.arg = arg; this.impl_holder = impl_holder; }
		private ChannelSignerInterface arg;
		private LDKChannelSignerHolder impl_holder;
		public byte[] get_per_commitment_point(long _idx) {
			byte[] ret = arg.get_per_commitment_point(_idx);
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 33);
			return result;
		}
		public byte[] release_commitment_secret(long _idx) {
			byte[] ret = arg.release_commitment_secret(_idx);
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
			return result;
		}
		public long validate_holder_commitment(long _holder_tx, byte[][] _preimages) {
			org.ldk.structs.HolderCommitmentTransaction _holder_tx_hu_conv = null; if (_holder_tx < 0 || _holder_tx > 4096) { _holder_tx_hu_conv = new org.ldk.structs.HolderCommitmentTransaction(null, _holder_tx); }
			Result_NoneNoneZ ret = arg.validate_holder_commitment(_holder_tx_hu_conv, _preimages);
				GC.KeepAlive(arg);
			long result = ret == null ? 0 : ret.clone_ptr();
			return result;
		}
		public byte[] channel_keys_id() {
			byte[] ret = arg.channel_keys_id();
				GC.KeepAlive(arg);
			byte[] result = InternalUtils.check_arr_len(ret, 32);
			return result;
		}
		public void provide_channel_parameters(long _channel_parameters) {
			org.ldk.structs.ChannelTransactionParameters _channel_parameters_hu_conv = null; if (_channel_parameters < 0 || _channel_parameters > 4096) { _channel_parameters_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, _channel_parameters); }
			arg.provide_channel_parameters(_channel_parameters_hu_conv);
				GC.KeepAlive(arg);
		}
	}
	public static ChannelSigner new_impl(ChannelSignerInterface arg, ChannelPublicKeys pubkeys) {
		LDKChannelSignerHolder impl_holder = new LDKChannelSignerHolder();
		impl_holder.held = new ChannelSigner(new LDKChannelSignerImpl(arg, impl_holder), pubkeys);
		return impl_holder.held;
	}
	/**
	 * Gets the per-commitment point for a specific commitment number
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 */
	public byte[] get_per_commitment_point(long idx) {
		byte[] ret = bindings.ChannelSigner_get_per_commitment_point(this.ptr, idx);
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		return ret;
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
		byte[] ret = bindings.ChannelSigner_release_commitment_secret(this.ptr, idx);
		GC.KeepAlive(this);
		GC.KeepAlive(idx);
		return ret;
	}

	/**
	 * Validate the counterparty's signatures on the holder commitment transaction and HTLCs.
	 * 
	 * This is required in order for the signer to make sure that releasing a commitment
	 * secret won't leave us without a broadcastable holder transaction.
	 * Policy checks should be implemented in this function, including checking the amount
	 * sent to us and checking the HTLCs.
	 * 
	 * The preimages of outgoing HTLCs that were fulfilled since the last commitment are provided.
	 * A validating signer should ensure that an HTLC output is removed only when the matching
	 * preimage is provided, or when the value to holder is restored.
	 * 
	 * Note that all the relevant preimages will be provided, but there may also be additional
	 * irrelevant or duplicate preimages.
	 */
	public Result_NoneNoneZ validate_holder_commitment(org.ldk.structs.HolderCommitmentTransaction holder_tx, byte[][] preimages) {
		long ret = bindings.ChannelSigner_validate_holder_commitment(this.ptr, holder_tx == null ? 0 : holder_tx.ptr, preimages != null ? InternalUtils.mapArray(preimages, preimages_conv_8 => InternalUtils.check_arr_len(preimages_conv_8, 32)) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(holder_tx);
		GC.KeepAlive(preimages);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(holder_tx); };
		return ret_hu_conv;
	}

	/**
	 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
	 */
	public byte[] channel_keys_id() {
		byte[] ret = bindings.ChannelSigner_channel_keys_id(this.ptr);
		GC.KeepAlive(this);
		return ret;
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
