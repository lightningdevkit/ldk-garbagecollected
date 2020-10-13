package org.ldk.structs;

import org.ldk.impl.bindings;
import org.ldk.enums.*;

public class ChannelMonitor extends CommonBase {
	ChannelMonitor(Object _dummy, long ptr) { super(ptr); }
	@Override @SuppressWarnings("deprecation")
	protected void finalize() throws Throwable {
		bindings.ChannelMonitor_free(ptr); super.finalize();
	}

	// Skipped ChannelMonitor_update_monitor
	public long get_latest_update_id() {
		long ret = bindings.ChannelMonitor_get_latest_update_id(this.ptr);
		return ret;
	}

	// Skipped ChannelMonitor_get_funding_txo
	// Skipped ChannelMonitor_get_and_clear_pending_monitor_events
	// Skipped ChannelMonitor_get_and_clear_pending_events
	// Skipped ChannelMonitor_get_latest_holder_commitment_txn
	// Skipped ChannelMonitor_block_connected
	public void block_disconnected(byte[] header, int height, BroadcasterInterface broadcaster, FeeEstimator fee_estimator, Logger logger) {
		bindings.ChannelMonitor_block_disconnected(this.ptr, header, height, broadcaster == null ? 0 : broadcaster.ptr, fee_estimator == null ? 0 : fee_estimator.ptr, logger == null ? 0 : logger.ptr);
		this.ptrs_to.add(broadcaster);
		this.ptrs_to.add(fee_estimator);
		this.ptrs_to.add(logger);
	}

}
