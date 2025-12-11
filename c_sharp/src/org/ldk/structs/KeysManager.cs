using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


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
public class KeysManager : CommonBase {
	internal KeysManager(object _dummy, long ptr) : base(ptr) { }
	~KeysManager() {
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
	public static org.ldk.structs.KeysManager of(byte[] seed, long starting_time_secs, int starting_time_nanos, bool v2_remote_key_derivation) {
		long ret = bindings.KeysManager_new(InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(seed, 32)), starting_time_secs, starting_time_nanos, v2_remote_key_derivation);
		GC.KeepAlive(seed);
		GC.KeepAlive(starting_time_secs);
		GC.KeepAlive(starting_time_nanos);
		GC.KeepAlive(v2_remote_key_derivation);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.KeysManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.KeysManager(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		return ret_hu_conv;
	}

	/**
	 * Gets the \"node_id\" secret key used to sign gossip announcements, decode onion data, etc.
	 */
	public byte[] get_node_secret_key() {
		long ret = bindings.KeysManager_get_node_secret_key(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		byte[] ret_conv = InternalUtils.decodeUint8Array(ret);
		return ret_conv;
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
		long ret = bindings.KeysManager_possible_v2_counterparty_closed_balance_spks(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		int ret_conv_8_len = InternalUtils.getArrayLength(ret);
		byte[][] ret_conv_8_arr = new byte[ret_conv_8_len][];
		for (int i = 0; i < ret_conv_8_len; i++) {
			long ret_conv_8 = InternalUtils.getU64ArrayElem(ret, i);
			byte[] ret_conv_8_conv = InternalUtils.decodeUint8Array(ret_conv_8);
			ret_conv_8_arr[i] = ret_conv_8_conv;
		}
		bindings.free_buffer(ret);
		return ret_conv_8_arr;
	}

	/**
	 * Derive an old [`EcdsaChannelSigner`] containing per-channel secrets based on a key derivation parameters.
	 */
	public org.ldk.structs.InMemorySigner derive_channel_keys(byte[] _params) {
		long ret = bindings.KeysManager_derive_channel_keys(this.ptr, InternalUtils.encodeUint8Array(InternalUtils.check_arr_len(_params, 32)));
		GC.KeepAlive(this);
		GC.KeepAlive(_params);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InMemorySigner ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InMemorySigner(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
	public org.ldk.structs.Result_CVec_u8ZNoneZ sign_spendable_outputs_psbt(SpendableOutputDescriptor[] descriptors, byte[] psbt) {
		long ret = bindings.KeysManager_sign_spendable_outputs_psbt(this.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(descriptors, descriptors_conv_27 => descriptors_conv_27.ptr)), InternalUtils.encodeUint8Array(psbt));
		GC.KeepAlive(this);
		GC.KeepAlive(descriptors);
		GC.KeepAlive(psbt);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_u8ZNoneZ ret_hu_conv = Result_CVec_u8ZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EntropySource which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EntropySource must be freed before this_arg is
	 */
	public org.ldk.structs.EntropySource as_EntropySource() {
		long ret = bindings.KeysManager_as_EntropySource(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EntropySource ret_hu_conv = new EntropySource(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new NodeSigner which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned NodeSigner must be freed before this_arg is
	 */
	public org.ldk.structs.NodeSigner as_NodeSigner() {
		long ret = bindings.KeysManager_as_NodeSigner(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeSigner ret_hu_conv = new NodeSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OutputSpender which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OutputSpender must be freed before this_arg is
	 */
	public org.ldk.structs.OutputSpender as_OutputSpender() {
		long ret = bindings.KeysManager_as_OutputSpender(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OutputSpender ret_hu_conv = new OutputSpender(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new SignerProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned SignerProvider must be freed before this_arg is
	 */
	public org.ldk.structs.SignerProvider as_SignerProvider() {
		long ret = bindings.KeysManager_as_SignerProvider(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SignerProvider ret_hu_conv = new SignerProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
