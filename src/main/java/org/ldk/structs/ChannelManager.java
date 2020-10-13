package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelManager extends CommonBase {
	ChannelManager(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelManager_free(ptr); super.finalize();
	}

	public ChannelManager(LDKNetwork network, FeeEstimator fee_est, Watch chain_monitor, BroadcasterInterface tx_broadcaster, Logger logger, KeysInterface keys_manager, UserConfig config, long current_blockchain_height) {
		super(bindings.ChannelManager_new(network, fee_est == null ? 0 : fee_est.ptr, chain_monitor == null ? 0 : chain_monitor.ptr, tx_broadcaster == null ? 0 : tx_broadcaster.ptr, logger == null ? 0 : logger.ptr, keys_manager == null ? 0 : keys_manager.ptr, config == null ? 0 : config.ptr & ~1, current_blockchain_height));
		this.ptrs_to.add(fee_est);
		this.ptrs_to.add(chain_monitor);
		this.ptrs_to.add(tx_broadcaster);
		this.ptrs_to.add(logger);
		this.ptrs_to.add(keys_manager);
		this.ptrs_to.add(config);
	}

	// Skipped ChannelManager_create_channel
	// Skipped ChannelManager_list_channels
	// Skipped ChannelManager_list_usable_channels
	// Skipped ChannelManager_close_channel
	public void force_close_channel(byte[] channel_id) {
		bindings.ChannelManager_force_close_channel(this.ptr, channel_id);
	}

	public void force_close_all_channels() {
		bindings.ChannelManager_force_close_all_channels(this.ptr);
	}

	// Skipped ChannelManager_send_payment
	public void funding_transaction_generated(byte[] temporary_channel_id, OutPoint funding_txo) {
		bindings.ChannelManager_funding_transaction_generated(this.ptr, temporary_channel_id, funding_txo == null ? 0 : funding_txo.ptr & ~1);
		this.ptrs_to.add(funding_txo);
	}

	// Skipped ChannelManager_broadcast_node_announcement
	public void process_pending_htlc_forwards() {
		bindings.ChannelManager_process_pending_htlc_forwards(this.ptr);
	}

	public void timer_chan_freshness_every_min() {
		bindings.ChannelManager_timer_chan_freshness_every_min(this.ptr);
	}

	public boolean fail_htlc_backwards(byte[] payment_hash, byte[] payment_secret) {
		boolean ret = bindings.ChannelManager_fail_htlc_backwards(this.ptr, payment_hash, payment_secret);
		return ret;
	}

	public boolean claim_funds(byte[] payment_preimage, byte[] payment_secret, long expected_amount) {
		boolean ret = bindings.ChannelManager_claim_funds(this.ptr, payment_preimage, payment_secret, expected_amount);
		return ret;
	}

	public byte[] get_our_node_id() {
		byte[] ret = bindings.ChannelManager_get_our_node_id(this.ptr);
		return ret;
	}

	public void channel_monitor_updated(OutPoint funding_txo, long highest_applied_update_id) {
		bindings.ChannelManager_channel_monitor_updated(this.ptr, funding_txo == null ? 0 : funding_txo.ptr & ~1, highest_applied_update_id);
		this.ptrs_to.add(funding_txo);
	}

	public MessageSendEventsProvider as_MessageSendEventsProvider() {
		MessageSendEventsProvider ret = new MessageSendEventsProvider(null, bindings.ChannelManager_as_MessageSendEventsProvider(this.ptr));
		ret.ptrs_to.add(this);
		return ret;
	}

	public EventsProvider as_EventsProvider() {
		EventsProvider ret = new EventsProvider(null, bindings.ChannelManager_as_EventsProvider(this.ptr));
		ret.ptrs_to.add(this);
		return ret;
	}

	// Skipped ChannelManager_block_connected
	public void block_disconnected(byte[] header) {
		bindings.ChannelManager_block_disconnected(this.ptr, header);
	}

	public ChannelMessageHandler as_ChannelMessageHandler() {
		ChannelMessageHandler ret = new ChannelMessageHandler(null, bindings.ChannelManager_as_ChannelMessageHandler(this.ptr));
		ret.ptrs_to.add(this);
		return ret;
	}

}
