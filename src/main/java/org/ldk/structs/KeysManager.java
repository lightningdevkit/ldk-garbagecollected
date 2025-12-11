package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Simple implementation of [`EntropySource`], [`NodeSigner`], and [`SignerProvider`] that takes a
 * 32-byte seed for use as a BIP 32 extended key and derives keys from that.
 * 
 * Your `node_id` is seed/0'.
 * Unilateral closes may use seed/1'.
 * Cooperative closes may use seed/2'.
 * The two close keys may be needed to claim on-chain funds!
 * 
 * This struct cannot be used for nodes that wish to support receiving phantom payments;
 * [`PhantomKeysManager`] must be used instead.
 * 
 * Note that switching between this struct and [`PhantomKeysManager`] will invalidate any
 * previously issued invoices and attempts to pay previous invoices will fail.
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class KeysManager extends CommonBase {
	KeysManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.KeysManager_free(ptr); }
	}

	/**
	 * Constructs a [`KeysManager`] from a 32-byte seed. If the seed is in some way biased (e.g.,
	 * your CSRNG is busted) this may panic (but more importantly, you will possibly lose funds).
	 * `starting_time` isn't strictly required to actually be a time, but it must absolutely,
	 * without a doubt, be unique to this instance. ie if you start multiple times with the same
	 * `seed`, `starting_time` must be unique to each run. Thus, the easiest way to achieve this
	 * is to simply use the current time (with very high precision).
	 * 
	 * The `seed` MUST be backed up safely prior to use so that the keys can be re-created, however,
	 * obviously, `starting_time` should be unique every time you reload the library - it is only
	 * used to generate new ephemeral key data (which will be stored by the individual channel if
	 * necessary).
	 * 
	 * Note that the seed is required to recover certain on-chain funds independent of
	 * [`ChannelMonitor`] data, though a current copy of [`ChannelMonitor`] data is also required
	 * for any channel, and some on-chain during-closing funds.
	 * 
	 * If `v2_remote_key_derivation` is set, the `script_pubkey`s which receive funds on-chain when
	 * our counterparty force-closes will be one of a static set of [`STATIC_PAYMENT_KEY_COUNT`]*2
	 * possible `script_pubkey`s. This only applies to new or spliced channels, however if this is
	 * set you *MUST NOT* downgrade to a version of LDK prior to 0.2.
	 * 
	 * [`ChannelMonitor`]: crate::chain::channelmonitor::ChannelMonitor
	 */
	public static KeysManager of(byte[] seed, long starting_time_secs, int starting_time_nanos, boolean v2_remote_key_derivation) {
		long ret = bindings.KeysManager_new(InternalUtils.check_arr_len(seed, 32), starting_time_secs, starting_time_nanos, v2_remote_key_derivation);
		Reference.reachabilityFence(seed);
		Reference.reachabilityFence(starting_time_secs);
		Reference.reachabilityFence(starting_time_nanos);
		Reference.reachabilityFence(v2_remote_key_derivation);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.KeysManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.KeysManager(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Gets the \"node_id\" secret key used to sign gossip announcements, decode onion data, etc.
	 */
	public byte[] get_node_secret_key() {
		byte[] ret = bindings.KeysManager_get_node_secret_key(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Gets the set of possible `script_pubkey`s which can appear on chain for our
	 * non-HTLC-encumbered balance if our counterparty force-closes a channel.
	 * 
	 * If you've lost all data except your seed, asking your peers nicely to force-close the
	 * chanels they had with you (and hoping they don't broadcast a stale state and that there are
	 * no pending HTLCs in the latest state) and scanning the chain for these `script_pubkey`s can
	 * allow you to recover (some of) your funds.
	 * 
	 * Only channels opened when using a [`KeysManager`] with the `v2_remote_key_derivation`
	 * argument to [`KeysManager::new`] set, or any spliced channels will close to such scripts,
	 * other channels will close to a randomly-generated `script_pubkey`.
	 */
	public byte[][] possible_v2_counterparty_closed_balance_spks() {
		byte[][] ret = bindings.KeysManager_possible_v2_counterparty_closed_balance_spks(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Derive an old [`EcdsaChannelSigner`] containing per-channel secrets based on a key derivation parameters.
	 */
	public InMemorySigner derive_channel_keys(byte[] params) {
		long ret = bindings.KeysManager_derive_channel_keys(this.ptr, InternalUtils.check_arr_len(params, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(params);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InMemorySigner ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InMemorySigner(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Signs the given [`Psbt`] which spends the given [`SpendableOutputDescriptor`]s.
	 * The resulting inputs will be finalized and the PSBT will be ready for broadcast if there
	 * are no other inputs that need signing.
	 * 
	 * Returns `Err(())` if the PSBT is missing a descriptor or if we fail to sign.
	 * 
	 * May panic if the [`SpendableOutputDescriptor`]s were not generated by channels which used
	 * this [`KeysManager`] or one of the [`InMemorySigner`] created by this [`KeysManager`].
	 */
	public Result_CVec_u8ZNoneZ sign_spendable_outputs_psbt(SpendableOutputDescriptor[] descriptors, byte[] psbt) {
		long ret = bindings.KeysManager_sign_spendable_outputs_psbt(this.ptr, descriptors != null ? Arrays.stream(descriptors).mapToLong(descriptors_conv_27 -> descriptors_conv_27.ptr).toArray() : null, psbt);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(descriptors);
		Reference.reachabilityFence(psbt);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EntropySource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EntropySource must be freed before this_arg is
	 */
	public EntropySource as_EntropySource() {
		long ret = bindings.KeysManager_as_EntropySource(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EntropySource ret_hu_conv = new EntropySource(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new NodeSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned NodeSigner must be freed before this_arg is
	 */
	public NodeSigner as_NodeSigner() {
		long ret = bindings.KeysManager_as_NodeSigner(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeSigner ret_hu_conv = new NodeSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OutputSpender which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OutputSpender must be freed before this_arg is
	 */
	public OutputSpender as_OutputSpender() {
		long ret = bindings.KeysManager_as_OutputSpender(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OutputSpender ret_hu_conv = new OutputSpender(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SignerProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SignerProvider must be freed before this_arg is
	 */
	public SignerProvider as_SignerProvider() {
		long ret = bindings.KeysManager_as_SignerProvider(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SignerProvider ret_hu_conv = new SignerProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

}
