package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;
import org.ldk.util.*;
import java.util.Arrays;
import javax.annotation.Nullable;


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
@SuppressWarnings("unchecked") // We correctly assign various generic arrays
public class ChannelManager extends CommonBase {
	ChannelManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		super.finalize();
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
	 * panics if channel_value_satoshis is >= `MAX_FUNDING_SATOSHIS`!
	 * 
	 * Users need to notify the new ChannelManager when a new block is connected or
	 * disconnected using its `block_connected` and `block_disconnected` methods, starting
	 * from after `params.latest_hash`.
	 */
	public static ChannelManager of(FeeEstimator fee_est, Watch chain_monitor, BroadcasterInterface tx_broadcaster, Logger logger, KeysInterface keys_manager, UserConfig config, ChainParameters params) {
		long ret = bindings.ChannelManager_new(fee_est == null ? 0 : fee_est.ptr, chain_monitor == null ? 0 : chain_monitor.ptr, tx_broadcaster == null ? 0 : tx_broadcaster.ptr, logger == null ? 0 : logger.ptr, keys_manager == null ? 0 : keys_manager.ptr, config == null ? 0 : config.ptr & ~1, params == null ? 0 : params.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelManager ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new ChannelManager(null, ret); }
		ret_hu_conv.ptrs_to.add(ret_hu_conv);
		ret_hu_conv.ptrs_to.add(fee_est);
		ret_hu_conv.ptrs_to.add(chain_monitor);
		ret_hu_conv.ptrs_to.add(tx_broadcaster);
		ret_hu_conv.ptrs_to.add(logger);
		ret_hu_conv.ptrs_to.add(keys_manager);
		return ret_hu_conv;
	}

	/**
	 * Gets the current configuration applied to all new channels,  as
	 */
	public UserConfig get_current_default_configuration() {
		long ret = bindings.ChannelManager_get_current_default_configuration(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		UserConfig ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new UserConfig(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Creates a new outbound channel to the given remote node and with the given value.
	 * 
	 * `user_channel_id` will be provided back as in
	 * [`Event::FundingGenerationReady::user_channel_id`] to allow tracking of which events
	 * correspond with which `create_channel` call. Note that the `user_channel_id` defaults to 0
	 * for inbound channels, so you may wish to avoid using 0 for `user_channel_id` here.
	 * `user_channel_id` has no meaning inside of LDK, it is simply copied to events and otherwise
	 * ignored.
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
	public Result__u832APIErrorZ create_channel(byte[] their_network_key, long channel_value_satoshis, long push_msat, long user_channel_id, @Nullable UserConfig override_config) {
		long ret = bindings.ChannelManager_create_channel(this.ptr, their_network_key, channel_value_satoshis, push_msat, user_channel_id, override_config == null ? 0 : override_config.ptr & ~1);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result__u832APIErrorZ ret_hu_conv = Result__u832APIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Gets the list of open channels, in random order. See ChannelDetail field documentation for
	 * more information.
	 */
	public ChannelDetails[] list_channels() {
		long[] ret = bindings.ChannelManager_list_channels(this.ptr);
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret.length];
		for (int q = 0; q < ret.length; q++) {
			long ret_conv_16 = ret[q];
			ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new ChannelDetails(null, ret_conv_16); }
			ret_conv_16_hu_conv.ptrs_to.add(this);
			ret_conv_16_arr[q] = ret_conv_16_hu_conv;
		}
		return ret_conv_16_arr;
	}

	/**
	 * Gets the list of usable channels, in random order. Useful as an argument to
	 * get_route to ensure non-announced channels are used.
	 * 
	 * These are guaranteed to have their [`ChannelDetails::is_usable`] value set to true, see the
	 * documentation for [`ChannelDetails::is_usable`] for more info on exactly what the criteria
	 * are.
	 */
	public ChannelDetails[] list_usable_channels() {
		long[] ret = bindings.ChannelManager_list_usable_channels(this.ptr);
		ChannelDetails[] ret_conv_16_arr = new ChannelDetails[ret.length];
		for (int q = 0; q < ret.length; q++) {
			long ret_conv_16 = ret[q];
			ChannelDetails ret_conv_16_hu_conv = null; if (ret_conv_16 < 0 || ret_conv_16 > 4096) { ret_conv_16_hu_conv = new ChannelDetails(null, ret_conv_16); }
			ret_conv_16_hu_conv.ptrs_to.add(this);
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
	public Result_NoneAPIErrorZ close_channel(byte[] channel_id) {
		long ret = bindings.ChannelManager_close_channel(this.ptr, channel_id);
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
	public Result_NoneAPIErrorZ close_channel_with_target_feerate(byte[] channel_id, int target_feerate_sats_per_1000_weight) {
		long ret = bindings.ChannelManager_close_channel_with_target_feerate(this.ptr, channel_id, target_feerate_sats_per_1000_weight);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Force closes a channel, immediately broadcasting the latest local commitment transaction to
	 * the chain and rejecting new HTLCs on the given channel. Fails if channel_id is unknown to the manager.
	 */
	public Result_NoneAPIErrorZ force_close_channel(byte[] channel_id) {
		long ret = bindings.ChannelManager_force_close_channel(this.ptr, channel_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Force close all channels, immediately broadcasting the latest local commitment transaction
	 * for each to the chain and rejecting new HTLCs on each.
	 */
	public void force_close_all_channels() {
		bindings.ChannelManager_force_close_all_channels(this.ptr);
	}

	/**
	 * Sends a payment along a given route.
	 * 
	 * Value parameters are provided via the last hop in route, see documentation for RouteHop
	 * fields for more info.
	 * 
	 * Note that if the payment_hash already exists elsewhere (eg you're sending a duplicative
	 * payment), we don't do anything to stop you! We always try to ensure that if the provided
	 * next hop knows the preimage to payment_hash they can claim an additional amount as
	 * specified in the last hop in the route! Thus, you should probably do your own
	 * payment_preimage tracking (which you should already be doing as they represent \"proof of
	 * payment\") and prevent double-sends yourself.
	 * 
	 * May generate SendHTLCs message(s) event on success, which should be relayed.
	 * 
	 * Each path may have a different return value, and PaymentSendValue may return a Vec with
	 * each entry matching the corresponding-index entry in the route paths, see
	 * PaymentSendFailure for more info.
	 * 
	 * In general, a path may raise:
	 * APIError::RouteError when an invalid route or forwarding parameter (cltv_delta, fee,
	 * node public key) is specified.
	 * APIError::ChannelUnavailable if the next-hop channel is not available for updates
	 * (including due to previous monitor update failure or new permanent monitor update
	 * failure).
	 * APIError::MonitorUpdateFailed if a new monitor update failure prevented sending the
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
	 * If a payment_secret *is* provided, we assume that the invoice had the payment_secret feature
	 * bit set (either as required or as available). If multiple paths are present in the Route,
	 * we assume the invoice had the basic_mpp feature set.
	 * 
	 * Note that payment_secret (or a relevant inner pointer) may be NULL or all-0s to represent None
	 */
	public Result_PaymentIdPaymentSendFailureZ send_payment(Route route, byte[] payment_hash, @Nullable byte[] payment_secret) {
		long ret = bindings.ChannelManager_send_payment(this.ptr, route == null ? 0 : route.ptr & ~1, payment_hash, payment_secret);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentIdPaymentSendFailureZ ret_hu_conv = Result_PaymentIdPaymentSendFailureZ.constr_from_ptr(ret);
		this.ptrs_to.add(route);
		return ret_hu_conv;
	}

	/**
	 * Retries a payment along the given [`Route`].
	 * 
	 * Errors returned are a superset of those returned from [`send_payment`], so see
	 * [`send_payment`] documentation for more details on errors. This method will also error if the
	 * retry amount puts the payment more than 10% over the payment's total amount, or if the payment
	 * for the given `payment_id` cannot be found (likely due to timeout or success).
	 * 
	 * [`send_payment`]: [`ChannelManager::send_payment`]
	 */
	public Result_NonePaymentSendFailureZ retry_payment(Route route, byte[] payment_id) {
		long ret = bindings.ChannelManager_retry_payment(this.ptr, route == null ? 0 : route.ptr & ~1, payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NonePaymentSendFailureZ ret_hu_conv = Result_NonePaymentSendFailureZ.constr_from_ptr(ret);
		this.ptrs_to.add(route);
		return ret_hu_conv;
	}

	/**
	 * Send a spontaneous payment, which is a payment that does not require the recipient to have
	 * generated an invoice. Optionally, you may specify the preimage. If you do choose to specify
	 * the preimage, it must be a cryptographically secure random value that no intermediate node
	 * would be able to guess -- otherwise, an intermediate node may claim the payment and it will
	 * never reach the recipient.
	 * 
	 * See [`send_payment`] documentation for more details on the return value of this function.
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
	public Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ send_spontaneous_payment(Route route, @Nullable byte[] payment_preimage) {
		long ret = bindings.ChannelManager_send_spontaneous_payment(this.ptr, route == null ? 0 : route.ptr & ~1, payment_preimage);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ ret_hu_conv = Result_C2Tuple_PaymentHashPaymentIdZPaymentSendFailureZ.constr_from_ptr(ret);
		this.ptrs_to.add(route);
		return ret_hu_conv;
	}

	/**
	 * Call this upon creation of a funding transaction for the given channel.
	 * 
	 * Returns an [`APIError::APIMisuseError`] if the funding_transaction spent non-SegWit outputs
	 * or if no output was found which matches the parameters in [`Event::FundingGenerationReady`].
	 * 
	 * Panics if a funding transaction has already been provided for this channel.
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
	 * [`Event::FundingGenerationReady`]: crate::util::events::Event::FundingGenerationReady
	 */
	public Result_NoneAPIErrorZ funding_transaction_generated(byte[] temporary_channel_id, byte[] funding_transaction) {
		long ret = bindings.ChannelManager_funding_transaction_generated(this.ptr, temporary_channel_id, funding_transaction);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_NoneAPIErrorZ ret_hu_conv = Result_NoneAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Regenerates channel_announcements and generates a signed node_announcement from the given
	 * arguments, providing them in corresponding events via
	 * [`get_and_clear_pending_msg_events`], if at least one public channel has been confirmed
	 * on-chain. This effectively re-broadcasts all channel announcements and sends our node
	 * announcement to ensure that the lightning P2P network is aware of the channels we have and
	 * our network addresses.
	 * 
	 * `rgb` is a node \"color\" and `alias` is a printable human-readable string to describe this
	 * node to humans. They carry no in-protocol meaning.
	 * 
	 * `addresses` represent the set (possibly empty) of socket addresses on which this node
	 * accepts incoming connections. These will be included in the node_announcement, publicly
	 * tying these addresses together and to this node. If you wish to preserve user privacy,
	 * addresses should likely contain only Tor Onion addresses.
	 * 
	 * Panics if `addresses` is absurdly large (more than 500).
	 * 
	 * [`get_and_clear_pending_msg_events`]: MessageSendEventsProvider::get_and_clear_pending_msg_events
	 */
	public void broadcast_node_announcement(byte[] rgb, byte[] alias, NetAddress[] addresses) {
		bindings.ChannelManager_broadcast_node_announcement(this.ptr, rgb, alias, addresses != null ? Arrays.stream(addresses).mapToLong(addresses_conv_12 -> addresses_conv_12.ptr).toArray() : null);
	}

	/**
	 * Processes HTLCs which are pending waiting on random forward delay.
	 * 
	 * Should only really ever be called in response to a PendingHTLCsForwardable event.
	 * Will likely generate further events.
	 */
	public void process_pending_htlc_forwards() {
		bindings.ChannelManager_process_pending_htlc_forwards(this.ptr);
	}

	/**
	 * Performs actions which should happen on startup and roughly once per minute thereafter.
	 * 
	 * This currently includes:
	 * Increasing or decreasing the on-chain feerate estimates for our outbound channels,
	 * Broadcasting `ChannelUpdate` messages if we've been disconnected from our peer for more
	 * than a minute, informing the network that they should no longer attempt to route over
	 * the channel.
	 * 
	 * Note that this may cause reentrancy through `chain::Watch::update_channel` calls or feerate
	 * estimate fetches.
	 */
	public void timer_tick_occurred() {
		bindings.ChannelManager_timer_tick_occurred(this.ptr);
	}

	/**
	 * Indicates that the preimage for payment_hash is unknown or the received amount is incorrect
	 * after a PaymentReceived event, failing the HTLC back to its origin and freeing resources
	 * along the path (including in our own channel on which we received it).
	 * Returns false if no payment was found to fail backwards, true if the process of failing the
	 * HTLC backwards has been started.
	 */
	public boolean fail_htlc_backwards(byte[] payment_hash) {
		boolean ret = bindings.ChannelManager_fail_htlc_backwards(this.ptr, payment_hash);
		return ret;
	}

	/**
	 * Provides a payment preimage in response to a PaymentReceived event, returning true and
	 * generating message events for the net layer to claim the payment, if possible. Thus, you
	 * should probably kick the net layer to go send messages if this returns true!
	 * 
	 * Note that if you did not set an `amount_msat` when calling [`create_inbound_payment`] or
	 * [`create_inbound_payment_for_hash`] you must check that the amount in the `PaymentReceived`
	 * event matches your expectation. If you fail to do so and call this method, you may provide
	 * the sender \"proof-of-payment\" when they did not fulfill the full expected payment.
	 * 
	 * May panic if called except in response to a PaymentReceived event.
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public boolean claim_funds(byte[] payment_preimage) {
		boolean ret = bindings.ChannelManager_claim_funds(this.ptr, payment_preimage);
		return ret;
	}

	/**
	 * Gets the node_id held by this ChannelManager
	 */
	public byte[] get_our_node_id() {
		byte[] ret = bindings.ChannelManager_get_our_node_id(this.ptr);
		return ret;
	}

	/**
	 * Gets a payment secret and payment hash for use in an invoice given to a third party wishing
	 * to pay us.
	 * 
	 * This differs from [`create_inbound_payment_for_hash`] only in that it generates the
	 * [`PaymentHash`] and [`PaymentPreimage`] for you, returning the first and storing the second.
	 * 
	 * The [`PaymentPreimage`] will ultimately be returned to you in the [`PaymentReceived`], which
	 * will have the [`PaymentReceived::payment_preimage`] field filled in. That should then be
	 * passed directly to [`claim_funds`].
	 * 
	 * See [`create_inbound_payment_for_hash`] for detailed documentation on behavior and requirements.
	 * 
	 * [`claim_funds`]: Self::claim_funds
	 * [`PaymentReceived`]: events::Event::PaymentReceived
	 * [`PaymentReceived::payment_preimage`]: events::Event::PaymentReceived::payment_preimage
	 * [`create_inbound_payment_for_hash`]: Self::create_inbound_payment_for_hash
	 */
	public TwoTuple_PaymentHashPaymentSecretZ create_inbound_payment(Option_u64Z min_value_msat, int invoice_expiry_delta_secs, long user_payment_id) {
		long ret = bindings.ChannelManager_create_inbound_payment(this.ptr, min_value_msat.ptr, invoice_expiry_delta_secs, user_payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		TwoTuple_PaymentHashPaymentSecretZ ret_hu_conv = new TwoTuple_PaymentHashPaymentSecretZ(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Gets a [`PaymentSecret`] for a given [`PaymentHash`], for which the payment preimage is
	 * stored external to LDK.
	 * 
	 * A [`PaymentReceived`] event will only be generated if the [`PaymentSecret`] matches a
	 * payment secret fetched via this method or [`create_inbound_payment`], and which is at least
	 * the `min_value_msat` provided here, if one is provided.
	 * 
	 * The [`PaymentHash`] (and corresponding [`PaymentPreimage`]) must be globally unique. This
	 * method may return an Err if another payment with the same payment_hash is still pending.
	 * 
	 * `user_payment_id` will be provided back in [`PaymentPurpose::InvoicePayment::user_payment_id`] events to
	 * allow tracking of which events correspond with which calls to this and
	 * [`create_inbound_payment`]. `user_payment_id` has no meaning inside of LDK, it is simply
	 * copied to events and otherwise ignored. It may be used to correlate PaymentReceived events
	 * with invoice metadata stored elsewhere.
	 * 
	 * `min_value_msat` should be set if the invoice being generated contains a value. Any payment
	 * received for the returned [`PaymentHash`] will be required to be at least `min_value_msat`
	 * before a [`PaymentReceived`] event will be generated, ensuring that we do not provide the
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
	 * accept a payment and generate a [`PaymentReceived`] event for some time after the expiry.
	 * If you need exact expiry semantics, you should enforce them upon receipt of
	 * [`PaymentReceived`].
	 * 
	 * Pending inbound payments are stored in memory and in serialized versions of this
	 * [`ChannelManager`]. If potentially unbounded numbers of inbound payments may exist and
	 * space is limited, you may wish to rate-limit inbound payment creation.
	 * 
	 * May panic if `invoice_expiry_delta_secs` is greater than one year.
	 * 
	 * Note that invoices generated for inbound payments should have their `min_final_cltv_expiry`
	 * set to at least [`MIN_FINAL_CLTV_EXPIRY`].
	 * 
	 * [`create_inbound_payment`]: Self::create_inbound_payment
	 * [`PaymentReceived`]: events::Event::PaymentReceived
	 * [`PaymentPurpose::InvoicePayment::user_payment_id`]: events::PaymentPurpose::InvoicePayment::user_payment_id
	 */
	public Result_PaymentSecretAPIErrorZ create_inbound_payment_for_hash(byte[] payment_hash, Option_u64Z min_value_msat, int invoice_expiry_delta_secs, long user_payment_id) {
		long ret = bindings.ChannelManager_create_inbound_payment_for_hash(this.ptr, payment_hash, min_value_msat.ptr, invoice_expiry_delta_secs, user_payment_id);
		if (ret >= 0 && ret <= 4096) { return null; }
		Result_PaymentSecretAPIErrorZ ret_hu_conv = Result_PaymentSecretAPIErrorZ.constr_from_ptr(ret);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new MessageSendEventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned MessageSendEventsProvider must be freed before this_arg is
	 */
	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		long ret = bindings.ChannelManager_as_MessageSendEventsProvider(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		MessageSendEventsProvider ret_hu_conv = new MessageSendEventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new EventsProvider which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned EventsProvider must be freed before this_arg is
	 */
	public EventsProvider as_EventsProvider() {
		long ret = bindings.ChannelManager_as_EventsProvider(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		EventsProvider ret_hu_conv = new EventsProvider(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Listen which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Listen must be freed before this_arg is
	 */
	public Listen as_Listen() {
		long ret = bindings.ChannelManager_as_Listen(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Listen ret_hu_conv = new Listen(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new Confirm which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Confirm must be freed before this_arg is
	 */
	public Confirm as_Confirm() {
		long ret = bindings.ChannelManager_as_Confirm(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Confirm ret_hu_conv = new Confirm(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Blocks until ChannelManager needs to be persisted or a timeout is reached. It returns a bool
	 * indicating whether persistence is necessary. Only one listener on
	 * `await_persistable_update` or `await_persistable_update_timeout` is guaranteed to be woken
	 * up.
	 * Note that the feature `allow_wallclock_use` must be enabled to use this function.
	 */
	public boolean await_persistable_update_timeout(long max_wait) {
		boolean ret = bindings.ChannelManager_await_persistable_update_timeout(this.ptr, max_wait);
		return ret;
	}

	/**
	 * Blocks until ChannelManager needs to be persisted. Only one listener on
	 * `await_persistable_update` or `await_persistable_update_timeout` is guaranteed to be woken
	 * up.
	 */
	public void await_persistable_update() {
		bindings.ChannelManager_await_persistable_update(this.ptr);
	}

	/**
	 * Gets the latest best block which was connected either via the [`chain::Listen`] or
	 * [`chain::Confirm`] interfaces.
	 */
	public BestBlock current_best_block() {
		long ret = bindings.ChannelManager_current_best_block(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		BestBlock ret_hu_conv = null; if (ret < 0 || ret > 4096) { ret_hu_conv = new BestBlock(null, ret); }
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Constructs a new ChannelMessageHandler which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned ChannelMessageHandler must be freed before this_arg is
	 */
	public ChannelMessageHandler as_ChannelMessageHandler() {
		long ret = bindings.ChannelManager_as_ChannelMessageHandler(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		ChannelMessageHandler ret_hu_conv = new ChannelMessageHandler(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

	/**
	 * Serialize the ChannelManager object into a byte array which can be read by ChannelManager_read
	 */
	public byte[] write() {
		byte[] ret = bindings.ChannelManager_write(this.ptr);
		return ret;
	}

	/**
	 * Constructs a new Payer which calls the relevant methods on this_arg.
	 * This copies the `inner` pointer in this_arg and thus the returned Payer must be freed before this_arg is
	 */
	public Payer as_Payer() {
		long ret = bindings.ChannelManager_as_Payer(this.ptr);
		if (ret >= 0 && ret <= 4096) { return null; }
		Payer ret_hu_conv = new Payer(null, ret);
		ret_hu_conv.ptrs_to.add(this);
		return ret_hu_conv;
	}

}
