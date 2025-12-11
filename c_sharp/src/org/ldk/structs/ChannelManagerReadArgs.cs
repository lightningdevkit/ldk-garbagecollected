using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Arguments for the creation of a ChannelManager that are not deserialized.
 * 
 * At a high-level, the process for deserializing a ChannelManager and resuming normal operation
 * is:
 * 1) Deserialize all stored [`ChannelMonitor`]s.
 * 2) Deserialize the [`ChannelManager`] by filling in this struct and calling:
 * `<(BlockHash, ChannelManager)>::read(reader, args)`
 * This may result in closing some channels if the [`ChannelMonitor`] is newer than the stored
 * [`ChannelManager`] state to ensure no loss of funds. Thus, transactions may be broadcasted.
 * 3) If you are not fetching full blocks, register all relevant [`ChannelMonitor`] outpoints the
 * same way you would handle a [`chain::Filter`] call using
 * [`ChannelMonitor::get_outputs_to_watch`] and [`ChannelMonitor::get_funding_txo`].
 * 4) Disconnect/connect blocks on your [`ChannelMonitor`]s to get them in sync with the chain.
 * 5) Disconnect/connect blocks on the [`ChannelManager`] to get it in sync with the chain.
 * 6) Optionally re-persist the [`ChannelMonitor`]s to ensure the latest state is on disk.
 * This is important if you have replayed a nontrivial number of blocks in step (4), allowing
 * you to avoid having to replay the same blocks if you shut down quickly after startup. It is
 * otherwise not required.
 * 
 * Note that if you're using a [`ChainMonitor`] for your [`chain::Watch`] implementation, you
 * will likely accomplish this as a side-effect of calling [`chain::Watch::watch_channel`] in
 * the next step.
 * 
 * If you wish to avoid this for performance reasons, use
 * [`ChainMonitor::load_existing_monitor`].
 * 7) Move the [`ChannelMonitor`]s into your local [`chain::Watch`]. If you're using a
 * [`ChainMonitor`], this is done by calling [`chain::Watch::watch_channel`].
 * 
 * Note that the ordering of #4-7 is not of importance, however all four must occur before you
 * call any other methods on the newly-deserialized [`ChannelManager`].
 * 
 * Note that because some channels may be closed during deserialization, it is critical that you
 * always deserialize only the latest version of a ChannelManager and ChannelMonitors available to
 * you. If you deserialize an old ChannelManager (during which force-closure transactions may be
 * broadcast), and then later deserialize a newer version of the same ChannelManager (which will
 * not force-close the same channels but consider them live), you may end up revoking a state for
 * which you've already broadcasted the transaction.
 * 
 * [`ChainMonitor`]: crate::chain::chainmonitor::ChainMonitor
 * [`ChainMonitor::load_existing_monitor`]: crate::chain::chainmonitor::ChainMonitor::load_existing_monitor
 */
public class ChannelManagerReadArgs : CommonBase {
	internal ChannelManagerReadArgs(object _dummy, long ptr) : base(ptr) { }
	~ChannelManagerReadArgs() {
		if (ptr != 0) { bindings.ChannelManagerReadArgs_free(ptr); }
	}

	/**
	 * A cryptographically secure source of entropy.
	 */
	public org.ldk.structs.EntropySource get_entropy_source() {
		long ret = bindings.ChannelManagerReadArgs_get_entropy_source(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EntropySource ret_hu_conv = new EntropySource(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A cryptographically secure source of entropy.
	 */
	public void set_entropy_source(org.ldk.structs.EntropySource val) {
		bindings.ChannelManagerReadArgs_set_entropy_source(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * A signer that is able to perform node-scoped cryptographic operations.
	 */
	public org.ldk.structs.NodeSigner get_node_signer() {
		long ret = bindings.ChannelManagerReadArgs_get_node_signer(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		NodeSigner ret_hu_conv = new NodeSigner(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * A signer that is able to perform node-scoped cryptographic operations.
	 */
	public void set_node_signer(org.ldk.structs.NodeSigner val) {
		bindings.ChannelManagerReadArgs_set_node_signer(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The keys provider which will give us relevant keys. Some keys will be loaded during
	 * deserialization and [`SignerProvider::derive_channel_signer`] will be used to derive
	 * per-Channel signing data.
	 */
	public org.ldk.structs.SignerProvider get_signer_provider() {
		long ret = bindings.ChannelManagerReadArgs_get_signer_provider(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		SignerProvider ret_hu_conv = new SignerProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The keys provider which will give us relevant keys. Some keys will be loaded during
	 * deserialization and [`SignerProvider::derive_channel_signer`] will be used to derive
	 * per-Channel signing data.
	 */
	public void set_signer_provider(org.ldk.structs.SignerProvider val) {
		bindings.ChannelManagerReadArgs_set_signer_provider(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The fee_estimator for use in the ChannelManager in the future.
	 * 
	 * No calls to the FeeEstimator will be made during deserialization.
	 */
	public org.ldk.structs.FeeEstimator get_fee_estimator() {
		long ret = bindings.ChannelManagerReadArgs_get_fee_estimator(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		FeeEstimator ret_hu_conv = new FeeEstimator(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The fee_estimator for use in the ChannelManager in the future.
	 * 
	 * No calls to the FeeEstimator will be made during deserialization.
	 */
	public void set_fee_estimator(org.ldk.structs.FeeEstimator val) {
		bindings.ChannelManagerReadArgs_set_fee_estimator(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The chain::Watch for use in the ChannelManager in the future.
	 * 
	 * No calls to the chain::Watch will be made during deserialization. It is assumed that
	 * you have deserialized ChannelMonitors separately and will add them to your
	 * chain::Watch after deserializing this ChannelManager.
	 */
	public org.ldk.structs.Watch get_chain_monitor() {
		long ret = bindings.ChannelManagerReadArgs_get_chain_monitor(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Watch ret_hu_conv = new Watch(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The chain::Watch for use in the ChannelManager in the future.
	 * 
	 * No calls to the chain::Watch will be made during deserialization. It is assumed that
	 * you have deserialized ChannelMonitors separately and will add them to your
	 * chain::Watch after deserializing this ChannelManager.
	 */
	public void set_chain_monitor(org.ldk.structs.Watch val) {
		bindings.ChannelManagerReadArgs_set_chain_monitor(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The BroadcasterInterface which will be used in the ChannelManager in the future and may be
	 * used to broadcast the latest local commitment transactions of channels which must be
	 * force-closed during deserialization.
	 */
	public org.ldk.structs.BroadcasterInterface get_tx_broadcaster() {
		long ret = bindings.ChannelManagerReadArgs_get_tx_broadcaster(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		BroadcasterInterface ret_hu_conv = new BroadcasterInterface(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The BroadcasterInterface which will be used in the ChannelManager in the future and may be
	 * used to broadcast the latest local commitment transactions of channels which must be
	 * force-closed during deserialization.
	 */
	public void set_tx_broadcaster(org.ldk.structs.BroadcasterInterface val) {
		bindings.ChannelManagerReadArgs_set_tx_broadcaster(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The router which will be used in the ChannelManager in the future for finding routes
	 * on-the-fly for trampoline payments. Absent in private nodes that don't support forwarding.
	 * 
	 * No calls to the router will be made during deserialization.
	 */
	public org.ldk.structs.Router get_router() {
		long ret = bindings.ChannelManagerReadArgs_get_router(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Router ret_hu_conv = new Router(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The router which will be used in the ChannelManager in the future for finding routes
	 * on-the-fly for trampoline payments. Absent in private nodes that don't support forwarding.
	 * 
	 * No calls to the router will be made during deserialization.
	 */
	public void set_router(org.ldk.structs.Router val) {
		bindings.ChannelManagerReadArgs_set_router(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The [`MessageRouter`] used for constructing [`BlindedMessagePath`]s for [`Offer`]s,
	 * [`Refund`]s, and any reply paths.
	 * 
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 */
	public org.ldk.structs.MessageRouter get_message_router() {
		long ret = bindings.ChannelManagerReadArgs_get_message_router(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageRouter ret_hu_conv = new MessageRouter(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The [`MessageRouter`] used for constructing [`BlindedMessagePath`]s for [`Offer`]s,
	 * [`Refund`]s, and any reply paths.
	 * 
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 */
	public void set_message_router(org.ldk.structs.MessageRouter val) {
		bindings.ChannelManagerReadArgs_set_message_router(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * The Logger for use in the ChannelManager and which may be used to log information during
	 * deserialization.
	 */
	public org.ldk.structs.Logger get_logger() {
		long ret = bindings.ChannelManagerReadArgs_get_logger(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Logger ret_hu_conv = new Logger(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * The Logger for use in the ChannelManager and which may be used to log information during
	 * deserialization.
	 */
	public void set_logger(org.ldk.structs.Logger val) {
		bindings.ChannelManagerReadArgs_set_logger(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
		if (this != null) { this.ptrs_to.AddLast(val); };
	}

	/**
	 * Default settings used for new channels. Any existing channels will continue to use the
	 * runtime settings which were stored when the ChannelManager was serialized.
	 */
	public org.ldk.structs.UserConfig get_config() {
		long ret = bindings.ChannelManagerReadArgs_get_config(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UserConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Default settings used for new channels. Any existing channels will continue to use the
	 * runtime settings which were stored when the ChannelManager was serialized.
	 */
	public void set_config(org.ldk.structs.UserConfig val) {
		bindings.ChannelManagerReadArgs_set_config(this.ptr, val.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(val);
	}

	/**
	 * Simple utility function to create a ChannelManagerReadArgs which creates the monitor
	 * HashMap for you. This is primarily useful for C bindings where it is not practical to
	 * populate a HashMap directly from C.
	 */
	public static org.ldk.structs.ChannelManagerReadArgs of(org.ldk.structs.EntropySource entropy_source, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.SignerProvider signer_provider, org.ldk.structs.FeeEstimator fee_estimator, org.ldk.structs.Watch chain_monitor, org.ldk.structs.BroadcasterInterface tx_broadcaster, org.ldk.structs.Router router, org.ldk.structs.MessageRouter message_router, org.ldk.structs.Logger logger, org.ldk.structs.UserConfig config, ChannelMonitor[] channel_monitors) {
		long ret = bindings.ChannelManagerReadArgs_new(entropy_source.ptr, node_signer.ptr, signer_provider.ptr, fee_estimator.ptr, chain_monitor.ptr, tx_broadcaster.ptr, router.ptr, message_router.ptr, logger.ptr, config.ptr, InternalUtils.encodeUint64Array(InternalUtils.mapArray(channel_monitors, channel_monitors_conv_16 => channel_monitors_conv_16.ptr)));
		GC.KeepAlive(entropy_source);
		GC.KeepAlive(node_signer);
		GC.KeepAlive(signer_provider);
		GC.KeepAlive(fee_estimator);
		GC.KeepAlive(chain_monitor);
		GC.KeepAlive(tx_broadcaster);
		GC.KeepAlive(router);
		GC.KeepAlive(message_router);
		GC.KeepAlive(logger);
		GC.KeepAlive(config);
		GC.KeepAlive(channel_monitors);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelManagerReadArgs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelManagerReadArgs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(signer_provider); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fee_estimator); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(chain_monitor); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(tx_broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(message_router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		foreach (ChannelMonitor channel_monitors_conv_16 in channel_monitors) { if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(channel_monitors_conv_16); }; };
		return ret_hu_conv;
	}

}
} } }
