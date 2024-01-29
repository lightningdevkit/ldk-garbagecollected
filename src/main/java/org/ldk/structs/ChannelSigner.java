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
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelSigner extends CommonBase {
	final bindings.LDKChannelSigner bindings_instance;
	ChannelSigner(Object _dummy, long ptr) { super(ptr); bindings_instance = null; }
	private ChannelSigner(bindings.LDKChannelSigner arg, ChannelPublicKeys pubkeys) {
		super(bindings.LDKChannelSigner_new(arg, pubkeys == null ? 0 : pubkeys.clone_ptr()));
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
		 */
		byte[] get_per_commitment_point(long idx);
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
		byte[] release_commitment_secret(long idx);
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
		Result_NoneNoneZ validate_holder_commitment(HolderCommitmentTransaction holder_tx, byte[][] outbound_htlc_preimages);
		/**
		 * Validate the counterparty's revocation.
		 * 
		 * This is required in order for the signer to make sure that the state has moved
		 * forward and it is safe to sign the next counterparty commitment.
		 */
		Result_NoneNoneZ validate_counterparty_revocation(long idx, byte[] secret);
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
		void provide_channel_parameters(ChannelTransactionParameters channel_parameters);
	}
	private static class LDKChannelSignerHolder { ChannelSigner held; }
	public static ChannelSigner new_impl(ChannelSignerInterface arg, ChannelPublicKeys pubkeys) {
		final LDKChannelSignerHolder impl_holder = new LDKChannelSignerHolder();
		impl_holder.held = new ChannelSigner(new bindings.LDKChannelSigner() {
			@Override public byte[] get_per_commitment_point(long idx) {
				byte[] ret = arg.get_per_commitment_point(idx);
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 33);
				return result;
			}
			@Override public byte[] release_commitment_secret(long idx) {
				byte[] ret = arg.release_commitment_secret(idx);
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
			@Override public long validate_holder_commitment(long holder_tx, byte[][] outbound_htlc_preimages) {
				org.ldk.structs.HolderCommitmentTransaction holder_tx_hu_conv = null; if (holder_tx < 0 || holder_tx > 4096) { holder_tx_hu_conv = new org.ldk.structs.HolderCommitmentTransaction(null, holder_tx); }
				Result_NoneNoneZ ret = arg.validate_holder_commitment(holder_tx_hu_conv, outbound_htlc_preimages);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public long validate_counterparty_revocation(long idx, byte[] secret) {
				Result_NoneNoneZ ret = arg.validate_counterparty_revocation(idx, secret);
				Reference.reachabilityFence(arg);
				long result = ret == null ? 0 : ret.clone_ptr();
				return result;
			}
			@Override public byte[] channel_keys_id() {
				byte[] ret = arg.channel_keys_id();
				Reference.reachabilityFence(arg);
				byte[] result = InternalUtils.check_arr_len(ret, 32);
				return result;
			}
			@Override public void provide_channel_parameters(long channel_parameters) {
				org.ldk.structs.ChannelTransactionParameters channel_parameters_hu_conv = null; if (channel_parameters < 0 || channel_parameters > 4096) { channel_parameters_hu_conv = new org.ldk.structs.ChannelTransactionParameters(null, channel_parameters); }
				arg.provide_channel_parameters(channel_parameters_hu_conv);
				Reference.reachabilityFence(arg);
			}
		}, pubkeys);
		return impl_holder.held;
	}
	/**
	 * Gets the per-commitment point for a specific commitment number
	 * 
	 * Note that the commitment number starts at `(1 << 48) - 1` and counts backwards.
	 */
	public byte[] get_per_commitment_point(long idx) {
		byte[] ret = bindings.ChannelSigner_get_per_commitment_point(this.ptr, idx);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(idx);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(idx);
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
	 * The preimages of outbound HTLCs that were fulfilled since the last commitment are provided.
	 * A validating signer should ensure that an HTLC output is removed only when the matching
	 * preimage is provided, or when the value to holder is restored.
	 * 
	 * Note that all the relevant preimages will be provided, but there may also be additional
	 * irrelevant or duplicate preimages.
	 */
	public Result_NoneNoneZ validate_holder_commitment(org.ldk.structs.HolderCommitmentTransaction holder_tx, byte[][] outbound_htlc_preimages) {
		long ret = bindings.ChannelSigner_validate_holder_commitment(this.ptr, holder_tx == null ? 0 : holder_tx.ptr, outbound_htlc_preimages != null ? Arrays.stream(outbound_htlc_preimages).map(outbound_htlc_preimages_conv_8 -> InternalUtils.check_arr_len(outbound_htlc_preimages_conv_8, 32)).toArray(byte[][]::new) : null);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(holder_tx);
		Reference.reachabilityFence(outbound_htlc_preimages);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneNoneZ ret_hu_conv = Result_NoneNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(holder_tx); };
		return ret_hu_conv;
	}

	/**
	 * Validate the counterparty's revocation.
	 * 
	 * This is required in order for the signer to make sure that the state has moved
	 * forward and it is safe to sign the next counterparty commitment.
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
	 * Returns an arbitrary identifier describing the set of keys which are provided back to you in
	 * some [`SpendableOutputDescriptor`] types. This should be sufficient to identify this
	 * [`EcdsaChannelSigner`] object uniquely and lookup or re-derive its keys.
	 */
	public byte[] channel_keys_id() {
		byte[] ret = bindings.ChannelSigner_channel_keys_id(this.ptr);
		Reference.reachabilityFence(this);
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
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_parameters);
		if (this != null) { this.ptrs_to.add(channel_parameters); };
	}

	/**
	 * Frees any resources associated with this object given its this_arg pointer.
	 * Does not need to free the outer struct containing function pointers and may be NULL is no resources need to be freed.
	 */
	public ChannelPublicKeys get_pubkeys() {
		long ret = bindings.ChannelSigner_get_pubkeys(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelPublicKeys ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelPublicKeys(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
