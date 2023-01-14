using org.ldk.impl;
using org.ldk.enums;
using org.ldk.util;
using System;

namespace org { namespace ldk { namespace structs {


/**
 * Manager which keeps track of a number of channels and sends messages to the appropriate
 * channel, also tracking HTLC preimages and forwarding onion packets appropriately.
 * 
 * Implements ChannelMessageHandler, handling the multi-channel parts and passing things through
 * to individual Channels.
 * 
 * Implements Writeable to write out all channel state to disk. Implies peer_disconnected() for
 * all peers during write/read (though does not modify this instance, only the instance being
 * serialized). This will result in any channels which have not yet exchanged funding_created (ie
 * called funding_transaction_generated for outbound channels).
 * 
 * Note that you can be a bit lazier about writing out ChannelManager than you can be with
 * ChannelMonitors. With ChannelMonitors you MUST write each monitor update out to disk before
 * returning from chain::Watch::watch_/update_channel, with ChannelManagers, writing updates
 * happens out-of-band (and will prevent any other ChannelManager operations from occurring during
 * the serialization process). If the deserialized version is out-of-date compared to the
 * ChannelMonitors passed by reference to read(), those channels will be force-closed based on the
 * ChannelMonitor state and no funds will be lost (mod on-chain transaction fees).
 * 
 * Note that the deserializer is only implemented for (BlockHash, ChannelManager), which
 * tells you the last block hash which was block_connect()ed. You MUST rescan any blocks along
 * the \"reorg path\" (ie call block_disconnected() until you get to a common block and then call
 * block_connected() to step towards your best block) upon deserialization before using the
 * object!
 * 
 * Note that ChannelManager is responsible for tracking liveness of its channels and generating
 * ChannelUpdate messages informing peers that the channel is temporarily disabled. To avoid
 * spam due to quick disconnection/reconnection, updates are not sent until the channel has been
 * offline for a full minute. In order to track this, you must call
 * timer_tick_occurred roughly once per minute, though it doesn't have to be perfect.
 * 
 * Rather than using a plain ChannelManager, it is preferable to use either a SimpleArcChannelManager
 * a SimpleRefChannelManager, for conciseness. See their documentation for more details, but
 * essentially you should default to using a SimpleRefChannelManager, and use a
 * SimpleArcChannelManager when you require a ChannelManager with a static lifetime, such as when
 * you're using lightning-net-tokio.
 */
public class ChannelManager : CommonBase {
	internal ChannelManager(object _dummy, long ptr) : base(ptr) { }
	~ChannelManager() {
		if (ptr != 0) { bindings.ChannelManager_free(ptr); }
	}

	/**
	 * Constructs a new ChannelManager to hold several channels and route between them.
	 * 
	 * This is the main \"logic hub\" for all channel-related actions, and implements
	 * ChannelMessageHandler.
	 * 
	 * Non-proportional fees are fixed according to our risk using the provided fee estimator.
	 * 
	 * Users need to notify the new ChannelManager when a new block is connected or
	 * disconnected using its `block_connected` and `block_disconnected` methods, starting
	 * from after `params.latest_hash`.
	 */
	public static ChannelManager of(org.ldk.structs.FeeEstimator fee_est, org.ldk.structs.Watch chain_monitor, org.ldk.structs.BroadcasterInterface tx_broadcaster, org.ldk.structs.Logger logger, org.ldk.structs.KeysInterface keys_manager, org.ldk.structs.UserConfig config, org.ldk.structs.ChainParameters _params) {
		long ret = bindings.ChannelManager_new(fee_est == null ? 0 : fee_est.ptr, chain_monitor == null ? 0 : chain_monitor.ptr, tx_broadcaster == null ? 0 : tx_broadcaster.ptr, logger == null ? 0 : logger.ptr, keys_manager == null ? 0 : keys_manager.ptr, config == null ? 0 : config.ptr, _params == null ? 0 : _params.ptr);
		GC.KeepAlive(fee_est);
		GC.KeepAlive(chain_monitor);
		GC.KeepAlive(tx_broadcaster);
		GC.KeepAlive(logger);
		GC.KeepAlive(keys_manager);
		GC.KeepAlive(config);
		GC.KeepAlive(_params);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.ChannelManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.ChannelManager(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(ret_hu_conv); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(fee_est); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(chain_monitor); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(tx_broadcaster); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(logger); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(keys_manager); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(config); };
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(_params); };
		return ret_hu_conv;
	}

	/**
	 * Gets the current configuration applied to all new channels.
	 */
	public UserConfig get_current_default_configuration() {
		long ret = bindings.ChannelManager_get_current_default_configuration(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.UserConfig(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
	public Result__u832APIErrorZ create_channel(byte[] their_network_key, long channel_value_satoshis, long push_msat, org.ldk.util.UInt128 user_channel_id, org.ldk.structs.UserConfig override_config) {
		long ret = bindings.ChannelManager_create_channel(this.ptr, InternalUtils.check_arr_len(their_network_key, 33), channel_value_satoshis, push_msat, user_channel_id.getLEBytes(), override_config == null ? 0 : override_config.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(their_network_key);
		GC.KeepAlive(channel_value_satoshis);
		GC.KeepAlive(push_msat);
		GC.KeepAlive(user_channel_id);
		GC.KeepAlive(override_config);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(override_config); };
		return ret_hu_conv;
	}

	/**
	 * Gets the list of open channels, in random order. See ChannelDetail field documentation for
	 * more information.
	 */
	public ChannelDetails[] list_channels() {
		long[] ret = bindings.ChannelManager_list_channels(this.ptr);
		GC.KeepAlive(this);
		int ret_conv_16_len = ret.Length;
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret_conv_16_len];
		for (int q = 0; q < ret_conv_16_len; q++) {
			long ret_conv_16 = ret[q];
			org.ldk.structs.ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, ret_conv_16); }
			if (ret_conv_16_hu_conv != null) { ret_conv_16_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * Gets the list of usable channels, in random order. Useful as an argument to [`find_route`]
	 * to ensure non-announced channels are used.
	 * 
	 * These are guaranteed to have their [`ChannelDetails::is_usable`] value set to true, see the
	 * documentation for [`ChannelDetails::is_usable`] for more info on exactly what the criteria
	 * are.
	 * 
	 * [`find_route`]: crate::routing::router::find_route
	 */
	public ChannelDetails[] list_usable_channels() {
		long[] ret = bindings.ChannelManager_list_usable_channels(this.ptr);
		GC.KeepAlive(this);
		int ret_conv_16_len = ret.Length;
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret_conv_16_len];
		for (int q = 0; q < ret_conv_16_len; q++) {
			long ret_conv_16 = ret[q];
			org.ldk.structs.ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new org.ldk.structs.ChannelDetails(null, ret_conv_16); }
			if (ret_conv_16_hu_conv != null) { ret_conv_16_hu_conv.ptrs_to.AddLast(this); };
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * Begins the process of closing a channel. After this call (plus some timeout), no new HTLCs
	 * will be accepted on the given channel, and after additional timeout/the closing of all
	 * pending HTLCs, the channel will be closed on chain.
	 * 
	 * If we are the channel initiator, we will pay between our [`Background`] and
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`] plus our [`Normal`] fee
	 * estimate.
	 * If our counterparty is the channel initiator, we will require a channel closing
	 * transaction feerate of at least our [`Background`] feerate or the feerate which
	 * would appear on a force-closure transaction, whichever is lower. We will allow our
	 * counterparty to pay as much fee as they'd like, however.
	 * 
	 * May generate a SendShutdown message event on success, which should be relayed.
	 * 
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`]: crate::util::config::ChannelConfig::force_close_avoidance_max_fee_satoshis
	 * [`Background`]: crate::chain::chaininterface::ConfirmationTarget::Background
	 * [`Normal`]: crate::chain::chaininterface::ConfirmationTarget::Normal
	 */
	public Result_NoneAPIErrorZ close_channel(byte[] channel_id, byte[] counterparty_node_id) {
		long ret = bindings.ChannelManager_close_channel(this.ptr, InternalUtils.check_arr_len(channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33));
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(counterparty_node_id);
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
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`] plus our [`Normal`] fee
	 * estimate (or `target_feerate_sat_per_1000_weight`, if it is greater).
	 * If our counterparty is the channel initiator, we will refuse to accept a channel closure
	 * transaction feerate below `target_feerate_sat_per_1000_weight` (or the feerate which
	 * will appear on a force-closure transaction, whichever is lower).
	 * 
	 * May generate a SendShutdown message event on success, which should be relayed.
	 * 
	 * [`ChannelConfig::force_close_avoidance_max_fee_satoshis`]: crate::util::config::ChannelConfig::force_close_avoidance_max_fee_satoshis
	 * [`Background`]: crate::chain::chaininterface::ConfirmationTarget::Background
	 * [`Normal`]: crate::chain::chaininterface::ConfirmationTarget::Normal
	 */
	public Result_NoneAPIErrorZ close_channel_with_target_feerate(byte[] channel_id, byte[] counterparty_node_id, int target_feerate_sats_per_1000_weight) {
		long ret = bindings.ChannelManager_close_channel_with_target_feerate(this.ptr, InternalUtils.check_arr_len(channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33), target_feerate_sats_per_1000_weight);
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(counterparty_node_id);
		GC.KeepAlive(target_feerate_sats_per_1000_weight);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
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
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(counterparty_node_id);
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
		GC.KeepAlive(this);
		GC.KeepAlive(channel_id);
		GC.KeepAlive(counterparty_node_id);
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
		GC.KeepAlive(this);
	}

	/**
	 * Force close all channels rejecting new HTLCs on each but without broadcasting the latest
	 * local transaction(s).
	 */
	public void force_close_all_channels_without_broadcasting_txn() {
		bindings.ChannelManager_force_close_all_channels_without_broadcasting_txn(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Sends a payment along a given route.
	 * 
	 * Value parameters are provided via the last hop in route, see documentation for RouteHop
	 * fields for more info.
	 * 
	 * If a pending payment is currently in-flight with the same [`PaymentId`] provided, this
	 * method will error with an [`APIError::InvalidRoute`]. Note, however, that once a payment
	 * is no longer pending (either via [`ChannelManager::abandon_payment`], or handling of an
	 * [`Event::PaymentSent`]) LDK will not stop you from sending a second payment with the same
	 * [`PaymentId`].
	 * 
	 * Thus, in order to ensure duplicate payments are not sent, you should implement your own
	 * tracking of payments, including state to indicate once a payment has completed. Because you
	 * should also ensure that [`PaymentHash`]es are not re-used, for simplicity, you should
	 * consider using the [`PaymentHash`] as the key for tracking payments. In that case, the
	 * [`PaymentId`] should be a copy of the [`PaymentHash`] bytes.
	 * 
	 * May generate SendHTLCs message(s) event on success, which should be relayed (e.g. via
	 * [`PeerManager::process_events`]).
	 * 
	 * Each path may have a different return value, and PaymentSendValue may return a Vec with
	 * each entry matching the corresponding-index entry in the route paths, see
	 * PaymentSendFailure for more info.
	 * 
	 * In general, a path may raise:
	 * [`APIError::InvalidRoute`] when an invalid route or forwarding parameter (cltv_delta, fee,
	 * node public key) is specified.
	 * [`APIError::ChannelUnavailable`] if the next-hop channel is not available for updates
	 * (including due to previous monitor update failure or new permanent monitor update
	 * failure).
	 * [`APIError::MonitorUpdateInProgress`] if a new monitor update failure prevented sending the
	 * relevant updates.
	 * 
	 * Note that depending on the type of the PaymentSendFailure the HTLC may have been
	 * irrevocably committed to on our end. In such a case, do NOT retry the payment with a
	 * different route unless you intend to pay twice!
	 * 
	 * payment_secret is unrelated to payment_hash (or PaymentPreimage) and exists to authenticate
	 * the sender to the recipient and prevent payment-probing (deanonymization) attacks. For
	 * newer nodes, it will be provided to you in the invoice. If you do not have one, the Route
	 * must not contain multiple paths as multi-path payments require a recipient-provided
	 * payment_secret.
	 * 
	 * If a payment_secret *is* provided, we assume that the invoice had the payment_secret feature
	 * bit set (either as required or as available). If multiple paths are present in the Route,
	 * we assume the invoice had the basic_mpp feature set.
	 * 
	 * [`Event::PaymentSent`]: events::Event::PaymentSent
	 * [`PeerManager::process_events`]: crate::ln::peer_handler::PeerManager::process_events
	 * 
	 * Note that payment_secret (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_NonePaymentSendFailureZ send_payment(org.ldk.structs.Route route, byte[] payment_hash, byte[] payment_secret, byte[] payment_id) {
		long ret = bindings.ChannelManager_send_payment(this.ptr, route == null ? 0 : route.ptr, InternalUtils.check_arr_len(payment_hash, 32), InternalUtils.check_arr_len(payment_secret, 32), InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(route);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(payment_secret);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(route); };
		return ret_hu_conv;
	}

	/**
	 * Retries a payment along the given [`Route`].
	 * 
	 * Errors returned are a superset of those returned from [`send_payment`], so see
	 * [`send_payment`] documentation for more details on errors. This method will also error if the
	 * retry amount puts the payment more than 10% over the payment's total amount, if the payment
	 * for the given `payment_id` cannot be found (likely due to timeout or success), or if
	 * further retries have been disabled with [`abandon_payment`].
	 * 
	 * [`send_payment`]: [`ChannelManager::send_payment`]
	 * [`abandon_payment`]: [`ChannelManager::abandon_payment`]
	 */
	public Result_NonePaymentSendFailureZ retry_payment(org.ldk.structs.Route route, byte[] payment_id) {
		long ret = bindings.ChannelManager_retry_payment(this.ptr, route == null ? 0 : route.ptr, InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(route);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(route); };
		return ret_hu_conv;
	}

	/**
	 * Signals that no further retries for the given payment will occur.
	 * 
	 * After this method returns, no future calls to [`retry_payment`] for the given `payment_id`
	 * are allowed. If no [`Event::PaymentFailed`] event had been generated before, one will be
	 * generated as soon as there are no remaining pending HTLCs for this payment.
	 * 
	 * Note that calling this method does *not* prevent a payment from succeeding. You must still
	 * wait until you receive either a [`Event::PaymentFailed`] or [`Event::PaymentSent`] event to
	 * determine the ultimate status of a payment.
	 * 
	 * If an [`Event::PaymentFailed`] event is generated and we restart without this
	 * [`ChannelManager`] having been persisted, the payment may still be in the pending state
	 * upon restart. This allows further calls to [`retry_payment`] (and requiring a second call
	 * to [`abandon_payment`] to mark the payment as failed again). Otherwise, future calls to
	 * [`retry_payment`] will fail with [`PaymentSendFailure::ParameterError`].
	 * 
	 * [`abandon_payment`]: Self::abandon_payment
	 * [`retry_payment`]: Self::retry_payment
	 * [`Event::PaymentFailed`]: events::Event::PaymentFailed
	 * [`Event::PaymentSent`]: events::Event::PaymentSent
	 */
	public void abandon_payment(byte[] payment_id) {
		bindings.ChannelManager_abandon_payment(this.ptr, InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(payment_id);
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
	 * Note that `route` must have exactly one path.
	 * 
	 * [`send_payment`]: Self::send_payment
	 * 
	 * Note that payment_preimage (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_PaymentHashPaymentSendFailureZ send_spontaneous_payment(org.ldk.structs.Route route, byte[] payment_preimage, byte[] payment_id) {
		long ret = bindings.ChannelManager_send_spontaneous_payment(this.ptr, route == null ? 0 : route.ptr, InternalUtils.check_arr_len(payment_preimage, 32), InternalUtils.check_arr_len(payment_id, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(route);
		GC.KeepAlive(payment_preimage);
		GC.KeepAlive(payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentHashPaymentSendFailureZ ret_hu_conv = Result_PaymentHashPaymentSendFailureZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(route); };
		return ret_hu_conv;
	}

	/**
	 * Send a payment that is probing the given route for liquidity. We calculate the
	 * [`PaymentHash`] of probes based on a static secret and a random [`PaymentId`], which allows
	 * us to easily discern them from real payments.
	 */
	public Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ send_probe(RouteHop[] hops) {
		long ret = bindings.ChannelManager_send_probe(this.ptr, hops != null ? InternalUtils.mapArray(hops, hops_conv_10 => hops_conv_10 == null ? 0 : hops_conv_10.ptr) : null);
		GC.KeepAlive(this);
		GC.KeepAlive(hops);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		foreach (RouteHop hops_conv_10 in hops) { if (this != null) { this.ptrs_to.AddLast(hops_conv_10); }; };
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
	 * [`Event::FundingGenerationReady`]: crate::util::events::Event::FundingGenerationReady
	 * [`Event::ChannelClosed`]: crate::util::events::Event::ChannelClosed
	 */
	public Result_NoneAPIErrorZ funding_transaction_generated(byte[] temporary_channel_id, byte[] counterparty_node_id, byte[] funding_transaction) {
		long ret = bindings.ChannelManager_funding_transaction_generated(this.ptr, InternalUtils.check_arr_len(temporary_channel_id, 32), InternalUtils.check_arr_len(counterparty_node_id, 33), funding_transaction);
		GC.KeepAlive(this);
		GC.KeepAlive(temporary_channel_id);
		GC.KeepAlive(counterparty_node_id);
		GC.KeepAlive(funding_transaction);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
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
		long ret = bindings.ChannelManager_update_channel_config(this.ptr, InternalUtils.check_arr_len(counterparty_node_id, 33), channel_ids != null ? InternalUtils.mapArray(channel_ids, channel_ids_conv_8 => InternalUtils.check_arr_len(channel_ids_conv_8, 32)) : null, config == null ? 0 : config.ptr);
		GC.KeepAlive(this);
		GC.KeepAlive(counterparty_node_id);
		GC.KeepAlive(channel_ids);
		GC.KeepAlive(config);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		if (this != null) { this.ptrs_to.AddLast(config); };
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
	 * you from forwarding more than you received.
	 * 
	 * Errors if the event was not handled in time, in which case the HTLC was automatically failed
	 * backwards.
	 * 
	 * [`UserConfig::accept_intercept_htlcs`]: crate::util::config::UserConfig::accept_intercept_htlcs
	 * [`HTLCIntercepted`]: events::Event::HTLCIntercepted
	 */
	public Result_NoneAPIErrorZ forward_intercepted_htlc(byte[] intercept_id, byte[] next_hop_channel_id, byte[] _next_node_id, long amt_to_forward_msat) {
		long ret = bindings.ChannelManager_forward_intercepted_htlc(this.ptr, InternalUtils.check_arr_len(intercept_id, 32), InternalUtils.check_arr_len(next_hop_channel_id, 32), InternalUtils.check_arr_len(_next_node_id, 33), amt_to_forward_msat);
		GC.KeepAlive(this);
		GC.KeepAlive(intercept_id);
		GC.KeepAlive(next_hop_channel_id);
		GC.KeepAlive(_next_node_id);
		GC.KeepAlive(amt_to_forward_msat);
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
		GC.KeepAlive(this);
		GC.KeepAlive(intercept_id);
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
		GC.KeepAlive(this);
	}

	/**
	 * Performs actions which should happen on startup and roughly once per minute thereafter.
	 * 
	 * This currently includes:
	 * Increasing or decreasing the on-chain feerate estimates for our outbound channels,
	 * Broadcasting `ChannelUpdate` messages if we've been disconnected from our peer for more
	 * than a minute, informing the network that they should no longer attempt to route over
	 * the channel.
	 * Expiring a channel's previous `ChannelConfig` if necessary to only allow forwarding HTLCs
	 * with the current `ChannelConfig`.
	 * 
	 * Note that this may cause reentrancy through `chain::Watch::update_channel` calls or feerate
	 * estimate fetches.
	 */
	public void timer_tick_occurred() {
		bindings.ChannelManager_timer_tick_occurred(this.ptr);
		GC.KeepAlive(this);
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
		GC.KeepAlive(this);
		GC.KeepAlive(payment_hash);
	}

	/**
	 * Provides a payment preimage in response to [`Event::PaymentClaimable`], generating any
	 * [`MessageSendEvent`]s needed to claim the payment.
	 * 
	 * Note that calling this method does *not* guarantee that the payment has been claimed. You
	 * must* wait for an [`Event::PaymentClaimed`] event which upon a successful claim will be
	 * provided to your [`EventHandler`] when [`process_pending_events`] is next called.
	 * 
	 * Note that if you did not set an `amount_msat` when calling [`create_inbound_payment`] or
	 * [`create_inbound_payment_for_hash`] you must check that the amount in the `PaymentClaimable`
	 * event matches your expectation. If you fail to do so and call this method, you may provide
	 * the sender \"proof-of-payment\" when they did not fulfill the full expected payment.
	 * 
	 * [`Event::PaymentClaimable`]: crate::util::events::Event::PaymentClaimable
	 * [`Event::PaymentClaimed`]: crate::util::events::Event::PaymentClaimed
	 * [`process_pending_events`]: EventsProvider::process_pending_events
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public void claim_funds(byte[] payment_preimage) {
		bindings.ChannelManager_claim_funds(this.ptr, InternalUtils.check_arr_len(payment_preimage, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(payment_preimage);
	}

	/**
	 * Gets the node_id held by this ChannelManager
	 */
	public byte[] get_our_node_id() {
		byte[] ret = bindings.ChannelManager_get_our_node_id(this.ptr);
		GC.KeepAlive(this);
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
		GC.KeepAlive(this);
		GC.KeepAlive(temporary_channel_id);
		GC.KeepAlive(counterparty_node_id);
		GC.KeepAlive(user_channel_id);
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
		GC.KeepAlive(this);
		GC.KeepAlive(temporary_channel_id);
		GC.KeepAlive(counterparty_node_id);
		GC.KeepAlive(user_channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
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
	 * will have the [`PaymentClaimable::payment_preimage`] field filled in. That should then be
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
	 * [`claim_funds`]: Self::claim_funds
	 * [`PaymentClaimable`]: events::Event::PaymentClaimable
	 * [`PaymentClaimable::payment_preimage`]: events::Event::PaymentClaimable::payment_preimage
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public Result_C2Tuple_PaymentHashPaymentSecretZNoneZ create_inbound_payment(org.ldk.structs.Option_u64Z min_value_msat, int invoice_expiry_delta_secs) {
		long ret = bindings.ChannelManager_create_inbound_payment(this.ptr, min_value_msat.ptr, invoice_expiry_delta_secs);
		GC.KeepAlive(this);
		GC.KeepAlive(min_value_msat);
		GC.KeepAlive(invoice_expiry_delta_secs);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZNoneZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Legacy version of [`create_inbound_payment`]. Use this method if you wish to share
	 * serialized state with LDK node(s) running 0.0.103 and earlier.
	 * 
	 * May panic if `invoice_expiry_delta_secs` is greater than one year.
	 * 
	 * # Note
	 * This method is deprecated and will be removed soon.
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 */
	public Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ create_inbound_payment_legacy(org.ldk.structs.Option_u64Z min_value_msat, int invoice_expiry_delta_secs) {
		long ret = bindings.ChannelManager_create_inbound_payment_legacy(this.ptr, min_value_msat.ptr, invoice_expiry_delta_secs);
		GC.KeepAlive(this);
		GC.KeepAlive(min_value_msat);
		GC.KeepAlive(invoice_expiry_delta_secs);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentSecretZAPIErrorZ.constr_from_ptr(ret);
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
	 * Note that invoices generated for inbound payments should have their `min_final_cltv_expiry`
	 * set to at least [`MIN_FINAL_CLTV_EXPIRY`].
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
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 * [`PaymentClaimable`]: events::Event::PaymentClaimable
	 */
	public Result_PaymentSecretNoneZ create_inbound_payment_for_hash(byte[] payment_hash, org.ldk.structs.Option_u64Z min_value_msat, int invoice_expiry_delta_secs) {
		long ret = bindings.ChannelManager_create_inbound_payment_for_hash(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), min_value_msat.ptr, invoice_expiry_delta_secs);
		GC.KeepAlive(this);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(min_value_msat);
		GC.KeepAlive(invoice_expiry_delta_secs);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretNoneZ ret_hu_conv = Result_PaymentSecretNoneZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Legacy version of [`create_inbound_payment_for_hash`]. Use this method if you wish to share
	 * serialized state with LDK node(s) running 0.0.103 and earlier.
	 * 
	 * May panic if `invoice_expiry_delta_secs` is greater than one year.
	 * 
	 * # Note
	 * This method is deprecated and will be removed soon.
	 * 
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public Result_PaymentSecretAPIErrorZ create_inbound_payment_for_hash_legacy(byte[] payment_hash, org.ldk.structs.Option_u64Z min_value_msat, int invoice_expiry_delta_secs) {
		long ret = bindings.ChannelManager_create_inbound_payment_for_hash_legacy(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), min_value_msat.ptr, invoice_expiry_delta_secs);
		GC.KeepAlive(this);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(min_value_msat);
		GC.KeepAlive(invoice_expiry_delta_secs);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets an LDK-generated payment preimage from a payment hash and payment secret that were
	 * previously returned from [`create_inbound_payment`].
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 */
	public Result_PaymentPreimageAPIErrorZ get_payment_preimage(byte[] payment_hash, byte[] payment_secret) {
		long ret = bindings.ChannelManager_get_payment_preimage(this.ptr, InternalUtils.check_arr_len(payment_hash, 32), InternalUtils.check_arr_len(payment_secret, 32));
		GC.KeepAlive(this);
		GC.KeepAlive(payment_hash);
		GC.KeepAlive(payment_secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentPreimageAPIErrorZ ret_hu_conv = Result_PaymentPreimageAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets a fake short channel id for use in receiving [phantom node payments]. These fake scids
	 * are used when constructing the phantom invoice's route hints.
	 * 
	 * [phantom node payments]: crate::chain::keysinterface::PhantomKeysManager
	 */
	public long get_phantom_scid() {
		long ret = bindings.ChannelManager_get_phantom_scid(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Gets route hints for use in receiving [phantom node payments].
	 * 
	 * [phantom node payments]: crate::chain::keysinterface::PhantomKeysManager
	 */
	public PhantomRouteHints get_phantom_route_hints() {
		long ret = bindings.ChannelManager_get_phantom_route_hints(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.PhantomRouteHints ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.PhantomRouteHints(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
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
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Gets inflight HTLC information by processing pending outbound payments that are in
	 * our channels. May be used during pathfinding to account for in-use channel liquidity.
	 */
	public InFlightHtlcs compute_inflight_htlcs() {
		long ret = bindings.ChannelManager_compute_inflight_htlcs(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.InFlightHtlcs ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.InFlightHtlcs(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageSendEventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageSendEventsProvider must be freed before this_arg is
	 */
	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		long ret = bindings.ChannelManager_as_MessageSendEventsProvider(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventsProvider must be freed before this_arg is
	 */
	public EventsProvider as_EventsProvider() {
		long ret = bindings.ChannelManager_as_EventsProvider(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		EventsProvider ret_hu_conv = new EventsProvider(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public Listen as_Listen() {
		long ret = bindings.ChannelManager_as_Listen(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Listen ret_hu_conv = new Listen(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public Confirm as_Confirm() {
		long ret = bindings.ChannelManager_as_Confirm(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Confirm ret_hu_conv = new Confirm(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Blocks until ChannelManager needs to be persisted or a timeout is reached. It returns a bool
	 * indicating whether persistence is necessary. Only one listener on
	 * [`await_persistable_update`], [`await_persistable_update_timeout`], or a future returned by
	 * [`get_persistable_update_future`] is guaranteed to be woken up.
	 * 
	 * Note that this method is not available with the `no-std` feature.
	 * 
	 * [`await_persistable_update`]: Self::await_persistable_update
	 * [`await_persistable_update_timeout`]: Self::await_persistable_update_timeout
	 * [`get_persistable_update_future`]: Self::get_persistable_update_future
	 */
	public bool await_persistable_update_timeout(long max_wait) {
		bool ret = bindings.ChannelManager_await_persistable_update_timeout(this.ptr, max_wait);
		GC.KeepAlive(this);
		GC.KeepAlive(max_wait);
		return ret;
	}

	/**
	 * Blocks until ChannelManager needs to be persisted. Only one listener on
	 * [`await_persistable_update`], `await_persistable_update_timeout`, or a future returned by
	 * [`get_persistable_update_future`] is guaranteed to be woken up.
	 * 
	 * [`await_persistable_update`]: Self::await_persistable_update
	 * [`get_persistable_update_future`]: Self::get_persistable_update_future
	 */
	public void await_persistable_update() {
		bindings.ChannelManager_await_persistable_update(this.ptr);
		GC.KeepAlive(this);
	}

	/**
	 * Gets a [`Future`] that completes when a persistable update is available. Note that
	 * callbacks registered on the [`Future`] MUST NOT call back into this [`ChannelManager`] and
	 * should instead register actions to be taken later.
	 */
	public Future get_persistable_update_future() {
		long ret = bindings.ChannelManager_get_persistable_update_future(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.Future ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.Future(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Gets the latest best block which was connected either via the [`chain::Listen`] or
	 * [`chain::Confirm`] interfaces.
	 */
	public BestBlock current_best_block() {
		long ret = bindings.ChannelManager_current_best_block(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		org.ldk.structs.BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new org.ldk.structs.BestBlock(null, ret); }
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ChannelMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ChannelMessageHandler must be freed before this_arg is
	 */
	public ChannelMessageHandler as_ChannelMessageHandler() {
		long ret = bindings.ChannelManager_as_ChannelMessageHandler(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelMessageHandler ret_hu_conv = new ChannelMessageHandler(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelManager object into a byte array which can be read by ChannelManager_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelManager_write(this.ptr);
		GC.KeepAlive(this);
		return ret;
	}

	/**
	 * Constructs a new Payer which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Payer must be freed before this_arg is
	 */
	public Payer as_Payer() {
		long ret = bindings.ChannelManager_as_Payer(this.ptr);
		GC.KeepAlive(this);
		if (ret >= 0 && ret <= 4096) { return null; }
		Payer ret_hu_conv = new Payer(null, ret);
		if (ret_hu_conv != null) { ret_hu_conv.ptrs_to.AddLast(this); };
		return ret_hu_conv;
	}

}
} } }
