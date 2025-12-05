
import { CommonBase, UInt5, WitnessVersion, UnqualifiedError } from './CommonBase.mjs';
import * as bindings from '../bindings.mjs'


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
export class ChannelManagerReadArgs extends CommonBase {
	/* @internal */
	public constructor(_dummy: null, ptr: bigint) {
		super(ptr, bindings.ChannelManagerReadArgs_free);
	}

	/**
	 * A cryptographically secure source of entropy.
	 */
	public get_entropy_source(): EntropySource {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_entropy_source(this.ptr);
		const ret_hu_conv: EntropySource = new EntropySource(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A cryptographically secure source of entropy.
	 */
	public set_entropy_source(val: EntropySource): void {
		bindings.ChannelManagerReadArgs_set_entropy_source(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * A signer that is able to perform node-scoped cryptographic operations.
	 */
	public get_node_signer(): NodeSigner {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_node_signer(this.ptr);
		const ret_hu_conv: NodeSigner = new NodeSigner(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * A signer that is able to perform node-scoped cryptographic operations.
	 */
	public set_node_signer(val: NodeSigner): void {
		bindings.ChannelManagerReadArgs_set_node_signer(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * The keys provider which will give us relevant keys. Some keys will be loaded during
	 * deserialization and [`SignerProvider::derive_channel_signer`] will be used to derive
	 * per-Channel signing data.
	 */
	public get_signer_provider(): SignerProvider {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_signer_provider(this.ptr);
		const ret_hu_conv: SignerProvider = new SignerProvider(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The keys provider which will give us relevant keys. Some keys will be loaded during
	 * deserialization and [`SignerProvider::derive_channel_signer`] will be used to derive
	 * per-Channel signing data.
	 */
	public set_signer_provider(val: SignerProvider): void {
		bindings.ChannelManagerReadArgs_set_signer_provider(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * The fee_estimator for use in the ChannelManager in the future.
	 * 
	 * No calls to the FeeEstimator will be made during deserialization.
	 */
	public get_fee_estimator(): FeeEstimator {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_fee_estimator(this.ptr);
		const ret_hu_conv: FeeEstimator = new FeeEstimator(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The fee_estimator for use in the ChannelManager in the future.
	 * 
	 * No calls to the FeeEstimator will be made during deserialization.
	 */
	public set_fee_estimator(val: FeeEstimator): void {
		bindings.ChannelManagerReadArgs_set_fee_estimator(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * The chain::Watch for use in the ChannelManager in the future.
	 * 
	 * No calls to the chain::Watch will be made during deserialization. It is assumed that
	 * you have deserialized ChannelMonitors separately and will add them to your
	 * chain::Watch after deserializing this ChannelManager.
	 */
	public get_chain_monitor(): Watch {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_chain_monitor(this.ptr);
		const ret_hu_conv: Watch = new Watch(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The chain::Watch for use in the ChannelManager in the future.
	 * 
	 * No calls to the chain::Watch will be made during deserialization. It is assumed that
	 * you have deserialized ChannelMonitors separately and will add them to your
	 * chain::Watch after deserializing this ChannelManager.
	 */
	public set_chain_monitor(val: Watch): void {
		bindings.ChannelManagerReadArgs_set_chain_monitor(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * The BroadcasterInterface which will be used in the ChannelManager in the future and may be
	 * used to broadcast the latest local commitment transactions of channels which must be
	 * force-closed during deserialization.
	 */
	public get_tx_broadcaster(): BroadcasterInterface {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_tx_broadcaster(this.ptr);
		const ret_hu_conv: BroadcasterInterface = new BroadcasterInterface(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The BroadcasterInterface which will be used in the ChannelManager in the future and may be
	 * used to broadcast the latest local commitment transactions of channels which must be
	 * force-closed during deserialization.
	 */
	public set_tx_broadcaster(val: BroadcasterInterface): void {
		bindings.ChannelManagerReadArgs_set_tx_broadcaster(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * The router which will be used in the ChannelManager in the future for finding routes
	 * on-the-fly for trampoline payments. Absent in private nodes that don't support forwarding.
	 * 
	 * No calls to the router will be made during deserialization.
	 */
	public get_router(): Router {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_router(this.ptr);
		const ret_hu_conv: Router = new Router(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The router which will be used in the ChannelManager in the future for finding routes
	 * on-the-fly for trampoline payments. Absent in private nodes that don't support forwarding.
	 * 
	 * No calls to the router will be made during deserialization.
	 */
	public set_router(val: Router): void {
		bindings.ChannelManagerReadArgs_set_router(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * The [`MessageRouter`] used for constructing [`BlindedMessagePath`]s for [`Offer`]s,
	 * [`Refund`]s, and any reply paths.
	 * 
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 */
	public get_message_router(): MessageRouter {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_message_router(this.ptr);
		const ret_hu_conv: MessageRouter = new MessageRouter(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The [`MessageRouter`] used for constructing [`BlindedMessagePath`]s for [`Offer`]s,
	 * [`Refund`]s, and any reply paths.
	 * 
	 * [`BlindedMessagePath`]: crate::blinded_path::message::BlindedMessagePath
	 */
	public set_message_router(val: MessageRouter): void {
		bindings.ChannelManagerReadArgs_set_message_router(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * The Logger for use in the ChannelManager and which may be used to log information during
	 * deserialization.
	 */
	public get_logger(): Logger {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_logger(this.ptr);
		const ret_hu_conv: Logger = new Logger(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * The Logger for use in the ChannelManager and which may be used to log information during
	 * deserialization.
	 */
	public set_logger(val: Logger): void {
		bindings.ChannelManagerReadArgs_set_logger(this.ptr, CommonBase.get_ptr_of(val));
		CommonBase.add_ref_from(this, val);
	}

	/**
	 * Default settings used for new channels. Any existing channels will continue to use the
	 * runtime settings which were stored when the ChannelManager was serialized.
	 */
	public get_config(): UserConfig {
		const ret: bigint = bindings.ChannelManagerReadArgs_get_config(this.ptr);
		const ret_hu_conv: UserConfig = new UserConfig(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, this);
		return ret_hu_conv;
	}

	/**
	 * Default settings used for new channels. Any existing channels will continue to use the
	 * runtime settings which were stored when the ChannelManager was serialized.
	 */
	public set_config(val: UserConfig): void {
		bindings.ChannelManagerReadArgs_set_config(this.ptr, CommonBase.get_ptr_of(val));
	}

	/**
	 * Simple utility function to create a ChannelManagerReadArgs which creates the monitor
	 * HashMap for you. This is primarily useful for C bindings where it is not practical to
	 * populate a HashMap directly from C.
	 */
	public static constructor_new(entropy_source: EntropySource, node_signer: NodeSigner, signer_provider: SignerProvider, fee_estimator: FeeEstimator, chain_monitor: Watch, tx_broadcaster: BroadcasterInterface, router: Router, message_router: MessageRouter, logger: Logger, config: UserConfig, channel_monitors: ChannelMonitor[]): ChannelManagerReadArgs {
		const ret: bigint = bindings.ChannelManagerReadArgs_new(CommonBase.get_ptr_of(entropy_source), CommonBase.get_ptr_of(node_signer), CommonBase.get_ptr_of(signer_provider), CommonBase.get_ptr_of(fee_estimator), CommonBase.get_ptr_of(chain_monitor), CommonBase.get_ptr_of(tx_broadcaster), CommonBase.get_ptr_of(router), CommonBase.get_ptr_of(message_router), CommonBase.get_ptr_of(logger), CommonBase.get_ptr_of(config), bindings.encodeUint64Array(channel_monitors.map(channel_monitors_conv_16 => CommonBase.get_ptr_of(channel_monitors_conv_16))));
		const ret_hu_conv: ChannelManagerReadArgs = new ChannelManagerReadArgs(null, ret);
		CommonBase.add_ref_from(ret_hu_conv, ret_hu_conv);
		CommonBase.add_ref_from(ret_hu_conv, entropy_source);
		CommonBase.add_ref_from(ret_hu_conv, node_signer);
		CommonBase.add_ref_from(ret_hu_conv, signer_provider);
		CommonBase.add_ref_from(ret_hu_conv, fee_estimator);
		CommonBase.add_ref_from(ret_hu_conv, chain_monitor);
		CommonBase.add_ref_from(ret_hu_conv, tx_broadcaster);
		CommonBase.add_ref_from(ret_hu_conv, router);
		CommonBase.add_ref_from(ret_hu_conv, message_router);
		CommonBase.add_ref_from(ret_hu_conv, logger);
		channel_monitors.forEach((channel_monitors_conv_16: ChannelMonitor) => { CommonBase.add_ref_from(ret_hu_conv, channel_monitors_conv_16); });
		return ret_hu_conv;
	}

}
