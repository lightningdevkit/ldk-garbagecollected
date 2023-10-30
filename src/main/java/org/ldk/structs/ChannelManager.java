package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import java.lang.ref.Reference;
import javax.annotation.Nullable;


/**
 * Manager which keeps track of a number of channels and sends messages to the appropriate
 * channel, also tracking HTLC preimages and forwarding onion packets appropriately.
 * 
 * Implements [`ChannelMessageHandler`], handling the multi-channel parts and passing things through
 * to individual Channels.
 * 
 * Implements [`Writeable`] to write out all channel state to disk. Implies [`peer_disconnected`] for
 * all peers during write/read (though does not modify this instance, only the instance being
 * serialized). This will result in any channels which have not yet exchanged [`funding_created`] (i.e.,
 * called [`funding_transaction_generated`] for outbound channels) being closed.
 * 
 * Note that you can be a bit lazier about writing out `ChannelManager` than you can be with
 * [`ChannelMonitor`]. With [`ChannelMonitor`] you MUST durably write each
 * [`ChannelMonitorUpdate`] before returning from
 * [`chain::Watch::watch_channel`]/[`update_channel`] or before completing async writes. With
 * `ChannelManager`s, writing updates happens out-of-band (and will prevent any other
 * `ChannelManager` operations from occurring during the serialization process). If the
 * deserialized version is out-of-date compared to the [`ChannelMonitor`] passed by reference to
 * [`read`], those channels will be force-closed based on the `ChannelMonitor` state and no funds
 * will be lost (modulo on-chain transaction fees).
 * 
 * Note that the deserializer is only implemented for `(`[`BlockHash`]`, `[`ChannelManager`]`)`, which
 * tells you the last block hash which was connected. You should get the best block tip before using the manager.
 * See [`chain::Listen`] and [`chain::Confirm`] for more details.
 * 
 * Note that `ChannelManager` is responsible for tracking liveness of its channels and generating
 * [`ChannelUpdate`] messages informing peers that the channel is temporarily disabled. To avoid
 * spam due to quick disconnection/reconnection, updates are not sent until the channel has been
 * offline for a full minute. In order to track this, you must call
 * [`timer_tick_occurred`] roughly once per minute, though it doesn't have to be perfect.
 * 
 * To avoid trivial DoS issues, `ChannelManager` limits the number of inbound connections and
 * inbound channels without confirmed funding transactions. This may result in nodes which we do
 * not have a channel with being unable to connect to us or open new channels with us if we have
 * many peers with unfunded channels.
 * 
 * Because it is an indication of trust, inbound channels which we've accepted as 0conf are
 * exempted from the count of unfunded channels. Similarly, outbound channels and connections are
 * never limited. Please ensure you limit the count of such channels yourself.
 * 
 * Rather than using a plain `ChannelManager`, it is preferable to use either a [`SimpleArcChannelManager`]
 * a [`SimpleRefChannelManager`], for conciseness. See their documentation for more details, but
 * essentially you should default to using a [`SimpleRefChannelManager`], and use a
 * [`SimpleArcChannelManager`] when you require a `ChannelManager` with a static lifetime, such as when
 * you're using lightning-net-tokio.
 * 
 * [`peer_disconnected`]: msgs::ChannelMessageHandler::peer_disconnected
 * [`funding_created`]: msgs::FundingCreated
 * [`funding_transaction_generated`]: Self::funding_transaction_generated
 * [`BlockHash`]: bitcoin::hash_types::BlockHash
 * [`update_channel`]: chain::Watch::update_channel
 * [`ChannelUpdate`]: msgs::ChannelUpdate
 * [`timer_tick_occurred`]: Self::timer_tick_occurred
 * [`read`]: ReadableArgs::read
 */
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelManager extends CommonBase {
	ChannelManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
		if (ptr != 0) { bindings.ChannelManager_free(ptr); }
	}

	/**
	 * Constructs a new `ChannelManager` to hold several channels and route between them.
	 * 
	 * The current time or latest block header time can be provided as the `current_timestamp`.
	 * 
	 * This is the main \"logic hub\" for all channel-related actions, and implements
	 * [`ChannelMessageHandler`].
	 * 
	 * Non-proportional fees are fixed according to our risk using the provided fee estimator.
	 * 
	 * Users need to notify the new `ChannelManager` when a new block is connected or
	 * disconnected using its [`block_connected`] and [`block_disconnected`] methods, starting
	 * from after [`params.best_block.block_hash`]. See [`chain::Listen`] and [`chain::Confirm`] for
	 * more details.
	 * 
	 * [`block_connected`]: chain::Listen::block_connected
	 * [`block_disconnected`]: chain::Listen::block_disconnected
	 * [`params.best_block.block_hash`]: chain::BestBlock::block_hash
	 */
	public static ChannelManager of(org.ldk.structs.FeeEstimator fee_est, org.ldk.structs.Watch chain_monitor, org.ldk.structs.BroadcasterInterface tx_broadcaster, org.ldk.structs.Router router, org.ldk.structs.Logger logger, org.ldk.structs.EntropySource entropy_source, org.ldk.structs.NodeSigner node_signer, org.ldk.structs.SignerProvider signer_provider, org.ldk.structs.UserConfig config, org.ldk.structs.ChainParameters params, int current_timestamp) {
		long ret = bindings.ChannelManager_new(fee_est.ptr, chain_monitor.ptr, tx_broadcaster.ptr, router.ptr, logger.ptr, entropy_source.ptr, node_signer.ptr, signer_provider.ptr, config == null ? 0 : config.ptr, params == null ? 0 : params.ptr, current_timestamp);
		Reference.reachabilityFence(fee_est);
		Reference.reachabilityFence(chain_monitor);
		Reference.reachabilityFence(tx_broadcaster);
		Reference.reachabilityFence(router);
		Reference.reachabilityFence(logger);
		Reference.reachabilityFence(entropy_source);
		Reference.reachabilityFence(node_signer);
		Reference.reachabilityFence(signer_provider);
		Reference.reachabilityFence(config);
		Reference.reachabilityFence(params);
		Reference.reachabilityFence(current_timestamp);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelManager(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(fee_est); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(chain_monitor); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(tx_broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(router); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(entropy_source); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(node_signer); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(signer_provider); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(config); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(params); };
		return ret_hu_conv;
	}

	/**
	 * Gets the current configuration applied to all new channels.
	 */
	public UserConfig get_current_default_configuration() {
		long ret = bindings.ChannelManager_get_current_default_configuration(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UserConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Creates a new outbound channel to the given remote node and with the given value.
	 * 
	 * `user_channel_id` will be provided back as in
	 * [`Event::FundingGenerationReady::user_channel_id`] to allow tracking of which events
	 * correspond with which `create_channel` call. Note that the `user_channel_id` defaults to a
	 * randomized value for inbound channels. `user_channel_id` has no meaning inside of LDK, it
	 * is simply copied to events and otherwise ignored.
	 * 
	 * Raises [`APIError::APIMisuseError`] when `channel_value_satoshis` > 2**24 or `push_msat` is
	 * greater than `channel_value_satoshis * 1k` or `channel_value_satoshis < 1000`.
	 * 
	 * Raises [`APIError::ChannelUnavailable`] if the channel cannot be opened due to failing to
	 * generate a shutdown scriptpubkey or destination script set by
	 * [`SignerProvider::get_shutdown_scriptpubkey`] or [`SignerProvider::get_destination_script`].
	 * 
	 * Note that we do not check if you are currently connected to the given peer. If no
	 * connection is available, the outbound `open_channel` message may fail to send, resulting in
	 * the channel eventually being silently forgotten (dropped on reload).
	 * 
	 * Returns the new Channel's temporary `channel_id`. This ID will appear as
	 * [`Event::FundingGenerationReady::temporary_channel_id`] and in
	 * [`ChannelDetails::channel_id`] until after
	 * [`ChannelManager::funding_transaction_generated`] is called, swapping the Channel's ID for
	 * one derived from the funding transaction's TXID. If the counterparty rejects the channel
	 * immediately, this temporary ID will appear in [`Event::ChannelClosed::channel_id`].
	 * 
	 * [`Event::FundingGenerationReady::user_channel_id`]: events::Event::FundingGenerationReady::user_channel_id
	 * [`Event::FundingGenerationReady::temporary_channel_id`]: events::Event::FundingGenerationReady::temporary_channel_id
	 * [`Event::ChannelClosed::channel_id`]: events::Event::ChannelClosed::channel_id
	 * 
	 * Note that override_config (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_ThirtyTwoBytesAPIErrorZ create_channel(byte[] their_network_key, long channel_value_satoshis, long push_msat, org.ldk.util.UInt128 user_channel_id, @Nullable org.ldk.structs.UserConfig override_config) {
		long ret = bindings.ChannelManager_create_channel(this.ptr, InternalUtils.check_arr_len(their_network_key, 33), channel_value_satoshis, push_msat, user_channel_id.getLEBytes(), override_config == null ? 0 : override_config.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(their_network_key);
		Reference.reachabilityFence(channel_value_satoshis);
		Reference.reachabilityFence(push_msat);
		Reference.reachabilityFence(user_channel_id);
		Reference.reachabilityFence(override_config);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesAPIErrorZ ret_hu_conv = Result_ThirtyTwoBytesAPIErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(override_config); };
		return ret_hu_conv;
	}

	/**
	 * Gets the list of open channels, in random order. See [`ChannelDetails`] field documentation for
	 * more information.
	 */
	public ChannelDetails[] list_channels() {
		long[] ret = bindings.ChannelManager_list_channels(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_16_len = ret.length;
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret_conv_16_len];
		for (int q = 0; q < ret_conv_16_len; q++) {
			long ret_conv_16 = ret[q];
			org.ldk.structs.ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, ret_conv_16); }
			if (ret_conv_16_hu_conv != null) { ret_conv_16_hu_conv.ptrs_to.add(this); };
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * Gets the list of usable channels, in random order. Useful as an argument to
	 * [`Router::find_route`] to ensure non-announced channels are used.
	 * 
	 * These are guaranteed to have their [`ChannelDetails::is_usable`] value set to true, see the
	 * documentation for [`ChannelDetails::is_usable`] for more info on exactly what the criteria
	 * are.
	 */
	public ChannelDetails[] list_usable_channels() {
		long[] ret = bindings.ChannelManager_list_usable_channels(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_16_len = ret.length;
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret_conv_16_len];
		for (int q = 0; q < ret_conv_16_len; q++) {
			long ret_conv_16 = ret[q];
			org.ldk.structs.ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, ret_conv_16); }
			if (ret_conv_16_hu_conv != null) { ret_conv_16_hu_conv.ptrs_to.add(this); };
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * Gets the list of channels we have with a given counterparty, in random order.
	 */
	public ChannelDetails[] list_channels_with_counterparty(byte[] counterparty_node_id) {
		long[] ret = bindings.ChannelManager_list_channels_with_counterparty(this.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(counterparty_node_id);
		int ret_conv_16_len = ret.length;
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret_conv_16_len];
		for (int q = 0; q < ret_conv_16_len; q++) {
			long ret_conv_16 = ret[q];
			org.ldk.structs.ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, ret_conv_16); }
			if (ret_conv_16_hu_conv != null) { ret_conv_16_hu_conv.ptrs_to.add(this); };
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * Returns in an undefined order recent payments that -- if not fulfilled -- have yet to find a
	 * successful path, or have unresolved HTLCs.
	 * 
	 * This can be useful for payments that may have been prepared, but ultimately not sent, as a
	 * result of a crash. If such a payment exists, is not listed here, and an
	 * [`Event::PaymentSent`] has not been received, you may consider resending the payment.
	 * 
	 * [`Event::PaymentSent`]: events::Event::PaymentSent
	 */
	public RecentPaymentDetails[] list_recent_payments() {
		long[] ret = bindings.ChannelManager_list_recent_payments(this.ptr);
		Reference.reachabilityFence(this);
		int ret_conv_22_len = ret.length;
		RecentPaymentDetails[] ret_conv_22_arr = new RecentPaymentDetails[ret_conv_22_len];
		for (int w = 0; w < ret_conv_22_len; w++) {
			long ret_conv_22 = ret[w];
			org.ldk.structs.RecentPaymentDetails ret_conv_22_hu_conv = org.ldk.structs.RecentPaymentDetails.constr_from_ptr(ret_conv_22);
			if (ret_conv_22_hu_conv != null) { ret_conv_22_hu_conv.ptrs_to.add(this); };
			ret_conv_22_arr[w] = ret_conv_22_hu_conv;
		}
		return ret_conv_22_arr;
	}

	/**
	 * Begins the process of closing a channel. After this call (plus some timeout), no new HTLCs
	 * will be accepted on the given channel, and after additional timeout/the closing of all
	 * pending HTLCs, the channel will be closed on chain.
	 * 
	 * If we are the channel initiator, we will pay between our [`ChannelCloseMinimum`] and
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`] plus our [`NonAnchorChannelFee`]
	 * fee estimate.
	 * If our counterparty is the channel initiator, we will require a channel closing
	 * transaction feerate of at least our [`ChannelCloseMinimum`] feerate or the feerate which
	 * would appear on a force-closure transaction, whichever is lower. We will allow our
	 * counterparty to pay as much fee as they'd like, however.
	 * 
	 * May generate a [`SendShutdown`] message event on success, which should be relayed.
	 * 
	 * Raises [`APIError::ChannelUnavailable`] if the channel cannot be closed due to failing to
	 * generate a shutdown scriptpubkey or destination script set by
	 * [`SignerProvider::get_shutdown_scriptpubkey`]. A force-closure may be needed to close the
	 * channel.
	 * 
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`]: crate::util::config::ChannelConfig::force_close_avoidance_max_fee_satoshis
	 * [`ChannelCloseMinimum`]: crate::chain::chaininterface::ConfirmationTarget::ChannelCloseMinimum
	 * [`NonAnchorChannelFee`]: crate::chain::chaininterface::ConfirmationTarget::NonAnchorChannelFee
	 * [`SendShutdown`]: crate::events::MessageSendEvent::SendShutdown
	 */
	public Result_NoneAPIErrorZ close_channel(byte[] channel_id, byte[] counterparty_node_id) {
		long ret = bindings.ChannelManager_close_channel(this.ptr, InternalUtils.check_arr_len(channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Begins the process of closing a channel. After this call (plus some timeout), no new HTLCs
	 * will be accepted on the given channel, and after additional timeout/the closing of all
	 * pending HTLCs, the channel will be closed on chain.
	 * 
	 * `target_feerate_sat_per_1000_weight` has different meanings depending on if we initiated
	 * the channel being closed or not:
	 * If we are the channel initiator, we will pay at least this feerate on the closing
	 * transaction. The upper-bound is set by
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`] plus our [`NonAnchorChannelFee`]
	 * fee estimate (or `target_feerate_sat_per_1000_weight`, if it is greater).
	 * If our counterparty is the channel initiator, we will refuse to accept a channel closure
	 * transaction feerate below `target_feerate_sat_per_1000_weight` (or the feerate which
	 * will appear on a force-closure transaction, whichever is lower).
	 * 
	 * The `shutdown_script` provided  will be used as the `scriptPubKey` for the closing transaction.
	 * Will fail if a shutdown script has already been set for this channel by
	 * ['ChannelHandshakeConfig::commit_upfront_shutdown_pubkey`]. The given shutdown script must
	 * also be compatible with our and the counterparty's features.
	 * 
	 * May generate a [`SendShutdown`] message event on success, which should be relayed.
	 * 
	 * Raises [`APIError::ChannelUnavailable`] if the channel cannot be closed due to failing to
	 * generate a shutdown scriptpubkey or destination script set by
	 * [`SignerProvider::get_shutdown_scriptpubkey`]. A force-closure may be needed to close the
	 * channel.
	 * 
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`]: crate::util::config::ChannelConfig::force_close_avoidance_max_fee_satoshis
	 * [`NonAnchorChannelFee`]: crate::chain::chaininterface::ConfirmationTarget::NonAnchorChannelFee
	 * [`SendShutdown`]: crate::events::MessageSendEvent::SendShutdown
	 * 
	 * Note that shutdown_script (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_NoneAPIErrorZ close_channel_with_feerate_and_script(byte[] channel_id, byte[] counterparty_node_id, org.ldk.structs.Option_u32Z target_feerate_sats_per_1000_weight, @Nullable org.ldk.structs.ShutdownScript shutdown_script) {
		long ret = bindings.ChannelManager_close_channel_with_feerate_and_script(this.ptr, InternalUtils.check_arr_len(channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33), target_feerate_sats_per_1000_weight.ptr, shutdown_script == null ? 0 : shutdown_script.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(target_feerate_sats_per_1000_weight);
		Reference.reachabilityFence(shutdown_script);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(target_feerate_sats_per_1000_weight); };
		if (this != null) { this.ptrs_to.add(shutdown_script); };
		return ret_hu_conv;
	}

	/**
	 * Force closes a channel, immediately broadcasting the latest local transaction(s) and
	 * rejecting new HTLCs on the given channel. Fails if `channel_id` is unknown to
	 * the manager, or if the `counterparty_node_id` isn't the counterparty of the corresponding
	 * channel.
	 */
	public Result_NoneAPIErrorZ force_close_broadcasting_latest_txn(byte[] channel_id, byte[] counterparty_node_id) {
		long ret = bindings.ChannelManager_force_close_broadcasting_latest_txn(this.ptr, InternalUtils.check_arr_len(channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Force closes a channel, rejecting new HTLCs on the given channel but skips broadcasting
	 * the latest local transaction(s). Fails if `channel_id` is unknown to the manager, or if the
	 * `counterparty_node_id` isn't the counterparty of the corresponding channel.
	 * 
	 * You can always get the latest local transaction(s) to broadcast from
	 * [`ChannelMonitor::get_latest_holder_commitment_txn`].
	 */
	public Result_NoneAPIErrorZ force_close_without_broadcasting_txn(byte[] channel_id, byte[] counterparty_node_id) {
		long ret = bindings.ChannelManager_force_close_without_broadcasting_txn(this.ptr, InternalUtils.check_arr_len(channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Force close all channels, immediately broadcasting the latest local commitment transaction
	 * for each to the chain and rejecting new HTLCs on each.
	 */
	public void force_close_all_channels_broadcasting_latest_txn() {
		bindings.ChannelManager_force_close_all_channels_broadcasting_latest_txn(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Force close all channels rejecting new HTLCs on each but without broadcasting the latest
	 * local transaction(s).
	 */
	public void force_close_all_channels_without_broadcasting_txn() {
		bindings.ChannelManager_force_close_all_channels_without_broadcasting_txn(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Sends a payment along a given route.
	 * 
	 * Value parameters are provided via the last hop in route, see documentation for [`RouteHop`]
	 * fields for more info.
	 * 
	 * May generate [`UpdateHTLCs`] message(s) event on success, which should be relayed (e.g. via
	 * [`PeerManager::process_events`]).
	 * 
	 * # Avoiding Duplicate Payments
	 * 
	 * If a pending payment is currently in-flight with the same [`PaymentId`] provided, this
	 * method will error with an [`APIError::InvalidRoute`]. Note, however, that once a payment
	 * is no longer pending (either via [`ChannelManager::abandon_payment`], or handling of an
	 * [`Event::PaymentSent`] or [`Event::PaymentFailed`]) LDK will not stop you from sending a
	 * second payment with the same [`PaymentId`].
	 * 
	 * Thus, in order to ensure duplicate payments are not sent, you should implement your own
	 * tracking of payments, including state to indicate once a payment has completed. Because you
	 * should also ensure that [`PaymentHash`]es are not re-used, for simplicity, you should
	 * consider using the [`PaymentHash`] as the key for tracking payments. In that case, the
	 * [`PaymentId`] should be a copy of the [`PaymentHash`] bytes.
	 * 
	 * Additionally, in the scenario where we begin the process of sending a payment, but crash
	 * before `send_payment` returns (or prior to [`ChannelMonitorUpdate`] persistence if you're
	 * using [`ChannelMonitorUpdateStatus::InProgress`]), the payment may be lost on restart. See
	 * [`ChannelManager::list_recent_payments`] for more information.
	 * 
	 * # Possible Error States on [`PaymentSendFailure`]
	 * 
	 * Each path may have a different return value, and [`PaymentSendFailure`] may return a `Vec` with
	 * each entry matching the corresponding-index entry in the route paths, see
	 * [`PaymentSendFailure`] for more info.
	 * 
	 * In general, a path may raise:
	 * [`APIError::InvalidRoute`] when an invalid route or forwarding parameter (cltv_delta, fee,
	 * node public key) is specified.
	 * [`APIError::ChannelUnavailable`] if the next-hop channel is not available as it has been
	 * closed, doesn't exist, or the peer is currently disconnected.
	 * [`APIError::MonitorUpdateInProgress`] if a new monitor update failure prevented sending the
	 * relevant updates.
	 * 
	 * Note that depending on the type of the [`PaymentSendFailure`] the HTLC may have been
	 * irrevocably committed to on our end. In such a case, do NOT retry the payment with a
	 * different route unless you intend to pay twice!
	 * 
	 * [`RouteHop`]: crate::routing::router::RouteHop
	 * [`Event::PaymentSent`]: events::Event::PaymentSent
	 * [`Event::PaymentFailed`]: events::Event::PaymentFailed
	 * [`UpdateHTLCs`]: events::MessageSendEvent::UpdateHTLCs
	 * [`PeerManager::process_events`]: crate::ln::peer_handler::PeerManager::process_events
	 * [`ChannelMonitorUpdateStatus::InProgress`]: crate::chain::ChannelMonitorUpdateStatus::InProgress
	 */
	public Result_NonePaymentSendFailureZ send_payment_with_route(org.ldk.structs.Route route, byte[] payment_hash, org.ldk.structs.RecipientOnionFields recipient_onion, byte[] payment_id) {
		long ret = bindings.ChannelManager_send_payment_with_route(this.ptr, route == null ? 0 : route.ptr, InternalUtils.check_arr_len(payment_hash, 32), recipient_onion == null ? 0 : recipient_onion.ptr, InternalUtils.check_arr_len(payment_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(route);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(recipient_onion);
		Reference.reachabilityFence(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(route); };
		if (this != null) { this.ptrs_to.add(recipient_onion); };
		return ret_hu_conv;
	}

	/**
	 * Similar to [`ChannelManager::send_payment_with_route`], but will automatically find a route based on
	 * `route_params` and retry failed payment paths based on `retry_strategy`.
	 */
	public Result_NoneRetryableSendFailureZ send_payment(byte[] payment_hash, org.ldk.structs.RecipientOnionFields recipient_onion, byte[] payment_id, org.ldk.structs.RouteParameters route_params, org.ldk.structs.Retry retry_strategy) {
		long ret = bindings.ChannelManager_send_payment(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), recipient_onion == null ? 0 : recipient_onion.ptr, InternalUtils.check_arr_len(payment_id, 32), route_params == null ? 0 : route_params.ptr, retry_strategy.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(recipient_onion);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(route_params);
		Reference.reachabilityFence(retry_strategy);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneRetryableSendFailureZ ret_hu_conv = Result_NoneRetryableSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(recipient_onion); };
		if (this != null) { this.ptrs_to.add(route_params); };
		if (this != null) { this.ptrs_to.add(retry_strategy); };
		return ret_hu_conv;
	}

	/**
	 * Signals that no further attempts for the given payment should occur. Useful if you have a
	 * pending outbound payment with retries remaining, but wish to stop retrying the payment before
	 * retries are exhausted.
	 * 
	 * # Event Generation
	 * 
	 * If no [`Event::PaymentFailed`] event had been generated before, one will be generated as soon
	 * as there are no remaining pending HTLCs for this payment.
	 * 
	 * Note that calling this method does *not* prevent a payment from succeeding. You must still
	 * wait until you receive either a [`Event::PaymentFailed`] or [`Event::PaymentSent`] event to
	 * determine the ultimate status of a payment.
	 * 
	 * # Requested Invoices
	 * 
	 * In the case of paying a [`Bolt12Invoice`] via [`ChannelManager::pay_for_offer`], abandoning
	 * the payment prior to receiving the invoice will result in an [`Event::InvoiceRequestFailed`]
	 * and prevent any attempts at paying it once received. The other events may only be generated
	 * once the invoice has been received.
	 * 
	 * # Restart Behavior
	 * 
	 * If an [`Event::PaymentFailed`] is generated and we restart without first persisting the
	 * [`ChannelManager`], another [`Event::PaymentFailed`] may be generated; likewise for
	 * [`Event::InvoiceRequestFailed`].
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public void abandon_payment(byte[] payment_id) {
		bindings.ChannelManager_abandon_payment(this.ptr, InternalUtils.check_arr_len(payment_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_id);
	}

	/**
	 * Send a spontaneous payment, which is a payment that does not require the recipient to have
	 * generated an invoice. Optionally, you may specify the preimage. If you do choose to specify
	 * the preimage, it must be a cryptographically secure random value that no intermediate node
	 * would be able to guess -- otherwise, an intermediate node may claim the payment and it will
	 * never reach the recipient.
	 * 
	 * See [`send_payment`] documentation for more details on the return value of this function
	 * and idempotency guarantees provided by the [`PaymentId`] key.
	 * 
	 * Similar to regular payments, you MUST NOT reuse a `payment_preimage` value. See
	 * [`send_payment`] for more information about the risks of duplicate preimage usage.
	 * 
	 * [`send_payment`]: Self::send_payment
	 */
	public Result_ThirtyTwoBytesPaymentSendFailureZ send_spontaneous_payment(org.ldk.structs.Route route, org.ldk.structs.Option_ThirtyTwoBytesZ payment_preimage, org.ldk.structs.RecipientOnionFields recipient_onion, byte[] payment_id) {
		long ret = bindings.ChannelManager_send_spontaneous_payment(this.ptr, route == null ? 0 : route.ptr, payment_preimage.ptr, recipient_onion == null ? 0 : recipient_onion.ptr, InternalUtils.check_arr_len(payment_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(route);
		Reference.reachabilityFence(payment_preimage);
		Reference.reachabilityFence(recipient_onion);
		Reference.reachabilityFence(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesPaymentSendFailureZ ret_hu_conv = Result_ThirtyTwoBytesPaymentSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(route); };
		if (this != null) { this.ptrs_to.add(payment_preimage); };
		if (this != null) { this.ptrs_to.add(recipient_onion); };
		return ret_hu_conv;
	}

	/**
	 * Similar to [`ChannelManager::send_spontaneous_payment`], but will automatically find a route
	 * based on `route_params` and retry failed payment paths based on `retry_strategy`.
	 * 
	 * See [`PaymentParameters::for_keysend`] for help in constructing `route_params` for spontaneous
	 * payments.
	 * 
	 * [`PaymentParameters::for_keysend`]: crate::routing::router::PaymentParameters::for_keysend
	 */
	public Result_ThirtyTwoBytesRetryableSendFailureZ send_spontaneous_payment_with_retry(org.ldk.structs.Option_ThirtyTwoBytesZ payment_preimage, org.ldk.structs.RecipientOnionFields recipient_onion, byte[] payment_id, org.ldk.structs.RouteParameters route_params, org.ldk.structs.Retry retry_strategy) {
		long ret = bindings.ChannelManager_send_spontaneous_payment_with_retry(this.ptr, payment_preimage.ptr, recipient_onion == null ? 0 : recipient_onion.ptr, InternalUtils.check_arr_len(payment_id, 32), route_params == null ? 0 : route_params.ptr, retry_strategy.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_preimage);
		Reference.reachabilityFence(recipient_onion);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(route_params);
		Reference.reachabilityFence(retry_strategy);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesRetryableSendFailureZ ret_hu_conv = Result_ThirtyTwoBytesRetryableSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(payment_preimage); };
		if (this != null) { this.ptrs_to.add(recipient_onion); };
		if (this != null) { this.ptrs_to.add(route_params); };
		if (this != null) { this.ptrs_to.add(retry_strategy); };
		return ret_hu_conv;
	}

	/**
	 * Send a payment that is probing the given route for liquidity. We calculate the
	 * [`PaymentHash`] of probes based on a static secret and a random [`PaymentId`], which allows
	 * us to easily discern them from real payments.
	 */
	public Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ send_probe(org.ldk.structs.Path path) {
		long ret = bindings.ChannelManager_send_probe(this.ptr, path == null ? 0 : path.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(path);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZPaymentSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(path); };
		return ret_hu_conv;
	}

	/**
	 * Sends payment probes over all paths of a route that would be used to pay the given
	 * amount to the given `node_id`.
	 * 
	 * See [`ChannelManager::send_preflight_probes`] for more information.
	 */
	public Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ send_spontaneous_preflight_probes(byte[] node_id, long amount_msat, int final_cltv_expiry_delta, org.ldk.structs.Option_u64Z liquidity_limit_multiplier) {
		long ret = bindings.ChannelManager_send_spontaneous_preflight_probes(this.ptr, InternalUtils.check_arr_len(node_id, 33), amount_msat, final_cltv_expiry_delta, liquidity_limit_multiplier.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(node_id);
		Reference.reachabilityFence(amount_msat);
		Reference.reachabilityFence(final_cltv_expiry_delta);
		Reference.reachabilityFence(liquidity_limit_multiplier);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(liquidity_limit_multiplier); };
		return ret_hu_conv;
	}

	/**
	 * Sends payment probes over all paths of a route that would be used to pay a route found
	 * according to the given [`RouteParameters`].
	 * 
	 * This may be used to send \"pre-flight\" probes, i.e., to train our scorer before conducting
	 * the actual payment. Note this is only useful if there likely is sufficient time for the
	 * probe to settle before sending out the actual payment, e.g., when waiting for user
	 * confirmation in a wallet UI.
	 * 
	 * Otherwise, there is a chance the probe could take up some liquidity needed to complete the
	 * actual payment. Users should therefore be cautious and might avoid sending probes if
	 * liquidity is scarce and/or they don't expect the probe to return before they send the
	 * payment. To mitigate this issue, channels with available liquidity less than the required
	 * amount times the given `liquidity_limit_multiplier` won't be used to send pre-flight
	 * probes. If `None` is given as `liquidity_limit_multiplier`, it defaults to `3`.
	 */
	public Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ send_preflight_probes(org.ldk.structs.RouteParameters route_params, org.ldk.structs.Option_u64Z liquidity_limit_multiplier) {
		long ret = bindings.ChannelManager_send_preflight_probes(this.ptr, route_params == null ? 0 : route_params.ptr, liquidity_limit_multiplier.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(route_params);
		Reference.reachabilityFence(liquidity_limit_multiplier);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ ret_hu_conv = Result_CVec_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZZProbeSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(route_params); };
		if (this != null) { this.ptrs_to.add(liquidity_limit_multiplier); };
		return ret_hu_conv;
	}

	/**
	 * Call this upon creation of a funding transaction for the given channel.
	 * 
	 * Returns an [`APIError::APIMisuseError`] if the funding_transaction spent non-SegWit outputs
	 * or if no output was found which matches the parameters in [`Event::FundingGenerationReady`].
	 * 
	 * Returns [`APIError::APIMisuseError`] if the funding transaction is not final for propagation
	 * across the p2p network.
	 * 
	 * Returns [`APIError::ChannelUnavailable`] if a funding transaction has already been provided
	 * for the channel or if the channel has been closed as indicated by [`Event::ChannelClosed`].
	 * 
	 * May panic if the output found in the funding transaction is duplicative with some other
	 * channel (note that this should be trivially prevented by using unique funding transaction
	 * keys per-channel).
	 * 
	 * Do NOT broadcast the funding transaction yourself. When we have safely received our
	 * counterparty's signature the funding transaction will automatically be broadcast via the
	 * [`BroadcasterInterface`] provided when this `ChannelManager` was constructed.
	 * 
	 * Note that this includes RBF or similar transaction replacement strategies - lightning does
	 * not currently support replacing a funding transaction on an existing channel. Instead,
	 * create a new channel with a conflicting funding transaction.
	 * 
	 * Note to keep the miner incentives aligned in moving the blockchain forward, we recommend
	 * the wallet software generating the funding transaction to apply anti-fee sniping as
	 * implemented by Bitcoin Core wallet. See <https://bitcoinops.org/en/topics/fee-sniping/>
	 * for more details.
	 * 
	 * [`Event::FundingGenerationReady`]: crate::events::Event::FundingGenerationReady
	 * [`Event::ChannelClosed`]: crate::events::Event::ChannelClosed
	 */
	public Result_NoneAPIErrorZ funding_transaction_generated(byte[] temporary_channel_id, byte[] counterparty_node_id, byte[] funding_transaction) {
		long ret = bindings.ChannelManager_funding_transaction_generated(this.ptr, InternalUtils.check_arr_len(temporary_channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33), funding_transaction);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(temporary_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(funding_transaction);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Call this upon creation of a batch funding transaction for the given channels.
	 * 
	 * Return values are identical to [`Self::funding_transaction_generated`], respective to
	 * each individual channel and transaction output.
	 * 
	 * Do NOT broadcast the funding transaction yourself. This batch funding transcaction
	 * will only be broadcast when we have safely received and persisted the counterparty's
	 * signature for each channel.
	 * 
	 * If there is an error, all channels in the batch are to be considered closed.
	 */
	public Result_NoneAPIErrorZ batch_funding_transaction_generated(TwoTuple_ThirtyTwoBytesPublicKeyZ[] temporary_channels, byte[] funding_transaction) {
		long ret = bindings.ChannelManager_batch_funding_transaction_generated(this.ptr, temporary_channels != null ? Arrays.stream(temporary_channels).mapToLong(temporary_channels_conv_35 -> temporary_channels_conv_35 != null ? temporary_channels_conv_35.ptr : 0).toArray() : null, funding_transaction);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(temporary_channels);
		Reference.reachabilityFence(funding_transaction);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Atomically applies partial updates to the [`ChannelConfig`] of the given channels.
	 * 
	 * Once the updates are applied, each eligible channel (advertised with a known short channel
	 * ID and a change in [`forwarding_fee_proportional_millionths`], [`forwarding_fee_base_msat`],
	 * or [`cltv_expiry_delta`]) has a [`BroadcastChannelUpdate`] event message generated
	 * containing the new [`ChannelUpdate`] message which should be broadcast to the network.
	 * 
	 * Returns [`ChannelUnavailable`] when a channel is not found or an incorrect
	 * `counterparty_node_id` is provided.
	 * 
	 * Returns [`APIMisuseError`] when a [`cltv_expiry_delta`] update is to be applied with a value
	 * below [`MIN_CLTV_EXPIRY_DELTA`].
	 * 
	 * If an error is returned, none of the updates should be considered applied.
	 * 
	 * [`forwarding_fee_proportional_millionths`]: ChannelConfig::forwarding_fee_proportional_millionths
	 * [`forwarding_fee_base_msat`]: ChannelConfig::forwarding_fee_base_msat
	 * [`cltv_expiry_delta`]: ChannelConfig::cltv_expiry_delta
	 * [`BroadcastChannelUpdate`]: events::MessageSendEvent::BroadcastChannelUpdate
	 * [`ChannelUpdate`]: msgs::ChannelUpdate
	 * [`ChannelUnavailable`]: APIError::ChannelUnavailable
	 * [`APIMisuseError`]: APIError::APIMisuseError
	 */
	public Result_NoneAPIErrorZ update_partial_channel_config(byte[] counterparty_node_id, byte[][] channel_ids, org.ldk.structs.ChannelConfigUpdate config_update) {
		long ret = bindings.ChannelManager_update_partial_channel_config(this.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), channel_ids != null ? Arrays.stream(channel_ids).map(channel_ids_conv_8 -> InternalUtils.check_arr_len(channel_ids_conv_8, 32)).toArray(byte[][]::new) : null, config_update == null ? 0 : config_update.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(channel_ids);
		Reference.reachabilityFence(config_update);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(config_update); };
		return ret_hu_conv;
	}

	/**
	 * Atomically updates the [`ChannelConfig`] for the given channels.
	 * 
	 * Once the updates are applied, each eligible channel (advertised with a known short channel
	 * ID and a change in [`forwarding_fee_proportional_millionths`], [`forwarding_fee_base_msat`],
	 * or [`cltv_expiry_delta`]) has a [`BroadcastChannelUpdate`] event message generated
	 * containing the new [`ChannelUpdate`] message which should be broadcast to the network.
	 * 
	 * Returns [`ChannelUnavailable`] when a channel is not found or an incorrect
	 * `counterparty_node_id` is provided.
	 * 
	 * Returns [`APIMisuseError`] when a [`cltv_expiry_delta`] update is to be applied with a value
	 * below [`MIN_CLTV_EXPIRY_DELTA`].
	 * 
	 * If an error is returned, none of the updates should be considered applied.
	 * 
	 * [`forwarding_fee_proportional_millionths`]: ChannelConfig::forwarding_fee_proportional_millionths
	 * [`forwarding_fee_base_msat`]: ChannelConfig::forwarding_fee_base_msat
	 * [`cltv_expiry_delta`]: ChannelConfig::cltv_expiry_delta
	 * [`BroadcastChannelUpdate`]: events::MessageSendEvent::BroadcastChannelUpdate
	 * [`ChannelUpdate`]: msgs::ChannelUpdate
	 * [`ChannelUnavailable`]: APIError::ChannelUnavailable
	 * [`APIMisuseError`]: APIError::APIMisuseError
	 */
	public Result_NoneAPIErrorZ update_channel_config(byte[] counterparty_node_id, byte[][] channel_ids, org.ldk.structs.ChannelConfig config) {
		long ret = bindings.ChannelManager_update_channel_config(this.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), channel_ids != null ? Arrays.stream(channel_ids).map(channel_ids_conv_8 -> InternalUtils.check_arr_len(channel_ids_conv_8, 32)).toArray(byte[][]::new) : null, config == null ? 0 : config.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(channel_ids);
		Reference.reachabilityFence(config);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(config); };
		return ret_hu_conv;
	}

	/**
	 * Attempts to forward an intercepted HTLC over the provided channel id and with the provided
	 * amount to forward. Should only be called in response to an [`HTLCIntercepted`] event.
	 * 
	 * Intercepted HTLCs can be useful for Lightning Service Providers (LSPs) to open a just-in-time
	 * channel to a receiving node if the node lacks sufficient inbound liquidity.
	 * 
	 * To make use of intercepted HTLCs, set [`UserConfig::accept_intercept_htlcs`] and use
	 * [`ChannelManager::get_intercept_scid`] to generate short channel id(s) to put in the
	 * receiver's invoice route hints. These route hints will signal to LDK to generate an
	 * [`HTLCIntercepted`] event when it receives the forwarded HTLC, and this method or
	 * [`ChannelManager::fail_intercepted_htlc`] MUST be called in response to the event.
	 * 
	 * Note that LDK does not enforce fee requirements in `amt_to_forward_msat`, and will not stop
	 * you from forwarding more than you received. See
	 * [`HTLCIntercepted::expected_outbound_amount_msat`] for more on forwarding a different amount
	 * than expected.
	 * 
	 * Errors if the event was not handled in time, in which case the HTLC was automatically failed
	 * backwards.
	 * 
	 * [`UserConfig::accept_intercept_htlcs`]: crate::util::config::UserConfig::accept_intercept_htlcs
	 * [`HTLCIntercepted`]: events::Event::HTLCIntercepted
	 * [`HTLCIntercepted::expected_outbound_amount_msat`]: events::Event::HTLCIntercepted::expected_outbound_amount_msat
	 */
	public Result_NoneAPIErrorZ forward_intercepted_htlc(byte[] intercept_id, byte[] next_hop_channel_id, byte[] next_node_id, long amt_to_forward_msat) {
		long ret = bindings.ChannelManager_forward_intercepted_htlc(this.ptr, InternalUtils.check_arr_len(intercept_id, 32), InternalUtils.check_arr_len(next_hop_channel_id, 32), InternalUtils.check_arr_len(next_node_id, 33), amt_to_forward_msat);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(intercept_id);
		Reference.reachabilityFence(next_hop_channel_id);
		Reference.reachabilityFence(next_node_id);
		Reference.reachabilityFence(amt_to_forward_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Fails the intercepted HTLC indicated by intercept_id. Should only be called in response to
	 * an [`HTLCIntercepted`] event. See [`ChannelManager::forward_intercepted_htlc`].
	 * 
	 * Errors if the event was not handled in time, in which case the HTLC was automatically failed
	 * backwards.
	 * 
	 * [`HTLCIntercepted`]: events::Event::HTLCIntercepted
	 */
	public Result_NoneAPIErrorZ fail_intercepted_htlc(byte[] intercept_id) {
		long ret = bindings.ChannelManager_fail_intercepted_htlc(this.ptr, InternalUtils.check_arr_len(intercept_id, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(intercept_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Processes HTLCs which are pending waiting on random forward delay.
	 * 
	 * Should only really ever be called in response to a PendingHTLCsForwardable event.
	 * Will likely generate further events.
	 */
	public void process_pending_htlc_forwards() {
		bindings.ChannelManager_process_pending_htlc_forwards(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Performs actions which should happen on startup and roughly once per minute thereafter.
	 * 
	 * This currently includes:
	 * Increasing or decreasing the on-chain feerate estimates for our outbound channels,
	 * Broadcasting [`ChannelUpdate`] messages if we've been disconnected from our peer for more
	 * than a minute, informing the network that they should no longer attempt to route over
	 * the channel.
	 * Expiring a channel's previous [`ChannelConfig`] if necessary to only allow forwarding HTLCs
	 * with the current [`ChannelConfig`].
	 * Removing peers which have disconnected but and no longer have any channels.
	 * Force-closing and removing channels which have not completed establishment in a timely manner.
	 * Forgetting about stale outbound payments, either those that have already been fulfilled
	 * or those awaiting an invoice that hasn't been delivered in the necessary amount of time.
	 * The latter is determined using the system clock in `std` and the highest seen block time
	 * minus two hours in `no-std`.
	 * 
	 * Note that this may cause reentrancy through [`chain::Watch::update_channel`] calls or feerate
	 * estimate fetches.
	 * 
	 * [`ChannelUpdate`]: msgs::ChannelUpdate
	 * [`ChannelConfig`]: crate::util::config::ChannelConfig
	 */
	public void timer_tick_occurred() {
		bindings.ChannelManager_timer_tick_occurred(this.ptr);
		Reference.reachabilityFence(this);
	}

	/**
	 * Indicates that the preimage for payment_hash is unknown or the received amount is incorrect
	 * after a PaymentClaimable event, failing the HTLC back to its origin and freeing resources
	 * along the path (including in our own channel on which we received it).
	 * 
	 * Note that in some cases around unclean shutdown, it is possible the payment may have
	 * already been claimed by you via [`ChannelManager::claim_funds`] prior to you seeing (a
	 * second copy of) the [`events::Event::PaymentClaimable`] event. Alternatively, the payment
	 * may have already been failed automatically by LDK if it was nearing its expiration time.
	 * 
	 * While LDK will never claim a payment automatically on your behalf (i.e. without you calling
	 * [`ChannelManager::claim_funds`]), you should still monitor for
	 * [`events::Event::PaymentClaimed`] events even for payments you intend to fail, especially on
	 * startup during which time claims that were in-progress at shutdown may be replayed.
	 */
	public void fail_htlc_backwards(byte[] payment_hash) {
		bindings.ChannelManager_fail_htlc_backwards(this.ptr, InternalUtils.check_arr_len(payment_hash, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_hash);
	}

	/**
	 * This is a variant of [`ChannelManager::fail_htlc_backwards`] that allows you to specify the
	 * reason for the failure.
	 * 
	 * See [`FailureCode`] for valid failure codes.
	 */
	public void fail_htlc_backwards_with_reason(byte[] payment_hash, org.ldk.structs.FailureCode failure_code) {
		bindings.ChannelManager_fail_htlc_backwards_with_reason(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), failure_code.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(failure_code);
		if (this != null) { this.ptrs_to.add(failure_code); };
	}

	/**
	 * Provides a payment preimage in response to [`Event::PaymentClaimable`], generating any
	 * [`MessageSendEvent`]s needed to claim the payment.
	 * 
	 * This method is guaranteed to ensure the payment has been claimed but only if the current
	 * height is strictly below [`Event::PaymentClaimable::claim_deadline`]. To avoid race
	 * conditions, you should wait for an [`Event::PaymentClaimed`] before considering the payment
	 * successful. It will generally be available in the next [`process_pending_events`] call.
	 * 
	 * Note that if you did not set an `amount_msat` when calling [`create_inbound_payment`] or
	 * [`create_inbound_payment_for_hash`] you must check that the amount in the `PaymentClaimable`
	 * event matches your expectation. If you fail to do so and call this method, you may provide
	 * the sender \"proof-of-payment\" when they did not fulfill the full expected payment.
	 * 
	 * This function will fail the payment if it has custom TLVs with even type numbers, as we
	 * will assume they are unknown. If you intend to accept even custom TLVs, you should use
	 * [`claim_funds_with_known_custom_tlvs`].
	 * 
	 * [`Event::PaymentClaimable`]: crate::events::Event::PaymentClaimable
	 * [`Event::PaymentClaimable::claim_deadline`]: crate::events::Event::PaymentClaimable::claim_deadline
	 * [`Event::PaymentClaimed`]: crate::events::Event::PaymentClaimed
	 * [`process_pending_events`]: EventsProvider::process_pending_events
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 * [`claim_funds_with_known_custom_tlvs`]: Self::claim_funds_with_known_custom_tlvs
	 */
	public void claim_funds(byte[] payment_preimage) {
		bindings.ChannelManager_claim_funds(this.ptr, InternalUtils.check_arr_len(payment_preimage, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_preimage);
	}

	/**
	 * This is a variant of [`claim_funds`] that allows accepting a payment with custom TLVs with
	 * even type numbers.
	 * 
	 * # Note
	 * 
	 * You MUST check you've understood all even TLVs before using this to
	 * claim, otherwise you may unintentionally agree to some protocol you do not understand.
	 * 
	 * [`claim_funds`]: Self::claim_funds
	 */
	public void claim_funds_with_known_custom_tlvs(byte[] payment_preimage) {
		bindings.ChannelManager_claim_funds_with_known_custom_tlvs(this.ptr, InternalUtils.check_arr_len(payment_preimage, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_preimage);
	}

	/**
	 * Gets the node_id held by this ChannelManager
	 */
	public byte[] get_our_node_id() {
		byte[] ret = bindings.ChannelManager_get_our_node_id(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Accepts a request to open a channel after a [`Event::OpenChannelRequest`].
	 * 
	 * The `temporary_channel_id` parameter indicates which inbound channel should be accepted,
	 * and the `counterparty_node_id` parameter is the id of the peer which has requested to open
	 * the channel.
	 * 
	 * The `user_channel_id` parameter will be provided back in
	 * [`Event::ChannelClosed::user_channel_id`] to allow tracking of which events correspond
	 * with which `accept_inbound_channel`/`accept_inbound_channel_from_trusted_peer_0conf` call.
	 * 
	 * Note that this method will return an error and reject the channel, if it requires support
	 * for zero confirmations. Instead, `accept_inbound_channel_from_trusted_peer_0conf` must be
	 * used to accept such channels.
	 * 
	 * [`Event::OpenChannelRequest`]: events::Event::OpenChannelRequest
	 * [`Event::ChannelClosed::user_channel_id`]: events::Event::ChannelClosed::user_channel_id
	 */
	public Result_NoneAPIErrorZ accept_inbound_channel(byte[] temporary_channel_id, byte[] counterparty_node_id, org.ldk.util.UInt128 user_channel_id) {
		long ret = bindings.ChannelManager_accept_inbound_channel(this.ptr, InternalUtils.check_arr_len(temporary_channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33), user_channel_id.getLEBytes());
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(temporary_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(user_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Accepts a request to open a channel after a [`events::Event::OpenChannelRequest`], treating
	 * it as confirmed immediately.
	 * 
	 * The `user_channel_id` parameter will be provided back in
	 * [`Event::ChannelClosed::user_channel_id`] to allow tracking of which events correspond
	 * with which `accept_inbound_channel`/`accept_inbound_channel_from_trusted_peer_0conf` call.
	 * 
	 * Unlike [`ChannelManager::accept_inbound_channel`], this method accepts the incoming channel
	 * and (if the counterparty agrees), enables forwarding of payments immediately.
	 * 
	 * This fully trusts that the counterparty has honestly and correctly constructed the funding
	 * transaction and blindly assumes that it will eventually confirm.
	 * 
	 * If it does not confirm before we decide to close the channel, or if the funding transaction
	 * does not pay to the correct script the correct amount, *you will lose funds*.
	 * 
	 * [`Event::OpenChannelRequest`]: events::Event::OpenChannelRequest
	 * [`Event::ChannelClosed::user_channel_id`]: events::Event::ChannelClosed::user_channel_id
	 */
	public Result_NoneAPIErrorZ accept_inbound_channel_from_trusted_peer_0conf(byte[] temporary_channel_id, byte[] counterparty_node_id, org.ldk.util.UInt128 user_channel_id) {
		long ret = bindings.ChannelManager_accept_inbound_channel_from_trusted_peer_0conf(this.ptr, InternalUtils.check_arr_len(temporary_channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33), user_channel_id.getLEBytes());
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(temporary_channel_id);
		Reference.reachabilityFence(counterparty_node_id);
		Reference.reachabilityFence(user_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Pays for an [`Offer`] using the given parameters by creating an [`InvoiceRequest`] and
	 * enqueuing it to be sent via an onion message. [`ChannelManager`] will pay the actual
	 * [`Bolt12Invoice`] once it is received.
	 * 
	 * Uses [`InvoiceRequestBuilder`] such that the [`InvoiceRequest`] it builds is recognized by
	 * the [`ChannelManager`] when handling a [`Bolt12Invoice`] message in response to the request.
	 * The optional parameters are used in the builder, if `Some`:
	 * - `quantity` for [`InvoiceRequest::quantity`] which must be set if
	 * [`Offer::expects_quantity`] is `true`.
	 * - `amount_msats` if overpaying what is required for the given `quantity` is desired, and
	 * - `payer_note` for [`InvoiceRequest::payer_note`].
	 * 
	 * If `max_total_routing_fee_msat` is not specified, The default from
	 * [`RouteParameters::from_payment_params_and_value`] is applied.
	 * 
	 * # Payment
	 * 
	 * The provided `payment_id` is used to ensure that only one invoice is paid for the request
	 * when received. See [Avoiding Duplicate Payments] for other requirements once the payment has
	 * been sent.
	 * 
	 * To revoke the request, use [`ChannelManager::abandon_payment`] prior to receiving the
	 * invoice. If abandoned, or an invoice isn't received in a reasonable amount of time, the
	 * payment will fail with an [`Event::InvoiceRequestFailed`].
	 * 
	 * # Privacy
	 * 
	 * Uses a one-hop [`BlindedPath`] for the reply path with [`ChannelManager::get_our_node_id`]
	 * as the introduction node and a derived payer id for payer privacy. As such, currently, the
	 * node must be announced. Otherwise, there is no way to find a path to the introduction node
	 * in order to send the [`Bolt12Invoice`].
	 * 
	 * # Limitations
	 * 
	 * Requires a direct connection to an introduction node in [`Offer::paths`] or to
	 * [`Offer::signing_pubkey`], if empty. A similar restriction applies to the responding
	 * [`Bolt12Invoice::payment_paths`].
	 * 
	 * # Errors
	 * 
	 * Errors if a duplicate `payment_id` is provided given the caveats in the aforementioned link
	 * or if the provided parameters are invalid for the offer.
	 * 
	 * [`InvoiceRequest`]: crate::offers::invoice_request::InvoiceRequest
	 * [`InvoiceRequest::quantity`]: crate::offers::invoice_request::InvoiceRequest::quantity
	 * [`InvoiceRequest::payer_note`]: crate::offers::invoice_request::InvoiceRequest::payer_note
	 * [`InvoiceRequestBuilder`]: crate::offers::invoice_request::InvoiceRequestBuilder
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 * [`Bolt12Invoice::payment_paths`]: crate::offers::invoice::Bolt12Invoice::payment_paths
	 * [Avoiding Duplicate Payments]: #avoiding-duplicate-payments
	 */
	public Result_NoneBolt12SemanticErrorZ pay_for_offer(org.ldk.structs.Offer offer, org.ldk.structs.Option_u64Z quantity, org.ldk.structs.Option_u64Z amount_msats, org.ldk.structs.Option_StrZ payer_note, byte[] payment_id, org.ldk.structs.Retry retry_strategy, org.ldk.structs.Option_u64Z max_total_routing_fee_msat) {
		long ret = bindings.ChannelManager_pay_for_offer(this.ptr, offer == null ? 0 : offer.ptr, quantity.ptr, amount_msats.ptr, payer_note.ptr, InternalUtils.check_arr_len(payment_id, 32), retry_strategy.ptr, max_total_routing_fee_msat.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(offer);
		Reference.reachabilityFence(quantity);
		Reference.reachabilityFence(amount_msats);
		Reference.reachabilityFence(payer_note);
		Reference.reachabilityFence(payment_id);
		Reference.reachabilityFence(retry_strategy);
		Reference.reachabilityFence(max_total_routing_fee_msat);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt12SemanticErrorZ ret_hu_conv = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(offer); };
		if (this != null) { this.ptrs_to.add(quantity); };
		if (this != null) { this.ptrs_to.add(amount_msats); };
		if (this != null) { this.ptrs_to.add(payer_note); };
		if (this != null) { this.ptrs_to.add(retry_strategy); };
		if (this != null) { this.ptrs_to.add(max_total_routing_fee_msat); };
		return ret_hu_conv;
	}

	/**
	 * Creates a [`Bolt12Invoice`] for a [`Refund`] and enqueues it to be sent via an onion
	 * message.
	 * 
	 * The resulting invoice uses a [`PaymentHash`] recognized by the [`ChannelManager`] and a
	 * [`BlindedPath`] containing the [`PaymentSecret`] needed to reconstruct the corresponding
	 * [`PaymentPreimage`].
	 * 
	 * # Limitations
	 * 
	 * Requires a direct connection to an introduction node in [`Refund::paths`] or to
	 * [`Refund::payer_id`], if empty. This request is best effort; an invoice will be sent to each
	 * node meeting the aforementioned criteria, but there's no guarantee that they will be
	 * received and no retries will be made.
	 * 
	 * [`Bolt12Invoice`]: crate::offers::invoice::Bolt12Invoice
	 */
	public Result_NoneBolt12SemanticErrorZ request_refund_payment(org.ldk.structs.Refund refund) {
		long ret = bindings.ChannelManager_request_refund_payment(this.ptr, refund == null ? 0 : refund.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(refund);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneBolt12SemanticErrorZ ret_hu_conv = Result_NoneBolt12SemanticErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(refund); };
		return ret_hu_conv;
	}

	/**
	 * Gets a payment secret and payment hash for use in an invoice given to a third party wishing
	 * to pay us.
	 * 
	 * This differs from [`create_inbound_payment_for_hash`] only in that it generates the
	 * [`PaymentHash`] and [`PaymentPreimage`] for you.
	 * 
	 * The [`PaymentPreimage`] will ultimately be returned to you in the [`PaymentClaimable`], which
	 * will have the [`PaymentClaimable::purpose`] be [`PaymentPurpose::InvoicePayment`] with
	 * its [`PaymentPurpose::InvoicePayment::payment_preimage`] field filled in. That should then be
	 * passed directly to [`claim_funds`].
	 * 
	 * See [`create_inbound_payment_for_hash`] for detailed documentation on behavior and requirements.
	 * 
	 * Note that a malicious eavesdropper can intuit whether an inbound payment was created by
	 * `create_inbound_payment` or `create_inbound_payment_for_hash` based on runtime.
	 * 
	 * # Note
	 * 
	 * If you register an inbound payment with this method, then serialize the `ChannelManager`, then
	 * deserialize it with a node running 0.0.103 and earlier, the payment will fail to be received.
	 * 
	 * Errors if `min_value_msat` is greater than total bitcoin supply.
	 * 
	 * If `min_final_cltv_expiry_delta` is set to some value, then the payment will not be receivable
	 * on versions of LDK prior to 0.0.114.
	 * 
	 * [`claim_funds`]: Self::claim_funds
	 * [`PaymentClaimable`]: events::Event::PaymentClaimable
	 * [`PaymentClaimable::purpose`]: events::Event::PaymentClaimable::purpose
	 * [`PaymentPurpose::InvoicePayment`]: events::PaymentPurpose::InvoicePayment
	 * [`PaymentPurpose::InvoicePayment::payment_preimage`]: events::PaymentPurpose::InvoicePayment::payment_preimage
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ create_inbound_payment(org.ldk.structs.Option_u64Z min_value_msat, int invoice_expiry_delta_secs, org.ldk.structs.Option_u16Z min_final_cltv_expiry_delta) {
		long ret = bindings.ChannelManager_create_inbound_payment(this.ptr, min_value_msat.ptr, invoice_expiry_delta_secs, min_final_cltv_expiry_delta.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(min_value_msat);
		Reference.reachabilityFence(invoice_expiry_delta_secs);
		Reference.reachabilityFence(min_final_cltv_expiry_delta);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ ret_hu_conv = Result_C2Tuple_ThirtyTwoBytesThirtyTwoBytesZNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(min_value_msat); };
		if (this != null) { this.ptrs_to.add(min_final_cltv_expiry_delta); };
		return ret_hu_conv;
	}

	/**
	 * Gets a [`PaymentSecret`] for a given [`PaymentHash`], for which the payment preimage is
	 * stored external to LDK.
	 * 
	 * A [`PaymentClaimable`] event will only be generated if the [`PaymentSecret`] matches a
	 * payment secret fetched via this method or [`create_inbound_payment`], and which is at least
	 * the `min_value_msat` provided here, if one is provided.
	 * 
	 * The [`PaymentHash`] (and corresponding [`PaymentPreimage`]) should be globally unique, though
	 * note that LDK will not stop you from registering duplicate payment hashes for inbound
	 * payments.
	 * 
	 * `min_value_msat` should be set if the invoice being generated contains a value. Any payment
	 * received for the returned [`PaymentHash`] will be required to be at least `min_value_msat`
	 * before a [`PaymentClaimable`] event will be generated, ensuring that we do not provide the
	 * sender \"proof-of-payment\" unless they have paid the required amount.
	 * 
	 * `invoice_expiry_delta_secs` describes the number of seconds that the invoice is valid for
	 * in excess of the current time. This should roughly match the expiry time set in the invoice.
	 * After this many seconds, we will remove the inbound payment, resulting in any attempts to
	 * pay the invoice failing. The BOLT spec suggests 3,600 secs as a default validity time for
	 * invoices when no timeout is set.
	 * 
	 * Note that we use block header time to time-out pending inbound payments (with some margin
	 * to compensate for the inaccuracy of block header timestamps). Thus, in practice we will
	 * accept a payment and generate a [`PaymentClaimable`] event for some time after the expiry.
	 * If you need exact expiry semantics, you should enforce them upon receipt of
	 * [`PaymentClaimable`].
	 * 
	 * Note that invoices generated for inbound payments should have their `min_final_cltv_expiry_delta`
	 * set to at least [`MIN_FINAL_CLTV_EXPIRY_DELTA`].
	 * 
	 * Note that a malicious eavesdropper can intuit whether an inbound payment was created by
	 * `create_inbound_payment` or `create_inbound_payment_for_hash` based on runtime.
	 * 
	 * # Note
	 * 
	 * If you register an inbound payment with this method, then serialize the `ChannelManager`, then
	 * deserialize it with a node running 0.0.103 and earlier, the payment will fail to be received.
	 * 
	 * Errors if `min_value_msat` is greater than total bitcoin supply.
	 * 
	 * If `min_final_cltv_expiry_delta` is set to some value, then the payment will not be receivable
	 * on versions of LDK prior to 0.0.114.
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 * [`PaymentClaimable`]: events::Event::PaymentClaimable
	 */
	public Result_ThirtyTwoBytesNoneZ create_inbound_payment_for_hash(byte[] payment_hash, org.ldk.structs.Option_u64Z min_value_msat, int invoice_expiry_delta_secs, org.ldk.structs.Option_u16Z min_final_cltv_expiry) {
		long ret = bindings.ChannelManager_create_inbound_payment_for_hash(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), min_value_msat.ptr, invoice_expiry_delta_secs, min_final_cltv_expiry.ptr);
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(min_value_msat);
		Reference.reachabilityFence(invoice_expiry_delta_secs);
		Reference.reachabilityFence(min_final_cltv_expiry);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesNoneZ ret_hu_conv = Result_ThirtyTwoBytesNoneZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.add(min_value_msat); };
		if (this != null) { this.ptrs_to.add(min_final_cltv_expiry); };
		return ret_hu_conv;
	}

	/**
	 * Gets an LDK-generated payment preimage from a payment hash and payment secret that were
	 * previously returned from [`create_inbound_payment`].
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 */
	public Result_ThirtyTwoBytesAPIErrorZ get_payment_preimage(byte[] payment_hash, byte[] payment_secret) {
		long ret = bindings.ChannelManager_get_payment_preimage(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), InternalUtils.check_arr_len(payment_secret, 32));
		Reference.reachabilityFence(this);
		Reference.reachabilityFence(payment_hash);
		Reference.reachabilityFence(payment_secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_ThirtyTwoBytesAPIErrorZ ret_hu_conv = Result_ThirtyTwoBytesAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets a fake short channel id for use in receiving [phantom node payments]. These fake scids
	 * are used when constructing the phantom invoice's route hints.
	 * 
	 * [phantom node payments]: crate::sign::PhantomKeysManager
	 */
	public long get_phantom_scid() {
		long ret = bindings.ChannelManager_get_phantom_scid(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Gets route hints for use in receiving [phantom node payments].
	 * 
	 * [phantom node payments]: crate::sign::PhantomKeysManager
	 */
	public PhantomRouteHints get_phantom_route_hints() {
		long ret = bindings.ChannelManager_get_phantom_route_hints(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PhantomRouteHints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PhantomRouteHints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets a fake short channel id for use in receiving intercepted payments. These fake scids are
	 * used when constructing the route hints for HTLCs intended to be intercepted. See
	 * [`ChannelManager::forward_intercepted_htlc`].
	 * 
	 * Note that this method is not guaranteed to return unique values, you may need to call it a few
	 * times to get a unique scid.
	 */
	public long get_intercept_scid() {
		long ret = bindings.ChannelManager_get_intercept_scid(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Gets inflight HTLC information by processing pending outbound payments that are in
	 * our channels. May be used during pathfinding to account for in-use channel liquidity.
	 */
	public InFlightHtlcs compute_inflight_htlcs() {
		long ret = bindings.ChannelManager_compute_inflight_htlcs(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InFlightHtlcs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InFlightHtlcs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageSendEventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageSendEventsProvider must be freed before this_arg is
	 */
	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		long ret = bindings.ChannelManager_as_MessageSendEventsProvider(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventsProvider must be freed before this_arg is
	 */
	public EventsProvider as_EventsProvider() {
		long ret = bindings.ChannelManager_as_EventsProvider(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EventsProvider ret_hu_conv = new EventsProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public Listen as_Listen() {
		long ret = bindings.ChannelManager_as_Listen(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Listen ret_hu_conv = new Listen(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public Confirm as_Confirm() {
		long ret = bindings.ChannelManager_as_Confirm(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Confirm ret_hu_conv = new Confirm(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets a [`Future`] that completes when this [`ChannelManager`] may need to be persisted or
	 * may have events that need processing.
	 * 
	 * In order to check if this [`ChannelManager`] needs persisting, call
	 * [`Self::get_and_clear_needs_persistence`].
	 * 
	 * Note that callbacks registered on the [`Future`] MUST NOT call back into this
	 * [`ChannelManager`] and should instead register actions to be taken later.
	 */
	public Future get_event_or_persistence_needed_future() {
		long ret = bindings.ChannelManager_get_event_or_persistence_needed_future(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Future ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Future(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Returns true if this [`ChannelManager`] needs to be persisted.
	 */
	public boolean get_and_clear_needs_persistence() {
		boolean ret = bindings.ChannelManager_get_and_clear_needs_persistence(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

	/**
	 * Gets the latest best block which was connected either via the [`chain::Listen`] or
	 * [`chain::Confirm`] interfaces.
	 */
	public BestBlock current_best_block() {
		long ret = bindings.ChannelManager_current_best_block(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`NodeFeatures`] flags that are provided by or required by
	 * [`ChannelManager`].
	 */
	public NodeFeatures node_features() {
		long ret = bindings.ChannelManager_node_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.NodeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.NodeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`ChannelFeatures`] flags that are provided by or required by
	 * [`ChannelManager`].
	 */
	public ChannelFeatures channel_features() {
		long ret = bindings.ChannelManager_channel_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`ChannelTypeFeatures`] flags that are provided by or required by
	 * [`ChannelManager`].
	 */
	public ChannelTypeFeatures channel_type_features() {
		long ret = bindings.ChannelManager_channel_type_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelTypeFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelTypeFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Fetches the set of [`InitFeatures`] flags that are provided by or required by
	 * [`ChannelManager`].
	 */
	public InitFeatures init_features() {
		long ret = bindings.ChannelManager_init_features(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InitFeatures ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InitFeatures(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ChannelMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ChannelMessageHandler must be freed before this_arg is
	 */
	public ChannelMessageHandler as_ChannelMessageHandler() {
		long ret = bindings.ChannelManager_as_ChannelMessageHandler(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelMessageHandler ret_hu_conv = new ChannelMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new OffersMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned OffersMessageHandler must be freed before this_arg is
	 */
	public OffersMessageHandler as_OffersMessageHandler() {
		long ret = bindings.ChannelManager_as_OffersMessageHandler(this.ptr);
		Reference.reachabilityFence(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		OffersMessageHandler ret_hu_conv = new OffersMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.add(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelManager object into a byte array which can be read by ChannelManager_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelManager_write(this.ptr);
		Reference.reachabilityFence(this);
		return ret;
	}

}
